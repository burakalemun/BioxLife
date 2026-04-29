"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { getWishlist, toggleWishlistItem } from "@lib/data/wishlist"

type WishlistItem = {
  id: string
  title: string
  handle: string
  thumbnail: string | null
}

type WishlistContextType = {
  wishlist: WishlistItem[]
  toggleWishlist: (item: any) => Promise<void>
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export const WishlistProvider = ({ 
  children,
  customer
}: { 
  children: React.ReactNode
  customer: HttpTypes.StoreCustomer | null
}) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  // Load from local storage initially
  useEffect(() => {
    const saved = localStorage.getItem("bioxlife_wishlist")
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse wishlist", e)
      }
    }
  }, [])

  const toggleWishlist = async (item: any) => {
    // Optimistic UI update
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === (item.id || item.product_id))
      let newList
      if (exists) {
        newList = prev.filter((w) => w.id !== (item.id || item.product_id))
      } else {
        newList = [...prev, item]
      }
      localStorage.setItem("bioxlife_wishlist", JSON.stringify(newList))
      return newList
    })

    // Backend sync
    if (customer) {
      try {
        await toggleWishlistItem(item.id || item.product_id)
      } catch (e) {
        console.error("Backend wishlist sync failed", e)
      }
    }
  }

  const isInWishlist = (id: string) => wishlist.some((w) => w.id === id)

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

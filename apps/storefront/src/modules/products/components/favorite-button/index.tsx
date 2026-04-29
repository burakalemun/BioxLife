"use client"

import { Heart } from "@medusajs/icons"
import { useWishlist } from "@lib/context/wishlist-context"
import { clx } from "@modules/common/components/ui"

export default function FavoriteButton({
  productData,
  className,
}: {
  productData: {
    id: string
    title: string
    handle: string
    thumbnail: string | null
  }
  className?: string
}) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  const isFav = isInWishlist(productData.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(productData)
  }

  return (
    <button
      onClick={handleClick}
      className={clx(
        "flex items-center justify-center transition-all hover:scale-110",
        className
      )}
      aria-label="Favorilere ekle"
    >
      <Heart
        className={clx("w-6 h-6 transition-colors", {
          "fill-[#c9a84c] text-[#c9a84c]": isFav,
          "text-[#1e2b20]": !isFav,
        })}
      />
    </button>
  )
}

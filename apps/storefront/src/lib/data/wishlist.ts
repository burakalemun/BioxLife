"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export const getWishlist = async () => {
  const headers = await getAuthHeaders()
  if (!headers) return null

  return sdk.client.fetch<{ wishlist: any }>("/store/wishlist", {
    method: "GET",
    headers,
    cache: "no-store",
  }).then(({ wishlist }) => wishlist)
}

export const toggleWishlistItem = async (productId: string) => {
  const headers = await getAuthHeaders()
  if (!headers) return null

  return sdk.client.fetch<{ wishlist: any }>("/store/wishlist", {
    method: "POST",
    headers,
    body: { product_id: productId },
  }).then(({ wishlist }) => wishlist)
}

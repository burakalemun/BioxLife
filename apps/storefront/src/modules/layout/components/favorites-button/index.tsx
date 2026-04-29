"use client"

import { useWishlist } from "@lib/context/wishlist-context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function FavoritesButton() {
  const { wishlist } = useWishlist()

  return (
    <LocalizedClientLink
      href="/account/favorites"
      className="label-caps text-[#1e2b20]/70 hover:text-[#1e2b20] transition-colors"
    >
      Favoriler {wishlist.length > 0 ? `(${wishlist.length})` : ""}
    </LocalizedClientLink>
  )
}

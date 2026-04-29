import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { WISHLIST_MODULE } from "../../../modules/wishlist"
import WishlistModuleService from "../../../modules/wishlist/service"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const wishlistModuleService: WishlistModuleService = req.scope.resolve(WISHLIST_MODULE)
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  let [wishlist] = await wishlistModuleService.listWishlists(
    { customer_id: customerId },
    { relations: ["items"] }
  )

  if (!wishlist) {
    wishlist = await wishlistModuleService.createWishlists({
      customer_id: customerId,
    })
    // @ts-ignore
    wishlist.items = []
  }

  res.json({ wishlist })
}

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const wishlistModuleService: WishlistModuleService = req.scope.resolve(WISHLIST_MODULE)
  const customerId = req.auth_context?.actor_id
  const { product_id } = req.body as { product_id: string }

  if (!customerId) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  if (!product_id) {
    return res.status(400).json({ message: "product_id is required" })
  }

  let [wishlist] = await wishlistModuleService.listWishlists(
    { customer_id: customerId },
    { relations: ["items"] }
  )

  if (!wishlist) {
    wishlist = await wishlistModuleService.createWishlists({
      customer_id: customerId,
    })
  }

  const existingItem = wishlist.items?.find(item => item.product_id === product_id)

  if (existingItem) {
    await wishlistModuleService.deleteWishlistItems(existingItem.id)
  } else {
    await wishlistModuleService.createWishlistItems({
      wishlist_id: wishlist.id,
      product_id,
    })
  }

  const updatedWishlist = await wishlistModuleService.retrieveWishlist(wishlist.id, {
    relations: ["items"],
  })

  res.json({ wishlist: updatedWishlist })
}

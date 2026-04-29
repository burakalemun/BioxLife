import { MedusaService } from "@medusajs/utils"
import { Wishlist, WishlistItem } from "./models/wishlist"

class WishlistModuleService extends MedusaService({
  Wishlist,
  WishlistItem,
}) {}

export default WishlistModuleService

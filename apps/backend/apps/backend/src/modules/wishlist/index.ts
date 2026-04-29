import WishlistModuleService from "./service"
import { Module } from "@medusajs/utils"

export const WISHLIST_MODULE = "wishlist"

export default Module(WISHLIST_MODULE, {
  service: WishlistModuleService,
})

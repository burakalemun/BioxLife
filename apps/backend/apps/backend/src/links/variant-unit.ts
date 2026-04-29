import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import UnitModule from "../modules/unit"

export default defineLink(
  ProductModule.linkable.productVariant,
  UnitModule.linkable.variantUnit
)

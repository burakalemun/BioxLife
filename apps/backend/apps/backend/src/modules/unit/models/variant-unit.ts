import { model } from "@medusajs/framework/utils"

export const VariantUnit = model.define("variant_unit", {
  id: model.id().primaryKey(),
  variant_id: model.text().unique(),
  unit_type: model.enum(["gram", "ml", "adet"]).default("gram"),
  min_order_quantity: model.number().default(1),
})

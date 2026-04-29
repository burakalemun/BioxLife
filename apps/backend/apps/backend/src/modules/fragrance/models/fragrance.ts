import { model } from "@medusajs/framework/utils"

export const Fragrance = model.define("fragrance", {
  id: model.id().primaryKey(),
  top_notes: model.array().nullable(),
  middle_notes: model.array().nullable(),
  base_notes: model.array().nullable(),
  intensity: model.number().nullable(),
  origin_country: model.text().nullable(),
  sds_pdf_url: model.text().nullable(),
})

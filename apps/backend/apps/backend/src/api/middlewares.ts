import { defineMiddlewares } from "@medusajs/framework/http"
import { z } from "zod"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        fragrance: z.object({
          top_notes: z.array(z.string()).optional(),
          middle_notes: z.array(z.string()).optional(),
          base_notes: z.array(z.string()).optional(),
          intensity: z.number().min(1).max(5).optional(),
          origin_country: z.string().optional(),
          sds_pdf_url: z.string().url().optional(),
        }).optional(),
        unit_data: z.object({
          unit_type: z.enum(["gram", "ml", "adet"]).optional(),
          min_order_quantity: z.number().optional(),
        }).optional(),
      },
    },
    {
      matcher: "/admin/products/:id",
      method: ["POST"],
      additionalDataValidator: {
        fragrance: z.object({
          top_notes: z.array(z.string()).optional(),
          middle_notes: z.array(z.string()).optional(),
          base_notes: z.array(z.string()).optional(),
          intensity: z.number().min(1).max(5).optional(),
          origin_country: z.string().optional(),
          sds_pdf_url: z.string().url().optional(),
        }).optional(),
        unit_data: z.object({
          unit_type: z.enum(["gram", "ml", "adet"]).optional(),
          min_order_quantity: z.number().optional(),
        }).optional(),
      },
    },
  ],
})

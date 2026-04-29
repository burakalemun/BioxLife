import { createShippingProfilesWorkflow } from "@medusajs/core-flows"
import { ExecArgs } from "@medusajs/framework/types"

export default async function seedShipping({ container }: ExecArgs) {
  const logger = container.resolve("logger")

  logger.info(`📦 Standart Kargo Profili sisteme ekleniyor...`)

  try {
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: {
        data: [
          {
            name: "Standart",
            type: "default",
          }
        ]
      }
    })

    logger.info(`✅ Başarıyla Kargo Profili eklendi! ID: ${result[0].id}`)
  } catch (err) {
    logger.error(`❌ Kargo Profili eklenirken hata oluştu: ${err.message}`)
  }
}

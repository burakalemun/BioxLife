import { createProductsWorkflow } from "@medusajs/core-flows"
import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function seedProducts({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)

  // Standart satış kanalını (Sales Channel) bulalım
  const [salesChannels] = await salesChannelModule.listSalesChannels({}, { take: 1 })
  const salesChannelId = salesChannels?.[0]?.id

  if (!salesChannelId) {
    logger.error("❌ Satış kanalı bulunamadı! Lütfen önce Admin panelden bir mağaza oluşturun.")
    return
  }

  logger.info(`📦 Ürünler '${salesChannelId}' satış kanalına ekleniyor...`)

  try {
    const { result } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: "Aura No.1 Signature",
            handle: "aura-no-1",
            description: "BioxLife'ın imza kokusu. Odunsu ve ferah notaların eşsiz uyumu.",
            options: [{ title: "Boyut", values: ["50ml", "100ml"] }],
            sales_channels: [{ id: salesChannelId }],
            variants: [
              {
                title: "50ml",
                sku: "AURA-50",
                prices: [{ amount: 4500, currency_code: "try" }],
                options: { Boyut: "50ml" }
              },
              {
                title: "100ml",
                sku: "AURA-100",
                prices: [{ amount: 7500, currency_code: "try" }],
                options: { Boyut: "100ml" }
              }
            ]
          },
          {
            title: "Luminous Night Serum",
            handle: "luminous-serum",
            description: "Gece onarıcı lüks cilt bakım serumu. Hücre yenilenmesini destekler.",
            options: [{ title: "Boyut", values: ["30ml"] }],
            sales_channels: [{ id: salesChannelId }],
            variants: [
              {
                title: "30ml",
                sku: "LUM-30",
                prices: [{ amount: 3200, currency_code: "try" }],
                options: { Boyut: "30ml" }
              }
            ]
          },
          {
            title: "Velvet Body Butter",
            handle: "velvet-body-butter",
            description: "Derinlemesine nemlendirici, ipeksi dokunuşlu vücut kremi.",
            options: [{ title: "Boyut", values: ["200ml"] }],
            sales_channels: [{ id: salesChannelId }],
            variants: [
              {
                title: "200ml",
                sku: "VBB-200",
                prices: [{ amount: 1850, currency_code: "try" }],
                options: { Boyut: "200ml" }
              }
            ]
          }
        ]
      }
    })

    logger.info(`✅ Başarıyla ${result.length} adet lüks ürün eklendi!`)
  } catch (err) {
    logger.error("❌ Ürünler eklenirken hata oluştu:", err.message)
  }
}

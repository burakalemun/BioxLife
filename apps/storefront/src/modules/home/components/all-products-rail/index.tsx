import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function AllProductsRail({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 8,
      fields: "*variants.calculated_price",
    },
  })

  if (!products?.length) return null

  return (
    <section className="py-24 md:py-36" style={{ background: "#f5f0e8" }}>
      <div className="content-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 pb-4 border-b border-[rgba(30,43,32,0.1)]">
          <div>
            <p className="label-caps mb-3" style={{ color: "#c9a84c" }}>BioxLife Koleksiyonu</p>
            <h2
              className="text-4xl md:text-5xl font-medium"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
            >
              Tüm Ürünleri Keşfedin
            </h2>
          </div>
          <LocalizedClientLink href="/store" className="btn-ghost hidden small:flex text-sm">
            Mağazaya Git →
          </LocalizedClientLink>
        </div>

        {/* Product grid */}
        <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((p) => (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <div className="mt-12 small:hidden">
          <LocalizedClientLink href="/store" className="btn-primary w-full text-center py-4 block">
            TÜMÜNÜ GÖR
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

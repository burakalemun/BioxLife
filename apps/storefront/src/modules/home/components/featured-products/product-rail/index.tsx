import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!products?.length) return null

  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="content-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="label-caps mb-3" style={{ color: "#c9a84c" }}>Öne Çıkanlar</p>
            <h2
              className="text-4xl md:text-5xl font-medium"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
            >
              {collection.title}
            </h2>
          </div>
          <LocalizedClientLink href={`/collections/${collection.handle}`} className="btn-ghost hidden small:flex">
            Tümünü Gör
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </LocalizedClientLink>
        </div>

        {/* Product grid — minimal, no cards */}
        <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((p) => (
            <li key={p.id}>
              <ProductPreview product={p} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

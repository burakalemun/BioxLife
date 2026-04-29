import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
      {/* Header */}
      <div className="py-20 md:py-28 text-center" style={{ background: "#1e2b20" }}>
        <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>Koleksiyon</p>
        <h1
          className="text-5xl md:text-7xl font-medium text-cream"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {collection.title}
        </h1>
      </div>

      <div className="content-container py-16">
        <div className="flex flex-col small:flex-row gap-12">
          {/* Sidebar */}
          <aside className="small:w-52 shrink-0">
            <div className="sticky top-24">
              <p className="label-caps mb-6 pb-4" style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.12)" }}>
                Sırala
              </p>
              <RefinementList sortBy={sort} />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <Suspense fallback={<SkeletonProductGrid numberOfProducts={collection.products?.length} />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                collectionId={collection.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

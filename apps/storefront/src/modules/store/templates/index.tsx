import { Suspense } from "react"
import { listCategories } from "@lib/data/categories"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  categoryId,
  q,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  categoryId?: string
  q?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const categories = await listCategories()

  return (
    <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
      {/* Page header */}
      <div
        className="py-20 md:py-28 text-center"
        style={{ background: "#1e2b20" }}
      >
        <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>BioxLife</p>
        <h1
          className="text-5xl md:text-7xl font-medium text-cream mb-4"
          data-testid="store-page-title"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Koleksiyon
        </h1>
        <p className="label-caps" style={{ color: "rgba(245,240,232,0.4)", letterSpacing: "0.25em" }}>
          Antik Ritüeller • Modern Saflık
        </p>
      </div>

      <div className="content-container py-16" data-testid="category-container">
        <div className="flex flex-col small:flex-row gap-12">
          {/* Sidebar */}
          <aside className="small:w-64 shrink-0">
            <div className="sticky top-24">
              <p className="label-caps mb-6 pb-4" style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.12)" }}>
                Filtrele
              </p>
              <RefinementList sortBy={sort} categories={categories} activeCategoryId={categoryId} query={q} />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={categoryId}
                query={q}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate

import { notFound } from "next/navigation"
import { Suspense } from "react"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  if (!category || !countryCode) notFound()

  const parents: HttpTypes.StoreProductCategory[] = []
  const getParents = (c: HttpTypes.StoreProductCategory) => {
    if (c.parent_category) { parents.push(c.parent_category); getParents(c.parent_category) }
  }
  getParents(category)

  return (
    <div className="min-h-screen" style={{ background: "#f5f0e8" }} data-testid="category-container">
      {/* Category header */}
      <div className="py-20 md:py-28 text-center" style={{ background: "#1e2b20" }}>
        {/* Breadcrumbs */}
        {parents.length > 0 && (
          <div className="flex justify-center items-center gap-2 mb-4">
            {parents.reverse().map((p) => (
              <span key={p.id} className="flex items-center gap-2">
                <LocalizedClientLink href={`/categories/${p.handle}`} className="label-caps hover:opacity-70 transition-opacity" style={{ color: "rgba(201,168,76,0.6)", fontSize: "9px" }}>
                  {p.name}
                </LocalizedClientLink>
                <span style={{ color: "rgba(245,240,232,0.2)" }}>·</span>
              </span>
            ))}
          </div>
        )}
        <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>Koleksiyon</p>
        <h1
          className="text-5xl md:text-7xl font-medium text-cream mb-4"
          data-testid="category-page-title"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {category.name}
        </h1>
        {category.description && (
          <p className="text-sm font-light max-w-xl mx-auto mt-4" style={{ color: "rgba(245,240,232,0.55)" }}>
            {category.description}
          </p>
        )}
      </div>

      <div className="content-container py-16">
        <div className="flex flex-col small:flex-row gap-12">
          <aside className="small:w-52 shrink-0">
            <div className="sticky top-24">
              <p className="label-caps mb-6 pb-4" style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.12)" }}>
                Filtrele
              </p>
              <RefinementList sortBy={sort} data-testid="sort-by-container" />

              {category.category_children?.length > 0 && (
                <div className="mt-8">
                  <p className="label-caps mb-4" style={{ color: "#6b7b6c", fontSize: "9px" }}>Alt Kategoriler</p>
                  <ul className="flex flex-col gap-3">
                    {category.category_children.map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          href={`/categories/${c.handle}`}
                          className="text-sm font-light hover:opacity-70 transition-opacity"
                          style={{ color: "#1e2b20" }}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <Suspense fallback={<SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  categories?: HttpTypes.StoreProductCategory[]
  activeCategoryId?: string
  query?: string
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, categories, activeCategoryId, query, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(query || "")

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams)
      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = useCallback((name: string, value: string | null) => {
    const queryStr = createQueryString(name, value)
    router.push(`${pathname}?${queryStr}`, { scroll: false })
  }, [createQueryString, pathname, router])

  // Live search debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue !== (query || "")) {
        setQueryParams("q", searchValue || null)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, query, setQueryParams])

  return (
    <div className="flex flex-col gap-12 py-4 mb-8">
      {/* Search Input */}
      <div className="flex flex-col gap-y-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#6b7b6c" }}>
          Ürün Ara
        </p>
        <div className="relative group">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Koku, içerik, ürün..."
            className="w-full bg-transparent border-b border-[rgba(30,43,32,0.15)] py-2 pr-8 text-sm outline-none transition-all focus:border-[#c9a84c] placeholder:text-[#1e2b20]/30"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1e2b20]/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
      </div>

      {/* Categories / Scent Profiles */}
      <div className="flex flex-col gap-y-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#6b7b6c" }}>
          Kategori & Koku
        </p>
        <ul className="flex flex-col gap-y-3">
          <li>
            <button
              onClick={() => setQueryParams("category_id", null)}
              className={clx(
                "text-sm transition-colors hover:text-[#c9a84c]",
                !activeCategoryId ? "text-[#c9a84c] font-medium" : "text-[#1e2b20]/70"
              )}
            >
              Tümü
            </button>
          </li>
          {categories?.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setQueryParams("category_id", cat.id)}
                className={clx(
                  "text-sm transition-colors text-left hover:text-[#c9a84c]",
                  activeCategoryId === cat.id ? "text-[#c9a84c] font-medium" : "text-[#1e2b20]/70"
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
    </div>
  )
}

export default RefinementList

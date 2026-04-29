"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  try {
    return await sdk.client
      .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
        `/store/products`,
        {
          method: "GET",
          query: {
            limit,
            offset,
            region_id: region?.id,
            fields:
              "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
            ...queryParams,
          },
          headers,
          next,
          cache: "force-cache",
        }
      )
      .then(({ products, count }) => {
        const nextPage = count > offset + limit ? pageParam + 1 : null

        return {
          response: {
            products,
            count,
          },
          nextPage: nextPage,
          queryParams,
        }
      })
  } catch (error) {
    console.warn("Backend'e ulaşılamadı, mock products kullanılıyor...")
    const mockProducts = [
      {
        id: "prod_1",
        title: "Pure Lavanta Yağı",
        handle: "pure-lavender-oil",
        description: "100% Saf ve doğal lavanta özü.",
        thumbnail: "/category-oils.png",
        variants: [
          {
            id: "var_1",
            title: "10ml",
            calculated_price: {
              calculated_amount: 250,
              original_amount: 250,
              currency_code: "try",
              calculated_price: {
                price_list_type: "sale",
              },
            },
          },
        ],
      },
      {
        id: "prod_2",
        title: "Adaçayı Rahatlatıcı Çay",
        handle: "sage-relax-tea",
        description: "Günün yorgunluğunu atan özel karışım.",
        thumbnail: "/category-teas.png",
        variants: [
          {
            id: "var_2",
            title: "50g",
            calculated_price: {
              calculated_amount: 120,
              original_amount: 120,
              currency_code: "try",
              calculated_price: {
                price_list_type: "sale",
              },
            },
          },
        ],
      },
      {
        id: "prod_3",
        title: "Aura No. 1 Parfüm",
        handle: "aura-no-1",
        description: "Sofistike ve kalıcı bir imza kokusu.",
        thumbnail: "/category-fragrances.png",
        variants: [
          {
            id: "var_3",
            title: "50ml",
            calculated_price: {
              calculated_amount: 1850,
              original_amount: 1850,
              currency_code: "try",
              calculated_price: {
                price_list_type: "sale",
              },
            },
          },
        ],
      },
    ] as any
    return {
      response: {
        products: mockProducts,
        count: mockProducts.length,
      },
      nextPage: null,
      queryParams,
    }
  }
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}

"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  }

  try {
    return await sdk.client
      .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
        method: "GET",
        next,
        cache: "force-cache",
      })
      .then(({ regions }) => regions)
  } catch (error) {
    console.warn("Backend'e ulaşılamadı, mock region kullanılıyor...")
    return [
      {
        id: "reg_mock",
        name: "Turkey",
        currency_code: "try",
        countries: [
          {
            id: 1,
            iso_2: "tr",
            iso_3: "tur",
            name: "Turkey",
            display_name: "Turkey",
          },
        ],
      } as any,
    ]
  }
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  try {
    return await sdk.client
      .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
        method: "GET",
        next,
        cache: "force-cache",
      })
      .then(({ region }) => region)
  } catch (error) {
    console.warn(`Region ${id} bulunamadı, mock region dönülüyor...`)
    return {
      id: "reg_mock",
      name: "Turkey",
      currency_code: "try",
      countries: [
        {
          id: 1,
          iso_2: "tr",
          iso_3: "tur",
          name: "Turkey",
          display_name: "Turkey",
        },
      ],
    } as any
  }
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async (countryCode: string) => {
  if (regionMap.has(countryCode)) {
    return regionMap.get(countryCode)
  }

  const regions = await listRegions()

  if (!regions) {
    return null
  }

  regions.forEach((region) => {
    region.countries?.forEach((c) => {
      regionMap.set(c?.iso_2 ?? "", region)
    })
  })

  const region = countryCode
    ? regionMap.get(countryCode)
    : regionMap.get("us")

  return region
}

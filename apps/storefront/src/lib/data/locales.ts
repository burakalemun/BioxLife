"use server"

export type Locale = {
  code: string
  name: string
}

// Medusa v2'de /store/locales endpoint'i mevcut değil.
// API çağrısı yapmak yerine direkt sabit liste dönülüyor → 400ms tasarruf/istek.
export const listLocales = async (): Promise<Locale[] | null> => {
  return [
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "English" },
  ]
}

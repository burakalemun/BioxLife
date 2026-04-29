import { Metadata } from "next"
import FavoritesTemplate from "@modules/favorites/templates"

export const metadata: Metadata = {
  title: "Favorilerim | BioxLife",
  description: "Favori BioxLife ürünleriniz",
}

export default function FavoritesPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4 mb-8">
        <h1 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
          Favorilerim
        </h1>
        <p className="text-sage-600 font-light">
          Beğendiğiniz ürünleri burada görebilir ve yönetebilirsiniz.
        </p>
      </div>
      <FavoritesTemplate />
    </div>
  )
}

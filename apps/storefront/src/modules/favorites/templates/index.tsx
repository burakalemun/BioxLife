"use client"

import { useWishlist } from "@lib/context/wishlist-context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import FavoriteButton from "@modules/products/components/favorite-button"

const FavoritesTemplate = () => {
  const { wishlist } = useWishlist()

  return (
    <div className="w-full">
      <div className="content-container py-4">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(30,43,32,0.2)" strokeWidth="1" className="mb-6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2 className="text-2xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
              Henüz Favoriniz Yok
            </h2>
            <p className="text-sage-600 mb-8 max-w-md">
              Koleksiyonumuzu keşfedin ve ilginizi çeken ürünleri favorilerinize ekleyin.
            </p>
            <LocalizedClientLink
              href="/store"
              className="label-caps px-8 py-4 transition-all hover:opacity-90"
              style={{ background: "#1e2b20", color: "#f5f0e8" }}
            >
              KOLEKSİYONU KEŞFET
            </LocalizedClientLink>
          </div>
        ) : (
          <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-12">
            {wishlist.map((item) => (
              <div key={item.id} className="group relative block">
                <LocalizedClientLink href={`/products/${item.handle}`}>
                  <div
                    className="relative overflow-hidden mb-4"
                    style={{ aspectRatio: "3/4", background: "#ede8de" }}
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      {item.thumbnail ? (
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="absolute inset-0 w-full h-full object-cover object-center" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-sage-100">
                          <span className="text-xs text-sage-400">Görsel Yok</span>
                        </div>
                      )}
                    </div>
                  </div>
                </LocalizedClientLink>
                
                <div className="absolute top-3 right-3 z-10">
                  <FavoriteButton
                    productData={item}
                    className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm"
                  />
                </div>

                <LocalizedClientLink href={`/products/${item.handle}`}>
                  <h3
                    className="text-base font-medium mb-1 group-hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
                  >
                    {item.title}
                  </h3>
                </LocalizedClientLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesTemplate

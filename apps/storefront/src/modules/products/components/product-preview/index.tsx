import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import FavoriteButton from "../favorite-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <article data-testid="product-wrapper">
        {/* Image */}
        <div
          className="relative overflow-hidden mb-6"
          style={{ aspectRatio: "3/4", background: "#ede8de" }}
        >
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-103">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 py-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
            style={{ background: "rgba(30,43,32,0.88)" }}
          >
            <span className="label-caps" style={{ color: "#f5f0e8", fontSize: "10px" }}>Hızlı Bak</span>
          </div>

          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FavoriteButton
              productData={{
                id: product.id!,
                title: product.title,
                handle: product.handle,
                thumbnail: product.thumbnail,
              }}
              className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          {product.type?.value && (
            <p className="label-caps mb-1.5" style={{ color: "#c9a84c", fontSize: "9px" }}>
              {product.type.value}
            </p>
          )}
          <h3
            className="text-base font-medium mb-2 group-hover:opacity-70 transition-opacity"
            data-testid="product-title"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
          >
            {product.title}
          </h3>
          {cheapestPrice && (
            <div style={{ color: "#6b7b6c" }} className="text-sm font-light">
              <PreviewPrice price={cheapestPrice} />
            </div>
          )}
        </div>
      </article>
    </LocalizedClientLink>
  )
}

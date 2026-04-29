import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ProductInfo = ({ product }: { product: HttpTypes.StoreProduct }) => {
  return (
    <div id="product-info">
      {product.collection && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px" style={{ background: "#c9a84c" }} />
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="label-caps transition-colors hover:opacity-70"
            style={{ color: "#c9a84c", fontSize: "10px" }}
          >
            {product.collection.title}
          </LocalizedClientLink>
        </div>
      )}

      <h1
        className="text-4xl md:text-5xl font-medium leading-tight mb-4"
        data-testid="product-title"
        style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
      >
        {product.title}
      </h1>

      {product.subtitle && (
        <p className="text-base font-light mb-6" style={{ color: "#6b7b6c" }}>
          {product.subtitle}
        </p>
      )}

      <div className="flex items-center gap-3 mb-8">
        <span className="label-caps" style={{ color: "#6b7b6c", fontSize: "10px" }}>
          Menşei: Türkiye
        </span>
        <span style={{ color: "rgba(30,43,32,0.2)" }}>·</span>
        <span className="label-caps" style={{ color: "#6b7b6c", fontSize: "10px" }}>
          %100 Saf
        </span>
      </div>

      {product.description && (
        <p
          className="text-sm font-light leading-loose"
          data-testid="product-description"
          style={{ color: "#4a5e4c" }}
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo

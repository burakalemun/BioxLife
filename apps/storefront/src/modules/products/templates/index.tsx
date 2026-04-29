import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductLuxuryDetails from "../components/product-luxury-details"
import ScentNotes from "../components/scent-notes"
import ProductOnboardingCta from "../components/product-onboarding-cta"
import ProductReviews from "../components/product-reviews"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) return notFound()

  return (
    <div className="min-h-screen pt-24 small:pt-32" style={{ background: "#f5f0e8" }}>
      {/* Main PDP layout */}
      <div
        className="content-container"
        data-testid="product-container"
      >
        <div className="grid grid-cols-1 small:grid-cols-[1fr_420px] gap-0">
          {/* LEFT: Image gallery — scrolls naturally */}
          <div style={{ background: "#1e2b20" }}>
            <ImageGallery images={images} />
          </div>

          {/* RIGHT: Product info panel */}
          <div
            className="py-10 small:py-20 px-6 small:px-10 flex flex-col gap-10"
            style={{ background: "#f5f0e8" }}
          >
            <ProductInfo product={product} />

            <div style={{ borderTop: "1px solid rgba(30,43,32,0.1)" }} className="pt-8">
              <Suspense
                fallback={
                  <ProductActions disabled={true} product={product} region={region} />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>

            <ProductTabs product={product} />
            <ScentNotes product={product} />
            <ProductLuxuryDetails product={product} />
            <ProductOnboardingCta />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div style={{ background: "#ede8de", borderTop: "1px solid rgba(30,43,32,0.08)" }}>
        <div className="content-container py-24">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <p className="label-caps" style={{ color: "#1e2b20" }}>Bunları da Beğenebilirsiniz</p>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ borderTop: "1px solid rgba(30,43,32,0.08)" }}>
        <Suspense fallback={<div className="py-20 text-center"><p className="text-sm" style={{ color: "#6b7b6c" }}>Yorumlar yükleniyor...</p></div>}>
          <ProductReviews productId={product.id!} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate

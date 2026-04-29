import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col text-sage-900 gap-y-1">
      <div className="flex items-center gap-x-2">
        <span
          className={clx("text-3xl font-semibold", {
            "text-gold-700": selectedPrice.price_type === "sale",
          })}
        >
          {!variant && <span className="text-sm font-normal text-sage-500 block">Başlayan fiyatlarla:</span>}
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>
        {selectedPrice.price_type === "sale" && (
          <span className="bg-gold-100 text-gold-700 text-xs font-bold px-2 py-1 rounded-full">
            %{selectedPrice.percentage_diff} İNDİRİM
          </span>
        )}
      </div>
      {selectedPrice.price_type === "sale" && (
        <p className="flex gap-x-1 text-sm text-sage-400">
          <span>Liste fiyatı: </span>
          <span
            className="line-through"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        </p>
      )}
    </div>
  )
}

import { Heading } from "@modules/common/components/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="sticky top-0 flex flex-col gap-y-4">
      <div className="w-full bg-transparent flex flex-col">
        <CartTotals totals={cart} />
        <div className="my-6">
          <ItemsPreviewTemplate cart={cart} />
        </div>
        <div className="mt-2">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary

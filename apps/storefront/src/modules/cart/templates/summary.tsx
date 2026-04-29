"use client"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) return "address"
  if (cart?.shipping_methods?.length === 0) return "delivery"
  return "payment"
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-8">
      {/* Discount */}
      <div>
        <DiscountCode cart={cart} />
      </div>

      {/* Totals */}
      <div style={{ borderTop: "1px solid rgba(245,240,232,0.1)" }} className="pt-6">
        <CartTotals totals={cart} />
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-y-4 mt-2">
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
          className="block group"
        >
          <button
            className="w-full py-5 uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 relative overflow-hidden"
            style={{ background: "#c9a84c", color: "#1e2b20" }}
          >
            {/* Glow / Shine effect on hover */}
            <div className="absolute inset-0 w-full h-full transform -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent" />
            <span className="relative z-10">ÖDEMEYE GEÇ</span>
          </button>
        </LocalizedClientLink>

        <p className="text-center tracking-widest uppercase mt-2" style={{ color: "rgba(245,240,232,0.4)", fontSize: "10px" }}>
          🔒 Güvenli & Şifreli Ödeme
        </p>
      </div>
    </div>
  )
}

export default Summary

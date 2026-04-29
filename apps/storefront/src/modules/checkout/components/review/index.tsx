"use client"

import { clx } from "@modules/common/components/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-transparent">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clx(
            "flex flex-row text-2xl gap-x-2 items-baseline font-semibold tracking-wide",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
          style={{ color: "#1e2b20", fontFamily: "'Playfair Display', serif" }}
        >
          Siparişi Onayla
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <span className="text-sm font-light italic" style={{ color: "#6b7b6c" }}>
                "Siparişi Tamamla" butonuna tıklayarak; Kullanım Koşullarını, 
                Satış Sözleşmesini ve İade Politikasını okuduğunuzu, anladığınızı 
                ve kabul ettiğinizi beyan etmiş olursunuz.
              </span>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review

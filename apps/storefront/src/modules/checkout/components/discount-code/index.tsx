"use client"

import React from "react"
import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [isApplying, setIsApplying] = React.useState(false)

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )
    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")
    setIsApplying(true)

    const code = formData.get("code")
    if (!code) {
      setIsApplying(false)
      return
    }

    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : String(e))
    }

    if (input) input.value = ""
    setIsApplying(false)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="mb-2">
        <form action={(a) => addPromotionCode(a)} className="w-full">
          <label className="flex gap-x-1 my-2 items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-sm font-medium uppercase tracking-widest transition-colors"
              style={{ color: "#c9a84c" }}
              data-testid="add-discount-button"
            >
              + PROMOSYON EKLE
            </button>
          </label>

          {isOpen && (
            <div className="mt-4 flex flex-col gap-y-2">
              <div className="flex w-full gap-x-2">
                <input
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="Kodu giriniz"
                  className="w-full h-12 px-4 bg-transparent border focus:outline-none transition-colors"
                  style={{ borderColor: "rgba(245,240,232,0.2)", color: "#f5f0e8" }}
                  data-testid="discount-input"
                />
                <button
                  type="submit"
                  disabled={isApplying}
                  className="h-12 px-6 uppercase tracking-widest text-xs font-semibold transition-colors whitespace-nowrap"
                  style={{ background: "#c9a84c", color: "#1e2b20" }}
                  data-testid="discount-apply-button"
                >
                  {isApplying ? "UYGULANIYOR" : "UYGULA"}
                </button>
              </div>

              {errorMessage && (
                <span className="text-red-400 text-sm">{errorMessage}</span>
              )}
            </div>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-full mt-6">
            <h4 className="text-xs uppercase tracking-widest mb-3" style={{ color: "#6b7b6c" }}>
              Uygulanan Promosyonlar
            </h4>

            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="flex items-center justify-between p-3 mb-2"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}
                data-testid="discount-row"
              >
                <div className="flex items-baseline gap-x-2">
                  <span className="font-semibold" style={{ color: "#c9a84c" }}>
                    {promotion.code}
                  </span>
                  <span className="text-sm text-cream opacity-70">
                    ({promotion.application_method?.type === "percentage"
                      ? `${promotion.application_method.value}%`
                      : convertToLocale({
                          amount: +(promotion.application_method?.value || 0),
                          currency_code: promotion.application_method?.currency_code || "TRY",
                        })})
                  </span>
                </div>
                {!promotion.is_automatic && (
                  <button
                    onClick={() => promotion.code && removePromotionCode(promotion.code)}
                    className="p-1 hover:opacity-70 transition-opacity"
                    style={{ color: "#c9a84c" }}
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode

"use client"

import { clx } from "@modules/common/components/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  const textColor = type === "preview" ? "#f5f0e8" : "#1e2b20"
  const subTextColor = type === "preview" ? "rgba(245,240,232,0.7)" : "#6b7b6c"

  return (
    <div 
      className={clx("grid gap-4 items-center w-full", {
        "grid-cols-[1fr_100px_100px]": type === "full",
        "grid-cols-[1fr_auto_auto]": type === "preview",
      })} 
      data-testid="product-row"
    >
      {/* Product Image & Details */}
      <div className="flex items-center gap-x-4">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-20 md:w-24 shrink-0"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>

        <div className="flex flex-col">
          <span
            className="text-sm md:text-base font-semibold"
            style={{ color: textColor, fontFamily: "'Playfair Display', serif" }}
            data-testid="product-title"
          >
            {item.product_title}
          </span>
          <div style={{ color: subTextColor }}>
            <LineItemOptions variant={item.variant} data-testid="product-variant" />
          </div>
          {type === "full" && (
            <div className="mt-2 text-xs">
              <DeleteButton id={item.id} data-testid="product-delete-button" />
            </div>
          )}
        </div>
      </div>

      {/* Quantity Selector */}
      {type === "full" ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-x-2">
            <select
              value={item.quantity}
              onChange={(e) => changeQuantity(parseInt(e.target.value))}
              className="w-16 h-10 px-2 text-center bg-transparent border focus:outline-none transition-colors"
              style={{ borderColor: "rgba(30,43,32,0.2)", color: textColor }}
              data-testid="product-select-button"
            >
              {Array.from(
                { length: Math.min(maxQuantity, 10) },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}
            </select>
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </div>
      ) : (
        <div className="flex justify-center">
          <span className="text-sm" style={{ color: subTextColor }}>{item.quantity} Adet</span>
        </div>
      )}

      {/* Total Price */}
      <div className="flex justify-end items-center" style={{ color: textColor }}>
        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    </div>
  )
}

export default Item

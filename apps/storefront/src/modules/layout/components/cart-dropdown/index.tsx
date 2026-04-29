"use client"

import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({ cart: cartState }: { cart?: HttpTypes.StoreCart | null }) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems = cartState?.items?.reduce((acc, i) => acc + i.quantity, 0) || 0
  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => { open(); const t = setTimeout(close, 5000); setActiveTimer(t) }
  const openAndCancel = () => { if (activeTimer) clearTimeout(activeTimer); open() }

  useEffect(() => () => { if (activeTimer) clearTimeout(activeTimer) }, [activeTimer])

  const pathname = usePathname()
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) timedOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div className="h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
      <Popover className="relative h-full">
        <PopoverButton className="h-full flex items-center">
          <LocalizedClientLink
            href="/cart"
            data-testid="nav-cart-link"
            className="label-caps flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ color: "#1e2b20" }}
          >
            Sepet
            <span
              className="inline-flex items-center justify-center w-5 h-5"
              style={{
                background: totalItems > 0 ? "#1e2b20" : "transparent",
                border: `1px solid ${totalItems > 0 ? "#1e2b20" : "rgba(30,43,32,0.3)"}`,
                color: totalItems > 0 ? "#f5f0e8" : "#1e2b20",
                fontSize: "9px",
              }}
            >
              {totalItems}
            </span>
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <PopoverPanel
            static
            data-testid="nav-cart-dropdown"
            className="hidden small:block absolute top-[calc(100%+20px)] right-0 w-[400px]"
            style={{
              background: "#f5f0e8",
              border: "1px solid rgba(30,43,32,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="px-8 py-5 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(30,43,32,0.08)" }}
            >
              <p className="label-caps" style={{ color: "#1e2b20" }}>
                Sepetiniz · {totalItems} ürün
              </p>
              <button onClick={close} style={{ color: "#6b7b6c" }} className="hover:opacity-70 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
            </div>

            {cartState?.items?.length ? (
              <>
                {/* Items list */}
                <div className="max-h-[380px] overflow-y-auto no-scrollbar">
                  {cartState.items
                    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-5 px-8 py-6"
                        style={{ borderBottom: "1px solid rgba(30,43,32,0.06)" }}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink href={`/products/${item.product_handle}`} className="shrink-0">
                          <div className="w-20 h-24 overflow-hidden" style={{ background: "#ede8de" }}>
                            <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="full" />
                          </div>
                        </LocalizedClientLink>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium truncate" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }} data-testid="product-link">
                              {item.title}
                            </h4>
                            <LineItemPrice item={item} style="tight" currencyCode={cartState.currency_code} />
                          </div>
                          <LineItemOptions variant={item.variant} data-testid="cart-item-variant" data-value={item.variant} />
                          <p className="label-caps mt-1" style={{ color: "#6b7b6c", fontSize: "9px" }} data-testid="cart-item-quantity" data-value={item.quantity}>
                            Adet: {item.quantity}
                          </p>
                          <DeleteButton id={item.id} className="mt-2 label-caps hover:opacity-60 transition-opacity" data-testid="cart-item-remove-button" style={{ color: "#6b7b6c", fontSize: "9px" }}>
                            Kaldır
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-8 py-6" style={{ background: "#1e2b20" }}>
                  <div className="flex items-center justify-between mb-6">
                    <span className="label-caps" style={{ color: "rgba(245,240,232,0.6)" }}>Ara Toplam</span>
                    <span
                      className="text-xl font-medium"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({ amount: subtotal, currency_code: cartState.currency_code })}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <LocalizedClientLink href="/cart" onClick={close}>
                      <button
                        className="w-full py-3 label-caps transition-all"
                        style={{ border: "1px solid rgba(245,240,232,0.2)", color: "rgba(245,240,232,0.7)" }}
                        data-testid="go-to-cart-button"
                      >
                        Sepeti Gör
                      </button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href="/checkout" onClick={close}>
                      <button
                        className="w-full py-3 label-caps transition-all"
                        style={{ background: "#c9a84c", color: "#1e2b20" }}
                      >
                        Ödeme Yap
                      </button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-8 py-16 text-center">
                <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center" style={{ background: "#ede8de" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7b6c" strokeWidth="1.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                </div>
                <p className="text-sm font-light mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
                  Sepetiniz boş
                </p>
                <LocalizedClientLink href="/store" onClick={close}>
                  <button className="btn-outline" style={{ fontSize: "10px", padding: "10px 24px" }}>
                    Ürünleri Keşfet
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown

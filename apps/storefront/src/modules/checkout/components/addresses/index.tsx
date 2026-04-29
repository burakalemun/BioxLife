"use client"
import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import { Heading, Text, clx } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-transparent">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl gap-x-2 items-baseline font-semibold tracking-wide",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !cart?.shipping_address,
            }
          )}
          style={{ color: "#1e2b20", fontFamily: "'Playfair Display', serif" }}
        >
          Teslimat Adresi
          {!isOpen && <CheckCircleSolid color="#c9a84c" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#c9a84c" }}
              data-testid="edit-address-button"
            >
              Düzenle
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-xl gap-x-4 pb-6 pt-8 font-semibold tracking-wide"
                  style={{ color: "#1e2b20", fontFamily: "'Playfair Display', serif" }}
                >
                  Fatura Adresi
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 mt-6 uppercase tracking-[0.2em] text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: "#1e2b20", color: "#f5f0e8" }}
              data-testid="submit-address-button"
            >
              Teslimat Yöntemine Geç
            </button>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-sm">
            {cart && cart.shipping_address ? (
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex flex-col md:flex-row items-start gap-x-1 w-full gap-y-6">
                  <div
                    className="flex flex-col w-full md:w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                      Teslimat Adresi
                    </span>
                    <span className="text-sm mb-1" style={{ color: "#6b7b6c" }}>
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </span>
                    <span className="text-sm mb-1" style={{ color: "#6b7b6c" }}>
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </span>
                    <span className="text-sm mb-1" style={{ color: "#6b7b6c" }}>
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </span>
                    <span className="text-sm" style={{ color: "#6b7b6c" }}>
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </span>
                  </div>

                  <div
                    className="flex flex-col w-full md:w-1/3"
                    data-testid="shipping-contact-summary"
                  >
                    <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                      İletişim Bilgileri
                    </span>
                    <span className="text-sm mb-1" style={{ color: "#6b7b6c" }}>
                      {cart.shipping_address.phone}
                    </span>
                    <span className="text-sm" style={{ color: "#6b7b6c" }}>
                      {cart.email}
                    </span>
                  </div>

                  <div
                    className="flex flex-col w-full md:w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                      Fatura Adresi
                    </span>

                    {sameAsBilling ? (
                      <span className="text-sm" style={{ color: "#6b7b6c" }}>
                        Fatura ve teslimat adresi aynı.
                      </span>
                    ) : (
                      <>
                        <span className="text-sm mb-1" style={{ color: "#6b7b6c" }}>
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </span>
                        <span className="text-sm mb-1" style={{ color: "#6b7b6c" }}>
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </span>
                        <span className="text-sm mb-1" style={{ color: "#6b7b6c" }}>
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </span>
                        <span className="text-sm" style={{ color: "#6b7b6c" }}>
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="w-full h-px my-8" style={{ background: "rgba(30,43,32,0.15)" }} />
    </div>
  )
}

export default Addresses

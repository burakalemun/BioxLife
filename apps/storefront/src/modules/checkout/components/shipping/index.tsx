"use client"
import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { Button, clx, Heading, Text } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  // BioxLife only uses cargo delivery, so all available methods are standard shipping.
  const _shippingMethods = availableShippingMethods || []
  const _pickupMethods: HttpTypes.StoreCartShippingOption[] = []

  // Force disable pickup options since everything is shipped via cargo
  const hasPickupOptions = false

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)

        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => {
              if (p.value?.id) {
                pricesMap[p.value.id] = p.value.amount ?? 0
              }
            })

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      } else {
        setIsLoadingPrices(false)
      }

      // Auto-select the first shipping method if none is selected
      if (!shippingMethodId && _shippingMethods.length > 0) {
        handleSetShippingMethod(_shippingMethods[0].id, "shipping")
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-transparent">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl gap-x-2 items-baseline font-semibold tracking-wide",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
          style={{ color: "#1e2b20", fontFamily: "'Playfair Display', serif" }}
        >
          Teslimat
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid color="#c9a84c" />
          )}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-70"
                style={{ color: "#c9a84c" }}
                data-testid="edit-delivery-button"
              >
                Düzenle
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <>
          <div className="grid">
            <div className="flex flex-col">
              <span className="font-semibold text-sm uppercase tracking-widest mb-1" style={{ color: "#1e2b20" }}>
                Teslimat Yöntemi
              </span>
              <span className="mb-6 text-sm" style={{ color: "#6b7b6c" }}>
                Siparişinizin nasıl teslim edilmesini istersiniz?
              </span>
            </div>
            <div data-testid="delivery-options-container">
              <div className="pb-8 md:pt-0 pt-2 flex flex-col gap-y-3">
                {hasPickupOptions && (
                  <RadioGroup
                    value={showPickupOptions}
                    onChange={(_value) => {
                      const id = _pickupMethods.find(
                        (option) => !option.insufficient_inventory
                      )?.id

                      if (id) {
                        handleSetShippingMethod(id, "pickup")
                      }
                    }}
                  >
                    <Radio
                      value={PICKUP_OPTION_ON}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "flex items-center justify-between cursor-pointer py-4 px-6 border transition-all",
                        {
                          "bg-[rgba(201,168,76,0.05)]": showPickupOptions === PICKUP_OPTION_ON,
                        }
                      )}
                      style={{ borderColor: showPickupOptions === PICKUP_OPTION_ON ? "#c9a84c" : "rgba(30,43,32,0.15)" }}
                    >
                      <div className="flex items-center gap-x-4">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${showPickupOptions === PICKUP_OPTION_ON ? "border-[#c9a84c]" : "border-[#6b7b6c]"}`}>
                          {showPickupOptions === PICKUP_OPTION_ON && <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#1e2b20" }}>
                          Mağazadan teslim al
                        </span>
                      </div>
                      <span className="justify-self-end text-sm" style={{ color: "#1e2b20" }}>
                        -
                      </span>
                    </Radio>
                  </RadioGroup>
                )}
                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => {
                    if (v) {
                      return handleSetShippingMethod(v, "shipping")
                    }
                  }}
                  className="flex flex-col gap-y-3"
                >
                  {_shippingMethods.length === 0 ? (
                    <div className="p-4 border border-rose-500 bg-rose-50 text-rose-800 rounded text-sm">
                      <strong>Uyarı:</strong> Seçtiğiniz adres bölgesi (TR) için Medusa altyapısında tanımlanmış herhangi bir kargo yöntemi (Shipping Option) bulunamadı. Lütfen Admin panelinden bir kargo seçeneği ekleyin.
                    </div>
                  ) : (
                    _shippingMethods.map((option) => {
                      const isDisabled =
                        option.price_type === "calculated" &&
                        !isLoadingPrices &&
                        typeof calculatedPricesMap[option.id] !== "number"

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "flex items-center justify-between cursor-pointer py-4 px-6 border transition-all",
                          {
                            "bg-[rgba(201,168,76,0.05)]": option.id === shippingMethodId,
                            "opacity-50 cursor-not-allowed": isDisabled,
                          }
                        )}
                        style={{ borderColor: option.id === shippingMethodId ? "#c9a84c" : "rgba(30,43,32,0.15)" }}
                      >
                        <div className="flex items-center gap-x-4">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${option.id === shippingMethodId ? "border-[#c9a84c]" : "border-[#6b7b6c]"}`}>
                            {option.id === shippingMethodId && <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />}
                          </div>
                          <span className="text-sm font-medium" style={{ color: "#1e2b20" }}>
                            {option.name}
                          </span>
                        </div>
                        <span className="justify-self-end text-sm font-semibold" style={{ color: "#1e2b20" }}>
                          {option.price_type === "flat" ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <Loader />
                          ) : (
                            "-"
                          )}
                        </span>
                      </Radio>
                    )
                  }))}
                </RadioGroup>
              </div>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="grid mt-4">
              <div className="flex flex-col">
                <span className="font-semibold text-sm uppercase tracking-widest mb-1" style={{ color: "#1e2b20" }}>
                  Mağaza
                </span>
                <span className="mb-4 text-sm" style={{ color: "#6b7b6c" }}>
                  Size en yakın mağazayı seçin
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pb-8 md:pt-0 pt-2 flex flex-col gap-y-3">
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => {
                      if (v) {
                        return handleSetShippingMethod(v, "pickup")
                      }
                    }}
                  >
                    {_pickupMethods?.map((option) => {
                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          disabled={option.insufficient_inventory}
                          data-testid="delivery-option-radio"
                          className={clx(
                            "flex items-center justify-between cursor-pointer py-4 px-6 border transition-all",
                            {
                              "bg-[rgba(201,168,76,0.05)]": option.id === shippingMethodId,
                              "opacity-50 cursor-not-allowed": option.insufficient_inventory,
                            }
                          )}
                          style={{ borderColor: option.id === shippingMethodId ? "#c9a84c" : "rgba(30,43,32,0.15)" }}
                        >
                          <div className="flex items-start gap-x-4">
                            <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${option.id === shippingMethodId ? "border-[#c9a84c]" : "border-[#6b7b6c]"}`}>
                              {option.id === shippingMethodId && <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium" style={{ color: "#1e2b20" }}>
                                {option.name}
                              </span>
                              <span className="text-xs mt-1" style={{ color: "#6b7b6c" }}>
                                {formatAddress(
                                  (option as unknown as { service_zone?: { fulfillment_set?: { location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.location
                                    ?.address as HttpTypes.StoreCartAddress
                                )}
                              </span>
                            </div>
                          </div>
                          <span className="justify-self-end text-sm font-semibold" style={{ color: "#1e2b20" }}>
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })}
                          </span>
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !cart.shipping_methods?.[0]}
              data-testid="submit-delivery-option-button"
              className="w-full py-4 mt-2 uppercase tracking-[0.2em] text-xs font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "#1e2b20", color: "#f5f0e8" }}
            >
              {isLoading ? "YÜKLENİYOR..." : "ÖDEME ADIMINA GEÇ"}
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="text-sm">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col w-full md:w-1/3">
                <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                  Yöntem
                </span>
                <span className="text-sm" style={{ color: "#6b7b6c" }}>
                  {cart.shipping_methods!.at(-1)!.name}{" "}
                  ({convertToLocale({
                    amount: cart.shipping_methods!.at(-1)!.amount!,
                    currency_code: cart?.currency_code,
                  })})
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="w-full h-px my-8" style={{ background: "rgba(30,43,32,0.15)" }} />
    </div>
  )
}

export default Shipping

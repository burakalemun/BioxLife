"use client"
import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import Divider from "@modules/common/components/divider"
import {
  Button,
  Container,
  Heading,
  Text,
  clx,
} from "@modules/common/components/ui"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  const paymentReady =
    (activeSession && (cart?.shipping_methods?.length ?? 0) !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
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
                !isOpen && !paymentReady,
            }
          )}
          style={{ color: "#1e2b20", fontFamily: "'Playfair Display', serif" }}
        >
          Ödeme
          {!isOpen && paymentReady && <CheckCircleSolid color="#c9a84c" />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#c9a84c" }}
              data-testid="edit-payment-button"
            >
              Düzenle
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <div className="flex flex-col gap-y-3">
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
                className="flex flex-col gap-y-3"
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id} className="border p-4 transition-colors" style={{ borderColor: selectedPaymentMethod === paymentMethod.id ? "#c9a84c" : "rgba(30,43,32,0.15)", background: selectedPaymentMethod === paymentMethod.id ? "rgba(201,168,76,0.05)" : "transparent" }}>
                    {isStripeLike(paymentMethod.id) ? (
                      <StripeCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                Ödeme Yöntemi
              </span>
              <span
                className="text-sm"
                style={{ color: "#6b7b6c" }}
                data-testid="payment-method-summary"
              >
                Hediye kartı
              </span>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
            className="w-full py-4 mt-6 uppercase tracking-[0.2em] text-xs font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "#1e2b20", color: "#f5f0e8" }}
          >
            {isLoading
              ? "YÜKLENİYOR..."
              : !activeSession && isStripeLike(selectedPaymentMethod)
              ? "KART BİLGİLERİNİ GİRİN"
              : "SİPARİŞİ GÖZDEN GEÇİR"}
          </button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex flex-col md:flex-row items-start gap-8 w-full">
              <div className="flex flex-col w-full md:w-1/3">
                <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                  Ödeme Yöntemi
                </span>
                <span
                  className="text-sm"
                  style={{ color: "#6b7b6c" }}
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id}
                </span>
              </div>
              <div className="flex flex-col w-full md:w-1/3">
                <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                  Ödeme Detayları
                </span>
                <div
                  className="flex gap-2 text-sm items-center"
                  style={{ color: "#6b7b6c" }}
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-transparent border border-gray-200">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <span>
                    {isStripeLike(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Bir sonraki adımda görünecek"}
                  </span>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <span className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: "#1e2b20" }}>
                Ödeme Yöntemi
              </span>
              <span
                className="text-sm"
                style={{ color: "#6b7b6c" }}
                data-testid="payment-method-summary"
              >
                Hediye kartı
              </span>
            </div>
          ) : null}
        </div>
      </div>
      
      <div className="w-full h-px my-8" style={{ background: "rgba(30,43,32,0.15)" }} />
    </div>
  )
}

export default Payment

import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Güvenli Ödeme | BioxLife",
}

export default async function Checkout() {
  const cart = await retrieveCart()
  if (!cart) return notFound()

  const customer = await retrieveCustomer()

  return (
    <div className="min-h-screen pt-16" style={{ background: "#f5f0e8" }}>
      {/* Header */}
      <div className="py-16 text-center" style={{ background: "#1e2b20" }}>
        <p className="label-caps mb-3" style={{ color: "#c9a84c" }}>Güvenli Ödeme</p>
        <h1
          className="text-4xl md:text-5xl font-medium text-cream"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Siparişi Tamamla
        </h1>
        {/* Step indicator */}
        <div className="flex justify-center items-center gap-6 mt-8">
          {["Teslimat", "Ödeme", "Onay"].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className="w-7 h-7 flex items-center justify-center"
                style={{
                  background: i === 0 ? "#c9a84c" : "rgba(245,240,232,0.12)",
                  border: `1px solid ${i === 0 ? "#c9a84c" : "rgba(245,240,232,0.2)"}`,
                }}
              >
                <span className="label-caps" style={{ color: i === 0 ? "#1e2b20" : "rgba(245,240,232,0.4)", fontSize: "9px" }}>
                  {i + 1}
                </span>
              </div>
              <span className="label-caps hidden small:block" style={{ color: i === 0 ? "#f5f0e8" : "rgba(245,240,232,0.3)", fontSize: "9px" }}>
                {s}
              </span>
              {i < 2 && <div className="w-8 h-px hidden small:block" style={{ background: "rgba(245,240,232,0.15)" }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="content-container py-16">
        <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-16">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>

          <aside className="relative">
            <div className="sticky top-24">
              <div className="p-8" style={{ background: "#1e2b20" }}>
                <p className="label-caps mb-8 pb-6" style={{ color: "#c9a84c", borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
                  Sipariş Özeti
                </p>
                <CheckoutSummary cart={cart} />
              </div>
              <div className="mt-4 px-2">
                <p className="text-xs font-light" style={{ color: "#6b7b6c" }}>
                  🔒 Tüm ödemeler 256-bit SSL şifrelemesiyle korunmaktadır.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

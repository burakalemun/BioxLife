import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#f5f0e8" }}>
      {/* Header strip */}
      <div
        className="py-16 text-center"
        style={{ background: "#1e2b20" }}
      >
        <p className="label-caps mb-3" style={{ color: "#c9a84c" }}>Alışveriş</p>
        <h1
          className="text-4xl md:text-5xl font-medium text-cream"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sepetiniz
        </h1>
      </div>

      <div className="content-container py-16" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-16">
            {/* Items */}
            <div>
              {!customer && (
                <div
                  className="mb-8 p-6"
                  style={{ background: "#ede8de", border: "1px solid rgba(30,43,32,0.08)" }}
                >
                  <SignInPrompt />
                </div>
              )}
              <div
                className="pb-6 mb-8"
                style={{ borderBottom: "1px solid rgba(30,43,32,0.1)" }}
              >
                <p className="label-caps" style={{ color: "#6b7b6c" }}>
                  {cart.items.length} Ürün
                </p>
              </div>
              <ItemsTemplate cart={cart} />
            </div>

            {/* Summary */}
            <div className="relative">
              <div className="sticky top-24">
                <div
                  className="p-8"
                  style={{ background: "#1e2b20" }}
                >
                  <p className="label-caps mb-8 pb-6" style={{ color: "#c9a84c", borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
                    Sipariş Özeti
                  </p>
                  <Summary cart={cart} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate

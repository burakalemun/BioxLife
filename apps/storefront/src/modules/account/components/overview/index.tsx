import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const completion = getProfileCompletion(customer)

  return (
    <div data-testid="overview-page-wrapper">
      {/* Welcome */}
      <div className="mb-12">
        <p className="label-caps mb-2" style={{ color: "#c9a84c" }}>Genel Bakış</p>
        <h2
          className="text-3xl font-medium"
          style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
          data-testid="welcome-message"
          data-value={customer?.first_name}
        >
          Merhaba, {customer?.first_name}
        </h2>
        <p className="text-sm font-light mt-2" style={{ color: "#6b7b6c" }}>
          {customer?.email}
        </p>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-2 gap-px mb-12"
        style={{ background: "rgba(30,43,32,0.08)" }}
      >
        <div className="p-8" style={{ background: "#f5f0e8" }}>
          <p className="label-caps mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>Profil Tamamlama</p>
          <p
            className="text-4xl font-light"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
            data-testid="customer-profile-completion"
            data-value={completion}
          >
            {completion}%
          </p>
        </div>
        <div className="p-8" style={{ background: "#f5f0e8" }}>
          <p className="label-caps mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>Kayıtlı Adres</p>
          <p
            className="text-4xl font-light"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
            data-testid="addresses-count"
            data-value={customer?.addresses?.length || 0}
          >
            {customer?.addresses?.length || 0}
          </p>
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="label-caps" style={{ color: "#1e2b20" }}>Son Siparişler</p>
          <LocalizedClientLink
            href="/account/orders"
            className="label-caps hover:opacity-60 transition-opacity"
            style={{ color: "#c9a84c", fontSize: "9px" }}
          >
            Tümünü Gör →
          </LocalizedClientLink>
        </div>

        <ul className="flex flex-col gap-px" data-testid="orders-wrapper" style={{ background: "rgba(30,43,32,0.08)" }}>
          {orders && orders.length > 0 ? (
            orders.slice(0, 5).map((order) => (
              <li
                key={order.id}
                data-testid="order-wrapper"
                data-value={order.id}
              >
                <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                  <div
                    className="grid grid-cols-3 gap-4 p-6 transition-colors"
                    style={{ background: "#f5f0e8" }}
                    data-testid="open-order-button"
                  >
                    <div>
                      <p className="label-caps mb-1" style={{ color: "#6b7b6c", fontSize: "9px" }}>Tarih</p>
                      <p className="text-sm" style={{ color: "#1e2b20" }} data-testid="order-created-date">
                        {new Date(order.created_at).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <div>
                      <p className="label-caps mb-1" style={{ color: "#6b7b6c", fontSize: "9px" }}>Sipariş No</p>
                      <p className="text-sm font-medium" style={{ color: "#1e2b20" }} data-testid="order-id" data-value={order.display_id}>
                        #{order.display_id}
                      </p>
                    </div>
                    <div>
                      <p className="label-caps mb-1" style={{ color: "#6b7b6c", fontSize: "9px" }}>Tutar</p>
                      <p className="text-sm font-medium" style={{ color: "#c9a84c" }} data-testid="order-amount">
                        {convertToLocale({ amount: order.total, currency_code: order.currency_code })}
                      </p>
                    </div>
                  </div>
                </LocalizedClientLink>
              </li>
            ))
          ) : (
            <li className="p-8 text-center" style={{ background: "#f5f0e8" }}>
              <p
                className="text-lg font-light mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
                data-testid="no-orders-message"
              >
                Henüz sipariş vermediniz
              </p>
              <LocalizedClientLink href="/store">
                <button
                  className="btn-outline inline-flex"
                  style={{ fontSize: "10px", padding: "10px 24px" }}
                >
                  Alışverişe Başla
                </button>
              </LocalizedClientLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  if (!customer) return 0
  let count = 0
  if (customer.email) count++
  if (customer.first_name && customer.last_name) count++
  if (customer.phone) count++
  if (customer.addresses?.find((a) => a.is_default_billing)) count++
  return Math.round((count / 4) * 100)
}

export default Overview

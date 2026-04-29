import React from "react"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ customer, children }) => {
  if (!customer) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: "#f5f0e8" }} data-testid="account-page">
      {/* Header */}
      <div className="py-16 md:py-20" style={{ background: "#1e2b20" }}>
        <div className="content-container">
          <p className="label-caps mb-3" style={{ color: "#c9a84c" }}>Hesabınız</p>
          <h1
            className="text-4xl md:text-5xl font-medium"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
          >
            Hoş Geldiniz
            {customer?.first_name && (
              <em className="font-normal italic" style={{ color: "#c9a84c" }}>
                , {customer.first_name}
              </em>
            )}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="content-container py-12 md:py-20">
        <div className="grid grid-cols-1 small:grid-cols-[220px_1fr] gap-12 md:gap-16">
          {/* Sidebar */}
          <aside>
            <div className="sticky top-24">
              <p
                className="label-caps mb-6 pb-4"
                style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.1)" }}
              >
                Menü
              </p>
              {customer && <AccountNav customer={customer} />}
            </div>
          </aside>

          {/* Main content */}
          <main>{children}</main>
        </div>

        {/* Support */}
        <div
          className="mt-20 p-12 grid grid-cols-1 small:grid-cols-2 gap-8 items-center"
          style={{ background: "#1e2b20" }}
        >
          <div>
            <p className="label-caps mb-3" style={{ color: "#c9a84c" }}>Yardım</p>
            <h3
              className="text-2xl font-medium text-cream"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Size nasıl yardımcı olabiliriz?
            </h3>
            <p className="text-sm font-light mt-3" style={{ color: "rgba(245,240,232,0.5)" }}>
              Uzman ekibimiz sorularınızı yanıtlamak için burada.
            </p>
          </div>
          <div className="flex justify-start small:justify-end">
            <LocalizedClientLink href="/contact">
              <button
                className="inline-flex items-center gap-2 label-caps px-8 py-4 transition-all"
                style={{ background: "#c9a84c", color: "#1e2b20" }}
              >
                Destek Alın
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout

"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"
import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

const navLinks = [
  { href: "/account", label: "Genel Bakış", testId: "overview-link" },
  { href: "/account/profile", label: "Profil", testId: "profile-link" },
  { href: "/account/favorites", label: "Favorilerim", testId: "favorites-link" },
  { href: "/account/addresses", label: "Adresler", testId: "addresses-link" },
  { href: "/account/orders", label: "Siparişler", testId: "orders-link" },
]

const AccountNav = ({ customer }: { customer: HttpTypes.StoreCustomer | null }) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const getActive = (href: string) =>
    route.split(countryCode)[1] === href

  return (
    <div>
      {/* Mobile nav */}
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-2 py-3 label-caps"
            style={{ color: "#1e2b20" }}
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90 w-4 h-4" />
            Hesabım
          </LocalizedClientLink>
        ) : (
          <ul className="flex flex-col">
            {navLinks.map(({ href, label, testId }) => (
              <li key={href}>
                <LocalizedClientLink
                  href={href}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: "1px solid rgba(30,43,32,0.08)", color: "#1e2b20" }}
                  data-testid={testId}
                >
                  <span className="label-caps">{label}</span>
                  <ChevronDown className="transform -rotate-90 w-4 h-4" style={{ color: "#6b7b6c" }} />
                </LocalizedClientLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="flex items-center justify-between w-full py-4 label-caps"
                style={{ borderBottom: "1px solid rgba(30,43,32,0.08)", color: "#6b7b6c" }}
                onClick={handleLogout}
                data-testid="logout-button"
              >
                <span>Çıkış Yap</span>
                <ArrowRightOnRectangle />
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Desktop nav */}
      <div className="hidden small:block" data-testid="account-nav">
        <ul className="flex flex-col gap-1">
          {navLinks.map(({ href, label, testId }) => {
            const active = getActive(href)
            return (
              <li key={href}>
                <LocalizedClientLink
                  href={href}
                  data-testid={testId}
                  className="flex items-center justify-between py-3 group transition-opacity"
                  style={{
                    borderBottom: "1px solid rgba(30,43,32,0.06)",
                    opacity: active ? 1 : 0.6,
                  }}
                >
                  <span
                    className="label-caps"
                    style={{
                      color: active ? "#c9a84c" : "#1e2b20",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {label}
                  </span>
                  {active && (
                    <div className="w-4 h-px" style={{ background: "#c9a84c" }} />
                  )}
                </LocalizedClientLink>
              </li>
            )
          })}
          <li className="pt-6">
            <button
              type="button"
              onClick={handleLogout}
              data-testid="logout-button"
              className="label-caps flex items-center gap-2 hover:opacity-50 transition-opacity"
              style={{ color: "#6b7b6c" }}
            >
              <ArrowRightOnRectangle size={14} />
              Çıkış Yap
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AccountNav

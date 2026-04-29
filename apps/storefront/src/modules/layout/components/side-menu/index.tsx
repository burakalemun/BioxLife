"use client"

import useToggleState from "@lib/hooks/use-toggle-state"
import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Locale } from "@lib/data/locales"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { useState, useEffect } from "react"

const menuLinks = [
  { label: "Mağaza", href: "/store" },
  { label: "Hikayemiz", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "İletişim", href: "/contact" },
  { label: "SSS", href: "/faq" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()
  const [open, setOpen] = useState(false)

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  return (
    <>
      {/* Trigger */}
      <button
        data-testid="nav-menu-button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2"
        aria-label="Menüyü aç"
        aria-expanded={open}
      >
        <div className="flex flex-col gap-[5px]">
          <span className="block h-px w-5" style={{ background: "#1e2b20" }} />
          <span className="block h-px w-3" style={{ background: "#1e2b20", marginLeft: "auto" }} />
          <span className="block h-px w-5" style={{ background: "#1e2b20" }} />
        </div>
        <span
          className="text-[10px] uppercase tracking-[0.15em] font-medium hidden small:block"
          style={{ color: "#1e2b20" }}
        >
          Menü
        </span>
      </button>

      {/* Portal-style fixed overlay — rendered at this level but uses fixed positioning */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0"
            style={{
              zIndex: 9998,
              background: "rgba(30,43,32,0.35)",
              backdropFilter: "blur(2px)",
            }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            data-testid="side-menu-backdrop"
          />

          {/* Drawer */}
          <div
            data-testid="nav-menu-popup"
            className="fixed top-0 left-0 h-screen flex flex-col"
            style={{
              zIndex: 9999,
              width: "min(400px, 88vw)",
              background: "#f5f0e8",
              borderRight: "1px solid rgba(30,43,32,0.1)",
              boxShadow: "16px 0 56px rgba(30,43,32,0.2)",
              animation: "slideInLeft 0.3s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-10 py-7 shrink-0"
              style={{ borderBottom: "1px solid rgba(30,43,32,0.08)" }}
            >
              <span
                className="text-lg uppercase tracking-[0.25em] font-medium"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
              >
                BioxLife
              </span>
              <button
                onClick={() => setOpen(false)}
                data-testid="close-menu-button"
                className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-50"
                style={{ color: "#1e2b20" }}
                aria-label="Menüyü kapat"
              >
                <XMark />
              </button>
            </div>

            {/* Nav links — scrollable middle section */}
            <nav className="flex-1 overflow-y-auto px-10 py-10">
              <ul>
                {menuLinks.map(({ label, href }) => (
                  <li key={href}>
                    <LocalizedClientLink
                      href={href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-6 transition-opacity hover:opacity-40"
                      style={{ borderBottom: "1px solid rgba(30,43,32,0.07)" }}
                    >
                      <span
                        className="text-2xl font-medium"
                        style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0"
                        style={{ color: "#c9a84c" }}
                      >
                        →
                      </span>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>

              {/* Secondary links */}
              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(30,43,32,0.07)" }}>
                <p className="mb-5 text-[9px] uppercase tracking-[0.2em]" style={{ color: "#6b7b6c" }}>
                  Hesap
                </p>
                <ul className="space-y-5">
                  {[
                    { label: "Hesabım", href: "/account" },
                    { label: "Siparişlerim", href: "/account/orders" },
                    { label: "Sepet", href: "/cart" },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <LocalizedClientLink
                        href={href}
                        onClick={() => setOpen(false)}
                        className="text-sm font-light hover:opacity-50 transition-opacity"
                        style={{ color: "#1e2b20" }}
                      >
                        {label}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Footer */}
            <div
              className="shrink-0 px-10 py-7 space-y-4"
              style={{ borderTop: "1px solid rgba(30,43,32,0.08)", background: "#ede8de" }}
            >
              {!!locales?.length && (
                <div onMouseEnter={languageToggleState.open} onMouseLeave={languageToggleState.close}>
                  <LanguageSelect
                    toggleState={languageToggleState}
                    locales={locales}
                    currentLocale={currentLocale}
                  />
                </div>
              )}
              {regions && (
                <div onMouseEnter={countryToggleState.open} onMouseLeave={countryToggleState.close}>
                  <CountrySelect toggleState={countryToggleState} regions={regions} />
                </div>
              )}
              <p className="text-[9px] uppercase tracking-widest" style={{ color: "#6b7b6c" }}>
                © {new Date().getFullYear()} BioxLife
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SideMenu

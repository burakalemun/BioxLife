import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Promo bar */}
      <div className="py-2 text-center label-caps text-[9px] tracking-widest" style={{ background: "#1e2b20", color: "#c9a84c" }}>
        <span className="hidden small:inline">✦ &nbsp; 500₺ ÜZERİ ÜCRETSIZ KARGO &nbsp; ✦ &nbsp; %100 DOĞAL & SERTİFİKALI ORGANİK &nbsp; ✦ &nbsp; 1–3 İŞ GÜNÜNDE TESLİMAT &nbsp; ✦</span>
        <span className="small:hidden">✦ &nbsp; 500₺ ÜZERİ ÜCRETSIZ KARGO &nbsp; ✦ &nbsp; DOĞAL & ORGANİK</span>
      </div>
      {/* Main nav */}
      <nav
        className="h-16"
        style={{ background: "rgba(245,240,232,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(30,43,32,0.08)" }}
      >
      <div className="content-container h-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-8">
          <div className="small:hidden">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>
          <div className="hidden small:flex items-center gap-8">
            <LocalizedClientLink
              href="/store"
              className="label-caps text-[#1e2b20]/70 hover:text-[#1e2b20] transition-colors"
            >
              Mağaza
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/about"
              className="label-caps text-[#1e2b20]/70 hover:text-[#1e2b20] transition-colors"
            >
              Hikayemiz
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/journal"
              className="label-caps text-[#1e2b20]/70 hover:text-[#1e2b20] transition-colors"
            >
              Journal
            </LocalizedClientLink>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <LocalizedClientLink
            href="/"
            data-testid="nav-store-link"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.25em" }}
            className="text-lg font-medium text-[#1e2b20] hover:text-[#c9a84c] transition-colors uppercase"
          >
            BioxLife
          </LocalizedClientLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <LocalizedClientLink
            href="/account"
            data-testid="nav-account-link"
            className="label-caps text-[#1e2b20]/70 hover:text-[#1e2b20] transition-colors hidden small:block"
          >
            Hesap
          </LocalizedClientLink>
          <Suspense fallback={
            <LocalizedClientLink href="/cart" data-testid="nav-cart-link" className="label-caps text-[#1e2b20]/70">
              Sepet (0)
            </LocalizedClientLink>
          }>
            <CartButton />
          </Suspense>
        </div>
      </div>
      </nav>
    </header>
  )
}

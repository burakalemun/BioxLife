import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative small:min-h-screen" style={{ background: "#f5f0e8" }}>
      <div className="h-20" style={{ background: "#1e2b20", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 flex-1 basis-0 transition-opacity hover:opacity-70"
            style={{ color: "#c9a84c" }}
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block text-xs tracking-[0.1em] uppercase font-semibold">
              Sepete Dön
            </span>
            <span className="mt-px block small:hidden text-xs tracking-[0.1em] uppercase font-semibold">
              Geri
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-xl md:text-2xl font-semibold tracking-wider text-cream"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="store-link"
          >
            BIOXLIFE
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
    </div>
  )
}

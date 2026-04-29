import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  const topCategories = productCategories
    ?.filter((c: any) => !c.parent_category)
    .slice(0, 6) || []

  const topCollections = collections?.slice(0, 5) || []

  return (
    <footer style={{ background: "#1e2b20" }}>

      {/* Main footer grid */}
      <div className="content-container py-16 md:py-20">
        <div className="grid grid-cols-1 small:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">

          {/* Brand column */}
          <div>
            <LocalizedClientLink href="/">
              <span
                className="text-lg uppercase tracking-[0.25em] font-medium block mb-5"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
              >
                BioxLife
              </span>
            </LocalizedClientLink>
            <p className="text-sm font-light leading-relaxed mb-8" style={{ color: "rgba(245,240,232,0.45)" }}>
              Geleneksel aktar bilgeliğini modern saflıkla buluşturuyoruz. Tarladan şişeye, her damlada doğanın özü.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                { label: "Instagram", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
                { label: "X", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M20 4 4 20"/></svg> },
                { label: "Pinterest", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="17" y2="22"/><path d="M12 17a5 5 0 0 0 5-5c0-2.76-2.24-5-5-5a5 5 0 0 0-3 9"/><circle cx="12" cy="12" r="10"/></svg> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  style={{ border: "1px solid rgba(245,240,232,0.12)", color: "rgba(245,240,232,0.5)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <p className="label-caps text-[10px] mb-5 pb-3" style={{ color: "#c9a84c", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
              Kategoriler
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-sm font-light transition-colors hover:text-[#c9a84c]"
                  style={{ color: "rgba(245,240,232,0.55)" }}
                >
                  Tüm Ürünler
                </LocalizedClientLink>
              </li>
              {topCategories.map((c: any) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    href={`/store?category_id=${c.id}`}
                    className="text-sm font-light transition-colors hover:text-[#c9a84c]"
                    style={{ color: "rgba(245,240,232,0.55)" }}
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Koleksiyonlar */}
          <div>
            <p className="label-caps text-[10px] mb-5 pb-3" style={{ color: "#c9a84c", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
              Koleksiyonlar
            </p>
            <ul className="flex flex-col gap-3">
              {topCollections.length > 0 ? (
                topCollections.map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/collections/${c.handle}`}
                      className="text-sm font-light transition-colors hover:text-[#c9a84c]"
                      style={{ color: "rgba(245,240,232,0.55)" }}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))
              ) : (
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="text-sm font-light transition-colors hover:text-[#c9a84c]"
                    style={{ color: "rgba(245,240,232,0.55)" }}
                  >
                    Koleksiyonu Keşfet
                  </LocalizedClientLink>
                </li>
              )}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <p className="label-caps text-[10px] mb-5 pb-3" style={{ color: "#c9a84c", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
              BioxLife
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Hikayemiz", href: "/about" },
                { label: "Journal", href: "/journal" },
                { label: "İletişim", href: "/contact" },
                { label: "SSS", href: "/faq" },
                { label: "Hesabım", href: "/account" },
                { label: "Siparişlerim", href: "/account/orders" },
              ].map((link) => (
                <li key={link.href}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-sm font-light transition-colors hover:text-[#c9a84c]"
                    style={{ color: "rgba(245,240,232,0.55)" }}
                  >
                    {link.label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Certifications bar */}
      <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div className="content-container py-5">
          <div className="flex flex-col small:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {["%100 Vegan", "Cruelty Free", "GC/MS Onaylı", "Doğal İçerik"].map((cert) => (
                <span key={cert} className="flex items-center gap-1.5 label-caps text-[9px]" style={{ color: "rgba(245,240,232,0.3)" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                  {cert}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {/* Payment icons */}
              {["VISA", "MC", "AMEX", "iyzico"].map((p) => (
                <span
                  key={p}
                  className="px-2 py-1 text-[8px] font-bold tracking-wider rounded"
                  style={{ background: "rgba(245,240,232,0.06)", color: "rgba(245,240,232,0.35)", border: "1px solid rgba(245,240,232,0.08)" }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div className="content-container py-5">
          <div className="flex flex-col small:flex-row items-center justify-between gap-3">
            <p className="text-[10px] font-light" style={{ color: "rgba(245,240,232,0.25)" }}>
              © {new Date().getFullYear()} BioxLife. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: "Gizlilik Politikası", href: "/privacy" },
                { label: "Kullanım Koşulları", href: "/terms" },
                { label: "KVKK", href: "/kvkk" },
              ].map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="text-[10px] font-light transition-colors hover:text-[#c9a84c]"
                  style={{ color: "rgba(245,240,232,0.25)" }}
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

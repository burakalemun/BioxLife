import { Metadata } from "next"
import { Suspense } from "react"
import Hero from "@modules/home/components/hero"
import FeaturedProducts from "@modules/home/components/featured-products"
import AllProductsRail from "@modules/home/components/all-products-rail"
import EditorialStorytelling from "@modules/home/components/editorial-storytelling"
import TestimonialsSection from "@modules/home/components/testimonials"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"

export const metadata: Metadata = {
  title: "BioxLife | Doğanın Özü, Yaşamın Kokusu",
  description: "BioxLife ile saf, doğal ve lüks koku deneyimini keşfedin. Geleneksel aktar bilgeliğini modern lüksle buluşturuyoruz.",
}

// ─── Trust Bar (hero'nun hemen altına) ──────────────────────────────────────
function TrustBar() {
  const items = [
    { stat: "%100", label: "Doğal İçerik" },
    { stat: "GC/MS", label: "Lab Onaylı" },
    { stat: "4.9★", label: "Müşteri Puanı" },
    { stat: "1–3 Gün", label: "Hızlı Teslimat" },
  ]
  return (
    <div className="border-b border-t" style={{ background: "#f5f0e8", borderColor: "rgba(30,43,32,0.08)" }}>
      <div className="content-container">
        <div className="grid grid-cols-2 small:grid-cols-4 divide-x" style={{ divideColor: "rgba(30,43,32,0.08)" }}>
          {items.map((item) => (
            <div key={item.label} className="py-4 px-6 text-center border-r" style={{ borderColor: "rgba(30,43,32,0.08)" }}>
              <p className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>{item.stat}</p>
              <p className="label-caps text-[9px] mt-0.5" style={{ color: "#6b7b6c" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Category Strip (gerçek kategoriler) ────────────────────────────────────
function CategoryStrip({ categories }: { categories: HttpTypes.StoreProductCategory[] }) {
  const topLevel = categories.filter((c) => !c.parent_category_id).slice(0, 8)
  if (!topLevel.length) return null

  return (
    <div style={{ background: "#ede8de", borderBottom: "1px solid rgba(30,43,32,0.08)" }}>
      <div className="content-container">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          <LocalizedClientLink
            href="/store"
            className="shrink-0 px-5 py-3.5 label-caps text-[10px] border-r transition-all hover:text-[#c9a84c] whitespace-nowrap"
            style={{ color: "#1e2b20", borderColor: "rgba(30,43,32,0.1)" }}
          >
            Tümü
          </LocalizedClientLink>
          {topLevel.map((cat) => (
            <LocalizedClientLink
              key={cat.id}
              href={`/store?category_id=${cat.id}`}
              className="shrink-0 px-5 py-3.5 label-caps text-[10px] border-r transition-all hover:text-[#c9a84c] whitespace-nowrap"
              style={{ color: "#1e2b20", borderColor: "rgba(30,43,32,0.1)" }}
            >
              {cat.name}
            </LocalizedClientLink>
          ))}
          <LocalizedClientLink
            href="/store"
            className="shrink-0 ml-auto px-5 py-3.5 label-caps text-[10px] transition-all hover:text-[#c9a84c] whitespace-nowrap"
            style={{ color: "#c9a84c" }}
          >
            Tüm Koleksiyon →
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

// ─── Best Sellers ────────────────────────────────────────────────────────────
async function BestSellersSection({ region }: { region: HttpTypes.StoreRegion }) {
  const { response: { products } } = await listProducts({
    regionId: region.id,
    queryParams: { limit: 4, fields: "*variants.calculated_price" },
  })
  if (!products?.length) return null

  return (
    <section className="py-16 md:py-24" style={{ background: "#f5f0e8" }}>
      <div className="content-container">
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-5 h-px" style={{ background: "#c9a84c" }} />
              <span className="label-caps text-[9px]" style={{ color: "#c9a84c" }}>Öne Çıkanlar</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
              En Çok Sevilenler
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="hidden small:inline-flex items-center gap-2 text-[10px] label-caps pb-px"
            style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.3)" }}
          >
            Tümünü Gör <span>→</span>
          </LocalizedClientLink>
        </div>

        <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-5 gap-y-12">
          {products.map((p, i) => (
            <li key={p.id} className="relative">
              {i === 0 && (
                <div className="absolute top-3 left-3 z-10 px-2 py-0.5 label-caps text-[9px]" style={{ background: "#c9a84c", color: "#1e2b20" }}>
                  #1 SATICI
                </div>
              )}
              <ProductPreview product={p} region={region} isFeatured />
            </li>
          ))}
        </ul>

        <div className="mt-10 small:hidden">
          <LocalizedClientLink href="/store" className="w-full block py-4 text-center label-caps text-xs" style={{ background: "#1e2b20", color: "#f5f0e8" }}>
            TÜM ÜRÜNLERE BAK
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

// ─── Mid-page CTA Banner ─────────────────────────────────────────────────────
function MidCTABanner() {
  return (
    <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#1e2b20" }}>
      <img
        src="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=2000&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      />
      <div className="content-container relative z-10 text-center max-w-2xl mx-auto">
        <p className="label-caps mb-4 text-[10px]" style={{ color: "#c9a84c" }}>Özel Fırsat</p>
        <h2 className="text-3xl md:text-5xl font-medium mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}>
          İlk Siparişinde <em style={{ color: "#c9a84c" }}>%10 İndirim</em>
        </h2>
        <p className="text-sm font-light mb-8" style={{ color: "rgba(245,240,232,0.55)" }}>
          E-posta listemize katıl, doğal yaşam ipuçları ve özel fırsatları kaçırma.
        </p>
        <form className="flex flex-col xsmall:flex-row gap-0 max-w-md mx-auto">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            className="flex-1 px-5 py-3.5 text-sm outline-none"
            style={{ background: "rgba(245,240,232,0.08)", border: "1px solid rgba(245,240,232,0.15)", color: "#f5f0e8" }}
          />
          <button
            type="submit"
            className="px-7 py-3.5 label-caps text-xs shrink-0"
            style={{ background: "#c9a84c", color: "#1e2b20" }}
          >
            Üye Ol
          </button>
        </form>
        <p className="mt-3 text-[9px] label-caps" style={{ color: "rgba(245,240,232,0.25)" }}>Spam yok. İstediğin zaman çıkabilirsin.</p>
      </div>
    </div>
  )
}

// ─── Values Strip ────────────────────────────────────────────────────────────
function ValuesStrip() {
  const values = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
      title: "%100 Doğal", sub: "Sertifikalı organik içerikler"
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>,
      title: "Lab Onaylı", sub: "Her üründe GC/MS raporu"
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
      title: "Hızlı Teslimat", sub: "1–3 iş günü kargo"
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: "Güvenli Ödeme", sub: "256-bit SSL şifreleme"
    },
  ]
  return (
    <section className="py-10" style={{ background: "#ede8de", borderTop: "1px solid rgba(30,43,32,0.08)" }}>
      <div className="content-container">
        <div className="grid grid-cols-2 small:grid-cols-4 divide-x" style={{ divideColor: "rgba(30,43,32,0.08)" }}>
          {values.map((v) => (
            <div key={v.title} className="flex items-center gap-4 px-6 py-4 border-r" style={{ borderColor: "rgba(30,43,32,0.08)" }}>
              <div className="shrink-0 p-2.5 rounded-full border" style={{ borderColor: "rgba(201,168,76,0.35)" }}>
                {v.icon}
              </div>
              <div>
                <p className="label-caps text-[10px] mb-0.5" style={{ color: "#1e2b20" }}>{v.title}</p>
                <p className="text-[10px] font-light" style={{ color: "#6b7b6c" }}>{v.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function Home(props: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)
  const { collections } = await listCollections({ fields: "id, handle, title" })
  const categories = await listCategories()

  if (!region) {
    return (
      <div className="h-screen flex flex-col items-center justify-center" style={{ background: "#f5f0e8" }}>
        <h1 className="text-2xl font-serif mb-2" style={{ color: "#1e2b20" }}>Bölge Ayarları Eksik</h1>
        <p style={{ color: "#6b7b6c" }}>Medusa Admin panelinde &quot;tr&quot; kodlu bir Region oluşturun.</p>
      </div>
    )
  }

  const validCollections = collections || []

  return (
    <>
      {/* 1. Hero – kompakt, güçlü CTA */}
      <Hero />

      {/* 3. Trust bar – hero altında anında güven sinyalleri */}
      <TrustBar />

      {/* 4. Kategori şeridi – gerçek veriden */}
      <CategoryStrip categories={categories} />

      {/* 5. En Çok Sevilenler – ilk ürünler ekranda hemen görünür */}
      <Suspense fallback={
        <section className="py-16" style={{ background: "#f5f0e8" }}>
          <div className="content-container">
            <div className="grid grid-cols-2 small:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] mb-4" style={{ background: "rgba(30,43,32,0.07)" }} />
                  <div className="h-3 mb-2 w-3/4" style={{ background: "rgba(30,43,32,0.07)" }} />
                  <div className="h-3 w-1/2" style={{ background: "rgba(30,43,32,0.07)" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      }>
        <BestSellersSection region={region} />
      </Suspense>

      {/* 6. Koleksiyon reyonları */}
      {validCollections.map((collection) => (
        <FeaturedProducts key={collection.id} collections={[collection]} region={region} />
      ))}

      {/* 7. Mid-page CTA + Newsletter (indirim teklifi) */}
      <MidCTABanner />

      {/* 8. Tüm ürünler grid */}
      <AllProductsRail region={region} />

      {/* 9. Müşteri yorumları – sosyal kanıt */}
      <TestimonialsSection />

      {/* 10. Marka hikayesi – en alta, meraklı ziyaretçi için */}
      <EditorialStorytelling />

      {/* 11. Values strip */}
      <ValuesStrip />
    </>
  )
}

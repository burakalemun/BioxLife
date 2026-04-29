import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "BioxLife Journal",
  description: "Doğal yaşam, aromaterapi ve wellness üzerine ilham verici içerikler.",
}

const posts = [
  {
    title: "Lavanta Yağının Sakinleştirici Gücü",
    excerpt: "Modern yaşamın stresinden uzaklaşmak için lavanta yağının mucizevi etkilerini keşfedin.",
    date: "28 Nisan 2026",
    category: "Aromaterapi",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=1400&auto=format&fit=crop",
    handle: "lavanta-yaginin-gucu",
    featured: true,
  },
  {
    title: "Doğru Demleme: Bitki Çaylarının Sırları",
    excerpt: "Bitkilerin şifasını fincanınıza tam olarak taşıyabilmek için bilmeniz gerekenler.",
    date: "25 Nisan 2026",
    category: "Rehber",
    image: "https://images.unsplash.com/photo-1576092729250-590e0fc1a9c7?q=80&w=900&auto=format&fit=crop",
    handle: "dogru-demleme",
    featured: false,
  },
  {
    title: "Niche Parfüm Nedir?",
    excerpt: "Sıradan kokuların ötesine geçin. Niche parfümlerin dünyasını keşfedin.",
    date: "20 Nisan 2026",
    category: "Parfüm",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop",
    handle: "niche-parfum",
    featured: false,
  },
]

export default function JournalPage() {
  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen pt-16" style={{ background: "#f5f0e8" }}>
      {/* Header */}
      <div className="py-20 md:py-28 text-center" style={{ background: "#1e2b20" }}>
        <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>BioxLife</p>
        <h1
          className="text-5xl md:text-7xl font-medium text-cream"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Journal
        </h1>
        <p className="mt-4 text-sm font-light" style={{ color: "rgba(245,240,232,0.45)" }}>
          Doğal Yaşam · Wellness · Aromaterapi
        </p>
      </div>

      <div className="content-container py-16 md:py-24">
        {/* Featured post */}
        <LocalizedClientLink href={`/journal/${featured.handle}`} className="group block mb-20">
          <div className="grid grid-cols-1 small:grid-cols-[1fr_420px] gap-0 overflow-hidden" style={{ background: "#ede8de" }}>
            <div className="relative overflow-hidden" style={{ minHeight: "480px" }}>
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-12 md:p-16">
              <span className="label-caps mb-4" style={{ color: "#c9a84c" }}>{featured.category}</span>
              <h2
                className="text-3xl md:text-4xl font-medium leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
              >
                {featured.title}
              </h2>
              <p className="text-sm font-light leading-relaxed mb-8" style={{ color: "#4a5e4c" }}>
                {featured.excerpt}
              </p>
              <span className="btn-ghost self-start">
                Okumaya Devam Et
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <p className="mt-8 label-caps" style={{ color: "#6b7b6c", fontSize: "9px" }}>{featured.date}</p>
            </div>
          </div>
        </LocalizedClientLink>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 small:grid-cols-2 gap-12 mb-24">
          {rest.map((post) => (
            <LocalizedClientLink key={post.handle} href={`/journal/${post.handle}`} className="group block">
              <div className="overflow-hidden mb-6" style={{ aspectRatio: "16/10" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="label-caps mb-3 block" style={{ color: "#c9a84c" }}>{post.category}</span>
              <h2
                className="text-2xl font-medium mb-3 group-hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
              >
                {post.title}
              </h2>
              <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#4a5e4c" }}>
                {post.excerpt}
              </p>
              <span className="btn-ghost text-sm">Devamını Oku →</span>
            </LocalizedClientLink>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-16 px-12 text-center" style={{ background: "#1e2b20" }}>
          <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>Bülten</p>
          <h2
            className="text-3xl md:text-4xl font-medium mb-4 text-cream"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Haftalık İlham
          </h2>
          <p className="text-sm font-light mb-8 max-w-md mx-auto" style={{ color: "rgba(245,240,232,0.5)" }}>
            Doğal yaşam ipuçları ve yeni ürünlerimizden haberdar olmak için topluluğumuza katılın.
          </p>
          <form className="flex flex-col xsmall:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-6 py-4 text-sm font-light outline-none"
              style={{ background: "rgba(245,240,232,0.08)", border: "1px solid rgba(245,240,232,0.15)", color: "#f5f0e8" }}
            />
            <button
              type="submit"
              className="px-8 py-4 label-caps shrink-0"
              style={{ background: "#c9a84c", color: "#1e2b20" }}
            >
              Abone Ol
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

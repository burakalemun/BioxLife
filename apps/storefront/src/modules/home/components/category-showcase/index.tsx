import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categories = [
  {
    title: "Uçucu Yağlar",
    subtitle: "Essential Oils",
    handle: "essential-oils",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?q=80&w=1200&auto=format&fit=crop",
    span: "large",
  },
  {
    title: "Bitki Çayları",
    subtitle: "Herbal Teas",
    handle: "herbal-teas",
    image: "https://images.unsplash.com/photo-1576092729250-590e0fc1a9c7?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
  {
    title: "Parfümler",
    subtitle: "Fragrances",
    handle: "fragrances",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
]

const CategoryShowcase = () => {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="content-container">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="label-caps mb-3" style={{ color: "#c9a84c" }}>Koleksiyonlar</p>
            <h2
              className="text-4xl md:text-5xl font-medium leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
            >
              Doğanın Seçkisi
            </h2>
          </div>
          <LocalizedClientLink href="/store" className="btn-ghost hidden small:flex">
            Tümünü Gör
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </LocalizedClientLink>
        </div>

        {/* Grid: left large + right 2-stack */}
        <div className="grid grid-cols-1 small:grid-cols-12 gap-4">
          {/* Large left */}
          <LocalizedClientLink
            href={`/categories/${categories[0].handle}`}
            className="small:col-span-7 group relative overflow-hidden"
            style={{ height: "640px" }}
          >
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,43,32,0.8) 0%, transparent 50%)" }} />
            <div className="absolute bottom-0 left-0 p-10">
              <p className="label-caps mb-2" style={{ color: "#c9a84c" }}>{categories[0].subtitle}</p>
              <h3 className="text-3xl font-medium text-cream mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {categories[0].title}
              </h3>
              <span className="btn-ghost text-cream" style={{ borderColor: "rgba(245,240,232,0.4)" }}>
                Keşfet →
              </span>
            </div>
          </LocalizedClientLink>

          {/* Right stack */}
          <div className="small:col-span-5 flex flex-col gap-4">
            {categories.slice(1).map((cat) => (
              <LocalizedClientLink
                key={cat.handle}
                href={`/categories/${cat.handle}`}
                className="group relative overflow-hidden flex-1"
                style={{ minHeight: "308px" }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,43,32,0.75) 0%, transparent 55%)" }} />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="label-caps mb-1" style={{ color: "#c9a84c", fontSize: "9px" }}>{cat.subtitle}</p>
                  <h3 className="text-xl font-medium text-cream" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {cat.title}
                  </h3>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center" style={{ background: "rgba(30,43,32,0.3)" }}>
                  <span className="label-caps px-6 py-3" style={{ background: "rgba(245,240,232,0.15)", border: "1px solid rgba(245,240,232,0.3)", color: "#f5f0e8" }}>
                    Koleksiyona Git
                  </span>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase

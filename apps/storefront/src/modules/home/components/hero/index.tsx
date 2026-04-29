import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section
      className="relative flex items-center overflow-hidden pt-16"
      style={{ background: "#1e2b20", minHeight: "62vh" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2400&auto=format&fit=crop"
          alt="BioxLife"
          className="w-full h-full object-cover opacity-30"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(30,43,32,0.97) 40%, rgba(30,43,32,0.6) 100%)" }} />
      </div>

      {/* Content */}
      <div className="content-container relative z-10 py-16 grid grid-cols-1 small:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background: "#c9a84c" }} />
            <span className="label-caps" style={{ color: "#c9a84c", fontSize: "10px" }}>Saf Aromaterapi & Wellness</span>
          </div>
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl small:text-6xl font-medium leading-[1.1] mb-5"
          >
            <span style={{ color: "#f5f0e8" }}>Doğanın</span>
            {" "}
            <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Saf Sanatı</em>
          </h1>
          <p className="text-sm font-light leading-relaxed mb-8 max-w-lg" style={{ color: "rgba(245,240,232,0.6)" }}>
            Tarladan şişeye, her damlada doğanın özü. %100 sertifikalı organik.
          </p>
          <div className="flex flex-wrap gap-3">
            <LocalizedClientLink href="/store">
              <button className="btn-primary px-8 py-3 text-sm" style={{ background: "#c9a84c", color: "#1e2b20" }}>
                Alışverişe Başla
              </button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store">
              <button
                className="px-8 py-3 text-sm label-caps border transition-all hover:bg-white/5"
                style={{ color: "rgba(245,240,232,0.7)", borderColor: "rgba(245,240,232,0.2)" }}
              >
                Tüm Ürünler
              </button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Right: compact stats */}
        <div className="hidden small:flex flex-col gap-3">
          {[
            { num: "%100", label: "Doğal" },
            { num: "GC/MS", label: "Lab Onaylı" },
            { num: "50+", label: "Ürün" },
          ].map((s) => (
            <div
              key={s.num}
              className="flex items-center gap-4 px-5 py-4"
              style={{ background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.08)" }}
            >
              <span className="text-xl font-medium w-14 shrink-0" style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c" }}>
                {s.num}
              </span>
              <span className="label-caps text-[9px]" style={{ color: "rgba(245,240,232,0.5)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EditorialStorytelling = () => {
  return (
    <section style={{ background: "#1e2b20" }} className="py-24 md:py-36 overflow-hidden">
      <div className="content-container grid grid-cols-1 small:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Text side */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span className="label-caps" style={{ color: "#c9a84c" }}>Bizim Felsefemiz</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-medium leading-[1.15] mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
          >
            Saflık Bir Tercih Değil,
            <br />
            <em className="font-normal italic" style={{ color: "#c9a84c" }}>Bir Sözdür.</em>
          </h2>
          <p className="text-base font-light leading-relaxed mb-6" style={{ color: "rgba(245,240,232,0.6)" }}>
            BioxLife olarak her ürünümüz, tarladan şişeye uzanan şeffaf bir sürecin ürünüdür.
            Laboratuvar testlerinden geçmeyen, GC/MS raporu olmayan hiçbir şeyi müşterilerimize sunmuyoruz.
          </p>
          <p className="text-base font-light leading-relaxed mb-12" style={{ color: "rgba(245,240,232,0.6)" }}>
            Doğanın şifası ancak kusursuz bir saflıkla korunabilir. Bu, sadece bir üretim prensibi değil — bir yaşam biçimidir.
          </p>
          <LocalizedClientLink href="/about">
            <button
              className="inline-flex items-center gap-3 label-caps pb-0.5 transition-all duration-300"
              style={{ color: "#f5f0e8", borderBottom: "1px solid rgba(245,240,232,0.3)" }}
            >
              Hikayemizi Okuyun
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </LocalizedClientLink>
        </div>

        {/* Image side */}
        <div className="relative">
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <img
              src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=1200&auto=format&fit=crop"
              alt="BioxLife nature"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating badge */}
          <div
            className="absolute -bottom-6 -left-6 p-8 hidden small:block"
            style={{ background: "#c9a84c", maxWidth: "220px" }}
          >
            <p className="text-sm font-medium leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
              "Doğanın saflığını korumak bizim en yüksek sanat biçimimizdir."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditorialStorytelling

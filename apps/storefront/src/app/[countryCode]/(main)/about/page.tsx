import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hikayemiz | BioxLife",
  description: "Doğanın en saf halini modern bilimle buluşturuyoruz.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#f5f0e8" }}>
      {/* Immersive Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "90vh", background: "#1e2b20" }}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=2400&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-30"
            style={{ objectPosition: "center 40%" }}
            alt="BioxLife heritage"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1e2b20 30%, transparent)" }} />
        </div>
        <div className="content-container relative z-10 pb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span className="label-caps" style={{ color: "#c9a84c" }}>Est. 2024 · Hikayemiz</span>
          </div>
          <h1
            className="text-5xl md:text-8xl font-medium leading-[1.05] max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
          >
            Doğadan
            <br />
            <em className="font-normal italic" style={{ color: "#c9a84c" }}>Ruhunuza</em>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-36" style={{ background: "#f5f0e8" }}>
        <div className="content-container grid grid-cols-1 small:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
              <span className="label-caps" style={{ color: "#c9a84c" }}>Felsefemiz</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-medium leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
            >
              Saflık Bir Tercih
              <br />
              <em className="font-normal italic">Değil, Bir Sözdür.</em>
            </h2>
            <div className="space-y-5">
              <p className="text-sm font-light leading-loose" style={{ color: "#4a5e4c" }}>
                BioxLife olarak yolculuğumuz, dünyanın en bereketli topraklarından toplanan bitkilerin en saf halini koruma tutkusuyla başladı. Her ürünümüzün izini tarladan şişeye kadar sürebilirsiniz.
              </p>
              <p className="text-sm font-light leading-loose" style={{ color: "#4a5e4c" }}>
                Laboratuvar testlerinden geçmeyen, GC/MS raporu olmayan hiçbir ürünü BioxLife etiketiyle müşterilerimize sunmuyoruz. Doğanın şifası ancak kusursuz saflıkla korunabilir.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop"
                alt="BioxLife nature"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-8 -left-8 p-8 hidden small:block"
              style={{ background: "#1e2b20", maxWidth: "240px" }}
            >
              <p className="text-sm font-light leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8", fontStyle: "italic" }}>
                "Doğanın saflığını korumak, bizim için en yüksek sanat biçimidir."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-6 h-px" style={{ background: "#c9a84c" }} />
                <span className="label-caps" style={{ color: "#c9a84c", fontSize: "9px" }}>BioxLife Ekibi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-36" style={{ background: "#1e2b20" }}>
        <div className="content-container">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span className="label-caps" style={{ color: "#c9a84c" }}>Değerlerimiz</span>
          </div>
          <div className="grid grid-cols-1 small:grid-cols-3 gap-px" style={{ background: "rgba(245,240,232,0.08)" }}>
            {[
              { n: "01", t: "Sürdürülebilirlik", d: "Toprağa ve ekosisteme saygı duyuyoruz. Hasat süreçlerimizde doğanın dengesini korumak en büyük önceliğimiz." },
              { n: "02", t: "Maksimum Saflık", d: "Hiçbir ürünümüzde sentetik katkı, dolgu maddesi veya koruyucu kullanmıyoruz. Sadece %100 doğal içerikler." },
              { n: "03", t: "Bilimsel Uzmanlık", d: "Bitkilerin gücünü bilimsel verilerle destekliyoruz. Her karışımımız uzman aromaterapistler tarafından onaylanıyor." },
            ].map((v) => (
              <div key={v.n} className="p-12" style={{ background: "#1e2b20" }}>
                <p className="text-4xl font-light mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c", opacity: 0.5 }}>
                  {v.n}
                </p>
                <h3 className="text-xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}>
                  {v.t}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(245,240,232,0.5)" }}>
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center" style={{ background: "#f5f0e8" }}>
        <div className="content-container max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-6xl font-medium mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
          >
            Koleksiyonu
            <br />
            <em className="font-normal italic" style={{ color: "#c9a84c" }}>Keşfedin</em>
          </h2>
          <a href="/store">
            <button className="btn-primary" style={{ background: "#1e2b20", color: "#f5f0e8", maxWidth: "280px" }}>
              Alışverişe Başla
            </button>
          </a>
        </div>
      </section>
    </div>
  )
}

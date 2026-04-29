import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | BioxLife",
  description: "BioxLife hakkında merak edilenler.",
}

const faqs = [
  {
    category: "Ürünler & Kalite",
    questions: [
      { q: "Ürünleriniz %100 doğal mı?", a: "Evet, tüm uçucu yağlar, bitki çayları ve parfümler %100 doğal içeriklerle hazırlanır. Sentetik koku, dolgu maddesi veya zararlı kimyasallar kullanmıyoruz." },
      { q: "GC/MS raporlarına nasıl ulaşabilirim?", a: "Her ürün sayfasındaki 'Laboratuvar Analizleri' bölümünden ilgili ürünün GC/MS saflık raporunu PDF olarak görüntüleyebilirsiniz." },
      { q: "Ürünlerinizin kullanım ömrü ne kadardır?", a: "Uçucu yağlarımızın raf ömrü kapak açıldıktan sonra genellikle 2 yıldır. Serin ve güneş görmeyen bir yerde muhafaza etmenizi öneririz." },
    ]
  },
  {
    category: "Sipariş & Teslimat",
    questions: [
      { q: "Kargo ne zaman ulaşır?", a: "Siparişleriniz genellikle 24 saat içinde kargoya verilir. Teslimat süresi 1–3 iş günüdür." },
      { q: "Ücretsiz kargo avantajı var mı?", a: "Belirli bir tutarın üzerindeki tüm alışverişlerde kargo ücretsizdir. Güncel limiti sepet sayfasında görebilirsiniz." },
    ]
  },
  {
    category: "İade & Değişim",
    questions: [
      { q: "İade politikanız nedir?", a: "Açılmamış ve ambalajı zarar görmemiş ürünleri 14 gün içinde iade edebilirsiniz. Hijyen kuralları gereği kapağı açılmış ürünlerde iade kabul edilememektedir." },
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#f5f0e8" }}>
      {/* Header */}
      <div className="py-20 md:py-28 text-center" style={{ background: "#1e2b20" }}>
        <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>Yardım Merkezi</p>
        <h1
          className="text-5xl md:text-7xl font-medium text-cream"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          SSS
        </h1>
      </div>

      <div className="content-container py-16 md:py-24 max-w-4xl">
        <div className="space-y-20">
          {faqs.map((section, i) => (
            <div key={i}>
              {/* Category */}
              <div className="flex items-center gap-4 mb-10">
                <span
                  className="text-4xl font-light"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c", opacity: 0.4 }}
                >
                  0{i + 1}
                </span>
                <h2
                  className="text-xl font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
                >
                  {section.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="space-y-10 pl-16">
                {section.questions.map((item, qi) => (
                  <div key={qi} style={{ borderBottom: "1px solid rgba(30,43,32,0.08)" }} className="pb-10">
                    <h3
                      className="text-lg font-medium mb-4"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
                    >
                      {item.q}
                    </h3>
                    <p className="text-sm font-light leading-loose" style={{ color: "#4a5e4c" }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 py-16 px-12 text-center" style={{ background: "#1e2b20" }}>
          <h2
            className="text-3xl font-medium mb-4 text-cream"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Yanıtınızı bulamadınız mı?
          </h2>
          <p className="text-sm font-light mb-8" style={{ color: "rgba(245,240,232,0.5)" }}>
            Uzman ekibimiz size yardımcı olmak için burada.
          </p>
          <a href="/contact">
            <button className="btn-primary" style={{ background: "#c9a84c", color: "#1e2b20", maxWidth: "200px" }}>
              Bize Yazın
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"

const testimonials = [
  {
    name: "Ayşe K.",
    location: "İstanbul",
    rating: 5,
    text: "Lavanta yağını ilk kullandığımda inanamadım. Gerçekten çok sakinleştirici ve doğal bir koku. Bir daha başka markaya bakmayacağım.",
    product: "Saf Lavanta Yağı",
  },
  {
    name: "Mehmet A.",
    location: "Ankara",
    rating: 5,
    text: "GC/MS sertifikası gerçekten önemli. Emin olarak kullanıyorum. Teslimat da çok hızlıydı, teşekkürler BioxLife!",
    product: "Aura No. 1 Parfüm",
  },
  {
    name: "Selin Y.",
    location: "İzmir",
    rating: 5,
    text: "Difüzörümde kullanıyorum, tüm evi sarıyor. Fiyat kaliteye değiyor. Kesinlikle tavsiye ederim.",
    product: "Bergamot & Sandal Ağacı Karışımı",
  },
  {
    name: "Zeynep M.",
    location: "Bursa",
    rating: 5,
    text: "Uyumadan önce lavanta damlatıyorum yastığıma, uyku kalitem inanılmaz arttı. Herkese tavsiye ediyorum!",
    product: "Uyku Ritüeli Seti",
  },
]

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mb-4">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={rating >= s ? "#c9a84c" : "none"} stroke="#c9a84c" strokeWidth="1.5">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
)

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: "#1e2b20" }}>
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <p className="label-caps text-[10px]" style={{ color: "#c9a84c" }}>Müşteri Yorumları</p>
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}>
            Onlar Denedi, Siz Karar Verin
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-4 gap-5 mb-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="p-7 cursor-pointer transition-all duration-300"
              style={{
                background: active === i ? "rgba(201,168,76,0.08)" : "rgba(245,240,232,0.03)",
                border: `1px solid ${active === i ? "rgba(201,168,76,0.4)" : "rgba(245,240,232,0.08)"}`,
              }}
            >
              <StarDisplay rating={t.rating} />
              <p className="text-sm font-light leading-relaxed mb-6" style={{ color: "rgba(245,240,232,0.75)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ borderTop: "1px solid rgba(245,240,232,0.08)" }} className="pt-4">
                <p className="text-sm font-medium" style={{ color: "#f5f0e8" }}>{t.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#c9a84c" }}>{t.product}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(245,240,232,0.35)" }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#c9a84c" stroke="#c9a84c" strokeWidth="1">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <p className="text-xs font-light" style={{ color: "rgba(245,240,232,0.4)" }}>
            5.0 ortalama · 100+ mutlu müşteri
          </p>
        </div>
      </div>
    </section>
  )
}

import { Metadata } from "next"
import { Envelope, Phone, MapPin } from "@medusajs/icons"

export const metadata: Metadata = {
  title: "İletişim | BioxLife",
  description: "Bize ulaşın.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#f5f0e8" }}>
      {/* Header */}
      <div className="py-20 md:py-28 text-center" style={{ background: "#1e2b20" }}>
        <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>Bize Ulaşın</p>
        <h1
          className="text-5xl md:text-7xl font-medium text-cream"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          İletişim
        </h1>
      </div>

      <div className="content-container py-16 md:py-24">
        <div className="grid grid-cols-1 small:grid-cols-[300px_1fr] gap-16 md:gap-24">
          {/* Contact info */}
          <div className="space-y-12">
            <div>
              <p className="label-caps mb-8 pb-4" style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.1)" }}>
                Bilgiler
              </p>
              <div className="space-y-8">
                {[
                  { icon: <Phone />, label: "Telefon", val: "+90 (212) 555 00 00", sub: "Hft içi 09:00–18:00" },
                  { icon: <Envelope />, label: "E-posta", val: "destek@bioxlife.com", sub: "7/24 yanıtlıyoruz" },
                  { icon: <MapPin />, label: "Adres", val: "Nişantaşı, İstanbul", sub: "Teşvikiye Mah. No: 123" },
                ].map((c) => (
                  <div key={c.label} className="flex gap-5">
                    <div className="shrink-0 w-9 h-9 flex items-center justify-center" style={{ background: "#1e2b20", color: "#c9a84c" }}>
                      {c.icon}
                    </div>
                    <div>
                      <p className="label-caps mb-1" style={{ color: "#6b7b6c", fontSize: "9px" }}>{c.label}</p>
                      <p className="text-sm font-medium" style={{ color: "#1e2b20" }}>{c.val}</p>
                      <p className="text-xs font-light mt-0.5" style={{ color: "#6b7b6c" }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="label-caps mb-8 pb-4" style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.1)" }}>
              Mesaj Gönderin
            </p>
            <form className="space-y-8">
              <div className="grid grid-cols-1 small:grid-cols-2 gap-8">
                <div>
                  <label className="label-caps block mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>İsim</label>
                  <input type="text" placeholder="Adınız Soyadınız" className="input-luxury" />
                </div>
                <div>
                  <label className="label-caps block mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>E-posta</label>
                  <input type="email" placeholder="adiniz@eposta.com" className="input-luxury" />
                </div>
              </div>
              <div>
                <label className="label-caps block mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>Konu</label>
                <input type="text" placeholder="Nasıl yardımcı olabiliriz?" className="input-luxury" />
              </div>
              <div>
                <label className="label-caps block mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>Mesajınız</label>
                <textarea
                  rows={5}
                  placeholder="Mesajınızı buraya yazın..."
                  className="input-luxury resize-none"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ background: "#1e2b20", color: "#f5f0e8", maxWidth: "240px" }}>
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

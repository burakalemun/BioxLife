import { Metadata } from "next"

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | BioxLife",
  description: "BioxLife Kişisel Verilerin Korunması Kanunu Aydınlatma Metni.",
}

export default function KvkkPage() {
  return (
    <div className="py-24" style={{ background: "#f5f0e8", minHeight: "100vh" }}>
      <div className="content-container max-w-3xl mx-auto">
        <h1 className="text-4xl font-medium mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
          KVKK Aydınlatma Metni
        </h1>

        <div className="prose prose-sm max-w-none text-justify font-light" style={{ color: "#4a5e4c" }}>
          <p className="mb-6 font-medium">
            Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca BioxLife ("Veri Sorumlusu") olarak, kişisel verilerinizin güvenliğine ve gizliliğine büyük önem veriyoruz.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>1. Kişisel Verilerin Toplanması ve İşlenme Amaçları</h3>
          <p className="mb-4">
            Alışveriş işleminizin gerçekleştirilmesi, kargo süreçlerinin yürütülmesi, müşteri destek hizmetlerinin sağlanması, fatura süreçlerinin yönetimi ve (onay vermeniz halinde) ticari elektronik ileti gönderimi amaçlarıyla Kimlik, İletişim, Müşteri İşlem ve Finans verileriniz işlenmektedir.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>2. Kişisel Verilerin Aktarılması</h3>
          <p className="mb-4">
            Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, mevzuatın izin verdiği veya zorunlu kıldığı kişi ve kurumlara (kargo firmaları, ödeme kuruluşları, sunucu/altyapı sağlayıcıları, e-fatura entegratörleri) aktarılabilmektedir. Ödeme sırasında girdiğiniz kredi kartı bilgileriniz hiçbir şekilde sunucularımızda tutulmamakta, doğrudan PCI-DSS sertifikalı ödeme kuruluşu (iyzico) altyapısına iletilmektedir.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>3. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
          <p className="mb-4">
            Kişisel verileriniz, web sitemiz üzerinden elektronik ortamda; "Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması", "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması" ve ilgili işlemler için gerektiğinde "Açık rıza" hukuki sebeplerine dayanılarak toplanmaktadır.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>4. İlgili Kişinin Hakları</h3>
          <p className="mb-4">
            KVKK'nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahiptir.
          </p>
          <p className="mb-4">
            Bu haklarınızı kullanmak ve taleplerinizi iletmek için bizimle <a href="/contact" style={{ color: "#c9a84c", borderBottom: "1px solid rgba(201,168,76,0.3)" }}>iletişim sayfamız</a> üzerinden irtibata geçebilirsiniz.
          </p>

          <p className="mt-12 text-xs" style={{ color: "#6b7b6c" }}>
            Son Güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long" })}
          </p>
        </div>
      </div>
    </div>
  )
}

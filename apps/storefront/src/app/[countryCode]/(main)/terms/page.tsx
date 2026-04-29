import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kullanım Koşulları | BioxLife",
  description: "BioxLife web sitesi kullanım koşulları.",
}

export default function TermsPage() {
  return (
    <div className="py-24" style={{ background: "#f5f0e8", minHeight: "100vh" }}>
      <div className="content-container max-w-3xl mx-auto">
        <h1 className="text-4xl font-medium mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
          Kullanım Koşulları
        </h1>

        <div className="prose prose-sm max-w-none text-justify font-light" style={{ color: "#4a5e4c" }}>
          <p className="mb-6">
            Bu web sitesini ziyaret ederek veya sitemizden alışveriş yaparak "Hizmetimize" dahil olursunuz ve aşağıdaki hüküm ve koşullara ("Kullanım Koşulları", "Koşullar") tabi olmayı kabul edersiniz. Bu Koşullar, tarayıcılar, satıcılar, müşteriler ve içerik katkıda bulunanlar dahil ancak bunlarla sınırlı olmamak üzere, Sitenin tüm kullanıcıları için geçerlidir.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>1. Online Mağaza Şartları</h3>
          <p className="mb-4">
            Ürünlerimizi yasadışı veya yetkisiz bir amaç için kullanamazsınız; ayrıca Hizmetin kullanımında kendi yargı alanınızdaki hiçbir yasayı (telif hakkı yasaları dahil ancak bunlarla sınırlı olmamak üzere) ihlal edemezsiniz. Herhangi bir solucan, virüs veya yıkıcı nitelikte herhangi bir kod iletemezsiniz.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>2. Ürünler ve Hizmetler</h3>
          <p className="mb-4">
            BioxLife, ürün içeriklerinin saflığı konusunda GC/MS raporlamasına güvenir, ancak ürünlerin tıbbi veya tedavi edici bir iddiası yoktur. Uçucu yağlar sadece harici kullanım ve aromaterapi amaçlıdır. Alerjik reaksiyonlar için ürünler kullanılmadan önce bilek içinde yama testi yapılması tavsiye edilir. Hamilelerin ve ciddi sağlık sorunları olanların doktorlarına danışmadan kullanmamaları gerekmektedir.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>3. Fiyatlandırma ve İade</h3>
          <p className="mb-4">
            Ürünlerimizin fiyatları önceden haber verilmeksizin değiştirilebilir. İade prosedürleri, "Kusursuz Teslimat" ilkelerimize tabidir. Açılmış, kullanılmış veya koruma bandı yırtılmış uçucu yağ ve kişisel bakım ürünlerinin yasa gereği iadesi kabul edilmemektedir.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>4. Garanti Reddi</h3>
          <p className="mb-4">
            Hizmetimizin kesintisiz, zamanında, güvenli veya hatasız olacağını garanti etmiyoruz. Hizmetin kullanımından elde edilebilecek sonuçların doğru veya güvenilir olacağını garanti etmiyoruz.
          </p>

          <p className="mt-12 text-xs" style={{ color: "#6b7b6c" }}>
            Son Güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long" })}
          </p>
        </div>
      </div>
    </div>
  )
}

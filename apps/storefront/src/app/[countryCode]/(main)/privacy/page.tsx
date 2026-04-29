import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gizlilik Politikası | BioxLife",
  description: "BioxLife gizlilik politikası ve kişisel verilerin korunması.",
}

export default function PrivacyPage() {
  return (
    <div className="py-24" style={{ background: "#f5f0e8", minHeight: "100vh" }}>
      <div className="content-container max-w-3xl mx-auto">
        <h1 className="text-4xl font-medium mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
          Gizlilik Politikası
        </h1>

        <div className="prose prose-sm max-w-none text-justify font-light" style={{ color: "#4a5e4c" }}>
          <p className="mb-6">
            BioxLife olarak, müşterilerimizin kişisel verilerinin gizliliğine ve güvenliğine en üst düzeyde önem veriyoruz. Bu Gizlilik Politikası, www.bioxlife.com sitemizi ziyaret ettiğinizde veya sitemizden alışveriş yaptığınızda hakkınızdaki bilgilerin nasıl toplandığını, kullanıldığını ve paylaşıldığını açıklamaktadır.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>1. Topladığımız Kişisel Bilgiler</h3>
          <p className="mb-4">
            Siteyi ziyaret ettiğinizde, cihazınız hakkında belirli bilgileri otomatik olarak toplarız. Bu bilgiler web tarayıcınız, IP adresiniz, saat diliminiz ve cihazınızda yüklü olan bazı çerezlerle ilgili bilgileri içerir. Ayrıca, Site'de gezinirken, görüntülediğiniz sayfalar veya ürünler, sizi Site'ye yönlendiren web siteleri veya arama terimleri ve Site ile nasıl etkileşimde bulunduğunuz hakkında bilgi toplarız.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>2. Bilgilerinizi Nasıl Kullanıyoruz?</h3>
          <p className="mb-4">
            Topladığımız sipariş bilgilerini, Site üzerinden verilen tüm siparişleri yerine getirmek için kullanırız (ödeme bilgilerinizin işlenmesi, nakliye düzenlemeleri ve size fatura ve/veya sipariş onayları sağlanması dahil). Ayrıca bu bilgileri sizinle iletişim kurmak ve potansiyel risk veya dolandırıcılık için siparişlerimizi incelemek amacıyla kullanırız.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>3. Bilgilerinizin Paylaşımı</h3>
          <p className="mb-4">
            Kişisel bilgilerinizi yukarıda açıklandığı gibi bize yardımcı olan üçüncü taraflarla (örneğin, sipariş altyapısı için Medusa, ödeme işlemleri için iyzico) paylaşıyoruz. Kişisel bilgilerinizi ayrıca geçerli yasa ve düzenlemelere uymak için de paylaşabiliriz.
          </p>

          <h3 className="text-lg font-medium mt-10 mb-4" style={{ color: "#1e2b20" }}>4. Haklarınız</h3>
          <p className="mb-4">
            Türkiye Cumhuriyeti sınırları içinde ikamet ediyorsanız, hakkınızda tuttuğumuz kişisel bilgilere erişme ve bu bilgilerin düzeltilmesini, güncellenmesini veya silinmesini talep etme hakkına sahipsiniz. Bu hakkınızı kullanmak isterseniz, lütfen iletişim sayfamızdan bizimle irtibata geçin.
          </p>

          <p className="mt-12 text-xs" style={{ color: "#6b7b6c" }}>
            Son Güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long" })}
          </p>
        </div>
      </div>
    </div>
  )
}

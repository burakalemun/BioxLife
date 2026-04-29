import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"

// Static posts data (in a real app, this would come from a CMS or Medusa)
const posts = [
  {
    title: "Lavanta Yağının Sakinleştirici Gücü",
    excerpt: "Modern yaşamın stresinden uzaklaşmak için lavanta yağının mucizevi etkilerini keşfedin.",
    content: `
      <p>Aromaterapi dünyasının en çok tercih edilen ve en bilinen uçucu yağlarından biri olan lavanta, binlerce yıldır hem fiziksel hem de ruhsal şifa arayışlarında temel bir rol oynamıştır. BioxLife olarak, en saf haliyle sunduğumuz lavanta yağının hayatınıza katabileceği dinginliği keşfetmeniz için bu rehberi hazırladık.</p>
      
      <h3>Lavanta Yağı Nedir?</h3>
      <p>Lavandula angustifolia bitkisinin çiçekli tepelerinden buhar distilasyonu yoluyla elde edilen bu uçucu yağ, içerisinde barındırdığı linalol ve linalil asetat gibi bileşenler sayesinde güçlü bir sakinleştirici etkiye sahiptir.</p>
      
      <blockquote>"Doğa, ruhun ilacıdır; lavanta ise bu ilacın en zarif damlasıdır."</blockquote>
      
      <h3>Günlük Ritüellerde Kullanım</h3>
      <p>Lavanta yağını günlük hayatınıza dahil etmenin pek çok yolu vardır:</p>
      <ul>
        <li><strong>Uyku Öncesi:</strong> Yastığınıza damlatacağınız bir damla lavanta yağı, uykuya geçiş sürenizi kısaltabilir.</li>
        <li><strong>Banyo Keyfi:</strong> Küvetinize ekleyeceğiniz birkaç damla yağ, kaslarınızın gevşemesine yardımcı olur.</li>
        <li><strong>Difüzör:</strong> Çalışma ortamınızda lavanta kokusu yaymak, odaklanmanızı artırırken stres seviyenizi düşürür.</li>
      </ul>

      <p>Unutmayın, uçucu yağlar konsantre maddelerdir. Cildinize doğrudan uygulamadan önce mutlaka bir taşıyıcı yağ (tatlı badem, jojoba veya kuşburnu çekirdeği yağı gibi) ile seyreltmelisiniz.</p>
    `,
    date: "28 Nisan 2026",
    category: "Aromaterapi",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=1400&auto=format&fit=crop",
    handle: "lavanta-yaginin-gucu",
  },
  {
    title: "Doğru Demleme: Bitki Çaylarının Sırları",
    excerpt: "Bitkilerin şifasını fincanınıza tam olarak taşıyabilmek için bilmeniz gerekenler.",
    content: `
      <p>Bir fincan bitki çayı hazırlamak sadece su ve bitkiyi buluşturmak değildir; bu bir simyadır. Doğru sıcaklık ve doğru süre, bitkinin içindeki uçucu yağları ve antioksidanları korumanın anahtarıdır.</p>
      
      <h3>Su Sıcaklığı Neden Önemli?</h3>
      <p>Kaynayan suyu (100°C) doğrudan hassas bitkilerin üzerine dökmek, bitkinin yakılmasına ve tadının acılaşmasına neden olabilir. Yeşil çay ve papatya gibi bitkiler için ideal sıcaklık 80-85°C arasındadır.</p>
      
      <h3>Demleme Süresi</h3>
      <p>Kök bitkiler (zencefil, zerdeçal) daha uzun süre kaynatılabilirken, yaprak ve çiçek formundaki bitkilerin 5-7 dakikadan fazla demlenmemesi önerilir.</p>
    `,
    date: "25 Nisan 2026",
    category: "Rehber",
    image: "https://images.unsplash.com/photo-1576092729250-590e0fc1a9c7?q=80&w=900&auto=format&fit=crop",
    handle: "dogru-demleme",
  },
  {
    title: "Niche Parfüm Nedir?",
    excerpt: "Sıradan kokuların ötesine geçin. Niche parfümlerin dünyasını keşfedin.",
    content: `
      <p>Niche parfümler, ticari kaygıların ötesinde, bir hikaye anlatmak veya belirli bir duyguyu uyandırmak amacıyla tasarlanan sanat eserleridir. BioxLife Aura serisi, bu felsefeyle doğmuştur.</p>
      
      <h3>Niche ve Designer Arasındaki Fark</h3>
      <p>Designer parfümler milyonlara hitap etmeyi hedeflerken, niche parfümler daha özgün, nadir bulunan içeriklerle ve sınırlı sayıda üretilir.</p>
    `,
    date: "20 Nisan 2026",
    category: "Parfüm",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop",
    handle: "niche-parfum",
  },
]

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const post = posts.find((p) => p.handle === handle)

  return {
    title: post?.title || "Journal",
    description: post?.excerpt || "BioxLife Journal",
  }
}

export default async function PostPage({ params }: Props) {
  const { handle, countryCode } = await params
  const post = posts.find((p) => p.handle === handle)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-16 pb-24" style={{ background: "#f5f0e8" }}>
      {/* Article Header */}
      <div className="py-20 md:py-32" style={{ background: "#1e2b20" }}>
        <div className="content-container max-w-3xl mx-auto text-center">
          <LocalizedClientLink 
            href="/journal" 
            className="label-caps mb-8 inline-block opacity-60 hover:opacity-100 transition-opacity" 
            style={{ color: "#c9a84c" }}
          >
            ← Journal'a Dön
          </LocalizedClientLink>
          <p className="label-caps mb-4" style={{ color: "#c9a84c" }}>{post.category}</p>
          <h1 
            className="text-4xl md:text-6xl font-medium text-cream leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h1>
          <p className="mt-8 label-caps text-xs" style={{ color: "rgba(245,240,232,0.4)" }}>
            {post.date} • BioxLife Editör
          </p>
        </div>
      </div>

      <article className="content-container max-w-3xl mx-auto -mt-16 relative z-10">
        {/* Main Image */}
        <div className="aspect-[16/9] w-full mb-16 overflow-hidden shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div 
          className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-[#1e2b20] prose-p:text-[#4a5e4c] prose-p:leading-relaxed prose-blockquote:border-[#c9a84c] prose-blockquote:bg-[#ede8de] prose-blockquote:p-8 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share / Footer */}
        <div className="mt-20 pt-10 border-t border-[rgba(30,43,32,0.1)] flex flex-col items-center">
          <p className="label-caps mb-6 text-xs" style={{ color: "#6b7b6c" }}>Bu yazıyı paylaşın</p>
          <div className="flex gap-6">
            {["X", "Instagram", "WhatsApp"].map((platform) => (
              <span key={platform} className="text-xs uppercase tracking-widest cursor-pointer hover:text-[#c9a84c] transition-colors" style={{ color: "#1e2b20" }}>
                {platform}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Suggested Products (Static placeholder for now) */}
      <div className="content-container max-w-3xl mx-auto mt-24 py-16 px-10 text-center" style={{ background: "#ede8de" }}>
        <h3 className="font-serif text-2xl mb-4" style={{ color: "#1e2b20" }}>Ritüeli Tamamlayın</h3>
        <p className="text-sm font-light mb-8" style={{ color: "#6b7b6c" }}>Yazıda bahsedilen ürünleri koleksiyonumuzda keşfedin.</p>
        <LocalizedClientLink href="/store" className="btn-primary inline-block">
          MAĞAZAYI GEZ
        </LocalizedClientLink>
      </div>
    </div>
  )
}

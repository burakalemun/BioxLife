import { Badge, Text } from "@modules/common/components/ui"
import { Sun, Component, Sparkles, AcademicCap, DocumentText } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

type ProductLuxuryDetailsProps = {
  product: HttpTypes.StoreProduct
}

const ProductLuxuryDetails = ({ product }: ProductLuxuryDetailsProps) => {
  const metadata = product.metadata || {}
  // Tasarımı görebilmen için mock link eklendi
  const sdsUrl = (metadata.sds_url as string | undefined) || "https://example.com/mock-sds.pdf"

  return (
    <div className="flex flex-col gap-y-10 py-4 border-t border-sage-100 mt-8">
      {/* Application Methods Section */}
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-2">
          <Badge className="bg-sage-100 text-sage-700 border-none px-3 py-1 uppercase tracking-widest text-[10px] font-bold">Uygulama Yöntemleri</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-x-3 items-start">
            <div className="bg-gold-50 p-2 rounded-xl text-gold-600">
              <Sun size={20} />
            </div>
            <div>
              <Text className="text-sm font-bold text-sage-900">Difüzör</Text>
              <Text className="text-xs text-sage-500">30 dakika boyunca havaya yayın.</Text>
            </div>
          </div>

          <div className="flex gap-x-3 items-start">
            <div className="bg-gold-50 p-2 rounded-xl text-gold-600">
              <Component size={20} />
            </div>
            <div>
              <Text className="text-sm font-bold text-sage-900">Masaj</Text>
              <Text className="text-xs text-sage-500">Taşıyıcı yağ ile seyrelterek uygulayın.</Text>
            </div>
          </div>

          <div className="flex gap-x-3 items-start">
            <div className="bg-gold-50 p-2 rounded-xl text-gold-600">
              <Sparkles size={20} />
            </div>
            <div>
              <Text className="text-sm font-bold text-sage-900">Banyo</Text>
              <Text className="text-xs text-sage-500">Suya 5-10 damla ekleyerek kullanın.</Text>
            </div>
          </div>

          <div className="flex gap-x-3 items-start">
            <div className="bg-gold-50 p-2 rounded-xl text-gold-600">
              <AcademicCap size={20} />
            </div>
            <div>
              <Text className="text-sm font-bold text-sage-900">Cilt Bakımı</Text>
              <Text className="text-xs text-sage-500">Nemlendiricinize bir damla ekleyin.</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Reports Section */}
      {sdsUrl && (
        <div className="flex flex-col gap-y-4 bg-sage-50 p-6 rounded-2xl border border-sage-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="bg-white p-2 rounded-xl text-sage-600 shadow-sm border border-sage-100">
                <DocumentText size={20} />
              </div>
              <div>
                <Text className="text-sm font-bold text-sage-900 uppercase tracking-wider">Laboratuvar Analizleri</Text>
                <Text className="text-xs text-sage-500">GC/MS Saflık ve Kalite Testleri</Text>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-sage-200">
            <Text className="text-xs text-sage-600 font-medium">%100 Saf ve Doğal</Text>
            <a 
              href={sdsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gold-600 font-bold hover:text-gold-700 underline underline-offset-4"
            >
              Analiz Raporunu Gör (PDF)
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductLuxuryDetails

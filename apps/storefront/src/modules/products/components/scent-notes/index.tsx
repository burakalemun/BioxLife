import { HttpTypes } from "@medusajs/types"

type ScentNotesProps = {
  product: HttpTypes.StoreProduct
}

const ScentNotes = ({ product }: ScentNotesProps) => {
  const metadata = product.metadata || {}
  
  // Eğer ürünün metadatasında koku notası yoksa, tasarımı görebilmen için geçici (mock) veriler kullanıyoruz
  const mockTop = ["Bergamot", "Tatlı Portakal", "Okaliptüs"]
  const mockMiddle = ["Lavanta", "Ylang Ylang", "Gül"]
  const mockBase = ["Sandal Ağacı", "Sedir", "Paçuli"]

  const topNotes = (metadata.top_notes as string)?.split(",").map(n => n.trim()).filter(Boolean) || mockTop
  const middleNotes = (metadata.middle_notes as string)?.split(",").map(n => n.trim()).filter(Boolean) || mockMiddle
  const baseNotes = (metadata.base_notes as string)?.split(",").map(n => n.trim()).filter(Boolean) || mockBase

  const hasNotes = topNotes.length > 0 || middleNotes.length > 0 || baseNotes.length > 0

  if (!hasNotes) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-6 py-4 border-t border-sage-100 mt-8">
      <div className="flex items-center gap-x-2">
        <span className="uppercase tracking-widest text-[10px] font-bold px-3 py-1 bg-sage-100 text-sage-700 rounded-md">
          Koku Profili
        </span>
      </div>

      <div className="flex flex-col gap-y-4">
        {topNotes.length > 0 && (
          <div className="flex gap-x-4 items-start">
            <div className="w-16 pt-1 flex-shrink-0">
              <span className="text-xs font-semibold text-sage-900 uppercase tracking-widest">Üst</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {topNotes.map((note, i) => (
                <span key={i} className="text-sm font-light px-3 py-1 border" style={{ borderColor: "#c9a84c", color: "#1e2b20", borderRadius: "2px" }}>
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {middleNotes.length > 0 && (
          <div className="flex gap-x-4 items-start">
            <div className="w-16 pt-1 flex-shrink-0">
              <span className="text-xs font-semibold text-sage-900 uppercase tracking-widest">Orta</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {middleNotes.map((note, i) => (
                <span key={i} className="text-sm font-light px-3 py-1 border" style={{ borderColor: "#c9a84c", color: "#1e2b20", borderRadius: "2px" }}>
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {baseNotes.length > 0 && (
          <div className="flex gap-x-4 items-start">
            <div className="w-16 pt-1 flex-shrink-0">
              <span className="text-xs font-semibold text-sage-900 uppercase tracking-widest">Alt</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {baseNotes.map((note, i) => (
                <span key={i} className="text-sm font-light px-3 py-1 border border-sage-200" style={{ background: "rgba(30,43,32,0.03)", color: "#1e2b20", borderRadius: "2px" }}>
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScentNotes

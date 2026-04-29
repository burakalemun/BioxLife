"use client"

import { useState } from "react"

type Props = {
  productId: string
}

const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <svg
            width="24" height="24" viewBox="0 0 24 24"
            fill={(hover || value) >= star ? "#c9a84c" : "none"}
            stroke="#c9a84c" strokeWidth="1.5"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function ReviewForm({ productId }: Props) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) { setError("Lütfen bir puan seçin."); return }
    if (!name.trim()) { setError("Lütfen adınızı girin."); return }
    if (!body.trim()) { setError("Lütfen yorum yazın."); return }

    setLoading(true)
    setError("")

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""
      const res = await fetch(`${baseUrl}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, customer_name: name, rating, title, body }),
      })

      if (!res.ok) throw new Error("Yorum gönderilemedi.")
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu, tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="p-8 text-center" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
        <p className="label-caps mb-1" style={{ color: "#1e2b20" }}>Yorumunuz Alındı</p>
        <p className="text-sm font-light" style={{ color: "#6b7b6c" }}>Değerlendirmeniz için teşekkür ederiz.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Rating */}
      <div>
        <p className="label-caps mb-3 text-xs" style={{ color: "#6b7b6c" }}>Puanınız</p>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {/* Name */}
      <div>
        <label className="label-caps text-[10px] block mb-2" style={{ color: "#6b7b6c" }}>Adınız *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınız Soyadınız"
          className="w-full bg-transparent border-b border-[rgba(30,43,32,0.15)] py-2 text-sm outline-none transition-all focus:border-[#c9a84c] placeholder:text-[#1e2b20]/30"
        />
      </div>

      {/* Title */}
      <div>
        <label className="label-caps text-[10px] block mb-2" style={{ color: "#6b7b6c" }}>Başlık (isteğe bağlı)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yorumunuz için kısa bir başlık"
          className="w-full bg-transparent border-b border-[rgba(30,43,32,0.15)] py-2 text-sm outline-none transition-all focus:border-[#c9a84c] placeholder:text-[#1e2b20]/30"
        />
      </div>

      {/* Body */}
      <div>
        <label className="label-caps text-[10px] block mb-2" style={{ color: "#6b7b6c" }}>Yorumunuz *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Bu ürünü nasıl buldunuz? Deneyiminizi paylaşın..."
          className="w-full bg-transparent border border-[rgba(30,43,32,0.15)] p-3 text-sm outline-none transition-all focus:border-[#c9a84c] placeholder:text-[#1e2b20]/30 resize-none"
        />
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#c0392b" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary self-start px-8 py-3 text-sm disabled:opacity-50"
        style={{ background: "#1e2b20", color: "#f5f0e8" }}
      >
        {loading ? "Gönderiliyor..." : "Yorumu Gönder"}
      </button>
    </form>
  )
}

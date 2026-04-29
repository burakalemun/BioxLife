import { createClient } from "@supabase/supabase-js"
import ReviewForm from "../review-form"

type Review = {
  id: string
  customer_name: string
  rating: number
  title?: string
  body: string
  created_at: string
}

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} width="14" height="14" viewBox="0 0 24 24"
        fill={rating >= star ? "#c9a84c" : "none"}
        stroke="#c9a84c" strokeWidth="1.5"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
)

async function getReviews(productId: string): Promise<Review[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(20)

    return data || []
  } catch {
    return []
  }
}

export default async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await getReviews(productId)
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <section className="py-20" style={{ background: "#f5f0e8" }}>
      <div className="content-container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12 pb-6" style={{ borderBottom: "1px solid rgba(30,43,32,0.1)" }}>
          <div className="w-6 h-px" style={{ background: "#c9a84c" }} />
          <h2 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>
            Müşteri Yorumları
          </h2>
          {reviews.length > 0 && (
            <div className="ml-auto flex items-center gap-3">
              <StarDisplay rating={Math.round(avgRating)} />
              <span className="text-sm font-light" style={{ color: "#6b7b6c" }}>
                {avgRating.toFixed(1)} / 5 ({reviews.length} yorum)
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-16">
          {/* Reviews list */}
          <div className="flex flex-col gap-8">
            {reviews.length === 0 ? (
              <div className="py-12 text-center" style={{ border: "1px dashed rgba(30,43,32,0.15)" }}>
                <p className="text-sm font-light mb-1" style={{ color: "#6b7b6c" }}>Henüz yorum yok.</p>
                <p className="text-xs" style={{ color: "#6b7b6c" }}>Bu ürünü denediniz mi? İlk yorumu siz yapın!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="pb-8" style={{ borderBottom: "1px solid rgba(30,43,32,0.08)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-sm mb-1" style={{ color: "#1e2b20" }}>{review.customer_name}</p>
                      <StarDisplay rating={review.rating} />
                    </div>
                    <p className="text-xs font-light" style={{ color: "#6b7b6c" }}>
                      {new Date(review.created_at).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  {review.title && (
                    <p className="font-medium text-sm mb-2" style={{ color: "#1e2b20" }}>{review.title}</p>
                  )}
                  <p className="text-sm font-light leading-relaxed" style={{ color: "#4a5e4c" }}>{review.body}</p>
                </div>
              ))
            )}
          </div>

          {/* Review form */}
          <div className="small:sticky small:top-24 self-start">
            <p className="label-caps mb-6 pb-4 text-xs" style={{ color: "#1e2b20", borderBottom: "1px solid rgba(30,43,32,0.1)" }}>
              Yorum Yaz
            </p>
            <ReviewForm productId={productId} />
          </div>
        </div>
      </div>
    </section>
  )
}

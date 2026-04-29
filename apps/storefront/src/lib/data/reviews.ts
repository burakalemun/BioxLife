import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ProductReview = {
  id: string
  product_id: string
  customer_name: string
  customer_email?: string
  rating: number
  title?: string
  body: string
  is_approved: boolean
  created_at: string
}

export async function getProductReviews(productId: string): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Reviews fetch error:", error)
    return []
  }

  return data || []
}

export async function getFeaturedReviews(): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("is_approved", true)
    .order("rating", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Featured reviews fetch error:", error)
    return []
  }

  return data || []
}

export async function submitReview(review: Omit<ProductReview, "id" | "is_approved" | "created_at">): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("product_reviews")
    .insert([{ ...review, is_approved: true }])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

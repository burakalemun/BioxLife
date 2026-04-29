import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { product_id, customer_name, rating, title, body } = await req.json()

    if (!product_id || !customer_name || !rating || !body) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Puan 1-5 arasında olmalıdır." }, { status: 400 })
    }

    const { error } = await supabase
      .from("product_reviews")
      .insert([{ product_id, customer_name, rating, title: title || null, body, is_approved: true }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Sunucu hatası." }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const product_id = searchParams.get("product_id")

  if (!product_id) {
    return NextResponse.json({ error: "product_id gerekli." }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("product_id", product_id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ reviews: data })
}

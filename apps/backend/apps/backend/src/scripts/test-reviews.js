const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://neyjgfifvnxifrcimhfl.supabase.co',
  'sb_publishable_a1tDGVHIBPxmzd76DzDmEQ_9R2K53x6'
)

async function test() {
  // Test insert
  const { data, error } = await supabase
    .from('product_reviews')
    .insert([{
      product_id: 'test_prod',
      customer_name: 'Test Kullanıcı',
      rating: 5,
      body: 'Test yorum',
      is_approved: true
    }])
    .select()

  if (error) {
    console.error('❌ INSERT HATA:', error.code, error.message)
  } else {
    console.log('✅ INSERT BAŞARILI:', data)
  }

  // Test select
  const { data: rows, error: selErr } = await supabase
    .from('product_reviews')
    .select('*')
    .limit(3)

  if (selErr) {
    console.error('❌ SELECT HATA:', selErr.message)
  } else {
    console.log('✅ SELECT BAŞARILI, satır sayısı:', rows.length)
  }
}

test()

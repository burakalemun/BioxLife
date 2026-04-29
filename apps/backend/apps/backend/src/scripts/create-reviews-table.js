const { Client } = require('pg');

async function run() {
  const client = new Client("postgresql://postgres.neyjgfifvnxifrcimhfl:xUr7Xz%247daTtPvz@aws-1-eu-north-1.pooler.supabase.com:5432/postgres");
  await client.connect();

  try {
    // Create product_reviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_reviews (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(500),
        body TEXT NOT NULL,
        is_approved BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log("✅ product_reviews tablosu oluşturuldu!");

    // Seed some sample reviews for homepage
    await client.query(`
      INSERT INTO product_reviews (product_id, customer_name, rating, title, body, is_approved) VALUES
      ('featured', 'Ayşe K.', 5, 'Harika bir ürün!', 'Lavanta yağını ilk kullandığımda inanamadım. Gerçekten çok sakinleştirici ve doğal bir koku. Bir daha başka markaya bakmayacağım.', true),
      ('featured', 'Mehmet A.', 5, 'Kalite fark yaratıyor', 'GC/MS sertifikası gerçekten önemli. Emin olarak kullanıyorum. Teslimat da çok hızlıydı, teşekkürler BioxLife!', true),
      ('featured', 'Selin Y.', 4, 'Mükemmel aromaterapi deneyimi', 'Difüzörümde kullanıyorum, tüm evi sarıyor. Fiyat kaliteye değiyor. Kesinlikle tavsiye ederim.', true),
      ('featured', 'Burak T.', 5, 'Doğal ürün arayışım bitti', 'Uzun süredir gerçekten saf uçucu yağ arıyordum. BioxLife ile tanıştıktan sonra başka bir yer aramıyorum.', true),
      ('featured', 'Zeynep M.', 5, 'Her gece ritüelim oldu', 'Uyumadan önce lavanta damlatıyorum yastığıma, uyku kalitem inanılmaz arttı. Herkese tavsiye ediyorum!', true)
      ON CONFLICT DO NOTHING;
    `);
    console.log("✅ Örnek yorumlar eklendi!");
  } catch (err) {
    console.error("❌ Hata:", err.message);
  }

  await client.end();
}

run();

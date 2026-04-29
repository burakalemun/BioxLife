const { Client } = require('pg');

async function run() {
  const client = new Client("postgresql://postgres.neyjgfifvnxifrcimhfl:xUr7Xz%247daTtPvz@aws-1-eu-north-1.pooler.supabase.com:5432/postgres");
  await client.connect();
  
  try {
    const id = "sp_" + Math.random().toString(36).substr(2, 9);
    await client.query(`
      INSERT INTO shipping_profile (id, name, type, created_at, updated_at) 
      VALUES ($1, $2, $3, NOW(), NOW())
    `, [id, 'Standart', 'default']);
    console.log("✅ Başarıyla 'Standart' (Default) Kargo Profili oluşturuldu! ID:", id);
  } catch (err) {
    if (err.code === '23505') {
       console.log("⚠️ Bir Kargo Profili zaten mevcut, koda dokunmaya gerek kalmadı.");
    } else {
       console.error("❌ Hata:", err.message);
    }
  }
  await client.end();
}

run();

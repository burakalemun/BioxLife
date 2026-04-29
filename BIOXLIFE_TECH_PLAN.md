# 🌿 BioxLife.com.tr — E-Ticaret Platform Planı
### Koku & Aktar Malzemesi Web Marketi | Kapsamlı Teknik Mimari v2.0

---

## 📋 Proje Özeti

| Alan | Detay |
|---|---|
| **Alan Adı** | bioxlife.com.tr |
| **Kategori** | E-Ticaret (Koku, Aktar, Doğal Ürün) |
| **Hedef Kitle** | Bireysel müşteriler, küçük ölçekli işletmeler |
| **Öncelik** | Güvenlik, Hızlı Lansman, Performans, SEO |
| **Dil** | Türkçe (çok dil desteği sonraki fazda) |

---

## 🏗️ Teknoloji Yığını (Tech Stack)

### Mimari Genel Görünümü

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare (WAF + CDN)                │
└────────────┬──────────────┬───────────────┬─────────────┘
             │              │               │
    bioxlife.com.tr  admin.bioxlife.com.tr  api.bioxlife.com.tr
             │              │               │
        ┌────▼────┐   ┌─────▼──────┐  ┌────▼──────────┐
        │ Next.js │   │Medusa Admin│  │ Medusa Server │
        │Frontend │   │  Panel     │  │  (Backend)    │
        └─────────┘   └────────────┘  └───────┬───────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │  PostgreSQL + Redis │
                                    └────────────────────┘

Hepsi → Tek Monorepo, Ayrı Deploy
```

### 🖥️ Frontend — Müşteri Mağazası

| Teknoloji | Seçim | Neden |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR/SSG ile SEO, Medusa JS SDK native uyum |
| **Dil** | TypeScript | Tip güvenliği |
| **Stil** | Tailwind CSS + shadcn/ui | Hızlı geliştirme, tutarlı UI |
| **State** | Zustand + React Query | Sepet için Zustand, API için React Query |
| **Form** | React Hook Form + Zod | Güvenli validasyon |
| **Animasyon** | Framer Motion | Premium UX |
| **Resim** | Next.js Image + Cloudinary | WebP, CDN |
| **Medusa SDK** | `@medusajs/js-sdk` | Type-safe API iletişimi |

### ⚙️ Backend — MedusaJS

| Modül | Hazır mı? | Notlar |
|---|---|---|
| Ürün & Varyant | ✅ Hazır | Koku notası alanları custom eklenecek |
| Kategori | ✅ Hazır | Aktar kategorileri yapılandırılacak |
| Sepet & Sipariş | ✅ Hazır | Standart akış |
| Müşteri Auth | ✅ Hazır | JWT tabanlı |
| İndirim & Kupon | ✅ Hazır | |
| Çoklu Para Birimi | ✅ Hazır | TRY öncelikli |
| Admin Panel | ✅ Hazır | `@medusajs/admin` |
| Ödeme Entegrasyonu | 🔧 Plugin | iyzico custom plugin |
| Gram Bazlı Stok | 🔧 Custom | Medusa üzerine özelleştirilecek |
| Koku Notası Alanları | 🔧 Custom | Product metadata ile |
| SDS PDF Yükleme | 🔧 Custom | File upload modülü |
| Toplu Fiyat Kademeleri | 🔧 Custom | Price list API ile |

### 👨‍💼 Admin Panel

```
Ne kullanacağız: Medusa'nın yerleşik Admin UI'ı (@medusajs/admin)

URL          : admin.bioxlife.com.tr
Auth         : Medusa admin auth (e-posta + şifre + 2FA eklenecek)
Erişim       : Sadece whitelist IP veya VPN (production'da)
Ayrı proje   : HAYIR — aynı repoda, ayrı subdomain

Admin'de yapabileceklerin:
  ✅ Ürün ekleme/düzenleme/silme
  ✅ Sipariş yönetimi
  ✅ Müşteri listesi
  ✅ İndirim & kupon oluşturma
  ✅ Kargo yönetimi
  ✅ Stok takibi
  🔧 Koku notası düzenleme (custom alan)
  🔧 SDS PDF yükleme (custom)
```

### 🗄️ Veritabanı

| Teknoloji | Kullanım |
|---|---|
| **PostgreSQL 16** | Ana veritabanı (Medusa varsayılanı) |
| **Redis 7** | Session, rate limiting, cache |
| **Cloudinary** | Ürün görselleri, SDS PDF'ler |

### 🚀 Altyapı & DevOps

| Katman | Teknoloji |
|---|---|
| **Monorepo** | Turborepo |
| **Frontend Host** | Vercel |
| **Backend Host** | Railway (Medusa Server + PostgreSQL + Redis) |
| **CDN & Güvenlik** | Cloudflare Pro |
| **Container** | Docker + Docker Compose (local dev) |
| **CI/CD** | GitHub Actions |
| **Monitoring** | Sentry + UptimeRobot |
| **Log** | Pino |

---

## 💳 Ödeme Sistemi

```
Ana Ödeme    → iyzico (Türkiye'nin en yaygın gateway'i)
Yedek        → PayTR (iyzico problem yaşarsa)
```

| Yöntem | Sağlayıcı | Notlar |
|---|---|---|
| Kredi/Banka Kartı | iyzico | 3D Secure **zorunlu** |
| Taksit | iyzico | 2-12 taksit |
| Havale/EFT | Manuel onay | Sipariş bekleme durumu |
| Kapıda Ödeme | Kendi sistemi | Seçili bölgeler |
| Apple/Google Pay | iyzico | Mobil öncelikli |

**iyzico Medusa Entegrasyon Yöntemi:**
```
Medusa'nın Payment Provider API'si → Custom iyzico plugin
3D Secure callback → Medusa webhook handler
Tokenizasyon → Kart verisi kendi DB'de saklanmaz (PCI DSS)
```

---

## 🔐 GÜVENLİK MİMARİSİ

> **⚠️ Güvenlik birinci önceliktir. Her katman eksiksiz uygulanır.**

### Katman 1 — Ağ & DNS

```
Cloudflare Pro:
  ✅ WAF (Web Application Firewall) — OWASP rule set aktif
  ✅ DDoS koruması
  ✅ Bot yönetimi
  ✅ IP kara liste
  ✅ Rate limiting (Cloudflare düzeyinde)
  ✅ SSL/TLS: Full Strict modu
  ✅ DNSSEC aktif
  ✅ CAA Record: sadece Let's Encrypt yetkili
```

### Katman 2 — Kimlik Doğrulama

```
Müşteri Auth  : Medusa Customer Auth (JWT, httpOnly cookie)
Admin Auth    : Medusa Admin Auth + TOTP 2FA (zorunlu)
Token Süresi  : Access 15dk | Refresh 7gün
Şifre        : bcrypt (salt: 12)
Brute-force  : 5 başarısız giriş → 15dk kilit
Admin IP     : Whitelist veya VPN zorunlu (production)
```

### Katman 3 — API Güvenliği

```yaml
Rate Limiting (Medusa middleware):
  Genel API      : 100 istek/dakika/IP
  Login          : 5 deneme/15dk
  Ödeme          : 10 istek/saat/kullanıcı
  Şifre sıfırla  : 3 deneme/saat

CORS:
  Whitelist      : bioxlife.com.tr, www.bioxlife.com.tr
  Admin          : admin.bioxlife.com.tr (ayrı origin)

HTTP Headers:
  Content-Security-Policy
  X-Frame-Options: DENY
  HSTS: max-age=31536000; includeSubDomains; preload
  Referrer-Policy: strict-origin-when-cross-origin
```

### Katman 4 — Input Güvenliği

| Tehdit | Önlem |
|---|---|
| SQL Injection | Medusa → TypeORM (parametrik sorgu, ham SQL yok) |
| XSS | DOMPurify (frontend) + Medusa input validation |
| CSRF | SameSite=Strict cookie + Medusa CSRF middleware |
| File Upload | Tip kontrolü (magic bytes) + max 10MB + virüs tarama |

### Katman 5 — Veri Güvenliği & KVKK

```
İletim       : TLS 1.3 (1.0/1.1 devre dışı)
Kart Verisi  : Kendi sunucuda ASLA saklanmaz → iyzico tokenizasyon
Şifreli Alan : Kullanıcı adresi, telefon → AES-256

KVKK Uyumu:
  ✅ Aydınlatma metni
  ✅ Açık rıza formu
  ✅ Çerez politikası + consent banner
  ✅ Veri silme talebi endpoint'i
  ✅ Veri işleme audit logu
```

### Katman 6 — Sunucu Güvenliği

```
Railway/VPS:
  SSH          : Sadece key auth (parola kapalı)
  Firewall     : Sadece 80, 443, SSH açık
  Secrets      : Doppler (environment variables yönetimi)
  Rotasyon     : API key'ler 90 günde bir yenilenir
  .env         : Git'e asla commit edilmez
```

### Katman 7 — Monitoring & Anomali Tespiti

```
Sentry         : Uygulama hata takibi
UptimeRobot    : 5dk'da bir uptime kontrolü
Medusa Hooks   : Kritik işlem audit logu

Otomatik Uyarılar:
  🚨 5+ başarısız giriş → IP ban
  🚨 Olağandışı büyük sipariş → manuel onay
  🚨 Gece 02-06 arası admin girişi → e-posta uyarısı
  🚨 Ödeme hata oranı >%5 → anlık bildirim
```

---

## 🛍️ Ürün Yapısı

### Kategori Ağacı

```
├── Uçucu Yağlar
│   ├── Çiçek Bazlı (gül, lavanta, yasemin, neroli...)
│   ├── Ağaç Bazlı (sandal, sedir, oud, vetiver...)
│   └── Turunçgil (bergamot, limon, portakal...)
├── Koku Hammaddeleri
│   ├── Fiksatifler
│   ├── Aromatikler (sentetik)
│   └── Naturaller (absolut, resinoid)
├── Aktar Ürünleri
│   ├── Kurutulmuş Bitkiler
│   ├── Tohumlar & Baharatlar
│   └── Reçineler (benzoin, olibanum...)
└── Ekipman & Ambalaj
    ├── Şişeler & Kapaklar
    └── Ölçüm Araçları
```

### Ürüne Özel Custom Alanlar (Medusa Product Metadata)

```typescript
// Koku ürünleri için ek alanlar
metadata: {
  fragrance_top_notes: string[]      // Üst nota
  fragrance_middle_notes: string[]   // Orta nota
  fragrance_base_notes: string[]     // Alt nota
  intensity_level: 1 | 2 | 3 | 4 | 5
  origin_country: string             // Menşei
  sds_pdf_url: string                // Güvenlik Bilgi Formu
  unit: "gram" | "ml" | "adet"
  min_order_quantity: number
  bulk_prices: {                     // Toplu fiyat kademeleri
    quantity: number
    price: number
  }[]
}
```

### Sipariş Durum Akışı

```
PENDING_PAYMENT → PAYMENT_CONFIRMED → PREPARING → SHIPPED → DELIVERED → COMPLETED
                                                          ↓
                                                  CANCELLED / REFUND_REQUESTED → REFUNDED
```

---

## 📁 Monorepo Klasör Yapısı

```
bioxlife/                           ← GitHub Repo
├── apps/
│   ├── storefront/                 ← Next.js 14 (bioxlife.com.tr)
│   │   ├── app/
│   │   │   ├── (shop)/            ← Ürün listeleme, detay
│   │   │   ├── cart/              ← Sepet
│   │   │   ├── checkout/          ← Ödeme akışı (iyzico)
│   │   │   ├── account/           ← Profil, siparişler
│   │   │   └── (auth)/            ← Giriş, kayıt
│   │   └── components/
│   │
│   └── backend/                   ← MedusaJS (api.bioxlife.com.tr)
│       ├── src/
│       │   ├── modules/
│       │   │   ├── iyzico/        ← Custom iyzico payment provider
│       │   │   ├── fragrance/     ← Koku notası custom modülü
│       │   │   ├── wishlist/      ← Favori sistemi modülü
│       │   │   └── bulk-pricing/  ← Toplu fiyat kademeleri
│       │   ├── api/               ← Custom API endpoint'leri
│       │   └── subscribers/       ← Event handler'lar (sipariş, ödeme)
│       └── medusa-config.ts
│
├── packages/
│   ├── types/                     ← Paylaşılan TypeScript tipleri
│   └── utils/                     ← Paylaşılan yardımcı fonksiyonlar
│
├── docker-compose.yml             ← Local dev ortamı
├── turbo.json                     ← Turborepo config
└── .github/workflows/             ← CI/CD
```

---

## 🗓️ 12 Haftalık Geliştirme Yol Haritası

### Faz 1 — Altyapı & Temel Kurulum (Hafta 1-2)
- [x] Monorepo kurulumu (Turborepo)
- [x] MedusaJS kurulumu + PostgreSQL + Redis (Docker)
- [ ] Cloudflare DNS yapılandırması (3 subdomain)
- [ ] GitHub Actions CI/CD pipeline
- [ ] Railway deploy (backend) + Vercel deploy (frontend)
- [ ] Doppler secrets yönetimi
- [ ] WAF + HSTS + güvenlik header'ları

### Faz 2 — Backend Özelleştirme (Hafta 3-4)
- [ ] iyzico custom payment provider (3D Secure)
- [ ] Gram/ml bazlı stok modülü
- [x] Koku notası metadata sistemi
- [x] SDS PDF yükleme (Cloudinary)
- [x] Ürün Favorileme (Wishlist) Backend Modülü
- [ ] Toplu fiyat kademeleri
- [ ] Admin 2FA entegrasyonu

### Faz 3 — Storefront (Hafta 5-7)
- [x] Ana sayfa (hero, öne çıkan ürünler, kategoriler)
- [x] Ürün listeleme + filtreleme (koku notası, kategori, fiyat)
- [x] Ürün detay sayfası (notalar, SDS PDF, toplu fiyat - iptal)
- [x] Sepet + mini sepet
- [ ] Checkout akışı + iyzico 3D Secure popup
- [x] Sipariş onay sayfası
- [x] Kayıt & Giriş sayfaları

### Faz 4 — Kullanıcı Hesabı (Hafta 8)
- [x] Profil sayfası
- [x] Sipariş geçmişi & detayı
- [x] Adres yönetimi
- [x] Şifre değiştirme
- [x] Ürün Favorileme (Hesabım Entegrasyonu)
- [x] Veri silme talebi (KVKK)

### Faz 5 — Kargo & Bildirimler (Hafta 9-10)
- [ ] Yurtiçi Kargo API entegrasyonu
- [ ] Otomatik kargo kodu atama
- [ ] E-posta şablonları (Resend): kayıt, sipariş, kargo
- [ ] SMS bildirimi (Netgsm): kargo & teslimat
- [ ] Fatura PDF oluşturma

### Faz 6 — SEO, Test & Lansman (Hafta 11-12)
- [ ] SEO: metadata, Open Graph, sitemap.xml, robots.txt
- [ ] Core Web Vitals optimizasyonu
- [x] KVKK: aydınlatma metni, çerez banner
- [ ] OWASP Top 10 güvenlik testi
- [ ] Yük testi (k6)
- [ ] Staging'de tam kullanıcı akışı testi
- [ ] Production deploy
- [ ] Monitoring & alert kurulumu

---

## 🧪 Test Stratejisi

| Test Türü | Araç | Kapsam |
|---|---|---|
| Unit Test | Vitest | Custom modüller (iyzico, bulk pricing) |
| Integration Test | Supertest | Medusa API endpoint'leri |
| E2E Test | Playwright | Ödeme akışı, kayıt, sipariş |
| Güvenlik | OWASP ZAP | Açık tarama |
| Yük | k6 | 1000 eş zamanlı kullanıcı |
| Performans | Lighthouse CI | Her PR'da otomatik |

---

## 💰 Tahmini Aylık Maliyet

| Hizmet | Plan | Maliyet |
|---|---|---|
| Vercel (Storefront) | Pro | $20/ay |
| Railway (Medusa + DB) | Starter → Pro | $20-40/ay |
| Cloudflare | Pro | $20/ay |
| Redis (Railway) | Dahil | $0 |
| Cloudinary | Free → Plus | $0-50/ay |
| iyzico | %2.9 + komisyon | İşlem bazlı |
| Sentry | Team | $26/ay |
| Doppler (Secrets) | Team | $0-8/ay |
| **Toplam** | | **~$90-165/ay** |

---

## ✅ Lansman Öncesi Güvenlik Kontrol Listesi

- [ ] OWASP Top 10 testi geçildi
- [ ] Tüm inputlar validate & sanitize edildi
- [ ] Rate limiting tüm endpoint'lerde aktif
- [ ] 3D Secure her ödemede zorunlu
- [ ] Kart verisi kendi sunucuda saklanmıyor
- [ ] HTTPS zorunlu, HTTP → HTTPS redirect aktif
- [ ] HSTS preload listesinde
- [ ] Admin panel 2FA zorunlu
- [ ] Admin panel whitelist IP ile kısıtlı
- [ ] `npm audit` temiz
- [ ] `.env` git'te yok
- [ ] Hata mesajlarında stack trace yok (production)
- [ ] KVKK aydınlatma metni yayında
- [ ] Çerez banner aktif
- [ ] Yedekleme test edildi (restore denenildi)
- [ ] Cloudflare WAF aktif ve test edildi
- [ ] Penetrasyon testi raporu alındı
- [ ] Sentry monitoring aktif
- [ ] UptimeRobot alert kurulu

---

*v2.0 — Nisan 2026 | MedusaJS stack ile güncellendi*

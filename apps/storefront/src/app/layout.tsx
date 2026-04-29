import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Outfit } from "next/font/google"
import "styles/globals.css"
import { WishlistProvider } from "@lib/context/wishlist-context"
import { retrieveCustomer } from "@lib/data/customer"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "BioxLife | Doğanın Özü, Yaşamın Kokusu",
  description: "Saf, doğal ve lüks wellness deneyimi.",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()

  return (
    <html lang="tr" data-mode="light" className={outfit.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${outfit.variable} antialiased`}
        style={{ background: "#f5f0e8", color: "#1a1a18", fontFamily: "'Outfit', sans-serif" }}
      >
        <WishlistProvider customer={customer}>
          <main className="relative">{props.children}</main>
        </WishlistProvider>
      </body>
    </html>
  )
}

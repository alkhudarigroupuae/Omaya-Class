import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { CartProvider } from "@/lib/cart-context"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Omaya Class Dairy | Premium Ice Cream, Cakes & Patisserie",
  description:
    "Discover handcrafted ice cream, cakes, and fine patisserie at Omaya Class Dairy. Where tradition meets excellence since 1998.",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-81Z4XC2DMD" strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-81Z4XC2DMD');
          `}
        </Script>
      </head>
      <body className={`${playfair.className} font-sans antialiased`}>
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

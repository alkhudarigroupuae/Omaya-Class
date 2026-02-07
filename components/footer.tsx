"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const categories = [
    { name: t("iceCream"), slug: "ice-cream" },
    { name: t("cakes"), slug: "cakes" },
    { name: t("patisserie"), slug: "patisserie" },
    { name: t("croissant"), slug: "croissant" },
    { name: t("cookies"), slug: "cookies" },
    { name: t("juiceFruit"), slug: "juice-fruit" },
    { name: t("catering"), slug: "catering" },
    { name: t("omayaProducts"), slug: "omaya-products" },
    { name: t("ramadan"), slug: "ramadan" },
  ]

  return (
    <footer className="bg-foreground text-background py-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/footer-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="Omaya Class Dairy" width={60} height={60} className="mb-1" />
            <h3 className="text-xl font-serif font-bold tracking-wide text-white text-center">Omaya Class</h3>
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-[#b8860b]/50" />
              <span className="text-[#b8860b] text-xs tracking-[0.3em] uppercase">Dairy</span>
              <div className="h-px flex-1 bg-[#b8860b]/50" />
            </div>
            <p className="text-white leading-relaxed text-center text-xs">{t("premiumDescription")}</p>
          </div>

          {/* Links */}
          <div className="text-left">
            <h4 className="text-sm font-bold mb-2 tracking-wide text-white">{t("quickLinks")}</h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-1">
              <Link href="/" className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs">
                {t("home")}
              </Link>
              <Link href="/shop" className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs">
                {t("shop")}
              </Link>
              <Link href="/about" className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs">
                {t("aboutUs")}
              </Link>
              <Link
                href="/branches"
                className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs"
              >
                {t("branches")}
              </Link>
              <Link
                href="/employment"
                className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs"
              >
                {t("employment")}
              </Link>
              <Link href="/blog" className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs">
                {t("blog")}
              </Link>
              <Link href="/events" className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs">
                {t("events")}
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="text-left">
            <h4 className="text-sm font-bold mb-2 tracking-wide text-white">{t("categories")}</h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-1">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  className="text-white hover:text-[#b8860b] transition-colors tracking-wide text-xs"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Brand Info */}
          <div className="text-center">
            <h4 className="text-sm font-bold mb-2 tracking-wide text-white">{t("theArtOfExcellence")}</h4>
            <div className="h-px w-12 bg-white/30 mb-2 mx-auto" />
            <p className="text-white mb-1 text-xs italic">{t("whereTraditionMeetsPerfection")}</p>
            <p className="text-white text-xs">{t("luxuryConfectionery")}</p>
            <p className="text-white text-xs">{t("handcraftedInSyria")}</p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-3 pt-2 text-center">
          <p className="tracking-wide text-white text-xs">
            © {new Date().getFullYear()} Omaya Class Dairy. {t("allRightsReserved")}.
          </p>
          <p className="text-xs mt-1 tracking-wide text-white">
            {t("developedBy")}{" "}
            <a
              href="https://mr-appss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b8860b] hover:text-[#d4af37] transition-colors"
            >
              Mr Apps
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

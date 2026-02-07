"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Menu,
  X,
  ChevronDown,
  IceCream,
  Cake,
  Cookie,
  Croissant,
  Coffee,
  Citrus,
  UtensilsCrossed,
  Package,
  Moon,
  ShoppingCart,
  User,
  Globe,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"

const quickShopCategories = [
  { titleKey: "iceCream", href: "/shop?category=ice-cream", icon: IceCream },
  { titleKey: "cake", href: "/shop?category=cake", icon: Cake },
  { titleKey: "arabicSweet", href: "/shop?category=arabic-sweet", icon: Cookie },
  { titleKey: "pastries", href: "/shop?category=pastries", icon: Croissant },
  { titleKey: "petitFour", href: "/shop?category=petit-four", icon: Cookie },
  { titleKey: "waffleCrepe", href: "/shop?category=waffle-crepe", icon: Coffee },
  { titleKey: "juiceFruit", href: "/shop?category=juice-and-fruit", icon: Citrus },
  { titleKey: "mainMeals", href: "/shop?category=main-meals", icon: UtensilsCrossed },
  { titleKey: "omayaProducts", href: "/shop?category=omaya-products", icon: Package },
  { titleKey: "ramadan", href: "/shop?category=ramadan", icon: Moon },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quickShopOpen, setQuickShopOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { totalItems } = useCart()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Main Header */}
      <div
        className={`relative transition-all duration-500 ${
          scrolled
            ? "bg-background/98 backdrop-blur-xl shadow-lg shadow-primary/5"
            : "bg-background/95 backdrop-blur-md"
        } border-b border-primary/10`}
      >
        <div
          className="absolute inset-0 opacity-70 pointer-events-none"
          style={{
            backgroundImage: "url('/menu-pattern.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto 100%",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-20" : "h-24"}`}
          >
            {/* Left Navigation */}
            <nav className="hidden md:flex items-center justify-end gap-6 flex-1 pr-6">
              <Link
                href="/"
                className="relative text-foreground font-medium tracking-wide uppercase text-sm group overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                  {t("home")}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>

              <Link
                href="/shop"
                className="relative text-foreground font-medium tracking-wide uppercase text-sm group overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                  {t("shop")}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setQuickShopOpen(true)}
                onMouseLeave={() => setQuickShopOpen(false)}
              >
                <button className="flex items-center gap-1 text-foreground font-medium tracking-wide uppercase text-sm group">
                  <span className="transition-colors duration-300 group-hover:text-primary">{t("quickShop")}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-all duration-300 group-hover:text-primary ${quickShopOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-all duration-300 ${
                    quickShopOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="bg-background/98 backdrop-blur-xl border border-primary/30 p-5 rounded-xl">
                    <div className="flex items-center gap-3">
                      {quickShopCategories.map((cat) => {
                        const IconComponent = cat.icon
                        return (
                          <Link
                            key={cat.titleKey}
                            href={cat.href}
                            className="group/item relative w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                            title={t(cat.titleKey)}
                          >
                            <IconComponent
                              size={22}
                              className="text-primary group-hover/item:text-white transition-colors duration-300"
                            />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                              {t(cat.titleKey)}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Center Logo */}
            <Link
              href="/"
              className={`relative flex-shrink-0 mr-8 ml-4 transition-all duration-500 ${scrolled ? "scale-90" : "scale-100"}`}
            >
              <Image
                src="/logo.png"
                alt="Mahmoud Bey Dairy"
                width={100}
                height={100}
                className={`transition-all duration-500 ${scrolled ? "h-16" : "h-20"} w-auto`}
              />
            </Link>

            {/* Right Navigation */}
            <nav className="hidden md:flex items-center justify-end gap-6 flex-1 pl-6">
              <div className="flex items-center gap-6 mr-auto">
                <Link
                  href="/branches"
                  className="relative text-foreground font-medium tracking-wide uppercase text-sm group overflow-hidden"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                    {t("branches")}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>

                <Link
                  href="/about"
                  className="relative text-foreground font-medium tracking-wide uppercase text-sm group overflow-hidden"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                    {t("about")}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>

                <Link
                  href="/news"
                  className="relative text-foreground font-medium tracking-wide uppercase text-sm group overflow-hidden"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                    {t("news")}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
              </div>

              {/* Icons Group */}
              <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <div
                  className="relative"
                  onMouseEnter={() => setLangMenuOpen(true)}
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <button className="flex items-center gap-1 p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group">
                    <Globe
                      size={20}
                      className="text-foreground group-hover:text-primary transition-colors duration-300"
                    />
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {language === "en" ? "EN" : "AR"}
                    </span>
                  </button>

                  <div
                    className={`absolute top-full right-0 mt-2 transition-all duration-300 ${
                      langMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="bg-background/98 backdrop-blur-xl border border-primary/30 rounded-xl overflow-hidden min-w-[100px]">
                      <button
                        onClick={() => setLanguage("en")}
                        className={`w-full px-4 py-2 text-sm font-medium text-left hover:bg-primary/10 transition-colors ${
                          language === "en" ? "text-primary bg-primary/5" : "text-foreground"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLanguage("ar")}
                        className={`w-full px-4 py-2 text-sm font-medium text-left hover:bg-primary/10 transition-colors ${
                          language === "ar" ? "text-primary bg-primary/5" : "text-foreground"
                        }`}
                      >
                        العربية
                      </button>
                    </div>
                  </div>
                </div>

                <Link
                  href="/cart"
                  className="relative group p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <ShoppingCart
                    size={22}
                    className="text-foreground group-hover:text-primary transition-colors duration-300"
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <Link
                  href="/account"
                  className="relative group p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <User size={22} className="text-foreground group-hover:text-primary transition-colors duration-300" />
                </Link>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center justify-end gap-1 ml-auto">
              {/* Mobile Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className="p-1.5 text-foreground hover:text-primary transition-colors"
              >
                <Globe size={18} />
              </button>

              <button
                className="p-1.5 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="relative bg-background/98 backdrop-blur-md py-4 px-4 border-b border-primary/20 max-h-[70vh] overflow-y-auto">
          <div
            className="absolute inset-0 opacity-70 pointer-events-none"
            style={{
              backgroundImage: "url('/menu-pattern.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "auto 100%",
            }}
          />
          <div className="flex flex-col gap-3 relative z-10">
            <Link
              href="/"
              className="text-foreground font-medium tracking-wide uppercase text-sm hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/shop"
              className="text-foreground font-medium tracking-wide uppercase text-sm hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("shop")}
            </Link>

            <div className="border-t border-primary/20 pt-3">
              <p className="text-primary text-[10px] uppercase tracking-[0.2em] mb-2">{t("quickShop")}</p>
              <div className="grid grid-cols-5 gap-2">
                {quickShopCategories.map((cat) => {
                  const IconComponent = cat.icon
                  return (
                    <Link
                      key={cat.titleKey}
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group w-11 h-11 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 mx-auto"
                      title={t(cat.titleKey)}
                    >
                      <IconComponent size={18} className="text-primary group-hover:text-white transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-primary/20 pt-3 flex flex-col gap-3">
              <Link
                href="/branches"
                className="text-foreground font-medium tracking-wide uppercase text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("branches")}
              </Link>
              <Link
                href="/news"
                className="text-foreground font-medium tracking-wide uppercase text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("news")}
              </Link>
              <Link
                href="/news"
                className="text-foreground font-medium tracking-wide uppercase text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("news")}
              </Link>
              <Link
                href="/account"
                className="text-foreground font-medium tracking-wide uppercase text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("myAccount")}
              </Link>
              <Link
                href="/cart"
                className="text-foreground font-medium tracking-wide uppercase text-sm hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("cart")}
                {totalItems > 0 && (
                  <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{totalItems}</span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

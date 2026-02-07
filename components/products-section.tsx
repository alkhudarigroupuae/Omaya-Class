"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function ProductsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [headerVisible, setHeaderVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const categories = [
    { title: t("iceCream"), image: "/categories/ice-cream.jpg", href: "/shop?category=ice-cream" },
    { title: t("cake"), image: "/categories/cake.jpg", href: "/shop?category=cake" },
    { title: t("arabicSweet"), image: "/categories/arabic-sweet.jpg", href: "/shop?category=arabic-sweet" },
    { title: t("pastries"), image: "/categories/pastries.jpg", href: "/shop?category=pastries" },
    { title: t("petitFour"), image: "/categories/petit-four.jpg", href: "/shop?category=petit-four" },
    { title: t("waffleCrepe"), image: "/categories/waffle-crepe.jpg", href: "/shop?category=waffle-crepe" },
    { title: t("juiceFruit"), image: "/categories/juice-fruit-new.jpg", href: "/shop?category=juice-and-fruit" },
    { title: t("mainMeals"), image: "/categories/main-meals.jpg", href: "/shop?category=main-meals" },
    { title: t("omayaProducts"), image: "/categories/omaya-products-new.jpg", href: "/shop?category=omaya-products" },
    { title: t("ramadan"), image: "/categories/ramadan.jpg", href: "/shop?category=ramadan" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index")
            if (index === "header") {
              setHeaderVisible(true)
            } else {
              setVisibleItems((prev) => [...new Set([...prev, Number(index)])])
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" ref={sectionRef} className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-index="header" className="text-center mb-12">
          <div className={`transition-all duration-1000 ${headerVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-px bg-[#C9A962]" />
                <div className="w-2 h-2 rotate-45 border border-[#C9A962]" />
              </div>
              <p className="text-[#C9A962] tracking-[0.4em] uppercase text-xs font-medium">{t("ourCategories")}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rotate-45 border border-[#C9A962]" />
                <div className="w-12 h-px bg-[#C9A962]" />
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-[#5C4A1F] mb-2">{t("ourCategories")}</h2>

            <div className="flex items-center justify-center gap-4 mt-3 mb-2">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A962]" />
              <div className="w-3 h-3 rotate-45 bg-[#C9A962]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A962]" />
            </div>

            <p className="text-lg text-[#7A6B4E] max-w-xl mx-auto tracking-wide">{t("exploreOurPremiumSelection")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              data-index={index}
              className={`group relative aspect-[4/5] overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 h-[2px] bg-[#C9A962] animate-border-top" style={{ width: 0 }} />
                <div
                  className="absolute top-0 right-0 w-[2px] bg-[#C9A962] animate-border-right"
                  style={{ height: 0 }}
                />
                <div
                  className="absolute bottom-0 right-0 h-[2px] bg-[#C9A962] animate-border-bottom"
                  style={{ width: 0 }}
                />
                <div
                  className="absolute bottom-0 left-0 w-[2px] bg-[#C9A962] animate-border-left"
                  style={{ height: 0 }}
                />
              </div>

              <div className="absolute inset-3 rounded-lg pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute top-0 left-0 h-[1px] bg-[#C9A962]/60 animate-border-top-delayed"
                  style={{ width: 0 }}
                />
                <div
                  className="absolute top-0 right-0 w-[1px] bg-[#C9A962]/60 animate-border-right-delayed"
                  style={{ height: 0 }}
                />
                <div
                  className="absolute bottom-0 right-0 h-[1px] bg-[#C9A962]/60 animate-border-bottom-delayed"
                  style={{ width: 0 }}
                />
                <div
                  className="absolute bottom-0 left-0 w-[1px] bg-[#C9A962]/60 animate-border-left-delayed"
                  style={{ height: 0 }}
                />
              </div>

              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              />

              {/* Light elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/80 via-[#3D2B1F]/30 to-transparent rounded-xl pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center pointer-events-none">
                <div className="w-8 h-px bg-[#C9A962] mb-3 transition-all duration-300 group-hover:w-12" />
                <h3 className="text-white text-lg font-bold tracking-wide">{category.title}</h3>
              </div>

              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#C9A962] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 pointer-events-none shadow-[0_0_10px_rgba(201,169,98,0.5)]" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#C9A962] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 pointer-events-none shadow-[0_0_10px_rgba(201,169,98,0.5)]" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#C9A962] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 pointer-events-none shadow-[0_0_10px_rgba(201,169,98,0.5)]" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#C9A962] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 pointer-events-none shadow-[0_0_10px_rgba(201,169,98,0.5)]" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-4 px-14 py-5 bg-[#C9A962] text-white font-semibold tracking-[0.25em] uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-[#A88B4A]"
          >
            <span className="relative z-10">{t("shopAllProducts")}</span>
            <svg
              className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Link>
        </div>
      </div>
    </section>
  )
}

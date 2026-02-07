"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CakeFeatured() {
  const { t } = useLanguage()

  const featuredCakes = [
    {
      id: "cake-1",
      name: t("chocolateLayerCake"),
      image: "/elegant-chocolate-layer-cake-with-gold-decorations.jpg",
      price: "45,000",
    },
    {
      id: "cake-2",
      name: t("redVelvetCake"),
      image: "/red-velvet-cake-with-cream-cheese-frosting-elegant.jpg",
      price: "42,000",
    },
    {
      id: "cake-3",
      name: t("strawberryCheesecake"),
      image: "/strawberry-cheesecake-elegant-presentation.jpg",
      price: "38,000",
    },
    {
      id: "cake-4",
      name: t("tiramisuCake"),
      image: "/tiramisu-cake-elegant-coffee-dessert.jpg",
      price: "48,000",
    },
  ]

  return (
    <section className="py-12 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE4] to-[#E8DFD4] rounded-3xl overflow-hidden p-6 md:p-10 border border-[#C9A962]/30 shadow-lg">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C9A962]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#C9A962]/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#C9A962]/10 rounded-full" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px bg-[#C9A962]" />
                  <span className="text-[#8B7355] text-xs tracking-[0.3em] uppercase">{t("featured")}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#3D2B1F]">{t("cakeCollection")}</h3>
              </div>
              <Link
                href="/shop?category=cakes"
                className="hidden md:flex items-center gap-2 px-5 py-2 border border-[#C9A962] text-[#8B7355] text-sm tracking-wider hover:bg-[#C9A962] hover:text-white transition-all duration-300 rounded-xl"
              >
                {t("viewAll")}
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredCakes.map((item) => (
                <Link key={item.id} href="/shop?category=cakes" className="group cursor-pointer block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl mb-2 shadow-md">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                  </div>
                  <h4 className="text-[#3D2B1F] text-sm font-medium text-center mb-1">{item.name}</h4>
                  <p className="text-[#C9A962] text-xs text-center font-semibold">{item.price} SYP</p>
                </Link>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="md:hidden mt-4 text-center">
              <Link
                href="/shop?category=cakes"
                className="inline-flex items-center gap-2 px-5 py-2 border border-[#C9A962] text-[#8B7355] text-sm tracking-wider hover:bg-[#C9A962] hover:text-white transition-all duration-300 rounded-xl"
              >
                {t("viewAll")}
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

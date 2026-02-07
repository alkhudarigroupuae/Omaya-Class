"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Great_Vibes } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/hero-bg.jpg" alt="Delicious desserts" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#f5e6d3]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f0e5]/80 via-transparent to-[#f8f0e5]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f0e5]/90 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-8 md:inset-16 border border-[#C9A962]/30 pointer-events-none" />
      <div className="absolute inset-10 md:inset-20 border border-[#C9A962]/20 pointer-events-none" />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 md:top-16 md:left-16 w-16 h-16 border-t-2 border-l-2 border-[#C9A962]" />
      <div className="absolute top-8 right-8 md:top-16 md:right-16 w-16 h-16 border-t-2 border-r-2 border-[#C9A962]" />
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 w-16 h-16 border-b-2 border-l-2 border-[#C9A962]" />
      <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 w-16 h-16 border-b-2 border-r-2 border-[#C9A962]" />

      <div className="absolute top-1/4 left-8 md:left-24 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A962] to-transparent opacity-60" />
      <div className="absolute bottom-1/4 right-8 md:right-24 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A962] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div
            className={`flex items-center justify-center gap-6 mb-6 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#C9A962]" />
            <p className="text-[#8B6914] font-medium tracking-[0.4em] uppercase text-xs">{t("estSince")}</p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#C9A962]" />
          </div>

          <h1
            className={`text-6xl md:text-8xl lg:text-9xl font-bold text-[#5C4A1F] -mb-2 md:-mb-4 leading-none tracking-wide ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            } ${greatVibes.className}`}
            style={{ animationDelay: "0.4s" }}
          >
            Mahmoud Bey
          </h1>

          <h2
            className={`text-xl md:text-2xl font-light text-[#5C4A1F] mb-4 tracking-[0.3em] uppercase ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            Omaya Class Dairy
          </h2>

          <div
            className={`flex items-center justify-center gap-4 mb-4 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.8s" }}
          >
            <div className="w-8 h-px bg-[#C9A962]" />
            <div className="w-2 h-2 rotate-45 border border-[#C9A962]" />
            <div className="w-8 h-px bg-[#C9A962]" />
          </div>

          <p
            className={`text-2xl md:text-3xl text-[#5C4A1F] mb-2 font-light italic ${
              isVisible ? "animate-slide-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "1.1s" }}
          >
            {t("theArtOfFineConfectionery")}
          </p>

          <p
            className={`text-lg text-[#7A6B4E] mb-6 max-w-xl mx-auto leading-relaxed tracking-wide ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "1.3s" }}
          >
            {t("heroDescription")}
          </p>

          <p
            className={`text-base text-[#5C4A1F] mb-10 max-w-2xl mx-auto leading-relaxed tracking-wide bg-[#f8f0e5]/60 backdrop-blur-sm py-4 px-6 rounded-xl border border-[#C9A962]/20 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "1.4s" }}
          >
            {t("prideStatement")}
          </p>

          <div
            className={`flex flex-wrap justify-center gap-6 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
            style={{ animationDelay: "1.5s" }}
          >
            <a
              href="#products"
              className="group relative px-12 py-4 bg-[#C9A962] text-white font-medium tracking-[0.2em] uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-[#A88B4A] rounded-xl"
            >
              <span className="relative z-10">{t("exploreProducts")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </a>
            <a
              href="#contact"
              className="px-12 py-4 border-2 border-[#C9A962] text-[#C9A962] font-medium tracking-[0.2em] uppercase text-sm transition-all duration-300 hover:bg-[#C9A962] hover:text-white rounded-xl"
            >
              {t("contactUs")}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-[#C9A962]/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#C9A962] rounded-full" />
        </div>
      </div>
    </section>
  )
}

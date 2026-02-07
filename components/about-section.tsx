"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image - hidden on mobile */}
          <div
            className={`relative transition-all duration-1000 hidden md:block ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 border border-primary/20 rounded-2xl" />
              <div className="relative h-[200px] sm:h-[280px] md:h-[350px] bg-secondary/30 overflow-hidden rounded-xl">
                <Image src="/logo.png" alt="Omaya Class" fill className="object-contain p-8 sm:p-12 md:p-16" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <p className="text-primary tracking-[0.3em] uppercase text-sm">{t("ourHeritage")}</p>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{t("aboutOmayaClass")}</h2>

            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{t("aboutDescription1")}</p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t("aboutDescription2")}</p>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-5xl font-light text-primary mb-2">25+</p>
                <p className="text-muted-foreground text-sm tracking-wide uppercase">{t("years")}</p>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <p className="text-5xl font-light text-primary mb-2">100+</p>
                <p className="text-muted-foreground text-sm tracking-wide uppercase">{t("products")}</p>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <p className="text-5xl font-light text-primary mb-2">50K+</p>
                <p className="text-muted-foreground text-sm tracking-wide uppercase">{t("customers")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

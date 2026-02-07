"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function ExportQualitySection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-[#FAF7F2] border-b border-[#C9A962]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A962]" />
          <div className="w-3 h-3 rotate-45 bg-[#C9A962]" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A962]" />
        </div>

        {/* Text Content */}
        <p className="text-xl md:text-2xl text-[#5C4A1F] font-light leading-relaxed mb-10 tracking-wide">
          {t("exportQualityText")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/contact"
            className="group relative px-8 py-3 bg-[#5C4A1F] text-white font-medium tracking-widest uppercase text-sm overflow-hidden transition-all duration-300 hover:bg-[#3D2B1F] rounded-lg min-w-[160px]"
          >
            <span className="relative z-10">{t("contactUs")}</span>
          </Link>

          <Link
            href="/factory"
            className="group relative px-8 py-3 border border-[#C9A962] text-[#C9A962] font-medium tracking-widest uppercase text-sm overflow-hidden transition-all duration-300 hover:bg-[#C9A962] hover:text-white rounded-lg min-w-[160px]"
          >
            <span className="relative z-10">{t("factory")}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

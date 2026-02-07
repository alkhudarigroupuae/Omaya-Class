"use client"

import { useLanguage } from "@/lib/language-context"
import { Cookie, IceCream, Star } from "lucide-react"

export function PackagingCategories() {
  const { t } = useLanguage()

  const categories = [
    {
      title: t("packagingBiscuitCake"),
      icon: Cookie,
      color: "#C9A962",
      delay: "0s",
    },
    {
      title: t("packagingIceCream"),
      icon: IceCream,
      color: "#5C4A1F",
      delay: "0.2s",
    },
    {
      title: t("exclusiveProducts"),
      icon: Star,
      color: "#C9A962",
      delay: "0.4s",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#C9A962]/10 overflow-hidden"
                style={{ animationDelay: item.delay }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[#C9A962]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Icon Container with Pulse Animation */}
                <div className="relative w-24 h-24 rounded-full bg-[#FAF7F2] flex items-center justify-center mb-8 shadow-inner group-hover:shadow-lg transition-all duration-500">
                  <div className="absolute inset-0 rounded-full border border-[#C9A962]/20 group-hover:scale-110 transition-transform duration-700" />
                  <Icon 
                    size={48} 
                    style={{ color: item.color }} 
                    className="transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#5C4A1F] mb-3 text-center tracking-wide group-hover:text-[#C9A962] transition-colors duration-300">
                  {item.title}
                </h3>
                
                <div className="w-16 h-1 bg-[#C9A962]/30 rounded-full mt-4 group-hover:w-24 group-hover:bg-[#C9A962] transition-all duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

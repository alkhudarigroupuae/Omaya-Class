"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const events = [
  {
    id: 589,
    titleKey: "ramadanAtmosphereArnous",
    date: "2024-03-29",
    image: "https://omayaclass.com/img/uploads1/medium/events20240330031244_589.jpg",
  },
  {
    id: 453,
    titleKey: "shamAlKheirFestival",
    date: "2024-03-05",
    image: "https://omayaclass.com/img/uploads1/medium/events20240315105042_453.06",
  },
  {
    id: 480,
    titleKey: "newYearCelebrationMazzeh",
    date: "2023-12-31",
    image: "https://omayaclass.com/img/uploads1/medium/events20240322113907_480.jpg",
  },
  {
    id: 481,
    titleKey: "economicDialogueForum",
    date: "2023-12-22",
    image: "https://omayaclass.com/img/uploads1/medium/events20240322114840_481.jpg",
  },
  {
    id: 483,
    titleKey: "teamAppreciationCertificates",
    date: "2023-11-28",
    image: "https://omayaclass.com/img/uploads1/medium/events20240323120957_483.jpg",
  },
  {
    id: 484,
    titleKey: "jobFairSheraton",
    date: "2023-11-27",
    image: "https://omayaclass.com/img/uploads1/medium/events20240323123518_484.jpg",
  },
  {
    id: 485,
    titleKey: "prophetBirthdayCommemoration",
    date: "2023-09-27",
    image: "https://omayaclass.com/img/uploads1/medium/events20240323124401_485.jpg",
  },
]

export default function EventsPage() {
  const { t, language } = useLanguage()
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === "ar" ? "ar-SY" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#3D2B1F] to-[#2A1F17]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border border-[#C9A962] rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-[#C9A962] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-[#C9A962] text-sm tracking-[0.3em] uppercase mb-4">Omaya Class</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("ourEvents")}</h1>
          <div className="w-24 h-1 bg-[#C9A962] mx-auto mb-6" />
          <p className="text-white/70 max-w-2xl mx-auto">{t("latestEventsDescription")}</p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={t(event.titleKey)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-[#C9A962] text-white px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <Calendar size={14} />
                    <span className="text-sm font-medium">{formatDate(event.date)}</span>
                  </div>

                  {/* Animated Border */}
                  <div
                    className={`absolute inset-4 pointer-events-none transition-opacity duration-500 ${
                      hoveredEvent === event.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C9A962] origin-left animate-[drawLine_0.3s_ease-out_forwards]" />
                    <div className="absolute top-0 right-0 w-0.5 h-full bg-[#C9A962] origin-top animate-[drawLine_0.3s_ease-out_0.3s_forwards]" />
                    <div className="absolute bottom-0 right-0 w-full h-0.5 bg-[#C9A962] origin-right animate-[drawLine_0.3s_ease-out_0.6s_forwards]" />
                    <div className="absolute bottom-0 left-0 w-0.5 h-full bg-[#C9A962] origin-bottom animate-[drawLine_0.3s_ease-out_0.9s_forwards]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3D2B1F] mb-4 group-hover:text-[#C9A962] transition-colors duration-300">
                    {t(event.titleKey)}
                  </h3>

                  <button className="flex items-center gap-2 text-[#C9A962] font-medium hover:gap-4 transition-all duration-300">
                    <span>{t("readMore")}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

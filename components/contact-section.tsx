"use client"

import { MapPin, Phone, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-16 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-6 mb-3">
            <div className="h-px w-16 bg-primary/40" />
            <p className="text-primary tracking-[0.3em] uppercase text-sm">{t("getInTouch")}</p>
            <div className="h-px w-16 bg-primary/40" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-3">{t("visitUs")}</h2>
          <p className="text-lg text-muted-foreground">{t("weWouldLoveToWelcomeYou")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border/50 p-6 text-center rounded-xl">
            <div className="w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-4 rounded-xl">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 tracking-wide">{t("location")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("damascusSyria")}
              <br />
              {t("omayaClassDairy")}
            </p>
          </div>

          <div className="bg-card border border-border/50 p-6 text-center rounded-xl">
            <div className="w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-4 rounded-xl">
              <Phone className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 tracking-wide">{t("contact")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              +11 7008
              <br />
              {t("callUsForOrders")}
            </p>
          </div>

          <div className="bg-card border border-border/50 p-6 text-center rounded-xl">
            <div className="w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-4 rounded-xl">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 tracking-wide">{t("hours")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("openDaily")}
              <br />
              9:00 AM - 11:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

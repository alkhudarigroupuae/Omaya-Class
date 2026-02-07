import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { IceCreamFeatured } from "@/components/ice-cream-featured"
import { CakeFeatured } from "@/components/cake-featured"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

function LoadingSpinner() {
  return (
    <div className="h-24 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      <HeroSection />
      <ProductsSection />
      <IceCreamFeatured />
      <CakeFeatured />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

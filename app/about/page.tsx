import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

function LoadingSpinner() {
  return (
    <div className="h-24 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      <div className="pt-32">
        <AboutSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}

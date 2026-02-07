import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

function LoadingSpinner() {
  return (
    <div className="h-24 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  )
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      <section className="pt-44 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="h-px w-16 bg-primary/40" />
              <p className="text-primary tracking-[0.3em] uppercase text-xs">Latest News</p>
              <div className="h-px w-16 bg-primary/40" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Blog</h1>
          </div>

          <div className="text-center py-20">
            <p className="text-muted-foreground mb-8">Blog posts coming soon...</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

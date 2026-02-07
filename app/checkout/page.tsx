import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutContent } from "@/components/checkout-content"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

function LoadingSpinner() {
  return (
    <div className="pt-44 pb-20 min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </main>
  )
}

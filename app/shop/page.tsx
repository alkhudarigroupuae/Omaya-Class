import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShopContent } from "@/components/shop-content"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

function ShopLoading() {
  return (
    <div className="pt-32 pb-20 bg-[#FAF7F2] min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-[#C9A962] animate-spin" />
    </div>
  )
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<ShopLoading />}>
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  )
}

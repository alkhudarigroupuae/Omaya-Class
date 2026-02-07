import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock, Loader2, ExternalLink } from "lucide-react"
import Image from "next/image"

export const dynamic = "force-dynamic"

const branches = [
  {
    name: "Arnous Branch",
    nameAr: "فرع عرنوس",
    status: "1st Branch",
    address: "Arnous Square, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/arnous.jpg",
  },
  {
    name: "Qudsaya Branch",
    nameAr: "ضاحية قدسيا",
    status: "2nd Branch",
    address: "Qudsaya, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/qudsaya.jpg",
  },
  {
    name: "Mazzeh Autostrad Branch",
    nameAr: "مزة أوتستراد",
    status: "3rd Branch",
    address: "Mazzeh Autostrad, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/branded-damascus.jpg",
  },
  {
    name: "Barzeh Housing Branch",
    nameAr: "مساكن برزة",
    status: "4th Branch",
    address: "Barzeh Housing, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/branded-damascus.jpg",
  },
  {
    name: "Dahyet Al-Assad Branch",
    nameAr: "ضاحية الأسد",
    status: "5th Branch",
    address: "Dahyet Al-Assad, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/branded-damascus.jpg",
  },
  {
    name: "Town Center Branch",
    nameAr: "تاون سنتر",
    status: "6th Branch",
    address: "Town Center, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/branded-damascus.jpg",
  },
  {
    name: "Governorate Square Branch",
    nameAr: "ساحة المحافظة",
    status: "7th Branch",
    address: "Governorate Square, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/governorate-square.png",
  },
  {
    name: "Al-Qusour Branch",
    nameAr: "فرع القصور",
    status: "8th Branch",
    address: "Al-Qusour, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/branded-damascus.jpg",
  },
  {
    name: "Al-Midan Branch",
    nameAr: "فرع الميدان",
    status: "Coming Soon",
    address: "Al-Midan, Damascus",
    phone: "+11 7008",
    hours: "9:00 AM - 11:00 PM",
    image: "/branches/branded-damascus.jpg",
  },
]

function LoadingSpinner() {
  return (
    <div className="h-24 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  )
}

export default function BranchesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>

      {/* Hero Section */}
      <section className="pt-44 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="h-px w-16 bg-primary/40" />
              <p className="text-primary tracking-[0.3em] uppercase text-xs">Find Us</p>
              <div className="h-px w-16 bg-primary/40" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Branches</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visit us at any of our branches across Damascus to experience the finest ice cream and desserts
            </p>
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="group border border-primary/20 rounded-xl overflow-hidden bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-xl"
              >
                {/* Branch Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={branch.image || "/placeholder.svg"}
                    alt={branch.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/80 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        branch.status === "Coming Soon" ? "bg-primary/90 text-white" : "bg-white/90 text-[#3D2B1F]"
                      }`}
                    >
                      {branch.status}
                    </span>
                  </div>

                  {/* Branch Name Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{branch.name}</h3>
                    <p className="text-white/70 text-sm">{branch.nameAr}</p>
                  </div>
                </div>

                {/* Branch Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <p className="text-muted-foreground">{branch.hours}</p>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(branch.address + ", Syria")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-white text-primary py-3 rounded-lg transition-all duration-300 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Can't Find a Branch Near You?</h2>
            <p className="text-muted-foreground mb-6">
              Contact us for delivery options or to learn about new branch openings
            </p>
            <a
              href="tel:+117008"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Us: +11 7008
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

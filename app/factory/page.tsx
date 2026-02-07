"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Great_Vibes } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

export default function FactoryPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#3D2B1F] to-[#2A1F17]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border border-[#C9A962] rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-[#C9A962] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className={`text-6xl md:text-8xl font-bold text-[#C9A962] -mb-2 md:-mb-4 leading-none tracking-wide ${greatVibes.className}`}>
            Mahmoud Bey
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-white mb-4 tracking-[0.3em] uppercase">
            {t("factory")}
          </h2>
          <div className="w-24 h-1 bg-[#C9A962] mx-auto mb-6" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-[#f8f0e5] flex items-center justify-center border border-[#C9A962]/20">
              <div className="relative w-64 h-64">
                <Image 
                  src="/logo.png" 
                  alt="Mahmoud Bey Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#5C4A1F]">Our Roots & Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Since 1998, Mahmoud Bey Dairy has been dedicated to crafting exceptional dairy products, desserts, and confectionery that celebrate both tradition and innovation. From day one, our mission has been simple: to create premium, handcrafted delights that bring joy to every table and elevate every occasion.
              </p>
              
              <h3 className="text-2xl font-bold text-[#5C4A1F] mt-6">Craftsmanship at the Heart</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our factory blends time-honored artisanal techniques with modern production standards to ensure the highest quality in every bite. We combine the knowledge passed down through generations with cutting-edge hygienic processes — ensuring safe, consistent, and delectable products.
              </p>
            </div>
          </div>

          {/* Key Features / What We Produce */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             <div className="bg-[#f8f0e5] p-8 rounded-xl border border-[#C9A962]/20 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#C9A962] rounded-full mb-6 flex items-center justify-center text-white font-bold text-xl">1</div>
                <h3 className="text-xl font-bold text-[#5C4A1F] mb-3">Italian & Russian Ice Cream</h3>
                <p className="text-gray-600">Rich, creamy, and intensely flavorful frozen delights.</p>
             </div>
             <div className="bg-[#f8f0e5] p-8 rounded-xl border border-[#C9A962]/20 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#C9A962] rounded-full mb-6 flex items-center justify-center text-white font-bold text-xl">2</div>
                <h3 className="text-xl font-bold text-[#5C4A1F] mb-3">Fine Cakes & Desserts</h3>
                <p className="text-gray-600">From classic favorites to contemporary creations.</p>
             </div>
             <div className="bg-[#f8f0e5] p-8 rounded-xl border border-[#C9A962]/20 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#C9A962] rounded-full mb-6 flex items-center justify-center text-white font-bold text-xl">3</div>
                <h3 className="text-xl font-bold text-[#5C4A1F] mb-3">Artisanal Patisserie</h3>
                <p className="text-gray-600">Delicate pastries and baked goods made with passion.</p>
             </div>
          </div>

          {/* Quality & Sustainability Section */}
          <div className="bg-[#f8f0e5]/50 rounded-2xl p-12 mb-24 border border-[#C9A962]/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-3xl font-bold text-[#5C4A1F] mb-6">Quality & Integrity</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    We uphold strict quality control at every step of manufacturing. Our passion for quality ensures products that are not only delicious but also safe and trustworthy.
                  </p>
                  <ul className="space-y-3">
                    {["Locally sourced fresh ingredients", "Precision in formulation and mixing", "Careful temperature and storage management", "Hygienic, certified production practices"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-[#C9A962] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div>
                  <h2 className="text-3xl font-bold text-[#5C4A1F] mb-6">Sustainable Practices</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    We believe in responsible production — minimizing waste, optimizing energy use, and supporting sustainable sourcing. Our team is committed to environmentally conscious operations that respect nature while delighting customers.
                  </p>
                  <h3 className="text-2xl font-bold text-[#5C4A1F] mb-4">From Factory to Family</h3>
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    "Every scoop of ice cream, every slice of cake, and every patisserie item carries the heart of our factory. We view our customers as part of our extended family, and your happiness is the true measure of our success."
                  </p>
               </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#5C4A1F] text-center mb-12">Inside Our Facility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Ice Cream Machine */}
               <div className="space-y-4">
                  <div className="relative h-80 rounded-lg overflow-hidden group shadow-lg">
                    <Image 
                      src="https://loremflickr.com/800/600/icecream,machine,production" 
                      alt="Ice Cream Production Machine" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#5C4A1F] text-center">Ice Cream Production Line</h3>
                  <p className="text-gray-600 text-center">High-capacity continuous freezers ensuring creamy texture.</p>
               </div>

               {/* Cake Oven */}
               <div className="space-y-4">
                  <div className="relative h-80 rounded-lg overflow-hidden group shadow-lg">
                    <Image 
                      src="https://loremflickr.com/800/600/bakery,oven,commercial" 
                      alt="Industrial Cake Oven" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#5C4A1F] text-center">Industrial Baking Ovens</h3>
                  <p className="text-gray-600 text-center">Precision-controlled ovens for perfect baking results.</p>
               </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

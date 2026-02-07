"use client"

import type React from "react"
import { useEffect, useRef, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search, Grid3X3, LayoutGrid, ShoppingCart, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { WooProduct, WooCategory } from "@/lib/woocommerce"

function normalizeArabic(text: string): string {
  return text
    .replace(/[أإآا]/g, "ا")
    .replace(/[ة]/g, "ه")
    .replace(/[ى]/g, "ي")
    .replace(/[ؤ]/g, "و")
    .replace(/[ئ]/g, "ي")
    .toLowerCase()
    .trim()
}

const categoryImages: Record<string, string> = {
  "ice-cream": "/categories/ice-cream.jpg",
  cake: "/categories/cake.jpg",
  "arabic-sweet": "/categories/arabic-sweet.jpg",
  pastries: "/categories/pastries.jpg",
  "petit-four": "/categories/petit-four.jpg",
  "waffle-crepe": "/categories/waffle-crepe.jpg",
  "juice-and-fruit": "/categories/juice-fruit-new.jpg",
  "main-meals": "/categories/main-meals.jpg",
  "omaya-products": "/categories/omaya-products-new.jpg",
  ramadan: "/categories/ramadan.jpg",
}

function SearchParamsHandler({ onCategoryChange }: { onCategoryChange: (slug: string | null) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const categorySlug = searchParams.get("category")
    onCategoryChange(categorySlug)
  }, [searchParams, onCategoryChange])

  return null
}

export function ShopContent() {
  const [categorySlug, setCategorySlug] = useState<string | null>(null)
  const [products, setProducts] = useState<WooProduct[]>([])
  const [categories, setCategories] = useState<WooCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      if (searchQuery !== debouncedSearch) {
        setCurrentPage(1)
        setProducts([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/woocommerce/categories")
        if (res.ok) {
          const data = await res.json()
          setCategories(data.filter((c: WooCategory) => c.count > 0))
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (categorySlug && categories.length > 0) {
      const cat = categories.find((c) => c.slug === categorySlug)
      if (cat) setActiveCategory(cat.id)
    }
  }, [categorySlug, categories])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set("page", currentPage.toString())
        params.set("per_page", "100") // Fetch more products for client-side filtering
        if (activeCategory) params.set("category", activeCategory.toString())

        const res = await fetch(`/api/woocommerce/products?${params.toString()}`)
        if (res.ok) {
          const data = await res.json()
          if (currentPage === 1) {
            setProducts(data.products)
          } else {
            setProducts((prev) => [...prev, ...data.products])
          }
          setTotalPages(data.totalPages)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [activeCategory, currentPage])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            if (!visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = document.querySelectorAll("[data-index]")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [products, visibleItems])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setDebouncedSearch(searchQuery)
    setCurrentPage(1)
    setProducts([])
  }

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const loadMore = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const filteredProducts = products.filter((product) => {
    if (!debouncedSearch) return true
    const normalizedSearch = normalizeArabic(debouncedSearch)
    const normalizedName = normalizeArabic(product.name)
    return normalizedName.includes(normalizedSearch)
  })

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-[#FDF8F3] to-white pb-16">
      <Suspense fallback={null}>
        <SearchParamsHandler onCategoryChange={setCategorySlug} />
      </Suspense>

      {/* Hero Banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image src="/hero-bg.jpg" alt="Shop Banner" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D2B1F]/70 via-[#3D2B1F]/50 to-[#FDF8F3]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-px bg-[#C9A962]" />
              <span className="text-[#C9A962] tracking-[0.3em] uppercase text-xs">Our Collection</span>
              <div className="w-16 h-px bg-[#C9A962]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Shop</h1>
            <p className="text-white/80 tracking-wide max-w-md mx-auto">
              Discover our handcrafted selection of premium desserts and treats
            </p>
          </div>
        </div>
      </div>

      {/* Categories - Desktop: Centered, Mobile: Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop - Centered Grid */}
        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(activeCategory === category.id ? null : category.id)
                setCurrentPage(1)
                setProducts([])
              }}
              className={`group flex flex-col items-center transition-all duration-300 ${
                activeCategory === category.id ? "scale-105" : ""
              }`}
            >
              <div
                className={`relative w-20 h-20 rounded-full overflow-hidden mb-2 border-2 transition-all duration-300 ${
                  activeCategory === category.id ? "border-[#C9A962] shadow-lg" : "border-transparent"
                }`}
              >
                <Image
                  src={categoryImages[category.slug] || "/placeholder.svg?height=80&width=80&query=category"}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    activeCategory === category.id ? "bg-[#C9A962]/20" : "bg-black/0 group-hover:bg-black/10"
                  }`}
                />
                {/* Animated Border on Hover */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-full opacity-0 group-hover:opacity-100">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-[#C9A962] animate-spin-slow"
                    style={{ animationDuration: "3s" }}
                  />
                </div>
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  activeCategory === category.id ? "text-[#C9A962]" : "text-[#5C4A1F] group-hover:text-[#C9A962]"
                }`}
              >
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile - Carousel */}
        <div className="md:hidden relative">
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 border border-[#C9A962]/30 rounded-full flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all duration-300 -ml-1"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(activeCategory === category.id ? null : category.id)
                  setCurrentPage(1)
                  setProducts([])
                }}
                className={`flex-shrink-0 group flex flex-col items-center transition-all duration-300 ${
                  activeCategory === category.id ? "scale-105" : ""
                }`}
              >
                <div
                  className={`relative w-16 h-16 rounded-full overflow-hidden mb-2 border-2 transition-all duration-300 ${
                    activeCategory === category.id ? "border-[#C9A962] shadow-lg" : "border-transparent"
                  }`}
                >
                  <Image
                    src={categoryImages[category.slug] || "/placeholder.svg?height=64&width=64&query=category"}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      activeCategory === category.id ? "bg-[#C9A962]/20" : "bg-black/0 group-hover:bg-black/10"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium text-center leading-tight transition-colors duration-300 ${
                    activeCategory === category.id ? "text-[#C9A962]" : "text-[#5C4A1F]"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 border border-[#C9A962]/30 rounded-full flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all duration-300 -mr-1"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Section */}
        <div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-px bg-[#C9A962]" />
                <div className="w-2 h-2 rotate-45 border border-[#C9A962]" />
              </div>
              <p className="text-[#C9A962] tracking-[0.4em] uppercase text-xs font-medium">
                {activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Products"}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rotate-45 border border-[#C9A962]" />
                <div className="w-12 h-px bg-[#C9A962]" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4A1F]">Products</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-[#C9A962]/20">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => {
                  setActiveCategory(null)
                  setCurrentPage(1)
                  setProducts([])
                }}
                className={`px-4 py-2 text-sm tracking-wider transition-all duration-300 border rounded-full ${
                  activeCategory === null
                    ? "bg-[#C9A962] text-white border-[#C9A962]"
                    : "bg-transparent text-[#5C4A1F] border-[#C9A962]/30 hover:border-[#C9A962]"
                }`}
              >
                All
              </button>
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(activeCategory === cat.id ? null : cat.id)
                    setCurrentPage(1)
                    setProducts([])
                  }}
                  className={`px-4 py-2 text-sm tracking-wider transition-all duration-300 border rounded-full ${
                    activeCategory === cat.id
                      ? "bg-[#C9A962] text-white border-[#C9A962]"
                      : "bg-transparent text-[#5C4A1F] border-[#C9A962]/30 hover:border-[#C9A962]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search & View Toggle */}
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B4E]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (e.target.value === "") {
                      setDebouncedSearch("")
                      setCurrentPage(1)
                      setProducts([])
                    }
                  }}
                  className="pl-11 pr-4 py-2 bg-white border border-[#C9A962]/30 text-[#5C4A1F] text-sm w-48 focus:outline-none focus:border-[#C9A962] transition-colors rounded-full"
                />
              </form>
              <div className="flex items-center border border-[#C9A962]/30 rounded-full overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#C9A962] text-white" : "text-[#7A6B4E] hover:text-[#C9A962]"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("large")}
                  className={`p-2 transition-colors ${viewMode === "large" ? "bg-[#C9A962] text-white" : "text-[#7A6B4E] hover:text-[#C9A962]"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && products.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-[#C9A962] animate-spin" />
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 && (
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}
            >
              {filteredProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  data-index={index + 100}
                  className={`group transition-all duration-700 ${
                    visibleItems.includes(index + 100) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-white border border-[#C9A962]/10 mb-3 rounded-xl">
                      <Image
                        src={product.images?.[0]?.src || "/placeholder.svg?height=400&width=400&query=dessert"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-[#5C4A1F] font-medium text-sm mb-1 group-hover:text-[#C9A962] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[#C9A962] font-bold text-sm">
                      {Number.parseFloat(product.price || "0").toLocaleString()} SYP
                    </p>
                  </Link>
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: Number.parseFloat(product.price || "0"),
                        image: product.images?.[0]?.src || "/assorted-desserts.png",
                        quantity: 1,
                      })
                    }
                    className="w-full mt-2 py-2 bg-[#C9A962] text-white text-xs tracking-wider hover:bg-[#5C4A1F] transition-all duration-300 flex items-center justify-center gap-2 rounded-lg"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* No Products */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#7A6B4E] text-lg">No products found</p>
            </div>
          )}

          {/* Load More Button */}
          {currentPage < totalPages && filteredProducts.length > 0 && !debouncedSearch && (
            <div className="flex items-center justify-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-[#C9A962] text-white tracking-wider hover:bg-[#5C4A1F] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 rounded-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

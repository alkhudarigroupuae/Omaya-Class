"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ShoppingCart,
  Minus,
  Plus,
  Loader2,
  ChevronLeft,
  CreditCard,
  Tag,
  Layers,
  Hash,
  Star,
  User,
  X,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import type { WooProduct } from "@/lib/woocommerce"

interface Review {
  id: number
  reviewer: string
  reviewer_email: string
  review: string
  rating: number
  date_created: string
  verified: boolean
}

export function ProductDetails({ productId }: { productId: string }) {
  const [product, setProduct] = useState<WooProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description")
  const { addItem } = useCart()
  const router = useRouter()
  const { t, language } = useLanguage()

  const [reviews, setReviews] = useState<Review[]>([])
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    reviewer: "",
    reviewer_email: "",
    review: "",
    rating: 5,
  })
  const [reviewError, setReviewError] = useState("")
  const [reviewSuccess, setReviewSuccess] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/woocommerce/products/${productId}`)
        if (res.ok) {
          const data = await res.json()
          setProduct(data)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  useEffect(() => {
    async function fetchReviews() {
      if (activeTab !== "reviews" || !productId) return
      setLoadingReviews(true)
      try {
        const res = await fetch(`/api/woocommerce/reviews?product_id=${productId}`)
        if (res.ok) {
          const data = await res.json()
          setReviews(data)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoadingReviews(false)
      }
    }
    fetchReviews()
  }, [activeTab, productId])

  useEffect(() => {
    const customerData = localStorage.getItem("omaya_customer")
    if (customerData) {
      const customer = JSON.parse(customerData)
      setReviewForm((prev) => ({
        ...prev,
        reviewer: `${customer.first_name || ""} ${customer.last_name || ""}`.trim(),
        reviewer_email: customer.email || "",
      }))
    }
  }, [])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addItem(product, quantity)
      router.push("/checkout")
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setReviewError("")
    setReviewSuccess(false)

    console.log("[v0] Review form submitted", reviewForm)
    console.log("[v0] Product ID:", productId)

    if (!reviewForm.reviewer || !reviewForm.reviewer_email || !reviewForm.review) {
      console.log("[v0] Missing fields:", {
        reviewer: reviewForm.reviewer,
        email: reviewForm.reviewer_email,
        review: reviewForm.review,
      })
      setReviewError(language === "ar" ? "الرجاء ملء جميع الحقول" : "Please fill all fields")
      return
    }

    setSubmittingReview(true)
    try {
      console.log("[v0] Sending review to API...")
      const res = await fetch("/api/woocommerce/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: Number(productId),
          ...reviewForm,
        }),
      })

      console.log("[v0] Review API response status:", res.status)

      if (res.ok) {
        const newReview = await res.json()
        console.log("[v0] Review submitted successfully:", newReview)
        setReviews((prev) => [newReview, ...prev])
        setReviewSuccess(true)
        setShowReviewForm(false)
        setReviewForm((prev) => ({ ...prev, review: "", rating: 5 }))
      } else {
        const error = await res.json()
        console.log("[v0] Review API error:", error)
        setReviewError(error.error || (language === "ar" ? "فشل إرسال التقييم" : "Failed to submit review"))
      }
    } catch (error) {
      console.log("[v0] Review submit exception:", error)
      setReviewError(language === "ar" ? "حدث خطأ، حاول مرة أخرى" : "An error occurred, please try again")
    } finally {
      setSubmittingReview(false)
    }
  }

  const renderStars = (rating: number, size = 16, interactive = false, onRate?: (r: number) => void) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            onClick={() => interactive && onRate && onRate(star)}
            className={`${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : star - 0.5 <= rating
                  ? "text-yellow-500 fill-yellow-500/50"
                  : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          />
        ))}
      </div>
    )
  }

  const cleanDescription = (html: string) => {
    if (!html) return ""
    const doc = new DOMParser().parseFromString(html, "text/html")
    let text = doc.body.textContent || ""
    text = text.replace(/Scraped from Omaya Class\.?\s*/gi, "")
    text = text.replace(/Original Price:\s*[\d,]+\s*ل\.س\.?\s*/gi, "")
    text = text.replace(/[\d,]+\s*ل\.س\.?\s*/gi, "")
    text = text.trim()
    return text
  }

  if (loading) {
    return (
      <section className="pt-44 pb-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </section>
    )
  }

  if (!product) {
    return (
      <section className="pt-44 pb-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product not found</h1>
          <Link href="/shop" className="text-primary hover:underline">
            {t("backToShop")}
          </Link>
        </div>
      </section>
    )
  }

  const averageRating = product.average_rating ? Number.parseFloat(product.average_rating) : 0
  const reviewCount = product.rating_count || 0

  return (
    <section className="pt-44 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-primary mb-8 hover:underline tracking-wide uppercase text-sm"
        >
          <ChevronLeft size={18} />
          {t("backToShop")}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square mb-4 border border-primary/20 overflow-hidden rounded-xl">
              <Image
                src={product.images?.[selectedImage]?.src || "/placeholder.svg?height=600&width=600&query=dessert"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.on_sale && (
                <span className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white text-sm tracking-wider rounded-lg">
                  {t("sale")}
                </span>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square border overflow-hidden rounded-lg ${
                      selectedImage === index ? "border-primary" : "border-primary/20 hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={img.src || "/placeholder.svg?height=150&width=150&query=dessert"}
                      alt={img.alt || product.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.categories?.[0] && (
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">{product.categories[0].name}</p>
            )}

            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              {renderStars(averageRating, 20)}
              <span className="text-muted-foreground text-sm">
                ({reviewCount} {language === "ar" ? "تقييم" : reviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              {product.on_sale && product.regular_price && (
                <span className="text-muted-foreground line-through text-xl">
                  {Number.parseFloat(product.regular_price).toLocaleString()} SYP
                </span>
              )}
              <span className="text-primary text-3xl font-bold">
                {Number.parseFloat(product.price || "0").toLocaleString()} SYP
              </span>
            </div>

            <div className="mb-8">
              {product.stock_status === "instock" ? (
                <span className="text-green-600 font-medium">{t("inStock")}</span>
              ) : (
                <span className="text-red-500 font-medium">{t("outOfStock")}</span>
              )}
            </div>

            {product.stock_status === "instock" && (
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-primary/30 rounded-xl">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-4 hover:bg-primary/10 transition-colors rounded-l-xl"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-6 py-4 min-w-[60px] text-center font-medium text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-4 hover:bg-primary/10 transition-colors rounded-r-xl"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors rounded-xl"
                  >
                    <ShoppingCart size={20} />
                    {t("addToCart")}
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#3D2B1F] text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-[#2D1B0F] transition-colors rounded-xl"
                >
                  <CreditCard size={20} />
                  {t("buyNow")}
                </button>
              </div>
            )}

            <div className="border-t border-primary/20 pt-6 mt-8 space-y-4">
              {product.sku && (
                <div className="flex items-center gap-3">
                  <Hash size={18} className="text-primary" />
                  <span className="text-muted-foreground font-medium">{t("sku")}:</span>
                  <span className="text-foreground">{product.sku}</span>
                </div>
              )}

              {product.categories && product.categories.length > 0 && (
                <div className="flex items-center gap-3">
                  <Layers size={18} className="text-primary" />
                  <span className="text-muted-foreground font-medium">{t("category")}:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {product.tags && product.tags.length > 0 && (
                <div className="flex items-center gap-3">
                  <Tag size={18} className="text-primary" />
                  <span className="text-muted-foreground font-medium">{t("tags")}:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/shop?tag=${tag.slug}`}
                        className="px-3 py-1 bg-secondary/50 text-foreground text-sm rounded-lg hover:bg-secondary transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex border-b border-primary/20">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-8 py-4 font-medium tracking-wide transition-colors relative ${
                activeTab === "description" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("description")}
              {activeTab === "description" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-8 py-4 font-medium tracking-wide transition-colors relative ${
                activeTab === "reviews" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("reviews")} ({reviews.length || reviewCount})
              {activeTab === "reviews" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          </div>

          <div className="py-8">
            {activeTab === "description" ? (
              <div className="prose prose-lg max-w-none">
                {product.description && cleanDescription(product.description) ? (
                  <p className="text-muted-foreground leading-relaxed">{cleanDescription(product.description)}</p>
                ) : product.short_description && cleanDescription(product.short_description) ? (
                  <p className="text-muted-foreground leading-relaxed">{cleanDescription(product.short_description)}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    {language === "ar" ? "لا يوجد وصف متاح لهذا المنتج" : "No description available for this product"}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Success Message */}
                {reviewSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                    {language === "ar"
                      ? "تم إرسال تقييمك بنجاح! سيظهر بعد المراجعة."
                      : "Your review was submitted successfully! It will appear after moderation."}
                  </div>
                )}

                {/* Reviews Summary */}
                <div className="flex flex-col md:flex-row gap-8 p-6 bg-secondary/30 rounded-xl">
                  <div className="text-center md:border-r md:border-primary/20 md:pr-8">
                    <div className="text-5xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
                    {renderStars(averageRating, 24)}
                    <p className="text-muted-foreground text-sm mt-2">
                      {t("basedOnReviews").replace("{count}", (reviews.length || reviewCount).toString())}
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = reviews.filter((r) => r.rating === stars).length
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm w-3">{stars}</span>
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Reviews List */}
                {loadingReviews ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-primary/10 pb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-foreground">{review.reviewer}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  {renderStars(review.rating)}
                                  {review.verified && (
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                      {t("verifiedPurchase")}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date_created).toLocaleDateString(
                                  language === "ar" ? "ar-SY" : "en-US",
                                )}
                              </span>
                            </div>
                            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: review.review }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star size={48} className="text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">{t("noReviewsYet")}</h3>
                    <p className="text-muted-foreground">{t("beFirstToReview")}</p>
                  </div>
                )}

                {/* Review Form */}
                {showReviewForm ? (
                  <form onSubmit={handleSubmitReview} className="p-6 bg-secondary/30 rounded-xl space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-foreground">
                        {language === "ar" ? "اكتب تقييمك" : "Write Your Review"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {reviewError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {reviewError}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {language === "ar" ? "الاسم" : "Name"} *
                        </label>
                        <input
                          type="text"
                          value={reviewForm.reviewer}
                          onChange={(e) => setReviewForm({ ...reviewForm, reviewer: e.target.value })}
                          className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {language === "ar" ? "البريد الإلكتروني" : "Email"} *
                        </label>
                        <input
                          type="email"
                          value={reviewForm.reviewer_email}
                          onChange={(e) => setReviewForm({ ...reviewForm, reviewer_email: e.target.value })}
                          className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === "ar" ? "التقييم" : "Rating"} *
                      </label>
                      <div className="flex items-center gap-2">
                        {renderStars(reviewForm.rating, 28, true, (r) => setReviewForm({ ...reviewForm, rating: r }))}
                        <span className="text-muted-foreground ml-2">({reviewForm.rating}/5)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === "ar" ? "تقييمك" : "Your Review"} *
                      </label>
                      <textarea
                        value={reviewForm.review}
                        onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background resize-none"
                        placeholder={
                          language === "ar"
                            ? "شاركنا رأيك في هذا المنتج..."
                            : "Share your thoughts about this product..."
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="w-full md:w-auto px-8 py-4 bg-primary text-white font-medium tracking-wide rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submittingReview && <Loader2 className="w-4 h-4 animate-spin" />}
                      {language === "ar" ? "إرسال التقييم" : "Submit Review"}
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full md:w-auto px-8 py-4 border-2 border-primary text-primary font-medium tracking-wide rounded-xl hover:bg-primary hover:text-white transition-colors"
                  >
                    {t("writeReview")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

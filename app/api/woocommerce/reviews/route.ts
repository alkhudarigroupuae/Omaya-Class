import { NextResponse } from "next/server"

const WOO_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

// GET reviews for a product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("product_id")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const url = `${WOO_URL}/wp-json/wc/v3/products/reviews?product=${productId}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

    console.log("[v0] Fetching reviews for product:", productId)

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Reviews fetch error:", errorText)
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: response.status })
    }

    const reviews = await response.json()
    console.log("[v0] Reviews count:", reviews.length)

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("[v0] Reviews error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST a new review
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { product_id, review, reviewer, reviewer_email, rating } = body

    console.log("[v0] Review submission received:", {
      product_id,
      reviewer,
      reviewer_email,
      rating,
      reviewLength: review?.length,
    })

    if (!product_id || !review || !reviewer || !reviewer_email || !rating) {
      console.log("[v0] Missing fields:", { product_id, review: !!review, reviewer, reviewer_email, rating })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const url = `${WOO_URL}/wp-json/wc/v3/products/reviews?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
    console.log("[v0] Sending review to WooCommerce...")

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: Number(product_id),
        review,
        reviewer,
        reviewer_email,
        rating: Number(rating),
      }),
    })

    const responseText = await response.text()
    console.log("[v0] WooCommerce response status:", response.status)
    console.log("[v0] WooCommerce response:", responseText)

    if (!response.ok) {
      return NextResponse.json({ error: responseText || "Failed to create review" }, { status: response.status })
    }

    const newReview = JSON.parse(responseText)
    console.log("[v0] Review created successfully, ID:", newReview.id)

    return NextResponse.json(newReview)
  } catch (error) {
    console.error("[v0] Review creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

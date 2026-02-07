import { NextResponse } from "next/server"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || "1"
  const per_page = searchParams.get("per_page") || "12"
  const category = searchParams.get("category") || ""
  const search = searchParams.get("search") || ""

  try {
    const params = new URLSearchParams({
      page,
      per_page,
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    })

    if (category) params.set("category", category)
    if (search) params.set("search", search)

    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/products?${params.toString()}`

    console.log("[v0] Fetching products from:", url)

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log("[v0] Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Error response:", errorText)
      return NextResponse.json({
        products: [],
        totalProducts: 0,
        totalPages: 1,
        currentPage: 1,
        error: `API Error: ${response.status}`,
      })
    }

    const products = await response.json()
    console.log("[v0] Products count:", products.length)

    const totalProducts = response.headers.get("X-WP-Total") || "0"
    const totalPages = response.headers.get("X-WP-TotalPages") || "1"

    return NextResponse.json({
      products,
      totalProducts: Number.parseInt(totalProducts),
      totalPages: Number.parseInt(totalPages),
      currentPage: Number.parseInt(page),
    })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({
      products: [],
      totalProducts: 0,
      totalPages: 1,
      currentPage: 1,
      error: String(error),
    })
  }
}

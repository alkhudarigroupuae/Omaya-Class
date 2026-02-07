import { NextResponse } from "next/server"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/products/${id}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

    console.log("[v0] Fetching product:", url)

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log("[v0] Product response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Product error:", errorText)
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const product = await response.json()
    console.log("[v0] Product found:", product.name)
    return NextResponse.json(product)
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

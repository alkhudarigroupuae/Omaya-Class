import { NextResponse } from "next/server"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

export async function GET() {
  try {
    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/products/categories?per_page=100&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json([])
    }

    const categories = await response.json()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return NextResponse.json([])
  }
}

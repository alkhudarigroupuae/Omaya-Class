import { NextResponse } from "next/server"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

const ADMIN_EMAILS = ["admin@mahmoudbey-oc.com"]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("[v0] Login attempt:", email)

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const sanitizedEmail = email.toLowerCase().trim()

    // Admin users - redirect to WooCommerce admin
    if (ADMIN_EMAILS.includes(sanitizedEmail)) {
      console.log("[v0] Admin user detected")
      return NextResponse.json({
        success: true,
        isAdmin: true,
        redirectTo: `${WOOCOMMERCE_URL}/wp-admin/`,
      })
    }

    // Regular customers - check WooCommerce
    const customersUrl = `${WOOCOMMERCE_URL}/wp-json/wc/v3/customers?email=${encodeURIComponent(sanitizedEmail)}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

    console.log("[v0] Fetching from WooCommerce...")

    const response = await fetch(customersUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] WooCommerce response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] WooCommerce error:", errorText)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    const customers = await response.json()
    console.log("[v0] Found customers:", customers.length)

    if (customers && customers.length > 0) {
      const customer = customers[0]
      console.log("[v0] Customer found:", customer.id)

      return NextResponse.json({
        success: true,
        isAdmin: false,
        customer: {
          id: customer.id,
          email: customer.email,
          firstName: customer.first_name,
          lastName: customer.last_name,
        },
      })
    }

    return NextResponse.json({ error: "Account not found. Please register first." }, { status: 401 })
  } catch (error) {
    console.error("[v0] Auth error:", error)
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 })
  }
}

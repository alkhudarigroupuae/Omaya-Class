import { NextResponse } from "next/server"
import { rateLimit, sanitizeInput, getClientIP, getSecurityHeaders, parseAndValidateBody } from "@/lib/security"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

const getAuthParams = () => `consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

// Create new order
export async function POST(request: Request) {
  const securityHeaders = getSecurityHeaders()

  try {
    const clientIP = getClientIP(request)
    if (!rateLimit(clientIP, 10, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: securityHeaders },
      )
    }

    const { data: body, error } = await parseAndValidateBody(request)
    if (error) {
      return NextResponse.json({ error }, { status: 400, headers: securityHeaders })
    }

    if (body.billing) {
      body.billing.first_name = sanitizeInput(body.billing.first_name || "")
      body.billing.last_name = sanitizeInput(body.billing.last_name || "")
      body.billing.address_1 = sanitizeInput(body.billing.address_1 || "")
      body.billing.city = sanitizeInput(body.billing.city || "")
      body.billing.phone = sanitizeInput(body.billing.phone || "")
    }

    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/orders?${getAuthParams()}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        set_paid: false,
      }),
    })

    if (!response.ok) {
      const responseError = await response.json()
      return NextResponse.json(
        { error: responseError.message || "Failed to create order" },
        { status: response.status, headers: securityHeaders },
      )
    }

    const order = await response.json()
    return NextResponse.json(order, { headers: securityHeaders })
  } catch (error) {
    console.error("[v0] Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500, headers: securityHeaders })
  }
}

export async function GET(request: Request) {
  const securityHeaders = getSecurityHeaders()
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customer_id")
  const email = searchParams.get("email")

  try {
    const clientIP = getClientIP(request)
    if (!rateLimit(clientIP, 30, 60000)) {
      return NextResponse.json([], { status: 429, headers: securityHeaders })
    }

    const baseUrl = `${WOOCOMMERCE_URL}/wp-json/wc/v3/orders`
    let url = `${baseUrl}?${getAuthParams()}&per_page=50`

    if (customerId && /^\d+$/.test(customerId)) {
      url += `&customer=${customerId}`
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json([], { headers: securityHeaders })
    }

    let orders = await response.json()

    // Filter by email if provided (for guest orders)
    if (email) {
      orders = orders.filter((order: any) => order.billing?.email?.toLowerCase() === email.toLowerCase())
    }

    return NextResponse.json(orders, { headers: securityHeaders })
  } catch (error) {
    console.error("[v0] Error fetching orders:", error)
    return NextResponse.json([], { headers: securityHeaders })
  }
}

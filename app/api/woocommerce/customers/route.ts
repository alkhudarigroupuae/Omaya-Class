import { NextResponse } from "next/server"
import {
  rateLimit,
  sanitizeInput,
  isValidEmail,
  isValidPassword,
  isValidOrigin,
  getClientIP,
  getSecurityHeaders,
  parseAndValidateBody,
} from "@/lib/security"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

// Create new customer
export async function POST(request: Request) {
  const securityHeaders = getSecurityHeaders()

  try {
    if (!isValidOrigin(request)) {
      return NextResponse.json({ error: "Unauthorized request origin" }, { status: 403, headers: securityHeaders })
    }

    const clientIP = getClientIP(request)
    if (!rateLimit(clientIP, 3, 60000)) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429, headers: securityHeaders },
      )
    }

    const { data: body, error } = await parseAndValidateBody(request)
    if (error) {
      return NextResponse.json({ error }, { status: 400, headers: securityHeaders })
    }

    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400, headers: securityHeaders })
    }

    if (body.password && !isValidPassword(body.password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400, headers: securityHeaders },
      )
    }

    const sanitizedBody = {
      email: sanitizeInput(body.email),
      first_name: sanitizeInput(body.first_name || ""),
      last_name: sanitizeInput(body.last_name || ""),
      username: sanitizeInput(body.username || body.email),
      password: body.password, // Don't sanitize password
      billing: body.billing
        ? {
            first_name: sanitizeInput(body.billing.first_name || ""),
            last_name: sanitizeInput(body.billing.last_name || ""),
            address_1: sanitizeInput(body.billing.address_1 || ""),
            city: sanitizeInput(body.billing.city || ""),
            phone: sanitizeInput(body.billing.phone || ""),
            email: sanitizeInput(body.billing.email || body.email),
          }
        : undefined,
    }

    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/customers?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedBody),
    })

    if (!response.ok) {
      const responseError = await response.json()
      return NextResponse.json(
        { error: responseError.message || "Failed to create customer" },
        { status: response.status, headers: securityHeaders },
      )
    }

    const customer = await response.json()
    return NextResponse.json(customer, { headers: securityHeaders })
  } catch (error) {
    console.error("[v0] Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500, headers: securityHeaders })
  }
}

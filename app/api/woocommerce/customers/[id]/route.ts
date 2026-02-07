import { NextResponse } from "next/server"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

const getAuthParams = () => `consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

// Get customer
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/customers/${id}?${getAuthParams()}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] WooCommerce customer error:", response.status, errorText)
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const customer = await response.json()
    return NextResponse.json(customer)
  } catch (error) {
    console.error("[v0] Error fetching customer:", error)
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 })
  }
}

// Update customer
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const body = await request.json()
    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/customers/${id}?${getAuthParams()}`

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] WooCommerce update customer error:", response.status, errorText)
      return NextResponse.json({ error: "Failed to update customer" }, { status: response.status })
    }

    const customer = await response.json()
    return NextResponse.json(customer)
  } catch (error) {
    console.error("[v0] Error updating customer:", error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

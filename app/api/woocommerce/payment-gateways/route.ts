import { NextResponse } from "next/server"

const WOOCOMMERCE_URL = "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = "cs_209ad78d536b80188b628f5e87bf03f323127603"

export async function GET() {
  try {
    const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3/payment_gateways?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json([{ id: "cod", title: "Cash on Delivery", enabled: true }])
    }

    const gateways = await response.json()
    const enabledGateways = gateways.filter((g: { enabled: boolean }) => g.enabled)
    return NextResponse.json(
      enabledGateways.length > 0 ? enabledGateways : [{ id: "cod", title: "Cash on Delivery", enabled: true }],
    )
  } catch (error) {
    console.error("Error fetching payment gateways:", error)
    return NextResponse.json([{ id: "cod", title: "Cash on Delivery", enabled: true }])
  }
}

// WooCommerce API Configuration
const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://admin.mahmoudbey-oc.com"
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || "ck_81e50a989294ceae53178513d107d0fe215a5109"
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || "cs_209ad78d536b80188b628f5e87bf03f323127603"

// API Base URL
const API_URL = `${WOOCOMMERCE_URL}/wp-json/wc/v3`

// WooCommerce accepts consumer_key and consumer_secret as query params
const getAuthParams = () => {
  return `consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
}

// Types
export interface WooProduct {
  id: number
  name: string
  slug: string
  permalink: string
  price: string
  regular_price: string
  sale_price: string
  description: string
  short_description: string
  images: { id: number; src: string; alt: string }[]
  categories: { id: number; name: string; slug: string }[]
  stock_status: string
  stock_quantity: number | null
  on_sale: boolean
  featured: boolean
}

export interface WooCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  image: { id: number; src: string; alt: string } | null
  count: number
}

export interface WooCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  billing: WooAddress
  shipping: WooAddress
}

export interface WooAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone?: string
}

export interface WooOrder {
  id: number
  status: string
  currency: string
  total: string
  customer_id: number
  billing: WooAddress
  shipping: WooAddress
  line_items: WooLineItem[]
  payment_method: string
  payment_method_title: string
  date_created: string
}

export interface WooLineItem {
  id: number
  name: string
  product_id: number
  quantity: number
  subtotal: string
  total: string
  price: number
  image: { src: string }
}

export interface CartItem {
  product: WooProduct
  quantity: number
}

export async function getProducts(params?: {
  per_page?: number
  page?: number
  category?: number
  search?: string
  featured?: boolean
  on_sale?: boolean
}): Promise<WooProduct[]> {
  const searchParams = new URLSearchParams()
  if (params?.per_page) searchParams.set("per_page", params.per_page.toString())
  if (params?.page) searchParams.set("page", params.page.toString())
  if (params?.category) searchParams.set("category", params.category.toString())
  if (params?.search) searchParams.set("search", params.search)
  if (params?.featured) searchParams.set("featured", "true")
  if (params?.on_sale) searchParams.set("on_sale", "true")

  const queryString = searchParams.toString()
  const authParams = getAuthParams()
  const url = `${API_URL}/products?${authParams}${queryString ? `&${queryString}` : ""}`

  console.log("[v0] Fetching products from:", url.replace(CONSUMER_KEY, "ck_***").replace(CONSUMER_SECRET, "cs_***"))

  try {
    const response = await fetch(url, {
      cache: "no-store",
    })

    console.log("[v0] Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Error response:", errorText)
      return []
    }

    const data = await response.json()
    console.log("[v0] Products fetched:", data.length)
    return data
  } catch (error) {
    console.log("[v0] Fetch error:", error)
    return []
  }
}

export async function getProduct(id: number): Promise<WooProduct | null> {
  const response = await fetch(`${API_URL}/products/${id}?${getAuthParams()}`, {
    cache: "no-store",
  })

  if (!response.ok) return null
  return response.json()
}

export async function getCategories(): Promise<WooCategory[]> {
  const response = await fetch(`${API_URL}/products/categories?per_page=100&${getAuthParams()}`, {
    cache: "no-store",
  })

  if (!response.ok) return []
  return response.json()
}

export async function getCategory(id: number): Promise<WooCategory | null> {
  const response = await fetch(`${API_URL}/products/categories/${id}?${getAuthParams()}`, {
    cache: "no-store",
  })

  if (!response.ok) return null
  return response.json()
}

// Customer Functions
export async function createCustomer(data: {
  email: string
  first_name: string
  last_name: string
  password: string
  billing?: Partial<WooAddress>
  shipping?: Partial<WooAddress>
}): Promise<WooCustomer | null> {
  const response = await fetch(`${API_URL}/customers?${getAuthParams()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) return null
  return response.json()
}

export async function getCustomer(id: number): Promise<WooCustomer | null> {
  const response = await fetch(`${API_URL}/customers/${id}?${getAuthParams()}`)

  if (!response.ok) return null
  return response.json()
}

export async function updateCustomer(id: number, data: Partial<WooCustomer>): Promise<WooCustomer | null> {
  const response = await fetch(`${API_URL}/customers/${id}?${getAuthParams()}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) return null
  return response.json()
}

// Order Functions
export async function createOrder(data: {
  customer_id?: number
  payment_method: string
  payment_method_title: string
  billing: WooAddress
  shipping: WooAddress
  line_items: { product_id: number; quantity: number }[]
}): Promise<WooOrder | null> {
  const response = await fetch(`${API_URL}/orders?${getAuthParams()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      set_paid: false,
    }),
  })

  if (!response.ok) return null
  return response.json()
}

export async function getOrder(id: number): Promise<WooOrder | null> {
  const response = await fetch(`${API_URL}/orders/${id}?${getAuthParams()}`)

  if (!response.ok) return null
  return response.json()
}

export async function getCustomerOrders(customerId: number): Promise<WooOrder[]> {
  const response = await fetch(`${API_URL}/orders?customer=${customerId}&${getAuthParams()}`)

  if (!response.ok) return []
  return response.json()
}

// Payment Methods
export async function getPaymentGateways(): Promise<{ id: string; title: string; enabled: boolean }[]> {
  const response = await fetch(`${API_URL}/payment_gateways?${getAuthParams()}`)

  if (!response.ok) return [{ id: "cod", title: "Cash on Delivery", enabled: true }]
  return response.json()
}

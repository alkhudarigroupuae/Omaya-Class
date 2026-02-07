"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { Check, CreditCard, Truck, Banknote, Loader2 } from "lucide-react"

export function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customer, setCustomer] = useState<any>(null)

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("omaya_customer")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setCustomer(parsed)
        // Pre-fill billing info from customer data
        setBillingInfo((prev) => ({
          ...prev,
          firstName: parsed.firstName || prev.firstName,
          lastName: parsed.lastName || prev.lastName,
          email: parsed.email || prev.email,
        }))
      } catch (e) {}
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Prepare order data for WooCommerce
      const orderData: any = {
        payment_method: paymentMethod === "cod" ? "cod" : "bacs",
        payment_method_title: paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card",
        set_paid: false,
        billing: {
          first_name: billingInfo.firstName,
          last_name: billingInfo.lastName,
          email: billingInfo.email,
          phone: billingInfo.phone,
          address_1: billingInfo.address,
          city: billingInfo.city,
          country: "AE",
        },
        shipping: {
          first_name: billingInfo.firstName,
          last_name: billingInfo.lastName,
          address_1: billingInfo.address,
          city: billingInfo.city,
          country: "AE",
        },
        line_items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        customer_note: billingInfo.notes,
      }

      if (customer?.id) {
        orderData.customer_id = customer.id
      }

      console.log("[v0] Sending order to WooCommerce:", orderData)

      const response = await fetch("/api/woocommerce/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()
      console.log("[v0] Order response:", result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to create order")
      }

      // Order created successfully
      setOrderId(result.id)
      setOrderComplete(true)
      clearCart()
    } catch (err) {
      console.error("[v0] Error creating order:", err)
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderComplete) {
    return (
      <section className="pt-44 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          {orderId && <p className="text-xl text-primary mb-4">Order #{orderId}</p>}
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your order. We will contact you soon to confirm delivery details.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors rounded-xl"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="pt-44 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products before checkout</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors rounded-xl"
          >
            Go to Shop
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-44 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-px w-16 bg-primary/40" />
            <p className="text-primary tracking-[0.3em] uppercase text-xs">Secure</p>
            <div className="h-px w-16 bg-primary/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? "bg-primary text-white" : "border border-primary/30 text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-px ${step > s ? "bg-primary" : "bg-primary/30"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Billing Information */}
              <div className="border border-primary/20 p-8 bg-card rounded-2xl">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm text-primary">
                    1
                  </span>
                  Billing Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={billingInfo.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={billingInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={billingInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none transition-colors rounded-xl"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={billingInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={billingInfo.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none transition-colors rounded-xl"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Order Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={billingInfo.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none transition-colors resize-none rounded-xl"
                      placeholder="Notes about your order, e.g. special delivery instructions"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border border-primary/20 p-8 bg-card rounded-2xl">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm text-primary">
                    2
                  </span>
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors rounded-xl ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-primary/30 hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "cod" ? "border-primary" : "border-primary/40"
                      }`}
                    >
                      {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <Banknote className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors rounded-xl ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-primary/30 hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "card" ? "border-primary" : "border-primary/40"
                      }`}
                    >
                      {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <CreditCard className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Credit / Debit Card</p>
                      <p className="text-sm text-muted-foreground">Secure online payment</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-primary/20 p-8 bg-card sticky top-44 rounded-2xl">
                <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-primary/20">Your Order</h2>

                <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-16 h-16 bg-secondary/30 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={item.product.images?.[0]?.src || "/placeholder.svg?height=64&width=64&query=dessert"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-2">{item.product.name}</p>
                        <p className="text-sm text-primary">
                          {(Number.parseFloat(item.product.price || "0") * item.quantity).toLocaleString()} SYP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-t border-b border-primary/20">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{totalPrice.toLocaleString()} SYP</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Truck size={16} /> Shipping
                    </span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">{totalPrice.toLocaleString()} SYP</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full text-center px-8 py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

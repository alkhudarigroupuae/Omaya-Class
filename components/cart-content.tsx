"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <section className="pt-44 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-px w-16 bg-primary/40" />
            <p className="text-primary tracking-[0.3em] uppercase text-xs">Shopping</p>
            <div className="h-px w-16 bg-primary/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-primary/50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Discover our delicious products and add them to your cart</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-6 p-6 border border-primary/20 bg-card">
                  {/* Product Image */}
                  <div className="relative w-28 h-28 flex-shrink-0 bg-secondary/30">
                    <Image
                      src={item.product.images?.[0]?.src || "/placeholder.svg?height=112&width=112&query=dessert"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-foreground">{item.product.name}</h3>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <p className="text-primary font-semibold mb-4">
                      {item.product.price} <span className="text-sm">SYP</span>
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-primary/30">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-primary/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 min-w-[50px] text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-primary/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <p className="text-muted-foreground">
                        Subtotal:{" "}
                        <span className="text-foreground font-semibold">
                          {(Number.parseFloat(item.product.price || "0") * item.quantity).toLocaleString()} SYP
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-primary/20 p-8 bg-card sticky top-44">
                <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-primary/20">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items ({totalItems})</span>
                    <span>{totalPrice.toLocaleString()} SYP</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-4 mb-8">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">{totalPrice.toLocaleString()} SYP</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center px-8 py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="block w-full text-center mt-4 px-8 py-4 border border-primary text-primary font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

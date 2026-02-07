"use client"

import { useEffect } from "react"

export default function AdminPage() {
  useEffect(() => {
    window.location.href = "https://admin.mahmoudbey-oc.com/wp-admin/"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-foreground/70 text-sm uppercase tracking-wider">Redirecting to Dashboard...</p>
      </div>
    </div>
  )
}

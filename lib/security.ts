// Security utilities for API protection

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return ""

  return input
    .replace(/[<>]/g, "") // Remove HTML tags
    .replace(/['";]/g, "") // Remove quotes that could be used for injection
    .replace(/--/g, "") // Remove SQL comments
    .replace(/\/\*/g, "") // Remove SQL block comments
    .replace(/\*\//g, "")
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|EXECUTE)\b/gi, "") // Remove SQL keywords
    .trim()
    .slice(0, 500) // Limit length
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function isValidPassword(password: string): boolean {
  return typeof password === "string" && password.length >= 1 && password.length <= 128
}

export function isValidOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  const referer = request.headers.get("referer")

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://v0-omaya-class-video.vercel.app",
    "http://localhost:3000",
    "https://mahmoudbey-oc.com",
    "https://www.mahmoudbey-oc.com",
    "https://admin.mahmoudbey-oc.com",
  ].filter(Boolean)

  if (origin && allowedOrigins.some((allowed) => origin.startsWith(allowed as string))) {
    return true
  }

  if (referer && allowedOrigins.some((allowed) => referer.startsWith(allowed as string))) {
    return true
  }

  // Allow if no origin (same-origin requests)
  return !origin
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  return realIP || "unknown"
}

export function getSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'",
  }
}

export async function parseAndValidateBody(request: Request): Promise<{ data: any; error: string | null }> {
  try {
    const contentType = request.headers.get("content-type")

    if (!contentType?.includes("application/json")) {
      return { data: null, error: "Invalid content type" }
    }

    const body = await request.json()

    if (!body || typeof body !== "object") {
      return { data: null, error: "Invalid request body" }
    }

    return { data: body, error: null }
  } catch {
    return { data: null, error: "Failed to parse request body" }
  }
}

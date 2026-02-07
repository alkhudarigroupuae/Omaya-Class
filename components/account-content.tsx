"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Package, MapPin, LogOut, Eye, EyeOff, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function AccountContent() {
  const { language } = useLanguage()
  const isArabic = language === "ar"

  const t = {
    loading: isArabic ? "جاري التحميل..." : "Loading...",
    welcomeBack: isArabic ? "مرحباً بعودتك" : "Welcome Back",
    createAccount: isArabic ? "إنشاء حساب" : "Create Account",
    joinFamily: isArabic ? "انضم لعائلة أماية كلاس" : "Join Omaya Class family",
    signInToAccount: isArabic ? "سجل دخول لحسابك" : "Sign in to your account",
    firstName: isArabic ? "الاسم الأول" : "First Name",
    lastName: isArabic ? "الاسم الأخير" : "Last Name",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    password: isArabic ? "كلمة المرور" : "Password",
    confirmPassword: isArabic ? "تأكيد كلمة المرور" : "Confirm Password",
    signingIn: isArabic ? "جاري تسجيل الدخول..." : "Signing In...",
    signIn: isArabic ? "تسجيل الدخول" : "Sign In",
    creatingAccount: isArabic ? "جاري إنشاء الحساب..." : "Creating Account...",
    alreadyHaveAccount: isArabic ? "لديك حساب؟ سجل دخول" : "Already have an account? Sign In",
    dontHaveAccount: isArabic ? "ليس لديك حساب؟ أنشئ واحداً" : "Don't have an account? Create one",
    myAccount: isArabic ? "حسابي" : "My Account",
    welcome: isArabic ? "مرحباً،" : "Welcome,",
    dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
    orders: isArabic ? "الطلبات" : "Orders",
    addresses: isArabic ? "العناوين" : "Addresses",
    logout: isArabic ? "تسجيل الخروج" : "Logout",
    dashboardWelcome: isArabic
      ? "مرحباً بعودتك! من لوحة التحكم يمكنك مشاهدة طلباتك الأخيرة، وإدارة عناوين الشحن والفواتير، وتعديل كلمة المرور وتفاصيل الحساب."
      : "Welcome back! From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.",
    recentOrders: isArabic ? "الطلبات الأخيرة" : "Recent Orders",
    savedAddresses: isArabic ? "العناوين المحفوظة" : "Saved Addresses",
    noOrdersYet: isArabic ? "لا توجد طلبات بعد" : "No orders yet",
    ordersCount: (count: number) => (isArabic ? `${count} طلبات` : `${count} orders`),
    noAddressesSaved: isArabic ? "لا توجد عناوين محفوظة" : "No addresses saved",
    orderHistory: isArabic ? "سجل الطلبات" : "Order History",
    loadingOrders: isArabic ? "جاري تحميل الطلبات..." : "Loading orders...",
    noOrdersFound: isArabic ? "لا توجد طلبات" : "No orders found",
    billingAddress: isArabic ? "عنوان الفاتورة" : "Billing Address",
    shippingAddress: isArabic ? "عنوان الشحن" : "Shipping Address",
    addAddress: isArabic ? "إضافة عنوان" : "Add Address",
    passwordsNotMatch: isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match",
    invalidCredentials: isArabic ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password",
    loginFailed: isArabic ? "فشل تسجيل الدخول. حاول مرة أخرى." : "Login failed. Please try again.",
    registrationFailed: isArabic ? "فشل التسجيل. حاول مرة أخرى." : "Registration failed. Please try again.",
    serverError: isArabic ? "خطأ في الخادم. حاول مرة أخرى." : "Server error. Please try again.",
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [customer, setCustomer] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const checkSession = () => {
      try {
        const saved = localStorage.getItem("omaya_customer")
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.id && parsed.email) {
            setCustomer(parsed)
            setIsLoggedIn(true)
          }
        }
      } catch (e) {
        console.error("Error checking session:", e)
        localStorage.removeItem("omaya_customer")
      } finally {
        setCheckingSession(false)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (isLoggedIn && customer?.id) {
      fetchOrders()
    }
  }, [isLoggedIn, customer])

  const fetchOrders = async () => {
    if (!customer?.email) return
    setLoadingOrders(true)
    try {
      const response = await fetch(`/api/woocommerce/orders?email=${encodeURIComponent(customer.email)}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err)
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    if (customer && customer.id) {
      localStorage.setItem("omaya_customer", JSON.stringify(customer))
    }
  }, [customer])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/woocommerce/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      })

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        setError(t.serverError)
        setIsLoading(false)
        return
      }

      if (data.success) {
        const customerData = {
          ...data.customer,
          loginTime: Date.now(),
        }
        setCustomer(customerData)
        setIsLoggedIn(true)
        localStorage.setItem("omaya_customer", JSON.stringify(customerData))
      } else {
        setError(data.error || t.invalidCredentials)
      }
    } catch (err) {
      setError(t.loginFailed)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (registerForm.password !== registerForm.confirmPassword) {
      setError(t.passwordsNotMatch)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/woocommerce/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerForm.email,
          first_name: registerForm.firstName,
          last_name: registerForm.lastName,
          password: registerForm.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const customerData = {
          ...data,
          firstName: data.first_name,
          lastName: data.last_name,
          loginTime: Date.now(),
        }
        setCustomer(customerData)
        setIsLoggedIn(true)
        localStorage.setItem("omaya_customer", JSON.stringify(customerData))
      } else {
        setError(data.error || t.registrationFailed)
      }
    } catch (err) {
      setError(t.registrationFailed)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCustomer(null)
    setOrders([])
    localStorage.removeItem("omaya_customer")
  }

  if (checkingSession) {
    return (
      <section className="pt-44 pb-20 min-h-screen relative" dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-md mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </section>
    )
  }

  if (!isLoggedIn) {
    return (
      <section className="pt-44 pb-20 min-h-screen relative" dir={isArabic ? "rtl" : "ltr"}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/login-pattern.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}
        />
        <div className="max-w-md mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isRegistering ? t.createAccount : t.welcomeBack}
            </h1>
            <p className="text-muted-foreground">{isRegistering ? t.joinFamily : t.signInToAccount}</p>
          </div>

          <div className="border border-primary/20 p-8 bg-card rounded-2xl shadow-lg">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
            )}

            {isRegistering ? (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.firstName}</label>
                    <input
                      type="text"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none disabled:opacity-50 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.lastName}</label>
                    <input
                      type="text"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none disabled:opacity-50 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.email}</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none disabled:opacity-50 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.password}</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none pr-12 disabled:opacity-50 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${isArabic ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-muted-foreground`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.confirmPassword}</label>
                  <input
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none disabled:opacity-50 rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.creatingAccount}
                    </>
                  ) : (
                    t.createAccount
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.email}</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none disabled:opacity-50 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.password}</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-primary/30 bg-background focus:border-primary focus:outline-none pr-12 disabled:opacity-50 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${isArabic ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-muted-foreground`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-primary text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.signingIn}
                    </>
                  ) : (
                    t.signIn
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button onClick={() => setIsRegistering(!isRegistering)} className="text-primary hover:underline text-sm">
                {isRegistering ? t.alreadyHaveAccount : t.dontHaveAccount}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-44 pb-20 min-h-screen relative" dir={isArabic ? "rtl" : "ltr"}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/login-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t.myAccount}</h1>
          {customer && (
            <p className="text-muted-foreground mt-2">
              {t.welcome} {customer.firstName} {customer.lastName}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { id: "dashboard", label: t.dashboard, icon: User },
              { id: "orders", label: t.orders, icon: Package },
              { id: "addresses", label: t.addresses, icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-${isArabic ? "right" : "left"} transition-colors rounded-xl ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "border border-primary/20 text-foreground hover:bg-primary/5 bg-card"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 text-${isArabic ? "right" : "left"} border border-primary/20 text-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors rounded-xl bg-card`}
            >
              <LogOut size={18} />
              {t.logout}
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3 border border-primary/20 p-8 bg-card rounded-2xl shadow-lg">
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.dashboard}</h2>
                <p className="text-muted-foreground mb-8">{t.dashboardWelcome}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-primary/20 p-6 rounded-xl">
                    <Package className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">{t.recentOrders}</h3>
                    <p className="text-muted-foreground text-sm">
                      {orders.length > 0 ? t.ordersCount(orders.length) : t.noOrdersYet}
                    </p>
                  </div>
                  <div className="border border-primary/20 p-6 rounded-xl">
                    <MapPin className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">{t.savedAddresses}</h3>
                    <p className="text-muted-foreground text-sm">{t.noAddressesSaved}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.orderHistory}</h2>
                {loadingOrders ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">{t.loadingOrders}</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order.id} className="border border-primary/20 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-bold text-foreground">
                              {isArabic ? `طلب #${order.id}` : `Order #${order.id}`}
                            </span>
                            <span
                              className={`${isArabic ? "mr-3" : "ml-3"} text-xs px-2 py-1 rounded ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "processing"
                                    ? "bg-blue-100 text-blue-700"
                                    : order.status === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {order.status === "completed"
                                ? isArabic
                                  ? "مكتمل"
                                  : "completed"
                                : order.status === "processing"
                                  ? isArabic
                                    ? "قيد المعالجة"
                                    : "processing"
                                  : order.status === "pending"
                                    ? isArabic
                                      ? "معلق"
                                      : "pending"
                                    : order.status}
                            </span>
                          </div>
                          <span className="text-primary font-bold">
                            {order.total} {order.currency}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {new Date(order.date_created).toLocaleDateString(isArabic ? "ar-SA" : "en-US")}
                        </p>
                        {order.line_items && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            {order.line_items.map((item: any) => (
                              <p key={item.id}>
                                {item.name} x {item.quantity}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">{t.noOrdersFound}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.addresses}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-dashed border-primary/30 p-6 text-center rounded-xl">
                    <h3 className="font-bold text-foreground mb-2">{t.billingAddress}</h3>
                    <button className="text-primary hover:underline text-sm">{t.addAddress}</button>
                  </div>
                  <div className="border border-dashed border-primary/30 p-6 text-center rounded-xl">
                    <h3 className="font-bold text-foreground mb-2">{t.shippingAddress}</h3>
                    <button className="text-primary hover:underline text-sm">{t.addAddress}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

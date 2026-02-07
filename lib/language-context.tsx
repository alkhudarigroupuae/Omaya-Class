"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface Translations {
  [key: string]: {
    en: string
    ar: string
  }
}

export const translations: Translations = {
  // Header & Navigation
  home: { en: "Home", ar: "الرئيسية" },
  shop: { en: "Shop", ar: "المتجر" },
  quickShop: { en: "Quick Shop", ar: "تسوق سريع" },
  branches: { en: "Branches", ar: "الفروع" },
  aboutUs: { en: "About", ar: "عنّا" }, // Changed "About Us" to "About"
  about: { en: "About", ar: "عنّا" }, // Added separate "about" key for menu
  blog: { en: "Blog", ar: "المدونة" },
  cart: { en: "Cart", ar: "السلة" },
  account: { en: "Account", ar: "حسابي" },
  myAccount: { en: "My Account", ar: "حسابي" },

  // Categories
  iceCream: { en: "Ice Cream", ar: "بوظة" },
  cake: { en: "Cake", ar: "كيك" },
  cakes: { en: "Cakes", ar: "كيك" },
  arabicSweet: { en: "Arabic Sweet", ar: "حلويات عربية" },
  pastries: { en: "Pastries", ar: "معجنات" },
  patisserie: { en: "Patisserie", ar: "حلويات فرنسية" },
  petitFour: { en: "Petit Four", ar: "بيتي فور" },
  waffleCrepe: { en: "Waffle & Crepe", ar: "وافل وكريب" },
  juiceFruit: { en: "Juice & Fruit", ar: "عصائر وفواكه" },
  mainMeals: { en: "Main Meals", ar: "وجبات رئيسية" },
  omayaProducts: { en: "Omaya Products", ar: "منتجات أمية" },
  ramadan: { en: "Ramadan", ar: "رمضان" },
  croissant: { en: "Croissant", ar: "كرواسون" },
  cookies: { en: "Cookies", ar: "كوكيز" },
  catering: { en: "Catering", ar: "تموين" },

  // Actions
  addToCart: { en: "Add to Cart", ar: "أضف للسلة" },
  buyNow: { en: "Buy Now", ar: "اشتري الآن" },
  viewAll: { en: "View All", ar: "عرض الكل" },
  viewAllCakes: { en: "View All Cakes", ar: "عرض جميع الكيك" },
  loadMore: { en: "Load More", ar: "تحميل المزيد" },
  loading: { en: "Loading...", ar: "جاري التحميل..." },
  shopAllProducts: { en: "Shop All Products", ar: "تسوق جميع المنتجات" },
  exploreProducts: { en: "Explore Products", ar: "استكشف المنتجات" },
  contactUs: { en: "Contact Us", ar: "اتصل بنا" },
  getDirections: { en: "Get Directions", ar: "احصل على الاتجاهات" },
  submit: { en: "Submit Application", ar: "إرسال الطلب" },
  submitting: { en: "Submitting...", ar: "جاري الإرسال..." },

  // Footer
  employment: { en: "Employment", ar: "التوظيف" },
  categories: { en: "Categories", ar: "الفئات" },
  quickLinks: { en: "Quick Links", ar: "روابط سريعة" },
  allRightsReserved: { en: "All rights reserved", ar: "جميع الحقوق محفوظة" },
  developedBy: { en: "Developed by", ar: "تطوير" },
  theArtOfExcellence: { en: "The Art of Excellence", ar: "فن التميز" },
  whereTraditionMeetsPerfection: { en: "Where Tradition Meets Perfection", ar: "حيث يلتقي التقليد بالكمال" },
  luxuryConfectionery: { en: "Luxury Confectionery", ar: "حلويات فاخرة" },
  handcraftedInSyria: { en: "Handcrafted in Syria", ar: "صناعة يدوية في سوريا" },
  premiumDescription: {
    en: "Premium ice cream, cakes, and patisserie since 1998.",
    ar: "بوظة وكيك وحلويات فاخرة منذ 1998.",
  },

  // Hero Section
  estSince: { en: "Est. Since 1998", ar: "منذ عام 1998" },
  theArtOfFineConfectionery: { en: "The Art of Fine Confectionery", ar: "فن صناعة الحلويات الفاخرة" },
  heroDescription: {
    en: "Premium handcrafted ice cream, exquisite cakes, and fine patisserie. Where tradition meets excellence.",
    ar: "بوظة فاخرة مصنوعة يدوياً، كيك راقي، وحلويات فرنسية. حيث يلتقي التقليد بالتميز.",
  },

  // Products Section
  ourCategories: { en: "Our Categories", ar: "فئاتنا" },
  exploreOurPremiumSelection: {
    en: "Explore our premium selection of handcrafted delicacies",
    ar: "استكشف مجموعتنا الفاخرة من الحلويات المصنوعة يدوياً",
  },
  featured: { en: "Featured", ar: "مميز" },
  iceCreamCollection: { en: "Ice Cream Collection", ar: "مجموعة البوظة" },
  cakeCollection: { en: "Cake Collection", ar: "مجموعة الكيك" },
  handcraftedCakes: { en: "Handcrafted cakes for every occasion", ar: "كيك مصنوع يدوياً لكل مناسبة" },

  // About Section
  ourHeritage: { en: "Our Heritage", ar: "تراثنا" },
  aboutOmayaClass: { en: "About Omaya Class", ar: "عن أمية كلاس" },
  aboutDescription1: {
    en: "For over two decades, Omaya Class Dairy has been synonymous with excellence in premium confectionery. Our master craftsmen blend time-honored traditions with innovative techniques to create extraordinary desserts.",
    ar: "لأكثر من عقدين، كانت أمية كلاس مرادفة للتميز في صناعة الحلويات الفاخرة. يمزج حرفيونا المهرة بين التقاليد العريقة والتقنيات المبتكرة لصنع حلويات استثنائية.",
  },
  aboutDescription2: {
    en: "Every creation reflects our unwavering commitment to quality, using only the finest ingredients to craft ice cream, cakes, and patisserie that delight the senses and create lasting memories.",
    ar: "كل إبداع يعكس التزامنا الراسخ بالجودة، باستخدام أجود المكونات فقط لصنع البوظة والكيك والحلويات التي تسعد الحواس وتخلق ذكريات دائمة.",
  },
  years: { en: "Years", ar: "سنة" },
  products: { en: "Products", ar: "منتج" },
  customers: { en: "Customers", ar: "عميل" },

  // Contact Section
  getInTouch: { en: "Get In Touch", ar: "تواصل معنا" },
  visitUs: { en: "Visit Us", ar: "زورونا" },
  weWouldLoveToWelcomeYou: { en: "We would love to welcome you", ar: "يسعدنا استقبالكم" },
  location: { en: "Location", ar: "الموقع" },
  contact: { en: "Contact", ar: "الاتصال" },
  hours: { en: "Hours", ar: "ساعات العمل" },
  damascusSyria: { en: "Damascus - Syria", ar: "دمشق - سوريا" },
  omayaClassDairy: { en: "Omaya Class Dairy", ar: "أمية كلاس دايري" },
  callUsForOrders: { en: "Call us for orders", ar: "اتصل بنا للطلبات" },
  openDaily: { en: "Open Daily", ar: "مفتوح يومياً" },

  // Branches
  ourBranches: { en: "Our Branches", ar: "فروعنا" },
  findNearestBranch: { en: "Find your nearest Omaya Class branch", ar: "اعثر على أقرب فرع لأمية كلاس" },
  comingSoon: { en: "Coming Soon", ar: "قريباً" },
  open: { en: "Open", ar: "مفتوح" },

  // Employment
  joinOurTeam: { en: "Join Our Team", ar: "انضم لفريقنا" },
  employmentDescription: {
    en: "We're always looking for talented individuals to join the Omaya Class family",
    ar: "نبحث دائماً عن أفراد موهوبين للانضمام إلى عائلة أمية كلاس",
  },
  fullName: { en: "Full Name", ar: "الاسم الكامل" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  phone: { en: "Phone", ar: "الهاتف" },
  address: { en: "Address", ar: "العنوان" },
  position: { en: "Position Desired", ar: "الوظيفة المطلوبة" },
  experience: { en: "Years of Experience", ar: "سنوات الخبرة" },
  education: { en: "Education Level", ar: "المستوى التعليمي" },
  message: { en: "Message", ar: "رسالة" },
  selectPosition: { en: "Select a position", ar: "اختر وظيفة" },
  selectEducation: { en: "Select education level", ar: "اختر المستوى التعليمي" },
  salesAssociate: { en: "Sales Associate", ar: "مندوب مبيعات" },
  cashier: { en: "Cashier", ar: "كاشير" },
  baker: { en: "Baker", ar: "خباز" },
  iceCreamMaker: { en: "Ice Cream Maker", ar: "صانع بوظة" },
  delivery: { en: "Delivery Driver", ar: "سائق توصيل" },
  manager: { en: "Manager", ar: "مدير" },
  other: { en: "Other", ar: "أخرى" },
  highSchool: { en: "High School", ar: "ثانوية" },
  diploma: { en: "Diploma", ar: "دبلوم" },
  bachelors: { en: "Bachelor's Degree", ar: "بكالوريوس" },
  masters: { en: "Master's Degree", ar: "ماجستير" },
  tellUsAboutYourself: {
    en: "Tell us about yourself and why you want to join Omaya Class...",
    ar: "أخبرنا عن نفسك ولماذا تريد الانضمام إلى أمية كلاس...",
  },
  applicationSuccess: {
    en: "Application submitted successfully! We will contact you soon.",
    ar: "تم إرسال الطلب بنجاح! سنتواصل معك قريباً.",
  },
  applicationError: {
    en: "Failed to submit application. Please try again.",
    ar: "فشل إرسال الطلب. يرجى المحاولة مرة أخرى.",
  },

  // Shop
  allProducts: { en: "All Products", ar: "جميع المنتجات" },
  searchProducts: { en: "Search products...", ar: "ابحث عن المنتجات..." },
  noProductsFound: { en: "No products found", ar: "لم يتم العثور على منتجات" },
  price: { en: "Price", ar: "السعر" },
  quantity: { en: "Quantity", ar: "الكمية" },
  total: { en: "Total", ar: "المجموع" },
  checkout: { en: "Checkout", ar: "الدفع" },
  continueShopping: { en: "Continue Shopping", ar: "متابعة التسوق" },
  emptyCart: { en: "Your cart is empty", ar: "سلة التسوق فارغة" },
  remove: { en: "Remove", ar: "حذف" },

  // Product details
  productDetails: { en: "Product Details", ar: "تفاصيل المنتج" },
  relatedProducts: { en: "Related Products", ar: "منتجات ذات صلة" },
  backToShop: { en: "Back to Shop", ar: "العودة للمتجر" },

  // Account
  login: { en: "Login", ar: "تسجيل الدخول" },
  register: { en: "Register", ar: "تسجيل" },
  logout: { en: "Logout", ar: "تسجيل الخروج" },
  password: { en: "Password", ar: "كلمة المرور" },
  forgotPassword: { en: "Forgot Password?", ar: "نسيت كلمة المرور؟" },
  createAccount: { en: "Create Account", ar: "إنشاء حساب" },
  alreadyHaveAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
  dontHaveAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟" },

  // Ice Cream Featured
  classicVanillaGelato: { en: "Classic Vanilla Gelato", ar: "جيلاتو فانيلا كلاسيك" },
  belgianChocolate: { en: "Belgian Chocolate", ar: "شوكولا بلجيكية" },
  pistachioDelight: { en: "Pistachio Delight", ar: "فستق لذيذ" },
  strawberryDream: { en: "Strawberry Dream", ar: "حلم الفراولة" },

  // Cake Featured
  chocolateLayerCake: { en: "Chocolate Layer Cake", ar: "كيك شوكولا طبقات" },
  redVelvetCake: { en: "Red Velvet Cake", ar: "كيك ريد فيلفيت" },
  strawberryCheesecake: { en: "Strawberry Cheesecake", ar: "تشيز كيك فراولة" },
  tiramisuCake: { en: "Tiramisu Cake", ar: "كيك تيراميسو" },

  // Events
  events: { en: "Events", ar: "الأحداث" },
  ourEvents: { en: "Our Events", ar: "أحداثنا" },
  latestEventsDescription: {
    en: "Stay updated with our latest events and activities",
    ar: "ابقَ على اطلاع بأحدث فعالياتنا وأنشطتنا",
  },
  readMore: { en: "Read More", ar: "اقرأ المزيد" },
  ramadanAtmosphereArnous: { en: "Ramadan Atmosphere - Arnous Branch", ar: "أجواء رمضان - فرع عرنوس" },
  shamAlKheirFestival: { en: "Sham Al-Khair Shopping Festival", ar: "مهرجان التسوق شام الخير" },
  newYearCelebrationMazzeh: { en: "New Year Celebration - Mazzeh Branch", ar: "احتفال رأس السنة - فرع المزة" },
  economicDialogueForum: { en: "Economic Dialogue Forum", ar: "ملتقى الحوار الاقتصادي" },
  teamAppreciationCertificates: { en: "Team Appreciation Certificates", ar: "تسليم شهادات التقدير لفريق أمية كلاس" },
  jobFairSheraton: { en: "Job Fair - Sheraton Hotel", ar: "معرض التوظيف Job Fair - فندق شيراتون" },
  prophetBirthdayCommemoration: { en: "Prophet's Birthday Commemoration", ar: "إحياء ذكرى المولد النبوي الشريف" },

  prideStatement: {
    en: "At Omaya Class, we take pride in bringing to our valued customers the essence of our long and distinguished expertise in crafting Italian and Russian ice cream, as well as all types of Cassata.",
    ar: "نفخر في أمية كلاس بأن نضع بين ايدي زبائننا الكرام خلاصة خبرتنا الطويلة والعريقة في صناعة البوظة الإيطالية والروسية وكافة أنواع الكاسيتا.",
  },

  // Product Page Translations
  description: { en: "Description", ar: "الوصف" },
  reviews: { en: "Reviews", ar: "التقييمات" },
  sku: { en: "SKU", ar: "رمز المنتج" },
  category: { en: "Category", ar: "الفئة" },
  tags: { en: "Tags", ar: "الوسوم" },
  inStock: { en: "In Stock", ar: "متوفر" },
  outOfStock: { en: "Out of Stock", ar: "غير متوفر" },
  sale: { en: "Sale", ar: "تخفيض" },
  noReviewsYet: { en: "No reviews yet", ar: "لا توجد تقييمات بعد" },
  beFirstToReview: { en: "Be the first to review this product", ar: "كن أول من يقيم هذا المنتج" },
  writeReview: { en: "Write a Review", ar: "اكتب تقييم" },
  yourRating: { en: "Your Rating", ar: "تقييمك" },
  yourReview: { en: "Your Review", ar: "تقييمك" },
  submitReview: { en: "Submit Review", ar: "إرسال التقييم" },
  reviewPlaceholder: { en: "Share your experience with this product...", ar: "شاركنا تجربتك مع هذا المنتج..." },
  basedOnReviews: { en: "Based on {count} reviews", ar: "بناءً على {count} تقييم" },
  verifiedPurchase: { en: "Verified Purchase", ar: "شراء موثق" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  const dir = language === "ar" ? "rtl" : "ltr"

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

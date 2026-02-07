"use client"

import { useEffect, useState } from "react"

export function OmayaBanner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 transition-opacity duration-2000 ${mounted ? "opacity-100" : "opacity-0"}`}
          style={{ animation: "slowZoom 20s ease-in-out infinite alternate" }}
        >
          <img
            src="/elegant-layered-chocolate-cake-with-gold-decoratio.jpg"
            alt="Mahmoud Bey"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Elegant overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 via-transparent to-foreground/30" />
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-accent/40 transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `floatParticle ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo mark */}
        <div
          className={`mb-8 transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        >
          <div className="w-24 h-24 mx-auto rounded-full border-2 border-accent/50 flex items-center justify-center bg-background/20 backdrop-blur-md shadow-2xl">
            <span className="text-4xl font-bold text-accent">M</span>
          </div>
        </div>

        {/* Main heading with staggered animation */}
        <h1
          className={`text-6xl md:text-8xl lg:text-9xl font-semibold text-white text-center tracking-tight transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <span className="block text-balance">Mahmoud Bey</span>
        </h1>

        {/* Animated decorative line */}
        <div
          className={`mt-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1500 delay-500 ${mounted ? "opacity-100 w-64" : "opacity-0 w-0"}`}
        />

        {/* Tagline */}
        <p
          className={`mt-8 text-xl md:text-3xl text-white/90 text-center font-light tracking-wide transition-all duration-1000 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Ice Cream • Cakes • Pâtisserie
        </p>

        {/* Subtitle */}
        <p
          className={`mt-4 text-lg md:text-xl text-accent tracking-widest uppercase transition-all duration-1000 delay-900 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          Where sweetness becomes art
        </p>

        {/* CTA Button */}
        <button
          className={`mt-12 px-12 py-4 bg-accent text-foreground rounded-full text-lg font-medium transition-all duration-1000 delay-1100 hover:bg-accent/90 hover:shadow-2xl hover:scale-105 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Discover More
        </button>
      </div>

      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          25% { transform: translateY(-40px) translateX(20px); opacity: 0.8; }
          50% { transform: translateY(-20px) translateX(-10px); opacity: 0.6; }
          75% { transform: translateY(-60px) translateX(15px); opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}

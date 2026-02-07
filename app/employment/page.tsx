"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { User, Mail, Phone, MapPin, Briefcase, FileText, Send, CheckCircle } from "lucide-react"

export default function EmploymentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    experience: "",
    education: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const positions = [
    "Sales Associate",
    "Cashier",
    "Kitchen Staff",
    "Pastry Chef",
    "Ice Cream Maker",
    "Delivery Driver",
    "Branch Manager",
    "Accountant",
    "Marketing Specialist",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/employment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setIsSubmitted(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        position: "",
        experience: "",
        education: "",
        message: "",
      })
    } catch (err) {
      setError("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-primary rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Omaya Class" width={80} height={80} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-wide">Join Our Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Be part of the Omaya Class family. We're always looking for talented individuals who share our passion for
            quality and excellence.
          </p>
        </div>
      </section>

      {/* Employment Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Application Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your interest in joining Omaya Class. We have received your application and will review it
                shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Employment Application</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">{error}</div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                {/* Position */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Position Applied For *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                    >
                      <option value="">Select a position</option>
                      {positions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Years of Experience *</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                    >
                      <option value="">Select experience</option>
                      <option value="No Experience">No Experience</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-foreground mb-2">Education Level *</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-foreground mb-2">Tell us about yourself</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Share your skills, experience, and why you want to join Omaya Class..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

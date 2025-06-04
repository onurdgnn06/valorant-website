"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Form validation helper
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePassword = (password: string) => {
  return password.length >= 6
}

// Interactive Contact Form
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Ad gerekli"
    if (!formData.email.trim()) newErrors.email = "Email gerekli"
    else if (!validateEmail(formData.email)) newErrors.email = "Geçerli bir email girin"
    if (!formData.subject.trim()) newErrors.subject = "Konu gerekli"
    if (!formData.message.trim()) newErrors.message = "Mesaj gerekli"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Mesajınız başarıyla gönderildi!")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setLoading(false)
  }

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="heading-premium">İletişim Formu</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/90">
                Ad Soyad *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Adınız ve soyadınız"
                className={`glass h-12 text-white placeholder:text-white/50 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ornek@email.com"
                className={`glass h-12 text-white placeholder:text-white/50 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white/90">
              Konu *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Mesajınızın konusu"
              className={`glass h-12 text-white placeholder:text-white/50 ${errors.subject ? "border-red-500" : ""}`}
            />
            {errors.subject && <p className="text-red-400 text-sm">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/90">
              Mesaj *
            </Label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Mesajınızı buraya yazın..."
              className={`w-full rounded-xl glass p-4 text-white placeholder:text-white/50 resize-none ${
                errors.message ? "border-red-500" : ""
              }`}
            />
            {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="btn-premium w-full">
            {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// Interactive Product Purchase Form
export function ProductPurchaseForm({ productName, price }: { productName: string; price: string }) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const handlePurchase = async () => {
    setLoading(true)
    // Simulate purchase process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    toast.success(`${productName} başarıyla satın alındı!`)
    setLoading(false)
  }

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="heading-premium">Satın Al</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-white/90">{productName}</span>
          <Badge className="bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/30">{price}</Badge>
        </div>

        <div className="space-y-4">
          <Label className="text-white/90">Ödeme Yöntemi</Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: "credit-card", label: "Kredi Kartı", icon: "💳" },
              { id: "paypal", label: "PayPal", icon: "🅿️" },
              { id: "crypto", label: "Kripto Para", icon: "₿" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === method.id
                    ? "bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30"
                    : "glass border border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{method.icon}</span>
                <span className="text-white/90">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={handlePurchase} disabled={loading} className="btn-premium w-full">
          {loading ? "İşleniyor..." : `${price} Öde`}
        </Button>
      </CardContent>
    </Card>
  )
}

// Interactive Search Component
export function ProductSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("")
  const [suggestions] = useState([
    "ESP Paketi",
    "AimBot Pro",
    "HWID Spoofer",
    "Radar Hack",
    "Triggerbot",
    "Premium Bundle",
  ])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredSuggestions = suggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase()))

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch(searchQuery)
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setShowSuggestions(true)
          onSearch(e.target.value)
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Ürün ara..."
        className="glass h-12 text-white placeholder:text-white/50"
      />

      {showSuggestions && query && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card border border-white/10 rounded-xl overflow-hidden z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/5 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

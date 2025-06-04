"use client"

import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductPurchaseForm } from "./interactive-forms"
import { useState } from "react"

interface ProductCardProps {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  featured?: boolean
}

export default function ProductCard({
  title,
  description,
  price,
  duration,
  features,
  featured = false,
}: ProductCardProps) {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)

  return (
    <div
      className={`
        glass-card rounded-2xl overflow-hidden transition-all duration-300 relative
        ${featured ? "ring-2 ring-[hsl(var(--primary))]/50" : ""}
      `}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0">
          <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] text-black px-6 py-2 text-sm font-semibold flex items-center justify-center gap-2">
            <Star className="h-4 w-4 fill-current" />
            En Popüler
          </div>
        </div>
      )}

      <div className={`p-8 ${featured ? "pt-12" : ""}`}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold heading-premium mb-2">{title}</h3>
          <p className="text-premium">{description}</p>
        </div>

        <div className="mb-8">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold heading-premium">{price}</span>
            <span className="text-white/60 mb-1">/ {duration}</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-[hsl(var(--primary))]/20">
                <Check className="h-4 w-4 text-[hsl(var(--primary))]" />
              </div>
              <span className="text-white/80">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setShowPurchaseForm(true)}
          className={`w-full h-12 font-semibold ${featured ? "btn-premium" : "btn-outline-premium"}`}
        >
          Hemen Satın Al
        </Button>

        {showPurchaseForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowPurchaseForm(false)} />
            <div className="relative max-w-md w-full">
              <ProductPurchaseForm productName={title} price={price} />
              <button
                onClick={() => setShowPurchaseForm(false)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

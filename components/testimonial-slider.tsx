"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Ahmet K.",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "ESP paketi gerçekten harika çalışıyor. Duvar arkasını görmek oyun deneyimimi tamamen değiştirdi. Kesinlikle tavsiye ederim!",
  },
  {
    id: 2,
    name: "Mehmet S.",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "AimBot Pro ile artık her maçta MVP oluyorum. Arkadaşlarım nasıl bu kadar iyi olduğumu soruyorlar. Gizli silahım bu!",
  },
  {
    id: 3,
    name: "Ayşe Y.",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4,
    text: "HWID Spoofer sayesinde ban yeme korkum kalmadı. Çok stabil çalışıyor ve kurulumu çok kolay.",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-[#121212] rounded-xl p-8 border border-gray-800">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700">
            <img
              src={testimonials[currentIndex].avatar || "/placeholder.svg"}
              alt={testimonials[currentIndex].name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonials[currentIndex].rating ? "text-[hsl(var(--primary))] fill-[hsl(var(--primary))]" : "text-gray-500"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-300 italic">"{testimonials[currentIndex].text}"</p>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full border-gray-700 hover:bg-[#121212] hover:border-[hsl(var(--primary))]"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-[hsl(var(--primary))]" : "w-2 bg-gray-700"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Dot {index + 1}</span>
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full border-gray-700 hover:bg-[#121212] hover:border-[hsl(var(--primary))]"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}

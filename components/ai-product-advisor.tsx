"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Target, Shield, Zap, Eye, Crosshair } from "lucide-react"
import { aiService, type ProductRecommendation } from "@/lib/ai-service"

const questions = [
  {
    id: "experience",
    question: "Valorant deneyiminiz nasıl?",
    options: [
      { value: "beginner", label: "Yeni başladım", icon: "🌱" },
      { value: "intermediate", label: "Orta seviye", icon: "⚡" },
      { value: "advanced", label: "İleri seviye", icon: "🔥" },
      { value: "pro", label: "Profesyonel", icon: "👑" },
    ],
  },
  {
    id: "playstyle",
    question: "Oyun tarzınız nedir?",
    options: [
      { value: "aggressive", label: "Agresif", icon: "⚔️" },
      { value: "defensive", label: "Savunmacı", icon: "🛡️" },
      { value: "support", label: "Destek", icon: "🤝" },
      { value: "sniper", label: "Keskin nişancı", icon: "🎯" },
    ],
  },
  {
    id: "priority",
    question: "En önemli ihtiyacınız nedir?",
    options: [
      { value: "aim", label: "Nişan alma", icon: "🎯" },
      { value: "vision", label: "Görüş avantajı", icon: "👁️" },
      { value: "safety", label: "Ban koruması", icon: "🛡️" },
      { value: "speed", label: "Hızlı reaksiyon", icon: "⚡" },
    ],
  },
  {
    id: "budget",
    question: "Bütçeniz nedir?",
    options: [
      { value: "low", label: "200₺ altı", icon: "💰" },
      { value: "medium", label: "200-400₺", icon: "💎" },
      { value: "high", label: "400₺ üstü", icon: "👑" },
      { value: "unlimited", label: "Sınırsız", icon: "🚀" },
    ],
  },
]

export default function AIProductAdvisor() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      generateRecommendations(newAnswers)
    }
  }

  const generateRecommendations = async (userAnswers: Record<string, string>) => {
    setIsLoading(true)
    try {
      const query = `Kullanıcı profili:
      - Deneyim: ${userAnswers.experience}
      - Oyun tarzı: ${userAnswers.playstyle}  
      - Öncelik: ${userAnswers.priority}
      - Bütçe: ${userAnswers.budget}
      
      Bu profile göre en uygun ürünleri öner.`

      const recs = await aiService.getProductRecommendations(query)
      setRecommendations(recs)
      setShowResults(true)
    } catch (error) {
      console.error("Recommendation error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendations([])
    setShowResults(false)
  }

  const getProductIcon = (productName: string) => {
    if (productName.includes("ESP")) return <Eye className="h-5 w-5" />
    if (productName.includes("AimBot")) return <Crosshair className="h-5 w-5" />
    if (productName.includes("Spoofer")) return <Shield className="h-5 w-5" />
    if (productName.includes("Radar")) return <Target className="h-5 w-5" />
    if (productName.includes("Trigger")) return <Zap className="h-5 w-5" />
    return <Sparkles className="h-5 w-5" />
  }

  if (showResults) {
    return (
      <Card className="glass-card border-white/10 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 heading-premium">
            <Sparkles className="h-6 w-6" />
            AI Ürün Önerileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="glass border border-white/10 p-4 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[var(--primary)]/20">{getProductIcon(rec.productName)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{rec.productName}</h3>
                    <Badge className="bg-[var(--primary)]/20 text-[var(--primary)]">
                      %{Math.round(rec.confidence * 100)} Uyum
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm">{rec.reason}</p>
                  <Button className="btn-premium mt-3" size="sm">
                    Ürünü İncele
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              Tekrar Dene
            </Button>
            <Button className="btn-premium flex-1">Tüm Ürünleri Gör</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="glass-card border-white/10 max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-white mb-2">AI Analiz Ediyor...</h3>
          <p className="text-white/60">Size en uygun ürünleri belirliyoruz</p>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card className="glass-card border-white/10 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 heading-premium">
            <Sparkles className="h-6 w-6" />
            AI Ürün Danışmanı
          </CardTitle>
          <Badge variant="outline" className="text-sm">
            {currentQuestion + 1} / {questions.length}
          </Badge>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mt-4">
          <div
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-xl font-semibold text-white text-center">{question.question}</h3>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleAnswer(question.id, option.value)}
              variant="outline"
              className="glass border-white/20 text-white hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 p-4 h-auto justify-start"
            >
              <span className="text-2xl mr-3">{option.icon}</span>
              <span className="text-left">{option.label}</span>
            </Button>
          ))}
        </div>

        {currentQuestion > 0 && (
          <Button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            variant="ghost"
            className="w-full text-white/60 hover:text-white"
          >
            ← Önceki Soru
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

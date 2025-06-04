"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Loader2, ShoppingCart, AlertTriangle } from "lucide-react"
import { aiService, type ChatMessage, type ProductRecommendation } from "@/lib/ai-service"
import { toast } from "sonner"

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Merhaba! ValorantPro AI asistanıyım. Size nasıl yardımcı olabilirim? Ürünlerimiz hakkında soru sorabilir veya teknik destek alabilirsiniz.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([])
  const [hasApiError, setHasApiError] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // AI yanıtı al
      const response = await aiService.generateResponse([...messages, userMessage])

      // API key hatası kontrolü
      if (response.includes("API anahtarı eksik")) {
        setHasApiError(true)
        toast.error("AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.")
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // API hatası yoksa ürün önerileri al
      if (!hasApiError) {
        try {
          const productRecs = await aiService.getProductRecommendations(input)
          setRecommendations(productRecs)
        } catch (error) {
          console.error("Product recommendation error:", error)
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setHasApiError(true)

      // Hata mesajı ekle
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Üzgünüm, şu anda AI servisine bağlanamıyorum. Lütfen daha sonra tekrar deneyin veya destek ekibimizle iletişime geçin.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
      toast.error("AI servisi şu anda kullanılamıyor")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Hızlı soru gönderme fonksiyonu
  const handleQuickQuestion = (question: string) => {
    setInput(question)
    // Otomatik gönder
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  // Ürün önerisi tıklama fonksiyonu
  const handleProductClick = (productName: string) => {
    toast.success(`${productName} ürünü sepete eklendi!`)
    // Ürün sayfasına yönlendir
    window.open("/products", "_blank")
  }

  // Chat'i temizleme fonksiyonu
  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Merhaba! ValorantPro AI asistanıyım. Size nasıl yardımcı olabilirim?",
        timestamp: new Date(),
      },
    ])
    setRecommendations([])
    setHasApiError(false)
    toast.success("Sohbet temizlendi!")
  }

  const quickQuestions = [
    "Hangi ürün bana uygun?",
    "Ban riski var mı?",
    "Nasıl kurulum yapılır?",
    "Fiyatlar nedir?",
    "HWID nasıl sıfırlanır?",
  ]

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-premium h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] glass-card border border-white/10 rounded-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] flex items-center justify-center">
                <Bot className="h-4 w-4 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-white">ValorantPro AI</h3>
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${hasApiError ? "bg-red-500" : "bg-purple-500"}`}></span>
                  <p className="text-xs text-white/60">{hasApiError ? "Offline" : "Online"} • Grok AI</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-white/60 hover:text-white text-xs px-2"
              >
                Temizle
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* API Error Banner */}
          {hasApiError && (
            <div className="bg-red-500/20 border border-red-500/30 p-2 text-xs text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.</span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px] scrollbar-thin scrollbar-thumb-white/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-black" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] text-black"
                      : "glass border border-white/10 text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === "user" ? "text-black/60" : "text-white/60"}`}>
                    {message.timestamp.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] flex items-center justify-center">
                  <Bot className="h-4 w-4 text-black" />
                </div>
                <div className="glass border border-white/10 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span className="text-sm text-white">AI düşünüyor...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Product Recommendations */}
          {recommendations.length > 0 && !hasApiError && (
            <div className="p-4 border-t border-white/10 bg-black/10">
              <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Önerilen Ürünler:
              </h4>
              <div className="space-y-2">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="glass border border-white/10 p-3 rounded-lg hover:border-[var(--primary)]/50 transition-all cursor-pointer group"
                    onClick={() => handleProductClick(rec.productName)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white group-hover:text-[var(--primary)] transition-colors">
                        {rec.productName}
                      </span>
                      <Badge variant="secondary" className="text-xs bg-[var(--primary)]/20 text-[var(--primary)]">
                        %{Math.round(rec.confidence * 100)}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60 mt-1">{rec.reason}</p>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="btn-premium text-xs h-6">
                        Ürünü Gör
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Questions */}
          {messages.length === 1 && !hasApiError && (
            <div className="p-4 border-t border-white/10 bg-black/10">
              <h4 className="text-sm font-medium text-white mb-3">💡 Hızlı Sorular:</h4>
              <div className="grid grid-cols-1 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs border-white/20 text-white/80 hover:text-white hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 transition-all justify-start h-8"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={hasApiError ? "AI servisi şu anda kullanılamıyor" : "Mesajınızı yazın..."}
                className="glass border-white/20 text-white placeholder:text-white/50 focus:border-[var(--primary)]/50"
                disabled={isLoading || hasApiError}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading || hasApiError}
                className="btn-premium px-3 hover:scale-105 transition-transform"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-white/40 mt-2 text-center">
              {hasApiError ? "AI servisi geçici olarak kullanılamıyor" : "Grok AI ile desteklenmektedir"}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

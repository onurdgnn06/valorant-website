"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aiService } from "@/lib/ai-service"

interface SearchResult {
  title: string
  description: string
  type: "product" | "faq" | "guide"
  relevance: number
}

export default function AISearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [aiAnswer, setAiAnswer] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      // AI ile akıllı arama
      const answer = await aiService.generateFAQAnswer(query)
      setAiAnswer(answer)

      // Mock search results (gerçek uygulamada veritabanından gelir)
      const mockResults: SearchResult[] = [
        {
          title: "ESP Paketi",
          description: "Duvar arkası görüş ve oyuncu bilgileri",
          type: "product",
          relevance: 0.9,
        },
        {
          title: "AimBot Pro",
          description: "Profesyonel nişan alma yardımcısı",
          type: "product",
          relevance: 0.8,
        },
        {
          title: "Ban Riski Hakkında",
          description: "Ürünlerimizin güvenlik özellikleri",
          type: "faq",
          relevance: 0.7,
        },
      ]

      setResults(
        mockResults.filter(
          (r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.description.toLowerCase().includes(query.toLowerCase()),
        ),
      )
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-5 w-5 text-white/60" />
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="AI ile akıllı arama... (örn: 'en iyi aimbot nedir?')"
          className="glass border-white/20 text-white placeholder:text-white/50 pl-10 pr-20 h-12"
        />
        <Button
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-premium px-4 py-2"
        >
          <Sparkles className="h-4 w-4 mr-1" />
          {isLoading ? "Arıyor..." : "AI Ara"}
        </Button>
      </div>

      {/* AI Answer */}
      {aiAnswer && (
        <Card className="mt-6 glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-[var(--primary)]" />
              <h3 className="font-semibold text-white">AI Yanıtı</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{aiAnswer}</p>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Arama Sonuçları</h3>
          {results.map((result, index) => (
            <Card
              key={index}
              className="glass-card border-white/10 hover:border-[var(--primary)]/30 transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{result.title}</h4>
                    <p className="text-white/70 text-sm">{result.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        result.type === "product"
                          ? "bg-blue-500/20 text-blue-400"
                          : result.type === "faq"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {result.type === "product" ? "Ürün" : result.type === "faq" ? "SSS" : "Rehber"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      %{Math.round(result.relevance * 100)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

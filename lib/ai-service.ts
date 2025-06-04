import { generateText, streamText } from "ai"
import { google } from "@ai-sdk/google"

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

export interface ProductRecommendation {
  productName: string
  reason: string
  confidence: number
}

// AI Chat Service with Google Gemini
export class AIService {
  private model: any
  private isAvailable: boolean = false

  constructor() {
    // GOOGLE_GENERATIVE_AI_API_KEY environment variable'ını kullan
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY

    if (!apiKey || apiKey === "AIzaSyBI9d6Z41xRrdbdLSUaewl45i2isLsoreo") {
      console.warn("Valid GOOGLE_GENERATIVE_AI_API_KEY is missing - AI features will use fallback responses")
      this.isAvailable = false
    } else {
      try {
        this.model = google("gemini-1.5-flash")
        this.isAvailable = true
        console.log("✅ AI Service initialized successfully with Gemini API")
      } catch (error) {
        console.error("Failed to initialize AI model:", error)
        this.isAvailable = false
      }
    }
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      // API anahtarı kontrolü veya model mevcut değilse fallback yanıt
      if (!this.isAvailable) {
        return this.generateFallbackResponse(messages[messages.length - 1]?.content || "")
      }

      const systemPrompt = `Sen ValorantPro sitesinin AI asistanısın. Valorant oyunu, cheat/hack araçları ve site hakkında yardım ediyorsun. 
      
      Özellikler:
      - ESP Paketi: Duvar arkası görüş, oyuncu bilgileri
      - AimBot Pro: Profesyonel nişan alma yardımcısı  
      - HWID Spoofer: Donanım ID değiştirici
      - Radar Hack: Minimap üzerinde düşman görme
      - Triggerbot: Otomatik tetik çekme
      - Premium Bundle: Tüm özellikler
      
      Türkçe yanıt ver, yardımcı ol ve ürünleri öner.`

      const { text } = await generateText({
        model: this.model,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      })

      return text
    } catch (error) {
      console.error("AI Service Error:", error)
      return this.generateFallbackResponse(messages[messages.length - 1]?.content || "")
    }
  }

  private generateFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase()
    
    // Ürün soruları
    if (lowerMessage.includes("ürün") || lowerMessage.includes("hangi") || lowerMessage.includes("öner")) {
      return `ValorantPro'da şu ürünlerimiz mevcut:

🎯 **ESP Paketi** (299₺) - Duvar arkası görüş ve oyuncu bilgileri
🎯 **AimBot Pro** (399₺) - Profesyonel nişan alma yardımcısı
🎯 **HWID Spoofer** (199₺) - Donanım ID değiştirici
🎯 **Radar Hack** (249₺) - Minimap üzerinde düşman görme
🎯 **Triggerbot** (179₺) - Otomatik tetik çekme
🎯 **Premium Bundle** (799₺) - Tüm özellikler tek pakette

Yeni başlayanlar için ESP Paketi, deneyimli oyuncular için Premium Bundle öneriyorum!`
    }
    
    // Ban riski soruları
    if (lowerMessage.includes("ban") || lowerMessage.includes("güvenli") || lowerMessage.includes("risk")) {
      return `🛡️ **Güvenlik Önlemlerimiz:**

• %99.9 güvenlik oranı ile anti-ban teknolojisi
• Sürekli güncellenen koruma sistemleri
• HWID Spoofer ile donanım koruması
• Kullanım talimatlarına uyulması önemli

Hiçbir yazılım %100 güvenli değildir, ancak bizim güvenlik oranımız çok yüksektir!`
    }
    
    // Kurulum soruları
    if (lowerMessage.includes("kurulum") || lowerMessage.includes("nasıl") || lowerMessage.includes("yükle")) {
      return `📥 **Kurulum Süreci:**

1. Ödeme sonrası otomatik aktivasyon
2. İndirme linkini email ile alırsınız
3. Antivirus'ü geçici olarak kapatın
4. Yönetici olarak çalıştırın
5. Lisans anahtarınızı girin

Kurulum videoları ve detaylı rehber Discord sunucumuzda mevcut!`
    }
    
    // Fiyat soruları
    if (lowerMessage.includes("fiyat") || lowerMessage.includes("ücret") || lowerMessage.includes("para")) {
      return `💰 **Fiyat Listesi:**

• ESP Paketi: 299₺/ay
• AimBot Pro: 399₺/ay  
• HWID Spoofer: 199₺/ay
• Radar Hack: 249₺/ay
• Triggerbot: 179₺/ay
• **Premium Bundle: 799₺/ay** (En popüler - %30 tasarruf)

Kredi kartı, PayPal, kripto para ile ödeme kabul ediyoruz!`
    }
    
    // HWID soruları
    if (lowerMessage.includes("hwid") || lowerMessage.includes("sıfırla")) {
      return `🔄 **HWID Sıfırlama:**

• Kullanıcı panelinizden kolayca yapabilirsiniz
• Plan türünüze göre sıfırlama hakkınız var
• Premium Bundle'da sınırsız sıfırlama
• Teknik sorun yaşarsanız destek ekibimize yazın

HWID Spoofer ile donanım kimliğinizi koruyabilirsiniz!`
    }
    
    // Genel karşılama
    return `Merhaba! ValorantPro AI asistanıyım 🤖

Size nasıl yardımcı olabilirim?

• Ürün önerileri
• Güvenlik bilgileri  
• Kurulum desteği
• Fiyat bilgileri
• Teknik sorular

Sorularınızı bekliyorum! Discord sunucumuzda da 7/24 destek alabilirsiniz.`
  }

  async getProductRecommendations(userQuery: string): Promise<ProductRecommendation[]> {
    try {
      // API anahtarı kontrolü veya model mevcut değilse akıllı fallback önerileri
      if (!this.isAvailable) {
        return this.generateSmartRecommendations(userQuery)
      }

      const prompt = `Kullanıcı şunu soruyor: "${userQuery}"
      
      ValorantPro ürünleri:
      1. ESP Paketi (299₺) - Duvar arkası görüş, oyuncu bilgileri
      2. AimBot Pro (399₺) - Profesyonel nişan alma yardımcısı
      3. HWID Spoofer (199₺) - Donanım ID değiştirici
      4. Radar Hack (249₺) - Minimap üzerinde düşman görme
      5. Triggerbot (179₺) - Otomatik tetik çekme
      6. Premium Bundle (799₺) - Tüm özellikler
      
      En uygun 3 ürünü JSON formatında öner:
      [{"productName": "ürün adı", "reason": "neden uygun", "confidence": 0.9}]`

      const { text } = await generateText({
        model: this.model,
        prompt,
      })

      try {
        return JSON.parse(text)
      } catch {
        return this.generateSmartRecommendations(userQuery)
      }
    } catch (error) {
      console.error("Product Recommendation Error:", error)
      return this.generateSmartRecommendations(userQuery)
    }
  }

  private generateSmartRecommendations(userQuery: string): ProductRecommendation[] {
    const lowerQuery = userQuery.toLowerCase()
    
    // ESP ile ilgili sorular
    if (lowerQuery.includes("esp") || lowerQuery.includes("duvar") || lowerQuery.includes("görüş")) {
      return [
        {
          productName: "ESP Paketi",
          reason: "Duvar arkası görüş ve oyuncu bilgileri için ideal",
          confidence: 0.95,
        },
        {
          productName: "Premium Bundle",
          reason: "ESP + diğer tüm özellikler tek pakette",
          confidence: 0.9,
        },
      ]
    }
    
    // AimBot ile ilgili sorular
    if (lowerQuery.includes("aim") || lowerQuery.includes("nişan") || lowerQuery.includes("hedef")) {
      return [
        {
          productName: "AimBot Pro",
          reason: "Profesyonel nişan alma yardımcısı",
          confidence: 0.95,
        },
        {
          productName: "Premium Bundle",
          reason: "AimBot + diğer tüm özellikler",
          confidence: 0.9,
        },
      ]
    }
    
    // Yeni başlayan soruları
    if (lowerQuery.includes("yeni") || lowerQuery.includes("başla") || lowerQuery.includes("ilk")) {
      return [
        {
          productName: "ESP Paketi",
          reason: "Yeni başlayanlar için en uygun seçenek",
          confidence: 0.9,
        },
        {
          productName: "HWID Spoofer",
          reason: "Güvenlik için temel koruma",
          confidence: 0.8,
        },
      ]
    }
    
    // Güvenlik soruları
    if (lowerQuery.includes("güvenli") || lowerQuery.includes("ban") || lowerQuery.includes("hwid")) {
      return [
        {
          productName: "HWID Spoofer",
          reason: "Donanım kimliği koruması için gerekli",
          confidence: 0.95,
        },
        {
          productName: "Premium Bundle",
          reason: "Tüm güvenlik özellikleri dahil",
          confidence: 0.9,
        },
      ]
    }
    
    // Varsayılan öneriler
    return [
      {
        productName: "Premium Bundle",
        reason: "Tüm özellikler tek pakette, en iyi değer",
        confidence: 0.95,
      },
      {
        productName: "ESP Paketi",
        reason: "Başlangıç için ideal seçenek",
        confidence: 0.9,
      },
      {
        productName: "AimBot Pro",
        reason: "Nişan alma becerilerinizi geliştirir",
        confidence: 0.8,
      },
    ]
  }

  async generateFAQAnswer(question: string): Promise<string> {
    try {
      // API anahtarı kontrolü veya model mevcut değilse fallback yanıt
      if (!this.isAvailable) {
        return this.generateFallbackResponse(question)
      }

      const prompt = `ValorantPro sitesi hakkında bu soruyu yanıtla: "${question}"
      
      Site bilgileri:
      - Valorant için cheat/hack araçları satıyoruz
      - ESP, AimBot, HWID Spoofer, Radar, Triggerbot ürünleri var
      - 7/24 destek, Discord sunucusu mevcut
      - Güvenli ödeme, anti-ban teknolojisi
      - Windows 10/11 desteği
      
      Kısa ve net Türkçe yanıt ver.`

      const { text } = await generateText({
        model: this.model,
        prompt,
      })

      return text
    } catch (error) {
      console.error("FAQ Generation Error:", error)
      return this.generateFallbackResponse(question)
    }
  }

  async streamResponse(messages: ChatMessage[]) {
    try {
      // API anahtarı kontrolü
      if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        throw new Error("AI özellikler şu anda yapılandırılıyor")
      }

      const systemPrompt = `Sen ValorantPro sitesinin AI asistanısın. Valorant oyunu ve site hakkında yardım ediyorsun. Türkçe yanıt ver.`

      return streamText({
        model: this.model,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      })
    } catch (error) {
      console.error("Stream Error:", error)
      throw error
    }
  }
}

export const aiService = new AIService()

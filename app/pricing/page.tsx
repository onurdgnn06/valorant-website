import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import MobileNav from "@/components/mobile-nav"

export default function PricingPage() {
  const plans = [
    {
      name: "Başlangıç",
      price: "199₺",
      duration: "1 Ay",
      description: "Temel özellikler ile başlayın",
      features: ["HWID Spoofer", "Temel ESP", "Email Destek", "1 HWID Sıfırlama", "Temel Güncellemeler"],
      popular: false,
    },
    {
      name: "Pro",
      price: "399₺",
      duration: "1 Ay",
      description: "En popüler seçim",
      features: [
        "Tüm ESP Özellikleri",
        "AimBot Pro",
        "HWID Spoofer",
        "Radar Hack",
        "7/24 Destek",
        "3 HWID Sıfırlama",
        "Öncelikli Güncellemeler",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "799₺",
      duration: "1 Ay",
      description: "Tüm özellikler dahil",
      features: [
        "Tüm Ürünler Dahil",
        "VIP Destek",
        "Sınırsız HWID Sıfırlama",
        "Beta Özellikleri",
        "Özel Konfigürasyonlar",
        "1-1 Kurulum Desteği",
        "Lifetime Güncellemeler",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Navigation */}
      <header className="container mx-auto py-8 px-4">
        <nav className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
              <span className="text-black font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold heading-premium">ValorantPro</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/80 hover:text-white font-medium transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/products" className="text-white/80 hover:text-white font-medium transition-colors">
              Ürünler
            </Link>
            <Link href="/status" className="text-white/80 hover:text-white font-medium transition-colors">
              Status
            </Link>
            <Link href="/pricing" className="text-[hsl(var(--primary))] font-medium">
              Fiyatlandırma
            </Link>
            <Link href="/faq" className="text-white/80 hover:text-white font-medium transition-colors">
              SSS
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="btn-outline-premium px-6 py-2">Giriş Yap</Button>
            </Link>
            <Link href="/register" className="hidden md:block">
              <Button className="btn-premium px-6 py-2">Kayıt Ol</Button>
            </Link>
            <MobileNav />
          </div>
        </nav>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold heading-premium mb-4">Fiyatlandırma</h1>
            <p className="text-xl text-premium max-w-2xl mx-auto">İhtiyacınıza uygun planı seçin ve hemen başlayın</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 relative ${
                plan.popular ? "ring-2 ring-[hsl(var(--primary))]/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] text-black px-6 py-2 text-sm font-semibold text-center">
                    En Popüler
                  </div>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold heading-premium mb-2">{plan.name}</h3>
                  <p className="text-premium mb-4">{plan.description}</p>
                  <div className="flex items-end justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold heading-premium">{plan.price}</span>
                    <span className="text-white/60 mb-1">/ {plan.duration}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-[hsl(var(--primary))]/20">
                        <Check className="h-4 w-4 text-[hsl(var(--primary))]" />
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className={`w-full h-12 font-semibold ${plan.popular ? "btn-premium" : "btn-outline-premium"}`}>
                  Planı Seç
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold heading-premium mb-4">Tüm Planlarda Dahil</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[hsl(var(--primary))] mb-2">99.9%</div>
                <div className="text-white/80">Güvenlik Oranı</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[hsl(var(--primary))] mb-2">24/7</div>
                <div className="text-white/80">Teknik Destek</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[hsl(var(--primary))] mb-2">30 Gün</div>
                <div className="text-white/80">Para İade Garantisi</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Eye, Target } from "lucide-react"
import ProductCard from "@/components/product-card"
import FeatureCard from "@/components/feature-card"
import TestimonialSlider from "@/components/testimonial-slider"
import Footer from "@/components/footer"
import MobileNav from "@/components/mobile-nav"
import AIChatbot from "@/components/ai-chatbot"
import AISearch from "@/components/ai-search"
import AIProductAdvisor from "@/components/ai-product-advisor"
import Logo from "@/components/logo"

export default function HomePage() {
  const featuredProducts = [
    {
      title: "ESP Paketi",
      description: "Duvar arkası görüş, oyuncu bilgileri ve daha fazlası",
      price: "299₺",
      duration: "1 Ay",
      features: ["Oyuncu İskeletleri", "Sağlık Göstergesi", "Mesafe Bilgisi", "Silah Bilgisi"],
    },
    {
      title: "AimBot Pro",
      description: "Profesyonel nişan alma yardımcısı",
      price: "399₺",
      duration: "1 Ay",
      features: ["Otomatik Hedefleme", "Recoil Kontrolü", "Ayarlanabilir FOV", "Tuş Atamaları"],
      featured: true,
    },
    {
      title: "Premium Bundle",
      description: "Tüm özellikler tek pakette",
      price: "799₺",
      duration: "1 Ay",
      features: ["ESP + AimBot + Spoofer", "Radar + Triggerbot", "VIP Destek", "%30 İndirim"],
    },
  ]

  const features = [
    {
      icon: "shield",
      title: "Anti-Ban Koruması",
      description: "En gelişmiş güvenlik teknolojileri ile %99.9 güvenlik oranı",
    },
    {
      icon: "zap",
      title: "Anında Aktivasyon",
      description: "Ödeme sonrası otomatik aktivasyon, hemen kullanmaya başlayın",
    },
    {
      icon: "zap",
      title: "Gelişmiş ESP",
      description: "Duvar arkası görüş, oyuncu bilgileri ve taktik avantajlar",
    },
    {
      icon: "zap",
      title: "Profesyonel AimBot",
      description: "Ayarlanabilir nişan alma yardımcısı, doğal görünüm",
    },
  ]

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Navigation */}
      <header className="container mx-auto py-8 px-4">
        <nav className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <span className="text-2xl font-bold heading-premium">ValorantPro</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[var(--primary)] font-medium">
              Ana Sayfa
            </Link>
            <Link href="/products" className="text-white/80 hover:text-white font-medium transition-colors">
              Ürünler
            </Link>
            <Link href="/status" className="text-white/80 hover:text-white font-medium transition-colors">
              Status
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

      <main>
        {/* Hero Section */}
        <section className="container mx-auto py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/30">
              🤖 AI Destekli Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Valorant'ta</span>
              <br />
              <span className="heading-premium">Gücünü Göster</span>
            </h1>
            <p className="text-xl text-premium mb-8 max-w-2xl mx-auto">
              ESP, AimBot, HWID Spoofer ve daha fazlası. Güvenli, anlık teslimat ile oyun deneyiminizi bir üst seviyeye
              taşıyın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/products">
                <Button className="btn-premium px-8 py-4 text-lg">
                  Satın Al
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button className="btn-outline-premium px-8 py-4 text-lg">Demo İzle</Button>
              </Link>
            </div>

            {/* AI Search */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold heading-premium mb-6">AI ile Akıllı Arama</h3>
              <AISearch />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold heading-premium mb-2">10K+</div>
                <div className="text-white/60">Aktif Kullanıcı</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold heading-premium mb-2">99.9%</div>
                <div className="text-white/60">Güvenlik Oranı</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold heading-premium mb-2">24/7</div>
                <div className="text-white/60">Destek</div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Product Advisor */}
        <section className="container mx-auto py-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold heading-premium mb-4">AI Ürün Danışmanı</h2>
            <p className="text-xl text-premium max-w-2xl mx-auto">
              Size en uygun ürünü bulmak için AI destekli kişisel danışmanımızı kullanın
            </p>
          </div>
          <AIProductAdvisor />
        </section>

        {/* Premium Features */}
        <section className="container mx-auto py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold heading-premium mb-4">Premium Özellikler</h2>
            <p className="text-xl text-premium max-w-2xl mx-auto">
              Profesyonel oyuncular için tasarlanmış gelişmiş özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold heading-premium mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-xl text-premium max-w-2xl mx-auto">En popüler ve etkili araçlarımızı keşfedin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button className="btn-outline-premium px-8 py-4">
                Tüm Ürünleri Gör
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold heading-premium mb-4">Kullanıcı Yorumları</h2>
            <p className="text-xl text-premium max-w-2xl mx-auto">Binlerce memnun kullanıcımızın deneyimleri</p>
          </div>
          <TestimonialSlider />
        </section>

        {/* CTA Section */}
        <section className="container mx-auto py-20 px-4">
          <div className="glass-card rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold heading-premium mb-4">Hemen Başla</h2>
            <p className="text-xl text-premium mb-8 max-w-2xl mx-auto">
              Valorant'ta rakiplerinizin önüne geçin. Güvenli, hızlı ve etkili araçlarla oyun deneyiminizi dönüştürün.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="btn-premium px-8 py-4 text-lg">
                  Ücretsiz Kayıt Ol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="btn-outline-premium px-8 py-4 text-lg">İletişime Geç</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  )
}

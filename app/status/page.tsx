import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock, Shield, Zap, Eye, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/footer"
import MobileNav from "@/components/mobile-nav"

export default function StatusPage() {
  const cheats = [
    {
      name: "ESP Paketi",
      status: "online",
      lastUpdate: "2 dakika önce",
      version: "v3.2.1",
      detection: "Güvenli",
      uptime: "99.8%",
      features: ["Oyuncu İskeletleri", "Sağlık Göstergesi", "Mesafe Bilgisi", "Silah Bilgisi"],
    },
    {
      name: "AimBot Pro",
      status: "online",
      lastUpdate: "5 dakika önce",
      version: "v2.8.4",
      detection: "Güvenli",
      uptime: "99.9%",
      features: ["Otomatik Hedefleme", "Recoil Kontrolü", "Ayarlanabilir FOV", "Tuş Atamaları"],
    },
    {
      name: "HWID Spoofer",
      status: "maintenance",
      lastUpdate: "1 saat önce",
      version: "v1.9.2",
      detection: "Bakımda",
      uptime: "98.5%",
      features: ["Hardware ID Değiştirme", "Registry Temizleme", "Otomatik Sıfırlama"],
    },
    {
      name: "Radar Hack",
      status: "online",
      lastUpdate: "10 dakika önce",
      version: "v1.5.3",
      detection: "Güvenli",
      uptime: "99.7%",
      features: ["Mini Harita", "Düşman Konumları", "Bomba Lokasyonu"],
    },
    {
      name: "Triggerbot",
      status: "warning",
      lastUpdate: "30 dakika önce",
      version: "v1.2.1",
      detection: "Dikkatli Kullan",
      uptime: "97.2%",
      features: ["Otomatik Ateş", "Gecikme Ayarları", "Hedef Filtreleme"],
    },
  ]

  const systemStatus = [
    {
      service: "Ana Sunucular",
      status: "online",
      responseTime: "12ms",
    },
    {
      service: "Lisans Sistemi",
      status: "online",
      responseTime: "8ms",
    },
    {
      service: "Güncelleme Sunucusu",
      status: "online",
      responseTime: "15ms",
    },
    {
      service: "Destek Sistemi",
      status: "maintenance",
      responseTime: "N/A",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-5 w-5 text-primary" />
      case "offline":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "maintenance":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-primary" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Çevrimiçi</Badge>
      case "offline":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Çevrimdışı</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Bakım</Badge>
      case "warning":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Uyarı</Badge>
      default:
        return <Badge className="bg-primary/20 text-primary border-primary/30">Çevrimiçi</Badge>
    }
  }

  const getDetectionBadge = (detection: string) => {
    switch (detection) {
      case "Güvenli":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Güvenli</Badge>
      case "Dikkatli Kullan":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Dikkatli Kullan</Badge>
      case "Bakımda":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Bakımda</Badge>
      case "Risk":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Risk</Badge>
      default:
        return <Badge className="bg-primary/20 text-primary border-primary/30">Güvenli</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Navigation */}
      <header className="container mx-auto py-8 px-4">
        <nav className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] flex items-center justify-center">
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
            <Link href="/status" className="text-[var(--primary)] font-medium">
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

      <main className="container mx-auto py-12 px-4">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold heading-premium mb-4">Hile Durumu</h1>
            <p className="text-xl text-premium max-w-2xl mx-auto">
              Tüm hilelerimizin anlık durumunu ve güvenlik bilgilerini takip edin
            </p>
          </div>
        </div>

        {/* Overall Status */}
        <div className="glass-card rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold heading-premium">Genel Durum</h2>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="text-primary font-semibold">Tüm Sistemler Çalışıyor</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4/5</div>
              <div className="text-white/60">Aktif Hileler</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold heading-premium mb-2">99.2%</div>
              <div className="text-white/60">Ortalama Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold heading-premium mb-2">12ms</div>
              <div className="text-white/60">Ortalama Yanıt</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">0</div>
              <div className="text-white/60">Aktif Sorun</div>
            </div>
          </div>
        </div>

        {/* Cheat Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold heading-premium mb-6">Hile Durumları</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cheats.map((cheat, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold heading-premium mb-2">{cheat.name}</h3>
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(cheat.status)}
                      {getStatusBadge(cheat.status)}
                      {getDetectionBadge(cheat.detection)}
                    </div>
                  </div>
                  <div className="text-right text-sm text-white/60">
                    <div>v{cheat.version}</div>
                    <div>{cheat.lastUpdate}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">Uptime</span>
                    <span className="text-white/80">{cheat.uptime}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: cheat.uptime }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white/80">Özellikler:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cheat.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} className="bg-white/10 text-white/70 border-white/20 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold heading-premium mb-6">Sistem Durumu</h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/10">
              {systemStatus.map((system, index) => (
                <div key={index} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(system.status)}
                    <div>
                      <h3 className="font-semibold text-white">{system.service}</h3>
                      <p className="text-sm text-white/60">Yanıt Süresi: {system.responseTime}</p>
                    </div>
                  </div>
                  {getStatusBadge(system.status)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <Shield className="h-12 w-12 text-[var(--primary)] mx-auto mb-4" />
          <h3 className="text-2xl font-bold heading-premium mb-4">Güvenlik Bildirimi</h3>
          <p className="text-premium mb-6 max-w-2xl mx-auto">
            Tüm hilelerimiz sürekli olarak güvenlik testlerinden geçirilmektedir. Herhangi bir risk tespit edildiğinde
            anında bildirilir ve gerekli önlemler alınır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="btn-premium px-6 py-3">
                Hileleri İncele
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="btn-outline-premium px-6 py-3">
                Destek Al
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

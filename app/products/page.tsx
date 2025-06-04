import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import MobileNav from "@/components/mobile-nav"

export default function ProductsPage() {
  const allProducts = [
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
      title: "HWID Spoofer",
      description: "Donanım ID değiştirici",
      price: "199₺",
      duration: "1 Ay",
      features: ["Tam Sistem Koruması", "Otomatik Yenileme", "Ban Koruması", "Kolay Kurulum"],
    },
    {
      title: "Radar Hack",
      description: "Minimap üzerinde tüm düşmanları görün",
      price: "249₺",
      duration: "1 Ay",
      features: ["Düşman Konumları", "Bomba Lokasyonu", "Gerçek Zamanlı", "Kolay Kullanım"],
    },
    {
      title: "Triggerbot",
      description: "Otomatik tetik çekme sistemi",
      price: "179₺",
      duration: "1 Ay",
      features: ["Anlık Tepki", "Ayarlanabilir Gecikme", "Hedef Seçimi", "Güvenli Mod"],
    },
    {
      title: "Premium Bundle",
      description: "Tüm özellikler tek pakette",
      price: "799₺",
      duration: "1 Ay",
      features: ["ESP + AimBot + Spoofer", "Radar + Triggerbot", "VIP Destek", "%30 İndirim"],
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
            <Link href="/products" className="text-[hsl(var(--primary))] font-medium">
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

      <main className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <h1 className="text-4xl font-bold heading-premium mb-4">Tüm Ürünler</h1>
          <p className="text-xl text-premium">Valorant için en gelişmiş araçlar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

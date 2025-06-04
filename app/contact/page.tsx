import Link from "next/link"
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/interactive-forms"
import MobileNav from "@/components/mobile-nav"
import Footer from "@/components/footer"

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold heading-premium mb-4">İletişim</h1>
          <p className="text-xl text-premium">Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="heading-premium">İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/20">
                    <Mail className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90">Email</h4>
                    <p className="text-white/70">support@valorantpro.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/20">
                    <MessageCircle className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90">Discord</h4>
                    <p className="text-white/70">discord.gg/valorantpro</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/20">
                    <Phone className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90">Telegram</h4>
                    <p className="text-white/70">@ValorantProSupport</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="heading-premium">Çalışma Saatleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Pazartesi - Cuma</span>
                    <span className="text-white/90">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Cumartesi</span>
                    <span className="text-white/90">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Pazar</span>
                    <span className="text-white/90">Kapalı</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Footer from "@/components/footer"
import MobileNav from "@/components/mobile-nav"

export default function FAQPage() {
  const faqs = [
    {
      question: "Ürünler nasıl teslim edilir?",
      answer:
        "Ödemeniz onaylandıktan sonra, ürün anahtarınız hesabınıza otomatik olarak tanımlanır ve anında kullanıma başlayabilirsiniz. Email ile de bilgilendirme yapılır.",
    },
    {
      question: "Ban riski var mı?",
      answer:
        "Ürünlerimiz en gelişmiş anti-ban teknolojileri ile korunmaktadır. %99.9 güvenlik oranımız vardır, ancak hiçbir yazılım %100 güvenli değildir. Bu nedenle kullanım talimatlarına uymanızı öneririz.",
    },
    {
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer:
        "Kredi kartı, banka havalesi, PayPal ve Bitcoin, Ethereum gibi kripto para birimleri ile ödeme kabul ediyoruz. Tüm ödemeler SSL ile korunmaktadır.",
    },
    {
      question: "İade politikanız nedir?",
      answer:
        "Dijital ürün olduğu için satın alınan ürünlerde iade yapılmamaktadır. Ancak teknik sorunlarda 30 gün içinde destek ekibimiz size yardımcı olacaktır.",
    },
    {
      question: "HWID sıfırlama nasıl yapılır?",
      answer:
        "Kullanıcı panelinizden HWID sıfırlama butonuna tıklayarak işlemi gerçekleştirebilirsiniz. Plan türünüze göre belirli sayıda sıfırlama hakkınız vardır.",
    },
    {
      question: "Ürünler hangi işletim sistemlerinde çalışır?",
      answer:
        "Ürünlerimiz Windows 10 ve Windows 11 işletim sistemlerinde çalışmaktadır. MacOS ve Linux desteği şu anda bulunmamaktadır.",
    },
    {
      question: "Güncellemeler nasıl yapılır?",
      answer:
        "Ürünlerimiz otomatik güncelleme özelliğine sahiptir. Valorant güncellemelerinden sonra yazılımımız da otomatik olarak güncellenir.",
    },
    {
      question: "Destek nasıl alabilirim?",
      answer:
        "7/24 destek için Discord sunucumuz, email desteğimiz ve canlı chat sistemimiz bulunmaktadır. VIP üyeler öncelikli destek alır.",
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
            <Link href="/faq" className="text-[hsl(var(--primary))] font-medium">
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
            <h1 className="text-4xl font-bold heading-premium mb-4">Sıkça Sorulan Sorular</h1>
            <p className="text-xl text-premium max-w-2xl mx-auto">Merak ettiğiniz her şeyin cevabı burada</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-[hsl(var(--primary))]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold heading-premium mb-4">Sorunuz burada yok mu?</h3>
            <p className="text-premium mb-6">
              Destek ekibimizle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-premium px-6 py-3">İletişime Geç</Button>
              </Link>
              <Link href="https://discord.gg/valorantpro" target="_blank">
                <Button className="btn-outline-premium px-6 py-3">Discord'a Katıl</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

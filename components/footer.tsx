import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"
import Logo from "@/components/logo"

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size="sm" />
              <span className="text-xl font-bold">ValorantPro</span>
            </div>
            <p className="text-gray-400 mb-4">Valorant oyununda rekabet avantajı sağlayan premium çözümler.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                <Github className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Ürünler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  ESP Paketi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  AimBot Pro
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  HWID Spoofer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  VIP Paketler
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  SSS
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[hsl(var(--primary))]">
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@valorantpro.com</li>
              <li className="text-gray-400">Discord: ValorantPro#1234</li>
              <li className="text-gray-400">Telegram: @ValorantPro</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ValorantPro. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, type User } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Package,
  CreditCard,
  Settings,
  LogOut,
  UserIcon,
  Bell,
  RefreshCw,
  Calendar,
  Download,
  Play,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/auth"

export default function UserProductsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [activeProducts] = useState([
    {
      id: 1,
      name: "ESP Paketi",
      key: "ESP-XXXX-XXXX-XXXX",
      expiresAt: "2024-01-31",
      hwid: "HWID-XXXX-XXXX-XXXX",
      status: "active",
      downloadUrl: "#",
      lastUsed: "2023-12-20 14:30",
    },
    {
      id: 2,
      name: "AimBot Pro",
      key: "AIM-XXXX-XXXX-XXXX",
      expiresAt: "2024-01-31",
      hwid: "HWID-XXXX-XXXX-XXXX",
      status: "active",
      downloadUrl: "#",
      lastUsed: "2023-12-19 16:45",
    },
    {
      id: 3,
      name: "HWID Spoofer",
      key: "HWID-YYYY-YYYY-YYYY",
      expiresAt: "2024-02-15",
      hwid: "HWID-ZZZZ-ZZZZ-ZZZZ",
      status: "expired",
      downloadUrl: "#",
      lastUsed: "2023-11-30 12:15",
    },
  ])

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        redirect("/login")
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  async function handleLogout() {
    await logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col glass-card min-h-screen rounded-none">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
                <span className="text-black font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold heading-premium">ValorantPro</span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/products"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                >
                  <Package className="h-5 w-5" />
                  <span>Ürünlerim</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/payments"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Ödemeler</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Settings className="h-5 w-5" />
                  <span>Ayarlar</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-white/10">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Çıkış Yap</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="glass-card rounded-none border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold heading-premium">Ürünlerim</h1>
                <p className="text-white/60">Aktif ürünlerinizi yönetin</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-white/70 hover:text-white">
                      <UserIcon className="h-5 w-5" />
                      <span>{user.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card border-white/10">
                    <DropdownMenuItem onClick={handleLogout} className="hover:bg-white/5">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Çıkış Yap</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6 space-y-6">
            {activeProducts.map((product) => (
              <Card key={product.id} className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-xl heading-premium">{product.name}</CardTitle>
                  <Badge
                    className={
                      product.status === "active"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }
                  >
                    {product.status === "active" ? "Aktif" : "Süresi Dolmuş"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-white/60 mb-1">Ürün Anahtarı</p>
                        <p className="font-mono text-white/90">{product.key}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Bitiş Tarihi</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[hsl(var(--primary))]" />
                          <p className="text-white/90">{product.expiresAt}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Son Kullanım</p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white/60" />
                          <p className="text-white/80">{product.lastUsed}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-white/60 mb-2">HWID</p>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-white/90">{product.hwid}</p>
                        <Button className="btn-outline-premium" disabled={product.status !== "active"}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          HWID Sıfırla
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white/80 hover:bg-white/5"
                        disabled={product.status !== "active"}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        İndir
                      </Button>
                      <Button className="btn-premium" disabled={product.status !== "active"}>
                        <Play className="h-4 w-4 mr-2" />
                        Başlat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {activeProducts.length === 0 && (
              <Card className="glass-card border-white/10">
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold heading-premium mb-2">Henüz ürününüz yok</h3>
                  <p className="text-white/60 mb-6">Hemen bir ürün satın alarak başlayın</p>
                  <Link href="/products">
                    <Button className="btn-premium">Ürünleri İncele</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

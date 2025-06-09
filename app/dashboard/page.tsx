"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, logout, type User as AuthUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import UserDashboard from "@/components/user-dashboard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Home,
  Package,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  RefreshCw,
  Clock,
  Calendar,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
// MobileNav import'u ekle
import MobileNav from "@/components/mobile-nav"
import { UserIcon } from "lucide-react"
import Logo from "@/components/logo"

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [activeProducts] = useState([
    {
      id: 1,
      name: "ESP Paketi",
      key: "ESP-XXXX-XXXX-XXXX",
      expiresAt: "2023-12-31",
      hwid: "HWID-XXXX-XXXX-XXXX",
      status: "active",
    },
    {
      id: 2,
      name: "AimBot Pro",
      key: "AIM-XXXX-XXXX-XXXX",
      expiresAt: "2023-12-31",
      hwid: "HWID-XXXX-XXXX-XXXX",
      status: "active",
    },
  ])

  const [purchaseHistory] = useState([
    {
      id: 1,
      product: "ESP Paketi",
      date: "2023-11-15",
      amount: "299₺",
      status: "completed",
    },
    {
      id: 2,
      product: "AimBot Pro",
      date: "2023-11-15",
      amount: "399₺",
      status: "completed",
    },
    {
      id: 3,
      product: "HWID Spoofer",
      date: "2023-10-20",
      amount: "199₺",
      status: "completed",
    },
  ])

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/login")
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    }
    checkAuth()
  }, [router])

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

  const handleLogout = async () => {
    await logout()
  }

  return (
    <UserDashboard user={user}>
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:flex w-64 flex-col glass-card min-h-screen rounded-none">
            <div className="p-4 flex items-center gap-2 border-b border-white/10">
              <Logo size="sm" />
              <span className="text-xl font-bold heading-premium">ValorantPro</span>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/products"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <Package className="h-5 w-5" />
                    <span>Ürünlerim</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/payments"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Ödemeler</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Ayarlar</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-800">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
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
                  <h1 className="text-2xl font-bold heading-premium">Hoş Geldin, {user.username}!</h1>
                  <p className="text-white/60">Kullanıcı Paneli</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <div className="hidden md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 text-white/70 hover:text-white">
                          <UserIcon className="h-5 w-5" />
                          <span>{user.username}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card border-white/10">
                        <DropdownMenuItem className="hover:bg-white/5">
                          <UserIcon className="h-4 w-4 mr-2" />
                          <span>Profil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5">
                          <Settings className="h-4 w-4 mr-2" />
                          <span>Ayarlar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="hover:bg-white/5">
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Çıkış Yap</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <MobileNav />
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="products">
                <TabsList className="bg-[#121212] border border-gray-800">
                  <TabsTrigger value="products">Aktif Ürünler</TabsTrigger>
                  <TabsTrigger value="history">Satın Alma Geçmişi</TabsTrigger>
                  <TabsTrigger value="support">Destek</TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="mt-6">
                  <div className="grid gap-6">
                    {activeProducts.map((product) => (
                      <Card key={product.id} className="bg-[#121212] border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <Badge className="bg-primary hover:bg-primary/90">Aktif</Badge>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-400">Ürün Anahtarı</p>
                                <p className="font-mono">{product.key}</p>
                              </div>
                              <div>
                                <p className="text-sm text-white/60">Bitiş Tarihi</p>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-[hsl(var(--primary))]" />
                                  <p>{product.expiresAt}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-white/60">HWID</p>
                              <div className="flex items-center justify-between">
                                <p className="font-mono">{product.hwid}</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="btn-outline-premium"
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  HWID Sıfırla
                                </Button>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/5">
                                İndir
                              </Button>
                              <Button className="btn-premium" size="sm">
                                Başlat
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <Card className="bg-[#121212] border-gray-800">
                    <CardHeader>
                      <CardTitle>Satın Alma Geçmişi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-3 px-4 font-medium text-gray-400">Ürün</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-400">Tarih</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-400">Tutar</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-400">Durum</th>
                              <th className="text-right py-3 px-4 font-medium text-gray-400"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseHistory.map((item) => (
                              <tr key={item.id} className="border-b border-gray-800">
                                <td className="py-3 px-4">{item.product}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>{item.date}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">{item.amount}</td>
                                <td className="py-3 px-4">
                                  <Badge variant="outline" className="border-primary text-primary">
                                    Tamamlandı
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-gray-800">
                                      <DropdownMenuItem className="hover:bg-[#121212]">Fatura İndir</DropdownMenuItem>
                                      <DropdownMenuItem className="hover:bg-[#121212]">
                                        Detayları Görüntüle
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="support" className="mt-6">
                  <Card className="bg-[#121212] border-gray-800">
                    <CardHeader>
                      <CardTitle>Destek Talebi Oluştur</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Konu</Label>
                          <Input
                            id="subject"
                            placeholder="Destek talebinizin konusu"
                            className="glass h-12 text-white placeholder:text-white/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Mesaj</Label>
                          <textarea
                            id="message"
                            rows={5}
                            placeholder="Sorununuzu detaylı bir şekilde açıklayın"
                            className="w-full rounded-md glass p-3 text-white placeholder:text-white/50"
                          />
                        </div>

                        <Button className="btn-premium">Gönder</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </UserDashboard>
  )
}
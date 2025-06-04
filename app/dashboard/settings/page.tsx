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
  Save,
  Eye,
  EyeOff,
  Shield,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logout } from "@/lib/auth"

export default function UserSettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
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
                <h1 className="text-2xl font-bold heading-premium">Hesap Ayarları</h1>
                <p className="text-white/60">Profil ve güvenlik ayarlarınızı yönetin</p>
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
          <div className="p-6">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="glass-card border border-white/10">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="security">Güvenlik</TabsTrigger>
                <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      Profil Bilgileri
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
                          <span className="text-black font-bold text-2xl">{user.username[0].toUpperCase()}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold heading-premium">{user.username}</h3>
                          <p className="text-white/60">{user.email}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-white/20 text-white/80 hover:bg-white/5"
                          >
                            Profil Fotoğrafı Değiştir
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-white/90">
                            Kullanıcı Adı
                          </Label>
                          <Input id="username" defaultValue={user.username} className="glass h-12 text-white" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white/90">
                            E-posta
                          </Label>
                          <Input id="email" type="email" defaultValue={user.email} className="glass h-12 text-white" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white/90">
                            Ad
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Adınız"
                            className="glass h-12 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white/90">
                            Soyad
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Soyadınız"
                            className="glass h-12 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>

                      <Button className="btn-premium">
                        <Save className="h-4 w-4 mr-2" />
                        Değişiklikleri Kaydet
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="heading-premium flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Şifre Değiştir
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword" className="text-white/90">
                            Mevcut Şifre
                          </Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Mevcut şifrenizi girin"
                              className="glass h-12 text-white placeholder:text-white/50 pr-12"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword" className="text-white/90">
                            Yeni Şifre
                          </Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Yeni şifrenizi girin"
                              className="glass h-12 text-white placeholder:text-white/50 pr-12"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-white/90">
                            Yeni Şifre Tekrar
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Yeni şifrenizi tekrar girin"
                            className="glass h-12 text-white placeholder:text-white/50"
                          />
                        </div>

                        <Button className="btn-premium">
                          <Save className="h-4 w-4 mr-2" />
                          Şifreyi Güncelle
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="heading-premium">İki Faktörlü Doğrulama</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white/90">2FA Koruması</h4>
                          <p className="text-sm text-white/60">Hesabınızı ekstra güvenlik katmanı ile koruyun</p>
                        </div>
                        <Button className="btn-outline-premium">Etkinleştir</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Bildirim Tercihleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white/90">Email Bildirimleri</h4>
                          <p className="text-sm text-white/60">Önemli güncellemeler ve duyurular</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[hsl(var(--primary))] bg-transparent border-white/30 rounded focus:ring-[hsl(var(--primary))]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white/90">Ürün Güncellemeleri</h4>
                          <p className="text-sm text-white/60">Yeni özellikler ve güncellemeler</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[hsl(var(--primary))] bg-transparent border-white/30 rounded focus:ring-[hsl(var(--primary))]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white/90">Güvenlik Uyarıları</h4>
                          <p className="text-sm text-white/60">Şüpheli aktivite bildirimleri</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[hsl(var(--primary))] bg-transparent border-white/30 rounded focus:ring-[hsl(var(--primary))]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white/90">Pazarlama Emailları</h4>
                          <p className="text-sm text-white/60">Özel teklifler ve kampanyalar</p>
                        </div>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[hsl(var(--primary))] bg-transparent border-white/30 rounded focus:ring-[hsl(var(--primary))]"
                        />
                      </div>

                      <Button className="btn-premium">
                        <Save className="h-4 w-4 mr-2" />
                        Tercihleri Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

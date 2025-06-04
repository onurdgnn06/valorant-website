"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  Users,
  Package,
  BarChart3,
  Settings,
  LogOut,
  UserIcon,
  Bell,
  Plus,
  TrendingUp,
  DollarSign,
  UserCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { logout } from "@/lib/auth"
import Logo from "@/components/logo"

// usePathname import'u ekle
import { usePathname } from "next/navigation"

interface AdminDashboardProps {
  user: any
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [stats] = useState({
    totalUsers: 1247,
    totalSales: 89650,
    activeProducts: 6,
    todaySales: 12,
  })

  const [recentSales] = useState([
    { id: 1, user: "user123", product: "ESP Paketi", amount: "299₺", date: "2023-12-20" },
    { id: 2, user: "gamer456", product: "AimBot Pro", amount: "399₺", date: "2023-12-20" },
    { id: 3, user: "pro789", product: "Premium Bundle", amount: "799₺", date: "2023-12-19" },
  ])

  const [users] = useState([
    { id: 1, username: "user123", email: "user@example.com", role: "user", status: "active" },
    { id: 2, username: "gamer456", email: "gamer@example.com", role: "user", status: "active" },
    { id: 3, username: "pro789", email: "pro@example.com", role: "user", status: "banned" },
  ])

  async function handleLogout() {
    await logout()
  }

  // Component içinde pathname'i al
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col glass-card min-h-screen rounded-none">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <span className="text-xl font-bold heading-premium">Admin Panel</span>
            </div>
          </div>

          {/* Sidebar navigation'ı güncelle */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/admin"
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/admin/users"
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Kullanıcılar</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/admin/products"
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Ürünler</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/analytics"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/admin/analytics"
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analitik</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/admin/settings"
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
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
                <h1 className="text-2xl font-bold heading-premium">Admin Dashboard</h1>
                <p className="text-white/60">Hoş geldin, {user.username}</p>
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
            </div>
          </header>

          {/* Content */}
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Toplam Kullanıcı</CardTitle>
                  <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-white/60">+12% geçen aydan</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Toplam Satış</CardTitle>
                  <DollarSign className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{stats.totalSales.toLocaleString()}₺</div>
                  <p className="text-xs text-white/60">+8% geçen aydan</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Aktif Ürünler</CardTitle>
                  <Package className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{stats.activeProducts}</div>
                  <p className="text-xs text-white/60">Tüm ürünler aktif</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Bugünkü Satış</CardTitle>
                  <TrendingUp className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{stats.todaySales}</div>
                  <p className="text-xs text-white/60">+3 son 1 saatte</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="glass-card border border-white/10">
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="users">Kullanıcı Yönetimi</TabsTrigger>
                <TabsTrigger value="products">Ürün Yönetimi</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="heading-premium">Son Satışlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentSales.map((sale) => (
                          <div key={sale.id} className="flex items-center justify-between">
                            <div>
                              <p className="text-white/90 font-medium">{sale.user}</p>
                              <p className="text-white/60 text-sm">{sale.product}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white/90 font-medium">{sale.amount}</p>
                              <p className="text-white/60 text-sm">{sale.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="heading-premium">Hızlı İşlemler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="btn-premium w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Ürün Ekle
                      </Button>
                      <Button className="btn-outline-premium w-full justify-start">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Kullanıcı Yönetimi
                      </Button>
                      <Button className="btn-outline-premium w-full justify-start">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Satış Raporu
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <Card className="glass-card border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="heading-premium">Kullanıcı Yönetimi</CardTitle>
                    <Button className="btn-premium">
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Kullanıcı
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 font-medium text-white/60">Kullanıcı Adı</th>
                            <th className="text-left py-3 px-4 font-medium text-white/60">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-white/60">Rol</th>
                            <th className="text-left py-3 px-4 font-medium text-white/60">Durum</th>
                            <th className="text-right py-3 px-4 font-medium text-white/60">İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((userItem) => (
                            <tr key={userItem.id} className="border-b border-white/5">
                              <td className="py-3 px-4 text-white/90">{userItem.username}</td>
                              <td className="py-3 px-4 text-white/80">{userItem.email}</td>
                              <td className="py-3 px-4">
                                <Badge
                                  className={
                                    userItem.role === "admin"
                                      ? "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/30"
                                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  }
                                >
                                  {userItem.role}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Badge
                                  className={
                                    userItem.status === "active"
                                      ? "bg-primary/20 text-primary border-primary/30"
                                      : "bg-red-500/20 text-red-400 border-red-500/30"
                                  }
                                >
                                  {userItem.status === "active" ? "Aktif" : "Yasaklı"}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                                      İşlemler
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="glass-card border-white/10">
                                    <DropdownMenuItem className="hover:bg-white/5">Düzenle</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-white/5">HWID Sıfırla</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-white/5 text-red-400">
                                      {userItem.status === "active" ? "Yasakla" : "Yasağı Kaldır"}
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

              <TabsContent value="products" className="space-y-6">
                <Card className="glass-card border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="heading-premium">Ürün Oluştur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="productName" className="text-white/90">
                            Ürün Adı
                          </Label>
                          <Input
                            id="productName"
                            placeholder="ESP Paketi"
                            className="glass h-12 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="productPrice" className="text-white/90">
                            Fiyat (₺)
                          </Label>
                          <Input
                            id="productPrice"
                            type="number"
                            placeholder="299"
                            className="glass h-12 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productDescription" className="text-white/90">
                          Açıklama
                        </Label>
                        <textarea
                          id="productDescription"
                          rows={4}
                          placeholder="Ürün açıklaması..."
                          className="w-full rounded-xl glass p-4 text-white placeholder:text-white/50 resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productKeys" className="text-white/90">
                          Stok Ekleme (Her satırda bir key)
                        </Label>
                        <textarea
                          id="productKeys"
                          rows={6}
                          placeholder="KEY-XXXX-XXXX-XXXX&#10;KEY-YYYY-YYYY-YYYY&#10;KEY-ZZZZ-ZZZZ-ZZZZ"
                          className="w-full rounded-xl glass p-4 text-white placeholder:text-white/50 resize-none font-mono text-sm"
                        />
                      </div>

                      <Button className="btn-premium">
                        <Plus className="h-4 w-4 mr-2" />
                        Ürün Oluştur
                      </Button>
                    </form>
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

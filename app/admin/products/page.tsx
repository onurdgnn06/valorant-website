"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, type User } from "@/lib/auth"
import { redirect } from "next/navigation"
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
  Search,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logout } from "@/lib/auth"

export default function AdminProductsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [products] = useState([
    { id: 1, name: "ESP Paketi", price: 299, stock: 45, sold: 234, status: "active" },
    { id: 2, name: "AimBot Pro", price: 399, stock: 32, sold: 189, status: "active" },
    { id: 3, name: "HWID Spoofer", price: 199, stock: 67, sold: 156, status: "active" },
    { id: 4, name: "Radar Hack", price: 249, stock: 23, sold: 98, status: "active" },
    { id: 5, name: "Triggerbot", price: 179, stock: 0, sold: 67, status: "out_of_stock" },
    { id: 6, name: "Premium Bundle", price: 799, stock: 15, sold: 45, status: "active" },
  ])

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        redirect("/login")
      } else if (currentUser.role !== "admin") {
        redirect("/dashboard")
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
              <span className="text-xl font-bold heading-premium">Admin Panel</span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Users className="h-5 w-5" />
                  <span>Kullanıcılar</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                >
                  <Package className="h-5 w-5" />
                  <span>Ürünler</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analitik</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
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
                <h1 className="text-2xl font-bold heading-premium">Ürün Yönetimi</h1>
                <p className="text-white/60">Ürünleri yönetin ve stok ekleyin</p>
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
            <Tabs defaultValue="list" className="space-y-6">
              <TabsList className="glass-card border border-white/10">
                <TabsTrigger value="list">Ürün Listesi</TabsTrigger>
                <TabsTrigger value="create">Yeni Ürün</TabsTrigger>
                <TabsTrigger value="stock">Stok Yönetimi</TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <Card className="glass-card border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="heading-premium">Tüm Ürünler</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                        <Input placeholder="Ürün ara..." className="glass pl-10 h-10 w-64" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 font-medium text-white/60">Ürün</th>
                            <th className="text-left py-3 px-4 font-medium text-white/60">Fiyat</th>
                            <th className="text-left py-3 px-4 font-medium text-white/60">Stok</th>
                            <th className="text-left py-3 px-4 font-medium text-white/60">Satılan</th>
                            <th className="text-left py-3 px-4 font-medium text-white/60">Durum</th>
                            <th className="text-right py-3 px-4 font-medium text-white/60">İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
                                    <Package className="h-5 w-5 text-black" />
                                  </div>
                                  <span className="text-white/90 font-medium">{product.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-white/90">{product.price}₺</td>
                              <td className="py-3 px-4">
                                <span className={product.stock === 0 ? "text-red-400" : "text-white/90"}>
                                  {product.stock}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-white/90">{product.sold}</td>
                              <td className="py-3 px-4">
                                <Badge
                                  className={
                                    product.status === "active"
                                      ? "bg-primary/20 text-primary border-primary/30"
                                      : "bg-red-500/20 text-red-400 border-red-500/30"
                                  }
                                >
                                  {product.status === "active" ? "Aktif" : "Stok Yok"}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center gap-2 justify-end">
                                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium">Yeni Ürün Oluştur</CardTitle>
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
                        <Label htmlFor="productFeatures" className="text-white/90">
                          Özellikler (Her satırda bir özellik)
                        </Label>
                        <textarea
                          id="productFeatures"
                          rows={4}
                          placeholder="Oyuncu İskeletleri&#10;Sağlık Göstergesi&#10;Mesafe Bilgisi&#10;Silah Bilgisi"
                          className="w-full rounded-xl glass p-4 text-white placeholder:text-white/50 resize-none"
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

              <TabsContent value="stock">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium">Stok Yönetimi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="productSelect" className="text-white/90">
                          Ürün Seç
                        </Label>
                        <select className="w-full rounded-xl glass p-4 text-white bg-transparent border border-white/10">
                          <option value="">Ürün seçin...</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id} className="bg-[#121212]">
                              {product.name} (Mevcut Stok: {product.stock})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productKeys" className="text-white/90">
                          Stok Ekleme (Her satırda bir key)
                        </Label>
                        <textarea
                          id="productKeys"
                          rows={8}
                          placeholder="KEY-XXXX-XXXX-XXXX&#10;KEY-YYYY-YYYY-YYYY&#10;KEY-ZZZZ-ZZZZ-ZZZZ"
                          className="w-full rounded-xl glass p-4 text-white placeholder:text-white/50 resize-none font-mono text-sm"
                        />
                      </div>

                      <Button className="btn-premium">
                        <Plus className="h-4 w-4 mr-2" />
                        Stok Ekle
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

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
  TrendingUp,
  DollarSign,
  ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/auth"

export default function AdminAnalyticsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [analytics] = useState({
    revenue: {
      total: 89650,
      thisMonth: 12450,
      lastMonth: 11200,
      growth: 11.2,
    },
    sales: {
      total: 1247,
      thisMonth: 89,
      lastMonth: 76,
      growth: 17.1,
    },
    users: {
      total: 1247,
      active: 892,
      new: 45,
      growth: 8.5,
    },
    products: {
      bestSeller: "AimBot Pro",
      totalSold: 189,
      revenue: 75411,
    },
  })

  const [salesData] = useState([
    { month: "Ocak", sales: 65, revenue: 19500 },
    { month: "Şubat", sales: 78, revenue: 23400 },
    { month: "Mart", sales: 92, revenue: 27600 },
    { month: "Nisan", sales: 87, revenue: 26100 },
    { month: "Mayıs", sales: 103, revenue: 30900 },
    { month: "Haziran", sales: 95, revenue: 28500 },
    { month: "Temmuz", sales: 112, revenue: 33600 },
    { month: "Ağustos", sales: 98, revenue: 29400 },
    { month: "Eylül", sales: 89, revenue: 26700 },
    { month: "Ekim", sales: 76, revenue: 22800 },
    { month: "Kasım", sales: 89, revenue: 26700 },
    { month: "Aralık", sales: 94, revenue: 28200 },
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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Package className="h-5 w-5" />
                  <span>Ürünler</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
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
                <h1 className="text-2xl font-bold heading-premium">Analitik & Raporlar</h1>
                <p className="text-white/60">Satış ve kullanıcı istatistikleri</p>
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
            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Toplam Gelir</CardTitle>
                  <DollarSign className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{analytics.revenue.total.toLocaleString()}₺</div>
                  <div className="flex items-center text-xs text-[hsl(var(--primary))]">
                    <TrendingUp className="h-3 w-3 mr-1" />+{analytics.revenue.growth}% bu ay
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Toplam Satış</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{analytics.sales.total.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-[hsl(var(--primary))]">
                    <TrendingUp className="h-3 w-3 mr-1" />+{analytics.sales.growth}% bu ay
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Aktif Kullanıcı</CardTitle>
                  <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{analytics.users.active.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-[hsl(var(--primary))]">
                    <TrendingUp className="h-3 w-3 mr-1" />+{analytics.users.growth}% bu ay
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">En Çok Satan</CardTitle>
                  <Package className="h-4 w-4 text-[hsl(var(--primary))]" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold heading-premium">{analytics.products.bestSeller}</div>
                  <div className="text-xs text-white/60">{analytics.products.totalSold} satış</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="heading-premium">Aylık Satış Trendi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.slice(-6).map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white/80">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-white/60">{data.sales} satış</span>
                          <span className="text-[hsl(var(--primary))] font-medium">{data.revenue.toLocaleString()}₺</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="heading-premium">Ürün Performansı</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">AimBot Pro</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full">
                          <div className="w-4/5 h-full bg-[hsl(var(--primary))] rounded-full"></div>
                        </div>
                        <span className="text-white/60">189</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">ESP Paketi</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full">
                          <div className="w-3/4 h-full bg-[hsl(var(--primary))] rounded-full"></div>
                        </div>
                        <span className="text-white/60">156</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">HWID Spoofer</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full">
                          <div className="w-2/3 h-full bg-[hsl(var(--primary))] rounded-full"></div>
                        </div>
                        <span className="text-white/60">134</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Radar Hack</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full">
                          <div className="w-1/2 h-full bg-[hsl(var(--primary))] rounded-full"></div>
                        </div>
                        <span className="text-white/60">98</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Triggerbot</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full">
                          <div className="w-1/3 h-full bg-[hsl(var(--primary))] rounded-full"></div>
                        </div>
                        <span className="text-white/60">67</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

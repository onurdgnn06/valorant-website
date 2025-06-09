"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Package,
  CreditCard,
  Settings,
  LogOut,
  UserIcon,
  Bell,
  Clock,
  Download,
  MoreHorizontal,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/auth"

export default function UserPaymentsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [paymentHistory] = useState([
    {
      id: 1,
      product: "ESP Paketi",
      date: "2023-12-15",
      amount: "299₺",
      status: "completed",
      paymentMethod: "Kredi Kartı",
      transactionId: "TXN-001234567",
    },
    {
      id: 2,
      product: "AimBot Pro",
      date: "2023-12-15",
      amount: "399₺",
      status: "completed",
      paymentMethod: "PayPal",
      transactionId: "TXN-001234568",
    },
    {
      id: 3,
      product: "HWID Spoofer",
      date: "2023-11-20",
      amount: "199₺",
      status: "completed",
      paymentMethod: "Bitcoin",
      transactionId: "TXN-001234569",
    },
    {
      id: 4,
      product: "Premium Bundle",
      date: "2023-10-05",
      amount: "799₺",
      status: "refunded",
      paymentMethod: "Kredi Kartı",
      transactionId: "TXN-001234570",
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

  const totalSpent = paymentHistory
    .filter((payment) => payment.status === "completed")
    .reduce((total, payment) => total + Number.parseInt(payment.amount.replace("₺", "")), 0)

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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
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
                <h1 className="text-2xl font-bold heading-premium">Ödeme Geçmişi</h1>
                <p className="text-white/60">Tüm ödemelerinizi görüntüleyin</p>
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
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Toplam Harcama</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{totalSpent.toLocaleString()}₺</div>
                  <p className="text-xs text-white/60">Tüm zamanlar</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Toplam Sipariş</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold heading-premium">{paymentHistory.length}</div>
                  <p className="text-xs text-white/60">Başarılı ödemeler</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Son Ödeme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold heading-premium">{paymentHistory[0]?.date}</div>
                  <p className="text-xs text-white/60">{paymentHistory[0]?.product}</p>
                </CardContent>
              </Card>
            </div>

            {/* Payment History Table */}
            <Card className="glass-card border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="heading-premium">Ödeme Geçmişi</CardTitle>
                <Link href="/products">
                  <Button className="btn-premium">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Satın Alma
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 font-medium text-white/60">Ürün</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Tarih</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Tutar</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Ödeme Yöntemi</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Durum</th>
                        <th className="text-right py-3 px-4 font-medium text-white/60">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4 text-white/90">{payment.product}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-white/60" />
                              <span className="text-white/80">{payment.date}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-white/90 font-medium">{payment.amount}</td>
                          <td className="py-3 px-4 text-white/80">{payment.paymentMethod}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                payment.status === "completed"
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : payment.status === "refunded"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {payment.status === "completed" && "Tamamlandı"}
                              {payment.status === "refunded" && "İade Edildi"}
                              {payment.status === "failed" && "Başarısız"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="glass-card border-white/10">
                                <DropdownMenuItem className="hover:bg-white/5">
                                  <Download className="h-4 w-4 mr-2" />
                                  Fatura İndir
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5">İşlem Detayları</DropdownMenuItem>
                                {payment.status === "completed" && (
                                  <DropdownMenuItem className="hover:bg-white/5">Tekrar Satın Al</DropdownMenuItem>
                                )}
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
          </div>
        </div>
      </div>
    </div>
  )
}
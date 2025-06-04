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
  MoreHorizontal,
  Edit,
  Ban,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { logout } from "@/lib/auth"

export default function AdminUsersPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const [users] = useState([
    {
      id: 1,
      username: "user123",
      email: "user@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-10-15",
      lastLogin: "2023-12-20",
    },
    {
      id: 2,
      username: "gamer456",
      email: "gamer@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-11-02",
      lastLogin: "2023-12-19",
    },
    {
      id: 3,
      username: "pro789",
      email: "pro@example.com",
      role: "user",
      status: "banned",
      joinDate: "2023-09-20",
      lastLogin: "2023-12-10",
    },
    {
      id: 4,
      username: "admin",
      email: "admin@valorantpro.com",
      role: "admin",
      status: "active",
      joinDate: "2023-01-01",
      lastLogin: "2023-12-20",
    },
    {
      id: 5,
      username: "vipuser",
      email: "vip@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-08-15",
      lastLogin: "2023-12-20",
    },
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

  const filteredUsers = users.filter(
    (userItem) =>
      userItem.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userItem.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
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
                <h1 className="text-2xl font-bold heading-premium">Kullanıcı Yönetimi</h1>
                <p className="text-white/60">Tüm kullanıcıları yönetin</p>
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
            <Card className="glass-card border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="heading-premium">Kullanıcı Listesi</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                    <Input
                      placeholder="Kullanıcı ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="glass pl-10 h-10 w-64"
                    />
                  </div>
                  <Button className="btn-premium">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Kullanıcı
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 font-medium text-white/60">Kullanıcı</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Rol</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Durum</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Katılım</th>
                        <th className="text-left py-3 px-4 font-medium text-white/60">Son Giriş</th>
                        <th className="text-right py-3 px-4 font-medium text-white/60">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((userItem) => (
                        <tr key={userItem.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
                                <span className="text-black text-sm font-bold">
                                  {userItem.username[0].toUpperCase()}
                                </span>
                              </div>
                              <span className="text-white/90 font-medium">{userItem.username}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-white/80">{userItem.email}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                userItem.role === "admin"
                                  ? "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/30"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              }
                            >
                              {userItem.role === "admin" ? "Admin" : "Kullanıcı"}
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
                          <td className="py-3 px-4 text-white/80">{userItem.joinDate}</td>
                          <td className="py-3 px-4 text-white/80">{userItem.lastLogin}</td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="glass-card border-white/10">
                                <DropdownMenuItem className="hover:bg-white/5">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  HWID Sıfırla
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 text-red-400">
                                  <Ban className="h-4 w-4 mr-2" />
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
          </div>
        </div>
      </div>
    </div>
  )
}

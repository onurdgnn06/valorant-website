"use client"

import { useState } from "react"
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
  Clock,
  Calendar,
  MoreHorizontal,
  Download,
  Play,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { logout } from "@/lib/auth"

// useSidebar hook'u ekle
import { usePathname } from "next/navigation"

interface UserDashboardProps {
  user: any
  children: React.ReactNode
}

export default function UserDashboard({ user, children }: UserDashboardProps) {
  const [activeProducts] = useState([
    {
      id: 1,
      name: "ESP Paketi",
      key: "ESP-XXXX-XXXX-XXXX",
      expiresAt: "2024-01-31",
      hwid: "HWID-XXXX-XXXX-XXXX",
      status: "active",
    },
    {
      id: 2,
      name: "AimBot Pro",
      key: "AIM-XXXX-XXXX-XXXX",
      expiresAt: "2024-01-31",
      hwid: "HWID-XXXX-XXXX-XXXX",
      status: "active",
    },
  ])

  const [purchaseHistory] = useState([
    {
      id: 1,
      product: "ESP Paketi",
      date: "2023-12-15",
      amount: "299₺",
      status: "completed",
    },
    {
      id: 2,
      product: "AimBot Pro",
      date: "2023-12-15",
      amount: "399₺",
      status: "completed",
    },
    {
      id: 3,
      product: "HWID Spoofer",
      date: "2023-11-20",
      amount: "199₺",
      status: "completed",
    },
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
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
                <span className="text-black font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold heading-premium">ValorantPro</span>
            </div>
          </div>

          {/* Sidebar navigation'ı güncelle */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/dashboard"
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
                  href="/dashboard/products"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/dashboard/products"
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Ürünlerim</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/payments"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/dashboard/payments"
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Ödemeler</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === "/dashboard/settings"
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
                <h1 className="text-2xl font-bold heading-premium">Hoş Geldin, {user.username}!</h1>
                <p className="text-white/60">Kullanıcı Paneli</p>
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
          {children}
        </div>
      </div>
    </div>
  )
}

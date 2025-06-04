"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, logout, type User } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import MobileNav from "@/components/mobile-nav" // MobileNav import'u ekle
import { Button } from "@/components/ui/button"
import { Bell, LogOut, Settings, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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

  const handleLogout = async () => {
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
    <>
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
            <MobileNav isAdmin={true} />
          </div>
        </div>
      </header>
      <AdminDashboard user={user} />
    </>
  )
}

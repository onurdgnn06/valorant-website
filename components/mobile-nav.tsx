"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Package, CreditCard, BarChart3, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout } from "@/lib/auth"
import { useEffect } from "react"
import Logo from "@/components/logo"

interface MobileNavProps {
  isAdmin?: boolean
}

export default function MobileNav({ isAdmin = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  const userNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/products", label: "Ürünlerim", icon: Package },
    { href: "/dashboard/payments", label: "Ödemeler", icon: CreditCard },
    { href: "/dashboard/settings", label: "Ayarlar", icon: Settings },
  ]

  const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/users", label: "Kullanıcılar", icon: Users },
    { href: "/admin/products", label: "Ürünler", icon: Package },
    { href: "/admin/analytics", label: "Analitik", icon: BarChart3 },
    { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-white/10">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Logo size="sm" />
                  <span className="text-lg font-bold heading-premium">{isAdmin ? "Admin Panel" : "ValorantPro"}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {user && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
                    <span className="text-black text-sm font-bold">{user.username[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">{user.username}</p>
                    <p className="text-white/60 text-xs">{user.role === "admin" ? "Admin" : "Kullanıcı"}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                  onClick={async () => {
                    setIsOpen(false)
                    await logout() // Call the actual logout function
                  }}
                >
                  Çıkış Yap
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

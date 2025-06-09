"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Package,
  BarChart3,
  Settings,
  LogOut,
  UserIcon,
  Bell,
  Save,
  Shield,
  Mail,
  Globe,
  Database,
  RotateCcw,
  CheckCircle,
} from "lucide-react"
import ThemeSelector from "@/components/theme-selector" // Declare the ThemeSelector component
import BackupManager from "@/components/backup-manager"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logout } from "@/lib/auth"
import { saveSettings, getSettings, resetSettings, type SiteSettings } from "@/lib/settings-manager"
import { initializeTheme } from "@/lib/theme-manager"

export default function AdminSettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<SiteSettings>(() => getSettings())
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/login")
      } else if (currentUser.role !== "admin") {
        router.push("/dashboard")
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    }
    checkAuth()
    initializeTheme()
  }, [router])

  async function handleLogout() {
    await logout()
  }

  const handleSaveSettings = (section: keyof SiteSettings, data: any) => {
    const updatedSettings = {
      ...settings,
      [section]: { ...settings[section], ...data },
    }
    setSettings(updatedSettings)
    const result = saveSettings(updatedSettings)
    setSaveStatus({ type: "success", message: result.message })
    setTimeout(() => setSaveStatus({ type: null, message: "" }), 3000)
  }

  const handleResetSettings = () => {
    const result = resetSettings()
    setSettings(getSettings())
    setSaveStatus({ type: "success", message: result.message })
    setTimeout(() => setSaveStatus({ type: null, message: "" }), 3000)
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
        {/* Sidebar - pathname bazlı aktif sayfa gösterimi ekle */}
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
                <h1 className="text-2xl font-bold heading-premium">Sistem Ayarları</h1>
                <p className="text-white/60">Platform ayarlarını yönetin</p>
              </div>
              <div className="flex items-center gap-4">
                {saveStatus.type && (
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                      saveStatus.type === "success" ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">{saveStatus.message}</span>
                  </div>
                )}
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
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="glass-card border border-white/10">
                <TabsTrigger value="general">Genel</TabsTrigger>
                <TabsTrigger value="theme">Tema</TabsTrigger>
                <TabsTrigger value="security">Güvenlik</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="system">Sistem</TabsTrigger>
                <TabsTrigger value="backup">Yedekleme</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Genel Ayarlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        handleSaveSettings("general", {
                          siteName: formData.get("siteName"),
                          siteUrl: formData.get("siteUrl"),
                          siteDescription: formData.get("siteDescription"),
                          supportEmail: formData.get("supportEmail"),
                          discordLink: formData.get("discordLink"),
                        })
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="siteName" className="text-white/90">
                            Site Adı
                          </Label>
                          <Input
                            id="siteName"
                            name="siteName"
                            defaultValue={settings.general.siteName}
                            className="glass h-12 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="siteUrl" className="text-white/90">
                            Site URL
                          </Label>
                          <Input
                            id="siteUrl"
                            name="siteUrl"
                            defaultValue={settings.general.siteUrl}
                            className="glass h-12 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="siteDescription" className="text-white/90">
                          Site Açıklaması
                        </Label>
                        <textarea
                          id="siteDescription"
                          name="siteDescription"
                          rows={3}
                          defaultValue={settings.general.siteDescription}
                          className="w-full rounded-xl glass p-4 text-white resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="supportEmail" className="text-white/90">
                            Destek Email
                          </Label>
                          <Input
                            id="supportEmail"
                            name="supportEmail"
                            defaultValue={settings.general.supportEmail}
                            className="glass h-12 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discordLink" className="text-white/90">
                            Discord Linki
                          </Label>
                          <Input
                            id="discordLink"
                            name="discordLink"
                            defaultValue={settings.general.discordLink}
                            className="glass h-12 text-white"
                          />
                        </div>
                      </div>

                      <Button type="submit" className="btn-premium">
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="theme">
                <ThemeSelector
                  onSave={(theme) => {
                    setSaveStatus({ type: "success", message: "Tema başarıyla uygulandı!" })
                    setTimeout(() => setSaveStatus({ type: null, message: "" }), 3000)
                  }}
                />
              </TabsContent>

              {/* Diğer tab'ları da aynı şekilde güncelle... */}
              <TabsContent value="security">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Güvenlik Ayarları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        handleSaveSettings("security", {
                          maxLoginAttempts: Number.parseInt(formData.get("maxLoginAttempts") as string),
                          sessionTimeout: Number.parseInt(formData.get("sessionTimeout") as string),
                          hwidResetLimit: Number.parseInt(formData.get("hwidResetLimit") as string),
                          banDuration: Number.parseInt(formData.get("banDuration") as string),
                        })
                      }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="maxLoginAttempts" className="text-white/90">
                          Maksimum Giriş Denemesi
                        </Label>
                        <Input
                          id="maxLoginAttempts"
                          name="maxLoginAttempts"
                          type="number"
                          defaultValue={settings.security.maxLoginAttempts}
                          className="glass h-12 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout" className="text-white/90">
                          Oturum Zaman Aşımı (dakika)
                        </Label>
                        <Input
                          id="sessionTimeout"
                          name="sessionTimeout"
                          type="number"
                          defaultValue={settings.security.sessionTimeout}
                          className="glass h-12 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hwidResetLimit" className="text-white/90">
                          HWID Sıfırlama Limiti (günlük)
                        </Label>
                        <Input
                          id="hwidResetLimit"
                          name="hwidResetLimit"
                          type="number"
                          defaultValue={settings.security.hwidResetLimit}
                          className="glass h-12 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="banDuration" className="text-white/90">
                          Varsayılan Ban Süresi (gün)
                        </Label>
                        <Input
                          id="banDuration"
                          name="banDuration"
                          type="number"
                          defaultValue={settings.security.banDuration}
                          className="glass h-12 text-white"
                        />
                      </div>

                      <Button type="submit" className="btn-premium">
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Ayarları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        handleSaveSettings("email", {
                          smtpHost: formData.get("smtpHost"),
                          smtpPort: Number.parseInt(formData.get("smtpPort") as string),
                          smtpUsername: formData.get("smtpUsername"),
                          smtpPassword: formData.get("smtpPassword"),
                          fromEmail: formData.get("fromEmail"),
                        })
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="smtpHost" className="text-white/90">
                            SMTP Host
                          </Label>
                          <Input
                            id="smtpHost"
                            name="smtpHost"
                            defaultValue={settings.email.smtpHost}
                            className="glass h-12 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort" className="text-white/90">
                            SMTP Port
                          </Label>
                          <Input
                            id="smtpPort"
                            name="smtpPort"
                            type="number"
                            defaultValue={settings.email.smtpPort}
                            className="glass h-12 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="smtpUsername" className="text-white/90">
                            SMTP Kullanıcı Adı
                          </Label>
                          <Input
                            id="smtpUsername"
                            name="smtpUsername"
                            defaultValue={settings.email.smtpUsername}
                            className="glass h-12 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPassword" className="text-white/90">
                            SMTP Şifre
                          </Label>
                          <Input
                            id="smtpPassword"
                            name="smtpPassword"
                            type="password"
                            placeholder="••••••••"
                            className="glass h-12 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fromEmail" className="text-white/90">
                          Gönderen Email
                        </Label>
                        <Input
                          id="fromEmail"
                          name="fromEmail"
                          defaultValue={settings.email.fromEmail}
                          className="glass h-12 text-white"
                        />
                      </div>

                      <Button type="submit" className="btn-premium">
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="heading-premium flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Sistem Ayarları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        handleSaveSettings("system", {
                          maintenanceMode: formData.get("maintenanceMode") === "true",
                          registrationEnabled: formData.get("registrationEnabled") === "true",
                          maintenanceMessage: formData.get("maintenanceMessage"),
                          maxFileSize: Number.parseInt(formData.get("maxFileSize") as string),
                          backupFrequency: Number.parseInt(formData.get("backupFrequency") as string),
                        })
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="maintenanceMode" className="text-white/90">
                            Bakım Modu
                          </Label>
                          <select
                            name="maintenanceMode"
                            defaultValue={settings.system.maintenanceMode.toString()}
                            className="w-full rounded-xl glass p-4 text-white bg-transparent border border-white/10 h-12"
                          >
                            <option value="false" className="bg-[#121212]">
                              Kapalı
                            </option>
                            <option value="true" className="bg-[#121212]">
                              Açık
                            </option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registrationEnabled" className="text-white/90">
                            Kayıt Olma
                          </Label>
                          <select
                            name="registrationEnabled"
                            defaultValue={settings.system.registrationEnabled.toString()}
                            className="w-full rounded-xl glass p-4 text-white bg-transparent border border-white/10 h-12"
                          >
                            <option value="true" className="bg-[#121212]">
                              Açık
                            </option>
                            <option value="false" className="bg-[#121212]">
                              Kapalı
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maintenanceMessage" className="text-white/90">
                          Bakım Mesajı
                        </Label>
                        <textarea
                          id="maintenanceMessage"
                          name="maintenanceMessage"
                          rows={3}
                          defaultValue={settings.system.maintenanceMessage}
                          className="w-full rounded-xl glass p-4 text-white resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="maxFileSize" className="text-white/90">
                            Maksimum Dosya Boyutu (MB)
                          </Label>
                          <Input
                            id="maxFileSize"
                            name="maxFileSize"
                            type="number"
                            defaultValue={settings.system.maxFileSize}
                            className="glass h-12 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="backupFrequency" className="text-white/90">
                            Yedekleme Sıklığı (saat)
                          </Label>
                          <Input
                            id="backupFrequency"
                            name="backupFrequency"
                            type="number"
                            defaultValue={settings.system.backupFrequency}
                            className="glass h-12 text-white"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button type="submit" className="btn-premium">
                          <Save className="h-4 w-4 mr-2" />
                          Kaydet
                        </Button>
                        <Button
                          type="button"
                          onClick={handleResetSettings}
                          variant="outline"
                          className="btn-outline-premium"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Sıfırla
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="backup">
                <BackupManager
                  onSave={(status) => {
                    setSaveStatus({ type: status.success ? "success" : "error", message: status.message })
                    setTimeout(() => setSaveStatus({ type: null, message: "" }), 3000)
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
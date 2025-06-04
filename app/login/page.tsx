"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { login } from "@/lib/auth"
import Logo from "@/components/logo"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Form validation ekle
  const [errors, setErrors] = useState<Record<string, string>>({})

  // handleSubmit fonksiyonunu güncelle
  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    setErrors({})

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Client-side validation
    const newErrors: Record<string, string> = {}
    if (!email.trim()) newErrors.email = "Email gerekli"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Geçerli bir email girin"
    if (!password.trim()) newErrors.password = "Şifre gerekli"
    else if (password.length < 6) newErrors.password = "Şifre en az 6 karakter olmalıdır"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    const result = await login(email, password)

    if (result.success) {
      if (result.user?.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } else {
      setError(result.error || "Giriş başarısız")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      <div className="container mx-auto py-6 px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="max-w-md w-full">
            <div className="flex items-center justify-center mb-8">
              <Logo size="lg" />
              <span className="text-3xl font-bold heading-premium ml-3">ValorantPro</span>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h1 className="text-3xl font-bold heading-premium mb-6 text-center">Giriş Yap</h1>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    E-posta
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    required
                    className={`glass h-12 text-white placeholder:text-white/50 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-white/90">
                      Şifre
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-[hsl(var(--primary))] hover:underline">
                      Şifremi Unuttum
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className={`glass h-12 text-white placeholder:text-white/50 pr-12 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-white/70">
                    Beni hatırla
                  </Label>
                </div>

                <Button type="submit" disabled={loading} className="btn-premium w-full h-12 text-lg">
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-white/60">
                Hesabınız yok mu?{" "}
                <Link href="/register" className="text-[hsl(var(--primary))] hover:underline font-medium">
                  Kayıt Ol
                </Link>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <p className="text-xs text-white/60 mb-2">Demo hesapları:</p>
                <p className="text-xs text-white/70">Admin: admin@valorantpro.com / password123</p>
                <p className="text-xs text-white/70">User: user@example.com / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

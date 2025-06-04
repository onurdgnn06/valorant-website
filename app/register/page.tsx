"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { register } from "@/lib/auth"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    const confirmPassword = formData.get("confirmPassword") as string
    const username = formData.get("username") as string
    const terms = formData.get("terms")

    // Client-side validation
    const newErrors: Record<string, string> = {}
    if (!username.trim()) newErrors.username = "Kullanıcı adı gerekli"
    else if (username.length < 3) newErrors.username = "Kullanıcı adı en az 3 karakter olmalıdır"
    if (!email.trim()) newErrors.email = "Email gerekli"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Geçerli bir email girin"
    if (!password.trim()) newErrors.password = "Şifre gerekli"
    else if (password.length < 6) newErrors.password = "Şifre en az 6 karakter olmalıdır"
    if (!confirmPassword.trim()) newErrors.confirmPassword = "Şifre tekrarı gerekli"
    else if (password !== confirmPassword) newErrors.confirmPassword = "Şifreler eşleşmiyor"
    if (!terms) newErrors.terms = "Kullanım şartlarını kabul etmelisiniz"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    const result = await register(email, password, username)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Kayıt başarısız")
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
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] flex items-center justify-center">
                <span className="text-black font-bold text-xl">V</span>
              </div>
              <span className="text-3xl font-bold heading-premium ml-3">ValorantPro</span>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h1 className="text-3xl font-bold heading-premium mb-6 text-center">Kayıt Ol</h1>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/90">
                    Kullanıcı Adı
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="kullaniciadi"
                    required
                    className={`glass h-12 text-white placeholder:text-white/50 ${
                      errors.username ? "border-red-500" : ""
                    }`}
                  />
                  {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                </div>

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
                  <Label htmlFor="password" className="text-white/90">
                    Şifre
                  </Label>
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/90">
                    Şifre Tekrar
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className={`glass h-12 text-white placeholder:text-white/50 pr-12 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" name="terms" />
                  <Label htmlFor="terms" className="text-sm text-white/70">
                    <span>Kullanım şartlarını ve gizlilik politikasını </span>
                    <Link href="/terms" className="text-[hsl(var(--primary))] hover:underline">
                      kabul ediyorum
                    </Link>
                  </Label>
                  {errors.terms && <p className="text-red-400 text-sm mt-1">{errors.terms}</p>}
                </div>

                <div className="glass rounded-lg p-4 flex items-center justify-center">
                  <div className="text-sm text-white/60">reCAPTCHA Doğrulama (Demo)</div>
                </div>

                <Button type="submit" disabled={loading} className="btn-premium w-full h-12 text-lg">
                  {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-white/60">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-[hsl(var(--primary))] hover:underline font-medium">
                  Giriş Yap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

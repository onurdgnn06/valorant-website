"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Palette, RotateCcw, Check } from "lucide-react"
import { defaultThemes, applyTheme, getCurrentTheme, hexToHsl, type ThemeColors } from "@/lib/theme-manager"

interface ThemeSelectorProps {
  onSave?: (theme: ThemeColors) => void
}

export default function ThemeSelector({ onSave }: ThemeSelectorProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(getCurrentTheme())
  const [customColor, setCustomColor] = useState("#8000ff") // Changed default custom color to purple
  const [selectedTheme, setSelectedTheme] = useState<string>("valorant")

  useEffect(() => {
    // Component mount olduğunda mevcut temayı uygula
    const theme = getCurrentTheme()
    setCurrentTheme(theme)

    // Kısa bir delay ile temayı uygula
    setTimeout(() => {
      applyTheme(theme)
    }, 100)
  }, [])

  const handlePresetTheme = (themeName: keyof typeof defaultThemes) => {
    const theme = defaultThemes[themeName]
    setCurrentTheme(theme)
    setSelectedTheme(themeName)

    // Anında uygula
    applyTheme(theme)
    onSave?.(theme)

    console.log(`Applied theme: ${themeName}`, theme)
  }

  const handleCustomColor = () => {
    const hslString = hexToHsl(customColor)

    // Özel tema oluştur
    const customTheme: ThemeColors = {
      ...currentTheme,
      primary: hslString,
      ring: hslString,
    }

    setCurrentTheme(customTheme)
    setSelectedTheme("custom")

    // Anında uygula
    applyTheme(customTheme)
    onSave?.(customTheme)

    console.log("Applied custom color:", customColor, "HSL:", hslString)
  }

  const resetToDefault = () => {
    const defaultTheme = defaultThemes.valorant
    setCurrentTheme(defaultTheme)
    setSelectedTheme("valorant")

    // Anında uygula
    applyTheme(defaultTheme)
    onSave?.(defaultTheme)
  }

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="heading-premium flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Tema Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hazır Temalar */}
        <div className="space-y-3">
          <Label className="text-white/90">Hazır Temalar</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(defaultThemes).map(([name, theme]) => (
              <Button
                key={name}
                onClick={() => handlePresetTheme(name as keyof typeof defaultThemes)}
                className={`h-12 flex items-center gap-2 glass hover:glass-card relative ${
                  selectedTheme === name ? "ring-2 ring-primary" : ""
                }`}
                style={{
                  background: `hsl(${theme.primary})`,
                  color: `hsl(${theme.primaryForeground})`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ background: `hsl(${theme.primary})` }}
                />
                {name.charAt(0).toUpperCase() + name.slice(1)}
                {selectedTheme === name && <Check className="h-4 w-4 absolute top-1 right-1" />}
              </Button>
            ))}
          </div>
        </div>

        {/* Özel Renk */}
        <div className="space-y-3">
          <Label className="text-white/90">Özel Renk</Label>
          <div className="flex gap-3">
            <Input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-20 h-12 p-1 glass cursor-pointer"
            />
            <Button onClick={handleCustomColor} className="btn-outline-premium flex-1">
              Özel Rengi Uygula
            </Button>
          </div>
        </div>

        {/* Mevcut Tema Önizleme */}
        <div className="space-y-3">
          <Label className="text-white/90">Mevcut Tema Önizleme</Label>
          <div className="p-4 rounded-xl glass-card border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-lg border border-white/20"
                style={{ background: `hsl(${currentTheme.primary})` }}
              />
              <span className="text-white/90">Ana Renk: {currentTheme.primary}</span>
            </div>

            {/* Örnek Butonlar */}
            <div className="flex gap-2 mb-3">
              <Button size="sm" className="btn-premium">
                Primary Button
              </Button>
              <Button size="sm" variant="outline" className="btn-outline-premium">
                Outline Button
              </Button>
            </div>
          </div>
        </div>

        {/* Kontrol Butonları */}
        <div className="flex gap-3">
          <Button onClick={resetToDefault} variant="outline" className="btn-outline-premium">
            <RotateCcw className="h-4 w-4 mr-2" />
            Varsayılana Dön
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

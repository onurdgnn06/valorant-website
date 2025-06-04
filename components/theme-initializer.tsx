"use client"

import { useEffect } from "react"
import { initializeTheme } from "@/lib/theme-manager"

export function ThemeInitializer() {
  useEffect(() => {
    // Sayfa yüklendiğinde temayı başlat
    const timer = setTimeout(() => {
      initializeTheme()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}

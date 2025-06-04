export interface ThemeColors {
  primary: string
  primaryForeground: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  destructive: string
  destructiveForeground: string
  ring: string
}

export const defaultThemes = {
  valorant: {
    primary: "270 100% 50%", // #8000ff (Changed from green to purple)
    primaryForeground: "0 0% 0%",
    secondary: "0 0% 8%",
    accent: "0 0% 12%",
    background: "0 0% 3%",
    foreground: "0 0% 98%",
    muted: "0 0% 12%",
    border: "0 0% 15%",
    card: "0 0% 5%",
    cardForeground: "0 0% 98%",
    popover: "0 0% 8%",
    popoverForeground: "0 0% 98%",
    destructive: "0 100% 50%",
    destructiveForeground: "0 0% 98%",
    ring: "270 100% 50%", // (Changed from green to purple)
  },
  ocean: {
    primary: "200 100% 50%", // #0099ff - Mavi
    primaryForeground: "0 0% 0%",
    secondary: "200 20% 8%",
    accent: "200 30% 12%",
    background: "200 10% 3%",
    foreground: "200 5% 98%",
    muted: "200 20% 12%",
    border: "200 30% 15%",
    card: "200 15% 5%",
    cardForeground: "200 5% 98%",
    popover: "200 20% 8%",
    popoverForeground: "200 5% 98%",
    destructive: "0 100% 50%",
    destructiveForeground: "0 0% 98%",
    ring: "200 100% 50%",
  },
  cyberpunk: {
    primary: "300 100% 50%", // #ff00ff
    primaryForeground: "0 0% 0%",
    secondary: "300 20% 8%",
    accent: "300 30% 12%",
    background: "300 10% 3%",
    foreground: "300 5% 98%",
    muted: "300 20% 12%",
    border: "300 30% 15%",
    card: "300 15% 5%",
    cardForeground: "300 5% 98%",
    popover: "300 20% 8%",
    popoverForeground: "300 5% 98%",
    destructive: "0 100% 50%",
    destructiveForeground: "0 0% 98%",
    ring: "300 100% 50%",
  },
  fire: {
    primary: "15 100% 50%", // #ff4400
    primaryForeground: "0 0% 0%",
    secondary: "15 20% 8%",
    accent: "15 30% 12%",
    background: "15 10% 3%",
    foreground: "15 5% 98%",
    muted: "15 20% 12%",
    border: "15 30% 15%",
    card: "15 15% 5%",
    cardForeground: "15 5% 98%",
    popover: "15 20% 8%",
    popoverForeground: "15 5% 98%",
    destructive: "0 100% 50%",
    destructiveForeground: "0 0% 98%",
    ring: "15 100% 50%",
  },
  neon: {
    primary: "60 100% 50%", // #ffff00
    primaryForeground: "0 0% 0%",
    secondary: "60 20% 8%",
    accent: "60 30% 12%",
    background: "60 10% 3%",
    foreground: "60 5% 98%",
    muted: "60 20% 12%",
    border: "60 30% 15%",
    card: "60 15% 5%",
    cardForeground: "60 5% 98%",
    popover: "60 20% 8%",
    popoverForeground: "60 5% 98%",
    destructive: "0 100% 50%",
    destructiveForeground: "0 0% 98%",
    ring: "60 100% 50%",
  },
  purple: {
    primary: "270 100% 50%", // #8000ff
    primaryForeground: "0 0% 0%",
    secondary: "270 20% 8%",
    accent: "270 30% 12%",
    background: "270 10% 3%",
    foreground: "270 5% 98%",
    muted: "270 20% 12%",
    border: "270 30% 15%",
    card: "270 15% 5%",
    cardForeground: "270 5% 98%",
    popover: "270 20% 8%",
    popoverForeground: "270 5% 98%",
    destructive: "0 100% 50%",
    destructiveForeground: "0 0% 98%",
    ring: "270 100% 50%",
  },
}

export function applyTheme(theme: ThemeColors) {
  if (typeof window === "undefined") return

  const root = document.documentElement

  // Tüm CSS değişkenlerini güncelle
  Object.entries(theme).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
    root.style.setProperty(cssVar, value)
  })

  // LocalStorage'a kaydet
  localStorage.setItem("site-theme", JSON.stringify(theme))

  // Tema değişikliğini uygula
  updateThemeStyles(theme)
}

function updateThemeStyles(theme: ThemeColors) {
  if (typeof window === "undefined") return

  // Primary renk değerlerini al
  const primaryHsl = theme.primary
  const [h, s, l] = primaryHsl.split(" ")
  const hue = h
  const saturation = s.replace("%", "")
  const lightness = l.replace("%", "")

  // Renk değerlerini hesapla
  const primaryColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  const primaryDark = `hsl(${hue}, ${saturation}%, ${Math.max(0, Number(lightness) - 10)}%)`
  const primaryLight = `hsl(${hue}, ${saturation}%, ${Math.min(100, Number(lightness) + 10)}%)`

  // CSS değişkenlerini güncelle
  document.documentElement.style.setProperty("--theme-primary", primaryColor)
  document.documentElement.style.setProperty("--theme-primary-dark", primaryDark)
  document.documentElement.style.setProperty("--theme-primary-light", primaryLight)

  // Dinamik stil güncellemeleri
  updateDynamicStyles(primaryColor, primaryDark, primaryLight)
}

function updateDynamicStyles(primary: string, primaryDark: string, primaryLight: string) {
  // Floating orbs güncelle
  document.body.style.setProperty(
    "background-image",
    `radial-gradient(circle at 50% 0%, ${primary}0a 0%, transparent 50%), 
     radial-gradient(circle at 0% 50%, ${primary}08 0%, transparent 50%), 
     radial-gradient(circle at 100% 50%, ${primary}08 0%, transparent 50%), 
     linear-gradient(180deg, #080808 0%, #0a0a0a 50%, #080808 100%)`,
  )

  // After pseudo-element güncelle
  const afterStyle = `
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    background-image: radial-gradient(circle at 20% 20%, ${primary}19 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, ${primary}14 0%, transparent 25%),
      radial-gradient(circle at 60% 40%, ${primary}0f 0%, transparent 25%);
    animation: float 30s ease-in-out infinite;
  `

  // Stil elementini oluştur veya güncelle
  let styleElement = document.getElementById("dynamic-theme-styles") as HTMLStyleElement
  if (!styleElement) {
    styleElement = document.createElement("style")
    styleElement.id = "dynamic-theme-styles"
    document.head.appendChild(styleElement)
  }

  // Stil içeriğini güncelle
  styleElement.textContent = `
    body::after {
      ${afterStyle}
    }
    
    .btn-premium {
      background: linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%) !important;
      box-shadow: 0 10px 30px ${primary}4d, inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    }
    
    .btn-premium:hover {
      background: linear-gradient(135deg, ${primaryDark} 0%, ${primaryDark} 100%) !important;
      box-shadow: 0 15px 40px ${primary}66, inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
    }
    
    .btn-outline-premium {
      border-color: ${primary}4d !important;
      color: ${primary} !important;
    }
    
    .btn-outline-premium:hover {
      background: ${primary}1a !important;
      border-color: ${primary}80 !important;
      box-shadow: 0 10px 30px ${primary}33 !important;
    }
    
    .glass-card:hover {
      background: linear-gradient(135deg, ${primary}14 0%, rgba(255, 255, 255, 0.03) 100%) !important;
      border-color: ${primary}33 !important;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px ${primary}1a, inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, ${primary}, ${primaryDark}) !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, ${primaryDark}, ${primaryDark}) !important;
    }
  `
}

export function getCurrentTheme(): ThemeColors {
  if (typeof window === "undefined") return defaultThemes.valorant

  const saved = localStorage.getItem("site-theme")
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return defaultThemes.valorant
    }
  }
  return defaultThemes.valorant
}

export function initializeTheme() {
  if (typeof window === "undefined") return

  const theme = getCurrentTheme()
  applyTheme(theme)
}

// Hex to HSL converter
export function hexToHsl(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

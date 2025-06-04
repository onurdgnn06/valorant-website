export interface SiteSettings {
  general: {
    siteName: string
    siteUrl: string
    siteDescription: string
    supportEmail: string
    discordLink: string
  }
  security: {
    maxLoginAttempts: number
    sessionTimeout: number
    hwidResetLimit: number
    banDuration: number
  }
  email: {
    smtpHost: string
    smtpPort: number
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
  }
  system: {
    maintenanceMode: boolean
    registrationEnabled: boolean
    maintenanceMessage: string
    maxFileSize: number
    backupFrequency: number
  }
}

export const defaultSettings: SiteSettings = {
  general: {
    siteName: "ValorantPro",
    siteUrl: "https://valorantpro.com",
    siteDescription: "Valorant oyununda rekabet avantajı sağlayan premium çözümler.",
    supportEmail: "support@valorantpro.com",
    discordLink: "https://discord.gg/valorantpro",
  },
  security: {
    maxLoginAttempts: 5,
    sessionTimeout: 60,
    hwidResetLimit: 1,
    banDuration: 30,
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "noreply@valorantpro.com",
    smtpPassword: "",
    fromEmail: "noreply@valorantpro.com",
  },
  system: {
    maintenanceMode: false,
    registrationEnabled: true,
    maintenanceMessage: "Sistem bakımda. Lütfen daha sonra tekrar deneyin.",
    maxFileSize: 10,
    backupFrequency: 24,
  },
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem("site-settings", JSON.stringify(settings))
  return { success: true, message: "Ayarlar başarıyla kaydedildi!" }
}

export function getSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSettings

  const saved = localStorage.getItem("site-settings")
  if (saved) {
    try {
      return { ...defaultSettings, ...JSON.parse(saved) }
    } catch {
      return defaultSettings
    }
  }
  return defaultSettings
}

export function resetSettings() {
  localStorage.removeItem("site-settings")
  return { success: true, message: "Ayarlar sıfırlandı!" }
}

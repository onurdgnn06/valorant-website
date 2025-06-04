export interface BackupConfig {
  enabled: boolean
  frequency: number // hours
  maxBackups: number
  includeUserData: boolean
  includeSettings: boolean
  includeProducts: boolean
  compressionEnabled: boolean
}

export interface BackupFile {
  id: string
  filename: string
  size: number
  createdAt: string
  type: "manual" | "automatic"
  status: "completed" | "failed" | "in-progress"
  tables: string[]
  compressed: boolean
}

export interface BackupData {
  metadata: {
    version: string
    createdAt: string
    type: "manual" | "automatic"
    tables: string[]
  }
  users: any[]
  settings: any
  products: any[]
  analytics: any[]
}

const defaultConfig: BackupConfig = {
  enabled: true,
  frequency: 24,
  maxBackups: 7,
  includeUserData: true,
  includeSettings: true,
  includeProducts: true,
  compressionEnabled: true,
}

// Simulated database data
const mockDatabase = {
  users: [
    { id: "1", email: "admin@valorantpro.com", role: "admin", username: "admin", createdAt: "2023-01-01" },
    { id: "2", email: "user@example.com", role: "user", username: "testuser", createdAt: "2023-06-01" },
  ],
  products: [
    { id: "1", name: "Valorant Aimbot", price: 29.99, category: "aim", status: "active" },
    { id: "2", name: "ESP Wallhack", price: 19.99, category: "vision", status: "active" },
  ],
  analytics: [
    { date: "2024-01-01", users: 150, sales: 2500, revenue: 15000 },
    { date: "2024-01-02", users: 165, sales: 2800, revenue: 18000 },
  ],
}

export function getBackupConfig(): BackupConfig {
  if (typeof window === "undefined") return defaultConfig

  const saved = localStorage.getItem("backup-config")
  if (saved) {
    try {
      return { ...defaultConfig, ...JSON.parse(saved) }
    } catch {
      return defaultConfig
    }
  }
  return defaultConfig
}

export function saveBackupConfig(config: BackupConfig): { success: boolean; message: string } {
  try {
    localStorage.setItem("backup-config", JSON.stringify(config))

    // Schedule next backup if enabled
    if (config.enabled) {
      scheduleNextBackup(config.frequency)
    }

    return { success: true, message: "Yedekleme ayarları kaydedildi!" }
  } catch (error) {
    return { success: false, message: "Ayarlar kaydedilemedi!" }
  }
}

export function getBackupHistory(): BackupFile[] {
  if (typeof window === "undefined") return []

  const saved = localStorage.getItem("backup-history")
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  }
  return []
}

// listBackups olarak adlandırıldı ve export edildi
export function listBackups(): BackupFile[] {
  if (typeof window === "undefined") return []

  const saved = localStorage.getItem("backup-history")
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  }
  return []
}

// BackupStatus interface'i eklendi ve export edildi
export interface BackupStatus {
  success: boolean
  message: string
  backup?: BackupFile
}

function saveBackupHistory(backups: BackupFile[]): void {
  localStorage.setItem("backup-history", JSON.stringify(backups))
}

export async function createBackup(
  type: "manual" | "automatic" = "manual",
): Promise<{ success: boolean; message: string; backup?: BackupFile }> {
  try {
    const config = getBackupConfig()
    const backupId = `backup_${Date.now()}`
    const timestamp = new Date().toISOString()

    // Collect data based on config
    const backupData: BackupData = {
      metadata: {
        version: "1.0.0",
        createdAt: timestamp,
        type,
        tables: [],
      },
      users: [],
      settings: {},
      products: [],
      analytics: [],
    }

    if (config.includeUserData) {
      backupData.users = mockDatabase.users
      backupData.metadata.tables.push("users")
    }

    if (config.includeSettings) {
      const settings = localStorage.getItem("site-settings")
      backupData.settings = settings ? JSON.parse(settings) : {}
      backupData.metadata.tables.push("settings")
    }

    if (config.includeProducts) {
      backupData.products = mockDatabase.products
      backupData.metadata.tables.push("products")
    }

    // Always include analytics for admin insights
    backupData.analytics = mockDatabase.analytics
    backupData.metadata.tables.push("analytics")

    // Simulate compression
    let dataSize = JSON.stringify(backupData).length
    if (config.compressionEnabled) {
      dataSize = Math.floor(dataSize * 0.3) // Simulate 70% compression
    }

    const backupFile: BackupFile = {
      id: backupId,
      filename: `${backupId}.json${config.compressionEnabled ? ".gz" : ""}`,
      size: dataSize,
      createdAt: timestamp,
      type,
      status: "completed",
      tables: backupData.metadata.tables,
      compressed: config.compressionEnabled,
    }

    // Save backup data
    localStorage.setItem(`backup_data_${backupId}`, JSON.stringify(backupData))

    // Update backup history
    const history = getBackupHistory()
    history.unshift(backupFile)

    // Keep only maxBackups
    if (history.length > config.maxBackups) {
      const removed = history.splice(config.maxBackups)
      // Clean up old backup data
      removed.forEach((backup) => {
        localStorage.removeItem(`backup_data_${backup.id}`)
      })
    }

    saveBackupHistory(history)

    return {
      success: true,
      message: `Yedekleme başarıyla oluşturuldu! (${formatFileSize(dataSize)})`,
      backup: backupFile,
    }
  } catch (error) {
    return { success: false, message: "Yedekleme oluşturulamadı!" }
  }
}

export async function restoreBackup(backupId: string): Promise<{ success: boolean; message: string }> {
  try {
    const backupData = localStorage.getItem(`backup_data_${backupId}`)
    if (!backupData) {
      return { success: false, message: "Yedekleme dosyası bulunamadı!" }
    }

    const data: BackupData = JSON.parse(backupData)

    // Restore settings
    if (data.settings && Object.keys(data.settings).length > 0) {
      localStorage.setItem("site-settings", JSON.stringify(data.settings))
    }

    // In a real app, you would restore to actual database
    // For now, we'll just show success message

    return {
      success: true,
      message: `Yedekleme başarıyla geri yüklendi! (${data.metadata.createdAt})`,
    }
  } catch (error) {
    return { success: false, message: "Yedekleme geri yüklenemedi!" }
  }
}

export async function deleteBackup(backupId: string): Promise<{ success: boolean; message: string }> {
  try {
    // Remove backup data
    localStorage.removeItem(`backup_data_${backupId}`)

    // Update history
    const history = getBackupHistory()
    const updatedHistory = history.filter((backup) => backup.id !== backupId)
    saveBackupHistory(updatedHistory)

    return { success: true, message: "Yedekleme silindi!" }
  } catch (error) {
    return { success: false, message: "Yedekleme silinemedi!" }
  }
}

export function downloadBackup(backupId: string): { success: boolean; message: string } {
  try {
    const backupData = localStorage.getItem(`backup_data_${backupId}`)
    if (!backupData) {
      return { success: false, message: "Yedekleme dosyası bulunamadı!" }
    }

    const history = getBackupHistory()
    const backup = history.find((b) => b.id === backupId)
    if (!backup) {
      return { success: false, message: "Yedekleme bilgisi bulunamadı!" }
    }

    // Create download
    const blob = new Blob([backupData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = backup.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    return { success: true, message: "Yedekleme indiriliyor..." }
  } catch (error) {
    return { success: false, message: "Yedekleme indirilemedi!" }
  }
}

export function scheduleNextBackup(hours: number): void {
  // Clear existing timeout
  const existingTimeout = localStorage.getItem("backup-timeout")
  if (existingTimeout) {
    clearTimeout(Number(existingTimeout))
  }

  // Schedule next backup
  const timeoutId = setTimeout(
    () => {
      createBackup("automatic")
      scheduleNextBackup(hours) // Schedule next one
    },
    hours * 60 * 60 * 1000,
  )

  localStorage.setItem("backup-timeout", timeoutId.toString())
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function getNextBackupTime(): string | null {
  const config = getBackupConfig()
  if (!config.enabled) return null

  const history = getBackupHistory()
  const lastAutoBackup = history.find((b) => b.type === "automatic")

  if (!lastAutoBackup) {
    return "Yakında"
  }

  const lastBackupTime = new Date(lastAutoBackup.createdAt)
  const nextBackupTime = new Date(lastBackupTime.getTime() + config.frequency * 60 * 60 * 1000)

  return nextBackupTime.toLocaleString("tr-TR")
}

// Initialize backup system
export function initializeBackupSystem(): void {
  if (typeof window === "undefined") return

  const config = getBackupConfig()
  if (config.enabled) {
    scheduleNextBackup(config.frequency)
  }
}

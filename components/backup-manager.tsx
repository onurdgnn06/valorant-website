"use client"

import { useState, useEffect } from "react" // useEffect import edildi
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DatabaseBackup, RotateCcw, Download, Trash2, CheckCircle, AlertTriangle, Plus } from "lucide-react" // Plus import edildi
// backup-scheduler'dan export edilen üyeler düzeltildi
import { createBackup, restoreBackup, deleteBackup, listBackups, type BackupStatus } from "@/lib/backup-manager" 

interface BackupManagerProps {
  onSave: (status: BackupStatus) => void
}

export default function BackupManager({ onSave }: BackupManagerProps) {
  const [backups, setBackups] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentAction, setCurrentAction] = useState<string | null>(null)

  useEffect(() => {
    fetchBackups()
  }, [])

  const fetchBackups = async () => {
    setIsLoading(true)
    try {
      const backupList = await listBackups()
      setBackups(backupList)
    } catch (error) {
      console.error("Failed to fetch backups:", error)
      onSave({ success: false, message: "Yedekler yüklenemedi." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBackup = async () => {
    setIsLoading(true)
    setCurrentAction("Yedek oluşturuluyor...")
    setProgress(0)
    try {
      // Simulating progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setProgress(i)
      }
      const result = await createBackup()
      onSave(result)
      fetchBackups()
    } catch (error) {
      console.error("Backup creation failed:", error)
      onSave({ success: false, message: "Yedek oluşturulamadı." })
    } finally {
      setIsLoading(false)
      setCurrentAction(null)
      setProgress(0)
    }
  }

  const handleRestoreBackup = async (backupId: string) => {
    setIsLoading(true)
    setCurrentAction(`'${backupId}' geri yükleniyor...`)
    setProgress(0)
    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProgress(i)
      }
      const result = await restoreBackup(backupId)
      onSave(result)
    } catch (error) {
      console.error("Backup restoration failed:", error)
      onSave({ success: false, message: "Yedek geri yüklenemedi." })
    } finally {
      setIsLoading(false)
      setCurrentAction(null)
      setProgress(0)
    }
  }

  const handleDeleteBackup = async (backupId: string) => {
    setIsLoading(true)
    setCurrentAction(`'${backupId}' siliniyor...`)
    try {
      const result = await deleteBackup(backupId)
      onSave(result)
      fetchBackups()
    } catch (error) {
      console.error("Backup deletion failed:", error)
      onSave({ success: false, message: "Yedek silinemedi." })
    } finally {
      setIsLoading(false)
      setCurrentAction(null)
    }
  }

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="heading-premium flex items-center gap-2">
          <DatabaseBackup className="h-5 w-5" />
          Veritabanı Yedekleme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-white/80">
              Veritabanınızı düzenli olarak yedekleyin. Otomatik yedekleme {` `}
              <span className="text-[hsl(var(--primary))] font-medium">her 24 saatte bir</span> çalışır.
            </p>
            <Button onClick={handleCreateBackup} disabled={isLoading} className="btn-premium">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Yedek Oluştur
            </Button>
          </div>

          {isLoading && currentAction && (
            <div className="space-y-2">
              <p className="text-sm text-white/70">{currentAction}</p>
              <Progress value={progress} className="w-full h-2 bg-white/10 [&>div]:bg-[hsl(var(--primary))]" />
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white/90">Mevcut Yedekler</h4>
            {backups.length === 0 && !isLoading && (
              <p className="text-white/60">Henüz yedek oluşturulmamış.</p>
            )}
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-4 rounded-lg glass border border-white/10"
              >
                <div>
                  <p className="font-medium text-white">{backup.id}</p>
                  <p className="text-xs text-white/60">
                    Oluşturulma: {new Date(backup.timestamp).toLocaleString("tr-TR")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestoreBackup(backup.id)}
                    disabled={isLoading}
                    className="btn-outline-premium text-xs"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Geri Yükle
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBackup(backup.id)}
                    disabled={isLoading}
                    className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => alert("İndirme fonksiyonu eklenecek.")} // Placeholder
                    disabled={isLoading}
                    className="text-white/70 hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

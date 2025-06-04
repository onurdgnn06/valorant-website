import { initializeBackupSystem } from "./backup-manager"

// Initialize backup system when app starts
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", () => {
    initializeBackupSystem()
  })

  // If DOM is already ready
  if (document.readyState === "loading") {
    initializeBackupSystem()
  }
}

export { initializeBackupSystem }

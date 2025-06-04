"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(18, 18, 18, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "white",
          backdropFilter: "blur(20px)",
        },
      }}
    />
  )
}

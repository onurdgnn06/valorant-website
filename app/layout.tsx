import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeInitializer } from "@/components/theme-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ValorantPro - Premium Valorant Cheats",
  description: "En güvenli ve gelişmiş Valorant hileleri. ESP, Aimbot, HWID Spoofer ve daha fazlası.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  )
}

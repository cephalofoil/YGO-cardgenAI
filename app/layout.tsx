import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI YuGiOh Card Generator",
  description: "Generate custom YuGiOh cards using AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 min-h-screen`}
      >
        <div className="stars"></div>
        <div className="twinkling"></div>
        {children}
      </body>
    </html>
  )
}


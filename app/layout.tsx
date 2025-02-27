import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Mono } from "next/font/google"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "Design-Code Parity Quiz",
  description: "Evaluate your design and code alignment",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spaceMono.variable} p-2 lg:p-8 min-h-screen flex items-center justify-center`}
        style={{
          backgroundImage:
            'url("lofi-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="bg-white dark:bg-gray-800 mx-auto min-h-[50vh]" style={{ borderRadius: 40 }}>{children}</div>
      </body>
    </html>
  )
}

import './globals.css'
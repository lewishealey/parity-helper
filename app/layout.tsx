import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Mono } from "next/font/google"
import "../styles/globals.css"
import './globals.css'

const inter = Inter({ subsets: ["latin"] })
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

// Add default metadata
export const metadata: Metadata = {
  title: {
    template: '%s | Parity Helper',
    default: 'Parity Helper - Design System Parity Booster',
  },
  description: 'Evaluate the code parity of your Design System\'s Figma components and get actionable improvement suggestions',
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
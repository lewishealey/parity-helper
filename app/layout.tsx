import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Mono } from "next/font/google"
import "./globals.css"

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
        className={`${inter.className} ${spaceMono.variable} p-8 bg-gray-100 min-h-screen`}
        style={{
          backgroundImage:
            'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-vibrant.jpg-kRmtEuMm6ptlG5niYunkjILIxuc83L.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="rounded-3xl bg-white overflow-hidden max-w-7xl mx-auto">{children}</div>
      </body>
    </html>
  )
}



import './globals.css'
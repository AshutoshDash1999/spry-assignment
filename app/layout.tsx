import { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import { LayoutClient } from "@/app/_components/LayoutClient"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Todo App - Manage Your Tasks Efficiently",
  description:
    "A modern task management application to organize, track, and complete your daily tasks with ease.",
  keywords: ["todo", "task management", "productivity", "task tracker"],
  authors: [{ name: "Ashutosh Dash" }],
  openGraph: {
    title: "Todo App - Manage Your Tasks Efficiently",
    description:
      "A modern task management application to organize, track, and complete your daily tasks with ease.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todo App - Manage Your Tasks Efficiently",
    description:
      "A modern task management application to organize, track, and complete your daily tasks with ease.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <LayoutClient>{children}</LayoutClient>
    </html>
  )
}

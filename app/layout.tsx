"use client"

import { Geist_Mono, Inter } from "next/font/google"

import { Footer } from "@/app/_components/Footer"
import { Header } from "@/app/_components/Header"
import { TodoHeader } from "@/app/todo/_components/TodoHeader"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isTodoPage = pathname === "/todo"

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
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <Toaster />
          <div className="flex-1">
            {isTodoPage ? <TodoHeader /> : <Header />}
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

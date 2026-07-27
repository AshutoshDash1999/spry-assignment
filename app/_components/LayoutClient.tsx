"use client"

import { Footer } from "@/app/_components/Footer"
import { Header } from "@/app/_components/Header"
import { TodoHeader } from "@/app/todo/_components/TodoHeader"
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname } from "next/navigation"
import { Toaster } from "react-hot-toast"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isTodoPage = pathname === "/todo"

  return (
    <body className={"flex min-h-screen flex-col"}>
      <ThemeProvider>
        <Toaster />
        <div className="flex-1">
          {isTodoPage ? <TodoHeader /> : <Header />}
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </body>
  )
}

"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { IconHeart, IconShoppingBag } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isFavoritesPage = pathname === "/favorites"

  const handleAppChange = (value: string | null) => {
    if (value) router.push(value)
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Spry</span>
            <Select
              value={pathname === "/todo" ? "/todo" : "/"}
              onValueChange={handleAppChange}
            >
              <SelectTrigger className="h-auto w-fit gap-1 border-0 px-4 py-2 hover:opacity-80">
                <span>{pathname === "/todo" ? "Todo" : "Ecommerce"}</span>
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="/">Ecommerce</SelectItem>
                <SelectItem value="/todo">Todo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 transition-colors ${
                !isFavoritesPage
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <IconShoppingBag size={20} />
              Products
            </Link>
            <Link
              href="/favorites"
              className={`flex items-center gap-2 transition-colors ${
                isFavoritesPage
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <IconHeart size={20} />
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

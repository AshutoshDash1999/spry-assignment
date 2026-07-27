"use client"

import Link from "next/link"
import { IconHeart, IconShoppingBag } from "@tabler/icons-react"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const isFavoritesPage = pathname === "/favorites"

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Spry
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 transition-colors ${
                !isFavoritesPage
                  ? "text-foreground font-medium"
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
                  ? "text-foreground font-medium"
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

"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { IconHeart, IconShoppingBag } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const apps = [
  { href: "/", label: "Ecommerce" },
  { href: "/todo", label: "Todo" },
]

export function Header({ showNav = true }: { showNav?: boolean }) {
  const pathname = usePathname()
  const isFavoritesPage = pathname === "/favorites"
  const isProductsPage = pathname === "/"
  const currentApp = apps.find((app) => app.href === pathname) ?? apps[0]

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold">
              Spry
            </Link>
            <Select value={currentApp.href}>
              <SelectTrigger className="h-auto w-fit gap-1 border-0 px-4 py-2 hover:opacity-80">
                <span>{currentApp.label}</span>
              </SelectTrigger>
              <SelectContent className="z-50">
                {apps.map((app) => (
                  <SelectItem
                    key={app.href}
                    value={app.href}
                    render={<Link href={app.href} />}
                  >
                    {app.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {showNav && (
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className={`flex items-center gap-2 transition-colors ${
                  isProductsPage
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
          )}
        </div>
      </div>
    </header>
  )
}

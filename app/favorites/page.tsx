"use client"

import { ProductCard } from "../_components/ProductCard"
import { products } from "@/lib/products"
import { useFavoritesStore } from "@/lib/store"
import { useMemo, useState } from "react"

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc")

  const favoriteProducts = useMemo(() => {
    const fav = products.filter((p) => favorites.has(p.id))
    fav.sort((a, b) => (sortBy === "asc" ? a.price - b.price : b.price - a.price))
    return fav
  }, [favorites, sortBy])

  return (
    <div className="min-h-svh bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Favorites</h1>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by price:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "asc" | "desc")}
              className="rounded border border-input bg-background px-2 py-1 text-sm"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
            {favoriteProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorited={favorites.has(product.id)}
                onToggleFavorite={toggleFavorite}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No favorites yet. Add products to your favorites!
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

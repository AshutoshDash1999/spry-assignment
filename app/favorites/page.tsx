"use client"

import { products } from "@/lib/products"
import { useFavoritesStore } from "@/lib/store"
import { useState } from "react"
import { FilterSortBar } from "../_components/FilterSortBar"
import { ProductCard } from "../_components/ProductCard"

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRating, setSelectedRating] = useState("All")
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc")

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category ?? "")
  }

  const handleRatingChange = (rating: string | null) => {
    setSelectedRating(rating ?? "All")
  }

  const handleSortChange = (sort: string | null) => {
    setSortBy((sort as "asc" | "desc") ?? "asc")
  }

  let favoriteProducts = products.filter((p) => favorites.has(p.id))

  if (selectedCategory) {
    favoriteProducts = favoriteProducts.filter(
      (p) => p.category === selectedCategory
    )
  }

  if (selectedRating !== "All") {
    const minRating = parseFloat(selectedRating)
    favoriteProducts = favoriteProducts.filter((p) => p.rating >= minRating)
  }

  favoriteProducts.sort((a, b) =>
    sortBy === "asc" ? a.price - b.price : b.price - a.price
  )

  return (
    <div className="min-h-svh bg-background">
      <FilterSortBar
        selectedCategory={selectedCategory}
        selectedRating={selectedRating}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onRatingChange={handleRatingChange}
        onSortChange={handleSortChange}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-4 text-3xl font-bold">Favorites</h1>

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

"use client"

import { useMemo, useState } from "react"
import { products } from "@/lib/products"
import { FilterSortBar } from "./_components/FilterSortBar"
import { ProductCard } from "./_components/ProductCard"

export default function Page() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRating, setSelectedRating] = useState("All")
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (selectedRating !== "All") {
      const minRating = parseFloat(selectedRating)
      filtered = filtered.filter((p) => p.rating >= minRating)
    }

    filtered.sort((a, b) => {
      return sortBy === "asc" ? a.price - b.price : b.price - a.price
    })

    return filtered
  }, [selectedCategory, selectedRating, sortBy])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category ?? "")
  }

  const handleRatingChange = (rating: string | null) => {
    setSelectedRating(rating ?? "All")
  }

  const handleSortChange = (sort: "asc" | "desc" | null) => {
    setSortBy(sort ?? "asc")
  }

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-1 text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length}{" "}
            products
          </p>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorited={favorites.has(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </main>
    </div>
  )
}

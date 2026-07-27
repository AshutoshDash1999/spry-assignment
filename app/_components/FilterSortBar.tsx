"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from "@/lib/products"

interface FilterSortBarProps {
  selectedCategory: string
  selectedRating: string
  sortBy: "asc" | "desc"
  onCategoryChange: (category: string | null) => void
  onRatingChange: (rating: string | null) => void
  onSortChange: (sort: "asc" | "desc" | null) => void
}

export function FilterSortBar({
  selectedCategory,
  selectedRating,
  sortBy,
  onCategoryChange,
  onRatingChange,
  onSortChange,
}: FilterSortBarProps) {
  const ratings = ["All", "2+", "3+", "4+"]

  return (
    <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap gap-3">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-fit sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select value={selectedRating} onValueChange={onRatingChange}>
              <SelectTrigger className="w-fit sm:w-48">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating === "All" ? "All Ratings" : `Rating ${rating}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-fit sm:w-48">
              <SelectValue placeholder="Sort by price">
                {sortBy === "asc"
                  ? "Price: Low to High"
                  : sortBy === "desc"
                    ? "Price: High to Low"
                    : "Sort by price"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

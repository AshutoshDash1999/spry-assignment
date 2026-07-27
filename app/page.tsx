"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { products } from "@/lib/products"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { FilterSortBar } from "./_components/FilterSortBar"
import { ProductCard } from "./_components/ProductCard"

const ITEMS_PER_PAGE = 8

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRating, setSelectedRating] = useState("All")
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const viewMode = searchParams.get("view") || "products"

  useEffect(() => {
    const pageParam = searchParams.get("page")
    const categoryParam = searchParams.get("category")
    const ratingParam = searchParams.get("rating")
    const sortParam = searchParams.get("sort")

    if (pageParam) setCurrentPage(parseInt(pageParam) || 1)
    if (categoryParam) setSelectedCategory(categoryParam)
    if (ratingParam) setSelectedRating(ratingParam)
    if (sortParam) setSortBy((sortParam as "asc" | "desc") || "asc")
  }, [searchParams])

  const updateUrl = (
    page?: number,
    category?: string,
    rating?: string,
    sort?: "asc" | "desc"
  ) => {
    const params = new URLSearchParams()
    if (page && page > 1) params.set("page", page.toString())
    if (category) params.set("category", category)
    if (rating && rating !== "All") params.set("rating", rating)
    if (sort && sort !== "asc") params.set("sort", sort)

    const url = params.toString() ? `?${params.toString()}` : "/"
    router.push(url)
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = viewMode === "favorites"
      ? products.filter((p) => favorites.has(p.id))
      : products

    if (selectedCategory && viewMode !== "favorites") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (selectedRating !== "All" && viewMode !== "favorites") {
      const minRating = parseFloat(selectedRating)
      filtered = filtered.filter((p) => p.rating >= minRating)
    }

    filtered.sort((a, b) => {
      return sortBy === "asc" ? a.price - b.price : b.price - a.price
    })

    return filtered
  }, [selectedCategory, selectedRating, sortBy, viewMode, favorites])

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
    const newCategory = category ?? ""
    setSelectedCategory(newCategory)
    setCurrentPage(1)
    updateUrl(1, newCategory, selectedRating, sortBy)
  }

  const handleRatingChange = (rating: string | null) => {
    const newRating = rating ?? "All"
    setSelectedRating(newRating)
    setCurrentPage(1)
    updateUrl(1, selectedCategory, newRating, sortBy)
  }

  const handleSortChange = (sort: "asc" | "desc" | null) => {
    const newSort = sort ?? "asc"
    setSortBy(newSort)
    setCurrentPage(1)
    updateUrl(1, selectedCategory, selectedRating, newSort)
  }

  return (
    <div className="min-h-svh bg-background">
      {viewMode !== "favorites" && (
        <FilterSortBar
          selectedCategory={selectedCategory}
          selectedRating={selectedRating}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onRatingChange={handleRatingChange}
          onSortChange={handleSortChange}
        />
      )}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {viewMode === "favorites" ? "Favorites" : "Products"}
          </h1>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
              {filteredAndSortedProducts
                .slice(
                  (currentPage - 1) * ITEMS_PER_PAGE,
                  currentPage * ITEMS_PER_PAGE
                )
                .map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorited={favorites.has(product.id)}
                    onToggleFavorite={toggleFavorite}
                    index={idx}
                  />
                ))}
            </div>

            {Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE) >
              1 && (
              <div className="mt-8">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    filteredAndSortedProducts.length / ITEMS_PER_PAGE
                  )}
                  onPageChange={(page) => {
                    setCurrentPage(page)
                    updateUrl(page, selectedCategory, selectedRating, sortBy)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      if (startPage > 2) {
        pages.push("...")
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) {
                onPageChange(currentPage - 1)
              }
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {getPageNumbers().map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault()
                  if (typeof page === "number") {
                    onPageChange(page)
                  }
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1)
              }
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

"use client"

import { Product } from "@/lib/products"
import { IconHeart } from "@tabler/icons-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
  isFavorited: boolean
  onToggleFavorite: (id: number) => void
}

export function ProductCard({
  product,
  isFavorited,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          <IconHeart
            size={20}
            className={isFavorited ? "fill-red-500 stroke-red-500" : ""}
          />
        </button>
      </div>
      <CardContent className="pt-4">
        <p className="text-xs font-medium text-muted-foreground uppercase">
          {product.category}
        </p>
        <h3 className="mt-2 line-clamp-2 font-semibold">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">★</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

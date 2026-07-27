"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/lib/products"
import { IconHeart } from "@tabler/icons-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  isFavorited: boolean
  onToggleFavorite: (id: number) => void
  index?: number
}

export function ProductCard({
  product,
  isFavorited,
  onToggleFavorite,
  index = 0,
}: ProductCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleHeartClick = () => {
    onToggleFavorite(product.id)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
    >
      <Card className="group overflow-hidden pt-0 transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <motion.button
            onClick={handleHeartClick}
            className="absolute top-3 right-3 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
            animate={
              isAnimating
                ? {
                    scale: [1, 1.2, 0.95, 1.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={
                isAnimating
                  ? {
                      rotate: [0, -15, 15, -15, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <IconHeart
                size={20}
                className={isFavorited ? "fill-red-500 stroke-red-500" : ""}
              />
            </motion.div>
          </motion.button>
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
    </motion.div>
  )
}

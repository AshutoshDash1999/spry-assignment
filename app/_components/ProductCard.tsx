"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/lib/products"
import { IconHeart } from "@tabler/icons-react"
import { motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"

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
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)

  const handleHeartClick = () => {
    setIsHeartAnimating(true)
    onToggleFavorite(product.id)
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform group-hover:scale-105"
          />
          <motion.div
            animate={isHeartAnimating ? { scale: [1, 0.8, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => setIsHeartAnimating(false)}
            className="absolute top-2 right-2"
          >
            <Button
              variant="outline"
              size="icon"
              className="backdrop-blur-3xl"
              onClick={handleHeartClick}
            >
              <IconHeart
                size={20}
                className={isFavorited ? "fill-red-500 stroke-red-500" : ""}
              />
            </Button>
          </motion.div>
        </div>
        <CardContent className="pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            {product.category}
          </p>
          <h3 className="mt-2 line-clamp-2 font-semibold">{product.name}</h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
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

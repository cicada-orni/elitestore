'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type StarRatingProps = {
  rating: number
  onRatingChange?: (rating: number) => void
  className?: string
}

export function StarRating({
  rating,
  onRatingChange,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const isInteractive = !!onRatingChange
  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const starRating = index + 1
        return (
          <Star
            key={index}
            className={cn(
              'h-5 w-5',
              isInteractive && 'cursor-pointer',
              starRating <= (hoverRating || rating)
                ? 'fill-yellow-500 text-yellow-500'
                : 'text-gray-300',
            )}
            onClick={() => isInteractive && onRatingChange(starRating)}
            onMouseEnter={() => isInteractive && setHoverRating(starRating)}
            onMouseLeave={() => isInteractive && setHoverRating(0)}
          />
        )
      })}
    </div>
  )
}

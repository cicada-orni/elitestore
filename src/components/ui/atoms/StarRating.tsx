import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  className?: string
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const starRating = index + 1
        return (
          <Star
            key={index}
            className={cn(
              'h-5 w-5',
              starRating <= rating
                ? 'fill-yellow-500 text-yellow-500'
                : 'text-gray-300',
            )}
          />
        )
      })}
    </div>
  )
}

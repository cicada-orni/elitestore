import { Review } from '@/lib/definations'
import { StarRating } from '../atoms/StarRating'
import { User } from 'lucide-react'

type ReviewCardProps = {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-y-4 rounded-lg border p-4">
      {/* Card Header */}
      <div className="flex items-center gap-x-4">
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
          <User className="text-muted-foreground h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <p className="text-foreground font-semibold">
            {review.author?.email || 'Anonymous'}
          </p>
          <StarRating rating={review.rating} />
        </div>
      </div>

      {/* Card Body */}
      <div>
        <p className="text-muted-foreground text-sm">{review.comment}</p>
      </div>
    </div>
  )
}

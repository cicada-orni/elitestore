export function ProductDetailsSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-x-8 md:grid-cols-2">
      {/* Image Column Skeleton */}
      <div className="bg-muted aspect-square rounded-lg" />

      {/* Details Column Skeleton */}
      <div className="mt-8 md:mt-0">
        {/* Title Placeholder */}
        <div className="bg-muted h-8 w-3/4 rounded" />
        {/* Price Placeholder */}
        <div className="bg-muted mt-4 h-8 w-1/4 rounded" />
        {/* Description Title Placeholder */}
        <div className="bg-muted mt-6 h-6 w-1/3 rounded" />
        {/* Description Lines Placeholder */}
        <div className="mt-2 space-y-2">
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-5/6 rounded" />
        </div>
      </div>
    </div>
  )
}

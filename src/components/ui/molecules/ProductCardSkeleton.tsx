export function ProductCardSkeleton() {
  return (
    <div className="bg-card flex animate-pulse flex-col overflow-hidden rounded-lg border shadow-sm">
      {/* Image Placeholder */}
      <div className="bg-muted aspect-square" />

      {/* Details Placeholder */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title Placeholder */}
        <div className="bg-muted h-4 w-3/4 rounded" />
        {/* Description Placeholder */}
        <div className="bg-muted mt-2 h-3 w-full rounded" />
        <div className="bg-muted h-3 w-1/2 rounded" />
        {/* Price Placeholder */}
        <div className="bg-muted mt-4 h-5 w-1/4 rounded" />
      </div>
    </div>
  )
}

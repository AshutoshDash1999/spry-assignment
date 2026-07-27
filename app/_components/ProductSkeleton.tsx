export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-4 animate-pulse">
          <div className="aspect-square bg-muted rounded-md mb-4" />
          <div className="h-6 bg-muted rounded mb-2" />
          <div className="h-4 bg-muted rounded mb-4 w-3/4" />
          <div className="flex justify-between items-center">
            <div className="h-6 bg-muted rounded w-20" />
            <div className="h-8 w-8 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

import { Skeleton } from './ui/skeleton';

export function SkeletonKPICard() {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-32 animate-shimmer" />
        <Skeleton className="h-10 w-10 rounded-full animate-shimmer" />
      </div>
      <Skeleton className="h-8 w-24 mb-2 animate-shimmer" />
      <Skeleton className="h-4 w-40 animate-shimmer" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <Skeleton className="h-6 w-48 mb-6 animate-shimmer" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-end gap-2">
            <Skeleton className="h-32 flex-1 animate-shimmer" style={{ animationDelay: `${i * 0.1}s` }} />
            <Skeleton className="h-40 flex-1 animate-shimmer" style={{ animationDelay: `${i * 0.1 + 0.05}s` }} />
            <Skeleton className="h-36 flex-1 animate-shimmer" style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonTimeline() {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <Skeleton className="h-6 w-48 mb-6 animate-shimmer" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-10 h-10 rounded-full animate-shimmer" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 animate-shimmer" />
              <Skeleton className="h-3 w-full animate-shimmer" />
              <Skeleton className="h-3 w-20 animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

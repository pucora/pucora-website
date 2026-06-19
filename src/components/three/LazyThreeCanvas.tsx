import { lazy, Suspense } from 'react'

const LazyThreeCanvas = lazy(() =>
  import('./ThreeCanvas').then((m) => ({ default: m.ThreeCanvas })),
)

function Fallback({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 animate-pulse rounded-full bg-accent/10 blur-2xl" />
        <div className="absolute inset-4 rounded-full border border-accent/20" />
      </div>
    </div>
  )
}

type ThreeCanvasProps = {
  className?: string
  variant?: 'hero' | 'inline' | 'background'
  interactive?: boolean
}

export function LazyThreeCanvasWrapper(props: ThreeCanvasProps) {
  return (
    <Suspense fallback={<Fallback className={props.className} />}>
      <LazyThreeCanvas {...props} />
    </Suspense>
  )
}

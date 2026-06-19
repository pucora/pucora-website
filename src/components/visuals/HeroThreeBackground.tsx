import { LazyThreeCanvasWrapper as ThreeCanvas } from '../three/LazyThreeCanvas'

export function HeroThreeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <ThreeCanvas variant="background" interactive={false} className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-navy/80" />
    </div>
  )
}

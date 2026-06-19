import { cn } from '../../lib/cn'

interface CodeBlockProps {
  code: string
  className?: string
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <div className={cn('group relative overflow-hidden rounded-xl', className)}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 via-indigo/20 to-accent/20 opacity-50 blur-sm transition-opacity group-hover:opacity-80" />
      <pre className="relative overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-sm text-accent backdrop-blur-xl glow-accent">
        <div className="mb-2 flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-muted">terminal</span>
        </div>
        <code>{code}</code>
      </pre>
    </div>
  )
}

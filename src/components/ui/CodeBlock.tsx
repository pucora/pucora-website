import { cn } from '../../lib/cn'

interface CodeBlockProps {
  code: string
  className?: string
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-surface', className)}>
      <pre className="overflow-x-auto p-5 font-mono text-sm text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

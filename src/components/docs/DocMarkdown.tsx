import type { AnchorHTMLAttributes, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface DocMarkdownProps {
  content: string
  className?: string
}

function DocLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) {
  if (!href) return <a {...props}>{children}</a>

  if (href.startsWith('/docs/') || href.startsWith('/downloads')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('/') && !href.startsWith('//')) {
    const mapped = href.startsWith('/download') ? '/downloads' : href
    return (
      <Link to={mapped} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

export function DocMarkdown({ content, className }: DocMarkdownProps) {
  return (
    <div className={cn('doc-prose', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          a: ({ href, children, className: linkClass, ...props }) => (
            <DocLink href={href} className={linkClass} {...props}>
              {children}
            </DocLink>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border-b border-border bg-surface px-4 py-3 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border-b border-border px-4 py-3 align-top">{children}</td>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-xl border border-brand/20 bg-brand/5 px-5 py-4 text-subtle">{children}</blockquote>
          ),
          pre: ({ children }) => <pre className="doc-code-block">{children}</pre>,
          code: ({ className: codeClass, children, ...props }) => {
            const isBlock = codeClass?.includes('language-')
            if (isBlock) {
              return (
                <code className={codeClass} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-sm text-brand" {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

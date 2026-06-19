import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import type { ArchitectureDiagram, ArchEdge, ArchNode } from '../../content/architecture-diagrams'
import { cn } from '../../lib/cn'

interface TrafficFlowDiagramProps {
  diagram: ArchitectureDiagram
  className?: string
  showLegend?: boolean
  compact?: boolean
  showEdgeLabels?: boolean
  interactive?: boolean
}

interface Point {
  x: number
  y: number
}

interface ViewBox {
  minX: number
  minY: number
  width: number
  height: number
}

interface DragState {
  id: string
  offsetX: number
  offsetY: number
}

function parseViewBox(viewBox: string): ViewBox {
  const [minX, minY, width, height] = viewBox.split(/\s+/).map(Number)
  return { minX, minY, width, height }
}

function nodeCenter(node: ArchNode): Point {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 }
}

function quadControl(from: ArchNode, to: ArchNode, response?: boolean): Point {
  const a = nodeCenter(from)
  const b = nodeCenter(to)
  const dx = b.x - a.x
  const dy = b.y - a.y
  const bend = response ? -0.55 : 0.32
  return {
    x: a.x + dx * 0.5,
    y: a.y + dy * 0.5 + Math.sign(dx || 1) * Math.abs(dy) * bend,
  }
}

function quadPoint(a: Point, c: Point, b: Point, t: number): Point {
  const mt = 1 - t
  return {
    x: mt * mt * a.x + 2 * mt * t * c.x + t * t * b.x,
    y: mt * mt * a.y + 2 * mt * t * c.y + t * t * b.y,
  }
}

function edgePath(from: ArchNode, to: ArchNode, response?: boolean) {
  const a = nodeCenter(from)
  const b = nodeCenter(to)
  const c = quadControl(from, to, response)
  return `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`
}

function edgeEndpoints(from: ArchNode, to: ArchNode) {
  const a = nodeCenter(from)
  const b = nodeCenter(to)
  const pad = 8
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len

  return {
    x1: a.x + ux * (from.w / 2 + pad),
    y1: a.y + uy * (from.h / 2 + pad),
    x2: b.x - ux * (to.w / 2 + pad),
    y2: b.y - uy * (to.h / 2 + pad),
  }
}

function pointInNode(p: Point, node: ArchNode, margin = 6) {
  return (
    p.x >= node.x - margin &&
    p.x <= node.x + node.w + margin &&
    p.y >= node.y - margin &&
    p.y <= node.y + node.h + margin
  )
}

function edgeLabelPosition(from: ArchNode, to: ArchNode, response: boolean | undefined, nodes: ArchNode[]) {
  const a = nodeCenter(from)
  const b = nodeCenter(to)
  const c = quadControl(from, to, response)
  const t = 0.5
  const p = quadPoint(a, c, b, t)

  const tx = 2 * (1 - t) * (c.x - a.x) + 2 * t * (b.x - c.x)
  const ty = 2 * (1 - t) * (c.y - a.y) + 2 * t * (b.y - c.y)
  const len = Math.hypot(tx, ty) || 1
  const nx = -ty / len
  const ny = tx / len
  const offset = response ? 32 : 18

  const candidates = [
    { x: p.x + nx * offset, y: p.y + ny * offset },
    { x: p.x - nx * offset, y: p.y - ny * offset },
    { x: p.x, y: p.y - offset },
    { x: p.x, y: p.y + offset },
  ]

  for (const candidate of candidates) {
    if (!nodes.some((node) => pointInNode(candidate, node))) {
      return candidate
    }
  }

  return candidates[0]
}

function clientToSvg(svg: SVGSVGElement, clientX: number, clientY: number): Point {
  const pt = svg.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const svgPt = pt.matrixTransform(ctm.inverse())
  return { x: svgPt.x, y: svgPt.y }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function nodesEqual(a: ArchNode[], b: ArchNode[]) {
  return a.every((node, i) => node.x === b[i]?.x && node.y === b[i]?.y)
}

function EdgeLabel({ x, y, label, response }: { x: number; y: number; label: string; response?: boolean }) {
  const padX = 6
  const width = Math.max(label.length * 5.6 + padX * 2, 36)
  const height = 16

  return (
    <g pointerEvents="none">
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={6}
        fill="var(--color-background)"
        stroke={response ? 'var(--color-link)' : 'var(--color-border)'}
        strokeWidth={1}
        opacity={0.96}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={response ? 'var(--color-link)' : 'var(--color-muted)'}
        fontSize="9"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  )
}

function TrafficPackets({
  path,
  count,
  duration,
  response,
  reduced,
  gradientId,
  animate,
}: {
  path: string
  count: number
  duration: number
  response?: boolean
  reduced: boolean
  gradientId: string
  animate: boolean
}) {
  if (reduced || !animate) return null

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} pointerEvents="none">
          <circle r="4" fill={`url(#${gradientId})`} opacity="0.95">
            <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${(i * duration) / count}s`} path={path} />
          </circle>
          <circle r="7" fill={response ? 'var(--color-link)' : 'var(--color-brand)'} opacity="0.12">
            <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${(i * duration) / count}s`} path={path} />
          </circle>
        </g>
      ))}
    </>
  )
}

function DiagramNode({
  node,
  compact,
  reduced,
  gradId,
  glowId,
  isDragging,
  interactive,
  onPointerDown,
}: {
  node: ArchNode
  compact: boolean
  reduced: boolean
  gradId: string
  glowId: string
  isDragging: boolean
  interactive: boolean
  onPointerDown: (e: React.PointerEvent, id: string) => void
}) {
  return (
    <g
      filter={node.primary ? `url(#${glowId})` : undefined}
      style={{
        cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default',
        touchAction: interactive ? 'none' : 'auto',
      }}
      onPointerDown={(e) => onPointerDown(e, node.id)}
      role={interactive ? 'button' : undefined}
      aria-label={interactive ? `Drag ${node.label}` : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? undefined
          : undefined
      }
    >
      {node.primary && !reduced && (
        <rect
          x={node.x - 4}
          y={node.y - 4}
          width={node.w + 8}
          height={node.h + 8}
          rx="20"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          className={isDragging ? undefined : 'arch-gateway-pulse'}
          opacity={isDragging ? 0.85 : 0.5}
          pointerEvents="none"
        />
      )}
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={node.primary ? 16 : 12}
        fill="var(--color-diagram-node)"
        stroke={node.primary ? `url(#${gradId})` : 'var(--color-diagram-line)'}
        strokeWidth={node.primary ? 2 : 1.5}
        opacity={isDragging ? 0.98 : 1}
      />
      <text
        x={node.x + node.w / 2}
        y={node.y + node.h / 2 - (node.sublabel ? 6 : 0)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-diagram-text)"
        fontSize={compact ? (node.primary ? 13 : 10) : node.primary ? 16 : 12}
        fontWeight="600"
        pointerEvents="none"
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          x={node.x + node.w / 2}
          y={node.y + node.h / 2 + (compact ? 10 : 14)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--color-brand)"
          fontSize={compact ? 8 : 10}
          fontWeight="500"
          pointerEvents="none"
        >
          {node.sublabel}
        </text>
      )}
    </g>
  )
}

export function TrafficFlowDiagram({
  diagram,
  className,
  showLegend = true,
  compact = false,
  showEdgeLabels,
  interactive: interactiveProp,
}: TrafficFlowDiagramProps) {
  const reduced = useReducedMotion() ?? false
  const interactive = interactiveProp ?? !compact
  const uid = useId().replace(/:/g, '')
  const gradId = `traffic-grad-${uid}`
  const glowId = `gateway-glow-${uid}`
  const renderEdgeLabels = showEdgeLabels ?? !compact
  const svgRef = useRef<SVGSVGElement>(null)
  const viewBox = useMemo(() => parseViewBox(diagram.viewBox), [diagram.viewBox])

  const [nodes, setNodes] = useState<ArchNode[]>(() => diagram.nodes.map((n) => ({ ...n })))
  const [drag, setDrag] = useState<DragState | null>(null)

  useEffect(() => {
    setNodes(diagram.nodes.map((n) => ({ ...n })))
    setDrag(null)
  }, [diagram.id, diagram.nodes])

  const nodeMap = useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, ArchNode>,
    [nodes],
  )

  const isDirty = useMemo(() => !nodesEqual(nodes, diagram.nodes), [nodes, diagram.nodes])

  const labeledEdges = useMemo(
    () =>
      diagram.edges
        .filter((edge) => edge.label && renderEdgeLabels)
        .map((edge) => {
          const from = nodeMap[edge.from]
          const to = nodeMap[edge.to]
          if (!from || !to) return null
          const pos = edgeLabelPosition(from, to, edge.response, nodes)
          return { edge, pos }
        })
        .filter(Boolean) as { edge: ArchEdge; pos: Point }[],
    [diagram.edges, nodeMap, nodes, renderEdgeLabels],
  )

  const sortedNodes = useMemo(() => {
    if (!drag) return nodes
    return [...nodes.filter((n) => n.id !== drag.id), nodes.find((n) => n.id === drag.id)!]
  }, [nodes, drag])

  const constrainNode = useCallback(
    (node: ArchNode, x: number, y: number) => {
      const padding = 12
      return {
        ...node,
        x: clamp(x, viewBox.minX + padding, viewBox.minX + viewBox.width - node.w - padding),
        y: clamp(y, viewBox.minY + padding, viewBox.minY + viewBox.height - node.h - padding),
      }
    },
    [viewBox],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, nodeId: string) => {
      if (!interactive || !svgRef.current) return
      e.preventDefault()
      e.stopPropagation()
      ;(e.currentTarget as Element).setPointerCapture(e.pointerId)

      const pt = clientToSvg(svgRef.current, e.clientX, e.clientY)
      const node = nodeMap[nodeId]
      if (!node) return

      setDrag({
        id: nodeId,
        offsetX: pt.x - node.x,
        offsetY: pt.y - node.y,
      })
    },
    [interactive, nodeMap],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drag || !svgRef.current) return
      e.preventDefault()

      const pt = clientToSvg(svgRef.current, e.clientX, e.clientY)
      setNodes((prev) =>
        prev.map((node) =>
          node.id === drag.id
            ? constrainNode(node, pt.x - drag.offsetX, pt.y - drag.offsetY)
            : node,
        ),
      )
    },
    [drag, constrainNode],
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (drag) {
      ;(e.currentTarget as Element).releasePointerCapture(e.pointerId)
      setDrag(null)
    }
  }, [drag])

  const resetLayout = useCallback(() => {
    setNodes(diagram.nodes.map((n) => ({ ...n })))
    setDrag(null)
  }, [diagram.nodes])

  const animatePackets = !drag && !reduced

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-surface', className)}>
      {!compact && (
        <div className="border-b border-border bg-background/50 px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">{diagram.title}</p>
              <p className="text-xs text-muted">{diagram.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {showLegend && (
                <div className="flex items-center gap-4 text-[11px] text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
                    Request
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-link shadow-[0_0_8px_var(--color-link)]" />
                    Response
                  </span>
                  {interactive && (
                    <span className="hidden text-subtle sm:inline">Drag nodes to explore</span>
                  )}
                  {!reduced && animatePackets && (
                    <span className="hidden items-center gap-1.5 sm:flex">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                      </span>
                      Live traffic
                    </span>
                  )}
                </div>
              )}
              {interactive && isDirty && (
                <button
                  type="button"
                  onClick={resetLayout}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-subtle transition-colors hover:border-brand/30 hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset layout
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={cn('relative', compact ? 'p-3 md:p-4' : 'p-4 md:p-8')}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--color-brand)_8%,transparent),transparent_70%)]" />

        <svg
          ref={svgRef}
          viewBox={diagram.viewBox}
          className={cn('relative w-full select-none', interactive && 'touch-none')}
          role="img"
          aria-label={`${diagram.title} architecture diagram${interactive ? ' — drag nodes to rearrange' : ''}`}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-brand)" />
              <stop offset="100%" stopColor="var(--color-link)" />
            </linearGradient>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <pattern id={`grid-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="var(--color-border)" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#grid-${uid})`} opacity="0.6" pointerEvents="none" />

          {/* Edges */}
          <g pointerEvents="none">
            {diagram.edges.map((edge: ArchEdge) => {
              const from = nodeMap[edge.from]
              const to = nodeMap[edge.to]
              if (!from || !to) return null
              const path = edgePath(from, to, edge.response)
              const line = edgeEndpoints(from, to)

              return (
                <g key={edge.id}>
                  <path
                    d={path}
                    fill="none"
                    stroke={edge.response ? 'var(--color-link)' : 'var(--color-diagram-line)'}
                    strokeWidth="1.5"
                    strokeDasharray={edge.response ? '6 6' : undefined}
                    opacity={edge.response ? 0.55 : 0.85}
                  />
                  <line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={edge.response ? 'var(--color-link)' : 'var(--color-brand)'}
                    strokeWidth="2"
                    opacity="0.12"
                  />
                  {animatePackets && (
                    <line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={edge.response ? 'var(--color-link)' : 'var(--color-brand)'}
                      strokeWidth="2"
                      className="animate-data-flow"
                      opacity="0.7"
                    />
                  )}
                  <TrafficPackets
                    path={path}
                    count={edge.packets ?? 2}
                    duration={edge.duration ?? 2}
                    response={edge.response}
                    reduced={reduced}
                    gradientId={gradId}
                    animate={animatePackets}
                  />
                </g>
              )
            })}
          </g>

          {/* Nodes (dragged node rendered last) */}
          {sortedNodes.map((node) => (
            <DiagramNode
              key={node.id}
              node={node}
              compact={compact}
              reduced={reduced}
              gradId={gradId}
              glowId={glowId}
              isDragging={drag?.id === node.id}
              interactive={interactive}
              onPointerDown={handlePointerDown}
            />
          ))}

          {/* Edge labels */}
          {labeledEdges.map(({ edge, pos }) => (
            <EdgeLabel key={`label-${edge.id}`} x={pos.x} y={pos.y} label={edge.label!} response={edge.response} />
          ))}
        </svg>
      </div>
    </div>
  )
}

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOCS_SRC = path.resolve(ROOT, '../pucora-documentation')
const DOCS_OUT = path.resolve(ROOT, 'src/content/docs/processed')
const MANIFEST_OUT = path.resolve(ROOT, 'src/content/docs/manifest.json')

const SECTION_LABELS = {
  overview: 'Getting Started',
  configuration: 'Configuration',
  design: 'Design',
  developer: 'Developer',
  deploying: 'Deploying',
  backends: 'Backends',
  endpoints: 'Endpoints',
  'service-settings': 'Service Settings',
  authorization: 'Authentication & Authorization',
  security: 'Security',
  throttling: 'Throttling',
  telemetry: 'Telemetry & Observability',
  logging: 'Logging',
  extending: 'Extending',
  grpc: 'gRPC',
  websockets: 'WebSockets',
  async: 'Async Agents',
  'non-rest-connectivity': 'Non-REST Connectivity',
  'request-response-manipulation': 'Request/Response',
  benchmarks: 'Benchmarks',
  faq: 'FAQ',
}

function slugFromFile(relativePath) {
  const withoutExt = relativePath.replace(/\.md$/, '')
  if (withoutExt === '_index') return ''
  if (withoutExt.endsWith('/_index')) return withoutExt.replace('/_index', '')
  return withoutExt
}

function preprocessMarkdown(body) {
  let text = body

  // Block shortcodes: note, terminal, highlight, tabs, tab
  text = text.replace(
    /\{\{<\s*note(?:\s+([^>]*))?\s*>\}\}([\s\S]*?)\{\{<\s*\/note\s*>\}\}/gi,
    (_, attrs, content) => {
      const title = attrs?.match(/title="([^"]+)"/)?.[1]
      const header = title ? `> **${title}**\n>\n` : '> '
      return content
        .trim()
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n')
        .replace(/^/, header)
    },
  )

  text = text.replace(
    /\{\{<\s*terminal(?:\s+([^>]*))?\s*>\}\}([\s\S]*?)\{\{<\s*\/terminal\s*>\}\}/gi,
    (_, attrs, content) => {
      const title = attrs?.match(/title="([^"]+)"/)?.[1]
      const lang = 'bash'
      const header = title ? `\n\n**${title}**\n\n` : '\n\n'
      return `${header}\`\`\`${lang}\n${content.trim()}\n\`\`\`\n`
    },
  )

  text = text.replace(
    /\{\{<\s*highlight\s+([^>]+)\s*>\}\}([\s\S]*?)\{\{<\s*\/highlight\s*>\}\}/gi,
    (_, lang, content) => `\n\`\`\`${lang.trim().split(/\s+/)[0]}\n${content.trim()}\n\`\`\`\n`,
  )

  // button-group blocks -> strip wrapper, keep inner buttons
  text = text.replace(/\{\{<\s*button-group\s*>\}\}/gi, '')
  text = text.replace(/\{\{<\s*\/button-group\s*>\}\}/gi, '\n')

  text = text.replace(
    /\{\{<\s*button\s+([^>]+)\s*>\}\}([\s\S]*?)\{\{<\s*\/button\s*>\}\}/gi,
    (_, attrs, label) => {
      const url = attrs.match(/url="([^"]+)"/)?.[1] ?? '#'
      const textLabel = attrs.match(/text="([^"]+)"/)?.[1] ?? label.replace(/<[^>]+>/g, '').trim()
      return `[${textLabel}](${url})`
    },
  )

  text = text.replace(
    /\{\{<\s*button\s+([^/>]+)\s*\/>\}\}/gi,
    (_, attrs) => {
      const url = attrs.match(/url="([^"]+)"/)?.[1] ?? '#'
      const textLabel = attrs.match(/text="([^"]+)"/)?.[1] ?? 'Link'
      return `[${textLabel}](${url})`
    },
  )

  // schema shortcodes -> placeholder
  text = text.replace(
    /\{\{<\s*schema\s+([^>]+)\s*>\}\}/gi,
    (_, attrs) => {
      const data = attrs.match(/data="([^"]+)"/)?.[1] ?? 'schema'
      return `\n\n> **Schema reference:** \`${data}\` — see [pucora-schema](https://github.com/pucora/pucora-schema).\n\n`
    },
  )

  // product shortcodes
  text = text.replace(/\{\{<\s*product\s+image\s*>\}\}/gi, 'pucora/pucora-ce:latest')
  text = text.replace(/\{\{<\s*product\s+minor_version\s*>\}\}/gi, '2.0')

  // remaining self-closing and block shortcodes
  text = text.replace(/\{\{<\s*[^>]+\s*>\}\}[\s\S]*?\{\{<\s*\/[^>]+\s*>\}\}/gi, '')
  text = text.replace(/\{\{<\s*[^>]+\s*>\}\}/gi, '')
  text = text.replace(/\{\{<\s*[^>]+\s*\/>\}\}/gi, '')

  // Rewrite internal doc links
  text = text.replace(/\]\(\/docs\/([^)]+)\/?\)/g, '](/docs/$1)')
  text = text.replace(/\]\(\/download\/\)/g, '](/downloads)')
  text = text.replace(/\]\(\/overview\/([^)]+)\/?\)/g, '](/docs/overview/$1)')

  // Strip HTML img tags with broken paths, keep alt as text note
  text = text.replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, (_, src) => {
    if (src.startsWith('http')) return `![image](${src})`
    return `\n\n*[Image: ${src}]*\n\n`
  })

  return text.trim()
}

function walkMdFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'README.md') continue
    const rel = base ? `${base}/${entry.name}` : entry.name
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkMdFiles(full, rel))
    } else if (entry.name.endsWith('.md')) {
      files.push(rel)
    }
  }

  return files
}

function getSection(slug) {
  if (!slug) return 'home'
  return slug.split('/')[0]
}

function buildNav(pages) {
  const sections = new Map()

  for (const page of pages) {
    const section = getSection(page.slug)
    if (!sections.has(section)) {
      sections.set(section, {
        id: section,
        label: SECTION_LABELS[section] ?? section.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        pages: [],
      })
    }
    sections.get(section).pages.push(page)
  }

  const sectionOrder = [
    'home',
    'overview',
    'configuration',
    'design',
    'developer',
    'deploying',
    'backends',
    'endpoints',
    'service-settings',
    'authorization',
    'security',
    'throttling',
    'telemetry',
    'logging',
    'extending',
    'grpc',
    'websockets',
    'async',
    'non-rest-connectivity',
    'request-response-manipulation',
    'benchmarks',
    'faq',
  ]

  return sectionOrder
    .filter((id) => sections.has(id))
    .map((id) => {
      const section = sections.get(id)
      section.pages.sort((a, b) => {
        if (a.weight !== b.weight) return a.weight - b.weight
        return a.title.localeCompare(b.title)
      })
      return section
    })
}

function main() {
  if (!fs.existsSync(DOCS_SRC)) {
    console.error(`Docs source not found: ${DOCS_SRC}`)
    process.exit(1)
  }

  fs.rmSync(DOCS_OUT, { recursive: true, force: true })
  fs.mkdirSync(DOCS_OUT, { recursive: true })

  const files = walkMdFiles(DOCS_SRC)
  const pages = []

  for (const file of files) {
    const raw = fs.readFileSync(path.join(DOCS_SRC, file), 'utf8')
    const { data, content } = matter(raw)
    const slug = slugFromFile(file)
    const processed = preprocessMarkdown(content)
    const outFile = slug ? `${slug}.md` : '_home.md'
    const outPath = path.join(DOCS_OUT, outFile)

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, processed)

    pages.push({
      slug: slug || 'home',
      file: outFile,
      title: data.linktitle || data.title || slug.split('/').pop() || 'Documentation',
      description: data.description || '',
      weight: typeof data.weight === 'number' ? data.weight : 100,
      section: getSection(slug),
    })
  }

  const nav = buildNav(pages)
  const manifest = { pages, nav, generatedAt: new Date().toISOString() }

  fs.writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2))
  console.log(`Processed ${pages.length} docs → ${DOCS_OUT}`)
}

main()

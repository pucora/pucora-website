import { Link } from 'react-router-dom'
import { brand } from '../../content/brand'

export function AnnouncementBar() {
  return (
    <div className="border-b border-border bg-surface text-center text-xs text-subtle">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2">
        <span>{brand.announcement.text}</span>
        <Link to={brand.announcement.link} className="font-medium text-link hover:underline">
          {brand.announcement.linkText} ›
        </Link>
      </div>
    </div>
  )
}

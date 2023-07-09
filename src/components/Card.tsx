import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

interface CardProps {
  uuid: string
  title: string
  subtitle: string
  author: string
  firstPublicationDate: string
}
export function Card({
  uuid,
  title,
  subtitle,
  author,
  firstPublicationDate,
}: CardProps) {
  return (
    <Link href={`posts/${uuid}`} className="space-y-4 group transition-colors">
      <div className="flex items-center gap-7 text-sm text-gray-300">
        <time>{formatDate(firstPublicationDate)}</time>
        <span>{author}</span>
      </div>
      <h2 className="text-2xl font-bold group-hover:text-blue-500">{title}</h2>
      <p>{subtitle}</p>
    </Link>
  )
}

import Link from 'next/link'

interface CardProps {
  id: string
}
export function Card({ id }: CardProps) {
  return (
    <Link href={`posts/${id}`} className="space-y-4 group transition-colors">
      <div className="flex items-center gap-7 text-sm text-gray-300">
        <time>03 de julho de 2023</time>
        <span>Thiago Marinho</span>
      </div>
      <h2 className="text-2xl font-bold group-hover:text-blue-500">
        Mapas com React usando Leaflet
      </h2>
      <p>👋 Introdução</p>
    </Link>
  )
}

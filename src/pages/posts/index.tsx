import { Card } from '@/components/Card'

export default function Posts() {
  return (
    <main className="max-w-4xl mx-auto px-8">
      <div className="flex flex-col max-w-4xl mx-auto mt-20 cards">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card id="123" key={i} />
        ))}
      </div>
    </main>
  )
}

import { Card } from '@/components/Card'
import { createClient } from '@/prismicio'
import { GetStaticProps } from 'next'

interface Post {
  uid: string
  first_publication_date: string
  data: {
    title: string
    subtitle: string
    author: string
  }
}

interface PostPagination {
  next_page?: string
  results: Post[]
}

interface HomeProps {
  postsPagination: PostPagination
}

export default function Posts({ postsPagination }: HomeProps) {
  return (
    <main className="max-w-4xl mx-auto px-8">
      <div className="flex flex-col max-w-4xl mx-auto mt-20 cards">
        {postsPagination.results.map((post, i) => (
          <Card
            key={i}
            uuid={post.uid}
            title={post.data.title}
            subtitle={post.data.subtitle}
            author={post.data.author}
            firstPublicationDate={post.first_publication_date}
          />
        ))}
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  const postsResponse = await client.getAllByType('posts', {
    fetch: ['post.title', 'post.subtitle', 'post.author'],
    pageSize: 1,
  })

  const posts = postsResponse.map((post) => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    }
  })

  return {
    props: {
      postsPagination: {
        next_page: 0,
        results: posts,
      },
    },
    revalidate: 60 * 5, // Atualiza o banco a cada 5 minutos
  }
}

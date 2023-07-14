import { Card } from '@/components/Card'
import { createClient } from '@/prismicio'
import { GetStaticProps } from 'next'
import { useState } from 'react'

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
  const [posts, setPosts] = useState(postsPagination.results)
  const [loadMorePost, setLoadMorePost] = useState(postsPagination.next_page)

  const morePost = async () => {
    const postResult = await fetch(loadMorePost!)
    const dataPost = await postResult.json()

    const newPost = [...posts, ...dataPost.results]
    setLoadMorePost(dataPost.next_page)
    setPosts(newPost)
  }

  return (
    <main className="max-w-4xl mx-auto px-8">
      <div className="flex flex-col max-w-4xl mx-auto mt-20 cards">
        {posts.map((post, i) => (
          <Card
            key={i}
            uuid={post.uid}
            title={post.data.title}
            subtitle={post.data.subtitle}
            author={post.data.author}
            firstPublicationDate={post.first_publication_date}
          />
        ))}

        {loadMorePost && (
          <div className="mx-auto">
            <button
              className="text-sm font-bold hover:text-blue-500 bg-transparent mt-16"
              type="button"
              onClick={morePost}
            >
              Carregar mais posts
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  const postsResponse = await client.getByType('posts', {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    page: 1,
    pageSize: 1,
  })

  // console.log(JSON.stringify(postsResponse, null, 2))

  const posts = postsResponse.results.map((post) => {
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
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
    revalidate: 60 * 5, // 5 minutes
  }
}

import { createClient } from '@/prismicio'
import { RichTextField } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
  slug: string
}

interface IPost {
  uid: string
  first_publication_date: string | null
  data: {
    title: string
    banner: {
      url: string
    }
    author: string
    content: {
      heading: string
      body: RichTextField
    }[]
  }
}

interface PostProps {
  post: IPost
  nextPost: IPost | null
  prevPost: IPost | null
}

export default function Post({ post }: PostProps) {
  console.log(post)
  return (
    <article>
      <div>{/* <img src={post.data.banner.url} alt="banner" /> */}</div>
      <div className="content-global">
        <header>
          <h1>{post.data.title}</h1>
        </header>
        <div>
          {post.data.content.map((item) => (
            <div key={item.heading}>
              <h3>{item.heading}</h3>
              {<PrismicRichText field={item.body} />}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
export const getStaticProps: GetStaticProps<any> = async ({
  previewData,
  params,
}) => {
  const { slug } = params as Params
  const client = createClient({ previewData })

  const post = await client.getByUID('posts', slug)
  const latestPost = await client.getAllByType('posts', {
    limit: 3,
    orderings: [
      { field: 'my.posts.publishDate', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  })

  console.log(post)

  return {
    props: {
      post,
      latestPost,
    },
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient()

  const posts = await client.getAllByType('posts')

  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.uid,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

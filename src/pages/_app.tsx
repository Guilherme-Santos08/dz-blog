/* eslint-disable react/no-unknown-property */
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { fontSans } from '@/lib/fonts'
import '@/styles/globals.css'
import { Header } from '@/components/Header'
import { PrismicProvider } from '@prismicio/react'
import Link from 'next/link'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName, linkResolver } from '@/prismicio'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dz.Blog</title>
      </Head>

      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>

      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props}> </a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </>
  )
}

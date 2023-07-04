/* eslint-disable react/no-unknown-property */
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { fontSans } from '@/lib/fonts'
import '@/styles/globals.css'

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
      <Component {...pageProps} />
    </>
  )
}

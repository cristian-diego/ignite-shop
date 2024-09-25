import { getCssText } from '@/styles'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Ignite Shop</title>

        <link
          href='https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,700;1,700&family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />

        <style
          id='stitches'
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

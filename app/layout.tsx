import type { Metadata, Viewport } from 'next'
import './globals.css'
import { robotoSlab } from './fonts'
import styles from './page.module.css'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

export const viewport: Viewport = {
  themeColor: '#0c0d11',
}

export const metadata: Metadata = {
  // TODO: smaller image and add twitter tags
  metadataBase: new URL(process.env.BASE_URL!),
  title: 'FoxLink | URL Shortener',
  description: 'FoxLink - простой и быстрый сокращатель ссылок',
  openGraph: {
    title: 'FoxLink | URL Shortener',
    description:
      'FoxLink - быстрый и бесплатный сокращатель ссылок с историей переходов по ссылкам',
    url: 'https://fxnk.ru',
    siteName: 'FoxLink',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'FoxLink | URL Shortener',
    description:
      'FoxLink - быстрый и бесплатный сокращатель ссылок с историей переходов по ссылкам',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${robotoSlab.variable} ${robotoSlab.className}`}>
        <div className={styles.container}>
          <Navbar />
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  )
}

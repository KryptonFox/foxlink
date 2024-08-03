import type { Metadata } from 'next'
import './globals.css'
import { robotoSlab } from './fonts'
import styles from './page.module.css'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

export const metadata: Metadata = {
  title: 'FoxLink | URL Shortener',
  description: 'FoxLink - простой и быстрый сокращатель ссылок',
  openGraph: {
    title: 'FoxLink | URL Shortener',
    description: 'FoxLink - быстрый и бесплатный сокращатель ссылок с историей переходов по ссылкам',
    url: 'https://fxnk.ru',
    siteName:'FoxLink',
    type:'website',
    locale:'ru_RU'
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

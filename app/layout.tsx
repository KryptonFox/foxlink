import type { Metadata } from 'next'
import './globals.css'
import 'dotenv/config'
import { robotoSlab } from './fonts'
import styles from './page.module.css'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

export const metadata: Metadata = {
  title: 'FoxLink | URL Shortener',
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

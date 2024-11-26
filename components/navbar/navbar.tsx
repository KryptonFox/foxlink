import Link from 'next/link'
import styles from './navbar.module.css'
import { Suspense } from 'react'
import Avatar from '@/components/navbar/avatar'
import LoadingCircle from '@/components/layout/loading-circle'

export default function Navbar() {
  return (
    <nav>
      <div className={styles.nav1}>
        <Link href="/">
          <h1>FoxLink</h1>
        </Link>
        <div className={styles.line}></div>
        <Suspense fallback={<LoadingCircle />}>
          <Avatar />
        </Suspense>
      </div>
      <Link href="/">
        <p className={styles.subh}>Сокращатель ссылок</p>
      </Link>
    </nav>
  )
}

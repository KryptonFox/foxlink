import styles from './page.module.css'
import { Suspense } from 'react'
import LinkCardList from '@/components/links/link-card-list'
import Loading from './loading'

export default async function page() {
  return (
    <main>
      <h1 className={styles.header}>Ваши ссылки</h1>
      <Suspense fallback={<Loading/>}>
        <LinkCardList/>
      </Suspense>
    </main>
  )
}

import styles from './page.module.css'
import LinkCreatorWrapper from '@/components/links/link-creator-wrapper'
import { Suspense } from 'react'
import LoadingCircle from '@/components/layout/loading-circle'

export default function Home() {
  return (
    <main className={styles.homeMain}>
      <Suspense fallback={<LoadingCircle />}>
        <LinkCreatorWrapper />
      </Suspense>
    </main>
  )
}

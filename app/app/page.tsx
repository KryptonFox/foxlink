import LinkCreator from '@/components/links/link-creator'
import { cookies } from 'next/headers'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.homeMain}>
      <LinkCreator auth={cookies().has('token')} />
    </main>
  )
}

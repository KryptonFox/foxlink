import Link from "next/link";
import styles from './page.module.css'

export const dynamic = 'force-static'

export default function page() {
  return (
    <main className={styles.container}>
      <h1>Такой ссылки не существует</h1>
      <p className={styles.tut}><span>Вы всегда можете создать её </span><Link href='/'>тут</Link></p>
    </main>
  )
}

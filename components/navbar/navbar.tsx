import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import { cookies } from 'next/headers'
import LoginButton from '@/components/navbar/login-button'
import Profile from './profile'

export default function Navbar() {
  return (
    <nav>
      <div className={styles.nav1}>
        <Link href="/">
          <h1>FoxLink</h1>
        </Link>
        <div className={styles.line}></div>
        {cookies().has('token') ? <Profile /> : <LoginButton />}
      </div>
      <Link href="/">
        <p className={styles.subh}>Сокращатель ссылок</p>
      </Link>
    </nav>
  )
}

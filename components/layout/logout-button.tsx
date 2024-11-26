'use client'
import logout from '@/actions/logout'
import styles from './layout.module.css'
import { type FC } from 'react'

const LogoutButton: FC = () => (
  <button className={styles.logoutButton} onClick={async () => logout()}>
    Выйти
  </button>
)

export default LogoutButton

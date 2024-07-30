'use client'

import logout from "@/actions/logout"
import styles from '../styles/footer.module.css'


export default function LogoutButton() {

  return (
    <button className={styles.logoutButton} onClick={async () => logout()}>Выйти</button>
  )  
}
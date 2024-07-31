import { cookies } from "next/headers";
import LogoutButton from "./logout-button";
import Copyright from "./copyright";
import styles from '../styles/footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {cookies().has('token') && <LogoutButton />}
      <Copyright />
    </footer>
  )
}
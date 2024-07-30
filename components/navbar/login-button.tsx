import styles from '../styles/components.module.css'

export default function LoginButton() {
  const url = new URL(
    `?client_id=${process.env.D_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(new URL('/auth', process.env.BASE_URL).toString())}&scope=identify`,
    'https://discord.com/oauth2/authorize',
  )
  return (
    <a href={url.toString()} className={styles.loginButton}>
      Войти через Discord
    </a>
  )
}

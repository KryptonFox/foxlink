import styles from '../styles/components.module.css'

export default function LoginButton() {
  return (
    <a
      href={`https://discord.com/oauth2/authorize?client_id=${process.env.D_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=identify`}
      className={styles.loginButton}
    >
      Войти через Discord
    </a>
  )
}

import { useFormStatus } from 'react-dom'
import styles from '@/components/styles/link-creator.module.css'

interface Props {
  auth: boolean
  state: { message?: string; url?: string }
}

export default function SubmitButton({ auth, state }: Props) {
  const { pending } = useFormStatus()
  return (
    <>
      <button type="submit" disabled={!auth || pending}>
        Сократить!
      </button>
      {(pending && <p className={styles.pendingMessage}>Загрузка...</p>) ||
        (state.message && (
          <p className={`${styles.errorMessage}`}>{state.message}</p>
        ))}
    </>
  )
}

'use client'
import createLink from '@/actions/createLink'
import { useFormState } from 'react-dom'
import styles from '../styles/link-creator.module.css'
import { useEffect } from 'react'

export default function LinkCreator({ auth }: { auth: boolean }) {
  const [state, formAction] = useFormState(createLink, { message: '' })

  useEffect(() => {
    if (state.url) {
      navigator.clipboard.writeText(state.url)
    }
  }, [state.url])

  return (
    <div className={styles.container}>
      <form className={styles.linkCreatorForm} action={formAction}>
        <div className={styles.inputContainer}>
          {!auth && (
            <div className={styles.tooltip}>
              Войдите, чтобы начать пользоваться
            </div>
          )}
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com"
            disabled={!auth}
          />
          <div className={styles.linkNameInputContainer}>
            <label
              className={!auth ? styles.labelDisabled : ''}
              htmlFor="linkName"
            >
              https://fxnk.ru/
            </label>
            <input
              type="text"
              id="linkName"
              name="linkName"
              placeholder="name"
              disabled={!auth}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" disabled={!auth}>
            Сократить!
          </button>
          {state.message && (
            <p className={`${styles.errorMessage}`}>{state.message}</p>
          )}
        </div>
      </form>
      {state.url && <a href={state.url}>{state.url}</a>}
    </div>
  )
}

'use client'
import createLink from '@/actions/createLink'
import { useFormState } from 'react-dom'
import styles from '../styles/link-creator.module.css'
import { useEffect } from 'react'
import SubmitButton from '@/components/links/submit-button'

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
              placeholder="name (опционально)"
              disabled={!auth}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <SubmitButton auth={auth} state={state} />
        </div>
      </form>
      {state.url && (
        <div className={styles.linkPreview}>
          <p>Ссылка успешно создана и скопирована в буфер обмена</p>
          <a href={state.url}>{state.url}</a>
        </div>
      )}
    </div>
  )
}

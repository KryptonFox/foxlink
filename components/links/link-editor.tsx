'use client'

import deleteLink from '@/actions/deleteLink'
import editLink from '@/actions/editLink'
import { useFormState } from 'react-dom'
import styles from '../styles/link-editor.module.css'

interface Link {
  id: string
  url: string
  linkName: string
  authorId: string
}

export default function LinkEditor({
  link,
  baseURL,
}: {
  link: Link
  baseURL: string
}) {
  function copyLink() {
    navigator.clipboard.writeText(new URL(link.linkName, baseURL).toString())
  }
  const [state, formAction] = useFormState(editLink, { message: '' })
  return (
    <div className={styles.container}>
      <form className={styles.form} action={formAction}>
        <div>
          <label htmlFor="">https://fxnk.ru/</label>
          <input
            type="text"
            id="linkName"
            name="linkName"
            defaultValue={link.linkName}
          />
          <button onClick={(e) => {e.preventDefault(); copyLink()}} className={styles.copyButton}>
            <span className="material-symbols-outlined">content_copy</span>
          </button>
          <button
            onClick={async (e) => {e.preventDefault(); await deleteLink(link.id)}}
            className={styles.delButton}
          >
            <span className="material-symbols-outlined">delete_forever</span>
          </button>
        </div>
        <div>
          <input type="url" id="url" name="url" defaultValue={link.url} />
        </div>
        <div>
          <button type="submit">Сохранить</button>
        </div>
        {state.message && <p>{state.message}</p>}
      </form>
    </div>
  )
}

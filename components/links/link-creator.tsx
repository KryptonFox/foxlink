'use client'

import createLink from '@/actions/createLink'
import { useFormState } from 'react-dom'
import styles from '../styles/link-creator.module.css'
import React, { useEffect, useState } from 'react'

export default function LinkCreator({ auth }: { auth: boolean }) {
  const [state, formAction] = useFormState(createLink, { message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.url || state.message) {
      setLoading(false);
    }
  }, [state.url, state.message]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formAction(formData)
  };

  return (
    <div className={styles.container}>
      <form className={styles.linkCreatorForm} onSubmit={handleSubmit}>
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
          {loading && (
            <p className={styles.loadingMessage}>Подождите секунду...</p>
          )}
          {!loading && state.message && (
            <p className={styles.errorMessage}>{state.message}</p>
          )}
        </div>
      </form>
      {!loading && state.url && <a href={state.url}>{state.url}</a>}
    </div>
  );
}
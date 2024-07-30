'use client'

import deleteLink from "@/actions/deleteLink"

interface Link {
  id: string
  url: string
  linkName: string
  authorId: string
}

export default function LinkEditor({ link, baseURL }: { link: Link; baseURL: string }) {
  function copyLink() {
    navigator.clipboard.writeText(new URL(link.linkName, baseURL).toString())
  }
  return (
    <>
      <form action="">
        <div>
          <label htmlFor="">https://fxnk.ru/</label>
          <input type="text" defaultValue={link.linkName} />
        </div>
        <input type="text" defaultValue={link.url} />
        <div>
          <button type="submit">Сохранить</button>
        </div>
      </form>
      <button onClick={() => copyLink()}>Скопировать ссылку</button>
      <button onClick={async () => await deleteLink(link.id)}>
        Удалить ссылку
      </button>
    </>
  )
}

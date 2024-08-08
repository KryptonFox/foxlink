import { Suspense } from 'react'
import styles from './page.module.css'
import Loading from './loading'
import LinkEditor from '@/components/links/link-editor'
import LinkVisits from '@/components/links/link-visits'
import prisma from '@/prisma/prisma'
import getUserId from '@/actions/getUserId'
import { redirect } from 'next/navigation'

export default async function LinkPage({ params }: { params: { id: string } }) {
  const linkInfo = await prisma.link.findUnique({
    where: { id: params.id },
  })
  // если ссылка не найдена то редирект на главную
  if (!linkInfo)
    redirect(new URL('/', process.env.BASE_URL!).toString())
  // если ссылка принадлежит другому пользователю, то редирект на главную
  if (linkInfo!.authorId !== await getUserId())
    redirect(new URL('/', process.env.BASE_URL!).toString())

  return (
    <main>
      <h1 className={styles.header}>Редактор ссылки</h1>
      <Suspense fallback={<Loading />}>
        <LinkEditor link={linkInfo!} baseURL={process.env.BASE_URL!} />
      </Suspense>
      <h1 className={styles.header}>История посещений</h1>
      <Suspense fallback={<Loading />}>
        <LinkVisits id={linkInfo?.id!} />
      </Suspense>
    </main>
  )
}

import { PrismaClient } from '@prisma/client'
import { Suspense } from 'react'
import styles from './page.module.css'
import Loading from './loading'
import LinkEditor from '@/components/links/link-editor'
import LinkVisits from '@/components/links/link-visits'
import prisma from '@/prisma/prisma'

export default async function LinkPage({ params }: { params: { id: string } }) {
  const linkInfo = await prisma.link.findUnique({
    where: { id: params.id },
  })
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

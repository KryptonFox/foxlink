import LinkCard from './link-card'
import styles from '../styles/components.module.css'
import getUserId from '@/actions/getUserId'
import prisma from '@/prisma/prisma'

export default async function LinkCardList() {
  const links = await prisma.user.findUnique({
    where: {
      id: await getUserId(),
    },
    select: {
      links: true,
    },
  })
  return (
    <div className={styles.linksContainer}>
      {links?.links.map((link) => <LinkCard key={link.id} link={link} />)}
    </div>
  )
}

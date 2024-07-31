import Link from "next/link"
import styles from '../styles/link-card.module.css'

interface link {
  id: string
  url: string
  linkName: string
  authorId: string
}

export default function LinkCard({ link }: { link: link }) {
  return <Link className={styles.linkCard} href={`/me/link/${link.id}`}>
    <p>{link.linkName}</p>
    <p>{link.url}</p>
  </Link>
}

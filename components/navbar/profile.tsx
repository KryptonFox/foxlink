import getUserId from '@/actions/getUserId'
import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import prisma from '@/prisma/prisma'

export default async function Profile() {
  const userId = await getUserId()
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  return (
    <Link href='/me' className={styles.profile}>
      <p>{user?.username}</p>
      <Image
        src={`https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.avatar}?size=64`}
        alt="avatar"
        width={57}
        height={57}
      />
    </Link>
  )
}

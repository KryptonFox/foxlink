import getUserId from '@/actions/getUserId'
import prisma from '@/prisma/prisma'
import Link from 'next/link'
import styles from '@/components/navbar/navbar.module.css'
import Image from 'next/image'
import { type FC } from 'react'
import { cookies } from 'next/headers'

const UserAvatar = async () => {
  const userId = await getUserId()
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  return (
    <Link href="/me" className={styles.profile}>
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

const LoginButton: FC = () => {
  const url = new URL(
    `?client_id=${process.env.D_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(new URL('/auth', process.env.BASE_URL).toString())}&scope=identify`,
    'https://discord.com/oauth2/authorize',
  )
  return (
    <a href={url.toString()} className={styles.loginButton}>
      Войти через Discord
    </a>
  )
}

export default function Avatar() {
  return <>{cookies().has('token') ? <UserAvatar /> : <LoginButton />}</>
}

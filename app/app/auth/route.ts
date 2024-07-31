import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { SignJWT } from 'jose'
import prisma from '@/prisma/prisma'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.redirect(process.env.BASE_URL!)

  // получение токена
  const oauth = await fetch('https://discord.com/api/v10/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: new URL('/auth', process.env.BASE_URL!).toString(),
      client_id: process.env.D_CLIENT_ID!,
      client_secret: process.env.D_CLIENT_SECRET!,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const oauthData = await oauth.json()

  // получение данных пользователя
  const user = await fetch('https://discord.com/api/v10/users/@me', {
    headers: {
      authorization: `${oauthData.token_type} ${oauthData.access_token}`,
    },
  })
  const userData = await user.json()

  // запись в базу данных
  const dbUser = await prisma.user.upsert({
    where: {
      discordId: userData.id as string,
    },
    update: {
      username: userData.global_name as string,
      avatar: userData.avatar as string,
    },
    create: {
      discordId: userData.id as string,
      username: userData.global_name as string,
      avatar: userData.avatar as string,
    },
  })

  // создание jwt
  const jwt = await new SignJWT({ id: dbUser.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(process.env.TOKEN_SECRET!))
  // ответ
  const response = NextResponse.redirect(process.env.BASE_URL!)
  // установка куки
  response.cookies.set('token', jwt, {
    httpOnly: true,
    maxAge: 604800,
    secure: true,
  })
  return response
}

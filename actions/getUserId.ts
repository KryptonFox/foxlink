'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export default async function getUserId(): Promise<string> {
  // работоспособность токена проверяется в middleware
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
  const { payload } = await jwtVerify(cookies().get('token')?.value!, secret)
  return payload.id as string
}

'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function getUserId(): Promise<string> {
  // работоспособность токена проверяется в middleware
  try {

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
    const { payload } = await jwtVerify(cookies().get('token')?.value!, secret)
    return payload.id as string
  } catch (e) {
    redirect(new URL('/', process.env.BASE_URL!).toString())
  }
}

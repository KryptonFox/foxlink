'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function logout() {
  cookies().delete('token')
  redirect(new URL('/', process.env.BASE_URL!).toString())
}

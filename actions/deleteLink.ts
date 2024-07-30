'use server'

import prisma from '@/prisma/prisma'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

export default async function deleteLink(id: string): Promise<void> {
  await prisma.link.delete({ where: { id: id } })
  redirect('/me')
}

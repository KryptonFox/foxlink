import prisma from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface VisitData {
  ip: string
  city?: string
  country?: string
  link: { connect: { id: string } }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { link: string } },
): Promise<NextResponse<unknown>> {

  // получение информации о ссылке из бд
  const link = await prisma.link.findUnique({
    where: { linkName: params.link.toLowerCase() },
  })
  // если ссылка не существует то перекидываем на страницу ошибки
  if (!link) return NextResponse.redirect(new URL('/notfound', request.url))
  // получение информации о том кто перешёл по ссылке
  let visitData: VisitData = {
    ip: request.headers.get('X-Forwarded-For')!.toString(),
    link: { connect: { id: link.id } },
  }
  if (request.ip) {
    // хостинг Vercel предоставляет информацию о геолокации
    visitData.ip = request.ip
    visitData.city = request.geo?.city!
    visitData.country = request.geo?.country!
  } else {
    // если хостинг не Vercel то получаем данные о геолокации через ip-api.com
    const res = await fetch(
      `http://ip-api.com/json/${visitData.ip}?fields=status,country,city,query`,
    )
    const json = await res.json()
    if (json.status === 'success') {
      visitData.ip = json.query
      visitData.city = json.city
      visitData.country = json.country
    }
  }
  // запись данных о посещении в бд
  await prisma.visit.create({ data: visitData })

  // перекидывание на страницу
  return NextResponse.redirect(link.url)
}

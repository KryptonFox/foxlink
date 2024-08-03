'use server'

import getUserId from './getUserId'
import prisma from '@/prisma/prisma'

const linkNameBlacklist = ['home', 'lol', 'me', 'notfound']
const linkNameMinLength = 2
const linkNameRegExp = /^[0-9a-zA-Z?%]+$/gm
const linkNameGeneratorCharset = '0123456789qwertyuiopasdfghjklzxcvbnm?%'
const linkNameGeneratorStringLength = 3
const rand = () =>
  Math.floor(Math.random() * (linkNameGeneratorCharset.length - 1))

export default async function createLink(
  prevState: any,
  formData: FormData,
): Promise<{ message?: string; url?: string }> {
  let url = formData.get('url')?.toString()
  let linkName = formData.get('linkName')?.toString()
  // url validaton
  if (!url) return { message: 'Введите URL' }
  try {
    url = new URL(url).toString()
  } catch (e) {
    return { message: 'Неправильный URL' }
  }
  // linkName validation or creation
  if (linkName) {
    // validate
    if (linkNameBlacklist.includes(linkName))
      return { message: 'Имя ссылки запрещено' }
    if (!linkNameRegExp.test(linkName))
      return { message: 'Разрешены только цифры, латиница, ? и %' }
    if (linkName.length < linkNameMinLength)
      return { message: 'Короткое имя ссылки' }
    if (await prisma.link.findUnique({ where: { linkName: linkName } }))
      return { message: 'Имя ссылки занято' }
  } else {
    // create
    do {
      linkName = ''
      for (let i = 0; i < linkNameGeneratorStringLength; i++) {
        linkName += linkNameGeneratorCharset[rand()]
      }
    } while (await prisma.link.findUnique({ where: { linkName: linkName } }))
  }
  // database writing
  const userId = await getUserId()
  await prisma.link.create({
    data: {
      url: url,
      linkName: linkName.toLowerCase(),
      author: { connect: { id: userId } },
    },
  })

  return { url: new URL(linkName, process.env.BASE_URL).toString() }
}

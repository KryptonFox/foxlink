'use server'

import prisma from '@/prisma/prisma'

const linkNameBlacklist = ['home', 'lol', 'me', 'notfound']
const linkNameMinLength = 2
const linkNameRegExp = /^[0-9a-zA-Z._\-]+$/gm

interface Link {
  id: string
  url: string
  linkName: string
  authorId: string
}

export default async function editLink(
  link: Link,
  prevState: any,
  formData: FormData
): Promise<{ message: string, link?: Link }> {
  // получение данных из формы
  let url = formData.get('url')?.toString().trim()
  let linkName = formData.get('linkName')?.toString().trim()
  if (!url) return { message: 'Введите URL' }
  if (!linkName) return { message: 'Введите имя ссылки' }

  // URL validation
  if (url !== link.url) {
    try {
      url = new URL(url).toString()
    } catch (e) {
      return { message: 'Неправильный URL' }
    }
  }

  // linkName validation
  if (linkName !== link.linkName) {
    if (linkNameBlacklist.includes(linkName))
      return { message: 'Имя ссылки запрещено' }
    if (!linkNameRegExp.test(linkName))
      return { message: 'Разрешены только цифры, латиница, -, _ и .' }
    if (linkName.length < linkNameMinLength)
      return { message: 'Короткое имя ссылки' }
    if (await prisma.link.findUnique({ where: { linkName: linkName } }))
      return { message: 'Имя ссылки занято' }
  }

  // db writing
  const newLink: Link = await prisma.link.update({
    where: { id: link.id },
    data: {
      linkName: linkName, url: url
    }
  })

  return { message: 'Ссылка изменена', link: newLink }
}

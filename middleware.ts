import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  //  проверка токена
  if (request.cookies.has('token')) {
    try {
      // если тут что-то сломается, то токен не правильный и он удалиться
      // получаем id из jwt
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
      await jwtVerify(request.cookies.get('token')?.value!, secret)
    } catch (e) {
      // ошибка (токен не верный)
      // удаляем токен
      const response = NextResponse.redirect(process.env.BASE_URL!)
      response.cookies.delete('token')
      return response
    }
  }
  return NextResponse.next()
}

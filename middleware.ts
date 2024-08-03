import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const authUserOnlyURLs = /\/me(\/.*|)/gm

export const config: MiddlewareConfig = {
  matcher: ['/me/:path*', '/']
}

export async function middleware(request: NextRequest) {
  console.log('midl')
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
  } else {
    // нет токена
    if (authUserOnlyURLs.test(request.nextUrl.pathname))
      return NextResponse.redirect(process.env.BASE_URL!)
    }
  return NextResponse.next()
}

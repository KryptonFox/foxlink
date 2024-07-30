import Link from "next/link";

export default function page() {
  return (
    <main>
      <p>Такой ссылки не существует</p>
      <p><span>Вы всегда можете создать её </span><Link href='/'>тут</Link></p>
    </main>
  )
}

import prisma from '@/prisma/prisma'
import styles from '../styles/link-visits.module.css'

export default async function LinkVisits({ id }: { id: string }) {
  const visits = await prisma.link.findUnique({
    where: { id: id },
    select: { visits: true },
  })
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата</th>
            {/* <th>IP</th> */}
            <th>Страна</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          {visits?.visits.map((visit) => {
            const date = new Date(visit.timestamp).toLocaleString('ru-RU', {
              timeZone: 'Europe/Moscow',
            })
            return (
              <tr key={visit.id}>
                <td>{date}</td>
                {/* <td>{visit.ip}</td> */}
                <td>{visit.country || 'Неизвестно'}</td>
                <td>{visit.city || 'Неизвестно'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

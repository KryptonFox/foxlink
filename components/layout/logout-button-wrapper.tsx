import { cookies } from 'next/headers'
import LogoutButton from '@/components/layout/logout-button'

const LogoutButtonWrapper = () => (
  <>{cookies().has('token') && <LogoutButton />}</>
)

export default LogoutButtonWrapper

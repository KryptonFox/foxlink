import { cookies } from 'next/headers'
import LinkCreator from '@/components/links/link-creator'

export const LinkCreatorWrapper = () => {
  return (
    <>
      <LinkCreator auth={cookies().has('token')} />
    </>
  )
}

export default LinkCreatorWrapper

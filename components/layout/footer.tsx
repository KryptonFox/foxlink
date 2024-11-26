import styles from './layout.module.css'
import { Suspense } from 'react'
import LogoutButtonWrapper from '@/components/layout/logout-button-wrapper'
import LoadingCircle from '@/components/layout/loading-circle'

const Footer = () => (
  <footer className={styles.footer}>
    <Suspense fallback={<LoadingCircle />}>
      <LogoutButtonWrapper />
    </Suspense>
    <span className={styles.copyright}>@2024 fxnk.ru</span>
  </footer>
)

export default Footer

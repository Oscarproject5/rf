'use client'

import { motion } from 'framer-motion'
import { useMobile } from '@/hooks/useMobile'
import { useHaptics } from '@/hooks/useHaptics'
import styles from './FloatingActionButton.module.scss'

interface FloatingActionButtonProps {
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
}

export default function FloatingActionButton({
  className = '',
  position = 'bottom-right'
}: FloatingActionButtonProps) {
  const { isMobile } = useMobile()
  const { impact } = useHaptics()

  const handleCallClick = () => {
    impact('medium')
    window.location.href = 'tel:+19565791750'
  }

  if (!isMobile) return null

  return (
    <div 
      className={`${styles.fabContainer} ${styles[position]} ${className}`}
    >
      {/* Main FAB - Phone Only */}
      <motion.button
        className={styles.fab}
        onClick={handleCallClick}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Call (956) 579-1750"
      >
        <PhoneIcon />
      </motion.button>
    </div>
  )
}


// Phone Icon Component
function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
    </svg>
  )
}
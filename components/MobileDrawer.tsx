'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useMobile } from '@/hooks/useMobile'
import { useHaptics } from '@/hooks/useHaptics'
import styles from './MobileDrawer.module.scss'

interface DrawerItem {
  id: string
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  badge?: string
}

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: DrawerItem[]
  title?: string
  footer?: React.ReactNode
}

export default function MobileDrawer({
  isOpen,
  onClose,
  items,
  title = 'Menu',
  footer
}: MobileDrawerProps) {
  const { isMobile } = useMobile()
  const { selection, impact } = useHaptics()
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleItemClick = (item: DrawerItem) => {
    selection()
    
    if (item.onClick) {
      item.onClick()
    } else if (item.href) {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    onClose()
  }

  const handleDragStart = () => {
    setIsDragging(true)
    impact('light')
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false)
    
    // Close drawer if dragged left significantly
    if (info.offset.x < -100 || info.velocity.x < -500) {
      onClose()
    }
  }

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          {/* Drawer */}
          <motion.div
            ref={dragRef}
            className={styles.drawer}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 40,
              mass: 0.8
            }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={styles.item}
                  onClick={() => handleItemClick(item)}
                  whileTap={{ scale: 0.98, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.icon && (
                    <div className={styles.itemIcon}>
                      {item.icon}
                    </div>
                  )}
                  <span className={styles.itemLabel}>{item.label}</span>
                  {item.badge && (
                    <div className={styles.badge}>
                      {item.badge}
                    </div>
                  )}
                  <div className={styles.arrow}>
                    <ArrowIcon />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            {footer && (
              <div className={styles.footer}>
                {footer}
              </div>
            )}

            {/* Drag indicator */}
            <div className={styles.dragIndicator}>
              <div className={styles.dragHandle} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Close Icon Component
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Arrow Icon Component
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
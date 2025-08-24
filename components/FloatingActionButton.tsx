'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobile } from '@/hooks/useMobile'
import { useHaptics } from '@/hooks/useHaptics'
import { useViewport } from '@/hooks/useViewport'
import styles from './FloatingActionButton.module.scss'

interface ActionItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
  href?: string
  color?: string
}

interface FloatingActionButtonProps {
  actions: ActionItem[]
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
}

export default function FloatingActionButton({
  actions,
  className = '',
  position = 'bottom-right'
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useMobile()
  const { impact, selection } = useHaptics()
  const { safeAreaBottom, isScrollingDown } = useViewport()

  const toggleMenu = () => {
    impact(isOpen ? 'light' : 'medium')
    setIsOpen(!isOpen)
  }

  const handleActionClick = (action: ActionItem) => {
    selection()
    action.onClick()
    setIsOpen(false)
  }

  if (!isMobile) return null

  return (
    <div 
      className={`${styles.fabContainer} ${styles[position]} ${className}`}
      style={{
        bottom: `${safeAreaBottom + 80}px`, // Add space above bottom nav
        transform: isScrollingDown ? 'translateY(100px)' : 'translateY(0)',
        transition: 'transform 0.3s ease'
      }}
    >
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <div className={styles.actionsContainer}>
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                className={styles.actionItem}
                style={{ backgroundColor: action.color || '#8b5cf6' }}
                onClick={() => handleActionClick(action)}
                initial={{ 
                  scale: 0, 
                  y: 20,
                  opacity: 0
                }}
                animate={{ 
                  scale: 1, 
                  y: -(index + 1) * 60,
                  opacity: 1
                }}
                exit={{ 
                  scale: 0, 
                  y: 20,
                  opacity: 0
                }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 400,
                  damping: 25
                }}
                whileTap={{ scale: 0.9 }}
              >
                {action.icon}
                <span className={styles.tooltip}>
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 45 : 0,
          scale: isOpen ? 1.1 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}
      >
        <PlusIcon />
      </motion.button>
    </div>
  )
}

// Default action components
export function CallAction() {
  return {
    id: 'call',
    label: 'Call Now',
    icon: <CallIcon />,
    onClick: () => window.open('tel:+1234567890'),
    color: '#10b981'
  }
}

export function WhatsAppAction() {
  return {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: <WhatsAppIcon />,
    onClick: () => window.open('https://wa.me/1234567890'),
    color: '#25d366'
  }
}

export function EmailAction() {
  return {
    id: 'email',
    label: 'Email Us',
    icon: <EmailIcon />,
    onClick: () => window.open('mailto:info@lovewaterrgv.com'),
    color: '#3b82f6'
  }
}

export function QuoteAction() {
  return {
    id: 'quote',
    label: 'Get Quote',
    icon: <QuoteIcon />,
    onClick: () => {
      const element = document.querySelector('#contact')
      element?.scrollIntoView({ behavior: 'smooth' })
    },
    color: '#8b5cf6'
  }
}

// Icon Components
function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function QuoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="14,2 14,8 20,8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="13"
        x2="8"
        y2="13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="17"
        x2="8"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
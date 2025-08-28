'use client'

import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHaptics } from '@/hooks/useHaptics'
import { useMobile } from '@/hooks/useMobile'
import styles from './MobileTestimonials.module.scss'

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  image?: string
  service: string
  date: string
}

interface MobileTestimonialsProps {
  testimonials: Testimonial[]
  className?: string
}

export default function MobileTestimonials({
  testimonials,
  className = ''
}: MobileTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { isMobile } = useMobile()
  const { selection, impact } = useHaptics()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const nextTestimonial = useCallback(() => {
    if (currentIndex < testimonials.length - 1) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
      selection()
    }
  }, [currentIndex, testimonials.length, selection])

  const prevTestimonial = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
      selection()
    }
  }, [currentIndex, selection])

  const goToTestimonial = useCallback((index: number) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
      impact('light')
    }
  }, [currentIndex, impact])

  // Auto-advance testimonials with visibility check
  useEffect(() => {
    if (!isMobile) return
    
    let interval: NodeJS.Timeout | null = null
    const startAutoAdvance = () => {
      interval = setInterval(() => {
        // Check if the component is visible
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0
          
          if (isVisible) {
            setDirection(1)
            setCurrentIndex(prev => (prev + 1) % testimonials.length)
          }
        }
      }, 5000) // Change every 5 seconds
    }
    
    // Start auto-advance with delay to prevent initial load impact
    const timeout = setTimeout(startAutoAdvance, 1000)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [testimonials.length, isMobile])


  const currentTestimonial = testimonials[currentIndex]

  if (!isMobile) {
    // Return a simplified version for desktop
    return (
      <div className={`${styles.desktopFallback} ${className}`}>
        <div className={styles.testimonialGrid}>
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`${styles.container} ${className}`}
      ref={containerRef}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>What Our Customers Say</h2>
        <div className={styles.counter}>
          {currentIndex + 1} of {testimonials.length}
        </div>
      </div>

      <div className={styles.carousel}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 40, mass: 0.5 }, // Optimized for mobile
              opacity: { duration: 0.25, ease: "easeOut" } // Slightly faster
            }}
            className={styles.testimonialContainer}
          >
            <TestimonialCard 
              testimonial={currentTestimonial}
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className={styles.navigation}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToTestimonial(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className={styles.arrows}>
        <button
          className={`${styles.arrow} ${styles.prev} ${currentIndex === 0 ? styles.disabled : ''}`}
          onClick={prevTestimonial}
          disabled={currentIndex === 0}
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon />
        </button>
        <button
          className={`${styles.arrow} ${styles.next} ${currentIndex === testimonials.length - 1 ? styles.disabled : ''}`}
          onClick={nextTestimonial}
          disabled={currentIndex === testimonials.length - 1}
          aria-label="Next testimonial"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

// Individual testimonial card component - memoized for performance
const TestimonialCard = memo(function TestimonialCard({ 
  testimonial, 
  isActive = false 
}: { 
  testimonial: Testimonial
  isActive?: boolean 
}) {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
    >
      {/* Rating stars */}
      <div className={styles.rating}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon 
            key={i} 
            filled={i < testimonial.rating}
          />
        ))}
      </div>

      {/* Testimonial text */}
      <p className={styles.text}>
        "{testimonial.text}"
      </p>

      {/* Customer info */}
      <div className={styles.customer}>
        <div className={styles.avatar}>
          {testimonial.image ? (
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {testimonial.name.charAt(0)}
            </div>
          )}
        </div>
        <div className={styles.info}>
          <h4 className={styles.name}>{testimonial.name}</h4>
          <p className={styles.location}>{testimonial.location}</p>
          <p className={styles.service}>{testimonial.service}</p>
        </div>
      </div>

      {/* Date */}
      <div className={styles.date}>
        {new Date(testimonial.date).toLocaleDateString()}
      </div>
    </div>
  )
})

// Animation variants - optimized for mobile performance
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 150 : -150, // Reduced distance for smoother animation
    opacity: 0,
    scale: 0.98 // Less scale change for better performance
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    scale: 0.98
  })
}

// Icon components
function ChevronLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"}>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
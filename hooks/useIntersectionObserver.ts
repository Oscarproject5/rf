'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<Element>()

  const frozen = entry?.isIntersecting && triggerOnce

  useEffect(() => {
    const element = elementRef.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !element) return

    // Use requestIdleCallback for non-critical observations on mobile
    const setupObserver = () => {
      const observerParams = { threshold, root, rootMargin }
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries
        
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          setEntry(entry)
          setIsVisible(entry.isIntersecting)
        })
        
        if (entry.isIntersecting && triggerOnce) {
          observer.disconnect()
        }
      }, observerParams)

      observer.observe(element)
      
      return observer
    }

    // Delay observer setup slightly for better initial load performance
    const timeoutId = setTimeout(() => {
      const observer = setupObserver()
      // Store observer for cleanup
      elementRef.current?.setAttribute('data-observer-id', 'active')
      
      // Cleanup function
      const cleanup = () => observer?.disconnect()
      window.addEventListener('beforeunload', cleanup)
      
      return () => {
        cleanup()
        window.removeEventListener('beforeunload', cleanup)
      }
    }, 10)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [threshold, root, rootMargin, frozen, triggerOnce])

  const callbackRef = useCallback((element: Element | null) => {
    elementRef.current = element || undefined
  }, [])

  return { ref: callbackRef, entry, isVisible }
}
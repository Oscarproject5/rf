'use client'

import { useEffect, useRef, useState } from 'react'

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

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
      setIsVisible(entry.isIntersecting)
      
      if (entry.isIntersecting && triggerOnce) {
        observer.disconnect()
      }
    }, observerParams)

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, root, rootMargin, frozen, triggerOnce])

  const callbackRef = (element: Element | null) => {
    elementRef.current = element || undefined
  }

  return { ref: callbackRef, entry, isVisible }
}
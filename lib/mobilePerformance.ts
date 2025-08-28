'use client'

/**
 * Mobile Performance Optimization Utilities
 * Helpers for optimizing mobile performance without changing visual appearance
 */

// Debounce function for reducing function calls on events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Throttle function for limiting function execution rate
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => { inThrottle = false }, limit)
    }
  }
}

// Optimize image loading based on network conditions
export function getOptimizedImageQuality(): number {
  if (typeof navigator === 'undefined') return 75
  
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection
  
  if (!connection) return 75
  
  // Adjust quality based on connection type
  switch(connection.effectiveType) {
    case 'slow-2g':
    case '2g':
      return 50
    case '3g':
      return 65
    case '4g':
      return 85
    default:
      return 75
  }
}

// Preload critical resources for mobile
export function preloadCriticalAssets(assets: string[]): void {
  if (typeof window === 'undefined') return
  
  assets.forEach(asset => {
    const link = document.createElement('link')
    link.rel = 'preload'
    
    if (asset.endsWith('.css')) {
      link.as = 'style'
    } else if (asset.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
      link.as = 'image'
    } else if (asset.endsWith('.js')) {
      link.as = 'script'
    }
    
    link.href = asset
    document.head.appendChild(link)
  })
}

// Lazy load images with Intersection Observer
export function lazyLoadImage(
  element: HTMLImageElement,
  src: string,
  placeholder?: string
): void {
  if (!('IntersectionObserver' in window)) {
    element.src = src
    return
  }
  
  if (placeholder) {
    element.src = placeholder
  }
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = src
        img.classList.add('loaded')
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px'
  })
  
  imageObserver.observe(element)
}

// Optimize scroll performance with passive listeners
export function optimizeScrollListeners(): void {
  if (typeof window === 'undefined') return
  
  // Override addEventListener to make scroll-related events passive by default
  const originalAddEventListener = EventTarget.prototype.addEventListener
  
  EventTarget.prototype.addEventListener = function(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean
  ) {
    let modifiedOptions = options
    
    // Make touch and wheel events passive for better scrolling performance
    if (['touchstart', 'touchmove', 'wheel', 'scroll'].includes(type)) {
      if (typeof options !== 'object') {
        modifiedOptions = { passive: true, capture: options }
      } else {
        modifiedOptions = { ...options, passive: true }
      }
    }
    
    originalAddEventListener.call(this, type, listener, modifiedOptions)
  }
}

// Defer non-critical JavaScript execution
export function deferNonCritical(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: 2000 })
  } else {
    setTimeout(callback, 1)
  }
}

// Check if device is low-end mobile
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  
  // Check for hardware concurrency
  const cores = navigator.hardwareConcurrency || 1
  
  // Check for device memory (Chrome only)
  const memory = (navigator as any).deviceMemory || 4
  
  // Check connection speed
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection
  
  const slowConnection = connection && 
    ['slow-2g', '2g', '3g'].includes(connection.effectiveType)
  
  return cores <= 2 || memory <= 2 || slowConnection
}

// Reduce motion for users who prefer it or on low-end devices
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return prefersReducedMotion || isLowEndDevice()
}

// Optimize animation frame rate for mobile
export function optimizeAnimationFrame(callback: FrameRequestCallback): number {
  if (!('requestAnimationFrame' in window)) {
    return setTimeout(callback, 16) as unknown as number
  }
  
  // Skip frames on low-end devices
  if (isLowEndDevice()) {
    let skip = false
    return requestAnimationFrame((time) => {
      skip = !skip
      if (!skip) callback(time)
    })
  }
  
  return requestAnimationFrame(callback)
}

// Clean up event listeners and observers
export function cleanupListeners(
  listeners: Array<{ element: EventTarget; type: string; handler: EventListener }>
): void {
  listeners.forEach(({ element, type, handler }) => {
    element.removeEventListener(type, handler)
  })
}

// Mobile-specific viewport optimization
export function optimizeViewport(): void {
  if (typeof document === 'undefined') return
  
  const viewport = document.querySelector('meta[name="viewport"]')
  if (viewport) {
    viewport.setAttribute('content', 
      'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover'
    )
  }
}

// Initialize all mobile optimizations
export function initializeMobileOptimizations(): void {
  if (typeof window === 'undefined') return
  
  // Optimize scroll listeners
  optimizeScrollListeners()
  
  // Optimize viewport
  optimizeViewport()
  
  // Preload critical fonts
  preloadCriticalAssets([
    '/fonts/inter-var.woff2' // Add your actual font files
  ])
  
  // Defer non-critical operations
  deferNonCritical(() => {
    console.log('Mobile optimizations initialized')
  })
}
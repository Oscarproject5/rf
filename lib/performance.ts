/**
 * Performance monitoring utilities for Core Web Vitals
 */

export interface WebVitalsMetrics {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
}

export function reportWebVitals(metric: WebVitalsMetrics) {
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Analytics integration would go here
    console.log('Web Vitals:', metric)
    
    // Track with Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      })
    }
  }
}

export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  const start = performance.now()
  
  const finish = () => {
    const end = performance.now()
    const duration = end - start
    
    console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`)
    
    // Mark for performance timeline
    if ('performance' in window && 'mark' in performance) {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
    }
  }
  
  if ('performance' in window && 'mark' in performance) {
    performance.mark(`${name}-start`)
  }
  
  const result = fn()
  
  if (result instanceof Promise) {
    return result.then(finish)
  } else {
    finish()
    return result
  }
}

// Resource loading performance
export function preloadResource(href: string, as: string) {
  if (typeof document === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  
  if (as === 'image') {
    link.crossOrigin = 'anonymous'
  }
  
  document.head.appendChild(link)
}

// Connection optimization
export function warmupConnection(origin: string) {
  if (typeof document === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = origin
  link.crossOrigin = 'anonymous'
  
  document.head.appendChild(link)
}
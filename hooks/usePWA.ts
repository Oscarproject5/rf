'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface PWAInstallPrompt {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface PWAData {
  isInstallable: boolean
  isInstalled: boolean
  isStandalone: boolean
  installPrompt: PWAInstallPrompt | null
  canInstall: boolean
  isOffline: boolean
  isUpdateAvailable: boolean
}

export function usePWA() {
  const [pwaData, setPwaData] = useState<PWAData>({
    isInstallable: false,
    isInstalled: false,
    isStandalone: false,
    installPrompt: null,
    canInstall: false,
    isOffline: false,
    isUpdateAvailable: false
  })
  
  // Use refs to prevent unnecessary re-renders
  const installPromptRef = useRef<PWAInstallPrompt | null>(null)

  // Check if app is running in standalone mode (installed)
  const checkStandaloneMode = useCallback(() => {
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')

    return isStandalone
  }, [])

  // Check if app is installed (iOS Safari)
  const checkInstalled = useCallback(() => {
    // iOS Safari check
    if ((window.navigator as any).standalone) return true
    
    // Android Chrome check
    if (window.matchMedia('(display-mode: standalone)').matches) return true
    
    // Check for installed web app indicators
    return document.referrer.includes('android-app://')
  }, [])

  // Handle install prompt - optimized to prevent re-renders
  const handleInstallPrompt = useCallback((e: Event) => {
    e.preventDefault()
    const deferredPrompt = e as any
    
    installPromptRef.current = deferredPrompt
    
    // Only update state once
    setPwaData(prev => {
      if (prev.canInstall) return prev // Prevent unnecessary updates
      return {
        ...prev,
        installPrompt: deferredPrompt,
        canInstall: true,
        isInstallable: true
      }
    })
  }, [])

  // Install the PWA - use ref to avoid dependency issues
  const installApp = useCallback(async () => {
    const prompt = installPromptRef.current || pwaData.installPrompt
    if (!prompt) return false

    try {
      await prompt.prompt()
      const { outcome } = await prompt.userChoice
      
      installPromptRef.current = null
      
      setPwaData(prev => ({
        ...prev,
        installPrompt: null,
        canInstall: false,
        isInstalled: outcome === 'accepted'
      }))

      return outcome === 'accepted'
    } catch (error) {
      console.warn('Error installing PWA:', error)
      return false
    }
  }, [pwaData.installPrompt])

  // Check for updates - optimized with early returns
  const checkForUpdates = useCallback(() => {
    if (!('serviceWorker' in navigator)) return
    
    // Defer update check to avoid blocking initial load
    requestIdleCallback(() => {
      navigator.serviceWorker.ready.then(registration => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setPwaData(prev => ({
                ...prev,
                isUpdateAvailable: true
              }))
            }
          })
        })
      }).catch(() => {
        // Silently fail if service worker not available
      })
    }, { timeout: 2000 })
  }, [])

  // Update the app
  const updateApp = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          window.location.reload()
        }
      })
    }
  }, [])

  // Share API
  const shareApp = useCallback(async (data?: ShareData) => {
    const shareData = data || {
      title: 'Water Filtration Systems RGV',
      text: 'Check out Love Water - Rio Grande Valley\'s trusted water treatment experts!',
      url: window.location.origin
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return true
      } catch (error) {
        // User cancelled or error occurred
        return false
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url || window.location.href)
        return true
      } catch (error) {
        return false
      }
    }
  }, [])

  // Network status
  const updateNetworkStatus = useCallback(() => {
    setPwaData(prev => ({
      ...prev,
      isOffline: !navigator.onLine
    }))
  }, [])

  useEffect(() => {
    // Initialize PWA data - batch updates
    const isStandalone = checkStandaloneMode()
    const isInstalled = checkInstalled()

    setPwaData(prev => ({
      ...prev,
      isStandalone,
      isInstalled,
      isOffline: !navigator.onLine
    }))

    // Event listeners with passive flag for better performance
    window.addEventListener('beforeinstallprompt', handleInstallPrompt, { passive: false })
    window.addEventListener('online', updateNetworkStatus, { passive: true })
    window.addEventListener('offline', updateNetworkStatus, { passive: true })
    
    // Check for app installation
    window.addEventListener('appinstalled', () => {
      setPwaData(prev => ({
        ...prev,
        isInstalled: true,
        canInstall: false,
        installPrompt: null
      }))
    })

    // Check for updates
    checkForUpdates()

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
      window.removeEventListener('online', updateNetworkStatus)
      window.removeEventListener('offline', updateNetworkStatus)
    }
  }, [handleInstallPrompt, checkStandaloneMode, checkInstalled, updateNetworkStatus, checkForUpdates])

  return {
    ...pwaData,
    installApp,
    updateApp,
    shareApp,
    canShare: !!navigator.share || !!navigator.clipboard
  }
}
'use client'

import { useEffect, useState, useCallback } from 'react'

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

  // Handle install prompt
  const handleInstallPrompt = useCallback((e: Event) => {
    e.preventDefault()
    const deferredPrompt = e as any

    setPwaData(prev => ({
      ...prev,
      installPrompt: deferredPrompt,
      canInstall: true,
      isInstallable: true
    }))
  }, [])

  // Install the PWA
  const installApp = useCallback(async () => {
    if (!pwaData.installPrompt) return false

    try {
      await pwaData.installPrompt.prompt()
      const { outcome } = await pwaData.installPrompt.userChoice

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

  // Check for updates
  const checkForUpdates = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setPwaData(prev => ({
                  ...prev,
                  isUpdateAvailable: true
                }))
              }
            })
          }
        })
      })
    }
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
    // Initialize PWA data
    const isStandalone = checkStandaloneMode()
    const isInstalled = checkInstalled()

    setPwaData(prev => ({
      ...prev,
      isStandalone,
      isInstalled,
      isOffline: !navigator.onLine
    }))

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)
    
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
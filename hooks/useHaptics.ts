'use client'

import { useCallback } from 'react'

interface HapticsAPI {
  light: () => void
  medium: () => void
  heavy: () => void
  success: () => void
  warning: () => void
  error: () => void
  selection: () => void
  impact: (style?: 'light' | 'medium' | 'heavy') => void
  notification: (type?: 'success' | 'warning' | 'error') => void
  vibrate: (pattern?: number | number[]) => void
  isSupported: boolean
}

export function useHaptics(): HapticsAPI {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if (isSupported) {
      navigator.vibrate(pattern)
    }
  }, [isSupported])

  const light = useCallback(() => {
    vibrate(10)
  }, [vibrate])

  const medium = useCallback(() => {
    vibrate(20)
  }, [vibrate])

  const heavy = useCallback(() => {
    vibrate(30)
  }, [vibrate])

  const success = useCallback(() => {
    // Two quick pulses
    vibrate([10, 50, 10])
  }, [vibrate])

  const warning = useCallback(() => {
    // Single medium pulse
    vibrate(50)
  }, [vibrate])

  const error = useCallback(() => {
    // Three quick pulses
    vibrate([20, 50, 20, 50, 20])
  }, [vibrate])

  const selection = useCallback(() => {
    // Very light tap
    vibrate(5)
  }, [vibrate])

  const impact = useCallback((style: 'light' | 'medium' | 'heavy' = 'medium') => {
    switch (style) {
      case 'light':
        light()
        break
      case 'medium':
        medium()
        break
      case 'heavy':
        heavy()
        break
    }
  }, [light, medium, heavy])

  const notification = useCallback((type: 'success' | 'warning' | 'error' = 'success') => {
    switch (type) {
      case 'success':
        success()
        break
      case 'warning':
        warning()
        break
      case 'error':
        error()
        break
    }
  }, [success, warning, error])

  return {
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    impact,
    notification,
    vibrate,
    isSupported
  }
}
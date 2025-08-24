'use client'

import { useEffect, useState, useCallback } from 'react'

interface DeviceMotionData {
  alpha: number | null // Z-axis rotation (0-360°)
  beta: number | null  // X-axis rotation (-180 to 180°)
  gamma: number | null // Y-axis rotation (-90 to 90°)
  isSupported: boolean
  isPermissionGranted: boolean
}

interface TiltControls {
  tiltX: number
  tiltY: number
  tiltZ: number
  intensity: number
  isActive: boolean
}

interface ShakeDetection {
  isShaking: boolean
  shakeCount: number
  lastShake: number
}

export function useDeviceMotion() {
  const [motion, setMotion] = useState<DeviceMotionData>({
    alpha: null,
    beta: null,
    gamma: null,
    isSupported: false,
    isPermissionGranted: false
  })

  const [tilt, setTilt] = useState<TiltControls>({
    tiltX: 0,
    tiltY: 0,
    tiltZ: 0,
    intensity: 0,
    isActive: false
  })

  const [shake, setShake] = useState<ShakeDetection>({
    isShaking: false,
    shakeCount: 0,
    lastShake: 0
  })

  const [lastAcceleration, setLastAcceleration] = useState({ x: 0, y: 0, z: 0 })
  const [shakeThreshold] = useState(15) // Adjust sensitivity

  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    const { alpha, beta, gamma } = event
    
    setMotion(prev => ({
      ...prev,
      alpha,
      beta,
      gamma
    }))

    // Calculate tilt values for visual effects
    if (beta !== null && gamma !== null) {
      const normalizedX = Math.max(-1, Math.min(1, gamma / 45)) // -45° to 45°
      const normalizedY = Math.max(-1, Math.min(1, (beta - 90) / 45)) // 45° to 135°
      const intensity = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY)

      setTilt({
        tiltX: normalizedX,
        tiltY: normalizedY,
        tiltZ: alpha ? alpha / 360 : 0,
        intensity: Math.min(intensity, 1),
        isActive: Math.abs(normalizedX) > 0.1 || Math.abs(normalizedY) > 0.1
      })
    }
  }, [])

  const handleDeviceMotion = useCallback((event: DeviceMotionEvent) => {
    const { accelerationIncludingGravity } = event
    
    if (accelerationIncludingGravity) {
      const { x, y, z } = accelerationIncludingGravity
      const accelX = x ?? 0
      const accelY = y ?? 0
      const accelZ = z ?? 0
      
      // Calculate acceleration delta for shake detection
      const deltaX = Math.abs(accelX - lastAcceleration.x)
      const deltaY = Math.abs(accelY - lastAcceleration.y)
      const deltaZ = Math.abs(accelZ - lastAcceleration.z)
      const totalDelta = deltaX + deltaY + deltaZ

      setLastAcceleration({ x: accelX, y: accelY, z: accelZ })

      // Detect shake
      if (totalDelta > shakeThreshold) {
        const now = Date.now()
        const timeSinceLastShake = now - shake.lastShake

        // Prevent rapid fire shakes
        if (timeSinceLastShake > 100) {
          setShake(prev => ({
            isShaking: true,
            shakeCount: prev.shakeCount + 1,
            lastShake: now
          }))

          // Reset shake state after delay
          setTimeout(() => {
            setShake(prev => ({
              ...prev,
              isShaking: false
            }))
          }, 500)
        }
      }
    }
  }, [lastAcceleration, shake.lastShake, shakeThreshold])

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined') return false

    // Check if DeviceOrientationEvent is supported
    if (!window.DeviceOrientationEvent) {
      setMotion(prev => ({ ...prev, isSupported: false }))
      return false
    }

    setMotion(prev => ({ ...prev, isSupported: true }))

    // For iOS 13+, we need to request permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        const granted = permission === 'granted'
        
        setMotion(prev => ({ ...prev, isPermissionGranted: granted }))
        return granted
      } catch (error) {
        console.warn('Error requesting device orientation permission:', error)
        setMotion(prev => ({ ...prev, isPermissionGranted: false }))
        return false
      }
    } else {
      // For other browsers, assume permission is granted
      setMotion(prev => ({ ...prev, isPermissionGranted: true }))
      return true
    }
  }, [])

  useEffect(() => {
    const initializeMotion = async () => {
      if (await requestPermission()) {
        window.addEventListener('deviceorientation', handleDeviceOrientation)
        window.addEventListener('devicemotion', handleDeviceMotion)
      }
    }

    initializeMotion()

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  }, [handleDeviceOrientation, handleDeviceMotion, requestPermission])

  return {
    motion,
    tilt,
    shake,
    requestPermission
  }
}

// Hook for tilt-based parallax effects
export function useTiltParallax(intensity: number = 1) {
  const { tilt } = useDeviceMotion()

  const getParallaxStyles = useCallback((depth: number = 1) => {
    if (!tilt.isActive) return {}

    const moveX = tilt.tiltX * intensity * depth * 20
    const moveY = tilt.tiltY * intensity * depth * 20

    return {
      transform: `translateX(${moveX}px) translateY(${moveY}px)`,
      transition: 'transform 0.1s ease-out'
    }
  }, [tilt, intensity])

  return {
    ...tilt,
    getParallaxStyles
  }
}
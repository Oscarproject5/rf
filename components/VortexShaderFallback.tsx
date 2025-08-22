'use client'

import React, { useEffect, useRef } from 'react'
import styles from './VortexShader.module.scss'

interface VortexShaderFallbackProps {
  className?: string
}

export default function VortexShaderFallback({ className }: VortexShaderFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    let time = 0
    const centerX = canvas.width / (2 * window.devicePixelRatio)
    const centerY = canvas.height / (2 * window.devicePixelRatio)

    const animate = () => {
      time += 0.02

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient vortex effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.min(centerX, centerY)
      )
      
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.8 * (Math.sin(time) * 0.2 + 0.5)})`)
      gradient.addColorStop(0.3, `rgba(124, 58, 237, ${0.6 * (Math.cos(time * 1.2) * 0.2 + 0.4)})`)
      gradient.addColorStop(0.7, `rgba(0, 0, 0, ${0.3 * (Math.sin(time * 0.8) * 0.2 + 0.3)})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, centerX * 2, centerY * 2)

      // Add spiral pattern
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(time * 0.5)
      
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2
        const radius = 50 + Math.sin(time + i) * 20
        
        ctx.beginPath()
        ctx.arc(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          5 + Math.sin(time * 2 + i) * 3,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time + i) * 0.1})`
        ctx.fill()
      }
      
      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />
    </div>
  )
}
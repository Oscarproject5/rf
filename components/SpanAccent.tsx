'use client'

import React from 'react'

interface SpanAccentProps {
  children: string
  accentIndex?: number
  className?: string
}

export default function SpanAccent({ 
  children, 
  accentIndex = 1, 
  className = '' 
}: SpanAccentProps) {
  const words = children.split(' ')
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span 
          key={index}
          className={index === accentIndex ? 'font-accent' : ''}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
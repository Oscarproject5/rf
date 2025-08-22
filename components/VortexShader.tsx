'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ShaderMaterial } from 'three'
import * as THREE from 'three'

// Ensure React is available for Three.js
if (typeof window !== 'undefined') {
  (window as any).React = React
}

// Vortex vertex shader
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Vortex fragment shader
const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_center;
  uniform float u_radius;
  uniform float u_strength;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  
  varying vec2 vUv;
  
  void main() {
    vec2 center = u_center;
    vec2 pos = vUv - center;
    float dist = length(pos);
    
    // Create vortex effect
    float angle = atan(pos.y, pos.x);
    float vortexAngle = angle + (u_strength / (dist + 0.1)) * u_time * 2.0;
    
    // Rotate UV coordinates
    vec2 rotatedPos;
    rotatedPos.x = cos(vortexAngle) * dist;
    rotatedPos.y = sin(vortexAngle) * dist;
    
    // Add spiral pattern
    float spiral = sin(dist * 10.0 - u_time * 3.0) * 0.5 + 0.5;
    
    // Color mixing based on distance and spiral
    vec3 color = mix(u_color1, u_color2, dist);
    color = mix(color, u_color3, spiral * 0.3);
    
    // Fade edges
    float fadeEdge = smoothstep(u_radius, u_radius * 0.8, dist);
    
    // Add glow effect
    float glow = 1.0 - smoothstep(0.0, u_radius, dist);
    color += u_color2 * glow * 0.2;
    
    gl_FragColor = vec4(color, fadeEdge * 0.8);
  }
`

interface VortexMaterialProps {
  time: number
}

function VortexMaterial({ time }: VortexMaterialProps) {
  const materialRef = useRef<ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_center: { value: new THREE.Vector2(0.5, 0.5) },
    u_radius: { value: 0.8 },
    u_strength: { value: 2.0 },
    u_color1: { value: new THREE.Color('#000000') },
    u_color2: { value: new THREE.Color('#8b5cf6') },
    u_color3: { value: new THREE.Color('#ffffff') }
  }), [])
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = time
    }
  })
  
  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
      blending={THREE.AdditiveBlending}
    />
  )
}

function VortexPlane() {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  
  useFrame((state, delta) => {
    timeRef.current += delta
    
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.z = timeRef.current * 0.1
      
      // Subtle scale pulsing
      const scale = 1 + Math.sin(timeRef.current * 2) * 0.05
      groupRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[4, 4, 32, 32]} />
        <VortexMaterial time={timeRef.current} />
      </mesh>
    </group>
  )
}

interface VortexShaderProps {
  className?: string
}

export default function VortexShader({ className }: VortexShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    return () => {
      // Cleanup WebGL context on unmount
      if (canvasRef.current) {
        const gl = canvasRef.current.getContext('webgl') || canvasRef.current.getContext('webgl2')
        if (gl) {
          const loseContext = gl.getExtension('WEBGL_lose_context')
          if (loseContext) {
            loseContext.loseContext()
          }
        }
      }
    }
  }, [])
  
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 2], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <VortexPlane />
      </Canvas>
    </div>
  )
}
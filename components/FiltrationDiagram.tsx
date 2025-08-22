'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './FiltrationDiagram.module.scss'

interface FiltrationDiagramProps {
  className?: string
  isActive?: boolean
  showMetrics?: boolean
}

const filtrationStages = [
  {
    id: 'sediment',
    name: 'Sediment Filter',
    color: '#6b7280',
    description: 'Removes particles',
    beforeValue: '450ppm',
    afterValue: '380ppm'
  },
  {
    id: 'carbon',
    name: 'Carbon Filter', 
    color: '#374151',
    description: 'Removes chlorine & odors',
    beforeValue: '380ppm',
    afterValue: '120ppm'
  },
  {
    id: 'ro',
    name: 'RO Membrane',
    color: '#8b5cf6',
    description: 'Ultra-pure filtration',
    beforeValue: '120ppm',
    afterValue: '45ppm'
  }
]

export default function FiltrationDiagram({ 
  className = '', 
  isActive = false, 
  showMetrics = false 
}: FiltrationDiagramProps) {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }
  
  const stageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    active: {
      scale: 1.05,
      boxShadow: '0 0 20px currentColor',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }
  
  const dropletPathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 0.8,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        delay: 0.5
      }
    }
  }
  
  const metricsVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.8
      }
    }
  }
  
  return (
    <motion.div
      className={`${styles.diagram} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {/* Diagram title */}
      <motion.h3 
        className={styles.title}
        variants={stageVariants}
      >
        3-Stage Filtration Process
      </motion.h3>
      
      {/* Filtration stages */}
      <div className={styles.stages}>
        {filtrationStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className={styles.stage}
            variants={stageVariants}
            whileHover="active"
            style={{ '--stage-color': stage.color } as React.CSSProperties}
          >
            {/* Stage icon */}
            <div className={styles.stageIcon}>
              <svg viewBox="0 0 40 40" className={styles.icon}>
                {stage.id === 'sediment' && (
                  <rect x="8" y="8" width="24" height="24" rx="2" fill="currentColor" />
                )}
                {stage.id === 'carbon' && (
                  <circle cx="20" cy="20" r="12" fill="currentColor" />
                )}
                {stage.id === 'ro' && (
                  <polygon points="20,8 32,20 20,32 8,20" fill="currentColor" />
                )}
              </svg>
            </div>
            
            {/* Stage info */}
            <div className={styles.stageInfo}>
              <h4 className={styles.stageName}>{stage.name}</h4>
              <p className={styles.stageDescription}>{stage.description}</p>
            </div>
            
            {/* Metrics */}
            {showMetrics && (
              <motion.div
                className={styles.metrics}
                variants={metricsVariants}
              >
                <div className={styles.metricBefore}>
                  <span className={styles.metricLabel}>Before:</span>
                  <span className={styles.metricValue}>{stage.beforeValue}</span>
                </div>
                <div className={styles.metricAfter}>
                  <span className={styles.metricLabel}>After:</span>
                  <span className={styles.metricValue}>{stage.afterValue}</span>
                </div>
              </motion.div>
            )}
            
            {/* Connection line to next stage */}
            {index < filtrationStages.length - 1 && (
              <motion.div
                className={styles.connection}
                initial={{ scaleX: 0 }}
                animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 1 + index * 0.3, duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Droplet travel path */}
      <svg className={styles.dropletPath} viewBox="0 0 400 100">
        <motion.path
          d="M 50 50 Q 125 30 200 50 Q 275 70 350 50"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          strokeDasharray="5 5"
          variants={dropletPathVariants}
        />
        
        {/* Animated droplet using Drupal logo */}
        {isActive && (
          <motion.g
            initial={{ 
              x: 50, 
              y: 50,
              opacity: 0,
              scale: 0.3
            }}
            animate={{ 
              x: [50, 125, 200, 275, 350],
              y: [50, 30, 50, 70, 50],
              opacity: [0, 1, 1, 1, 0],
              scale: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            transition={{ 
              duration: 3, 
              ease: 'easeInOut',
              delay: 1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ transform: 'translate(-12px, -12px)' }}
            >
              <path 
                d="M15.78 5.113C14.09 3.425 12.48 1.815 11.998 0c-.48 1.815-2.09 3.425-3.778 5.113-2.534 2.53-5.405 5.4-5.405 9.702a9.184 9.185 0 1018.368 0c0-4.303-2.871-7.171-5.405-9.702M6.72 16.954c-.563-.019-2.64-3.6 1.215-7.416l2.55 2.788a.218.218 0 01-.016.325c-.61.625-3.204 3.227-3.527 4.126-.066.186-.164.18-.222.177M12 21.677a3.158 3.158 0 01-3.158-3.159 3.291 3.291 0 01.787-2.087c.57-.696 2.37-2.655 2.37-2.655s1.774 1.988 2.367 2.649a3.09 3.09 0 01.792 2.093A3.158 3.158 0 0112 21.677m6.046-5.123c-.068.15-.223.398-.431.405-.371.014-.411-.177-.686-.583-.604-.892-5.864-6.39-6.848-7.455-.866-.935-.122-1.595.223-1.94C10.736 6.547 12 5.285 12 5.285s3.766 3.574 5.336 6.016c1.57 2.443 1.029 4.556.71 5.253"
                fill="#8b5cf6"
              />
            </svg>
          </motion.g>
        )}
      </svg>
      
      {/* Compliance note */}
      <motion.p 
        className={styles.compliance}
        variants={metricsVariants}
      >
        *TDS values shown are example data for demonstration purposes
      </motion.p>
    </motion.div>
  )
}
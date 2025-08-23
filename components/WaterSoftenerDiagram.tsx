'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from './WaterSoftenerDiagram.module.scss'

interface StageInfo {
  id: string
  title: string
  description: string
  details: string[]
}

const stages: StageInfo[] = [
  {
    id: 'hard-water',
    title: 'Hard Water Entry',
    description: 'Untreated water from your main supply enters the system',
    details: [
      'Contains calcium and magnesium minerals',
      'Causes scale buildup in pipes',
      'Reduces soap effectiveness',
      'Can damage appliances'
    ]
  },
  {
    id: 'resin-tank',
    title: 'Ion Exchange Process',
    description: 'Water flows through specialized resin beads',
    details: [
      '1.5 cubic feet of resin beads',
      'Negatively charged resin attracts minerals',
      'Calcium and magnesium ions captured',
      'Sodium ions released in exchange'
    ]
  },
  {
    id: 'soft-water',
    title: 'Soft Water Output',
    description: 'Treated water flows to your home',
    details: [
      'Minerals removed',
      'Prevents scale buildup',
      'Better soap lathering',
      'Protects appliances and plumbing'
    ]
  },
  {
    id: 'regeneration',
    title: 'Smart Regeneration',
    description: 'System automatically cleans and recharges',
    details: [
      'Meter tracks water usage',
      'Regenerates only when needed',
      'Brine solution flushes minerals',
      'Resin beads recharged with sodium'
    ]
  }
]

export default function WaterSoftenerDiagram() {
  const [activeStage, setActiveStage] = useState<string>('hard-water')

  const currentStage = stages.find(s => s.id === activeStage) || stages[0]

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.header}>
        <h2>How Your Water Softener Works</h2>
        <p>Click any part of the system to learn more about the process</p>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.diagramSection}>
          <div className={styles.diagramImage}>
            <Image
              src="/water-softener-process.png"
              alt="Water Softener Process Diagram"
              width={800}
              height={600}
              priority
              className={styles.processImage}
            />
            {/* Click on sections of the image to learn more */}
            <div 
              className={styles.imageOverlay}
              onClick={(e) => {
                // Determine which section was clicked based on coordinates
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                
                if (x < 25) {
                  setActiveStage('hard-water');
                } else if (x < 50) {
                  setActiveStage('resin-tank');
                } else if (x < 75) {
                  setActiveStage('regeneration');
                } else {
                  setActiveStage('soft-water');
                }
              }}
            />
          </div>
        </div>

        {/* Information Panel */}
        <div className={styles.infoPanel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.stageInfo}
            >
              <div className={styles.stageHeader}>
                <h3>{currentStage.title}</h3>
                <div className={styles.stageIndicator}>
                  {stages.map((stage, index) => (
                    <button
                      key={stage.id}
                      className={`${styles.dot} ${stage.id === activeStage ? styles.active : ''}`}
                      onClick={() => setActiveStage(stage.id)}
                      aria-label={`View ${stage.title}`}
                    />
                  ))}
                </div>
              </div>
              
              <p className={styles.stageDescription}>{currentStage.description}</p>
              
              <div className={styles.stageDetails}>
                <h4>Key Points:</h4>
                <ul>
                  {currentStage.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={styles.cycleInfo}>
                <h4>System Cycle:</h4>
                <div className={styles.cycleSteps}>
                  <button 
                    className={`${styles.step} ${activeStage === 'hard-water' ? styles.active : ''}`}
                    onClick={() => setActiveStage('hard-water')}
                    aria-label="View Input stage"
                  >
                    <span className={styles.stepNumber}>1</span>
                    <span>Input</span>
                  </button>
                  <button 
                    className={`${styles.step} ${activeStage === 'resin-tank' ? styles.active : ''}`}
                    onClick={() => setActiveStage('resin-tank')}
                    aria-label="View Treatment stage"
                  >
                    <span className={styles.stepNumber}>2</span>
                    <span>Treatment</span>
                  </button>
                  <button 
                    className={`${styles.step} ${activeStage === 'soft-water' ? styles.active : ''}`}
                    onClick={() => setActiveStage('soft-water')}
                    aria-label="View Output stage"
                  >
                    <span className={styles.stepNumber}>3</span>
                    <span>Output</span>
                  </button>
                  <button 
                    className={`${styles.step} ${activeStage === 'regeneration' ? styles.active : ''}`}
                    onClick={() => setActiveStage('regeneration')}
                    aria-label="View Regeneration stage"
                  >
                    <span className={styles.stepNumber}>4</span>
                    <span>Regeneration</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Educational footer */}
      <div className={styles.footer}>
        <div className={styles.factCard}>
          <h4>Did You Know?</h4>
          <p>A properly installed water softener can extend appliance life by up to 50% and reduce soap usage by 75%.</p>
        </div>
        <div className={styles.factCard}>
          <h4>Smart Technology</h4>
          <p>The Fleck 5600SXT uses meter-based regeneration, saving up to 50% on salt and water compared to timer-based systems.</p>
        </div>
        <div className={styles.factCard}>
          <h4>Capacity</h4>
          <p>With 48,000 grain capacity, this system can handle a family of 4-6 people with average water hardness.</p>
        </div>
      </div>
    </div>
  )
}
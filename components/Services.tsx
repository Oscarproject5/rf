'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Services.module.scss'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: 'Water Softening',
    description: 'Remove hard minerals that damage appliances and irritate skin',
    features: ['Softer skin & hair', 'Extended appliance life', 'Cleaner dishes']
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Reverse Osmosis',
    description: 'Pure drinking water at your fingertips, removing 99.9% of contaminants',
    features: ['Crystal clear water', '99.9% contaminant removal', 'Better taste']
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
    title: 'Whole House Filtration',
    description: 'Complete protection for your entire home water supply',
    features: ['Every tap protected', 'Chlorine removal', 'Sediment filtration']
  }
]

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Pure Water Solutions</h2>
          <p className={styles.subtitle}>
            Professional water treatment systems tailored for Rio Grande Valley homes
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <ul className={styles.features}>
                {service.features.map(feature => (
                  <li key={feature} className={styles.feature}>
                    <svg 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      className={styles.checkIcon}
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
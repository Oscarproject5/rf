'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Systems.module.scss'

const systems = [
  {
    id: 1,
    name: 'Whole House System Pro',
    image: 'https://via.placeholder.com/600x400/0891b2/ffffff?text=Whole+House+System',
    price: 'Starting at $2,499',
    features: [
      'Filters all water entering your home',
      '1 million gallon capacity',
      'Removes 97% of chlorine',
      'Salt-free conditioning',
      '10-year warranty'
    ],
    badge: 'Most Popular'
  },
  {
    id: 2,
    name: 'Under Sink RO System',
    image: 'https://via.placeholder.com/600x400/06b6d4/ffffff?text=RO+System',
    price: 'Starting at $599',
    features: [
      '5-stage reverse osmosis',
      '99.9% contaminant removal',
      'Alkaline remineralization',
      'Space-saving design',
      '2-year warranty'
    ],
    badge: null
  },
  {
    id: 3,
    name: 'Water Softener Plus',
    image: 'https://via.placeholder.com/600x400/0e7490/ffffff?text=Water+Softener',
    price: 'Starting at $1,299',
    features: [
      'Eliminates hard water',
      'Smart salt monitoring',
      'WiFi connectivity',
      'Extends appliance life',
      '5-year warranty'
    ],
    badge: 'Best Value'
  }
]

export default function Systems() {
  return (
    <section id="systems" className={styles.systems}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Our Water Filtration Systems</h2>
          <p className={styles.subtitle}>
            Professional-grade solutions for every home and budget
          </p>
        </motion.div>

        <div className={styles.systemsGrid}>
          {systems.map((system, index) => (
            <motion.div
              key={system.id}
              className={styles.systemCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {system.badge && (
                <div className={styles.badge}>{system.badge}</div>
              )}
              
              <div className={styles.imageWrapper}>
                <Image
                  src={system.image}
                  alt={system.name}
                  width={600}
                  height={400}
                  className={styles.systemImage}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>

              <div className={styles.systemInfo}>
                <h3 className={styles.systemName}>{system.name}</h3>
                <div className={styles.price}>{system.price}</div>
                
                <ul className={styles.features}>
                  {system.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={styles.learnMore}>
                  Learn More
                  <svg className={styles.arrow} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className={styles.ctaText}>Not sure which system is right for you?</p>
          <a href="#contact" className={styles.ctaButton}>
            Get Your Free Water Test & Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
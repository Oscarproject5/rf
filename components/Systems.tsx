'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Systems.module.scss'

const systems = [
  {
    id: 1,
    name: 'Whole House System Installation',
    image: '/ChatGPT_Image_Aug_23_2025_05_02_04_PM.png',
    serviceType: 'Professional Installation Service',
    features: [
      'Complete system installation',
      'Plumbing integration & setup',
      'System calibration & testing',
      'Training on system operation',
      'Post-installation support'
    ],
    badge: 'Best Value',
    buttonText: 'Schedule Installation',
    buttonLink: '#contact'
  },
  {
    id: 2,
    name: 'RO System Installation',
    image: '/Gemini_Generated_Image_hneinuhneinuhnei.png',
    serviceType: 'Under-Sink Installation',
    features: [
      'Professional under-sink mounting',
      'Dedicated faucet installation',
      'Drain line connection',
      'Storage tank setup',
      'Water quality verification'
    ],
    badge: null,
    buttonText: 'Schedule Installation',
    buttonLink: '#contact'
  },
  {
    id: 3,
    name: 'Water Softener Installation',
    image: '/Gemini_Generated_Image_vg90hvvg90hvvg90.png',
    serviceType: 'Fleck 5600SXT Installation',
    features: [
      'Complete system installation',
      'Bypass valve & plumbing setup',
      'Digital control programming',
      'Brine tank configuration',
      'Water hardness calibration'
    ],
    badge: 'Professional Grade',
    buttonText: 'See How It Works',
    buttonLink: '#how-it-works'
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
          <h2 className={styles.title}>Professional Water System Installation</h2>
          <p className={styles.subtitle}>
            Expert installation of premium water treatment systems for your home
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
                <div className={styles.serviceType}>{system.serviceType}</div>
                
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

                <a href={system.buttonLink} className={styles.learnMore}>
                  {system.buttonText}
                  <svg className={styles.arrow} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
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
          <p className={styles.ctaText}>Ready for professional water system installation?</p>
          <a href="#contact" className={styles.ctaButton}>
            Schedule Your Free In-Home Assessment
          </a>
        </motion.div>
      </div>
    </section>
  )
}
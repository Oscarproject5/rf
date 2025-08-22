'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Testimonials.module.scss'

const testimonials = [
  {
    name: 'Maria Rodriguez',
    location: 'McAllen, TX',
    rating: 5,
    text: 'The difference in our water is incredible. No more hard water stains, and my family loves the taste. Love Water made the entire process seamless.',
    date: '2 weeks ago'
  },
  {
    name: 'James Thompson',
    location: 'Edinburg, TX',
    rating: 5,
    text: 'Professional installation, fair pricing, and excellent customer service. Our water softener has transformed our daily life.',
    date: '1 month ago'
  },
  {
    name: 'Sarah Chen',
    location: 'Mission, TX',
    rating: 5,
    text: 'After seeing what was in our water during the free test, we immediately knew we needed their system. Best investment for our home.',
    date: '3 weeks ago'
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Trusted by Your Neighbors</h2>
          <p className={styles.subtitle}>
            Join 2,000+ satisfied families across the Rio Grande Valley
          </p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg 
                    key={i} 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className={styles.star}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={styles.text}>"{testimonial.text}"</p>
              <div className={styles.author}>
                <strong className={styles.name}>{testimonial.name}</strong>
                <span className={styles.location}>{testimonial.location}</span>
                <span className={styles.date}>{testimonial.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>2,000+</span>
            <span className={styles.statLabel}>Happy Families</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4.9/5</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './CallToAction.module.scss'

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', phone: '', email: '', address: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className={styles.cta}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Get Your Free Water Quality Test
          </h2>
          <p className={styles.subtitle}>
            Discover what's really in your water with our comprehensive 15-point analysis. 
            No cost, no obligation—just answers.
          </p>

          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Service Address"
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitButton} ${styles.primaryButton}`}
              >
                {isSubmitting ? 'Submitting...' : 'Schedule Free Test'}
              </button>

              {submitStatus === 'success' && (
                <motion.p 
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you! We'll contact you within 24 hours to schedule your free water test.
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p 
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Something went wrong. Please call us at (956) 555-PURE.
                </motion.p>
              )}
            </form>

            <div className={styles.benefits}>
              <h3 className={styles.benefitsTitle}>What's Included:</h3>
              <ul className={styles.benefitsList}>
                <li className={styles.benefit}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.checkIcon}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  15-point water quality analysis
                </li>
                <li className={styles.benefit}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.checkIcon}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Professional consultation
                </li>
                <li className={styles.benefit}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.checkIcon}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  Custom solution recommendations
                </li>
                <li className={styles.benefit}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.checkIcon}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  No obligation or hidden fees
                </li>
              </ul>

              <div className={styles.urgency}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.urgencyIcon}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>Same-day appointments available</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMobile } from '@/hooks/useMobile'
import { useHaptics } from '@/hooks/useHaptics'
import styles from './MobileContactForm.module.scss'

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  service: string
  message: string
}

interface MobileContactFormProps {
  className?: string
  onSubmit?: (data: FormData) => Promise<void>
}

export default function MobileContactForm({ 
  className = '',
  onSubmit 
}: MobileContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [success, setSuccess] = useState(false)

  const { isMobile } = useMobile()
  const { impact, success: successHaptic } = useHaptics()

  const services = [
    { value: '', label: 'Select a service' },
    { value: 'water-test', label: '🧪 Free Water Test' },
    { value: 'whole-house', label: '🏠 Whole House System' },
    { value: 'reverse-osmosis', label: '💧 Reverse Osmosis' },
    { value: 'water-softener', label: '✨ Water Softener' },
    { value: 'maintenance', label: '🔧 System Maintenance' },
    { value: 'other', label: '📞 Other - Call Me' }
  ]

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    } else {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'phone' ? formatPhoneNumber(value) : value
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      impact('heavy')
      return
    }

    setIsSubmitting(true)
    
    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default submission to API
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }
      }

      setSuccess(true)
      successHaptic()
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          service: '',
          message: ''
        })
        setSuccess(false)
      }, 3000)

    } catch (error) {
      impact('heavy')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        className={`${styles.success} ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className={styles.successIcon}>✅</div>
        <h3>Thank You!</h3>
        <p>We've received your request and will contact you within 24 hours.</p>
        <div className={styles.successActions}>
          <a href="tel:+19561234567" className={styles.callButton}>
            📞 Call Now for Faster Service
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <form 
      className={`${styles.form} ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.header}>
        <h3>Get Your Free Water Test</h3>
        <p>Fill out the form below and we'll contact you to schedule your complimentary water analysis.</p>
      </div>

      <div className={styles.fields}>
        {/* Name Field */}
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            className={`${styles.input} ${errors.name ? styles.error : ''}`}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>

        {/* Phone Field */}
        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            className={`${styles.input} ${errors.phone ? styles.error : ''}`}
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(956) 123-4567"
            autoComplete="tel"
            inputMode="numeric"
            required
          />
          {errors.phone && (
            <span className={styles.errorText}>{errors.phone}</span>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            autoComplete="email"
            inputMode="email"
            required
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        {/* Address Field */}
        <div className={styles.field}>
          <label htmlFor="address" className={styles.label}>
            Service Address
          </label>
          <input
            type="text"
            id="address"
            className={styles.input}
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="City, TX or full address"
            autoComplete="address-line1"
          />
        </div>

        {/* Service Selection */}
        <div className={styles.field}>
          <label htmlFor="service" className={styles.label}>
            Interested Service *
          </label>
          <select
            id="service"
            className={`${styles.select} ${errors.service ? styles.error : ''}`}
            value={formData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            required
          >
            {services.map(service => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <span className={styles.errorText}>{errors.service}</span>
          )}
        </div>

        {/* Message Field */}
        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>
            Additional Details
          </label>
          <textarea
            id="message"
            className={styles.textarea}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Tell us about your water concerns or questions..."
            rows={4}
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
        disabled={isSubmitting}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <span className={styles.spinner}>⏳ Submitting...</span>
        ) : (
          <>
            📧 Send My Request
            <span className={styles.subtext}>We'll respond within 24 hours</span>
          </>
        )}
      </motion.button>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <a href="tel:+19561234567" className={styles.quickAction}>
          📞 Call Now: (956) 123-4567
        </a>
        <a href="https://wa.me/19561234567" className={styles.quickAction}>
          💬 Text on WhatsApp
        </a>
      </div>

      {/* Trust Indicators */}
      <div className={styles.trustBadges}>
        <div className={styles.badge}>🏆 Licensed & Insured</div>
        <div className={styles.badge}>⚡ Same-Day Service</div>
        <div className={styles.badge}>✅ 100% Satisfaction</div>
      </div>
    </form>
  )
}
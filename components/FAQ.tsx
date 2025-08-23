'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQ.module.scss'

const faqs = [
  {
    question: "How do I know if I need a water softener?",
    answer: "Common signs include white spots on dishes and fixtures, dry skin and hair after showering, faded clothing, scale buildup in appliances, and higher soap usage. Our free water test can determine your exact water hardness level and recommend the best solution."
  },
  {
    question: "What's included in the free installation?",
    answer: "Our free installation includes professional system setup, all standard plumbing connections, system programming and calibration, initial salt fill, and a complete walkthrough of system operation. Additional plumbing modifications, if needed, are quoted separately."
  },
  {
    question: "How much will this lower my monthly bills?",
    answer: "Most families save $50-150 monthly through reduced soap and detergent usage, extended appliance life, lower energy bills (scale-free water heaters are 30% more efficient), and fewer plumbing repairs. The system typically pays for itself within 18-24 months."
  },
  {
    question: "What's the difference between salt-based and salt-free systems?",
    answer: "Salt-based softeners remove minerals completely through ion exchange, providing the softest water and best scale prevention. Salt-free conditioners alter mineral structure to reduce scaling but don't remove hardness. We'll recommend the best option based on your water test results and preferences."
  },
  {
    question: "How often do I need to add salt?",
    answer: "Most families add salt every 6-8 weeks, depending on water usage and hardness levels. Our smart systems alert you when salt is low, and we offer convenient salt delivery service to make maintenance effortless."
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes! We offer $0 down financing with flexible payment plans from 12-60 months. Most customers qualify for same-day approval, and monthly payments are often less than what you're currently wasting on hard water damage."
  },
  {
    question: "What warranty do you provide?",
    answer: "All systems include a lifetime warranty on tanks and valves, 10-year warranty on all parts, 5-year labor warranty, and lifetime support. We also offer annual maintenance plans to keep your system running perfectly."
  },
  {
    question: "Can you remove other contaminants besides hardness?",
    answer: "Absolutely! We offer whole-house filtration for chlorine, chloramines, iron, sulfur, bacteria, and more. Our free water test identifies all contaminants, and we can design a complete solution for your specific water quality issues."
  },
  {
    question: "How long does installation take?",
    answer: "Most installations are completed in 2-4 hours with minimal disruption to your water service. We schedule at your convenience, including evenings and weekends, and always clean up completely before leaving."
  },
  {
    question: "What if I'm renting my home?",
    answer: "We offer portable rental units that don't require permanent installation. These systems can move with you and still provide all the benefits of soft water. Ask about our rent-to-own options as well."
  }
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <motion.div 
      className={styles.faqItem}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        className={styles.faqQuestion}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{question}</span>
        <motion.div 
          className={styles.icon}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.answerContent}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>FAQ</span>
          <h2 className={styles.title}>
            Common Questions
            <span className={styles.highlight}> Answered</span>
          </h2>
          <p className={styles.subtitle}>
            Everything you need to know about water treatment and our services
          </p>
        </motion.div>

        <div className={styles.faqGrid}>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openItems.includes(index)}
                onClick={() => toggleItem(index)}
              />
            ))}
          </div>

          <motion.div 
            className={styles.ctaCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.ctaIcon}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.695 13.7h.009M15.695 16.7h.009M11.995 13.7h.009M11.995 16.7h.009M8.294 13.7h.009M8.294 16.7h.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.ctaTitle}>Still Have Questions?</h3>
            <p className={styles.ctaText}>
              Our water experts are available 24/7 to answer your questions and schedule your free consultation.
            </p>
            <div className={styles.ctaActions}>
              <a href="tel:+19565557873" className={styles.ctaPhone}>
                <svg viewBox="0 0 24 24" className={styles.phoneIcon}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
                </svg>
                <div>
                  <span className={styles.phoneLabel}>Call Now</span>
                  <span className={styles.phoneNumber}>(956) 555-PURE</span>
                </div>
              </a>
              <button className={styles.ctaButton}>
                Schedule Free Test
              </button>
            </div>
            <div className={styles.ctaBadge}>
              <svg viewBox="0 0 20 20" className={styles.badgeIcon}>
                <path fill="currentColor" d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <span>Available 24/7</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
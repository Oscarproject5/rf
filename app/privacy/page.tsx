'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './privacy.module.scss'

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
        <h1>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: August 24, 2025</p>
      </motion.div>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <section>
          <h2>1. Introduction</h2>
          <p>
            Love Water ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our water treatment services in the Rio Grande Valley area.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information (email address, phone number, mailing address)</li>
            <li>Service address for water system installation</li>
            <li>Payment and billing information</li>
            <li>Water quality test results and system preferences</li>
            <li>Communications and feedback you provide</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect certain information:</p>
          <ul>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, time spent, click patterns)</li>
            <li>Location data (general geographic location based on IP address)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for various purposes:</p>
          <ul>
            <li>Provide and maintain our water treatment services</li>
            <li>Schedule installations and service appointments</li>
            <li>Process payments and manage billing</li>
            <li>Send service reminders and maintenance notifications</li>
            <li>Respond to customer inquiries and support requests</li>
            <li>Improve our services and customer experience</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information. We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in our operations (installation teams, payment processors, email services)</li>
            <li><strong>Business Partners:</strong> Authorized dealers and manufacturers of water treatment systems</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <h2>6. Your Privacy Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and receive a copy of your personal information</li>
            <li>Correct or update inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p>To exercise these rights, contact us at privacy@lovewater.com or call (956) 123-4567.</p>
        </section>

        <section>
          <h2>7. Cookie Policy</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. Essential cookies required for website functionality cannot be disabled.
          </p>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.
          </p>
        </section>

        <section>
          <h2>9. California Privacy Rights</h2>
          <p>
            California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, used, shared, or sold.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
          <div className={styles.contactInfo}>
            <p><strong>Love Water</strong></p>
            <p>Rio Grande Valley, Texas</p>
            <p>Email: privacy@lovewater.com</p>
            <p>Phone: (956) 123-4567</p>
            <p>Website: www.lovewater.com</p>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
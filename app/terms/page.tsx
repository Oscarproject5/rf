'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './terms.module.scss'

export default function TermsOfService() {
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
        <h1>Terms of Service</h1>
        <p className={styles.lastUpdated}>Effective Date: August 24, 2025</p>
      </motion.div>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <section>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using Love Water's services, website, or purchasing our water treatment systems, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section>
          <h2>2. Services Description</h2>
          <p>Love Water provides:</p>
          <ul>
            <li>Water quality testing and analysis</li>
            <li>Water softener system installation and maintenance</li>
            <li>Reverse osmosis system installation and service</li>
            <li>Whole house water filtration solutions</li>
            <li>Ongoing maintenance and support services</li>
            <li>Emergency repair services</li>
          </ul>
          <p>
            All services are subject to availability and scheduling in the Rio Grande Valley service area.
          </p>
        </section>

        <section>
          <h2>3. Customer Responsibilities</h2>
          <p>As a customer, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information for service delivery</li>
            <li>Ensure safe access to your property for installations and service</li>
            <li>Maintain proper electrical and plumbing connections as required</li>
            <li>Follow all maintenance guidelines and recommendations</li>
            <li>Promptly report any system issues or concerns</li>
            <li>Make timely payments for services and products</li>
          </ul>
        </section>

        <section>
          <h2>4. Pricing and Payment</h2>
          <ul>
            <li>All prices are in U.S. dollars and subject to applicable taxes</li>
            <li>Quotes are valid for 30 days unless otherwise specified</li>
            <li>Payment is due upon completion of installation or as agreed</li>
            <li>We accept cash, check, and major credit cards</li>
            <li>Financing options may be available for qualified customers</li>
            <li>Late payments may incur additional fees</li>
          </ul>
        </section>

        <section>
          <h2>5. Installation and Service</h2>
          <h3>Scheduling</h3>
          <p>
            Installation dates are subject to availability. We will make reasonable efforts to accommodate your preferred schedule. Cancellations must be made at least 24 hours in advance to avoid fees.
          </p>
          
          <h3>Property Access</h3>
          <p>
            You grant Love Water and its authorized technicians permission to access your property for installation, service, and maintenance purposes.
          </p>

          <h3>Completion</h3>
          <p>
            Installation is considered complete when the system is operational and you have signed the completion form. Any additional work requested after completion may incur additional charges.
          </p>
        </section>

        <section>
          <h2>6. Warranties and Guarantees</h2>
          <ul>
            <li><strong>Installation Warranty:</strong> 1-year warranty on all installation work</li>
            <li><strong>Equipment Warranty:</strong> Manufacturer warranties apply to all equipment</li>
            <li><strong>Satisfaction Guarantee:</strong> 30-day satisfaction guarantee on new installations</li>
            <li><strong>Service Guarantee:</strong> We guarantee our service work for 90 days</li>
          </ul>
          <p>
            Warranties do not cover damage due to misuse, neglect, acts of nature, or unauthorized modifications.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Love Water shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services. Our total liability shall not exceed the amount paid for the specific service in question.
          </p>
        </section>

        <section>
          <h2>8. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property of Love Water or its licensors and is protected by copyright and trademark laws. You may not use, reproduce, or distribute our content without written permission.
          </p>
        </section>

        <section>
          <h2>9. Cancellation and Refund Policy</h2>
          <ul>
            <li><strong>Service Appointments:</strong> Cancel 24 hours in advance to avoid fees</li>
            <li><strong>Product Orders:</strong> Cancel before installation begins for full refund</li>
            <li><strong>Installed Systems:</strong> 30-day satisfaction guarantee applies</li>
            <li><strong>Maintenance Contracts:</strong> 30-day notice required for cancellation</li>
          </ul>
        </section>

        <section>
          <h2>10. Privacy and Data Protection</h2>
          <p>
            Your use of our services is also governed by our Privacy Policy. We are committed to protecting your personal information and using it only as described in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2>11. Dispute Resolution</h2>
          <p>
            Any disputes arising from these Terms or our services shall first be addressed through good faith negotiation. If resolution cannot be reached, disputes shall be settled through binding arbitration in accordance with Texas law.
          </p>
        </section>

        <section>
          <h2>12. Service Area</h2>
          <p>
            Our services are available throughout the Rio Grande Valley, including but not limited to: McAllen, Edinburg, Mission, Pharr, Brownsville, Harlingen, and surrounding areas. Service availability may vary by location.
          </p>
        </section>

        <section>
          <h2>13. Emergency Services</h2>
          <p>
            Emergency service calls are available 24/7 for existing customers with service agreements. Emergency rates may apply for after-hours, weekend, and holiday service calls.
          </p>
        </section>

        <section>
          <h2>14. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2>15. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>16. Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us:</p>
          <div className={styles.contactInfo}>
            <p><strong>Love Water</strong></p>
            <p>Rio Grande Valley, Texas</p>
            <p>Email: legal@lovewater.com</p>
            <p>Phone: (956) 123-4567</p>
            <p>Business Hours: Monday-Saturday, 8:00 AM - 6:00 PM CST</p>
          </div>
        </section>

        <section>
          <h2>17. Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section className={styles.acknowledgment}>
          <p>
            <strong>By using Love Water's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
          </p>
        </section>
      </motion.div>
    </div>
  )
}
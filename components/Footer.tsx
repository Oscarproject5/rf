'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Footer.module.scss'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.logoContainer}>
              <picture>
                <source 
                  media="(max-width: 768px)" 
                  srcSet="/logo.jpg?w=40&h=40&q=75" 
                />
                <Image 
                  src="/logo.jpg" 
                  alt="Love Water Logo" 
                  width={48} 
                  height={48}
                  className={styles.footerLogoImage}
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 768px) 40px, 48px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </picture>
              <h3 className={styles.logo}>Love Water</h3>
            </div>
            <p className={styles.tagline}>
              Pure water solutions for Rio Grande Valley families since 2009.
            </p>
            <div className={styles.certifications}>
              <div className={styles.badge}>Licensed & Insured</div>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Services</h4>
            <ul className={styles.links}>
              <li><a href="#services">Water Softening</a></li>
              <li><a href="#services">Reverse Osmosis</a></li>
              <li><a href="#services">Whole House Filtration</a></li>
              <li><a href="#contact">Free Water Testing</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Service Areas</h4>
            <ul className={styles.links}>
              <li>McAllen</li>
              <li>Edinburg</li>
              <li>Mission</li>
              <li>Pharr</li>
              <li>Harlingen</li>
              <li>Brownsville</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <a href="tel:+19565791750" className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                (956) 579-1750
              </a>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Serving all RGV
              </div>
            </div>
            <div className={styles.hours}>
              <strong>Hours:</strong>
              <span>Mon-Fri: 8AM-6PM</span>
              <span>Sat: 9AM-4PM</span>
              <span>Sun: Emergency Only</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Love Water. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <span className={styles.separator}>•</span>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
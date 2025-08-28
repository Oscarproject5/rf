'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Products.module.scss'

const products = [
  {
    id: 'hydro-spring',
    name: 'Hydro-Spring Water Softener',
    description: 'High-performance water softening system with advanced microprocessor control and programmable regeneration cycles for optimal water quality throughout your home.',
    features: [
      'Solid state microprocessor control',
      '36 pre-programmed regeneration cycles',
      'Reduces soap usage by 75%',
      'Protects appliances & plumbing',
      'Battery backup included'
    ],
    image: '/images/products/hydro-spring.webp',
    badge: 'Most Popular',
    link: '#contact'
  },
  {
    id: 'intelliclear-600',
    name: 'IntelliClear 600 RO System',
    description: 'Advanced reverse osmosis system delivering crystal-clear, purified drinking water with superior contaminant removal for your family\'s health and safety.',
    features: [
      'Multi-stage RO filtration',
      'Removes 99% of contaminants',
      'Improves taste & odor',
      'Compact under-sink design',
      'Easy filter replacement'
    ],
    image: '/images/products/intelliclear-600.png',
    badge: 'Smart Choice',
    link: '#contact'
  },
  {
    id: 'alkaline-filter',
    name: 'Alkaline Filter',
    description: 'Advanced alkaline water filtration system that adds beneficial minerals while removing impurities for healthier, better-tasting water.',
    features: [
      'Increases water pH naturally',
      'Adds essential minerals',
      'Removes heavy metals',
      'Antioxidant properties',
      'Easy maintenance'
    ],
    image: '/images/products/alkaline-filter.webp',
    badge: 'Health Focused',
    link: '#contact'
  }
]

export default function Products() {
  return (
    <section className={styles.products} id="products">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Our Products</span>
          <h2 className={styles.title}>
            Professional Water Treatment Solutions
          </h2>
          <p className={styles.subtitle}>
            We install and service premium water treatment systems tailored to your home's specific needs
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {product.badge && (
                <span className={styles.badge}>{product.badge}</span>
              )}
              
              <div className={styles.imageContainer}>
                <div className={styles.imagePlaceholder}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className={styles.productImage}
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                
                <ul className={styles.features}>
                  {product.features.map((feature, i) => (
                    <li key={i}>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none"
                        className={styles.checkIcon}
                      >
                        <path 
                          d="M13.5 4.5L6 12L2.5 8.5" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.actions}>
                  <Link href={product.link} className={styles.learnMore}>
                    Get Quote
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                    >
                      <path 
                        d="M4 8H12M12 8L8 4M12 8L8 12" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Not sure which system is right for you?
          </p>
          <Link href="#contact" className={styles.ctaButton}>
            Get Free Water Testing
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
            >
              <path 
                d="M5 10H15M15 10L10 5M15 10L10 15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
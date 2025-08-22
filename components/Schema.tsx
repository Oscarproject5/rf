'use client'

import React from 'react'

export default function Schema() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Love Water',
    description: 'Water treatment systems, filtration, and softener installation serving the Rio Grande Valley',
    url: 'https://www.lovewaterrgv.com',
    telephone: '(956) 555-7873',
    email: 'info@lovewaterrgv.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Street Address]',
      addressLocality: 'McAllen',
      addressRegion: 'TX',
      postalCode: '78501',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.2034',
      longitude: '-98.2300'
    },
    openingHours: [
      'Mo-Fr 08:00-18:00',
      'Sa 09:00-16:00'
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '26.2034',
        longitude: '-98.2300'
      },
      geoRadius: '80000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Water Treatment Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Water Filtration System Installation',
            serviceArea: 'Rio Grande Valley, Texas'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Water Softener Installation',
            serviceArea: 'Rio Grande Valley, Texas'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reverse Osmosis System Installation',
            serviceArea: 'Rio Grande Valley, Texas'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '247'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does water testing cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our comprehensive 15-point water test is completely free with no obligation. We believe you should know what\'s in your water before making any decisions about treatment systems.'
        }
      },
      {
        '@type': 'Question',
        name: 'What areas do you serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We serve the entire Rio Grande Valley including McAllen, Brownsville, Harlingen, Edinburg, Mission, Pharr, Weslaco, and surrounding communities.'
        }
      },
      {
        '@type': 'Question',
        name: 'What\'s included in the warranty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tank warranties range from 10-25 years depending on the system. Electronic components carry 5-year warranties. Labor and service warranties are 1 year. See full warranty terms for complete details and exclusions.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does installation take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most residential installations complete in 2-4 hours. Whole-home systems may require 4-6 hours. We schedule convenient times that work with your family\'s schedule and minimize disruption to your daily routine.'
        }
      }
    ]
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Whole-Home Water Filtration System',
    description: 'NSF certified multi-stage filtration system that removes chlorine, sediment, and odors from every tap in your home',
    brand: {
      '@type': 'Brand',
      name: 'Love Water'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Love Water'
      }
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Love Water - RGV Water Treatment Experts',
    url: 'https://www.lovewaterrgv.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.lovewaterrgv.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  )
}
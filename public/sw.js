const CACHE_NAME = 'love-water-v1'
const STATIC_CACHE_NAME = 'love-water-static-v1'
const DYNAMIC_CACHE_NAME = 'love-water-dynamic-v1'

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/manifest.json',
  // '/icon-192.png', // TODO: Add icon files
  // '/icon-512.png', // TODO: Add icon files
  // '/offline.html', // TODO: Create offline page
]

// Install event - skip caching for development
self.addEventListener('install', (event) => {
  console.log('Service Worker installing (caching disabled for dev)...')
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) return
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Serve from cache
          return cachedResponse
        }
        
        // Network request
        return fetch(request)
          .then(networkResponse => {
            // Don't cache if not a success
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse
            }
            
            // Cache dynamic content
            const responseToCache = networkResponse.clone()
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache)
              })
            
            return networkResponse
          })
          .catch(() => {
            // Offline fallbacks
            if (request.destination === 'document') {
              return caches.match('/offline.html')
            }
            
            if (request.destination === 'image') {
              return new Response(
                `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                  <rect width="200" height="200" fill="#f3f4f6"/>
                  <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
                    Image unavailable offline
                  </text>
                </svg>`,
                { headers: { 'Content-Type': 'image/svg+xml' } }
              )
            }
            
            return new Response('Offline - content unavailable')
          })
      })
  )
})

// Handle background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Process queued contact forms when back online
      processContactForms()
    )
  }
})

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Update',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Love Water RGV', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Utility function to process queued contact forms
async function processContactForms() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('/api/contact')) {
        try {
          await fetch(request)
          await cache.delete(request)
        } catch (error) {
          console.log('Failed to sync contact form:', error)
        }
      }
    }
  } catch (error) {
    console.log('Error processing contact forms:', error)
  }
}

// Clean up old dynamic cache entries
setInterval(() => {
  caches.open(DYNAMIC_CACHE_NAME).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > 50) { // Keep only 50 dynamic entries
        keys.slice(50).forEach(key => cache.delete(key))
      }
    })
  })
}, 60000) // Run every minute
#!/usr/bin/env node

/**
 * Performance testing script for Core Web Vitals
 * Run with: node scripts/performance-test.js
 */

const puppeteer = require('puppeteer');

const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTI: { good: 3800, poor: 7300 }
};

function getGrade(metric, value) {
  const threshold = THRESHOLDS[metric];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

async function measurePerformance(url = 'http://localhost:3000') {
  console.log('🚀 Starting performance test...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set up performance monitoring
    await page.evaluateOnNewDocument(() => {
      window.performanceMetrics = {};
      
      // Web Vitals monitoring
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            window.performanceMetrics.LCP = entry.startTime;
          }
          if (entry.entryType === 'first-input') {
            window.performanceMetrics.FID = entry.processingStart - entry.startTime;
          }
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            window.performanceMetrics.CLS = (window.performanceMetrics.CLS || 0) + entry.value;
          }
        });
      }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      
      // Navigation timing
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        window.performanceMetrics.FCP = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
        window.performanceMetrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        window.performanceMetrics.loadComplete = navigation.loadEventEnd - navigation.fetchStart;
        
        // TTI approximation
        setTimeout(() => {
          window.performanceMetrics.TTI = performance.now();
        }, 100);
      });
    });
    
    // Navigate to page
    console.log(`📊 Testing: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for metrics to be collected
    await page.waitForTimeout(2000);
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      return {
        ...window.performanceMetrics,
        // Resource timing
        resources: performance.getEntriesByType('resource').map(r => ({
          name: r.name,
          duration: r.duration,
          size: r.transferSize,
          type: r.initiatorType
        })),
        // Memory usage (if available)
        memory: performance.memory ? {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        } : null
      };
    });
    
    // Calculate bundle sizes
    const jsResources = metrics.resources.filter(r => r.name.includes('.js'));
    const cssResources = metrics.resources.filter(r => r.name.includes('.css'));
    const imageResources = metrics.resources.filter(r => r.type === 'img');
    
    const totalJS = jsResources.reduce((sum, r) => sum + (r.size || 0), 0);
    const totalCSS = cssResources.reduce((sum, r) => sum + (r.size || 0), 0);
    const totalImages = imageResources.reduce((sum, r) => sum + (r.size || 0), 0);
    
    // Results
    console.log('\n📈 Performance Results:');
    console.log('=' .repeat(50));
    
    // Core Web Vitals
    console.log('\n🎯 Core Web Vitals:');
    const webVitals = [
      { name: 'LCP', value: metrics.LCP, unit: 'ms' },
      { name: 'FID', value: metrics.FID, unit: 'ms' },
      { name: 'CLS', value: metrics.CLS, unit: '' },
      { name: 'FCP', value: metrics.FCP, unit: 'ms' },
      { name: 'TTI', value: metrics.TTI, unit: 'ms' }
    ];
    
    webVitals.forEach(({ name, value, unit }) => {
      if (value !== undefined) {
        const grade = getGrade(name, value);
        const emoji = grade === 'good' ? '✅' : grade === 'needs-improvement' ? '⚠️' : '❌';
        console.log(`${emoji} ${name}: ${Math.round(value)}${unit} (${grade})`);
      }
    });
    
    // Loading metrics
    console.log('\n⏱️  Loading Performance:');
    console.log(`📊 DOM Content Loaded: ${Math.round(metrics.domContentLoaded)}ms`);
    console.log(`🏁 Load Complete: ${Math.round(metrics.loadComplete)}ms`);
    
    // Bundle sizes
    console.log('\n📦 Bundle Analysis:');
    console.log(`🔧 JavaScript: ${(totalJS / 1024).toFixed(1)}KB`);
    console.log(`🎨 CSS: ${(totalCSS / 1024).toFixed(1)}KB`);
    console.log(`🖼️  Images: ${(totalImages / 1024).toFixed(1)}KB`);
    console.log(`📊 Total Resources: ${metrics.resources.length}`);
    
    // Memory usage
    if (metrics.memory) {
      console.log('\n💾 Memory Usage:');
      console.log(`🧠 JS Heap Used: ${(metrics.memory.used / 1024 / 1024).toFixed(1)}MB`);
      console.log(`📊 JS Heap Total: ${(metrics.memory.total / 1024 / 1024).toFixed(1)}MB`);
    }
    
    // Performance score
    const scores = webVitals
      .filter(m => m.value !== undefined)
      .map(m => getGrade(m.name, m.value) === 'good' ? 100 : getGrade(m.name, m.value) === 'needs-improvement' ? 75 : 25);
    
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    
    console.log('\n🏆 Overall Performance Score:');
    console.log(`${avgScore >= 90 ? '🟢' : avgScore >= 75 ? '🟡' : '🔴'} ${avgScore}/100`);
    
    console.log('\n✅ Performance test completed!');
    
    return metrics;
    
  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the test
if (require.main === module) {
  const url = process.argv[2] || 'http://localhost:3000';
  measurePerformance(url).catch(console.error);
}

module.exports = { measurePerformance };
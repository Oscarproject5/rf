# Love Water - Design System

## Color Palette

### Primary Colors
```css
:root {
  /* Base Colors */
  --black-primary: #000000;
  --black-soft: #0a0a0a;
  --black-medium: #1a1a1a;
  --black-light: #2a2a2a;
  
  /* Accent Colors */
  --violet-primary: #8b5cf6;
  --violet-light: #a78bfa;
  --violet-dark: #7c3aed;
  --violet-darker: #6d28d9;
  
  --purple-primary: #9333ea;
  --purple-light: #a855f7;
  --purple-dark: #7e22ce;
  --purple-darker: #6b21a8;
  
  /* Contrast Colors */
  --white-pure: #ffffff;
  --white-soft: #fafafa;
  --white-warm: #f8f7f4;
  --white-cool: #f1f5f9;
}
```

### Semantic Colors
```css
:root {
  /* Success */
  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-600: #16a34a;
  --success-900: #14532d;
  
  /* Warning */
  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-600: #d97706;
  --warning-900: #92400e;
  
  /* Error */
  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-600: #dc2626;
  --error-900: #7f1d1d;
  
  /* Info */
  --info-50: #eff6ff;
  --info-500: #3b82f6;
  --info-600: #2563eb;
  --info-900: #1e3a8a;
}
```

### Gray Scale
```css
:root {
  /* Utility Grays */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}
```

## Typography System

### Font Stack
```css
:root {
  /* Primary Fonts */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-heading: 'Bricolage Grotesque', 'Inter', sans-serif;
  --font-ui: 'Manrope', 'Inter', sans-serif;
  --font-accent: 'Space Grotesk', 'Inter', sans-serif;
  
  /* Fallback Fonts */
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
}
```

### Type Scale
```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
  --text-7xl: 4.5rem;     /* 72px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Font Weights */
  --font-thin: 100;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

### Typography Components
```css
/* Headings */
.heading-1 {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.heading-2 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.heading-3 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

/* Body Text */
.body-large {
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.body-base {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.body-small {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

/* UI Text */
.ui-button {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: 0.025em;
}

.ui-label {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### Font Swapping Implementation
```jsx
// React component for dynamic font swapping
const DynamicText = ({ text, className = "", swapIndex = 1 }) => {
  const words = text.split(' ');
  const fonts = [
    'var(--font-primary)',
    'var(--font-accent)',
    'var(--font-heading)',
    'var(--font-ui)'
  ];

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span 
          key={index}
          style={{ 
            fontFamily: index === swapIndex ? fonts[1] : fonts[0]
          }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};

// Usage examples
<DynamicText 
  text="Pure Water. Protected Families." 
  className="heading-1"
  swapIndex={2} // "Protected" will use accent font
/>

<DynamicText 
  text="The Valley's Trusted Water Experts" 
  className="heading-2"
  swapIndex={1} // "Valley's" will use accent font
/>
```

## Spacing System

### Spacing Scale
```css
:root {
  /* Base spacing unit: 0.25rem (4px) */
  --space-px: 1px;
  --space-0: 0;
  --space-0-5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-1-5: 0.375rem;  /* 6px */
  --space-2: 0.5rem;      /* 8px */
  --space-2-5: 0.625rem;  /* 10px */
  --space-3: 0.75rem;     /* 12px */
  --space-3-5: 0.875rem;  /* 14px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;    /* 44px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-28: 7rem;       /* 112px */
  --space-32: 8rem;       /* 128px */
  --space-36: 9rem;       /* 144px */
  --space-40: 10rem;      /* 160px */
  --space-44: 11rem;      /* 176px */
  --space-48: 12rem;      /* 192px */
  --space-52: 13rem;      /* 208px */
  --space-56: 14rem;      /* 224px */
  --space-60: 15rem;      /* 240px */
  --space-64: 16rem;      /* 256px */
  --space-72: 18rem;      /* 288px */
  --space-80: 20rem;      /* 320px */
  --space-96: 24rem;      /* 384px */
}
```

### Layout Spacing
```css
:root {
  /* Component spacing */
  --spacing-section: var(--space-20);
  --spacing-component: var(--space-12);
  --spacing-element: var(--space-6);
  --spacing-tight: var(--space-3);
  
  /* Container spacing */
  --container-padding: var(--space-6);
  --container-max-width: 1200px;
  
  /* Grid spacing */
  --grid-gap: var(--space-6);
  --grid-gap-lg: var(--space-8);
}
```

## Layout System

### Breakpoints
```css
:root {
  /* Breakpoint values */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Media query helpers */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Grid System
```css
/* Container */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}

/* Grid */
.grid {
  display: grid;
  gap: var(--grid-gap);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* Responsive grid */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--grid-gap);
}

/* Flexbox helpers */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
```

## Component System

### Buttons
```css
/* Button base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-ui);
  font-weight: var(--font-medium);
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: var(--radius-md);
}

/* Button sizes */
.btn-sm {
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-4);
  gap: var(--space-2);
}

.btn-md {
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-6);
  gap: var(--space-2);
}

.btn-lg {
  font-size: var(--text-lg);
  padding: var(--space-4) var(--space-8);
  gap: var(--space-3);
}

/* Button variants */
.btn-primary {
  background-color: var(--violet-primary);
  color: var(--white-pure);
}

.btn-primary:hover {
  background-color: var(--violet-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background-color: transparent;
  color: var(--violet-primary);
  border: 2px solid var(--violet-primary);
}

.btn-secondary:hover {
  background-color: var(--violet-primary);
  color: var(--white-pure);
}

.btn-ghost {
  background-color: transparent;
  color: var(--gray-700);
}

.btn-ghost:hover {
  background-color: var(--gray-100);
}
```

### Cards
```css
.card {
  background-color: var(--white-pure);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--gray-200);
}

.card-body {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--gray-200);
  background-color: var(--gray-50);
}
```

### Forms
```css
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-700);
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  transition: border-color 0.2s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--violet-primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-error {
  color: var(--error-600);
  font-size: var(--text-sm);
  margin-top: var(--space-1);
}
```

## Paper Shaders Implementation

### Primary Configuration
```jsx
import { MeshGradient } from "@paper-design/shaders-react";

const PrimaryShader = () => (
  <div className="absolute inset-0 overflow-hidden bg-black">
    {/* Primary layer */}
    <MeshGradient
      colors={['#000000', '#8b5cf6', '#ffffff', '#9333ea']}
      speed={0.3}
      className="absolute inset-0 z-0"
      style={{ filter: 'blur(0px)' }}
    />
    {/* Wireframe overlay */}
    <MeshGradient
      colors={['#000000', '#8b5cf6', '#ffffff', '#9333ea']}
      speed={0.2}
      wireframe={true}
      className="absolute inset-0 z-10"
      style={{ opacity: 0.6 }}
    />
  </div>
);
```

### Alternative Configurations

#### Aurora Configuration
```jsx
import { Aurora } from "@paper-design/shaders-react";

const AuroraBackground = () => (
  <Aurora
    colors={['#000000', '#7c3aed', '#ffffff']}
    speed={0.4}
    intensity={0.7}
    className="absolute inset-0"
    style={{ 
      background: 'linear-gradient(45deg, #000000, #1a1a1a)',
      mixBlendMode: 'screen'
    }}
  />
);
```

#### Flow Configuration
```jsx
import { Flow } from "@paper-design/shaders-react";

const FlowBackground = () => (
  <Flow
    colors={['#0a0a0a', '#a78bfa', '#f8f7f4']}
    direction="horizontal"
    speed={0.25}
    turbulence={0.3}
    className="absolute inset-0"
    style={{ 
      opacity: 0.8,
      filter: 'saturate(1.2)'
    }}
  />
);
```

#### Noise Configuration
```jsx
import { Noise } from "@paper-design/shaders-react";

const NoiseBackground = () => (
  <Noise
    baseColor="#000000"
    accentColors={['#8b5cf6', '#ffffff']}
    grain={0.3}
    movement={0.2}
    scale={1.5}
    className="absolute inset-0"
    style={{ 
      filter: 'contrast(1.1) brightness(0.9)'
    }}
  />
);
```

#### Voronoi Configuration
```jsx
import { Voronoi } from "@paper-design/shaders-react";

const VoronoiBackground = () => (
  <Voronoi
    colors={['#000000', '#8b5cf6', '#9333ea', '#ffffff']}
    cellCount={20}
    speed={0.1}
    className="absolute inset-0"
    style={{ 
      opacity: 0.7,
      mixBlendMode: 'multiply'
    }}
  />
);
```

## Shadow System

### Shadow Scale
```css
:root {
  /* Shadow definitions */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* Colored shadows */
  --shadow-violet: 0 10px 25px -5px rgb(139 92 246 / 0.3);
  --shadow-purple: 0 10px 25px -5px rgb(147 51 234 / 0.3);
  --shadow-glow: 0 0 20px rgb(139 92 246 / 0.4);
}
```

### Shadow Usage
```css
/* Card elevations */
.elevation-1 { box-shadow: var(--shadow-sm); }
.elevation-2 { box-shadow: var(--shadow-md); }
.elevation-3 { box-shadow: var(--shadow-lg); }
.elevation-4 { box-shadow: var(--shadow-xl); }

/* Interactive shadows */
.shadow-hover:hover { box-shadow: var(--shadow-violet); }
.shadow-focus:focus { box-shadow: var(--shadow-glow); }
```

## Border Radius System

### Radius Scale
```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
}
```

## Animation Specifications

### Easing Curves
```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-custom: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Duration Scale
```css
:root {
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
}
```

### Common Animations
```css
/* Hover animations */
.hover-lift {
  transition: transform var(--duration-200) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

/* Loading animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Entrance animations */
.fade-in {
  animation: fadeIn var(--duration-500) var(--ease-out);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.slide-up {
  animation: slideUp var(--duration-500) var(--ease-out);
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

## Accessibility Features

### Focus States
```css
/* Focus ring utilities */
.focus-ring {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-ring:focus {
  outline: 2px solid var(--violet-primary);
  outline-offset: 2px;
}

/* Focus visible for keyboard navigation */
.focus-visible:focus-visible {
  outline: 2px solid var(--violet-primary);
  outline-offset: 2px;
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Preserve essential animations */
  .preserve-animation {
    animation-duration: revert !important;
    transition-duration: revert !important;
  }
}
```

### High Contrast Support
```css
@media (prefers-contrast: high) {
  :root {
    --violet-primary: #5b21b6;
    --text-muted: var(--gray-900);
    --border-color: var(--gray-900);
  }
  
  .btn-primary {
    border: 2px solid var(--gray-900);
  }
}
```

This design system provides a comprehensive foundation for consistent, accessible, and visually appealing user interfaces while maintaining the premium aesthetic required for the Love Water brand.
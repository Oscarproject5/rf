# Love Water - Technical Specifications

## Opening Motion Storyboard Implementation

### Animation Sequence (6-8 seconds total)

#### Phase 1: Ambient Liquid (0-1.5s)
```jsx
// Framer Motion configuration
const ambientPhase = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.5, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
}

// CSS for ripple effect
.water-surface {
  background: radial-gradient(circle at center, 
    rgba(139, 92, 246, 0.1) 0%, 
    transparent 70%);
  animation: ripple 3s ease-in-out infinite;
}

@keyframes ripple {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(0.5deg); }
}
```

#### Phase 2: Whirlpool Formation (1.5-3s)
```jsx
const whirlpoolPhase = {
  initial: { rotate: 0, scale: 1 },
  animate: { 
    rotate: 360, 
    scale: 1.2,
    transition: { 
      duration: 1.5, 
      ease: "easeOut",
      delay: 1.5 
    }
  }
}

// CSS for vortex effect
.vortex {
  clip-path: circle(50% at center);
  background: conic-gradient(from 0deg at center, 
    #000000, #8b5cf6, #ffffff, #9333ea, #000000);
  animation: spin 1.5s ease-out 1.5s forwards;
}

@keyframes spin {
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1.2); }
}
```

#### Phase 3: Droplet Birth (3-4.5s)
```jsx
const dropletPhase = {
  initial: { 
    scaleY: 1, 
    scaleX: 1, 
    y: 0 
  },
  animate: { 
    scaleY: [1, 0.8, 1.2, 1], 
    scaleX: [1, 1.2, 0.8, 1],
    y: [0, -10, 0],
    transition: { 
      duration: 1.5, 
      delay: 3,
      ease: [0.68, -0.55, 0.265, 1.55] 
    }
  }
}

// SVG droplet with morphing
<svg viewBox="0 0 100 100" className="droplet">
  <path d="M50,20 Q30,40 50,80 Q70,40 50,20 Z">
    <animate attributeName="d" 
      values="M50,20 Q30,40 50,80 Q70,40 50,20 Z;
              M50,15 Q25,35 50,85 Q75,35 50,15 Z;
              M50,20 Q30,40 50,80 Q70,40 50,20 Z"
      dur="1.5s" begin="3s" />
  </path>
</svg>
```

#### Phase 4: Filtration Journey (4.5-6.5s)
```jsx
const filtrationPhase = {
  initial: { x: -100, opacity: 0 },
  animate: { 
    x: [0, 100, 200], 
    opacity: [0, 1, 1, 0],
    transition: { 
      duration: 2, 
      delay: 4.5,
      times: [0, 0.3, 0.7, 1] 
    }
  }
}

// Filtration stages
const stages = [
  { name: "Sediment", color: "#8b5cf6", delay: 0 },
  { name: "Carbon", color: "#9333ea", delay: 0.7 },
  { name: "RO Membrane", color: "#ffffff", delay: 1.4 }
];

// Stage glow effect
.stage-active {
  box-shadow: 0 0 20px currentColor;
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

#### Phase 5: Reveal & Loop (6.5-8s)
```jsx
const revealPhase = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 1.5, 
      delay: 6.5,
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
}

// Loop configuration
const loopConfig = {
  repeat: Infinity,
  repeatDelay: 3,
  ease: "linear"
}
```

### Accessibility & Compliance
```jsx
// Skip animation control
const SkipButton = () => (
  <button 
    className="absolute top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded"
    onClick={() => setSkipAnimation(true)}
  >
    Skip Animation
  </button>
);

// Reduced motion detection
const prefersReducedMotion = useReducedMotion();

const animationConfig = prefersReducedMotion ? 
  { duration: 0.3, ease: "easeOut" } : 
  { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] };

// Compliance messaging
const ComplianceNotice = () => (
  <div className="absolute bottom-4 left-4 text-xs text-gray-400">
    *TDS values shown are example data
  </div>
);
```

## Paper Shaders Implementation

### Primary Configuration
```jsx
import { MeshGradient } from "@paper-design/shaders-react";

const PrimaryBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-black">
    <MeshGradient
      colors={['#000000', '#8b5cf6', '#ffffff', '#9333ea']}
      speed={0.3}
      className="absolute inset-0 z-0"
      style={{ filter: 'blur(0px)' }}
    />
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
    className="absolute inset-0"
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
    className="absolute inset-0"
  />
);
```

## Framer Motion Animation System

### Core Configuration
```jsx
import { motion, useReducedMotion, useInView } from "framer-motion";

// Base motion configuration
const motionConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.6, 
    ease: [0.25, 0.46, 0.45, 0.94] 
  }
};

// Reduced motion fallback
const reducedMotionConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};
```

### Component Animations

#### Magnetic Button
```jsx
const MagneticButton = ({ children, ...props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative overflow-hidden"
      {...props}
    >
      {children}
    </motion.button>
  );
};
```

#### 3D Tilt Card
```jsx
const TiltCard = ({ children }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ 
        rotateX: tilt.x, 
        rotateY: tilt.y,
        scale: tilt.x !== 0 || tilt.y !== 0 ? 1.05 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ 
        transformStyle: "preserve-3d",
        transformOrigin: "center center"
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};
```

#### Staggered List Animation
```jsx
const StaggeredList = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### Intersection Observer Triggers
```jsx
const ScrollTriggeredAnimation = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
```

## Typography Implementation

### Google Fonts Integration
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@400;500;600;700&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
```

### Font Swapping Technique
```jsx
const DynamicHeadline = ({ text }) => {
  const words = text.split(' ');
  const fonts = [
    'Inter', 
    'Bricolage Grotesque', 
    'Space Grotesk', 
    'Manrope'
  ];

  return (
    <h1 className="text-4xl font-bold">
      {words.map((word, index) => (
        <span 
          key={index}
          style={{ 
            fontFamily: index % 2 === 1 ? fonts[1] : fonts[0] 
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  );
};
```

### CSS Font Configuration
```css
:root {
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Bricolage Grotesque', sans-serif;
  --font-ui: 'Manrope', sans-serif;
  --font-accent: 'Space Grotesk', sans-serif;
}

.font-primary { font-family: var(--font-primary); }
.font-heading { font-family: var(--font-heading); }
.font-ui { font-family: var(--font-ui); }
.font-accent { font-family: var(--font-accent); }
```

## Performance Optimization

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

### Implementation Strategies
```jsx
// Lazy loading for animations
const LazyAnimation = lazy(() => import('./OpeningAnimation'));

// Intersection observer for performance
const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
};

// GPU acceleration for animations
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

// Debounced mouse tracking
const useDebouncedMouse = (delay = 16) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId;
    
    const handleMouseMove = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      }, delay);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return position;
};
```

## Accessibility Implementation

### WCAG 2.2 AA Compliance
```jsx
// Focus management
const FocusableButton = ({ children, ...props }) => (
  <button
    className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
    {...props}
  >
    {children}
  </button>
);

// Screen reader support
const AccessibleAnimation = ({ children }) => (
  <div 
    aria-live="polite"
    aria-label="Water purification animation"
  >
    <div aria-hidden="true">
      {children}
    </div>
    <div className="sr-only">
      Animated demonstration of water purification process
    </div>
  </div>
);

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast Requirements
```css
/* Minimum contrast ratios */
.text-primary { color: #000000; } /* 21:1 on white */
.text-secondary { color: #4b5563; } /* 7.73:1 on white */
.text-accent { color: #7c3aed; } /* 4.5:1 on white */

/* High contrast mode support */
@media (prefers-contrast: high) {
  .text-accent { color: #5b21b6; } /* 7:1 on white */
}
```

## Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback Strategies
```css
/* CSS Grid fallback */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@supports not (display: grid) {
  .grid-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .grid-item {
    flex: 1 1 300px;
  }
}

/* Custom properties fallback */
.button {
  background-color: #8b5cf6;
  background-color: var(--violet-primary, #8b5cf6);
}
```

This technical specification provides comprehensive implementation guidance for all visual and interactive elements while maintaining performance and accessibility standards.
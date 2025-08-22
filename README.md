# Love Water - RGV Landing Page

A production-ready Next.js 15 landing page for Love Water, a water treatment company serving the Rio Grande Valley, Texas. Features advanced animations, Paper Shaders backgrounds, and premium UX design.

## 🌊 Features

- **Next.js 15** with App Router and TypeScript
- **Paper Shaders** (@paper-design/shaders-react) for dynamic backgrounds
- **Framer Motion** with magnetic buttons, 3D tilt effects, and smooth animations
- **WebGL Water Animation Sequence** with fallback support
- **Core Web Vitals Optimized** (LCP <2.5s, CLS <0.1, FID <100ms)
- **WCAG 2.2 AA Compliant** with reduced motion support
- **Local SEO Optimized** with JSON-LD schema markup
- **Responsive Design** with mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd love-water-landing

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Run the development server
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Main landing page
│   ├── globals.scss        # Global styles and CSS variables
│   └── api/
│       └── lead/
│           └── route.ts    # Lead form API endpoint
├── components/
│   ├── PaperBackground.tsx     # Two-layer MeshGradient background
│   ├── BackgroundVariants.tsx  # Alternative shader options
│   ├── Nav.tsx                 # Sticky navigation with gooey effects
│   ├── Hero.tsx                # Hero section with magnetic CTA
│   ├── HeroSequence.tsx        # WebGL water animation overlay
│   ├── VortexShader.tsx        # Custom WebGL vortex effect
│   ├── DropletMorph.tsx        # SVG droplet morphing animation
│   ├── FiltrationDiagram.tsx   # 3-stage filtration visualization
│   ├── VideoFallback.tsx       # Lottie/video fallback component
│   ├── MagneticButton.tsx      # Cursor-following magnetic buttons
│   ├── SpanAccent.tsx          # Typography font swapping utility
│   ├── GooeyFilterDefs.tsx     # SVG filters for morphing effects
│   └── Schema.tsx              # JSON-LD structured data
├── public/
│   ├── droplet.svg         # Water droplet icon
│   ├── shield.svg          # Warranty/security icon
│   ├── star.svg            # Rating star icon
│   └── map-pin.svg         # Location pin icon
├── package.json
├── next.config.mjs
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Colors
- **Black Primary:** `#000000` (main background)
- **Violet Primary:** `#8b5cf6` (accent color)
- **Purple Primary:** `#9333ea` (secondary accent)
- **White Pure:** `#ffffff` (contrast color)

### Typography
- **Primary Font:** Space Grotesk (Google Fonts)
- **Accent Font:** Instrument Serif (Google Fonts)
- **Font Swapping:** Dynamic word-level font changes for visual interest

### Animations
- **Magnetic Buttons:** Cursor-following with spring physics
- **3D Tilt Cards:** Parallax hover effects with depth
- **Gooey Morphing:** SVG filter-based liquid transitions
- **Staggered Entrances:** Intersection observer triggered animations

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-tracking-id

# Database connection (for lead storage)
DATABASE_URL=your-database-url

# Email service (for lead notifications)
RESEND_API_KEY=your-resend-api-key
```

### Paper Shaders Setup

The project uses `@paper-design/shaders-react` with two stacked MeshGradient layers:

```tsx
// Primary layer
<MeshGradient
  colors={['#000000', '#8b5cf6', '#ffffff', '#9333ea']}
  speed={0.3}
  distortion={0.8}
  swirl={0.1}
/>

// Wireframe overlay (simulated)
<MeshGradient
  colors={['#000000', '#8b5cf6', '#ffffff', '#9333ea']}
  speed={0.2}
  distortion={1.0}
  swirl={0.2}
  className="opacity-60"
/>
```

### Animation Sequence

The opening water animation includes:
1. **Ambient Ripples** (0-1.5s)
2. **Vortex Formation** (1.5-3s) 
3. **Droplet Birth** (3-4.5s)
4. **Filtration Journey** (4.5-6.5s)
5. **Pure Water Reveal** (6.5-8s)

## 📱 Responsive Design

### Breakpoints
- **Mobile:** 375px+
- **Tablet:** 768px+
- **Desktop:** 1024px+
- **Wide:** 1440px+

### Performance Targets
- **LCP:** <2.5 seconds
- **CLS:** <0.1
- **FID:** <100ms
- **Lighthouse Score:** >90

## ♿ Accessibility

### Features
- WCAG 2.2 AA compliance
- Screen reader optimized
- Keyboard navigation support
- Reduced motion support
- High contrast mode
- Focus management

### Testing
```bash
# Run accessibility audit
npm run a11y

# Test with screen reader
# Use NVDA, JAWS, or VoiceOver
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms
The app is compatible with any Next.js hosting platform:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## 📊 Analytics Events

The landing page tracks key conversion events:

```javascript
// CTA clicks
track('cta_click', { category: 'conversion', label: 'free_water_test' })

// Form submissions  
track('form_submit', { category: 'conversion', form_type: 'contact' })

// Phone clicks
track('phone_click', { category: 'conversion', phone_number: '956-555-7873' })

// Animation interactions
track('intro_skip', { category: 'engagement', label: 'hero_sequence' })
```

## 🔍 SEO Optimization

### Included Features
- Semantic HTML structure
- Open Graph and Twitter Card meta tags
- JSON-LD structured data (LocalBusiness, FAQPage, Product)
- Optimized images with proper alt text
- Local SEO for Rio Grande Valley targeting

### Primary Keywords
- "water filtration systems McAllen TX"
- "water softener installation Brownsville"
- "reverse osmosis Harlingen Texas"
- "RGV water treatment company"

## 📝 Content Management

Copy and content are located in:
- `copy-deck.md` - All website copy and messaging
- `brand-strategy.md` - Brand positioning and voice
- `seo-strategy.md` - Keyword strategy and optimization

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Component-scoped SCSS modules

## 📧 Lead Management

The `/api/lead` endpoint handles form submissions with:
- Zod validation
- Honeypot spam protection
- Rate limiting
- Email notifications (TODO: implement)
- Database storage (TODO: implement)

## 🎬 Lite Variant

For simpler implementations, replace animated components with static alternatives:
- Remove `HeroSequence` overlay
- Use static images instead of Paper Shaders
- Disable Framer Motion animations
- Use standard CSS transitions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ for the Rio Grande Valley water treatment industry.
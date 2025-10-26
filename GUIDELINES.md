# Repository Guidelines

## Project Structure & Architecture

This repository hosts a modern **Next.js 14** (App Router) microsite for the 4L Trophy team "La Jerricane #311". The project features:

- **Framework**: Next.js 14.2 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4
- **3D Graphics**: Three.js with React Three Fiber
- **Animation**: GSAP + Lenis smooth scroll
- **State Management**: Zustand
- **Package Manager**: pnpm

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Home page with 3D hero scene
│   ├── contact/page.tsx    # Contact form page
│   ├── equipe/page.tsx     # Team members page
│   ├── galerie/page.tsx    # Photo gallery page
│   ├── sponsors/page.tsx   # Sponsors & partnership page
│   ├── itineraire/page.tsx # Interactive route visualization
│   └── globals.css         # Global styles & Tailwind imports
├── components/             # Reusable React components
│   ├── Navigation.tsx      # Shared navigation bar
│   ├── Footer.tsx          # Shared footer
│   ├── Countdown.tsx       # Event countdown timer
│   ├── HeroScene.tsx       # Three.js canvas container
│   ├── Road.tsx            # Animated road shader
│   ├── SandParticles.tsx   # GPU particle system
│   ├── ScrollSync.tsx      # Scroll event handler
│   ├── SmoothScroll.tsx    # Lenis smooth scroll wrapper
│   └── Hud.tsx             # On-screen UI hints
└── lib/
    └── store.ts            # Zustand global state store

public/
├── antonin.png             # Team member photo
└── loric.png               # Team member photo

Configuration Files:
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.mjs         # Next.js configuration
└── postcss.config.js       # PostCSS configuration
```

## Module Organization

### Pages (App Router)

Each page follows the App Router convention:
- Place pages in `src/app/[route]/page.tsx`
- Use `'use client'` directive for client-side interactivity
- Import shared `Navigation` and `Footer` components
- Each page is self-contained with its layout and styles

### Components

**Shared UI Components**:
- `Navigation.tsx` - Fixed top navigation with active link highlighting
- `Footer.tsx` - Site-wide footer
- `Countdown.tsx` - Real-time countdown to event start

**3D Graphics Components** (Hero page only):
- `HeroScene.tsx` - Three.js canvas wrapper
- `Road.tsx` - Animated desert road with Perlin noise
- `SandParticles.tsx` - 40k GPU particles (mouse-reactive)
- `ScrollSync.tsx` - Captures scroll events → Zustand store
- `SmoothScroll.tsx` - Lenis smooth scroll wrapper

## Styling Approach

### Tailwind CSS

The project uses **utility-first CSS with Tailwind**:

- **Primary colors**:
  - Orange: `#f88b29` (brand color)
  - Dark blue: `#0b1e2d` (text & backgrounds)
  - Sand: `#f5ebe0` (section backgrounds)

- **Typography**:
  - Body: `font-inter` (variable font)
  - Headings: `font-archivo font-black` (ultra-bold)

- **Common patterns**:
  ```tsx
  // Gradient backgrounds
  className="bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#f88b29]"

  // Card styles
  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all"

  // Buttons
  className="bg-[#f88b29] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
  ```

### Global Styles

Located in `src/app/globals.css`:
- Tailwind base, components, utilities
- Custom CSS variables for colors
- Font family declarations

### Component-Scoped Styles

For complex animations or CSS not possible with Tailwind:
- Use `<style jsx>` blocks (Next.js styled-jsx)
- Example: Logo ticker animation in sponsors page

## Build, Dev & Deployment

### Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Development Workflow

1. Run `pnpm dev` to start the Next.js development server
2. Hot Module Replacement (HMR) updates changes instantly
3. TypeScript errors appear in terminal and browser
4. Tailwind classes are JIT-compiled on-demand

### Build Output

Production builds are optimized with:
- Static page generation where possible
- Client-side components dynamically imported
- Image optimization via `next/image`
- CSS purging (unused Tailwind classes removed)

## Coding Style & Conventions

### TypeScript

- **Strict mode enabled** - all types must be explicit
- Use `interface` for component props
- Prefer `const` over `let`, avoid `var`
- ES2015+ syntax (arrow functions, destructuring, async/await)

### React Patterns

```tsx
// Client component with TypeScript
'use client'

import { useState } from 'react'

interface Props {
  title: string
  count?: number
}

export default function Counter({ title, count = 0 }: Props) {
  const [value, setValue] = useState(count)

  return (
    <div className="p-4">
      <h2 className="font-archivo font-black text-2xl">{title}</h2>
      <button onClick={() => setValue(v => v + 1)}>
        Count: {value}
      </button>
    </div>
  )
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `Navigation.tsx`)
- Pages: `page.tsx` (App Router convention)
- Utilities: `camelCase.ts` (e.g., `store.ts`)

### Import Order

1. External libraries (React, Next.js, etc.)
2. Absolute imports (`@/components/...`)
3. Relative imports (`./...`)

## Performance Considerations

### Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/antonin.png"
  alt="Antonin"
  fill
  className="object-cover"
/>
```

### Dynamic Imports (Code Splitting)

```tsx
// Heavy 3D component loaded only on client
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false
})
```

### Scroll Performance

- Lenis smooth scroll runs on RAF (RequestAnimationFrame)
- GPU particles use instanced rendering (40k particles = 1 draw call)
- Scroll events throttled via Zustand store

## Testing Guidelines

**Manual Testing Checklist**:

1. **Cross-Browser Testing**:
   - Chrome, Firefox, Safari (desktop)
   - Mobile Safari, Chrome Mobile

2. **Responsive Design**:
   - Test breakpoints: 320px, 768px, 1024px, 1440px+
   - Navigation collapses on mobile (verify hamburger menu if implemented)

3. **Accessibility**:
   - Keyboard navigation works on all pages
   - Images have alt text
   - Color contrast meets WCAG AA standards

4. **Performance**:
   - Lighthouse score > 90 (desktop)
   - 3D scene runs at 60fps on modern hardware
   - No layout shifts (CLS < 0.1)

5. **Functionality**:
   - Countdown timer updates every second
   - Navigation highlights active page
   - Smooth scroll works on all pages
   - Route visualization car follows path on scroll

## Commit & Pull Request Guidelines

### Commit Messages

Follow conventional commit format:

```
feat: add Instagram feed widget to home page
fix: correct countdown timer timezone handling
style: update button hover transitions
docs: update repository guidelines
refactor: extract contact form into separate component
```

### Pull Request Process

1. **Create feature branch** from `main`:
   ```bash
   git checkout -b feature/add-newsletter-signup
   ```

2. **Make commits** with clear, descriptive messages

3. **Test locally**:
   - Run `pnpm build` to verify production build
   - Test on mobile viewport
   - Check console for errors

4. **Create PR** with:
   - Clear title and description
   - List of pages/components modified
   - Screenshots for visual changes
   - Testing steps for reviewer

5. **Code review**:
   - Address feedback promptly
   - Ensure CI checks pass (linter, build)

### Branch Naming

- Features: `feature/description`
- Fixes: `fix/description`
- Docs: `docs/description`

## Special Notes

### 3D Scene Performance

The hero 3D scene (`HeroScene.tsx`) uses:
- WebGL renderer (Three.js)
- Post-processing effects (bloom, depth of field)
- Disable on low-end devices by checking `window.matchMedia('(prefers-reduced-motion: reduce)')`

### State Management

Global state (Zustand) tracks:
- `scroll`: Current scroll position (0-400vh range)
- `mouse`: Mouse coordinates for particle interaction

```tsx
import { useStore } from '@/lib/store'

const scroll = useStore((s) => s.scroll)
const setScroll = useStore((s) => s.setScroll)
```

### Font Loading

Fonts are loaded via `next/font/google`:
- **Inter**: Body text (weights: 400, 600, 800)
- **Archivo**: Headings (weights: 700, 900)
- Font files self-hosted (no external requests)

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Auto-deploy on push to `main`
3. Preview deployments for PRs

### Manual Deployment

```bash
pnpm build
pnpm start
```

Serve `.next` directory with Node.js server.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js Manual](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Docs](https://greensock.com/docs/)

## Troubleshooting

### Build Errors

- **TypeScript errors**: Check `tsconfig.json`, ensure all types are correct
- **Missing dependencies**: Run `pnpm install`
- **Tailwind classes not working**: Verify `tailwind.config.ts` content paths

### Runtime Issues

- **3D scene not rendering**: Check browser WebGL support
- **Smooth scroll not working**: Verify Lenis initialization in `SmoothScroll.tsx`
- **Images not loading**: Ensure files exist in `public/` directory

---

**Last Updated**: 2025-10-23
**Maintainers**: Antonin & Loric (La Jerricane #311)

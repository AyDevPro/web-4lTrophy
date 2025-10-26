# La Jerricane #311 - Site 4L Trophy 2026

Site officiel de l'équipage **La Jerricane #311** pour le 4L Trophy 2026.

![4L Trophy](https://img.shields.io/badge/4L%20Trophy-2026-orange)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🎯 À propos

Antonin & Loric se lancent dans l'aventure du 4L Trophy 2026 : **6000 km** à travers le Maroc, du **18 février au 1er mars 2026**.

### Le Projet

- **Équipage** : La Jerricane #311
- **Pilotes** : Antonin (Pilote & Navigateur) + Loric (Co-Pilote & Mécanique)
- **Distance** : 6000 km (Biarritz → Marrakech)
- **Durée** : 12 jours
- **Étapes** : 6 étapes dans le Grand Sud marocain
- **Mission solidaire** : 10 kg de denrées pour la Croix-Rouge + matériel scolaire

## 🚀 Tech Stack

### Framework & Langages

- **Next.js 14.2** (App Router)
- **TypeScript 5.9** (strict mode)
- **React 18.3**

### Styling & UI

- **Tailwind CSS 3.4** (utility-first CSS)
- **Google Fonts** : Inter (body) + Archivo (headings)
- Custom animations avec transitions CSS

### 3D Graphics & Animations

- **Three.js 0.161** (WebGL rendering)
- **React Three Fiber 8.18** (React renderer pour Three.js)
- **React Three Drei 9.122** (utilitaires Three.js)
- **Postprocessing 6.37** (effets bloom, depth of field)
- **GSAP 3.13** (animations timeline)
- **Lenis 1.0** (smooth scroll)

### State Management

- **Zustand 4.5** (state store léger)

### Outils de développement

- **ESLint 8.57** (linting)
- **PostCSS 8.5** + Autoprefixer
- **pnpm 10.19** (package manager)

## 📂 Structure du Projet

```
src/
├── app/                      # Pages Next.js (App Router)
│   ├── layout.tsx            # Layout racine
│   ├── page.tsx              # Page d'accueil (hero 3D)
│   ├── contact/page.tsx      # Formulaire de contact
│   ├── equipe/page.tsx       # Présentation de l'équipe
│   ├── galerie/page.tsx      # Galerie photos
│   ├── sponsors/page.tsx     # Sponsors & partenariats
│   └── itineraire/page.tsx   # Visualisation interactive de l'itinéraire
├── components/               # Composants réutilisables
│   ├── Navigation.tsx        # Barre de navigation
│   ├── Footer.tsx            # Footer
│   ├── Countdown.tsx         # Compte à rebours
│   ├── HeroScene.tsx         # Scène 3D Three.js
│   ├── Road.tsx              # Route animée (shader)
│   ├── SandParticles.tsx     # Particules de sable (GPU)
│   ├── ScrollSync.tsx        # Synchronisation scroll
│   ├── SmoothScroll.tsx      # Wrapper Lenis
│   └── Hud.tsx               # Overlay UI
└── lib/
    └── store.ts              # Store Zustand (état global)

public/
├── antonin.png               # Photo Antonin
└── loric.png                 # Photo Loric
```

## 🛠️ Installation & Développement

### Prérequis

- **Node.js** 18+ (recommandé : 20.x)
- **pnpm** (ou npm/yarn)

### Installation

```bash
# Cloner le repo
git clone https://github.com/votre-username/site-loric.git
cd site-loric

# Installer les dépendances
pnpm install
```

### Commandes

```bash
# Démarrer le serveur de dev (http://localhost:3000)
pnpm dev

# Build de production
pnpm build

# Démarrer le serveur de production
pnpm start

# Linter
pnpm lint
```

## 🎨 Design System

### Couleurs

```css
--orange-600: #f88b29;   /* Couleur principale (boutons, accents) */
--orange-400: #f88b29;   /* Orange clair */
--ink: #0b1e2d;          /* Texte principal (bleu foncé) */
--sand-100: #f5ebe0;     /* Fond sections claires */
```

### Typographie

- **Titres** : Archivo Black (900), uppercase
- **Corps** : Inter (400, 600, 800)

### Composants

**Bouton primaire** :
```tsx
<button className="bg-[#f88b29] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
  CTA
</button>
```

**Card** :
```tsx
<div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-[#f88b29]">
  ...
</div>
```

## 🌐 Pages

### Page d'accueil (`/`)
- Hero 3D avec scène WebGL (route animée + particules de sable)
- Compte à rebours jusqu'au départ
- Stats du raid en chiffres
- Mission solidaire
- Feed Instagram (Elfsight)

### Contact (`/contact`)
- Formulaire de contact
- Informations de contact
- Liens réseaux sociaux

### Équipe (`/equipe`)
- Profils des pilotes (Antonin & Loric)
- Photos et rôles
- Histoire de l'aventure

### Galerie (`/galerie`)
- Photos de préparation
- Photos du raid
- Placeholders pour futures photos

### Sponsors (`/sponsors`)
- Logo ticker (animation défilante)
- Packs partenariat (Bronze, Argent, Or)
- CTA vers contact

### Itinéraire (`/itineraire`)
- Carte interactive avec animation au scroll
- Voiture 4L qui suit le chemin SVG
- Checkpoints (Biarritz, Algeciras, Grand Sud, Merzouga, Marrakech)
- Fond dégradé qui change avec le scroll

## 🚧 Roadmap

- [ ] Intégration formulaire de contact fonctionnel (backend)
- [ ] Ajout de vraies photos dans la galerie
- [ ] Logos sponsors réels
- [ ] Blog/actualités pendant le raid
- [ ] Tracker GPS en temps réel (pendant l'événement)
- [ ] Optimisation performance 3D (mobile)

## 📱 Responsive

Le site est entièrement responsive :
- **Mobile** : 320px - 767px
- **Tablet** : 768px - 1023px
- **Desktop** : 1024px+

Breakpoints Tailwind : `sm:` `md:` `lg:` `xl:` `2xl:`

## 🔧 Configuration

### Tailwind

`tailwind.config.ts` :
```ts
content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
]
```

### TypeScript

`tsconfig.json` - strict mode activé, alias `@/*` pour imports absolus.

### Next.js

`next.config.mjs` - React strict mode activé.

## 📄 License

Propriété de **La Jerricane #311** (Antonin & Loric).

## 🤝 Contact

- **Email** : [lajerricane07@gmail.com](mailto:lajerricane07@gmail.com)
- **Instagram** : [@lajerricane](#)
- **Facebook** : [La Jerricane](#)

---

**Développé avec ❤️ par La Jerricane #311**

🏜️ 4L Trophy 2026 • 18 février - 1er mars • 6000 km d'aventure 🏜️

# Modular Prompts Earth Visualization - Design Document

## Overview

A cinematic HTML landing page that visualizes the Modular Atomic Prompt Library as an interactive journey from space to Earth's surface. The experience tells the story of AI evolution through scroll-based time-lapse transformation.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Visual Style | Cinematic Landing Page | Scroll-based storytelling, journey from cosmos to details |
| Earth Effect | Hybrid Transform | Half realistic, half digital/wireframe - representing AI-human convergence |
| Scroll Journey | Time-lapse Evolution | Scroll controls time - primitive Earth evolves into global AI network |
| Color Palette | Sunrise Warmth | Dark space + warm horizon gradient (gold, coral, orange) - hopeful, dawn of AI era |
| Tech Stack | Three.js + GSAP | Full WebGL power for cinematic 3D, GSAP ScrollTrigger for smooth animations |

## Visual Design

### Color Palette

```css
/* Background & Space */
--space-black: #0a0a0f;
--space-deep: #0d1117;

/* Sunrise Gradient */
--sunrise-gold: #f4a261;
--sunrise-coral: #e76f51;
--sunrise-orange: #f4845f;

/* Earth Realistic */
--earth-ocean: #1a5276;
--earth-land: #2e7d32;
--earth-atmosphere: #64b5f6;

/* Earth Digital */
--digital-cyan: #00d4ff;
--digital-teal: #00bfa5;
--digital-grid: #4dd0e1;

/* Accent Colors for Categories */
--accent-identity: #ffd700;      /* Gold */
--accent-communication: #ff7f7f; /* Coral */
--accent-tools: #00d4ff;         /* Cyan */
--accent-code: #00bfa5;          /* Teal */
--accent-tasks: #ffb347;         /* Amber */
--accent-safety: #ff6b6b;        /* Soft red */
```

### Typography

- Headlines: Bold, wide letter-spacing, cinematic feel
- Body: Clean, readable, subtle
- Code: Monospace with syntax highlighting

## Architecture

### Section 1: Hero - The Hybrid Earth

**Visual Elements:**
- 3D Earth sphere with dual-texture system
- Realistic side: Earth texture, cloud layer, ocean specular
- Digital side: Wireframe grid, neural connection lines, pulse animations
- Transition zone: Animated blend between states
- Background: Star field + sunrise gradient glow behind Earth
- Atmosphere: Fresnel-based glow (blue realistic, cyan digital)

**Interactions:**
- Auto-rotation (slow, ~60s per revolution)
- Mouse parallax (subtle tilt toward cursor)
- Floating particles (satellites/data streams)

### Section 2: Scroll Journey - Time-lapse Evolution

| Stage | Scroll % | Visual State | Text | Modules |
|-------|----------|--------------|------|---------|
| Primitive | 0-15% | Pure realistic Earth | "In the beginning, there was only potential..." | None |
| First Lights | 15-30% | Night side, city lights appear | "Then came connection..." | 01-identity |
| Network Awakens | 30-50% | Connections form between cities | "Ideas began to flow..." | 02-communication, 03-tools |
| Digital Transform | 50-70% | Half transforms to wireframe | "Intelligence emerged..." | 04-code, 05-tasks |
| Hybrid Era | 70-85% | Full hybrid state, pulsing | "Human and machine, dancing together..." | 06-safety |
| Zoom Landing | 85-100% | Camera zooms through atmosphere | "Explore the building blocks..." | Transition |

**Animation Details:**
- Earth rotation speed increases slightly with progress
- City lights use emissive materials, bloom effect
- Wireframe "crawls" from major cities outward
- Particle streams flow between connection points
- Sunrise glow intensifies as story progresses

### Section 3: Module Explorer - The Landing

**Layout:**
- Subtle animated grid background (standing on digital surface)
- Mini Earth in corner (callback to journey)
- 6 hexagonal category cards in honeycomb pattern
- Composites section below

**Category Cards:**

| Category | Icon | Color | Tagline | Modules |
|----------|------|-------|---------|---------|
| 01-identity | Mask | Gold | "WHO the AI is" | 4 modules |
| 02-communication | Waves | Coral | "HOW it speaks" | 5 modules |
| 03-tool-calling | Lightning | Cyan | "HOW it acts" | 4 modules |
| 04-code-generation | Brackets | Teal | "HOW it creates" | 5 modules |
| 05-task-management | Checklist | Amber | "HOW it tracks" | 4 modules |
| 06-safety | Shield | Red | "WHAT it protects" | 4 modules |

**Interactions:**
- Hover: Card lifts with glow, shows module list preview
- Click: Expands to full panel with module details
- Particle trails connect cards on hover
- Copy button for each module

## Technical Implementation

### Dependencies

```json
{
  "three": "^0.160.0",
  "gsap": "^3.12.0",
  "@gsap/scrolltrigger": "^3.12.0"
}
```

### File Structure

```
modular-prompts/
├── visualizer/
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   ├── js/
│   │   ├── main.js
│   │   ├── earth.js        # Three.js Earth setup
│   │   ├── scroll.js       # GSAP ScrollTrigger
│   │   ├── particles.js    # Particle systems
│   │   └── explorer.js     # Module explorer UI
│   └── assets/
│       ├── textures/       # Earth textures
│       └── data/
│           └── modules.json
```

### Performance Considerations

- Use CDN for Three.js and GSAP (faster load)
- Lazy load textures as user scrolls
- Reduce particle count on mobile
- Use requestAnimationFrame efficiently
- Implement visibility-based rendering

### Responsive Strategy

- Desktop: Full 3D experience
- Tablet: Reduced particle count, smaller Earth
- Mobile: Simplified 2.5D fallback option, touch scroll optimization

## Content Integration

The visualizer will read module data from the existing markdown files:
- Parse module names and descriptions
- Display in explorer cards
- Link to raw markdown for copy functionality

## Success Metrics

- Smooth 60fps animations
- < 3s initial load time
- Engaging scroll experience
- Clear module discovery path
- Works on modern browsers (Chrome, Firefox, Safari, Edge)

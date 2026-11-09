# GrotBot Studio — Interactive Dynamic SVG Bot Maker

A sleek, tactile character design studio for building, animating, and exporting procedural vector bots inspired by the iconic Charcoal UI and Grotbot aesthetic, featuring real-time eye tracking, emotive state rigs, and clean developer exports.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following directions have been confirmed based on your requirements and are locked into the system design:

- **Visual Style**: Sleek Charcoal and Grotbot aesthetic — stark high-contrast slate-charcoal surfaces, precise vector geometries, rounded pill/squircle frames, and subtle electric accents.
- **Interactive Behaviors**: Real-time cursor pupil tracking with spatial angle clamping, organic breathing/floating idle loops, natural blink cadence, and multi-state emotive rigs (Happy, Curious, Thinking, Shocked, Sleepy).
- **Export Capabilities**: Multi-format developer and designer export engine supporting pure animated SVG source code, standalone React component snippets with TypeScript types, crisp high-resolution PNG snapshot downloads, and portable JSON presets.

---

## 1. Overview & Core Concept

### What It Does
**GrotBot Studio** is a full-featured web-based avatar creation studio and animation playground. It enables designers, developers, and product creators to compose expressive, high-polish robotic companions using an SVG assembly system. Every bot is rendered in pure vector math, fully responsive, interactive to user pointer movements, and directly exportable for production web apps, chat interfaces, and hero headers.

### Target Audience & Persona
- **Product Designers & Developers**: Building AI assistants, chatbot avatars, developer tools, documentation mascots, and onboarding guides who need charming vector characters without heavy 3D runtimes.
- **Brand & Creative Technologists**: Seeking a distinctive, retro-modern vector identity inspired by Unix terminals, Braun industrial design, and contemporary tech studios.

### Key Value
- **Zero Asset Bloat**: Completely procedural vector SVG; zero external image dependencies, ultra-lightweight DOM footprint, and infinite scalability.
- **True Interactivity**: The bot reacts to cursor movement across the viewport, blinks naturally, and switches between expressive facial states on demand.
- **Developer-First Handoff**: One-click generation of plug-and-play React components or standalone SVG files.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Explore & Pick**: User lands in the Studio greeted by a live interactive Grotbot tracking their mouse. A preset drawer offers quick-start characters (*Classic Grot-01, Echo-Pill, Byte-Cyclops, Volt-CRT, Sprout-Zen, Kiko-Sphere*).
2. **Customize & Craft**: The user tweaks anatomical parts across categorized tabs (Head Shape, Visor Glass, Eye Array, Pupils, Antennas & Ears, Mouth & Audio Display, Chassis & Decals).
3. **Palette & Style Tuning**: Dynamic color token controls (Chassis fill, Visor tint, Eye LED glow, Accent hardware, Stroke width) with instant preview updates.
4. **Interactive Emote Testing**: The user triggers emotive expressions (*Happy, Curious, Processing, Shocked, Sleepy*) or types into a live "Say Something" prompt to watch the bot respond with dynamic mouth waveform flutter.
5. **Randomize & Discover**: A "Dice" randomizer generates cohesive, aesthetically balanced bot variations.
6. **Export & Integrate**: The user opens the Export Modal to copy clean React/TSX component code, download pure SVG code, save high-res PNG, or copy/share JSON presets.

### Visual Identity & Theme
- **Aesthetic Direction**: High-precision studio tool combining Braun/Dieter Rams industrial restraint with tactile Tokyo indie web aesthetic. Clean vector line-weights, warm charcoal dark mode (`#0F1117`), crisp slate borders (`#1E2330`), and electric phosphor accent cues (`#10B981` emerald, `#38BDF8` cyber cyan, `#F59E0B` amber).
- **Color Palette & Mood**:
  - *Dominant Canvas (60%)*: Dark studio backdrop (`#0d0f14`), deep slate canvas panel (`#151921`), subtle dot grid.
  - *Structural Surfaces (30%)*: Precision toolbars, hairline separators (`#232936`), segmented control pills, tactile sliders.
  - *Accent Budget (10%)*: Active state emerald (`#10B981`), glowing cyan LED visors (`#06B6D4`), warm amber indicators.
- **Typography & Hierarchy**:
  - *Display & Headings*: `Plus Jakarta Sans` / `Outfit` for confident geometric structure.
  - *Body & Labels*: `DM Sans` / `Plus Jakarta Sans` for compact, legible property controls.
  - *Data & Specs*: `JetBrains Mono` / `tabular-nums` for coordinate metrics, slider values, and export code views.
- **Top Bar Contract**:
  - *Zone 1 (Wordmark)*: `GrotBot Studio` in clean display font with subtle version marker.
  - *Zone 2 (Nav Links)*: Single-line shortcuts (`Presets`, `Playground`, `Documentation`, `Gallery`).
  - *Zone 3 (Action)*: `Export Bot` primary CTA button.

### Interactive Feedback & Motion
- **Pupil & Eye Tracking**: Dual pupils dynamically orient toward pointer `(x, y)` relative to the bot center, clamped within the eye perimeter using smooth interpolation.
- **Breathing Physics**: Subtle periodic vertical float (`translateY: [-3px, 3px]`) and slight breathing scale pulse.
- **Organic Blink Rig**: Randomized blink timers (every 3–6s) with instantaneous lid squeeze (`scaleY: 0.1` for 120ms) then snap back.
- **Tactile Soundless Micro-interactions**: Smooth transitions between tabs, segmented button switches, and responsive live color pickers.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Procedural SVG Component Architecture vs. Pre-Rendered Sprites
- *Chosen Approach*: Pure React SVG element assembly where head, eyes, pupils, mouth, antennas, and accessories are modular SVG sub-nodes parameterized by a unified `BotConfig` schema.
- *Why*: Allows infinite resolution scaling, live runtime mouse reactivity, dynamic color tinting, and direct SVG/React code extraction without any raster limitations.
- *Alternatives Considered*: Canvas 2D / WebGL (higher complexity, harder to export clean editable vector files for web developers).

### Decision 2: Math-Based Clamped Pupil Gaze Engine
- *Chosen Approach*: Track global viewport mouse pointer, compute relative angle $\theta = \operatorname{atan2}(\Delta y, \Delta x)$ from each eye center, and clamp displacement to maximum eye radius $R_{\text{max}}$.
- *Why*: Delivers the signature "alive" sensation of Grotbot without jitter or pupils clipping outside the sclera/visor bounds.
- *Alternatives Considered*: CSS hover pseudo-classes (coarse and only works when hovering directly over the card).

### Decision 3: Multi-Format Export Engine
- *Chosen Approach*: Client-side SVG serializer that generates:
  1. Standalone valid SVG markup.
  2. Standalone React TSX component with props for size, emotion, and interactive tracking.
  3. Canvas-based PNG export using SVG Image blob rasterization.
  4. JSON preset copy/paste.
- *Why*: Maximizes utility for both designers who want quick graphic assets and developers building conversational AI apps.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          GrotBot Studio Shell                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Top Bar: Wordmark · Gallery Drawer · Presets · Primary Export CTA │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────┬────────────────────────────────────────┐ │
│ │   Left Sidebar (300px)    │        Center Stage: Live Viewport     │ │
│ │ ┌───────────────────────┐ │ ┌────────────────────────────────────┐ │ │
│ │ │ Preset Characters     │ │ │ Interactive SVG Bot Stage          │ │ │
│ │ │ - Grot Classic        │ │ │ - Real-time Cursor Gaze Follower   │ │ │
│ │ │ - Echo-Pill           │ │ │ - Floating Breathing Idle Physics  │ │ │
│ │ │ - Byte-Cyclops        │ │ │ - Interactive Emote Rig            │ │ │
│ │ │ - Volt-CRT            │ │ │ - Background: Grid / Dark / Paper  │ │ │
│ │ │ - Sprout-Zen          │ │ └────────────────────────────────────┘ │ │
│ │ ├───────────────────────┤ │ ┌────────────────────────────────────┐ │ │
│ │ │ Quick Randomize (Dice)│ │ │ Emote Strip: Normal·Happy·Curious  │ │ │
│ │ │ Reset to Default      │ │ │ Say Something: Live Speech Bubble  │ │ │
│ │ └───────────────────────┘ │ └────────────────────────────────────┘ │ │
│ ├───────────────────────────┴────────────────────────────────────────┤ │
│ │                  Right Inspector Panel (360px)                     │ │
│ │ ┌────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Modular Tabs: Anatomy | Colors | Expressions | Rig Settings    │ │ │
│ │ │ - Head: Pill, Squircle, Hexagon, CRT, Capsule, Dome            │ │ │
│ │ │ - Eyes: Modern Dual, Visor Slit, Cyclops, Dot-Matrix, Crosshair│ │ │
│ │ │ - Antenna: Spring, Radar Dish, Dual Horns, Telemetry Pin, Sprout│ │ │
│ │ │ - Mouth: Waveform Bar, LED Smile, Speaker Grid, Minimal Dash   │ │ │
│ │ │ - Palette: Chassis, Screen, Glow, Accent, Line Width           │ │ │
│ │ └────────────────────────────────────────────────────────────────┘ │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Export Modal: SVG Code · React Component Snippet · PNG · JSON Preset│ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State (`BotConfig`)

```typescript
export interface BotConfig {
  id: string;
  name: string;
  // Anatomy parts
  headShape: 'pill' | 'squircle' | 'hexagon' | 'crt' | 'capsule' | 'dome';
  eyeStyle: 'classic' | 'visor' | 'cyclops' | 'matrix' | 'crosshair' | 'sleepy';
  antennaStyle: 'spring' | 'radar' | 'horns' | 'pin' | 'sprout' | 'none';
  mouthStyle: 'waveform' | 'led_smile' | 'speaker_grid' | 'dash' | 'chatter';
  accessory: 'none' | 'glasses' | 'headphones' | 'halo' | 'badge';
  
  // Color palette
  chassisColor: string;
  chassisSecondary: string;
  visorColor: string;
  eyeColor: string;
  accentColor: string;
  strokeColor: string;
  strokeWidth: number;
  
  // Animation & Rig Parameters
  pupilSensitivity: number; // 0 to 1
  blinkCadence: number;     // seconds
  floatIntensity: number;   // amplitude
  
  // Current Runtime Emotion
  currentEmotion: 'idle' | 'happy' | 'curious' | 'thinking' | 'shocked' | 'sleepy';
}
```

### Interactive Component & State Mapping
- `usePupilTracking(containerRef, sensitivity)`: Computes normalized vector coordinates `(pupilX, pupilY)` targeting the mouse position.
- `useBlinkInterval(cadence)`: Manages periodic blink lifecycle without blocking animations.
- `GrotBotSvg`: Master SVG renderer generating smooth curves, clipping paths for visors, dynamic facial components, and drop-shadow definitions.
- `PresetSelector`: Curated gallery of styled robots with instant preview cards and quick-switch capabilities.
- `InspectorPanel`: Modular accordion and tabbed controls with tactile range sliders and hex/color swatches.
- `ExportModal`: Syntax-highlighted code output tabs with one-click copy, standalone `.svg` download, and `.png` raster export.

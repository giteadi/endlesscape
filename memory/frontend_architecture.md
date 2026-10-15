# Frontend Architecture & Component Specification

This document details the frontend architecture, component hierarchy, state machines, and performance guidelines for **Endlesscape**.

---

## ✦ Core Technologies

- **Library**: React 19 + TypeScript (Strict Type Safety)
- **Bundler**: Vite 8.3 with React Compiler & Babel Preset
- **Styling**: Modern Vanilla CSS + Design Tokens (Custom CSS variables)
- **Icons**: Lucide React
- **Typography**: Google Fonts — `Outfit` (Condensed luxury uppercase), `Cormorant Garamond` (Editorial serif), `Plus Jakarta Sans` (Body & UI)

---

## ✦ Component Architecture & Page Routing State Machine

Rather than heavy third-party routers, Endlesscape uses a high-performance, single-state router state machine in `client/src/App.tsx`:

```typescript
type PageState = 'home' | 'itinerary' | 'experience' | 'admin';
```

```
[ App.tsx ]
   │
   ├── <Navbar /> (Sticky luxury frosted obsidian bar, responsive mobile controls)
   │
   ├── [ Condition: pageState === 'home' ]
   │     ├── <Hero /> (Dual-video background, sound/pause toggles, CTAs)
   │     ├── <Philosophy /> (Four bespoke pillars with interactive tabs)
   │     ├── <TravelStyles /> (Category carousels -> triggers 'experience' page)
   │     ├── <CuratedItineraries /> (Grid cards -> triggers 'itinerary' page)
   │     └── <BrandStorySplit /> (Editorial imagery & quote blocks)
   │
   ├── [ Condition: pageState === 'itinerary' ]
   │     └── <ItineraryDetailPage />
   │           ├── Top metadata strip (Nights, Price, Best Months)
   │           ├── Photo Carousel Slider with thumbnail navigation
   │           ├── Editorial Narrative ("24 Hours in...")
   │           ├── Teal Enquiry Banner ("MAKE AN ENQUIRY")
   │           ├── Day-by-Day Expandable Itinerary Accordion
   │           └── Sticky Bottom Bar ("SO, READY TO START? ... ENQUIRE NOW")
   │
   ├── [ Condition: pageState === 'experience' ]
   │     └── <ExperienceCategoryPage />
   │           ├── Split dark editorial hero section
   │           ├── 12-Month Calendar Grid ("Where To Go on Honeymoon, When")
   │           ├── Interactive Month Filter Pills
   │           └── Trending Luxury Escapes Cards
   │
   ├── [ Condition: pageState === 'admin' ]
   │     └── <AdminPanel />
   │           ├── Real-time Enquiry CRM Pipeline & Revenue Metrics
   │           ├── Enquiry Status Management ('New', 'Proposal Sent', etc.)
   │           └── Itinerary Creator & Publisher
   │
   ├── <Footer /> (Worldwide concierge details, global offices, newsletters)
   │
   └── Global Modals:
         ├── <DestinationsMenuModal /> (Live autocomplete search suggestions)
         ├── <TripPlannerModal /> (Step-by-step bespoke enquiry questionnaire)
         ├── <ItineraryModal /> (Quick preview modal)
         └── <VideoModal /> (Fullscreen cinema player)
```

---

## ✦ Search & Autocomplete Suggestions Engine

Implemented in `client/src/components/DestinationsMenuModal.tsx`:
- Listens to search input in real time.
- Uses `useMemo` to query across:
  1. **Destinations**: Countries, cities, and iconic regions.
  2. **Itineraries**: Titles, subtitles, and highlights.
  3. **Travel Styles**: Honeymoon, Family, Safari, Private Islands.
  4. **Seasons / Months**: Autumn, Spring, November Escapes.
- Renders grouped badges (`DESTINATION`, `ITINERARY`, `EXPERIENCE`) and navigates directly upon clicking.

---

## ✦ Responsive Hero Video Engine

Implemented in `client/src/components/Hero.tsx`:
- Listens to viewport width changes (`window.innerWidth <= 768`).
- **Desktop (>768px)**: Automatically mounts `/assets/videos/hero-desktop.mp4` (1920x1080 16:9 HD cut).
- **Mobile (≤768px)**: Automatically mounts `/assets/videos/hero-mobile.mp4` (720x1280 9:16 vertical cut).
- Container height constrained to `height: 100svh; min-height: 100vh;` with `object-fit: cover` to eliminate zoom crop on widescreen displays.
- Floating glass pill controls:
  - Live pulse indicator: `● CINEMATIC EXPEDITIONS`
  - Audio mute/unmute toggle (`Volume2` / `VolumeX`)
  - Play/Pause toggle (`Play` / `Pause`)

---

## ✦ Performance & Re-render Isolation Rules

To maintain 60 FPS transitions and instant micro-interactions:
1. **Memoize all callback handlers** using `useCallback` in parent components before passing them as props.
2. **Memoize computed lists** (search suggestions, filtered month cards, stats calculations) using `useMemo`.
3. **Use CSS transform/opacity for animations**: Avoid animating `width`, `height`, or `top/left` properties that trigger browser layout thrashing.
4. **Use `playsInline` and `muted`** on all video elements for cross-browser iOS Safari and Android Chrome compliance.

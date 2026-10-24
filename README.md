# Endlesscape — Ultra-Luxury Tailor-Made Travel Platform

> Inspired by the editorial elegance of Black Tomato, Endlesscape is an award-winning luxury travel and experiential journey platform. Est. 2026.

---

## ✦ Key Highlights

- **Cinematic Responsive Video Hero**: Native 1920x1080 widescreen footage on desktop and 720x1280 vertical cut on mobile with interactive audio controls and live playback toggles.
- **Dedicated Sub-pages & Editorial Journeys**:
  - **Full Itinerary Detail Page**: Inspired by Black Tomato luxury features — top metadata strip (nights, price, ideal seasons), high-resolution photo carousel, editorial storytelling ("24 Hours in Marrakech"), teal "Make An Enquiry" banner, day-by-day outline, and sticky bottom bar.
  - **Experience Category Page**: Dark editorial hero, 12-month calendar matrix ("Where To Go on Honeymoon, When"), interactive month filtering, and trending luxury escapes.
- **Search & Live Autocomplete Suggestions**: Real-time dropdown suggestions for destinations, itineraries, travel styles, and seasonal collections.
- **Mobile Luxury UI**: Minimalist, aligned glassmorphism navigation with custom 2-line hamburger menu, hot-pink pill CTA, and full-screen drawer.
- **Admin Suite & Dynamic Backend**: Express REST API (`server/server.js`) with persistent JSON database for real-time enquiry tracking and custom itinerary management.
- **Performance Optimized**: Fine-grained memoization (`useMemo`, `useCallback`) across all interactive components to ensure zero redundant re-renders.

---

## ✦ Project Structure

```
endlesscape/
├── assets/                         # Global asset repository
│   ├── images/                     # Favicons, icons, and hero stills
│   └── videos/                     # High-definition cinematic MP4s
│       ├── hero-desktop.mp4        # 1920x1080 Widescreen Video
│       └── hero-mobile.mp4         # 720x1280 Portrait Video
├── client/                         # Vite + React 19 + TypeScript frontend
│   ├── public/
│   │   └── assets/                 # Web-served static assets
│   │       ├── images/
│   │       └── videos/
│   └── src/
│       ├── components/             # Luxury UI components & sub-pages
│       │   ├── AdminPanel.tsx
│       │   ├── DestinationsMenuModal.tsx
│       │   ├── ExperienceCategoryPage.tsx
│       │   ├── Hero.tsx
│       │   ├── ItineraryDetailPage.tsx
│       │   ├── Navbar.tsx
│       │   └── ...
│       ├── data/                   # Initial travel catalog & itineraries
│       └── types/                  # TypeScript interface contracts
└── server/                         # Express REST API backend
    ├── data/                       # database.json for enquiries & trips
    └── server.js                   # Node.js API server
```

---

## ✦ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Backend Server
```bash
cd server
npm install
node server.js
# API running on http://localhost:5001
```

### 3. Frontend Client
```bash
cd client
npm install
npm run dev
# Vite dev server running on http://localhost:5173
```

### 4. Production Build
```bash
cd client
npm run build
```

---

## ✦ License & Credits
Luxury travel curation inspired by world-class travel storytelling. Designed with craftsmanship for Endlesscape.

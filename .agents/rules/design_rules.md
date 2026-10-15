# Endlesscape Design Rules

- **Aesthetic**: Ultra-luxury bespoke travel platform modeled after Black Tomato (`blacktomato.com`).
- **Background**: Strictly Obsidian Black (`#08090b` / `#0d0f12`). No white or light modes.
- **Accents**: Surgical Hot Pink (`#ff007f`) for live status dots and high-priority action pills; Warm Gold (`#c5a059`) for ratings; Deep Teal (`#005963`) for editorial enquiry banners.
- **Typography**: Google Fonts — `Outfit` (all-caps tracked headlines), `Cormorant Garamond` (italicized editorial serifs), `Plus Jakarta Sans` (body and microcopy).
- **Hero Video**: Dual responsive streaming (`/assets/videos/hero-desktop.mp4` 16:9 on desktop, `/assets/videos/hero-mobile.mp4` on mobile) with ambient glass controls.
- **Tech Stack**: Vanilla CSS + React 19 + TypeScript. No Tailwind CSS or generic frameworks.
- **State & Performance**: All list handlers and search suggestions must be memoized with `useMemo` and `useCallback`.
- **Deployment Reference**: Read [deployment_and_hosting.md](../../memory/deployment_and_hosting.md) before making deployment changes.

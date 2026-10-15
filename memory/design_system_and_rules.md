# Endlesscape Design Constitution & AI Behavioral Rules

> **MANDATORY INSTRUCTION FOR ALL FUTURE AI ASSISTANTS & DEVELOPERS:**  
> This document defines the **immutable visual identity, design tokens, typography, and styling rules** for Endlesscape.  
> **Under NO circumstances should any future AI assistant rewrite, "modernize", or replace this design system with generic templates, standard UI kits, or flat light-mode layouts.**  
> The existing aesthetic—inspired by the ultra-luxury editorial craft of Black Tomato—is finalized and MUST be preserved.

---

## ✦ 1. Visual Identity & Brand Philosophy

Endlesscape represents **bespoke ultra-luxury travel** for high-net-worth travellers.  
Every page, card, modal, and button must evoke:
- **Atmospheric Elegance**: Deep obsidian backgrounds, subtle radial gradients, and cinematic grain.
- **Editorial Sophistication**: High-fashion typography blending uppercase geometric sans-serif with classical italic serifs.
- **Micro-Interaction Polish**: Glassmorphism (`backdrop-filter: blur(14px)`), soft hover lifts, and surgical accent glows.

---

## ✦ 2. Color Palette Tokens (Strictly Enforced)

| Token | Hex / Value | Usage & Rules |
| :--- | :--- | :--- |
| `--color-bg-primary` | `#08090b` | Main page background. **NEVER change to light or plain gray.** |
| `--color-bg-surface` | `rgba(255, 255, 255, 0.04)` | Card surfaces, modals, and container backings. |
| `--color-bg-glass` | `rgba(8, 9, 11, 0.82)` | Fixed header, drawer menus, floating pills (`blur(14px)`). |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.10)` | Card borders, dividers, subtle separators. |
| `--color-pink-accent` | `#ff007f` / `#ff2a8d` | **Signature Accent**: Used strictly for: <br>• Live pulsing expedition dots (`●`)<br>• High-priority CTAs (`ENQUIRE NOW`)<br>• Active category indicator pills<br>• Scroll cue progress bar |
| `--color-gold-accent` | `#c5a059` | Prestige stars, rating badges, VIP accolades. |
| `--color-teal-editorial`| `#005963` / `#008080` | Editorial callout block ("MAKE AN ENQUIRY" strip). |
| `--color-text-primary` | `#ffffff` | Headings, titles, active labels. |
| `--color-text-secondary`| `rgba(255, 255, 255, 0.75)`| Subtitles, editorial narratives, body text. |
| `--color-text-muted` | `rgba(255, 255, 255, 0.45)`| Metadata tags, footers, breadcrumbs. |

---

## ✦ 3. Typography Architecture

The project relies on three Google Fonts defined in `client/index.html` and `client/src/index.css`:

1. **`Outfit`** (Weights: 400, 500, 600, 700):
   - Used for all major headlines, navigation labels, and badges.
   - **Rules**: Must always be **ALL-CAPS** with generous letter-spacing (`letter-spacing: 0.04em` to `0.18em`).
   - Line height must remain tight (`1.05` to `1.15`).

2. **`Cormorant Garamond`** (Weights: 400i, 600i):
   - Used for editorial narrative headings, storytelling quotes, and highlight titles (e.g., *"24 Hours in Marrakech"*).
   - **Rules**: Must be italicized (`font-style: italic`), high-contrast, elegant serif.

3. **`Plus Jakarta Sans`** (Weights: 400, 500, 600):
   - Used for body paragraphs, day-by-day itineraries, form inputs, and concierge details.
   - **Rules**: Clean, legible, high line-height (`1.6` to `1.8`).

---

## ✦ 4. Hero Section & Video Rules

- **Responsive Dual Video**:
  - Desktop (`> 768px`): Must load `/assets/videos/hero-desktop.mp4` (1920x1080 Widescreen).
  - Mobile (`≤ 768px`): Must load `/assets/videos/hero-mobile.mp4` (720x1280 Vertical).
- **Height Constraints**:
  - Container must use `height: 100svh; min-height: 100vh;` with `object-fit: cover` and `object-position: center center`.
  - **NEVER** set fixed heights like `400px` that crop the cinematic framing.
- **Ambient Controls**:
  - The live floating glass pill (`● CINEMATIC EXPEDITIONS | 🔊 SOUND | ⏸`) must always remain accessible.
  - Video must autoplay with `muted` and `playsInline` to comply with mobile browsers.

---

## ✦ 5. Navigation & Mobile UI Guidelines

- **Desktop Header**:
  - Minimal height (70px - 80px), full-width frosted obsidian background.
  - Centered navigation links (`DESTINATIONS`, `EXPERIENCES`, `OUR PHILOSOPHY`, `ITINERARIES`).
  - Right cluster: Dedicated phone concierge + `ADMIN PORTAL` badge + hot-pink `ENQUIRE NOW` button.
- **Mobile Header (Phone Screens ≤ 768px)**:
  - Strict 36px vertical alignment for the 3 controls:
    1. Frosted circular search icon button (`36x36px`).
    2. Hot-pink pill `ENQUIRE` CTA button (`height: 36px`).
    3. Bespoke 2-line minimalist hamburger button (`36x36px`).
  - Clean edge spacing with `env(safe-area-inset)`.

---

## ✦ 6. Prohibitions & Hard Boundaries for AI

1. **NO Generic UI Frameworks**: Do NOT inject Tailwind CSS, Bootstrap, Material UI, or generic CSS utility dumps. All styles must remain in Vanilla CSS and modular CSS variables.
2. **NO Light Mode Overwrites**: Do NOT convert the application to a white or gray background. The obsidian dark luxury aesthetic is a fundamental requirement.
3. **NO Placeholder Images**: Do NOT add broken `placeholder.com` or empty grey boxes. Use the curated Unsplash luxury collection in `travelData.ts` or local `/assets/` files.
4. **NO Re-render Regressions**: Always wrap event handlers passed down as props in `useCallback` and list transformations in `useMemo`.
5. **NO Production Build Breaks**: Always run `npm --prefix client run build` to verify zero TypeScript errors before pushing any commit.

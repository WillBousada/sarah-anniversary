# SpaScroll Component — Design Doc
**Date:** 2026-03-30

## Summary

Replace `SpaSection.jsx` with a new `SpaScroll.jsx` component that animates a 7-frame sprite sheet inside a vintage CSS television border, matching the scroll-triggered animation pattern established by `DancerScroll`.

---

## What Changes

| Action | File |
|---|---|
| Create | `src/components/scrolly/SpaScroll.jsx` |
| Delete | `src/components/scrolly/SpaSection.jsx` |
| Modify | `src/pages/ScrollyPage.jsx` (swap import + JSX) |

---

## Component Design

### Section Structure
- Outer `<section>` is `min-h-[300vh]`
- Inner viewport is `position: sticky; top: 0; height: 100vh` — centered while user scrolls 300vh

### Sprite Sheet
- Asset: `/assets/spa-sprite.webp`
- Grid: 2 columns × 4 rows = 8 slots, 7 active frames (8th slot empty/repeat)
- `background-size: 200% 400%`

### Frame Positions
| Frame | background-position |
|---|---|
| 0 | `0% 0%` |
| 1 | `100% 0%` |
| 2 | `0% 33.33%` |
| 3 | `100% 33.33%` |
| 4 | `0% 66.67%` |
| 5 | `100% 66.67%` |
| 6 | `0% 100%` |

### Frame Switching Logic
- `useScroll({ target: ref, offset: ["start start", "end end"] })`
- `useTransform(scrollYProgress, [0, 1], [0, 6])` → float 0–6
- `frameProgress.on("change", v => setFrame(Math.round(Math.min(6, Math.max(0, v)))))`

### Vintage TV Border — Pure CSS
- **Outer TV body:** `background: #2a2a2a`, `border-radius: 24px`, thick padding (~20px), `box-shadow: inset 0 2px 8px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.6)`
- **Screen bezel:** `background: #1a1a1a`, `border-radius: 12px`, inner padding (~12px)
- **Screen area:** `background: #0a0a0a`, `box-shadow: inset 0 0 20px rgba(0,0,0,0.8)` — sprite sits here
- **Scanline overlay:** `position: absolute; inset: 0` with `background: repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)` — CRT feel
- **Decorative knob row:** Below the screen, a flex row with two `24px` circles (`background: #3a3a3a`, `border-radius: 50%`, inset shadow) to complete the retro TV look
- Film filter on sprite: `sepia(0.2) contrast(1.1)` — same as rest of page

### Exit Transition
- `scale: useTransform(scrollYProgress, [0.85, 1], [1, 1.15])`
- `opacity: useTransform(scrollYProgress, [0.85, 1], [1, 0])`

### Section Label
- "Relaxation" — `tracking-[0.4em] uppercase` Georgia serif, same as all other section labels

---

## Approved By
User approved 2026-03-30.

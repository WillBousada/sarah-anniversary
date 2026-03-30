# Memory Book Spread — Design Doc
**Date:** 2026-03-30

## Summary

Replace the rotating-card `MemoryBookSection` with an authentic two-page open-book spread. Pages fold from right to left around the spine axis as the user scrolls, driven by Framer Motion scroll progress. 16 images total. Rustic leather and parchment styling, pure CSS.

---

## What Changes

| Action | File |
|---|---|
| Modify (full rewrite) | `src/components/scrolly/MemoryBookSection.jsx` |

---

## Layout

```
┌──────────────┬──┬──────────────┐
│  Left page   │  │  Right page  │
│  prev image  │SP│  curr image  │
│              │IN│  (flipping)  │
└──────────────┴E─┴──────────────┘
```

- **Book width:** `clamp(500px, 82vw, 860px)`
- **Book height:** `clamp(320px, 52vh, 500px)`
- Each page is roughly half the book width minus the spine

---

## CSS 3D Flip Mechanics

### Right side layers (position: relative)
1. **Static layer** (bottom, z-index 0): always shows `IMAGES[currentPage + 1]` — waiting underneath
2. **Flipping layer** (top, z-index 1): `transform-origin: left center`, `rotateY: 0° → -180°`
   - **Front face:** `IMAGES[currentPage]` — the page being turned
   - **Back face:** `IMAGES[currentPage + 1]`, `scaleX(-1)` so it reads correctly face-down, `backfaceVisibility: hidden`

### Left side
- Shows `IMAGES[currentPage - 1]` once `currentPage > 0`
- Shows leather cover texture when `currentPage === 0`

### Scroll mapping
- `pageProgress = useTransform(scrollYProgress, [0, 1], [0, IMAGES.length - 1])`
- `currentPage = Math.floor(pageProgress)`, capped at `IMAGES.length - 2`
- `flipAngle = -(pageProgress % 1) * 180` degrees
- `rotateY` driven by `useMotionValue` (no React re-render per frame)
- `setCurrentPage` only fires when integer page index changes

---

## Rustic Styling — Pure CSS

### Book body
- `background: linear-gradient(135deg, #3d1a08 0%, #5c2a10 30%, #3d1a08 60%, #4a2010 100%)`
- `border-radius: 3px 8px 8px 3px` (slight curve on right, flush on spine left)
- `box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)` — heavy lift
- `padding: 16px` on outer edges, no padding between pages and spine

### Spine
- Width: `~22px`
- `background: linear-gradient(to right, #1a0a03, #3d1a08, #1a0a03)`
- `box-shadow: inset 2px 0 4px rgba(0,0,0,0.5), inset -2px 0 4px rgba(0,0,0,0.5)`
- Faint vertical highlight line in center to suggest binding ridge

### Pages
- `background: #f5f0e0` (aged parchment) as page background
- Photo fills the page with `object-fit: cover`
- `padding: 8px` around photo to show parchment border
- Subtle `inset box-shadow` to suggest page depth

### Page lift shadow
- On the flipping layer: `box-shadow` interpolated via `useTransform`
- At 0°: `0 2px 8px rgba(0,0,0,0.2)` (flat, minimal shadow)
- At 90°: `8px 0 30px rgba(0,0,0,0.5)` (maximum lift — page is vertical)
- At 180°: `0 2px 8px rgba(0,0,0,0.2)` (flat again, landed)

---

## Scroll / Section

- Section: `min-h-[1500vh]` — ~100vh per page flip for 16 images (15 flips)
- Sticky `top-0 h-screen` inner viewport
- Book fades out: `opacity useTransform(scrollYProgress, [0.97, 1], [1, 0])`
- "Memory Book" label above, "scroll to turn the page" below

---

## Images (16 total, deduped)

```
/assets/IMG_1099.jpg, IMG_1631.JPG, IMG_2199.jpg, IMG_2298.jpg,
IMG_2456.jpg, IMG_2492.jpg, IMG_2755.jpeg, IMG_2780.JPG,
IMG_2822.JPG, IMG_2886.jpg, IMG_2930.jpg, IMG_3017.jpg,
IMG_3021.jpg, IMG_3028.jpg, IMG_7690.jpeg, IMG_2052.jpeg
```

---

## Approved By
User approved 2026-03-30.

# DancerScroll Component — Design Doc
**Date:** 2026-03-30

## Summary

Replace `DanceSection.jsx` with a new `DancerScroll.jsx` component that animates a 6-frame sprite sheet in sync with scroll progress, giving the dancing section a scroll-triggered cartoon feel with a vintage film filter and a smooth fade-out exit.

---

## What Changes

| Action | File |
|---|---|
| Create | `src/components/scrolly/DancerScroll.jsx` |
| Delete | `src/components/scrolly/DanceSection.jsx` |
| Modify | `src/pages/ScrollyPage.jsx` (swap import + JSX) |

---

## Component Design

### Section Structure
- Outer `<section>` is `min-h-[300vh]` — 3 screen-lengths of scroll room
- Inner viewport is `position: sticky; top: 0` so the animation stays centered while the user scrolls through the 300vh

### Sprite Sheet
- Asset: `/assets/dancing-sprite.png`
- Grid: 3 columns × 2 rows = 6 frames
- Applied as `background-image` on the sprite container div
- `background-size: 300% 200%` — exactly one frame visible at a time

### Frame Positions
| Frame | background-position |
|---|---|
| 0 | `0% 0%` |
| 1 | `50% 0%` |
| 2 | `100% 0%` |
| 3 | `0% 100%` |
| 4 | `50% 100%` |
| 5 | `100% 100%` |

### Frame Switching Logic
- `useScroll({ target: ref, offset: ["start start", "end end"] })` scoped to the 300vh outer container
- `useTransform(scrollYProgress, [0, 1], [0, 5])` produces a 0–5 float
- Subscribe to the motionValue via `.on("change", v => setFrame(Math.round(v)))` in a `useEffect`
- Frame index drives `background-position` lookup — hard jumps, no interpolation

### Film Grain Feel
- Inline `filter: sepia(0.2) contrast(1.1)` on the sprite container — matches the `.vintage-img` style used across all other images

### Exit Transition
- `scale: useTransform(scrollYProgress, [0.85, 1], [1, 1.15])`
- `opacity: useTransform(scrollYProgress, [0.85, 1], [1, 0])`
- Applied to the sticky inner wrapper via Framer Motion `style` prop
- Cartoon scales up and dissolves as user scrolls into SpaSection

### Section Label
- "Energy & Movement" in `tracking-[0.4em] uppercase` Georgia serif
- Centered above the sprite, same style as all other section labels

---

## Approved By
User approved 2026-03-30.

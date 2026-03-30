# LakeScroll Component — Design Doc
**Date:** 2026-03-30

## Summary

Replace `OutdoorsSection.jsx` with `LakeScroll.jsx` — a scroll-triggered 6-frame sprite animation displayed inside a pure-CSS classic sash window frame, consistent with the DancerScroll and SpaScroll pattern.

---

## What Changes

| Action | File |
|---|---|
| Create | `src/components/scrolly/LakeScroll.jsx` |
| Delete | `src/components/scrolly/OutdoorsSection.jsx` |
| Modify | `src/pages/ScrollyPage.jsx` (swap import + JSX) |

---

## Component Design

### Scroll Structure
- Identical to `DancerScroll` and `SpaScroll`
- 300vh outer section, sticky h-screen inner viewport
- Same exit: `scale 1→1.15`, `opacity 1→0` over `[0.85, 1]`

### Sprite Sheet
- Asset: `/assets/lake-sprite.png`
- Grid: 3×2 = 6 frames (identical to DancerScroll)
- `backgroundSize: "300% 200%"`
- Same `FRAMES` array: `["0% 0%", "50% 0%", "100% 0%", "0% 100%", "50% 100%", "100% 100%"]`
- Frame index: `[0, 1]` → `[0, 5]`, `Math.round` clamped 0–5
- Sprite size: `clamp(260px, 55vmin, 480px)` — same as dancer and spa

### Sash Window Frame — Pure CSS

**Structure (outside → in):**
1. **Outer frame** — cream/white painted wood (`#F5F0E8`), `border: 18px solid #F5F0E8`, slight border radius `4px`, drop shadow `0 20px 50px rgba(0,0,0,0.3)`, inset shadow `inset 0 0 10px rgba(0,0,0,0.1)` to suggest glass recess
2. **Sprite + overlay container** — `position: relative`, sprite fills the area
3. **Sash rail (horizontal divider)** — `position: absolute`, full width, ~14px tall, centered vertically (`top: 50%`, `transform: translateY(-50%)`), same `#F5F0E8`, `box-shadow: 0 2px 4px rgba(0,0,0,0.15)` for depth
4. **Vertical muntin** — `position: absolute`, full height, ~10px wide, centered horizontally, same cream color, thinner than the rail
5. **Window sill** — rectangle directly below the frame, wider than the frame (`+20px each side`), shallower height (~14px), same cream, `border-radius: 0 0 4px 4px`, bottom shadow

### Film Filter
- `sepia(0.2) contrast(1.1)` on sprite div only — frame stays clean cream

### Section Label
- "The Great Outdoors" — `tracking-[0.4em] uppercase` Georgia serif, centered above

---

## Approved By
User approved 2026-03-30.

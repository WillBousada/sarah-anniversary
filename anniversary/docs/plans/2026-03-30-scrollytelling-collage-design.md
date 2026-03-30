# Scrollytelling Collage Page — Design Doc
**Date:** 2026-03-30

## Summary

Replace the current landing page (`/`) with a high-end scrollytelling photo collage. Move the existing 2025 anniversary experience to `/anniversary-2025`. Use Lenis for smooth inertial scrolling and Framer Motion for all scroll-linked animations.

---

## Routing Changes

| Route | Component | Notes |
|---|---|---|
| `/` | `ScrollyPage.jsx` (new) | New scrollytelling landing |
| `/anniversary-2025` | `Anniversary2025Page.jsx` | Current `App.jsx` content, moved |
| `/valentine` | `ValentinePage.jsx` | Unchanged |

`Layout.jsx` (`BubbleMenu`) gets a new nav item: **"2025"** → `/anniversary-2025`. Valentine link stays.

---

## Architecture — Option B (Feature-Folder)

```
src/
  pages/
    ScrollyPage.jsx          ← new home route, orchestrates sections + grain overlay
    Anniversary2025Page.jsx  ← current App.jsx content moved here
  components/
    scrolly/
      SmoothScroll.jsx       ← Lenis wrapper, connects to Framer Motion scroll
      ParallaxImage.jsx      ← useScroll + useTransform float/rotate per image
      MediaFrame.jsx         ← <img> ↔ <video> toggle on hover or scroll trigger
      PolaroidFrame.jsx      ← polaroid border, drop-shadow, sepia filter
      HeroSection.jsx        ← IMG_1099 full-screen hero
      OutdoorsSection.jsx    ← IMG_2930 + IMG_2755 side-by-side parallax
      DanceSection.jsx       ← IMG_7690 motion-blur fast scroll
      SpaSection.jsx         ← IMG_3017 slow fade transition
      MemoryBookSection.jsx  ← 3D CSS rotateY page-flip (0°→180° on scroll)
      RevealSection.jsx      ← IMG_2052 scroll-to-zoom (scale 1→1.4)
  index.css                  ← grain animation + film filter CSS added here
```

---

## Key Technical Decisions

### Smooth Scrolling
- `SmoothScroll.jsx` wraps children, initializes Lenis on mount, and drives Framer Motion's scroll engine via `lenis.on('scroll', () => ScrollTrigger-compat RAF)`
- Lenis destroyed on unmount

### ParallaxImage
- `useScroll({ target: ref })` scoped to each image's container
- `useTransform(scrollYProgress, [0, 1], ["-30px", "30px"])` for y-float
- `useTransform(scrollYProgress, [0, 1], ["-3deg", "3deg"])` for rotation

### PolaroidFrame
- White border (`border-[12px] border-white`) + `drop-shadow-xl`
- Inline `filter: sepia(0.2) contrast(1.1) brightness(0.95)` on the image
- Optional caption slot at the bottom (polaroid label area)

### MemoryBookSection (Page Flip)
- Outer container has CSS `perspective: 1200px`
- Inner "page" div uses `useTransform(scrollYProgress, [0, 0.5, 1], ["0deg", "90deg", "180deg"])` on `rotateY`
- Front face: first image; back face: second image (rotated 180° in CSS, `backface-visibility: hidden`)

### MediaFrame
- Default: renders `<img src={src} />`
- On hover OR when `scrollTriggered` prop becomes true: swaps to `<video src={videoSrc} autoPlay loop muted playsInline />`
- Animates the swap with a brief opacity crossfade via Framer Motion `AnimatePresence`

### Film Grain
- `.grain-overlay` fixed div added inside `ScrollyPage.jsx` only — does not affect `/anniversary-2025`
- CSS in `index.css` using base64 noise texture + keyframe translate animation (8s, 10 steps)
- `opacity: 0.05`, `pointer-events: none`, `z-index: 9999`

### Visual Theme
- Page background: `#FDFCF0` (cream)
- All images: `sepia(0.2) contrast(1.1) brightness(0.95)`
- Typography: soft serif or thin sans on cream background

---

## Content Sections

| Section | Image | Effect |
|---|---|---|
| Hero | `IMG_1099` (Formal night) | Full-screen, subtle scale on scroll |
| Great Outdoors | `IMG_2930` (Lake selfie) + `IMG_2755` (The kiss) | Side-by-side parallax float |
| Energy & Movement | `IMG_7690` (Dancing) | Motion-blur CSS filter, fast scroll pacing |
| Relaxation | `IMG_3017` (Spa day) | Slow cross-fade, gentle opacity transition |
| Memory Book | Two images (flip front/back) | 3D rotateY page flip |
| The Reveal | `IMG_2052` (Holiday/Home) | Scroll-to-zoom, scale 1→1.4 |

All image paths use `/assets/IMG_XXXX.jpg` placeholders.

---

## Approved By
User approved 2026-03-30.

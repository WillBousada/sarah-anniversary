# Scrollytelling Collage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace `/` with a high-end Lenis + Framer Motion scrollytelling photo collage, and move the current anniversary page to `/anniversary-2025`.

**Architecture:** Feature-folder layout under `src/components/scrolly/`. `ScrollyPage.jsx` orchestrates all sections and the grain overlay. `SmoothScroll.jsx` initializes Lenis and syncs it to Framer Motion's RAF loop. Each visual section is a self-contained component.

**Tech Stack:** Vite + React 19, Tailwind CSS v4, framer-motion (already installed), lenis (already installed), lucide-react (needs install)

---

### Task 1: Install lucide-react

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

```bash
cd anniversary && npm install lucide-react
```

Expected output: `added N packages`

**Step 2: Verify it appears in package.json**

Open `package.json` and confirm `"lucide-react"` is in `dependencies`.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add lucide-react dependency"
```

---

### Task 2: Move current landing page to Anniversary2025Page

**Files:**
- Create: `src/pages/Anniversary2025Page.jsx`
- The content is a copy of `src/App.jsx` — same JSX, same imports

**Step 1: Create the new page file**

Create `src/pages/Anniversary2025Page.jsx` with this content:

```jsx
import WelcomeText from "../components/SplitText";
import CircularText from "../components/CircularText";
import FloatingHearts from "../components/FloatingHearts";
import Timeline from "../components/Timeline";
import Stack from "../components/Stack";
import LoveLetter from "../components/LoveLetter";
import BumbleBee from "../components/BumbleBee";

export default function Anniversary2025Page() {
    return (
        <div className="overflow-x-hidden">
            {/* Section 1: Opening */}
            <section
                id="opening"
                className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 flex items-center justify-center p-4 relative"
            >
                <FloatingHearts count={15} />
                <WelcomeText
                    text="Hello Beautiful"
                    tag="h1"
                    className="text-7xl font-bold text-white italic"
                    delay={150}
                    duration={1.2}
                    splitType="chars"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                />
            </section>

            {/* Section 2: One Year */}
            <section
                id="oneyear"
                className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-400 to-fuchsia-300 flex flex-col items-center justify-center p-4 gap-8 relative"
            >
                <WelcomeText
                    text="I can't believe it's been a year"
                    tag="h2"
                    className="text-5xl font-bold text-white italic"
                    delay={80}
                    duration={1}
                    splitType="words"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                />
                <CircularText
                    text=" 365 days * Laughs * Adventures * Love *"
                    onHover="speedUp"
                    spinDuration={20}
                />
                <WelcomeText
                    text="Scroll to see our journey together ↓"
                    tag="p"
                    className="text-2xl text-white/80 italic"
                    delay={50}
                    duration={0.8}
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                />
            </section>

            {/* Section 3: Lovverrrruuuu */}
            <section className="min-h-screen bg-gradient-to-br from-fuchsia-300 via-purple-300 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden">
                <FloatingHearts count={20} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="relative z-10 transform -rotate-45 origin-center">
                    <WelcomeText
                        text="lovvvvverrrruuuuuuuuuu"
                        tag="h2"
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white italic whitespace-nowrap drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]"
                        delay={80}
                        duration={1.5}
                        splitType="chars"
                        from={{ opacity: 0, scale: 0.3, rotateZ: -20, y: 100 }}
                        to={{ opacity: 1, scale: 1, rotateZ: 0, y: 0 }}
                    />
                </div>
                <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce">✨</div>
                <div className="absolute bottom-1/4 right-1/4 text-6xl animate-bounce" style={{ animationDelay: "0.3s" }}>💕</div>
                <div className="absolute top-1/3 right-1/3 text-5xl animate-bounce" style={{ animationDelay: "0.6s" }}>💖</div>
            </section>

            {/* Section 4: Timeline */}
            <section
                id="timeline"
                className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-400 to-pink-400 py-20 px-4"
            >
                <Timeline />
            </section>

            {/* Section 5: Bumble Bee */}
            <section
                id="bee"
                className="min-h-screen bg-gradient-to-br from-yellow-200 via-amber-200 to-yellow-300 flex items-center justify-center p-4 relative"
            >
                <BumbleBee />
            </section>

            {/* Section 6: Photo Stack */}
            <section
                id="gallery"
                className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-400 py-20 px-4 flex items-center justify-center"
            >
                <Stack />
            </section>

            {/* Section 7: Love Letter */}
            <section
                id="letter"
                className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 flex items-center justify-center p-4"
            >
                <LoveLetter />
            </section>

            {/* Final Section: Hearts */}
            <section className="min-h-screen bg-gradient-to-br from-fuchsia-300 via-pink-400 to-rose-400 flex items-center justify-center p-4 relative">
                <FloatingHearts count={30} />
                <WelcomeText
                    text="Happy Anniversary Sarah ♥"
                    tag="h1"
                    className="text-6xl font-bold text-white italic"
                    delay={120}
                    duration={1.2}
                    splitType="chars"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                />
            </section>
        </div>
    );
}
```

**Step 2: Verify dev server still works**

Run `npm run dev` and confirm no console errors.

**Step 3: Commit**

```bash
git add src/pages/Anniversary2025Page.jsx
git commit -m "feat: extract anniversary 2025 page from App.jsx"
```

---

### Task 3: Update routing and navbar

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/components/Layout.jsx`

**Step 1: Update main.jsx**

Replace the contents of `src/main.jsx` with:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import ScrollyPage from './pages/ScrollyPage.jsx'
import Anniversary2025Page from './pages/Anniversary2025Page.jsx'
import ValentinePage from './pages/ValentinePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ScrollyPage />} />
          <Route path="/anniversary-2025" element={<Anniversary2025Page />} />
          <Route path="/valentine" element={<ValentinePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
```

**Step 2: Update Layout.jsx navbar items**

In `src/components/Layout.jsx`, replace the `menuItems` array with:

```jsx
const menuItems = [
    {
        label: "Home",
        href: "/",
        ariaLabel: "Home",
        rotation: -8,
        hoverStyles: { bgColor: "#ec4899", textColor: "#ffffff" },
    },
    {
        label: "2025",
        href: "/anniversary-2025",
        ariaLabel: "Anniversary 2025",
        rotation: 8,
        hoverStyles: { bgColor: "#f472b6", textColor: "#ffffff" },
    },
    {
        label: "Valentine",
        href: "/valentine",
        ariaLabel: "Be My Valentine",
        rotation: -8,
        hoverStyles: { bgColor: "#e11d48", textColor: "#ffffff" },
    },
];
```

Also update the `href` handling in `BubbleMenu` — the existing items use `#anchor` hrefs (scroll links), but `/anniversary-2025` and `/valentine` are routes. Check `src/components/BubbleMenu.jsx` to confirm it uses `<a href>` or `<Link to>`. If it uses `<a href>`, the route links will work fine via full navigation. If it uses smooth scroll anchors, you may need to switch to `<Link>` from react-router-dom for route items. Add a conditional: if href starts with `/`, render `<Link to={href}>`, else render `<a href={href}>`.

**Step 3: Create a placeholder ScrollyPage so routing doesn't 404**

Create `src/pages/ScrollyPage.jsx` temporarily:

```jsx
export default function ScrollyPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#FDFCF0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "serif", fontSize: "2rem", color: "#888" }}>Coming soon…</p>
        </div>
    );
}
```

**Step 4: Verify routing**

Run `npm run dev`. Confirm:
- `/` shows the placeholder
- `/anniversary-2025` shows the full 2025 anniversary page
- `/valentine` still works
- Navbar shows "Home", "2025", "Valentine"

**Step 5: Commit**

```bash
git add src/main.jsx src/components/Layout.jsx src/pages/ScrollyPage.jsx
git commit -m "feat: add anniversary-2025 route and update navbar"
```

---

### Task 4: Add grain CSS and film filter to index.css

**Files:**
- Modify: `src/index.css`

**Step 1: Append grain + filter CSS**

Add to the bottom of `src/index.css`:

```css
/* Film grain overlay */
.grain-overlay {
  position: fixed;
  top: -150%;
  left: -150%;
  right: -150%;
  bottom: -150%;
  width: 300%;
  height: 300%;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_ext_noise_transparent.png");
  background-repeat: repeat;
  animation: grain 8s steps(10) infinite;
  opacity: 0.05;
  pointer-events: none;
  z-index: 9999;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10%       { transform: translate(-5%, -10%); }
  20%       { transform: translate(-15%, 5%); }
  30%       { transform: translate(7%, -25%); }
  40%       { transform: translate(-5%, 25%); }
  50%       { transform: translate(-15%, 10%); }
  60%       { transform: translate(15%, 0%); }
  70%       { transform: translate(0%, 15%); }
  80%       { transform: translate(3%, 35%); }
  90%       { transform: translate(-10%, 10%); }
}

/* Vintage image filter — apply to <img> inside PolaroidFrame */
.vintage-img {
  filter: sepia(0.2) contrast(1.1) brightness(0.95);
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Step 2: Verify no build errors**

Run `npm run dev` and confirm no CSS parse errors.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add film grain and vintage image filter CSS"
```

---

### Task 5: Build SmoothScroll wrapper

**Files:**
- Create: `src/components/scrolly/SmoothScroll.jsx`

**Step 1: Create the component**

```jsx
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
```

**Step 2: Verify no import errors**

Temporarily import it in `ScrollyPage.jsx` and wrap the placeholder div. Confirm dev server shows no errors.

**Step 3: Commit**

```bash
git add src/components/scrolly/SmoothScroll.jsx
git commit -m "feat: add Lenis SmoothScroll wrapper"
```

---

### Task 6: Build PolaroidFrame

**Files:**
- Create: `src/components/scrolly/PolaroidFrame.jsx`

**Step 1: Create the component**

```jsx
export default function PolaroidFrame({ children, caption = "", className = "" }) {
    return (
        <div
            className={`bg-white p-3 pb-10 shadow-2xl shadow-black/30 relative ${className}`}
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))" }}
        >
            <div className="overflow-hidden w-full h-full">
                {children}
            </div>
            {caption && (
                <p
                    className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-500 italic"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {caption}
                </p>
            )}
        </div>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/PolaroidFrame.jsx
git commit -m "feat: add PolaroidFrame component"
```

---

### Task 7: Build ParallaxImage

**Files:**
- Create: `src/components/scrolly/ParallaxImage.jsx`

**Step 1: Create the component**

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PolaroidFrame from "./PolaroidFrame";

export default function ParallaxImage({
    src,
    alt = "",
    caption = "",
    width = "w-72",
    height = "h-80",
    yRange = [-30, 30],
    rotateRange = [-3, 3],
    className = "",
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], yRange.map(v => `${v}px`));
    const rotate = useTransform(scrollYProgress, [0, 1], rotateRange.map(v => `${v}deg`));

    return (
        <motion.div ref={ref} style={{ y, rotate }} className={`${width} ${className}`}>
            <PolaroidFrame caption={caption}>
                <div className={`${height} overflow-hidden`}>
                    <img src={src} alt={alt} className="vintage-img" />
                </div>
            </PolaroidFrame>
        </motion.div>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/ParallaxImage.jsx
git commit -m "feat: add ParallaxImage with Framer Motion scroll-linked parallax"
```

---

### Task 8: Build MediaFrame

**Files:**
- Create: `src/components/scrolly/MediaFrame.jsx`

**Step 1: Create the component**

```jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MediaFrame({
    src,
    videoSrc = null,
    alt = "",
    scrollTriggered = false,
    className = "",
}) {
    const [hovered, setHovered] = useState(false);
    const showVideo = videoSrc && (hovered || scrollTriggered);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence mode="crossfade">
                {showVideo ? (
                    <motion.video
                        key="video"
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="vintage-img absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                ) : (
                    <motion.img
                        key="image"
                        src={src}
                        alt={alt}
                        className="vintage-img"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/MediaFrame.jsx
git commit -m "feat: add MediaFrame with hover/scroll-triggered img-to-video swap"
```

---

### Task 9: Build HeroSection

**Files:**
- Create: `src/components/scrolly/HeroSection.jsx`

**Step 1: Create the component**

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={ref}
            className="relative h-screen overflow-hidden flex items-end justify-start"
        >
            {/* Parallax image */}
            <motion.div
                className="absolute inset-0"
                style={{ scale, y }}
            >
                <img
                    src="/assets/IMG_1099.jpg"
                    alt="Formal night"
                    className="vintage-img w-full h-full object-cover"
                />
                {/* Dark gradient at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Hero text */}
            <motion.div
                className="relative z-10 p-10 md:p-16"
                style={{ opacity }}
            >
                <p
                    className="text-white/60 text-sm tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Our Story
                </p>
                <h1
                    className="text-5xl md:text-7xl font-light text-white leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Sarah &<br />
                    <em>Will</em>
                </h1>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <span className="text-white/50 text-xs tracking-widest uppercase" style={{ fontFamily: "sans-serif" }}>
                    Scroll
                </span>
                <div className="w-px h-12 bg-white/30" />
            </motion.div>
        </section>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/HeroSection.jsx
git commit -m "feat: add HeroSection with scroll-parallax and scale"
```

---

### Task 10: Build OutdoorsSection

**Files:**
- Create: `src/components/scrolly/OutdoorsSection.jsx`

**Step 1: Create the component**

```jsx
import ParallaxImage from "./ParallaxImage";

export default function OutdoorsSection() {
    return (
        <section className="min-h-screen flex items-center justify-center py-32 px-8 overflow-hidden">
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
                {/* Left image — floats up */}
                <ParallaxImage
                    src="/assets/IMG_2930.jpg"
                    alt="Lake selfie"
                    caption="our happy place"
                    width="w-64 md:w-80"
                    height="h-80 md:h-96"
                    yRange={[-40, 40]}
                    rotateRange={[-4, 2]}
                    className="md:-mt-16"
                />

                {/* Section label */}
                <div className="text-center flex-shrink-0">
                    <p
                        className="text-stone-400 text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        The Great Outdoors
                    </p>
                    <div className="w-px h-20 bg-stone-300 mx-auto" />
                </div>

                {/* Right image — floats down */}
                <ParallaxImage
                    src="/assets/IMG_2755.jpg"
                    alt="The kiss"
                    caption="always"
                    width="w-64 md:w-80"
                    height="h-80 md:h-96"
                    yRange={[40, -40]}
                    rotateRange={[2, -4]}
                    className="md:mt-16"
                />
            </div>
        </section>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/OutdoorsSection.jsx
git commit -m "feat: add OutdoorsSection with opposing parallax images"
```

---

### Task 11: Build DanceSection

**Files:**
- Create: `src/components/scrolly/DanceSection.jsx`

**Step 1: Create the component**

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PolaroidFrame from "./PolaroidFrame";

export default function DanceSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Fast horizontal slide as user scrolls
    const x = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    // Motion blur via CSS filter, driven by scroll velocity feel
    const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [
        "blur(6px)",
        "blur(0px)",
        "blur(0px)",
        "blur(6px)",
    ]);

    return (
        <section
            ref={ref}
            className="min-h-screen flex items-center justify-center py-32 px-8 overflow-hidden"
        >
            <div className="flex flex-col items-center gap-12">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Energy &amp; Movement
                </p>

                <motion.div style={{ x, filter: blur }} className="w-72 md:w-96">
                    <PolaroidFrame caption="every song, with you">
                        <div className="h-96 overflow-hidden">
                            <img
                                src="/assets/IMG_7690.jpg"
                                alt="Dancing"
                                className="vintage-img"
                            />
                        </div>
                    </PolaroidFrame>
                </motion.div>
            </div>
        </section>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/DanceSection.jsx
git commit -m "feat: add DanceSection with motion-blur and horizontal drift"
```

---

### Task 12: Build SpaSection

**Files:**
- Create: `src/components/scrolly/SpaSection.jsx`

**Step 1: Create the component**

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PolaroidFrame from "./PolaroidFrame";

export default function SpaSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92]);

    return (
        <section
            ref={ref}
            className="min-h-screen flex flex-col items-center justify-center py-32 px-8"
        >
            <motion.div style={{ opacity, scale }} className="flex flex-col items-center gap-10">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Relaxation
                </p>
                <div className="w-72 md:w-96">
                    <PolaroidFrame caption="the best kind of lazy day">
                        <div className="h-96 overflow-hidden">
                            <img
                                src="/assets/IMG_3017.jpg"
                                alt="Spa day in robes"
                                className="vintage-img"
                            />
                        </div>
                    </PolaroidFrame>
                </div>
                <p
                    className="text-stone-400 text-base italic max-w-xs text-center"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    "Some days are made for doing absolutely nothing."
                </p>
            </motion.div>
        </section>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/SpaSection.jsx
git commit -m "feat: add SpaSection with slow fade-in/out transition"
```

---

### Task 13: Build MemoryBookSection (3D page flip)

**Files:**
- Create: `src/components/scrolly/MemoryBookSection.jsx`

**Step 1: Create the component**

Note: The page flip uses CSS `perspective` on the container and `rotateY` driven by scroll progress. Front face shows on 0°, back face (rotated 180° in CSS) becomes visible at 180°. `backfaceVisibility: "hidden"` on both faces ensures only the correct face shows.

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MemoryBookSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });

    // 0 → 180 degrees as scroll progresses
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180]);

    return (
        <section
            ref={ref}
            className="min-h-[200vh] flex items-center justify-center py-32 px-8"
        >
            {/* Sticky container so the flip happens while scrolling through 200vh */}
            <div className="sticky top-1/4 flex flex-col items-center gap-8">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Memory Book
                </p>

                {/* 3D perspective wrapper */}
                <div style={{ perspective: "1200px" }} className="w-72 md:w-80 h-96 md:h-[28rem]">
                    <motion.div
                        style={{
                            rotateY,
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Front face */}
                        <div
                            style={{ backfaceVisibility: "hidden" }}
                            className="absolute inset-0 bg-white p-3 pb-10 shadow-2xl shadow-black/30"
                        >
                            <img
                                src="/assets/IMG_2930.jpg"
                                alt="Memory front"
                                className="vintage-img w-full h-full object-cover"
                            />
                            <p
                                className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-500 italic"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                then…
                            </p>
                        </div>

                        {/* Back face — rotated 180deg so it faces forward when parent is at 180deg */}
                        <div
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                            }}
                            className="absolute inset-0 bg-white p-3 pb-10 shadow-2xl shadow-black/30"
                        >
                            <img
                                src="/assets/IMG_2755.jpg"
                                alt="Memory back"
                                className="vintage-img w-full h-full object-cover"
                            />
                            <p
                                className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-500 italic"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                …and always
                            </p>
                        </div>
                    </motion.div>
                </div>

                <p
                    className="text-stone-300 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "sans-serif" }}
                >
                    scroll to turn the page
                </p>
            </div>
        </section>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/MemoryBookSection.jsx
git commit -m "feat: add MemoryBookSection with 3D CSS rotateY page flip"
```

---

### Task 14: Build RevealSection (scroll-to-zoom)

**Files:**
- Create: `src/components/scrolly/RevealSection.jsx`

**Step 1: Create the component**

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function RevealSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.6, 1], ["20px", "0px"]);
    const textOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen overflow-hidden flex items-center justify-center"
        >
            {/* Zoom image */}
            <motion.div
                className="absolute inset-0"
                style={{ scale, opacity }}
            >
                <img
                    src="/assets/IMG_2052.jpg"
                    alt="Holiday home"
                    className="vintage-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Closing text */}
            <motion.div
                className="relative z-10 text-center px-8"
                style={{ y: textY, opacity: textOpacity }}
            >
                <p
                    className="text-white/60 text-xs tracking-[0.4em] uppercase mb-6"
                    style={{ fontFamily: "sans-serif" }}
                >
                    Here's to many more
                </p>
                <h2
                    className="text-4xl md:text-6xl font-light text-white leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Happy Anniversary,<br />
                    <em>Sarah</em> ♥
                </h2>
            </motion.div>
        </section>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/scrolly/RevealSection.jsx
git commit -m "feat: add RevealSection with scroll-to-zoom and closing text"
```

---

### Task 15: Assemble ScrollyPage

**Files:**
- Modify: `src/pages/ScrollyPage.jsx` (replace the placeholder)

**Step 1: Replace ScrollyPage with the full assembled page**

```jsx
import SmoothScroll from "../components/scrolly/SmoothScroll";
import HeroSection from "../components/scrolly/HeroSection";
import OutdoorsSection from "../components/scrolly/OutdoorsSection";
import DanceSection from "../components/scrolly/DanceSection";
import SpaSection from "../components/scrolly/SpaSection";
import MemoryBookSection from "../components/scrolly/MemoryBookSection";
import RevealSection from "../components/scrolly/RevealSection";

export default function ScrollyPage() {
    return (
        <SmoothScroll>
            {/* Film grain overlay — fixed, only on this page */}
            <div className="grain-overlay" />

            <div style={{ backgroundColor: "#FDFCF0" }}>
                <HeroSection />
                <OutdoorsSection />
                <DanceSection />
                <SpaSection />
                <MemoryBookSection />
                <RevealSection />
            </div>
        </SmoothScroll>
    );
}
```

**Step 2: Run dev server and do a full visual walk-through**

Run `npm run dev`. Navigate to `/` and scroll through every section. Verify:
- [ ] Lenis smooth scroll feels buttery
- [ ] Hero image scales and text fades as you scroll
- [ ] Outdoors section: two polaroids float in opposite directions
- [ ] Dance section: image blurs and slides horizontally
- [ ] Spa section: fades in/out gently
- [ ] Memory Book: page flips 180° as you scroll through the tall section
- [ ] Reveal section: image zooms in, closing text fades up
- [ ] Grain overlay animates over everything
- [ ] `/anniversary-2025` still renders the full 2025 page correctly
- [ ] Navbar shows "Home", "2025", "Valentine"

**Step 3: Commit**

```bash
git add src/pages/ScrollyPage.jsx
git commit -m "feat: assemble ScrollyPage — new landing with all scrollytelling sections"
```

---

### Task 16: Wire BubbleMenu for route links vs anchor links

**Files:**
- Modify: `src/components/BubbleMenu.jsx` (only if needed — check first)
- Modify: `src/components/Layout.jsx` (if BubbleMenu needs `<Link>` wrapper)

**Step 1: Read BubbleMenu.jsx**

Read `src/components/BubbleMenu.jsx` to see how it renders navigation items (look for `href`, `<a>`, or any link rendering).

**Step 2: If BubbleMenu uses `<a href>` tags**

Route navigation (`/anniversary-2025`, `/valentine`) will work but cause full page reloads. This is acceptable. No change needed.

**Step 3: If BubbleMenu uses a custom scroll-to-anchor mechanism**

It will fail for route paths. In that case, add to the `menuItems` shape an optional `isRoute: true` flag, and in `BubbleMenu.jsx` conditionally render `<Link to={href}>` for route items and `<a href={href}>` for anchor items. Import `Link` from `react-router-dom`.

**Step 4: Verify navigation works for all three nav items**

Click "Home" → `/`, "2025" → `/anniversary-2025`, "Valentine" → `/valentine`.

**Step 5: Commit if changes were needed**

```bash
git add src/components/BubbleMenu.jsx src/components/Layout.jsx
git commit -m "fix: support route navigation in BubbleMenu"
```

---

## Asset Checklist

When you have the actual photos, drop them into `public/assets/` with these exact filenames:

```
public/assets/IMG_1099.jpg   ← Formal night (Hero)
public/assets/IMG_2930.jpg   ← Lake selfie (Outdoors left, Memory Book front)
public/assets/IMG_2755.jpg   ← The kiss (Outdoors right, Memory Book back)
public/assets/IMG_7690.jpg   ← Dancing (Dance section)
public/assets/IMG_3017.jpg   ← Spa day in robes (Spa section)
public/assets/IMG_2052.jpg   ← Holiday/Home (Reveal section)
```

No code changes needed — the placeholder paths already match.

# DancerScroll Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace `DanceSection` with a scroll-triggered 6-frame sprite animation component that advances frames as the user scrolls and fades out on exit.

**Architecture:** `DancerScroll.jsx` uses a 300vh outer section + sticky inner viewport. `useScroll` tracks progress across the full 300vh. A `motionValue.on("change")` listener snaps the float progress to an integer frame index (0–5), which maps to a `background-position` on the sprite div. Exit transition uses `useTransform` for scale + opacity fade.

**Tech Stack:** React 19, framer-motion (already installed), Tailwind CSS v4, `/assets/dancing-sprite.png` (3×2 sprite sheet)

---

### Task 1: Create DancerScroll.jsx

**Files:**
- Create: `src/components/scrolly/DancerScroll.jsx`

**Step 1: Write the component**

```jsx
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 3 columns × 2 rows = 6 frames
const FRAMES = [
    "0% 0%",
    "50% 0%",
    "100% 0%",
    "0% 100%",
    "50% 100%",
    "100% 100%",
];

export default function DancerScroll() {
    const ref = useRef(null);
    const [frame, setFrame] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // Map 0–1 scroll to 0–5 frame index, snap to integer
    const frameProgress = useTransform(scrollYProgress, [0, 1], [0, 5]);

    useEffect(() => {
        const unsubscribe = frameProgress.on("change", (v) => {
            setFrame(Math.round(Math.min(5, Math.max(0, v))));
        });
        return unsubscribe;
    }, [frameProgress]);

    // Exit: scale up and fade out in the final 15% of scroll
    const scale = useTransform(scrollYProgress, [0.85, 1], [1, 1.15]);
    const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-[300vh]"
        >
            {/* Sticky viewport — stays centered while user scrolls 300vh */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 overflow-hidden">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Energy &amp; Movement
                </p>

                <motion.div
                    style={{ scale, opacity }}
                    className="flex items-center justify-center"
                >
                    {/* Sprite container */}
                    <div
                        style={{
                            width: "320px",
                            height: "320px",
                            backgroundImage: "url('/assets/dancing-sprite.png')",
                            backgroundSize: "300% 200%",
                            backgroundPosition: FRAMES[frame],
                            backgroundRepeat: "no-repeat",
                            filter: "sepia(0.2) contrast(1.1)",
                            imageRendering: "pixelated",
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
```

**Step 2: Verify no syntax errors**

The file should import cleanly. No build step needed yet — just confirm the file is saved correctly by reading it back.

**Step 3: Commit**

```bash
git add src/components/scrolly/DancerScroll.jsx
git commit -m "feat: add DancerScroll sprite animation component"
```

---

### Task 2: Swap DanceSection for DancerScroll in ScrollyPage

**Files:**
- Modify: `src/pages/ScrollyPage.jsx`

**Step 1: Read the current ScrollyPage.jsx**

Read `src/pages/ScrollyPage.jsx` to get exact current content.

**Step 2: Replace import and usage**

- Change `import DanceSection from "../components/scrolly/DanceSection";` → `import DancerScroll from "../components/scrolly/DancerScroll";`
- Change `<DanceSection />` → `<DancerScroll />`

**Step 3: Commit**

```bash
git add src/pages/ScrollyPage.jsx
git commit -m "feat: swap DanceSection for DancerScroll in ScrollyPage"
```

---

### Task 3: Delete DanceSection.jsx

**Files:**
- Delete: `src/components/scrolly/DanceSection.jsx`

**Step 1: Confirm nothing else imports DanceSection**

Run a search for any remaining imports of `DanceSection`:

```bash
grep -r "DanceSection" src/
```

Expected output: no results (we already swapped ScrollyPage in Task 2).

**Step 2: Delete the file**

```bash
git rm src/components/scrolly/DanceSection.jsx
git commit -m "chore: remove DanceSection replaced by DancerScroll"
```

---

## Asset Note

Place the sprite sheet at `public/assets/dancing-sprite.png` before testing visually. The component will render a blank square until the asset is present — this is expected.

## Visual Verification Checklist

Once the sprite is in place:
- [ ] Scrolling through the section advances frames 0→5
- [ ] Frames snap (no sliding between positions)
- [ ] Sepia/contrast filter gives a vintage feel
- [ ] In the last ~15% of the section, the sprite scales up and fades out
- [ ] The section below (SpaSection) appears cleanly after the fade
- [ ] On mobile, the 320×320 sprite fits without overflow

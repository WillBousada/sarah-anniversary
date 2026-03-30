# LakeScroll Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace `OutdoorsSection` with a scroll-triggered 6-frame sprite animation displayed inside a pure-CSS classic sash window frame.

**Architecture:** `LakeScroll.jsx` is identical in scroll structure to `DancerScroll.jsx` and `SpaScroll.jsx` (300vh outer + sticky inner). The only difference is the window frame border: a cream-painted sash window built from nested divs with absolute-positioned horizontal and vertical dividers overlaying the sprite.

**Tech Stack:** React 19, framer-motion (already installed), Tailwind CSS v4, `/assets/lake-sprite.png` (3×2 sprite sheet, 6 frames)

---

### Task 1: Create LakeScroll.jsx

**Files:**
- Create: `src/components/scrolly/LakeScroll.jsx`
- Reference: `src/components/scrolly/DancerScroll.jsx` — identical scroll/frame logic

**Step 1: Write the component**

```jsx
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 3 columns × 2 rows = 6 frames (identical to DancerScroll)
const FRAMES = [
    "0% 0%",
    "50% 0%",
    "100% 0%",
    "0% 100%",
    "50% 100%",
    "100% 100%",
];

export default function LakeScroll() {
    const ref = useRef(null);
    const [frame, setFrame] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const frameProgress = useTransform(scrollYProgress, [0, 1], [0, 5]);

    useEffect(() => {
        const unsubscribe = frameProgress.on("change", (v) => {
            setFrame(Math.round(Math.min(5, Math.max(0, v))));
        });
        return unsubscribe;
    }, [frameProgress]);

    const scale = useTransform(scrollYProgress, [0.85, 1], [1, 1.15]);
    const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    const spriteSize = "clamp(260px, 55vmin, 480px)";
    const frameColor = "#F0EBE0";
    const frameBorder = "16px";

    return (
        <section ref={ref} className="relative min-h-[300vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 overflow-hidden">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    The Great Outdoors
                </p>

                <motion.div
                    style={{ scale, opacity }}
                    className="flex flex-col items-center"
                >
                    {/* ── Sash window frame ── */}
                    <div
                        style={{
                            border: `${frameBorder} solid ${frameColor}`,
                            borderRadius: "4px",
                            boxShadow:
                                "0 20px 50px rgba(0,0,0,0.3), " +
                                "inset 0 0 12px rgba(0,0,0,0.12), " +
                                "0 2px 6px rgba(0,0,0,0.2)",
                            position: "relative",
                        }}
                    >
                        {/* ── Glass area (sprite + dividers) ── */}
                        <div style={{ position: "relative", lineHeight: 0 }}>
                            {/* Sprite */}
                            <div
                                style={{
                                    width: spriteSize,
                                    height: spriteSize,
                                    backgroundImage: "url('/assets/lake-sprite.png')",
                                    backgroundSize: "300% 200%",
                                    backgroundPosition: FRAMES[frame],
                                    backgroundRepeat: "no-repeat",
                                    filter: "sepia(0.2) contrast(1.1)",
                                    imageRendering: "pixelated",
                                    display: "block",
                                }}
                            />

                            {/* Horizontal sash rail — crosses center */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: 0,
                                    right: 0,
                                    height: "14px",
                                    transform: "translateY(-50%)",
                                    background: frameColor,
                                    boxShadow:
                                        "0 2px 4px rgba(0,0,0,0.15), " +
                                        "0 -1px 3px rgba(0,0,0,0.1)",
                                }}
                            />

                            {/* Vertical muntin — crosses center */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    left: "50%",
                                    width: "10px",
                                    transform: "translateX(-50%)",
                                    background: frameColor,
                                    boxShadow:
                                        "2px 0 4px rgba(0,0,0,0.1), " +
                                        "-1px 0 3px rgba(0,0,0,0.08)",
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Window sill ── */}
                    <div
                        style={{
                            width: `calc(${spriteSize} + ${frameBorder} * 2 + 24px)`,
                            height: "14px",
                            background: frameColor,
                            borderRadius: "0 0 4px 4px",
                            boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                            marginTop: "-2px",
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
```

**Step 2: Read file back to confirm it saved correctly**

**Step 3:** Do NOT run git — report back to controller.

---

### Task 2: Swap OutdoorsSection for LakeScroll in ScrollyPage

**Files:**
- Modify: `src/pages/ScrollyPage.jsx`

**Step 1:** Read `src/pages/ScrollyPage.jsx` to see exact current content.

**Step 2:** Use the Edit tool (NOT Write) to make exactly two surgical changes:
1. `import OutdoorsSection from "../components/scrolly/OutdoorsSection";` → `import LakeScroll from "../components/scrolly/LakeScroll";`
2. `<OutdoorsSection />` → `<LakeScroll />`

**Step 3:** Read the file back and confirm both changes are present and nothing else changed.

**Step 4:** Do NOT run git — report back to controller.

---

### Task 3: Delete OutdoorsSection.jsx

**Files:**
- Delete: `src/components/scrolly/OutdoorsSection.jsx`

**Step 1:** Confirm no remaining imports:
```bash
grep -r "OutdoorsSection" src/
```
Expected: no output.

**Step 2:** From repo root (`C:\Users\willb\Desktop\Development\sarah-anniversary`):
```bash
git rm anniversary/src/components/scrolly/OutdoorsSection.jsx
git commit -m "chore: remove OutdoorsSection replaced by LakeScroll"
```

**Step 3:** Report commit hash.

---

## Asset Note

Place sprite at `public/assets/lake-sprite.png`. Component renders a blank cream-bordered square until the asset is present.

## Visual Verification Checklist

- [ ] Frames 0→5 advance as user scrolls through 300vh
- [ ] Frames snap — no sliding between positions
- [ ] Cream painted frame border visible on all four sides
- [ ] Horizontal rail divides sprite into top and bottom panes
- [ ] Vertical muntin divides sprite into left and right panes (4 panes total)
- [ ] Window sill slightly wider than frame, with drop shadow below
- [ ] Sprite exits with scale-up + fade in the final 15% of scroll
- [ ] `/anniversary-2025` still renders the old page correctly

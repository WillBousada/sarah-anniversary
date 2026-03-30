import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 2 columns × 4 rows = 8 slots, 7 active frames
const FRAMES = [
    "0% 0%",
    "100% 0%",
    "0% 33.33%",
    "100% 33.33%",
    "0% 66.67%",
    "100% 66.67%",
    "0% 100%",
];

export default function SpaScroll() {
    const ref = useRef(null);
    const [frame, setFrame] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // Map 0–1 scroll to 0–6 frame index, snap to integer
    const frameProgress = useTransform(scrollYProgress, [0, 1], [0, 6]);

    useEffect(() => {
        const unsubscribe = frameProgress.on("change", (v) => {
            setFrame(Math.round(Math.min(6, Math.max(0, v))));
        });
        return unsubscribe;
    }, [frameProgress]);

    // Exit: scale up and fade out in the final 15% of scroll
    const scale = useTransform(scrollYProgress, [0.85, 1], [1, 1.15]);
    const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    const spriteSize = "clamp(240px, 45vmin, 400px)";

    return (
        <section
            ref={ref}
            className="relative min-h-[300vh]"
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 overflow-hidden">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Relaxation
                </p>

                <motion.div
                    style={{ scale, opacity }}
                    className="flex items-center justify-center"
                >
                    {/* ── Vintage TV outer body ── */}
                    <div
                        style={{
                            background: "linear-gradient(160deg, #3a3a3a 0%, #2a2a2a 60%, #1e1e1e 100%)",
                            borderRadius: "28px",
                            padding: "22px 26px 18px 26px",
                            boxShadow:
                                "inset 0 2px 6px rgba(255,255,255,0.06), " +
                                "inset 0 -2px 4px rgba(0,0,0,0.4), " +
                                "0 24px 64px rgba(0,0,0,0.6), " +
                                "0 4px 12px rgba(0,0,0,0.4)",
                        }}
                    >
                        {/* ── Screen bezel ── */}
                        <div
                            style={{
                                background: "#1a1a1a",
                                borderRadius: "14px",
                                padding: "14px",
                                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)",
                            }}
                        >
                            {/* ── Screen area (relative for scanline overlay) ── */}
                            <div style={{ position: "relative" }}>
                                {/* Sprite */}
                                <div
                                    style={{
                                        width: spriteSize,
                                        height: spriteSize,
                                        backgroundImage: "url('/assets/spa-sprite.webp')",
                                        backgroundSize: "200% 400%",
                                        backgroundPosition: FRAMES[frame],
                                        backgroundRepeat: "no-repeat",
                                        filter: "sepia(0.2) contrast(1.1)",
                                        imageRendering: "pixelated",
                                        backgroundColor: "#0a0a0a",
                                        display: "block",
                                    }}
                                />
                                {/* CRT scanline overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "repeating-linear-gradient(" +
                                            "transparent 0px, transparent 3px, " +
                                            "rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px" +
                                            ")",
                                        pointerEvents: "none",
                                    }}
                                />
                            </div>
                        </div>

                        {/* ── Decorative knob row ── */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "20px",
                                marginTop: "12px",
                            }}
                        >
                            {[0, 1].map((i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: "22px",
                                        height: "22px",
                                        borderRadius: "50%",
                                        background:
                                            "radial-gradient(circle at 35% 35%, #555 0%, #2a2a2a 60%, #1a1a1a 100%)",
                                        boxShadow:
                                            "inset 0 1px 3px rgba(255,255,255,0.1), " +
                                            "0 2px 4px rgba(0,0,0,0.6)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

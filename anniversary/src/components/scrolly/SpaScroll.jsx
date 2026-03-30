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

export default function SpaScroll() {
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

    const spriteSize = "clamp(260px, 55vmin, 480px)";

    return (
        <section ref={ref} className="relative min-h-[300vh]">
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
                    {/* TV wrapper — relative so antennas sit above */}
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: "72px",
                        }}
                    >
                        {/* ── Antennas ── */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "80px",
                                height: "72px",
                            }}
                        >
                            {/* Left antenna */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "6px",
                                    left: "50%",
                                    width: "3px",
                                    height: "64px",
                                    background:
                                        "linear-gradient(to top, #3a3a3a, #606060)",
                                    transformOrigin: "bottom center",
                                    transform:
                                        "translateX(-14px) rotate(-22deg)",
                                    borderRadius: "2px 2px 0 0",
                                    boxShadow: "1px 0 3px rgba(0,0,0,0.4)",
                                }}
                            />
                            {/* Right antenna */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "6px",
                                    left: "50%",
                                    width: "3px",
                                    height: "64px",
                                    background:
                                        "linear-gradient(to top, #3a3a3a, #606060)",
                                    transformOrigin: "bottom center",
                                    transform: "translateX(12px) rotate(22deg)",
                                    borderRadius: "2px 2px 0 0",
                                    boxShadow: "-1px 0 3px rgba(0,0,0,0.4)",
                                }}
                            />
                            {/* Antenna mount */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "24px",
                                    height: "8px",
                                    background: "#2a2a2a",
                                    borderRadius: "3px 3px 0 0",
                                    boxShadow:
                                        "inset 0 1px 2px rgba(255,255,255,0.06)",
                                }}
                            />
                        </div>

                        {/* ── Vintage TV outer body ── */}
                        <div
                            style={{
                                background:
                                    "linear-gradient(160deg, #3a3a3a 0%, #2a2a2a 60%, #1e1e1e 100%)",
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
                                    boxShadow:
                                        "inset 0 2px 8px rgba(0,0,0,0.8)",
                                }}
                            >
                                {/* ── Screen area (relative for scanline overlay) ── */}
                                <div style={{ position: "relative" }}>
                                    {/* Sprite */}
                                    <div
                                        style={{
                                            width: spriteSize,
                                            height: spriteSize,
                                            backgroundImage:
                                                "url('/assets/spa-sprite.png')",
                                            backgroundSize: "300% 200%",
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

                        {/* ── TV Stand neck ── */}
                        <div
                            style={{
                                width: "38px",
                                height: "24px",
                                background:
                                    "linear-gradient(to bottom, #2a2a2a, #1e1e1e)",
                                boxShadow:
                                    "inset 1px 0 3px rgba(255,255,255,0.04), inset -1px 0 3px rgba(0,0,0,0.3)",
                            }}
                        />
                        {/* ── TV Stand base ── */}
                        <div
                            style={{
                                width: "130px",
                                height: "10px",
                                background:
                                    "linear-gradient(to bottom, #2e2e2e, #1a1a1a)",
                                borderRadius: "0 0 8px 8px",
                                boxShadow: "0 6px 14px rgba(0,0,0,0.5)",
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

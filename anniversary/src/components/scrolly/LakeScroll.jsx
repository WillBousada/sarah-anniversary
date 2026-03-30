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
                            // Layered inset shadows simulate a real window frame profile:
                            // outer wall shadow → outer frame edge → frame bevel → glass reveal
                            boxShadow:
                                "0 24px 56px rgba(0,0,0,0.35), " +
                                "0 2px 8px rgba(0,0,0,0.2), " +
                                `inset 0 0 0 3px #C8BBAA, ` +
                                `inset 0 0 0 6px ${frameColor}, ` +
                                "inset 0 0 0 9px #B8A898, " +
                                "inset 0 0 0 12px rgba(255,255,255,0.15)",
                            position: "relative",
                        }}
                    >
                        {/* ── Glass area ── */}
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

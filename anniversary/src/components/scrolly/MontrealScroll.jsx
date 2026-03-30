import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 2 columns × 3 rows = 6 frames, read left→right, top→bottom
const FRAMES = [
    "0% 0%",
    "100% 0%",
    "0% 50%",
    "100% 50%",
    "0% 100%",
    "100% 100%",
];

export default function MontrealScroll() {
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

    // Each displayed frame: portrait — width W, height W×1.5 (matches 2-col × 3-row grid)
    const frameW = "clamp(200px, 38vmin, 340px)";
    const frameH = "clamp(300px, 57vmin, 510px)";

    return (
        <section ref={ref} className="relative min-h-[300vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 overflow-hidden">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Montréal
                </p>

                <motion.div
                    style={{ scale, opacity }}
                    className="flex flex-col items-center"
                >
                    {/* Comic panel */}
                    <div
                        style={{
                            position: "relative",
                            border: "4px solid #111",
                            boxShadow: "8px 8px 0px #111",
                            background: "#fff",
                            lineHeight: 0,
                        }}
                    >
                        {/* Sprite frame — clipped to bottom, top label cropped out */}
                        <div style={{ width: frameW, height: frameH, overflow: "hidden", position: "relative" }}>
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundImage: "url('/assets/montreal-sprite.png')",
                                    backgroundSize: "200% 300%",
                                    backgroundPosition: FRAMES[frame],
                                    backgroundRepeat: "no-repeat",
                                    imageRendering: "pixelated",
                                    transform: "scale(1.45)",
                                    transformOrigin: "bottom center",
                                }}
                            />
                        </div>

                        {/* Caption bar */}
                        <div
                            style={{
                                background: "#FFE44D",
                                borderTop: "4px solid #111",
                                padding: "5px 10px 6px",
                                fontFamily: "'Georgia', serif",
                                fontStyle: "italic",
                                fontSize: "0.75rem",
                                letterSpacing: "0.12em",
                                color: "#111",
                                lineHeight: 1,
                                textAlign: "center",
                            }}
                        >
                            Montréal, Québec
                        </div>
                    </div>
                </motion.div>

                <p
                    className="text-stone-300 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "sans-serif" }}
                >
                    scroll to continue
                </p>
            </div>
        </section>
    );
}

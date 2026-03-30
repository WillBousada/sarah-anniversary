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

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

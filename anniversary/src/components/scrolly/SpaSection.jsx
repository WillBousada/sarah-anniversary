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

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MemoryCaption({ eyebrow, heading, body }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);

    return (
        <section
            ref={ref}
            className="flex items-center justify-center"
            style={{ minHeight: "60vh" }}
        >
            <motion.div
                style={{ opacity, y }}
                className="max-w-md px-10 text-center flex flex-col items-center gap-4"
            >
                {eyebrow && (
                    <p
                        className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {eyebrow}
                    </p>
                )}
                {heading && (
                    <h2
                        className="text-2xl md:text-3xl font-light text-stone-700 leading-snug"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {heading}
                    </h2>
                )}
                {body && (
                    <p
                        className="text-stone-500 text-base leading-relaxed"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {body}
                    </p>
                )}
            </motion.div>
        </section>
    );
}

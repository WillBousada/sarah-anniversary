import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function IntroSection() {
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
            style={{ minHeight: "80vh" }}
        >
            <motion.div
                style={{ opacity, y }}
                className="max-w-lg px-10 text-center flex flex-col items-center gap-6"
            >
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    for you
                </p>

                <h2
                    className="text-3xl md:text-4xl font-light text-stone-700 leading-snug"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    I love you so much,{" "}
                    <em>Sarah</em>
                </h2>

                <p
                    className="text-stone-500 text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    I wanted to take you on a little journey through some of my
                    favourite memories we've made together — except as cartoon
                    characters, because why not.
                </p>

                <p
                    className="text-stone-400 text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    All you have to do is press play or scroll. Feel free to pause anytime!'{" "}
                    <span style={{ fontSize: "1.1em" }}>&#10084;&#65039;</span>
                </p>

                <motion.div
                    className="flex flex-col items-center gap-2 mt-4"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <span
                        className="text-stone-300 text-xs tracking-widest uppercase"
                        style={{ fontFamily: "sans-serif" }}
                    >
                        scroll
                    </span>
                    <div className="w-px h-10 bg-stone-300" />
                </motion.div>
            </motion.div>
        </section>
    );
}

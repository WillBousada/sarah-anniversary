import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ClosingSection() {
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
            style={{ minHeight: "80vh", paddingBottom: "12rem" }}
        >
            <motion.div
                style={{ opacity, y }}
                className="max-w-lg px-10 text-center flex flex-col items-center gap-6"
            >
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    more memories to come
                </p>

                <div className="flex items-center gap-4 text-4xl">
                    <span>✈️</span>
                    <span>🌍</span>
                    <span>❤️</span>
                </div>

                <p
                    className="text-stone-500 text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    I am so excited to keep making new memories with you, going
                    on new adventures, seeing new places, and experiencing
                    everything this world has to offer — together.
                </p>

                <p
                    className="text-stone-400 text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Here's to every chapter still ahead of us.{" "}
                    <span style={{ fontSize: "1.1em" }}>&#10084;&#65039;</span>
                </p>

                <div className="w-full border-t border-stone-200 pt-6 flex flex-col items-center gap-3">
                    <p
                        className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                        style={{ fontFamily: "sans-serif" }}
                    >
                        with all my love
                    </p>
                    <h2
                        className="text-3xl md:text-5xl font-light text-stone-700 leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Happy 21st Birthday,
                        <br />
                        <em>Sarah</em> 🎂
                    </h2>
                    <p
                        className="text-stone-400 text-sm"
                        style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
                    >
                        — Will x
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

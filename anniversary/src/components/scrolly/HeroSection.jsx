import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={ref}
            className="relative h-screen overflow-hidden flex items-end justify-start"
        >
            {/* Parallax image */}
            <motion.div
                className="absolute inset-0"
                style={{ scale, y }}
            >
                <img
                    src="/assets/IMG_1099.jpg"
                    alt="Formal night"
                    className="vintage-img w-full h-full object-cover"
                />
                {/* Dark gradient at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Hero text */}
            <motion.div
                className="relative z-10 p-10 md:p-16"
                style={{ opacity }}
            >
                <p
                    className="text-white/60 text-sm tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Our Story
                </p>
                <h1
                    className="text-5xl md:text-7xl font-light text-white leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Sarah &<br />
                    <em>Will</em>
                </h1>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <span className="text-white/50 text-xs tracking-widest uppercase" style={{ fontFamily: "sans-serif" }}>
                    Scroll
                </span>
                <div className="w-px h-12 bg-white/30" />
            </motion.div>
        </section>
    );
}

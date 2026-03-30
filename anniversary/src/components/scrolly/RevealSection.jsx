import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function RevealSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.6, 1], ["20px", "0px"]);
    const textOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen overflow-hidden flex items-center justify-center"
        >
            {/* Zoom image */}
            <motion.div
                className="absolute inset-0"
                style={{ scale, opacity }}
            >
                <img
                    src="/assets/IMG_2052.jpeg"
                    alt="Holiday home"
                    className="vintage-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Closing text */}
            <motion.div
                className="relative z-10 text-center px-8"
                style={{ y: textY, opacity: textOpacity }}
            >
                <p
                    className="text-white/60 text-xs tracking-[0.4em] uppercase mb-6"
                    style={{ fontFamily: "sans-serif" }}
                >
                    Here's to many more
                </p>
                <h2
                    className="text-4xl md:text-6xl font-light text-white leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Happy Anniversary,<br />
                    <em>Sarah</em> ♥
                </h2>
            </motion.div>
        </section>
    );
}

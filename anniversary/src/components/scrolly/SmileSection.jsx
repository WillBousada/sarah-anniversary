import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SmileSection() {
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
            className="relative h-screen overflow-hidden flex items-end justify-start bg-black"
            style={{ scrollSnapAlign: "start" }}
        >
            <motion.div className="absolute inset-0" style={{ scale, y }}>
                <img
                    src="/assets/smile-sprite.png"
                    alt="Always smiling"
                    className="vintage-img w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div
                className="relative z-10 p-10 md:p-16"
                style={{ opacity }}
            >
                <p
                    className="text-white text-sm tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    always
                </p>
                <h2
                    className="text-5xl md:text-7xl font-light text-white leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Always smiling<br />
                    <em>with you</em>
                </h2>
            </motion.div>
        </section>
    );
}

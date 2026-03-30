import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function OrbitDot({ angle, radius, emoji, duration, delay }) {
    return (
        <motion.div
            style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration, delay, ease: "linear" }}
        >
            <div
                style={{
                    position: "absolute",
                    transform: `translate(-50%, -50%) translateX(${radius}px)`,
                    fontSize: "1.3rem",
                    lineHeight: 1,
                }}
            >
                {emoji}
            </div>
        </motion.div>
    );
}

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
                    more memories to come
                </p>

                {/* Globe */}
                <div style={{ position: "relative", width: 100, height: 100 }}>
                    <motion.div
                        animate={{ rotateY: 360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle at 38% 38%, #a8d8ea 0%, #4a9eca 45%, #1a5f8a 80%, #0d3a5c 100%)",
                            boxShadow:
                                "inset -10px -6px 20px rgba(0,0,0,0.25), inset 5px 5px 14px rgba(255,255,255,0.15), 0 6px 24px rgba(74,158,202,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2.4rem",
                        }}
                    >
                        🌍
                    </motion.div>
                    <OrbitDot angle={0}   radius={62} emoji="✈️" duration={9} delay={0} />
                    <OrbitDot angle={120} radius={62} emoji="❤️" duration={9} delay={0} />
                    <OrbitDot angle={240} radius={62} emoji="⭐" duration={9} delay={0} />
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

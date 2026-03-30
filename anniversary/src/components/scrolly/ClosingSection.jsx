import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Orbiting item: angle in degrees, radius in px
function OrbitDot({ angle, radius, emoji, duration, delay }) {
    return (
        <motion.div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration, delay, ease: "linear" }}
        >
            <div
                style={{
                    position: "absolute",
                    transform: `translate(-50%, -50%) translateX(${radius}px) rotate(-${angle}deg)`,
                    fontSize: "1.4rem",
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
        offset: ["start end", "end end"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
    const globeScale = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
    const textY = useTransform(scrollYProgress, [0.3, 0.65], ["30px", "0px"]);
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
    const bdayY = useTransform(scrollYProgress, [0.55, 0.9], ["30px", "0px"]);
    const bdayOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);

    return (
        <section
            ref={ref}
            className="relative flex items-center justify-center overflow-hidden"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom, #FDFCF0 0%, #f0ece0 60%, #e8e0d0 100%)",
            }}
        >
            <motion.div
                style={{ opacity }}
                className="flex flex-col items-center gap-12 px-8 py-20 text-center max-w-2xl"
            >
                {/* Globe with orbiting icons */}
                <motion.div
                    style={{ scale: globeScale, position: "relative", width: 120, height: 120 }}
                >
                    {/* Globe */}
                    <motion.div
                        animate={{ rotateY: 360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle at 38% 38%, #a8d8ea 0%, #4a9eca 45%, #1a5f8a 80%, #0d3a5c 100%)",
                            boxShadow:
                                "inset -12px -8px 24px rgba(0,0,0,0.25), inset 6px 6px 16px rgba(255,255,255,0.15), 0 8px 32px rgba(74,158,202,0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2.8rem",
                            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                        }}
                    >
                        🌍
                    </motion.div>

                    {/* Orbiting icons */}
                    <OrbitDot angle={0}   radius={72} emoji="✈️"  duration={9}  delay={0} />
                    <OrbitDot angle={120} radius={72} emoji="❤️"  duration={9}  delay={0} />
                    <OrbitDot angle={240} radius={72} emoji="⭐"  duration={9}  delay={0} />
                </motion.div>

                {/* Body text */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="flex flex-col gap-4"
                >
                    <p
                        className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        more memories to come
                    </p>
                    <p
                        className="text-stone-600 text-lg md:text-xl leading-relaxed"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        I am so excited to keep making new memories with you,
                        going on new adventures, seeing new places, and
                        experiencing everything this world has to offer —
                        together.
                    </p>
                    <p
                        className="text-stone-500 text-base md:text-lg leading-relaxed"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Here's to every chapter still ahead of us.{" "}
                        <span style={{ fontSize: "1.1em" }}>&#10084;&#65039;</span>
                    </p>
                </motion.div>

                {/* Big birthday sign-off */}
                <motion.div
                    style={{ y: bdayY, opacity: bdayOpacity }}
                    className="flex flex-col gap-3 pt-4 border-t border-stone-200 w-full"
                >
                    <p
                        className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                        style={{ fontFamily: "sans-serif" }}
                    >
                        with all my love
                    </p>
                    <h2
                        className="text-4xl md:text-6xl font-light text-stone-800 leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Happy 21st Birthday,
                        <br />
                        <em
                            style={{
                                background:
                                    "linear-gradient(135deg, #b06a2a, #d4a06a, #b06a2a)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Sarah
                        </em>{" "}
                        🎂
                    </h2>
                    <p
                        className="text-stone-400 text-sm tracking-widest"
                        style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
                    >
                        — Will x
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}

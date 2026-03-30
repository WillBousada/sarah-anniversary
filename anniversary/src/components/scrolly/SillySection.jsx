import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SillySection() {
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
            className="relative flex flex-col items-center justify-center"
            style={{ minHeight: "100vh", padding: "6rem 2rem" }}
        >
            <motion.div
                style={{ opacity, y }}
                className="flex flex-col items-center gap-8 text-center"
            >
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    and naturally
                </p>

                <h2
                    className="text-2xl md:text-3xl font-light text-stone-700 leading-snug max-w-sm"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    <em>Of course</em> you being silly and cute
                </h2>

                {/* Photo booth strip */}
                <motion.div
                    style={{ rotate: -8 }}
                    whileHover={{ rotate: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                >
                    {/* Outer dark booth frame */}
                    <div
                        style={{
                            background: "#111",
                            padding: "14px 16px 22px",
                            borderRadius: "3px",
                            boxShadow:
                                "0 24px 64px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.3)",
                            display: "inline-block",
                        }}
                    >
                        {/* Film strip top holes */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingBottom: "8px",
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: "#333",
                                    }}
                                />
                            ))}
                        </div>

                        <img
                            src="/assets/silly-sprite.png"
                            alt="Silly moments"
                            style={{
                                display: "block",
                                width: "clamp(160px, 22vw, 260px)",
                            }}
                        />

                        {/* Film strip bottom holes */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingTop: "8px",
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: "#333",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

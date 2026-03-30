import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const LINES = [
    {
        text: "with all my love",
        size: "clamp(1.4rem, 3.5vw, 2.2rem)",
        weight: 400,
        delay: 0,
        duration: 2.2,
        color: "#78716c",
    },
    {
        text: "Happy 21st Birthday,",
        size: "clamp(1.8rem, 4.5vw, 3rem)",
        weight: 600,
        delay: 2.8,
        duration: 2.4,
        color: "#292524",
    },
    {
        text: "Sarah 🎂",
        size: "clamp(3rem, 7vw, 5rem)",
        weight: 700,
        delay: 5.4,
        duration: 2.2,
        color: "#292524",
    },
    {
        text: "— Willy xo",
        size: "clamp(1.2rem, 3vw, 1.8rem)",
        weight: 400,
        delay: 7.8,
        duration: 1.6,
        color: "#78716c",
    },
];

const TOTAL_DURATION = 9.6; // seconds until last stroke finishes

export default function QuillSection() {
    const ref = useRef(null);
    const textRef = useRef(null);
    const [blockH, setBlockH] = useState(200);

    const isInView = useInView(ref, { once: true, margin: "-15%" });

    useEffect(() => {
        if (textRef.current) {
            setBlockH(textRef.current.offsetHeight);
        }
    }, []);

    return (
        <section
            ref={ref}
            className="flex items-center justify-center"
            style={{ minHeight: "80vh", padding: "6rem 2rem" }}
        >
            <div style={{ position: "relative", display: "inline-block" }}>

                {/* Quill feather — tracks downward as writing progresses */}
                {isInView && (
                    <motion.div
                        style={{
                            position: "absolute",
                            right: "-3rem",
                            top: 0,
                            fontSize: "2.2rem",
                            pointerEvents: "none",
                            zIndex: 10,
                            originX: 0.5,
                            originY: 1,
                        }}
                        initial={{ y: 0, rotate: -20 }}
                        animate={{
                            y: blockH,
                            rotate: [-20, -10, -18, -8, -20, -12, -20, -10, -20],
                        }}
                        transition={{
                            y: {
                                duration: TOTAL_DURATION,
                                ease: [0.4, 0, 0.6, 1],
                            },
                            rotate: {
                                duration: 0.55,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                    >
                        🪶
                    </motion.div>
                )}

                {/* Text lines */}
                <div
                    ref={textRef}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        textAlign: "center",
                    }}
                >
                    {LINES.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                            transition={{
                                delay: line.delay,
                                duration: line.duration,
                                ease: [0.2, 0, 0.5, 1],
                            }}
                            style={{
                                fontFamily: "'Dancing Script', cursive",
                                fontSize: line.size,
                                fontWeight: line.weight,
                                color: line.color,
                                lineHeight: 1.3,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {line.text}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

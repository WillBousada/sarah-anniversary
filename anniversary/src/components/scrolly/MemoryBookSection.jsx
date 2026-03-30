import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MemoryBookSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });

    // 0 → 180 degrees as scroll progresses
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180]);

    return (
        <section
            ref={ref}
            className="min-h-[200vh] flex items-center justify-center py-32 px-8"
        >
            {/* Sticky container so the flip happens while scrolling through 200vh */}
            <div className="sticky top-1/4 flex flex-col items-center gap-8">
                <p
                    className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Memory Book
                </p>

                {/* 3D perspective wrapper */}
                <div style={{ perspective: "1200px" }} className="w-72 md:w-80 h-96 md:h-[28rem]">
                    <motion.div
                        style={{
                            rotateY,
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Front face */}
                        <div
                            style={{ backfaceVisibility: "hidden" }}
                            className="absolute inset-0 bg-white p-3 pb-10 shadow-2xl shadow-black/30"
                        >
                            <img
                                src="/assets/IMG_2930.jpg"
                                alt="Memory front"
                                className="vintage-img w-full h-full object-cover"
                            />
                            <p
                                className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-500 italic"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                then…
                            </p>
                        </div>

                        {/* Back face — rotated 180deg so it faces forward when parent is at 180deg */}
                        <div
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                            }}
                            className="absolute inset-0 bg-white p-3 pb-10 shadow-2xl shadow-black/30"
                        >
                            <img
                                src="/assets/IMG_2755.jpg"
                                alt="Memory back"
                                className="vintage-img w-full h-full object-cover"
                            />
                            <p
                                className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-500 italic"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                …and always
                            </p>
                        </div>
                    </motion.div>
                </div>

                <p
                    className="text-stone-300 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "sans-serif" }}
                >
                    scroll to turn the page
                </p>
            </div>
        </section>
    );
}

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const IMAGES = [
    "/assets/IMG_1099.jpg",
    "/assets/IMG_1631.JPG",
    "/assets/IMG_2199.jpg",
    "/assets/IMG_2298.jpg",
    "/assets/IMG_2456.jpg",
    "/assets/IMG_2492.jpg",
    "/assets/IMG_2755.jpeg",
    "/assets/IMG_2780.JPG",
    "/assets/IMG_2822.JPG",
    "/assets/IMG_2886.jpg",
    "/assets/IMG_2930.jpg",
    "/assets/IMG_3017.jpg",
    "/assets/IMG_3021.jpg",
    "/assets/IMG_3028.jpg",
    "/assets/IMG_7690.jpeg",
    "/assets/IMG_2052.jpeg",
];

export default function MemoryBookSection() {
    const ref = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const rotateY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // 0→1 scroll maps to 0→(N-1) float — one unit per page flip
    const pageProgress = useTransform(
        scrollYProgress,
        [0, 1],
        [0, IMAGES.length - 1]
    );

    useEffect(() => {
        return pageProgress.on("change", (v) => {
            const page = Math.min(Math.floor(v), IMAGES.length - 2);
            const angle = (v % 1) * 180;
            // Only re-render when page index changes; rotation is MotionValue-driven
            setCurrentPage((prev) => (prev !== page ? page : prev));
            rotateY.set(angle);
        });
    }, [pageProgress, rotateY]);

    const sectionOpacity = useTransform(scrollYProgress, [0.97, 1], [1, 0]);

    const frontImg = IMAGES[currentPage];
    const backImg = IMAGES[Math.min(currentPage + 1, IMAGES.length - 1)];

    return (
        <section ref={ref} className="relative min-h-[1500vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-6 overflow-hidden">
                <motion.div
                    style={{ opacity: sectionOpacity }}
                    className="flex flex-col items-center gap-6"
                >
                    <p
                        className="text-stone-400 text-xs tracking-[0.4em] uppercase"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Memory Book
                    </p>

                    {/* 3D perspective wrapper */}
                    <div
                        style={{ perspective: "1200px" }}
                        className="w-72 md:w-80 h-96 md:h-[28rem]"
                    >
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
                                    src={frontImg}
                                    alt={`Memory ${currentPage + 1}`}
                                    className="vintage-img w-full h-full object-cover"
                                />
                                <p
                                    className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-400 italic"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    {currentPage + 1} / {IMAGES.length}
                                </p>
                            </div>

                            {/* Back face — pre-rotated so it faces forward at 180° */}
                            <div
                                style={{
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                }}
                                className="absolute inset-0 bg-white p-3 pb-10 shadow-2xl shadow-black/30"
                            >
                                <img
                                    src={backImg}
                                    alt={`Memory ${currentPage + 2}`}
                                    className="vintage-img w-full h-full object-cover"
                                />
                                <p
                                    className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-400 italic"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    {currentPage + 2} / {IMAGES.length}
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
                </motion.div>
            </div>
        </section>
    );
}

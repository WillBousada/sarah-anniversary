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

const BOOK_W = "clamp(500px, 82vw, 860px)";
const BOOK_H = "clamp(320px, 52vh, 500px)";
const SPINE_W = 22;

const leatherBg =
    "linear-gradient(135deg, #3d1a08 0%, #5c2a10 30%, #3d1a08 60%, #4a2010 100%)";

const pageStyle = {
    background: "#f5f0e0",
    boxShadow: "inset 0 0 12px rgba(0,0,0,0.15)",
    overflow: "hidden",
    position: "relative",
    height: "100%",
};

const photoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    padding: "8px",
    boxSizing: "border-box",
};

export default function MemoryBookSection() {
    const ref = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const rotateY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // 0→1 scroll maps to 0→(N-1) float
    const pageProgress = useTransform(
        scrollYProgress,
        [0, 1],
        [0, IMAGES.length - 1]
    );

    useEffect(() => {
        return pageProgress.on("change", (v) => {
            const page = Math.min(Math.floor(v), IMAGES.length - 2);
            const angle = (v % 1) * 180;
            setCurrentPage((prev) => (prev !== page ? page : prev));
            rotateY.set(angle);
        });
    }, [pageProgress, rotateY]);

    // Page lift shadow: flat → tall at 90° → flat again
    const flipShadow = useTransform(
        rotateY,
        [0, 90, 180],
        [
            "0 2px 8px rgba(0,0,0,0.2)",
            "8px 0 30px rgba(0,0,0,0.5)",
            "0 2px 8px rgba(0,0,0,0.2)",
        ]
    );

    const sectionOpacity = useTransform(scrollYProgress, [0.97, 1], [1, 0]);

    const leftImg = currentPage > 0 ? IMAGES[currentPage - 1] : null;
    const frontImg = IMAGES[currentPage];
    const behindImg = IMAGES[Math.min(currentPage + 1, IMAGES.length - 1)];

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

                    {/* Book body */}
                    <div
                        style={{
                            width: BOOK_W,
                            height: BOOK_H,
                            background: leatherBg,
                            borderRadius: "3px 8px 8px 3px",
                            boxShadow:
                                "0 30px 80px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)",
                            padding: "16px",
                            display: "flex",
                            gap: 0,
                            boxSizing: "border-box",
                        }}
                    >
                        {/* Left page */}
                        <div
                            style={{
                                flex: 1,
                                ...pageStyle,
                                borderRadius: "2px 0 0 2px",
                            }}
                        >
                            {leftImg ? (
                                <img
                                    src={leftImg}
                                    alt={`Memory ${currentPage}`}
                                    style={photoStyle}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        background: leatherBg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            color: "rgba(245,240,224,0.35)",
                                            fontFamily: "'Georgia', serif",
                                            fontSize: "clamp(14px, 2vw, 22px)",
                                            letterSpacing: "0.3em",
                                            textTransform: "uppercase",
                                            textAlign: "center",
                                            padding: "0 16px",
                                        }}
                                    >
                                        Memories
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Spine */}
                        <div
                            style={{
                                width: SPINE_W,
                                flexShrink: 0,
                                background:
                                    "linear-gradient(to right, #1a0a03, #3d1a08, #1a0a03)",
                                boxShadow:
                                    "inset 2px 0 4px rgba(0,0,0,0.5), inset -2px 0 4px rgba(0,0,0,0.5)",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    left: "50%",
                                    width: "1px",
                                    background: "rgba(255,255,255,0.08)",
                                    transform: "translateX(-50%)",
                                }}
                            />
                        </div>

                        {/* Right side — 3D perspective container */}
                        <div
                            style={{
                                flex: 1,
                                position: "relative",
                                perspective: "1200px",
                                borderRadius: "0 2px 2px 0",
                                overflow: "hidden",
                            }}
                        >
                            {/* Static layer (z-index 0): next image waiting underneath */}
                            <div
                                style={{
                                    ...pageStyle,
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 0,
                                    borderRadius: "0 2px 2px 0",
                                }}
                            >
                                <img
                                    src={behindImg}
                                    alt={`Memory ${currentPage + 2}`}
                                    style={photoStyle}
                                />
                            </div>

                            {/* Flipping layer (z-index 1) */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 1,
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "left center",
                                    rotateY: useTransform(rotateY, (v) => -v),
                                    boxShadow: flipShadow,
                                }}
                            >
                                {/* Front face: current image */}
                                <div
                                    style={{
                                        ...pageStyle,
                                        position: "absolute",
                                        inset: 0,
                                        backfaceVisibility: "hidden",
                                        borderRadius: "0 2px 2px 0",
                                    }}
                                >
                                    <img
                                        src={frontImg}
                                        alt={`Memory ${currentPage + 1}`}
                                        style={photoStyle}
                                    />
                                </div>

                                {/* Back face: mirrored so it reads correctly when face-down */}
                                <div
                                    style={{
                                        ...pageStyle,
                                        position: "absolute",
                                        inset: 0,
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg) scaleX(-1)",
                                        borderRadius: "0 2px 2px 0",
                                    }}
                                >
                                    <img
                                        src={behindImg}
                                        alt={`Memory ${currentPage + 2}`}
                                        style={photoStyle}
                                    />
                                </div>
                            </motion.div>
                        </div>
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

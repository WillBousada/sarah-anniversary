import { useState, useEffect, useRef, useCallback } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import SmoothScroll, { useLenis } from "../components/scrolly/SmoothScroll";
import HeroSection from "../components/scrolly/HeroSection";
import IntroSection from "../components/scrolly/IntroSection";
import LakeScroll from "../components/scrolly/LakeScroll";
import DancerScroll from "../components/scrolly/DancerScroll";
import SpaScroll from "../components/scrolly/SpaScroll";
import MemoryBookSection from "../components/scrolly/MemoryBookSection";
import MemoryCaption from "../components/scrolly/MemoryCaption";
import QuillSection from "../components/scrolly/QuillSection";
import MontrealScroll from "../components/scrolly/MontrealScroll";
import SmileSection from "../components/scrolly/SmileSection";
import SillySection from "../components/scrolly/SillySection";
import ClosingSection from "../components/scrolly/ClosingSection";
import SpriteDownloadFolder from "../components/scrolly/SpriteDownloadFolder";

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

    return (
        <motion.div
            style={{
                scaleX,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background:
                    "linear-gradient(to right, #f9a8d4, #ec4899, #db2777)",
                transformOrigin: "left",
                zIndex: 100,
            }}
        />
    );
}

const SCROLL_SPEED = 90; // pixels per second

function AutoScroll() {
    const [playing, setPlaying] = useState(false);
    const activeRef = useRef(false);
    const lastTsRef = useRef(null);
    const lenisRef = useLenis();
    const buttonRef = useRef(null);

    const stop = useCallback(() => {
        activeRef.current = false;
        lastTsRef.current = null;
        setPlaying(false);
        lenisRef?.current?.start();
    }, [lenisRef]);

    const start = useCallback(() => {
        lenisRef?.current?.stop();
        activeRef.current = true;
        lastTsRef.current = null;
        setPlaying(true);

        const tick = (ts) => {
            if (!activeRef.current) return;
            if (lastTsRef.current !== null) {
                const delta = ((ts - lastTsRef.current) / 1000) * SCROLL_SPEED;
                window.scrollBy(0, delta);
                if (
                    window.scrollY + window.innerHeight >=
                    document.body.scrollHeight - 5
                ) {
                    stop();
                    return;
                }
            }
            lastTsRef.current = ts;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [lenisRef, stop]);

    // Pause on any manual scroll input
    useEffect(() => {
        const onInteract = (e) => {
            if (buttonRef.current?.contains(e.target)) return;
            if (activeRef.current) stop();
        };
        window.addEventListener("wheel", onInteract, { passive: true });
        window.addEventListener("touchstart", onInteract, { passive: true });
        window.addEventListener("keydown", onInteract, { passive: true });
        return () => {
            window.removeEventListener("wheel", onInteract);
            window.removeEventListener("touchstart", onInteract);
            window.removeEventListener("keydown", onInteract);
        };
    }, [stop]);

    // Auto-pause once when quill section first comes into view
    useEffect(() => {
        const el = document.getElementById("zone-quill");
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && activeRef.current) {
                    stop();
                    observer.disconnect();
                }
            },
            { threshold: 0.95 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [stop]);

    useEffect(
        () => () => {
            activeRef.current = false;
        },
        [],
    );

    return (
        <button
            ref={buttonRef}
            onClick={() => (playing ? stop() : start())}
            aria-label={playing ? "Pause auto-scroll" : "Start auto-scroll"}
            title={playing ? "Pause" : "Auto-scroll through the page"}
            style={{
                position: "fixed",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.1rem",
                borderRadius: "999px",
                background: "rgba(30, 14, 5, 0.72)",
                border: "1px solid rgba(245,240,224,0.18)",
                backdropFilter: "blur(6px)",
                color: "#f5f0e0",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "sans-serif",
                transition: "opacity 0.2s",
            }}
        >
            {playing ? (
                <>
                    <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="currentColor"
                    >
                        <rect x="0" y="0" width="3.5" height="12" rx="1" />
                        <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
                    </svg>
                    Pause
                </>
            ) : (
                <>
                    <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="currentColor"
                    >
                        <polygon points="0,0 10,6 0,12" />
                    </svg>
                    Play
                </>
            )}
        </button>
    );
}

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > window.innerHeight);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                zIndex: 50,
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "50%",
                background: "rgba(30, 14, 5, 0.72)",
                border: "1px solid rgba(245,240,224,0.18)",
                backdropFilter: "blur(6px)",
                color: "#f5f0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
                transition: "opacity 0.3s ease",
            }}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="3 10 8 5 13 10" />
            </svg>
        </button>
    );
}

export default function ScrollyPage() {
    return (
        <SmoothScroll>
            <ScrollProgress />
            {/* Film grain overlay — fixed, only on this page */}
            <div className="grain-overlay" />

            <div style={{ backgroundColor: "#FDFCF0" }}>
                <HeroSection />
                <div id="zone-intro">
                    <IntroSection />
                </div>
                <div id="zone-caption-1">
                    <MemoryCaption
                        eyebrow="White Lake"
                        heading="Your family's cottage"
                        body="White Lake has become one of my favourite places in the world. There's something about being there with you that just feels like home."
                    />
                </div>
                <LakeScroll />
                <div id="zone-caption-2">
                    <MemoryCaption
                        eyebrow="Formal"
                        heading={
                            <>
                                You always take my <em>breath away</em>
                            </>
                        }
                        body="Getting all dressed up with you is one of my favourite things. No words could describe how beautiful you are."
                    />
                </div>
                <DancerScroll />
                <div id="zone-caption-3">
                    <MemoryCaption
                        eyebrow="Koena, Québec"
                        heading="Our New Years, Québec adventure"
                        body="The spa, the food, the cold — I loved every second of that trip because I got to share it with you."
                    />
                </div>
                <SpaScroll />
                <div id="zone-caption-4">
                    <MemoryCaption
                        eyebrow="Montréal"
                        heading="Our Montreal trip"
                        body="Running around Montreal with you was one of the best times. Every street, every bite of food, every moment — I want to go back and do it all again."
                    />
                </div>
                <MontrealScroll />
                <SillySection />
                <SmileSection />
                <div id="zone-closing">
                    <ClosingSection />
                </div>
                <div id="zone-quill">
                    <QuillSection />
                </div>
                <div id="zone-memory-book">
                    <MemoryBookSection />
                </div>
                <SpriteDownloadFolder />
            </div>

            <AutoScroll />
            <BackToTop />
        </SmoothScroll>
    );
}

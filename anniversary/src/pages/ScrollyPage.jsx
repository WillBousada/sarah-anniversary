import { useState, useEffect } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import SmoothScroll from "../components/scrolly/SmoothScroll";
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
                <IntroSection />
                <MemoryCaption
                    eyebrow="White Lake"
                    heading="Your family's cottage"
                    body="White Lake has become one of my favourite places in the world. There's something about being there with you that just feels like home."
                />
                <LakeScroll />
                <MemoryCaption
                    eyebrow="Formal"
                    heading={<>You always take my <em>breath away</em></>}
                    body="Getting all dressed up with you is one of my favourite things. No words could describe how beautiful you are."
                />
                <DancerScroll />
                <MemoryCaption
                    eyebrow="Koena, Québec"
                    heading="Our New Years, Québec adventure"
                    body="The spa, the food, the cold — I loved every second of that trip because I got to share it with you."
                />
                <SpaScroll />
                <MemoryCaption
                    eyebrow="Montréal"
                    heading="Our Montreal trip"
                    body="Running around Montreal with you was one of the best times. Every street, every bite of food, every moment — I want to go back and do it all again."
                />
                <MontrealScroll />
                <SillySection />
                <SmileSection />
                <MemoryBookSection />
                <QuillSection />
                <ClosingSection />
            </div>

            <BackToTop />
        </SmoothScroll>
    );
}

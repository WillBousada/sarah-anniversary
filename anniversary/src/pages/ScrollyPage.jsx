import SmoothScroll from "../components/scrolly/SmoothScroll";
import HeroSection from "../components/scrolly/HeroSection";
import OutdoorsSection from "../components/scrolly/OutdoorsSection";
import DancerScroll from "../components/scrolly/DancerScroll";
import SpaScroll from "../components/scrolly/SpaScroll";
import MemoryBookSection from "../components/scrolly/MemoryBookSection";
import RevealSection from "../components/scrolly/RevealSection";

export default function ScrollyPage() {
    return (
        <SmoothScroll>
            {/* Film grain overlay — fixed, only on this page */}
            <div className="grain-overlay" />

            <div style={{ backgroundColor: "#FDFCF0" }}>
                <HeroSection />
                <OutdoorsSection />
                <DancerScroll />
                <SpaScroll />
                <MemoryBookSection />
                <RevealSection />
            </div>
        </SmoothScroll>
    );
}

import SmoothScroll from "../components/scrolly/SmoothScroll";
import HeroSection from "../components/scrolly/HeroSection";
import OutdoorsSection from "../components/scrolly/OutdoorsSection";
import DanceSection from "../components/scrolly/DanceSection";
import SpaSection from "../components/scrolly/SpaSection";
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
                <DanceSection />
                <SpaSection />
                <MemoryBookSection />
                <RevealSection />
            </div>
        </SmoothScroll>
    );
}

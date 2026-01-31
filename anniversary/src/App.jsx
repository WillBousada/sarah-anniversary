import WelcomeText from "./components/SplitText";
import CircularText from "./components/CircularText";
import FloatingHearts from "./components/FloatingHearts";
import Timeline from "./components/Timeline";
import Stack from "./components/Stack";
import LoveLetter from "./components/LoveLetter";
import BumbleBee from "./components/BumbleBee";

export default function App() {
    return (
        <div className="overflow-x-hidden">
            {/* Section 1: Opening */}
            <section
                id="opening"
                className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 flex items-center justify-center p-4 relative"
            >
                <FloatingHearts count={15} />
                <WelcomeText
                    text="Hello Beautiful"
                    tag="h1"
                    className="text-7xl font-bold text-white italic"
                    delay={150}
                    duration={1.2}
                    splitType="chars"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                />
            </section>

            {/* Section 2: One Year */}
            <section
                id="oneyear"
                className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-400 to-fuchsia-300 flex flex-col items-center justify-center p-4 gap-8 relative"
            >
                <WelcomeText
                    text="I can't believe it's been a year"
                    tag="h2"
                    className="text-5xl font-bold text-white italic"
                    delay={80}
                    duration={1}
                    splitType="words"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                />

                <CircularText
                    text=" 365 days * Laughs * Adventures * Love *"
                    onHover="speedUp"
                    spinDuration={20}
                />

                <WelcomeText
                    text="Scroll to see our journey together ↓"
                    tag="p"
                    className="text-2xl text-white/80 italic"
                    delay={50}
                    duration={0.8}
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                />
            </section>

            {/* Section 3: Lovverrrruuuu */}
            <section className="min-h-screen bg-gradient-to-br from-fuchsia-300 via-purple-300 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated hearts in background */}
                <FloatingHearts count={20} />

                {/* Pulsing glow effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 transform -rotate-45 origin-center">
                    <WelcomeText
                        text="lovvvvverrrruuuuuuuuuu"
                        tag="h2"
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white italic whitespace-nowrap drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]"
                        delay={80}
                        duration={1.5}
                        splitType="chars"
                        from={{ opacity: 0, scale: 0.3, rotateZ: -20, y: 100 }}
                        to={{ opacity: 1, scale: 1, rotateZ: 0, y: 0 }}
                    />
                </div>

                {/* Sparkle elements */}
                <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce">
                    ✨
                </div>
                <div
                    className="absolute bottom-1/4 right-1/4 text-6xl animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                >
                    💕
                </div>
                <div
                    className="absolute top-1/3 right-1/3 text-5xl animate-bounce"
                    style={{ animationDelay: "0.6s" }}
                >
                    💖
                </div>
            </section>

            {/* Section 4: Timeline */}
            <section
                id="timeline"
                className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-400 to-pink-400 py-20 px-4"
            >
                <Timeline />
            </section>

            {/* Section 5: Bumble Bee */}
            <section
                id="bee"
                className="min-h-screen bg-gradient-to-br from-yellow-200 via-amber-200 to-yellow-300 flex items-center justify-center p-4 relative"
            >
                <BumbleBee />
            </section>

            {/* Section 6: Photo Stack */}
            <section
                id="gallery"
                className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-400 py-20 px-4 flex items-center justify-center"
            >
                <Stack />
            </section>

            {/* Section 7: Love Letter */}
            <section
                id="letter"
                className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 flex items-center justify-center p-4"
            >
                <LoveLetter />
            </section>

            {/* Final Section: Hearts */}
            <section className="min-h-screen bg-gradient-to-br from-fuchsia-300 via-pink-400 to-rose-400 flex items-center justify-center p-4 relative">
                <FloatingHearts count={30} />
                <WelcomeText
                    text="Happy Anniversary Sarah ♥"
                    tag="h1"
                    className="text-6xl font-bold text-white italic"
                    delay={120}
                    duration={1.2}
                    splitType="chars"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                />
            </section>
        </div>
    );
}

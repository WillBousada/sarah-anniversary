import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WelcomeText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Timeline() {
    const containerRef = useRef(null);

    const moments = [
        {
            title: "First Meeting",
            description: "At a Beta party... ✨",
            emoji: "🎉",
        },
        {
            title: "Our First Christmas",
            description: "Spending Christmas with you 🎄",
            emoji: "🎄",
        },
        {
            title: "First Trip",
            description: "Adventures begin in Montreal 🗺️",
            emoji: "✈️",
        },
        {
            title: "I Love You",
            description:
                "On New Years night, three words that changed everything 💕",
            emoji: "💖",
        },
        {
            title: "Spa Day",
            description: "Relaxation and pampering together at Noridik 🧖‍♀️",
            emoji: "💆‍♀️",
        },
        {
            title: "Lake House",
            description: "Visiting your lake house 🏡",
            emoji: "🏡",
        },
        {
            title: "Timmies Wraps",
            description: "Eating too many tims wraps at Carleton 🌯",
            emoji: "🌯",
        },
        {
            title: "Summer",
            description: "Endless sunshine, memories and hiking ☀️",
            emoji: "⛰️",
        },
        {
            title: "Thanks giving",
            description: "Enjoying family together 🦃",
            emoji: "🦃",
        },
        {
            title: "Montreal",
            description:
                "Exploring new places, making new memories and eating great food 🍁",
            emoji: "🍁",
        },
    ];

    useGSAP(
        () => {
            const items =
                containerRef.current?.querySelectorAll(".timeline-item");

            items?.forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1,
                    },
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto px-4">
            <WelcomeText
                text="Our Journey Together"
                tag="h2"
                className="text-4xl md:text-6xl font-bold text-white italic text-center mb-12 md:mb-16"
                delay={80}
                duration={1}
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
            />

            <div className="relative">
                {/* Timeline line - hidden on mobile, shown on desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/30" />
                {/* Timeline line for mobile - left side */}
                <div className="md:hidden absolute left-6 top-0 w-1 h-full bg-white/30" />

                {moments.map((moment, index) => (
                    <div
                        key={index}
                        className="timeline-item mb-8 md:mb-12 relative"
                    >
                        {/* Mobile Layout (vertical left-aligned) */}
                        <div className="md:hidden flex items-start gap-6">
                            {/* Dot */}
                            <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full border-4 border-pink-400 shadow-lg z-10 mt-2" />

                            {/* Content */}
                            <div className="flex-1">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                                    <div className="text-4xl mb-2">
                                        {moment.emoji}
                                    </div>
                                    <h3 className="text-xl font-bold text-pink-600 mb-1 italic">
                                        {moment.title}
                                    </h3>
                                    <p className="text-sm text-gray-700 italic">
                                        {moment.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Layout (alternating sides) */}
                        <div
                            className={`hidden md:flex items-center ${
                                index % 2 === 0
                                    ? "flex-row"
                                    : "flex-row-reverse"
                            }`}
                        >
                            <div
                                className={`w-5/12 ${
                                    index % 2 === 0
                                        ? "text-right pr-8"
                                        : "text-left pl-8"
                                }`}
                            >
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                    <div className="text-5xl mb-3">
                                        {moment.emoji}
                                    </div>
                                    <h3 className="text-2xl font-bold text-pink-600 mb-2 italic">
                                        {moment.title}
                                    </h3>
                                    <p className="text-gray-700 italic">
                                        {moment.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center dot */}
                            <div className="w-2/12 flex justify-center">
                                <div className="w-6 h-6 bg-white rounded-full border-4 border-pink-400 shadow-lg z-10" />
                            </div>

                            <div className="w-5/12" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

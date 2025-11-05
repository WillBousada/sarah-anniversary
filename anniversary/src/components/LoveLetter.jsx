import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function LoveLetter() {
    const letterRef = useRef(null);

    useGSAP(
        () => {
            if (!letterRef.current) return;

            gsap.from(letterRef.current, {
                opacity: 0,
                y: 0,
                rotateX: -15,
                scrollTrigger: {
                    trigger: letterRef.current,
                    start: "top 70%",
                    end: "top 30%",
                    scrub: 1,
                },
            });
        },
        { scope: letterRef }
    );

    return (
        <div ref={letterRef} className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-2xl p-12 border-4 border-amber-200 relative">
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 text-pink-400 text-2xl">
                    ✿
                </div>
                <div className="absolute top-4 right-4 text-pink-400 text-2xl">
                    ✿
                </div>
                <div className="absolute bottom-4 left-4 text-pink-400 text-2xl">
                    ✿
                </div>
                <div className="absolute bottom-4 right-4 text-pink-400 text-2xl">
                    ✿
                </div>

                <div
                    className="space-y-6 text-gray-800"
                    style={{ fontFamily: "Brush Script MT, cursive" }}
                >
                    <div className="text-right text-gray-600 mb-8">
                        November 9th, 2025
                    </div>

                    <h2 className="text-4xl font-bold text-pink-600 mb-6 text-center italic">
                        My Dearest Sarah,
                    </h2>

                    <div
                        className="text-lg leading-relaxed space-y-4 italic"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        <p>
                            From that first night when our eyes met across the
                            room, I knew something magical had begun. You walked
                            into my life like the first snowfall of winter.
                        </p>

                        <p>
                            Our first Christmas together, wrapped in warmth and
                            wonder. Then Montreal on New Year's, under the club
                            lights, three words escaped my lips that had been
                            building in my heart for months: I love you.
                        </p>

                        <p>
                            The spa days at Nordik, where time stood still in
                            the steam and serenity. Summer hikes where we chased
                            sunsets and made promises. Your lake house, where I
                            learned what home truly means - it's not a place,
                            it's you. Even our silly Timmies wrap addiction at
                            Carleton became sacred to me, because they were
                            ours.
                        </p>

                        <p>
                            Thanksgiving with family, Montreal's autumn colors,
                            every inside joke (especially you my little bumble
                            bee 🐝), every "lovvvvverrrruuuuuuuuuu" texted in
                            the dark - they're all threads in the tapestry we're
                            weaving together.
                        </p>

                        <p>
                            365 days. 365 reasons to smile. 365 moments of
                            choosing you, and you choosing me. Thank you for
                            being my adventure, my comfort, my laughter, and my
                            home.
                        </p>

                        <p
                            className="text-center mt-8"
                            style={{ fontFamily: "Brush Script MT, cursive" }}
                        >
                            Here's to forever more adventures, my beautiful
                            Sarah ❤️
                        </p>

                        <p
                            className="text-right text-3xl mt-8"
                            style={{ fontFamily: "Brush Script MT, cursive" }}
                        >
                            Forever yours,
                            <br />
                            <span className="text-pink-600 font-bold">
                                Will
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

                    <div className="text-2xl leading-relaxed space-y-4 italic">
                        <p></p>

                        <p></p>

                        <p></p>

                        <p></p>

                        <p className="text-center mt-8">Happy Anniversary ❤️</p>

                        <p className="text-right text-3xl mt-8">
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

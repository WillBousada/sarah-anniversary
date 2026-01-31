import { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function Valentine() {
    const [answered, setAnswered] = useState(false);
    const noRef = useRef(null);
    const containerRef = useRef(null);

    const moveNoButton = useCallback(() => {
        if (!noRef.current || !containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const btn = noRef.current.getBoundingClientRect();

        const maxX = container.width - btn.width - 20;
        const maxY = container.height - btn.height - 20;

        const newX = Math.random() * maxX - maxX / 2;
        const newY = Math.random() * maxY - maxY / 2;

        gsap.to(noRef.current, {
            x: newX,
            y: newY,
            duration: 0.3,
            ease: "power2.out",
        });
    }, []);

    const handleYes = () => {
        setAnswered(true);
    };

    if (answered) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 text-center relative z-10">
                <div className="text-8xl animate-bounce">💖</div>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white italic drop-shadow-lg">
                    Yayyyy!!!
                </h2>
                <p className="text-2xl sm:text-3xl text-white/90 italic">
                    I love you so much Sarah!
                </p>
                <div className="flex gap-4 text-5xl">
                    <span className="animate-bounce" style={{ animationDelay: "0s" }}>💕</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🥰</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>💕</span>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center justify-center gap-8 text-center relative z-10 w-full h-full min-h-[60vh]"
        >
            <div className="text-7xl sm:text-8xl">🌹</div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white italic drop-shadow-lg">
                Will you be my Valentine?
            </h2>

            <p className="text-xl sm:text-2xl text-white/80 italic">
                (Choose wisely...)
            </p>

            <div className="flex gap-8 items-center relative mt-4">
                <button
                    onClick={handleYes}
                    className="px-10 py-4 bg-white text-pink-500 font-bold text-2xl rounded-full shadow-lg
                               hover:bg-pink-500 hover:text-white hover:scale-110
                               transition-all duration-300 cursor-pointer"
                >
                    Yes! 💖
                </button>

                <button
                    ref={noRef}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    onClick={moveNoButton}
                    className="px-10 py-4 bg-white/50 text-gray-500 font-bold text-2xl rounded-full shadow-lg
                               transition-colors duration-300 cursor-pointer"
                >
                    No
                </button>
            </div>
        </div>
    );
}

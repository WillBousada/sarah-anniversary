import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import WelcomeText from "./SplitText";

export default function BumbleBee() {
    const beeRef = useRef(null);

    useEffect(() => {
        if (!beeRef.current) return;

        // Floating animation
        gsap.to(beeRef.current, {
            y: -20,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        // Gentle rotation
        gsap.to(beeRef.current, {
            rotation: 5,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }, []);

    return (
        <div className="text-center">
            <div
                ref={beeRef}
                className="text-9xl mb-8"
                style={{ willChange: "transform" }}
            >
                🐝
            </div>

            <WelcomeText
                text="Buzzing with love for you"
                tag="h2"
                className="text-5xl font-bold text-gray-800 italic mb-4"
                delay={80}
                duration={1}
                splitType="words"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
            />
            <p className="text-3xl text-gray-700 italic">BUMBLE-BEE 💛</p>
        </div>
    );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FloatingHearts({ count = 10 }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const hearts = containerRef.current.children;
        
        Array.from(hearts).forEach((heart, index) => {
            // Random starting position
            const startX = Math.random() * 100;
            const startDelay = Math.random() * 2;
            
            gsap.set(heart, {
                left: `${startX}%`,
                bottom: '-10%',
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0
            });

            // Animate upward with wave motion
            gsap.to(heart, {
                bottom: '110%',
                x: `${Math.sin(index) * 100}px`,
                opacity: 1,
                duration: Math.random() * 3 + 4,
                delay: startDelay,
                ease: 'none',
                repeat: -1,
                onRepeat: () => {
                    gsap.set(heart, {
                        left: `${Math.random() * 100}%`,
                        scale: Math.random() * 0.5 + 0.5,
                    });
                }
            });

            // Add gentle rotation
            gsap.to(heart, {
                rotation: 360,
                duration: Math.random() * 4 + 3,
                repeat: -1,
                ease: 'none'
            });
        });

        return () => {
            gsap.killTweensOf(containerRef.current?.children);
        };
    }, [count]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="absolute text-4xl"
                    style={{ willChange: 'transform, opacity' }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
}

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";

export const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PolaroidFrame from "./PolaroidFrame";

export default function ParallaxImage({
    src,
    alt = "",
    caption = "",
    width = "w-72",
    height = "h-80",
    yRange = [-30, 30],
    rotateRange = [-3, 3],
    className = "",
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], yRange.map(v => `${v}px`));
    const rotate = useTransform(scrollYProgress, [0, 1], rotateRange.map(v => `${v}deg`));

    return (
        <motion.div ref={ref} style={{ y, rotate }} className={`${width} ${className}`}>
            <PolaroidFrame caption={caption}>
                <div className={`${height} overflow-hidden`}>
                    <img src={src} alt={alt} className="vintage-img" />
                </div>
            </PolaroidFrame>
        </motion.div>
    );
}

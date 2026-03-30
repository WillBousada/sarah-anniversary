import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MediaFrame({
    src,
    videoSrc = null,
    alt = "",
    scrollTriggered = false,
    className = "",
}) {
    const [hovered, setHovered] = useState(false);
    const showVideo = videoSrc && (hovered || scrollTriggered);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence mode="wait">
                {showVideo ? (
                    <motion.video
                        key="video"
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="vintage-img absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                ) : (
                    <motion.img
                        key="image"
                        src={src}
                        alt={alt}
                        className="vintage-img"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

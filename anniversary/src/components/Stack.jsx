import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import WelcomeText from "./SplitText";

function CardRotate({ children, onSendToBack, sensitivity }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_, info) {
        if (
            Math.abs(info.offset.x) > sensitivity ||
            Math.abs(info.offset.y) > sensitivity
        ) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className="absolute cursor-grab"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: "grabbing" }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

export default function Stack({
    randomRotation = true,
    sensitivity = 200,
    cardDimensions = { width: 300, height: 400 },
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = true,
}) {
    const cardsData = [
        { id: 1, img: "/photo (1).jpg" },
        { id: 2, img: "/photo (2).jpg" },
        { id: 3, img: "/photo (3).jpg" },
        { id: 4, img: "/photo (4).jpg" },
        { id: 5, img: "/photo (5).jpg" },
        { id: 6, img: "/photo (6).jpg" },
        { id: 7, img: "/photo (7).jpg" },
        { id: 8, img: "/photo- (8).jpg" },
        { id: 9, img: "/photo- (9).jpg" },
        { id: 10, img: "/photo- (10).jpg" },
        { id: 11, img: "/photo (11).jpg" },
        { id: 12, img: "/photo (12).jpg" },
        { id: 13, img: "/photo- (13).jpg" },
        { id: 14, img: "/photo- (14).jpg" },
        { id: 15, img: "/photo- (15).jpg" },
        { id: 16, img: "/photo- (16).jpg" },
        { id: 17, img: "/photo (17).jpg" },
        { id: 18, img: "/photo- (18).jpg" },
        { id: 19, img: "/photo- (19).jpg" },
        { id: 20, img: "/photo- (20).jpg" },
    ];

    const [cards, setCards] = useState(cardsData);

    const sendToBack = (id) => {
        setCards((prev) => {
            const newCards = [...prev];
            const index = newCards.findIndex((card) => card.id === id);
            const [card] = newCards.splice(index, 1);
            newCards.unshift(card);
            return newCards;
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <WelcomeText
                text="Our Moments"
                tag="h2"
                className="text-4xl md:text-6xl font-bold text-white italic text-center"
                delay={80}
                duration={1}
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
            />

            <div
                className="relative"
                style={{
                    width: cardDimensions.width,
                    height: cardDimensions.height,
                    perspective: 600,
                }}
            >
                {cards.map((card, index) => {
                    const randomRotate = randomRotation
                        ? Math.random() * 10 - 5
                        : 0;

                    return (
                        <CardRotate
                            key={card.id}
                            onSendToBack={() => sendToBack(card.id)}
                            sensitivity={sensitivity}
                        >
                            <motion.div
                                className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl"
                                onClick={() =>
                                    sendToBackOnClick && sendToBack(card.id)
                                }
                                animate={{
                                    rotateZ:
                                        (cards.length - index - 1) * 4 +
                                        randomRotate,
                                    scale:
                                        1 + index * 0.06 - cards.length * 0.06,
                                    transformOrigin: "90% 90%",
                                }}
                                initial={false}
                                transition={{
                                    type: "spring",
                                    stiffness: animationConfig.stiffness,
                                    damping: animationConfig.damping,
                                }}
                                style={{
                                    width: cardDimensions.width,
                                    height: cardDimensions.height,
                                }}
                            >
                                <img
                                    src={card.img}
                                    alt={`Memory ${card.id}`}
                                    className="w-full h-full object-cover pointer-events-none"
                                />
                            </motion.div>
                        </CardRotate>
                    );
                })}
            </div>

            <p className="text-white/80 text-lg italic text-center mt-4">
                Drag or click to see more photos ✨
            </p>
        </div>
    );
}

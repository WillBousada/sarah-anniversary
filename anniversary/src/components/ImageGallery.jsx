import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WelcomeText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ImageGallery() {
    const containerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Placeholder for your 27 images - replace with actual image paths
    const images = Array.from({ length: 27 }, (_, i) => ({
        id: i + 1,
        src: `/public/photo (${i + 1}).jpg`, // Replace with your actual image paths
        alt: `Memory ${i + 1}`,
    }));
    console.log(images);
    useGSAP(
        () => {
            const items =
                containerRef.current?.querySelectorAll(".gallery-item");

            items?.forEach((item) => {
                gsap.from(item, {
                    opacity: 0,
                    scale: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1,
                    },
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="max-w-7xl mx-auto">
            <WelcomeText
                text="Our Moments"
                tag="h2"
                className="text-6xl font-bold text-white italic text-center mb-16"
                delay={80}
                duration={1}
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="gallery-item relative aspect-square bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300"
                        onClick={() => setSelectedImage(image)}
                    >
                        {/* Placeholder for image */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-rose-300">
                            <span className="text-white text-xl font-bold">
                                Photo {image.id}
                            </span>
                        </div>
                        {/* Uncomment when you add real images:
                        <img 
                            src={image.src} 
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                        */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-rose-300 p-8">
                            <span className="text-white text-4xl font-bold">
                                Photo {selectedImage.id}
                            </span>
                        </div>
                        {/* Uncomment when you add real images:
                        <img 
                            src={selectedImage.src} 
                            alt={selectedImage.alt}
                            className="w-full h-full object-contain"
                        />
                        */}
                    </div>
                </div>
            )}

            <p className="text-white/80 text-center mt-8 text-lg italic">
                📸 Replace placeholder images with your actual photos in
                /public/images/
            </p>
        </div>
    );
}

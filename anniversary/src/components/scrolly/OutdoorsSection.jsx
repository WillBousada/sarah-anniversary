import ParallaxImage from "./ParallaxImage";

export default function OutdoorsSection() {
    return (
        <section className="min-h-screen flex items-center justify-center py-32 px-8 overflow-hidden">
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
                {/* Left image — floats up */}
                <ParallaxImage
                    src="/assets/IMG_2930.jpg"
                    alt="Lake selfie"
                    caption="our happy place"
                    width="w-64 md:w-80"
                    height="h-80 md:h-96"
                    yRange={[-40, 40]}
                    rotateRange={[-4, 2]}
                    className="md:-mt-16"
                />

                {/* Section label */}
                <div className="text-center flex-shrink-0">
                    <p
                        className="text-stone-400 text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        The Great Outdoors
                    </p>
                    <div className="w-px h-20 bg-stone-300 mx-auto" />
                </div>

                {/* Right image — floats down */}
                <ParallaxImage
                    src="/assets/IMG_2755.jpg"
                    alt="The kiss"
                    caption="always"
                    width="w-64 md:w-80"
                    height="h-80 md:h-96"
                    yRange={[40, -40]}
                    rotateRange={[2, -4]}
                    className="md:mt-16"
                />
            </div>
        </section>
    );
}

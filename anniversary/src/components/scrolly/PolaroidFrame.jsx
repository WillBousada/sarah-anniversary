export default function PolaroidFrame({ children, caption = "", className = "" }) {
    return (
        <div
            className={`bg-white p-3 pb-10 shadow-2xl shadow-black/30 relative ${className}`}
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))" }}
        >
            <div className="overflow-hidden w-full h-full">
                {children}
            </div>
            {caption && (
                <p
                    className="absolute bottom-2 left-0 right-0 text-center text-sm text-stone-500 italic"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {caption}
                </p>
            )}
        </div>
    );
}

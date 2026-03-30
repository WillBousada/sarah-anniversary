const sprites = [
    { name: "Dancing", file: "dancing-sprite.png" },
    { name: "Spa", file: "spa-sprite.png" },
    { name: "Lake", file: "lake-sprite.png" },
    { name: "Silly", file: "silly-sprite.png" },
    { name: "Montréal", file: "montreal-sprite.png" },
    { name: "Smile", file: "smile-sprite.png" },
];

export default function SpriteDownloadFolder() {
    return (
        <section
            className="flex items-center justify-center px-6"
            style={{ minHeight: "60vh" }}
        >
            <div style={{ width: "100%", maxWidth: "320px" }}>
                {/* Folder tab */}
                <div
                    style={{
                        width: "100px",
                        height: "14px",
                        background: "#f9d5e0",
                        borderRadius: "6px 6px 0 0",
                        marginLeft: "12px",
                    }}
                />
                {/* Folder body */}
                <div
                    style={{
                        background: "#fdeef3",
                        border: "1.5px solid #f5c8d6",
                        borderRadius: "0 6px 6px 6px",
                        padding: "1.25rem 1.5rem 1.5rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                >
                    <p
                        className="text-stone-500 text-xs tracking-[0.3em] uppercase mb-4"
                        style={{ fontFamily: "sans-serif" }}
                    >
                        Download Cartoon Images
                    </p>
                    <ul className="flex flex-col gap-2">
                        {sprites.map(({ name, file }) => (
                            <li key={file}>
                                <a
                                    href={`/assets/${file}`}
                                    download={file}
                                    className="flex items-center justify-between group"
                                    style={{
                                        fontFamily: "'Georgia', serif",
                                        color: "#9d7080",
                                        fontSize: "0.9rem",
                                        textDecoration: "none",
                                        padding: "0.3rem 0",
                                        borderBottom: "1px solid #f2c0cf",
                                    }}
                                >
                                    <span className="group-hover:text-stone-800 transition-colors">
                                        {name}
                                    </span>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-40 group-hover:opacity-80 transition-opacity"
                                    >
                                        <polyline points="8 3 8 11" />
                                        <polyline points="4 8 8 12 12 8" />
                                        <line x1="3" y1="14" x2="13" y2="14" />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

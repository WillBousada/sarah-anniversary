import { useEffect, useRef } from "react";
import "./menu.css";

// Tonight's dishes are listed first in each section; everything else is sold out.
const sections = [
    {
        id: "antipasti",
        label: "Antipasti",
        translation: "Appetizers",
        items: [
            {
                name: "Beef Tartare",
                price: "42",
                description:
                    "Hand-Cut Prime Beef, Fresh Herbs, Caper Emulsion, Toasted Crostini",
            },
            {
                name: "Bruschetta",
                price: "15",
                description: "Toasted Bread, Seasoned Tomato, Shaved Parmigiano",
                soldOut: true,
            },
            {
                name: "Fried Calamari",
                price: "29",
                description: "Lightly Dusted Squid, Lemon, Seafood Sauce",
                soldOut: true,
            },
            {
                name: "Burrata for Two",
                price: "55",
                description:
                    "Fresh Burrata, Aged Prosciutto, Tomato Marmalade, Basil Oil",
                soldOut: true,
            },
        ],
    },
    {
        id: "primi",
        label: "Primi",
        translation: "First Course",
        items: [
            {
                name: "Wild Mushroom & Broccolini Risotto",
                price: "55",
                description:
                    "Creamy Arborio Rice, Wild Forest Mushrooms, Char-Grilled Broccolini, Aged Parmigiano-Reggiano",
            },
            {
                name: "Lobster Ravioli",
                price: "72",
                description: "Handmade Ravioli, Canadian Lobster, Crustacean Cream",
                soldOut: true,
            },
            {
                name: "Rigatoni Carbonara",
                price: "42",
                description: "Egg Yolk, Pecorino Romano, Black Pepper, Guanciale",
                soldOut: true,
            },
            {
                name: "House Lasagna",
                price: "41",
                description:
                    "Handmade Pasta Sheets, Bolognese, Fresh Mozzarella, Parmigiano",
                soldOut: true,
            },
        ],
    },
    {
        id: "secondi",
        label: "Secondi",
        translation: "Main Course",
        items: [
            {
                name: "Honey Dijon Baked Salmon",
                price: "49",
                description:
                    "Oven-Baked Salmon, Dijon & Wildflower Honey Glaze, Served With a Sommelier's Selection of Fine White Wine",
            },
            {
                name: "Filet Mignon",
                price: "95",
                description: "6 oz. Beef Tenderloin, Chianti Reduction, Truffle",
                soldOut: true,
            },
            {
                name: "Rack of Lamb",
                price: "85",
                description: "Rosemary, Lemon, Lamb Jus",
                soldOut: true,
            },
            {
                name: "Veal Marsala",
                price: "45",
                description: "Tender Veal Medallions, Mushrooms, Marsala Wine",
                soldOut: true,
            },
        ],
    },
    {
        id: "dolci",
        label: "Dolci",
        translation: "Desserts",
        items: [
            {
                name: "Holiday Sugar Cookies & Hot Chocolate",
                price: "18",
                description:
                    "Warm, Freshly Baked Holiday Sugar Cookies, Velvety Artisanal Hot Chocolate",
            },
            {
                name: "Tiramisù",
                price: "16",
                description: "Espresso-Soaked Ladyfingers, Mascarpone Cream, Cocoa",
                soldOut: true,
            },
            {
                name: "Cannoli",
                price: "14",
                description: "Crisp Pastry Shells, Sweet Ricotta, Pistachio",
                soldOut: true,
            },
            {
                name: "Vanilla Panna Cotta",
                price: "15",
                description: "Vanilla Bean Cream, Seasonal Berry Compote",
                soldOut: true,
            },
        ],
    },
    {
        id: "vini",
        label: "Vini",
        translation: "Wines",
        items: [
            {
                name: "Sommelier's White Selection",
                price: "2,400",
                description:
                    "Crisp, Bright, Hand-Picked by Chef Will, Pairs Beautifully With the Salmon",
            },
            {
                name: "Riserva Will & Sarah, 2024",
                price: "Priceless",
                priceIsText: true,
                description:
                    "Two-Year Vintage, Notes of Laughter & Late Nights, Only Gets Better With Time",
            },
            {
                name: "Château Margaux 1787",
                price: "225,000",
                description:
                    "Bordeaux, Allegedly From Thomas Jefferson's Cellar, Gently Dusted",
                soldOut: true,
            },
            {
                name: "Romanée-Conti Grand Cru",
                price: "38,500",
                description: "Burgundy, Poured Only Under Candlelight",
                soldOut: true,
            },
            {
                name: "Sassicaia Magnum",
                price: "14,000",
                description: "Tuscany, Decanted Tableside by a String Quartet",
                soldOut: true,
            },
            {
                name: "Dom Pérignon Rosé, Gold Leaf Edition",
                price: "9,999",
                description: "Champagne, Served in Crystal, Bubbles Hand-Counted",
                soldOut: true,
            },
        ],
    },
];

function Monogram({ small = false }) {
    return (
        <div
            className={`osteria-monogram${small ? " osteria-monogram--small" : ""}`}
            role="img"
            aria-label="W and S"
        >
            <span aria-hidden="true">W&nbsp;&amp;&nbsp;S</span>
        </div>
    );
}

export default function MenuPage() {
    const rootRef = useRef(null);

    useEffect(() => {
        const els = rootRef.current?.querySelectorAll(".osteria-reveal") ?? [];
        if (!("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-visible"));
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const jumpTo = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <main className="osteria" ref={rootRef}>
            <header className="osteria-hero">
                <img
                    className="osteria-hero-img"
                    src="/assets/menu-hero.webp"
                    alt="A plated salmon dish on a dark slate table"
                    width="800"
                    height="534"
                    fetchPriority="high"
                />
                <div className="osteria-hero-shade" aria-hidden="true" />
                <div className="osteria-header">
                    <Monogram />
                    <h1 className="osteria-title">Osteria di Souba</h1>
                    <p className="osteria-tagline">Ristorante &amp; Enoteca</p>
                    <p className="osteria-subtitle">
                        An Exclusive Anniversary Menu
                        <span className="osteria-subtitle-sep"> · </span>
                        <span className="osteria-subtitle-line">Special Edition</span>
                    </p>
                </div>
            </header>

            <nav className="osteria-nav" aria-label="Menu sections">
                <ul>
                    {sections.map((s) => (
                        <li key={s.id}>
                            <a href={`#${s.id}`} onClick={(e) => jumpTo(e, s.id)}>
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="osteria-sheet">
                {sections.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="osteria-section"
                        aria-labelledby={`${section.id}-title`}
                    >
                        <div className="osteria-section-head osteria-reveal">
                            <h2 id={`${section.id}-title`}>{section.label}</h2>
                            <p>{section.translation}</p>
                            <hr className="osteria-rule" />
                        </div>

                        <div className="osteria-items">
                            {section.items.map((item) => (
                                <article
                                    key={item.name}
                                    className={`osteria-item osteria-reveal${
                                        item.soldOut ? " is-sold-out" : ""
                                    }`}
                                >
                                    <div className="osteria-item-line">
                                        <h3>{item.name}</h3>
                                        <span className="osteria-leader" aria-hidden="true" />
                                        {item.soldOut ? (
                                            <span className="osteria-price">
                                                <s aria-hidden="true">{item.price}</s>
                                                <em>Sold Out</em>
                                            </span>
                                        ) : item.priceIsText ? (
                                            <span className="osteria-price">
                                                <em>{item.price}</em>
                                            </span>
                                        ) : (
                                            <span className="osteria-price">{item.price}</span>
                                        )}
                                    </div>
                                    <p>{item.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}

                <aside className="osteria-notes osteria-reveal">
                    <p>
                        Gratuity is paid in hugs.
                        <br />
                        Prices are for ambiance only.
                        <br />
                        Your reservation is permanent and non-refundable.
                        <br />
                        Our Chef is at your service, always.
                    </p>
                </aside>

                <p className="osteria-signoff osteria-reveal">Buon Appetito</p>
            </div>

            <footer className="osteria-footer">
                <div className="osteria-footer-inner osteria-reveal">
                    <Monogram small />
                    <p className="osteria-footer-main">
                        Everything is cooked with love by Chef Will
                    </p>
                    <p className="osteria-footer-sub">
                        Osteria di Souba · Will &amp; Sarah
                        <span className="osteria-subtitle-sep"> · </span>
                        <span className="osteria-subtitle-line">2nd Anniversary Edition</span>
                    </p>
                </div>
            </footer>
        </main>
    );
}

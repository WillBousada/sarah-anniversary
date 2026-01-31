import { Outlet } from "react-router-dom";
import BubbleMenu from "./BubbleMenu";

const menuItems = [
    {
        label: "Hello",
        href: "#opening",
        ariaLabel: "Opening",
        rotation: -8,
        hoverStyles: { bgColor: "#ec4899", textColor: "#ffffff" },
    },
    {
        label: "One Year",
        href: "#oneyear",
        ariaLabel: "One Year",
        rotation: 8,
        hoverStyles: { bgColor: "#f472b6", textColor: "#ffffff" },
    },
    {
        label: "Timeline",
        href: "#timeline",
        ariaLabel: "Timeline",
        rotation: -8,
        hoverStyles: { bgColor: "#fb7185", textColor: "#ffffff" },
    },
    {
        label: "Bee",
        href: "#bee",
        ariaLabel: "Bumble Bee",
        rotation: 8,
        hoverStyles: { bgColor: "#fbbf24", textColor: "#ffffff" },
    },
    {
        label: "Photos",
        href: "#gallery",
        ariaLabel: "Photo Gallery",
        rotation: -8,
        hoverStyles: { bgColor: "#f472b6", textColor: "#ffffff" },
    },
    {
        label: "Letter",
        href: "#letter",
        ariaLabel: "Love Letter",
        rotation: 8,
        hoverStyles: { bgColor: "#ec4899", textColor: "#ffffff" },
    },
    {
        label: "Valentine",
        href: "/valentine",
        ariaLabel: "Be My Valentine",
        rotation: -8,
        hoverStyles: { bgColor: "#e11d48", textColor: "#ffffff" },
    },
];

export default function Layout() {
    return (
        <>
            <BubbleMenu
                logo={
                    <span style={{ fontWeight: 700, color: "#ec4899" }}>
                        S♥W
                    </span>
                }
                items={menuItems}
                menuAriaLabel="Toggle navigation"
                menuBg="#ffffff"
                menuContentColor="#111111"
                useFixedPosition={true}
                animationEase="back.out(1.5)"
                animationDuration={0.5}
                staggerDelay={0.12}
            />
            <Outlet />
        </>
    );
}

import { Outlet } from "react-router-dom";
import BubbleMenu from "./BubbleMenu";

const menuItems = [
    {
        label: "Home",
        href: "/",
        ariaLabel: "Home",
        rotation: -8,
        hoverStyles: { bgColor: "#ec4899", textColor: "#ffffff" },
    },
    {
        label: "2025",
        href: "/anniversary-2025",
        ariaLabel: "Anniversary 2025",
        rotation: 8,
        hoverStyles: { bgColor: "#f472b6", textColor: "#ffffff" },
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

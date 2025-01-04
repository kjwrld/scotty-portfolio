// Desktop.tsx
import React, { useState, useEffect, useRef } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { DesktopIconData, Position } from "./types";
import folderIcon from "../assets/folder.png";

export const Desktop: React.FC = () => {
    const desktopRef = useRef<HTMLDivElement>(null);
    const [icons] = useState<DesktopIconData[]>([
        {
            id: "1",
            icon: folderIcon,
            name: "About Me",
            position: { x: 20, y: 20 },
        },
        {
            id: "2",
            icon: folderIcon,
            name: "Fashion Projects",
            position: { x: 120, y: 20 },
        },
        {
            id: "3",
            icon: folderIcon,
            name: "Brand Design",
            position: { x: 220, y: 20 },
        },
        {
            id: "4",
            icon: folderIcon,
            name: "Creative Direction",
            position: { x: 20, y: 140 },
        },
        {
            id: "5",
            icon: folderIcon,
            name: "Photography",
            position: { x: 120, y: 140 },
        },
        {
            id: "6",
            icon: folderIcon,
            name: "Design Process",
            position: { x: 220, y: 140 },
        },
        {
            id: "7",
            icon: folderIcon,
            name: "Collaborations",
            position: { x: 20, y: 260 },
        },
        {
            id: "8",
            icon: folderIcon,
            name: "Visual Archive",
            position: { x: 120, y: 260 },
        },
        {
            id: "9",
            icon: folderIcon,
            name: "Inspiration",
            position: { x: 220, y: 260 },
        },
    ]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.position = "fixed";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";

        return () => {
            window.removeEventListener("resize", checkMobile);
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.documentElement.style.position = "";
            document.documentElement.style.width = "";
            document.documentElement.style.height = "";
        };
    }, []);

    const getMobilePosition = (index: number): Position => {
        const iconWidth = 100; // Width of icon container
        const iconHeight = 100; // Height of icon + label
        const columns = 3;
        const horizontalGap = 20;
        const verticalGap = 20;

        const column = index % columns;
        const row = Math.floor(index / columns);

        return {
            x: column * (iconWidth + horizontalGap),
            y: row * (iconHeight + verticalGap) + 20, // Add top padding
        };
    };

    return (
        <div
            ref={desktopRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#2196f3",
                overflow: "hidden",
                touchAction: "none",
                WebkitOverflowScrolling: "touch",
                ...(isMobile && {
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "20px",
                }),
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: isMobile ? "100%" : "100vw",
                    maxWidth: isMobile ? "360px" : "none", // Adjust for 3 icons + gaps
                    height: "100%",
                }}
            >
                {icons.map((icon, index) => (
                    <DesktopIcon
                        key={icon.id}
                        {...icon}
                        position={
                            isMobile ? getMobilePosition(index) : icon.position
                        }
                        onDragStop={(id, pos) =>
                            console.log("Drag stopped:", id, pos)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Desktop;

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
            name: "Pictures I Took",
            position: { x: 20, y: 120 },
        },
    ]);

    // Prevent all scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.position = "fixed";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.documentElement.style.position = "";
            document.documentElement.style.width = "";
            document.documentElement.style.height = "";
        };
    }, []);

    const handleDragStop = (id: string, newPosition: Position) => {
        console.log("Drag stopped:", id, newPosition);
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
            }}
        >
            {icons.map((icon) => (
                <DesktopIcon
                    key={icon.id}
                    {...icon}
                    onDragStop={handleDragStop}
                />
            ))}
        </div>
    );
};

export default Desktop;

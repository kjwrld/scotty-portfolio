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

    useEffect(() => {
        const preventDefault = (e: TouchEvent) => {
            e.preventDefault();
        };

        document.addEventListener("touchmove", preventDefault, {
            passive: false,
        });

        return () => {
            document.removeEventListener("touchmove", preventDefault);
        };
    }, []);

    const handleDragStop = (id: string, newPosition: Position) => {
        console.log("Drag stopped:", id, newPosition);
    };

    return (
        <div
            ref={desktopRef}
            style={{
                position: "relative",
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

// Desktop.tsx
import React, { useState, useEffect, useRef } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { DesktopIconData, Position } from "./types";
import folderIcon from "../assets/folder.png";

const ICON_SIZE = {
    width: 100,
    height: 140, // Including text below icon
};

export const Desktop: React.FC = () => {
    const desktopRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const createRandomPosition = (
        existingPositions: Position[],
        isMobileView: boolean
    ): Position => {
        const padding = 20;
        const maxAttempts = 50;
        let attempt = 0;

        // Define bounds based on screen size and mobile/desktop state
        const maxWidth = isMobileView
            ? dimensions.width
            : dimensions.width * 0.5;
        const maxHeight = dimensions.height * 0.75; // Top 75% of screen

        while (attempt < maxAttempts) {
            const newPos = {
                x:
                    padding +
                    Math.random() * (maxWidth - ICON_SIZE.width - padding * 2),
                y:
                    padding +
                    Math.random() *
                        (maxHeight - ICON_SIZE.height - padding * 2),
            };

            const hasOverlap = existingPositions.some((pos) => {
                const xOverlap = Math.abs(newPos.x - pos.x) < ICON_SIZE.width;
                const yOverlap = Math.abs(newPos.y - pos.y) < ICON_SIZE.height;
                return xOverlap && yOverlap;
            });

            if (!hasOverlap) {
                return newPos;
            }

            attempt++;
        }

        // Fallback position within constrained area
        const index = existingPositions.length;
        return {
            x:
                padding +
                ((index * 20) % (maxWidth - ICON_SIZE.width - padding * 2)),
            y:
                padding +
                ((index * 20) % (maxHeight - ICON_SIZE.height - padding * 2)),
        };
    };

    const generatePositions = (isMobileView: boolean) => {
        const positions: Position[] = [];
        const iconData = [
            "About Me",
            "Fashion Projects",
            "Brand Design",
            "Creative Direction",
            "Photography",
            "Design Process",
            "Collaborations",
        ];

        return iconData.map((name, index) => {
            const pos = createRandomPosition(positions, isMobileView);
            positions.push(pos);
            return {
                id: String(index + 1),
                icon: folderIcon,
                name,
                position: pos,
            };
        });
    };

    const [icons, setIcons] = useState<DesktopIconData[]>(() =>
        generatePositions(window.innerWidth <= 768)
    );

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const newIsMobile = width <= 768;

            setDimensions({ width, height });
            setIsMobile(newIsMobile);

            // Regenerate positions when switching between mobile and desktop
            if (newIsMobile !== isMobile) {
                setIcons(generatePositions(newIsMobile));
            } else {
                // Just ensure icons stay within bounds
                setIcons((prev) =>
                    prev.map((icon) => ({
                        ...icon,
                        position: {
                            x: Math.min(
                                icon.position.x,
                                (newIsMobile ? width : width * 0.5) -
                                    ICON_SIZE.width -
                                    20
                            ),
                            y: Math.min(
                                icon.position.y,
                                height * 0.75 - ICON_SIZE.height - 20
                            ),
                        },
                    }))
                );
            }
        };

        window.addEventListener("resize", handleResize);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("resize", handleResize);
            document.body.style.overflow = "";
        };
    }, [isMobile]);

    const getMobilePosition = (index: number): Position => {
        const columns = 3;
        const gap = 15;
        const column = index % columns;
        const row = Math.floor(index / columns);

        return {
            x: column * (ICON_SIZE.width + gap) + gap,
            y: row * (ICON_SIZE.height + gap) + gap,
        };
    };

    const handleDragStop = (id: string, newPos: Position) => {
        const maxWidth = isMobile ? dimensions.width : dimensions.width * 0.5;
        const maxHeight = dimensions.height * 0.75;

        const boundedPos = {
            x: Math.max(0, Math.min(newPos.x, maxWidth - ICON_SIZE.width)),
            y: Math.max(0, Math.min(newPos.y, maxHeight - ICON_SIZE.height)),
        };

        setIcons((prev) =>
            prev.map((icon) =>
                icon.id === id ? { ...icon, position: boundedPos } : icon
            )
        );
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
                // backgroundColor: "#2196f3",
                backgroundColor: "#ffffff",
                overflow: "hidden",
                touchAction: "none",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                }}
            >
                {icons.map((icon, index) => (
                    <DesktopIcon
                        key={icon.id}
                        {...icon}
                        position={
                            isMobile ? getMobilePosition(index) : icon.position
                        }
                        onDragStop={handleDragStop}
                    />
                ))}
            </div>
        </div>
    );
};

export default Desktop;

// DesktopIcon.tsx
import React, { useState, forwardRef, useRef, useEffect } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DesktopIconProps } from "./types";

// Breakpoint sizes in pixels
const BREAKPOINTS = {
    MOBILE: 480, // Phones
    TABLET: 768, // Tablets/iPads
    LAPTOP: 1024, // Smaller laptops
    DESKTOP: 1200, // Larger screens
};

// Icon sizes for different breakpoints
const ICON_SIZES = {
    MOBILE: 48, // Comfortable touch target for phones
    TABLET: 56, // Slightly larger for tablets
    LAPTOP: 64, // Good size for laptop viewing
    DESKTOP: 72, // Largest size for big screens
};

export const DesktopIcon = forwardRef<HTMLDivElement, DesktopIconProps>(
    ({ id, icon, name, position, onDragStop }) => {
        const [isTouching, setIsTouching] = useState(false);
        const nodeRef = useRef<HTMLDivElement>(null);
        const [iconSize, setIconSize] = useState(ICON_SIZES.DESKTOP);

        // Handle window resize
        useEffect(() => {
            const updateSize = () => {
                const width = window.innerWidth;
                if (width <= BREAKPOINTS.MOBILE) {
                    setIconSize(ICON_SIZES.MOBILE);
                } else if (width <= BREAKPOINTS.TABLET) {
                    setIconSize(ICON_SIZES.TABLET);
                } else if (width <= BREAKPOINTS.LAPTOP) {
                    setIconSize(ICON_SIZES.LAPTOP);
                } else {
                    setIconSize(ICON_SIZES.DESKTOP);
                }
            };

            // Set initial size
            updateSize();

            // Add resize listener
            window.addEventListener("resize", updateSize);
            return () => window.removeEventListener("resize", updateSize);
        }, []);

        const handleTouchStart = () => setIsTouching(true);
        const handleTouchEnd = () => setIsTouching(false);
        const handleDragStop = (_: DraggableEvent, data: DraggableData) => {
            onDragStop(id, { x: data.x, y: data.y });
        };

        const containerStyle: React.CSSProperties = {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: `${iconSize + 20}px`, // Add padding for text
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
            opacity: isTouching ? 0.7 : 1,
        };

        const imgStyle: React.CSSProperties = {
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            marginBottom: "8px",
            WebkitTouchCallout: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            objectFit: "contain",
        };

        const labelStyle: React.CSSProperties = {
            fontSize:
                iconSize <= ICON_SIZES.MOBILE
                    ? "11px"
                    : iconSize <= ICON_SIZES.TABLET
                    ? "12px"
                    : "14px",
            textAlign: "center",
            color: "white",
            WebkitTouchCallout: "none",
            padding: "4px",
            maxWidth: `${iconSize + 16}px`,
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
        };

        const handleStyle: React.CSSProperties = {
            cursor: "move",
            touchAction: "none",
        };

        return (
            <Draggable
                nodeRef={nodeRef}
                defaultPosition={position}
                onStop={handleDragStop}
                bounds="parent"
                handle=".handle"
                enableUserSelectHack={true}
                cancel=".icon-label"
            >
                <div
                    ref={nodeRef}
                    style={containerStyle}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="handle" style={handleStyle}>
                        <img
                            src={icon}
                            alt={name}
                            style={imgStyle}
                            draggable={false}
                        />
                        <div className="icon-label" style={labelStyle}>
                            {name}
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
);

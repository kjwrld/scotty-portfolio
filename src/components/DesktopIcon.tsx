// DesktopIcon.tsx
import React, { useState, forwardRef, useRef, useEffect } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DesktopIconProps } from "./types";

// Breakpoint sizes in pixels
const BREAKPOINTS = {
    MOBILE: 480,
    TABLET: 768,
    LAPTOP: 1024,
    DESKTOP: 1200,
};

const ICON_SIZES = {
    MOBILE: 80, // Minimum size
    TABLET: 85, // Slightly larger
    LAPTOP: 90, // Even larger
    DESKTOP: 100, // Maximum size
};

export const DesktopIcon = forwardRef<HTMLDivElement, DesktopIconProps>(
    ({ id, icon, name, position, onDragStop }) => {
        const [isTouching, setIsTouching] = useState(false);
        const nodeRef = useRef<HTMLDivElement>(null);
        const [iconSize, setIconSize] = useState(ICON_SIZES.DESKTOP);

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

            updateSize();
            window.addEventListener("resize", updateSize);
            return () => window.removeEventListener("resize", updateSize);
        }, []);

        const containerStyle: React.CSSProperties = {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: `${iconSize + 20}px`,
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
            fontSize: "14px",
            textAlign: "center",
            // color: "white",
            color: "black",
            WebkitTouchCallout: "none",
            padding: "4px",
            maxWidth: `${iconSize + 16}px`,
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
        };

        return (
            <Draggable
                nodeRef={nodeRef}
                defaultPosition={position}
                onStop={(_: DraggableEvent, data: DraggableData) =>
                    onDragStop(id, { x: data.x, y: data.y })
                }
                bounds="parent"
                handle=".handle"
                enableUserSelectHack={true}
                cancel=".icon-label"
            >
                <div
                    ref={nodeRef}
                    style={containerStyle}
                    onTouchStart={() => setIsTouching(true)}
                    onTouchEnd={() => setIsTouching(false)}
                >
                    <div
                        className="handle"
                        style={{ cursor: "move", touchAction: "none" }}
                    >
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

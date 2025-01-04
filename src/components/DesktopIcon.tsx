// DesktopIcon.tsx
import React, { useState, forwardRef, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DesktopIconProps } from "./types";

export const DesktopIcon = forwardRef<HTMLDivElement, DesktopIconProps>(
    ({ id, icon, name, position, onDragStop }, ref) => {
        const [isTouching, setIsTouching] = useState(false);
        const nodeRef = useRef<HTMLDivElement>(null);

        const handleTouchStart = () => {
            setIsTouching(true);
        };

        const handleTouchEnd = () => {
            setIsTouching(false);
        };

        const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
            onDragStop(id, { x: data.x, y: data.y });
        };

        const containerStyle: React.CSSProperties = {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100px",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
            opacity: isTouching ? 0.7 : 1,
        };

        const imgStyle: React.CSSProperties = {
            width: "48px",
            height: "48px",
            marginBottom: "8px",
            WebkitTouchCallout: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
        };

        const labelStyle: React.CSSProperties = {
            fontSize: "12px",
            textAlign: "center",
            color: "white",
            WebkitTouchCallout: "none",
            padding: "4px",
            maxWidth: "90px",
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

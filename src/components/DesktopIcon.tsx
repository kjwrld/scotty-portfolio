// DesktopIcon.tsx
import React, { useState, forwardRef, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DesktopIconProps } from "./types";

export const DesktopIcon = forwardRef<HTMLDivElement, DesktopIconProps>(
    ({ id, icon, name, position, onDragStop, onDoubleClick }) => {
        const [isTouching, setIsTouching] = useState(false);
        const [isDragging, setIsDragging] = useState(false);
        const nodeRef = useRef<HTMLDivElement>(null);
        let dragStartTime = 0;

        const handleMouseDown = () => {
            dragStartTime = Date.now();
            setIsDragging(false);
        };

        const handleMouseUp = () => {
            const dragDuration = Date.now() - dragStartTime;
            if (dragDuration < 200) {
                setIsDragging(false);
            }
        };

        const handleDragStart = () => {
            setIsDragging(true);
        };

        const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
            if (!isDragging) {
                onDragStop(id, { x: data.x, y: data.y });
            }
            setIsDragging(false);
        };

        const handleDoubleClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            console.log("Double click detected"); // Debug log
            onDoubleClick(id);
        };

        return (
            <Draggable
                nodeRef={nodeRef}
                defaultPosition={position}
                onStart={handleDragStart}
                onStop={handleDragStop}
                bounds="parent"
                cancel=".icon-label"
            >
                <div
                    ref={nodeRef}
                    style={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100px",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        touchAction: "none",
                        opacity: isTouching ? 0.7 : 1,
                        cursor: "pointer",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={() => setIsTouching(true)}
                    onTouchEnd={() => setIsTouching(false)}
                    onDoubleClick={handleDoubleClick}
                >
                    <div className="icon-wrapper">
                        <img
                            src={icon}
                            alt={name}
                            style={{
                                width: "80px",
                                height: "80px",
                                marginBottom: "8px",
                                pointerEvents: "none",
                            }}
                            draggable={false}
                        />
                        <div
                            className="icon-label"
                            style={{
                                fontSize: "14px",
                                textAlign: "center",
                                color: "white",
                                maxWidth: "90px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                wordWrap: "break-word",
                                pointerEvents: "none",
                            }}
                        >
                            {name}
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
);

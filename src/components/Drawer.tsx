// Drawer.tsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    folderName: string;
}

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    folderName,
}) => {
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (isOpen) {
            setAnimationClass("drawer-slide-in");
        } else {
            setAnimationClass("drawer-slide-out");
        }
    }, [isOpen]);

    const drawerStyles: React.CSSProperties = {
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%) translateY(100%)",
        width: "100%",
        maxWidth: "768px",
        height: "92vh",
        backgroundColor: "white",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        opacity: 0,
        animation: `${animationClass} 0.3s ease-in-out forwards`,
    };

    const closeButtonStyles: React.CSSProperties = {
        position: "absolute",
        top: "12px",
        right: "12px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.2s ease",
    };

    return (
        <>
            {isOpen && (
                <div style={{ position: "fixed", inset: 0, zIndex: 999 }}>
                    <div
                        style={drawerStyles}
                        onAnimationEnd={(e) => {
                            if (e.animationName === "drawer-slide-out") {
                                setAnimationClass("");
                            }
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={closeButtonStyles}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform =
                                    "rotate(90deg)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform =
                                    "rotate(0deg)")
                            }
                        >
                            <X size={24} />
                        </button>
                        <div style={{ padding: "20px" }}>
                            <h2 style={{ margin: 0 }}>{folderName}</h2>
                            {/* Add your drawer content here */}
                        </div>
                    </div>
                </div>
            )}

            <style>
                {`
          @keyframes drawer-slide-in {
            from {
              transform: translateX(-50%) translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }

          @keyframes drawer-slide-out {
            from {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
            to {
              transform: translateX(-50%) translateY(100%);
              opacity: 0;
            }
          }
        `}
            </style>
        </>
    );
};

// types.ts
export interface Position {
    x: number;
    y: number;
}

export interface DesktopIconData {
    id: string;
    icon: string;
    name: string;
    position: Position;
}

export interface DesktopIconProps extends DesktopIconData {
    onDragStop: (id: string, position: Position) => void;
    iconSize?: {
        width: number;
        height: number;
    };
}

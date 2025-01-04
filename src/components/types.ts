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
    onDoubleClick: (id: string) => void;
}

export const ICON_DIMENSIONS = {
    width: 100,
    imageSize: 80,
    singleLineHeight: 120,
    doubleLineHeight: 140,
} as const;

export type tool = "cursor" | "shape" | undefined;

export type shape = "circle" | "rect" | "star" | "triangle";

export interface BaseFigure {
    id: string;
    x: number;
    y: number;
    type: shape;
}

export interface Circle extends BaseFigure {
    radius: number;
    type: "circle";
}

export interface Rect extends BaseFigure {
    width: number;
    height: number;
    type: "rect";
}

export interface Star extends BaseFigure {
    numPoints: number;
    innerRadius: number;
    outerRadius: number;
    type: "star";
}
export interface Triangle extends BaseFigure {
    numPoints: 3;
    innerRadius: number;
    outerRadius: number;
    type: "triangle";
}

export type figure = Circle | Rect | Star | Triangle;

export type context = {
    tool: tool;
    setTool: React.Dispatch<React.SetStateAction<tool>>;
    shape: shape;
    setShape: React.Dispatch<React.SetStateAction<shape>>;
} | null;

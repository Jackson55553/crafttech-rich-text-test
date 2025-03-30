export interface RectProps extends FigureProps {
    text: string;
    stroke: string;
    color: string;
}

export interface FigureProps {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
    type: string;
}

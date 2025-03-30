export interface RectProps extends FigureProps {
    text: string;
    isStageClicked: boolean;
}

export interface FigureProps {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
    type: string;
}

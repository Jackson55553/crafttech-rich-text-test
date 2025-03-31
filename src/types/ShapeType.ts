import { Stage } from "konva/lib/Stage";

export interface RectProps extends FigureProps {
    text: string;
    stageRef: React.RefObject<Stage | null>
}

export interface FigureProps {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
    type: string;
}

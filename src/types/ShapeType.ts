import { LegacyRef } from "react";
import { Stage } from "konva/lib/Stage";

export interface ShapeProps extends FigureProps {
    stageRef: LegacyRef<Stage> | undefined;
    focused: boolean;
    // setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FigureProps {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
    type: string;
    html: string | TrustedHTML;
    text: string;
}

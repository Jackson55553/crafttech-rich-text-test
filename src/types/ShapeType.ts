import { LegacyRef } from "react";
import { tool } from "../@types/types";
import { Stage } from "konva/lib/Stage";

export interface ShapeProps extends FigureProps {
    tool: tool;
    stageRef: LegacyRef<Stage> | undefined;
}

export interface FigureProps {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string | number;
    type: string;
    html: string | TrustedHTML;
    text: string;
}

import { Stage } from "konva/lib/Stage";
import { tool } from "../@types/types";

export type CanvasProps = {
    tool: tool;
    stageRef: React.RefObject<Stage | null>;
};

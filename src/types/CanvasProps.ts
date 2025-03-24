import { Stage } from "konva/lib/Stage";
import { tool } from "../@types/types";
import { LegacyRef } from "react";

export type CanvasProps = {
    tool: tool;
    stageRef: LegacyRef<Stage> | undefined;
};

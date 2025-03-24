import { tool } from "../@types/types";

export type ControlProps = {
    tool: tool;
    setTool: React.Dispatch<React.SetStateAction<tool>>;
};

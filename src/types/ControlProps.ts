import { tool } from "../@types/types";

export type ControlProps = {
    tool: tool;
    setTool: (value: React.SetStateAction<tool>) => void;
};

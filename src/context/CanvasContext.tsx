import { createContext, FC, useState } from "react";
import { context, shape, tool } from "../@types/types";

export const canvasCtx = createContext<context>(null);

type Props = {
    children: React.ReactNode;
};

const CanvasProvider: FC<Props> = ({ children }) => {
    const [tool, setTool] = useState<tool>("cursor");
    const [shape, setShape] = useState<shape>("rect");
    return (
        <canvasCtx.Provider value={{ tool, setTool, shape, setShape }}>
            {children}
        </canvasCtx.Provider>
    );
};

export default CanvasProvider;

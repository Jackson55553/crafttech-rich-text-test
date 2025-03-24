import { useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import { tool } from "./@types/types";
import { Stage } from "konva/lib/Stage";

function App() {
    const [tool, setTool] = useState<tool>("cursor");
    const stageRef = useRef<Stage>(null);
    return (
        <>
            <Canvas tool={tool} stageRef={stageRef} />
            <Control tool={tool} setTool={setTool} />
        </>
    );
}

export default App;

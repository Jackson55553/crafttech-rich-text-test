import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import CanvasProvider from "./context/CanvasContext";
import { stages } from "konva/lib/Stage";
import { Util } from "konva/lib/Util";
function App() {
    window.Konva.stages = stages;
    window.Konva.Util = Util;
    return (
        <CanvasProvider>
            <Canvas />
            <Control />
        </CanvasProvider>
    );
}

export default App;

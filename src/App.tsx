import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import CanvasProvider from "./context/CanvasContext";

function App() {
    return (
        <CanvasProvider>
            <Canvas />
            <Control />
        </CanvasProvider>
    );
}

export default App;

import { useContext, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../shape/Shape";
import Konva from "konva";
import { FigureProps } from "../../types/ShapeType";
import { canvasCtx } from "../../context/CanvasContext";

const Canvas = () => {
    const values = useContext(canvasCtx);

    const [figures, setFigures] = useState<FigureProps[]>([]);
    const [focused, setFocused] = useState<boolean>(false);

    const stageRef = useRef<Konva.Stage>(null);

    if (!values) return;

    const { tool } = values;

    const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        console.log(e.target);
        setFocused(e.target !== stageRef.current);
        if (tool === "cursor") return;
        const stage = e.target.getStage();
        if (stage === null) return;
        const stageOffset = stage.absolutePosition();
        const point = stage.getPointerPosition();
        if (point === null) return;
        setFigures((prev) => [
            ...prev,
            {
                id: Date.now().toString(36),
                width: 100,
                height: 100,
                type: "rect",
                x: point.x - stageOffset.x,
                y: point.y - stageOffset.y,
                html: "",
                text: "",
            },
        ]);
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable={tool === "cursor"}
            onClick={handleOnClick}
            ref={stageRef}
        >
            <Layer>
                {figures.map((figure: FigureProps, i: number) => {
                    return (
                        <Shape
                            key={i}
                            {...figure}
                            stageRef={stageRef}
                            focused={focused}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
};

export default Canvas;

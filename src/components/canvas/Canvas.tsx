import { useState } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../shape/Shape";
import Konva from "konva";
import { FigureProps } from "../../types/ShapeType";
import { CanvasProps } from "../../types/CanvasProps";

const Canvas = ({ tool, stageRef }: CanvasProps) => {
    const [figures, setFigures] = useState<FigureProps[]>([]);

    const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
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
                            tool={tool}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
};

export default Canvas;

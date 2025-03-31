import { FC, useContext, useRef, useState } from "react";
import { Circle, Layer, Stage, Star } from "react-konva";
import Shape from "../shape/Shape";
import Konva from "konva";
import { canvasCtx } from "../../context/CanvasContext";
import { figure, shape, tool } from "../../@types/types";

const Canvas: FC = () => {
    const values = useContext(canvasCtx);

    const [figures, setFigures] = useState<figure[]>([]);

    const stageRef = useRef<Konva.Stage>(null);

    if (!values) return;

    const { tool, shape } = values;

    const defaultFigure = (shape: shape): figure => {
        switch (shape) {
            case "circle":
                return {
                    id: Date.now().toString(36),
                    x: 0,
                    y: 0,
                    type: "circle",
                    radius: 50,
                };
            case "star":
                return {
                    id: Date.now().toString(36),
                    x: 0,
                    y: 0,
                    type: "star",
                    innerRadius: 50,
                    outerRadius: 100,
                    numPoints: 5,
                };
            case "triangle":
                return {
                    id: Date.now().toString(36),
                    x: 0,
                    y: 0,
                    type: "triangle",
                    innerRadius: 50,
                    outerRadius: 100,
                    numPoints: 3,
                };

            default:
                return {
                    id: Date.now().toString(36),
                    x: 0,
                    y: 0,
                    type: "rect",
                    width: 100,
                    height: 100,
                };
        }
    };

    const renderFigure = (figure: figure, i?: number, tool?: tool) => {
        switch (figure.type) {
            case "circle":
                return (
                    <Circle
                        key={`${figure.id}_${i}`}
                        x={figure.x}
                        y={figure.y}
                        stroke="black"
                        radius={figure.radius}
                        draggable={tool === "cursor"}
                    />
                );

            case "star":
                return (
                    <Star
                        key={`${figure.id}_${i}`}
                        x={figure.x}
                        y={figure.y}
                        numPoints={figure.numPoints}
                        innerRadius={figure.innerRadius || 5}
                        outerRadius={figure.outerRadius || 25}
                        stroke="black"
                        draggable={tool === "cursor"}
                    />
                );
            case "triangle":
                return (
                    <Star
                        key={`${figure.id}_${i}`}
                        x={figure.x}
                        y={figure.y}
                        numPoints={figure.numPoints}
                        innerRadius={figure.innerRadius || 5}
                        outerRadius={figure.outerRadius || 25}
                        stroke="black"
                        draggable={tool === "cursor"}
                    />
                );

            default:
                return (
                    <Shape
                        key={`${figure.id}_${i}`}
                        x={figure.x}
                        y={figure.y}
                        width={figure.width}
                        height={figure.height}
                        text="type something"
                        id={figure.id}
                        type={"rect"}                    
                        stageRef={stageRef}
                        />
                );
        }
    };

    const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (tool === "cursor" ) return;
        const stage = e.target.getStage();
        if (stage === null) return;
        const stageOffset = stage.absolutePosition();
        const point = stage.getPointerPosition();
        if (point === null) return;
        setFigures((prev) => [
            ...prev,
            {
                ...defaultFigure(shape),
                x: point.x - stageOffset.x,
                y: point.y - stageOffset.y,
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
                {figures.map((figure: figure, i: number) => {
                    return renderFigure(figure, i, tool);
                })}
            </Layer>
        </Stage>
    );
};

export default Canvas;

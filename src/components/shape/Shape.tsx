import html2canvas from "html2canvas";
import Konva from "konva";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../htmlText/HtmlText";
import { ShapeProps } from "../../types/ShapeType";
import { Image } from "konva/lib/shapes/Image";

const Shape = (props: ShapeProps) => {
    const { x, y, width, height, tool, html, id, text } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string>(text);

    const groupRef = useRef<Konva.Group>(null);
    const imageRef = useRef<Image | null>(null);
    const htmlRef = useRef<HTMLDivElement>(null);

    const renderImage = async () => {
        const htmltext = document.getElementById(`htmltext_${id}`);
        if (htmltext) {
            const innerhtml = htmltext.innerHTML;
            if (innerhtml) {
                const canvas = await html2canvas(htmltext, {
                    backgroundColor: "rgba(0,0,0,0)",
                });
                const shape = new Konva.Image({
                    x: 0,
                    y: height / 2,
                    scaleX: 1 / window.devicePixelRatio,
                    scaleY: 1 / window.devicePixelRatio,
                    image: canvas,
                });
                if (!groupRef.current) return;
                groupRef.current.add(shape);
                imageRef.current = shape;
            } else return;
        } else return;
    };

    useEffect(() => {
        renderImage();
    }, []);

    const handleClick = () => {
        if (tool === "shape") {
            return;
        } else {
            setIsEditing((prev) => !prev);
            if (imageRef.current) {
                if (isEditing) {
                    imageRef.current.show();
                } else {
                    imageRef.current.hide();
                }
            } else return;
        }
    };

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
                <Rect stroke={"black"} width={width} height={height} />
                {isEditing && (
                    <Html>
                        <textarea value={value} onChange={handleInput} />
                    </Html>
                )}
            </Group>
            <Html>
                <HtmlText ref={htmlRef} html={html} id={id} />
            </Html>
        </>
    );
};

export default Shape;

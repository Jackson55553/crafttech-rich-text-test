import html2canvas from "html2canvas";
import Konva from "konva";
import {
    ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../htmlText/HtmlText";
import { ShapeProps } from "../../types/ShapeType";
import { canvasCtx } from "../../context/CanvasContext";

const Shape = (props: ShapeProps) => {
    const { x, y, width, height, html, id, text, focused } = props;

    const [value, setValue] = useState<string>(text);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const groupRef = useRef<Konva.Group>(null);
    const imageRef = useRef<Konva.Image | null>(null);
    const htmlRef = useRef<HTMLDivElement>(null);

    const renderImage = useCallback(async () => {
        if (groupRef.current === null) return;
        const htmltext = document.getElementById(`htmltext_${id}`);
        console.log(htmltext);
        console.log(groupRef.current?.children[0]);
        if (htmltext) {
            htmltext.style.wordWrap = "break-word";
            const innerhtml = htmltext.innerHTML;
            if (innerhtml) {
                const canvas = await html2canvas(htmltext, {
                    backgroundColor: groupRef.current?.children[0].attrs.stroke,
                    width: groupRef.current?.children[0].attrs.width,
                    height: groupRef.current?.children[0].attrs.height,
                });
                const shape = new Konva.Image({
                    id: `image_id_${id}`,
                    x: 0,
                    y: 0,
                    scaleX: 1 / window.devicePixelRatio,
                    scaleY: 1 / window.devicePixelRatio,
                    image: canvas,
                });
                if (imageRef.current?.id() === shape.id()) {
                    imageRef.current.destroy();
                }

                groupRef.current.add(shape);
                imageRef.current = shape;
            } else {
                if (imageRef.current !== null) {
                    imageRef.current.destroy();
                }
            }
        } else return;
    }, [id]);

    useEffect(() => {
        console.log("useEffect");
        if (!isEditing) {
            console.log("render");
            renderImage();
        }
    }, [isEditing, renderImage, focused]);

    const values = useContext(canvasCtx);
    if (!values) return;
    const { tool } = values;

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
        if (htmlRef.current) {
            htmlRef.current.innerHTML = e.target.value;
        }
        setValue(e.target.value);
    };

    return (
        <>
            <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
                <Rect
                    stroke={groupRef.current?.children[0].attrs.stroke}
                    width={width}
                    height={height}
                />
                {isEditing && (
                    <Html>
                        <textarea
                            style={{
                                background:
                                    groupRef.current?.children[0].attrs.stroke,
                                border: "none",
                                resize: "none",
                                width:
                                    groupRef.current?.children[0].attrs.width -
                                    4,
                                height:
                                    groupRef.current?.children[0].attrs.width -
                                    4,
                            }}
                            value={value}
                            onChange={handleInput}
                        />
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

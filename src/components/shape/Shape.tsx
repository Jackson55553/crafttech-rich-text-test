import html2canvas from "html2canvas";
import Konva from "konva";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { RectProps } from "../../types/ShapeType";
import { canvasCtx } from "../../context/CanvasContext";
import TextEditor2 from "../../textEditor/TextEditor2";
import ReactQuill from "react-quill-new";
import { ShapeStyle } from "../../types/ShapeStyle";

const Shape = (props: RectProps) => {
    const { x, y, width, height, id, text } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const defaultStyle: ShapeStyle = { width: width, height: height };
    const [shapeStyle, setShapeStyle] = useState<ShapeStyle>(defaultStyle);

    const groupRef = useRef<Konva.Group>(null);
    const imageRef = useRef<Konva.Image | null>(null);

    // Чет вщ не понял, стали прокидываться просто, и обозреваться
    const quillRef = useRef<ReactQuill>(null);
    // второй слой, определяет цвет картинки
    const textEditor = useRef<HTMLDivElement>(null);

    // Получаем текст из редактора и убираем знаки переноса строки.
    const getQuillText = (quillRef: React.RefObject<ReactQuill | null>) => {
        if (quillRef.current)
            return quillRef.current.getEditor().getText().replace(/\n/g, "");
        else return "";
    };

    // смена цвета второго слоя (который идёт на картинку) через функцию
    const changeColorHtmlImage = (color: string) => {
        if (color) {
            if (textEditor.current) {
                textEditor.current.style.background = color;
            }
        }
    };

    const renderImage = useCallback(async () => {
        console.log("renderImage");
        if (groupRef.current === null) return;
        if (quillRef.current) {
            // Получаем текст из редактора и убираем знаки переноса строки.
            const innerHtml = getQuillText(quillRef);
            if (innerHtml) {
                // Получаем ссылку на элемент редактора.
                const editorDivElement =
                    quillRef.current.editingAreaRef.current;

                if (textEditor.current) {
                    changeColorHtmlImage("red");
                }
                // Передаём firstChild, чтобы избежать отображения редактора текста на картинке.
                const canvas = await html2canvas(editorDivElement.firstChild, {
                    backgroundColor: textEditor.current?.style.background,
                    width: width,
                    height: textEditor.current?.clientHeight,
                    useCORS: true,
                });
                const shape = new Konva.Image({
                    id: `image_id_${id}`,
                    x: 0,
                    y: 0,
                    scaleX: 1 / window.devicePixelRatio,
                    scaleY: 1 / window.devicePixelRatio,
                    height: textEditor.current?.clientHeight,
                    image: canvas,
                });
                // Если редактировали ту же картинку, то предыдущую удаляем и вставляем новую
                if (imageRef.current?.id() === shape.id()) {
                    imageRef.current.destroy();
                }
                groupRef.current.add(shape);
                imageRef.current = shape;
            } else {
                // Если пустое значение в редакторе, то удаляем картинку совсем
                if (imageRef.current !== null) {
                    imageRef.current.destroy();
                }
                return;
            }
        } else return;
    }, [id, width]);

    useEffect(() => {
        console.log("useEffect shape");
        if (!isEditing) {
            renderImage();
        }
    }, [isEditing, renderImage]);

    const values = useContext(canvasCtx);
    if (!values) return;
    const { tool } = values;

    const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
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

    return (
        <>
            <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
                <Rect
                    stroke={"black"}
                    strokeWidth={isEditing ? 10 : 2}
                    width={shapeStyle.width}
                    height={shapeStyle.height}
                />
                <TextEditor2
                    id={id}
                    text={text}
                    htmlRef={textEditor}
                    quillRef={quillRef}
                    groupRef={groupRef}
                    isEditing={isEditing}
                    width={width}
                    height={height}
                    renderImage={renderImage}
                />
            </Group>
        </>
    );
};

export default Shape;

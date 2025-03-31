import html2canvas from "html2canvas";
import Konva from "konva";
import {
    FC,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Group, Rect } from "react-konva";
import { RectProps } from "../../types/ShapeType";
import { canvasCtx } from "../../context/CanvasContext";
import TextEditor2 from "../textEditor/TextEditor2";
import ReactQuill from "react-quill-new";
import { ShapeStyle } from "../../types/ShapeStyle";

const Shape: FC<RectProps> = (props) => {
    const { x, y, width, height, id, stageRef } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const defaultStyle: ShapeStyle = {
        width: width,
        height: height,
        background: "red",
    };

    const [shapeStyle, setShapeStyle] = useState<ShapeStyle>(defaultStyle);

    const groupRef = useRef<Konva.Group>(null);
    const imageRef = useRef<Konva.Image | null>(null);

    const quillRef = useRef<ReactQuill>(null);
    // второй слой, определяет цвет картинки
    const textEditor = useRef<HTMLDivElement>(null);

    // Получаем текст из редактора и убираем знаки переноса строки.
    const getQuillText = (quillRef: React.RefObject<ReactQuill | null>) => {
        if (quillRef.current)
            return quillRef.current.getEditor().getText().replace(/\n/g, "");
        else return "";
    };

    const renderImage = useCallback(async () => {
        if (groupRef.current === null) return;
        if (quillRef.current) {
            // Получаем текст из редактора и убираем знаки переноса строки.
            const innerHtml = getQuillText(quillRef);
            if (innerHtml) {
                // Получаем ссылку на элемент редактора.
                const editorDivElement =
                    quillRef.current.editingAreaRef.current;
                // Текущая картинка
                const imageRefPrev = imageRef.current;
                // Передаём firstChild, чтобы избежать отображения редактора текста на картинке.
                const canvas = await html2canvas(editorDivElement.firstChild, {
                    backgroundColor: textEditor.current?.style.background,
                    width: width,
                    height: textEditor.current?.clientHeight,
                    scale: 1,
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
                shape.show()
                // Если редактировали ту же картинку, то предыдущую удаляем и вставляем новую
                if (imageRef.current?.id() === shape.id()) {
                    imageRefPrev?.destroy();
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

    
    const onStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
            if(e.target === stageRef.current?.getStage()){
                setIsEditing(false)
            }
    }, [stageRef])


    useEffect(() => {
        if (!isEditing) {
            stageRef.current?.off('click', onStageClick)
            renderImage();
        }

    }, [isEditing, renderImage, stageRef, onStageClick]);

    const values = useContext(canvasCtx);
    if (!values) return;
    const { tool } = values;

    const handleClick = () => {
        stageRef.current?.on('click', onStageClick)
        if (tool === "shape") {
            return;
        } else {
            setIsEditing((prev) => !prev);
            // if (imageRef.current) {
            //     if (isEditing) {
            //         imageRef.current.hide();
            //     } else {
            //         imageRef.current.show();
            //     }
            // } else return;
        }
    };

    return (
        <>
            <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
                <Rect
                    stroke={shapeStyle.stroke || "black"}
                    strokeWidth={isEditing ? 10 : 2}
                    fill={shapeStyle.background}
                    width={shapeStyle.width}
                    height={shapeStyle.height}
                />
                <TextEditor2
                    htmlRef={textEditor}
                    quillRef={quillRef}
                    groupRef={groupRef}
                    isEditing={isEditing}
                    renderImage={renderImage}
                    shapeStyle={shapeStyle}
                    setShapeStyle={setShapeStyle}
                    rectProps={props}
                />
            </Group>
        </>
    );
};

export default Shape;

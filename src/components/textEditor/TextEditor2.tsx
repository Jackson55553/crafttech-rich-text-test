import { FC, useCallback, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Html } from "react-konva-utils";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import ShapeStyleEditor from "../shapeStyleEditor/ShapeStyleEditor";
import { TextEditorProps } from "../../types/TextEditorProps";

const TextEditor2: FC<TextEditorProps> = (props: TextEditorProps) => {
    const {
        quillRef,
        htmlRef,
        isEditing,
        groupRef,
        renderImage,
        shapeStyle,
        setShapeStyle,
        rectProps,
    } = props;

    const { id, text, height } = rectProps;

    const [thisValue, setThisValue] = useState(text);
    const timeoutRef = useRef<number>(null);

    const setImageHeight = useCallback(
        (height: number) => {
            setShapeStyle((prev) => {
                if (quillRef.current) {
                    return {
                        ...prev,
                        height: height,
                    };
                } else return prev;
            });
        },
        [setShapeStyle, quillRef]
    );

    const onChange = (value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            // функция изменения рамки квадрата, при переполнении текстового редактора
            resizeHeight();
            // Функция передачи текста
            setThisValue(value);
        }, 100);
    };

    // функция изменения размера фигуры в зависимости от контента в редакторе
    const resizeHeight = useCallback(async () => {
        if (!quillRef.current || !groupRef.current) {
            return;
        }

        const textAreaHeight = quillRef.current.getEditingArea().clientHeight;
        const shapeHeight = groupRef.current.children[0].height();

        if (textAreaHeight !== shapeHeight && shapeHeight > height) {
            console.log("render from editor");
            renderImage();
        }
        if (textAreaHeight > shapeHeight && shapeHeight !== textAreaHeight) {
            groupRef.current?.children[0].height(textAreaHeight);
            setImageHeight(textAreaHeight);
        } else {
            if (textAreaHeight < height) {
                groupRef.current.children[0].height(height);
                setImageHeight(height);
            } else {
                groupRef.current.children[0].height(textAreaHeight);
                setImageHeight(textAreaHeight);
            }
        }
    }, [groupRef, quillRef, height, renderImage, setImageHeight]);

    return (
        <Html>
            {isEditing && (
                <div className={styles.html_editor__container}>
                    <div
                        id={`htmltextEditor_${id}`}
                        // Стили, для активного редактора, после нажатия на квадрат (второй слой - средний)
                        className={styles.htmltextEditor}
                        style={{
                            width: shapeStyle.width,
                            // растягивается  по высоте, не тянет за собой третий слой (верхний)
                            minHeight: shapeStyle.width,
                            // Редактируется фон картинки
                            background: shapeStyle.background,
                        }}
                        ref={htmlRef}
                    >
                        <ReactQuill
                            id={`quillEditor_${id}`}
                            // значение текста
                            value={thisValue}
                            // функция набора текста
                            onChange={(value) => {
                                onChange(value);
                            }}
                            // Ссылка на текстовый редактор, не понял прикола с forvardRef,
                            // говорят от него отказываться надо, типо можно просто прокинуть через пропсы.
                            ref={quillRef}
                            // тема всплывающего текстового редактора, выбор неплохой вроде, только надо как-то настроить
                            // чтобы всплывала сразу
                            theme="bubble"
                            // стили вернего слоя  для текстового редактора, отсюда текст можно задать... или нет
                            style={{
                                minWidth: shapeStyle.width,
                                minHeight: shapeStyle.height,
                                // цвет можно менять
                                color: shapeStyle.color || "black",

                                // размер текста нельзя
                                // fontWeight: 20,

                                // фоновый цвет можно
                                background: shapeStyle.background,
                            }}
                            modules={{
                                toolbar: [
                                    [
                                        "bold",
                                        "italic",
                                        "underline",
                                        { header: [1, 2, false] },
                                    ],
                                ],
                            }}
                        />
                    </div>
                    <ShapeStyleEditor
                        key={`shapeStyleEditor${id}`}
                        quillRef={quillRef}
                        shapeStyle={shapeStyle}
                        setShapeStyle={setShapeStyle}
                    />
                </div>
            )}
        </Html>
    );
};
export default TextEditor2;

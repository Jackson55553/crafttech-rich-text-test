import { Group } from "konva/lib/Group";
import { useCallback, useEffect, useState } from "react";
import { Html } from "react-konva-utils";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";

const TextEditor2 = ({
    id,
    text,
    quillRef,
    htmlRef,
    isEditing,
    width,
    height,
    groupRef,
    renderImage,
}: {
    id: string;
    text: string;
    quillRef: React.RefObject<ReactQuill | null>;
    htmlRef: React.RefObject<HTMLDivElement | null>;
    isEditing: boolean;
    width: number;
    height: number;
    groupRef: React.RefObject<Group | null>;
    renderImage: () => Promise<void>;
}) => {
    const [thisValue, setThisValue] = useState(text);

    // функция изменения размера фигуры в зависимости от контента в редакторе
    const resizeHeight = useCallback(() => {
        if (quillRef.current && groupRef.current) {
            const textAreaHeight =
                quillRef.current.getEditingArea().clientHeight;
            const shapeHeight = groupRef.current.children[0].height();
            if (
                textAreaHeight >= shapeHeight &&
                shapeHeight !== textAreaHeight
            ) {
                groupRef.current.children[0].height(
                    quillRef.current.getEditingArea().clientHeight
                );
            } else {
                if (textAreaHeight < height) {
                    groupRef.current.children[0].height(height);
                } else {
                    groupRef.current.children[0].height(textAreaHeight);
                }
            }
            if (textAreaHeight !== shapeHeight && shapeHeight > height)
                renderImage();
        }
    }, [groupRef, quillRef, height, renderImage]);

    return (
        <Html>
            {isEditing && (
                <div
                    id={`htmltextEditor_${id}`}
                    // Стили, для активного редактора, после нажатия на квадрат (второй слой - средний)
                    style={{
                        // Фиксирован относительно нижнего слоя
                        position: "fixed",
                        // Двигается тоже
                        top: "0px",
                        width: width,
                        // растягивается  по высоте, не тянет за собой третий слой
                        minHeight: height,
                        // Редактируется фон картинки
                        background: "red",
                        // текст не редактируется
                        fontSize: 20,
                    }}
                    ref={htmlRef}
                >
                    <ReactQuill
                        id={`quillEditor_${id}`}
                        // значение текста
                        value={thisValue}
                        // функция набора текста
                        onChange={(value) => {
                            // функция изменения рамки квадрата, при переполнении текстового редактора
                            resizeHeight();
                            // Функция передачи текста
                            setThisValue(value);
                        }}
                        // Ссылка на текстовый редактор, не понял прикола с forvardRef,
                        // говорят от него отказываться надо, типо можно просто прокинуть через пропсы.
                        ref={quillRef}
                        // тема всплывающего текстового редактора, выбор неплохой вроде, только надо как-то настроить
                        // чтобы всплывала сразу
                        theme="bubble"
                        // стили вернего слоя  для текстового редактора, отсюда текст можно задать... или нет
                        style={{
                            // этим margin-ом можно менять высоту нижнего блока
                            // margin: "0px",
                            minWidth: width,
                            minHeight: height,
                            // padding: "0px 0px 0px 0px",
                            // цвет можно
                            color: "blue",
                            // размер текста нельзя
                            // fontWeight: 20,
                            // фоновый цвет можно
                            background: "green",
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
                    <div
                        style={{
                            position: "fixed",
                            top: -(100 + 10),
                            width: 100,
                            height: 100,
                            background: "purple",
                        }}
                    ></div>
                </div>
            )}
        </Html>
    );
};
export default TextEditor2;

import { FC, useCallback, useState } from "react";
import styles from "./style.module.scss";
import ColorToolbar from "./ColorToolbar/ColorToolbar";
import { ShapeStyleProps } from "../../types/ShapeStyleProps";

const ShapeStyleEditor: FC<ShapeStyleProps> = (props: ShapeStyleProps) => {
    const { setShapeStyle, quillRef, shapeStyle } = props;

    const [isBackgroundColorEdited, setIsBackgroundColorEdited] =
        useState(false);
    const [isStrokeColorEdited, setIsStrokeColorEdited] = useState(false);
    const [isTextColorEdited, setIsTextColorEdited] = useState(false);

    const setBackgroundColor = useCallback(
        (color: string) => {
            setShapeStyle((prev) => {
                if (quillRef.current) {
                    return {
                        ...prev,
                        background: color,
                    };
                } else return prev;
            });
        },
        [quillRef, setShapeStyle]
    );

    const setBorderColor = useCallback(
        (color: string) => {
            setShapeStyle((prev) => {
                if (quillRef.current) {
                    return {
                        ...prev,
                        stroke: color,
                    };
                } else return prev;
            });
        },
        [quillRef, setShapeStyle]
    );

    const setTextColor = useCallback(
        (color: string) => {
            setShapeStyle((prev) => {
                if (quillRef.current) {
                    return {
                        ...prev,
                        color: color,
                    };
                } else return prev;
            });
        },
        [quillRef, setShapeStyle]
    );

    return (
        <div className={`${styles.toolbar_container}`}>
            <div
                className={`${styles.choose_color_btn} ${
                    isBackgroundColorEdited && styles.active_chooseColor_btn
                }`}
                style={{
                    background: shapeStyle.background,
                    borderColor:
                        shapeStyle.background == "black" ? "white" : "black",
                }}
                onClick={() => {
                    setIsBackgroundColorEdited((prev) => !prev);
                    setIsStrokeColorEdited(false);
                    setIsTextColorEdited(false);
                }}
            >
                {isBackgroundColorEdited && (
                    <ColorToolbar
                        shapeStyle={shapeStyle}
                        quillRef={quillRef}
                        setColor={setBackgroundColor}
                    />
                )}
            </div>

            <div
                className={`${styles.choose_color_btn} ${
                    isStrokeColorEdited && styles.active_chooseColor_btn
                }`}
                style={{
                    background: shapeStyle.stroke || "red",
                    borderColor:
                        shapeStyle.background == "black" ? "white" : "black",
                }}
                onClick={() => {
                    setIsBackgroundColorEdited(false);
                    setIsStrokeColorEdited((prev) => !prev);
                    setIsTextColorEdited(false);
                }}
            >
                {isStrokeColorEdited && (
                    <ColorToolbar
                        shapeStyle={shapeStyle}
                        quillRef={quillRef}
                        setColor={setBorderColor}
                    />
                )}
            </div>
            <div
                className={`${styles.choose_color_btn} ${
                    isTextColorEdited && styles.active_chooseColor_btn
                }`}
                style={{
                    background: shapeStyle.color || "red",
                    borderColor:
                        shapeStyle.background == "black" ? "white" : "black",
                }}
                onClick={() => {
                    setIsBackgroundColorEdited(false);
                    setIsStrokeColorEdited(false);
                    setIsTextColorEdited((prev) => !prev);
                }}
            >
                {isTextColorEdited && (
                    <ColorToolbar
                        shapeStyle={shapeStyle}
                        quillRef={quillRef}
                        setColor={setTextColor}
                    />
                )}
            </div>
        </div>
    );
};

export default ShapeStyleEditor;

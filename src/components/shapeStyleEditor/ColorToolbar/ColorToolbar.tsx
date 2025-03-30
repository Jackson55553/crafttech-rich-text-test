import React, { FC, useCallback } from "react";
import ReactQuill from "react-quill-new";
import { ShapeStyle } from "../../../types/ShapeStyle";
import styles from "./style.module.scss";

const ColorToolbar: FC<any> = ({
    quillRef,
    shapeStyle,
    setColor,
    text,
}: {
    quillRef: React.RefObject<ReactQuill | null>;
    shapeStyle: ShapeStyle;
    setColor: (color: string) => void;
    text: string;
}) => {
    const colors = [
        "red",
        "blue",
        "yellow",
        "gray",
        "black",
        "white",
        "purple",
        "pink",
    ];
    return (
        <div className={`${styles.color_buttons__container}`}>
            {colors.map((color) => {
                return (
                    <div
                        key={`color_button_${color}_${quillRef.current?.props.id}`}
                        className={`${styles.color_buttons__btn} ${
                            color == shapeStyle.background
                                ? styles.color_buttons__btn__active
                                : ""
                        }`}
                        style={{
                            background: color,
                            borderColor: color == "black" ? "white" : "black",
                        }}
                        onClick={() => {
                            setColor(color);
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default ColorToolbar;

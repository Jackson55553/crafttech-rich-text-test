import { FC } from "react";
import styles from "./style.module.scss";
import { ColorToolbarProps } from "../../../types/ColorToolbarProps";

const ColorToolbar: FC<ColorToolbarProps> = (props: ColorToolbarProps) => {
    const { quillRef, shapeStyle, setColor, text } = props;
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

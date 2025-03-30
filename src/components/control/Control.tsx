import { FC, useContext } from "react";
import { shape, tool } from "../../@types/types";
import { canvasCtx } from "../../context/CanvasContext";
import styles from "./style.module.scss";
import { FaMousePointer } from "react-icons/fa";
import { RiShapesFill } from "react-icons/ri";
import { GoCircle } from "react-icons/go";
import { TbRectangle } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { TbTriangle } from "react-icons/tb";

const Control: FC = () => {
    const values = useContext(canvasCtx);

    if (values === null) {
        return;
    }

    const { tool, setTool, shape, setShape } = values;

    const handleTool = (tool: tool) => {
        setTool((prev) => {
            if (prev === tool) {
                return undefined;
            } else return tool;
        });
    };

    const handleClickShape = (shape: shape) => {
        setShape(shape);
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.btn} ${
                    tool === "cursor" ? styles.active : ""
                }`}
                onClick={() => handleTool("cursor")}
            >
                <FaMousePointer />
            </div>

            <div
                className={`${styles.btn} ${
                    tool === "shape" ? styles.active : ""
                }`}
                onClick={() => handleTool("shape")}
            >
                <RiShapesFill />
            </div>
            {tool === "shape" && (
                <div
                    className={`${styles.icons__container} ${
                        tool === "shape" ? styles.active : ""
                    }`}
                >
                    <div
                        className={`${styles.btn} ${
                            shape === "circle" ? styles.active : ""
                        }`}
                        onClick={() => handleClickShape("circle")}
                    >
                        <GoCircle />
                    </div>
                    <div
                        className={`${styles.btn} ${
                            shape === "rect" ? styles.active : ""
                        }`}
                        onClick={() => handleClickShape("rect")}
                    >
                        <TbRectangle />
                    </div>
                    <div
                        className={`${styles.btn} ${
                            shape === "star" ? styles.active : ""
                        }`}
                        onClick={() => handleClickShape("star")}
                    >
                        <FaRegStar />
                    </div>
                    <div
                        className={`${styles.btn} ${
                            shape === "triangle" ? styles.active : ""
                        }`}
                        onClick={() => handleClickShape("triangle")}
                    >
                        <TbTriangle />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Control;

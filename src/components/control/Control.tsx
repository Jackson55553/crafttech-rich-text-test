import { tool } from "../../@types/types";
import { ControlProps } from "../../types/ControlProps";

const Control = ({ tool, setTool }: ControlProps) => {
    const handleOnChange = (tool: tool) => {
        setTool((prev) => {
            if (prev === tool) {
                return undefined;
            } else return tool;
        });
    };

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
            }}
        >
            <div>
                <input
                    type="radio"
                    id="cursor"
                    name="control"
                    value={"cursor"}
                    checked={tool === "cursor"}
                    onChange={() => handleOnChange("cursor")}
                />
                <label htmlFor="cursor">Взаимодействие</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="shape"
                    name="control"
                    value={"shape"}
                    checked={tool === "shape"}
                    onChange={() => handleOnChange("shape")}
                />
                <label htmlFor="shape">Добавление</label>
            </div>
        </div>
    );
};

export default Control;

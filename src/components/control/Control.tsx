import { tool } from "../../@types/types";
import { ControlProps } from "../../types/ControlProps";

const Control = ({ tool, setTool }: ControlProps) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTool((prev: tool) => {
            if (typeof e.target.value === typeof tool) {
                return e.target.value;
            } else {
                return prev;
            }
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
                    value="cursor"
                    checked={tool === "cursor"}
                    onChange={handleOnChange}
                />
                <label htmlFor="cursor">Взаимодействие</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="shape"
                    name="control"
                    value="shape"
                    checked={tool === "shape"}
                    onChange={handleOnChange}
                />
                <label htmlFor="shape">Добавление</label>
            </div>
        </div>
    );
};

export default Control;

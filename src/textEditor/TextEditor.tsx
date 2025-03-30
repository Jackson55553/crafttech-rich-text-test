import { ChangeEvent } from "react";
import { Html } from "react-konva-utils";

const TextEditor = ({
    value,
    handleInput,
}: {
    value: string;
    handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
    return (
        <Html>
            <textarea value={value} onChange={handleInput} />
        </Html>
    );
};

export default TextEditor;

import ReactQuill from "react-quill-new";
import { ShapeStyle } from "./ShapeStyle";

export type ColorToolbarProps = {
    quillRef: React.RefObject<ReactQuill | null>;
    shapeStyle: ShapeStyle;
    setColor: (color: string) => void;
    text: string;
};

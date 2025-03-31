import ReactQuill from "react-quill-new";
import { ShapeStyle } from "./ShapeStyle";

export type ShapeStyleProps = {
    quillRef: React.RefObject<ReactQuill | null>;
    shapeStyle: ShapeStyle;
    setShapeStyle: React.Dispatch<React.SetStateAction<ShapeStyle>>;
};

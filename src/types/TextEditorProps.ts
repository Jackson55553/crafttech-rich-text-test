import { Group } from "konva/lib/Group";
import ReactQuill from "react-quill-new";
import { ShapeStyle } from "./ShapeStyle";
import { RectProps } from "./ShapeType";

export type TextEditorProps = {
    quillRef: React.RefObject<ReactQuill | null>;
    htmlRef: React.RefObject<HTMLDivElement | null>;
    isEditing: boolean;
    groupRef: React.RefObject<Group | null>;
    renderImage: () => Promise<void>;
    shapeStyle: ShapeStyle;
    setShapeStyle: React.Dispatch<React.SetStateAction<ShapeStyle>>;
    rectProps: RectProps;
};

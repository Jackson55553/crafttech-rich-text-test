import { ForwardedRef, forwardRef } from "react";
import { HtmlTextProps } from "../../types/HtmlTextProps";

const HtmlText = forwardRef(
    ({ html, id }: HtmlTextProps, ref: ForwardedRef<HTMLDivElement>) => {
        return (
            <div
                id={`htmltext_${id}`}
                dangerouslySetInnerHTML={{ __html: html }}
                style={{
                    position: "fixed",
                    overflow: "hidden",
                    left: "100000px",
                    top: "100000px",
                }}
                ref={ref}
            ></div>
        );
    }
);

export default HtmlText;

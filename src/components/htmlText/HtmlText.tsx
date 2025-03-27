import { ForwardedRef, forwardRef } from "react";
import { HtmlTextProps } from "../../types/HtmlTextProps";

const HtmlText = forwardRef(
    ({ html, id }: HtmlTextProps, ref: ForwardedRef<HTMLDivElement>) => {
        return (
            <>
                <div
                    id={`htmltext_${id}`}
                    dangerouslySetInnerHTML={{ __html: html }}
                    style={{
                        // maxHeight: "100px",
                        maxWidth: "100px",
                        background: "green",
                        position: "fixed",
                        textWrap: "wrap",
                        // overflow: "hidden",
                        left: "1px",
                        top: "1px",
                    }}
                    ref={ref}
                ></div>
                {/* <button style={{ width: 10, height: 10 }}></button> */}
            </>
        );
    }
);

export default HtmlText;

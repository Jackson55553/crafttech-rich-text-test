export type HtmlTextProps = {
    html: string | TrustedHTML;
    id: string | number;
    ref: React.RefObject<HTMLDivElement | null>;
};

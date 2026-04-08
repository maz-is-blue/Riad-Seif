import { formatRichText } from "../utils/richText";
import type { ElementType, HTMLAttributes } from "react";

type RichTextProps = {
  value?: string;
  className?: string;
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "dangerouslySetInnerHTML">;

export default function RichText({ value = "", className = "", as: Tag = "div", ...rest }: RichTextProps) {
  return (
    <Tag
      {...rest}
      className={`rich-text ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: formatRichText(value) }}
    />
  );
}

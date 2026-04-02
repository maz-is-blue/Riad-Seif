import { formatRichText } from "../utils/richText";

type RichTextProps = {
  value?: string;
  className?: string;
};

export default function RichText({ value = "", className = "" }: RichTextProps) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: formatRichText(value) }} />;
}

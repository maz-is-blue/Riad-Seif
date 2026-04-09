import { useEffect, useRef, type MouseEvent } from "react";
import { formatRichText } from "../utils/richText";

type RichTextEditorProps = {
  value: string;
  onChange: (nextValue: string) => void;
  minHeight?: number;
};

export default function RichTextEditor({
  value,
  onChange,
  minHeight = 140,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const runCommand = (command: string, value?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, value);
    onChange(editor.innerHTML);
  };

  const handleToolbarMouseDown = (event: MouseEvent<HTMLButtonElement | HTMLInputElement | HTMLLabelElement>) => {
    // Keep selection in contentEditable instead of moving focus to toolbar controls.
    event.preventDefault();
  };

  useEffect(() => {
    if (!editorRef.current) return;
    const formatted = formatRichText(value);
    if (editorRef.current.innerHTML !== formatted) {
      editorRef.current.innerHTML = formatted;
    }
  }, [value]);

  return (
    <div className="rounded-md border border-slate-300 overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs">
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 text-slate-700"
          onMouseDown={handleToolbarMouseDown}
          onClick={() => runCommand("bold")}
        >
          B
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 italic text-slate-700"
          onMouseDown={handleToolbarMouseDown}
          onClick={() => runCommand("italic")}
        >
          I
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 underline text-slate-700"
          onMouseDown={handleToolbarMouseDown}
          onClick={() => runCommand("underline")}
        >
          U
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 text-slate-700"
          onMouseDown={handleToolbarMouseDown}
          onClick={() => runCommand("insertUnorderedList")}
        >
          List
        </button>
        <label className="flex items-center gap-2 text-slate-600" onMouseDown={handleToolbarMouseDown}>
          <span>Color</span>
          <input
            type="color"
            className="h-7 w-10 rounded border border-slate-300 bg-white"
            onMouseDown={handleToolbarMouseDown}
            onChange={(event) => runCommand("foreColor", event.target.value)}
          />
        </label>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="px-3 py-2 text-sm leading-7 outline-none pointer-events-auto"
        style={{ minHeight }}
        onClick={() => editorRef.current?.focus()}
        onInput={(event) => onChange((event.currentTarget as HTMLDivElement).innerHTML)}
      />
    </div>
  );
}

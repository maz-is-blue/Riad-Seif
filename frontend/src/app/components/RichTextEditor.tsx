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
  const selectionRef = useRef<Range | null>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const nextHtml = formatRichText(value ?? "");
    if (editor.innerHTML !== nextHtml) {
      editor.innerHTML = nextHtml;
    }
  }, [value]);

  const saveSelection = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) {
      selectionRef.current = range.cloneRange();
    }
  };

  const restoreSelection = () => {
    const range = selectionRef.current;
    if (!range) return;
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const runCommand = (command: string, commandValue?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    restoreSelection();
    document.execCommand(command, false, commandValue);
    saveSelection();
    onChange(editor.innerHTML);
  };

  const handleToolbarMouseDown = (event: MouseEvent) => {
    // Prevent toolbar from stealing focus from the editable surface.
    event.preventDefault();
  };

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
        <label className="flex items-center gap-2 text-slate-600">
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
        className="px-3 py-2 text-sm leading-7 outline-none rich-text"
        style={{ minHeight }}
        onClick={saveSelection}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onInput={(event) => onChange((event.currentTarget as HTMLDivElement).innerHTML)}
        onPaste={(event) => {
          // Keep pasted text simple to avoid malformed nested markup.
          event.preventDefault();
          const text = event.clipboardData.getData("text/plain");
          document.execCommand("insertText", false, text);
        }}
      />
    </div>
  );
}

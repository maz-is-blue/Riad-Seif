import { useRef } from "react";
import RichText from "./RichText";

type RichTextEditorProps = {
  value: string;
  onChange: (nextValue: string) => void;
  minHeight?: number;
};

const ensureString = (value: unknown) => String(value ?? "");

export default function RichTextEditor({
  value,
  onChange,
  minHeight = 140,
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const applyWrapper = (prefix: string, suffix: string) => {
    const el = textareaRef.current;
    const current = ensureString(value);
    if (!el) {
      onChange(`${prefix}${current}${suffix}`);
      return;
    }

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const selected = current.slice(start, end);
    const wrapped = `${prefix}${selected}${suffix}`;
    const next = `${current.slice(0, start)}${wrapped}${current.slice(end)}`;
    onChange(next);

    window.requestAnimationFrame(() => {
      const target = textareaRef.current;
      if (!target) return;
      target.focus();
      const cursor = start + wrapped.length;
      target.selectionStart = cursor;
      target.selectionEnd = cursor;
    });
  };

  const applyList = () => {
    const el = textareaRef.current;
    const current = ensureString(value);
    if (!el) {
      onChange("<ul>\n  <li></li>\n</ul>");
      return;
    }

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const selected = current.slice(start, end).trim();
    const listItem = selected || "";
    const insertion = `<ul>\n  <li>${listItem}</li>\n</ul>`;
    const next = `${current.slice(0, start)}${insertion}${current.slice(end)}`;
    onChange(next);

    window.requestAnimationFrame(() => {
      const target = textareaRef.current;
      if (!target) return;
      target.focus();
      const cursor = start + insertion.length;
      target.selectionStart = cursor;
      target.selectionEnd = cursor;
    });
  };

  const applyColor = (hex: string) => {
    applyWrapper(`<span style="color:${hex}">`, "</span>");
  };

  return (
    <div className="rounded-md border border-slate-300 overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs">
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 text-slate-700"
          onClick={() => applyWrapper("<strong>", "</strong>")}
        >
          B
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 italic text-slate-700"
          onClick={() => applyWrapper("<em>", "</em>")}
        >
          I
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 underline text-slate-700"
          onClick={() => applyWrapper("<u>", "</u>")}
        >
          U
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-2 py-1 text-slate-700"
          onClick={applyList}
        >
          List
        </button>
        <label className="flex items-center gap-2 text-slate-600">
          <span>Color</span>
          <input
            type="color"
            className="h-7 w-10 rounded border border-slate-300 bg-white"
            onChange={(event) => applyColor(event.target.value)}
          />
        </label>
      </div>
      <textarea
        ref={textareaRef}
        className="w-full resize-y px-3 py-2 text-sm leading-7 outline-none"
        style={{ minHeight }}
        value={ensureString(value)}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="border-t border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
        {`HTML preview`}
      </div>
      <div className="px-3 py-3">
        <RichText value={ensureString(value)} className="text-sm leading-7 text-slate-700" />
      </div>
    </div>
  );
}


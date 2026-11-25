import { useState } from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  maxHeight?: string;
  startLine?: number;
  highlightLines?: number[];
}

export function CodeBlock({
  code,
  title,
  language = 'python',
  maxHeight = 'max-h-[460px]',
  startLine = 1,
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const lines = code.split('\n');
  const hlSet = new Set(highlightLines);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80 bg-[#0F172A] text-slate-100 shadow-sm">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#14243A] border-b border-slate-700/70 text-xs">
        <div className="flex items-center gap-2 text-slate-200 font-medium">
          <FileCode2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
          <span>{title ?? language.toUpperCase()}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-[#0F9D8A]" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Đã chép' : 'Copy'}
        </button>
      </div>
      <div className={`overflow-auto ${maxHeight} p-3 text-[12.5px] leading-relaxed font-mono`}>
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const absLine = startLine + idx;
              const isHighlighted = hlSet.has(absLine) || hlSet.has(idx + 1);
              return (
                <tr
                  key={idx}
                  className={
                    isHighlighted
                      ? 'bg-[#0F9D8A]/25 border-l-2 border-[#0F9D8A]'
                      : 'hover:bg-slate-800/50'
                  }
                >
                  <td
                    className={`select-none pr-3 text-right w-10 align-top text-[11px] ${
                      isHighlighted ? 'text-teal-300 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {absLine}
                  </td>
                  <td className="whitespace-pre text-slate-100">{line}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

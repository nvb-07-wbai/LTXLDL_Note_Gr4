import katex from 'katex';
import { useMemo } from 'react';

interface MathFormulaProps {
  latex: string;
  block?: boolean;
  className?: string;
}

export function MathFormula({ latex, block = false, className = '' }: MathFormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex, block]);

  if (block) {
    return (
      <div
        className={`overflow-x-auto py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

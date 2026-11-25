import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Terminal, ShieldAlert, MessageSquareWarning, BookMarked, BarChart3 } from 'lucide-react';
import { ALL_LESSONS } from '../data/lessons';
import { PIPELINE_STAGES } from '../data/pipelineData';
import { QA_RULES, KPI_DOCS } from '../data/kpiQaData';
import { GLOSSARY_ITEMS } from '../data/glossaryData';
import { ALL_VIVA_QUESTIONS } from '../data/viva';

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
}

interface SearchDoc {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  route: string;
  searchText: string;
}

export function CommandSearch({ open, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) onClose();
      } else if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const docs = useMemo<SearchDoc[]>(() => {
    const items: SearchDoc[] = [];
    for (const l of ALL_LESSONS) {
      items.push({
        id: `lesson-${l.id}`,
        kind: 'Lý thuyết',
        title: `${l.number}: ${l.title}`,
        subtitle: l.subtitle,
        route: `/theory?lesson=${l.id}`,
        searchText: `${l.number} ${l.title} ${l.subtitle} ${l.coreConcepts.join(' ')} ${l.terms.map((t) => t.term).join(' ')}`.toLowerCase(),
      });
    }
    for (const p of PIPELINE_STAGES) {
      items.push({
        id: `pipe-${p.id}`,
        kind: 'Pipeline',
        title: `${p.name} (${p.filePath})`,
        subtitle: p.goal,
        route: `/pipeline?stage=${p.id}`,
        searchText: `${p.name} ${p.filePath} ${p.mainFunctions.join(' ')} ${p.goal}`.toLowerCase(),
      });
    }
    for (const r of QA_RULES) {
      items.push({
        id: `qa-${r.ruleId}`,
        kind: 'QA Rule',
        title: r.ruleName,
        subtitle: `${r.ruleId} — ${r.targetColumn}`,
        route: `/kpi-qa?tab=qa&rule=${r.ruleId}`,
        searchText: `${r.ruleId} ${r.ruleName} ${r.targetColumn} ${r.condition} ${r.action}`.toLowerCase(),
      });
    }
    for (const k of KPI_DOCS) {
      items.push({
        id: `kpi-${k.id}`,
        kind: 'KPI',
        title: k.name,
        subtitle: `${k.level} · ${k.unit}`,
        route: `/kpi-qa?tab=kpi&kpi=${k.id}`,
        searchText: `${k.name} ${k.shortName} ${k.meaning} ${k.fileAndFunc}`.toLowerCase(),
      });
    }
    for (const v of ALL_VIVA_QUESTIONS) {
      items.push({
        id: `viva-${v.id}`,
        kind: `Vấn đáp (${v.category})`,
        title: v.question,
        subtitle: `${v.qType} · ${v.difficulty} · ${v.relatedFiles.join(', ')}`,
        route: `/viva?q=${v.id}`,
        searchText: `${v.question} ${v.quickAnswer} ${v.categoryLabel} ${v.relatedFiles.join(' ')}`.toLowerCase(),
      });
    }
    for (const g of GLOSSARY_ITEMS) {
      items.push({
        id: `gloss-${g.id}`,
        kind: 'Thuật ngữ',
        title: g.term,
        subtitle: g.viExplanation,
        route: `/glossary?q=${encodeURIComponent(g.term)}`,
        searchText: `${g.term} ${g.viExplanation} ${g.projectApp}`.toLowerCase(),
      });
    }
    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs.slice(0, 12);
    return docs.filter((d) => d.searchText.includes(q)).slice(0, 18);
  }, [docs, query]);

  if (!open) return null;

  const getIcon = (kind: string) => {
    if (kind === 'Lý thuyết') return <BookOpen className="w-4 h-4 text-[#2563EB]" />;
    if (kind === 'Pipeline') return <Terminal className="w-4 h-4 text-[#0F9D8A]" />;
    if (kind === 'QA Rule') return <ShieldAlert className="w-4 h-4 text-amber-500" />;
    if (kind === 'KPI') return <BarChart3 className="w-4 h-4 text-indigo-500" />;
    if (kind.startsWith('Vấn đáp')) return <MessageSquareWarning className="w-4 h-4 text-rose-500" />;
    return <BookMarked className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm nhanh kiến thức"
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm bài học, hàm Python, quy tắc QA, KPI, câu hỏi vấn đáp hoặc thuật ngữ..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Đóng tìm kiếm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/70">
          {results.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Không tìm thấy kết quả phù hợp cho &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  navigate(item.route);
                  onClose();
                  setQuery('');
                }}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-start gap-3 transition-colors cursor-pointer"
              >
                <div className="mt-0.5 shrink-0">{getIcon(item.kind)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.kind}
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Gõ từ khóa như: PPG, ghost, chunksize, 429, Cuauhtémoc, Macro F1...</span>
          <span>ESC để đóng</span>
        </div>
      </div>
    </div>
  );
}

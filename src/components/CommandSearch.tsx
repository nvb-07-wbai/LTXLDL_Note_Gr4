import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  BookOpen,
  Terminal,
  ShieldAlert,
  MessageSquareWarning,
  BookMarked,
  BarChart3,
  Layers,
  CheckSquare,
  Code2,
} from 'lucide-react';
import { ALL_LESSONS } from '../data/lessons';
import { PIPELINE_STAGES } from '../data/pipelineData';
import { QA_RULES, KPI_DOCS } from '../data/kpiQaData';
import { GLOSSARY_ITEMS } from '../data/glossaryData';
import { ALL_VIVA_QUESTIONS } from '../data/viva';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { DATA_STORIES, CRITIQUE_SCENARIOS } from '../data/storytellingData';
import { CODE_AUDIT_DISCREPANCIES } from '../data/projectData';

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

function foldVi(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

export function CommandSearch({ open, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();

  const docs = useMemo<SearchDoc[]>(() => {
    const items: SearchDoc[] = [];
    for (const l of ALL_LESSONS) {
      items.push({
        id: `lesson-${l.id}`,
        kind: 'Lý thuyết',
        title: `${l.number}: ${l.title}`,
        subtitle: l.subtitle,
        route: `/theory?lesson=${l.id}`,
        searchText: foldVi(
          `${l.number} ${l.title} ${l.subtitle} ${l.coreConcepts.join(' ')} ${l.terms.map((t) => t.term).join(' ')}`
        ),
      });
    }
    for (const p of PIPELINE_STAGES) {
      items.push({
        id: `pipe-${p.id}`,
        kind: 'Pipeline',
        title: `${p.name} (${p.filePath})`,
        subtitle: p.goal,
        route: `/pipeline?stage=${p.id}`,
        searchText: foldVi(`${p.name} ${p.filePath} ${p.mainFunctions.join(' ')} ${p.goal}`),
      });
    }
    for (const r of QA_RULES) {
      items.push({
        id: `qa-${r.ruleId}`,
        kind: 'QA Rule',
        title: r.ruleName,
        subtitle: `${r.ruleId} — ${r.targetColumn}`,
        route: `/kpi-qa?tab=qa&rule=${r.ruleId}`,
        searchText: foldVi(`${r.ruleId} ${r.ruleName} ${r.targetColumn} ${r.condition} ${r.action}`),
      });
    }
    for (const k of KPI_DOCS) {
      items.push({
        id: `kpi-${k.id}`,
        kind: 'KPI',
        title: k.name,
        subtitle: `${k.level} · ${k.unit}`,
        route: `/kpi-qa?tab=kpi&kpi=${k.id}`,
        searchText: foldVi(`${k.name} ${k.shortName} ${k.meaning} ${k.fileAndFunc}`),
      });
    }
    for (const st of DATA_STORIES) {
      items.push({
        id: `story-${st.id}`,
        kind: 'Storytelling',
        title: st.title,
        subtitle: st.theme,
        route: '/storytelling',
        searchText: foldVi(`${st.title} ${st.theme} ${st.keyInsight} ${st.figureFile}`),
      });
    }
    for (const cr of CRITIQUE_SCENARIOS) {
      items.push({
        id: `crit-${cr.id}`,
        kind: 'Phản biện',
        title: cr.question,
        subtitle: cr.trapType,
        route: '/storytelling',
        searchText: foldVi(`${cr.question} ${cr.trapType} ${cr.shortAnswer}`),
      });
    }
    for (const ad of CODE_AUDIT_DISCREPANCIES) {
      items.push({
        id: `audit-${ad.area}`,
        kind: 'Kiểm toán Code',
        title: ad.area,
        subtitle: ad.vivaTakeaway,
        route: '/project',
        searchText: foldVi(`${ad.area} ${ad.inDocsOrReport} ${ad.inActualCode}`),
      });
    }
    for (const fc of FLASHCARDS_DATA) {
      items.push({
        id: `fc-${fc.id}`,
        kind: 'Flashcard',
        title: fc.front,
        subtitle: `${fc.topic} · ${fc.sourceRef}`,
        route: '/flashcards',
        searchText: foldVi(`${fc.front} ${fc.back} ${fc.topic} ${fc.sourceRef}`),
      });
    }
    for (const qz of QUIZZES_DATA) {
      items.push({
        id: `qz-${qz.id}`,
        kind: 'Quiz',
        title: qz.prompt,
        subtitle: `${qz.topic} · ${qz.type}`,
        route: '/quiz',
        searchText: foldVi(`${qz.prompt} ${qz.topic} ${qz.explanation}`),
      });
    }
    for (const v of ALL_VIVA_QUESTIONS) {
      items.push({
        id: `viva-${v.id}`,
        kind: `Vấn đáp (${v.category})`,
        title: v.question,
        subtitle: `${v.qType} · Cấp ${v.level ?? '-'} · ${v.relatedFiles.join(', ')}`,
        route: `/viva?q=${v.id}`,
        searchText: foldVi(
          `${v.id} ${v.question} ${v.categoryLabel} ${v.relatedFiles.join(' ')} ${(v.topics ?? []).join(' ')}`
        ),
      });
    }
    for (const g of GLOSSARY_ITEMS) {
      items.push({
        id: `gloss-${g.id}`,
        kind: 'Thuật ngữ',
        title: g.term,
        subtitle: g.viExplanation,
        route: `/glossary?q=${encodeURIComponent(g.term)}`,
        searchText: foldVi(`${g.term} ${g.viExplanation} ${g.projectApp}`),
      });
    }
    return items;
  }, []);

  const results = useMemo(() => {
    const q = foldVi(query.trim());
    if (!q) return docs.slice(0, 12);
    return docs.filter((d) => d.searchText.includes(q)).slice(0, 20);
  }, [docs, query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => (results.length ? (i + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter' && results[activeIdx]) {
        e.preventDefault();
        navigate(results[activeIdx].route);
        onClose();
        setQuery('');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, results, activeIdx, navigate]);

  if (!open) return null;

  const getIcon = (kind: string) => {
    if (kind === 'Lý thuyết') return <BookOpen className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />;
    if (kind === 'Pipeline') return <Terminal className="w-4 h-4 text-[#0F9D8A] dark:text-teal-300" />;
    if (kind === 'QA Rule') return <ShieldAlert className="w-4 h-4 text-amber-500" />;
    if (kind === 'KPI') return <BarChart3 className="w-4 h-4 text-indigo-500" />;
    if (kind === 'Flashcard') return <Layers className="w-4 h-4 text-teal-500" />;
    if (kind === 'Quiz') return <CheckSquare className="w-4 h-4 text-blue-500" />;
    if (kind === 'Kiểm toán Code') return <Code2 className="w-4 h-4 text-purple-500" />;
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
            placeholder="Tìm bài học, hàm Python, quy tắc QA, KPI, câu hỏi vấn đáp, flashcard, thuật ngữ..."
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
            results.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => {
                  navigate(item.route);
                  onClose();
                  setQuery('');
                }}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors cursor-pointer ${
                  idx === activeIdx
                    ? 'bg-blue-50/80 dark:bg-slate-800'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="mt-0.5 shrink-0">{getIcon(item.kind)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
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
          <span>↑↓ di chuyển · Enter để mở · Hỗ trợ gõ không dấu (vd: "khau hao", "chuoi")</span>
          <span>ESC để đóng</span>
        </div>
      </div>
    </div>
  );
}

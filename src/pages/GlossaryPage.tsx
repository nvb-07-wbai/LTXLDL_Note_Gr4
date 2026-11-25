import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/glossaryData';

export function GlossaryPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [letter, setLetter] = useState<string>('ALL');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const sorted = useMemo(
    () => [...GLOSSARY_ITEMS].sort((a, b) => a.term.localeCompare(b.term)),
    []
  );

  const letters = useMemo(() => {
    const set = new Set(sorted.map((item) => item.term[0].toUpperCase()));
    return ['ALL', ...Array.from(set)];
  }, [sorted]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((item) => {
      const matchLetter = letter === 'ALL' || item.term[0].toUpperCase() === letter;
      const matchQuery =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.viExplanation.toLowerCase().includes(q) ||
        item.projectApp.toLowerCase().includes(q);
      return matchLetter && matchQuery;
    });
  }, [sorted, letter, query]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">Glossary — Từ điển Thuật ngữ A–Z</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {GLOSSARY_ITEMS.length} thuật ngữ giữ nguyên tên tiếng Anh chuẩn + giải thích tiếng Việt &amp; ứng dụng trong BTL.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Lọc thuật ngữ..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {letters.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLetter(l)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                letter === l
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-2 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-extrabold text-[#2563EB] dark:text-blue-400 font-mono">
                {item.term}
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A] font-semibold shrink-0">
                {item.relatedLesson}
              </span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-100 font-medium">
              {item.viExplanation}
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              <strong>Ý nghĩa:</strong> {item.significance}
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <strong>Ví dụ:</strong> {item.example}
            </div>
            <div className="text-slate-500">
              <strong>Trong BTL:</strong> {item.projectApp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

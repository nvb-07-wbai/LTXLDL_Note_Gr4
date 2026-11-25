import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Building2,
  BookmarkCheck,
} from 'lucide-react';
import { ALL_LESSONS } from '../data/lessons';
import { MathFormula } from '../components/MathFormula';
import { CodeBlock } from '../components/CodeBlock';

interface TheoryPageProps {
  completedLessons: string[];
  onToggleComplete: (id: string) => void;
}

const GROUPS = [
  'Nhóm 1 – Nền tảng lập trình & xử lý dữ liệu',
  'Nhóm 2 – Kết nối & biến đổi dữ liệu',
  'Nhóm 3 – Làm sạch & phân tích hiện đại',
  'Nhóm 4 – Trực quan hóa & tư duy phân tích',
] as const;

export function TheoryPage({ completedLessons, onToggleComplete }: TheoryPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get('lesson');
  const [selectedId, setSelectedId] = useState<string>(
    ALL_LESSONS.some((l) => l.id === paramId) ? (paramId as string) : ALL_LESSONS[0].id
  );
  const [openSelfIdx, setOpenSelfIdx] = useState<number | null>(null);
  const [openVivaIdx, setOpenVivaIdx] = useState<number | null>(null);

  useEffect(() => {
    if (paramId && ALL_LESSONS.some((l) => l.id === paramId)) {
      setSelectedId(paramId);
      setOpenSelfIdx(null);
      setOpenVivaIdx(null);
    }
  }, [paramId]);

  const currentIdx = Math.max(0, ALL_LESSONS.findIndex((l) => l.id === selectedId));
  const lesson = ALL_LESSONS[currentIdx];
  const isDone = completedLessons.includes(lesson.id);

  const selectLesson = (id: string) => {
    setSelectedId(id);
    setSearchParams({ lesson: id });
    setOpenSelfIdx(null);
    setOpenVivaIdx(null);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Lesson Rail */}
      <aside className="xl:col-span-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-4 xl:sticky xl:top-20 max-h-[82vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            13 Bài học chính thức
          </h2>
          <span className="text-xs font-semibold text-[#0F9D8A]">
            {completedLessons.length}/{ALL_LESSONS.length} hoàn thành
          </span>
        </div>

        {GROUPS.map((grp) => (
          <div key={grp} className="space-y-1.5">
            <div className="text-[11px] font-bold text-[#2563EB] dark:text-blue-400 px-1">
              {grp}
            </div>
            <div className="space-y-1">
              {ALL_LESSONS.filter((l) => l.group === grp).map((item) => {
                const active = item.id === lesson.id;
                const done = completedLessons.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectLesson(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl border text-xs flex items-start gap-2 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-800 hover:border-[#2563EB]'
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${active ? 'text-[#E7F6F2]' : 'text-[#0F9D8A]'}`} />
                    ) : (
                      <Circle className={`w-4 h-4 shrink-0 mt-0.5 ${active ? 'text-blue-200' : 'text-slate-400'}`} />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold flex items-center justify-between gap-1">
                        <span>{item.number}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            active
                              ? 'bg-white/20 text-white'
                              : item.relevance === 'Cốt lõi BTL'
                              ? 'bg-[#E7F6F2] dark:bg-teal-950/70 text-[#0F9D8A]'
                              : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {item.relevance}
                        </span>
                      </div>
                      <div className={`mt-0.5 line-clamp-1 ${active ? 'text-blue-50' : 'text-slate-600 dark:text-slate-300'}`}>
                        {item.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </aside>

      {/* Lesson Detail */}
      <article className="xl:col-span-8 space-y-5">
        {/* Header Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-bold">
                  {lesson.number}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A] font-semibold">
                  {lesson.relevance}
                </span>
                <span className="text-slate-400">{lesson.group}</span>
              </div>
              <h1 className="text-2xl font-extrabold mt-2">{lesson.title}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{lesson.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => onToggleComplete(lesson.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isDone
                  ? 'bg-[#0F9D8A] text-white'
                  : 'border border-slate-300 dark:border-slate-700 hover:border-[#0F9D8A] text-slate-700 dark:text-slate-200'
              }`}
            >
              {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              <span>{isDone ? 'Đã hoàn thành' : 'Đánh dấu đã học'}</span>
            </button>
          </div>
        </div>

        {/* 1 & 2: Mục tiêu & Kiến thức trọng tâm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#2563EB] mb-3">
              1. Mục tiêu học tập
            </h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
              {lesson.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#0F9D8A] mb-3">
              2. Kiến thức trọng tâm
            </h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
              {lesson.coreConcepts.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* 3 & 4: Thuật ngữ & Giải thích bản chất */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
              3. Định nghĩa thuật ngữ (giữ nguyên tên tiếng Anh)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {lesson.terms.map((t) => (
                <div
                  key={t.term}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60"
                >
                  <div className="font-mono text-xs font-bold text-[#2563EB] dark:text-blue-400">
                    {t.term}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{t.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/50">
            <h2 className="text-sm font-bold text-[#14243A] dark:text-blue-200 flex items-center gap-2 mb-1.5">
              <Lightbulb className="w-4 h-4 text-[#F2B544]" /> 4. Giải thích bản chất dễ hiểu
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {lesson.essence}
            </p>
          </div>
        </section>

        {/* 5: Công thức nếu có */}
        {lesson.formulas && lesson.formulas.length > 0 && (
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              5. Công thức toán học liên quan
            </h2>
            <div className="space-y-3">
              {lesson.formulas.map((f) => (
                <div key={f.label} className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {f.label}
                  </div>
                  <MathFormula latex={f.latex} block />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6 & 7: Ví dụ Python & Ví dụ tính tay */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            6. Ví dụ Python minh họa
          </h2>
          <CodeBlock code={lesson.pythonExample.code} title={lesson.pythonExample.title} />
          {lesson.pythonExample.output && (
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
              <span className="text-slate-400 select-none">Output: </span>
              {lesson.pythonExample.output}
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-[#14243A] dark:text-slate-100 flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-[#0F9D8A]" /> 7. Ví dụ nhỏ tự tính tay (Minh họa)
            </h2>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
              {lesson.handCalculation.prompt}
            </p>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc pl-4">
              {lesson.handCalculation.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
            <div className="mt-2 inline-block px-3 py-1.5 rounded-lg bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A] text-xs font-bold">
              Kết quả: {lesson.handCalculation.answer}
            </div>
          </div>
        </section>

        {/* 8 & 9: Ứng dụng Inside Airbnb & Lỗi thường gặp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-bold text-[#0F9D8A] flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4" /> 8. Ứng dụng trực tiếp vào Inside Airbnb (Nhóm 4)
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {lesson.airbnbApplication}
            </p>
          </section>

          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" /> 9. Các lỗi thường gặp (Cần tránh)
            </h2>
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
              {lesson.commonPitfalls.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* 10 & 11: Tự kiểm tra & Câu hỏi vấn đáp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-2.5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              10. Câu hỏi tự kiểm tra
            </h2>
            {lesson.selfCheckQuestions.map((item, idx) => {
              const open = openSelfIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenSelfIdx(open ? null : idx)}
                    className="w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/60 cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div className="px-3.5 py-2.5 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-2.5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-rose-500">
              11. Câu hỏi vấn đáp thường gặp
            </h2>
            {lesson.vivaQuestions.map((item, idx) => {
              const open = openVivaIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-rose-200/80 dark:border-rose-900/50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenVivaIdx(open ? null : idx)}
                    className="w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between gap-2 bg-rose-50/60 dark:bg-rose-950/30 cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div className="px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-rose-100 dark:border-rose-900/40">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>

        {/* 12: Tóm tắt ghi nhớ */}
        <section className="rounded-2xl bg-[#14243A] text-white p-5">
          <h2 className="text-sm font-bold flex items-center gap-2 text-[#E7F6F2] mb-2">
            <BookmarkCheck className="w-4 h-4 text-[#0F9D8A]" /> 12. Tóm tắt cần ghi nhớ
          </h2>
          <ul className="space-y-1.5 text-sm text-slate-200 list-disc pl-4">
            {lesson.summary.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </section>

        {/* Lesson Prev / Next */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {currentIdx > 0 ? (
            <button
              type="button"
              onClick={() => selectLesson(ALL_LESSONS[currentIdx - 1].id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold hover:border-[#2563EB] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{ALL_LESSONS[currentIdx - 1].number}: {ALL_LESSONS[currentIdx - 1].title}</span>
            </button>
          ) : (
            <div />
          )}
          {currentIdx < ALL_LESSONS.length - 1 && (
            <button
              type="button"
              onClick={() => selectLesson(ALL_LESSONS[currentIdx + 1].id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer ml-auto"
            >
              <span>{ALL_LESSONS[currentIdx + 1].number}: {ALL_LESSONS[currentIdx + 1].title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

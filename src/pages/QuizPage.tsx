import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, ArrowUp, ArrowDown, CheckSquare } from 'lucide-react';
import { QUIZZES_DATA } from '../data/quizzesData';
import { CodeBlock } from '../components/CodeBlock';
import type { QuizQuestion } from '../types';

interface QuizPageProps {
  completedQuizIds: string[];
  correctQuizIds: string[];
  onRecordAnswer: (quizId: string, isCorrect: boolean) => void;
}

const TYPE_LABELS: Record<QuizQuestion['type'], string> = {
  single: 'Trắc nghiệm 1 đáp án',
  multi: 'Chọn nhiều đáp án',
  tf: 'Đúng / Sai',
  fill: 'Điền thuật ngữ',
  order: 'Sắp xếp thứ tự pipeline',
  'code-output': 'Chọn kết quả code',
  'bug-find': 'Phát hiện lỗi code',
  match: 'Ghép KPI với công thức',
  critique: 'Phản biện nhận định',
};

export function QuizPage({ completedQuizIds, correctQuizIds, onRecordAnswer }: QuizPageProps) {
  const [idx, setIdx] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [textInput, setTextInput] = useState('');
  const [orderList, setOrderList] = useState<string[]>([]);
  const [matchSelections, setMatchSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);

  const q = QUIZZES_DATA[idx];

  const initQuestionState = (nextIdx: number) => {
    const nextQ = QUIZZES_DATA[nextIdx];
    setIdx(nextIdx);
    setSelectedIndices([]);
    setTextInput('');
    setSubmitted(false);
    setLastCorrect(false);
    if (nextQ.type === 'order' && nextQ.orderItems) {
      // Deterministic reversed/rotated shuffle so user actually reorders it
      const arr = [...nextQ.orderItems];
      setOrderList([...arr.slice(4), ...arr.slice(0, 4)]);
    } else {
      setOrderList([]);
    }
    setMatchSelections({});
  };

  const rightMatchOptions = useMemo(() => {
    if (q.type !== 'match' || !q.matchPairs) return [];
    return [...q.matchPairs.map((p) => p.right)].sort();
  }, [q]);

  const toggleOption = (optIdx: number) => {
    if (submitted) return;
    if (q.type === 'multi') {
      setSelectedIndices((prev) =>
        prev.includes(optIdx) ? prev.filter((i) => i !== optIdx) : [...prev, optIdx]
      );
    } else {
      setSelectedIndices([optIdx]);
    }
  };

  const moveOrder = (pos: number, dir: -1 | 1) => {
    if (submitted) return;
    const target = pos + dir;
    if (target < 0 || target >= orderList.length) return;
    const copy = [...orderList];
    [copy[pos], copy[target]] = [copy[target], copy[pos]];
    setOrderList(copy);
  };

  const checkAnswer = () => {
    let ok = false;
    if (q.type === 'fill') {
      ok = textInput.trim().toLowerCase() === (q.correctText ?? '').toLowerCase();
    } else if (q.type === 'order' && q.orderItems) {
      ok = orderList.every((val, i) => val === q.orderItems![i]);
    } else if (q.type === 'match' && q.matchPairs) {
      ok = q.matchPairs.every((p) => matchSelections[p.left] === p.right);
    } else if (q.correctIndices) {
      const a = [...selectedIndices].sort().join(',');
      const b = [...q.correctIndices].sort().join(',');
      ok = a === b;
    }
    setSubmitted(true);
    setLastCorrect(ok);
    onRecordAnswer(q.id, ok);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-[#2563EB]" /> Quiz Tương tác (9 Dạng bài)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Đã làm: <strong>{completedQuizIds.length}/{QUIZZES_DATA.length}</strong> · Đúng: <strong className="text-[#0F9D8A]">{correctQuizIds.length}</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {QUIZZES_DATA.map((item, i) => {
            const done = completedQuizIds.includes(item.id);
            const ok = correctQuizIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => initQuestionState(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer border transition-colors ${
                  i === idx
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : ok
                    ? 'bg-[#E7F6F2] text-[#0F9D8A] border-[#0F9D8A]/40'
                    : done
                    ? 'bg-rose-50 text-rose-600 border-rose-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] font-bold">
            Câu {idx + 1} · {TYPE_LABELS[q.type]}
          </span>
          <span className="text-slate-400 font-medium">{q.topic}</span>
        </div>

        <h2 className="text-base sm:text-lg font-bold leading-snug">{q.prompt}</h2>

        {q.codeSnippet && <CodeBlock code={q.codeSnippet} title="Đoạn code cần kiểm tra" />}

        {/* Input by Quiz Type */}
        {q.options && (
          <div className="space-y-2">
            {q.options.map((opt, optIdx) => {
              const selected = selectedIndices.includes(optIdx);
              const isTrueOption = q.correctIndices?.includes(optIdx);
              let borderCls = 'border-slate-200 dark:border-slate-700 hover:border-[#2563EB]';
              if (submitted) {
                if (isTrueOption) borderCls = 'border-[#0F9D8A] bg-[#E7F6F2]/70 dark:bg-teal-950/40';
                else if (selected && !isTrueOption) borderCls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/30';
              } else if (selected) {
                borderCls = 'border-[#2563EB] bg-blue-50/70 dark:bg-blue-950/40';
              }
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => toggleOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-colors cursor-pointer flex items-center gap-3 ${borderCls}`}
                >
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                    selected ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {q.type === 'fill' && (
          <input
            value={textInput}
            disabled={submitted}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Nhập đáp án chính xác..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm focus:outline-none focus:border-[#2563EB]"
          />
        )}

        {q.type === 'order' && (
          <div className="space-y-2">
            {orderList.map((item, i) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#14243A] text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="font-medium">{item}</span>
                </div>
                {!submitted && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveOrder(i, -1)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white cursor-pointer"
                      aria-label="Lên"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveOrder(i, 1)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white cursor-pointer"
                      aria-label="Xuống"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {q.type === 'match' && q.matchPairs && (
          <div className="space-y-2.5">
            {q.matchPairs.map((pair) => (
              <div
                key={pair.left}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs"
              >
                <div className="font-bold text-sm">{pair.left}</div>
                <select
                  disabled={submitted}
                  value={matchSelections[pair.left] ?? ''}
                  onChange={(e) =>
                    setMatchSelections((prev) => ({ ...prev, [pair.left]: e.target.value }))
                  }
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                >
                  <option value="">-- Chọn công thức --</option>
                  {rightMatchOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Submit / Feedback */}
        {!submitted ? (
          <button
            type="button"
            onClick={checkAnswer}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold cursor-pointer"
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <div className={`p-4 rounded-xl border space-y-2 text-xs ${
            lastCorrect
              ? 'bg-[#E7F6F2]/70 dark:bg-teal-950/40 border-[#0F9D8A]'
              : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-400'
          }`}>
            <div className={`font-bold text-sm flex items-center gap-1.5 ${
              lastCorrect ? 'text-[#0F9D8A]' : 'text-rose-600 dark:text-rose-400'
            }`}>
              {lastCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>{lastCorrect ? 'Chính xác!' : 'Chưa chính xác — xem giải thích bên dưới'}</span>
            </div>
            <p className="text-slate-800 dark:text-slate-100">
              <strong>Vì sao đúng:</strong> {q.explanation}
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              <strong>Vì sao các phương án khác sai / bẫy cần tránh:</strong> {q.wrongReasons}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => initQuestionState((idx + 1) % QUIZZES_DATA.length)}
                className="px-4 py-2 rounded-lg bg-[#14243A] text-white font-bold cursor-pointer"
              >
                Câu tiếp theo →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

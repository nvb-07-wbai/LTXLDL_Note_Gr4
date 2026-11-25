import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Swords,
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  Clock,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Lock,
  BookOpen,
  FileCode2,
  History,
} from 'lucide-react';
import { ALL_VIVA_QUESTIONS, VIVA_CATEGORIES } from '../data/viva';
import { CodeBlock } from '../components/CodeBlock';
import { getFigureUrl } from '../lib/assetUrl';
import type { StudyProgressState, VivaAttemptRecord, VivaQuestion } from '../types';

interface VivaArenaPageProps {
  progress: StudyProgressState;
  onRecordAttempt: (attempt: VivaAttemptRecord) => void;
  onTogglePracticed: (qId: string) => void;
}

const QUESTION_SECONDS = 90;
const TOTAL_EXAM_QUESTIONS = 5;
const TOTAL_EXAM_BUDGET = 600; // 10 phút theo đề bài

export function VivaArenaPage({
  progress,
  onRecordAttempt,
  onTogglePracticed,
}: VivaArenaPageProps) {
  const [searchParams] = useSearchParams();
  const requestedQ = searchParams.get('q');

  const [tab, setTab] = useState<'arena' | 'bank' | 'history'>(requestedQ ? 'bank' : 'arena');
  const [mode, setMode] = useState<'practice' | 'strict'>('strict');
  const [phase, setPhase] = useState<'setup' | 'running' | 'review'>('setup');

  const [examQuestions, setExamQuestions] = useState<VivaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [paused, setPaused] = useState(false);

  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [lockedIds, setLockedIds] = useState<Record<string, boolean>>({});
  const [scores, setScores] = useState<Record<string, number | null>>({});
  const [attemptId, setAttemptId] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [savedCurrentAttempt, setSavedCurrentAttempt] = useState(false);
  const [openFollowUps, setOpenFollowUps] = useState<Record<string, boolean>>({});

  // Bank filters
  const [catFilter, setCatFilter] = useState<string>('ALL');
  const [diffFilter, setDiffFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [bucketFilter, setBucketFilter] = useState<string>('ALL');
  const [bankQuery, setBankQuery] = useState<string>('');
  const [bankLimit, setBankLimit] = useState<number>(40);
  const [expandedBankId, setExpandedBankId] = useState<string | null>(requestedQ);

  const isStrictRunning = phase === 'running' && mode === 'strict';

  useEffect(() => {
    try {
      sessionStorage.setItem('ltxldl_strict_viva_active', isStrictRunning ? '1' : '0');
      window.dispatchEvent(new CustomEvent('ltxldl-strict-lock', { detail: { active: isStrictRunning } }));
    } catch {
      // ignore storage failure
    }
    return () => {
      try {
        sessionStorage.setItem('ltxldl_strict_viva_active', '0');
        window.dispatchEvent(new CustomEvent('ltxldl-strict-lock', { detail: { active: false } }));
      } catch {
        // ignore
      }
    };
  }, [isStrictRunning]);

  useEffect(() => {
    if (isStrictRunning) return;
    if (requestedQ && ALL_VIVA_QUESTIONS.some((q) => q.id === requestedQ)) {
      setTab('bank');
      setExpandedBankId(requestedQ);
    }
  }, [requestedQ, isStrictRunning]);

  const currentQuestion = examQuestions[currentIndex];
  const advanceRef = useRef<() => void>(() => {});
  const questionDeadlineRef = useRef<number>(Date.now() + QUESTION_SECONDS * 1000);

  const handleNextOrFinish = () => {
    if (!currentQuestion) return;
    setLockedIds((prev) => ({ ...prev, [currentQuestion.id]: true }));
    setShowHint(false);
    setShowAnswer(false);

    if (currentIndex + 1 >= examQuestions.length) {
      setPhase('review');
      return;
    }
    setCurrentIndex((i) => i + 1);
    questionDeadlineRef.current = Date.now() + QUESTION_SECONDS * 1000;
    setSecondsLeft(QUESTION_SECONDS); // Không cộng dồn thời gian thừa
  };

  advanceRef.current = handleNextOrFinish;

  useEffect(() => {
    if (phase !== 'running' || (mode === 'practice' && paused)) return;
    questionDeadlineRef.current = Date.now() + secondsLeft * 1000;

    const timer = window.setInterval(() => {
      setTotalElapsed((t) => {
        const nextTotal = t + 1;
        return nextTotal;
      });
      const rem = Math.max(0, Math.ceil((questionDeadlineRef.current - Date.now()) / 1000));
      setSecondsLeft(rem);
    }, 500);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, mode, paused, currentIndex]);

  useEffect(() => {
    if (phase === 'running' && secondsLeft === 0) {
      advanceRef.current();
    }
  }, [phase, secondsLeft]);

  const startSession = (chosenMode: 'practice' | 'strict') => {
    const practicedSet = new Set(progress.practicedVivaIds);
    const shuffle = <T,>(arr: T[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };
    // Ưu tiên phân tầng theo nhóm và các câu chưa luyện
    const unpracticed = ALL_VIVA_QUESTIONS.filter((q) => !practicedSet.has(q.id));
    const sourcePool = unpracticed.length >= TOTAL_EXAM_QUESTIONS ? unpracticed : ALL_VIVA_QUESTIONS;
    const cats = shuffle(VIVA_CATEGORIES.map((c) => c.id));
    const picked: VivaQuestion[] = [];
    for (const c of cats) {
      if (picked.length >= TOTAL_EXAM_QUESTIONS) break;
      const cand = shuffle(sourcePool.filter((q) => q.category === c && !picked.some((p) => p.id === q.id)));
      if (cand[0]) picked.push(cand[0]);
    }
    if (picked.length < TOTAL_EXAM_QUESTIONS) {
      const rest = shuffle(ALL_VIVA_QUESTIONS.filter((q) => !picked.some((p) => p.id === q.id)));
      picked.push(...rest.slice(0, TOTAL_EXAM_QUESTIONS - picked.length));
    }

    setMode(chosenMode);
    setExamQuestions(picked);
    setAttemptId(`viva-${Date.now()}`);
    setCurrentIndex(0);
    questionDeadlineRef.current = Date.now() + QUESTION_SECONDS * 1000;
    setSecondsLeft(QUESTION_SECONDS);
    setTotalElapsed(0);
    setPaused(false);
    setUserNotes({});
    setLockedIds({});
    setScores(Object.fromEntries(picked.map((q) => [q.id, null])));
    setShowHint(false);
    setShowAnswer(false);
    setSavedCurrentAttempt(false);
    setTab('arena');
    setPhase('running');
  };

  const ungradedCount = useMemo(
    () => examQuestions.filter((q) => scores[q.id] === null || scores[q.id] === undefined).length,
    [examQuestions, scores]
  );

  const totalSelfScore = useMemo(
    () => examQuestions.reduce((acc, q) => acc + (scores[q.id] ?? 0), 0),
    [examQuestions, scores]
  );

  const diagnostics = useMemo(() => {
    const weakQuestions = examQuestions.filter((q) => (scores[q.id] ?? 0) < 0.75);
    const weakCategories = Array.from(new Set(weakQuestions.map((q) => `${q.category}. ${q.categoryLabel}`)));
    const filesToReread = Array.from(new Set(weakQuestions.flatMap((q) => q.relatedFiles)));
    return { weakQuestions, weakCategories, filesToReread };
  }, [examQuestions, scores]);

  const saveAttemptToTracker = () => {
    if (savedCurrentAttempt || ungradedCount > 0) return;
    const numericScores: Record<string, number> = Object.fromEntries(
      examQuestions.map((q) => [q.id, scores[q.id] ?? 0])
    );
    onRecordAttempt({
      id: attemptId || `viva-${Date.now()}`,
      timestamp: new Date().toISOString(),
      mode,
      totalScore: totalSelfScore,
      maxScore: TOTAL_EXAM_QUESTIONS,
      questionIds: examQuestions.map((q) => q.id),
      scoresByQuestion: numericScores,
      weakCategories: diagnostics.weakCategories,
    });
    setSavedCurrentAttempt(true);
  };

  const filteredBank = useMemo(() => {
    const qLower = bankQuery.trim().toLowerCase();
    return ALL_VIVA_QUESTIONS.filter((q) => {
      if (catFilter !== 'ALL' && q.category !== catFilter) return false;
      if (diffFilter !== 'ALL' && q.difficulty !== diffFilter) return false;
      if (typeFilter !== 'ALL' && q.qType !== typeFilter) return false;
      if (bucketFilter !== 'ALL' && q.bucket !== bucketFilter) return false;
      if (
        qLower &&
        !q.question.toLowerCase().includes(qLower) &&
        !q.id.toLowerCase().includes(qLower) &&
        !(q.codeLocation ?? '').toLowerCase().includes(qLower) &&
        !q.relatedFiles.some((f) => f.toLowerCase().includes(qLower))
      ) {
        return false;
      }
      return true;
    });
  }, [catFilter, diffFilter, typeFilter, bucketFilter, bankQuery]);

  const visibleBank = useMemo(() => {
    if (expandedBankId && !filteredBank.slice(0, bankLimit).some((q) => q.id === expandedBankId)) {
      const found = filteredBank.find((q) => q.id === expandedBankId);
      return found ? [found, ...filteredBank.slice(0, bankLimit)] : filteredBank.slice(0, bankLimit);
    }
    return filteredBank.slice(0, bankLimit);
  }, [filteredBank, bankLimit, expandedBankId]);

  const renderModelAnswer = (q: VivaQuestion) => (
    <div className="space-y-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 p-4">
      {q.evaluationGoal && (
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          <strong>Mục tiêu kiểm tra:</strong> {q.evaluationGoal}{' '}
          {q.codeLocation && <code className="ml-1 px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700">{q.codeLocation}</code>}
        </div>
      )}
      <div>
        <span className="font-bold text-[#0F9D8A] uppercase">A. Câu trả lời nhanh (60–90s): </span>
        <span className="text-slate-900 dark:text-slate-100 font-semibold">{q.quickAnswer}</span>
      </div>
      <div>
        <span className="font-bold text-[#2563EB] uppercase">B. Giải thích nguyên lý: </span>
        <span className="text-slate-700 dark:text-slate-300">{q.explanation}</span>
      </div>
      <div>
        <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase">C. Liên hệ dự án: </span>
        <span className="text-slate-700 dark:text-slate-300">{q.projectLink}</span>
      </div>
      <div>
        <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase">D. Ví dụ chứng minh: </span>
        <span className="text-slate-700 dark:text-slate-300">{q.proofExample}</span>
      </div>
      <div>
        <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">E. Giảng viên có thể hỏi sâu tiếp: </span>
        {q.followUpQA && q.followUpQA.length > 0 ? (
          <div className="space-y-1.5 mt-1.5">
            {q.followUpQA.map((item, idx) => {
              const key = `${q.id}-${idx}`;
              const isOpen = Boolean(openFollowUps[key]);
              return (
                <div key={key} className="rounded-lg border border-amber-200/70 dark:border-amber-900/50 bg-white dark:bg-slate-900/60 p-2">
                  <button
                    type="button"
                    onClick={() => setOpenFollowUps((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className="w-full text-left font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span>• {item.q}</span>
                    <span className="text-[10px] text-[#2563EB] shrink-0">{isOpen ? 'Ẩn gợi ý' : 'Xem đáp án'}</span>
                  </button>
                  {isOpen && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="list-disc pl-4 mt-1 text-slate-600 dark:text-slate-300">
            {q.followUpQuestions.map((fq) => (
              <li key={fq}>{fq}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <span className="font-bold text-rose-600 dark:text-rose-400 uppercase">F. Lỗi dễ mắc: </span>
        <ul className="list-disc pl-4 mt-1 text-slate-600 dark:text-slate-300">
          {q.commonMistakes.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Arena Header */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-[#0F9D8A]">
            Phòng luyện thi vấn đáp · {ALL_VIVA_QUESTIONS.length} câu hỏi chuẩn hóa
          </span>
          <h1 className="text-2xl font-extrabold mt-0.5 flex items-center gap-2">
            <Swords className="w-6 h-6 text-[#2563EB]" /> Viva Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Cấu hình chuẩn đề thi: 10 phút · 5 câu ngẫu nhiên · tối đa 90 giây/câu · 1 điểm/câu · không cộng dồn thời gian.
          </p>
        </div>

        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          {[
            { id: 'arena', label: 'Thi mô phỏng' },
            { id: 'bank', label: `Ngân hàng (${ALL_VIVA_QUESTIONS.length})` },
            { id: 'history', label: `Lịch sử (${progress.vivaHistory.length})` },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              disabled={phase === 'running' && mode === 'strict'}
              onClick={() => setTab(t.id as typeof tab)}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-40 ${
                tab === t.id ? 'bg-white dark:bg-slate-900 text-[#2563EB] shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: EXAM SIMULATOR */}
      {tab === 'arena' && (
        <>
          {phase === 'setup' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#2563EB] p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold">
                    Chế độ Đóng 🚫
                  </span>
                  <Lock className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h2 className="text-xl font-extrabold">Strict Viva Mode (Thi thật)</h2>
                <ul className="text-xs sm:text-sm space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                  <li>Rút ngẫu nhiên 5 câu hỏi từ 10 nhóm A–J.</li>
                  <li>Đồng hồ đếm ngược <strong>90 giây/câu</strong>, hết giờ tự khóa và chuyển câu tiếp theo.</li>
                  <li><strong>Không</strong> xem gợi ý, <strong>không</strong> xem đáp án trước khi thi xong.</li>
                  <li><strong>Không</strong> tạm dừng đồng hồ, <strong>không</strong> quay lại câu trước, không cộng dồn thời gian.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => startSession('strict')}
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" /> Bắt đầu Strict Viva Mode
                </button>
              </div>

              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A] text-xs font-bold">
                    Tự luyện tập
                  </span>
                  <Lightbulb className="w-5 h-5 text-[#0F9D8A]" />
                </div>
                <h2 className="text-xl font-extrabold">Practice Mode (Luyện từng câu)</h2>
                <ul className="text-xs sm:text-sm space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                  <li>Vẫn mô phỏng đồng hồ 90 giây để rèn tốc độ nói gọn.</li>
                  <li>Cho phép tạm dừng đồng hồ khi đang ghi chép ý.</li>
                  <li>Cho phép mở Gợi ý và Đáp án mẫu ngay để đối chiếu cách diễn đạt.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => startSession('practice')}
                  className="w-full py-3 rounded-xl bg-[#0F9D8A] hover:bg-[#0c8575] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" /> Bắt đầu Practice Mode
                </button>
              </div>
            </div>
          )}

          {phase === 'running' && currentQuestion && (
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-md">
              {/* Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#14243A] text-white text-xs font-bold">
                    Câu {currentIndex + 1} / {examQuestions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Nhóm {currentQuestion.category} · {currentQuestion.qType} · {currentQuestion.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    Tổng phiên: {Math.floor(totalElapsed / 60)}:{String(totalElapsed % 60).padStart(2, '0')} / 10:00
                  </span>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-base font-extrabold ${
                      secondsLeft <= 15
                        ? 'bg-rose-600 text-white animate-pulse'
                        : secondsLeft <= 30
                        ? 'bg-amber-500 text-white'
                        : 'bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A]'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{secondsLeft}s</span>
                  </div>
                </div>
              </div>

              {/* Timer progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    secondsLeft <= 15 ? 'bg-rose-600' : secondsLeft <= 30 ? 'bg-amber-500' : 'bg-[#0F9D8A]'
                  }`}
                  style={{ width: `${(secondsLeft / QUESTION_SECONDS) * 100}%` }}
                />
              </div>

              {/* Question Prompt */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold leading-snug">
                  {currentQuestion.question}
                </h2>

                {currentQuestion.codeBlock && (
                  <CodeBlock
                    code={currentQuestion.codeBlock.code}
                    title={`${currentQuestion.codeBlock.file} (${currentQuestion.codeBlock.lines ?? ''})`}
                  />
                )}

                {currentQuestion.figureRef && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-center">
                    <img
                      src={getFigureUrl(currentQuestion.figureRef)}
                      alt={currentQuestion.figureRef}
                      className="max-h-72 w-auto object-contain"
                    />
                  </div>
                )}

                {/* User Spoken/Typed Answer Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 block">
                    Ghi nhanh ý trả lời của bạn (hoặc tự nói thành tiếng trong 60–90 giây):
                  </label>
                  <textarea
                    rows={4}
                    disabled={Boolean(lockedIds[currentQuestion.id])}
                    value={userNotes[currentQuestion.id] ?? ''}
                    onChange={(e) =>
                      setUserNotes((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))
                    }
                    placeholder="Gõ các ý chính (Kết luận -> Giải thích -> File/Số liệu chứng minh)..."
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              {/* Practice Helpers (Hidden in Strict Mode) */}
              {mode === 'practice' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setPaused((p) => !p)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      <span>{paused ? 'Tiếp tục đồng hồ' : 'Tạm dừng đồng hồ'}</span>
                    </button>
                    {currentQuestion.hint && (
                      <button
                        type="button"
                        onClick={() => setShowHint((h) => !h)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowAnswer((a) => !a)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0F9D8A] text-[#0F9D8A] text-xs font-semibold cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{showAnswer ? 'Ẩn đáp án mẫu' : 'Xem đáp án mẫu'}</span>
                    </button>
                  </div>

                  {showHint && currentQuestion.hint && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-200">
                      💡 Gợi ý: {currentQuestion.hint}
                    </div>
                  )}

                  {showAnswer && renderModelAnswer(currentQuestion)}
                </div>
              )}

              {/* Next / Submit */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {mode === 'strict'
                    ? 'Chế độ Strict: không cho phép quay lại câu trước hoặc xem gợi ý.'
                    : `Ngân sách phiên thi: ${Math.max(0, TOTAL_EXAM_BUDGET - totalElapsed)}s còn lại.`}
                </div>
                <button
                  type="button"
                  onClick={handleNextOrFinish}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 >= examQuestions.length ? 'Kết thúc & Chấm điểm' : 'Chốt & Sang câu tiếp'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {phase === 'review' && (
            <div className="space-y-6">
              {/* Self-Assessment Summary */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#0F9D8A]">
                      Hoàn thành lượt thi ({mode === 'strict' ? 'Strict Viva' : 'Practice'})
                    </span>
                    <h2 className="text-2xl font-extrabold mt-0.5">
                      Tổng điểm tự đánh giá: {totalSelfScore.toFixed(2)} / {TOTAL_EXAM_QUESTIONS}.00
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Lưu ý: Đây là thang điểm tự luyện tập của website (0–1 điểm/câu), không thay thế rubric chấm chi tiết của giảng viên.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <button
                      type="button"
                      onClick={saveAttemptToTracker}
                      disabled={savedCurrentAttempt || ungradedCount > 0}
                      title={ungradedCount > 0 ? `Hãy tự chấm điểm cho đủ 5 câu (còn ${ungradedCount} câu chưa chấm)` : ''}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F9D8A] disabled:opacity-50 text-white text-xs font-bold cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {savedCurrentAttempt
                          ? 'Đã lưu kết quả'
                          : ungradedCount > 0
                          ? `Chấm nốt ${ungradedCount} câu để lưu`
                          : 'Lưu vào Study Tracker'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhase('setup')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Thi lượt mới
                    </button>
                  </div>
                </div>

                {/* Diagnostic Gaps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40">
                    <div className="font-bold text-rose-700 dark:text-rose-300">Chủ đề cần cải thiện (&lt; 0.75đ)</div>
                    {diagnostics.weakCategories.length === 0 ? (
                      <p className="mt-1 text-emerald-700 dark:text-emerald-300">Xuất sắc! Không có chủ đề yếu ở lượt này.</p>
                    ) : (
                      <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        {diagnostics.weakCategories.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
                    <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                      <FileCode2 className="w-3.5 h-3.5" /> File code cần đọc lại
                    </div>
                    {diagnostics.filesToReread.length === 0 ? (
                      <p className="mt-1 text-slate-600 dark:text-slate-300">Không có file nào bị vướng.</p>
                    ) : (
                      <ul className="list-disc pl-4 mt-1 font-mono space-y-0.5">
                        {diagnostics.filesToReread.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <div className="font-bold text-slate-600 dark:text-slate-300">Câu hỏi cần luyện thêm</div>
                    {diagnostics.weakQuestions.length === 0 ? (
                      <p className="mt-1 text-slate-500">Bạn đã nắm chắc cả 5 câu trong đề này.</p>
                    ) : (
                      <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        {diagnostics.weakQuestions.map((wq) => (
                          <li key={wq.id} className="line-clamp-1">{wq.question}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Per-question Review & Self-Scoring */}
              <div className="space-y-4">
                {examQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-bold text-[#2563EB]">
                        Câu {idx + 1} · Nhóm {q.category} ({q.qType} · {q.difficulty})
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-slate-500 mr-1">Tự chấm:</span>
                        {[0, 0.25, 0.5, 0.75, 1].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              setScores((prev) => ({ ...prev, [q.id]: val }));
                              setSavedCurrentAttempt(false);
                            }}
                            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                              scores[q.id] === val
                                ? 'bg-[#2563EB] text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold">{q.question}</h3>
                    {userNotes[q.id] && (
                      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 text-xs">
                        <strong className="text-[#2563EB]">Ghi chú trả lời của bạn:</strong> {userNotes[q.id]}
                      </div>
                    )}
                    {renderModelAnswer(q)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* TAB 2: QUESTION BANK */}
      {tab === 'bank' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap gap-2.5 text-xs items-center">
            <input
              type="text"
              value={bankQuery}
              onChange={(e) => {
                setBankQuery(e.target.value);
                setBankLimit(40);
              }}
              placeholder="Tìm câu hỏi, ID, file code..."
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 min-w-[190px] flex-1"
            />
            <select
              value={bucketFilter}
              onChange={(e) => {
                setBucketFilter(e.target.value);
                setBankLimit(40);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="ALL">Mọi mảng kiến thức</option>
              <option value="theory">Lý thuyết chuyên sâu</option>
              <option value="code">Đọc hiểu Source Code</option>
              <option value="trace">Truy vết thực thi</option>
              <option value="scenario">Tình huống &amp; Thay đổi dữ liệu</option>
              <option value="critique">Phản biện &amp; Câu hỏi gài</option>
              <option value="storytelling">Storytelling &amp; KPI</option>
            </select>
            <select
              value={catFilter}
              onChange={(e) => {
                setCatFilter(e.target.value);
                setBankLimit(40);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="ALL">Tất cả 10 nhóm (A–J)</option>
              {VIVA_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <select
              value={diffFilter}
              onChange={(e) => {
                setDiffFilter(e.target.value);
                setBankLimit(40);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="ALL">Mọi mức độ</option>
              <option value="Cơ bản">Cơ bản</option>
              <option value="Vận dụng">Vận dụng</option>
              <option value="Nâng cao">Nâng cao</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setBankLimit(40);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="ALL">Mọi dạng câu hỏi</option>
              {['Kiến thức', 'Giải thích', 'Vận dụng', 'Tại sao', 'Đọc hiểu code', 'Truy vết', 'Tình huống', 'Phản biện', 'Phân tích kết quả', 'Câu hỏi gài'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <span className="ml-auto self-center font-semibold text-slate-500">
              Hiển thị {visibleBank.length} / {filteredBank.length} khớp ({ALL_VIVA_QUESTIONS.length} tổng)
            </span>
          </div>

          <div className="space-y-3">
            {visibleBank.map((q) => {
              const open = expandedBankId === q.id;
              const practiced = progress.practicedVivaIds.includes(q.id);
              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-[#14243A] text-white font-bold">
                          Nhóm {q.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] font-semibold">
                          {q.qType}
                        </span>
                        <span className={`px-2 py-0.5 rounded font-semibold ${
                          q.difficulty === 'Nâng cao'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : q.difficulty === 'Vận dụng'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-[#E7F6F2] text-[#0F9D8A] dark:bg-teal-950/60'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="font-mono text-slate-400">{q.relatedFiles.join(', ')}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold">{q.question}</h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onTogglePracticed(q.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          practiced
                            ? 'bg-[#0F9D8A] text-white'
                            : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {practiced ? 'Đã luyện ✓' : 'Đánh dấu đã luyện'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpandedBankId(open ? null : q.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold cursor-pointer"
                      >
                        {open ? 'Thu gọn' : 'Đáp án mẫu (A–F)'}
                      </button>
                    </div>
                  </div>

                  {open && (
                    <div className="space-y-3 pt-2">
                      {q.codeBlock && (
                        <CodeBlock code={q.codeBlock.code} title={`${q.codeBlock.file} (${q.codeBlock.lines ?? ''})`} />
                      )}
                      {q.figureRef && (
                        <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-center">
                          <img src={getFigureUrl(q.figureRef)} alt={q.figureRef} className="max-h-72 w-auto object-contain" />
                        </div>
                      )}
                      {renderModelAnswer(q)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {visibleBank.length < filteredBank.length && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setBankLimit((n) => n + 50)}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#2563EB] text-xs font-bold cursor-pointer"
              >
                Xem thêm 50 câu ({filteredBank.length - visibleBank.length} câu còn lại)
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: HISTORY */}
      {tab === 'history' && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <h2 className="text-base font-bold flex items-center gap-2">
            <History className="w-4 h-4 text-[#2563EB]" /> Lịch sử các lượt thi mô phỏng
          </h2>
          {progress.vivaHistory.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Chưa có lượt thi nào được lưu. Hãy hoàn thành 1 lượt ở tab &ldquo;Thi mô phỏng&rdquo; và bấm Lưu!
            </div>
          ) : (
            <div className="space-y-2.5">
              {progress.vivaHistory.map((h) => (
                <div
                  key={h.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-sm">
                      Điểm tự đánh giá: {h.totalScore.toFixed(2)} / {h.maxScore}.00
                      <span className="ml-2 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] uppercase">
                        {h.mode}
                      </span>
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      {new Date(h.timestamp).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  {h.weakCategories.length > 0 ? (
                    <div className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Cần ôn: {h.weakCategories.join('; ')}</span>
                    </div>
                  ) : (
                    <div className="text-[#0F9D8A] font-semibold">Vững toàn bộ 5 câu!</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

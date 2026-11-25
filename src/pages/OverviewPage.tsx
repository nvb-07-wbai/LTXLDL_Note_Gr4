import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Swords,
  BookOpen,
  Layers,
  CheckSquare,
  Workflow,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { PROJECT_META } from '../data/projectData';
import { ALL_LESSONS } from '../data/lessons';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { ALL_VIVA_QUESTIONS } from '../data/viva';
import type { StudyProgressState } from '../types';

interface OverviewPageProps {
  progress: StudyProgressState;
  onResetProgress: () => void;
}

export function OverviewPage({ progress, onResetProgress }: OverviewPageProps) {
  const navigate = useNavigate();
  const [showQotdAnswer, setShowQotdAnswer] = useState(false);

  const daySeed = new Date().getDate() + new Date().getMonth() * 31;
  const questionOfDay = ALL_VIVA_QUESTIONS[daySeed % ALL_VIVA_QUESTIONS.length];

  const stats = useMemo(() => {
    const lessonsDone = progress.completedLessons.length;
    const cardsDone = progress.rememberedFlashcards.length;
    const quizDone = progress.completedQuizIds.length;
    const vivaDone = progress.practicedVivaIds.length;

    const chartData = [
      { name: 'Lý thuyết', pct: Math.round((lessonsDone / ALL_LESSONS.length) * 100), raw: `${lessonsDone}/${ALL_LESSONS.length}` },
      { name: 'Flashcard', pct: Math.round((cardsDone / FLASHCARDS_DATA.length) * 100), raw: `${cardsDone}/${FLASHCARDS_DATA.length}` },
      { name: 'Quiz', pct: Math.round((quizDone / QUIZZES_DATA.length) * 100), raw: `${quizDone}/${QUIZZES_DATA.length}` },
      { name: 'Vấn đáp', pct: Math.round((vivaDone / ALL_VIVA_QUESTIONS.length) * 100), raw: `${vivaDone}/${ALL_VIVA_QUESTIONS.length}` },
    ];

    const incompleteLessons = ALL_LESSONS.filter(
      (l) => !progress.completedLessons.includes(l.id)
    ).slice(0, 4);

    return { lessonsDone, cardsDone, quizDone, vivaDone, chartData, incompleteLessons };
  }, [progress]);

  const latestViva = progress.vivaHistory[0];

  return (
    <div className="space-y-6">
      {/* Hero Workspace Banner */}
      <section className="rounded-2xl bg-gradient-to-br from-[#14243A] via-[#1B3152] to-[#123E4B] text-white p-6 sm:p-8 shadow-lg border border-slate-700/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-[#0F9D8A]/25 text-[#E7F6F2] font-semibold border border-[#0F9D8A]/40">
                {PROJECT_META.course}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 font-medium">
                {PROJECT_META.semester}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 font-mono">
                tag: {PROJECT_META.finalTag} ({PROJECT_META.verifiedCommit.slice(0, 7)})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Inside Airbnb — Mexico City (CDMX) · Nhóm 4
            </h1>
            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
              Không gian ôn tập lý thuyết chuẩn hóa (13 bài), đọc hiểu source code thực tế tại commit{' '}
              <code className="text-[#E7F6F2] font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded">final</code>,
              kiểm chứng số liệu SECTUR CDMX và luyện trả lời phản biện 90 giây/câu.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate('/viva')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F9D8A] hover:bg-[#0c8575] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
              >
                <Swords className="w-4 h-4" />
                <span>Bắt đầu Viva Arena (90s)</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/pipeline')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/15 transition-colors cursor-pointer"
              >
                <Workflow className="w-4 h-4" />
                <span>Khám phá 8 bước Pipeline</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/revision')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/15 transition-colors cursor-pointer"
              >
                <span>Ôn cấp tốc 1 trang</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 sm:w-72">
            <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-300">Mẫu phân công</div>
              <div className="text-xl font-bold mt-0.5">1.000</div>
              <div className="text-[11px] text-[#E7F6F2]">listings × 4 mốc</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-300">Mẫu LLM / Tay</div>
              <div className="text-xl font-bold mt-0.5">1.000 / 100</div>
              <div className="text-[11px] text-amber-200">gemini-3.5-flash-lite</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-300">Ngân hàng Vấn đáp</div>
              <div className="text-xl font-bold mt-0.5">{ALL_VIVA_QUESTIONS.length} câu</div>
              <div className="text-[11px] text-slate-300">10 nhóm A–J</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-300">Điểm thi gần nhất</div>
              <div className="text-xl font-bold mt-0.5">
                {latestViva ? `${latestViva.totalScore.toFixed(1)}/5` : 'Chưa thi'}
              </div>
              <div className="text-[11px] text-slate-300">
                {latestViva ? latestViva.mode.toUpperCase() : 'Hãy thử 1 lượt'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Telemetry Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold">Tiến độ học tập (lưu tự động trên trình duyệt)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cập nhật gần nhất: {new Date(progress.lastStudiedAt).toLocaleString('vi-VN')}
              </p>
            </div>
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Đặt lại
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" /> Bài học
              </div>
              <div className="text-lg font-bold mt-1">
                {stats.lessonsDone}/{ALL_LESSONS.length}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Layers className="w-3.5 h-3.5 text-[#0F9D8A]" /> Flashcard nhớ
              </div>
              <div className="text-lg font-bold mt-1">
                {stats.cardsDone}/{FLASHCARDS_DATA.length}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckSquare className="w-3.5 h-3.5 text-amber-500" /> Quiz đã làm
              </div>
              <div className="text-lg font-bold mt-1">
                {stats.quizDone}/{QUIZZES_DATA.length}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Swords className="w-3.5 h-3.5 text-rose-500" /> Câu vấn đáp
              </div>
              <div className="text-lg font-bold mt-1">
                {stats.vivaDone}/{ALL_VIVA_QUESTIONS.length}
              </div>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} layout="vertical" margin={{ left: 10, right: 24, top: 4, bottom: 4 }}>
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={78} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number, _n: string, item: { payload?: { raw?: string } }) => [
                    `${value}% (${item?.payload?.raw ?? ''})`,
                    'Hoàn thành',
                  ]}
                />
                <Bar dataKey="pct" fill="#0F9D8A" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Question of the Day */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                <Sparkles className="w-3.5 h-3.5" /> Câu hỏi luyện tập trong ngày
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                {questionOfDay.difficulty}
              </span>
            </div>
            <p className="text-sm font-semibold text-[#14243A] dark:text-slate-100 leading-snug">
              {questionOfDay.question}
            </p>
            <div className="mt-2 text-xs text-slate-500">
              Nhóm {questionOfDay.category} · {questionOfDay.qType}
            </div>
            {showQotdAnswer && (
              <div className="mt-3 p-3 rounded-xl bg-[#E7F6F2] dark:bg-teal-950/50 border border-[#0F9D8A]/30 text-xs text-slate-800 dark:text-slate-200 space-y-1.5">
                <div className="font-bold text-[#0F9D8A]">Trả lời nhanh:</div>
                <p>{questionOfDay.quickAnswer}</p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  File: {questionOfDay.relatedFiles.join(', ')}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowQotdAnswer((v) => !v)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              {showQotdAnswer ? 'Ẩn đáp án' : 'Xem đáp án mẫu'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/viva?q=${questionOfDay.id}`)}
              className="px-3 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
            >
              Mở trong Arena
            </button>
          </div>
        </div>
      </div>

      {/* Incomplete Items & Core Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#F2B544]" /> Nội dung chưa hoàn thành
            </h2>
            <button
              type="button"
              onClick={() => navigate('/theory')}
              className="text-xs text-[#2563EB] font-semibold hover:underline cursor-pointer"
            >
              Xem tất cả 13 bài
            </button>
          </div>
          {stats.incompleteLessons.length === 0 ? (
            <div className="p-4 rounded-xl bg-[#E7F6F2] dark:bg-teal-950/40 text-sm text-[#0F9D8A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Bạn đã đánh dấu hoàn thành toàn bộ 13 bài lý thuyết!
            </div>
          ) : (
            <div className="space-y-2">
              {stats.incompleteLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => navigate(`/theory?lesson=${lesson.id}`)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-[#2563EB] bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#2563EB]">{lesson.number} · {lesson.relevance}</div>
                    <div className="text-sm font-semibold truncate">{lesson.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <h2 className="text-base font-bold mb-3">Các trụ cột trọng tâm khi vấn đáp 10 phút</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { title: '1. Lọc Google Sheet & Chunksize', desc: 'Lọc review theo id, ép dtype="string", set O(1)', to: '/pipeline?stage=filter' },
              { title: '2. Triết lý Gắn cờ QA', desc: '8 quy tắc, bảo toàn NaN, mốc t2 khuyết 100% giá', to: '/kpi-qa?tab=qa' },
              { title: '3. Công thức KPI & Ghost t1 vs t2', desc: 'PPG, rIQR, RV, Occ30/60, Urgency Gap', to: '/kpi-qa?tab=kpi' },
              { title: '4. LLM Cache & Macro F1', desc: 'gemini-3.5-flash-lite, --skip-llm, 0.991 vs 0.522', to: '/llm-baseline' },
              { title: '5. Storytelling & Mean vs Median', desc: 'Cuauhtémoc 2 căn >153k, Tlalpan vs Coyoacán', to: '/storytelling' },
              { title: '6. Đối chiếu Code vs Báo cáo', desc: 'Điểm lệch tag final so với AI_USAGE / PDF', to: '/project' },
            ].map((topic) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => navigate(topic.to)}
                className="text-left p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-[#0F9D8A] bg-slate-50/60 dark:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-[#14243A] dark:text-slate-100">{topic.title}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{topic.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

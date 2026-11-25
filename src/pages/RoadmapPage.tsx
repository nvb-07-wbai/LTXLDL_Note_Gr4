import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, Clock, Target } from 'lucide-react';
import { ALL_LESSONS } from '../data/lessons';
import type { StudyProgressState } from '../types';

interface RoadmapPageProps {
  progress: StudyProgressState;
}

export function RoadmapPage({ progress }: RoadmapPageProps) {
  const navigate = useNavigate();

  const phases = [
    {
      step: 'Chặng 1',
      title: 'Nắm vững nền tảng Python, NumPy, pandas & Truy xuất dữ liệu',
      duration: 'Ngày 1–2',
      goal: 'Không bị hổng các câu hỏi cơ bản (dữ liệu thiếu None/NaN, .loc/.iloc, Index Alignment, dtype string cho ID, chunksize, Regex).',
      lessons: ['bai-01', 'bai-02', 'bai-03', 'bai-04', 'bai-05', 'bai-06', 'bai-07', 'bai-08'],
      actions: [
        { label: 'Mở Theory Notes (Bài 1–8)', to: '/theory' },
        { label: 'Ôn Flashcards nền tảng', to: '/flashcards' },
      ],
    },
    {
      step: 'Chặng 2',
      title: 'Làm chủ Code Pipeline BTL Nhóm 4 tại tag final',
      duration: 'Ngày 3–4',
      goal: 'Đọc thông suốt luồng 8 file src/*.py, hiểu từng dòng hàm trọng tâm (Download backoff, Filter Google Sheet, 8 QA rules, 6 KPI, LLM Pydantic & Cache, Baseline Regex).',
      lessons: ['bai-10', 'bai-11'],
      actions: [
        { label: 'Data Pipeline Explorer', to: '/pipeline' },
        { label: 'KPI & QA Dictionary', to: '/kpi-qa' },
        { label: 'LLM & Baseline Deep Dive', to: '/llm-baseline' },
      ],
    },
    {
      step: 'Chặng 3',
      title: 'Tư duy Trực quan hóa, Kể chuyện & Phản biện số liệu',
      duration: 'Ngày 5',
      goal: 'Giải thích được cả 8 biểu đồ PNG, bảo vệ được câu chuyện SECTUR CDMX, nắm rõ giới hạn mẫu 1.000 căn và bẫy Mean vs Median / Tương quan vs Nhân quả.',
      lessons: ['bai-12', 'bai-13', 'bai-14'],
      actions: [
        { label: 'Data Storytelling & 8 Biểu đồ', to: '/storytelling' },
        { label: 'Audit Code vs Report', to: '/project' },
      ],
    },
    {
      step: 'Chặng 4',
      title: 'Luyện phản xạ 90 giây trong Viva Arena & Quiz tương tác',
      duration: 'Ngày 6–7',
      goal: 'Trả lời độc lập mọi câu hỏi ngẫu nhiên trong giới hạn 90 giây (Strict Viva Mode), lấp các chủ đề còn yếu.',
      lessons: [],
      actions: [
        { label: 'Vào Viva Arena (Strict 90s)', to: '/viva' },
        { label: 'Làm 9 dạng Quiz tương tác', to: '/quiz' },
        { label: 'Checklist Quick Revision', to: '/revision' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Study Roadmap — Lộ trình ôn thi 4 chặng</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Lộ trình tuần tự từ lý thuyết môn học (UET.DSE2049) tới đọc hiểu từng dòng code và phản biện 90 giây.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A] text-xs font-semibold">
            <Clock className="w-4 h-4" />
            <span>Mục tiêu: Vấn đáp 10 phút · 5 câu × 90 giây</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseLessons = ALL_LESSONS.filter((l) => phase.lessons.includes(l.id));
          const doneCount = phaseLessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;

          return (
            <div
              key={phase.step}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                    <span>{phase.step}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[#0F9D8A]">{phase.duration}</span>
                  </div>
                  <h2 className="text-lg font-bold mt-1">{phase.title}</h2>
                </div>
                {phaseLessons.length > 0 && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    {doneCount}/{phaseLessons.length} bài đã xong
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2 mb-4">
                <Target className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                <span>{phase.goal}</span>
              </p>

              {phaseLessons.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                  {phaseLessons.map((lesson) => {
                    const done = progress.completedLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => navigate(`/theory?lesson=${lesson.id}`)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-colors cursor-pointer flex items-start gap-2 ${
                          done
                            ? 'bg-[#E7F6F2]/60 dark:bg-teal-950/30 border-[#0F9D8A]/40'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-[#2563EB]'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <div className="font-bold">{lesson.number}</div>
                          <div className="text-slate-600 dark:text-slate-300 line-clamp-1">{lesson.title}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {phase.actions.map((act) => (
                  <button
                    key={act.to}
                    type="button"
                    onClick={() => navigate(act.to)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>{act.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

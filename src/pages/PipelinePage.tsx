import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Play,
  ArrowRight,
  FileCode2,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  BookOpen,
  MessageSquareWarning,
} from 'lucide-react';
import { PIPELINE_STAGES } from '../data/pipelineData';
import { CodeBlock } from '../components/CodeBlock';

export function PipelinePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stageParam = searchParams.get('stage');
  const [activeId, setActiveId] = useState<string>(
    PIPELINE_STAGES.some((s) => s.id === stageParam) ? (stageParam as string) : PIPELINE_STAGES[0].id
  );
  const [animating, setAnimating] = useState(false);

  // Interactive Parameter Sandbox states
  const [simBatchSize, setSimBatchSize] = useState(5);
  const [simStaleDays, setSimStaleDays] = useState(90);
  const [simExcludeGhost, setSimExcludeGhost] = useState(true);

  useEffect(() => {
    if (stageParam && PIPELINE_STAGES.some((s) => s.id === stageParam)) {
      setActiveId(stageParam);
    }
  }, [stageParam]);

  const stage = PIPELINE_STAGES.find((s) => s.id === activeId) ?? PIPELINE_STAGES[0];

  const selectStage = (id: string) => {
    setActiveId(id);
    setSearchParams({ stage: id });
  };

  const runFlowAnimation = () => {
    if (animating) return;
    setAnimating(true);
    let idx = 0;
    setActiveId(PIPELINE_STAGES[0].id);
    const timer = window.setInterval(() => {
      idx += 1;
      if (idx >= PIPELINE_STAGES.length) {
        window.clearInterval(timer);
        setAnimating(false);
        return;
      }
      setActiveId(PIPELINE_STAGES[idx].id);
    }, 650);
  };

  // Derived reasoning for sandbox
  const simApiRequests = Math.ceil(1000 / simBatchSize);
  const simPromptTokensSaved = Math.round((1 - 1 / simBatchSize) * 100);

  return (
    <div className="space-y-6">
      {/* Interactive Pipeline Diagram */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">
              Data Pipeline Explorer & Code Playground
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Nguồn: Inside Airbnb + Google Sheets → 8 mô-đun Python thực thi qua <code>run_pipeline.py</code> → Report
            </p>
          </div>
          <button
            type="button"
            onClick={runFlowAnimation}
            disabled={animating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F9D8A] hover:bg-[#0c8575] disabled:opacity-60 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{animating ? 'Đang chạy luồng...' : 'Mô phỏng luồng dữ liệu'}</span>
          </button>
        </div>

        {/* Visual Flow Chain */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center gap-1.5 min-w-[780px]">
            {PIPELINE_STAGES.map((item, idx) => {
              const active = item.id === stage.id;
              return (
                <div key={item.id} className="flex items-center gap-1.5 flex-1">
                  <button
                    type="button"
                    onClick={() => selectStage(item.id)}
                    className={`w-full text-center px-2.5 py-3 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md scale-[1.03]'
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-[#0F9D8A]'
                    }`}
                  >
                    <div className={`text-[10px] font-bold uppercase ${active ? 'text-blue-100' : 'text-[#0F9D8A]'}`}>
                      B{item.order}
                    </div>
                    <div className="text-xs font-bold mt-0.5 truncate">{item.shortName}</div>
                    <div className={`text-[10px] font-mono mt-0.5 truncate ${active ? 'text-blue-100' : 'text-slate-400'}`}>
                      {item.filePath.replace('src/', '')}
                    </div>
                  </button>
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Split-pane: Stage Metadata + Code Playground */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Detailed Specification */}
        <div className="xl:col-span-6 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-extrabold">{stage.name}</h2>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs text-[#2563EB]">
                {stage.filePath}
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{stage.goal}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <div className="font-bold text-slate-500 uppercase mb-1">Input</div>
                <ul className="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                  {stage.inputs.map((inp) => (
                    <li key={inp}>{inp}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30 border border-[#0F9D8A]/30">
                <div className="font-bold text-[#0F9D8A] uppercase mb-1">Output</div>
                <ul className="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                  {stage.outputs.map((out) => (
                    <li key={out}>{out}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="font-bold text-slate-500 mb-1">Hàm chính</div>
                <div className="flex flex-wrap gap-1.5">
                  {stage.mainFunctions.map((fn) => (
                    <code key={fn} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">
                      {fn}
                    </code>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-500 mb-1">Thư viện</div>
                <div className="flex flex-wrap gap-1.5">
                  {stage.libraries.map((lib) => (
                    <span key={lib} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-300 font-medium text-[11px]">
                      {lib}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">
                Nguyên lý hoạt động
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
                {stage.mechanism.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 text-xs">
              <div className="font-bold text-[#2563EB] mb-1">Lý do lựa chọn thiết kế</div>
              <p className="text-slate-700 dark:text-slate-300">{stage.rationale}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 text-xs space-y-1">
              <div className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Rủi ro nếu triển khai sai
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                {stage.risksIfWrong.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 text-xs">
              <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Cách kiểm tra kết quả
              </div>
              <p className="text-slate-700 dark:text-slate-300">{stage.verification}</p>
            </div>
          </div>
        </div>

        {/* Right: Code Playground & Parameter Sandbox */}
        <div className="xl:col-span-6 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[#0F9D8A]" /> Code Playground ({stage.codeSnippet.lines})
              </h3>
              <span className="text-[11px] text-slate-400">Trích từ tag final</span>
            </div>

            <CodeBlock code={stage.codeSnippet.code} title={stage.codeSnippet.title} />

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Giải thích từng khối logic
              </div>
              {stage.codeSnippet.annotations.map((ann) => (
                <div
                  key={ann.label}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs"
                >
                  <span className="font-mono font-bold text-[#2563EB] dark:text-blue-400">
                    {ann.label}:{' '}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{ann.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Theory & Viva Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs space-y-1.5">
              <div className="font-bold text-[#2563EB] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Lý thuyết liên quan
              </div>
              {stage.theoryRefs.map((t) => (
                <p key={t} className="text-slate-600 dark:text-slate-300">• {t}</p>
              ))}
            </div>
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs space-y-1.5">
              <div className="font-bold text-rose-500 flex items-center gap-1.5">
                <MessageSquareWarning className="w-3.5 h-3.5" /> Câu hỏi vấn đáp mẫu
              </div>
              {stage.vivaQuestions.map((vq) => (
                <p key={vq} className="text-slate-600 dark:text-slate-300">• {vq}</p>
              ))}
            </div>
          </div>

          {/* Interactive Parameter Sandbox */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0F9D8A]" />
              <h3 className="text-sm font-bold">
                Mô phỏng tác động khi thay đổi tham số <code>configs/mexico-city.yaml</code>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <label className="font-semibold block">
                  llm.batch_size: <span className="text-[#2563EB] font-mono">{simBatchSize}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={simBatchSize}
                  onChange={(e) => setSimBatchSize(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
                <div className="text-slate-600 dark:text-slate-300">
                  → Cần <strong>{simApiRequests}</strong> requests cho 1.000 review (tiết kiệm ~{simPromptTokensSaved}% token lặp prompt hướng dẫn; nhưng batch quá lớn dễ sót ID/lỗi JSON).
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <label className="font-semibold block">
                  kpi.stale_review_days: <span className="text-[#0F9D8A] font-mono">{simStaleDays}</span>
                </label>
                <input
                  type="range"
                  min={30}
                  max={180}
                  step={30}
                  value={simStaleDays}
                  onChange={(e) => setSimStaleDays(Number(e.target.value))}
                  className="w-full accent-[#0F9D8A]"
                />
                <div className="text-slate-600 dark:text-slate-300">
                  → Chỉ ảnh hưởng mốc đầu <strong>t1</strong>: tăng ngưỡng ngày làm tiêu chuẩn khắt khe hơn nên <strong>Ghost Rate t1 {simStaleDays > 90 ? 'giảm xuống' : simStaleDays < 90 ? 'tăng lên' : 'giữ mức 0.7% (7/1000)'}</strong>; t2–t4 dùng <code>RV == 0</code> nên không đổi.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <label className="font-semibold flex items-center justify-between">
                  <span>kpi.exclude_ghost</span>
                  <input
                    type="checkbox"
                    checked={simExcludeGhost}
                    onChange={(e) => setSimExcludeGhost(e.target.checked)}
                    className="accent-[#2563EB] w-4 h-4"
                  />
                </label>
                <div className="text-slate-600 dark:text-slate-300">
                  {simExcludeGhost ? (
                    <span>
                      <strong>True (Mặc định):</strong> Loại căn ghost == 1 và &lt;NA&gt; trước khi tính Occupancy. Tại t1 có <code>occ_n = 993</code> (bỏ 7 căn ghost).
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400">
                      <strong>False:</strong> Giữ cả căn đóng băng (a30=0, a90=0) vào phép tính -&gt; thổi phồng giả tạo tỷ lệ kín phòng Occ_1-30 &amp; Occ_31-90!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

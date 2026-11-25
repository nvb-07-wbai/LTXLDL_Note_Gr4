import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Play,
  ArrowRight,
  FileCode2,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  BookOpen,
  MessageSquareWarning,
  GitBranch,
  Code2,
  StepForward,
  StepBack,
  RotateCcw,
  Search,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { PIPELINE_STAGES } from '../data/pipelineData';
import {
  ALL_CODEBASE_FUNCTIONS,
  CODE_TRACE_SCENARIOS,
  MODULE_DEPENDENCY_GRAPH,
} from '../data/codebase';
import { CodeBlock } from '../components/CodeBlock';

type PipelineTab = 'stages' | 'deps' | 'functions' | 'trace';

const STAGE_TO_LESSON: Record<string, { id: string; label: string }> = {
  download: { id: 'bai-06', label: 'Bài 6: HTTP, API & CSV.GZ' },
  filter: { id: 'bai-06', label: 'Bài 6: Chunksize & String ID' },
  qa: { id: 'bai-10', label: 'Bài 10: Làm sạch & QA Flagging' },
  llm: { id: 'bai-11', label: 'Bài 11: LLM Structured Output & Cache' },
  baseline: { id: 'bai-07', label: 'Bài 7: Regex & Chuỗi văn bản' },
  evaluate: { id: 'bai-11', label: 'Bài 11: Precision, Recall & F1' },
  kpi: { id: 'bai-05', label: 'Bài 5: GroupBy, Merge & Vectorization' },
  viz: { id: 'bai-13', label: 'Bài 13: Trực quan hóa nâng cao' },
  report: { id: 'bai-14', label: 'Bài 14: Data Storytelling' },
};

const FILE_LIST = [
  'ALL',
  'run_pipeline.py',
  'src/download.py',
  'src/filter_data_from_sheet.py',
  'src/qa.py',
  'src/llm.py',
  'src/baseline.py',
  'src/evaluate.py',
  'src/kpi.py',
  'src/viz.py',
];

export function PipelinePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab') as PipelineTab | null;
  const stageParam = searchParams.get('stage');
  const fileParam = searchParams.get('file');
  const fnParam = searchParams.get('fn');

  const [tab, setTab] = useState<PipelineTab>(
    tabParam && ['stages', 'deps', 'functions', 'trace'].includes(tabParam) ? tabParam : 'stages'
  );
  const [activeId, setActiveId] = useState<string>(
    PIPELINE_STAGES.some((s) => s.id === stageParam) ? (stageParam as string) : PIPELINE_STAGES[0].id
  );
  const [animating, setAnimating] = useState(false);

  // Parameter Sandbox
  const [simBatchSize, setSimBatchSize] = useState(5);
  const [simStaleDays, setSimStaleDays] = useState(90);
  const [simExcludeGhost, setSimExcludeGhost] = useState(true);

  // Dependency Explorer state
  const [selectedDepId, setSelectedDepId] = useState<string>(MODULE_DEPENDENCY_GRAPH[1].id);

  // Function Explorer (A–J) state
  const [fnFileFilter, setFnFileFilter] = useState<string>(
    fileParam && FILE_LIST.includes(fileParam) ? fileParam : 'ALL'
  );
  const [fnSearch, setFnSearch] = useState('');
  const [selectedFnId, setSelectedFnId] = useState<string>(
    fnParam && ALL_CODEBASE_FUNCTIONS.some((f) => f.id === fnParam)
      ? fnParam
      : ALL_CODEBASE_FUNCTIONS[0].id
  );
  const [revealedFnViva, setRevealedFnViva] = useState<Record<string, boolean>>({});

  // Code Trace Mode state
  const [selectedTraceId, setSelectedTraceId] = useState<string>(CODE_TRACE_SCENARIOS[0].id);
  const [traceStepIdx, setTraceStepIdx] = useState<number>(0);
  const [predictChoice, setPredictChoice] = useState<number | null>(null);
  const [predictChecked, setPredictChecked] = useState<boolean>(false);

  useEffect(() => {
    if (tabParam && ['stages', 'deps', 'functions', 'trace'].includes(tabParam)) {
      setTab(tabParam);
    }
    if (stageParam && PIPELINE_STAGES.some((s) => s.id === stageParam)) {
      setActiveId(stageParam);
    }
    if (fileParam && FILE_LIST.includes(fileParam)) {
      setFnFileFilter(fileParam);
    }
    if (fnParam && ALL_CODEBASE_FUNCTIONS.some((f) => f.id === fnParam)) {
      setSelectedFnId(fnParam);
    }
  }, [tabParam, stageParam, fileParam, fnParam]);

  const stage = PIPELINE_STAGES.find((s) => s.id === activeId) ?? PIPELINE_STAGES[0];
  const activeDep =
    MODULE_DEPENDENCY_GRAPH.find((d) => d.id === selectedDepId) ?? MODULE_DEPENDENCY_GRAPH[1];

  const filteredFunctions = useMemo(() => {
    const q = fnSearch.trim().toLowerCase();
    return ALL_CODEBASE_FUNCTIONS.filter((f) => {
      if (fnFileFilter !== 'ALL' && f.file !== fnFileFilter) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.file.toLowerCase().includes(q) ||
        f.purpose.toLowerCase().includes(q) ||
        f.signature.toLowerCase().includes(q)
      );
    });
  }, [fnFileFilter, fnSearch]);

  const activeFn =
    filteredFunctions.find((f) => f.id === selectedFnId) ??
    ALL_CODEBASE_FUNCTIONS.find((f) => f.id === selectedFnId) ??
    filteredFunctions[0] ??
    ALL_CODEBASE_FUNCTIONS[0];

  const activeTrace =
    CODE_TRACE_SCENARIOS.find((t) => t.id === selectedTraceId) ?? CODE_TRACE_SCENARIOS[0];
  const safeTraceStep = activeTrace.steps[Math.min(traceStepIdx, activeTrace.steps.length - 1)];

  const switchTab = (next: PipelineTab) => {
    setTab(next);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tab', next);
    setSearchParams(nextParams);
  };

  const selectStage = (id: string) => {
    setActiveId(id);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tab', 'stages');
    nextParams.set('stage', id);
    setSearchParams(nextParams);
  };

  const openFileFunctions = (file: string, fnNameHint?: string) => {
    setFnFileFilter(file);
    const cleanHint = fnNameHint?.replace(/\(\)$/, '').trim();
    const match =
      ALL_CODEBASE_FUNCTIONS.find((f) => f.file === file && f.name === cleanHint) ??
      ALL_CODEBASE_FUNCTIONS.find((f) => f.file === file);
    if (match) setSelectedFnId(match.id);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tab', 'functions');
    nextParams.set('file', file);
    if (match) nextParams.set('fn', match.id);
    setSearchParams(nextParams);
    setTab('functions');
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

  const simApiRequests = Math.ceil(1000 / simBatchSize);
  const simPromptTokensSaved = Math.round((1 - 1 / simBatchSize) * 100);

  const stageFileFunctions = ALL_CODEBASE_FUNCTIONS.filter((f) => f.file === stage.filePath);

  return (
    <div className="space-y-6">
      {/* Header + 4-Mode Switcher */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">
              Data Pipeline &amp; 100% Source Code Explorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Bao phủ đủ <strong>8 mô-đun Python + Báo cáo (9 chặng)</strong> ·{' '}
              <strong>{ALL_CODEBASE_FUNCTIONS.length} hàm/class chuẩn A–J</strong> ·{' '}
              <strong>Dependency Graph</strong> · <strong>{CODE_TRACE_SCENARIOS.length} kịch bản Code Trace</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs">
            {[
              { id: 'stages', label: '1. Tổng quan 9 chặng', icon: Layers },
              { id: 'deps', label: '2. Dependency Explorer', icon: GitBranch },
              { id: 'functions', label: `3. Soi 83 Hàm (A–J)`, icon: Code2 },
              { id: 'trace', label: `4. Code Trace (${CODE_TRACE_SCENARIOS.length})`, icon: StepForward },
            ].map((tItem) => {
              const Icon = tItem.icon;
              return (
                <button
                  key={tItem.id}
                  type="button"
                  onClick={() => switchTab(tItem.id as PipelineTab)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
                    tab === tItem.id
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tItem.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= TAB 1: STAGES OVERVIEW (9 STAGES) ================= */}
      {tab === 'stages' && (
        <>
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Chọn bất kỳ chặng nào trong 9 chặng (<code>run_pipeline.py</code> chạy B1→B8 tạo ra B9 Báo cáo) hoặc bấm mô phỏng:
              </p>
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

            {/* Responsive Wrap Grid — all B1..B9 visible cleanly without horizontal clipping */}
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
              {PIPELINE_STAGES.map((item) => {
                const active = item.id === stage.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectStage(item.id)}
                    className={`text-left px-2.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-[#0F9D8A]'
                    }`}
                  >
                    <div className={`text-[10px] font-bold uppercase ${active ? 'text-blue-100' : 'text-[#0F9D8A] dark:text-teal-300'}`}>
                      B{item.order}
                    </div>
                    <div className="text-xs font-bold mt-0.5 truncate">{item.shortName}</div>
                    <div className={`text-[10px] font-mono mt-0.5 truncate ${active ? 'text-blue-100' : 'text-slate-400'}`}>
                      {item.filePath.replace('src/', '')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-6 space-y-4">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-extrabold">{stage.name}</h2>
                  <button
                    type="button"
                    onClick={() => openFileFunctions(stage.filePath === 'reports/report.pdf' ? 'run_pipeline.py' : stage.filePath)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 font-mono text-xs text-[#2563EB] dark:text-blue-400 cursor-pointer"
                    title="Mở toàn bộ hàm trong Code Explorer (A–J)"
                  >
                    {stage.filePath} →
                  </button>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{stage.goal}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                    <div className="font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Input</div>
                    <ul className="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                      {stage.inputs.map((inp) => (
                        <li key={inp}>{inp}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30 border border-[#0F9D8A]/30">
                    <div className="font-bold text-[#0F9D8A] dark:text-teal-300 uppercase mb-1">Output</div>
                    <ul className="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                      {stage.outputs.map((out) => (
                        <li key={out}>{out}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Clickable Functions list mapped to 83 A-J Catalog */}
                <div className="text-xs space-y-1.5">
                  <div className="font-bold text-slate-500 dark:text-slate-400">
                    Tất cả hàm trong mô-đun này ({stageFileFunctions.length} hàm — bấm để soi 10 phần A–J):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stageFileFunctions.length > 0 ? (
                      stageFileFunctions.map((fn) => (
                        <button
                          key={fn.id}
                          type="button"
                          onClick={() => openFileFunctions(fn.file, fn.name)}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#2563EB] hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                        >
                          {fn.name}() <span className="opacity-70">L{fn.lineStart}</span>
                        </button>
                      ))
                    ) : (
                      stage.mainFunctions.map((fn) => (
                        <code key={fn} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">
                          {fn}
                        </code>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5">
                    Nguyên lý hoạt động
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
                    {stage.mechanism.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 text-xs">
                  <div className="font-bold text-[#2563EB] dark:text-blue-400 mb-1">Lý do lựa chọn thiết kế</div>
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

            <div className="xl:col-span-6 space-y-4">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-[#0F9D8A] dark:text-teal-300" /> Code Playground ({stage.codeSnippet.lines})
                  </h3>
                  <button
                    type="button"
                    onClick={() => switchTab('trace')}
                    className="text-xs font-bold text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Chạy Code Trace từng dòng →
                  </button>
                </div>

                <CodeBlock code={stage.codeSnippet.code} title={stage.codeSnippet.title} />

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
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

              {/* Clickable Theory & Viva Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-[#2563EB] dark:text-blue-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Lý thuyết liên quan (bấm để học)
                  </div>
                  {STAGE_TO_LESSON[stage.id] && (
                    <button
                      type="button"
                      onClick={() => navigate(`/theory?lesson=${STAGE_TO_LESSON[stage.id].id}`)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 font-semibold hover:underline cursor-pointer flex items-center justify-between"
                    >
                      <span>Mở {STAGE_TO_LESSON[stage.id].label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {stage.theoryRefs.map((t) => (
                    <p key={t} className="text-slate-600 dark:text-slate-300">• {t}</p>
                  ))}
                </div>

                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-rose-500 flex items-center gap-1.5">
                    <MessageSquareWarning className="w-3.5 h-3.5" /> Câu hỏi vấn đáp mẫu
                  </div>
                  {stage.vivaQuestions.map((vq) => (
                    <p key={vq} className="text-slate-600 dark:text-slate-300">• {vq}</p>
                  ))}
                  <button
                    type="button"
                    onClick={() => navigate('/viva')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 font-semibold hover:underline cursor-pointer flex items-center justify-between"
                  >
                    <span>Luyện vấn đáp mô-đun này trong Viva Arena</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Parameter Sandbox */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0F9D8A] dark:text-teal-300" />
                  <h3 className="text-sm font-bold">
                    Mô phỏng tác động khi thay đổi tham số <code>configs/mexico-city.yaml</code>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                    <label className="font-semibold block">
                      llm.batch_size: <span className="text-[#2563EB] dark:text-blue-400 font-mono">{simBatchSize}</span>
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
                      kpi.stale_review_days: <span className="text-[#0F9D8A] dark:text-teal-300 font-mono">{simStaleDays}</span>
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
        </>
      )}

      {/* ================= TAB 2: CODE DEPENDENCY EXPLORER ================= */}
      {tab === 'deps' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <h2 className="text-base font-bold flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#0F9D8A] dark:text-teal-300" /> Đồ thị phụ thuộc thực tế (10 tệp cốt lõi)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <code>configs/mexico-city.yaml</code> cung cấp tham số cho toàn bộ; <code>run_pipeline.py</code> gọi tuần tự 8 script; <code>src/evaluate.py</code> import trực tiếp <code>DEFAULT_ASPECTS</code> từ <code>src/llm.py</code>; <code>src/kpi.py</code> tổng hợp đầu ra của <code>qa.py</code> + <code>llm.py</code>.
            </p>
            <div className="space-y-2">
              {MODULE_DEPENDENCY_GRAPH.map((node) => {
                const active = node.id === activeDep.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedDepId(node.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                      active
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-[#0F9D8A]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-bold truncate">{node.file}</div>
                      <div className={`text-[11px] line-clamp-1 mt-0.5 ${active ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {node.role}
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-extrabold font-mono text-[#2563EB] dark:text-blue-400">{activeDep.file}</h2>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">{activeDep.role}</p>
              </div>
              {activeDep.file !== 'configs/mexico-city.yaml' && (
                <button
                  type="button"
                  onClick={() => openFileFunctions(activeDep.file)}
                  className="px-3 py-1.5 rounded-xl bg-[#0F9D8A] hover:bg-[#0c8575] text-white text-xs font-bold cursor-pointer"
                >
                  Soi toàn bộ hàm A–J của tệp này →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
                <div className="font-bold text-slate-500 dark:text-slate-400 uppercase">Được gọi / import bởi</div>
                {activeDep.calledBy.map((c) => (
                  <div key={c} className="font-mono text-slate-800 dark:text-slate-200">← {c}</div>
                ))}
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 space-y-1.5">
                <div className="font-bold text-[#2563EB] dark:text-blue-400 uppercase">Gọi tới / Import nội bộ</div>
                {activeDep.callsTo.length === 0 ? (
                  <div className="text-slate-500 dark:text-slate-400">Không gọi script Python nào khác (chạy độc lập qua YAML).</div>
                ) : (
                  activeDep.callsTo.map((c) => (
                    <div key={c} className="font-mono text-slate-800 dark:text-slate-200">→ {c}</div>
                  ))
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <div className="font-bold text-slate-500 dark:text-slate-400 uppercase">Dữ liệu đầu vào</div>
                {activeDep.dataIn.map((d) => (
                  <div key={d} className="font-mono text-[11px] text-slate-700 dark:text-slate-300">• {d}</div>
                ))}
              </div>
              <div className="p-3.5 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30 space-y-1">
                <div className="font-bold text-[#0F9D8A] dark:text-teal-300 uppercase">Dữ liệu đầu ra</div>
                {activeDep.dataOut.map((d) => (
                  <div key={d} className="font-mono text-[11px] text-slate-700 dark:text-slate-300">• {d}</div>
                ))}
              </div>
            </div>

            <div className="text-xs space-y-1.5">
              <div className="font-bold text-slate-500 dark:text-slate-400 uppercase">Các hàm trọng tâm (bấm để xem chi tiết)</div>
              <div className="flex flex-wrap gap-1.5">
                {activeDep.keyFunctions.map((fn) => (
                  <button
                    key={fn}
                    type="button"
                    onClick={() => activeDep.file !== 'configs/mexico-city.yaml' && openFileFunctions(activeDep.file, fn)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#2563EB] hover:text-white font-mono text-[11px] cursor-pointer transition-colors"
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 text-xs space-y-1">
              <div className="font-bold text-rose-600 dark:text-rose-400">Các lỗi thường gặp</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                {activeDep.commonErrors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>

            <div className="text-xs">
              <span className="font-bold text-slate-500 dark:text-slate-400">Kiến thức cần nắm: </span>
              <span className="text-slate-700 dark:text-slate-300">{activeDep.requiredKnowledge.join(' · ')}</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: 83 FUNCTIONS A-J EXPLORER ================= */}
      {tab === 'functions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: File + Search + List */}
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={fnSearch}
                onChange={(e) => setFnSearch(e.target.value)}
                placeholder="Tìm tên hàm, tham số, tác dụng..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {FILE_LIST.map((f) => {
                const count =
                  f === 'ALL'
                    ? ALL_CODEBASE_FUNCTIONS.length
                    : ALL_CODEBASE_FUNCTIONS.filter((x) => x.file === f).length;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFnFileFilter(f)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-mono cursor-pointer transition-colors ${
                      fnFileFilter === f
                        ? 'bg-[#2563EB] text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {f.replace('src/', '')} ({count})
                  </button>
                );
              })}
            </div>

            <div className="max-h-[540px] overflow-y-auto space-y-1 pr-1">
              {filteredFunctions.map((fn) => {
                const isSelected = fn.id === activeFn.id;
                return (
                  <button
                    key={fn.id}
                    type="button"
                    onClick={() => setSelectedFnId(fn.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB] text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-mono font-bold">
                      <span className="truncate">{fn.name}{fn.kind === 'class' ? ' (class)' : '()'}</span>
                      <span className={`text-[10px] shrink-0 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        L{fn.lineStart}–{fn.lineEnd}
                      </span>
                    </div>
                    <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {fn.file}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: 10-Part A-J Detail */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A] dark:text-teal-300 font-mono text-xs font-bold">
                  {activeFn.file} · L{activeFn.lineStart}–L{activeFn.lineEnd}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeFn.kind.toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-extrabold font-mono mt-2">
                {activeFn.name}{activeFn.kind === 'function' ? '()' : ''}
              </h2>
            </div>

            {/* A - J Structured Grid */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                <span className="text-[#0F9D8A] font-bold">A. Function Signature: </span>
                <span className="break-all">{activeFn.signature}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50">
                <div className="font-bold text-[#2563EB] dark:text-blue-400 mb-1">B. Mục đích</div>
                <p className="text-slate-800 dark:text-slate-200">{activeFn.purpose}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div className="font-bold text-slate-700 dark:text-slate-200 mb-1.5">C. Luồng thực thi từng bước</div>
                <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                  {activeFn.flow.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase text-xs mb-1">D. Input</div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-mono">{activeFn.input}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30">
                  <div className="font-bold text-[#0F9D8A] dark:text-teal-300 uppercase text-xs mb-1">E. Output</div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{activeFn.output}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">F. Thư viện &amp; Hàm được gọi</div>
                  <div className="flex flex-wrap gap-1">
                    {activeFn.libraries.map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">G. Ví dụ minh họa</div>
                  <p className="font-mono text-[11px] text-slate-800 dark:text-slate-200">{activeFn.example}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200">H. Ứng dụng trong pipeline: </span>
                <span className="text-slate-700 dark:text-slate-300">{activeFn.usage}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 text-xs">
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">I. Lỗi tiềm ẩn / Edge cases</div>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                  {activeFn.potentialBugs.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/50 text-xs space-y-2">
                <div className="font-bold text-amber-800 dark:text-amber-300">J. Vấn đáp trực tiếp cho hàm {activeFn.name}()</div>
                {activeFn.viva.map((v, i) => {
                  const key = `${activeFn.id}-${i}`;
                  const openAns = !!revealedFnViva[key];
                  return (
                    <div key={key} className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 space-y-1.5">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{i + 1}. {v.q}</div>
                      <button
                        type="button"
                        onClick={() => setRevealedFnViva((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className="text-[11px] font-bold text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        {openAns ? 'Ẩn đáp án' : 'Hiện đáp án tự kiểm tra'}
                      </button>
                      {openAns && <p className="text-slate-700 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-800">{v.a}</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            <CodeBlock
              code={activeFn.code}
              title={`${activeFn.file} :: ${activeFn.name} (L${activeFn.lineStart}–L${activeFn.lineEnd})`}
              startLine={activeFn.lineStart}
              maxHeight="max-h-[420px]"
            />
          </div>
        </div>
      )}

      {/* ================= TAB 4: CODE TRACE MODE ================= */}
      {tab === 'trace' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Trace Scenario Selector */}
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2">
            <h2 className="text-sm font-bold px-1">Chọn kịch bản Truy vết Thực thi</h2>
            <div className="space-y-1.5">
              {CODE_TRACE_SCENARIOS.map((sc) => {
                const active = sc.id === activeTrace.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      setSelectedTraceId(sc.id);
                      setTraceStepIdx(0);
                      setPredictChoice(null);
                      setPredictChecked(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-[#0F9D8A]'
                    }`}
                  >
                    <div className="font-bold">{sc.title}</div>
                    <div className={`font-mono text-[10px] mt-0.5 ${active ? 'text-blue-100' : 'text-slate-400'}`}>
                      {sc.file} · {sc.lineRange}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Debugger & Execution Prediction */}
          <div className="lg:col-span-8 space-y-4">
            {/* Step 1: Prediction Before Reveal */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-extrabold">{activeTrace.title}</h2>
                <span className="font-mono text-xs text-[#2563EB] dark:text-blue-400">{activeTrace.file} ({activeTrace.lineRange})</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/50 space-y-2.5 text-xs">
                <div className="font-bold text-amber-800 dark:text-amber-300">Thử thách dự đoán trước khi trace:</div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{activeTrace.predictQuestion}</p>
                <div className="space-y-1.5">
                  {activeTrace.predictOptions.map((opt, idx) => {
                    const chosen = predictChoice === idx;
                    const isAns = idx === activeTrace.correctOptionIndex;
                    let cls = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900';
                    if (predictChecked) {
                      if (isAns) cls = 'border-[#0F9D8A] bg-[#E7F6F2] dark:bg-teal-950/50';
                      else if (chosen) cls = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40';
                    } else if (chosen) {
                      cls = 'border-[#2563EB] bg-blue-50 dark:bg-blue-950/40';
                    }
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={predictChecked}
                        onClick={() => setPredictChoice(idx)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer ${cls}`}
                      >
                        <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={predictChoice === null || predictChecked}
                    onClick={() => setPredictChecked(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white font-bold cursor-pointer"
                  >
                    Kiểm tra dự đoán
                  </button>
                </div>
                {predictChecked && (
                  <p className="text-slate-800 dark:text-slate-100 pt-2 border-t border-amber-200/70 dark:border-amber-800">
                    <strong>Giải thích kết quả:</strong> {activeTrace.predictExplanation}
                  </p>
                )}
              </div>
            </div>

            {/* Step 2: Interactive Line Highlighter + Variable State */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold">
                  Trình truy vết từng dòng — Bước {traceStepIdx + 1} / {activeTrace.steps.length} (Dòng L{safeTraceStep.lineNumber})
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    disabled={traceStepIdx === 0}
                    onClick={() => setTraceStepIdx((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    <StepBack className="w-3.5 h-3.5" /> Lùi
                  </button>
                  <button
                    type="button"
                    disabled={traceStepIdx >= activeTrace.steps.length - 1}
                    onClick={() => setTraceStepIdx((i) => Math.min(activeTrace.steps.length - 1, i + 1))}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0F9D8A] text-white font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Bước tiếp <StepForward className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTraceStepIdx(0)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Đầu
                  </button>
                </div>
              </div>

              <CodeBlock
                code={activeTrace.code}
                title={`${activeTrace.file} (${activeTrace.lineRange})`}
                startLine={activeTrace.startLine}
                highlightLines={safeTraceStep.highlightLines}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
                  <div className="font-bold text-slate-500 dark:text-slate-400 uppercase">Trạng thái biến tại dòng hiện tại</div>
                  {safeTraceStep.variables.map((v) => (
                    <div key={v.name} className="font-mono flex items-start justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-1">
                      <span className="font-bold text-[#2563EB] dark:text-blue-400">{v.name}</span>
                      <span className="text-right text-slate-800 dark:text-slate-200">{v.value} {v.dtype ? `(${v.dtype})` : ''}</span>
                    </div>
                  ))}
                  {safeTraceStep.dfSummary && (
                    <div className="text-[11px] text-[#0F9D8A] dark:text-teal-300 font-semibold pt-1">
                      DataFrame: {safeTraceStep.dfSummary}
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30 border border-[#0F9D8A]/30 space-y-1.5">
                  <div className="font-bold text-[#0F9D8A] dark:text-teal-300 uppercase">Giải thích bước thực thi</div>
                  <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">{safeTraceStep.explanation}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1.5">
                <div className="font-bold text-rose-600 dark:text-rose-400">Nếu thay đổi điều kiện (What-If) thì chuyện gì xảy ra?</div>
                {activeTrace.whatIfVariants.map((w, i) => (
                  <div key={i} className="text-slate-700 dark:text-slate-300">
                    • <strong>{w.condition}</strong> → {w.result}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

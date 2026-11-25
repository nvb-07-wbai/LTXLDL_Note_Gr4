import { useState } from 'react';
import { Maximize2, X, Eye, AlertTriangle, CheckCircle2, Sparkles, Compass } from 'lucide-react';
import { DATA_STORIES, FIGURE_GALLERY, CRITIQUE_SCENARIOS, type FigureGalleryItem } from '../data/storytellingData';
import { getFigureUrl } from '../lib/assetUrl';

export function StorytellingPage() {
  const [selectedStoryId, setSelectedStoryId] = useState(DATA_STORIES[0].id);
  const [zoomFig, setZoomFig] = useState<FigureGalleryItem | null>(null);
  const [openCritiqueIds, setOpenCritiqueIds] = useState<string[]>([]);

  const story = DATA_STORIES.find((s) => s.id === selectedStoryId) ?? DATA_STORIES[0];

  const toggleCritique = (id: string) => {
    setOpenCritiqueIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <span className="text-xs font-bold uppercase tracking-wide text-[#0F9D8A]">
          Bài 14 · Data Storytelling cho SECTUR CDMX
        </span>
        <h1 className="text-2xl font-extrabold mt-1">
          Kể chuyện với Dữ liệu: Mexico City trên đường đến World Cup 2026
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Mạch lập luận chuẩn: <strong>Bối cảnh → Câu hỏi → Phát hiện → Bằng chứng → Phương pháp → Hệ quả → Giới hạn</strong>. Toàn bộ con số đã kiểm chứng từ CSV &amp; report tại tag <code>final</code>.
        </p>
      </div>

      {/* 5 Stories Interactive Tabs */}
      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {DATA_STORIES.map((s) => {
            const active = s.id === story.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedStoryId(s.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#2563EB] dark:border-[#2563EB]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#2563EB]'
                }`}
              >
                {s.title.split(':')[0]}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          <div>
            <div className="text-xs font-bold uppercase text-[#2563EB]">{story.theme}</div>
            <h2 className="text-xl font-extrabold mt-1">{story.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
              <div className="font-bold text-slate-500 uppercase">1. Bối cảnh &amp; Câu hỏi kinh doanh</div>
              <p className="text-slate-700 dark:text-slate-300">{story.context}</p>
              <p className="font-semibold text-[#14243A] dark:text-blue-300 pt-1">
                ❓ {story.businessQuestion}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30 border border-[#0F9D8A]/30 space-y-1.5">
              <div className="font-bold text-[#0F9D8A] uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 2. Phát hiện chính (Big Idea)
              </div>
              <p className="text-sm font-semibold text-[#14243A] dark:text-slate-100 leading-relaxed">
                {story.keyInsight}
              </p>
            </div>
          </div>

          {/* Verified Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {story.keyMetrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
              >
                <div className="text-[11px] text-slate-500">{m.label}</div>
                <div className="text-sm font-extrabold text-[#2563EB] dark:text-blue-400 mt-0.5">
                  {m.value}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">{m.detail}</div>
              </div>
            ))}
          </div>

          {/* Chart Evidence */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold">{story.figureTitle}</span>
                <span className="text-slate-400 ml-2">({story.sampleSize})</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const found = FIGURE_GALLERY.find((f) => f.filename === story.figureFile);
                  if (found) setZoomFig(found);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#2563EB] font-semibold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" /> Phóng to biểu đồ
              </button>
            </div>
            <div className="p-4 flex justify-center bg-white">
              <img
                src={getFigureUrl(story.figureFile)}
                alt={story.figureTitle}
                className="max-h-[430px] w-auto object-contain rounded cursor-zoom-in"
                onClick={() => {
                  const found = FIGURE_GALLERY.find((f) => f.filename === story.figureFile);
                  if (found) setZoomFig(found);
                }}
              />
            </div>
            <div className="px-4 py-2 text-[11px] text-slate-500 flex flex-wrap justify-between gap-2 border-t border-slate-200 dark:border-slate-800">
              <span>Đơn vị: {story.figureUnit}</span>
              <span>Nguồn: {story.dataSource}</span>
            </div>
          </div>

          {/* Method, Conclusion, Stakeholder, Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
              <div className="font-bold text-slate-500 uppercase">Phương pháp &amp; Kết luận</div>
              <p className="text-slate-600 dark:text-slate-300"><strong>Phương pháp:</strong> {story.methodExplanation}</p>
              <p className="text-slate-800 dark:text-slate-100"><strong>Kết luận:</strong> {story.conclusion}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 space-y-1.5">
              <div className="font-bold text-[#2563EB] uppercase flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Hàm ý cho SECTUR CDMX
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {story.stakeholderImplication}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 space-y-1.5">
              <div className="font-bold text-amber-700 dark:text-amber-300 uppercase flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Giới hạn nhận định
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                {story.limitations.map((lim) => (
                  <li key={lim}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Figure Interactive Gallery */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-extrabold">Thư viện 8 Biểu đồ chính thức (`figures/*.png`)</h2>
          <p className="text-xs text-slate-500">
            Nhấn vào bất kỳ biểu đồ nào để phóng to, xem đơn vị, cỡ mẫu, hàm Python sinh biểu đồ và giới hạn diễn giải.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FIGURE_GALLERY.map((fig) => (
            <button
              key={fig.id}
              type="button"
              onClick={() => setZoomFig(fig)}
              className="text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] overflow-hidden shadow-xs transition-all cursor-pointer flex flex-col"
            >
              <div className="h-36 bg-white p-2 flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                <img
                  src={getFigureUrl(fig.filename)}
                  alt={fig.title}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 space-y-1 flex-1">
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A]">
                  {fig.angle}
                </span>
                <div className="text-xs font-bold line-clamp-2 pt-1">{fig.title}</div>
                <div className="text-[11px] font-mono text-slate-400 truncate">{fig.filename}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Chuyên mục Phản biện dữ liệu */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-extrabold">Chuyên mục Phản biện dữ liệu (8 tình huống gài bẫy)</h2>
          <p className="text-xs text-slate-500">
            Tự trả lời trước khi nhấn &ldquo;Xem lập luận &amp; bằng chứng&rdquo;.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CRITIQUE_SCENARIOS.map((c) => {
            const isOpen = openCritiqueIds.includes(c.id);
            return (
              <div
                key={c.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300">
                    {c.trapType}
                  </span>
                  <h3 className="text-sm font-bold mt-2">{c.question}</h3>
                </div>

                {isOpen && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                    <div className="font-bold text-[#0F9D8A] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Kết luận: {c.shortAnswer}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{c.argument}</p>
                    <div>
                      <div className="font-bold text-slate-500">Bằng chứng cần kiểm tra:</div>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                        {c.evidenceToCheck.map((ev) => (
                          <li key={ev}>{ev}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => toggleCritique(c.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#2563EB] text-xs font-semibold cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isOpen ? 'Ẩn phân tích phản biện' : 'Xem lập luận & bằng chứng'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Zoom Modal */}
      {zoomFig && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
          onClick={() => setZoomFig(null)}
        >
          <div
            className="max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#0F9D8A]">{zoomFig.filename} · {zoomFig.generator}</div>
                <h3 className="text-lg font-extrabold mt-0.5">{zoomFig.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomFig(null)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Đóng xem ảnh"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white rounded-xl p-2 flex justify-center border border-slate-200">
              <img
                src={getFigureUrl(zoomFig.filename)}
                alt={zoomFig.title}
                className="max-h-[62vh] w-auto object-contain"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <div><strong>Đơn vị:</strong> {zoomFig.unit}</div>
                <div><strong>Cỡ mẫu:</strong> {zoomFig.sampleSize}</div>
                <div><strong>Nguồn dữ liệu:</strong> {zoomFig.source}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30 space-y-1">
                <div><strong className="text-[#0F9D8A]">Nhận định chính:</strong> {zoomFig.insight}</div>
                <div className="text-amber-700 dark:text-amber-300"><strong>Giới hạn:</strong> {zoomFig.limitation}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

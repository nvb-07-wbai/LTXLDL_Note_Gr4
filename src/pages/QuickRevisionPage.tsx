import { CheckCircle2, Circle, Zap, AlertTriangle, FileCode2 } from 'lucide-react';
import { MathFormula } from '../components/MathFormula';
import { ALL_VIVA_QUESTIONS } from '../data/viva';
import { useNavigate } from 'react-router-dom';

interface QuickRevisionPageProps {
  checkedItems: string[];
  onToggleCheck: (id: string) => void;
}

const CHECKLIST = [
  'Nắm chắc 4 mốc snapshot CDMX (2025-09-27, 2025-12-29, 2026-03-30, 2026-06-15) và thực tế mốc t2 thiếu 100% giá.',
  'Giải thích được cơ chế lọc Google Sheets (reviews lọc theo id, KHÔNG phải listing_id; chunksize=100_000; set O(1); dtype="string").',
  'Thuộc 8 quy tắc QA trong src/qa.py (Gắn cờ giữ NaN, xóa duy nhất bản trùng [id, last_scraped], giữ outlier khi tính KPI).',
  'Viết & giải thích được 6 công thức KPI: PPG, rIQR, Review Velocity, Ghost (t1 vs t2..t4), Occ_1-30 / Occ_31-90 / Urgency Gap, Complaint_aspect.',
  'Phân biệt gemini-3.5-flash-lite (Structured Outputs, batch=5, cache JSONL, --skip-llm, 429 RPM vs RPD) và Baseline Regex tách mệnh đề.',
  'Giải thích được Accuracy (0.85 vs 0.99) và Macro F1 (0.5224 vs 0.9909), 46 lỗi trường, 193 cảnh báo hậu kiểm và chi phí $0.203 vs $349.11.',
  'Trình bày mạch lạc 5 câu chuyện SECTUR CDMX (Cuauhtémoc Mean vs Median, Tlalpan vs Coyoacán, Semana Santa vs World Cup, Mixed complaints).',
  'Nắm rõ các điểm lệch tại tag final: không có validate_cohort_integrity trong qa.py, chưa có reports/data_dictionary.md, report.pdf 18 trang.',
  'Có mặt trước giờ thi 15 phút, mang thẻ SV/CCCD, trả lời dứt khoát 60–90 giây/câu (Kết luận trước -> Giải thích -> Bằng chứng file/số).',
];

export function QuickRevisionPage({ checkedItems, onToggleCheck }: QuickRevisionPageProps) {
  const navigate = useNavigate();
  const top30 = ALL_VIVA_QUESTIONS.slice(0, 30);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#14243A] to-[#0F9D8A] text-white p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#E7F6F2]">
          <Zap className="w-4 h-4" /> Cheat Sheet Ôn tập Cấp tốc
        </div>
        <h1 className="text-2xl font-extrabold mt-1">
          Toàn bộ kiến thức cốt lõi trên một màn hình
        </h1>
        <p className="text-sm text-slate-100/90 mt-1">
          Pipeline 8 bước · Hàm quan trọng · Công thức KPI · Lỗi phải tránh · 30 câu hỏi vàng · Checklist trước giờ G.
        </p>
      </div>

      {/* Pipeline & Core Functions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <h2 className="text-base font-bold flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-[#2563EB]" /> 8 Mô-đun Pipeline &amp; Hàm cốt lõi
          </h2>
          <div className="space-y-2 text-xs">
            {[
              ['1. download.py', 'download(), get_config_path() — HTTP stream, .tmp -> replace, 403/404 thoát sớm, backoff 2^attempt'],
              ['2. filter_data_from_sheet.py', '_read_sheet(), _filter_raw_by_ids() — GViz CSV, chunksize=100_000, set O(1), reviews theo id'],
              ['3. qa.py', 'apply_qa_rules() — 8 quy tắc gắn cờ qa_*, giữ NaN ở *_clean, xuất 32 dòng qa_report.csv'],
              ['4. llm.py', 'build_schemas(), call_llm_batch(), process_pending_reviews() — gemini-3.5-flash-lite, batch=5, cache JSONL, --skip-llm'],
              ['5. baseline.py', 'clean_text(), detect_language(), predict_review_regex() — CLAUSE_RE, BENIGN_RE, NEG_RE, POS_RE'],
              ['6. evaluate.py', 'cot_diem(), f1(), phan_tich_loi(), hau_kiem(), uoc_tinh_chi_phi() — 9 chỉ số, 46 lỗi, 193 hậu kiểm'],
              ['7. kpi.py', 'compute_review_velocities(), compute_ghost_listings(), compute_occupancy_kpis(), compute_price_and_ppg_kpis(), compute_kpi_by_neighbourhood()'],
              ['8. viz.py', '8 hàm plot_*() — Boxplot log, Small Multiples, Choropleth Polygon thuần + hatch Tláhuac, Heatmap'],
            ].map(([file, desc]) => (
              <div key={file} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="font-mono font-bold text-[#2563EB] dark:text-blue-400">{file}: </span>
                <span className="text-slate-700 dark:text-slate-300">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Formulas */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <h2 className="text-base font-bold">Các công thức KPI phải thuộc lòng</h2>
          <div className="space-y-2.5 text-xs">
            <MathFormula latex="\text{PPG} = \frac{\text{Price}}{\text{Accommodates}}, \qquad \text{rIQR} = \frac{Q_{0.75} - Q_{0.25}}{Q_{0.50}}" block />
            <MathFormula latex="RV^{(k)} = \frac{N_{rev}^{(t_k)} - N_{rev}^{(t_{k-1})}}{\max(\text{days}, 1)/30} \quad (\text{NaN nếu } \Delta < 0)" block />
            <MathFormula latex="\text{Occ}_{1-30} = \frac{30 - A_{30}}{30},\quad \text{Occ}_{31-90} = \frac{60 - (A_{90} - A_{30})}{60},\quad \Delta = \text{Occ}_{1-30} - \text{Occ}_{31-90}" block />
            <MathFormula latex="\text{Ghost}_{t_1} = (A_{365}=0) \land (N_{rev}=0 \lor \Delta t > 90),\quad \text{Ghost}_{t_{2..4}} = (A_{365}=0) \land (RV=0)" block />
            <MathFormula latex="\text{Cost}_{\text{API}} = \frac{N \cdot 110 \cdot 0.30 + N \cdot 68 \cdot 2.50}{10^6} \approx \$0.203 / 1000 \text{ reviews}" block />
          </div>
        </section>
      </div>

      {/* Traps to Avoid */}
      <section className="rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-5">
        <h2 className="text-base font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4" /> Những lỗi "chết người" phải tránh khi trả lời vấn đáp
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <div>• Nói <code>qa_price_outlier</code> bị xóa khỏi KPI giá -&gt; <strong>SAI</strong> (vẫn giữ lại, chỉ gắn cờ).</div>
          <div>• Nói mốc t2 được điền bù giá từ t1 -&gt; <strong>SAI</strong> (t2 giữ 0/1000 và NaN minh bạch).</div>
          <div>• Nói review được lọc theo <code>listing_id</code> -&gt; <strong>SAI</strong> (lọc theo <code>review_id / id</code>).</div>
          <div>• Nói Occupancy là tỷ lệ khách đặt thực tế -&gt; <strong>SAI</strong> (chỉ là ngày không khả dụng).</div>
          <div>• Nói Baseline 85% Accuracy là tốt -&gt; <strong>SAI</strong> (Macro F1 chỉ 0.5224 do mất cân bằng lớp).</div>
          <div>• Nói World Cup làm tăng giá 67.3% toàn Mexico City -&gt; <strong>SAI</strong> (tương quan trên mẫu 1.000 căn = 3.2%).</div>
        </div>
      </section>

      {/* Pre-Viva Checklist */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Checklist tự kiểm tra trước buổi vấn đáp</h2>
          <span className="text-xs font-bold text-[#0F9D8A]">
            {checkedItems.length}/{CHECKLIST.length} đã sẵn sàng
          </span>
        </div>
        <div className="space-y-2">
          {CHECKLIST.map((item, i) => {
            const id = `chk-${i}`;
            const checked = checkedItems.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onToggleCheck(id)}
                className={`w-full text-left p-3 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer transition-colors ${
                  checked
                    ? 'bg-[#E7F6F2]/70 dark:bg-teal-950/30 border-[#0F9D8A]/40'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                }`}
              >
                {checked ? (
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span className={checked ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-200'}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Top 30 Gold Questions */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
        <h2 className="text-base font-bold">30 Câu hỏi Vấn đáp quan trọng nhất (nhấn để xem đáp án trong Viva Arena)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {top30.map((q, i) => (
            <button
              key={q.id}
              type="button"
              onClick={() => navigate(`/viva?q=${q.id}`)}
              className="text-left p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-[#2563EB] bg-slate-50/50 dark:bg-slate-800/40 text-xs cursor-pointer transition-colors"
            >
              <div className="font-bold text-[#2563EB]">
                #{i + 1} · Nhóm {q.category} ({q.qType})
              </div>
              <div className="text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-2">{q.question}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

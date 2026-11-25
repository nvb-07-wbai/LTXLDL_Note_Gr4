import { useState } from 'react';
import { Cpu, Regex, BarChart2, DollarSign, ShieldAlert, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { EVALUATION_METRICS } from '../data/projectData';
import { CodeBlock } from '../components/CodeBlock';
import { MathFormula } from '../components/MathFormula';

export function LlmBaselinePage() {
  const [activeSub, setActiveSub] = useState<'llm' | 'baseline' | 'eval' | 'cost'>('llm');
  const [simReviews, setSimReviews] = useState(1719730);
  const [useBatchDiscount, setUseBatchDiscount] = useState(false);

  const inTok = simReviews * 110;
  const outTok = simReviews * 68;
  const rateFactor = useBatchDiscount ? 0.5 : 1.0;
  const estCost = (((inTok * 0.3 + outTok * 2.5) / 1_000_000) * rateFactor).toFixed(4);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-[#0F9D8A]">
            Model thực tế: gemini-3.5-flash-lite · batch_size = 5
          </span>
          <h1 className="text-2xl font-extrabold mt-0.5">
            LLM, Baseline Regex, Evaluation &amp; Chi phí Token
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Đối chiếu từ <code>src/llm.py</code>, <code>src/baseline.py</code>, <code>src/evaluate.py</code> và 4 báo cáo CSV.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          {[
            { id: 'llm', label: 'A. LLM & Cache', icon: Cpu },
            { id: 'baseline', label: 'B. Baseline Regex', icon: Regex },
            { id: 'eval', label: 'C. Evaluation & Lỗi', icon: BarChart2 },
            { id: 'cost', label: 'D. Chi phí & Tái lập', icon: DollarSign },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeSub === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveSub(t.id as typeof activeSub)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  active ? 'bg-white dark:bg-slate-900 text-[#2563EB] shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeSub === 'llm' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 text-sm">
              <h2 className="text-base font-bold text-[#2563EB]">Vì sao cần LLM &amp; Structured Output?</h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Cột <code>comments</code> là văn bản tự do đa ngôn ngữ (phi cấu trúc). Các quy tắc thông thường không phân biệt được câu khen kèm góp ý nhẹ (<em>&ldquo;Great location, hot water takes forever&rdquo;</em>), phủ định kép hay diễn đạt gián tiếp.
              </p>
              <ul className="text-xs space-y-1.5 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li><strong>Pydantic Schema động (<code>build_schemas</code>):</strong> Dùng <code>create_model</code> sinh <code>AspectSentiment</code> và <code>ReviewAnalysis</code> từ 7 khía cạnh trong YAML.</li>
                <li><strong>4 nhãn khía cạnh bắt buộc:</strong> <code>positive</code>, <code>mixed</code>, <code>negative</code>, <code>not_mentioned</code> (chỉ gán khi nhắc trực tiếp, cấm suy diễn).</li>
                <li><strong>3 nhãn tổng thể:</strong> <code>positive</code> (779/1000 = 77.9%), <code>mixed</code> (206 = 20.6%), <code>negative</code> (15 = 1.5%).</li>
                <li><strong>Độ phủ &amp; ngôn ngữ:</strong> 1.000/1.000 review hợp lệ (999 <code>en</code>, 1 <code>es</code>).</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
              <h2 className="text-base font-bold text-[#0F9D8A]">Prompt, Batching, Rate Limit &amp; Cache JSONL</h2>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Batch size = 5:</strong> Gom 5 review/lần gọi để giảm token lặp của phần hướng dẫn. Có 2 vòng tự chạy bù (vòng cuối tách lẻ <code>batch_size=1</code>).</li>
                <li><strong>Timeout &amp; Retry:</strong> <code>HttpOptions(timeout=60_000)</code>; lỗi 503/mạng backoff [5, 15, 30, 60]s.</li>
                <li><strong>Phân loại 429 thông minh:</strong> <code>rate</code> (RPM/TPM -&gt; cooldown 20–60s) vs <code>daily</code> (RPD -&gt; ném <code>QuotaExceededException</code> dừng sớm).</li>
                <li><strong>Append JSONL &amp; Bảo mật:</strong> Mỗi review hợp lệ được ghi ngay vào <code>data/processed/llm_cache.jsonl</code>; khóa API đọc từ <code>.env</code> qua <code>os.environ.get("GEMINI_API_KEY")</code>.</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            title="src/llm.py — Quy tắc chấm trong build_batch_prompt() (L207–L220)"
            code={`1. overall_sentiment:
   - positive: chỉ khen, không có điểm chê/bất tiện nào.
   - mixed: có cả khen lẫn chê/góp ý bất tiện dù nhẹ (vd: nước nóng chậm, ồn nhẹ, thiếu đồ, nệm cứng, cầu thang...).
   - negative: chủ yếu chê hoặc lỗi nghiêm trọng áp đảo.
2. aspects (positive/mixed/negative/not_mentioned): chỉ gán khi câu văn nhắc trực tiếp, không suy diễn; nếu vừa khen vừa chê cùng khía cạnh thì gán mixed
3. language: mã ISO 639-1 viết thường theo ngôn ngữ chính; "und" nếu rỗng, chỉ có emoji/số hoặc không xác định được.`}
          />
        </div>
      )}

      {activeSub === 'baseline' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
              <h2 className="text-base font-bold">Kiến trúc Baseline Regex tách mệnh đề (`src/baseline.py`)</h2>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-4">
                <li><strong>clean_text():</strong> Giải mã HTML, đổi <code>&lt;br/&gt;</code> thành <code>\n</code> (giữ ranh giới câu), bỏ thẻ HTML, chuẩn hóa NFKC, xóa URL.</li>
                <li><strong>CLAUSE_RE:</strong> Tách review theo <code>[.!?;]+</code>, <code>\n</code> và liên từ đối lập (<em>but, however, although, pero, aunque, sin embargo</em>).</li>
                <li><strong>BENIGN_RE:</strong> Xóa cụm phủ định lành tính (<em>&ldquo;no issues&rdquo;, &ldquo;no noise&rdquo;, &ldquo;nothing bad&rdquo;, &ldquo;ningún problema&rdquo;</em>) trước khi đếm từ chê.</li>
                <li><strong>LANG_PATTERNS:</strong> Nhận diện nhanh <code>es, fr, pt, de, vi</code>; mặc định <code>en</code>; không chữ cái trả <code>und</code>.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
              <h2 className="text-base font-bold">Khi nào Regex làm tốt vs Khi nào thất bại?</h2>
              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 text-xs">
                <strong className="text-emerald-700 dark:text-emerald-300">Làm tốt:</strong> Review khen rõ từ khóa (<em>&ldquo;Clean apartment, great host&rdquo;</em>), nhận diện ngôn ngữ Anh/Tây Ban Nha (đạt 99% Language Accuracy), chi phí 0đ, chạy tức thì.
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 text-xs">
                <strong className="text-rose-700 dark:text-rose-300">Dễ thất bại:</strong> Câu góp ý nhẹ không dùng từ trong <code>NEG_RE</code> (<em>&ldquo;hot water takes a while&rdquo;</em>, <em>&ldquo;bed is very firm&rdquo;</em>), câu chê nhiều ý làm sai <code>mixed</code>/<code>negative</code> (Macro F1 tụt còn 0.5224), hoặc thiếu từ khóa ngoài tiếng Anh/Tây Ban Nha.
              </div>
            </div>
          </div>

          <CodeBlock
            title="src/baseline.py — Tổng hợp nhãn cảm xúc & khía cạnh trên từng mệnh đề (L92–L118)"
            code={`for clause in CLAUSE_RE.split(raw):
    cleaned = BENIGN_RE.sub(" ", clause)
    n_neg = len(NEG_RE.findall(cleaned))
    n_pos = len(POS_RE.findall(NEG_RE.sub(" ", cleaned)))
    total_pos += n_pos
    total_neg += n_neg
    for asp in aspects:
        pat = ASPECT_PATTERNS.get(asp)
        if pat and pat.search(clause):
            aspect_flags[asp][0] = True
            aspect_flags[asp][1] |= n_pos > 0
            aspect_flags[asp][2] |= n_neg > 0
overall = "positive" if total_neg == 0 else "negative" if (total_pos == 0 or total_neg >= max(3, 2 * total_pos)) else "mixed"`}
          />
        </div>
      )}

      {activeSub === 'eval' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
              <h2 className="text-base font-bold mb-1">So sánh 9 chỉ số: LLM vs Baseline (n = 100 nhãn tay)</h2>
              <p className="text-xs text-slate-500 mb-3">Nguồn: reports/evaluation_report.csv</p>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={EVALUATION_METRICS} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                    <XAxis type="number" domain={[0, 1]} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="label" width={175} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC', fontSize: '12px', borderRadius: '0.75rem' }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="llm" name="LLM (gemini-3.5-flash-lite)" fill="#0F9D8A" barSize={10} />
                    <Bar dataKey="baseline" name="Baseline (Regex)" fill="#94A3B8" barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 text-xs">
              <h2 className="text-base font-bold">Phân biệt Accuracy, Macro F1, Weighted F1 &amp; Micro F1</h2>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
                <p><strong>1. Tại sao Accuracy = 0.85 chưa chắc tốt?</strong> Trên 100 mẫu <code>ground_truth.csv</code> có tới 73 <code>positive</code>, 25 <code>mixed</code> và chỉ 2 <code>negative</code>. Đạt 85% nhờ đoán đúng lớp đông, nhưng <strong>Macro F1 = 0.5224</strong> phơi bày Baseline yếu nặng ở lớp <code>mixed</code> và <code>negative</code>.</p>
                <p><strong>2. Macro F1 vs Weighted F1:</strong> Macro F1 lấy trung bình cộng đều 3 lớp (mỗi lớp 1/3); Weighted F1 nhân trọng số cỡ mẫu từng lớp (nên bị lớp 73 positive kéo lên 0.8316).</p>
                <p><strong>3. Micro F1 đa nhãn (<code>f1()</code>):</strong> Cộng dồn toàn bộ TP, FP, FN trên 100 review rồi tính <code>2TP / (2TP + FP + FN)</code>.</p>
              </div>
              <MathFormula latex="F_{1,\text{micro}} = \frac{2\sum TP_i}{2\sum TP_i + \sum FP_i + \sum FN_i}, \quad F_{1,\text{macro}} = \frac{1}{K}\sum_{k=1}^{K} F_{1,k}" block />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-xs space-y-2">
              <h3 className="text-sm font-bold text-[#2563EB]">Phân tích 46 lỗi trường (reports/llm_error_analysis.csv)</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Trên 900 ô đối chiếu (100 review × 9 trường), LLM khớp <strong>854/900 (94.9%)</strong> và chỉ lệch 46 trường trên 37 review:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>21 lỗi thiếu (<code>thieu</code>):</strong> Nhãn tay có gán nhưng LLM để <code>not_mentioned</code> (hay gặp với <em>&ldquo;cozy, comfy, well appointed&rdquo;</em> quy về <code>amenities</code>).</li>
                <li><strong>14 lỗi thừa (<code>thua</code>):</strong> LLM suy diễn khía cạnh từ ngữ cảnh thay vì nhắc trực tiếp.</li>
                <li><strong>11 lỗi sai nhãn (<code>sai_nhan</code>):</strong> Chủ yếu ranh giới giữa <code>negative</code> và <code>mixed</code> trên 1 khía cạnh.</li>
                <li><strong>Phân bổ theo trường:</strong> <code>amenities</code> chiếm 27/46 lỗi; <code>host</code> (6); <code>cleanliness</code>, <code>noise</code>, <code>safety</code> (3); <code>location</code> (2); <code>value</code> (1); <code>overall_sentiment</code> (1).</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-xs space-y-2">
              <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Hậu kiểm 6 quy tắc trên 1.000 review (reports/llm_postcheck.csv)
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Hàm <code>hau_kiem()</code> chạy độc lập không cần nhãn tay trên cả 1.000 kết quả LLM:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>0 vi phạm</strong> các lỗi cấu trúc: rỗng có nhãn, quá ngắn (1–5 từ) nhiều khía cạnh, sai mã ISO ngôn ngữ, tích cực nhưng chỉ chê.</li>
                <li><strong>1 cảnh báo <code>tieu_cuc_nhung_chi_duoc_khen</code>:</strong> <code>id=1193747167008340969</code> (cần kiểm tra lại câu chữ).</li>
                <li><strong>192 cảnh báo <code>khia_canh_khong_can_cu</code></strong> (trên 175 review khác): LLM suy ra khía cạnh từ cách diễn đạt gián tiếp không chứa từ khóa cứng trong <code>TU_KHOA</code> (chỉ để đọc lại, không xóa máy móc!).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeSub === 'cost' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <h2 className="text-base font-bold">Ước tính chi phí mở rộng (`reports/llm_cost_estimate.csv`)</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Định mức đo trung bình từ 1.000 mẫu (đã gộp lô <code>batch_size=5</code>): <strong>~110 input tokens</strong> + <strong>~68 output tokens / review</strong>. Đơn giá <code>gemini-3.5-flash-lite</code>: <strong>$0.30 / 1M input</strong> và <strong>$2.50 / 1M output</strong>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                    <th className="py-2 pr-2">Quy mô</th>
                    <th className="py-2 pr-2">Số review</th>
                    <th className="py-2 pr-2">Input tok</th>
                    <th className="py-2 pr-2">Output tok</th>
                    <th className="py-2">Chi phí (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  <tr>
                    <td className="py-2 pr-2 font-semibold">Mẫu LLM (Nhóm 4)</td>
                    <td className="py-2 pr-2">1.000</td>
                    <td className="py-2 pr-2">110.000</td>
                    <td className="py-2 pr-2">68.000</td>
                    <td className="py-2 font-bold text-[#0F9D8A]">$0.2030</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2 font-semibold">Toàn CDMX mốc t4</td>
                    <td className="py-2 pr-2">1.719.730</td>
                    <td className="py-2 pr-2">189.170.300</td>
                    <td className="py-2 pr-2">116.941.640</td>
                    <td className="py-2 font-bold text-[#2563EB]">$349.1052</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-2">
              <div className="font-bold">Máy tính mô phỏng chi phí mở rộng</div>
              <label className="block">
                Số lượng review cần xử lý: <strong className="font-mono">{simReviews.toLocaleString('vi-VN')}</strong>
              </label>
              <input
                type="range"
                min={1000}
                max={2000000}
                step={10000}
                value={simReviews}
                onChange={(e) => setSimReviews(Number(e.target.value))}
                className="w-full accent-[#2563EB]"
              />
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useBatchDiscount}
                  onChange={(e) => setUseBatchDiscount(e.target.checked)}
                />
                <span>Áp dụng Gemini Batch API (giảm 50% giá, chờ kết quả trong 24h)</span>
              </label>
              <div className="text-sm font-bold text-[#0F9D8A] dark:text-teal-300">
                Chi phí ước tính: ${Number(estCost).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} USD ({((inTok + outTok) / 1_000_000).toFixed(2)}M tokens)
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 text-xs">
            <h2 className="text-base font-bold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#0F9D8A]" /> Cơ chế Cache &amp; Khả năng tái lập (Câu hỏi tủ vấn đáp)
            </h2>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-4 leading-relaxed">
              <li><strong>Vì sao lưu cache JSONL?</strong> (1) Chống mất dữ liệu khi rớt mạng hoặc cạn quota 500 request/ngày; (2) Không phải gọi lại API tốn phí khi chạy lại pipeline.</li>
              <li><strong>Vì sao giảng viên không cần GEMINI_API_KEY?</strong> Vì <code>llm_cache.jsonl</code> đã chứa đủ 1.000/1.000 bản ghi và được commit lên repo. Khi truyền <code>--skip-llm</code> (hoặc khi <code>pending_rows</code> rỗng), <code>src/llm.py</code> bỏ qua bước khởi tạo <code>genai.Client</code>.</li>
              <li><strong>Nếu cache thiếu một số review thì sao?</strong> <code>export_cache_to_csv()</code> in cảnh báo <code>[LLM WARN] Có X/1000 review chưa có nhãn</code> và giữ <code>NaN</code> (không bịa nhãn mặc định). Trong <code>evaluate.py</code>, review thiếu dự đoán bị tính là SAI.</li>
              <li><strong>Phát hiện kết quả thiếu bằng cách nào?</strong> <code>load_cache()</code> kiểm tra đủ <code>id</code>, <code>language</code>, <code>overall_sentiment</code> và đủ tất cả <code>aspects</code> trong YAML; <code>process_pending_reviews()</code> tự động chạy bù 2 vòng.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

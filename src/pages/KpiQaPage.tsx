import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldAlert, BarChart3, ArrowRight, Calculator, AlertTriangle, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { QA_RULES, KPI_DOCS } from '../data/kpiQaData';
import { SNAPSHOT_KPI_DATA, AREA_KPI_DATA } from '../data/projectData';
import { MathFormula } from '../components/MathFormula';
import { CodeBlock } from '../components/CodeBlock';

export function KpiQaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'kpi' ? 'kpi' : 'qa';
  const [tab, setTab] = useState<'qa' | 'kpi'>(initialTab);
  const [selectedRuleId, setSelectedRuleId] = useState(QA_RULES[0].ruleId);
  const [selectedKpiId, setSelectedKpiId] = useState(KPI_DOCS[0].id);

  useEffect(() => {
    const t = searchParams.get('tab');
    const r = searchParams.get('rule');
    const k = searchParams.get('kpi');
    if (t === 'qa' || t === 'kpi') setTab(t);
    if (r && QA_RULES.some((item) => item.ruleId === r)) setSelectedRuleId(r);
    if (k && KPI_DOCS.some((item) => item.id === k)) setSelectedKpiId(k);
  }, [searchParams]);

  const activeRule = QA_RULES.find((r) => r.ruleId === selectedRuleId) ?? QA_RULES[0];
  const activeKpi = KPI_DOCS.find((k) => k.id === selectedKpiId) ?? KPI_DOCS[0];

  const switchTab = (next: 'qa' | 'kpi') => {
    setTab(next);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tab', next);
    setSearchParams(nextParams);
  };

  const snapshotChartData = SNAPSHOT_KPI_DATA.map((d) => ({
    name: `${d.label} (${d.snapshot.slice(5)})`,
    medianPrice: d.medianPrice,
    medianPpg: d.medianPpg,
    occ30Pct: +(d.occ30 * 100).toFixed(2),
    occ60Pct: +(d.occ31_90 * 100).toFixed(2),
    gapPp: +(d.urgencyGap * 100).toFixed(2),
  }));

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">QA Rules &amp; Hệ thống KPI đa cấp</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Đối chiếu chính xác từ <code>src/qa.py</code>, <code>reports/qa_report.csv</code> và <code>src/kpi.py</code> (tag <code>final</code>)
          </p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
          <button
            type="button"
            onClick={() => switchTab('qa')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              tab === 'qa' ? 'bg-white dark:bg-slate-900 text-[#2563EB] shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>8 Quy tắc QA</span>
          </button>
          <button
            type="button"
            onClick={() => switchTab('kpi')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              tab === 'kpi' ? 'bg-white dark:bg-slate-900 text-[#0F9D8A] shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>6 Nhóm KPI &amp; Số liệu thật</span>
          </button>
        </div>
      </div>

      {tab === 'qa' ? (
        <div className="space-y-6">
          {/* QA Flow Diagram */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
              Lưu đồ nguyên lý QA: Gắn cờ ≠ Xóa bản ghi
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              {[
                { label: '1. Dữ liệu ban đầu (1.000 dòng/mốc)', cls: 'bg-slate-100 dark:bg-slate-800' },
                { label: '2. 8 QA Rules (src/qa.py)', cls: 'bg-blue-50 dark:bg-blue-950/50 text-[#2563EB]' },
                { label: '3. QA Flag (qa_*) & *_clean (giữ NaN)', cls: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300' },
                { label: '4. Lọc theo từng phép tính KPI (src/kpi.py)', cls: 'bg-[#E7F6F2] dark:bg-teal-950/50 text-[#0F9D8A]' },
                { label: '5. Kết quả kpi_*.csv + qa_report.csv (32 dòng)', cls: 'bg-[#14243A] text-white' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <span className={`px-3 py-2 rounded-xl border border-slate-200/70 dark:border-slate-700/70 ${step.cls}`}>
                    {step.label}
                  </span>
                  {i < 4 && <ArrowRight className="w-4 h-4 text-slate-400" />}
                </div>
              ))}
            </div>
          </div>

          {/* QA Rule Selector + Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-1.5">
              {QA_RULES.map((rule) => {
                const active = rule.ruleId === activeRule.ruleId;
                return (
                  <button
                    key={rule.ruleId}
                    type="button"
                    onClick={() => setSelectedRuleId(rule.ruleId)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#2563EB]'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-80">{rule.ruleId}</div>
                    <div className="font-bold mt-0.5">{rule.ruleName}</div>
                    <div className={`text-[11px] mt-0.5 ${active ? 'text-blue-100' : 'text-slate-500'}`}>
                      Cột: {rule.targetColumn}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#2563EB]">{activeRule.ruleId}</span>
                <h2 className="text-xl font-extrabold mt-0.5">{activeRule.ruleName}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase">Điều kiện phát hiện</div>
                  <code className="text-[#2563EB] dark:text-blue-400 font-mono block mt-1">{activeRule.condition}</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase">Vấn đề cần xử lý</div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{activeRule.problem}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase">Cách code thực hiện</div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{activeRule.implementation}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30">
                  <div className="font-bold text-[#0F9D8A] uppercase">Hành động xử lý</div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{activeRule.action}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase">Ảnh hưởng đến KPI</div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{activeRule.kpiImpact}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase">Vì sao chọn phương pháp này</div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{activeRule.rationale}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Trường hợp có thể xử lý sai / giới hạn: </span>
                  <span className="text-slate-700 dark:text-slate-300">{activeRule.edgeCaseRisk}</span>
                </div>
              </div>

              <CodeBlock code={activeRule.codeSnippet} title={`Code thực tế — ${activeRule.ruleId}`} />

              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                  Kết quả thực tế từ reports/qa_report.csv
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                        <th className="py-1.5 pr-3">Snapshot</th>
                        <th className="py-1.5 pr-3">Số dòng tác động</th>
                        <th className="py-1.5 pr-3">KPI Trước</th>
                        <th className="py-1.5">KPI Sau</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                      {activeRule.snapshotResults.map((row) => (
                        <tr key={row.snapshot}>
                          <td className="py-2 pr-3 font-mono font-semibold">{row.snapshot}</td>
                          <td className="py-2 pr-3 font-bold">{row.rowsAffected}</td>
                          <td className="py-2 pr-3">{row.before}</td>
                          <td className="py-2">{row.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Deep QA Concepts */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-base font-bold flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-[#2563EB]" /> Giải thích chuyên sâu QA (Chuẩn bị phản biện)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { q: 'Vì sao không dùng dropna() toàn bộ DataFrame?', a: 'Ở t2 (2025-12-29), 1.000/1.000 dòng bị thiếu price. dropna() sẽ xóa trắng cả snapshot, làm mất luôn Occupancy (n=997) và Review Velocity (n=1000) vẫn hoàn toàn hợp lệ.' },
                { q: 'Khi nào nên xóa vs khi nào nên gắn cờ?', a: 'Chỉ xóa bản ghi trùng lặp tuyệt đối khóa nghiệp vụ [id, last_scraped] trong cùng snapshot (vì đếm lặp sẽ sai tổng cung). Các lỗi thiếu/ngoại lai từng trường đều gắn cờ qa_* và giữ NaN ở *_clean.' },
                { q: 'IQR và Quantile P01–P99 khác nhau thế nào?', a: 'IQR = Q3 - Q1 dùng hàng rào 1.5×IQR thường gắn cờ ~8.5% dữ liệu lệch phải; Quantile [0.01, 0.99] cố định tỷ lệ ~2% hai đuôi cực đoan và dễ cấu hình trong YAML theo từng thành phố.' },
                { q: 'Vì sao giá ngoại lai ảnh hưởng Mean nhưng ít ảnh hưởng Median?', a: 'Mean cộng toàn bộ giá trị rồi chia n nên 2 căn >153.000 MXN ở Cuauhtémoc kéo Mean vọt +20%; Median chỉ phụ thuộc thứ hạng phần tử ở vị trí 50% nên đứng vững.' },
              ].map((item) => (
                <div key={item.q} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                  <div className="font-bold text-sm">{item.q}</div>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 4 Levels Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { lvl: 'Listing-level', file: 'kpi_by_listing.csv', rows: '1.000 dòng × 35 cột', desc: 'Giữ chuỗi t1–t4 cho từng id để vẽ boxplot & truy vết căn hộ bất thường.' },
              { lvl: 'Area-level', file: 'kpi_by_area.csv', rows: '8 dòng (A01–A08)', desc: 'So sánh 8 khu vực phân công của nhóm qua 4 mốc (RV, Ghost, Occ, PPG, rIQR).' },
              { lvl: 'Snapshot-level', file: 'kpi_by_snapshot.csv', rows: '4 dòng (t1–t4)', desc: 'Tổng hợp toàn mẫu theo thời gian, làm đường chuẩn trung vị trên biểu đồ.' },
              { lvl: 'Neighbourhood-level', file: 'kpi_by_neighbourhood.csv', rows: '15 dòng (15/16 quận)', desc: 'Khớp GeoJSON vẽ Choropleth & tích hợp tỷ lệ phàn nàn 7 khía cạnh LLM.' },
            ].map((item) => (
              <div key={item.lvl} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs">
                <div className="font-bold text-[#0F9D8A]">{item.lvl}</div>
                <div className="font-mono font-bold text-sm mt-0.5">{item.file}</div>
                <div className="text-slate-400 mt-0.5">{item.rows}</div>
                <p className="text-slate-600 dark:text-slate-300 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* KPI Selector & Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-1.5">
              {KPI_DOCS.map((kpi) => {
                const active = kpi.id === activeKpi.id;
                return (
                  <button
                    key={kpi.id}
                    type="button"
                    onClick={() => setSelectedKpiId(kpi.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0F9D8A] text-white border-[#0F9D8A]'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#0F9D8A]'
                    }`}
                  >
                    <div className="font-bold text-sm">{kpi.shortName}</div>
                    <div className={`text-[11px] mt-0.5 ${active ? 'text-teal-50' : 'text-slate-500'}`}>
                      {kpi.level} · {kpi.unit}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#0F9D8A]">{activeKpi.level}</span>
                <h2 className="text-xl font-extrabold mt-0.5">{activeKpi.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{activeKpi.meaning}</p>
              </div>

              <MathFormula latex={activeKpi.formulaLatex} block />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase">Mục tiêu nghiệp vụ (SECTUR)</div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{activeKpi.businessObjective}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase">Đơn vị &amp; Hàm cài đặt</div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300"><strong>Đơn vị:</strong> {activeKpi.unit}</p>
                  <code className="text-[#2563EB] dark:text-blue-400 font-mono block mt-1">{activeKpi.fileAndFunc}</code>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#E7F6F2]/70 dark:bg-teal-950/30 border border-[#0F9D8A]/30 text-xs space-y-1.5">
                <div className="font-bold text-[#0F9D8A] flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" /> {activeKpi.handExample.title}
                </div>
                <p><strong>Đầu vào:</strong> {activeKpi.handExample.input}</p>
                <p><strong>Tính toán:</strong> {activeKpi.handExample.calc}</p>
                <p className="font-semibold text-[#14243A] dark:text-teal-200">→ {activeKpi.handExample.result}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="font-bold text-slate-500 uppercase mb-1">Kết quả thực tế trong dữ liệu</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    {activeKpi.actualResults.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <div className="font-bold text-rose-600 dark:text-rose-400 uppercase mb-1">Hạn chế của chỉ số</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    {activeKpi.limitations.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Snapshot & Area Verified Data Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="text-sm font-bold mb-1">Biến động Median Price &amp; PPG qua 4 snapshot (t2 = N/A)</h3>
              <p className="text-xs text-slate-500 mb-3">Nguồn: kpi_by_snapshot.csv (đơn vị: MXN)</p>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={snapshotChartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC', fontSize: '12px', borderRadius: '0.75rem' }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="medianPrice" name="Median Price (MXN)" stroke="#2563EB" strokeWidth={2.5} connectNulls={false} dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="medianPpg" name="Median PPG (MXN)" stroke="#0F9D8A" strokeWidth={2.5} connectNulls={false} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="text-sm font-bold mb-1">Bảng số liệu 8 khu vực A01–A08 (kpi_by_area.csv)</h3>
              <p className="text-xs text-slate-500 mb-3">Tất cả con số xác minh trực tiếp từ tag final</p>
              <div className="overflow-x-auto max-h-60">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="sticky top-0 bg-white dark:bg-slate-900">
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="py-1.5 pr-2">Khu</th>
                      <th className="py-1.5 pr-2">PPG t1</th>
                      <th className="py-1.5 pr-2">PPG t4</th>
                      <th className="py-1.5 pr-2">rIQR t4</th>
                      <th className="py-1.5 pr-2">RV Q3</th>
                      <th className="py-1.5">Occ30 t4</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                    {AREA_KPI_DATA.map((a) => (
                      <tr key={a.area}>
                        <td className="py-1.5 pr-2 font-bold">{a.area}</td>
                        <td className="py-1.5 pr-2">{a.medPpgT1.toFixed(0)}</td>
                        <td className="py-1.5 pr-2 font-semibold text-[#0F9D8A]">{a.medPpgT4.toFixed(0)}</td>
                        <td className="py-1.5 pr-2">{a.riqrPpgT4.toFixed(3)}</td>
                        <td className="py-1.5 pr-2">{a.rvQ3.toFixed(2)}</td>
                        <td className="py-1.5">{(a.occ30T4 * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { ShieldCheck, AlertTriangle, FileWarning, Scale, BookCheck, Calendar } from 'lucide-react';
import {
  PROJECT_META,
  CONTEXT_QUESTIONS,
  CODE_AUDIT_DISCREPANCIES,
  AI_POLICY_SUMMARY,
  SNAPSHOT_AUDIT_TABLE,
  TIME_CONCEPTS_DISTINCTION,
} from '../data/projectData';

export function ProjectPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-[#0F9D8A]">
              Nguồn sự thật: Tag final ({PROJECT_META.verifiedCommit.slice(0, 10)})
            </span>
            <h1 className="text-2xl font-extrabold mt-1">
              Toàn cảnh BTL Inside Airbnb — Mexico City (CDMX)
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Stakeholder: <strong className="text-slate-700 dark:text-slate-200">{PROJECT_META.stakeholder}</strong> · Đơn vị tiền tệ: <strong>{PROJECT_META.currency}</strong>
            </p>
          </div>
          <div className="text-xs px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div>Giấy phép dữ liệu: <strong>CC BY 4.0</strong> (Inside Airbnb)</div>
            <div className="text-slate-500 dark:text-slate-400 mt-0.5">
              Ẩn thông tin nhạy cảm (Google Sheet ID, MSSV, Email) theo chính sách public.
            </div>
          </div>
        </div>
      </div>

      {/* 4 Snapshots & Cohort Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-base font-bold flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[#2563EB]" /> 4 Mốc Snapshot (đối chiếu từ configs/mexico-city.yaml)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-2 pr-3">Mốc</th>
                  <th className="py-2 pr-3">Ngày chụp</th>
                  <th className="py-2 pr-3">Giá hợp lệ</th>
                  <th className="py-2">Bối cảnh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {PROJECT_META.snapshots.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2.5 pr-3 font-bold text-[#2563EB]">{s.quarter} ({s.id})</td>
                    <td className="py-2.5 pr-3 font-mono">{s.date}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`px-2 py-0.5 rounded font-semibold ${s.validPriceCount === 0 ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' : 'bg-[#E7F6F2] text-[#0F9D8A] dark:bg-teal-950/60 dark:text-teal-300'}`}>
                        {s.validPriceCount}/1.000
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-300">{s.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-base font-bold mb-3">Cấu trúc tập mẫu phân công (Balanced Panel)</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-500">Số listing / snapshot</div>
              <div className="text-base font-bold mt-0.5">1.000 căn cố định</div>
              <div className="text-slate-500 mt-0.5">875 Entire home + 125 Private room</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-500">Tỷ trọng toàn CDMX (t4)</div>
              <div className="text-base font-bold mt-0.5">~3.2% (1.000 / 31.430)</div>
              <div className="text-slate-500 mt-0.5">Không suy rộng toàn thị trường</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-500">Phân bố không gian</div>
              <div className="text-base font-bold mt-0.5">A01–A08 · 15/16 quận</div>
              <div className="text-slate-500 mt-0.5">Quận Tláhuac không có trong mẫu</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-500">Tập Review phân công</div>
              <div className="text-base font-bold mt-0.5">5.000 reviews</div>
              <div className="text-slate-500 mt-0.5">1.000 Mẫu LLM (361 căn) · 100 Nhãn tay</div>
            </div>
          </div>
        </section>
      </div>

      {/* Snapshot Audit & Time Concepts Distinction */}
      <div className="space-y-6">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-base font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0F9D8A]" /> Bảng Kiểm toán Dữ liệu 4 Snapshot &amp; Bản sao Google Drive (27/09/2025)
            </h2>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E7F6F2] text-[#0F9D8A] dark:bg-teal-950/60 dark:text-teal-300">
              Đã đối chiếu trực tiếp từ dữ liệu thô &amp; tag final
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-2 pr-3">Snapshot</th>
                  <th className="py-2 pr-3">Nguồn thô &amp; Trạng thái HTTP</th>
                  <th className="py-2 pr-3">Dữ liệu lọc Nhóm 4</th>
                  <th className="py-2 pr-3">last_scraped</th>
                  <th className="py-2 pr-3">Schema &amp; Giá (MXN)</th>
                  <th className="py-2">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {SNAPSHOT_AUDIT_TABLE.map((row) => (
                  <tr key={row.snapshotIso}>
                    <td className="py-2.5 pr-3 font-mono font-bold whitespace-nowrap">
                      <div>{row.displayDate}</div>
                      <div className="text-[11px] font-normal text-slate-500">{row.snapshotIso} · {row.label}</div>
                    </td>
                    <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{row.rawStatus}</td>
                    <td className="py-2.5 pr-3 font-medium">{row.filteredCounts}</td>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-500">{row.lastScrapedRange}</td>
                    <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{row.schemaAndPrice}</td>
                    <td className="py-2.5 font-semibold text-[#0F9D8A] whitespace-nowrap">{row.auditStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-base font-bold flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[#2563EB]" /> Phân biệt 6 Khái niệm Thời gian (Cấm nhầm lẫn khi vấn đáp)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIME_CONCEPTS_DISTINCTION.map((item) => (
              <div
                key={item.concept}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-xs space-y-1"
              >
                <div className="font-bold text-[#2563EB] dark:text-blue-400">{item.concept}</div>
                <p className="text-slate-700 dark:text-slate-300">{item.meaning}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                  <strong>Thực tế BTL:</strong> {item.exampleInBtl}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bối cảnh & Câu hỏi nền tảng */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
        <h2 className="text-base font-bold mb-4">Giải thích bối cảnh, bài toán & giới hạn dữ liệu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONTEXT_QUESTIONS.map((item) => (
            <div
              key={item.q}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800"
            >
              <h3 className="text-sm font-bold text-[#14243A] dark:text-slate-100">{item.q}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code vs Report Audit */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-amber-300/80 dark:border-amber-800/70 p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileWarning className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold">
            Kiểm toán đối chiếu: Source Code tại tag `final` vs Báo cáo / AI_USAGE / Docs
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Theo nguyên tắc ưu tiên nguồn sự thật (Source code tag <code>final</code> &gt; Báo cáo &gt; Docs mẫu), dưới đây là các điểm khác biệt thực tế cần nắm rõ để không trả lời sai khi vấn đáp:
        </p>
        <div className="space-y-3">
          {CODE_AUDIT_DISCREPANCIES.map((d) => (
            <div
              key={d.area}
              className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 text-xs space-y-1.5"
            >
              <div className="font-bold text-sm text-[#14243A] dark:text-amber-200">{d.area}</div>
              <div>
                <span className="font-semibold text-slate-500">Trong Docs/Báo cáo: </span>
                <span className="text-slate-700 dark:text-slate-300">{d.inDocsOrReport}</span>
              </div>
              <div>
                <span className="font-semibold text-[#0F9D8A]">Thực tế tag final: </span>
                <span className="text-slate-800 dark:text-slate-200">{d.inActualCode}</span>
              </div>
              <div className="text-[#2563EB] dark:text-blue-400 font-medium">
                Ghi chú vấn đáp: {d.vivaTakeaway}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rubric & Quy định Vấn đáp & Chính sách AI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#2563EB]" /> Rubric Project (5đ) & Quy chế Vấn đáp (5đ)
          </h2>
          <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <div className="font-bold">Rubric Project (5.0 điểm chung nhóm · tag final)</div>
              <p>• <strong>A. Pipeline & Tái lập (1.25đ):</strong> Môi trường chuẩn + 1 lệnh; chạy lại qua cache `--skip-llm`; tải đủ 4 snapshot không commit raw.</p>
              <p>• <strong>B. Lưu trữ & Thao tác (2.25đ):</strong> QA có tác động + từ điển; 5–8 KPI đúng công thức/mẫu số; LLM có cấu trúc + chi phí; Baseline + &ge;100 nhãn tay + lỗi.</p>
              <p>• <strong>C. Trực quan & Báo cáo (1.00đ):</strong> Hình sinh bằng code (không gian, thời gian, LLM); PDF &le;10 trang (lưu ý bản nộp có 18 trang), kết luận + giới hạn + commit.</p>
              <p>• <strong>D. Nhóm & Minh bạch AI (0.50đ):</strong> Phân công, lịch sử Git, `AI_USAGE.md` đủ 4 mục, không lộ API key.</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/40 space-y-1">
              <div className="font-bold text-rose-700 dark:text-rose-300">Quy tắc Vấn đáp cá nhân (10 phút · Chế độ Đóng 🚫)</div>
              <p>• Thi riêng từng người 10 phút, <strong>không</strong> trình bày slide.</p>
              <p>• <strong>5 câu × 1 điểm</strong>, tối đa <strong>90 giây/câu</strong> (kể cả đọc đề), không cộng dồn thời gian thừa.</p>
              <p>• Đến trước giờ T; từ T đến T+5 vẫn thi nhưng hết giờ tại T+10; <strong>sau T+5 mất lượt thi (0đ)</strong>.</p>
              <p>• Không được trả lời "phần đó bạn khác làm".</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <h2 className="text-base font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0F9D8A]" /> Chính sách AI & Minh bạch (`AI_USAGE.md`)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse mb-3">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-1.5 pr-2">Đầu điểm</th>
                  <th className="py-1.5 pr-2">Tỷ trọng</th>
                  <th className="py-1.5 pr-2">Chế độ</th>
                  <th className="py-1.5">Nguyên tắc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {AI_POLICY_SUMMARY.openVsClosed.map((row) => (
                  <tr key={row.activity}>
                    <td className="py-1.5 pr-2 font-medium">{row.activity}</td>
                    <td className="py-1.5 pr-2">{row.weight}</td>
                    <td className="py-1.5 pr-2 font-semibold">{row.mode}</td>
                    <td className="py-1.5 text-slate-600 dark:text-slate-300">{row.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-[#E7F6F2] dark:bg-teal-950/40 text-xs space-y-1.5">
            <div className="font-bold text-[#0F9D8A] flex items-center gap-1.5">
              <BookCheck className="w-4 h-4" /> Vì sao phải có AI_USAGE.md & không dùng AI khi vấn đáp?
            </div>
            {AI_POLICY_SUMMARY.threeDuties.map((d, i) => (
              <p key={i} className="text-slate-700 dark:text-slate-300">• {d}</p>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>Website luyện tập này là công cụ tự học trước kỳ thi; tuyệt đối không sử dụng trong phòng thi vấn đáp.</span>
          </div>
        </section>
      </div>
    </div>
  );
}

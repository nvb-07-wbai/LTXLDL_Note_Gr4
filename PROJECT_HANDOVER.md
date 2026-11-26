# PROJECT_HANDOVER.md — Trạng thái Hoàn thiện Dự án

**Thời điểm cập nhật:** `2026-11-26T14:37:00+07:00`  
**Repository đích:** `https://github.com/nvb-07-wbai/LTXLDL_Note_Gr4` (`main`)  
**Website triển khai:** `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`  
**Nguồn chuẩn đối chiếu:** `uet-iai-notebook-labs-2026/2627-LTXLDL-Airbnb-dse2049_2-nhom04` (`tag final`, SHA `f69ebb195a375c2f7afbf1c75dfdc104be785614`)

---

## 1. Tổng hợp Hoàn thiện Toàn diện

1. **Độ phủ Source Code 100% (`src/data/codebase/` & `PipelinePage.tsx`):**
   - `functionsPart1.ts` (38) + `functionsPart2.ts` (45) = **`83 / 83`** hàm & class khớp AST `tag final` với đầy đủ **10 mục A–J** trên cả 9 tệp Python (`run_pipeline.py` + `8` module `src/*.py`).
   - `dependencyGraph.ts` (`10` node) & `codeTraceScenarios.ts` (`12` kịch bản step-by-step highlight dòng thật).
2. **Ngân hàng Câu hỏi Vấn đáp `698 câu` (`src/data/viva/`):**
   - `part1.ts` + `part2.ts` + `enrichBase.ts` (`66` câu gốc làm giàu 12 trường) + `theoryBank.ts` (`232` theory tổng) + `codeBank.ts` (`109` code tổng) + `traceBank.ts` (`125` trace tổng) + `scenarioBank.ts` (`106` scenario tổng, đã bổ sung `vs-095..vs-100` về kiểm toán snapshot, bản sao Google Drive `27/09/2025`, phân biệt 6 khái niệm thời gian, xác minh số lượng bản ghi và truy vết lỗi tải nhầm mốc) + `critiqueBank.ts` (`66` critique tổng) + `storyBank.ts` (`60` storytelling tổng) = **`698` câu hỏi**, đủ 6 cấp độ 1–6, phủ trọn 18 chủ đề, 0 trùng lặp, 100% chuẩn Vấn đáp Hoàn toàn Cá nhân.
   - `VivaArenaPage.tsx`: hỗ trợ lọc theo **6 Bucket / 10 Nhóm / 18 Chủ đề / 6 Cấp độ / Dạng câu hỏi / Từ khóa**, Strict Mode `Date.now()` khóa cả nút Tìm kiếm header & `Ctrl+K` & điều hướng, tự chấm từ trạng thái `null` + upsert lịch sử.
3. **Kiểm toán Snapshot, Lý thuyết, Luyện tập, KPI & Data Storytelling:**
   - Xác minh trực tiếp bản sao Google Drive `2025-09-27` (`27,051` raw listings -> `1,000` filtered; `9,873,624` raw calendar với `0` price -> `365,000` filtered; `1,454,740` raw reviews -> `5,000` filtered) khớp 100% SHA-256 & số liệu `qa_report.csv`, `kpi_by_snapshot.csv`.
   - Bổ sung **Bảng Kiểm toán 4 Snapshot** và **Phân biệt 6 Khái niệm Thời gian** trên `ProjectPage.tsx` (`src/data/projectData.ts`).
   - Chuẩn hóa **15/15 quận** khớp 100% `kpi_by_neighbourhood.csv`, 8/8 PNG `public/figures/` khớp SHA-256 với `tag final`.
4. **Báo cáo Kiểm toán & Bàn giao (`main` root):**
   - `SNAPSHOT_AUDIT_REPORT.md` (Kiểm toán 4 snapshot & bản sao Google Drive `27/09/2025`).
   - `WEBSITE_DATA_CORRECTION_REPORT.md` (Chi tiết chỉnh sửa & kiểm thử website).
   - `AUDIT_REPORT.md`, `CONTENT_COVERAGE.md`, `VIVA_QUESTION_COVERAGE.md`, `TEST_REPORT.md`, `PROJECT_HANDOVER.md`.
   - **Trạng thái Build & Triển khai:** `npm run build` (`tsc -b && vite build`) thành công 0 lỗi; triển khai qua GitHub Actions lên `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`.

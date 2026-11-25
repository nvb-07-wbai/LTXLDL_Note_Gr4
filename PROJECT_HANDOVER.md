# PROJECT_HANDOVER.md — Checkpoint Bàn giao Trạng thái Dự án

**Thời điểm cập nhật:** `2026-11-25T17:35:00+07:00`  
**Repository đích:** `https://github.com/nvb-07-wbai/LTXLDL_Note_Gr4` (`main`)  
**Website triển khai:** `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`  
**Nguồn chuẩn đối chiếu:** `uet-iai-notebook-labs-2026/2627-LTXLDL-Airbnb-dse2049_2-nhom04` (tag `final`, SHA `f69ebb195a375c2f7afbf1c75dfdc104be785614`)

---

## 1. Công việc đã hoàn thành

### A. Sửa lỗi cốt lõi & Nâng cấp UI/UX / Integrity
- Sửa lỗi runtime Python mẫu `fc-01` (`sum([100, 0, None])`) và mở rộng `src/data/flashcardsData.ts` từ 48 lên **60 flashcards**.
- Sửa lỗi `StrictMode` timer skip trong `src/pages/VivaArenaPage.tsx` (chuyển side-effect sang `useEffect` theo `secondsLeft === 0`, đếm giờ bằng deadline `Date.now()`).
- Nâng cấp `VivaArenaPage.tsx`:
  - Khởi tạo điểm tự chấm là `null` (chỉ cho lưu vào Study Tracker khi đã chấm đủ 5 câu) + upsert `attemptId` (tránh trùng lịch sử).
  - Thêm khóa Strict Mode (`ltxldl_strict_viva_active` + sự kiện `ltxldl-strict-lock` sang `WorkspaceLayout.tsx`), chặn đổi tab qua URL `?q=` khi đang thi Strict.
  - Chọn đề 5 câu phân tầng theo nhóm và ưu tiên câu chưa luyện.
  - Thêm bộ lọc **Mảng (Bucket)**, **Tìm kiếm theo ID/file/dòng**, thêm `'Giải thích'` & `'Vận dụng'` vào lọc dạng câu hỏi, phân trang danh sách (40 + xem thêm 50), và hiển thị đáp án mở/đóng cho câu hỏi truy vấn tiếp (`followUpQA`).
- Loại bỏ tư duy chia nhóm ở `vq-60`, `vq-66` theo nguyên tắc **Vấn đáp Hoàn toàn Cá nhân** (*One Project – Every Student Understands Everything*).
- Sửa `src/pages/FlashcardsPage.tsx` (ổn định shuffle theo seed, không nhảy cóc thẻ khi bật chế độ *chỉ ôn thẻ sai*, bỏ `absolute inset-0` gây cắt nội dung).
- Sửa `src/pages/GlossaryPage.tsx`, `QuizPage.tsx`, `OverviewPage.tsx`, `LlmBaselinePage.tsx`, `KpiQaPage.tsx`, `QuickRevisionPage.tsx` (reset progress có xác nhận, Tooltip Recharts cho Dark Mode, phân bổ đủ 10 nhóm A–J cho 30 câu vàng, format 4 chữ số thập phân `$0.2030`, bảo toàn query string trong `public/404.html`, pre-paint theme script trong `index.html`).
- Nâng cấp `src/components/CommandSearch.tsx` (tìm không dấu tiếng Việt, phím `↑/↓/Enter`, không lộ đáp án khi gõ tìm kiếm, khóa khi đang Strict Mode).
- Bổ sung đủ **15 quận** trong `NEIGHBOURHOOD_TOP_DATA` (`src/data/projectData.ts`) và bổ sung sai lệch `docs/03` Santiago KPI, quy định thời gian `10 phút` vs `20 phút`, và giải thích làm tròn `0.1667 vs 0.1668`.

### B. Hệ thống Hiểu 100% Source Code (`src/data/codebase/` & `src/pages/PipelinePage.tsx`)
- Đã trích xuất AST và lập tài liệu 10 mục **A–J** cho **100% 83 thực thể top-level** (`82` hàm + `1` class `QuotaExceededException`) trên cả 9 tệp Python (`run_pipeline.py` và 8 module `src/*.py`):
  - `src/data/codebase/functionsPart1.ts` (38 thực thể)
  - `src/data/codebase/functionsPart2.ts` (45 thực thể)
  - `src/data/codebase/dependencyGraph.ts` (10 node phụ thuộc cấu hình/module/dữ liệu)
  - `src/data/codebase/codeTraceScenarios.ts` (12 kịch bản truy vết từng dòng qua 9 tệp Python)
  - `src/data/codebase/index.ts`
- Nâng cấp `src/pages/PipelinePage.tsx` với 4 tab: **Tổng quan 9 chặng**, **Dependency Explorer**, **83 Hàm (A–J)**, **Code Trace Mode**.

### C. Ngân hàng Vấn đáp Mở rộng (`src/data/viva/`)
- Mở rộng kiểu `VivaQuestion` trong `src/types/index.ts` hỗ trợ `bucket`, `topics`, `level (1..6)`, `evaluationGoal`, `codeLocation`, `followUpQA`.
- Tạo các module dữ liệu mới và **đã kết nối đầy đủ vào `src/data/viva/index.ts`**:
  - `part1.ts` + `part2.ts` kết hợp `enrichBase.ts`: **66** câu gốc được làm giàu đầy đủ schema mới.
  - `theoryBank.ts`: **224** câu lý thuyết (`vt-*`).
  - `codeBank.ts`: **85** câu đọc hiểu source code BTL thực tế (`vc-*`).
  - `traceBank.ts`: **116** câu truy vết thực thi (`vx-*`).
  - **Tổng đang hoạt động trên website (`ALL_VIVA_QUESTIONS`): `491` câu hỏi (0 trùng ID, 0 trùng nội dung câu hỏi).**

---

## 2. Danh sách File Đã Tạo / Chỉnh sửa Trong Đợt Nâng Cấp

- **Mới tạo:**
  - `AUDIT_REPORT.md`, `DEPLOYMENT_DIAGNOSIS.md`, `DEPLOYMENT_REPORT.md`, `PROJECT_HANDOVER.md`
  - `src/data/codebase/{index,dependencyGraph,codeTraceScenarios,functionsPart1,functionsPart2}.ts`
  - `src/data/viva/{enrichBase,theoryBank,codeBank,traceBank}.ts`
- **Đã chỉnh sửa:**
  - `index.html`, `public/404.html`, `src/types/index.ts`, `src/hooks/useStudyTracker.ts`, `src/layouts/WorkspaceLayout.tsx`
  - `src/components/{CodeBlock,CommandSearch,MathFormula}.tsx`
  - `src/data/{navigation,projectData,flashcardsData}.ts`, `src/data/viva/{index,part1,part2}.ts`
  - `src/pages/{FlashcardsPage,GlossaryPage,KpiQaPage,LlmBaselinePage,OverviewPage,PipelinePage,QuickRevisionPage,QuizPage,VivaArenaPage}.tsx`

---

## 3. Hiện trạng Ngân hàng Câu hỏi & Phần Còn Thiếu

| Nhóm (Bucket) | Hiện có (kể cả base enriched) | Mục tiêu kiểm toán gốc | Thiếu hụt còn lại |
|---|---|---|---|
| `theory` (Lý thuyết) | **232** (224 + 8 base) | ≥ 150 | Đạt (dư 82) |
| `code` (Đọc hiểu code) | **109** (85 + 24 base) | ≥ 100 | Đạt (dư 9) |
| `trace` (Truy vết thực thi) | **125** (116 + 9 base) | ≥ 80 | Đạt (dư 45) |
| `scenario` (Tình huống dữ liệu) | **6** (base) | ≥ 80 | Cần sinh thêm `scenarioBank.ts` (~74+ câu) |
| `critique` (Phản biện & gài bẫy) | **6** (base) | ≥ 60 | Cần sinh thêm `critiqueBank.ts` (~54+ câu) |
| `storytelling` (KPI & Diễn giải) | **13** (base) | ≥ 50 | Cần sinh thêm `storyBank.ts` (~37+ câu) |
| **Tổng cộng** | **491** | **≥ 520** | Còn 3 bucket mở rộng (`scenario`, `critique`, `storytelling`) |

**Nội dung khác chưa nâng cấp trong đợt ưu tiên Build & Deploy:**
1. Chưa bổ sung lý thuyết còn thiếu (`pd.concat`, `map/transform`, `pd.NA` Kleene, `NaT`, 2D broadcasting, DuckDB `BinderException`) vào `src/data/lessons/` và `quizzesData.ts` / `glossaryData.ts`.
2. Chưa hoàn thành nâng cấp UI 9 phần & "6 Ranh giới Cấm Nhầm lẫn" trên `src/pages/StorytellingPage.tsx` và `src/data/storytellingData.ts`.
3. Chưa tạo 3 báo cáo phụ lục kiểm toán: `CONTENT_COVERAGE.md`, `VIVA_QUESTION_COVERAGE.md`, `TEST_REPORT.md` và chưa cập nhật trạng thái `Fixed / Retested / Passed` cho từng dòng `AUD-01..17` trong `AUDIT_REPORT.md`.

---

## 4. Trạng thái Build & Deploy

- **`npm run build` (`tsc -b && vite build`):** Passed tại local (`2050 modules transformed`, `dist/index.html`, `dist/assets/index-*.js` ~2.7 MB / gzip ~761 kB — có cảnh báo Vite chunk > 500 kB, không ảnh hưởng chạy).
- **GitHub Actions (`.github/workflows/deploy.yml`):** Đã kiểm tra hoạt động thành công ở các commit trước (`45595407269` trên `ac05148`), đang chờ push bản mới có `491` câu Viva & `VivaArenaPage.tsx` nâng cấp.
- **GitHub Pages (`https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`):** Đã chuyển sang phục vụ bundle Vite (`/LTXLDL_Note_Gr4/assets/` thay vì `/src/main.tsx`). Cần xác minh lại trên trình duyệt sau lần push cuối.

---

## 5. Git Branch, Working Tree & Vấn đề Chưa Xử lý

- **Branch:** `main` (sạch sau khi commit đợt này, không reset, không force push).
- **Lỗi/cảnh báo còn lại:**
  - `vite build` có warning bundle JS lớn (`> 500 kB`); có thể thêm `manualChunks` trong `vite.config.ts` ở phiên sau.
  - Khi cần tra cứu toàn bộ 18 chủ đề độc lập trong `VivaArenaPage`, có thể thêm bộ lọc theo `topics` (18 chủ đề) bên cạnh `bucket` và `category` ở phiên sau.
- **Tệp nháp tham khảo ngoài repo (ở thư mục artifact scratch):** `scratch/build_viva_part_a.py`, `scratch/btl_functions.json`, `scratch/btl_final/` — không commit vào repo.

---

## 6. Các Lệnh & Bước Tiếp Theo Cần Chạy

```powershell
# 1. Kiểm tra type & build production
npx tsc -b
npm run build

# 2. Chạy preview cục bộ kiểm tra nhanh
npm run preview -- --port 4173
```

1. **Sinh phần ngân hàng Viva còn thiếu** (`scenarioBank.ts` ≥ 80, `critiqueBank.ts` ≥ 60, `storyBank.ts` ≥ 50) và nối vào `src/data/viva/index.ts` để tổng đạt **> 650 câu** đủ 6 bucket.
2. **Nâng cấp `lessons/`, `quizzesData.ts`, `glossaryData.ts`, `kpiQaData.ts`, `storytellingData.ts` & `StorytellingPage.tsx`** (đủ 9 mục câu chuyện + 6 ranh giới cấm nhầm lẫn).
3. **Cập nhật `AUDIT_REPORT.md`** (`Fixed/Retested/Passed`), xuất `CONTENT_COVERAGE.md`, `VIVA_QUESTION_COVERAGE.md`, `TEST_REPORT.md` và chạy Round 2 Arena re-check.

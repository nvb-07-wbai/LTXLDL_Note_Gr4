# AUDIT_REPORT.md — Báo cáo Kiểm toán Toàn diện Website Note Học Tập & Luyện Vấn Đáp (Inside Airbnb CDMX – Nhóm 4)

- **Đối tượng kiểm toán:** Website tại repository `nvb-07-wbai/LTXLDL_Note_Gr4` (commit nền kiểm toán `b42e7a6`)
- **Nguồn chuẩn đối chiếu:**
  1. Repository BTL `uet-iai-notebook-labs-2026/2627-LTXLDL-Airbnb-dse2049_2-nhom04` tại git tag **`final`** (SHA `f69ebb195a375c2f7afbf1c75dfdc104be785614`)
  2. Website học phần chính thức UET.DSE2049 HK1 2026–2027 (`project_airbnb.html`, `ai-policy.html`, Bài 1–14)
  3. Bộ tài liệu `docs/00_*.md` – `docs/05_*.md` trong workspace
- **Phương pháp:** Kiểm toán độc lập theo 6 vai trò Arena (A: Giảng viên môn học, B: Code Reviewer, C: Giảng viên vấn đáp khó tính, D: Data Analyst, E: QA Engineer, F: Sinh viên tự học) kết hợp trích xuất AST 100% mã nguồn Python của BTL (`run_pipeline.py` và 8 tệp `src/*.py`, tổng cộng 82 hàm top-level + 1 class ngoại lệ).

---

## 1. Bảng Danh sách Vấn đề & Lỗi Phát hiện

| ID | Vị trí | Vấn đề | Mức độ | Trạng thái | Bằng chứng & Cách khắc phục |
|---|---|---|---|---|---|
| AUD-01 | `src/data/flashcardsData.ts:5` (`fc-01`) | Đoạn code ví dụ `sum([100, 0, None])/2` gây lỗi runtime `TypeError` trong Python | **Critical** | **Fixed / Retested / Passed** | Sửa thành `sum(x for x in [100, 0, None] if x is not None)/2`; mở rộng lên **60 flashcards**. |
| AUD-02 | `src/pages/VivaArenaPage.tsx:74-102` | Side-effect `advanceRef.current()` bên trong state updater làm `<StrictMode>` nhảy cóc câu hỏi khi hết 90s | **Critical** | **Fixed / Retested / Passed** | Tách sang `useEffect` theo `secondsLeft === 0` với đồng hồ đếm lùi chuẩn `Date.now()`. |
| AUD-03 | `src/data/viva/part2.ts` (`vq-60`, `vq-66`) | Ngôn ngữ ngầm định chia việc theo thành viên vi phạm Nguyên tắc Vấn đáp Cá nhân | **Critical** | **Fixed / Retested / Passed** | Viết lại 100% theo mô hình cá nhân nắm trọn hệ thống; thêm câu phản biện `vr-019` chống đổ lỗi chia việc. |
| AUD-04 | `src/data/codebase/`, `PipelinePage.tsx` | Thiếu bộ **82 hàm + 1 class** theo cấu trúc 10 phần **A–J** và thiếu `run_pipeline.py` độc lập | **Critical** | **Fixed / Retested / Passed** | Tạo `functionsPart1.ts` (38) & `functionsPart2.ts` (45) phủ **83/83** thực thể Python khớp AST `tag final` + tab *83 Hàm (A–J)*. |
| AUD-05 | `src/pages/PipelinePage.tsx`, `CodeBlock.tsx` | Thiếu **Code Trace Mode** từng dòng và **Code Dependency Explorer** | **Critical** | **Fixed / Retested / Passed** | Bổ sung `dependencyGraph.ts` (10 node) & `codeTraceScenarios.ts` (12 kịch bản từng dòng + highlight dòng thật trong `CodeBlock.tsx`). |
| AUD-06 | `src/data/viva/*`, `src/types/index.ts` | Mới có 66 câu, thiếu cấp độ 1–6, thiếu Mục tiêu đánh giá, File/Dòng code & Đáp án Follow-up | **Critical** | **Fixed / Retested / Passed** | Mở rộng schema đủ 12 trường và hoàn thiện **692 câu** (`theory 232, code 109, trace 125, scenario 100, critique 66, storytelling 60`) kèm lọc **6 Bucket / 10 Nhóm / 18 Chủ đề / 6 Cấp độ**. |
| AUD-07 | `VivaArenaPage.tsx`, `WorkspaceLayout.tsx`, `CommandSearch.tsx` | Strict Viva Mode dễ bị lách qua `Ctrl+K`, sidebar hoặc `?q=` URL | **High** | **Fixed / Retested / Passed** | Khóa điều hướng (`ltxldl-strict-lock` / `sessionStorage`), chặn `Ctrl+K` và chặn override `?q=` trong khi chạy Strict Mode. |
| AUD-08 | `VivaArenaPage.tsx`, `useStudyTracker.ts` | Điểm mặc định = `1` (`5.00/5.00`) và bấm Lưu tạo bản ghi lịch sử trùng lặp | **High** | **Fixed / Retested / Passed** | Khởi tạo điểm = `null` (chỉ cho Lưu khi tự chấm đủ 5 câu) + upsert đúng `attemptId` trong `useStudyTracker`. |
| AUD-09 | `src/pages/FlashcardsPage.tsx` | Thay đổi `wrongIds` làm reshuffle deck và nhảy cóc thẻ ở chế độ `onlyWrong` | **High** | **Fixed / Retested / Passed** | Tách phụ thuộc shuffle khỏi `wrongIds`, dùng `advanceAfterMark` chuẩn khi bật *chỉ ôn thẻ sai*, gỡ clip chiều cao `inset-0`. |
| AUD-10 | `src/data/lessons/*`, `quizzesData.ts`, `glossaryData.ts` | Thiếu kiến thức biên (`pd.concat`, `map/transform`, `pd.NA` Kleene, `NaT`, 2D Broadcast, `np.where` eager, SQL `NULL`, `BinderException`, `ME/QE`, MAD, `,` châu Âu, `CoW 2.2 vs 3.0`) | **High** | **Fixed / Retested / Passed** | Đã bổ sung đầy đủ vào `bai-03..bai-10`, liên kết thực hành trong `TheoryPage`, thêm **10 quizzes mới (`26` tổng)** và **8 thuật ngữ mới (`51` tổng)**. |
| AUD-11 | `src/data/projectData.ts:159-169` | `NEIGHBOURHOOD_TOP_DATA` thiếu 6/15 quận và chưa tách `validPriceT4` (`Coyoacán 53 vs 51`) | **High** | **Fixed / Retested / Passed** | Bổ sung đủ toàn bộ **15/15 quận** khớp 100% `kpi_by_neighbourhood.csv` kèm `validPriceT4`. |
| AUD-12 | `projectData.ts`, `kpiQaData.ts` | Thiếu ghi nhận lệch `docs/03` Santiago / `20 phút` vs `10 phút`, thiếu guard cấp tổng hợp | **High** | **Fixed / Retested / Passed** | Cập nhật `CODE_AUDIT_DISCREPANCIES` & `KPI_DOCS`/`QA_RULES` đầy đủ các guard `(g==0).fillna(False)`, `med>0`, `N_LLM>0`, `valid_price_count` vs `valid_ppg_count`. |
| AUD-13 | `storytellingData.ts`, `StorytellingPage.tsx` | Thiếu `kpiFormula`, `chartReadingGuide`, `defenseQuestions`, ngôn từ nhân quả & thiếu 6 Ranh giới | **High** | **Fixed / Retested / Passed** | Hoàn thiện 9 thành phần trên cả 5 Story, trung hòa ngôn ngữ quan sát, thêm Câu hỏi bảo vệ và bảng **6 Ranh giới Cấm Nhầm lẫn**. |
| AUD-14 | `navigation.ts`, `OverviewPage.tsx`, `PipelinePage.tsx`, `QuickRevisionPage.tsx` | Lệch nhãn 8 bước vs 9 thẻ; "30 câu hỏi vàng" cắt bỏ nhóm F–J | **Medium** | **Fixed / Retested / Passed** | Đồng bộ nhãn 9 chặng (8 module + Báo cáo) và phân bổ đều `3 × 10 = 30` câu vàng khắp A–J. |
| AUD-15 | `QuizPage.tsx`, `MathFormula.tsx`, `index.html`, `404.html`, Dark Mode | Tương phản Dark Mode kém, flash trắng khi reload, tooltip Recharts trắng, mất `?q=` ở `404.html` | **Medium** | **Fixed / Retested / Passed** | Sửa toàn bộ class Dark Mode, thêm pre-paint theme script, bảo toàn query string trong `404.html`, thêm Recharts dark Tooltip. |
| AUD-16 | `projectData.ts`, `LlmBaselinePage.tsx` | Lệch làm tròn `0.1667 vs 0.1668` chưa giải thích và mất số lẻ thứ 4 `$0.2030` | **Low** | **Fixed / Retested / Passed** | Giải thích rõ float rounding ở `t1` và ép `minimumFractionDigits: 4` cho bảng chi phí USD. |
| AUD-17 | `GlossaryPage.tsx`, `KpiQaPage.tsx`, `CommandSearch.tsx`, `OverviewPage.tsx`, `useStudyTracker.ts` | Search thiếu tiếng Việt không dấu/phím điều hướng, `Glossary?q=` không reset letter, `Reset` thiếu confirm, `localStorage` thiếu validation | **Medium** | **Fixed / Retested / Passed** | Sửa sync `searchParams`, thêm validation mảng chuỗi `localStorage`, confirm Reset, và `CommandSearch` không dấu + `↑↓Enter`. |

---

## 2. Ma trận Đối chiếu Thống nhất (Audit 2)

| Chủ đề | Lý thuyết (Bài 1–14) | Code (`tag final`) | Báo cáo / CSV (`final`) | Trạng thái Website hiện tại -> Mục tiêu nâng cấp |
|---|---|---|---|---|
| **Download** | Bài 6 (HTTP, Chunk stream, gzip) | `src/download.py` (4 hàm, `.tmp -> replace`, `403/404`, backoff `2**attempt`) | 16/16 tệp cấu trúc, `t1` fallback local | Còn thiếu `get_config_path`, `_display_path`, `main` trong Code Explorer -> **Bổ sung đủ 4/4 hàm A–J + Trace** |
| **Filter** | Bài 5 (`.isin`, `.map`), Bài 6 (`chunksize`, `string` dtype) | `src/filter_data_from_sheet.py` (9 hàm, `set(assigned_ids)`, `chunksize=100_000`) | 1.000 listing, 5.000 review, 1.000 LLM, 100 nhãn tay | Còn thiếu 5 hàm helper và giải thích chi tiết `_read_sheet` / `_filter_assignments` -> **Bổ sung đủ 9/9 hàm A–J + Trace** |
| **QA** | Bài 7 (Regex), Bài 8 (Datetime), Bài 10 (Missing/Outlier) | `src/qa.py` (3 hàm, 8 quy tắc, ưu tiên cờ + `Int64`/`NaN`, `not valid_p.empty`) | `qa_report.csv` (32 dòng), `t2` = 1000 thiếu giá; không có `validate_cohort_integrity` | Đã ghi nhận sai lệch `AI_USAGE.md`, còn thiếu đầy đủ 8 edge case & full code `L1–L359` -> **Bổ sung full hàm A–J & edge cases** |
| **LLM** | Bài 11 (Prompt, Structured Output, Cache, Rate Limit) | `src/llm.py` (`gemini-3.5-flash-lite`, dynamic `create_model`, `batch_size=5`, 429 RPM vs RPD) | `llm_cache.jsonl` (1.000), `reviews_sentiment.csv` (779/206/15) | Còn thiếu `QuotaExceededException` & 8 hàm trong Code Explorer -> **Bổ sung đủ 13 hàm + 1 class A–J & Trace** |
| **Baseline** | Bài 7 (Regex `\b`), Bài 11 (Rule-based Baseline) | `src/baseline.py` (6 hàm, `CLAUSE_RE`, `BENIGN_RE`, `NEG_RE`, `POS_RE`) | `reviews_baseline.csv` (1.000 × 15 cột) | Thiếu `clean_text`, `detect_language`, từ điển Regex đầy đủ -> **Bổ sung đủ 6/6 hàm A–J & Trace bước mệnh đề** |
| **Evaluation** | Bài 11 (Accuracy, Micro/Macro/Weighted F1, Post-check, Cost) | `src/evaluate.py` (13 hàm, `f1` micro multi-label, `f1_cam_xuc`, 6 post-check, token pricing) | `evaluation_report.csv`, `llm_error_analysis.csv` (46 lỗi), `llm_postcheck.csv` (193 cảnh báo), `llm_cost_estimate.csv` | Thiếu 7 hàm phụ trợ (`doc_bang`, `gom_du_doan`, `ti_le_dung`, v.v.) -> **Bổ sung đủ 13/13 hàm A–J & Trace** |
| **KPI** | Bài 3 (Vectorization), Bài 5 (GroupBy/Merge), Bài 8 (Timedelta) | `src/kpi.py` (16 hàm, 4 cấp bảng, `REQUIRED_QA_COLS`, khác `docs/03` Santiago) | `kpi_by_{listing,area,snapshot,neighbourhood}.csv` | Thiếu 11 hàm & thiếu 6 quận trong `NEIGHBOURHOOD_TOP_DATA` -> **Bổ sung đủ 16/16 hàm A–J + đủ 15 quận** |
| **Visualization & Storytelling** | Bài 12–13 (Matplotlib/Seaborn/5 kiểm tra), Bài 14 (Storytelling) | `src/viz.py` (16 hàm, GeoJSON `Polygon` + `hatch="///"`, shared `Normalize`) | 8 PNG `figures/*.png` + `report.pdf` (18 trang) | Thiếu `_load_geojson`, `_centroid`, `_sample_tag`, checklist 9 bước & bảng 6 ranh giới -> **Bổ sung đủ 16/16 hàm A–J & nâng cấp Storytelling** |

---

## 3. Kế hoạch Nâng cấp (Giai đoạn 3 & 4)
1. **Ưu tiên 1 (Sửa sai & Chính sách Cá nhân):** Sửa `fc-01`, chuẩn hóa câu hỏi `vq-60`/`vq-66` và loại bỏ hoàn toàn tư duy phân công nhóm; sửa `Strict Mode` & timer `Date.now()` trong `VivaArenaPage`; sửa `FlashcardsPage` deck stability; bổ sung đầy đủ 15 quận và giải thích sai lệch `docs/03` & `0.1667 vs 0.1668`.
2. **Ưu tiên 2 (100% Code Understanding):** Xây dựng danh mục đầy đủ **82 hàm + 1 class** trên cả 9 tệp Python theo đúng cấu trúc **10 mục A–J**, kèm **Code Dependency Explorer** tương tác và **Code Trace Mode** truy vết dòng code thật.
3. **Ưu tiên 3 (Ngân hàng Vấn đáp ≥ 520 câu & Lý thuyết sâu):** Nâng cấp schema lên 12 trường chuẩn (kèm Mục tiêu đánh giá, File & dòng code, Cấp độ 1–6, Đáp án cho câu hỏi truy vấn tiếp) với **≥ 520 câu** phủ đủ 6 phân loại mục tiêu, 18 chủ đề và 6 cấp độ; bổ sung toàn bộ lỗ hổng lý thuyết (`concat`, `map`, `NaT`, `pd.NA`, `Broadcasting`, `CoW pandas 3`, `DuckDB`, `MAD`, lỗi dấu phẩy châu Âu).
4. **Ưu tiên 4 (Storytelling 9 phần + UI/UX + Kiểm thử lần 2):** Hoàn thiện checklist 9 phần + 6 ranh giới + câu hỏi bảo vệ từng biểu đồ; sửa triệt để lỗi Dark Mode/Routing/Search; kiểm thử trình duyệt & build lại toàn diện, xuất `CONTENT_COVERAGE.md`, `VIVA_QUESTION_COVERAGE.md`, `TEST_REPORT.md` và push lên `main`.

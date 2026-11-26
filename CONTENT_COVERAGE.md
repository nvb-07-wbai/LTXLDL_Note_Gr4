# CONTENT_COVERAGE.md — Ma trận Độ phủ Học liệu & Source Code

**Nguồn chuẩn đối chiếu:** `uet-iai-notebook-labs-2026/2627-LTXLDL-Airbnb-dse2049_2-nhom04` (git tag `final`, SHA `f69ebb195a375c2f7afbf1c75dfdc104be785614`)  
**Website:** `LTXLDL Note & Viva Arena` (`nvb-07-wbai/LTXLDL_Note_Gr4`)

---

## 1. Độ phủ Source Code BTL (9 tệp Python — 83/83 Thực thể Top-level)

Toàn bộ `82` hàm top-level và `1` class ngoại lệ (`QuotaExceededException`) được lập tài liệu theo đủ **10 mục chuẩn A–J** trong `src/data/codebase/` (`functionsPart1.ts` = 38 mục, `functionsPart2.ts` = 45 mục), kèm **Code Dependency Explorer** (`dependencyGraph.ts`) và **12 kịch bản Code Trace từng dòng** (`codeTraceScenarios.ts`):

| File Python | Số thực thể (AST) | Trạng thái A–J | Kịch bản Code Trace | Số câu hỏi Code/Trace |
|---|---|---|---|---|
| `run_pipeline.py` | 4 hàm (`step_targets`, `resolve_steps`, `run_step`, `main`) | 4 / 4 (100%) | #12 (Orchestrator & Env) | Tích hợp đầy đủ |
| `src/download.py` | 4 hàm (`get_config_path`, `_display_path`, `download_file`, `main`) | 4 / 4 (100%) | #1 (`403/404`, `.tmp`, backoff) | Đủ A–J & Trace |
| `src/filter_data_from_sheet.py` | 9 hàm (`_read_config`, `_normalise_id`, `_read_sheet`, `_filter_assignments`, `_filter_raw_by_ids`, `_write_csv`, `filter_data_from_sheet`, `_parse_args`, `main`) | 9 / 9 (100%) | #2 (`chunksize`, `utf-8-sig`) | Đủ A–J & Trace |
| `src/qa.py` | 3 hàm (`load_config`, `apply_qa_rules`, `main`) | 3 / 3 (100%) | #3, #4 (Price parse, `t2`, Last Review) | Đủ A–J & Trace |
| `src/llm.py` | 13 hàm + 1 class (`QuotaExceededException`, `load_config`, `load_assigned_reviews`, `load_cache`, `save_to_cache`, `build_schemas`, `init_client`, `_is_quota_error`, `_process_batch`, `process_pending_reviews`, `_clean_str`, `export_sentiment_csv`, `parse_args`, `main`) | 14 / 14 (100%) | #5, #6 (`batch=5 -> 1`, cache JSONL, `RPD 429`) | Đủ A–J & Trace |
| `src/baseline.py` | 6 hàm (`load_config`, `load_reviews`, `clean_text`, `detect_language`, `analyze_review`, `main`) | 6 / 6 (100%) | #7 (`BENIGN_RE` vs `clause`) | Đủ A–J & Trace |
| `src/evaluate.py` | 13 hàm (`load_config`, `doc_bang`, `tinh_f1`, `tinh_cam_xuc`, `tinh_khia_canh`, `tinh_ngon_ngu`, `phan_tich_loi`, `hau_kiem`, `uoc_tinh_chi_phi`, `gom_du_doan`, `in_bang`, `parse_args`, `main`) | 13 / 13 (100%) | #8 (`hau_kiem`, `uoc_tinh_chi_phi`) | Đủ A–J & Trace |
| `src/kpi.py` | 16 hàm (`_price_col`, `_iqr_stats`, `_qa_flag`, `_load_snapshots`, `_save_csv`, `compute_price_and_ppg_kpis`, `compute_review_velocities`, `compute_ghost_listings`, `compute_occupancy_kpis`, `build_kpi_by_listing`, `compute_kpi_by_area`, `compute_kpi_by_snapshot`, `compute_kpi_by_neighbourhood`, `_load_config`, `_parse_args`, `main`) | 16 / 16 (100%) | #9, #10 (Index Alignment, `Occ31-90`, `COMPLAINT_MIXED`) | Đủ A–J & Trace |
| `src/viz.py` | 14 hàm (`_load_geojson`, `_centroid`, `_sample_tag`, `_heatmap`, `_set_style`, `plot_ppg_riqr`, `plot_ppg_snapshots`, `plot_ppg_neighbourhood`, `plot_riqr_neighbourhood`, `plot_review_ghost`, `plot_occupancy_gap`, `plot_llm_insights`, `plot_llm_vs_baseline`, `main`) | 14 / 14 (100%) | #11 (Choropleth `hatch="///"`, Heatmap `np.argwhere`) | Đủ A–J & Trace |
| **Tổng cộng** | **82 hàm + 1 class = 83 thực thể** | **83 / 83 (100%)** | **12 kịch bản xuyên suốt 9 tệp** | **109 câu Code + 125 Trace** |

---

## 2. Độ phủ Học phần Lý thuyết (Bài 1–14), Thực hành & Dữ liệu

| Thành phần học tập | Vị trí trên website | Nội dung bao phủ & đối chiếu |
|---|---|---|
| **13 Bài giảng chính thức** | `src/data/lessons/` (`TheoryPage.tsx`) | Phủ trọn kiến thức Bài 1–14 (`bai-01..bai-14`), bổ sung đủ các mảng biên: Broadcasting đa chiều, `np.where` eager evaluation, `pd.concat()`, `map/apply/transform/agg`, `pd.NA` Kleene 3 giá trị, `NaT`, `CoW` pandas 2.2 vs 3.0, `pd.merge(NaN==NaN)` vs SQL `NULL`, DuckDB `BinderException`, `ME/QE`, HTTP 200 HTML trap & `Retry-After`, MAD vs IQR/Z-score, dấu thập phân châu Âu `,`. Có nút chuyển tiếp trực tiếp sang Pipeline & Viva Arena. |
| **Dữ liệu CDMX đầy đủ** | `src/data/projectData.ts`, `kpiQaData.ts` | Đủ **15 quận** hành chính trong `NEIGHBOURHOOD_TOP_DATA` (`Coyoacán`: `53` listing / `51` valid price t4; tổng `1.000` / `980`), **8 khu vực** `A01..A08`, **4 snapshot** `t1..t4`, **8 QA rules** (`32` dòng `qa_report.csv`), công thức KPI đủ 2 lớp (Listing + Aggregation guards), chi phí LLM `$0.2030` vs `$349.1052`, và đối chiếu các điểm chênh (`AI_USAGE.md`, `docs/03` Santiago KPI, `20 phút` vs `10 phút`, `0.1667 vs 0.1668`). |
| **Data Storytelling 9 phần** | `src/data/storytellingData.ts`, `StorytellingPage.tsx` | Đủ **5 Story** × **9 thành phần tường minh** (Bối cảnh, Câu hỏi, Định nghĩa & Công thức KPI, Hướng dẫn đọc biểu đồ, Phát hiện chính, Số liệu CSV, Phương pháp, Hàm ý SECTUR, Giới hạn & Câu hỏi bảo vệ), thư viện **8 biểu đồ PNG**, **8 tình huống phản biện**, và bảng **6 Ranh giới Cấm Nhầm lẫn (Bài 14)**. |
| **Luyện tập chủ động** | `flashcardsData.ts`, `quizzesData.ts`, `glossaryData.ts`, `QuickRevisionPage.tsx` | **60 Flashcards**, **26 Quizzes** (single, multi, tf, fill, order, code-output, bug-find, match, critique), **51 Glossary terms**, **30 Câu hỏi vàng** phân bổ đều khắp 10 nhóm A–J. |

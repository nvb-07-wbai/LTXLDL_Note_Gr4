# WEBSITE_DATA_CORRECTION_REPORT.md — Báo cáo Kiểm toán & Hiệu chỉnh Website

**Repository Website:** `https://github.com/nvb-07-wbai/LTXLDL_Note_Gr4` (`main`)  
**Website triển khai:** `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`

---

## 1. Kết quả Kiểm tra Hiện trạng Ban đầu

1. **Các mốc snapshot & model trên website (`src/`):**
   - Toàn bộ 4 mốc snapshot (`2025-09-27`, `2025-12-29`, `2026-03-30`, `2026-06-15`) và model (`gemini-3.5-flash-lite`) trong `src/` đã khớp với `configs/mexico-city.yaml` tại `tag final`. Các chỗ nhắc `gemini-2.5-flash` hay `2026-06-29` đều nằm trong mục cảnh báo không được nhầm với tài liệu tham khảo `docs/00–05`.
   - 8/8 tệp biểu đồ PNG trong `public/figures/` khớp 100% SHA-256 với `figures/*.png` ở `tag final`.
   - Các bảng số liệu trong `src/data/projectData.ts`, `src/data/kpiQaData.ts`, `src/data/storytellingData.ts` khớp với `kpi_by_snapshot.csv`, `kpi_by_area.csv`, `kpi_by_neighbourhood.csv`, `qa_report.csv`, `evaluation_report.csv` và `llm_cost_estimate.csv`.

2. **Các điểm thiếu hụt đã phát hiện so với yêu cầu kiểm toán:**
   - Trang giới thiệu dự án (`ProjectPage.tsx` / `projectData.ts`) chưa hiển thị **Bảng kiểm toán 4 Snapshot** kèm bằng chứng đối chiếu bản sao Google Drive `27/09/2025` (dung lượng, số dòng thô `27.051` / `9.873.624` / `1.454.740`, `last_scraped` `2025-09-27..28`, trạng thái HTTP 403 vs 200).
   - Chưa có bảng **Phân biệt 6 khái niệm thời gian** (`Snapshot date`, `Download date`, `last_scraped`, `Calendar date`, `Review date`, `Report date`).
   - Trang Data Pipeline (`pipelineData.ts`) chưa ghi chú rõ bằng chứng đối chiếu SHA-256 và số dòng thực tế của bản sao Google Drive cho mốc `2025-09-27` khi server trả HTTP 403.
   - Ngân hàng câu hỏi vấn đáp (`src/data/viva/scenarioBank.ts`) còn thiếu câu hỏi chuyên sâu cho các tình huống trọng tâm: lý do mốc đầu là `27/09/2025` & cách đối chiếu Drive, phân biệt `download date` vs `snapshot date`, quy trình xử lý khi Drive khác repository, cách xác minh số lượng `listings`/`calendar`/`reviews`, điều kiện so sánh hai snapshot, và tác động dây chuyền khi tải nhầm dữ liệu một mốc.

---

## 2. Các Nội dung & Tệp Đã Chỉnh sửa

| Tệp | Nội dung cập nhật |
|---|---|
| `src/data/projectData.ts` | Thêm `SNAPSHOT_AUDIT_TABLE` (4 mốc với số liệu thô, đã lọc, `last_scraped`, trạng thái HTTP/Drive) và `TIME_CONCEPTS_DISTINCTION` (6 khái niệm thời gian). |
| `src/pages/ProjectPage.tsx` | Bổ sung 2 section trực quan hóa **Bảng Kiểm toán Dữ liệu 4 Snapshot & Bản sao Google Drive (27/09/2025)** và **Phân biệt 6 Khái niệm Thời gian**. |
| `src/data/pipelineData.ts` | Cập nhật mô tả bước `download` với bằng chứng đối chiếu Google Drive `2025-09-27` (`27.051` listings, `9.873.624` calendar không có `price`, `1.454.740` reviews). |
| `src/data/viva/scenarioBank.ts` | Bổ sung 6 câu hỏi vấn đáp mới (`vs-095` đến `vs-100`) đủ 12 trường chuẩn (Mã, Chủ đề, Độ khó, Nội dung, Đáp án ngắn, Giải thích, Bằng chứng file/dữ liệu, Câu hỏi truy vấn tiếp theo). |
| `SNAPSHOT_AUDIT_REPORT.md` | Tạo báo cáo kiểm toán snapshot & Google Drive chi tiết. |
| `WEBSITE_DATA_CORRECTION_REPORT.md` | Tạo báo cáo hiệu chỉnh website. |
| `PROJECT_HANDOVER.md` | Cập nhật trạng thái bàn giao cuối cùng (branch, commit SHA, build, GitHub Actions & GitHub Pages URL). |

---

## 3. Kết quả Kiểm thử
- TypeScript (`tsc -b`) & Production Build (`vite build`): **Passed** (0 lỗi).
- Số lượng câu hỏi trong Ngân hàng Vấn đáp sau cập nhật: **698 câu** (`692` cũ + `6` câu mới `vs-095..vs-100`).
- Kiểm tra triển khai GitHub Pages & xác minh website thực tế: Xem `PROJECT_HANDOVER.md`.

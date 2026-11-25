# LTXLDL Note & Viva Arena — Inside Airbnb CDMX (Nhóm 4)

Website học tập tương tác và luyện thi vấn đáp phục vụ học phần **Lập trình xử lý dữ liệu (UET.DSE2049)**, học kỳ 1 năm học 2026–2027, Trường Đại học Công nghệ — ĐHQGHN (Viện Trí tuệ nhân tạo).

- **Website triển khai:** https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/
- **Repository BTL tham khảo (chỉ đọc tại tag `final`, commit `f69ebb195a375c2f7afbf1c75dfdc104be785614`):** `uet-iai-notebook-labs-2026/2627-LTXLDL-Airbnb-dse2049_2-nhom04`

## Tính năng chính

1. **Overview & Study Roadmap:** Theo dõi tiến độ học tập qua `localStorage`, lộ trình 4 chặng và câu hỏi luyện tập trong ngày.
2. **Theory Notes (13 bài):** Tổng hợp đầy đủ Bài 1–8 và Bài 10–14 theo slide/tài liệu chính thức và thư mục `docs/`.
3. **Project Explorer & Audit:** Bối cảnh SECTUR CDMX, 4 snapshot (`2025-09-27`, `2025-12-29`, `2026-03-30`, `2026-06-15`), đối chiếu Code vs Báo cáo tại tag `final`, Rubric và Chính sách AI.
4. **Data Pipeline Explorer & Code Playground:** Sơ đồ luồng 8 bước, giải thích mã nguồn thực tế `src/*.py` và mô phỏng tham số `configs/mexico-city.yaml`.
5. **KPI & QA Dictionary:** Chi tiết 8 quy tắc QA (`reports/qa_report.csv`) và 6 nhóm KPI (`src/kpi.py`) kèm công thức KaTeX, ví dụ tính tay và biểu đồ tương tác.
6. **LLM & Baseline:** Phân tích `gemini-3.5-flash-lite` + Pydantic Structured Outputs, Baseline Regex, 9 chỉ số đánh giá (`reports/evaluation_report.csv`), 46 lỗi trường, 193 cảnh báo hậu kiểm và ước tính chi phí token.
7. **Data Storytelling:** 5 câu chuyện dữ liệu thực tế cho SECTUR CDMX, thư viện phóng to 8 biểu đồ PNG từ `figures/` và 8 tình huống phản biện.
8. **Viva Arena (Strict & Practice Mode):** Thi thử 10 phút / 5 câu / 90 giây/câu, tự khóa & chuyển câu khi hết giờ, ngân hàng 66 câu hỏi thuộc 10 nhóm A–J kèm đáp án mẫu 6 phần và chẩn đoán lỗ hổng kiến thức.
9. **Flashcards (48 thẻ), Quiz (16 bài × 9 dạng), Glossary (44 thuật ngữ A–Z) & Quick Revision.**

## Hướng dẫn chạy local & build

Yêu cầu Node.js >= 20 và npm >= 10:

```bash
npm ci
npm run dev
```

Build bản production (tự động xuất ra thư mục `dist/` với `base: '/LTXLDL_Note_Gr4/'`):

```bash
npm run build
npm run preview
```

## Cập nhật nội dung

- Lý thuyết 13 bài: `src/data/lessons/part1.ts`, `src/data/lessons/part2.ts`
- Câu hỏi vấn đáp (66 câu): `src/data/viva/part1.ts`, `src/data/viva/part2.ts`
- Pipeline, KPI, QA, Storytelling, Flashcards, Quiz, Glossary: các tệp tương ứng trong `src/data/`
- Biểu đồ tổng hợp an toàn: `public/figures/*.png`

## Nguồn dữ liệu & Bảo mật

- Dữ liệu Inside Airbnb (Mexico City) sử dụng theo giấy phép **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
- Tài liệu lý thuyết đối chiếu từ trang học phần UET.DSE2049 (`courses.iaidev.com/programming-for-data-processing/2627-1/`) và thư mục `docs/`.
- Website công khai **không** chứa API Key, Google Sheets ID phân công, mã số sinh viên, email cá nhân, dữ liệu thô hay cache LLM dung lượng lớn.

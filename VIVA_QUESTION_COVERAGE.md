# VIVA_QUESTION_COVERAGE.md — Thống kê Độ phủ Ngân hàng Câu hỏi Vấn đáp

**Tổng số câu hỏi đang hoạt động (`ALL_VIVA_QUESTIONS`):** **692 câu**  
**Nguyên tắc học thuật:** 100% thiết kế theo **Vấn đáp Hoàn toàn Cá nhân (*One Project – Every Student Understands Everything*)**, **0** câu hỏi hay đáp án cho phép viện dẫn phân công thành viên nhóm.  
**Định dạng chuẩn 12 trường:** ID, Category/Topics (18), Cấp độ (1–6), Mục tiêu đánh giá (`evaluationGoal`), Câu hỏi, Trả lời nhanh 60–90s, Giải thích chi tiết, Ví dụ chứng minh, Vị trí code (`codeLocation`), Lỗi dễ mắc (`commonMistakes`), Câu hỏi truy vấn tiếp & Đáp án (`followUpQA`).

---

## 1. Phân bố theo 6 Nhóm Mục tiêu Đánh giá (Buckets)

| Bucket | Mô tả | Số câu | Mục tiêu tối thiểu | Trạng thái |
|---|---|---|---|---|
| `theory` | Lý thuyết nền tảng & chuyên sâu (Bài 1–14) | **232** (`224` `vt-*` + `8` base) | ≥ 150 | **Đạt (+82)** |
| `code` | Đọc hiểu Source Code (bao phủ 83/83 hàm/class) | **109** (`85` `vc-*` + `24` base) | ≥ 100 | **Đạt (+9)** |
| `trace` | Truy vết thực thi từng dòng & dự đoán output | **125** (`116` `vx-*` + `9` base) | ≥ 80 | **Đạt (+45)** |
| `scenario` | Tình huống thực tế & thay đổi dữ liệu/cấu hình | **100** (`94` `vs-*` + `6` base) | ≥ 80 | **Đạt (+20)** |
| `critique` | Phản biện sâu & Câu hỏi gài (Cấp độ 5–6) | **66** (`60` `vr-*` + `6` base) | ≥ 60 | **Đạt (+6)** |
| `storytelling` | Phân tích kết quả, KPI & Data Storytelling | **60** (`47` `vo-*` + `13` base) | ≥ 50 | **Đạt (+10)** |
| **Tổng cộng** | **Toàn ngân hàng (`src/data/viva/`)** | **692** | **≥ 520** | **Đạt (+172 câu)** |

---

## 2. Phân bố theo 6 Cấp độ Nhận thức (Levels 1–6)

| Cấp độ | Tên gọi | Số câu | Tỷ trọng |
|---|---|---|---|
| Cấp 1 | Nhận biết | **73** | 10.5% |
| Cấp 2 | Giải thích | **216** | 31.2% |
| Cấp 3 | Truy vết code | **169** | 24.4% |
| Cấp 4 | Vận dụng | **161** | 23.3% |
| Cấp 5 | Phản biện | **33** | 4.8% |
| Cấp 6 | Câu hỏi gài | **40** | 5.8% |

---

## 3. Độ phủ theo 18 Chủ đề Cốt lõi (`topics`)

*(Lưu ý: Một câu hỏi liên môn có thể gắn 1–2 thẻ chủ đề; toàn bộ 18 chủ đề đều có câu hỏi thực chiến)*

| Chủ đề | Số câu gắn thẻ | Chủ đề | Số câu gắn thẻ |
|---|---|---|---|
| `pandas` | **159** | `Baseline` | **44** |
| `KPI` | **133** | `Architecture` | **42** |
| `QA` | **83** | `Regex` | **40** |
| `LLM` | **81** | `NumPy` | **36** |
| `Storytelling` | **79** | `Data Cleaning` | **35** |
| `Visualization` | **69** | `Datetime` | **22** |
| `Python` | **67** | `SQL` | **16** |
| `Evaluation` | **61** | `Code Trace` | **12** |
| `File I/O` | **56** | **API** | **50** |

---

## 4. Kiểm định Tính toàn vẹn Ngân hàng Câu hỏi

- **Trùng lặp ID (`id`):** `0` trường hợp trùng (`vq-01..66`, `vt-001..224`, `vc-001..085`, `vx-001..116`, `vs-001..094`, `vr-001..060`, `vo-001..047`).
- **Trùng lặp nội dung câu hỏi (`question`):** `0` trường hợp trùng.
- **Lỗi chính sách cá nhân hóa:** `0` câu hỏi cho phép trả lời kiểu chia việc thành viên (`vr-019` chủ động kiểm tra và bác bỏ cách trả lời đổ lỗi phân công nhóm).
- **Bảo mật dữ liệu:** `0` chuỗi chứa `AIzaSy`, `spreadsheet_id`, email cá nhân hay mã sinh viên.

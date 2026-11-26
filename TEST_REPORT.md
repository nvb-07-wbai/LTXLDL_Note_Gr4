# TEST_REPORT.md — Báo cáo Kiểm thử & Nghiệm thu Độc lập

**Phiên bản kiểm thử:** Build cục bộ sau cùng (`tsc -b && vite build`, bundle `index-Cu763Cxh.js` + `viva-bank-BjguqWty.js`, 2.053 modules)  
**Đối tượng nguồn chuẩn:** `uet-iai-notebook-labs-2026/2627-LTXLDL-Airbnb-dse2049_2-nhom04` (`tag final`, SHA `f69ebb195a375c2f7afbf1c75dfdc104be785614`)

---

## 1. Kết quả Build & Kiểm định Dữ liệu

| Hạng mục kiểm định | Công cụ / Phạm vi | Kết quả | Chi tiết thực đo |
|---|---|---|---|
| TypeScript check & Vite production build | `npm run build` (`tsc -b && vite build`) | **Passed** | Exit code `0`, `2.053 modules`, thời gian `6.59s`, chia 5 chunk (`index-Cu763Cxh.js`, `viva-bank-BjguqWty.js`, `codebase-catalog-BbTXYcS3.js`, `charts-vendor-B52gTwXF.js`, `katex-vendor-Dc8nsIP1.js`). |
| Tính toàn vẹn ngân hàng Viva (`src/data/viva/`) | Script Python AST/JSON | **Passed** | **`692` câu hỏi** (`theory: 232`, `code: 109`, `trace: 125`, `scenario: 100`, `critique: 66`, `storytelling: 60`), đủ **6 cấp độ** (`1: 73, 2: 216, 3: 169, 4: 161, 5: 33, 6: 40`), phủ đủ **18 chủ đề**, `0` trùng ID, `0` trùng câu hỏi, `0` vi phạm nguyên tắc cá nhân. |
| Độ phủ Source Code BTL (`src/data/codebase/`) | Script đối chiếu `btl_functions.json` (AST `tag final`) | **Passed** | **`83 / 83`** thực thể (`82` hàm + `1` class) trên `9` file Python khớp chính xác `kind`, `lineStart`, `lineEnd`, `code`; `10` node Dependency Graph; `12` kịch bản Code Trace. |
| Đối chiếu số liệu CSV (`projectData.ts`, `kpiQaData.ts`) | Đối chiếu trực tiếp `kpi_by_neighbourhood.csv`, `kpi_by_snapshot.csv`, `qa_report.csv`, `evaluation_report.csv` | **Passed** | **`15 / 15` quận** (`0` sai khác so với `kpi_by_neighbourhood.csv`), `8 / 8` khu vực, `4 / 4` snapshot, `32 / 32` dòng QA, `9 / 9` thước đo Eval. Đã khắc phục toàn bộ sai lệch ở lần kiểm toán vòng 2 (`Miguel Hidalgo validPriceT4=157`, `price_mxn` giữ số `<=0` kèm cờ, `_iqr_stats` 4-tuple). |
| Kiểm tra bảo mật & lộ lọt | Quét đệ quy thư mục `src/` | **Passed** | `0` chuỗi chứa `AIzaSy`, `1N8`, `@gmail`, mã sinh viên. |

---

## 2. Kết quả Kiểm thử Trình duyệt Thực tế (`vite preview` @ `http://127.0.0.1:4173/LTXLDL_Note_Gr4/`)

| Kịch bản kiểm thử | Thiết bị / Khung nhìn | Kết quả | Bằng chứng đo trực tiếp |
|---|---|---|---|
| Overview & Viva counter (`#/`) | Desktop `1280×800` | **Passed** | Hiển thị chính xác `692 câu` (`0/692`), 0 console errors. |
| Dark / Light Mode & Reload | Desktop `1280×800` | **Passed** | Chuyển đổi `<html class="dark">` <-> `""` và giữ nguyên trạng thái sau hard reload qua `localStorage` + pre-paint script. |
| Command Search (`Ctrl+K`) | Desktop `1280×800` | **Passed** | Truy vấn không dấu `"tinh huong"` trả `20` kết quả xuyên Quiz/Story/Viva, không lộ `quickAnswer`, đóng bằng `Escape`. |
| Pipeline & Code Explorer (`#/pipeline`) | Desktop `1280×800` | **Passed** | Lưới `B1–B9`, `Dependency Explorer` (`10` files), `Soi 83 Hàm (A–J)`, `Code Trace (12)` bấm *Bước tiếp* tô sáng dòng thật + cập nhật bảng biến. |
| Flashcards (`#/flashcards`) & Quiz (`#/quiz`) | Desktop `1280×800` | **Passed** | Đủ `60` thẻ (`Tất cả (60)`), lọc `Chỉ ôn thẻ chưa nhớ` hoạt động đúng; Quiz `26` câu, chặn submit đáp án trống. |
| Viva Arena & Strict Mode Lock (`#/viva`) | Desktop `1280×800` | **Passed** | Lọc đủ 6 Bucket / 10 Nhóm / 18 Chủ đề / 6 Cấp độ; Strict Mode đếm ngược `90s -> 87s -> 84s`, khóa đồng bộ các tab điều hướng & **vô hiệu hóa nút Tìm kiếm header + `Ctrl+K`**; chặn lưu khi chưa chấm đủ 5/5 câu (`Chấm nốt 5 câu để lưu`), cho phép lưu lịch sử khi chấm đủ `5/5`. |
| Data Storytelling 9 phần & 6 Ranh giới (`#/storytelling`) | Desktop `1280×800` | **Passed** | Cả 5 Story hiển thị đủ mục `Định nghĩa & Công thức KPI`, `Hướng dẫn đọc đúng biểu đồ`, `Câu hỏi bảo vệ`, `6 Ranh giới Cấm Nhầm lẫn`; `8/8` hình PNG `figures/*.png` tải HTTP `200`. |
| Responsive Tablet | Tablet `768×1024` | **Passed** | `0` tràn ngang (`scrollWidth <= clientWidth`) trên `#/`, `#/pipeline`, `#/viva`, `#/storytelling`. |
| Responsive Mobile | Mobile `375×812` | **Passed** | Đã sửa dứt điểm lỗi tràn ngang `#/pipeline?tab=stages` bằng `[overflow-wrap:anywhere]` & `min-w-0`: cả `#/pipeline?tab=stages`, `deps`, `functions`, `trace` cùng `#/`, `#/viva`, `#/storytelling` đều đạt `docScrollX = 0` (`htmlWidth = 368.67px <= 375px`). |
| Console & Network Errors | Tất cả phiên kiểm thử | **Passed** | **0 console errors**, **0 HTTP >= 400**. |

# [BƯỚC 5/5] TRỰC QUAN HÓA, KỂ CHUYỆN DỮ LIỆU, THẨM ĐỊNH AI & VẤN ĐÁP (VIZ, STORYTELLING & DEFENSE)

> **LIÊN KẾT HỆ THỐNG TÀI LIỆU (AI NAVIGATION LINKS):**
> - **Bước trước [Bước 4 - Xử lý dữ liệu phi cấu trúc bằng LLM]:** Xem tệp `04_UNSTRUCTURED_DATA_AND_LLM_PIPELINE.md`
> - **Tệp hiện tại:** `05_VISUALIZATION_STORYTELLING_AND_DEFENSE.md` (Đặc tả cho `src/viz.py`, `reports/report.pdf`, `AI_USAGE.md` & Vấn đáp)
> - **Quay về Điểm khởi đầu [Bước 0 - Tổng quan & Kiến trúc]:** Xem tệp `00_PROJECT_OVERVIEW_AND_ARCHITECTURE.md`

---

## 1. MỤC TIÊU CỦA BƯỚC 5 (TRỌNG TÂM BÀI 12, 13, 14, 15)
Tài liệu này tổng hợp kiến thức từ **Bài 12–13 (Trực quan hóa dữ liệu & Năm điểm kiểm tra một hình)**, **Bài 14 (Kể chuyện bằng dữ liệu & Thẩm định báo cáo do AI viết)** và **Chính sách AI** để hoàn thiện:
1. Mô-đun `src/viz.py` sinh tự động toàn bộ biểu đồ vào thư mục `figures/`.
2. Báo cáo kỹ thuật `reports/report.pdf` (tối đa 10 trang).
3. Hồ sơ minh bạch `AI_USAGE.md`.
4. Chiến lược bảo vệ đồ án trong 20 phút thi **Vấn đáp (Chế độ Đóng)**.

---

## 2. TRỰC QUAN HÓA DỮ LIỆU & "5 ĐIỂM KIỂM TRA MỘT HÌNH" (`src/viz.py`)

### 2.1. Ba góc độ biểu đồ bắt buộc trong `figures/`
Đề bài yêu cầu `src/viz.py` sinh tự động các hình vẽ bao phủ đủ 3 góc độ:
1. **Góc độ Không gian (Spatial):**
   - Bản đồ Choropleth sử dụng `visualisations/neighbourhoods.geojson` kết hợp bảng KPI khu vực (hoặc biểu đồ thanh ngang xếp hạng `Horizontal Bar Chart` kèm khoảng phân vị cho các khu vực có $n \ge 30$).
   - Thể hiện sự phân hóa không gian về giá trung vị (`median_price`) hoặc mật độ thương mại hóa giữa khu trung tâm du lịch và vùng ngoại ô.
2. **Góc độ Thời gian (Temporal):**
   - Biểu đồ đường (`Line Chart` / `Slopegraph`) hoặc biểu đồ dải (`Ribbon Plot`) so sánh sự biến động của quy mô chỗ ở, giá thuê và tỷ lệ kín lịch qua **4 mốc chụp quý** (hoặc theo 12 tháng từ `calendar`).
3. **Góc độ LLM (Unstructured Data Insights):**
   - Biểu đồ thanh phân kỳ (`Diverging Stacked Bar Chart`) hoặc bản đồ nhiệt (`Heatmap`) thể hiện tỷ lệ Khen (`praised`) vs Chê (`criticized`) trên 7 khía cạnh (`vị trí`, `sạch sẽ`, `chủ nhà`, `giá trị`, `tiện nghi`, `độ ồn`, `an toàn`) theo từng khu vực hoặc phân khúc giá, kèm biểu đồ so sánh Accuracy/F1 giữa `LLM` và `Baseline`.

### 2.2. Năm điểm kiểm tra một hình (Checklist Bài 12–13)
Mọi biểu đồ do `src/viz.py` xuất ra bắt buộc phải vượt qua 5 điểm kiểm tra sau (nếu thiếu sẽ bị trừ điểm trực tiếp):
1. **Tiêu đề mang thông điệp (Action Title) + Phụ đề nêu phạm vi:**
   - *Sai:* `"Biểu đồ giá phòng theo khu vực"`.
   - *Đúng:* `"Khu vực trung tâm Eixample có giá trung vị cao gấp 2.1 lần vùng ven (Snapshot 24/06/2026)"` kèm phụ đề `"Đơn vị: EUR/đêm | Dữ liệu: n = 14,250 chỗ ở hợp lệ sau QA"`.
2. **Nhãn trục và Đơn vị đo / Tiền tệ rõ ràng:** Trục giá phải ghi rõ mã tiền tệ (`CLP`, `EUR`...), trục tỷ lệ ghi rõ `%`. Không để tên biến thô như `neighbourhood_cleansed` hay `median_price` trên trục.
3. **Ghi chú cỡ mẫu ($n$) và Nguồn dữ liệu (Caption/Footnote):** Dưới đáy mỗi hình phải có dòng chữ nhỏ ghi rõ: `"Nguồn: Inside Airbnb (<City>, các mốc chụp 09/2025–06/2026). Chỉ tính các chỗ ở qua bước QA (n = ...)."`
4. **Chọn đúng loại biểu đồ & Gốc tọa độ trung thực:**
   - Biểu đồ cột (`Bar Chart`) biểu diễn số lượng hoặc giá trị tuyệt đối **bắt buộc phải bắt đầu trục tung từ $0$**.
   - So sánh phân phối lệch phải nên dùng `Boxplot` / `Violin` / `Median + IQR` thay vì chỉ vẽ cột trung bình cộng.
5. **Thẩm mỹ, Phân cấp thị giác & Thân thiện mù màu:**
   - Dùng bảng màu an toàn cho người mù màu (`viridis`, `cividis`, `ColorBrewer RdBu` hoặc `Okabe-Ito`), làm nổi bật (highlight) nhóm cần chú ý và làm dịu (grey out) các nhóm nền, xóa đường viền thừa (`sns.despine()`).

---

## 3. KỂ CHUYỆN DỮ LIỆU & THẨM ĐỊNH BÁO CÁO DO AI VIẾT (BÀI 14)

### 3.1. Phân biệt Khám phá (Exploratory) vs Trình bày (Explanatory)
- Không đưa toàn bộ hàng chục bảng nháp trong `notebooks/` vào `reports/report.pdf`.
- Báo cáo kỹ thuật (tối đa 10 trang) phải đi theo mạch **Câu hỏi của bên đặt hàng $\rightarrow$ Quy trình QA dữ liệu $\rightarrow$ Bằng chứng số liệu & Biểu đồ $\rightarrow$ Khuyến nghị hành động cụ thể**.

### 3.2. Bốn lỗi "AI hay sai" khi viết báo cáo phân tích (Bài 14)
Khi nhờ AI nháp hoặc biên tập văn bản cho báo cáo, nhóm bắt buộc phải **thẩm định (audit)** và loại bỏ 4 lỗi kinh điển sau:
1. **Lời diễn giải vượt quá số liệu & Suy diễn nhân quả (Causality Hallucination):**
   - *Ví dụ lỗi AI:* Thấy khu vực A có nhiều đánh giá chê `"độ ồn"` và giá phòng thấp hơn khu vực B, AI viết: *"Tiếng ồn đã làm giảm giá thuê phòng tại khu vực A đi 25%"*.
   - *Cách sửa chuẩn Bài 14:* Đọc kỹ từng động từ (`"chứng minh"`, `"làm cho"`, `"gây ra"`). Dữ liệu quan sát chỉ cho thấy **tương quan / sự đồng xuất hiện**, không chứng minh nhân quả. Hãy viết: *"Khu vực A ghi nhận tỷ lệ phàn nàn về tiếng ồn cao nhất ($34\%$), đồng thời có mức giá trung vị thấp hơn $25\%$ so với khu vực B"*.
2. **Bỏ qua ghi chú ngày cắt dữ liệu (Incomplete Period Trap):**
   - Như đã nêu ở Bài 14: Nếu mốc chụp cuối kết thúc vào ngày `29/06` (hoặc `16/06`), dữ liệu của tháng 6 chưa trọn vẹn hoặc các đánh giá mới chưa kịp cập nhật. AI thường đọc bảng tổng hợp theo tháng rồi phán bừa rằng *"Thị trường sụt giảm đột ngột vào cuối kỳ"*.
3. **Bịa thêm bối cảnh ngoài dữ liệu (External Hallucination):**
   - AI tự bịa ra nguyên nhân như *"Do thành phố vừa tổ chức lễ hội âm nhạc / thay đổi luật thuế vào tháng 3/2026"* trong khi dữ liệu Inside Airbnb hoàn toàn không có thông tin đó. Mọi thông tin ngoài bộ dữ liệu nếu đưa vào phải có trích dẫn nguồn kiểm chứng được.
4. **Nhầm mẫu số và mốc so sánh:**
   - Luôn kiểm tra lại mẫu số của mọi con số phần trăm (`%` trên tổng số chỗ ở toàn thành phố hay `%` trên số chỗ ở có đánh giá?) và yêu cầu AI xuất kèm đoạn code Python tính ra chính xác con số đó để nhóm tự chạy kiểm chứng.

---

## 4. MẪU HỒ SƠ MINH BẠCH `AI_USAGE.md` CHUẨN ĐẠT ĐIỂM TỐI ĐA
Theo **Mục 05 của Đề bài** và **Mục 4.1 Chính sách AI**, tệp `AI_USAGE.md` ở gốc repo không phải là căn cứ trừ điểm nếu dùng AI nhiều, mà **tính minh bạch và khả năng phát hiện lỗi của AI chính là một tiêu chí chấm điểm**.

Cấu trúc bắt buộc của `AI_USAGE.md`:
```markdown
# Hồ Sơ Minh Bạch Sử Dụng AI (AI_USAGE.md)
- **Nhóm:** <Tên Nhóm> | **Thành phố:** <Tên Thành Phố>

## 1. Công cụ AI đã sử dụng (Vào việc gì?)
- **Claude 3.7 Sonnet / Cursor / Gemini:** Hỗ trợ viết khung CLI `run_pipeline.py`, gợi ý biểu thức regex tách `bathrooms_text`, viết khung gọi Gemini API trong `src/llm.py`.
- **Gemini 2.5 Flash API:** Trích xuất cảm xúc và khía cạnh trên 3,000 đánh giá trong `reviews.csv.gz`.
- **ChatGPT:** Rà soát lỗi chính tả và rút gọn câu văn trong `reports/report.pdf`.

## 2. Các Prompt then chốt (5–10 Prompts thực tế)
- **Prompt 1 (Bước 2 - `src/qa.py`):** *"Viết hàm Python dùng pandas làm sạch cột price dạng '$45,647.00', giữ lại cột gốc price_raw để phân biệt giá thiếu ban đầu và lỗi ép kiểu..."*
- *(Liệt kê đầy đủ 5–10 prompt kèm tên tệp áp dụng)*

## 3. Những chỗ AI làm sai & Cách nhóm phát hiện (Ví dụ thật)
- **Lỗi 1 (Khử trùng sai khóa nghiệp vụ trong `src/qa.py`):** AI gợi ý `df.drop_duplicates(subset=["id"])` trên bảng gộp 4 mốc chụp, làm mất dữ liệu của 3 mốc chụp sau. Nhóm phát hiện khi thấy tổng số dòng sau QA giảm đi 75%, đã sửa lại thành `subset=["id", "snapshot_date"]`.
- **Lỗi 2 (Regex thiếu `\b` trong `src/baseline.py`):** AI viết regex `r"not|bad"` làm từ `"notable"` bị bắt nhầm là tiêu cực. Nhóm phát hiện khi chạy `evaluate.py` và sửa thành `r"\b(?:not|bad)\b"`.
- **Lỗi 3 (Ghi thiếu quy tắc có 0 vi phạm trong `qa_report.csv`):** AI thêm điều kiện `if violations > 0:` mới ghi vào báo cáo. Nhóm đối chiếu lý thuyết Bài 10 và bỏ điều kiện lọc này để ghi đủ cả các quy tắc có `0` vi phạm.

## 4. Cách nhóm kiểm chứng kết quả do AI tạo ra
- Tự tính tay và viết truy vấn SQL độc lập bằng **DuckDB** để đối chiếu chéo với kết quả `groupby` bằng Pandas trong `src/kpi.py`.
- Tự gán nhãn tay 120 đánh giá trong `data/samples/manual_labels.csv` để chấm điểm chính xác đầu ra của Gemini API.
```

---

## 5. CHIẾN LƯỢC THI VẤN ĐÁP 20 PHÚT (CHẾ ĐỘ ĐÓNG 🚫)
Theo **Mục 07 - Chấm điểm**, buổi vấn đáp diễn ra như sau:
- **Không có phần trình bày slide:** Giảng viên mở ngẫu nhiên **bất kỳ đoạn mã nào trong `src/`** hoặc **bất kỳ con số/hình vẽ nào trong `report.pdf`** và hỏi riêng từng thành viên.
- **Trách nhiệm liên đới & cá nhân:** Mỗi thành viên phải giải thích được **toàn bộ sản phẩm của nhóm**, không được trả lời *"Phần này do bạn khác làm nên em không rõ"*. Nếu không giải thích được phần được hỏi, cá nhân đó nhận $0$ điểm cho phần đó.
- **Danh sách câu hỏi vấn đáp thường gặp cần ôn kỹ:**
  1. *"Con số $X\%$ ở Trang 4 của báo cáo được tính từ dòng code nào, hàm nào trong `src/kpi.py`? Tử số và mẫu số cụ thể là bao nhiêu?"*
  2. *"Nếu bây giờ thầy/cô sửa dòng code này từ `.loc` sang `.iloc` hoặc bỏ `subset=['id', 'snapshot_date']` thì kết quả thay đổi thế nào?"*
  3. *"Hãy viết trực tiếp tại chỗ 1 dòng lệnh Pandas/DuckDB trên tập `data/samples/` để kiểm tra lại con số ở Hình 2."*
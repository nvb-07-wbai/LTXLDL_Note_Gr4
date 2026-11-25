# [BƯỚC 3/5] BIẾN ĐỔI DỮ LIỆU & ĐỘNG CƠ TÍNH TOÁN KPI (TRANSFORMATION & KPI ENGINE)

> **LIÊN KẾT HỆ THỐNG TÀI LIỆU (AI NAVIGATION LINKS):**
> - **Bước trước [Bước 2 - Làm sạch & Bộ quy tắc QA]:** Xem tệp `02_DATA_CLEANING_AND_QA_RULES.md`
> - **Tệp hiện tại:** `03_TRANSFORMATION_AND_KPI_ENGINE.md` (Đặc tả cho `src/kpi.py` & `data/processed/kpi_*.csv`)
> - **Bước tiếp theo [Bước 4 - Xử lý dữ liệu phi cấu trúc bằng LLM]:** Đọc tệp `04_UNSTRUCTURED_DATA_AND_LLM_PIPELINE.md`

---

## 1. MỤC TIÊU CỦA BƯỚC 3 (TRỌNG TÂM BÀI 3, 4, 5)
Tài liệu này tổng hợp kiến thức từ **Bài 3 (NumPy & Tính toán mảng)**, **Bài 4 (Pandas cơ bản: Series, DataFrame, `.loc`/`.iloc`)** và **Bài 5 (Series & DataFrame chuyên sâu: Khớp nhãn, GroupBy, Ghép bảng, Method Chaining)** để xây dựng mô-đun `src/kpi.py`.

Nhiệm vụ của `src/kpi.py` là nhận đầu vào từ các bảng dữ liệu **đã qua bước làm sạch QA (Bước 2)** và kết quả **làm giàu từ LLM (Bước 4)** để tính toán các chỉ số đo lường hiệu quả hoạt động (KPI) phục vụ trực tiếp cho "bên đặt hàng", xuất kết quả ra các tệp `data/processed/kpi_*.csv`.

---

## 2. NGUYÊN TẮC KỸ THUẬT NUMPY & PANDAS BẮT BUỘC TUÂN THỦ

### 2.1. Vectorization thay vì vòng lặp `for` (Bài 3)
- Tuyệt đối không dùng vòng lặp `for` hoặc `.iterrows()` trên hàng chục nghìn dòng của `listings` hay triệu dòng của `calendar`.
- Sử dụng các phép toán mảng vector hóa của NumPy/Pandas (`np.where`, `np.select`, phép toán đại số trực tiếp trên Series).

### 2.2. Chọn hàng/cột bằng `.loc` và gán trực tiếp vào bảng (Bài 4)
- **Bẫy "AI hay sai" (Bài 4):**
  1. Nhầm lẫn giữa nhãn hàng (`.loc`) và vị trí số nguyên (`.iloc`), đặc biệt sau khi lọc bảng làm `index` bị khuyết lỗ chỗ.
  2. Sửa trên một bản cắt tạm (chained indexing `df[df["price"] > 0]["new_col"] = ...`) gây lỗi `SettingWithCopyWarning` hoặc không làm thay đổi bảng gốc.
  3. **Quên tính lại các cột phụ thuộc sau khi sửa dữ liệu:** Ví dụ, nếu tính cột `estimated_revenue = price * booked_days` trước khi lọc ngoại lai `price`, hoặc sau khi điều chỉnh `price` mà quên cập nhật lại `estimated_revenue`.
- **Quy tắc chuẩn:** Luôn dùng `.copy()` khi tách bảng con độc lập và dùng `df.loc[mask, "col"] = value` khi gán giá trị.

### 2.3. Căn chỉnh chỉ mục tự động (Index Alignment - Bài 5)
- Khi thực hiện phép trừ hoặc chia giữa hai `Series` (ví dụ: tính chênh lệch giá trung bình của từng khu vực giữa mốc chụp Quý 4 và Quý 1), Pandas tự động **khớp theo nhãn (`index`) chứ không theo vị trí thứ tự**.
- Nếu một khu vực xuất hiện ở mốc chụp này nhưng vắng mặt ở mốc chụp kia, kết quả phép trừ sẽ sinh ra `NaN`. Hãy sử dụng `.sub(other, fill_value=0)` hoặc ghép bảng tường minh bằng `.merge()` rồi mới trừ để kiểm soát hoàn toàn hành vi với giá trị khuyết.

### 2.4. Gom nhóm (`groupby`) và Ghép bảng (`merge`) an toàn (Bài 5)
- Khi dùng `df.groupby(...)`, luôn truyền `dropna=False` nếu muốn kiểm tra xem có nhóm `NaN` nào bị lọt lưới không, và dùng cú pháp **Named Aggregation** để đặt tên cột đầu ra rõ ràng:
  ```python
  kpi_area = (
      df_clean.groupby(["snapshot_date", "neighbourhood_cleansed"], as_index=False)
      .agg(
          active_listings=("id", "count"),
          unique_hosts=("host_id", "nunique"),
          median_price=("price", "median"),
          mean_price=("price", "mean"),
          iqr_price=("price", lambda s: s.quantile(0.75) - s.quantile(0.25)),
          avg_rating=("review_scores_rating", "mean"),
      )
  )
  ```
- **Kiểm tra quan hệ khi `pd.merge()`:** Luôn thêm tham số `validate="many_to_one"` hoặc `"one_to_one"` khi ghép bảng (ví dụ ghép `reviews` vào `listings` theo `listing_id` và `snapshot_date`). Nếu bảng bên phải chưa khử trùng khóa, `validate` sẽ báo lỗi ngay lập tức thay vì âm thầm nhân bản số dòng (data explosion)!

---

## 3. QUY CHUẨN ĐỊNH NGHĨA MỖI CHỈ SỐ KPI TRONG ĐỀ BÀI
Theo mục **03 - Công việc (4. Tính KPI)** trong đề Bài tập lớn, mỗi KPI được xây dựng bắt buộc phải trình bày rõ 5 thành phần trong báo cáo và trong docstring của `src/kpi.py`:
1. **Tên KPI (Name):** Tên gọi ngắn gọn, đúng thuật ngữ kinh tế/du lịch.
2. **Mục tiêu (Objective):** KPI này trả lời câu hỏi quyết định nào cho khách hàng (Chính quyền / Quỹ đầu tư / Hiệp hội du lịch)?
3. **Công thức toán học (Formula):** Viết rõ công thức ký hiệu toán học, chỉ rõ tử số, mẫu số và tập hợp lấy tổng/trung bình.
4. **Đơn vị & Tiền tệ (Unit & Currency):** Ghi rõ đơn vị (`%`, `đêm`, `chỗ ở`) và mã tiền tệ từ `configs/<city>.yaml` (`CLP`, `EUR`, `GBP`, `USD`...).
5. **Tập dữ liệu áp dụng (QA Scope):** Chỉ tính trên dữ liệu đã qua bước QA (nêu rõ những bản ghi nào đã bị loại trừ).

---

## 4. DANH MỤC CÁC KPI BẮT BUỘC & GỢI Ý CHUYÊN SÂU
Đề bài yêu cầu: **Ít nhất 01 KPI theo khu vực (`neighbourhood_cleansed`), ít nhất 01 KPI theo thời gian (qua các mốc chụp / tháng), và ít nhất 01 KPI tích hợp kết quả từ LLM.** Dưới đây là bộ 5 nhóm KPI chuẩn giúp nhóm đạt điểm tối đa:

### KPI 1: Giá thuê trung vị & Độ phân tán giá theo Khu vực và Loại phòng (`kpi_price_by_area.csv`)
- **Lý do dùng Trung vị (Median) kèm Trung bình (Mean):** Phân phối giá phòng Airbnb luôn lệch phải mạnh (right-skewed). Dùng `median` và khoảng tứ phân vị $\text{IQR} = Q_{0.75} - Q_{0.25}$ phản ánh mức giá điển hình chính xác hơn `mean`.
- **Công thức:** Với mỗi khu vực $a$ và mốc chụp $t$:
  $$\text{MedianPrice}_{a,t} = \text{ median }\left(\{p_{i,t} \mid i \in \mathcal{L}_{a,t}^{\text{valid}}\}\right)$$
  trong đó $\mathcal{L}_{a,t}^{\text{valid}}$ là tập chỗ ở tại khu vực $a$, mốc $t$ có $p_{\min} \le p_{i,t} \le p_{\max}$ và $\text{minimum\_nights}_{i,t} \le 365$.
- **Đơn vị:** `<CURRENCY> / đêm` (ví dụ: `EUR / đêm`).

### KPI 2: Tỷ lệ lấp đầy kỳ vọng 30 ngày tới & Doanh thu ước tính (`kpi_occupancy_temporal.csv`)
- **Mục tiêu:** Đo lường sức nóng nhu cầu lưu trú và tính mùa vụ qua 4 mốc chụp từ bảng `calendar.csv.gz` (hoặc cột `availability_30`).
- **Công thức:** Trong cửa sổ $W = 30$ ngày kể từ ngày chụp $t$, tỷ lệ ngày kín lịch (Occupancy Proxy) của chỗ ở $i$ là:
  $$\text{Occ30}_{i,t} = \frac{30 - \text{availability\_30}_{i,t}}{30} \times 100\%$$
  Doanh thu gộp kỳ vọng 30 ngày (Gross Booking Value Proxy):
  $$\text{Rev30}_{i,t} = (30 - \text{availability\_30}_{i,t}) \times p_{i,t}$$
- **Lưu ý phản biện trong báo cáo:** Cần giải thích rõ hạn chế của dữ liệu `calendar` trên Inside Airbnb: một ngày có `available == 'f'` có thể do khách đã đặt (booked) hoặc do chủ nhà tự khóa lịch (blocked). Sự thấu hiểu dữ liệu này được đánh giá rất cao khi vấn đáp!

### KPI 3: Tỷ lệ Thương mại hóa & Tập trung Chủ nhà Đa căn hộ (`kpi_host_commercialization.csv`)
- **Mục tiêu:** Phục vụ Chính quyền thành phố hoặc nhà nghiên cứu thị trường để xem Airbnb đang là "kinh tế chia sẻ của người dân" hay bị thâu tóm bởi các "chủ nhà chuyên nghiệp (Multi-listing Hosts)".
- **Định nghĩa:** Chủ nhà chuyên nghiệp là chủ nhà quản lý từ $k \ge 2$ (hoặc $\ge 3$) chỗ ở nguyên căn (`Entire home/apt`) trở lên tại cùng một mốc chụp.
- **Công thức:** Tỷ lệ thương mại hóa tại khu vực $a$:
  $$\text{CommercialRatio}_{a,t} = \frac{\sum_{i \in \mathcal{L}_{a,t}} \mathbb{I}(\text{host\_listings\_count}_{i,t} \ge 2)}{\lvert \mathcal{L}_{a,t} \rvert} \times 100\%$$
- **Đơn vị:** `% số chỗ ở trong khu vực`.

### KPI 4: Động học Sinh - Tử của Thị trường qua 4 Mốc chụp (`kpi_market_churn.csv`)
- **Mục tiêu:** Khai thác tối đa lợi thế của **4 mốc chụp cách nhau 1 quý** ($t_1, t_2, t_3, t_4$).
- **Công thức:** Giữa hai mốc chụp liên tiếp $t_{k-1}$ và $t_k$, gọi $S_{k-1}$ và $S_k$ là tập hợp mã `id` hợp lệ:
  - Số chỗ ở duy trì (Retained): $\lvert S_{k-1} \cap S_k \rvert$
  - Số chỗ ở mới gia nhập (New Entrants): $\lvert S_k \setminus S_{k-1} \rvert$
  - Số chỗ ở rời thị trường (Churned/Exited): $\lvert S_{k-1} \setminus S_k \rvert$
  - Tỷ lệ tăng trưởng ròng (Net Growth Rate):
    $$\text{NetGrowth}_{k} = \frac{\lvert S_k \rvert - \lvert S_{k-1} \rvert}{\lvert S_{k-1} \rvert} \times 100\%$$

### KPI 5: Chỉ số Cảm xúc Ròng & Điểm Đau Khía cạnh từ LLM (`kpi_llm_aspect_sentiment.csv`)
- **Mục tiêu:** Kết nối trực tiếp kết quả trích xuất văn bản của Bước 4 (`src/llm.py`) vào hệ thống KPI theo không gian/loại hình chỗ ở.
- **Công thức:** Với mỗi khu vực $a$ (hoặc mỗi khía cạnh $m \in \{\text{vị trí, sạch sẽ, độ ồn, an toàn...}\}$), Chỉ số Cảm xúc Ròng (Net Sentiment Score - NSS) trên tập đánh giá đã phân tích bằng LLM là:
  $$\text{NSS}_{a,m} = \frac{N_{a,m}^{\text{pos}} - N_{a,m}^{\text{neg}}}{N_{a,m}^{\text{pos}} + N_{a,m}^{\text{mixed}} + N_{a,m}^{\text{neg}}} \times 100$$
  (Giá trị nằm trong đoạn $[-100, +100]$; chỉ tính cho các khu vực có cỡ mẫu đánh giá $n_{a,m} \ge 30$ để đảm bảo ý nghĩa thống kê).

---

## 5. QUY TẮC XUẤT TỆP `data/processed/kpi_*.csv`
1. Mọi tệp xuất ra phải đặt tên theo mẫu `data/processed/kpi_<ten_nhom_kpi>.csv`.
2. Luôn dùng `index=False` (sau khi đã `.reset_index()`) để giữ đầy đủ các cột khóa (`snapshot_date`, `neighbourhood_cleansed`, `room_type`).
3. Thêm cột `n_obs` (cỡ mẫu thực tế tham gia vào phép tính nhóm đó) vào mọi bảng KPI để phục vụ kiểm chứng và vẽ biểu đồ!

---
> **CHUYỂN TIẾP QUY TRÌNH:** Để có dữ liệu đầu vào cho **KPI 5** cũng như hoàn thành phần bắt buộc về Trí tuệ nhân tạo tạo sinh, AI Agent hãy đọc tiếp tệp **`04_UNSTRUCTURED_DATA_AND_LLM_PIPELINE.md`** để triển khai `src/llm.py`, `src/baseline.py` và `src/evaluate.py`.
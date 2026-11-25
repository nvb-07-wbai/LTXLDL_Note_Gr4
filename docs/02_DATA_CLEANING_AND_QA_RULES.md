# [BƯỚC 2/5] LÀM SẠCH DỮ LIỆU, CHUỖI, THỜI GIAN & BỘ QUY TẮC QA (DATA CLEANING & QA RULES)

> **LIÊN KẾT HỆ THỐNG TÀI LIỆU (AI NAVIGATION LINKS):**
> - **Bước trước [Bước 1 - Thu thập & Lưu trữ]:** Xem tệp `01_DATA_INGESTION_AND_STORAGE.md`
> - **Tệp hiện tại:** `02_DATA_CLEANING_AND_QA_RULES.md` (Đặc tả cho `src/qa.py` & `reports/qa_report.csv`)
> - **Bước tiếp theo [Bước 3 - Biến đổi & Tính toán KPI]:** Đọc tệp `03_TRANSFORMATION_AND_KPI_ENGINE.md`

---

## 1. TẦM QUAN TRỌNG CỦA BƯỚC 2 (TRỌNG TÂM BÀI 7, 8, 10)
Trong **Bài 1** và **Bài 10**, giáo trình nhấn mạnh:
> *"Code chạy được vẫn có thể cho kết quả sai nếu dữ liệu thiếu, giá trị bất thường hoặc bản ghi trùng chưa được xử lý phù hợp. Dữ liệu thật bẩn $\rightarrow$ kết luận rút từ dữ liệu bẩn thì cũng bẩn."*

Mô-đun `src/qa.py` chịu trách nhiệm thực hiện toàn bộ quá trình chuẩn hóa chuỗi (Bài 7), chuẩn hóa thời gian (Bài 8), kiểm tra & xử lý dữ liệu bẩn (Bài 10), và xuất ra bảng báo cáo kiểm định chất lượng dữ liệu `reports/qa_report.csv`. **Mọi KPI ở Bước 3 chỉ được phép tính sau khi dữ liệu đã đi qua bước QA này.**

---

## 2. XỬ LÝ DỮ LIỆU CHUỖI & BIỂU THỨC CHÍNH QUY (BÀI 7)

### 2.1. Chuyển đổi cột `price` từ chuỗi tiền tệ sang số thực (`float64`)
Trong Inside Airbnb, cột `price` được lưu dưới dạng chuỗi như `"$45,647.00"`, `"$1.00"`, hoặc bỏ trống `NaN`.
- **Quy tắc bắt buộc từ Bài 7 & Bài 8:**
  1. **Giữ lại cột gốc** (ví dụ đổi tên thành `price_raw`) trước khi chuyển đổi để phân biệt giữa **giá trị vốn dĩ bị thiếu từ đầu (`price_raw.isna()`)** và **lỗi phát sinh do chuyển đổi kiểu dữ liệu (`price_clean.isna() & price_raw.notna()`)**.
  2. Loại bỏ ký hiệu tiền tệ và dấu phân cách hàng nghìn bằng `.str.replace(r"[^\d.]", "", regex=True)` (lưu ý kiểm tra định dạng dấu thập phân của thành phố).
  3. Dùng `pd.to_numeric(..., errors="coerce")` để chuyển sang `float64`.

```python
def parse_price_series(s: pd.Series) -> pd.Series:
    """Chuyển chuỗi giá '$45,647.00' thành float, giữ NaN an toàn."""
    cleaned_str = (
        s.astype("string")
        .str.strip()
        .str.replace(r"^\$|,", "", regex=True)
    )
    return pd.to_numeric(cleaned_str, errors="coerce")
```

### 2.2. Trích xuất thông tin bằng Regex (Ví dụ: `bathrooms_text`)
Cột `bathrooms_text` chứa chuỗi như `"1.5 baths"`, `"1 shared bath"`, `"Half-bath"`, `"Private half-bath"`.
- Dùng `.str.extract(r"(\d+(?:\.\d+)?)", expand=False)` để lấy số phòng tắm.
- Xử lý riêng trường hợp chuỗi khớp `r"(?i)half[- ]?bath"` (gán bằng $0.5$).
- Phân loại `is_shared_bath = df["bathrooms_text"].str.contains(r"\bshared\b", case=False, na=False)`.
- **Bẫy Regex (Đề kiểm tra Câu 7):** Khi tìm từ khóa bằng regex, nếu không dùng ranh giới từ `\b` (word boundary), mẫu `r"not"` sẽ khớp nhầm vào bên trong từ `"notable"`. Luôn đặt `\b` quanh từ khóa cần tìm!

### 2.3. Tách danh sách tiện nghi trong một ô (`amenities`)
Cột `amenities` trong `listings.csv.gz` là một chuỗi biểu diễn danh sách JSON, ví dụ: `'["Wifi", "Kitchen", "Air conditioning", "Dedicated workspace"]'`.
- **Cách xử lý chuẩn (Bài 7):**
  - Dùng `json.loads` an toàn hoặc chuẩn hóa chuỗi rồi `.explode()` khi cần thống kê tần suất từng tiện nghi trên toàn thành phố.
  - Tính số lượng tiện nghi của mỗi chỗ ở: `df["amenities_count"] = df["amenities_list"].str.len()`.
  - Lưu ý khi tính tỷ lệ chỗ ở có tiện nghi $X$: **Mẫu số phải là tổng số chỗ ở hợp lệ (`n_listings`)**, không phải tổng số lượt tiện nghi sau khi `.explode()`!

---

## 3. XỬ LÝ DỮ LIỆU THỜI GIAN (BÀI 8)
1. **Chuyển đổi ngày giờ an toàn:**
   - Các cột `last_scraped`, `host_since`, `first_review`, `last_review` (bảng `listings`) và `date` (bảng `calendar`, `reviews`) phải được chuyển bằng `pd.to_datetime(..., format="%Y-%m-%d", errors="coerce")`.
2. **Gắn nhãn mốc chụp (`snapshot_date`):**
   - Vì nhóm phân tích 4 mốc chụp (cách nhau 1 quý), mỗi dòng dữ liệu khi nạp vào phải có cột `snapshot_date` chuẩn hóa dạng `YYYY-MM-DD` (lấy từ cấu hình snapshot, khác với `last_scraped` có thể lệch 1–2 ngày do quá trình cào dữ liệu của Inside Airbnb kéo dài qua nửa đêm).
3. **Bẫy so sánh theo kỳ (Bài 8 & Bài 14):**
   - Khi nhóm dữ liệu `reviews` hoặc `calendar` theo tháng/quý (`.dt.to_period("M")` hoặc `pd.Grouper(freq="MS")`), **phải kiểm tra xem tháng/quý cuối cùng trong mốc chụp đã trọn vẹn hay chưa**.
   - Ví dụ: Nếu snapshot chụp ngày `2026-06-24`, thì tháng `2026-06` mới chỉ có 24 ngày. Nếu vẽ biểu đồ số lượng đánh giá theo tháng mà không lọc hoặc ghi chú, AI sẽ kết luận sai rằng "tháng 6 sụt giảm mạnh"!

---

## 4. BỘ QUY TẮC LÀM SẠCH DỮ LIỆU CÓ CẤU TRÚC (BÀI 10)

### 4.1. Giá trị thiếu (Missing Values) — Kiểm tra cơ chế trước khi xử lý!
- **Bẫy kinh điển (Đề kiểm tra Câu 5):** Cột `review_scores_rating` thường thiếu khoảng $15\% - 25\%$. Tuyệt đối **không được xóa bừa (`dropna`) hoặc điền `0` (`fillna(0)`)** ngay lập tức!
- **Cách làm đúng theo Bài 10:** Kiểm tra giả thuyết *"Điểm đánh giá bị thiếu đúng khi chỗ ở chưa có đánh giá nào (`number_of_reviews == 0`)"* bằng bảng chéo:
  ```python
  pd.crosstab(df["review_scores_rating"].isna(), df["number_of_reviews"].eq(0))
  ```
  - Nếu điền `0` vào `review_scores_rating`, điểm trung bình của toàn khu vực sẽ bị kéo tụt thê thảm một cách sai lầm. Thay vào đó, giữ nguyên `NaN` khi tính trung bình điểm đánh giá, và tạo thêm cột cờ `has_reviews = df["number_of_reviews"] > 0`.
- **Với cột `price` bị thiếu:** Không được tự ý nội suy nếu không có căn cứ. Cần thống kê tỷ lệ thiếu `price` theo từng `room_type` và `neighbourhood_cleansed` (nhớ phân biệt **tỷ lệ thiếu** `.isna().mean()` với **số lượng ô thiếu** `.isna().sum()` — Đề kiểm tra Câu 3), sau đó loại bỏ các dòng thiếu `price` khỏi tập tính KPI về giá và ghi rõ số dòng bị loại vào `qa_report.csv`.

### 4.2. Giá trị bất thường / Ngoại lai (Outliers & Invalid Values)
Sử dụng các ngưỡng cấu hình trong `configs/<city>.yaml`:
1. **Giá tiền không hợp lệ hoặc ngoại lai cực đoan:**
   - Vi phạm cận dưới: `price <= 0` hoặc `price < cfg["qa"]["price_min"]` (ví dụ chỗ ở treo giá `$1.00` ảo).
   - Vi phạm cận trên: `price > cfg["qa"]["price_max_local"]` (ví dụ giá lỗi hệ thống lên tới hàng chục ngàn USD/đêm).
2. **Số đêm tối thiểu bất thường (`minimum_nights`):**
   - Trong dữ liệu thật (Slide Bài 1), có những chỗ ở yêu cầu `minimum_nights = 999` hoặc `1125` đêm.
   - Quy tắc QA: Lọc hoặc gắn cờ các bản ghi có `minimum_nights > cfg["qa"]["min_nights_cap"]` (thường là $365$ ngày) hoặc `minimum_nights < 1`.
3. **Tọa độ địa lý nằm ngoài ranh giới thành phố:**
   - Kiểm tra `latitude`, `longitude` có bị thiếu hoặc nằm ngoài hộp giới hạn (bounding box / polygon của `neighbourhoods.geojson`) hay không.

### 4.3. Trùng lặp bản ghi (Deduplication theo Khóa nghiệp vụ)
- **Bẫy khóa nghiệp vụ (Đề kiểm tra Câu 8):** Khi gộp bảng `listings` của 4 mốc chụp lại thành một bảng lớn, cùng một mã chỗ ở `id` sẽ xuất hiện tối đa 4 lần (mỗi mốc chụp 1 lần). Đó là **quan sát lặp theo thời gian (panel data)**, KHÔNG phải bản ghi trùng lặp!
- **Khóa nghiệp vụ đúng:** Phải kiểm tra trùng lặp trên cặp khóa `subset=["id", "snapshot_date"]` (hoặc `["id", "last_scraped"]` trong phạm vi 1 mốc chụp):
  ```python
  n_dupes = df.duplicated(subset=["id", "snapshot_date"], keep="first").sum()
  df_clean = df.drop_duplicates(subset=["id", "snapshot_date"], keep="first").copy()
  ```

### 4.4. Toàn vẹn khóa ngoại (Referential Integrity)
- Mọi `listing_id` trong `reviews` và `calendar` phải tồn tại trong tập `df_listings["id"]` của mốc chụp tương ứng:
  ```python
  orphan_reviews = ~df_reviews["listing_id"].isin(df_listings["id"])
  ```

---

## 5. ĐẶC TẢ BẢNG BÁO CÁO `reports/qa_report.csv` (QUY TẮC BẮT BUỘC)
Theo **Lab 10 & Đề kiểm tra Câu 9**, bộ quy tắc QA phải được đóng gói thành một bảng tổng hợp xuất ra `reports/qa_report.csv` (và `data/processed/qa_report.csv`).

> **LƯU Ý SỐNG CÒN (Đề kiểm tra Câu 9):** Nếu một phép kiểm tra (ví dụ: kiểm tra trùng khóa chính hoặc kiểm tra khóa ngoại) chạy ra kết quả **0 dòng vi phạm**, nhóm **BẮT BUỘC VẪN PHẢI GHI MỘT DÒNG VỚI SỐ VI PHẠM = 0** vào `qa_report.csv`. Số `0` chứng minh rằng quy tắc đã được chạy và dữ liệu đạt chuẩn; nếu không ghi, người đọc sẽ không biết nhóm đã kiểm tra hay bỏ sót!

### Cấu trúc cột chuẩn của `qa_report.csv`:
| Tên cột | Kiểu | Mô tả & Ví dụ |
| :--- | :--- | :--- |
| `snapshot_date` | `string` | Mốc chụp (VD: `"2026-06-29"` hoặc `"ALL"` nếu kiểm trên bảng gộp) |
| `table_name` | `string` | Tên bảng kiểm tra (`"listings"`, `"calendar"`, `"reviews"`) |
| `rule_id` | `string` | Mã quy tắc (VD: `"QA_LIST_01"`, `"QA_LIST_02"`, `"QA_REV_01"`) |
| `rule_description` | `string` | Mô tả quy tắc (VD: `"Giá phòng thiếu (missing price_raw)"`) |
| `total_rows_checked`| `int64` | Tổng số dòng được đưa vào kiểm tra ở bước đó |
| `violation_count` | `int64` | Số dòng vi phạm (ghi rõ `0` nếu không có dòng nào vi phạm) |
| `violation_pct` | `float64`| Tỷ lệ phần trăm vi phạm: $\frac{\text{violation\_count}}{\text{total\_rows\_checked}} \times 100$ |
| `action_taken` | `string` | Hành động xử lý (VD: `"Loại bỏ khỏi tập tính KPI giá"`, `"Giữ nguyên NaN"`, `"Khử trùng giữ dòng đầu"`) |

---
> **CHUYỂN TIẾP QUY TRÌNH:** Sau khi `src/qa.py` xuất ra các bảng dữ liệu sạch vào `data/processed/` và tạo tệp `reports/qa_report.csv`, AI Agent hãy đọc tiếp tệp **`03_TRANSFORMATION_AND_KPI_ENGINE.md`** để thiết kế và tính toán hệ thống chỉ số KPI (`src/kpi.py`).
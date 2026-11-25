# [BƯỚC 1/5] THU THẬP, TRUY XUẤT & LƯU TRỮ DỮ LIỆU (DATA INGESTION & STORAGE)

> **LIÊN KẾT HỆ THỐNG TÀI LIỆU (AI NAVIGATION LINKS):**
> - **Bước trước [Bước 0 - Tổng quan & Kiến trúc]:** Xem tệp `00_PROJECT_OVERVIEW_AND_ARCHITECTURE.md`
> - **Tệp hiện tại:** `01_DATA_INGESTION_AND_STORAGE.md` (Đặc tả cho `src/download.py` & Tầng I/O)
> - **Bước tiếp theo [Bước 2 - Làm sạch & Bộ quy tắc QA]:** Đọc tệp `02_DATA_CLEANING_AND_QA_RULES.md`

---

## 1. MỤC TIÊU CỦA BƯỚC 1 TRONG PIPELINE
Tài liệu này tổng hợp kiến thức từ **Bài 2 (Đọc & ghi file)**, **Bài 4–5 (Cấu trúc bảng Pandas)** và **Bài 6 (Kết nối & Truy xuất dữ liệu ngoài: File, API, SQL & DuckDB)** nhằm xây dựng mô-đun `src/download.py`.

Nhiệm vụ của mô-đun này là:
1. Đọc cấu hình từ `configs/<city>.yaml` (`data_root` và danh sách 4 `snapshots`).
2. Tự động tải 4 tệp dữ liệu chuẩn của Inside Airbnb cho từng mốc chụp về thư mục `data/raw/<snapshot>/`.
3. Thực hiện **kiểm tra toàn vẹn (Integrity Check)** cho từng tệp ngay sau khi tải.
4. Cung cấp cơ chế đọc dữ liệu hiệu năng cao (bằng Pandas hoặc DuckDB) mà không làm sai lệch kiểu dữ liệu (`dtype`).

---

## 2. ĐẶC TẢ NGUỒN DỮ LIỆU INSIDE AIRBNB (4 TỆP × 4 MỐC CHỤP)
Nguồn dữ liệu: **Inside Airbnb** (Giấy phép **CC BY 4.0** — bắt buộc ghi rõ nguồn và danh sách ngày của từng mốc chụp trong báo cáo).

Với mỗi mốc chụp `<YYYY-MM-DD>` và `<data_root>` (ví dụ: `spain/catalonia/barcelona`), cấu trúc URL chuẩn như sau:
1. **Bảng Chỗ ở (`listings.csv.gz`):**
   - URL: `https://data.insideairbnb.com/<data_root>/<YYYY-MM-DD>/data/listings.csv.gz`
   - Nội dung: Thông tin chi tiết từng chỗ ở tại thời điểm chụp (`id`, `last_scraped`, `name`, `host_id`, `neighbourhood_cleansed`, `latitude`, `longitude`, `room_type`, `accommodates`, `bathrooms_text`, `bedrooms`, `beds`, `amenities`, `price`, `minimum_nights`, `maximum_nights`, `number_of_reviews`, `review_scores_rating`, v.v.).
2. **Bảng Lịch đặt phòng (`calendar.csv.gz`):**
   - URL: `https://data.insideairbnb.com/<data_root>/<YYYY-MM-DD>/data/calendar.csv.gz`
   - Nội dung: Lịch trống/đã đặt theo từng ngày trong 365 ngày tới của mỗi chỗ ở (`listing_id`, `date`, `available`, `price`, `adjusted_price`, `minimum_nights`, `maximum_nights`). *Lưu ý: Tệp này rất lớn (hàng triệu dòng).*
3. **Bảng Đánh giá văn bản (`reviews.csv.gz`):**
   - URL: `https://data.insideairbnb.com/<data_root>/<YYYY-MM-DD>/data/reviews.csv.gz`
   - Nội dung: Toàn bộ lịch sử nhận xét của khách thuê (`listing_id`, `id`, `date`, `reviewer_id`, `reviewer_name`, `comments`). Đây là đầu vào cho phần phân tích LLM ở Bước 4 (`04_UNSTRUCTURED_DATA_AND_LLM_PIPELINE.md`).
4. **Bản đồ Ranh giới Khu vực (`neighbourhoods.geojson`):**
   - URL: `https://data.insideairbnb.com/<data_root>/<YYYY-MM-DD>/visualisations/neighbourhoods.geojson`
   - Nội dung: Đa giác địa lý (`Polygon`/`MultiPolygon`) của các khu vực hành chính, khớp với cột `neighbourhood_cleansed` trong bảng `listings`.

---

## 3. KỸ THUẬT TẢI TỆP AN TOÀN & KIỂM TRA TOÀN VẸN (`src/download.py`)
Khi viết hàm tải tệp qua HTTP (sử dụng thư viện `requests` hoặc `urllib`), AI Agent phải tuân thủ các nguyên tắc kỹ thuật từ **Bài 6**:

### 3.1. Cơ chế tải Idempotent (Không tải lại nếu đã hợp lệ)
- Trước khi tải một tệp tại `data/raw/<snapshot>/<filename>`, kiểm tra xem tệp đã tồn tại trên đĩa và có kích thước $> 0$ byte hay chưa.
- Nếu tệp đã tồn tại và vượt qua bước kiểm tra toàn vẹn (mục 3.2), bỏ qua bước tải để tiết kiệm băng thông (trừ khi có cờ `--force-download`).
- Khi tải tệp lớn (`.csv.gz`), sử dụng `requests.get(url, stream=True, timeout=60)` kèm `resp.raise_for_status()`, ghi ra tệp tạm `.part` rồi mới đổi tên (`Path.replace`) sang tên chính thức để tránh tạo ra tệp hỏng nếu đứt mạng giữa chừng.

### 3.2. Bộ 4 kiểm tra toàn vẹn (Integrity Checks) bắt buộc sau khi tải
Mỗi tệp tải về phải được xác thực tự động và ghi log:
1. **Kiểm tra định dạng nén Gzip:** Mở thử bằng `gzip.open(filepath, "rb")` và đọc khối byte đầu tiên để chắc chắn luồng nén không bị cụt (`EOFError`) hay trả về trang lỗi HTML thay vì file nén.
2. **Kiểm tra bộ cột bắt buộc (Schema Check):** Đọc 5 dòng đầu (`nrows=5`) để xác nhận sự tồn tại của các cột cốt lõi:
   - `listings.csv.gz`: phải có `{"id", "last_scraped", "neighbourhood_cleansed", "room_type", "price", "minimum_nights"}`.
   - `calendar.csv.gz`: phải có `{"listing_id", "date", "available", "price"}`.
   - `reviews.csv.gz`: phải có `{"listing_id", "id", "date", "comments"}`.
3. **Kiểm tra số lượng bản ghi $> 0$:** Đảm bảo bảng không rỗng.
4. **Kiểm tra mã băm / kích thước (Manifest Log):** Ghi nhận kích thước tệp (bytes), mã băm `SHA-256` và số dòng thô vào một tệp nhật ký `data/processed/download_manifest.csv` để đối chiếu tính tái lập.

---

## 4. LÝ THUYẾT CỐT LÕI BÀI 6: "CSV KHÔNG LƯU KIỂU DỮ LIỆU"
Đây là một trong những bẫy quan trọng nhất của môn học (nhấn mạnh trong **Bài 4, Bài 6, Bài 8**):

### 4.1. Các rủi ro khi đọc CSV bằng `pd.read_csv()` mặc định
- **Mất kiểu dữ liệu của mã định danh (`id`, `listing_id`, `host_id`):** Nếu có một vài dòng lỗi hoặc khi xuất ra rồi đọc lại, mã ID có thể bị đổi thành `float64` (ví dụ `52811.0`) hoặc mất số `0` ở đầu. Giải pháp: Ép kiểu tường minh `dtype={"id": "int64"}` hoặc `"string"`.
- **Cột hỗn hợp kiểu dữ liệu (`DtypeWarning`):** Cột `price` chứa ký hiệu tiền tệ và dấu phẩy (`"$45,647.00"`), cột `bathrooms_text` chứa `"1.5 shared baths"`, cột `available` trong `calendar` chứa `"t"` và `"f"`.
- **Ký hiệu giá trị thiếu ẩn danh:** Ngoài ô trống `""`, dữ liệu thực tế có thể dùng `"?"`, `"N/A"`, `"null"`, `"none"`. Cần truyền tham số `na_values` phù hợp.
- **Mất chỉ mục hoặc sinh cột `Unnamed: 0`:** Khi lưu bảng bằng `df.to_csv()`, nếu không truyền `index=False` (khi index chỉ là số thứ tự vô nghĩa) hoặc ngược lại làm mất mã `id` khi `id` đang nằm ở `index` (bẫy "AI hay sai" ở Bài 4 & Bài 8!).
  - **Quy tắc vàng:** Trước khi lưu file xuống `data/processed/`, luôn kiểm tra xem khóa chính (`id`, `snapshot`) đang là cột hay là `index`. Nếu đang ở `index`, phải gọi `.reset_index()` hoặc truyền `index=True` kèm `index_label` rõ ràng.

### 4.2. Khuyến nghị sử dụng Parquet cho dữ liệu trung gian
- Định dạng CSV không lưu schema (`datetime64`, `category`, `float64`).
- Trong thư mục `data/processed/`, nhóm nên lưu các bảng đã làm sạch dưới dạng **Parquet** (`.parquet` — giữ nguyên kiểu dữ liệu, nén tốt, đọc cực nhanh) song song với các tệp `kpi_*.csv` theo yêu cầu đề bài.

---

## 5. SỬ DỤNG DUCKDB ĐỂ XỬ LÝ TỆP LỚN (`calendar.csv.gz` & `reviews.csv.gz`)
Theo khung kiến thức của môn học (**Bài 6: SQL và DuckDB**), tệp `calendar.csv.gz` qua 4 mốc chụp có thể lên tới $10 - 40$ triệu dòng. Nếu dùng `pd.read_csv()` nạp toàn bộ 4 mốc vào RAM cùng lúc sẽ dễ gây tràn bộ nhớ (`MemoryError`).

AI Agent nên áp dụng **DuckDB** (engine truy vấn phân tích hướng cột chạy trực tiếp trên file nén `.csv.gz` mà không cần giải nén ra đĩa):

```python
import duckdb
import pandas as pd

def load_calendar_summary_duckdb(calendar_gz_path: str, snapshot_date: str) -> pd.DataFrame:
    """
    Truy vấn trực tiếp trên file .csv.gz bằng DuckDB để tổng hợp theo tháng,
    giúp tiết kiệm bộ nhớ RAM và tăng tốc độ thực thi gấp nhiều lần.
    """
    query = """
    SELECT
        listing_id,
         CAST( ? AS DATE ) AS snapshot_date,
        DATE_TRUNC('month', CAST(date AS DATE)) AS month_start,
        COUNT(*) AS total_days,
        SUM(CASE WHEN available = 'f' THEN 1 ELSE 0 END) AS booked_days,
        AVG(TRY_CAST(REGEXP_REPLACE(price, '[^0-9.]', '', 'g') AS DOUBLE)) AS avg_calendar_price
    FROM read_csv_auto(?, header=True)
    GROUP BY listing_id, month_start
    """
    with duckdb.connect(database=":memory:") as con:
        df_summary = con.execute(query, [snapshot_date, calendar_gz_path]).df()
    return df_summary
```

### Ưu điểm khi dùng DuckDB trong Bài tập lớn:
1. Đọc trực tiếp file `.csv.gz` bằng `read_csv_auto()` hoặc gộp nhiều mốc chụp bằng glob pattern.
2. Dễ dàng kiểm chứng chéo (cross-check) kết quả tính bằng Pandas với câu lệnh SQL tương đương (phục vụ bước **Kiểm chứng AI** trong `AI_USAGE.md`).

---

## 6. TẠO TẬP DỮ LIỆU MẪU (`data/samples/`) ĐỂ KIỂM THỬ NHANH
Đề bài yêu cầu thư mục `data/samples/` chứa:
1. **Mẫu nhỏ để test nhanh pipeline:** Trích xuất ngẫu nhiên có cố định `seed: 42` khoảng $200 - 500$ chỗ ở từ `listings` và các dòng tương ứng trong `calendar`, `reviews` để chạy thử toàn bộ pipeline trong vài giây khi phát triển code.
2. **Tệp $\ge 100$ nhãn tay (`review_id`, nhãn):** Phục vụ đánh giá LLM ở Bước 4.

---
> **CHUYỂN TIẾP QUY TRÌNH:** Sau khi dữ liệu thô đã được tải về `data/raw/` và kiểm tra toàn vẹn, tuyệt đối **không được tính KPI ngay**. AI Agent hãy đọc tiếp tệp **`02_DATA_CLEANING_AND_QA_RULES.md`** để triển khai quy trình xử lý chuỗi, thời gian, làm sạch dữ liệu và xuất báo cáo `qa_report.csv` (`src/qa.py`).
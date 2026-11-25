# [BƯỚC 0/5] TỔNG QUAN DỰ ÁN & KIẾN TRÚC HỆ THỐNG (PROJECT OVERVIEW & ARCHITECTURE)

> **LIÊN KẾT HỆ THỐNG TÀI LIỆU (AI NAVIGATION LINKS):**
> - **Tệp hiện tại:** `00_PROJECT_OVERVIEW_AND_ARCHITECTURE.md` (Điểm khởi đầu / Bản đồ kiến trúc toàn cục)
> - **Bước tiếp theo [Bước 1 - Thu thập & Lưu trữ]:** Đọc tệp `01_DATA_INGESTION_AND_STORAGE.md`
> - **Toàn bộ chuỗi quy trình (Pipeline Sequence):**
>   `00_PROJECT_OVERVIEW_AND_ARCHITECTURE.md` $\rightarrow$ `01_DATA_INGESTION_AND_STORAGE.md` $\rightarrow$ `02_DATA_CLEANING_AND_QA_RULES.md` $\rightarrow$ `03_TRANSFORMATION_AND_KPI_ENGINE.md` $\rightarrow$ `04_UNSTRUCTURED_DATA_AND_LLM_PIPELINE.md` $\rightarrow$ `05_VISUALIZATION_STORYTELLING_AND_DEFENSE.md`

---

## 1. CHỈ THỊ DÀNH CHO AI AGENT (SYSTEM PROMPT FOR AI)
Tài liệu này là tệp gốc trong bộ đặc tả kỹ thuật (Knowledge Base) phục vụ **Bài tập lớn: Inside Airbnb** thuộc học phần **Lập trình xử lý dữ liệu (UET.DSE2049)** tại Viện Trí tuệ nhân tạo - Trường ĐH Công nghệ, ĐHQGHN.

Khi AI Agent (Cursor, Claude Code, GitHub Copilot, Gemini...) đọc kho mã nguồn này để sinh code, sửa lỗi hoặc viết báo cáo, AI **bắt buộc** phải tuân thủ:
1. **Triết lý cốt lõi của môn học:** Dữ liệu thô $\rightarrow$ Dữ liệu sạch $\rightarrow$ Thông tin $\rightarrow$ Quyết định. Phân tích/mô hình hóa chỉ đáng tin khi phần chuẩn bị và làm sạch dữ liệu (QA) được thực hiện đúng.
2. **Tính tái lập (Reproducibility):** Mọi con số trong báo cáo và mọi biểu đồ trong `figures/` phải được sinh tự động hoàn toàn từ một lệnh chạy duy nhất (`python run_pipeline.py --config configs/<city>.yaml --skip-llm`).
3. **Khả năng giải thích (Explainability):** Sinh viên sẽ thi vấn đáp ở chế độ **Đóng (không dùng AI)** trong 20 phút. Do đó, code do AI gợi ý phải rõ ràng, tường minh, chia hàm nhỏ, có docstring và tuyệt đối không dùng các đoạn mã "hộp đen" tối nghĩa.

---

## 2. BỐI CẢNH NGHIỆP VỤ & MỤC TIÊU ĐẠT ĐIỂM TỐI ĐA
- **Vai trò:** Nhóm sinh viên (4–5 thành viên) đóng vai một **Đội phân tích dữ liệu (Data Analytics Team)** thực hiện hợp đồng phân tích thị trường lưu trú ngắn hạn Airbnb tại **01 thành phố cụ thể** qua **04 mốc chụp (snapshots)** cách nhau khoảng 1 quý.
- **Khách hàng mục tiêu (Bên đặt hàng):** Nhóm phải chọn rõ và ghi ngay ở đầu báo cáo một khách hàng cụ thể để định hướng mọi KPI và câu chuyện dữ liệu:
  - *Phương án A:* Chính quyền thành phố / Cơ quan quản lý đô thị (quan tâm đến quy hoạch, nhà ở bị thương mại hóa, vi phạm số đêm tối thiểu, mật độ tập trung theo khu vực).
  - *Phương án B:* Quỹ đầu tư bất động sản / Chuỗi quản lý homestay (quan tâm đến doanh thu kỳ vọng, tỷ lệ lấp đầy theo mùa, phân khúc giá, điểm đau của khách hàng từ đánh giá văn bản).
  - *Phương án C:* Hiệp hội du lịch địa phương (quan tâm đến trải nghiệm du khách đa ngôn ngữ, chất lượng dịch vụ, sự dịch chuyển không gian du lịch).

---

## 3. TIÊU CHÍ CHẤM ĐIỂM (RUBRIC 4 TRỤ CỘT)
Để đạt điểm $9.0 - 10.0$ (trọng số $60\%$ điểm học phần), sản phẩm phải xuất sắc ở cả 4 tiêu chí:
1. **Thiết kế và tái lập quy trình (Pipeline Design & Reproducibility):**
   - Tách mô-đun rõ ràng trong `src/`, tham số hóa hoàn toàn qua `configs/<city>.yaml`.
   - Clone repo sang máy mới, dựng môi trường theo `README.md`, chạy 1 lệnh là tái tạo đúng $100\%$ bảng số liệu và hình vẽ mà không cần gọi lại API trả phí hay dùng khóa API (nhờ cơ chế cache và cờ `--skip-llm`).
2. **Lưu trữ và thao tác dữ liệu (Data Storage & Manipulation):**
   - Xử lý đúng kiểu dữ liệu (`dtype`), chuỗi, regex, ngày giờ, bộ quy tắc kiểm tra chất lượng dữ liệu (`qa_report.csv`), ghép bảng và tính KPI chính xác bằng vectorization (Pandas/NumPy/DuckDB).
3. **Trực quan hóa và phát hiện (Visualization & Insights):**
   - Biểu đồ tuân thủ "5 điểm kiểm tra một hình" (Bài 12–13), bao phủ đủ 3 góc độ: Không gian, Thời gian, và Kết quả LLM. Lập luận bám sát số liệu, không suy diễn nhân quả quá đà.
4. **Làm việc nhóm, đạo đức và minh bạch AI (Teamwork, Ethics & AI Transparency):**
   - Commit đều đặn từ đầu kỳ, gắn tag `git tag final`.
   - Không lộ API key, không commit dữ liệu thô (`data/raw/`), khai báo `AI_USAGE.md` trung thực, chi tiết.

---

## 4. CẤU TRÚC THƯ MỤC CHUẨN BẮT BUỘC (REPOSITORY STRUCTURE)
AI Agent khi khởi tạo hoặc chỉnh sửa dự án phải giữ nguyên cấu trúc cây thư mục sau:

```text
2627-LTXLDL-Airbnb-<TenNhom>/
├── configs/
│   └── <city>.yaml          # Cấu hình thành phố: data_root, snapshots, tham số QA/KPI/LLM, seed
├── data/
│   ├── raw/                 # Dữ liệu thô (.csv.gz, .geojson): BẮT BUỘC trong .gitignore
│   ├── processed/           # Dữ liệu sạch, kpi_*.csv, llm_cache.jsonl (commit nếu < 50 MB)
│   └── samples/             # Mẫu nhỏ test nhanh + tệp >= 100 nhãn tay (review_id, nhãn)
├── src/                     # Mã nguồn quy trình chính (tách mô-đun độc lập, có hàm rõ ràng)
│   ├── __init__.py
│   ├── download.py          # Bước 1: Tải dữ liệu + kiểm tra toàn vẹn (Xem 01_DATA_INGESTION...)
│   ├── qa.py                # Bước 2: Làm sạch + chạy bộ quy tắc QA, xuất qa_report.csv (Xem 02_...)
│   ├── kpi.py               # Bước 3: Tính toán các bảng KPI (Xem 03_TRANSFORMATION...)
│   ├── llm.py               # Bước 4a: Trích xuất thông tin bằng Gemini API + Cache (Xem 04_...)
│   ├── baseline.py          # Bước 4b: Phương pháp đối chứng bằng từ khóa/regex (Xem 04_...)
│   ├── evaluate.py          # Bước 4c: Chấm điểm LLM vs Baseline trên >= 100 nhãn tay (Xem 04_...)
│   └── viz.py               # Bước 5: Sinh toàn bộ hình vẽ tự động vào figures/ (Xem 05_...)
├── figures/                 # Chứa các biểu đồ (.png/.pdf) sinh tự động từ src/viz.py
├── reports/                 # Chứa report.pdf (<= 10 trang), qa_report.csv, data_dictionary.md
├── notebooks/               # Chứa Jupyter Notebook khám phá nháp (EDA), KHÔNG phải pipeline chính
├── run_pipeline.py          # Script điều phối trung tâm: gọi tuần tự các mô-đun trong src/
├── .python-version          # Ghi 1 dòng duy nhất phiên bản Python đã kiểm thử (VD: 3.11.8)
├── .env.example             # Mẫu biến môi trường (VD: GEMINI_API_KEY=your_api_key_here)
├── .gitignore               # Loại bỏ data/raw/, .venv/, .env, __pycache__/, *.pyc
├── AI_USAGE.md              # Hồ sơ minh bạch sử dụng AI (bắt buộc)
├── README.md                # Hướng dẫn cài đặt, biến môi trường, lệnh chạy tái lập kết quả
└── requirements.txt         # Danh sách thư viện ghim phiên bản bằng dấu == (VD: pandas==2.2.2)
```

---

## 5. ĐẶC TẢ TỆP CẤU HÌNH `configs/<city>.yaml`
Tuyệt đối **không hard-code** (gán cứng) đường dẫn URL, tên thành phố, đơn vị tiền tệ, hay ngưỡng lọc ngoại lai vào trong code Python. Mọi tham số phải được đọc từ `configs/<city>.yaml`:

```yaml
city: santiago
data_root: chile/rm/santiago          # Dựng URL: https://data.insideairbnb.com/<data_root>/<snapshot>/...
currency: CLP                         # Đơn vị tiền tệ địa phương (bắt buộc hiển thị trên KPI & biểu đồ)
snapshots:                            # Bắt buộc tối thiểu 4 mốc chụp cách nhau khoảng 1 quý
  - "2025-09-27"
  - "2025-12-29"
  - "2026-03-30"
  - "2026-06-29"

qa:
  price_min: 1.0                      # Giá <= 0 hoặc < price_min bị coi là vi phạm quy tắc
  price_max_local: 5000000            # Ngưỡng trần ngoại lai giá theo đồng tiền địa phương
  min_nights_cap: 365                 # Ngưỡng trần số đêm tối thiểu (lọc các listing ảo 999 đêm)
  dedupe_keys: ["id", "last_scraped"] # Khóa nghiệp vụ kiểm tra trùng lặp bản ghi

kpi:
  area_col: "neighbourhood_cleansed"  # Cột phân vùng không gian chuẩn

llm:
  provider: "gemini"
  model_name: "gemini-2.5-flash"
  sample_size: 3000                   # Cỡ mẫu đánh giá rút trích (nhóm tự giải thích lý do chọn)
  manual_label_size: 120              # Số lượng mẫu gán nhãn tay (>= 100 mẫu)
  aspects:                            # Các khía cạnh chuẩn hóa để trích xuất
    - "vị trí"
    - "sạch sẽ"
    - "chủ nhà"
    - "giá trị"
    - "tiện nghi"
    - "độ ồn"
    - "an toàn"
  cache_path: "data/processed/llm_cache.jsonl"
  manual_labels_path: "data/samples/manual_labels.csv"

seed: 42                              # Cố định hạt giống ngẫu nhiên cho toàn bộ pipeline
```

---

## 6. QUY TẮC QUẢN LÝ MÔI TRƯỜNG & BẢO MẬT (DEVOPS RULES)
1. **Bẫy phiên bản Python (Bài kiểm tra số 1 - Câu 2):**
   - Tệp `.python-version` ghi rõ phiên bản Python (ví dụ `3.11.9`).
   - Trong `README.md`, phải hướng dẫn người chấm tạo môi trường ảo khớp với `.python-version` trước khi chạy `pip install -r requirements.txt`, vì nhiều thư viện biên dịch theo phiên bản Python cụ thể.
2. **Bảo mật khóa API (Mục 3.5 Chính sách AI):**
   - Khóa `GEMINI_API_KEY` chỉ được đọc qua `os.environ.get("GEMINI_API_KEY")` (kết hợp `python-dotenv` đọc tệp `.env` cục bộ).
   - Khi giảng viên chấm bài, giảng viên **không sử dụng khóa API**. Do đó, `run_pipeline.py` phải có tùy chọn `--skip-llm` (hoặc tự động đọc từ `data/processed/llm_cache.jsonl` nếu tệp cache đã tồn tại).
3. **Quy trình 5 bước làm việc với AI có trách nhiệm (Bài 1):**
   - (1) Tự phác thảo đầu vào/đầu ra $\rightarrow$ (2) Viết prompt rõ bối cảnh $\rightarrow$ (3) Đọc hiểu từng dòng code AI sinh ra $\rightarrow$ (4) Kiểm chứng trên mẫu nhỏ tự tính tay $\rightarrow$ (5) Ghi chép vào `AI_USAGE.md`.

---
> **CHUYỂN TIẾP QUY TRÌNH:** Sau khi nắm vững cấu trúc dự án và tệp cấu hình YAML, AI Agent hãy đọc tiếp tệp **`01_DATA_INGESTION_AND_STORAGE.md`** để triển khai mô-đun thu thập, giải nén, kiểm tra toàn vẹn và lưu trữ dữ liệu (`src/download.py`).
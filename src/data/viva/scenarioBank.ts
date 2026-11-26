import type { VivaQuestion } from '../../types';

export const VIVA_SCENARIO_BANK: VivaQuestion[] = [
  {
    "id": "vs-001",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi server Inside Airbnb đổi URL hoặc chặn HTTP 403 trên một snapshot mới.",
    "question": "Tình huống: Nếu thêm snapshot `\"2026-09-15\"` vào `configs/mexico-city.yaml` nhưng CDN Inside Airbnb trả HTTP 403 cho URL đó, `src/download.py` phản ứng ra sao và cần thao tác gì đúng chuẩn?",
    "quickAnswer": "`download_file()` dừng retry ngay khi thấy HTTP 403/404, in `[ERR]`, giữ nguyên file local nếu đã có sẵn hoặc trả `False` khiến `main()` exit code `1`. Giải pháp đúng chuẩn là cập nhật URL hợp lệ/file raw cục bộ vào đúng thư mục `data/raw/2026-09-15/` trước khi chạy lại `run_pipeline.py` (không fake dữ liệu).",
    "explanation": "Mã 403/404 là lỗi vĩnh viễn phía quyền/tài nguyên, nên thử lại theo Exponential Backoff không có tác dụng. Nhờ kiểm tra sớm ở `src/download.py:L105-L108`, pipeline báo lỗi nhanh thay vì chờ timeout hàng chục giây.",
    "projectLink": "src/download.py:L88-L110",
    "codeLocation": "src/download.py:L88-L110",
    "proofExample": "Thực tế snapshot `2025-09-27` trong repo đã tận dụng nhánh `[SKIP]` khi tệp local `st_size > 0` đã tồn tại sẵn.",
    "followUpQuestions": [
      "Nếu `download.py` trả `sys.exit(1)` khi thiếu 1 trong 12 tệp, `run_pipeline.py` có chạy tiếp bước `filter` không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `download.py` trả `sys.exit(1)` khi thiếu 1 trong 12 tệp, `run_pipeline.py` có chạy tiếp bước `filter` không?",
        "a": "Không! `run_pipeline.py` gọi `subprocess.run(..., check=True)` nên dừng toàn bộ pipeline ngay để tránh chạy bước sau trên bộ snapshot khuyết."
      }
    ],
    "commonMistakes": [
      "Cho rằng `download.py` tự thử lại 3 lần với HTTP 403.",
      "Quên kiểm tra `dest.stat().st_size > 0` khiến tệp 0 byte cũng bị skip."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vs-002",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phòng thủ trường hợp CDN trả HTTP 200 OK nhưng nội dung là trang HTML bảo trì/WAF.",
    "question": "Tình huống: CDN trả `status_code = 200` nhưng thân phản hồi thực chất là trang HTML thông báo `\"Access Denied\"` được lưu thành `listings.csv.gz`. Chuyện gì xảy ra ở bước nào trong pipeline hiện tại và cách phát hiện sớm là gì?",
    "quickAnswer": "`download_file()` hiện chưa kiểm magic bytes gzip (`1f 8b`) nên có thể ghi file HTML sang `listings.csv.gz` và chỉ bị lỗi `BadGzipFile` ở bước `filter_data_from_sheet.py` khi `pd.read_csv(..., compression=\"infer\")` giải nén. Giải pháp cải tiến là kiểm `Content-Type` không chứa `text/html` và 2 byte đầu `1f 8b` trước khi rename `.tmp`.",
    "explanation": "Đây là lỗ hổng thực tế phổ biến với dữ liệu web: HTTP 200 không đồng nghĩa payload hợp lệ (Bài 6). Bước rename nguyên tử `.tmp -> dest` giúp dễ bổ sung kiểm tra trước khi commit file đích.",
    "projectLink": "src/download.py:L120-L132; src/filter_data_from_sheet.py:L131",
    "codeLocation": "src/download.py:L120-L132; src/filter_data_from_sheet.py:L131",
    "proofExample": "Trong `_filter_raw_by_ids` (`src/filter_data_from_sheet.py:L131`), nếu file `.csv.gz` chứa HTML, `gzip` sẽ ném `BadGzipFile` ngay chunk đầu tiên.",
    "followUpQuestions": [
      "Với file Google Sheets trong `_read_sheet()`, hiện tại code đã xử lý tình huống trả HTML thay CSV bằng cách nào?"
    ],
    "followUpQA": [
      {
        "q": "Với file Google Sheets trong `_read_sheet()`, hiện tại code đã xử lý tình huống trả HTML thay CSV bằng cách nào?",
        "a": "`_read_sheet()` bắt `(requests.RequestException, pd.errors.ParserError)` rồi thử fallback sang URL dự phòng hoặc báo lỗi cấu trúc cột rõ ràng."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `resp.raise_for_status()` bắt được trang lỗi trả mã 200 OK.",
      "Quên xóa tệp `.tmp` hỏng nếu kiểm tra thất bại."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vs-003",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống chuyển sang thành phố châu Âu dùng dấu `;` hoặc dấu phẩy thập phân `,`.",
    "question": "Tình huống: Nếu mở rộng pipeline sang dữ liệu thành phố tại châu Âu (ví dụ Paris/Berlin), trong đó file `price` viết dạng `\"1.250,50 €\"` (dấu chấm ngăn nghìn, dấu phẩy thập phân), biểu thức Regex ở `src/qa.py` gây ra sai số nghiêm trọng gì và phải sửa thế nào?",
    "quickAnswer": "`src/qa.py:L93` dùng `r\"[^\\d.-]\"` sẽ xóa dấu phẩy và biến `\"1.250,50\"` thành `\"1.25050\"` -> `1.25` (giảm giá 1.000 lần!). Phải cấu hình quy ước dấu thập phân trong YAML (ví dụ `decimal_sep: \",\"`) hoặc chuẩn hóa bỏ dấu ngăn nghìn `.` trước rồi đổi `,` sang `.` trước khi `pd.to_numeric()`.",
    "explanation": "Biến đổi chuỗi số phải bám sát locale của dữ liệu nguồn thay vì giả định mặc định chuẩn Mỹ/Mexico (`$1,250.00`).",
    "projectLink": "src/qa.py:L93",
    "codeLocation": "src/qa.py:L93",
    "proofExample": "Với `\"$1,250.00\"` (CDMX), `r\"[^\\d.-]\"` cho `\"1250.00\" -> 1250.0` hoàn toàn đúng; với `\"1.250,50 €\"` sẽ sai lệch 1.000x mà không hề báo `qa_price_parse_error`!",
    "followUpQuestions": [
      "Nếu thay đổi locale sang dấu phẩy thập phân, ngoài cột `price`, còn cột nào cần kiểm tra trong `qa.py`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thay đổi locale sang dấu phẩy thập phân, ngoài cột `price`, còn cột nào cần kiểm tra trong `qa.py`?",
        "a": "Mọi cột số ép bằng `pd.to_numeric` như `review_scores_rating` hoặc `reviews_per_month` nếu nguồn dùng dấu phẩy thập phân."
      }
    ],
    "commonMistakes": [
      "Tưởng `pd.to_numeric(..., errors=\"coerce\")` tự động nhận biết số theo định dạng từng quốc gia.",
      "Đoán code hiện tại sẽ báo lỗi `parse_error = True` cho `\"1.250,50\"` (nó đọc ra số sai `1.2505` êm ru!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-004",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phân tích thay đổi khi cột `id` mất `dtype=\"string\"` ở một thành phố mới.",
    "question": "Tình huống: Nếu bỏ `dtype={\"id\": \"string\", \"listing_id\": \"string\"}` trong `_filter_raw_by_ids` và `_read_sheet` khi chạy trên bộ Inside Airbnb có mã 19 chữ số (ví dụ `1495709040675944121`), hậu quả cụ thể nào xảy ra ở tập kết quả?",
    "quickAnswer": "Một phần hoặc toàn bộ ID 19 chữ số khi ép sang `float64` (chỉ chính xác 15–17 chữ số thập phân, $2^{53} \\approx 9\\times 10^{15}$) bị làm tròn chữ số cuối thành `1.4957090406759442e+18`, dẫn tới `isin(allowed)` khớp trượt hoặc gộp nhầm nhiều listing/review khác nhau vào cùng một mã!",
    "explanation": "CSV không lưu kiểu dữ liệu; ép `string` ngay lúc đọc (`read_csv`) là lớp phòng vệ bắt buộc của Bài 6.",
    "projectLink": "src/filter_data_from_sheet.py:L129-L132",
    "codeLocation": "src/filter_data_from_sheet.py:L129-L132",
    "proofExample": "ID `1495709040675944121` là một trong 2 căn hộ giá >153k MXN thật tại Cuauhtémoc dài tới 19 chữ số.",
    "followUpQuestions": [
      "Nếu một cột ID được lưu lại thành `\"12345.0\"` do từng bị qua `float64`, `_normalise_id` hiện tại xử lý thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một cột ID được lưu lại thành `\"12345.0\"` do từng bị qua `float64`, `_normalise_id` hiện tại xử lý thế nào?",
        "a": "`_normalise_id` chỉ `.astype(\"string\").str.strip()`, KHÔNG tự cắt `\".0\"` — nên bắt buộc phải ép `string` ngay từ đầu lúc `pd.read_csv`."
      }
    ],
    "commonMistakes": [
      "Nghĩ kiểu `int64` là đủ dùng luôn không cần `string` (nếu cột CSV có 1 ô `NaN` hoặc `\"abc\"`, pandas tự đẩy cả cột lên `float64` ngay lập tức!)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-005",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Tình huống thay đổi thứ tự danh sách `snapshots` trong `configs/mexico-city.yaml`.",
    "question": "Tình huống: Nếu người vận hành vô tình đảo thứ tự `snapshots` trong YAML thành `[2026-06-15, 2025-09-27, 2026-03-30, 2025-12-29]`, các bước `qa.py`, `kpi.py`, `llm.py` và `viz.py` bị ảnh hưởng ra sao?",
    "quickAnswer": "`filter_data_from_sheet.py:L166`, `qa.py:L327` và `kpi.py:L73` đều gọi `sorted(..., key=pd.to_datetime)` nên nhãn `t1..t4` và chiều thời gian `Q1..Q3` VẪN CHÍNH XÁC. Tuy nhiên `llm.py:L67` duyệt `reversed(snapshots)` vẫn kiểm tra lần lượt (nếu các mốc có đủ `reviews_llm.csv` thì cũng cho kết quả đồng nhất).",
    "explanation": "Việc chuẩn hóa sắp xếp theo `pd.to_datetime` thay vì tin vào thứ tự nhập YAML giúp bảo toàn tính bất biến trước thao tác cấu hình.",
    "projectLink": "src/filter_data_from_sheet.py:L166; src/qa.py:L327; src/kpi.py:L73",
    "codeLocation": "src/filter_data_from_sheet.py:L166; src/qa.py:L327; src/kpi.py:L73",
    "proofExample": "Không bị đảo ngược `Review Velocity = (nr_t4 - nr_t1)` thành số âm hay gán sai nhãn `t1`.",
    "followUpQuestions": [
      "Khi chạy từ 4 snapshot lên **5 snapshot** (`t1..t5`) chỉ bằng cách sửa YAML, bảng nào tự thích ứng và hàm nào trong `src/viz.py` cần lưu ý?"
    ],
    "followUpQA": [
      {
        "q": "Khi chạy từ 4 snapshot lên **5 snapshot** (`t1..t5`) chỉ bằng cách sửa YAML, bảng nào tự thích ứng và hàm nào trong `src/viz.py` cần lưu ý?",
        "a": "`qa.py` và `kpi.py` tự sinh động cột `t1..t5` & `Q1..Q4`, nhưng `viz.py` dùng lưới `nrows = ceil(n/2)` (cũng tự động thích ứng lưới 3×2 cho 5 mốc!)."
      }
    ],
    "commonMistakes": [
      "Cho rằng `t1` luôn là phần tử đầu tiên trong list YAML bất chấp ngày tháng."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-006",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi tăng quy mô mẫu Google Sheets từ 1.000 lên 50.000 listing.",
    "question": "Tình huống: Khi tăng tập mẫu từ `1.000` listing lên `50.000` listing trên nhiều thành phố, khâu nào trong pipeline có nguy cơ thắt cổ chai trước (RAM/CPU/API) và cách xử lý tương ứng cho từng khâu là gì?",
    "quickAnswer": "Có 3 nút cổ chai khác nhau: (1) `_filter_raw_by_ids`: bảng lọc đầu ra tăng gấp 50 lần trong RAM -> cần ghi append từng chunk hoặc xuất Parquet; (2) `llm.py`: chi phí API và thời gian chờ ~50x (`~$10+` và hàng nghìn batch dễ đụng RPD) -> bắt buộc tăng batch hoặc chia nhiều ngày với `llm_cache.jsonl`; (3) `kpi.py`: vẫn nhanh nhờ vector hóa nhưng nên thay `iterrows` không cần thiết nếu có.",
    "explanation": "Tư duy kỹ sư dữ liệu là phân tích nút cổ chai riêng ở I/O, RAM, Network API và Compute thay vì tối ưu mù quáng.",
    "projectLink": "src/filter_data_from_sheet.py:L131; src/llm.py:L310; src/evaluate.py:L218",
    "codeLocation": "src/filter_data_from_sheet.py:L131; src/llm.py:L310; src/evaluate.py:L218",
    "proofExample": "Thực tế cả thành phố CDMX t4 có 1.719.730 review -> `evaluate.py` ước tính tốn `$349.11 USD`.",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, vì sao vẫn đọc được file `calendar.csv.gz` hàng chục triệu dòng dù máy chỉ có 8 GB RAM?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, vì sao vẫn đọc được file `calendar.csv.gz` hàng chục triệu dòng dù máy chỉ có 8 GB RAM?",
        "a": "Nhờ tham số `chunksize=100_000` nạp từng lát cắt 100.000 dòng, lọc ngay `isin(allowed)` rồi mới gộp `pd.concat(chunks)`."
      }
    ],
    "commonMistakes": [
      "Tối ưu vi mô vòng lặp Python trong `kpi.py` (vốn chạy <0.1s) trong khi bỏ qua độ trễ I/O đọc lại `calendar.csv.gz` và hạn mức RPD API Gemini."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-007",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống 1 trong 1.000 listing bị xóa khỏi nền tảng Airbnb ở snapshot `t4`.",
    "question": "Tình huống: Giả sử căn hộ `\"888\"` có mặt ở `t1, t2, t3` nhưng biến mất khỏi `listings.csv.gz` ở `t4` (chủ nhà gỡ tin đăng). `kpi.py` xử lý panel không cân bằng (unbalanced panel) lúc đó như thế nào?",
    "quickAnswer": "Ở `src/kpi.py:L231`, `base_idx = snapshots[-1]` lấy chỉ mục `id` từ `t4`! Do đó nếu `\"888\"` biến mất khỏi `t4`, toàn bộ dòng `\"888\"` sẽ KHÔNG có trong `kpi_by_listing.csv` dù có ở `t1..t3` — đây là giới hạn giả định balanced panel tại `L231`.",
    "explanation": "Nhờ đọc kỹ `L231`, sinh viên phát hiện chính xác giả định thiết kế quan trọng: `build_kpi_by_listing()` dựa trên tập ID của `t4`, hoàn toàn khớp với điều kiện mẫu cố định 1.000 căn hiện hữu ở cả 4 kỳ của Nhóm 4, nhưng sẽ thiếu dòng nếu áp dụng cho unbalanced panel.",
    "projectLink": "src/kpi.py:L231, L264",
    "codeLocation": "src/kpi.py:L231, L264",
    "proofExample": "Muốn hỗ trợ unbalanced panel khi áp dụng cho dữ liệu mới, chỉ cần đổi `base_idx` thành hợp `Index.union` tất cả snapshot.",
    "followUpQuestions": [
      "Trong `compute_review_velocities()` (`L131`), nếu `\"888\"` thiếu ở `t4` nhưng vẫn giữ trong union `base`, kết quả `RV_q3` ra gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong `compute_review_velocities()` (`L131`), nếu `\"888\"` thiếu ở `t4` nhưng vẫn giữ trong union `base`, kết quả `RV_q3` ra gì?",
        "a": "Index Alignment tự động cho `NaN - nr_t3 = NaN` và mặt nạ `valid_pair = False` giữ an toàn tuyệt đối."
      }
    ],
    "commonMistakes": [
      "Tưởng `build_kpi_by_listing()` tự động lấy hợp (union) ID của cả 4 snapshot `t1..t4`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-008",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "File I/O",
      "API"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi Google Sheet đổi tên tab hoặc bị mất quyền truy cập công khai.",
    "question": "Tình huống: Nếu chủ sở hữu Google Sheet tắt quyền \"Anyone with the link can view\" hoặc đổi tên tab `\"Listing\"` thành `\"Listings_v2\"` mà không sửa `configs/mexico-city.yaml`, điều gì xảy ra khi chạy `src/filter_data_from_sheet.py`?",
    "quickAnswer": "Nếu tắt quyền chia sẻ, `/gviz/tq?tqx=out:csv` trả về trang HTML đăng nhập Google -> `_read_sheet` báo lỗi `ParserError` / `ValueError`. Nếu đổi tên tab `\"Listing\"` mà vẫn để config cũ, Google Visualization API có thể trả mặc định về sheet đầu tiên (hoặc lỗi cột thiếu `listing_id`), kích hoạt `KeyError` ngay khi lọc cột.",
    "explanation": "Phải kiểm tra tính khả dụng đầu vào sớm (fail-fast) trước khi ghi đè file trong `data/processed/`.",
    "projectLink": "src/filter_data_from_sheet.py:L40-L60",
    "codeLocation": "src/filter_data_from_sheet.py:L40-L60",
    "proofExample": "Code lưu tên tab qua `configs/mexico-city.yaml` (`listing_sheet`, `review_sheet`) nên chỉ cần cập nhật YAML là khớp.",
    "followUpQuestions": [
      "Vì sao trên Windows/Linux đều cần truyền `quote(sheet_name)` khi ghép URL Google Sheets?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao trên Windows/Linux đều cần truyền `quote(sheet_name)` khi ghép URL Google Sheets?",
        "a": "Để mã hóa dấu cách (`\"Mẫu LLM\"` -> `M%E1%BA%ABu%20LLM`) tránh hỏng chuỗi query HTTP."
      }
    ],
    "commonMistakes": [
      "Nghĩ Google Visualization API luôn trả HTTP 404 khi sai tên tab (nó thường trả HTTP 200 với tab đầu tiên hoặc HTML!)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-009",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống 100% giá ở mốc `t2` bị mất (`NaN`) — vì sao KHÔNG được `dropna()` hay `ffill()`.",
    "question": "Tình huống: Trong dữ liệu CDMX tại mốc `t2` (2025-12-29), toàn bộ 1.000/1.000 căn đều thiếu cột `price`. Tại sao không nên dùng `df.dropna()` hoặc lấy giá `t1` điền sang (`ffill`) vào `t2`?",
    "quickAnswer": "Nếu gọi `df.dropna()`, cả 1.000 bản ghi `t2` bị xóa sạch khiến `Occ_1-30` (997 căn hợp lệ), `Ghost Rate` (0.3%) và `Review Velocity Q1/Q2` ở `t2` mất trắng! Còn nếu dùng `ffill()` lấy giá `t1` đắp sang `t2`, ta sẽ ngụy tạo \"lạm phát 0%\" vào đúng mùa cao điểm cuối năm tháng 12!",
    "explanation": "Nguyên tắc Bài 10: phân biệt thiếu cơ cấu hệ thống từ nguồn dữ liệu -> gắn cờ `qa_missing_price = True`, giữ `NaN` ở cột giá để các KPI độc lập không bị hủy hoại.",
    "projectLink": "src/qa.py:L95-L150; src/kpi.py:L36-L48",
    "codeLocation": "src/qa.py:L95-L150; src/kpi.py:L36-L48",
    "proofExample": "Kết quả thực tế: tại `t2`, `valid_price_count = 0`, nhưng `occ_n = 997`, `review_velocity_n = 1.000` và `ghost_n = 1.000` vẫn được tính chính xác.",
    "followUpQuestions": [
      "Trong `src/viz.py`, 2 biểu đồ giá qua 4 mốc hiển thị mốc `t2` như thế nào để đảm bảo trung thực?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, 2 biểu đồ giá qua 4 mốc hiển thị mốc `t2` như thế nào để đảm bảo trung thực?",
        "a": "`plot_ppg_snapshots()` vẽ ô trống ghi rõ `\"Thiếu dữ liệu giá tại snapshot này (n = 0)\"`, còn Heatmap gắn nhãn chữ `\"NA\"` bằng `np.argwhere`."
      }
    ],
    "commonMistakes": [
      "Cho rằng `t2` bị lỗi trắng toàn bảng nên không có giá trị phân tích nào.",
      "Dùng `ffill` giả định giá tháng 12 y hệt tháng 9."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-010",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Điều gì xảy ra nếu `RULE_PRICE_OUTLIER` chạy ở mốc `t2` mà quên kiểm tra `if not valid_p.empty:`?",
    "question": "Tình huống: Nếu một lập trình viên xóa câu kiểm tra `if not valid_p.empty:` tại `src/qa.py:L115` khi chạy mốc `t2` (100% giá `NaN`), điều gì xảy ra ở bước `quantile()` và `qa_report.csv`?",
    "quickAnswer": "`valid_p` rỗng vẫn trả `quantile -> NaN`; phép so sánh `price_numeric > np.nan` ra toàn `False` (không crash ngay lúc tính quantile), nhưng `p_low`/`p_high` in ra `NaN` và mất kiểm soát nhật ký QA. Hơn nữa ở code gốc `qa.py`, `if not valid_p.empty:` giúp ghi chú tường minh rằng không có tập giá hợp lệ để tính ngưỡng P01–P99 ở `t2`.",
    "explanation": "Viết guard `if not valid_p.empty:` vừa tránh cảnh báo `RuntimeWarning` trên lát cắt rỗng vừa thể hiện tư duy phòng thủ sạch sẽ.",
    "projectLink": "src/qa.py:L115-L130",
    "codeLocation": "src/qa.py:L115-L130",
    "proofExample": "Tại `t2`, `qa_report.csv` vẫn ghi đủ dòng `RULE_PRICE_OUTLIER` với `rows_affected = 0`.",
    "followUpQuestions": [
      "Nếu viết `valid_p.min()` hoặc `np.percentile(valid_p, 99)` với NumPy trên mảng rỗng thì sao?"
    ],
    "followUpQA": [
      {
        "q": "Nếu viết `valid_p.min()` hoặc `np.percentile(valid_p, 99)` với NumPy trên mảng rỗng thì sao?",
        "a": "`np.percentile([], 99)` và `min()` trên mảng NumPy rỗng ném ngay `IndexError`! Đó là lý do mọi hàm thống kê nên chặn sớm `if n == 0:`."
      }
    ],
    "commonMistakes": [
      "Nghĩ `Series([], dtype=float).quantile(0.99)` sẽ ném `ValueError` (thực tế pandas trả `NaN`, nhưng hàm tự viết `_iqr_stats` cần `if n == 0:` để tránh lỗi ở `min`/`max` hay chia 0!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-011",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phân tích độ nhạy khi thay đổi ngưỡng outlier từ `[P01, P99]` sang `1.5×IQR` hoặc winsorize.",
    "question": "Tình huống: Nếu giảng viên yêu cầu chuyển sang **xóa (trim)** hoặc **chặn ngưỡng (winsorize/clip)** các căn vượt `P99` (ví dụ 2 căn >153k MXN ở Cuauhtémoc) thay vì giữ nguyên như `qa.py` hiện tại, kết quả KPI nào thay đổi mạnh và KPI nào gần như đứng yên?",
    "quickAnswer": "**Mean Price / Mean PPG** ở Cuauhtémoc và toàn mẫu giảm rất mạnh (~20% ở Cuauhtémoc khi bỏ 2 căn >153k MXN), trong khi **Median Price / Median PPG** và **rIQR** hầu như giữ nguyên (hoặc biến động không đáng kể) do bản chất bền vững của thống kê thứ tự (rank statistics).",
    "explanation": "Chính vì muốn thấy sự đối lập giữa thước đo nhạy outlier (Mean) và bền vững (Median), Nhóm 4 giữ nguyên `price_mxn` hợp lệ và dùng cặp Mean vs Median minh họa trực tiếp trên Choropleth!",
    "projectLink": "src/qa.py:L115-L125; src/viz.py:L190-L240",
    "codeLocation": "src/qa.py:L115-L125; src/viz.py:L190-L240",
    "proofExample": "Tại `t4`, 2 căn `153.540 MXN` kéo Mean Cuauhtémoc lên `3.529 MXN` trong khi Median vẫn là `2.215 MXN`.",
    "followUpQuestions": [
      "Trong `qa_report.csv`, hiện tại các cột `kpi_before` và `kpi_after` của `RULE_PRICE_OUTLIER` bằng nhau — tại sao lại thế?"
    ],
    "followUpQA": [
      {
        "q": "Trong `qa_report.csv`, hiện tại các cột `kpi_before` và `kpi_after` của `RULE_PRICE_OUTLIER` bằng nhau — tại sao lại thế?",
        "a": "Vì `RULE_PRICE_OUTLIER` chỉ gắn cờ `qa_price_outlier = True` chứ KHÔNG chỉnh sửa hay xóa giá trị trong `price_mxn`, chứng minh sự nhất quán giữa code và báo cáo QA."
      }
    ],
    "commonMistakes": [
      "Cho rằng Median cũng tụt 20% nếu xóa `P99`.",
      "Nghĩ Winsorize làm mất số dòng `valid_price_count` (thực ra Winsorize giữ nguyên `n`, chỉ nén giá trị cực biên về trần P99)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-012",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi `availability_30 = 10` nhưng `availability_90 = 8`: tác động đến `Occ_31-90` và cơ chế chặn.",
    "question": "Tình huống: Trong dữ liệu thô giả sử xuất hiện 1 listing có `availability_30 = 10` và `availability_90 = 8` (bất khả thi về logic thời gian). Nếu không có `RULE_AVAILABILITY_BOUNDS` kiểm tra `a90 >= a30`, công thức `Occ_31-90` sẽ ra kết quả sai lệch thế nào?",
    "quickAnswer": "Không có kiểm tra chéo `a90 >= a30`: `a_31_90 = 8 - 10 = -2` -> `Occ_31-90 = (60 - (-2)) / 60 = 62 / 60 = 103.33%` (> 100%, vô nghĩa!). Nhờ `qa.py:L219-L226` gắn cờ `qa_invalid_availability = True` và đặt cột `*_clean = <NA>`, `kpi.py` loại bỏ căn lỗi này khỏi mẫu tính Occupancy.",
    "explanation": "Mọi ràng buộc nghiệp vụ liên cột (Cross-column Consistency) đều phải kiểm chứng trước bước chia tỷ lệ.",
    "projectLink": "src/qa.py:L215-L245; src/kpi.py:L195-L210",
    "codeLocation": "src/qa.py:L215-L245; src/kpi.py:L195-L210",
    "proofExample": "Kết quả thực tế tại CDMX: 100% căn hộ hợp lệ về `Availability` ở cả 4 mốc (`rows_affected = 0`).",
    "followUpQuestions": [
      "Lưu ý tinh tế ở `src/qa.py:L219`: nếu `a30` là `NaN` và `a90 = 8`, `valid_a90` bằng gì nhưng `inv_avail_mask` cuối cùng bằng gì?"
    ],
    "followUpQA": [
      {
        "q": "Lưu ý tinh tế ở `src/qa.py:L219`: nếu `a30` là `NaN` và `a90 = 8`, `valid_a90` bằng gì nhưng `inv_avail_mask` cuối cùng bằng gì?",
        "a": "`valid_a30` là `False` nên tổng hợp `inv_avail_mask = ~(valid_a30 & valid_a90 & valid_a365)` vẫn bằng `True` và vẫn gán `<NA>` an toàn cho cả 3 cột."
      }
    ],
    "commonMistakes": [
      "Chỉ kiểm `0 <= a30 <= 30` và `0 <= a90 <= 90` độc lập mà quên kiểm bất đẳng thức `a30 <= a90 <= a365`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-013",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Tại sao `RULE_ACCOMMODATES_BOUNDS` thiếu kiểm `% 1 != 0` khác với `RULE_REVIEWS_BOUNDS` — hệ quả nếu có `accommodates = 2.5`?",
    "question": "Tình huống: So sánh `src/qa.py:L188` (`RULE_ACCOMMODATES_BOUNDS`) và `src/qa.py:L254` (`RULE_REVIEWS_BOUNDS`). Nếu dữ liệu một thành phố mới có `accommodates = 2.5` (số thập phân), `qa.py` hiện tại sẽ gặp ngoại lệ gì ở bước `.astype(\"Int64\")`?",
    "quickAnswer": "`RULE_REVIEWS_BOUNDS` kiểm `(nr_series % 1) != 0` trước khi ép `\"Int64\"`, còn `RULE_ACCOMMODATES_BOUNDS` hiện chỉ kiểm `isna() | (acc <= 0)`! Do đó nếu gặp `2.5`, lệnh `acc_numeric.where(...).astype(\"Int64\")` ở `L191` sẽ ném `TypeError: cannot safely cast non-equivalent float64 to int64`! Cách vá đúng là bổ sung `| ((acc_numeric % 1) != 0)`.",
    "explanation": "Đọc kỹ từng hàm cho phép phát hiện chính xác khác biệt giữa 2 rule cùng kiểu `Int64` thay vì trả lời chung chung.",
    "projectLink": "src/qa.py:L188-L192, L254-L258",
    "codeLocation": "src/qa.py:L188-L192, L254-L258",
    "proofExample": "Trong dữ liệu CDMX hiện tại mọi `accommodates` đều là số nguyên `1..16` nên không vướng, nhưng đó là điểm có thể siết thêm.",
    "followUpQuestions": [
      "Tại sao chọn dtype `\"Int64\"` (chữ I hoa) thay vì `\"int64\"` (chữ i thường) của NumPy?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao chọn dtype `\"Int64\"` (chữ I hoa) thay vì `\"int64\"` (chữ i thường) của NumPy?",
        "a": "Vì `\"int64\"` thường không thể chứa `NaN`/`<NA>` (bắt buộc ép thành `float64` làm số người thành `2.0`), còn `\"Int64\"` nullable của pandas giữ vừa số nguyên vừa `<NA>`."
      }
    ],
    "commonMistakes": [
      "Tưởng cả hai rule `accommodates` và `number_of_reviews` đều kiểm phần dư `% 1 != 0` như nhau."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-014",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "Datetime"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi `last_review` bằng `NaN` trên căn hộ có `number_of_reviews == 0` vs `number_of_reviews == 25`.",
    "question": "Tình huống: Listing X có `number_of_reviews = 0, last_review = NaN`; Listing Y có `number_of_reviews = 25, last_review = NaN`. Tại sao `qa.py` đều KHÔNG gắn cờ `qa_invalid_last_review`, và ở `kpi.py` chúng nhận nhãn `Ghost_t1` như thế nào?",
    "quickAnswer": "Ở `RULE_LAST_REVIEW_VALIDITY` (`qa.py:L278`), thiếu `last_review` không bị coi là sai định dạng ngày (`invalid_lr_mask = False`). Sang `compute_ghost_listings` tại `t1` (`kpi.py:L164`): với Listing X (`nr == 0` và `a365 == 0`), công thức `(nr == 0)` trả về `Ghost_t1 = 1` ngay không cần `last_review`; với Listing Y (`nr == 25 > 0`, `last_review = NaN`), `(nr > 0)` và không xác định được `days_since_last_review` -> nếu `a365 == 0`, trạng thái `ghost_t1` rơi về `<NA>` (không chắc chắn)!",
    "explanation": "Tách biệt rạch ròi: thiếu thông tin hợp lệ vs lỗi sai phạm dữ liệu giúp không gắn cờ oan cho tin đăng mới chưa có khách.",
    "projectLink": "src/qa.py:L278-L295; src/kpi.py:L160-L180",
    "codeLocation": "src/qa.py:L278-L295; src/kpi.py:L160-L180",
    "proofExample": "Tại `t1` ở CDMX, 100% căn có review đều có `last_review` hợp lệ nên `ghost_n = 1.000`.",
    "followUpQuestions": [
      "Tại `t2, t3, t4`, công thức xác định Ghost Listing còn sử dụng cột `last_review` nữa không?"
    ],
    "followUpQA": [
      {
        "q": "Tại `t2, t3, t4`, công thức xác định Ghost Listing còn sử dụng cột `last_review` nữa không?",
        "a": "Không! Ở `t2..t4`, pipeline đã có biến động giữa 2 mốc (`Review Velocity`) nên dùng điều kiện `(a365 == 0) & (RV == 0)` chính xác hơn việc nhìn lại `last_review`."
      }
    ],
    "commonMistakes": [
      "Gắn cờ `qa_invalid_last_review = True` cho tất cả mọi hàng có `last_review` rỗng, khiến căn 0 review bị phạt oan."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-015",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi cột `price` có dữ liệu bị giảm ở `t2` nhưng `id` cũng lặp trong cùng snapshot.",
    "question": "Tình huống: Giả sử trong `listings.csv.gz` thô tại `t3`, có 2 dòng cùng `id = \"555\"` và cùng `last_scraped = \"2026-03-30\"`, dòng 1 ghi `price = \"$900.00\"` và dòng 2 ghi `price = \"$1,100.00\"`. `RULE_DEDUPLICATION` xử lý ra sao và có rủi ro gì?",
    "quickAnswer": "`qa.py:L74` gọi `df.duplicated(subset=dedupe_keys, keep=\"first\")` rồi giữ dòng đầu (`$900.00`) và xóa dòng sau (`$1,100.00`), ghi `rows_affected = 1` vào `qa_report.csv`. Rủi ro tiềm ẩn: nếu dòng trùng do cập nhật trạng thái trong cùng ngày mà dòng mới nằm sau, `keep=\"first\"` sẽ vô tình bỏ mất bản ghi mới hơn.",
    "explanation": "Lựa chọn `keep=\"first\"` đơn giản và nhất quán cho bản sao hoàn toàn, nhưng cần ghi rõ hạn chế khi tồn tại trùng khác nội dung (Conflict Duplicates).",
    "projectLink": "src/qa.py:L72-L82",
    "codeLocation": "src/qa.py:L72-L82",
    "proofExample": "Trong dữ liệu CDMX tại tag `final`, `rows_affected = 0` ở cả 4 snapshot (không có trùng lặp).",
    "followUpQuestions": [
      "Vì sao `RULE_DEDUPLICATION` dùng `subset=[\"id\", \"last_scraped\"]` chứ không gộp cả 4 snapshot rồi `drop_duplicates(subset=[\"id\"])`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao `RULE_DEDUPLICATION` dùng `subset=[\"id\", \"last_scraped\"]` chứ không gộp cả 4 snapshot rồi `drop_duplicates(subset=[\"id\"])`?",
        "a": "Vì 4 snapshot là dữ liệu bảng theo thời gian (panel data): cùng 1 căn hộ phải xuất hiện đủ 4 lần tại `t1..t4` để theo dõi biến động giá và Review Velocity."
      }
    ],
    "commonMistakes": [
      "Quên kiểm `subset=[\"id\", \"last_scraped\"]` mà gọi `df.duplicated()` trên toàn bảng 75 cột (sẽ sót nếu khác 1 cột timestamp)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-016",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phân tích hậu quả nếu áp dụng `qa_report.csv` chỉ ghi các quy tắc có `rows_affected > 0`.",
    "question": "Tình huống: Nếu một nhóm cắt bỏ các dòng có `rows_affected = 0` khỏi `reports/qa_report.csv` cho gọn bảng, làm sao người kiểm toán biết được lỗi nào thật sự không tồn tại và lỗi nào chưa từng được code kiểm tra?",
    "quickAnswer": "Không thể phân biệt được! Việc ghi đủ cả 8 rule × 4 snapshot = **32 dòng** kể cả khi `rows_affected = 0` chứng minh bằng chứng chạy thực nghiệm rằng pipeline đã kiểm tra toàn bộ quy tắc trên cả 4 mốc.",
    "explanation": "Đây là chuẩn Auditability trong Kỹ thuật Dữ liệu (Bài 10): \"Absence of violations must be logged, not omitted\".",
    "projectLink": "src/qa.py:L295-L345",
    "codeLocation": "src/qa.py:L295-L345",
    "proofExample": "`reports/qa_report.csv` của Nhóm 4 chứa chính xác 32 dòng (0 dòng trùng, 0 lỗi accommodates, 0 lỗi availability, 0 lỗi reviews, 0 lỗi last_review).",
    "followUpQuestions": [
      "Ngoài `snapshot`, `rule_id`, `rows_affected`, những cột nào trong `qa_report.csv` giúp đo mức độ biến đổi dữ liệu?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài `snapshot`, `rule_id`, `rows_affected`, những cột nào trong `qa_report.csv` giúp đo mức độ biến đổi dữ liệu?",
        "a": "Cột `kpi_before` và `kpi_after` đo trực tiếp giá trị tóm tắt trước và sau khi áp dụng quy tắc QA."
      }
    ],
    "commonMistakes": [
      "Nghĩ dòng nào `rows_affected = 0` là thừa thãi nên lọc bỏ trước khi lưu CSV."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-017",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi chạy `src/llm.py` bị mất điện hoặc lỗi RPD 429 ở câu review thứ 650/1.000.",
    "question": "Tình huống: Giả sử khi chạy mới ở câu thứ `650/1.000`, API Gemini ném lỗi `\"429 RESOURCE_EXHAUSTED (RequestsPerDay)\"` hoặc máy tính mất mạng. Quy trình chạy tiếp an toàn không tốn lại tiền cho 650 câu đầu là gì?",
    "quickAnswer": "Vì `src/llm.py` gọi `save_to_cache()` ghi append từng bản ghi hợp lệ ngay khi xong từng batch vào `data/processed/llm_cache.jsonl`, cả 650 câu đầu đã nằm an toàn trên đĩa. Sau khi xử lý nguyên nhân (đợi reset quota ngày hoặc đổi key mới), chỉ cần chạy lại đúng lệnh cũ `python src/llm.py --config configs/mexico-city.yaml` — hàm `load_cache()` tự nạp 650 câu và chỉ gửi tiếp đúng `350` câu còn thiếu!",
    "explanation": "Kiến trúc Idempotent Resume qua JSONL Append-only giúp pipeline bền bỉ tuyệt đối trước rủi ro API và giảm tối đa chi phí lặp.",
    "projectLink": "src/llm.py:L150-L185, L310-L355",
    "codeLocation": "src/llm.py:L150-L185, L310-L355",
    "proofExample": "Nhờ `batch_size = 5`, tối đa chỉ mất trạng thái của batch đang dở (<5 câu) nếu rớt mạng đột ngột.",
    "followUpQuestions": [
      "Nếu lỡ chạy lại ngay khi chưa sửa prompt và cache đã đủ 1.000/1.000, hệ thống có tốn thêm đồng chi phí API nào không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu lỡ chạy lại ngay khi chưa sửa prompt và cache đã đủ 1.000/1.000, hệ thống có tốn thêm đồng chi phí API nào không?",
        "a": "Không tốn đồng nào (`$0.00`), vì `pending_count == 0` bỏ qua luôn bước khởi tạo client API."
      }
    ],
    "commonMistakes": [
      "Cho rằng phải xóa hết chạy lại từ đầu 1.000 câu hoặc viết `json.dump()` 1 lần cuối cùng sau khi chạy xong toàn bộ vòng lặp."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vs-018",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi nâng cấp prompt phân loại cảm xúc từ v1 lên v2 — lỗi \"độc đầu cache\" (Stale Cache).",
    "question": "Tình huống: Nếu sửa lại định nghĩa nhãn `\"mixed\"` trong prompt (`src/llm.py`) rồi chạy lại pipeline mà **quên xóa hoặc đổi tên** `data/processed/llm_cache.jsonl`, hậu quả nghiêm trọng gì xảy ra?",
    "quickAnswer": "`load_cache()` thấy cả 1.000 `review_id` đã tồn tại và đủ schema 7 khía cạnh -> `pending_count = 0` -> dùng lại 100% kết quả của **prompt v1 cũ**! Tệ hơn nữa, nếu cache trước đó mới chạy được 400 câu theo v1 rồi đổi prompt chạy tiếp 600 câu v2, `reviews_sentiment.csv` bị trộn lẫn hai tiêu chuẩn nhãn hoàn toàn khác nhau!",
    "explanation": "Khi thay đổi prompt hoặc model trong `configs/mexico-city.yaml`, quy tắc kỹ thuật bắt buộc là đổi đường dẫn file cache mới hoặc sao lưu/xóa cache cũ (hoặc gắn hash prompt/model vào khóa cache).",
    "projectLink": "src/llm.py:L100-L135",
    "codeLocation": "src/llm.py:L100-L135",
    "proofExample": "Thực tế file `llm_cache.jsonl` có lưu trường `model`, nhưng chưa băm `prompt_hash` vào từng dòng.",
    "followUpQuestions": [
      "Khi giảng viên clone repo để kiểm tra bằng lệnh `--skip-llm`, file `llm_cache.jsonl` phải ở trạng thái nào?"
    ],
    "followUpQA": [
      {
        "q": "Khi giảng viên clone repo để kiểm tra bằng lệnh `--skip-llm`, file `llm_cache.jsonl` phải ở trạng thái nào?",
        "a": "Phải có mặt đầy đủ `1.000/1.000` bản ghi hợp lệ theo đúng prompt & `model: gemini-3.5-flash-lite` đang khai báo trong YAML."
      }
    ],
    "commonMistakes": [
      "Nghĩ `llm.py` tự động phát hiện prompt đã thay đổi để chạy lại toàn bộ 1.000 mẫu."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vs-019",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "So sánh việc chấm công cụ LLM với 2 lựa chọn Baseline: Regex tách mệnh đề vs Bag-of-Words/Model đơn giản.",
    "question": "Tình huống: Khi muốn làm mô hình đối chứng (Baseline) cho bài toán gán nhãn 1.000 review đa ngôn ngữ (Tiếng Anh, Tây Ban Nha, Đức, Pháp...), vì sao Nhóm 4 chọn Baseline Regex tách mệnh đề (`src/baseline.py`) thay vì đoán hằng số (`always positive`) hay phải huấn luyện thêm mô hình ML có giám sát?",
    "quickAnswer": "Nếu chọn `always positive`, độ chính xác `Accuracy` cũng tới `0.73` (vì 73/100 là positive) nhưng hoàn toàn vô dụng ở 7 khía cạnh (ra `not_mentioned` hết -> Macro F1 thảm hại). Còn nếu train mô hình ML (TF-IDF + LogisticRegression) trên tập `ground_truth.csv` chỉ có **100 mẫu** (mất cân bằng lớp, 2 mẫu `negative`, 6 ngôn ngữ), mô hình sẽ bị **rò rỉ tập test** hoặc **học vẹt** không đủ mẫu train cho 7 khía cạnh đa nhãn. Baseline Regex tách mệnh đề chạy độc lập không đụng `ground_truth.csv`, chi phí `$0`, nhanh `<1s`, bám sát quy tắc diễn giải ngôn ngữ người thật!",
    "explanation": "Thiết kế Baseline đúng tinh thần Bài 11: đơn giản, tái lập 100%, không gian lận nhãn test và cùng đầu ra 15 cột để chấm chung thước đo.",
    "projectLink": "src/baseline.py:L1-L150; src/evaluate.py:L100-L140",
    "codeLocation": "src/baseline.py:L1-L150; src/evaluate.py:L100-L140",
    "proofExample": "Kết quả đối chứng rõ ràng: Baseline đạt `0.85` Accuracy / `0.5224` Macro F1 cảm xúc, chứng minh LLM (`0.99` / `0.9909`) mang lại bước nhảy vọt `+0.4685` Macro F1.",
    "followUpQuestions": [
      "Đánh đổi của Baseline Regex khi gặp ngôn ngữ ít từ khóa trong `LANG_PATTERNS` (vd tiếng Nhật/Hàn) là gì?"
    ],
    "followUpQA": [
      {
        "q": "Đánh đổi của Baseline Regex khi gặp ngôn ngữ ít từ khóa trong `LANG_PATTERNS` (vd tiếng Nhật/Hàn) là gì?",
        "a": "Không khớp được từ khóa cảm xúc/khía cạnh tiếng Anh hay Tây Ban Nha -> gán mặc định `\"positive\"` (hoặc `\"not_mentioned\"`), khiến `Recall` các câu chê bằng ngôn ngữ hiếm tụt về 0."
      }
    ],
    "commonMistakes": [
      "Đề xuất dùng chính `ground_truth.csv` vừa để train TF-IDF vừa để chấm điểm trên chính 100 mẫu đó (rò rỉ dữ liệu nghiêm trọng!)."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vs-020",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Cách cải thiện khi `hau_kiem()` phát hiện cảnh báo `ngan_nhung_nhieu_khia_canh` hoặc `khia_canh_khong_can_cu`.",
    "question": "Tình huống: Trên 1.000 review ở `reports/llm_postcheck.csv`, hàm `hau_kiem()` phát hiện 193 cảnh báo trên 176 review (chủ yếu ở quy tắc `khia_canh_khong_can_cu` và `ngan_nhung_nhieu_khia_canh`). Có nên viết code tự động ép các khía cạnh đó về `\"not_mentioned\"` để postcheck về 0 cảnh báo không?",
    "quickAnswer": "**TUYỆT ĐỐI KHÔNG!** Tự động dùng từ khóa đơn giản ghi đè xóa nhãn của LLM sẽ phá hủy khả năng hiểu ngữ nghĩa ẩn ý/tiếng Tây Ban Nha của mô hình! Ví dụ review `\"Todo perfecto, cerca del metro\"` không chứa chữ `\"location\"` tiếng Anh mà LLM suy ra `location: positive` hoàn toàn hợp lệ; hay `\"A+\"` (1–2 từ) nhưng đánh giá tổng thể. `hau_kiem()` chỉ đóng vai trò **đèn cảnh báo (flagging)** giúp kiểm toán viên lọc nhanh mẫu nghi vấn để đọc lại bằng mắt thường.",
    "explanation": "Đây là nguyên tắc kết hợp Human-in-the-loop của Bài 11: kiểm định tự động != tự động sửa kết quả bằng quy tắc ngây thơ.",
    "projectLink": "src/evaluate.py:L150-L205",
    "codeLocation": "src/evaluate.py:L150-L205",
    "proofExample": "Khi kiểm tra thủ công các mẫu `khia_canh_khong_can_cu` trong `llm_postcheck.csv`, đa số là các câu viết bằng tiếng Tây Ban Nha/Pháp/Ý không khớp bộ từ khóa Regex tiếng Anh hẹp.",
    "followUpQuestions": [
      "Tại sao có thể chứng minh `hau_kiem()` hữu ích nếu có một review thực sự bị LLM \"bịa\" (`rong_nhung_co_nhan`)?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao có thể chứng minh `hau_kiem()` hữu ích nếu có một review thực sự bị LLM \"bịa\" (`rong_nhung_co_nhan`)?",
        "a": "Vì với review 0 từ (rỗng/toàn ký tự lạ), bất kỳ nhãn khía cạnh nào khác `not_mentioned` đều 100% là ảo giác của LLM — quy tắc này trên CDMX đạt `0` vi phạm."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng cứ còn cảnh báo trong `llm_postcheck.csv` nghĩa là LLM bị lỗi 193 câu và tìm cách xóa sạch cho báo cáo đẹp về 0."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vs-021",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ước tính chi phí mở rộng lên toàn thị trường Mexico City (`1.719.730` review ở `t4`).",
    "question": "Tình huống: Nếu SECTUR CDMX yêu cầu phân tích **toàn bộ 1.719.730 review** ở snapshot `t4` bằng cùng pipeline `src/llm.py` (`gemini-3.5-flash-lite`), tổng chi phí ước tính là bao nhiêu, thời gian/RPD cần lường trước điều gì và phương án tối ưu chi phí ra sao?",
    "quickAnswer": "Theo `src/evaluate.py :: uoc_tinh_chi_phi()` (báo cáo `llm_cost_estimate.csv`): mẫu 1.000 review tốn `$0.2030` (`$0.0330` input + `$0.1700` output), nội suy tuyến tính cho `1.719.730` review hết **`$349.1052` USD** (~8.8 triệu VNĐ). Với `batch_size = 5`, cần tới **`343.946` requests API** — chắc chắn vượt giới hạn RPD miễn phí, đòi hỏi bật tài khoản trả phí (Tier 1+), tăng `batch_size` (15–20 review/call) để giảm system-prompt overhead, hoặc rút gọn độ dài JSON key đầu ra vì **Output token ($2.50/1M)** đắt gấp **8.3 lần** Input token ($0.30/1M)!",
    "explanation": "Phương án phân tích kỹ thuật chi phí token chứng minh sinh viên nắm chắc kinh tế học triển khai LLM trên dữ liệu thực tế.",
    "projectLink": "src/evaluate.py:L207-L248; reports/llm_cost_estimate.csv",
    "codeLocation": "src/evaluate.py:L207-L248; reports/llm_cost_estimate.csv",
    "proofExample": "Số liệu chuẩn CSV: `1,000` reviews = `110,000` input + `68,000` output tokens (`$0.2030`); `1,719,730` reviews = `~$349.1052`.",
    "followUpQuestions": [
      "Trong công thức ở `uoc_tinh_chi_phi()`, nếu tăng `batch_size` từ `5` lên `25`, tổng Input token hay Output token giảm mạnh hơn?"
    ],
    "followUpQA": [
      {
        "q": "Trong công thức ở `uoc_tinh_chi_phi()`, nếu tăng `batch_size` từ `5` lên `25`, tổng Input token hay Output token giảm mạnh hơn?",
        "a": "Input token (nhờ dùng chung prompt hướng dẫn hệ thống cho 25 review/lần) giảm rõ, còn tổng Output token gần như không đổi nếu giữ nguyên schema JSON đầu ra — do đó tối ưu tên key JSON gọn nhẹ mới giảm tiền Output hiệu quả nhất!"
      }
    ],
    "commonMistakes": [
      "Ước tính chi phí bằng số request hoặc chỉ tính Input token mà quên Output token đắt gấp >8 lần.",
      "Nghĩ chạy hết 1.7 triệu review mất 1–2 phút với free tier."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vs-022",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Giải thích trường hợp `llm_error_analysis.csv` chỉ có 46 dòng (vượt/sai ở đâu giữa 2 mô hình).",
    "question": "Tình huống: Nếu mở `reports/llm_error_analysis.csv`, ta thấy bảng chỉ chứa **46 dòng** trên tổng 100 mẫu của `ground_truth.csv`. Ý nghĩa của con số 46 này là gì và cần kiểm tra cột nào bên trong để không kết luận sai?",
    "quickAnswer": "Bảng `llm_error_analysis.csv` liệt kê các mẫu mà **LLM HOẶC Baseline** dự đoán lệch ở `overall_sentiment` hoặc có bất đồng ở một trong 7 khía cạnh trên tập 100 nhãn tay. Thực tế trên 100 mẫu: `LLM` chỉ sai đúng **1 mẫu** về `overall_sentiment` (`99%` Accuracy), còn đa phần các dòng sai là đến từ **Baseline Regex** (`15` ca sai overall và nhiều ca sai khía cạnh)!",
    "explanation": "Phải tách rõ cột dự đoán của LLM (`llm_*`) và Baseline (`baseline_*`) vs `ground_truth` trước khi kết luận tỷ lệ sai sót.",
    "projectLink": "src/evaluate.py:L140-L185; reports/llm_error_analysis.csv",
    "codeLocation": "src/evaluate.py:L140-L185; reports/llm_error_analysis.csv",
    "proofExample": "`cam_xuc_accuracy`: LLM = `0.99` (1 lỗi) vs Baseline = `0.85` (15 lỗi).",
    "followUpQuestions": [
      "Làm sao kiểm tra ngay bằng pandas trên `llm_error_analysis.csv` xem có bao nhiêu dòng mà thực chất LLM dự đoán ĐÚNG nhưng Baseline sai?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao kiểm tra ngay bằng pandas trên `llm_error_analysis.csv` xem có bao nhiêu dòng mà thực chất LLM dự đoán ĐÚNG nhưng Baseline sai?",
        "a": "Lọc `df[df[\"gt_overall\"] == df[\"llm_overall\"]]` và kiểm tra tương tự trên các khía cạnh."
      }
    ],
    "commonMistakes": [
      "Nhìn thấy file `llm_error_analysis.csv` có 46 dòng liền hoảng hốt tưởng LLM sai tới 46/100 câu!"
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vs-023",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi LLM trả về chuỗi `\"positive \"` (có khoảng trắng) hoặc một khía cạnh ngoài danh sách `aspects` YAML.",
    "question": "Tình huống: Nếu sửa cấu hình YAML bổ sung khía cạnh thứ 8 (ví dụ `wifi`) vào `llm.aspects` thì pipeline (`llm.py`, `baseline.py`, `evaluate.py`, `kpi.py`, `viz.py`) cần thích ứng thế nào?",
    "quickAnswer": "`src/llm.py` (`build_schemas(aspects)` dùng `pydantic.create_model` động) và `src/kpi.py` (đọc `aspects` từ YAML) TỰ ĐỘNG mở rộng được ngay khía cạnh thứ 8! Ngược lại `src/baseline.py` cần bổ sung mẫu Regex tương ứng trong `ASPECT_PATTERNS` cho `wifi` (nếu không `ASPECT_PATTERNS.get(\"wifi\")` trả `None` -> mọi review ra `not_mentioned`), và `src/viz.py` kiểm tra lại `aspect_labels` hiển thị tiếng Việt đẹp trên Hình 7.",
    "explanation": "Thiết kế tách cấu hình `aspects` từ YAML giúp mở rộng hầu hết hệ thống, đồng thời cho thấy rõ phần từ điển chuyên biệt cần bổ sung thủ công ở Baseline Regex.",
    "projectLink": "src/llm.py:L110-L130; src/baseline.py:L45; src/kpi.py:L405; src/viz.py:L385",
    "codeLocation": "src/llm.py:L110-L130; src/baseline.py:L45; src/kpi.py:L405; src/viz.py:L385",
    "proofExample": "`build_schemas(aspects)` trong `src/llm.py:L110-L130` tạo schema động 100% từ list YAML.",
    "followUpQuestions": [
      "Trong `src/llm.py`, nếu một review trả về nhãn khía cạnh viết hoa `\"Positive\"` không đúng chữ thường trong `Literal`, Pydantic làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, nếu một review trả về nhãn khía cạnh viết hoa `\"Positive\"` không đúng chữ thường trong `Literal`, Pydantic làm gì?",
        "a": "Chặn lại ngay bằng `ValidationError` tại batch đó -> kích hoạt cơ chế thử lại hoặc fallback đơn lẻ `batch_size = 1`."
      }
    ],
    "commonMistakes": [
      "Tưởng Pydantic schema trong `src/llm.py` viết cứng 7 khía cạnh bằng class tĩnh.",
      "Quên bổ sung `wifi` vào `ASPECT_PATTERNS` của `baseline.py` làm Recall khía cạnh mới = 0%."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vs-024",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Baseline"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Điều gì xảy ra nếu `reviews_llm.csv` có thêm các review dài 800 từ pha trộn vừa khen vừa chê theo từng đoạn?",
    "question": "Tình huống: Trong đánh giá Airbnb dài gồm 10 câu (đoạn 1–8 khen hết lời vị trí, chủ nhà, giường êm; đoạn 9 phàn nàn ngắn \"Tuy nhiên tối có tiếng xe rác và vòi sen hơi yếu\"), `Baseline Regex` và `LLM` xử lý khác biệt ra sao?",
    "quickAnswer": "1) Về mặt **tổng thể (`overall_sentiment`)**: `Baseline Regex` đếm ít nhất 1 `n_neg` và 1 `n_pos` -> cũng có thể ra `mixed` NẾU từ ngữ khớp đúng từ điển tiếng Anh; nhưng nếu câu chê viết theo kiểu lịch sự/ẩn ý hoặc tiếng Tây Ban Nha nằm ngoài từ điển (`\"el agua caliente tardaba un poco\"`), `Baseline` sót `n_neg` và gán nhầm `positive`! Trong khi **LLM** đọc trọn ngữ cảnh dài dễ dàng gán `overall = mixed`, `noise = negative`, `amenities = negative`, `location = positive`.",
    "explanation": "Giải thích rõ lý do tại sao `mixed` là điểm yếu chí tử của Baseline (kéo `Macro F1` của Baseline xuống `0.5224`) và cũng là chỗ đáng tiền nhất của LLM (`14.82%` phàn nàn tiện nghi ẩn trong lớp `mixed`).",
    "projectLink": "src/baseline.py:L90-L130; src/llm.py:L10-L50",
    "codeLocation": "src/baseline.py:L90-L130; src/llm.py:L10-L50",
    "proofExample": "Trên `ground_truth.csv`, lớp `mixed` chiếm 25/100 mẫu và tạo phần lớn chênh lệch giữa LLM (0.9909) và Baseline (0.5224).",
    "followUpQuestions": [
      "Vì sao prompt của Nhóm 4 quy định rõ: có cả khen lẫn chê (dù nhẹ) phải gán `mixed` cho `overall_sentiment`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao prompt của Nhóm 4 quy định rõ: có cả khen lẫn chê (dù nhẹ) phải gán `mixed` cho `overall_sentiment`?",
        "a": "Để phục vụ bài toán quản lý chất lượng dịch vụ cho SECTUR CDMX: khách du lịch thường lịch sự khen trước rồi mới góp ý điểm hỏng — nếu gộp vào `positive`, toàn bộ cảnh báo hỏng hóc tiện nghi bị chìm mất!"
      }
    ],
    "commonMistakes": [
      "Nghĩ câu có 8 câu khen và 1 câu chê nhẹ nên đánh nhãn tổng là `positive`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vs-025",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Điều gì xảy ra với `Urgency Gap` nếu chủ nhà chuyển đồng loạt từ mở đặt 90 ngày sang chỉ mở lịch 30 ngày trước khi ở?",
    "question": "Tình huống: Giả sử trước World Cup 2026, nhiều chủ nhà tắt mở đặt ở tháng thứ 2–3 (`availability_90 - availability_30 = 0`, tức khóa hoàn toàn cửa sổ 31–90 ngày để chờ sát ngày mới định giá lại) trong khi tháng đầu vẫn còn trống một nửa (`a30 = 15`). Khi đó `Occ_1-30`, `Occ_31-90` và `Urgency Gap` biến động ra sao?",
    "quickAnswer": "`Occ_1-30 = (30 - 15)/30 = 50%`. Do `a31_90 = 0`, `Occ_31-90 = (60 - 0)/60 = 100%`! Khi đó `Urgency Gap = 50% - 100% = -50 pp` (âm mạnh)! Điều này chứng minh rằng chiến lược **chủ nhà tự khóa lịch tương lai xa** tạo ra giá trị giả \"kín lịch 100% ở ngày 31–90\" làm `Urgency Gap` đổi sang âm.",
    "explanation": "Cho thấy người hiểu KPI biết cách kiểm tra cả chiều ngược lại: `Occ` đo **unavailability** (cộng hưởng cả khách đặt lẫn chủ nhà giữ chỗ/chưa mở lịch).",
    "projectLink": "src/kpi.py:L185-L215",
    "codeLocation": "src/kpi.py:L185-L215",
    "proofExample": "Ở CDMX thực tế tại cả 4 mốc, `Urgency Gap` đều dương (`+16.68` đến `+21.38 pp`) vì phần lớn chủ nhà vẫn mở lịch dài ngày bình thường và nhu cầu đặt tập trung trong 30 ngày gần nhất.",
    "followUpQuestions": [
      "Nếu một chủ nhà khóa cả lịch năm (`a365 = 0` kéo theo `a30 = 0, a90 = 0`) và không có review mới, hàm nào ngăn căn hộ đó làm nhiễu `Occ` lên 100%?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một chủ nhà khóa cả lịch năm (`a365 = 0` kéo theo `a30 = 0, a90 = 0`) và không có review mới, hàm nào ngăn căn hộ đó làm nhiễu `Occ` lên 100%?",
        "a": "Hàm `compute_ghost_listings()` gắn nhãn `ghost = 1`, rồi `compute_occupancy_kpis()` với `exclude_ghost = True` lọc bỏ căn đó bằng mặt nạ `(g == 0).fillna(False)`."
      }
    ],
    "commonMistakes": [
      "Tưởng `Urgency Gap` luôn dương trong mọi trường hợp hoặc `Occ_31-90 = 100%` chắc chắn là do khách đặt kín 2 tháng tới."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-026",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Tác động khi chuyển `exclude_ghost: false` trong `configs/mexico-city.yaml`.",
    "question": "Tình huống: Nếu đổi tham số `exclude_ghost: false` trong `configs/mexico-city.yaml` rồi chạy lại `src/kpi.py`, chỉ số nào thay đổi tăng lên (dù ít) và vì sao ảnh hưởng tại CDMX lại nhỏ?",
    "quickAnswer": "Khi `exclude_ghost = false`, các căn đóng băng (`ghost = 1`, vốn có `a30 = 0, a90 = 0` nên `Occ_1-30 = 100%` và `Occ_31-90 = 100%`) sẽ bị giữ lại trong phép tính trung bình Occupancy -> làm `Occ_1-30` và `Occ_31-90` tăng nhẹ lên (cỡ mẫu `occ_n` tại `t1` tăng từ `993` lên `1.000`, `t4` từ `995` lên `999`). Tuy nhiên vì Ghost Rate tại CDMX rất nhỏ (`0.0%–0.7%`), mức chênh ở kỳ t4 chỉ dưới `0.2–0.4 pp`.",
    "explanation": "Giúp bảo vệ tính nhạy cảm tham số (Sensitivity Analysis) khi giảng viên hỏi \"tại sao phải mất công tạo rule ghost nếu tỷ lệ chỉ <1%?\" -> trả lời: ở CDMX hiện tại ít (`0.4%`), nhưng khi áp dụng sang thành phố có mùa đông đóng cửa dài ngày hoặc quy định siết Airbnb (tới 20–30% nguồn cung đóng băng), thiếu lọc Ghost sẽ phá hỏng hoàn toàn chỉ số Occupancy!",
    "projectLink": "configs/mexico-city.yaml:L15; src/kpi.py:L194-L202",
    "codeLocation": "configs/mexico-city.yaml:L15; src/kpi.py:L194-L202",
    "proofExample": "Trên CDMX t1 (`7` ghost trên 1000 căn), giữ lại `7` căn `100%` chỉ kéo `Occ_1-30` từ `48.49%` lên khoảng `48.85%`.",
    "followUpQuestions": [
      "Tại sao `t4` có `occ_n = 995` trong khi `ghost_count = 4` (`1000 - 4 = 996`, sao chỉ còn `995`)?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `t4` có `occ_n = 995` trong khi `ghost_count = 4` (`1000 - 4 = 996`, sao chỉ còn `995`)?",
        "a": "Vì ở `t4` có thêm **1 căn bị `ghost_t4 = <NA>`** (căn bị `review_velocity_q3 = NaN` do `diff < 0` làm `review_velocity_n = 999` và `ghost_n = 999`)! Do `(g == 0).fillna(False)` loại cả `<NA>`, `999 - 4 = 995` — khớp tuyệt đối từng 1 căn hộ!"
      }
    ],
    "commonMistakes": [
      "Nhầm rằng đổi `exclude_ghost = false` cũng làm thay đổi cả `Median Price` và `Review Velocity`."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vs-027",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phân tích trường hợp có 1 listing bị giảm tổng số review (`diff < 0`) tại `Q3` (`t3 -> t4`).",
    "question": "Tình huống: Tại `kpi_by_snapshot.csv`, ở cột `review_velocity_n`, `Q1` và `Q2` đều là `1000` nhưng `Q3` lại là `999` (và kéo theo `ghost_n` tại `t4` cũng là `999`). Điều gì đã xảy ra ở đúng 1 căn hộ đó và tại sao `kpi.py` không gán `RV = 0`?",
    "quickAnswer": "Căn hộ đó có `number_of_reviews` tại `t4` **nhỏ hơn** tại `t3` (`diff < 0`, thường do hệ thống Inside Airbnb/Airbnb gỡ review spam hoặc tài khoản reviewer bị xóa). Nếu không chặn `diff >= 0`, `RV` sẽ ra **số âm** (phi lý về mặt vật lý vì số review phát sinh mới không thể âm); còn nếu tự ý gán `RV = 0` sẽ nhầm rằng căn hộ hoàn toàn không có khách -> dễ đẩy oan sang `Ghost`! Vì vậy `src/kpi.py:L136` đặt `valid_pair = valid_curr & valid_prev & (diff >= 0)` giữ `RV = NaN` và kéo `ghost_t4 = <NA>`.",
    "explanation": "Một ví dụ truy vết xuất sắc chứng minh sự hiểu biết sâu sắc tới từng bản ghi đơn lẻ của tập dữ liệu CDMX.",
    "projectLink": "src/kpi.py:L131-L140, L175-L180",
    "codeLocation": "src/kpi.py:L131-L140, L175-L180",
    "proofExample": "Quan sát thật: `review_velocity_n` tại `Q1=1000, Q2=1000, Q3=999`; `ghost_n` tại `t1=1000, t2=1000, t3=1000, t4=999`.",
    "followUpQuestions": [
      "Trong `kpi_by_listing.csv`, làm sao tìm lại đúng ID của căn hộ khiến `review_velocity_n = 999` ở `Q3`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `kpi_by_listing.csv`, làm sao tìm lại đúng ID của căn hộ khiến `review_velocity_n = 999` ở `Q3`?",
        "a": "Lọc `df[df[\"review_velocity_q3\"].isna()]` — sẽ tìm ra chính xác duy nhất 1 căn hộ đó!"
      }
    ],
    "commonMistakes": [
      "Tưởng `999` là do 1 listing bị xóa mất khỏi file CSV ở `t4` (dòng `valid_price_count` ở `t4` có 980 trên tổng 1.000 dòng vẫn đủ 1.000 căn!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-028",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "Storytelling"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Giải thích sự đối lập: Tại sao Coyoacán dẫn đầu mức tăng PPG (`+77.5%`), vượt mặt Cuauhtémoc (`+57.5%`)?",
    "question": "Tình huống: Dữ liệu thực tế cho thấy từ `t1 -> t4`, quận trung tâm Cuauhtémoc tăng Median PPG (`417,50 -> 678,00 MXN`, `+62.4%`), còn quận Coyoacán (phía Nam, giáp khu di sản và tương đối gần sân vận động Estadio Azteca hơn khu lõi Bắc) tăng tới `+70.8%` (`352,00 -> 601,16 MXN`, `n=51` hợp lệ t4) và có rIQR PPG thấp (`0.6400`). Nên diễn giải và hành động thế nào cho SECTUR CDMX?",
    "quickAnswer": "Mức tăng `+70.8%` kèm `rIQR(PPG) = 0.6400` thấp cho thấy **toàn bộ phân phối giá** tại Coyoacán đồng loạt nâng mặt bằng lên chứ không phải do 1–2 căn biệt thự treo giá ảo kéo Mean. Giải thích hợp lý nhất từ góc nhìn địa lý là mặt bằng nền ban đầu ở Coyoacán thấp hơn (`352,00 MXN` ở `t1`) kết hợp hiệu ứng lan tỏa cầu sang khu phía Nam gần sân khai mạc Estadio Azteca. Khuyến nghị SECTUR: mở rộng giám sát giá bình ổn không chỉ ở vùng lõi Bắc (Cuauhtémoc, Miguel Hidalgo) mà cả các quận vệ tinh quanh cụm sân thi đấu như Coyoacán và Tlalpan.",
    "explanation": "Kết hợp 3 góc nhìn: % Tăng trưởng + Quy mô nền gốc (`t1`) + Độ phân tán (`rIQR`) mới thấy bức tranh thật của Coyoacán.",
    "projectLink": "src/kpi.py; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "src/kpi.py; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Dữ liệu `kpi_by_neighbourhood.csv`: Coyoacán có `53` listing (`valid_price_t4 = 51`), `median_ppg_t4 = 601.16 MXN`, `riqr_ppg_t4 = 0.6400`.",
    "followUpQuestions": [
      "Tại sao `Coyoacán` có `total_listings = 53` trong CSV nhưng `valid_price_t4` chỉ là `51`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `Coyoacán` có `total_listings = 53` trong CSV nhưng `valid_price_t4` chỉ là `51`?",
        "a": "Vì có 2 trong 53 listing tại Coyoacán bị thiếu giá/giá không hợp lệ ở mốc `t4` (`qa_missing_price = True`), nên chỉ 51 căn tham gia phép tính Median Price/PPG."
      }
    ],
    "commonMistakes": [
      "Kết luận vội Coyoacán đắt hơn Cuauhtémoc (thực tế `601,16 < 678,00` MXN/khách — nó chỉ tăng % mạnh hơn trên nền giá ban đầu thấp hơn!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-029",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "Storytelling"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống 1 khu vực nhỏ (như `A03`) tăng giá cực mạnh (`+70.1%`) nhưng công suất giảm sâu nhất (`34.58%`).",
    "question": "Tình huống: Khu vực `A03` (gồm Álvaro Obregón + Magdalena Contreras + Cuajimalpa) tăng Median PPG từ `353` lên `600 MXN` (`+70.1%`, mạnh nhất trong 8 khu vực), nhưng tới `t4` lại có `Occ_1-30` thấp nhất toàn thành phố (`34.58%`). Nếu tư vấn cho chủ nhà và SECTUR tại khu vực này, ta trình bày quan sát và gợi ý chính sách gì?",
    "quickAnswer": "Về mặt quan sát mô tả (không gán nhân quả tuyệt đối): tồn tại sự đồng xuất hiện giữa mức nâng giá chào rất cao (`+70.1%`) tại khu vực xa trung tâm lõi/điểm du lịch chính và tỷ lệ lấp đầy lịch ngắn hạn thấp (`34.58%`, tụt xa so với mức trung bình `44.53%`). Gợi ý: du khách World Cup ưu tiên vị trí gần trung tâm/trục metro (Cuauhtémoc `47.5%`, A01/A04) nên việc các căn vùng rìa tự đẩy giá quá cao dễ đối mặt rủi ro \"tồn phòng ảo\" — chủ nhà cần định giá linh hoạt theo sức cầu thực thay vì chạy theo tâm lý đầu cơ sự kiện.",
    "explanation": "Liên kết chặt KPI giá (`PPG growth`) với KPI lịch phòng (`Occ_1-30`) trên cùng lát cắt khu vực.",
    "projectLink": "data/processed/kpi_by_area.csv; figures/kpi_occupancy_gap.png",
    "codeLocation": "data/processed/kpi_by_area.csv; figures/kpi_occupancy_gap.png",
    "proofExample": "Số liệu `kpi_by_area.csv`: A03 (n=48) có `med_ppg_t1=352.67`, `med_ppg_t4=599.83`, `occ_1_30_t4=0.3458`.",
    "followUpQuestions": [
      "Review Velocity Q3 ở khu A03 là bao nhiêu — liệu có cao hay cũng thấp?"
    ],
    "followUpQA": [
      {
        "q": "Review Velocity Q3 ở khu A03 là bao nhiêu — liệu có cao hay cũng thấp?",
        "a": "Theo `kpi_by_area.csv`, RV tại A03 thuộc nhóm thấp (`< 1.5 reviews/tháng`), nhất quán với bức tranh thanh khoản thấp hơn khu lõi."
      }
    ],
    "commonMistakes": [
      "Viết khẳng định chắc chắn \"việc tăng giá 70.1% LÀ NGUYÊN NHÂN DUY NHẤT khiến khách tẩy chay khu A03\" (bỏ quên yếu tố vị trí địa lý/mùa vụ)."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_area.csv"
    ]
  },
  {
    "id": "vs-030",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi một quận mới trong dữ liệu thử nghiệm có `n = 1` (như `Milpa Alta`) hoặc `n = 0` (`Tláhuac`).",
    "question": "Tình huống: Trong bộ 1.000 listing phân công, quận `Tláhuac` có `n = 0` và `Milpa Alta` có `n = 1`. Tại sao `kpi_by_neighbourhood.csv` chỉ có **15 dòng** (không có Tláhuac), còn bản đồ Choropleth `kpi_ppg_neighbourhood.png` lại vẽ **16 quận**?",
    "quickAnswer": "`compute_kpi_by_neighbourhood()` gọi `groupby(\"neighbourhood_cleansed\")` trên dữ liệu thực có trong `kpi_by_listing` (nên chỉ sinh 15 dòng quận có tồn tại listing — tuyệt đối không tự chèn dòng giả `0` cho `Tláhuac`). Sau đó, `plot_ppg_neighbourhood()` trong `src/viz.py` đọc file hình học hành chính `neighbourhoods.geojson` (đủ 16 quận của CDMX), nhận diện `Tláhuac` bị thiếu khi ghép nên tô màu xám nhạt kèm họa tiết gạch chéo `hatch=\"///\"` và ghi chú `\"Không có trong mẫu\"`!",
    "explanation": "Phân biệt minh bạch giữa không gian dữ liệu quan sát (`15` quận trong CSV) và không gian địa lý hành chính (`16` quận trên GeoJSON).",
    "projectLink": "src/kpi.py:L375-L435; src/viz.py:L210-L280",
    "codeLocation": "src/kpi.py:L375-L435; src/viz.py:L210-L280",
    "proofExample": "Với `Milpa Alta (n=1)`: `Mean == Median`, `Q1 == Q3 == Median`, nên `rIQR = 0.0` — cần chú thích cỡ mẫu `n=1` để người đọc không hiểu nhầm là \"giá đồng đều tuyệt đối\"!",
    "followUpQuestions": [
      "Trong `kpi_by_neighbourhood.csv`, 3 quận không có review LLM nào (`Iztapalapa`, `Milpa Alta`, `Xochimilco`) có giá trị gì ở cột `complaint_amenities`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `kpi_by_neighbourhood.csv`, 3 quận không có review LLM nào (`Iztapalapa`, `Milpa Alta`, `Xochimilco`) có giá trị gì ở cột `complaint_amenities`?",
        "a": "Giữ nguyên `NaN` (`llm_review_count = 0`), hoàn toàn không gán `0%` phàn nàn vì không đo được nếu không có review nào!"
      }
    ],
    "commonMistakes": [
      "Tự ý thêm dòng `Tláhuac` toàn số 0 vào CSV hoặc xóa `Tláhuac` khỏi GeoJSON làm rỗng mép bản đồ.",
      "Diễn giải `rIQR = 0` của Milpa Alta là thị trường hoàn hảo không phân hóa."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-031",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Vấn đề khi dùng thang tuyến tính vs thang log cho Boxplot PPG (`kpi_ppg_riqr_2026-06-15.png`).",
    "question": "Tình huống: Nếu tắt `log_scale=True` (trở về trục X tuyến tính thông thường) ở biểu đồ Boxplot bên trái của `plot_ppg_riqr()` trong `src/viz.py`, biểu đồ sẽ biến dạng khó đọc như thế nào?",
    "quickAnswer": "Vì mẫu `t4` có các căn hộ ngoại lai treo giá tới `153.540 MXN` (PPG hàng chục nghìn MXN), trục X tuyến tính buộc phải kéo giãn từ `0` đến hơn `30.000+`. Khi đó toàn bộ hộp Boxplot thật của 8 khu vực (nằm gọn trong `300–1.500 MXN`) bị nén bẹp thành một đường chỉ mảnh dính sát mép trái không thể phân biệt Q1, Median, Q3!",
    "explanation": "Biến đổi logarit (`log_scale=True`) biến chênh lệch tỷ lệ nhân (2x, 4x) thành khoảng cách cộng bằng nhau trên trục nhìn, đúng bài học trực quan hóa phân phối lệch phải (Bài 12–13).",
    "projectLink": "src/viz.py:L108-L120",
    "codeLocation": "src/viz.py:L108-L120",
    "proofExample": "Với thang log tại `src/viz.py:L110`, cả 16 hộp phân phối (`8 khu vực × 2 loại phòng`) dàn trải rõ nét từng Q1–Median–Q3.",
    "followUpQuestions": [
      "Nếu dùng thang log thì giá trị `price = 0` hoặc `<= 0` có vẽ được không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu dùng thang log thì giá trị `price = 0` hoặc `<= 0` có vẽ được không?",
        "a": "Không ($\\log(0) = -\\infty$), nhưng vì `qa.py` và `kpi.py` đã lọc sạch `ppg > 0`, tập `valid` luôn dương 100% nên thang log an toàn tuyệt đối!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `log_scale=True` làm thay đổi giá trị số Median hay IQR (nó chỉ đổi lưới chia trục hiển thị, con số thực tính ở `kpi_by_area.csv` hoàn toàn không đổi)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vs-032",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Cách xử lý thang màu Choropleth khi một quận cỡ nhỏ có giá trị cực đoan (`llm_insights.png` vs `kpi_ppg_neighbourhood.png`).",
    "question": "Tình huống: Trong `plot_llm_insights()` (`src/viz.py:L413`), quận Azcapotzalco chỉ có `n = 2` review LLM nhưng có `2/2` (`100%`?) hoặc `n=1` với tỷ lệ rất cao. Tại sao code lại lọc `n >= 5` trước khi tính trần thang màu `vmax`?",
    "quickAnswer": "Nếu tính `vmax` bao gồm cả các quận nhỏ có `n = 1..4` (nơi chỉ cần 1–2 review có góp ý là vọt lên `50%–100%`), thanh màu sẽ kéo dãn tới `100%`! Hệ quả là các quận trọng tâm thật sự (`Cuauhtémoc n=749: 14.8%`, `Miguel Hidalgo n=150: 10.0%`) bị nén vào dải `0–15%` nhạt màu giống hệt nhau, mất sạch khả năng phân biệt! Lọc `n >= 5` để lấy `vmax = 35%` giúp hiện rõ cấu trúc khác biệt giữa các quận đủ mẫu, còn các ô cực lớn của quận nhỏ tự bão hòa màu kèm ghi chú `n` ở cột phải.",
    "explanation": "Đây là kỹ thuật xử lý ngoại lệ thị giác (Visual Outlier Clipping) ở Bài 13 — giữ đúng số liệu thật nhưng chọn dải màu phục vụ phần thông tin có ý nghĩa thống kê.",
    "projectLink": "src/viz.py:L408-L420",
    "codeLocation": "src/viz.py:L408-L420",
    "proofExample": "Ở `src/viz.py:L413`: tính `vmax = ceil(max_val_ge_5 / 5) * 5`.",
    "followUpQuestions": [
      "Trong biểu đồ heatmap `llm_insights.png`, ngoài thang màu thì chi tiết nào bảo vệ người đọc không bị đánh lừa bởi quận `n = 1..4`?"
    ],
    "followUpQA": [
      {
        "q": "Trong biểu đồ heatmap `llm_insights.png`, ngoài thang màu thì chi tiết nào bảo vệ người đọc không bị đánh lừa bởi quận `n = 1..4`?",
        "a": "Biểu đồ gắn thêm bảng phụ/cột chú thích **Cỡ mẫu `llm_review_count` (n)** sát ngay bên phải từng hàng quận!"
      }
    ],
    "commonMistakes": [
      "Sửa bừa con số `100%` ở quận `n=2` xuống `0%` cho đều màu (bị coi là ngụy tạo số liệu!)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vs-033",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Sự khác biệt khi tắt `sharex=True, sharey=True` trong `plot_ppg_snapshots()` (`kpi_ppg_snapshots.png`).",
    "question": "Tình huống: Trong `plot_ppg_snapshots()` (`src/viz.py:L150`), nếu bỏ `sharex=True, sharey=True` và để Matplotlib tự động căn trục X riêng cho từng khung `t1`, `t3`, `t4`, người xem sẽ mắc ảo giác gì?",
    "quickAnswer": "Ở `t1`, thanh cao nhất (`A05 = 569 MXN`) sẽ kéo dài hết khung với `xlim ≈ 700`; sang `t4`, thanh cao nhất (`A05 = 819 MXN`) CŨNG kéo dài hết khung với `xlim ≈ 1050`. Thoạt nhìn hai khung hình, hai thanh trông dài ngang nhau -> người đọc tưởng lầm giá từ `t1` sang `t4` đứng yên không tăng! Nhờ bật `sharex=True, sharey=True` (dùng chung `xmax` tối đa across all snapshots), độ dài thanh trực tiếp phản ánh cú nhảy `+64.1%` qua 4 mốc.",
    "explanation": "Vi phạm dùng chung trục khi đặt biểu đồ cạnh nhau (Small Multiples) là lỗi kinh điển trong Bài 12.",
    "projectLink": "src/viz.py:L150-L175",
    "codeLocation": "src/viz.py:L150-L175",
    "proofExample": "`src/viz.py:L150-L175` ép chung trục cho cả 4 khung `t1..t4`.",
    "followUpQuestions": [
      "Cũng trong `plot_ppg_snapshots()`, nếu chỉ truyền 2 snapshot thay vì 4 trong YAML, code sắp xếp lưới thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Cũng trong `plot_ppg_snapshots()`, nếu chỉ truyền 2 snapshot thay vì 4 trong YAML, code sắp xếp lưới thế nào?",
        "a": "`nrows = max(1, math.ceil(len(snapshots) / 2))` tạo lưới 1×2 và `np.atleast_1d(axes).ravel()` duyệt êm 2 subplot mà không lỗi `IndexError`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng để auto-scale từng subplot sẽ giúp hình \"đầy đặn\" hơn."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vs-034",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Tại sao `plot_ppg_neighbourhood()` dùng `Normalize` chung theo từng hàng (Price Mean/Median dùng chung thang; PPG Mean/Median dùng chung thang)?",
    "question": "Tình huống: Trên bản đồ 4 khung `kpi_ppg_neighbourhood.png`, hai bản đồ hàng trên (Price Mean & Price Median) dùng chung một `norm_price`, còn hai bản đồ hàng dưới (PPG Mean & PPG Median) dùng chung `norm_ppg`. Tại sao KHÔNG dùng 4 thang màu riêng và cũng KHÔNG gộp chung cả 4 làm 1 thang?",
    "quickAnswer": "Nếu dùng thang riêng cho Mean và Median của cùng một biến `Price`, Mean (`Cuauhtémoc = 3.529`) và Median (`Cuauhtémoc = 2.215`) sẽ được tô đậm bằng nhau -> mất tác dụng chứng minh độ lệch Mean > Median! Ngược lại nếu gộp `Price` (~2.000 MXN) chung thang với `PPG` (~600 MXN), cả bản đồ `PPG` hàng dưới sẽ nhạt màu gần như trắng xóa vì giá PPG chỉ bằng ~1/3 giá cả căn!",
    "explanation": "Phạm vi so sánh quyết định thang màu chung (`shared Normalize`): cùng đơn vị & cùng đại lượng mới chia sẻ cùng `vmin/vmax`.",
    "projectLink": "src/viz.py:L218-L235",
    "codeLocation": "src/viz.py:L218-L235",
    "proofExample": "`src/viz.py:L218-L235` tách rõ `norm_price` (hàng trên) và `norm_ppg` (hàng dưới).",
    "followUpQuestions": [
      "Chữ số `#1`, `#2`... trên mỗi quận trên bản đồ `kpi_ppg_neighbourhood.png` được sắp xếp theo tiêu chí gì?"
    ],
    "followUpQA": [
      {
        "q": "Chữ số `#1`, `#2`... trên mỗi quận trên bản đồ `kpi_ppg_neighbourhood.png` được sắp xếp theo tiêu chí gì?",
        "a": "Theo `rank_price_t4` / thứ hạng tại mốc `t4` đặt tại tâm đa giác lớn nhất của từng quận bằng hàm `_centroid()`."
      }
    ],
    "commonMistakes": [
      "Dùng 4 `colorbar` độc lập hoàn toàn làm không so được trực quan độ vênh Mean vs Median."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vs-035",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Làm thế nào tái tạo bộ 8 hình `figures/*.png` khi không muốn chạy lại `download` và `llm`?",
    "question": "Tình huống: Nếu một sinh viên thay đổi bảng màu hoặc cỡ chữ trong `src/viz.py`, lệnh nào ngắn nhất để xuất lại 8 biểu đồ mới mà không phải chạy lại toàn bộ các bước tải dữ liệu, QA hay gọi LLM?",
    "quickAnswer": "Chạy **`python run_pipeline.py --config configs/mexico-city.yaml --only viz`** (hoặc chạy trực tiếp `python src/viz.py --config configs/mexico-city.yaml`). Lệnh chỉ mất vài giây đọc từ 4 file CSV đã có ở `data/processed/` + `reports/evaluation_report.csv` và xuất mới toàn bộ 8 tệp trong `figures/`.",
    "explanation": "Kiến trúc mô-đun rời rạc cho phép lặp nhanh tầng trình bày độc lập với tầng thu thập & suy luận.",
    "projectLink": "run_pipeline.py:L55-L60; src/viz.py:L470-L516",
    "codeLocation": "run_pipeline.py:L55-L60; src/viz.py:L470-L516",
    "proofExample": "Cờ `--only` được cài đặt ở `run_pipeline.py:L55-L60`.",
    "followUpQuestions": [
      "Nếu thay đổi công thức `Occ_31-90` trong `src/kpi.py`, cần chạy từ bước nào trở đi để báo cáo & biểu đồ cập nhật đồng bộ?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thay đổi công thức `Occ_31-90` trong `src/kpi.py`, cần chạy từ bước nào trở đi để báo cáo & biểu đồ cập nhật đồng bộ?",
        "a": "Chạy `--from-step kpi` (sẽ chạy `kpi` rồi tới `viz`)."
      }
    ],
    "commonMistakes": [
      "Chạy lại toàn bộ `python run_pipeline.py` làm tải lại hoặc kiểm lại hàng trăm MB raw data không cần thiết."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vs-036",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "scenario",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi nhận một bộ dữ liệu có thêm `1` snapshot mới `t5` (`2026-09-15`) — phần nào tự động chạy, phần nào cần điều chỉnh?",
    "question": "Tình huống: Sau khi kết thúc World Cup 2026, nếu muốn thêm snapshot `t5 = \"2026-09-15\"` vào `configs/mexico-city.yaml` để đo độ hạ nhiệt hậu giải đấu, các module từ `download` đến `viz` phản ứng thế nào?",
    "quickAnswer": "`download.py`, `filter_data_from_sheet.py`, `qa.py`, `kpi.py` (tự sinh thêm `q4` và `t5` ở `kpi_by_listing`, `kpi_by_area`, `kpi_by_snapshot`) đều TỰ ĐỘNG thích ứng 5 mốc! Chỉ cần kiểm lại: (1) file `data/processed/kpi_by_listing.csv` sẽ neo chỉ mục ở `t5` (`snapshots[-1]`); (2) `llm.py` & `baseline.py` vẫn chấm đúng tập 1.000 review cố định (hoặc chỉnh danh sách review nếu có cột snapshot mới).",
    "explanation": "Đánh giá khả năng mở rộng (Scalability & Config-driven) xuyên suốt 9 tệp Python.",
    "projectLink": "configs/mexico-city.yaml; src/kpi.py:L68-L80",
    "codeLocation": "configs/mexico-city.yaml; src/kpi.py:L68-L80",
    "proofExample": "Đổi từ 4 sang 5 snapshot chủ yếu là sửa danh sách `snapshots` trong YAML.",
    "followUpQuestions": [
      "Trong `kpi_by_neighbourhood.csv`, cột giá đang viết là `mean_price_mxn_t4` — vậy khi có `t5` cột nào thay thế làm lát cắt mới nhất ở `compute_kpi_by_neighbourhood()`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `kpi_by_neighbourhood.csv`, cột giá đang viết là `mean_price_mxn_t4` — vậy khi có `t5` cột nào thay thế làm lát cắt mới nhất ở `compute_kpi_by_neighbourhood()`?",
        "a": "Code dùng động `t_last = f\"t{len(snapshots)}\"` (`src/kpi.py:L390`) nên tự chuyển sang `t5`!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `kpi.py` viết cứng 4 biến `t1, t2, t3, t4` và sẽ văng `IndexError` khi YAML có 5 phần tử."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vs-037",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "scenario",
    "topics": [
      "Architecture",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phân biệt bài toán sửa lỗi kỹ thuật (Engineering) vs giới hạn bản chất dữ liệu (Methodological Limitation).",
    "question": "Tình huống: Nếu được giao thêm 2 tuần cải tiến đồ án này, điểm yếu nào có thể khắc phục hoàn toàn bằng **code** (kỹ thuật) và điểm yếu nào **không thể** sửa bằng code vì thuộc bản chất nguồn dữ liệu Inside Airbnb?",
    "quickAnswer": "**Sửa được bằng code:** (1) Thêm kiểm tra magic bytes gzip `1f 8b` khi download; (2) Bổ sung `% 1 != 0` vào `RULE_ACCOMMODATES_BOUNDS`; (3) Thêm `prompt_hash` vào `llm_cache.jsonl`; (4) Dùng `Index.union` để hỗ trợ unbalanced panel.\n**Không thể sửa bằng code:** (1) Mất giá 100% ở `t2` từ nguồn Inside Airbnb; (2) `Availability` không tách được khách đặt thật vs chủ nhà khóa lịch; (3) Thiên lệch chọn mẫu (74.9% review ở Cuauhtémoc và 1.000 căn không bao gồm căn hộ mới gia nhập sau `t1`).",
    "explanation": "Khả năng tách bạch \"lỗi kỹ thuật chữa được\" vs \"giới hạn dữ liệu không thể chữa\" là tiêu chí hàng đầu của kỹ sư dữ liệu trưởng thành.",
    "projectLink": "src/qa.py; src/download.py; reports/report.pdf",
    "codeLocation": "src/qa.py; src/download.py; reports/report.pdf",
    "proofExample": "Khớp hoàn toàn báo cáo Chương 6 (`Hạn chế & Hướng phát triển`).",
    "followUpQuestions": [
      "Muốn giảm được phần nào yếu tố \"chủ khóa lịch giả\" bằng dữ liệu có sẵn trong `calendar.csv.gz`, có thể phân tích thêm gì ở hướng phát triển?"
    ],
    "followUpQA": [
      {
        "q": "Muốn giảm được phần nào yếu tố \"chủ khóa lịch giả\" bằng dữ liệu có sẵn trong `calendar.csv.gz`, có thể phân tích thêm gì ở hướng phát triển?",
        "a": "Có thể đối chiếu `calendar.csv.gz` qua các ngày liên tiếp (xem một chuỗi 30 ngày bị khóa kín đồng loạt kèm thay đổi `minimum_nights = 30` hay biến mất từng ngày rải rác)."
      }
    ],
    "commonMistakes": [
      "Hứa hẹn \"viết code AI đoán ngược giá đã mất ở t2\" hoặc \"code phân biệt được khách đặt thật với chủ khóa lịch chỉ từ file CSV t4\"."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-038",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "SQL",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "So sánh xử lý `filter` bằng `DuckDB` vs `pandas chunksize=100_000` khi môi trường không có quyền mạng/RAM cực thấp.",
    "question": "Tình huống: Trên một laptop 4 GB RAM, file `calendar.csv.gz` (nén 80MB, giải nén 1.5GB) hoặc `listings.csv.gz` quá nặng. Khi nào `pandas chunksize` dễ gặp vấn đề và `DuckDB` giải quyết vượt trội hơn ở điểm nào?",
    "quickAnswer": "`pandas chunksize=100_000` đọc qua toàn bộ tất cả 75 cột trước rồi mới bỏ cột không dùng (hoặc nếu cuối cùng gộp lại các chunk vẫn nằm toàn bộ trong RAM khi `pd.concat`). Trong khi đó **DuckDB** thực thi đọc theo cột (column pruning), đẩy điều kiện lọc xuống thẳng tầng giải nén (`WHERE listing_id IN (...)`) và xuất thẳng kết quả lọc ra file Parquet/CSV qua đĩa (`COPY ... TO ...`) với mức RAM cố định rất nhỏ (~vài trăm MB)!",
    "explanation": "Nhóm 4 dùng pandas `chunksize=100_000` rất phù hợp vì `listings.csv.gz` chỉ có ~27k dòng/mốc và `reviews` lọc xong còn đúng 5.000 dòng; còn nếu mở rộng sang `calendar.csv.gz` của 10 thành phố thì DuckDB là nâng cấp kiến trúc tự nhiên nhất.",
    "projectLink": "src/filter_data_from_sheet.py:L131; Bài 6",
    "codeLocation": "src/filter_data_from_sheet.py:L131; Bài 6",
    "proofExample": "Bài 6 & `docs/01` giới thiệu kỹ thuật DuckDB trên Inside Airbnb; code Nhóm 4 dùng pandas thuần để đơn giản hóa `requirements.txt`.",
    "followUpQuestions": [
      "Khi lọc `reviews.csv.gz` bằng DuckDB SQL (`read_csv_auto`), bẫy kiểu dữ liệu nào bắt buộc phải phòng ngừa?"
    ],
    "followUpQA": [
      {
        "q": "Khi lọc `reviews.csv.gz` bằng DuckDB SQL (`read_csv_auto`), bẫy kiểu dữ liệu nào bắt buộc phải phòng ngừa?",
        "a": "Phải ép kiểu cột ID (`types={\"id\": \"VARCHAR\", \"listing_id\": \"VARCHAR\"}` hoặc `all_varchar=true`), nếu không `read_csv_auto` có thể đoán nhầm ID dài thành số/int64!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `chunksize` trong pandas luôn dùng ít RAM hơn mọi công cụ khác kể cả khi file kết quả đầu ra tự thân nặng hơn RAM."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-039",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Python"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Hành vi `pandas 2.2` vs `pandas 3.0` khi chạy các đoạn code gán dữ liệu cũ của môn học.",
    "question": "Tình huống: Nếu một sinh viên nâng cấp máy từ `pandas 2.2` lên `pandas 3.0` và chạy đoạn notebook cũ viết `sub = df[df[\"price\"] > 500]; sub[\"tier\"] = \"high\"` (không có `.copy()`), chuyện gì xảy ra ở từng phiên bản?",
    "quickAnswer": "Ở **pandas 2.2** (chưa bật CoW mặc định): đoạn code vẫn chạy và chỉ phát cảnh báo `SettingWithCopyWarning` (đôi khi sửa ngầm vào `df`, đôi khi không). Sang **pandas 3.0** (bật **Copy-on-Write** mặc định bắt buộc): sửa `sub` hoàn toàn không chạm tới `df`, hoặc nếu viết chained assignment `df[mask][\"tier\"] = \"high\"` sẽ văng hẳn ngoại lệ `ChainedAssignmentError` không cho chạy tiếp! Cách viết chuẩn nhất trên mọi phiên bản là `df.loc[mask, \"tier\"] = \"high\"` (hoặc `sub = df[...].copy()`).",
    "explanation": "Toàn bộ codebase Nhóm 4 tại `qa.py`, `filter_data_from_sheet.py`, `kpi.py` đều tuân thủ `.copy()` và gán trực tiếp qua cột/mask nên chạy an toàn trên cả pandas 2 và pandas 3.",
    "projectLink": "src/qa.py:L76; Bài 4",
    "codeLocation": "src/qa.py:L76; Bài 4",
    "proofExample": "Bài 4 nhấn mạnh CoW trong pandas 3.0.",
    "followUpQuestions": [
      "Trong pandas 3.0 có `Copy-on-Write`, gọi `.copy()` ngay trước khi sửa liệu có làm tốn gấp đôi RAM lập tức không?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas 3.0 có `Copy-on-Write`, gọi `.copy()` ngay trước khi sửa liệu có làm tốn gấp đôi RAM lập tức không?",
        "a": "Nhờ cơ chế CoW tối ưu trễ (lazy copy), dữ liệu chỉ thực sự sao chép vùng bộ nhớ ở cột bị chỉnh sửa khi có lệnh ghi, chứ không sao chép thừa lúc đọc."
      }
    ],
    "commonMistakes": [
      "Nghĩ `df[mask][\"col\"] = val` vẫn hoạt động êm như nhau trên cả pandas 2.2 và pandas 3.0."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-040",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "scenario",
    "topics": [
      "Regex",
      "Datetime"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi dữ liệu review chứa ngày giờ dạng hỗn hợp hoặc múi giờ UTC (`\"2026-06-15T23:45:00Z\"`).",
    "question": "Tình huống: Trong một snapshot mới, nếu cột `last_scraped` chứa giờ + múi giờ `\"2026-06-15T23:45:00Z\"` còn `last_review` chỉ có ngày `\"2026-06-15\"`, phép so sánh `last_review > ref_date` trong `qa.py` có gặp lỗi `TypeError: Invalid comparison between dtype=datetime64[ns] and DatetimeArray` (tz-naive vs tz-aware) không?",
    "quickAnswer": "CÓ NGUY CƠ! Nếu một cột parse ra `tz-aware (UTC)` còn cột kia là `tz-naive`, phép so sánh `>` trong pandas ném `TypeError`! Cách xử lý chuẩn hóa ngày là gọi `.dt.tz_localize(None)` (hoặc `utc=True` cho cả hai rồi `.dt.normalize()` đưa về 00:00:00) trước khi trừ hoặc so sánh ngày.",
    "explanation": "Xử lý dữ liệu thời gian (Bài 8) luôn đòi hỏi đồng bộ đồng thời: định dạng, múi giờ (tz-naive vs tz-aware) và độ phân giải ngày (`normalize`).",
    "projectLink": "src/qa.py:L278-L290; Bài 8",
    "codeLocation": "src/qa.py:L278-L290; Bài 8",
    "proofExample": "`src/qa.py:L278-L290` hiện hoạt động trơn tru do Inside Airbnb xuất cả 2 cột ở chuẩn ngày thuần `\"YYYY-MM-DD\"`.",
    "followUpQuestions": [
      "Nếu `last_scraped` là `\"2026-06-15 00:00:00\"` và `last_review` cũng là `\"2026-06-15\"` thì `last_review > ref_date` là True hay False?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `last_scraped` là `\"2026-06-15 00:00:00\"` và `last_review` cũng là `\"2026-06-15\"` thì `last_review > ref_date` là True hay False?",
        "a": "Là `False` (hợp lệ!), vì đánh giá trong cùng ngày cào vẫn có thể xảy ra trước giờ cào."
      }
    ],
    "commonMistakes": [
      "Cho rằng `pd.to_datetime()` tự động gỡ bỏ chữ `Z` và tạo tz-naive để so sánh được với cột không có múi giờ."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-041",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "Python",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi chạy pipeline trên hệ điều hành Windows vs Linux liên quan tới encoding UTF-8 và đường dẫn.",
    "question": "Tình huống: Trên Windows mặc định mã hóa console/tệp thường là `cp1252` (hoặc `cp1258`), dễ làm lỗi `UnicodeEncodeError` khi in tên quận tiếng Tây Ban Nha (`Cuauhtémoc`, `Álvaro Obregón`) hoặc emoji trong review. `run_pipeline.py` và các file `src/*.py` xử lý điều này ra sao?",
    "quickAnswer": "`run_pipeline.py:L47` ép biến môi trường `\"PYTHONIOENCODING\": \"utf-8\"` cho mọi subprocess con, đồng thời mọi lệnh mở/ghi tệp trong `src/` đều truyền rõ `encoding=\"utf-8\"`, và dùng `pathlib.Path` (chứ không nối chuỗi dấu `\\`) để chạy xuyên nền tảng Windows/macOS/Linux.",
    "explanation": "Một chi tiết kỹ thuật nhỏ nhưng quyết định tính tái lập (Rubric A1) khi chấm bài trên máy chấm khác hệ điều hành.",
    "projectLink": "run_pipeline.py:L47; src/filter_data_from_sheet.py:L48",
    "codeLocation": "run_pipeline.py:L47; src/filter_data_from_sheet.py:L48",
    "proofExample": "Không có lỗi sập Unicode nào khi đọc review tiếng Đức/Tây Ban Nha/tiếng Việt trên Windows.",
    "followUpQuestions": [
      "Còn vấn đề BOM (`\\ufeff`) khi đọc phản hồi CSV từ Google Sheets trên Windows được xử lý bằng encoding nào?"
    ],
    "followUpQA": [
      {
        "q": "Còn vấn đề BOM (`\\ufeff`) khi đọc phản hồi CSV từ Google Sheets trên Windows được xử lý bằng encoding nào?",
        "a": "`encoding=\"utf-8-sig\"` trong `src/filter_data_from_sheet.py:L48`."
      }
    ],
    "commonMistakes": [
      "Dùng `open(path, \"w\")` thiếu `encoding=\"utf-8\"` khiến máy Windows crash ngay khi gặp chữ `Cuauhtémoc`."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vs-042",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Sự cố `concat` vs `merge` khi ghép dữ liệu 4 snapshot mà 1 snapshot bị lệch tên cột.",
    "question": "Tình huống: Giả sử ở snapshot `t4`, Inside Airbnb đổi tên cột `neighbourhood_cleansed` thành `neighbourhood_name` mà bạn dùng `pd.concat([df_t1, df_t4])`. Kết quả là gì và `kpi.py` xử lý thế nào?",
    "quickAnswer": "`pd.concat()` theo chiều dọc (`axis=0`) ghép theo tên cột -> tạo ra **2 cột tách biệt** (`neighbourhood_cleansed` chứa giá trị ở `t1` và `NaN` ở `t4`, còn `neighbourhood_name` ngược lại!). Trong `src/kpi.py`, nhờ `_validate_required_qa_columns()` kiểm tra danh sách cột bắt buộc ngay khi nạp từng snapshot, pipeline dừng fail-fast bằng `ValueError` thay vì âm thầm tạo cột lệch schema!",
    "explanation": "Hợp đồng schema (Data Contract) `REQUIRED_QA_COLS` ngăn sai sót im lặng do đổi tên cột từ nguồn ngoài.",
    "projectLink": "src/kpi.py:L25-L34, L75",
    "codeLocation": "src/kpi.py:L25-L34, L75",
    "proofExample": "`src/kpi.py:L25-L34, L75` kiểm tra ngay đầu `_load_snapshots()`.",
    "followUpQuestions": [
      "Khi cần giữ an toàn tuyệt đối cấu trúc cột giữa nhiều bảng, làm sao chuẩn hóa schema trước khi `concat`?"
    ],
    "followUpQA": [
      {
        "q": "Khi cần giữ an toàn tuyệt đối cấu trúc cột giữa nhiều bảng, làm sao chuẩn hóa schema trước khi `concat`?",
        "a": "Kiểm tra tập cột giao/bắt buộc (Data Contract) hoặc dùng `reindex(columns=expected_cols)` trước khi nối."
      }
    ],
    "commonMistakes": [
      "Tưởng `pd.concat` tự báo lỗi nếu danh sách cột của `df_t1` và `df_t4` khác nhau 1 cột."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-043",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phân tích sự cố khi `neighbourhood_cleansed` có chuỗi khoảng trắng thừa `\" Cuauhtémoc \"` ở một mốc.",
    "question": "Tình huống: Nếu một bản ghi có `neighbourhood_cleansed = \" Cuauhtémoc \"` (thừa dấu cách ở đầu/cuối) ở dữ liệu mới, điều gì xảy ra ở `groupby()` trong `kpi_by_neighbourhood.csv` và lúc tô màu GeoJSON trong `viz.py`?",
    "quickAnswer": "`groupby(\"neighbourhood_cleansed\")` tách `\" Cuauhtémoc \"` thành **quận thứ 16 tách biệt** với `\"Cuauhtémoc\"`! Sang `src/viz.py`, vì `\" Cuauhtémoc \"` không khớp tên trong `neighbourhoods.geojson`, quận này bị mất màu hoặc lệch số thứ tự! Cách chuẩn phòng vệ là gọi `.astype(\"string\").str.strip()` cho các cột phân loại trước khi `groupby`.",
    "explanation": "Lỗi bẩn chuỗi phân loại (Trailing Whitespace / Case Mismatch) rất phổ biến trong dữ liệu thực tế.",
    "projectLink": "src/kpi.py:L380; src/viz.py:L215",
    "codeLocation": "src/kpi.py:L380; src/viz.py:L215",
    "proofExample": "`src/viz.py` thực hiện ghép tên quận từ CSV sang bảng thuộc tính `properties[\"neighbourhood\"]` của GeoJSON.",
    "followUpQuestions": [
      "Lỗi tương tự xảy ra thế nào trong `src/evaluate.py` nếu cột nhãn ở `ground_truth.csv` thừa khoảng trắng?"
    ],
    "followUpQA": [
      {
        "q": "Lỗi tương tự xảy ra thế nào trong `src/evaluate.py` nếu cột nhãn ở `ground_truth.csv` thừa khoảng trắng?",
        "a": "`src/evaluate.py` đã phòng thủ bằng `.astype(str).str.strip().str.lower()` trước khi chấm F1/Accuracy."
      }
    ],
    "commonMistakes": [
      "Nghĩ Python/pandas tự động bỏ qua khoảng trắng thừa ở hai đầu chuỗi khi `groupby` hay `merge`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-044",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "NumPy",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Bẫy `np.where(cond, a / b, np.nan)` khi `b` chứa số `0` — cảnh báo RuntimeWarning và cách phòng tránh.",
    "question": "Tình huống: Nếu thay phép lọc mặt nạ `valid_ppg` trong `kpi.py` bằng lệnh `np.where(df[\"accommodates_clean\"] > 0, df[\"price_mxn\"] / df[\"accommodates_clean\"], np.nan)`, tại sao chương trình vẫn có thể ném `ZeroDivisionError` hoặc `RuntimeWarning: divide by zero` dù đã đặt điều kiện `> 0`?",
    "quickAnswer": "Vì `np.where(cond, x, y)` là hàm Python thông thường: Python **đánh giá toàn bộ biểu thức đối số `x` (`price / accommodates`) và `y` TRƯỚC** khi đưa vào `np.where` lọc theo `cond`! Nếu có dù chỉ 1 phần tử `accommodates == 0`, phép chia vẫn thực thi trước toàn mảng gây lỗi/cảnh báo! Cách viết an toàn là chỉ chia trên lát cắt đã lọc (`df.loc[mask, ...]`) hoặc đổi mẫu số `0` thành `NaN` trước (`df[\"acc\"].replace(0, np.nan)`).",
    "explanation": "Hiểu đúng cơ chế Eager Evaluation trong Python/NumPy giúp tránh lỗi ẩn khi mở rộng tính năng.",
    "projectLink": "src/kpi.py:L108-L116",
    "codeLocation": "src/kpi.py:L108-L116",
    "proofExample": "Trong `src/kpi.py:L110`, Nhóm 4 tạo `mask = valid_price & valid_acc` rồi chỉ tính `df.loc[mask, price_col] / df.loc[mask, \"accommodates_clean\"]`, tránh bẫy này hoàn toàn.",
    "followUpQuestions": [
      "Trong SQL (`CASE WHEN acc > 0 THEN price / acc ELSE NULL END`), phép chia khi `acc = 0` có an toàn hơn `np.where` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong SQL (`CASE WHEN acc > 0 THEN price / acc ELSE NULL END`), phép chia khi `acc = 0` có an toàn hơn `np.where` không?",
        "a": "Trong SQL chuẩn/DuckDB, `CASE WHEN` đánh giá điều kiện theo từng hàng trước khi tính nhánh `THEN` (tùy bộ tối ưu vẫn nên dùng `NULLIF(acc, 0)` cho chắc chắn 100%)."
      }
    ],
    "commonMistakes": [
      "Tin rằng `np.where` bỏ qua không tính nhánh `True` ở những hàng có điều kiện `False` (nhầm với câu `if/else` rẽ nhánh lười)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-045",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi đổi phép tổng hợp `Complaint Rate` sang tính bình quân theo từng căn hộ thay vì từng review.",
    "question": "Tình huống: Giả sử căn hộ L1 ở Cuauhtémoc nhận 100 review và không chê tiếng ồn nào (`0%`), còn 10 căn khác mỗi căn nhận 1 review đều chê tiếng ồn (`100%`). Tính `complaint_noise` theo **cách hiện tại của `kpi.py`** vs **tính theo từng căn hộ rồi lấy trung bình** khác nhau ra sao?",
    "quickAnswer": "**Cách hiện tại (`src/kpi.py:L406`, review-weighted):** tính trực tiếp trên toàn bộ `110` review của quận -> `10 / 110 = 9.09%`. **Cách listing-weighted (gộp theo từng listing trước):** `L1` = `0%`, 10 căn kia = `100%` -> trung bình `(0 + 10*1)/11 = 90.9%`! Hai kết quả chênh nhau tới 10 lần! Cần giải thích rõ công thức hiện tại của Nhóm 4 đo **tỷ trọng các lượt đánh giá có phàn nàn** trên tập mẫu review LLM được chọn tại quận (`N_LLM(k)`).",
    "explanation": "Độ nhạy đơn vị tổng hợp (Unit of Analysis: Review-level vs Listing-level) là câu hỏi kinh điển của giảng viên Data Analyst.",
    "projectLink": "src/kpi.py:L400-L435",
    "codeLocation": "src/kpi.py:L400-L435",
    "proofExample": "Tại Cuauhtémoc, `1.000` review thực tế chỉ phân bổ trên `361` listing duy nhất (trung bình ~2.77 review/listing có review).",
    "followUpQuestions": [
      "Tại sao chọn mẫu của Nhóm 4 trong tab Review lại không phân bổ đều số review cho mọi listing?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao chọn mẫu của Nhóm 4 trong tab Review lại không phân bổ đều số review cho mọi listing?",
        "a": "Vì bước phân công 5.000 review và 1.000 review LLM phản ánh cấu trúc thực tế của thị trường (các căn đắt khách tại Cuauhtémoc tích lũy nhiều review hơn hẳn ngoại ô)."
      }
    ],
    "commonMistakes": [
      "Tưởng 2 cách tính theo review và theo listing luôn cho cùng 1 con số % nếu cùng một quận."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-046",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống `pd.merge()` có khóa trùng ở bảng bên phải gây nhân bản dòng (Data Explosion).",
    "question": "Tình huống: Ở `src/kpi.py:L402`, trước khi ghép bảng review `reviews_sentiment` với quận của listing, code viết `.drop_duplicates(\"id\")`. Điều gì xảy ra nếu bỏ `.drop_duplicates(\"id\")` trên một bảng bị lặp mã `id` ở bảng listing?",
    "quickAnswer": "Một căn hộ có 2 dòng trùng trong bảng listing và sở hữu 10 review sẽ bị **nhân bản thành `2 × 10 = 20` review** sau `merge`! Hậu quả làm sai lệch cả mẫu số `llm_review_count` lẫn tử số phàn nàn. Tốt nhất còn nên truyền thêm `validate=\"many_to_one\"` vào `merge()` để pandas tự báo lỗi nếu phát hiện khóa phải bị trùng.",
    "explanation": "Chặn Data Explosion trong `merge()` là kỹ thuật trọng tâm của Bài 5.",
    "projectLink": "src/kpi.py:L402-L409",
    "codeLocation": "src/kpi.py:L402-L409",
    "proofExample": "`src/kpi.py:L402` chặn trước bằng `drop_duplicates(\"id\")` trước khi gọi `.merge(..., how=\"left\")`.",
    "followUpQuestions": [
      "Trong pandas, tham số `validate=\"many_to_one\"` kiểm tra chiều khóa bên nào là duy nhất?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas, tham số `validate=\"many_to_one\"` kiểm tra chiều khóa bên nào là duy nhất?",
        "a": "Kiểm tra bảng bên **phải (one)** phải có khóa duy nhất 100%, nếu trùng sẽ ném `MergeError` ngay lập tức."
      }
    ],
    "commonMistakes": [
      "Nghĩ `how=\"left\"` luôn giữ nguyên đúng số lượng dòng của bảng bên trái bất kể bảng bên phải có khóa trùng hay không!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-047",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Lý do cần xử lý giá trị `pd.NA` (Nullable Extension Type) cẩn thận trong điều kiện logic 3 giá trị (Kleene Logic).",
    "question": "Tình huống: Nếu một cột `flag` mang nullable dtype `\"boolean\"` chứa `[True, False, pd.NA]` thay vì `bool` thuần, toán tử `~flag` và `df[flag]` phản ứng ra sao so với cách viết `.fillna(True)` hay `.fillna(False)` trong `kpi.py`?",
    "quickAnswer": "Với dtype `\"boolean\"`, `~pd.NA` vẫn trả về **`pd.NA`** (logic 3 giá trị Kleene: `True & pd.NA -> pd.NA`, `False & pd.NA -> False`), và nếu truyền mảng boolean chứa `pd.NA` vào `df[flag]` có thể ném `ValueError: Cannot mask with non-boolean array containing NA / NaN values`! Đó là lý do `src/kpi.py:L62` viết `_qa_flag`: `df[col].fillna(True).astype(bool)` và `L197` viết `(g == 0).fillna(False)`.",
    "explanation": "Hiểu đúng Kleene 3-valued logic của `pd.NA` giải thích trọn vẹn các dòng phòng vệ `.fillna(...)` rải khắp `src/kpi.py`.",
    "projectLink": "src/kpi.py:L60-L62, L197",
    "codeLocation": "src/kpi.py:L60-L62, L197",
    "proofExample": "`_qa_flag` điền `True` khi thiếu cờ QA (nguyên tắc thắt chặt an toàn: không rõ thì coi như lỗi QA!), còn `(g == 0).fillna(False)` loại bỏ cả ghost `<NA>`.",
    "followUpQuestions": [
      "Trong logic Kleene, biểu thức `True | pd.NA` trả về kết quả gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong logic Kleene, biểu thức `True | pd.NA` trả về kết quả gì?",
        "a": "Trả về **`True`** (vì một vế đã chắc chắn đúng nên phép OR luôn đúng bất chấp vế kia chưa biết), còn `False | pd.NA` ra `pd.NA`."
      }
    ],
    "commonMistakes": [
      "Đánh đồng `pd.NA` hành xử giống hệt `False` khi đánh mặt nạ `df[mask]`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-048",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi dùng `pd.cut()` vs `pd.qcut()` để phân nhóm giá niêm yết qua nhiều năm.",
    "question": "Tình huống: Nếu muốn phân loại 1.000 căn hộ thành 3 phân khúc \"Bình dân / Trung cấp / Cao cấp\" để so sánh tỷ trọng qua `t1 -> t3 -> t4` và sang năm 2027, nên chọn `pd.cut()` (ngưỡng cố định MXN) hay `pd.qcut()` (chia 3 đều mỗi kỳ)?",
    "quickAnswer": "Phải chọn **`pd.cut()`** với ngưỡng giá cố định (hoặc quy chuẩn trượt lạm phát) nếu muốn theo dõi **sự dịch chuyển cơ cấu giá** qua thời gian! Vì nếu dùng `pd.qcut(price, q=3)` riêng từng kỳ, mỗi kỳ luôn luôn ép đúng `33.3% / 33.3% / 33.3%` vào 3 nhóm dù giá toàn thành phố có tăng vọt `+67.3%` đi nữa — biến biểu đồ cơ cấu thành 3 thanh đứng im vô nghĩa!",
    "explanation": "Phân biệt sắc bén mục tiêu của `pd.cut()` (fixed benchmark) vs `pd.qcut()` (equal-count relative quantiles) trong Bài 5.",
    "projectLink": "Bài 5 & Bài 10",
    "codeLocation": "Bài 5 & Bài 10",
    "proofExample": "Hiện tượng tương tự chính là bẫy của `RULE_PRICE_OUTLIER` khi dùng phân vị `[P01, P99]` tính riêng từng kỳ (luôn bắt ~2%).",
    "followUpQuestions": [
      "Khi một dãy số có quá nhiều phần tử trùng giá nhau tại đường biên (ví dụ nhiều căn giá đúng 1.000 MXN), `pd.qcut()` hay gặp lỗi gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi một dãy số có quá nhiều phần tử trùng giá nhau tại đường biên (ví dụ nhiều căn giá đúng 1.000 MXN), `pd.qcut()` hay gặp lỗi gì?",
        "a": "`ValueError: Bin edges must be unique` — cần truyền thêm `duplicates=\"drop\"` (làm các nhóm không còn bằng nhau 33.3% nữa)."
      }
    ],
    "commonMistakes": [
      "Dùng `pd.qcut(df[\"price\"], 3)` cho từng snapshot rồi kết luận \"tỷ lệ phòng cao cấp không hề tăng vào dịp World Cup\"."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vs-049",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Baseline"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Cải tiến `clean_text` & Regex trong `src/baseline.py` để bắt tốt hơn tiếng Tây Ban Nha mà không tăng độ trễ.",
    "question": "Tình huống: Nếu được yêu cầu tăng `Macro F1` của `Baseline Regex` trên 100 mẫu CDMX từ `0.5224` lên khoảng `0.70+` mà vẫn giữ chi phí `$0` (không dùng LLM/ML), cải tiến nào trong `src/baseline.py` mang lại hiệu quả nhanh nhất?",
    "quickAnswer": "Tập trung sửa đúng 3 điểm yếu trong `src/baseline.py`: (1) Bổ sung cụm phủ định & chuyển ý tiếng Tây Ban Nha thường gặp vào `NEG_RE` và `CLAUSE_RE` (như `\"sin embargo\"`, `\"pero\"`, `\"ruidoso\"`, `\"sucio\"`, `\"agua fría\"`); (2) Xử lý từ nối chuyển ý `\"but / although / however\"` tách mệnh đề tốt hơn khi khách khen vế trước nhưng chê vế sau cùng câu; (3) Mở rộng `BENIGN_RE` cho các cụm khen kiểu phủ định như `\"nothing to complain\"`, `\"no issues\"`.",
    "explanation": "Đề xuất cải tiến xuất phát trực tiếp từ phân tích lỗi thực tế trên `llm_error_analysis.csv` chứ không đoán mò.",
    "projectLink": "src/baseline.py:L25-L60",
    "codeLocation": "src/baseline.py:L25-L60",
    "proofExample": "Tất cả mẫu Regex đã biên dịch trước bằng `re.compile()` ở đầu module nên chạy trên 1.000 câu vẫn dưới `0.2 giây`.",
    "followUpQuestions": [
      "Tại sao `src/baseline.py` lại biên dịch `re.compile()` toàn bộ pattern ở cấp module thay vì để trong vòng lặp `for text in ...`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/baseline.py` lại biên dịch `re.compile()` toàn bộ pattern ở cấp module thay vì để trong vòng lặp `for text in ...`?",
        "a": "Để tái sử dụng máy trạng thái Regex đã biên dịch một lần duy nhất thay vì biên dịch lại 1.000–5.000 lần mỗi lượt chạy."
      }
    ],
    "commonMistakes": [
      "Thay toàn bộ Regex bằng gọi mô hình HuggingFace nặng vài GB mà vẫn gọi là Baseline nhanh nhẹ gọn."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vs-050",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "API",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi nhận HTTP `429` có kèm header `Retry-After` hoặc cấu trúc JSON bị model cắt cụt vì `max_output_tokens`.",
    "question": "Tình huống: Khi gửi một batch gồm 5 review siêu dài vào LLM, mô hình trả về chuỗi JSON bị cắt cụt nửa chừng (lỗi `ValidationError / JSONDecodeError`) khiến batch 5 câu fail. Nên điều chỉnh `batch_size`, `max_output_tokens` hay cơ chế gì để pipeline tự phục hồi?",
    "quickAnswer": "Khi batch `5` câu dài làm output vượt trần token hoặc rối cấu trúc, cơ chế fallback ở `src/llm.py:L342` tự tách các câu chưa xong sang chạy **`batch_size = 1`**! Nếu cần nâng cấp thêm cho bài toán review dài, có thể: (a) cắt giới hạn ký tự đầu vào hợp lý cho mỗi review; (b) đảm bảo trường `notes` ngắn gọn để giữ output gọn (tiết kiệm cả token lẫn tránh chạm trần output); (c) tôn trọng header `Retry-After` khi có.",
    "explanation": "Kết hợp cả phòng ngừa kích thước batch lẫn hồi phục đơn lẻ `batch_size = 1`.",
    "projectLink": "src/llm.py:L250-L355",
    "codeLocation": "src/llm.py:L250-L355",
    "proofExample": "`src/llm.py` thực tế đã cứu trọn vẹn `1.000/1.000` mẫu sạch sẽ không rớt bản ghi nào.",
    "followUpQuestions": [
      "Vì sao giới hạn ngắn độ dài câu giải thích/output JSON còn giúp giảm trực tiếp gần 80% hóa đơn tiền API?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao giới hạn ngắn độ dài câu giải thích/output JSON còn giúp giảm trực tiếp gần 80% hóa đơn tiền API?",
        "a": "Vì trên `gemini-3.5-flash-lite`, Output Token ($2.50/1M) đắt hơn gấp 8.3 lần Input Token ($0.30/1M) — và trong `llm_cost_estimate.csv`, chi phí output đã chiếm `$0.17 / $0.203` (**83.7%** tổng hóa đơn)!"
      }
    ],
    "commonMistakes": [
      "Tăng `batch_size` lên 50 ngay lập tức khi thấy lỗi API (sẽ làm JSON output dài khổng lồ và dễ cắt cụt/rớt cả 50 câu cùng lúc!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vs-051",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Kiểm toán chéo nếu bảng `kpi_by_listing.csv` thiếu mất một cột trong `REQUIRED_QA_COLS`.",
    "question": "Tình huống: Giả sử ai đó chạy phiên bản cũ của `qa.py` chưa xuất cột `qa_missing_reviews`, rồi chạy tiếp `python src/kpi.py --config configs/mexico-city.yaml`. Chương trình sẽ chạy tiếp sai số hay báo lỗi ở dòng nào?",
    "quickAnswer": "`src/kpi.py` ngay tại bước `_load_snapshots()` gọi `_validate_required_qa_columns(df, snap)` (`L76`) -> phát hiện thiếu `\"qa_missing_reviews\"` trong tập 12 cột hợp đồng `REQUIRED_QA_COLS` (cộng `price_mxn`) -> **dừng ngay với `ValueError` liệt kê rõ tên snapshot và các cột bị thiếu**!",
    "explanation": "Đây là mô hình Design by Contract giữa tầng Clean/QA và tầng Transform/KPI: hỏng hợp đồng dữ liệu phải dừng to tiếng (Fail Loudly).",
    "projectLink": "src/kpi.py:L18-L34, L75-L85",
    "codeLocation": "src/kpi.py:L18-L34, L75-L85",
    "proofExample": "Xem danh sách đủ 12 cột ở `src/kpi.py:L18-L32`.",
    "followUpQuestions": [
      "Tại sao tên cột giá (`price_mxn`) không viết cứng trong tuple `REQUIRED_QA_COLS` mà phải nối thêm động bằng `_price_col(config)`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao tên cột giá (`price_mxn`) không viết cứng trong tuple `REQUIRED_QA_COLS` mà phải nối thêm động bằng `_price_col(config)`?",
        "a": "Vì nếu đổi YAML sang `currency: \"usd\"` hoặc `\"eur\"`, tên cột giá đổi thành `price_usd` / `price_eur` tương ứng!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `kpi.py` tự bỏ qua cột QA bị thiếu và ngầm giả định tất cả bản ghi đều hợp lệ (`False`)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-052",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "Data Cleaning",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "So sánh độ nhạy Outlier giữa Standard Deviation (Z-score), IQR (1.5×IQR), Quantile (P01–P99) và MAD.",
    "question": "Tình huống: Với dữ liệu giá Airbnb CDMX bị lệch phải cực mạnh (Median = 1.940 MXN nhưng có căn 153.540 MXN), nếu dùng **Z-score `|z| > 3`** vs **IQR `1.5×IQR`** vs **MAD (Median Absolute Deviation)** vs **Quantile `[P01, P99]`**, phương pháp nào dễ bị \"hiệu ứng che khuất\" (masking effect) nhất?",
    "quickAnswer": "**Z-score (`|x - mean| / std > 3`)** chịu hiệu ứng che khuất nặng nhất! Vì chính vài căn hộ giá `153.540 MXN` đã thổi phồng cả `Mean` lẫn `Std` (Std vọt lên hàng chục nghìn), khiến ngưỡng `mean + 3*std` đẩy lên quá cao làm bỏ lọt nhiều giá bất thường ở vùng `15.000–30.000 MXN`! Ngược lại **IQR** và **MAD (`median(|x - median(x)|)`)** dùng Median nên có điểm sụp đổ (breakdown point) tới 50%, không hề bị kéo lệch bởi ngoại lai cực đoan; còn `[P01, P99]` cắt cố định 2% đuôi phân bố.",
    "explanation": "Giải thích chuẩn lý thuyết thống kê hiện đại tại Bài 10.",
    "projectLink": "src/qa.py:L115-L125; Bài 10",
    "codeLocation": "src/qa.py:L115-L125; Bài 10",
    "proofExample": "Thực nghiệm CDMX: Q99 tại `t4` là `14.084 MXN` (nhờ phân vị không bị các căn 153k làm sai lệch).",
    "followUpQuestions": [
      "Điểm hạn chế nhỏ của riêng tiêu chí `MAD` nếu >50% giá trị trong mẫu giống hệt nhau (vd cùng bằng 500 MXN) là gì?"
    ],
    "followUpQA": [
      {
        "q": "Điểm hạn chế nhỏ của riêng tiêu chí `MAD` nếu >50% giá trị trong mẫu giống hệt nhau (vd cùng bằng 500 MXN) là gì?",
        "a": "Khi >50% dữ liệu trùng giá trị trung vị, `MAD = 0` — lúc đó bất kỳ điểm nào hơi khác trung vị đều cho điểm chuẩn hóa MAD vô cực nếu không có hằng số dự phòng!"
      }
    ],
    "commonMistakes": [
      "Nghĩ Z-score luôn chặt hơn và nhạy hơn phương pháp IQR trên mọi phân phối."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-053",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi `kpi_by_area.csv` và `kpi_by_neighbourhood.csv` hiển thị khác biệt ở khu vực có nhiều quận ghép chung (`A04` vs `Cuauhtémoc`).",
    "question": "Tình huống: Vì sao khu `A04` (`Cuauhtémoc + Venustiano Carranza`) trong `kpi_by_area.csv` có `559` listing ở mẫu nhưng riêng `Cuauhtémoc` trong `kpi_by_neighbourhood.csv` chỉ có `525` listing (`514` valid price)? Khi nào nên báo cáo cấp Khu vực (`A01..A08`) và khi nào cấp Quận?",
    "quickAnswer": "Mỗi cấp phục vụ một mục tiêu phân tích khác nhau: `A01..A08` (8 khu vực địa lý gộp các quận lân cận đủ cỡ mẫu `>= 36` listing/khu) dùng để **so sánh xu hướng giá, Occupancy và Review Velocity đáng tin cậy về mặt thống kê** (tránh nhiễu mẫu `n=1..5`); còn bảng cấp **Quận (15 quận)** dùng để **tìm điểm nóng hành chính chi tiết (Choropleth & Phàn nàn LLM)** kèm chú thích chặt chẽ các quận `n < 5`.",
    "explanation": "Kiến trúc bảng KPI đa tầng (`Listing -> Area -> Snapshot -> Neighbourhood`) giải quyết hài hòa bài toán Đánh đổi Cỡ mẫu vs Độ chi tiết địa lý.",
    "projectLink": "src/kpi.py:L270-L435; configs/mexico-city.yaml",
    "codeLocation": "src/kpi.py:L270-L435; configs/mexico-city.yaml",
    "proofExample": "Khu A04 gộp `Cuauhtémoc (525)` + `Venustiano Carranza (34)` = `559`; khu A07 gộp `Xochimilco (5)` + `Tláhuac (0)` + `Milpa Alta (1)` + ... đủ cỡ mẫu ổn định.",
    "followUpQuestions": [
      "Nếu một listing thuộc quận không nằm trong bảng ánh xạ `area_mapping` của YAML thì `compute_kpi_by_area()` xếp nó vào khu nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một listing thuộc quận không nằm trong bảng ánh xạ `area_mapping` của YAML thì `compute_kpi_by_area()` xếp nó vào khu nào?",
        "a": "Ở bước lọc `src/filter_data_from_sheet.py` đọc khu từ cột `\"Khu vực\"` trên Google Sheets (hoặc `src/kpi.py` nhóm theo cột `area_id`), nên vẫn giữ nguyên nhãn từ phân công chứ không tự xóa dòng."
      }
    ],
    "commonMistakes": [
      "Cho rằng `kpi_by_area` và `kpi_by_neighbourhood` bị tính trùng nhau nên thừa 1 bảng."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-054",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "Python",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi `configs/mexico-city.yaml` không tồn tại hoặc truyền đường dẫn tương đối khi đứng từ thư mục `src/`.",
    "question": "Tình huống: Sinh viên mở terminal bên trong thư mục `src/` rồi chạy `python run_pipeline.py --config configs/mexico-city.yaml` vs đứng ở root repo `2627-.../` chạy. Hệ thống xử lý đường dẫn ra sao?",
    "quickAnswer": "`run_pipeline.py` xác định `PROJECT_ROOT = Path(__file__).resolve().parent` (nên phải chạy `python ../run_pipeline.py --config configs/mexico-city.yaml` khi đứng ở `src/`!). Bên trong `run_pipeline.py:L43`, đường dẫn config tương đối tự động được nối với `PROJECT_ROOT` (`PROJECT_ROOT / cfg`), nên truyền đường dẫn tương đối hay tuyệt đối đều ổn định độc lập với `cwd` hiện tại!",
    "explanation": "Áp dụng chuẩn `Path(__file__).resolve()` giúp toàn repo di động 100%, không gãy đường dẫn khi máy chấm để thư mục ở ổ khác.",
    "projectLink": "run_pipeline.py:L7, L43",
    "codeLocation": "run_pipeline.py:L7, L43",
    "proofExample": "Cả 8 module trong `src/` cũng dùng `Path(__file__).resolve().parents[1]` để tìm `PROJECT_ROOT`.",
    "followUpQuestions": [
      "Khi chạy trực tiếp 1 module lẻ không truyền `--config`, script tìm file cấu hình ở đâu?"
    ],
    "followUpQA": [
      {
        "q": "Khi chạy trực tiếp 1 module lẻ không truyền `--config`, script tìm file cấu hình ở đâu?",
        "a": "Tất cả script đều dùng `os.environ.get(\"PIPELINE_CONFIG\")` rồi fallback về `PROJECT_ROOT / \"configs\" / \"mexico-city.yaml\"`."
      }
    ],
    "commonMistakes": [
      "Dùng `Path(\"data/processed\")` dựa theo working directory hiện tại làm crash khi chạy script từ thư mục con."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vs-055",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phân tích rủi ro khi `download.py` không xóa file `.tmp` sau khi đứt mạng.",
    "question": "Tình huống: Ở `src/download.py`, nếu kết nối bị ngắt giữa chừng khi đang ghi tệp 50% (`listings.csv.gz.tmp`) rồi người dùng bấm `Ctrl+C` (KeyboardInterrupt), điều gì bảo vệ tệp đích `listings.csv.gz` không bị hỏng?",
    "quickAnswer": "Nhờ ghi toàn bộ stream vào file tạm `dest.with_suffix(dest.suffix + \".tmp\")` và chỉ khi tải trọn vẹn (kèm đối chiếu `Content-Length` nếu server cung cấp) mới gọi `tmp.replace(dest)` (`L128`)! Dù mất điện hay `Ctrl+C` giữa chừng, tệp đích `listings.csv.gz` vẫn giữ nguyên bản cũ sạch sẽ (hoặc chưa tồn tại), hoàn toàn không bị sinh file cụt gây `[SKIP]` giả ở lần chạy kế tiếp.",
    "explanation": "Atomic Write (Ghi tạm rồi đổi tên nguyên tử) là mẫu chuẩn không thể thiếu khi thu thập dữ liệu web qua mạng không ổn định.",
    "projectLink": "src/download.py:L94-L132.",
    "codeLocation": "src/download.py:L94-L132.",
    "proofExample": "Đối chiếu trực tiếp tại `src/download.py:L94-L132.`.",
    "followUpQuestions": [
      "Trong trường hợp server dùng nén động chunked transfer nên header phản hồi KHÔNG có `Content-Length`, `download.py` có từ chối tải không?"
    ],
    "followUpQA": [
      {
        "q": "Trong trường hợp server dùng nén động chunked transfer nên header phản hồi KHÔNG có `Content-Length`, `download.py` có từ chối tải không?",
        "a": "Không! Ở `L124`, kiểm tra kích thước chỉ thực hiện `if expected_size > 0 and downloaded != expected_size`, nếu server không báo `Content-Length` thì vẫn tin tưởng hoàn tất EOF hợp lệ của `iter_content`."
      }
    ],
    "commonMistakes": [
      "Ghi stream trực tiếp thẳng vào `listings.csv.gz` -> lần sau chạy thấy file > 0 byte nên tưởng đã tải xong và skip mất nửa file còn thiếu!"
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vs-056",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi nhận một snapshot mà cả cột `availability_30`, `availability_90`, `availability_365` đều là chuỗi có ký tự lạ `\"N/A\"`.",
    "question": "Tình huống: Nếu một dòng dữ liệu thô chứa chuỗi `\"N/A\"` trong cột `availability_30` và `availability_90 = 20`, quy trình QA xử lý hai cột này như thế nào ở `src/qa.py`?",
    "quickAnswer": "`pd.to_numeric(..., errors=\"coerce\")` biến `\"N/A\"` thành `NaN`. Khi kiểm tra tại `L219`: `valid_a30` trở thành `False` -> `inv_avail_mask = True` -> cờ `qa_invalid_availability = True` và cả 3 cột `availability_{30,90,365}_clean` của dòng đó bị đặt thành `<NA>` (giữ an toàn đồng bộ, không tính Occupancy lệch).",
    "explanation": "Tính nhất quán trên bộ 3 cửa sổ lịch (30/90/365) ngăn trạng thái nửa hợp lệ nửa khuyết.",
    "projectLink": "src/qa.py:L213-L236.",
    "codeLocation": "src/qa.py:L213-L236.",
    "proofExample": "Đối chiếu trực tiếp tại `src/qa.py:L213-L236.`.",
    "followUpQuestions": [
      "Ở CDMX thực tế, tổng số dòng vi phạm quy tắc `Availability` ở cả 4 mốc là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Ở CDMX thực tế, tổng số dòng vi phạm quy tắc `Availability` ở cả 4 mốc là bao nhiêu?",
        "a": "Chính xác `0` dòng ở cả 4 mốc (`100.0%` hợp lệ)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `availability_90_clean` vẫn giữ giá trị `20` khi `availability_30` bị lỗi."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-057",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Tình huống một listing có `price_mxn = 500`, `accommodates = 0` (hoặc `None`) sau QA.",
    "question": "Tình huống: Một listing đăng tin giá hợp lệ `500 MXN` nhưng `accommodates = 0`. Hai bảng giá/PPG (`valid_price_count` vs `valid_ppg_count`) ở `kpi_by_snapshot.csv` sẽ ghi nhận listing này thế nào?",
    "quickAnswer": "Listing vẫn **được tính** trong `valid_price_count` và `Median Price` (vì bản thân giá 500 MXN hợp lệ, `~qa_missing_price`), nhưng **bị loại** khỏi `valid_ppg_count` và `Median PPG` (vì `accommodates_clean` là `<NA>` nên không chia được PPG)! Đây chính xác là lý do hai cột `valid_price_count` và `valid_ppg_count` được tách riêng trong `kpi_by_snapshot.csv`.",
    "explanation": "Tách riêng mặt nạ hợp lệ theo từng KPI cụ thể tránh tình trạng mất cả dữ liệu Giá chỉ vì cột Sức chứa bị khuyết.",
    "projectLink": "src/qa.py:L186-L192; src/kpi.py:L108-L116",
    "codeLocation": "src/qa.py:L186-L192; src/kpi.py:L108-L116",
    "proofExample": "Tại CDMX `t1..t4`, cả 1.000 căn có `accommodates >= 1` nên `valid_price_count == valid_ppg_count` (`960, 0, 988, 980`), nhưng nếu chạy sang thành phố khuyết `accommodates`, 2 con số đếm này sẽ khác nhau ngay.",
    "followUpQuestions": [
      "Ngược lại nếu một căn có `accommodates = 4` nhưng `price = NaN`, hai biến đếm này nhận trạng thái gì?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại nếu một căn có `accommodates = 4` nhưng `price = NaN`, hai biến đếm này nhận trạng thái gì?",
        "a": "Không tính vào cả `valid_price_count` lẫn `valid_ppg_count`."
      }
    ],
    "commonMistakes": [
      "Tưởng hễ thiếu `accommodates` thì `price_mxn` cũng bị xóa về `NaN` luôn."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-058",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Code Trace"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi chạy `compute_kpi_by_listing()` trên tập chỉ có 1 snapshot trong YAML.",
    "question": "Tình huống: Nếu sửa `configs/mexico-city.yaml` chỉ để lại đúng 1 snapshot `snapshots: [\"2026-06-15\"]` để chạy kiểm tra nhanh một kỳ đơn, chuyện gì xảy ra trong `compute_review_velocities()`, `compute_ghost_listings()`, `kpi_by_snapshot` và `plot_ppg_snapshots()`?",
    "quickAnswer": "1) `compute_review_velocities()`: vòng lặp `range(1, len(snapshots))` chạy 0 lần -> không có cột `review_velocity_q*`;\n2) `compute_ghost_listings()`: chỉ tính `ghost_t1` dựa trên `(a365==0) & (nr==0 | days>90)`;\n3) `kpi_by_snapshot`: xuất bảng 1 dòng hợp lệ;\n4) `plot_ppg_snapshots()`: `nrows = max(1, ceil(1/2)) = 1`, `np.atleast_1d(axes).ravel()` vẽ 1 khung và ẩn khung thứ 2 bằng `ax.axis(\"off\")` — pipeline CHẠY MƯỢT KHÔNG LỖI!",
    "explanation": "Độ linh hoạt biên `N = 1` snapshot chứng tỏ code được thiết kế tổng quát theo danh sách động.",
    "projectLink": "src/kpi.py:L125-L170, src/viz.py:L155-L180.",
    "codeLocation": "src/kpi.py:L125-L170, src/viz.py:L155-L180.",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L125-L170, src/viz.py:L155-L180.`.",
    "followUpQuestions": [
      "Trong trường hợp chỉ chạy 1 snapshot trên máy mới, bảng `kpi_by_snapshot.csv` có cột `review_velocity_mean` bằng giá trị gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong trường hợp chỉ chạy 1 snapshot trên máy mới, bảng `kpi_by_snapshot.csv` có cột `review_velocity_mean` bằng giá trị gì?",
        "a": "Bằng `np.nan` ở dòng duy nhất `t1` (cùng `review_velocity_n = <NA>`), giống hệt dòng `t1` trong bản chạy đủ 4 snapshot."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `plt.subplots(1, 2)` sẽ làm hỏng vòng lặp `axes` hoặc `range(1, 1)` báo lỗi."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-059",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "Evaluation",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi chấm chéo `evaluate.py` nếu `ground_truth.csv` bị thiếu 2 ID so với `reviews_llm.csv`.",
    "question": "Tình huống: Nếu một file `ground_truth.csv` mới chỉ có 98/100 ID khớp với `reviews_sentiment.csv` (2 ID bị lệch/không xuất hiện trong dự đoán LLM), hàm đánh giá xử lý mẫu số và `ty_le_phu` (`coverage`) thế nào?",
    "quickAnswer": "`evaluate.py` đối chiếu trên tập giao và tính rõ `ty_le_phu = so_khop / len(gt)` (`0.98`), đồng thời chỉ chấm `Accuracy/F1` trên các mẫu ghép cặp hợp lệ thay vì lặng lẽ chấm `NaN` hay gãy `merge`. Với Baseline cũng áp dụng chuẩn `coverage` y hệt để bảo đảm so sánh công bằng.",
    "explanation": "Chấm điểm trung thực bắt buộc công khai `coverage` cạnh `F1`: không thể lấy 100% Accuracy bằng cách chỉ xuất dự đoán cho 10 câu dễ rồi từ chối trả lời 90 câu khó!",
    "projectLink": "src/evaluate.py:L80-L135; reports/evaluation_report.csv",
    "codeLocation": "src/evaluate.py:L80-L135; reports/evaluation_report.csv",
    "proofExample": "Trong báo cáo `evaluation_report.csv` của Nhóm 4: `ty_le_phu = 1.000` (đạt tuyệt đối 100/100 mẫu cho cả LLM và Baseline).",
    "followUpQuestions": [
      "Ở CDMX thực tế, `cam_xuc_weighted_f1` và `cam_xuc_macro_f1` của LLM chênh nhau ít hay nhiều và vì sao?"
    ],
    "followUpQA": [
      {
        "q": "Ở CDMX thực tế, `cam_xuc_weighted_f1` và `cam_xuc_macro_f1` của LLM chênh nhau ít hay nhiều và vì sao?",
        "a": "Chênh rất nhỏ (`0.9901` vs `0.9909`) vì cả 3 lớp (`positive`, `mixed`, `negative`) của LLM đều đạt F1 gần 1.0 (chỉ sai 1 mẫu), trong khi Baseline bị tụt cực sâu ở `Macro F1` (`0.5224` vs Weighted `0.8300`)!"
      }
    ],
    "commonMistakes": [
      "Bỏ qua `ty_le_phu` (coverage) khi so sánh hai mô hình khác nhau."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vs-060",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Giải thích tại sao Baseline Regex có `cam_xuc_weighted_f1 = 0.8300` nhưng `cam_xuc_macro_f1 = 0.5224`.",
    "question": "Tình huống: Khi thuyết minh bảng `llm_vs_baseline.png`, giảng viên chỉ vào hai cột `cam_xuc_weighted_f1 = 0.830` và `cam_xuc_macro_f1 = 0.522` của Baseline Regex và hỏi: *\"Tại sao cùng là F1 của một mô hình trên cùng 100 mẫu mà hai con số chênh nhau tới 0.308?\"*",
    "quickAnswer": "Vì tập `ground_truth.csv` (100 mẫu) mất cân bằng lớp rất mạnh: **73 `positive`**, **25 `mixed`**, chỉ **2 `negative`**. `Weighted F1` nhân trọng số theo tỷ lệ số mẫu (`0.73 * F1_pos + 0.25 * F1_mix + 0.02 * F1_neg`), nên điểm cao `~0.91` ở lớp đa số `positive` đã kéo điểm tổng lên `0.8300`. Ngược lại, `Macro F1` chia đều trọng số `1/3` cho mỗi lớp (`(F1_pos + F1_mix + F1_neg)/3`) — vì Baseline đoán kém ở `mixed` và `negative` (vốn chỉ có 2 mẫu nên lệch 1–2 câu làm F1 lớp tụt thê thảm), điểm trung bình bị kéo tụt ngay về `0.5224`!",
    "explanation": "Đây là câu hỏi chuẩn Bài 11 giúp phân biệt sinh viên hiểu toán học các biến thể F1 với sinh viên đọc vẹt bảng điểm.",
    "projectLink": "src/evaluate.py:L110-L125; reports/evaluation_report.csv",
    "codeLocation": "src/evaluate.py:L110-L125; reports/evaluation_report.csv",
    "proofExample": "Số chính xác trong `evaluation_report.csv`: Baseline Weighted F1 `0.8300`, Macro F1 `0.5224`; LLM Weighted F1 `0.9901`, Macro F1 `0.9909`.",
    "followUpQuestions": [
      "Còn cho bài toán **7 khía cạnh (`nhan_khia_canh`)**, Baseline đạt `Accuracy = 0.8200` nhưng `Macro F1` tụt xuống bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Còn cho bài toán **7 khía cạnh (`nhan_khia_canh`)**, Baseline đạt `Accuracy = 0.8200` nhưng `Macro F1` tụt xuống bao nhiêu?",
        "a": "Tụt xuống còn **`0.4648`** so với **`0.9138`** của LLM (`llm_vs_baseline.png`)!"
      }
    ],
    "commonMistakes": [
      "Cho rằng Macro F1 luôn nhỏ hơn Weighted F1 ở mọi tập dữ liệu (chỉ xảy ra khi lớp thiểu số đoán kém hơn lớp đa số!)."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vs-061",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống câu review tiếng Việt hoặc ký tự có dấu khi chạy qua `clean_text()` (`NFKC`).",
    "question": "Tình huống: Trong `src/baseline.py:L64`, dòng `unicodedata.normalize(\"NFKC\", text)` có tác dụng gì khi gặp review chứa dấu thanh tổ hợp (NFD), chữ toàn chiều rộng (fullwidth) hay số mũ kiểu Unicode trước khi chạy Regex?",
    "quickAnswer": "`NFKC` gộp các ký tự tổ hợp tách rời (như chữ `e` + dấu sắc tách biệt thành một mã `é` thống nhất) và đưa ký tự đặc biệt fullwidth về ASCII tiêu chuẩn. Nhờ đó từ khóa tiếng Tây Ban Nha có dấu (`ubicación`, `ruido`, `habitación`) trong `ASPECT_PATTERNS` không bị trượt chỉ vì bộ gõ khác chuẩn Unicode (macOS hay xuất NFD còn Windows xuất NFC).",
    "explanation": "Chuẩn hóa Unicode trước khi áp dụng biểu thức chính quy đa ngôn ngữ là bước tối quan trọng tránh lỗi khó tìm.",
    "projectLink": "src/baseline.py:L64.",
    "codeLocation": "src/baseline.py:L64.",
    "proofExample": "Đối chiếu trực tiếp tại `src/baseline.py:L64.`.",
    "followUpQuestions": [
      "Sau `NFKC`, bước tiếp theo trong `clean_text()` làm sạch ba loại thành phần nhiễu nào?"
    ],
    "followUpQA": [
      {
        "q": "Sau `NFKC`, bước tiếp theo trong `clean_text()` làm sạch ba loại thành phần nhiễu nào?",
        "a": "(1) Giải mã ký tự HTML (`html.unescape`); (2) Đổi `<br/>` thành `\\n` trước khi xóa mọi thẻ HTML khác; (3) Xóa link URL (`https?://...`)."
      }
    ],
    "commonMistakes": [
      "Cho rằng `NFKC` biến mất hết dấu tiếng Tây Ban Nha thành chữ không dấu (hàm đổi sang dạng tương thích chuẩn có dấu NFC/NFKC chứ không bỏ dấu)."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vs-062",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "scenario",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Trình bày báo cáo cho Stakeholder SECTUR CDMX: Sắp xếp thứ tự nói trong 3 phút.",
    "question": "Tình huống: Giả sử Giám đốc Sở Du lịch SECTUR CDMX chỉ cho 3 phút nghe kết quả dự án Inside Airbnb (4 mốc đến World Cup 2026). Bạn sắp xếp mạch trình bày thế nào cho đúng chuẩn **Explanatory Storytelling** (Bài 14)?",
    "quickAnswer": "Tuyệt đối KHÔNG kể theo trình tự code (\"bước 1 tụi em tải 12 file...\"). Trình bày theo **Kim tự tháp Kết luận trước**:\n1) **Thông điệp chính (30s):** Mặt bằng giá niêm yết trên mẫu cố định 1.000 căn tăng **+67.3% Price / +64.1% PPG** từ Q3/2025 tới tuần khai mạc World Cup 06/2026, lan tỏa toàn 8/8 khu vực;\n2) **3 Bằng chứng cốt lõi (90s):** Bản đồ Median PPG xác định vùng lõi đắt nhất là Miguel Hidalgo & Cuauhtémoc (không phải Xochimilco bị Mean bóp méo); Lịch đặt phòng sát ngày (Occ30) đạt đỉnh ở **Semana Santa t3 (48.5%)** thay vì t4 (44.5%) và khu tăng giá quá nóng A03 rớt công suất thấp nhất; Phàn nàn thật bị ẩn trong lớp **Mixed** tăng từ 1.9% lên **14.8% Tiện nghi** tại Cuauhtémoc;\n3) **Khuyến nghị & 3 Giới hạn minh bạch (60s):** Kiểm soát giá lan sang vùng vệ tinh Coyoacán/Tlalpan, thanh tra tiêu chuẩn tiện nghi/tiếng ồn vùng lõi, và lưu ý đây là giá chào trên mẫu 1.000 căn (khuyết `t2`).",
    "explanation": "Chứng minh tư duy chuyển đổi mượt mà từ Exploratory (code/notebook) sang Explanatory (ra quyết định cho stakeholder).",
    "projectLink": "reports/report.pdf; Bài 14",
    "codeLocation": "reports/report.pdf; Bài 14",
    "proofExample": "Mạch này khớp hoàn toàn Chương 1 & Chương 4–6 của `reports/report.pdf`.",
    "followUpQuestions": [
      "Trong 30 giây mở đầu đó, một từ khóa nào bạn phải chủ động dùng để tránh bị bắt lỗi nhân quả?"
    ],
    "followUpQA": [
      {
        "q": "Trong 30 giây mở đầu đó, một từ khóa nào bạn phải chủ động dùng để tránh bị bắt lỗi nhân quả?",
        "a": "Dùng từ **\"tăng đồng thời đến thời điểm World Cup / trên mẫu cố định / giá niêm yết\"**, tuyệt đối không nói \"World Cup đã chứng minh gây tăng giá 67.3%\"."
      }
    ],
    "commonMistakes": [
      "Mở đầu bằng việc giải thích `requests.get`, `chunksize=100_000` và `Pydantic` trong khi giám đốc Sở Du lịch đang hỏi về giá phòng và tiếng ồn du khách!"
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vs-063",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "Python",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi môi trường chạy trên Python 3.10 thay vì Python 3.14.7 trong `.python-version`.",
    "question": "Tình huống: Nếu một máy kiểm tra cài Python 3.10 chạy pipeline viết trên chuẩn Python 3.14, cú pháp nào (như `str.removeprefix` hay `list[str]` type hints `X | Y`) có nguy cơ gây lỗi hoặc chạy khác?",
    "quickAnswer": "`list[str]` và union `str | None` (PEP 604) chạy từ Python 3.10+, `removeprefix` chạy từ 3.9+, nhưng khác biệt nằm ở thư viện trong `requirements.txt` (pandas 2.x/3.x, google-genai SDK, matplotlib). Do đó `.python-version` (`3.14.7`) + `requirements.txt` giúp tái tạo chính xác nhất hành vi thư viện tại tag `final`.",
    "explanation": "Ý nghĩa thực chất của việc ghim phiên bản môi trường ở Bài 1.",
    "projectLink": "run_pipeline.py; src/evaluate.py:L212",
    "codeLocation": "run_pipeline.py; src/evaluate.py:L212",
    "proofExample": "Đối chiếu trực tiếp tại `run_pipeline.py; src/evaluate.py:L212`.",
    "followUpQuestions": [
      "Nếu chạy bằng Python 3.8 thì cú pháp `str | None` ở khai báo type hint của `src/*.py` gây lỗi gì ngay lúc `import`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu chạy bằng Python 3.8 thì cú pháp `str | None` ở khai báo type hint của `src/*.py` gây lỗi gì ngay lúc `import`?",
        "a": "`TypeError: unsupported operand type(s) for |: 'type' and 'NoneType'` (vì union `|` mới có từ Python 3.10, trừ khi có `from __future__ import annotations`)."
      }
    ],
    "commonMistakes": [
      "Tưởng `.python-version` chỉ là file ghi chú trang trí không liên quan tái lập môi trường."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vs-064",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi `df.loc[mask]` được sửa sau bước kiểm QA nếu quên `.copy()`.",
    "question": "Tình huống: Trong `src/qa.py:L76`: `if num_dups > 0: df = df.loc[~dup_mask].copy()`. Nếu bỏ `.copy()`, bước `df[price_col] = ...` ngay sau đó có thể gặp lỗi hoặc cảnh báo gì?",
    "quickAnswer": "Không có `.copy()`, `df` là slice/view từ bảng trước -> trên pandas 2.x phát ra `SettingWithCopyWarning` rất khó chịu, còn trên pandas 3.0 Copy-on-Write sẽ xử lý sao chép trễ ở cột được ghi. Thêm `.copy()` làm rõ quyền sở hữu DataFrame độc lập ở mọi phiên bản.",
    "explanation": "Thực hành coding chuẩn sạch tại tầng QA.",
    "projectLink": "src/qa.py:L76",
    "codeLocation": "src/qa.py:L76",
    "proofExample": "Đối chiếu trực tiếp tại `src/qa.py:L76`.",
    "followUpQuestions": [
      "Tại `L76`, tại sao có `if num_dups > 0:` bọc ngoài lệnh lọc `df = df.loc[~dup_mask].copy()`?"
    ],
    "followUpQA": [
      {
        "q": "Tại `L76`, tại sao có `if num_dups > 0:` bọc ngoài lệnh lọc `df = df.loc[~dup_mask].copy()`?",
        "a": "Để nếu `num_dups == 0` (như cả 4 snapshot ở CDMX), không tốn CPU/RAM tạo lại nguyên bảng `df` làm gì!"
      }
    ],
    "commonMistakes": [
      "Nghĩ `.loc[~dup_mask]` luôn luôn trả về bản sao hoàn toàn độc lập không cần `.copy()`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-065",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "scenario",
    "topics": [
      "Regex",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý chuỗi giá dị biệt như `\"$1,250.00 MXN\"` hoặc `\"$1-250.00\"` đi qua `r\"[^\\d.-]\"`.",
    "question": "Tình huống: Giả sử dữ liệu thô lẫn chuỗi rác `\"1-250.00\"` (gạch ngang giữa số) hoặc `\"USD 1,250.00\"` đi qua `price_raw.str.replace(r\"[^\\d.-]\", \"\", regex=True)`. Kết quả `price_numeric` và `qa_price_parse_error` nhận giá trị gì?",
    "quickAnswer": "`\"USD 1,250.00\"` bỏ chữ & dấu phẩy thành `\"1250.00\"` -> `1250.0` (đây mới là bẫy nếu lẫn nhiều đơn vị tiền tệ khác nhau cùng cột!). Còn `\"1-250.00\"` giữ lại dấu `-` ở giữa -> `pd.to_numeric(\"1-250.00\", errors=\"coerce\")` ra `NaN` -> vì chuỗi gốc không rỗng mà parse thành `NaN`, cờ `qa_price_parse_error` bắt chính xác thành `True`!",
    "explanation": "Phân biệt sắc bén ưu/nhược điểm cụ thể của Regex `r\"[^\\d.-]\"` trong `src/qa.py`.",
    "projectLink": "src/qa.py:L93-L99",
    "codeLocation": "src/qa.py:L93-L99",
    "proofExample": "Đối chiếu trực tiếp tại `src/qa.py:L93-L99`.",
    "followUpQuestions": [
      "Inside Airbnb công bố cột `price` của Mexico City bằng đơn vị tiền tệ nào?"
    ],
    "followUpQA": [
      {
        "q": "Inside Airbnb công bố cột `price` của Mexico City bằng đơn vị tiền tệ nào?",
        "a": "Bằng **MXN (Mexican Peso)** bản địa, nên biểu thức xử lý trên bộ CDMX hoàn toàn chính xác."
      }
    ],
    "commonMistakes": [
      "Tưởng `r\"[^\\d.-]\"` tự phát hiện được tiền tệ USD vs MXN nếu chuỗi ghi `\"USD 1,250\"` (nó xóa luôn chữ `USD` và giữ số 1250 -> gán nhầm thành 1250 MXN!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-066",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "scenario",
    "topics": [
      "Datetime",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi khoảng cách giữa hai snapshot chỉ còn `0` ngày do lỗi cấu hình trùng ngày.",
    "question": "Tình huống: Giả sử người dùng sửa nhầm ngày `t2` trùng với `t1` (`\"2025-09-27\"`) nên `(snap_curr - snap_prev).days == 0`. Dòng code nào trong `src/kpi.py` ngăn phép chia cho `0` trong `Review Velocity`?",
    "quickAnswer": "`delta_months = max((snap_curr_dt - snap_prev_dt).days, 1) / 30.0` tại `src/kpi.py:L125`! Hàm `max(..., 1)` ép mẫu số ngày tối thiểu bằng `1` (`delta_months >= 1/30`), giúp chương trình không sập vì `ZeroDivisionError` dù cấu hình trùng ngày.",
    "explanation": "Lập trình phòng thủ tại phép chia thời gian.",
    "projectLink": "src/kpi.py:L125-L132",
    "codeLocation": "src/kpi.py:L125-L132",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L125-L132`.",
    "followUpQuestions": [
      "Trong trường hợp bình thường từ `t1` (`2025-09-27`) đến `t2` (`2025-12-29`), `delta_days` và `delta_months` lần lượt là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Trong trường hợp bình thường từ `t1` (`2025-09-27`) đến `t2` (`2025-12-29`), `delta_days` và `delta_months` lần lượt là bao nhiêu?",
        "a": "`93` ngày (`93 / 30.0 = 3.1` tháng chuẩn 30 ngày)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng hiệu 2 ngày trùng nhau sẽ bị trả `ZeroDivisionError` trong `compute_review_velocities()`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-067",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ảnh hưởng của `sort_values` khi làm việc với `compute_kpi_by_neighbourhood()` vs `kpi_by_area()`.",
    "question": "Tình huống: Trong `kpi_by_neighbourhood.csv`, các quận được sắp xếp theo tiêu chí nào; còn trong `kpi_by_area.csv` và `kpi_by_snapshot.csv`, thứ tự hàng được sắp xếp ra sao?",
    "quickAnswer": "`kpi_by_snapshot` theo thứ tự thời gian `t1 -> t2 -> t3 -> t4`; `kpi_by_area` theo mã khu vực `A01 -> A08`; còn `kpi_by_neighbourhood` sắp xếp theo cột `total_listings` giảm dần (hoặc `rank_price_t4`) giúp quận trọng tâm lớn nhất như `Cuauhtémoc (525)` nằm đầu bảng và `Milpa Alta (1)` nằm cuối.",
    "explanation": "Nắm rõ cấu trúc sắp xếp từng tệp CSV đầu ra để tra nhanh khi bảo vệ số liệu.",
    "projectLink": "src/kpi.py:L270-L435",
    "codeLocation": "src/kpi.py:L270-L435",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L270-L435`.",
    "followUpQuestions": [
      "Trên bản đồ Choropleth `kpi_ppg_neighbourhood.png`, nhãn số `#1` nằm ở quận nào?"
    ],
    "followUpQA": [
      {
        "q": "Trên bản đồ Choropleth `kpi_ppg_neighbourhood.png`, nhãn số `#1` nằm ở quận nào?",
        "a": "Khung Price Mean `#1` rơi vào `Xochimilco` (`3.848 MXN`, dù `n=5`); khi chuyển sang Median PPG (hàng dưới phải), `#1` là `Miguel Hidalgo` (`706 MXN/khách`)."
      }
    ],
    "commonMistakes": [
      "Nhầm thứ hạng `rank_price_t4` (xếp theo Mean hay Median Price `t4`) với thứ tự sắp xếp dòng CSV (theo số lượng listing)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-068",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Python"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi trong `reviews_llm.csv` có một review bình luận trống hoàn toàn hoặc chỉ có dấu chấm `\".\"`.",
    "question": "Tình huống: Nếu một review trong tập đầu vào `comments` chỉ chứa chuỗi `\".\"` hoặc rỗng `\"\"`, hai tầng xử lý (`src/llm.py` và `src/evaluate.py :: hau_kiem()`) xử lý thế nào?",
    "quickAnswer": "`src/llm.py` chuẩn hóa văn bản đầu vào (nếu gửi qua LLM vẫn tuân schema trả JSON); sau đó `src/evaluate.py :: hau_kiem()` ở Quy tắc 1 (`rong_nhung_co_nhan`) kiểm tra số lượng từ `so_tu == 0` — nếu LLM vẫn cố gán nhãn khía cạnh khác `not_mentioned` hay `overall != mixed` thì sẽ gắn cờ cảnh báo ảo giác ngay!",
    "explanation": "Phòng thủ đa tầng cho các bản ghi nhiễu biên văn bản rỗng.",
    "projectLink": "src/evaluate.py:L160-L170",
    "codeLocation": "src/evaluate.py:L160-L170",
    "proofExample": "Đối chiếu trực tiếp tại `src/evaluate.py:L160-L170`.",
    "followUpQuestions": [
      "Trên 1.000 review thật của Nhóm 4, có bao nhiêu review vi phạm quy tắc `rong_nhung_co_nhan`?"
    ],
    "followUpQA": [
      {
        "q": "Trên 1.000 review thật của Nhóm 4, có bao nhiêu review vi phạm quy tắc `rong_nhung_co_nhan`?",
        "a": "Chính xác **`0` vi phạm** (`llm_postcheck.csv`)."
      }
    ],
    "commonMistakes": [
      "Cho rằng `llm.py` lọc xóa mất các review rỗng khiến `reviews_sentiment.csv` chỉ còn dưới 1.000 dòng."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vs-069",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization",
      "Code Trace"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi trong `kpi_ppg_neighbourhood.png` một quận có `Polygon` và một quận có `MultiPolygon` trong file GeoJSON.",
    "question": "Tình huống: Trong `src/viz.py`, vì sao hàm vẽ bản đồ Choropleth phải kiểm tra kiểu hình học `\"Polygon\"` vs `\"MultiPolygon\"` của từng quận trong `neighbourhoods.geojson`?",
    "quickAnswer": "Trong chuẩn GeoJSON, một quận có địa giới tách thành nhiều mảnh (hoặc có đảo/vùng tách rời) mang kiểu `MultiPolygon` (danh sách của danh sách đa giác), còn quận liền khối là `Polygon`. Nếu code chỉ viết `Polygon(coords[0])` cho mọi quận sẽ bị crash `ValueError` ở những quận `MultiPolygon`! Ngoài ra khi đặt số thứ tự `#1..#15`, `_centroid()` chỉ lấy đa giác có diện tích lớn nhất để chữ luôn nằm ở phần lõi chính của quận.",
    "explanation": "Xử lý chuẩn cấu trúc GeoJSON thực tế không phụ thuộc thư viện nặng `geopandas`!",
    "projectLink": "src/viz.py:L55-L95, L240-L265 viết thuần bằng matplotlib.patches.Polygon + json.",
    "codeLocation": "src/viz.py:L55-L95, L240-L265 viết thuần bằng matplotlib.patches.Polygon + json.",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py:L55-L95, L240-L265 viết thuần bằng matplotlib.patches.Polygon + json.`.",
    "followUpQuestions": [
      "Khi không cài `geopandas`, lợi ích lớn nhất cho môi trường chấm bài (`requirements.txt`) là gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi không cài `geopandas`, lợi ích lớn nhất cho môi trường chấm bài (`requirements.txt`) là gì?",
        "a": "Tránh lỗi biên dịch thư viện C địa lý phức tạp (`GDAL/PROJ`) trên Windows/macOS, giúp `pip install -r requirements.txt` cài gọn trong vài giây."
      }
    ],
    "commonMistakes": [
      "Nghĩ Nhóm 4 phải cài `geopandas` và `shapely` mới đọc và vẽ được bản đồ 16 quận CDMX."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vs-070",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "scenario",
    "topics": [
      "Architecture",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi muốn thay đổi độ lớn mẫu LLM từ `1.000` lên `2.000` mà vẫn giữ cấu trúc pipeline.",
    "question": "Tình huống: Nếu mở rộng đánh dấu thêm 1.000 chữ `\"x\"` ở cột `\"Mẫu LLM\"` trên Google Sheet nâng tập LLM lên `2.000` review, quy trình chạy lại tối ưu để không tốn lại tiền cho 1.000 câu đầu là gì?",
    "quickAnswer": "Chạy lại lần lượt `python run_pipeline.py --config configs/mexico-city.yaml --from-step filter`: bước `filter` xuất `reviews_llm.csv` `2.000` dòng -> bước `llm` đọc `llm_cache.jsonl` nạp sẵn `1.000` câu đầu (`$0`), chỉ gửi API đúng `1.000` câu mới bổ sung và ghi nối vào cache -> chạy tiếp `baseline`, `evaluate`, `kpi`, `viz` tự động cập nhật!",
    "explanation": "Pipeline hỗ trợ tăng trưởng dữ liệu gia tăng (Incremental Execution) hoàn hảo nhờ JSONL cache.",
    "projectLink": "run_pipeline.py; src/filter_data_from_sheet.py; src/llm.py",
    "codeLocation": "run_pipeline.py; src/filter_data_from_sheet.py; src/llm.py",
    "proofExample": "Chỉ riêng bước `evaluate` vẫn chạy trên `ground_truth.csv` hiện hữu nếu chưa gán thêm nhãn tay mới.",
    "followUpQuestions": [
      "Tỷ lệ `1.000` review trong `llm_cache.jsonl` hiện chiếm bao nhiêu % tổng số 5.000 review được phân công?"
    ],
    "followUpQA": [
      {
        "q": "Tỷ lệ `1.000` review trong `llm_cache.jsonl` hiện chiếm bao nhiêu % tổng số 5.000 review được phân công?",
        "a": "Đúng `20.0%` (`1.000 / 5.000` reviews)."
      }
    ],
    "commonMistakes": [
      "Nghĩ tăng tập mẫu LLM bắt buộc phải viết lại code trong `src/llm.py` hoặc chạy lại từ đầu tất cả 2.000 câu."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vs-071",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Nếu `reviews_sentiment.csv` chứa giá trị thiếu ở 1 cột khía cạnh thì `COMPLAINT_SCORE_MAP` trong `src/kpi.py` xử lý thế nào?",
    "question": "Tình huống: Trong `src/kpi.py:L408-L415`, lệnh `rev_merged[col].astype(\"string\").str.strip().str.lower().map(COMPLAINT_SCORE_MAP).fillna(0.0)` gặp một ô bị `NaN` ở cột `amenities`. Ô đó trở thành `0.0` hay `np.nan`, và ưu/nhược điểm của lựa chọn `.fillna(0.0)` này là gì?",
    "quickAnswer": "Nó trở thành **`0.0`** (tính vào mẫu số chung `N_LLM(k)` của quận và không cộng vào tử số phàn nàn). Nhược điểm: nếu file `reviews_sentiment.csv` bị lỗi mất dữ liệu một cột khía cạnh nào đó thì `.fillna(0.0)` sẽ âm thầm kéo giảm tỷ lệ phàn nàn thay vì loại khỏi mẫu số hoặc báo lỗi! Tuy nhiên vì `src/evaluate.py :: hau_kiem()` kiểm tra toàn vẹn các nhãn trước đó và `llm.py` khóa chặt Pydantic schema, thực tế CDMX có `0` ô thiếu.",
    "explanation": "Phân tích sâu tác động của `.fillna(0.0)` đối với mẫu số thống kê.",
    "projectLink": "src/kpi.py:L415-L420",
    "codeLocation": "src/kpi.py:L415-L420",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L415-L420`.",
    "followUpQuestions": [
      "Trong `COMPLAINT_SCORE_MAP`, nhãn `\"not_mentioned\"` và `\"positive\"` ánh xạ thành số nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `COMPLAINT_SCORE_MAP`, nhãn `\"not_mentioned\"` và `\"positive\"` ánh xạ thành số nào?",
        "a": "Cả `\"not_mentioned\"`, `\"positive\"` và `\"mixed\"` đều bằng `0.0` trong `COMPLAINT_SCORE_MAP` (chỉ `\"negative\": 1.0`); sang `COMPLAINT_MIXED_SCORE_MAP` thì cả `\"negative\": 1.0` lẫn `\"mixed\": 1.0`."
      }
    ],
    "commonMistakes": [
      "Tưởng `.map(COMPLAINT_SCORE_MAP)` mặc định tự giữ nguyên `np.nan` ở `kpi.py` (dòng code có nối thêm `.fillna(0.0)`!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-072",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi cần chuyển đổi 1 cột phân loại nhiều giá trị lặp (`room_type`) sang `category` để giảm RAM.",
    "question": "Tình huống: Trên bảng lớn hàng triệu dòng có cột `room_type` chỉ lặp lại 4 chuỗi (`Entire home/apt`, `Private room`, `Shared room`, `Hotel room`). Chuyển sang `dtype=\"category\"` giúp ích gì nhưng gây cạm bẫy gì khi gán giá trị mới hoặc `groupby`?",
    "quickAnswer": "Chuyển `category` giảm dung lượng RAM của cột chuỗi lặp tới 80–90% và tăng tốc `groupby`. Tuy nhiên cạm bẫy là: (1) Không thể gán thẳng một nhãn mới chưa đăng ký bằng `.fillna(\"Other\")` (sẽ ném `TypeError: Cannot setitem on a Categorical with a new category`) nếu chưa gọi `.cat.add_categories([\"Other\"])`; (2) `groupby(..., observed=False)` sinh ra các dòng rỗng `count=0` cho category không xuất hiện trong lát cắt -> trong pandas mới luôn truyền `observed=True`!",
    "explanation": "Kỹ thuật tối ưu bộ nhớ nâng cao của Bài 4–5.",
    "projectLink": "Bài 4 & Bài 5",
    "codeLocation": "Bài 4 & Bài 5",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 4 & Bài 5`.",
    "followUpQuestions": [
      "Trong pandas hiện đại, nếu `observed=False` đang được deprecation warning thì `observed=True` làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas hiện đại, nếu `observed=False` đang được deprecation warning thì `observed=True` làm gì?",
        "a": "Chỉ hiển thị các nhóm thực sự tồn tại dữ liệu trong bảng đang xét, giống hành vi tự nhiên của `groupby` cột chuỗi thường."
      }
    ],
    "commonMistakes": [
      "Gọi `.fillna(\"Unknown\")` thẳng lên cột `category` rồi bất ngờ khi crash `TypeError`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vs-073",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "scenario",
    "topics": [
      "Regex",
      "Baseline"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Vì sao mẫu Regex `r\"\\bnot\\b\"` trượt khi gặp từ viết tắt dính dấu nháy đơn `\"isn't\"` hoặc `\"don't\"`?",
    "question": "Tình huống: Trong tiếng Anh đời thường, khách viết `\"Room isn't clean\"`. Nếu viết Regex tìm chữ `\"not\"` bằng `r\"\\bnot\\b\"`, nó có khớp `\"isn't\"` không và `src/baseline.py` giải quyết phủ định dạng `\"isn't\"` bằng cách nào?",
    "quickAnswer": "`r\"\\bnot\\b\"` **KHÔNG khớp** `\"isn't\"` hay `\"don't\"` vì thiếu chữ `o`! Trong `src/baseline.py`, hàm phủ định `NEG_RE` liệt kê tường minh các biến thể rút gọn `n['’]t\\s+...` (như `isn't\\s+clean`, `wasn't\\s+quiet`) bên cạnh `not|no|never` để bắt trọn câu phủ định thực tế!",
    "explanation": "Chứng minh hiểu sâu cách xây dựng tập từ điển Regex trong `src/baseline.py:L25-L42`.",
    "projectLink": "src/baseline.py:L25-L42",
    "codeLocation": "src/baseline.py:L25-L42",
    "proofExample": "Đối chiếu trực tiếp tại `src/baseline.py:L25-L42`.",
    "followUpQuestions": [
      "Trong `src/baseline.py`, tại sao lại đặt nhóm `n['’]t` nhận cả hai loại dấu nháy thẳng `'` lẫn nháy cong `’`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/baseline.py`, tại sao lại đặt nhóm `n['’]t` nhận cả hai loại dấu nháy thẳng `'` lẫn nháy cong `’`?",
        "a": "Vì bàn phím iOS/macOS khi khách đánh review thường tự động đổi dấu nháy thẳng thành nháy cong typographic `’` — nếu chỉ viết `n't` sẽ bỏ sót review viết từ iPhone!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `r\"\\bnot\\b\"` bắt được mọi sắc thái phủ định tiếng Anh."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vs-074",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Chiến lược bảo toàn dữ liệu khi chạy `download.py` lúc đường truyền quốc tế bị chập chờn gói tin nhỏ.",
    "question": "Tình huống: Vì sao `download_file()` dùng `resp.iter_content(chunk_size=65536)` (64 KB) thay vì đọc từng byte hoặc nạp toàn bộ `resp.content` vào RAM?",
    "quickAnswer": "Nạp cả `resp.content` sẽ nhồi toàn bộ file vài trăm MB vào RAM cùng lúc trước khi lưu; ngược lại đọc chunk quá nhỏ (1 byte/64 byte) làm chậm syscall đĩa. `64 KB` là điểm cân bằng chuẩn hiệu năng mạng và RAM (~64 KB RAM cho bất kỳ kích thước file nào!).",
    "explanation": "Thực hành I/O stream chuẩn trong Python.",
    "projectLink": "src/download.py:L118",
    "codeLocation": "src/download.py:L118",
    "proofExample": "Đối chiếu trực tiếp tại `src/download.py:L118`.",
    "followUpQuestions": [
      "Nếu quên đóng response (`with requests.get(...) as resp:`), nguy cơ gì xảy ra khi tải hàng chục file liên tiếp?"
    ],
    "followUpQA": [
      {
        "q": "Nếu quên đóng response (`with requests.get(...) as resp:`), nguy cơ gì xảy ra khi tải hàng chục file liên tiếp?",
        "a": "Rò rỉ kết nối TCP socket mở trong connection pool cho tới khi hết giới hạn file descriptor của hệ điều hành."
      }
    ],
    "commonMistakes": [
      "Nghĩ `stream=True` tự chia luồng đọc mà không cần vòng lặp `resp.iter_content()`."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vs-075",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "Evaluation",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi tập `ground_truth.csv` bị mất cân bằng nặng (chỉ 2 mẫu `negative`) — đánh giá độ tin cậy của con số F1 lớp `negative`.",
    "question": "Tình huống: Trong 100 mẫu của `ground_truth.csv`, lớp `negative` chỉ có đúng **2 mẫu** (`73 positive, 25 mixed, 2 negative`). Nếu mô hình đoán nhầm chỉ 1 trong 2 mẫu đó, F1 lớp `negative` thay đổi thế nào và nhóm nên bổ sung gì nếu muốn kiểm định sâu hơn?",
    "quickAnswer": "Với `n_neg = 2`, chỉ 1 mẫu lệch làm Recall lớp `negative` rơi từ `1.00` thẳng xuống `0.50` -> khoảng tin cậy thống kê rất rộng! Do đó trên 100 mẫu hiện tại, **LLM đạt chuẩn nhờ đúng cả 2/2 mẫu `negative` lẫn hầu hết `mixed`**, nhưng ở hướng mở rộng nên lấy mẫu phân tầng có chủ đích (stratified sampling) bổ sung thêm nhiều review 1–2 sao để đánh giá lớp `negative` với cỡ mẫu `>= 30`!",
    "explanation": "Nhìn thấu hạn chế cỡ mẫu thiểu số trong tập nhãn tay `ground_truth.csv` thay vì chỉ khoe mỗi `Macro F1 = 0.9909`.",
    "projectLink": "data/samples/ground_truth.csv; reports/evaluation_report.csv",
    "codeLocation": "data/samples/ground_truth.csv; reports/evaluation_report.csv",
    "proofExample": "Đối chiếu trực tiếp tại `data/samples/ground_truth.csv; reports/evaluation_report.csv`.",
    "followUpQuestions": [
      "Với Baseline Regex, tại sao `cam_xuc_macro_f1` chỉ đạt `0.5224` trên 100 mẫu này?"
    ],
    "followUpQA": [
      {
        "q": "Với Baseline Regex, tại sao `cam_xuc_macro_f1` chỉ đạt `0.5224` trên 100 mẫu này?",
        "a": "Chính vì dự đoán sai nặng trên 25 mẫu `mixed` và 2 mẫu `negative` làm trung bình F1 ba lớp bị kéo xuống sâu!"
      }
    ],
    "commonMistakes": [
      "Tưởng `ground_truth.csv` có ~33 positive, ~33 mixed, ~33 negative cân bằng đều nhau."
    ],
    "relatedFiles": [
      "data/samples/ground_truth.csv"
    ]
  },
  {
    "id": "vs-076",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Kiểm chứng tính hợp lý khi `Ghost Rate` tại `t3` đúng bằng `0.0%` (`0/1.000`).",
    "question": "Tình huống: Làm sao kiểm chứng con số `ghost_count = 0` (`0.0%`) tại mốc `t3` (Semana Santa 2026-03-30) trong `kpi_by_snapshot.csv` là đúng quy tắc chứ không phải do code quên chạy `t3`?",
    "quickAnswer": "Kiểm chứng 2 lớp: (1) `ghost_n = 1.000` (tức toàn bộ 1.000 căn đều có dữ liệu hợp lệ được kiểm tra — không phải 0 căn kiểm!); (2) Lý giải thực tế: `t3` trùng dịp lễ lớn Semana Santa, đồng thời để bị gắn `ghost_t3 = 1`, một căn phải thỏa ĐỒNG THỜI `availability_365 == 0` VÀ `RV_q2 == 0` — thực tế mọi căn còn trong mẫu lúc đó nếu khóa năm đều từng phát sinh ít nhất 1 review mới ở `Q2` hoặc vẫn mở ít nhất 1 ngày lịch!",
    "explanation": "Kỹ thuật tự kiểm toán số liệu `0` bằng việc kiểm tra mẫu số (`ghost_n = 1.000`).",
    "projectLink": "data/processed/kpi_by_snapshot.csv; src/kpi.py:L170-L184",
    "codeLocation": "data/processed/kpi_by_snapshot.csv; src/kpi.py:L170-L184",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_snapshot.csv; src/kpi.py:L170-L184`.",
    "followUpQuestions": [
      "Tại 4 mốc `t1..t4`, có căn hộ nào bị gắn `ghost = 1` xuyên suốt cả 4 mốc không?"
    ],
    "followUpQA": [
      {
        "q": "Tại 4 mốc `t1..t4`, có căn hộ nào bị gắn `ghost = 1` xuyên suốt cả 4 mốc không?",
        "a": "KHÔNG! Truy vết `ghost_t1..ghost_t4` trong `kpi_by_listing.csv` cho thấy không có căn nào đóng băng liên tiếp cả 4 mốc."
      }
    ],
    "commonMistakes": [
      "Nhầm lẫn giữa `ghost_count = 0` với việc mất dữ liệu tại `t3`."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_snapshot.csv"
    ]
  },
  {
    "id": "vs-077",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Code Trace"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Hành vi `Series.map()` vs `DataFrame.apply()` vs `Series.transform()` khi biến đổi cột trong pipeline.",
    "question": "Tình huống: Trong `src/kpi.py`, để ánh xạ 7 nhãn cảm xúc sang điểm số `0.0 / 1.0`, code dùng `.map(COMPLAINT_SCORE_MAP)`. Nếu thay `.map(dict)` bằng `.apply(lambda x: COMPLAINT_SCORE_MAP.get(x))` thì có khác kết quả không và chậm hơn thế nào?",
    "quickAnswer": "Kết quả toán học giống nhau nhưng `.map(dict)` thực thi nhanh hơn rõ rệt nhờ ánh xạ hash nội bộ của pandas cho từ điển; còn `.apply()` gọi hàm Python lambda từng phần tử (chậm hơn nhiều nếu bảng lớn!). Ngược lại, `groupby(...)[col].transform(\"median\")` luôn giữ nguyên độ dài & index bảng gốc (tiện để so từng căn với trung vị quận của chính nó), trong khi `.agg(\"median\")` thu gọn còn 1 dòng mỗi quận!",
    "explanation": "Phân biệt sắc nét bộ 4 công cụ `map / apply / agg / transform` của Bài 5.",
    "projectLink": "src/kpi.py:L415; Bài 5",
    "codeLocation": "src/kpi.py:L415; Bài 5",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L415; Bài 5`.",
    "followUpQuestions": [
      "Một bẫy kinh điển của `Series.map(dict)`: nếu một key xuất hiện trong Series KHÔNG nằm trong `dict`, `.map()` biến giá trị đó thành gì?"
    ],
    "followUpQA": [
      {
        "q": "Một bẫy kinh điển của `Series.map(dict)`: nếu một key xuất hiện trong Series KHÔNG nằm trong `dict`, `.map()` biến giá trị đó thành gì?",
        "a": "Thành **`NaN`** (`np.nan`)! Đó là lý do `kpi.py:L415` phải nối `.fillna(0.0)` ở phía sau để giữ giá trị mặc định `0.0`."
      }
    ],
    "commonMistakes": [
      "Viết `.map(dict)` trên một `DataFrame` 2D (chỉ `Series` hỗ trợ `.map(dict)`, còn `DataFrame.map()` mới trên pandas >=2.1 chỉ nhận hàm element-wise!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-078",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "scenario",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi kiểm tra hình vẽ bằng 5 tiêu chí (Bài 12) — tình huống phát hiện hình vi phạm ngầm.",
    "question": "Tình huống: Giả sử một thành viên trong khóa khác vẽ biểu đồ cột so sánh Median PPG giữa 4 snapshot `t1..t4` nhưng đặt trục tung bắt đầu từ `350 MXN` thay vì `0` để nhấn mạnh độ tăng giá. Theo Bài 12, lỗi sai này tác động thị giác thế nào?",
    "quickAnswer": "Từ `t1 = 382` lên `t4 = 627` thực tế tăng `+64.1%` (tỷ lệ cột `1.64x`). Nếu cắt trục tung từ `350 MXN`, chiều cao nhìn thấy của `t1` chỉ còn `32` đơn vị còn `t4` là `277` đơn vị -> mắt người bị đánh lừa rằng giá World Cup tăng **gấp `8.66` lần (`+766%`)** thay vì `+64.1%`! Biểu đồ cột bắt buộc phải bắt đầu trục giá trị từ `0`.",
    "explanation": "Thực hành kiểm tra tiêu chí #2 (Trục bắt đầu từ 0 cho biểu đồ cột) trong 5 điểm kiểm tra một hình.",
    "projectLink": "src/viz.py; Bài 12",
    "codeLocation": "src/viz.py; Bài 12",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py; Bài 12`.",
    "followUpQuestions": [
      "Biểu đồ dạng nào THÌ ĐƯỢC PHÉP không bắt đầu trục giá trị từ `0` miễn vẫn ghi rõ trục?"
    ],
    "followUpQA": [
      {
        "q": "Biểu đồ dạng nào THÌ ĐƯỢC PHÉP không bắt đầu trục giá trị từ `0` miễn vẫn ghi rõ trục?",
        "a": "Biểu đồ đường (Line chart), Scatter plot hoặc Boxplot khi muốn quan sát rõ biên độ biến động hoặc dải phân bố không gian giá trị."
      }
    ],
    "commonMistakes": [
      "Cho rằng cắt trục tung từ 350 chỉ giúp \"dễ thấy sự khác biệt hơn\" chứ không phải lỗi bóp méo biểu đồ cột."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vs-079",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "scenario",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "So sánh cách đọc chỉ số `Review Velocity`: vì sao `RV` giảm từ `2.55` (Q1) xuống `2.08` (Q3) dù `Occ_1-30` ở `t3, t4` vẫn ~45%?",
    "question": "Tình huống: Số liệu thực cho thấy `Review Velocity` giảm nhẹ từ `2.55` (`Q1`) xuống `2.14` (`Q2`) rồi `2.08` (`Q3`), trong khi `Occ_1-30` tăng lên `48.47%` (`t3`) rồi `44.53%` (`t4`). Hai chỉ số này có mâu thuẫn nhau không? Giải thích hợp lý!",
    "quickAnswer": "KHÔNG hề mâu thuẫn! Thứ nhất, `RV` là biến **quá khứ (lagging)** đo review tích lũy trong quý *đã qua* (trước mùa hè/World Cup, chịu ảnh hưởng mùa thu–đông/độ trễ khách ở dài ngày trả ít review hơn), còn `Occ_1-30` là biến **tương lai (forward-looking)** đo lịch đặt của *30 ngày sắp tới* (Semana Santa tại `t3`, World Cup tại `t4`)! Thứ hai, `Occ` gồm cả yếu tố chủ nhà tự khóa lịch định giá trước sự kiện lớn chứ không chỉ số lượng khách check-out viết review.",
    "explanation": "Phân biệt biến Quá khứ (Lagging indicator: Review Velocity) vs biến Tương lai (Forward-looking indicator: Availability/Occ).",
    "projectLink": "data/processed/kpi_by_snapshot.csv; figures/kpi_review_ghost.png",
    "codeLocation": "data/processed/kpi_by_snapshot.csv; figures/kpi_review_ghost.png",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_snapshot.csv; figures/kpi_review_ghost.png`.",
    "followUpQuestions": [
      "Nếu một khách thuê căn hộ suốt trọn 30 ngày dịp World Cup thay vì 10 lượt khách thuê ngắn 3 ngày, số review tạo ra thay đổi ra sao?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một khách thuê căn hộ suốt trọn 30 ngày dịp World Cup thay vì 10 lượt khách thuê ngắn 3 ngày, số review tạo ra thay đổi ra sao?",
        "a": "Chỉ tạo tối đa `1` review thay vì `10` review dù công suất lấp đầy phòng đều là `100%`! Đó là điểm yếu kinh điển của biến đại diện Review."
      }
    ],
    "commonMistakes": [
      "Cho rằng `RV` giảm nghĩa là `Occ_1-30` bắt buộc phải giảm theo ngay ở cùng mốc chụp, và kết luận dữ liệu bị lỗi!"
    ],
    "relatedFiles": [
      "data/processed/kpi_by_snapshot.csv"
    ]
  },
  {
    "id": "vs-080",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "QA",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống đọc `reviews.csv.gz` mà một dòng bình luận tự do chứa ký tự xuống dòng thật (`\\n`) bên trong dấu ngoặc kép CSV.",
    "question": "Tình huống: Khách hàng viết review nhiều đoạn văn có ký tự xuống dòng thật bên trong dấu ngoặc kép CSV. Nếu tự viết script đọc từng dòng bằng `for line in open()` hoặc dùng `split(\",\")` thay vì `pd.read_csv()`, lỗi gì xảy ra và tại sao `src/filter_data_from_sheet.py` an toàn?",
    "quickAnswer": "Đọc thủ công bằng `split(\"\\n\")` hay `for line in f:` sẽ cắt đôi một review 3 đoạn thành 3 dòng hỏng cấu trúc cột! `pd.read_csv()` (RFC 4180 CSV parser chuẩn) nhận biết dấu ngoặc kép `\"...\"` nên gộp trọn vẹn các dòng xuống dòng bên trong 1 ô vào đúng bản ghi; đồng thời bước `clean_text()` và xuất CSV tiếp theo tiếp tục bọc trích chuẩn xác.",
    "explanation": "Hiểu tầm quan trọng của parser chuẩn RFC 4180 đối với văn bản phi cấu trúc nằm trong CSV.",
    "projectLink": "src/filter_data_from_sheet.py:L131; src/baseline.py:L65",
    "codeLocation": "src/filter_data_from_sheet.py:L131; src/baseline.py:L65",
    "proofExample": "Đối chiếu trực tiếp tại `src/filter_data_from_sheet.py:L131; src/baseline.py:L65`.",
    "followUpQuestions": [
      "Trong `src/llm.py`, `llm_cache.jsonl` lưu mỗi bản ghi thành 1 dòng JSON — làm sao ký tự xuống dòng trong review không làm vỡ file JSONL?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, `llm_cache.jsonl` lưu mỗi bản ghi thành 1 dòng JSON — làm sao ký tự xuống dòng trong review không làm vỡ file JSONL?",
        "a": "Vì `json.dumps()` tự động escape ký tự xuống dòng thành chuỗi `\\n` trên 1 dòng duy nhất, đảm bảo 100% mỗi dòng của `.jsonl` là một đối tượng JSON hoàn chỉnh!"
      }
    ],
    "commonMistakes": [
      "Viết script chia chunk bằng `readlines()` theo số dòng thô thay vì `pd.read_csv(..., chunksize=...)`."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-081",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi biến môi trường `GEMINI_API_KEY` bị cấu hình sai hoặc hết hạn giữa lúc chạy.",
    "question": "Tình huống: Nếu khởi chạy `python src/llm.py --config configs/mexico-city.yaml` khi `llm_cache.jsonl` chưa đủ `1.000` câu mà biến môi trường `GEMINI_API_KEY` bị trống hoặc không hợp lệ, hành vi kỳ vọng của `src/llm.py` là gì?",
    "quickAnswer": "Nếu `GEMINI_API_KEY` thiếu hoàn toàn (trống), dòng `L431` phát hiện trước khi chạy bất kỳ vòng lặp nào và thoát ngay với `sys.exit(1)` báo hướng dẫn thiết lập key (trước đó nhớ: nếu cache đã đủ 100%, `pending_count == 0` vẫn thoát thành công `0`!). Nếu key sai/hết hạn, `call_llm_batch()` gặp lỗi xác thực từ SDK, lưu nguyên vẹn các câu đã có trong cache trước đó và dừng thông báo lỗi rõ ràng.",
    "explanation": "Kiểm tra đầu vào API Key chặt chẽ trước vòng lặp batch, không làm rác cache.",
    "projectLink": "src/llm.py:L405-L445",
    "codeLocation": "src/llm.py:L405-L445",
    "proofExample": "Đối chiếu trực tiếp tại `src/llm.py:L405-L445`.",
    "followUpQuestions": [
      "Chính sách bảo mật GitHub và đề bài quy định gì về tệp `.env` và `GEMINI_API_KEY`?"
    ],
    "followUpQA": [
      {
        "q": "Chính sách bảo mật GitHub và đề bài quy định gì về tệp `.env` và `GEMINI_API_KEY`?",
        "a": "Tuyệt đối đưa `.env` vào `.gitignore`, không commit API Key lên repository công khai."
      }
    ],
    "commonMistakes": [
      "Nghĩ có thể để API Key viết thẳng (hardcode) trong `configs/mexico-city.yaml` cho tiện chấm bài."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vs-082",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "Python",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Kiểm tra tính nhất quán khi viết thêm 1 metric đánh giá mới vào `src/evaluate.py` (vd: Precision/Recall từng lớp riêng lẻ).",
    "question": "Tình huống: Nếu giảng viên hỏi tại chỗ: *\"Trong 25 mẫu `mixed` của `ground_truth.csv`, làm sao bạn biết `Baseline Regex` bị trượt nhiều sang `positive` hay trượt sang `negative`?\"* — hàm nào của `sklearn.metrics` có thể chạy bổ sung tức thì trên `reviews_baseline.csv` và `ground_truth.csv`?",
    "quickAnswer": "Gọi `confusion_matrix(y_true, y_pred, labels=[\"positive\", \"mixed\", \"negative\"])` và `classification_report(...)` từ `sklearn.metrics` (cùng thư viện `evaluate.py` đang dùng)! Qua ma trận nhầm lẫn sẽ thấy rõ các ca `mixed` bị Baseline rơi vào cột `positive` (False Positive cho lớp positive) vì bỏ sót mệnh đề chê nhỏ hoặc cụm từ tiếng Tây Ban Nha.",
    "explanation": "Kết nối kiến thức Bài 11 (`confusion_matrix` & `classification_report`) với dữ liệu thực tế `reviews_baseline.csv`.",
    "projectLink": "src/evaluate.py:L15; Bài 11",
    "codeLocation": "src/evaluate.py:L15; Bài 11",
    "proofExample": "Đối chiếu trực tiếp tại `src/evaluate.py:L15; Bài 11`.",
    "followUpQuestions": [
      "Ngoài `ground_truth.csv`, ngay trong `reports/` đã có file nào liệt kê chi tiết từng mẫu sai của LLM và Baseline?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài `ground_truth.csv`, ngay trong `reports/` đã có file nào liệt kê chi tiết từng mẫu sai của LLM và Baseline?",
        "a": "File `reports/llm_error_analysis.csv` gồm đúng `46` mẫu có sai lệch giữa dự đoán (LLM / Baseline) với nhãn tay!"
      }
    ],
    "commonMistakes": [
      "Nhìn riêng con số Accuracy 0.85 rồi đoán bừa các lỗi sai của Baseline rơi đều vào cả 3 lớp."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vs-083",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống 1 cột trong `kpi_by_snapshot.csv` cần đọc lại vào Python bằng `pd.read_csv()` để kiểm chứng số nguyên đếm.",
    "question": "Tình huống: Khi giảng viên mở `data/processed/kpi_by_snapshot.csv` bằng `pd.read_csv()`, tại sao cột `review_velocity_n` vừa chứa `<NA>` ở `t1`, vừa chứa `1000` ở `t2`, nên nếu không truyền `dtype={\"review_velocity_n\": \"Int64\"}` nó lại in thành `NaN`, `1000.0`?",
    "quickAnswer": "Vì chuẩn `pd.read_csv()` mặc định đọc cột số có chứa ô trống sang kiểu `float64` của NumPy (làm mọi số nguyên hiển thị thành `1000.0`, `999.0`), mặc dù trong `src/kpi.py:L364` lúc ghi ra file CSV nhóm đã ép chuẩn `\"Int64\"` để xuất chuỗi nguyên `1000`, `999`, `\"\"`! Đây là đặc thù muôn thuở của định dạng CSV không lưu kiểu (Bài 6).",
    "explanation": "Kết nối Bài 6 (CSV mất schema) với hành vi thực tế của `kpi_by_snapshot.csv`.",
    "projectLink": "src/kpi.py:L364-L365; Bài 6",
    "codeLocation": "src/kpi.py:L364-L365; Bài 6",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L364-L365; Bài 6`.",
    "followUpQuestions": [
      "Làm sao giữ nguyên `Int64` nullable tự động trên pandas `2.0+` khi gọi `read_csv()`?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao giữ nguyên `Int64` nullable tự động trên pandas `2.0+` khi gọi `read_csv()`?",
        "a": "Truyền `dtype_backend=\"numpy_nullable\"` hoặc khai báo `dtype={\"review_velocity_n\": \"Int64\"}`."
      }
    ],
    "commonMistakes": [
      "Cho rằng `src/kpi.py` đã xuất nhầm `1000.0` vào file `kpi_by_snapshot.csv`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vs-084",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi `kpi_ppg_neighbourhood.png` đặt nhãn số thứ tự `#1..#15` vào tâm các quận có hình dáng lưỡi liềm cong (`polygon`).",
    "question": "Tình huống: Quận Álvaro Obregón hoặc Gustavo A. Madero có hình dáng kéo dài, và một số quận khác có diện tích hẹp sát nhau trên bản đồ `kpi_ppg_neighbourhood.png`. Cơ chế đặt nhãn của `src/viz.py` ưu tiên điểm gì và hạn chế thị giác còn lại là gì?",
    "quickAnswer": "`src/viz.py :: _centroid()` tính **trọng tâm hình học (Shoelace polygon centroid)** của đa giác lớn nhất mỗi quận và vẽ hộp trắng bo tròn nền nhẹ (`bbox`) chứa số thứ tự `#rank` để dễ đọc trên cả vùng màu tối lẫn màu sáng. Hạn chế còn lại: đối với các quận rất nhỏ nằm sát nhau ở trung tâm (như Benito Juárez / Cuauhtémoc / Iztacalco), nhãn đôi khi hơi gần nhau, hoặc đa giác hình trăng khuyết có trọng tâm hơi lệch về cạnh lõm.",
    "explanation": "Đánh giá trung thực cả giải pháp `_centroid()` lẫn hạn chế thị giác của nhãn bản đồ tự động.",
    "projectLink": "src/viz.py:L70-L105, L260-L275",
    "codeLocation": "src/viz.py:L70-L105, L260-L275",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py:L70-L105, L260-L275`.",
    "followUpQuestions": [
      "Nếu một quận gồm 2 đa giác tách rời, vì sao `_centroid()` chọn đa giác có diện tích lớn nhất thay vì lấy trung bình trọng tâm của 2 mảnh?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một quận gồm 2 đa giác tách rời, vì sao `_centroid()` chọn đa giác có diện tích lớn nhất thay vì lấy trung bình trọng tâm của 2 mảnh?",
        "a": "Vì trung bình 2 mảnh tách rời có thể rơi ngay ra giữa vùng rỗng của quận hàng xóm nằm giữa!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `src/viz.py` kéo thả tọa độ nhãn 15 quận bằng tay hoặc gọi thư viện GIS chuyên dụng."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vs-085",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "scenario",
    "topics": [
      "Storytelling",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi tổng hợp báo cáo `report.pdf`, giải thích mối liên hệ giữa mẫu `1.000 listing` (3.2%) và toàn thị trường CDMX (~31.000+ listing).",
    "question": "Tình huống: Nếu một người đọc `report.pdf` hỏi: *\"Mexico City thực tế có hơn 26.000–31.000 căn hộ Airbnb, tại sao nhóm chỉ phân tích đúng 1.000 căn mà vẫn kết luận được về xu hướng World Cup 2026?\"*",
    "quickAnswer": "Trả lời trung thực và có cơ sở: (1) Thiết kế của đề bài UET.DSE2049 phân công cho mỗi nhóm đúng một **panel cố định gồm 1.000 listing ID và 5.000 review** để tập trung độ sâu chất lượng dữ liệu, kiểm toán QA và gán nhãn LLM; (2) Ưu điểm của panel 1.000 căn cố định qua 4 mốc là **kiểm soát được sự thay đổi hành vi của cùng một tập chủ nhà** (không bị nhiễu bởi hàng nghìn tin đăng mới/rác xuất hiện rồi biến mất); (3) **Bắt buộc ghi rõ giới hạn Selection Bias**: mọi con số (`+67.3%`, `44.5% Occ30`, `14.8% phàn nàn tiện nghi`) **CHỈ kết luận trên mẫu cố định phân công (chủ yếu tập trung 52.5% ở Cuauhtémoc)**, không suy diễn thành thông số đại diện đều toàn bộ 31.000 căn của cả thành phố!",
    "explanation": "Phản ánh chuẩn mực đạo đức khoa học dữ liệu và yêu cầu đề bài.",
    "projectLink": "reports/report.pdf; Bài 14",
    "codeLocation": "reports/report.pdf; Bài 14",
    "proofExample": "Đối chiếu trực tiếp tại `reports/report.pdf; Bài 14`.",
    "followUpQuestions": [
      "Tỷ lệ `74.9%` review LLM ở Cuauhtémoc so với `52.5%` listing ở quận này cho thấy đặc điểm gì của mẫu review?"
    ],
    "followUpQA": [
      {
        "q": "Tỷ lệ `74.9%` review LLM ở Cuauhtémoc so với `52.5%` listing ở quận này cho thấy đặc điểm gì của mẫu review?",
        "a": "Mỗi căn hộ tại vùng lõi du lịch Cuauhtémoc tích lũy mật độ review cao hơn bình quân ngoại ô, làm mẫu review nghiêng thêm nữa về trung tâm."
      }
    ],
    "commonMistakes": [
      "Cố gồng chứng minh \"1.000 căn của nhóm lấy mẫu ngẫu nhiên hoàn toàn đại diện 100% cho toàn CDMX\" (sai sự thật vì 52.5% listing và 74.9% review nằm ở Cuauhtémoc!)."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vs-086",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "scenario",
    "topics": [
      "Data Cleaning",
      "Regex"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi tên một tiện nghi hoặc mô tả có chữ `NA` (viết tắt North America) hoặc `\"na\"` khi đọc CSV.",
    "question": "Tình huống: So sánh hành vi khi gọi `pd.read_csv(..., keep_default_na=False)` trong `_read_sheet()` của `filter_data_from_sheet.py` vs gọi mặc định `keep_default_na=True` khi một ô chứa chữ `\"NA\"` hoặc chuỗi `\"null\"`.",
    "quickAnswer": "Mặc định `keep_default_na=True` của pandas tự động biến 19 chuỗi (`\"NA\"`, `\"N/A\"`, `\"null\"`, `\"NaN\"`, `\"\"`, `\"None\"`...) thành `NaN`! Trên Google Sheets phân công dạng chuỗi (`keep_default_na=False`), tất cả ô trống giữ nguyên `\"\"` và `\"NA\"` giữ nguyên `\"NA\"` để `.astype(\"string\").str.strip().str.lower().eq(\"x\")` không bao giờ bị vướng `<NA>` hoặc làm mất mã định danh hợp lệ như mã vùng `\"NA\"` (Bài 6)!",
    "explanation": "Hiểu bẫy `keep_default_na` của `pd.read_csv()` trong Bài 6.",
    "projectLink": "src/filter_data_from_sheet.py:L47; Bài 6",
    "codeLocation": "src/filter_data_from_sheet.py:L47; Bài 6",
    "proofExample": "Đối chiếu trực tiếp tại `src/filter_data_from_sheet.py:L47; Bài 6`.",
    "followUpQuestions": [
      "Trong `_filter_raw_by_ids` đọc `listings.csv.gz`, có nên đặt `keep_default_na=False` cho toàn bộ 75 cột không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `_filter_raw_by_ids` đọc `listings.csv.gz`, có nên đặt `keep_default_na=False` cho toàn bộ 75 cột không?",
        "a": "KHÔNG nên đặt cho toàn bảng raw vì `listings.csv.gz` cần các ô trống ở cột giá/review thành `NaN` để bước QA nhận diện missing values chuẩn xác!"
      }
    ],
    "commonMistakes": [
      "Tưởng `keep_default_na=False` làm `pd.read_csv` vẫn giữ `np.nan` ở ô trống (thực chất ô trống trở thành chuỗi rỗng `\"\"`!)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-087",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi chạy lại `filter_data_from_sheet.py` nhiều lần — đảm bảo không ghi rác vào `data/processed/`.",
    "question": "Tình huống: Nếu tập phân công Google Sheets cập nhật (bớt đi 1 snapshot cũ hoặc thêm mới) và chạy lại `src/filter_data_from_sheet.py`, điều gì xảy ra với các file CSV trong `data/processed/<snapshot>/`?",
    "quickAnswer": "`filter_data_from_sheet.py` ghi đè sạch các file `listings.csv`, `reviews.csv`, `reviews_llm.csv`, `reviews_labeled.csv` tại từng thư mục snapshot tương ứng trong `config[\"snapshots\"]`, bảo đảm dữ liệu khớp với trạng thái mới nhất của bảng phân công. (Lưu ý: nếu bỏ bớt 1 snapshot trong YAML thì thư mục cũ trên đĩa vẫn còn nếu không tự dọn, nhưng `qa.py` và `kpi.py` chỉ đọc các snapshot liệt kê trong YAML).",
    "explanation": "Nhất quán giữa cấu hình YAML và phạm vi đọc ghi thư mục.",
    "projectLink": "src/filter_data_from_sheet.py:L160-L240",
    "codeLocation": "src/filter_data_from_sheet.py:L160-L240",
    "proofExample": "Đối chiếu trực tiếp tại `src/filter_data_from_sheet.py:L160-L240`.",
    "followUpQuestions": [
      "Ngoại trừ các thư mục snapshot, file nào trong `llm.py:L77` lại có nhánh fallback dùng `glob(\"*/reviews_llm.csv\")`?"
    ],
    "followUpQA": [
      {
        "q": "Ngoại trừ các thư mục snapshot, file nào trong `llm.py:L77` lại có nhánh fallback dùng `glob(\"*/reviews_llm.csv\")`?",
        "a": "Hàm `load_assigned_reviews()` trong `src/llm.py:L77` có nhánh dự phòng duyệt `glob(\"*/reviews_llm.csv\")` nếu không tìm thấy file trong danh sách `snapshots` của YAML!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `qa.py` quét toàn bộ thư mục con trong `data/processed/` bất chấp YAML cấu hình snapshot nào."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vs-088",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "scenario",
    "topics": [
      "Baseline",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Nếu sửa Baseline từ Regex sang mô hình Zero-shot khác, cần giữ nguyên hợp đồng đầu ra nào để `evaluate.py` & `viz.py` chạy ngay không cần sửa code?",
    "question": "Tình huống: Nếu muốn thử nghiệm một thuật toán NLP đối chứng khác (ví dụ VADER hoặc mô hình phân loại nhỏ chạy offline) thay cho Regex trong `src/baseline.py`, hợp đồng tệp đầu ra (`reviews_baseline.csv`) phải giữ chính xác những gì?",
    "quickAnswer": "Phải giữ đúng đường dẫn `data/processed/reviews_baseline.csv`, encoding `utf-8`, khóa `id` (string), `language`, `overall_sentiment` (`positive|mixed|negative`), và đủ **7 cột khía cạnh** (`location, cleanliness, amenities, communication, checkin, value, noise`) mang giá trị thuộc tập `{\"positive\", \"mixed\", \"negative\", \"not_mentioned\"}`! Khi khớp hợp đồng 15 cột đó, toàn bộ `evaluate.py` và `viz.py` chạy trơn tru 100%.",
    "explanation": "Tư duy Interface / Data Contract giữa các module pipeline.",
    "projectLink": "src/baseline.py:L110-L148; src/evaluate.py",
    "codeLocation": "src/baseline.py:L110-L148; src/evaluate.py",
    "proofExample": "Đối chiếu trực tiếp tại `src/baseline.py:L110-L148; src/evaluate.py`.",
    "followUpQuestions": [
      "Tại sao `src/evaluate.py` không cần biết bên trong `reviews_baseline.csv` dùng Regex hay VADER?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/evaluate.py` không cần biết bên trong `reviews_baseline.csv` dùng Regex hay VADER?",
        "a": "Vì tầng Evaluation chỉ chấm cặp đối chiếu `(ground_truth.csv, predictions)` dựa trên hợp đồng schema CSV thống nhất."
      }
    ],
    "commonMistakes": [
      "Đổi tên nhãn từ `\"not_mentioned\"` sang `\"neutral\"` hoặc đổi tên cột thành `aspect_location` (làm gãy ngay `evaluate.py`!)."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vs-089",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Phát hiện lỗi logic nếu tính `tỷ lệ tăng trưởng % PPG` bằng `(mean_t4 - mean_t1) / mean_t1` thay vì Median.",
    "question": "Tình huống: Ở `kpi_by_snapshot.csv`, `Mean Price` tăng từ `1.535,15` (`t1`) lên `3.013,09 MXN` (`t4`, **`+96.3%`**), trong khi `Median Price` tăng từ `1.159,50` lên `1.940,00 MXN` (`+67.3%`). Tại sao báo cáo chọn `+67.3%` làm con số đại diện thay vì `+96.3%`?",
    "quickAnswer": "Vì con số `+96.3%` ở `Mean Price` bị thổi phồng mạnh bởi vài listing treo giá cực đoan ở mức `153.540 MXN` mới xuất hiện ở `t4` (làm kéo lệch Mean tại `t4` thêm hàng trăm MXN)! Con số **`+67.3%` (`Median Price`)** và **`+64.1%` (`Median PPG`)** phản ánh trung thực mức tăng giá của căn hộ điển hình nằm giữa phân phối thị trường mà không bị đầu cơ ảo chi phối.",
    "explanation": "Trình bày bản chất số liệu Mean vs Median đúng tinh thần Bài 10 & Bài 14.",
    "projectLink": "data/processed/kpi_by_snapshot.csv; reports/report.pdf",
    "codeLocation": "data/processed/kpi_by_snapshot.csv; reports/report.pdf",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_snapshot.csv; reports/report.pdf`.",
    "followUpQuestions": [
      "Chứng minh cụ thể căn nào ở `t4` góp phần đẩy Mean của Cuauhtémoc và toàn mẫu vọt lên?"
    ],
    "followUpQA": [
      {
        "q": "Chứng minh cụ thể căn nào ở `t4` góp phần đẩy Mean của Cuauhtémoc và toàn mẫu vọt lên?",
        "a": "2 căn ở Cuauhtémoc là `1495709040675944121` và `1415442841269763701` cùng treo `153.540 MXN/đêm` với `Occ_1-30 = 0%`!"
      }
    ],
    "commonMistakes": [
      "Chọn con số `+96.3%` đưa lên tiêu đề báo cáo vì nghe \"ấn tượng mạnh\" hơn dù biết bị ngoại lai kéo."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_snapshot.csv"
    ]
  },
  {
    "id": "vs-090",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "Python",
      "Datetime"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Ứng xử khi `pd.to_datetime()` nhận định dạng không chuẩn giữa ngày Mỹ `MM/DD/YYYY` và ISO.",
    "question": "Tình huống: Nếu nhận được một bảng dữ liệu phụ từ bên ngoài có ngày hỗn hợp `\"07/04/2026\"` và `\"13/04/2026\"`, làm sao đọc đúng 100% mà không bị pandas tự đoán nhầm?",
    "quickAnswer": "Nếu cả bảng theo chuẩn Việt/Anh `DD/MM/YYYY`, bắt buộc truyền tường minh **`format=\"%d/%m/%Y\"`** (kèm `errors=\"coerce\"`) hoặc với hỗn hợp nhiều định dạng trên pandas mới dùng `format=\"mixed\", dayfirst=True` rồi xuất hết về chuẩn **ISO 8601 (`\"%Y-%m-%d\"`)**! Tuyệt đối không gọi `pd.to_datetime(s)` trần không truyền `format` hay `dayfirst` khiến pandas đoán lúc thì theo chuẩn Mỹ lúc lại đảo ngược.",
    "explanation": "Bài 8: không bao giờ phó mặc parse ngày giờ cho suy đoán ngầm.",
    "projectLink": "Bài 8; src/qa.py:L278",
    "codeLocation": "Bài 8; src/qa.py:L278",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 8; src/qa.py:L278`.",
    "followUpQuestions": [
      "Trong `\"2026-06-15\"`, thành phần số đứng giữa luôn là tháng hay ngày?"
    ],
    "followUpQA": [
      {
        "q": "Trong `\"2026-06-15\"`, thành phần số đứng giữa luôn là tháng hay ngày?",
        "a": "Luôn là **tháng (`06`)** theo chuẩn ISO 8601 `YYYY-MM-DD`, đảm bảo xếp chuỗi theo bảng chữ cái trùng 100% thứ tự thời gian."
      }
    ],
    "commonMistakes": [
      "Truyền `dayfirst=True` cho chuỗi ISO `\"2026-06-15\"` đôi khi gây cảnh báo không cần thiết (ISO luôn dùng `format=\"%Y-%m-%d\"`)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vs-091",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "scenario",
    "topics": [
      "API",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Nếu muốn đổi model trong `configs/mexico-city.yaml` sang mô hình mới của Gemini — cần cập nhật ở những nơi nào?",
    "question": "Tình huống: Giả sử sang năm học mới, Google ra mắt model mới (ví dụ `gemini-4.0-flash-lite`) và muốn chạy thử nghiệm trong pipeline. Cần chỉnh ở những file nào và lưu ý chi phí/cache gì?",
    "quickAnswer": "1) Đổi trường `llm.model` trong `configs/mexico-city.yaml` (không cần sửa `src/llm.py` vì đọc động từ YAML);\n2) Thêm mức giá `(price_in, price_out)` tương ứng vào từ điển `MODEL_PRICING_PER_1M` trong `src/evaluate.py:L20` (nếu quên bước này, `uoc_tinh_chi_phi()` vẫn chạy êm nhưng `chi_phi_usd` để `None`);\n3) Lưu/đổi đường dẫn `llm_cache.jsonl` mới để tránh trộn lẫn với cache chạy bởi model cũ!",
    "explanation": "Kiến trúc tách cấu hình giúp nâng cấp model nhanh chóng chỉ qua YAML + bảng giá.",
    "projectLink": "configs/mexico-city.yaml; src/llm.py; src/evaluate.py:L20-L28",
    "codeLocation": "configs/mexico-city.yaml; src/llm.py; src/evaluate.py:L20-L28",
    "proofExample": "Đối chiếu trực tiếp tại `configs/mexico-city.yaml; src/llm.py; src/evaluate.py:L20-L28`.",
    "followUpQuestions": [
      "Nếu giữ nguyên `llm_cache.jsonl` cũ nhưng quên đổi tên, cột `model` trong `reviews_sentiment.csv` sẽ in tên model mới trong YAML hay tên model lưu trong từng dòng JSONL?"
    ],
    "followUpQA": [
      {
        "q": "Nếu giữ nguyên `llm_cache.jsonl` cũ nhưng quên đổi tên, cột `model` trong `reviews_sentiment.csv` sẽ in tên model mới trong YAML hay tên model lưu trong từng dòng JSONL?",
        "a": "In theo trường `\"model\"` đã lưu trong từng bản ghi cache JSONL (giúp lần kiểm toán dễ dàng phát hiện sự trộn lẫn model!)."
      }
    ],
    "commonMistakes": [
      "Quên đổi cache cũ -> chạy xong tưởng là kết quả của model mới mà thực ra 100% lấy từ model cũ!"
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vs-092",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "scenario",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Giải thích khác biệt thực tế giữa `df.isna()` / `df.notna()` vs `== np.nan` trong điều kiện QA.",
    "question": "Tình huống: Nếu ai đó sửa dòng kiểm thiếu trong `src/qa.py` từ `price_numeric.isna()` thành `price_numeric == np.nan`, toàn bộ quy tắc `RULE_MISSING_PRICE` sẽ cho kết quả gì?",
    "quickAnswer": "Trong chuẩn dấu phẩy động IEEE 754, **`np.nan == np.nan` LUÔN trả về `False`**! Do đó `price_numeric == np.nan` trả về toàn bộ mảng `False`, khiến `qa_missing_price` bằng `False` cho cả **1.000 căn thiếu giá tại `t2`** — phá hủy toàn bộ tầng kiểm toán QA! Luôn phải dùng `.isna()` / `.notna()` hoặc `pd.isna()`.",
    "explanation": "Lỗi căn bản nhất khi viết biểu thức kiểm thiếu bằng Python/pandas (Bài 2 & Bài 4).",
    "projectLink": "src/qa.py:L97; Bài 2 & Bài 4",
    "codeLocation": "src/qa.py:L97; Bài 2 & Bài 4",
    "proofExample": "Đối chiếu trực tiếp tại `src/qa.py:L97; Bài 2 & Bài 4`.",
    "followUpQuestions": [
      "Khi lọc nghịch đảo để lấy các giá trị HỢP LỆ không bị thiếu, nên viết thế nào rõ và đúng nhất?"
    ],
    "followUpQA": [
      {
        "q": "Khi lọc nghịch đảo để lấy các giá trị HỢP LỆ không bị thiếu, nên viết thế nào rõ và đúng nhất?",
        "a": "Dùng `col.notna()` (hoặc `~col.isna()`), như `valid_p = price_numeric.loc[~missing_price_mask]` tại `src/qa.py:L113`."
      }
    ],
    "commonMistakes": [
      "Viết `col == None` hoặc `col == np.nan` trong bộ lọc boolean pandas."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vs-093",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "scenario",
    "topics": [
      "KPI",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Khi kiểm tra bảng `kpi_by_listing.csv`, cách phát hiện một listing thuộc dạng \"ngủ đông rồi mở lại\" qua 4 mốc.",
    "question": "Tình huống: Vì `Ghost Rate` dao động `0.7% (t1) -> 0.3% (t2) -> 0.0% (t3) -> 0.4% (t4)` nhưng không có căn nào đóng băng liên tục 4 mốc, viết một đoạn lọc pandas trên `kpi_by_listing.csv` chứng minh tính chất \"đóng-mở tạm thời\" này.",
    "quickAnswer": "`g_cols = [\"ghost_t1\", \"ghost_t2\", \"ghost_t3\", \"ghost_t4\"]; df[\"ever_ghost\"] = (df[g_cols] == 1).any(axis=1); df[\"always_ghost\"] = (df[g_cols] == 1).all(axis=1)` -> kết quả sẽ thấy vài căn có `ever_ghost == True` nhưng `always_ghost.sum() == 0`! Và các căn từng `ghost_t1 == 1` đều có `ghost_t3 == 0` ở kỳ Semana Santa!",
    "explanation": "Kết nối code phân tích khám phá thực chiến trên bảng `kpi_by_listing.csv` thật của dự án.",
    "projectLink": "data/processed/kpi_by_listing.csv",
    "codeLocation": "data/processed/kpi_by_listing.csv",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_listing.csv`.",
    "followUpQuestions": [
      "Vì sao dùng `== 1` rồi `.any(axis=1)` thay vì tổng `.sum(axis=1) == 4`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao dùng `== 1` rồi `.any(axis=1)` thay vì tổng `.sum(axis=1) == 4`?",
        "a": "Dùng `(df[g_cols] == 1).all(axis=1)` an toàn cả khi 1 ô bị `<NA>` (`<NA> == 1` là `<NA>` -> `.all()` trả về `False` chuẩn xác)."
      }
    ],
    "commonMistakes": [
      "Cộng dồn `0.7% + 0.3% + 0.0% + 0.4% = 1.4%` và tưởng tổng cộng có 14 căn đóng băng khác nhau (một số căn có thể lặp hoặc phục hồi)."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_listing.csv"
    ]
  },
  {
    "id": "vs-094",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "scenario",
    "topics": [
      "Visualization",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Tình huống",
    "evaluationGoal": "Xử lý tình huống chạy `src/viz.py` trên server Linux headless không có màn hình GUI.",
    "question": "Tình huống: Khi chạy pipeline tự động trên Docker / Linux server / GitHub Actions không có màn hình đồ họa (X11/Display), `src/viz.py` có bị treo hay văng lỗi `TclError: no display name` không?",
    "quickAnswer": "KHÔNG! Nhờ ngay dòng 10–11 đầu tệp `src/viz.py` ép **`matplotlib.use(\"Agg\")`** TRƯỚC khi `import matplotlib.pyplot as plt`, Matplotlib chạy backend ảnh tĩnh phi giao diện (`Agg`) và lưu trực tiếp file PNG qua `fig.savefig(..., dpi=180, bbox_inches=\"tight\")` + `plt.close(fig)` mà không cần mở cửa sổ GUI nào!",
    "explanation": "Chi tiết kỹ thuật quan trọng đảm bảo tái lập pipeline trên bất kỳ môi trường CI/Linux headless nào.",
    "projectLink": "src/viz.py:L10-L12",
    "codeLocation": "src/viz.py:L10-L12",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py:L10-L12`.",
    "followUpQuestions": [
      "Tại sao mỗi hàm vẽ trong `src/viz.py` đều phải gọi `plt.close(fig)` ngay sau `fig.savefig()`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao mỗi hàm vẽ trong `src/viz.py` đều phải gọi `plt.close(fig)` ngay sau `fig.savefig()`?",
        "a": "Để giải phóng ngay bộ nhớ RAM của từng `Figure` lớn (~300 DPI/180 DPI), tránh cảnh báo `More than 20 figures have been opened` và rò rỉ RAM."
      }
    ],
    "commonMistakes": [
      "Gọi `import matplotlib.pyplot as plt` ở trên rồi mới viết `matplotlib.use(\"Agg\")` ở dưới (không có hiệu lực nếu đã import `pyplot`!) hoặc gọi `plt.show()` làm treo tiến trình tự động."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  }
];

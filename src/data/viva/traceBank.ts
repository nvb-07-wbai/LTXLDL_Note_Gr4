import type { VivaQuestion } from '../../types';

export const VIVA_TRACE_BANK: VivaQuestion[] = [
  {
    "id": "vx-001",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Dự đoán số dòng khi lọc boolean có điều kiện kết hợp.",
    "question": "Một DataFrame có `100` dòng: `45` dòng có `price > 1000`, trong đó `10` dòng bị `qa_price_outlier == True`. Nếu viết `df.loc[(df[\"price\"] > 1000) & (~df[\"qa_price_outlier\"])]`, output có bao nhiêu dòng?",
    "quickAnswer": "Có **`35` dòng** (45 − 10) — và không làm biến đổi `df` ban đầu.",
    "explanation": "Phép `&` giao hai điều kiện: giữ giá > 1000 nhưng loại 10 dòng có cờ outlier bằng `~`.",
    "projectLink": "src/qa.py / src/kpi.py",
    "codeLocation": "src/qa.py / src/kpi.py",
    "proofExample": "45 - 10 = 35.",
    "followUpQuestions": [
      "Nếu thay `&` bằng `|` thì số dòng ít nhất là bao nhiêu nếu tổng số outlier cả bảng là 20?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thay `&` bằng `|` thì số dòng ít nhất là bao nhiêu nếu tổng số outlier cả bảng là 20?",
        "a": "Ít nhất `45 + (20 - 10) = 55` dòng."
      }
    ],
    "commonMistakes": [
      "Nhầm lẫn trả về 45 hoặc 55 dòng."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-002",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Dự đoán tác động `dropna(subset=[\"price\"])` lên các cột khác.",
    "question": "Một bảng có 10 dòng: dòng 1 thiếu `price`, dòng 2 thiếu `comments` (nhưng có đủ `price`), 8 dòng còn lại đủ hết. Khi chạy `df.dropna(subset=[\"price\"])`, kết quả còn bao nhiêu dòng và dòng 2 có bị xóa không?",
    "quickAnswer": "Còn **`9` dòng** — chỉ xóa dòng 1 (thiếu `price`), dòng 2 thiếu `comments` vẫn được **giữ nguyên**!",
    "explanation": "`subset=[\"price\"]` giới hạn điều kiện kiểm thiếu đúng vào cột `price`, giống cách `src/kpi.py:L409` chỉ xóa khi thiếu khóa ID.",
    "projectLink": "src/kpi.py:L409",
    "codeLocation": "src/kpi.py:L409",
    "proofExample": "len = 9.",
    "followUpQuestions": [
      "Nếu bỏ `subset=[\"price\"]` và chỉ viết `df.dropna()`, kết quả còn mấy dòng?"
    ],
    "followUpQA": [
      {
        "q": "Nếu bỏ `subset=[\"price\"]` và chỉ viết `df.dropna()`, kết quả còn mấy dòng?",
        "a": "Chỉ còn `8` dòng (xóa cả dòng 1 lẫn dòng 2!)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `dropna(subset=[\"price\"])` xóa luôn cả dòng 2 vì thiếu `comments`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-003",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "NumPy",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Dự đoán kết quả thay đổi `axis=0` thành `axis=1` trên bảng đánh giá.",
    "question": "Cho DataFrame `nhac` shape `(1000, 7)` gồm các giá trị `True/False` (7 cột aspect của 1.000 review). Kết quả shape và ý nghĩa của `nhac.sum(axis=1)` vs `nhac.sum(axis=0)` là gì?",
    "quickAnswer": "`nhac.sum(axis=1)` trả về Series shape `(1000,)` cho biết **mỗi review nhắc tới bao nhiêu khía cạnh**; còn `nhac.sum(axis=0)` trả về Series shape `(7,)` cho biết **mỗi khía cạnh được nhắc tới ở bao nhiêu review**!",
    "explanation": "Tại `src/evaluate.py:L179`, `so_kc = nhac.sum(axis=1)` dùng để phát hiện review ngắn 1–5 từ nhưng gán tới `>= 2` khía cạnh.",
    "projectLink": "src/evaluate.py:L179",
    "codeLocation": "src/evaluate.py:L179",
    "proofExample": "shape (1000,) vs (7,).",
    "followUpQuestions": [
      "Ở CDMX, khía cạnh nào có giá trị lớn nhất trong `nhac.sum(axis=0)`?"
    ],
    "followUpQA": [
      {
        "q": "Ở CDMX, khía cạnh nào có giá trị lớn nhất trong `nhac.sum(axis=0)`?",
        "a": "Là `location` (`822` lượt nhắc trên 1.000 review)."
      }
    ],
    "commonMistakes": [
      "Đảo ngược ý nghĩa shape đầu ra của `axis=0` và `axis=1`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-004",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "SQL"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Dự đoán số dòng khi đổi `merge(how=\"left\")` sang `how=\"inner\"`.",
    "question": "Bảng A (`reviews`) có 1.000 dòng với 361 `listing_id` hợp lệ và **2 dòng bị `listing_id` lạ** không có trong Bảng B (`listings`, 1.000 dòng, mỗi `id` duy nhất). So sánh số dòng đầu ra của `A.merge(B, how=\"left\")` vs `how=\"inner\"` vs `how=\"right\"`?",
    "quickAnswer": "`how=\"left\"` trả **1.000 + 2 = 1.002 dòng** (2 dòng lạ nhận `NaN` ở cột B); `how=\"inner\"` trả **1.000 dòng** (loại bỏ 2 dòng lạ); `how=\"right\"` giữ đủ 1.000 listing của B (gồm 1.000 dòng khớp + 639 listing chưa có review nhận `review_id = NaN` -> **1.639 dòng**)!",
    "explanation": "Khớp khóa luôn cần tính trước số dòng để phát hiện ngay rò rỉ hoặc mất bản ghi.",
    "projectLink": "src/kpi.py:L409",
    "codeLocation": "src/kpi.py:L409",
    "proofExample": "1002 vs 1000 vs 1639.",
    "followUpQuestions": [
      "Nếu Bảng B có 1 `id` bị lặp thành 2 dòng giống nhau và cả 2 khớp với 3 review bên A, 3 review đó thành mấy dòng sau merge?"
    ],
    "followUpQA": [
      {
        "q": "Nếu Bảng B có 1 `id` bị lặp thành 2 dòng giống nhau và cả 2 khớp với 3 review bên A, 3 review đó thành mấy dòng sau merge?",
        "a": "Thành `3 × 2 = 6` dòng (tích nhân bản theo khóa trùng)!"
      }
    ],
    "commonMistakes": [
      "Tưởng `how=\"right\"` cũng trả về 1.000 dòng giống `inner` hoặc `left`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-005",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "trace",
    "topics": [
      "Datetime",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Dự đoán hậu quả khi chuỗi ngày `last_review` bị parse sai format.",
    "question": "Cho chuỗi ngày `\"04/07/2026\"` (ý gốc là ngày 4 tháng 7 năm 2026) và `last_scraped = \"2026-06-15\"`. Nếu gọi `pd.to_datetime(\"04/07/2026\")` (theo chuẩn Mỹ mặc định) thay vì `format=\"%d/%m/%Y\"`, cờ `qa_invalid_last_review` đánh dấu thế nào?",
    "quickAnswer": "Chuẩn Mỹ đọc `\"04/07/2026\"` thành **ngày 7 tháng 4 năm 2026 (`2026-04-07`)**, nhỏ hơn `2026-06-15` -> **KHÔNG báo lỗi (`False`)** dù thực tế ngày 4/7 nằm trong tương lai sau ngày cào 15/6!",
    "explanation": "Lỗi parse ngày im lặng (silent date swap) cực kỳ nguy hiểm vì không hề sinh `NaT` để QA phát hiện.",
    "projectLink": "src/qa.py:L279 & Bài 8",
    "codeLocation": "src/qa.py:L279 & Bài 8",
    "proofExample": "2026-04-07 <= 2026-06-15 -> lọt lỗi!",
    "followUpQuestions": [
      "Làm sao chắc chắn cột ngày CSV của Inside Airbnb có dính ngày MM/DD hay không?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao chắc chắn cột ngày CSV của Inside Airbnb có dính ngày MM/DD hay không?",
        "a": "Inside Airbnb chuẩn hóa toàn bộ bảng theo định dạng ISO `YYYY-MM-DD`, nên tháng luôn nằm giữa và không bao giờ nhầm."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `errors=\"coerce\"` tự phát hiện được việc đảo ngược ngày và tháng (`04/07` vs `07/04`)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-006",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Dự đoán hành vi gọi API khi cache đã tồn tại 1.000/1.000.",
    "question": "File `llm_cache.jsonl` đã có đủ 1.000/1.000 review hợp lệ với đủ 7 khía cạnh. Người dùng chạy `python src/llm.py --config configs/mexico-city.yaml` (KHÔNG truyền `--skip-llm`, máy cũng KHÔNG có `GEMINI_API_KEY`). Chương trình chạy tiếp hay lỗi thiếu Key?",
    "quickAnswer": "**Chạy hoàn tất và xuất CSV bình thường không lỗi!** Vì ở `src/llm.py:L405`, `pending_count` bằng `0`, chương trình rơi vào nhánh `elif pending_count == 0:` và BỎ QUA luôn bước kiểm API Key lẫn `init_client()`.",
    "explanation": "Tối ưu hóa tuyệt vời giúp người dùng không cần bấm thêm cờ nếu cache đã hoàn tất 100%.",
    "projectLink": "src/llm.py:L405-L428",
    "codeLocation": "src/llm.py:L405-L428",
    "proofExample": "pending_count = 0 -> exit 0.",
    "followUpQuestions": [
      "Nếu cache mới có `999/1.000` bản ghi và chạy KHÔNG truyền `--skip-llm` trên máy không có key thì sao?"
    ],
    "followUpQA": [
      {
        "q": "Nếu cache mới có `999/1.000` bản ghi và chạy KHÔNG truyền `--skip-llm` trên máy không có key thì sao?",
        "a": "`pending_count = 1 > 0` -> lọt xuống `L431`, phát hiện `not api_key` và thoát bằng `sys.exit(1)` báo lỗi thiếu `GEMINI_API_KEY`."
      }
    ],
    "commonMistakes": [
      "Khẳng định cứ chạy `src/llm.py` mà không truyền `--skip-llm` thì bắt buộc phải có `GEMINI_API_KEY`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-007",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "trace",
    "topics": [
      "Regex",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết kết quả parse 4 chuỗi giá khác nhau qua Regex `qa.py`.",
    "question": "Cho cột `price` có 4 giá trị: `[\"$1,250.50\", \"0.00\", \"Contact host\", \"-300\"]`. Sau đoạn `RULE_PRICE_PARSE` và `RULE_MISSING_PRICE` (`src/qa.py:L90-L100`), giá trị `price_mxn` và `qa_missing_price` của cả 4 dòng là gì?",
    "quickAnswer": "`price_mxn` = `[1250.5, 0.0, np.nan, -300.0]`; `qa_missing_price` = `[False, True, True, True]`! Lưu ý dòng 2 (`0.0`) và dòng 4 (`-300.0`) vẫn lưu giá số trong `price_mxn` nhưng bị gắn cờ thiếu/không hợp lệ `True` (chỉ bị loại ở tầng `kpi.py`).",
    "explanation": "Truy vết kỹ cho thấy `qa.py:L148` gán `df[price_col] = price_numeric` chứ không xóa `-300.0` thành `NaN`, mà dựa vào `qa_missing_price` ở `kpi.py:L228` (`~_qa_flag & (price > 0)`) để loại sạch.",
    "projectLink": "src/qa.py:L93-L148; src/kpi.py:L228",
    "codeLocation": "src/qa.py:L93-L148; src/kpi.py:L228",
    "proofExample": "1250.5(F), 0.0(T), NaN(T), -300.0(T).",
    "followUpQuestions": [
      "Nếu một chương trình ngoài đọc thẳng `price_mxn` từ `listings.csv` mà quên kiểm tra cột `qa_missing_price`, hậu quả gì xảy ra nếu có giá `<= 0`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một chương trình ngoài đọc thẳng `price_mxn` từ `listings.csv` mà quên kiểm tra cột `qa_missing_price`, hậu quả gì xảy ra nếu có giá `<= 0`?",
        "a": "Sẽ tính nhầm cả giá `0` hoặc `-300` vào phép thống kê! (Nhớ kiểm tra cả cờ `~qa_missing_price` và `price > 0` như `kpi.py:L228`)."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng `qa.py` tự đổi giá `0.0` và `-300.0` thành `NaN` ngay trong cột `price_mxn` (thực chất `qa.py` giữ số và gắn cờ `qa_missing_price = True`, còn `kpi.py` mới lọc loại bỏ chúng!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-008",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết nhiều review thuộc cùng 1 listing khi tính `kpi_by_neighbourhood`.",
    "question": "Listing `L10` ở quận `Cuauhtémoc` có **4 review** trong `reviews_sentiment.csv` (trong đó 3 review khen `amenities=positive`, 1 review chê `amenities=negative`), và Listing `L20` cùng quận có **1 review** (`amenities=mixed`). Khi `compute_kpi_by_neighbourhood()` chạy xong, `llm_review_count`, `complaint_amenities` và `complaint_mixed_amenities` của quận này là bao nhiêu?",
    "quickAnswer": "`llm_review_count = 4 + 1 = 5`; `complaint_amenities = 1 / 5 = 0.20 (20%)`; `complaint_mixed_amenities = (1 + 1) / 5 = 2 / 5 = 0.40 (40%)`. Mỗi review đóng trọng số ngang nhau `1` trong bảng quận (tính trên từng bình luận chứ không gộp trung bình theo listing trước).",
    "explanation": "Khớp 100% logic thực tế ở `reviews_sentiment.csv` (1.000 review thuộc về 361 listing duy nhất).",
    "projectLink": "src/kpi.py:L406-L428",
    "codeLocation": "src/kpi.py:L406-L428",
    "proofExample": "5 reviews; 0.20; 0.40.",
    "followUpQuestions": [
      "Điều kiện nào tại `L402` đảm bảo 4 review của L10 không bị nhân bản sai lệch khi ghép vào bảng listing?"
    ],
    "followUpQA": [
      {
        "q": "Điều kiện nào tại `L402` đảm bảo 4 review của L10 không bị nhân bản sai lệch khi ghép vào bảng listing?",
        "a": "`kpi_by_listing[[\"id\", \"neighbourhood_cleansed\"]].drop_duplicates(\"id\")` giữ duy nhất 1 dòng quận cho mỗi `listing_id`."
      }
    ],
    "commonMistakes": [
      "Tưởng bảng `kpi_by_neighbourhood` lấy bình quân mỗi listing trước (khi đó L10 có 0.25 và L20 có 1.0 -> bình quân thành 62.5% sai hoàn toàn so với code!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-009",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_normalise_id` trên ID số, khoảng trắng và NA.",
    "question": "Cho `s = pd.Series([\" 101 \", None, \"202\\n\", pd.NA], dtype=\"object\")`. Sau hàm `_normalise_id(s)` (`values.astype(\"string\").str.strip().fillna(\"\")`), từng phần tử trong Series kết quả có giá trị và dtype là gì?",
    "quickAnswer": "Trả về `StringDtype` gồm: `[\"101\", \"\", \"202\", \"\"]` (`None` và `pd.NA` thành `\"\"`; `\"202\\n\"` và `\" 101 \"` mất trắng 2 đầu).",
    "explanation": "Chuỗi `\"202\\n\"` bị `.str.strip()` cắt cả ký tự xuống dòng.",
    "projectLink": "src/filter_data_from_sheet.py:L33-L36",
    "codeLocation": "src/filter_data_from_sheet.py:L33-L36",
    "proofExample": "[\"101\", \"\", \"202\", \"\"]",
    "followUpQuestions": [
      "Nếu trong Series `s` có một phần tử là số nguyên `101` (không phải chuỗi), kết quả `.astype(\"string\")` là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu trong Series `s` có một phần tử là số nguyên `101` (không phải chuỗi), kết quả `.astype(\"string\")` là gì?",
        "a": "Vẫn thành chuỗi `\"101\"` bình thường không lỗi."
      }
    ],
    "commonMistakes": [
      "Tưởng `.str.strip()` chỉ cắt dấu cách `\" \"` chứ không cắt `\\n`."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vx-010",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hành vi `pd.read_csv(keep_default_na=False)` trong `_read_sheet`.",
    "question": "Trên Google Sheets tab Review, cột `\"Mẫu LLM\"` có dòng ghi `\"x\"`, dòng ghi `\"\"` (ô trống) và dòng ghi `\"NA\"`. Khi `_read_sheet()` đọc với `dtype=\"string\", keep_default_na=False`, 3 ô đó trở thành gì? Chỉ có ô nào khớp biểu thức lọc `llm_ids`?",
    "quickAnswer": "Cả 3 ô giữ nguyên chuỗi thật `\"x\"`, `\"\"`, `\"NA\"` (không biến thành `<NA>`). Sau bước `.str.strip().str.lower().eq(\"x\")`, chỉ duy nhất ô `\"x\"` (hoặc `\" X \"`) trả `True` để vào `llm_ids`.",
    "explanation": "Giúp giữ ổn định kiểu chuỗi ở toàn bảng Google Sheets.",
    "projectLink": "src/filter_data_from_sheet.py:L47-L51, L183",
    "codeLocation": "src/filter_data_from_sheet.py:L47-L51, L183",
    "proofExample": "[\"x\", \"\", \"NA\"] -> [True, False, False]",
    "followUpQuestions": [
      "Nếu một tab Google Sheets bị nhập thừa một dòng hoàn toàn rỗng ở cuối bảng, `keep_default_na=False` đọc dòng đó thành gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một tab Google Sheets bị nhập thừa một dòng hoàn toàn rỗng ở cuối bảng, `keep_default_na=False` đọc dòng đó thành gì?",
        "a": "Thành một hàng chứa toàn chuỗi `\"\"` (vì không khớp `\"x\"` và không khớp ID nên sẽ tự bị lọc bỏ ở `_filter_assignments`)."
      }
    ],
    "commonMistakes": [
      "Tưởng ô trống trên Google Sheets khi truyền `keep_default_na=False` vẫn ra `pd.NA` (thực ra nó ra chuỗi rỗng `\"\"`!)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vx-011",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết copy GeoJSON một lần qua cờ `geojson_copied`.",
    "question": "Trong `run_filter_data()` (`src/filter_data_from_sheet.py:L194-L205`), giả sử chỉ có mốc `t2` bị thiếu `neighbourhoods.geojson`, còn `t1, t3, t4` đều có. Biến `geojson_copied` và tệp đích `data/processed/neighbourhoods.geojson` hoạt động thế nào?",
    "quickAnswer": "Ở lượt đầu `t1`: `geojson_src.is_file()` là `True` -> copy ngay sang `data/processed/neighbourhoods.geojson` và gán `geojson_copied = True`. Ở các lượt `t2, t3, t4` sau: điều kiện `not geojson_copied` đều `False` nên bỏ qua không copy đè lại nữa!",
    "explanation": "Nếu `t1` cũng thiếu thì `geojson_copied` giữ `False` sang `t2` hoặc `t3` thấy tệp là copy ngay.",
    "projectLink": "src/filter_data_from_sheet.py:L194-L205",
    "codeLocation": "src/filter_data_from_sheet.py:L194-L205",
    "proofExample": "Copy đúng 1 lần đầu tiên tìm thấy.",
    "followUpQuestions": [
      "Nếu không có bất kỳ snapshot raw nào có `neighbourhoods.geojson`, hàm `filter` có báo lỗi không hay mô-đun nào sau đó mới báo lỗi?"
    ],
    "followUpQA": [
      {
        "q": "Nếu không có bất kỳ snapshot raw nào có `neighbourhoods.geojson`, hàm `filter` có báo lỗi không hay mô-đun nào sau đó mới báo lỗi?",
        "a": "`filter` không báo lỗi; mô-đun `src/viz.py` (`plot_ppg_neighbourhood`) mới ném `FileNotFoundError`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng cứ sang mốc `t4` là file GeoJSON bị ghi đè 4 lần liên tiếp."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vx-012",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết biến `ok` và `errors` trong `download.main()`.",
    "question": "Cho 4 snapshot × 4 file = 16 tệp. Tệp ở `t1/listings.csv.gz` đã tồn tại cục bộ (`size=5MB`), nhưng server trả `HTTP 403` cho cả 4 tệp của `t1` (3 tệp kia của `t1` chưa có trên đĩa). 12 tệp ở `t2..t4` tải `200 OK`. Giá trị cuối cùng của `ok`, `len(errors)` và mã thoát của `download.main()` là bao nhiêu?",
    "quickAnswer": "Tệp `t1/listings.csv.gz` có sẵn trên đĩa (>0 bytes) -> idempotent check trả **`True`** trước khi gọi mạng (`ok += 1`). 3 tệp còn lại của `t1` gặp 403 -> trả `False` (`errors` dài **3**). 12 tệp t2..t4 trả `True`. Kết quả: **`ok = 13/16`**, `errors` có 3 mục, và `main()` gọi **`sys.exit(1)`**!",
    "explanation": "Chỉ cần thiếu 1/16 tệp là `download.py` báo thoát mã `1`.",
    "projectLink": "src/download.py:L29-L49, L144-L156",
    "codeLocation": "src/download.py:L29-L49, L144-L156",
    "proofExample": "ok=13, errors=3, exit code 1.",
    "followUpQuestions": [
      "Nếu truyền thêm cờ `--force` trong kịch bản trên, kết quả của `t1/listings.csv.gz` còn là `True` không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu truyền thêm cờ `--force` trong kịch bản trên, kết quả của `t1/listings.csv.gz` còn là `True` không?",
        "a": "Vẫn trả **`True`**! Vì dù `--force` bỏ qua check đầu để gọi mạng và gặp `403`, nhánh `if resp.status_code in (403, 404):` ở `L36` vẫn kiểm tra lại `return dest.exists() and dest.stat().st_size > 0` và bảo toàn bản local sẵn có!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `t1/listings.csv.gz` vẫn gửi GET gặp 403 rồi tính là lỗi (thực tế idempotent check trả True ngay ở L29 trước khi gọi mạng!)."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vx-013",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `RULE_DEDUPLICATION` khi 2 dòng cùng ID nhưng khác `last_scraped`.",
    "question": "Cho bảng gộp tạm có 2 dòng: dòng 1 `(id=\"100\", last_scraped=\"2025-09-27\", price=\"$500\")` và dòng 2 `(id=\"100\", last_scraped=\"2026-06-15\", price=\"$900\")`. Khi truyền qua `apply_qa_rules()` với `dedupe_keys: [id, last_scraped]`, kết quả `num_dups` bằng mấy?",
    "quickAnswer": "`num_dups = 0`! Cả 2 dòng đều được **giữ nguyên** vì cặp giá trị `(id, last_scraped)` của chúng khác nhau.",
    "explanation": "Chỉ khi hai dòng trùng CẢ `id` VÀ `last_scraped` thì dòng thứ 2 mới bị đánh dấu trùng và loại bỏ.",
    "projectLink": "src/qa.py:L62-L67",
    "codeLocation": "src/qa.py:L62-L67",
    "proofExample": "num_dups = 0.",
    "followUpQuestions": [
      "Nếu trong 1 snapshot, có 20 căn hộ cào cùng một ngày `last_scraped = \"2026-06-15\"` nhưng khác `id`, `num_dups` là mấy?"
    ],
    "followUpQA": [
      {
        "q": "Nếu trong 1 snapshot, có 20 căn hộ cào cùng một ngày `last_scraped = \"2026-06-15\"` nhưng khác `id`, `num_dups` là mấy?",
        "a": "Bằng `0`! `subset` kiểm tra trùng cả tổ hợp (tuple) tất cả cột trong danh sách cùng một lúc."
      }
    ],
    "commonMistakes": [
      "Nhầm rằng `subset=[\"id\", \"last_scraped\"]` xóa mọi dòng trùng bất kỳ cột nào trong 2 cột (tức trùng `last_scraped` thôi cũng xóa!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-014",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `RULE_PRICE_OUTLIER` trên mảng giá có giá trị nằm ĐÚNG BẰNG P01 hoặc P99.",
    "question": "Giả sử tập `valid_p` cho `P01 = 312.0` và `P99 = 7049.0`. Một căn hộ có giá đúng bằng `7049.0` MXN (và một căn giá `7050.0` MXN). Căn nào bị gắn `qa_price_outlier = True`?",
    "quickAnswer": "Trong `src/qa.py:L146`, điều kiện là **so sánh ngặt `>` và `<`**: `(price_numeric > p_high) | (price_numeric < p_low)`. Do đó căn `7049.0` nhận `False` (nằm trong biên), còn căn `7050.0` nhận `True` (ngoại lai)!",
    "explanation": "Điều này cũng giải thích phần nào lý do tại t4 (nhiều giá trùng biên dưới/trên) số dòng ngoại lai là `19` thay vì đúng tròn `20` trên `980` căn.",
    "projectLink": "src/qa.py:L146",
    "codeLocation": "src/qa.py:L146",
    "proofExample": "7049.0 -> False; 7050.0 -> True.",
    "followUpQuestions": [
      "Nếu cả 1.000 căn hộ đều có cùng một mức giá duy nhất là `1.000 MXN` thì `P01`, `P99` và `qa_price_outlier.sum()` bằng bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Nếu cả 1.000 căn hộ đều có cùng một mức giá duy nhất là `1.000 MXN` thì `P01`, `P99` và `qa_price_outlier.sum()` bằng bao nhiêu?",
        "a": "`P01 = P99 = 1000.0`; nhờ so sánh ngặt `> / <`, `1000 > 1000` là `False` nên có **`0` căn** bị gắn cờ outlier (rất hợp lý!)."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng điều kiện là `>= P99` và `<= P01`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-015",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA",
      "Datetime"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `RULE_LAST_REVIEW_VALIDITY` qua 4 giá trị mẫu.",
    "question": "Với `last_scraped = \"2026-06-15\"`, cột `last_review` có 4 dòng: `[\"2026-06-10\", \"2026-06-20\", \"\", \"nan\"]`. Giá trị `last_review_clean` và `qa_invalid_last_review` của 4 dòng đó là gì?",
    "quickAnswer": "Dòng 1 (`2026-06-10`): clean=`\"2026-06-10\"`, flag=`False`.\nDòng 2 (`2026-06-20 > 2026-06-15`): clean=`<NA>`, flag=`True` (tương lai!).\nDòng 3 (`\"\"`) & Dòng 4 (`\"nan\"`): rơi vào `lr_missing = True`, clean=`<NA>`, flag=`False` (bỏ qua hợp lệ!).",
    "explanation": "Tổng số ca vi phạm của RULE 8: đúng `1` ca (dòng 2). `valid_lr_pct = 1/2 = 50.0%` (tính trên `non_null_lr = 2`).",
    "projectLink": "src/qa.py:L276-L295",
    "codeLocation": "src/qa.py:L276-L295",
    "proofExample": "flag = [F, T, F, F]; pct = 50.0%.",
    "followUpQuestions": [
      "Nếu dòng 5 có `last_review = \"31-02-2026\"` (ngày không tồn tại), `lr_missing`, `lr_parsed`, và `qa_invalid_last_review` nhận gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu dòng 5 có `last_review = \"31-02-2026\"` (ngày không tồn tại), `lr_missing`, `lr_parsed`, và `qa_invalid_last_review` nhận gì?",
        "a": "`lr_missing=False`, `lr_parsed=NaT`, nên `invalid_lr_mask` (`(~lr_missing) & lr_parsed.isna()`) là **`True`** -> gắn cờ lỗi chính xác!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng dòng 4 chuỗi chữ `\"nan\"` sẽ rơi vào lỗi parse `qa_invalid_last_review = True`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-016",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết biểu thức phần trăm `valid_lr_pct` khi toàn bộ cột `last_review` rỗng.",
    "question": "Tại `src/qa.py:L295`: `valid_lr_pct = f\"{(((non_null_lr - num_invalid_lr) / non_null_lr) * 100) if non_null_lr else 100.0:.1f}%\"`. Nếu cả 1.000 listing đều mới lập chưa có review nào (`non_null_lr = 0`), kết quả là gì?",
    "quickAnswer": "Biểu thức tam nguyên `if non_null_lr else 100.0` tránh phép chia cho `0` và trả về chuỗi `\"100.0%\"`.",
    "explanation": "Ngăn lỗi ZeroDivisionError ở các tập căn hộ mới.",
    "projectLink": "src/qa.py:L295",
    "codeLocation": "src/qa.py:L295",
    "proofExample": "100.0%.",
    "followUpQuestions": [
      "Ngược lại nếu có 200 dòng khác trống và cả 200 dòng đều sai định dạng (`num_invalid_lr = 200`), `valid_lr_pct` là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại nếu có 200 dòng khác trống và cả 200 dòng đều sai định dạng (`num_invalid_lr = 200`), `valid_lr_pct` là bao nhiêu?",
        "a": "`((200 - 200) / 200) * 100 = \"0.0%\"`."
      }
    ],
    "commonMistakes": [
      "Chia thẳng cho `non_null_lr` không có guard `else 100.0`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-017",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `build_schemas()` và tính toàn vẹn của `ReviewAnalysis`.",
    "question": "Nếu trong `configs/mexico-city.yaml`, danh sách `llm.aspects` chỉ đặt 3 mục `[\"location\", \"noise\", \"safety\"]`, thì `ReviewAnalysis` do `build_schemas()` tạo ra gồm những trường nào và khi gọi `model_validate({\"id\":\"1\",\"language\":\"en\",\"overall_sentiment\":\"positive\",\"aspects\":{\"location\":\"positive\",\"noise\":\"not_mentioned\"}})` thiếu `\"safety\"` thì chuyện gì xảy ra?",
    "quickAnswer": "`AspectSentiment` có đúng 3 trường `location`, `noise`, `safety` (bắt buộc nhờ dấu `...`). Khi dict thiếu `\"safety\"`, Pydantic lập tức ném **`ValidationError`** ngay tại dòng `L281` để `call_llm_batch()` kích hoạt retry!",
    "explanation": "Đảm bảo 100% review lưu xuống cache luôn đủ hết mọi khía cạnh quy định.",
    "projectLink": "src/llm.py:L28-L39, L281",
    "codeLocation": "src/llm.py:L28-L39, L281",
    "proofExample": "Ném pydantic.ValidationError.",
    "followUpQuestions": [
      "Để một trường trong `create_model` là bắt buộc (required) không có giá trị mặc định, dấu `...` (Ellipsis) có ý nghĩa gì?"
    ],
    "followUpQA": [
      {
        "q": "Để một trường trong `create_model` là bắt buộc (required) không có giá trị mặc định, dấu `...` (Ellipsis) có ý nghĩa gì?",
        "a": "Ellipsis `...` báo cho Pydantic trường đó là **required**, bắt buộc API phải trả về không được phép bỏ trống."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng thiếu 1 trường trong dict thì Pydantic tự điền `not_mentioned` dù đã khai báo `(SentimentLiteral, ...)`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-018",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết biến `new_count` và vòng chạy bù trong `process_pending_reviews()`.",
    "question": "Có `12` review còn thiếu. `batch_size = 5`. Lượt 0 chia làm 3 lô (`5 + 5 + 2`): lô 1 thành công 5, lô 2 lỗi rớt mất 1 (chỉ được 4), lô 3 thành công 2. Lượt chạy bù 1 (`batch_size=5`) chạy 1 lô 1 câu còn lại và thành công. Tổng số lần gọi API `call_llm_batch()` và giá trị trả về `new_count` là bao nhiêu?",
    "quickAnswer": "Lượt 0 gọi `3` lần (lưu 5+4+2 = 11 câu); Lượt 1 thấy `pending_rows` còn đúng `1` câu -> chờ `15s` rồi gọi `1` lần cho 1 câu -> thành công! Lượt 2 thấy `pending_rows` rỗng (`0` câu) -> `break` sớm không chạy. Tổng cộng gọi **`4` lần API**, trả về **`new_count = 12`**!",
    "explanation": "Minh họa cơ chế tự phục hồi thông minh của `process_pending_reviews()`.",
    "projectLink": "src/llm.py:L314-L385",
    "codeLocation": "src/llm.py:L314-L385",
    "proofExample": "4 calls; new_count = 12; Lượt 2 break.",
    "followUpQuestions": [
      "Trong kịch bản trên, nếu câu thứ 12 đó tiếp tục hỏng ở Lượt 1 và chỉ thành công ở Lượt 2, thời gian `sleep` tổng cộng giữa các lượt và sau lô là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Trong kịch bản trên, nếu câu thứ 12 đó tiếp tục hỏng ở Lượt 1 và chỉ thành công ở Lượt 2, thời gian `sleep` tổng cộng giữa các lượt và sau lô là bao nhiêu?",
        "a": "Có 3 lần `sleep(1.0)` ở Lượt 0 + `sleep(15)` đầu Lượt 1 + `sleep(1.0)` + `sleep(15)` đầu Lượt 2 + `sleep(1.0)` = `35 giây` (cộng thời gian retry nội bộ nếu có)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng Lượt 2 tách lẻ `batch_size=1` lúc nào cũng chạy qua đủ 3 vòng lặp kể cả khi đã đủ 100%."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-019",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết ánh xạ cột trong `export_cache_to_csv()`.",
    "question": "Trong `reviews_llm.csv` có dòng review `r_id = \"999\"` mà `\"999\"` chưa có trong `cache`, còn bảng `reviews_llm.csv` có sẵn `listing_id = \"12345\"`. Ở `export_cache_to_csv()` (`src/llm.py:L146-L175`), giá trị của `missing_count`, `row_dict[\"listing_id\"]`, `row_dict[\"overall_sentiment\"]`, và `row_dict[\"location\"]` bằng gì?",
    "quickAnswer": "`missing_count` tăng thêm `1`; `listing_id` = `\"12345\"` (lấy từ `reviews_df`); `overall_sentiment = None` (ra ô trống/`NaN` trong CSV); `location = None` (`aspects` rỗng nên `aspects.get(\"location\")` trả `None`).",
    "explanation": "Tuyệt đối không gán nhãn mặc định \"positive\" cho bản ghi lỗi.",
    "projectLink": "src/llm.py:L146-L175",
    "codeLocation": "src/llm.py:L146-L175",
    "proofExample": "missing_count += 1; labels = None.",
    "followUpQuestions": [
      "Nếu `cached` có trong dict nhưng `cached[\"listing_id\"]` lại là `\"12345\"` còn `r.get(\"listing_id\")` là `np.nan`, dòng `L163` điền gì vào `row_dict[\"listing_id\"]`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `cached` có trong dict nhưng `cached[\"listing_id\"]` lại là `\"12345\"` còn `r.get(\"listing_id\")` là `np.nan`, dòng `L163` điền gì vào `row_dict[\"listing_id\"]`?",
        "a": "Vì `_clean_str(np.nan)` trả `\"\"` (falsy), biểu thức `or` lấy sang vế phải -> điền `\"12345\"` từ cache!"
      }
    ],
    "commonMistakes": [
      "Tưởng rằng review chưa có trong cache bị bỏ khỏi file `reviews_sentiment.csv` (thực tế vẫn giữ hàng kèm nhãn `NaN` để bảo toàn đủ 1.000 dòng!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-020",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `clean_text()` trên chuỗi HTML phức tạp.",
    "question": "Cho chuỗi đầu vào: `\"  <b>Great</b>&amp;quiet<br />Stay  https://airbnb.com/h/1   \"`. Kết quả sau từng dòng của `clean_text()` (`src/baseline.py:L65-L71`) cho ra chuỗi gì?",
    "quickAnswer": "1. `unescape` -> `\"  <b>Great</b>&quiet<br />Stay  https://...\"`;\n2. `<br /> -> \\n` và xóa `<b>`, `</b>` -> `\"   Great &quiet\\nStay  https://...\"`;\n3. Xóa URL & gom khoảng trắng ngang `[ \\t\\r]+` -> `\"Great &quiet\\nStay\"`.",
    "explanation": "Dấu xuống dòng `\\n` được giữ nguyên chính xác trước chữ `\"Stay\"`!",
    "projectLink": "src/baseline.py:L65-L71",
    "codeLocation": "src/baseline.py:L65-L71",
    "proofExample": "\"Great &quiet\\nStay\"",
    "followUpQuestions": [
      "Nếu chuỗi đầu vào là `np.nan` (do bình luận trống trên Airbnb), dòng `L63` của `clean_text()` trả về gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu chuỗi đầu vào là `np.nan` (do bình luận trống trên Airbnb), dòng `L63` của `clean_text()` trả về gì?",
        "a": "Trả về chuỗi rỗng `\"\"` ngay ở dòng 63–64 không văng lỗi `TypeError`."
      }
    ],
    "commonMistakes": [
      "Nhầm rằng `\"Great &quiet\"` không còn dấu cách giữa `Great` và `&quiet` hoặc bị mất dấu xuống dòng `\\n`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-021",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết ngưỡng `overall` khi số câu chê áp đảo câu khen.",
    "question": "Trong `src/baseline.py:L105`: `overall = \"positive\" if total_neg == 0 else \"negative\" if (total_pos == 0 or total_neg >= max(3, 2 * total_pos)) else \"mixed\"`. Cho 3 cặp `(total_pos, total_neg)`: `(2, 2)`, `(1, 3)`, `(3, 5)`. Nhãn `overall` tương ứng là gì?",
    "quickAnswer": "- `(2, 2)`: `2 < max(3, 4)=4` -> **`mixed`**;\n- `(1, 3)`: `3 >= max(3, 2)=3` -> **`negative`**;\n- `(3, 5)`: `5 < max(3, 6)=6` -> **`mixed`**!",
    "explanation": "Công thức `max(3, 2 * total_pos)` ngăn câu có 1 từ khen + 2 từ chê nhẹ bị đẩy vội sang `negative` (chỉ khi chê nhiều gấp đôi khen VÀ ít nhất 3 điểm chê mới tính thuần `negative`).",
    "projectLink": "src/baseline.py:L105",
    "codeLocation": "src/baseline.py:L105",
    "proofExample": "mixed, negative, mixed.",
    "followUpQuestions": [
      "Cặp `(total_pos=0, total_neg=1)` trả về nhãn gì?"
    ],
    "followUpQA": [
      {
        "q": "Cặp `(total_pos=0, total_neg=1)` trả về nhãn gì?",
        "a": "Vì vế đầu `total_pos == 0` là `True` nên trả về **`negative`** ngay lập tức dù `total_neg = 1 < 3`."
      }
    ],
    "commonMistakes": [
      "Tính nhầm `(1, 3)` thành `mixed` hoặc `(2, 2)` thành `negative`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-022",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết nhánh `aspect_flags` khi 1 khía cạnh xuất hiện ở cả 2 mệnh đề trái dấu.",
    "question": "Xét chuỗi: `\"Great location! But noisy street, not clean.\"` (`L92–L117` của `baseline.py`). Giá trị cuối của `aspect_flags[\"location\"]`, `[\"noise\"]`, `[\"cleanliness\"]` và nhãn dự đoán 3 khía cạnh đó là gì?",
    "quickAnswer": "- Mệnh đề 1 (`Great location`): `n_pos=1, n_neg=0` -> `location = [T, T, F]` -> **`positive`**.\n- Mệnh đề 2 (`But` cắt xong -> `noisy street, not clean`): `n_neg=2` (`noisy`, `not clean`), `n_pos=0` -> `noise = [T, F, T]` -> **`negative`**; `cleanliness = [T, F, T]` -> **`negative`**!",
    "explanation": "Toán tử `|=` tích lũy cờ khen và cờ chê qua tất cả các mệnh đề có nhắc tới khía cạnh đó.",
    "projectLink": "src/baseline.py:L92-L117",
    "codeLocation": "src/baseline.py:L92-L117",
    "proofExample": "pos, neg, neg.",
    "followUpQuestions": [
      "Nếu chuỗi là `\"Nice bed, however Wi-Fi didn't work\"`, cả `bed` và `Wi-Fi` đều nằm chung dưới khía cạnh `amenities` trong `ASPECT_PATTERNS`. Kết quả `aspect_flags[\"amenities\"]` và nhãn của `amenities` là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu chuỗi là `\"Nice bed, however Wi-Fi didn't work\"`, cả `bed` và `Wi-Fi` đều nằm chung dưới khía cạnh `amenities` trong `ASPECT_PATTERNS`. Kết quả `aspect_flags[\"amenities\"]` và nhãn của `amenities` là gì?",
        "a": "Mệnh đề 1 bật `has_pos=True`; mệnh đề 2 bật `has_neg=True` -> `amenities = [T, T, T]` -> gán chính xác thành **`mixed`**!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `cleanliness` bị gán `positive` vì chứa chữ `\"clean\"` trong `\"not clean\"` (thực ra đã bị `NEG_RE.sub` tẩy trước ở L95!)."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-023",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `phan_tich_loi()` với 4 trường hợp chênh lệch.",
    "question": "Cho 1 review `\"R1\"` có trường `amenities`: ở `gt` là `\"positive\"`, ở `llm` là `\"not_mentioned\"`; trường `noise`: `gt=\"not_mentioned\"`, `llm=\"mixed\"`; trường `host`: `gt=\"mixed\"`, `llm=\"negative\"`; trường `safety`: cả 2 là `np.nan`. `phan_tich_loi()` (`src/evaluate.py:L150-L171`) sinh ra mấy dòng lỗi và nhãn `loai_loi` là gì?",
    "quickAnswer": "Hàm chuẩn hóa `NaN -> \"not_mentioned\"` nên `safety` trùng nhau (0 lỗi). Sinh ra **3 dòng lỗi**: `amenities` -> **`\"thieu\"`** (`doan == \"not_mentioned\"`); `noise` -> **`\"thua\"`** (`nhan == \"not_mentioned\"`); `host` -> **`\"sai_nhan\"`** (khác nhau và đều khác `not_mentioned`).",
    "explanation": "Ba phân loại hoàn toàn khớp logic thống kê 21 thiếu + 14 thừa + 11 sai nhãn trong báo cáo.",
    "projectLink": "src/evaluate.py:L155-L170",
    "codeLocation": "src/evaluate.py:L155-L170",
    "proofExample": "3 lỗi: thieu, thua, sai_nhan.",
    "followUpQuestions": [
      "Trong `L163`, `phan_tich_loi()` lặp qua danh sách 9 trường nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `L163`, `phan_tich_loi()` lặp qua danh sách 9 trường nào?",
        "a": "`[\"overall_sentiment\", \"language\", *aspect_cols]` (gồm 2 trường chung + 7 khía cạnh = 9 trường)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `gt=\"mixed\", llm=\"not_mentioned\"` là `\"sai_nhan\"` (code phân biệt rõ nếu `doan == \"not_mentioned\"` thì ưu tiên ghi `\"thieu\"`!)."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-024",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết các quy tắc trong `hau_kiem()` trên 3 mẫu review đặc biệt.",
    "question": "Cho 3 bản ghi LLM: A (`comments=\"Good\"`, 1 từ, `amenities=\"positive\"`, `location=\"positive\"`, `overall=\"positive\"`); B (`comments=\"\"`, 0 từ, 0 khía cạnh, `overall=\"positive\"`); C (`comments=\"Great!\", 1 từ`, 0 khía cạnh, `overall=\"positive\"`, `language=\"english\"`). Hàm `hau_kiem()` báo những lỗi nào?",
    "quickAnswer": "- **A** (`so_tu=1`, `so_kc=2 >= 2`): dính `ngan_nhung_nhieu_khia_canh` (+ có thể `khia_canh_khong_can_cu`).\n- **B** (`so_tu=0`, `overall=\"positive\" != \"mixed\"`): dính **`rong_nhung_co_nhan`**!\n- **C** (`language=\"english\"`, độ dài 7 != 2 ký tự và != \"und\"): dính **`ngon_ngu_sai_ma_iso`**!",
    "explanation": "Mỗi quy tắc bắt trúng 1 lỗi cấu trúc/nội tại khác nhau mà Pydantic không ngăn được hết.",
    "projectLink": "src/evaluate.py:L180-L188",
    "codeLocation": "src/evaluate.py:L180-L188",
    "proofExample": "A: ngan_nhung_nhieu_khia_canh; B: rong_nhung_co_nhan; C: ngon_ngu_sai_ma_iso.",
    "followUpQuestions": [
      "Hành động `tich_cuc_nhung_chi_bi_che` ở `L184` kiểm tra điều kiện gì?"
    ],
    "followUpQA": [
      {
        "q": "Hành động `tich_cuc_nhung_chi_bi_che` ở `L184` kiểm tra điều kiện gì?",
        "a": "`overall == \"positive\"`, đồng thời có ít nhất 1 khía cạnh `negative` NHƯNG không có bất kỳ khía cạnh nào `positive`!"
      }
    ],
    "commonMistakes": [
      "Tưởng rằng bản ghi B không gán khía cạnh nào thì không vi phạm `rong_nhung_co_nhan` (thực tế `overall_sentiment != \"mixed\"` cũng bị bắt!)."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-025",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_iqr_stats()` trên dãy số nhỏ `[100, 200, 300, 1000]`.",
    "question": "Cho chuỗi `s = pd.Series([100, 200, 300, 1000, np.nan])`. Kết quả tuple `(count, median, iqr, riqr)` trả về từ `_iqr_stats(s, digits=2)` là bao nhiêu?",
    "quickAnswer": "`dropna()` còn `[100, 200, 300, 1000]` -> `count = 4`. Nội suy tuyến tính: `Q1 = 175.0`, `Median = 250.0`, `Q3 = 475.0`, `IQR = 475 - 175 = 300.0`, `rIQR = 300 / 250 = 1.2`. Trả về `(4, 250.0, 300.0, 1.2)`!",
    "explanation": "Số phần tử `np.nan` ở cuối tự động bị loại ở dòng 71 nên `count` là 4 chứ không phải 5.",
    "projectLink": "src/kpi.py:L69-L84",
    "codeLocation": "src/kpi.py:L69-L84",
    "proofExample": "(4, 250.0, 300.0, 1.2)",
    "followUpQuestions": [
      "Nếu `s` chỉ có 1 phần tử bằng `0.0` (`pd.Series([0.0])`), `_iqr_stats(s)` trả về gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `s` chỉ có 1 phần tử bằng `0.0` (`pd.Series([0.0])`), `_iqr_stats(s)` trả về gì?",
        "a": "`(1, 0.0, 0.0, np.nan)` — vì `med > 0` là `False` nên `riqr` trả `np.nan` an toàn không chia 0!"
      }
    ],
    "commonMistakes": [
      "Tính nhầm `Q1 = 100` hay `Q3 = 1000`, hoặc quên loại `np.nan` ở `len()`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-026",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `compute_kpi_by_snapshot()` tại `idx = 0` (`t1`) vs `idx = 1` (`t2`).",
    "question": "Trong `compute_kpi_by_snapshot()` (`src/kpi.py:L324-L366`), ở dòng `t1` (`idx=0`), biến `review_velocity_n` và `review_velocity_mean` mang giá trị gì, và vì sao `rv_n` giữ được kiểu nguyên `<NA>` trong CSV?",
    "quickAnswer": "Tại `idx == 0`: nhánh `else` (`L335-L337`) gán `rv_n = pd.NA`, `rv_mean = np.nan`. Đến cuối hàm (`L364-L365`), cột `review_velocity_n` được ép `.astype(\"Int64\")` nên ở `t1` lưu trống `<NA>`, còn ở `t2, t3, t4` lưu số nguyên `1000, 1000, 999` (không bị biến thành `1000.0`!).",
    "explanation": "Khớp hoàn toàn với `data/processed/kpi_by_snapshot.csv`.",
    "projectLink": "src/kpi.py:L330-L366",
    "codeLocation": "src/kpi.py:L330-L366",
    "proofExample": "t1: <NA>, nan; t2..t4: Int64.",
    "followUpQuestions": [
      "Ở cột `ghost_count` tại `t3`, trong dữ liệu CDMX có 0 căn ghost trên `ghost_n = 1000`, giá trị lưu là `0` hay `<NA>`?"
    ],
    "followUpQA": [
      {
        "q": "Ở cột `ghost_count` tại `t3`, trong dữ liệu CDMX có 0 căn ghost trên `ghost_n = 1000`, giá trị lưu là `0` hay `<NA>`?",
        "a": "Là **`0`**! Vì `g_valid` không rỗng (`1000` căn), `int(g_valid.sum()) = 0`, khác với trường hợp `g_valid.empty` mới ra `<NA>`."
      }
    ],
    "commonMistakes": [
      "Gán `rv_n = 0` hay `np.nan` làm cột `review_velocity_n` thành `float64` (`1000.0`)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-027",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_sample_tag()` khi `valid_price` và `valid_ppg` bằng vs khác nhau.",
    "question": "Cho 2 dòng dữ liệu quận: Quận X (`valid_price_t4=50`, `valid_ppg_t4=50`, `total_listings=52`) và Quận Y (`valid_price_t4=50`, `valid_ppg_t4=48`, `total_listings=52`). Kết quả của `_sample_tag()` (`src/viz.py:L191-L195`) trên X và Y là gì?",
    "quickAnswer": "- Quận X (`vp == vg`): `\"n=50/52\"`;\n- Quận Y (`vp != vg`): `\"p=50, ppg=48/52\"`!",
    "explanation": "Thiết kế giúp minh bạch ngay trên chú thích bản đồ & biểu đồ cột ngang nếu có listing bị lỗi sức chứa.",
    "projectLink": "src/viz.py:L191-L195",
    "codeLocation": "src/viz.py:L191-L195",
    "proofExample": "X: n=50/52; Y: p=50, ppg=48/52",
    "followUpQuestions": [
      "Nếu tại mốc `t2`, `valid_price_t2` là `NaN`, `_sample_tag()` trả về chuỗi gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu tại mốc `t2`, `valid_price_t2` là `NaN`, `_sample_tag()` trả về chuỗi gì?",
        "a": "Do `pd.notna(...)` là `False` -> `vp = 0, vg = 0` -> trả `\"n=0/52\"` không lỗi!"
      }
    ],
    "commonMistakes": [
      "Hiển thị mỗi `n=50/52` làm mất thông tin thực chất chỉ có 48 căn tính được PPG."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-028",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_heatmap()` khi vẽ bảng `Ghost Rate` với `counts` và `nums`.",
    "question": "Ở `src/viz.py:L371`, `plot_review_ghost()` truyền vào `_heatmap()`: `mat` (`2.31`), `nums=gh_c` (`3`), `counts=gh_n` (`130`), `fmt=\".2f\"`. Chuỗi nhãn hiển thị chính xác bên trong ô `[A06, t4]` trên ảnh PNG là gì?",
    "quickAnswer": "Dòng 64 định dạng: `f\"{v:{fmt}}\\n({int(u)}/{int(c)})\"` -> in ra 2 dòng trong ô heatmap: **`2.31\\n(3/130)`**!",
    "explanation": "Còn ở ô `Occ30` không truyền `nums` (`nums=None`), biểu thức `pd.notna(u)` là `False` nên in `f\"{v:{fmt}}\\n(n={int(c)})\"` -> **`44.8\\n(n=129)`**!",
    "projectLink": "src/viz.py:L61-L66, L371",
    "codeLocation": "src/viz.py:L61-L66, L371",
    "proofExample": "2.31 (3/130) vs 44.8 (n=129).",
    "followUpQuestions": [
      "Trong `L67`, tại sao `sns.heatmap` phải truyền `fmt=\"\"` thay vì `fmt=\".2f\"` khi đã tạo sẵn bảng `annot` chuỗi?"
    ],
    "followUpQA": [
      {
        "q": "Trong `L67`, tại sao `sns.heatmap` phải truyền `fmt=\"\"` thay vì `fmt=\".2f\"` khi đã tạo sẵn bảng `annot` chuỗi?",
        "a": "Vì `annot` đã là DataFrame chứa văn bản (`\"2.31\\n(3/130)\"`); nếu truyền `fmt=\".2f\"`, Seaborn cố áp dụng định dạng số `.2f` lên chuỗi string gây `ValueError: Unknown format code \"f\" for object of type \"str\"`!"
      }
    ],
    "commonMistakes": [
      "Tưởng rằng bảng `annot` của Seaborn nhận các chuỗi có số thực chưa ép `int(u)`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-029",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "Python",
      "Architecture"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `run_step()` khi bước script rỗng 0 byte.",
    "question": "Trong `run_pipeline.py:L26-L27`, nếu một bạn vô tình tạo file `src/viz.py` trống (0 byte) rồi chạy `python run_pipeline.py`, chuyện gì xảy ra ở bước 1..7 và bước 8?",
    "quickAnswer": "Các bước 1–7 (`download` đến `kpi`) vẫn chạy bình thường. Tới bước 8 (`Visualization`), `run_step()` kiểm tra `if script.stat().st_size == 0:` -> ném `RuntimeError(\"Step script is empty (not implemented)\")` -> `main()` bắt lỗi và thoát `sys.exit(1)`.",
    "explanation": "Giúp phân biệt sớm file stub chưa viết code với file chạy thật.",
    "projectLink": "run_pipeline.py:L26-L27, L56-L58",
    "codeLocation": "run_pipeline.py:L26-L27, L56-L58",
    "proofExample": "Step 1..7 OK -> Step 8 FATAL RuntimeError.",
    "followUpQuestions": [
      "Nếu dùng `subprocess.run(cmd, check=True)` mà quên `check=True`, khi `src/qa.py` gặp lỗi và thoát bằng `sys.exit(1)`, `run_pipeline.py` có dừng lại không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu dùng `subprocess.run(cmd, check=True)` mà quên `check=True`, khi `src/qa.py` gặp lỗi và thoát bằng `sys.exit(1)`, `run_pipeline.py` có dừng lại không?",
        "a": "KHÔNG! Thiếu `check=True` sẽ khiến `subprocess.run()` trả về đối tượng `CompletedProcess(returncode=1)` mà KHÔNG ném `CalledProcessError`, nên vòng lặp vẫn tiếp tục chạy sang `llm.py` và `kpi.py`!"
      }
    ],
    "commonMistakes": [
      "Tưởng `run_pipeline.py` kiểm tra toàn bộ 8 file trước khi chạy bước 1 (thực tế kiểm từng bước ngay trước khi chạy bước đó!)."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vx-030",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết lỗi khi quên `set_index(\"id\")` trước phép trừ 2 snapshot.",
    "question": "Giả sử trong `_load_snapshots()`, ta bỏ `.set_index(\"id\")`: `df_prev` có `id=[\"A\", \"B\"]` với `nr=[10, 20]`, còn `df_curr` bị đảo thứ tự `id=[\"B\", \"A\"]` với `nr=[25, 12]`. Phép trừ `diff = nr_curr - nr_prev` ra kết quả gì?",
    "quickAnswer": "Khi không `set_index(\"id\")`, cả hai bảng đều mang index ngầm `0, 1`! Phép trừ `nr_curr - nr_prev` sẽ lấy `25 - 10 = 15` (cho B trừ nhầm bằng A!) và `12 - 20 = -8` (`diff < 0` làm A thành `NaN`!) — sai hoàn toàn dữ liệu!",
    "explanation": "Chứng minh bằng số cụ thể giá trị cốt lõi của `set_index(\"id\")` + Index Alignment.",
    "projectLink": "src/kpi.py:L110, L131",
    "codeLocation": "src/kpi.py:L110, L131",
    "proofExample": "[15, -8] (SAI LỆCH HOÀN TOÀN!).",
    "followUpQuestions": [
      "Với ví dụ trên, nếu CÓ `set_index(\"id\")`, kết quả `diff` theo index `[\"A\", \"B\"]` bằng bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Với ví dụ trên, nếu CÓ `set_index(\"id\")`, kết quả `diff` theo index `[\"A\", \"B\"]` bằng bao nhiêu?",
        "a": "`A: 12 - 10 = 2`, `B: 25 - 20 = 5` — chính xác tuyệt đối bất kể thứ tự hàng!"
      }
    ],
    "commonMistakes": [
      "Cho rằng các bản snapshot của cùng 1 nhóm lúc nào cũng có sẵn thứ tự hàng giống hệt nhau nên không cần `set_index(\"id\")`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-031",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết kết quả `before_ok` và `after_ok` trong `RULE_PRICE_PARSE` trên 5 ô.",
    "question": "Cột `price` có 5 dòng: `[\"$1,200.00\", \"850\", \"$0\", \"bad\", None]`. Sau dòng 92–93 của `src/qa.py`, giá trị `raw_numeric`, `price_numeric`, `before_ok`, `after_ok` và `rows_parsed` (trong `qa_report.csv` cho `RULE_PRICE_PARSE`) bằng mấy?",
    "quickAnswer": "`raw_numeric` = `[NaN, 850.0, NaN, NaN, NaN]` (`before_ok = 1`). `price_numeric` = `[1200.0, 850.0, 0.0, NaN, NaN]` (`after_ok = 3`). Do đó trong `qa_report.csv`: `rows_affected` (bằng `after_ok`) = **`3`** (hay tỷ lệ parse tăng từ `20.0%` -> `60.0%`)!",
    "explanation": "Lưu ý `\"$0\"` vẫn parse thành số `0.0` ở quy tắc 2 (`PRICE_PARSE`), rồi mới bị quy tắc 3 (`MISSING_PRICE`) gắn cờ thiếu/<=0.",
    "projectLink": "src/qa.py:L91-L108",
    "codeLocation": "src/qa.py:L91-L108",
    "proofExample": "before_ok=1, after_ok=3.",
    "followUpQuestions": [
      "Chuỗi `\"-450\"` có tính vào `after_ok` của `RULE_PRICE_PARSE` không và bị bước nào chặn lại?"
    ],
    "followUpQA": [
      {
        "q": "Chuỗi `\"-450\"` có tính vào `after_ok` của `RULE_PRICE_PARSE` không và bị bước nào chặn lại?",
        "a": "Có trong `after_ok` (vì Regex giữ dấu `-` tạo `-450.0`), và bị chặn ngay sau đó ở `RULE_MISSING_PRICE` (`price_numeric <= 0`)."
      }
    ],
    "commonMistakes": [
      "Tưởng `\"$0\"` không tính vào `after_ok` ở `RULE_PRICE_PARSE`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-032",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết xử lý lỗi khi cột `accommodates` có giá trị lẻ `2.5` hoặc `0`.",
    "question": "Trong `src/qa.py:L186-L190`, xét 2 đầu vào: Case 1 `accommodates = [2, 0, np.nan]`; Case 2 `accommodates = [2.5, 4]`. Kết quả sau dòng 189 (`df[\"accommodates_clean\"] = acc_numeric.where(~invalid_acc_mask, np.nan).astype(\"Int64\")`) là gì?",
    "quickAnswer": "- Case 1: `invalid_acc_mask = [F, T, T]` -> chuyển thành `[2.0, NaN, NaN]` -> ép `\"Int64\"` thành **`[2, <NA>, <NA>]`** (không lỗi).\n- Case 2: vì `RULE_ACCOMMODATES_BOUNDS` hiện tại KHÔNG có điều kiện `(acc_numeric % 1) != 0` như `RULE_REVIEWS_BOUNDS`, `2.5` không bị mask -> `.astype(\"Int64\")` sẽ văng **`TypeError: cannot safely cast non-equivalent float64 to int64`**!",
    "explanation": "Phát hiện lỗi biên code thực tế chuẩn xác khi kiểm toán `src/qa.py:L188-L189`!",
    "projectLink": "src/qa.py:L186-L190",
    "codeLocation": "src/qa.py:L186-L190",
    "proofExample": "Case 1 -> [2, <NA>, <NA>]; Case 2 -> TypeError.",
    "followUpQuestions": [
      "Sửa dòng 187 `src/qa.py` thế nào để Case 2 không bị crash và gắn cờ `2.5` thành `<NA>`?"
    ],
    "followUpQA": [
      {
        "q": "Sửa dòng 187 `src/qa.py` thế nào để Case 2 không bị crash và gắn cờ `2.5` thành `<NA>`?",
        "a": "Thêm điều kiện `| ((acc_numeric % 1) != 0)` giống hệt cách `RULE_REVIEWS_BOUNDS` đã làm ở `L254`!"
      }
    ],
    "commonMistakes": [
      "Tưởng mọi quy tắc integer trong `qa.py` đều đã kiểm tra phần dư `% 1 != 0`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-033",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết công thức `compute_occupancy_kpis()` với 3 căn hộ mẫu.",
    "question": "Tại `t4`, cho 3 căn: Căn A (`a30=10, a90=40, ghost=0`), Căn B (`a30=0, a90=0, ghost=1`), Căn C (`a30=15, a90=45, ghost=<NA>`). Khi `exclude_ghost=True`, tính kết quả `availability_31-90_t4` và `occ_1-30_t4` của cả 3 căn?",
    "quickAnswer": "`availability_31-90_t4`: A=`30`, B=`0`, C=`30` (vì dòng 193 tính trước theo `valid_avail`!). Nhưng sang `occ_1-30_t4` (dòng 197 lọc `(g == 0).fillna(False)`): chỉ có **A** hợp lệ (`20/30 = 0.6667`), còn cả **B (`ghost=1`) và C (`ghost=<NA>`) đều nhận `np.nan`**!",
    "explanation": "Giải thích chính xác sự chênh lệch giữa `a31-90` (tính theo valid_avail) và `occ_*` (lọc thêm ghost & `<NA>`).",
    "projectLink": "src/kpi.py:L191-L208",
    "codeLocation": "src/kpi.py:L191-L208",
    "proofExample": "A: a31_90=30, occ=0.6667; B,C: occ=nan.",
    "followUpQuestions": [
      "Khi tính trung bình `occ_1-30_t4_mean` của nhóm gồm 3 căn A, B, C trên, mẫu số `occ_t4_n` bằng mấy và `occ_1-30_t4_mean` bằng mấy?"
    ],
    "followUpQA": [
      {
        "q": "Khi tính trung bình `occ_1-30_t4_mean` của nhóm gồm 3 căn A, B, C trên, mẫu số `occ_t4_n` bằng mấy và `occ_1-30_t4_mean` bằng mấy?",
        "a": "`occ_t4_n = 1` (chỉ đếm A khác NaN) và `occ_1-30_t4_mean = 0.6667`."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng khi `ghost=1` thì `availability_31-90_t4` cũng nhận `<NA>`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-034",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết phép xếp hạng `rank()` khi có 2 quận trùng giá và quận bị `NaN`.",
    "question": "Ở một snapshot giả lập chỉ có 4 quận với `mean_price = [2000, 3000, 3000, np.nan]`. Kết quả của `s.rank(ascending=False, method=\"min\").astype(\"Int64\")` (`src/kpi.py:L454`) cho 4 quận là gì?",
    "quickAnswer": "Xếp giảm dần (`ascending=False`): giá `3000` (cả quận 2 và 3) đồng hạng `#1`; quận giá `2000` nhảy xuống hạng `#3`; quận `np.nan` giữ nguyên `<NA>`. Kết quả: **`[3, 1, 1, <NA>]`**!",
    "explanation": "Kiểm chứng đúng cả cơ chế đồng hạng `min` lẫn bảo toàn `<NA>` của `Int64`.",
    "projectLink": "src/kpi.py:L454-L455",
    "codeLocation": "src/kpi.py:L454-L455",
    "proofExample": "[3, 1, 1, <NA>]",
    "followUpQuestions": [
      "Nếu quận thứ 4 (trước đó là `np.nan`) bị gán bằng `0.0` trước khi `rank()`, thứ hạng của 4 quận thành gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu quận thứ 4 (trước đó là `np.nan`) bị gán bằng `0.0` trước khi `rank()`, thứ hạng của 4 quận thành gì?",
        "a": "Thành `[3, 1, 1, 4]`."
      }
    ],
    "commonMistakes": [
      "Đoán thứ hạng cho ra `[2, 1, 1, <NA>]` (đó là `method=\"dense\"`, không phải `\"min\"`!) hoặc `[2.0, 1.5, 1.5, NaN]`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-035",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `f1()` (Micro F1) vs `ti_le_dung_nhan_khia_canh()` trên 1 review.",
    "question": "Cho đúng 1 review duy nhất trong `ground_truth`: 7 khía cạnh thật là `[\"positive\", \"not_mentioned\", \"not_mentioned\", \"not_mentioned\", \"not_mentioned\", \"not_mentioned\", \"not_mentioned\"]` (chỉ có `location=positive`). Mô hình đoán đúng `location=\"positive\"` và đoán nhầm `noise=\"positive\"`, 5 cái còn lại `\"not_mentioned\"`. Tính kết quả `ti_le_dung_nhan_khia_canh()` và `f1(..., \"aspects\")`?",
    "quickAnswer": "- `ti_le_dung_nhan_khia_canh()`: đúng **6 / 7 = `0.8571`** (đúng location và 5 ô not_mentioned).\n- `f1(..., \"aspects\")`: tập thật `t = {\"location\"}`, tập đoán `p = {\"location\", \"noise\"}` -> `TP=1, FP=1, FN=0` -> `2*1 / (2+1+0) = 2/3 = 0.6667`!",
    "explanation": "Minh họa trực quan lý do `nhan_khia_canh_accuracy` (85.7%) luôn trông cao hơn `khia_canh_f1` (66.7%) khi nhiều ô là `not_mentioned`.",
    "projectLink": "src/evaluate.py:L101-L126",
    "codeLocation": "src/evaluate.py:L101-L126",
    "proofExample": "Acc=0.8571 vs Micro-F1=0.6667.",
    "followUpQuestions": [
      "Trong cùng ví dụ trên, nếu mô hình đoán cả 7 ô đều là `\"not_mentioned\"`, `ti_le_dung_nhan_khia_canh()` và `f1(..., \"aspects\")` bằng mấy?"
    ],
    "followUpQA": [
      {
        "q": "Trong cùng ví dụ trên, nếu mô hình đoán cả 7 ô đều là `\"not_mentioned\"`, `ti_le_dung_nhan_khia_canh()` và `f1(..., \"aspects\")` bằng mấy?",
        "a": "Accuracy = **6/7 = 0.8571** (vẫn rất cao giả tạo!), nhưng Mention F1 rơi về **`0.0`** (`TP = 0`)!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng hai chỉ số khía cạnh đều phải ra cùng một con số `0.857` hoặc `0.667`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-036",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `doc_bang()` và tác động `drop_duplicates(\"id\")`.",
    "question": "Trong `src/evaluate.py:L69`, `doc_bang()` thực hiện `return df.drop_duplicates(\"id\").set_index(\"id\")`. Nếu một file `reviews_sentiment.csv` bị lỗi ghi trùng 2 dòng cho cùng `id=\"500\"` (dòng 1 là `\"positive\"`, dòng 2 là `\"negative\"`), `doc_bang()` giữ dòng nào?",
    "quickAnswer": "`drop_duplicates(\"id\")` có mặc định `keep=\"first\"` nên giữ dòng đầu tiên (`\"positive\"`), loại dòng thứ hai, rồi gán `\"500\"` làm index duy nhất.",
    "explanation": "Ngăn lỗi trùng khóa ở bước `gom_du_doan()` và `phan_tich_loi()` (`r = llm_norm.loc[ma]` nếu không unique sẽ trả DataFrame thay vì Series gây lỗi!).",
    "projectLink": "src/evaluate.py:L69, L162",
    "codeLocation": "src/evaluate.py:L69, L162",
    "proofExample": "Giữ dòng đầu (\"positive\").",
    "followUpQuestions": [
      "Còn trong `src/llm.py:L110` (`load_cache`), nếu cùng `r_id` xuất hiện 2 lần ở dòng 10 và dòng 800 trong `llm_cache.jsonl`, dict `cache` giữ bản ghi nào?"
    ],
    "followUpQA": [
      {
        "q": "Còn trong `src/llm.py:L110` (`load_cache`), nếu cùng `r_id` xuất hiện 2 lần ở dòng 10 và dòng 800 trong `llm_cache.jsonl`, dict `cache` giữ bản ghi nào?",
        "a": "Dict gán `cache[r_id] = rec` ghi đè theo vòng lặp từ trên xuống dưới -> giữ **bản ghi sau cùng** (dòng 800)!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `drop_duplicates(\"id\")` giữ dòng cuối cùng."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-037",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization",
      "NumPy"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `_mat()` khi truyền `scale=100.0` và cột `headers` mới.",
    "question": "Cho DataFrame `area_s` (8 dòng, index `0..7`), gọi `_mat(area_s, \"analysis_area\", [\"ghost_rate_t1\", \"ghost_rate_t4\"], [\"t1\", \"t4\"], scale=100.0)` (`src/viz.py:L39-L44`). Nếu `ghost_rate_t1` của `A01` là `0.0077` và của `A02` là `np.nan`, ma trận kết quả có shape, index và giá trị cột `\"t1\"` thế nào?",
    "quickAnswer": "Shape `(8, 2)`, index là `analysis_area` (`A01..A08`), tên cột mới là `[\"t1\", \"t4\"]`, dtype `float64`; giá trị tại `[\"A01\", \"t1\"]` là **`0.77`** (`0.0077 × 100.0`), tại `[\"A02\", \"t1\"]` vẫn giữ **`np.nan`** (`np.nan * 100.0 = np.nan`).",
    "explanation": "Chuẩn hóa sạch sẵn sàng đưa thẳng vào `_heatmap()`.",
    "projectLink": "src/viz.py:L39-L44",
    "codeLocation": "src/viz.py:L39-L44",
    "proofExample": "Shape (8, 2); A01=0.77; A02=nan.",
    "followUpQuestions": [
      "Nếu trong list `cols` có một tên cột bị gõ nhầm sai chính tả `\"ghost_t1_ty_le\"`, hàm `_mat()` phản ứng thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu trong list `cols` có một tên cột bị gõ nhầm sai chính tả `\"ghost_t1_ty_le\"`, hàm `_mat()` phản ứng thế nào?",
        "a": "Nhờ biểu thức walrus ở `L40`: `if missing := [c for c in cols if c not in df.columns]: raise ValueError(...)` — dừng ngay báo chính xác tên cột bị thiếu!"
      }
    ],
    "commonMistakes": [
      "Tưởng rằng nhân `scale=100.0` làm biến `NaN` thành lỗi hoặc số `0`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-038",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết cách đặt chú thích lưới 3 cột trong `plot_ppg_neighbourhood()`.",
    "question": "Trong `src/viz.py:L287-L292`, có `len(nb_s) = 15` quận và `ncols = 3`. Tính giá trị `nrows` và cặp `(col_i, row_i)` cho quận thứ `idx = 0`, `idx = 4`, `idx = 5` và `idx = 14`?",
    "quickAnswer": "`nrows = ceil(15 / 3) = 5`.\n- `idx=0`: `col_i=0, row_i=0` (Cột 1, Hàng 1).\n- `idx=4`: `col_i=0, row_i=4` (Cột 1, Hàng 5).\n- `idx=5`: `col_i=1, row_i=0` (Cột 2, Hàng 1 -> xếp theo **cột dọc từ trên xuống**!).\n- `idx=14`: `col_i=2, row_i=4` (Cột 3, Hàng 5).",
    "explanation": "Cách dùng `idx // nrows` và `idx % nrows` sắp xếp bảng chú thích theo cột (column-major) giúp người đọc quét `#1..#5`, `#6..#10`, `#11..#15` từ trên xuống từng cột rất thuận mắt!",
    "projectLink": "src/viz.py:L287-L292",
    "codeLocation": "src/viz.py:L287-L292",
    "proofExample": "nrows=5; idx=5 -> col=1, row=0.",
    "followUpQuestions": [
      "Với `row_i = 0..4`, biểu thức tọa độ `y = 0.69 - row_i * 0.155` tại `row_i = 4` cho `y` bằng bao nhiêu (có tràn dưới 0 không)?"
    ],
    "followUpQA": [
      {
        "q": "Với `row_i = 0..4`, biểu thức tọa độ `y = 0.69 - row_i * 0.155` tại `row_i = 4` cho `y` bằng bao nhiêu (có tràn dưới 0 không)?",
        "a": "`0.69 - 4 * 0.155 = 0.69 - 0.62 = 0.07` -> nằm gọn bên trong khoảng `[0, 1]` của trục `ax_leg`!"
      }
    ],
    "commonMistakes": [
      "Tưởng công thức viết theo hàng ngang (`row_i = idx // ncols`, `col_i = idx % ncols`)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-039",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "trace",
    "topics": [
      "Architecture",
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết luồng `reviews_df` và `aspect_keys` khi chuyển từ YAML -> `llm.py` -> `reviews_sentiment.csv`.",
    "question": "Giả sử trong YAML cấu hình `llm.aspects: [location, noise, cleanliness]` (chỉ 3 khía cạnh). File `data/processed/reviews_sentiment.csv` do `src/llm.py` xuất ra có tổng cộng bao nhiêu cột, và `src/evaluate.py` lấy danh sách khía cạnh từ đâu nếu KHÔNG đọc config?",
    "quickAnswer": "`reviews_sentiment.csv` sẽ có `8 cột cố định (id, listing_id, date, reviewer_id, reviewer_name, comments, language, overall_sentiment) + 3 cột aspect = 11 cột`! Lưu ý: ở `src/evaluate.py:L254`, `main()` đọc `aspects = cfg.get(\"llm\", {}).get(\"aspects\") or ASPECTS` nên nếu truyền cùng file YAML cũng tự động điều chỉnh về đúng 3 khía cạnh đó!",
    "explanation": "Sự đồng bộ YAML xuyên suốt giúp thay đổi số lượng khía cạnh không gây vỡ pipeline.",
    "projectLink": "src/llm.py:L141, L161-L174; src/evaluate.py:L254",
    "codeLocation": "src/llm.py:L141, L161-L174; src/evaluate.py:L254",
    "proofExample": "11 cột.",
    "followUpQuestions": [
      "Vì sao ở dòng 141 `src/llm.py` không lấy `AspectSentiment.model_fields.keys()` trực tiếp khi cấu hình thay đổi trong `main()`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao ở dòng 141 `src/llm.py` không lấy `AspectSentiment.model_fields.keys()` trực tiếp khi cấu hình thay đổi trong `main()`?",
        "a": "Vì `main()` truyền rõ `aspect_keys=aspects` đọc từ YAML (`L442`); còn `AspectSentiment.model_fields.keys()` ở `L141` chỉ là fallback khi gọi hàm trực tiếp với `aspect_keys=None`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `reviews_sentiment.csv` luôn cứng 15 cột bất kể cấu hình YAML."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-040",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết slicing `.loc` vs `.iloc` trên index số nguyên rời rạc.",
    "question": "Cho `s = pd.Series([10, 20, 30, 40], index=[0, 2, 4, 6])`. Kết quả của `len(s.loc[0:2])` và `len(s.iloc[0:2])` lần lượt là gì?",
    "quickAnswer": "Cả hai đều có len = **2**, nhưng giá trị KHÁC HẲN NHAU: `s.loc[0:2]` lấy nhãn từ `0` đến `2` gồm `[10, 20]` (lấy cả nhãn 2); còn `s.iloc[0:2]` lấy vị trí `0, 1` cũng tình cờ là `[10, 20]` — NHƯNG thử với `s.loc[0:4]` trả **`[10, 20, 30]` (len 3)** trong khi `s.iloc[0:4]` trả **cả 4 phần tử `[10, 20, 30, 40]` (len 4)**!",
    "explanation": "Lệch 1 phần tử trên index không liên tục là lỗi thường gặp nhất khi viết slice pandas.",
    "projectLink": "Bài 4",
    "codeLocation": "Bài 4",
    "proofExample": "loc[0:4]->3; iloc[0:4]->4.",
    "followUpQuestions": [
      "Nếu gọi `s.loc[1:3]` trên index `[0, 2, 4, 6]` tăng dần (dù nhãn `1` và `3` không tồn tại), pandas trả về gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu gọi `s.loc[1:3]` trên index `[0, 2, 4, 6]` tăng dần (dù nhãn `1` và `3` không tồn tại), pandas trả về gì?",
        "a": "Với index đã sắp xếp tăng dần, `.loc[1:3]` lấy tất cả nhãn nằm giữa 1 và 3 -> trả về `[20]` (nhãn `2`)!"
      }
    ],
    "commonMistakes": [
      "Tưởng `.loc[0:4]` cũng trả về 4 phần tử giống `.iloc[0:4]`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vx-041",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `Series.map(dict)` khi thiếu khóa trong dict.",
    "question": "Cho `s = pd.Series([\"positive\", \"mixed\", \"UNKNOWN\"])` và `m = {\"positive\": 0.0, \"mixed\": 1.0}`. Kết quả của `s.map(m)` vs `s.replace(m)` khác nhau thế nào?",
    "quickAnswer": "`s.map(m)` trả về `[0.0, 1.0, np.nan]` (kiểu `float64`, biến `\"UNKNOWN\"` thành `NaN` để `.mean()` bỏ qua an toàn); còn `s.replace(m)` trả về `[0.0, 1.0, \"UNKNOWN\"]` (kiểu `object` gây `TypeError` khi gọi `.mean()`!).",
    "explanation": "Giải thích vì sao `src/kpi.py:L418` chọn `.map(COMPLAINT_SCORE_MAP)`.",
    "projectLink": "src/kpi.py:L418",
    "codeLocation": "src/kpi.py:L418",
    "proofExample": "map->float64+NaN; replace->object+str.",
    "followUpQuestions": [
      "Khi truyền thêm `.fillna(-1)` sau `s.map(m)`, giá trị của `\"UNKNOWN\"` thành gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi truyền thêm `.fillna(-1)` sau `s.map(m)`, giá trị của `\"UNKNOWN\"` thành gì?",
        "a": "Thành `-1.0`."
      }
    ],
    "commonMistakes": [
      "Dùng `.replace()` thay cho `.map()` khi ánh xạ nhãn sang điểm số."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-042",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "NumPy"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết Broadcasting trừ vector trung bình hàng trên ma trận 2D.",
    "question": "Cho `M = np.array([[10, 20, 30], [40, 50, 60]])` shape `(2, 3)` và `row_means = M.mean(axis=1)` = `[20., 50.]` shape `(2,)`. Chuyện gì xảy ra nếu viết `M - row_means` so với `M - M.mean(axis=1, keepdims=True)`?",
    "quickAnswer": "`M - row_means` (`(2, 3) - (2,)`) NÉM NGAY **`ValueError: operands could not be broadcast together with shapes (2,3) (2,)`**! Còn `M - M.mean(axis=1, keepdims=True)` (`(2, 3) - (2, 1)`) chạy đúng, trả về `[[-10, 0, 10], [-10, 0, 10]]`.",
    "explanation": "Khẳng định quy tắc so khớp Broadcasting từ chiều ngoài cùng bên phải.",
    "projectLink": "Bài 3",
    "codeLocation": "Bài 3",
    "proofExample": "ValueError vs [[-10,0,10],[-10,0,10]].",
    "followUpQuestions": [
      "Còn nếu tính trung bình theo cột `col_means = M.mean(axis=0)` shape `(3,)`, phép `M - col_means` có lỗi không?"
    ],
    "followUpQA": [
      {
        "q": "Còn nếu tính trung bình theo cột `col_means = M.mean(axis=0)` shape `(3,)`, phép `M - col_means` có lỗi không?",
        "a": "KHÔNG lỗi! Vì `(2, 3)` và `(3,)` khớp ở chiều cuối bên phải (`3 == 3`) nên trừ theo từng cột thành công ngay!"
      }
    ],
    "commonMistakes": [
      "Tưởng chiều `2` bên trái của `(2, 3)` tự khớp với `(2,)`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vx-043",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "NumPy"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `np.where` với chia 0 vs `Series.where`.",
    "question": "Cho `x = pd.Series([10.0, 0.0, 5.0])`. Khi chạy `np.where(x > 0, 100.0 / x, np.nan)` vs `(100.0 / x.where(x > 0))`, đầu ra và cảnh báo khác nhau thế nào?",
    "quickAnswer": "Giá trị mảng giống nhau `[10.0, nan, 20.0]`, NHƯNG `np.where(x > 0, 100.0 / x, np.nan)` phát ra `RuntimeWarning` hoặc tính ra `inf` trước rồi mới thay (tùy backend Series/ndarray: trên `Series`, `100.0 / x` tính trước tại `0.0` ra `inf` ở vị trí giữa!); còn `x.where(x > 0)` đổi `0.0 -> NaN` TRƯỚC khi chia nên hoàn toàn sạch không sinh `inf`.",
    "explanation": "Kỹ thuật viết an toàn giống `src/kpi.py:L235`.",
    "projectLink": "src/kpi.py:L235",
    "codeLocation": "src/kpi.py:L235",
    "proofExample": "100/x tinh truoc -> inf warning.",
    "followUpQuestions": [
      "Nếu viết `np.where(x != 0, 100 / x, 0)` với mảng NumPy `x = np.array([10, 0])`, có cảnh báo gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu viết `np.where(x != 0, 100 / x, 0)` với mảng NumPy `x = np.array([10, 0])`, có cảnh báo gì?",
        "a": "In `RuntimeWarning: divide by zero encountered in divide` (nhưng phần tử kết quả thứ 2 vẫn được gán `0`)."
      }
    ],
    "commonMistakes": [
      "Tin rằng `np.where(x != 0, 1/x, 0)` không bao giờ thực hiện phép chia `1/0`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-044",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "trace",
    "topics": [
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết lỗi dấu phẩy thập phân châu Âu trên `r\"[^\\d.-]\"`.",
    "question": "Cho chuỗi giá `\"€ 1.450,75\"`. Nếu chạy hàm làm sạch giá của `src/qa.py:L93`: `pd.to_numeric(s.str.replace(r\"[^\\d.-]\", \"\", regex=True), errors=\"coerce\")`, kết quả số thực nhận được là bao nhiêu?",
    "quickAnswer": "Regex xóa `\"€\"`, `\" \"`, và dấu `\",\"`, giữ lại đúng `\"1.45075\"` -> `pd.to_numeric` trả về **`1.45075`** (tức ~1.45 EUR thay vì 1,450.75 EUR — **sai nhỏ đi 1.000 lần!**).",
    "explanation": "Minh họa trực quan lý do cần kiểm tra chuẩn thập phân trước khi mang code sang dữ liệu châu Âu.",
    "projectLink": "src/qa.py:L93",
    "codeLocation": "src/qa.py:L93",
    "proofExample": "1.45075 (sai 1000x!).",
    "followUpQuestions": [
      "Còn nếu giá châu Âu là `\"€ 450,75\"` (không có dấu chấm hàng nghìn), kết quả là gì?"
    ],
    "followUpQA": [
      {
        "q": "Còn nếu giá châu Âu là `\"€ 450,75\"` (không có dấu chấm hàng nghìn), kết quả là gì?",
        "a": "Xóa dấu phẩy thành `\"45075\"` -> thành **`45075.0`** (sai TĂNG gấp 100 lần!!)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `to_numeric` sẽ báo `NaN` với chuỗi châu Âu (thực ra nó ra số thực sai lệch cực nguy hiểm vì chỉ còn lại đúng 1 dấu chấm!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-045",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "trace",
    "topics": [
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `BENIGN_RE` & `NEG_RE` trên câu review song ngữ Tây Ban Nha.",
    "question": "Xét review tiếng Tây Ban Nha: `\"¡Excelente ubicación! No tuvimos ningún problema, pero el baño estaba sucio.\"` Khi qua `predict_review_regex()` (`src/baseline.py:L84-L118`), cho biết giá trị của `language`, `overall_sentiment`, `location`, và `cleanliness`?",
    "quickAnswer": "1. `detect_language` thấy dấu `¡` và `ubicación` -> **`\"es\"`**.\n2. `CLAUSE_RE` tách tại `!`, `,`, `pero` thành 3 vế: `\"Excelente ubicación\"` (`POS_RE`: `\"Excelente\"`, `location` -> `positive`); `\"No tuvimos ningún problema\"` (`BENIGN_RE` xóa sạch cả cụm! `n_neg=0, n_pos=0`); `\"el baño estaba sucio\"` (`ASPECT_PATTERNS[\"amenities\"]` thấy `\"baño\"`, `cleanliness` thấy `\"sucio\"` + `NEG_RE` thấy `\"sucio\"` -> `n_neg=1` -> `cleanliness=\"negative\"`, `amenities=\"negative\"`).\n3. Tổng `pos=1, neg=1` -> `overall_sentiment = \"mixed\"`!",
    "explanation": "Truy vết hoàn hảo khả năng đa ngôn ngữ Tây Ban Nha được thiết kế sẵn trong `src/baseline.py`.",
    "projectLink": "src/baseline.py:L23-L118",
    "codeLocation": "src/baseline.py:L23-L118",
    "proofExample": "es, mixed, location=pos, cleanliness=neg.",
    "followUpQuestions": [
      "Tại sao cụm `\"ningún problema\"` không bị `NEG_RE` đếm là tiêu cực?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao cụm `\"ningún problema\"` không bị `NEG_RE` đếm là tiêu cực?",
        "a": "Vì ở `L93`, `BENIGN_RE.sub(\" \", clause)` chạy TRƯỚC `NEG_RE` và xóa cụm `\"No tuvimos ningún problema\"` (`L39`) thành khoảng trắng!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `baseline.py` chỉ xử lý được tiếng Anh."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-046",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "trace",
    "topics": [
      "Datetime",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hiệu Timedelta `.dt.days` khi có `NaT` và thời gian có giờ.",
    "question": "Cho `snap = pd.to_datetime(\"2025-09-27\")` và `last_rev = pd.to_datetime([\"2025-06-29\", \"2025-06-28\", \"invalid\"], errors=\"coerce\")`. Kết quả biểu thức `(snap - last_rev).dt.days > 90` cho 3 phần tử là gì?",
    "quickAnswer": "Hiệu ngày: `[90, 91, NaT]` (`2025-09-27 - 2025-06-29` = đúng `90` ngày; `2025-06-28` = `91` ngày). So sánh ngặt `> 90` cho **`[False, True, False]`** (phần tử `NaT` có `.dt.days = NaN`, so `NaN > 90` cho `False` — và được `has_rev_date` trong `kpi.py:L161` loại riêng bằng `<NA>`!).",
    "explanation": "Kiểm tra chính xác ranh giới biên `90` vs `91` ngày.",
    "projectLink": "src/kpi.py:L161-L164",
    "codeLocation": "src/kpi.py:L161-L164",
    "proofExample": "[False, True, False]",
    "followUpQuestions": [
      "Nếu `last_rev[0]` là `\"2025-06-29 23:00:00\"` (cách mốc 0h00 ngày 27/09 đúng `89 ngày 1 giờ`), `.dt.days` trả về `89` hay `90`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `last_rev[0]` là `\"2025-06-29 23:00:00\"` (cách mốc 0h00 ngày 27/09 đúng `89 ngày 1 giờ`), `.dt.days` trả về `89` hay `90`?",
        "a": "Trả về **`89`** (do `.dt.days` lấy phần nguyên sàn)!"
      }
    ],
    "commonMistakes": [
      "Tưởng đúng 90 ngày cũng tính là vượt quá `stale_days = 90` (toán tử là `>` chứ không phải `>=`)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-047",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "SQL"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết kết quả 3 câu SQL trên bảng có giá trị `NULL`.",
    "question": "Bảng `t` có 4 dòng `price`: `[100, 0, NULL, 200]`. Kết quả của 3 truy vấn SQL: (1) `SELECT COUNT(*) FROM t`, (2) `SELECT COUNT(price) FROM t`, (3) `SELECT AVG(price) FROM t` lần lượt bằng mấy?",
    "quickAnswer": "(1) `COUNT(*) = 4` (đếm mọi dòng); (2) `COUNT(price) = 3` (bỏ dòng `NULL`, giữ dòng `0`); (3) `AVG(price) = (100 + 0 + 200) / 3 = 100.0` (chia cho 3 dòng không null)!",
    "explanation": "Giống với pandas: `len(df) = 4`, `df[\"price\"].count() = 3`, `df[\"price\"].mean() = 100.0`.",
    "projectLink": "Bài 6",
    "codeLocation": "Bài 6",
    "proofExample": "4, 3, 100.0.",
    "followUpQuestions": [
      "Kết quả của `SELECT COUNT(*) FROM t WHERE price != 0` bằng mấy?"
    ],
    "followUpQA": [
      {
        "q": "Kết quả của `SELECT COUNT(*) FROM t WHERE price != 0` bằng mấy?",
        "a": "Bằng **`2`** (`100` và `200`; vì `NULL != 0` trả về `UNKNOWN` nên bị `WHERE` loại bỏ!)."
      }
    ],
    "commonMistakes": [
      "Tính `AVG` chia cho `4` (ra `75.0`), hoặc tưởng `COUNT(price)` bỏ qua giá trị `0`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vx-048",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết phép cộng dồn `groupby().count()` vs `len(group)` trong `compute_kpi_by_area()`.",
    "question": "Nhóm `A01` có `130` listing. Ở `t4`: `2` căn thiếu giá (`price_mxn = NaN`), `1` căn bị `ghost_t4 = 1` (nhưng có giá), và `0` căn lỗi khác. Trong `kpi_by_area.csv`, giá trị `total_listings`, `valid_ppg_t4`, `ghost_t4_count`, và `occ_t4_n` của `A01` là bao nhiêu?",
    "quickAnswer": "`total_listings = 130` (`len(group)`); `valid_ppg_t4 = 128` (chỉ loại 2 căn thiếu giá, căn ghost có giá vẫn tính PPG!); `ghost_t4_count = 1`; `occ_t4_n = 129` (loại 1 căn ghost = 1, giữ 2 căn thiếu giá vì lịch của chúng vẫn hợp lệ!).",
    "explanation": "Phân tách hoàn toàn chính xác các mẫu số từng KPI trong cùng một khu vực.",
    "projectLink": "src/kpi.py:L287-L309",
    "codeLocation": "src/kpi.py:L287-L309",
    "proofExample": "130, 128, 1, 129.",
    "followUpQuestions": [
      "Thực tế trong file `kpi_by_area.csv` của Nhóm 4, `A01` có `occ_t4_n = 129` và `ghost_t4_count = 1`, vậy `valid_ppg_t4` thực tế của A01 bằng mấy?"
    ],
    "followUpQA": [
      {
        "q": "Thực tế trong file `kpi_by_area.csv` của Nhóm 4, `A01` có `occ_t4_n = 129` và `ghost_t4_count = 1`, vậy `valid_ppg_t4` thực tế của A01 bằng mấy?",
        "a": "Tự kiểm tra trong `AREA_KPI_DATA`: `A01` có 130 tổng và `occ_t4_n = 129` (trừ đúng 1 căn ghost!)."
      }
    ],
    "commonMistakes": [
      "Cho rằng hễ thiếu giá thì bị loại luôn khỏi `occ_t4_n` (ra 127) — SAI vì `qa_missing_price` không liên quan tới `occ_t4_n`!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-049",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `dict.fromkeys` và vòng lặp gắn cột trong `build_kpi_by_listing()`.",
    "question": "Trong `src/kpi.py:L267`: `for col in dict.fromkeys((area_col, \"neighbourhood_cleansed\", \"room_type\")):`. Nếu `area_col = \"neighbourhood_cleansed\"`, vòng `for` chạy mấy lần và `base` có mấy cột metadata trước khi gắn KPI?",
    "quickAnswer": "Chạy **2 lần** (`\"neighbourhood_cleansed\"`, `\"room_type\"`) — không bị lặp 2 lần cùng 1 tên cột nhờ `dict.fromkeys`!",
    "explanation": "Phòng thủ trường hợp người dùng đổi `kpi.area_col` thành `\"neighbourhood_cleansed\"` trong YAML.",
    "projectLink": "src/kpi.py:L267-L269",
    "codeLocation": "src/kpi.py:L267-L269",
    "proofExample": "2 cột không trùng.",
    "followUpQuestions": [
      "Điều kiện `if col in final_df.columns:` ở `L268` nhằm phòng trường hợp gì?"
    ],
    "followUpQA": [
      {
        "q": "Điều kiện `if col in final_df.columns:` ở `L268` nhằm phòng trường hợp gì?",
        "a": "Phòng trường hợp bộ dữ liệu thành phố khác chưa có cột `analysis_area` hoặc `room_type` thì không bị văng `KeyError`."
      }
    ],
    "commonMistakes": [
      "Bỏ `dict.fromkeys` dẫn tới lặp lại tên cột 2 lần làm `base[col] = ...` ghi đè hoặc lệch thứ tự."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-050",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "Python",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_classify_rate_limit_error()` qua 4 đối tượng Exception.",
    "question": "Cho 4 exception gọi vào `_classify_rate_limit_error(err)` (`src/llm.py:L226-L251`): E1 có `err.code=429, str=\"Resource exhausted per minute\"`; E2 có `err.status=\"RESOURCE_EXHAUSTED\", str=\"RequestsPerDay exceeded\"`; E3 có `str=\"429 Too Many Requests\"`; E4 có `err.code=503, str=\"Model overloaded\"`. Kết quả trả về cho E1..E4 là gì?",
    "quickAnswer": "E1 -> **`\"rate\"`**; E2 -> **`\"daily\"`** (khớp `\"requestsperday\"`); E3 -> **`\"rate\"`** (`startswith(\"429\")`); E4 -> **`None`** (`503` không phải 429/RESOURCE_EXHAUSTED).",
    "explanation": "Mọi nhánh của hàm `_classify_rate_limit_error()` đều được kiểm chứng.",
    "projectLink": "src/llm.py:L226-L251",
    "codeLocation": "src/llm.py:L226-L251",
    "proofExample": "rate, daily, rate, None.",
    "followUpQuestions": [
      "Tại sao trong `L243` phải gọi `.lstrip()` trước `.startswith(\"429\")`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao trong `L243` phải gọi `.lstrip()` trước `.startswith(\"429\")`?",
        "a": "Tránh trường hợp chuỗi thông báo lỗi bị thừa dấu cách hoặc xuống dòng đầu chuỗi như `\" 429 ...\"` làm `startswith(\"429\")` trả `False`."
      }
    ],
    "commonMistakes": [
      "Tưởng E3 không có thuộc tính `.code=429` thì hàm trả `None` (có `str(err).lstrip().startswith(\"429\")` bắt lại!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-051",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM",
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết logic ghép `batches` và `missing_in_batch` trong `process_pending_reviews()`.",
    "question": "Trong 1 lô gồm 5 review (`id=[\"1\", \"2\", \"3\", \"4\", \"5\"]`), API trả về danh sách `results` chỉ gồm 3 phần tử cho `id=\"1\", \"2\", \"4\"`; trong đó phần tử `\"4\"` có `aspects = None`. Kết quả lưu vào `cache`, `new_count`, và `missing_in_batch` sau lô này bằng bao nhiêu?",
    "quickAnswer": "1. Chỉ `\"1\"` và `\"2\"` đủ cả `language`, `overall_sentiment` và `isinstance(res_aspects, dict)` -> lưu `save_to_cache()`, **`new_count += 2`**.\n2. Phần tử `\"4\"` bị chặn ở dòng `L358` (`not isinstance(res_aspects, dict)`), cùng `\"3\"` và `\"5\"` vắng mặt -> **`missing_in_batch = 3`** -> in cảnh báo `[LLM WARN]` và cả 3 ID (`\"3\", \"4\", \"5\"`) sẽ tự động được nhặt lại ở vòng chạy bù kế tiếp!",
    "explanation": "Không một bản ghi lỗi hoặc thiếu trường nào lọt được vào `llm_cache.jsonl`.",
    "projectLink": "src/llm.py:L348-L375",
    "codeLocation": "src/llm.py:L348-L375",
    "proofExample": "new_count=2; missing_in_batch=3.",
    "followUpQuestions": [
      "Nếu cả 5 phần tử trong `results` bị API trả về `None` (`call_llm_batch` thất bại trả `None`), dòng `L348` `(results or [])` có bị lỗi không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu cả 5 phần tử trong `results` bị API trả về `None` (`call_llm_batch` thất bại trả `None`), dòng `L348` `(results or [])` có bị lỗi không?",
        "a": "Không! `(None or [])` biến thành list rỗng `[]` -> `res_by_id = {}`, `missing_in_batch = 5` không hề crash!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng phần tử `\"4\"` vẫn được lưu vào cache với `aspects=None`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-052",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết kết quả `compute_kpi_by_neighbourhood()` khi một quận có listing nhưng 0 review LLM.",
    "question": "Quận `Xochimilco` có `5` listing trong `kpi_by_listing` (giá hợp lệ t4 cả 5) nhưng có `0` review nào trong `reviews_sentiment.csv`. Sau `compute_kpi_by_neighbourhood()`, dòng `Xochimilco` có các giá trị `total_listings`, `llm_review_count`, `complaint_noise`, và `median_ppg_t4` thế nào?",
    "quickAnswer": "`total_listings = 5`; `llm_review_count = 0` (nhờ `.fillna(0).astype(int)` ở `L435`); `complaint_noise = np.nan` (giữ nguyên NaN vì không có review để tính tỷ lệ!); `median_ppg_t4 = 376.59` (vẫn tính bình thường từ 5 listing)!",
    "explanation": "Khớp 100% với dòng Xochimilco, Iztapalapa, Milpa Alta trong `kpi_by_neighbourhood.csv`.",
    "projectLink": "src/kpi.py:L433-L453",
    "codeLocation": "src/kpi.py:L433-L453",
    "proofExample": "tot=5, llm=0, comp=NaN, ppg=376.59.",
    "followUpQuestions": [
      "Nếu hàm `plot_llm_insights()` trong `viz.py` đọc file `kpi_by_neighbourhood.csv` này, dòng `Xochimilco` có được vẽ lên hình không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu hàm `plot_llm_insights()` trong `viz.py` đọc file `kpi_by_neighbourhood.csv` này, dòng `Xochimilco` có được vẽ lên hình không?",
        "a": "KHÔNG! Vì dòng `L404` của `viz.py` lọc `llm_review_count > 0` nên Xochimilco, Iztapalapa, Milpa Alta không vẽ vào heatmap phàn nàn (chỉ 12 quận còn lại được vẽ), nhưng vẫn vẽ đầy đủ 15 quận trên bản đồ giá `kpi_ppg_neighbourhood.png`!"
      }
    ],
    "commonMistakes": [
      "Tưởng rằng dòng `Xochimilco` bị mất hẳn khỏi `kpi_by_neighbourhood.csv` hoặc có `complaint_noise = 0.0`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-053",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_save()` khi truyền `caption` nhiều dòng và tính `footer`.",
    "question": "Trong `src/viz.py:L52`: `footer = min(0.28, max(0.11, (len(wrapped.splitlines()) * 11 + 16) / 72 / fig.get_figheight()))`. Nếu figure cao `6.0` inches và `wrapped` có `3` dòng, giá trị `footer` bằng bao nhiêu và truyền vào đâu?",
    "quickAnswer": "`(3 * 11 + 16) / 72 / 6.0 = 49 / 432 = 0.1134`. Vì nằm trong `[0.11, 0.28]`, `footer = 0.1134` -> truyền vào `fig.tight_layout(rect=(0, 0.1134, 1, 0.93))` (chừa đúng 11.34% đáy cho caption và 7% đỉnh cho `suptitle`).",
    "explanation": "Tính theo đơn vị inch (`72 pt = 1 inch`) cực kỳ chuẩn mực đồ họa.",
    "projectLink": "src/viz.py:L52-L54",
    "codeLocation": "src/viz.py:L52-L54",
    "proofExample": "footer ≈ 0.1134.",
    "followUpQuestions": [
      "Nếu caption cực dài (12 dòng), tại sao `footer` bị kẹp trần `min(0.28, ...)`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu caption cực dài (12 dòng), tại sao `footer` bị kẹp trần `min(0.28, ...)`?",
        "a": "Để ngăn phần chú thích chiếm quá 28% chiều cao hình làm bóp nghẹt vùng vẽ biểu đồ chính."
      }
    ],
    "commonMistakes": [
      "Không hiểu hằng số `72` và `11` đến từ đâu (72 points/inch, font caption cỡ 8pt + khoảng cách dòng ~11pt)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-054",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết kết quả `Baseline` khi `comments` là chuỗi số hoặc emoji thuần.",
    "question": "Cho review `\"5/5 🌟🌟\"` đưa vào `predict_review_regex()` (`src/baseline.py`). Giá trị trả về cho `language`, `overall_sentiment`, và `value` là gì?",
    "quickAnswer": "`clean_text` giữ `\"5/5 🌟🌟\"`. Không có từ khóa trong `NEG_RE` hay `POS_RE` -> `total_neg = 0` -> `overall_sentiment = \"positive\"`. `detect_language` không thấy chữ cái (`[^\\W\\d_]`) -> `language = \"und\"`. Không nhắc từ khóa `value` -> `value = \"not_mentioned\"`.",
    "explanation": "Logic hoàn toàn nhất quán.",
    "projectLink": "src/baseline.py:L74-L118",
    "codeLocation": "src/baseline.py:L74-L118",
    "proofExample": "lang=und, overall=positive, value=not_mentioned.",
    "followUpQuestions": [
      "Nếu review là `\"👍\"` (chỉ có emoji) gửi cho `src/evaluate.py :: hau_kiem()`, liệu có vi phạm quy tắc `rong_nhung_co_nhan` hay `ngan_nhung_nhieu_khia_canh` không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu review là `\"👍\"` (chỉ có emoji) gửi cho `src/evaluate.py :: hau_kiem()`, liệu có vi phạm quy tắc `rong_nhung_co_nhan` hay `ngan_nhung_nhieu_khia_canh` không?",
        "a": "Có 1 token `\"👍\"` -> `so_tu = 1` (nên không dính `rong_nhung_co_nhan`), và có `0` khía cạnh -> cũng không dính `ngan_nhung_nhieu_khia_canh`, `language=\"und\"` hợp lệ!"
      }
    ],
    "commonMistakes": [
      "Tưởng `\"5/5\"` bị `detect_language` gán thành `\"en\"`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-055",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết gán cột bằng `.loc[mask]` khi `mask` chứa `pd.NA`.",
    "question": "Cho `s = pd.Series([0, 1, pd.NA], dtype=\"Int64\")` và `df = pd.DataFrame({\"val\": [10, 20, 30]})`. Chuyện gì xảy ra khi chạy `df.loc[s == 0, \"flag\"] = 1` so với `df.loc[(s == 0).fillna(False), \"flag\"] = 1`?",
    "quickAnswer": "Lệnh đầu văng **`ValueError: Cannot mask with non-boolean array containing NA / NaN values`** vì `(s == 0)` trả về `[True, False, <NA>]`! Lệnh sau đổi `<NA> -> False` nên chạy êm, gắn `flag = [1.0, NaN, NaN]`.",
    "explanation": "Giống hệt lý do tồn tại của `.fillna(False)` tại `src/kpi.py:L197`.",
    "projectLink": "src/kpi.py:L197",
    "codeLocation": "src/kpi.py:L197",
    "proofExample": "ValueError vs chạy thành công.",
    "followUpQuestions": [
      "Còn nếu gán `df[\"flag\"] = (s == 0)` (không dùng lọc hàng), cột mới nhận kiểu gì?"
    ],
    "followUpQA": [
      {
        "q": "Còn nếu gán `df[\"flag\"] = (s == 0)` (không dùng lọc hàng), cột mới nhận kiểu gì?",
        "a": "Nhận kiểu `boolean` (nullable boolean chứa `<NA>` ở dòng 3), hoàn toàn hợp lệ — chỉ khi dùng làm mặt nạ lọc `.loc[mask]` mới phải `.fillna(False)`."
      }
    ],
    "commonMistakes": [
      "Quên `.fillna(False)` sau phép so sánh trên cột `Int64`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-056",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `groupby(..., dropna=True)` vs `dropna=False` trên 1 bảng mẫu.",
    "question": "Cho bảng 5 dòng có `area = [\"A01\", \"A01\", \"A02\", None, None]` và `price = [100, 200, 300, 400, 500]`. So sánh số nhóm trả về và tổng số dòng đếm được giữa `groupby(\"area\")` và `groupby(\"area\", dropna=False)`?",
    "quickAnswer": "`groupby(\"area\")` (mặc định `dropna=True`) trả **2 nhóm** (`A01`, `A02`), bỏ mất 2 dòng `None` (tổng đếm = 3). `groupby(\"area\", dropna=False)` trả **3 nhóm** (`A01`, `A02`, `NaN`) bảo toàn đủ 5 dòng (giống cách `compute_kpi_by_area()` dùng để không che giấu dòng thiếu khu vực!).",
    "explanation": "Khác biệt âm thầm dễ bỏ sót dữ liệu khuyết.",
    "projectLink": "src/kpi.py:L286",
    "codeLocation": "src/kpi.py:L286",
    "proofExample": "2 nhóm vs 3 nhóm.",
    "followUpQuestions": [
      "Khi gộp nhóm `dropna=False` với `None` và `np.nan` lẫn nhau, pandas gom chúng vào mấy nhóm?"
    ],
    "followUpQA": [
      {
        "q": "Khi gộp nhóm `dropna=False` với `None` và `np.nan` lẫn nhau, pandas gom chúng vào mấy nhóm?",
        "a": "Gom chung thành 1 nhóm `NaN` duy nhất."
      }
    ],
    "commonMistakes": [
      "Đoán mặc định `df.groupby(\"area\")` giữ lại nhóm `NaN` ở cuối."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-057",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `Mutable Default Argument` nếu sửa lại chữ ký hàm sai cách.",
    "question": "Giả sử có người viết nhầm `def collect(row, out=[]): out.append(row); return out`. Gọi `a = collect(1)` rồi `b = collect(2)` (không truyền đối số thứ 2). Giá trị của `a` và `b` sau 2 lần gọi là gì?",
    "quickAnswer": "Cả `a` và `b` ĐỀU là **`[1, 2]`** (và `a is b == True`!) vì list mặc định `[]` chỉ tạo 1 lần duy nhất lúc định nghĩa hàm!",
    "explanation": "Đó là lý do chuẩn Python dùng `out=None` rồi mới tạo mới bên trong hàm (như `src/kpi.py:L385` `aspects=None` -> `aspects or DEFAULT_LLM_ASPECTS`).",
    "projectLink": "src/kpi.py:L385",
    "codeLocation": "src/kpi.py:L385",
    "proofExample": "a = [1, 2], b = [1, 2].",
    "followUpQuestions": [
      "Nếu đặt giá trị mặc định là `tuple` (`aspects=ASPECTS`) thì có gặp lỗi này không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu đặt giá trị mặc định là `tuple` (`aspects=ASPECTS`) thì có gặp lỗi này không?",
        "a": "Không, vì tuple bất biến không có phương thức `.append()`."
      }
    ],
    "commonMistakes": [
      "Đoán `a = [1]` và `b = [2]`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-058",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "Python",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `Path.with_suffix()` với file hai đuôi `.csv.gz`.",
    "question": "Cho `dest = Path(\"data/raw/2026-06-15/listings.csv.gz\")`. Giá trị của `dest.with_suffix(\".tmp\")` khác gì với `dest.with_suffix(dest.suffix + \".tmp\")` (`src/download.py:L36`)?",
    "quickAnswer": "`dest.with_suffix(\".tmp\")` biến tên thành `listings.csv.tmp` (mất `.gz`), còn `dest.with_suffix(dest.suffix + \".tmp\")` giữ nguyên đuôi `.gz` thành **`listings.csv.gz.tmp`**!",
    "explanation": "Nếu lưu 2 file `listings.csv.gz` và `listings.csv` cùng thư mục, tên `.tmp` tách biệt rõ không đụng độ.",
    "projectLink": "src/download.py:L36",
    "codeLocation": "src/download.py:L36",
    "proofExample": "listings.csv.tmp vs listings.csv.gz.tmp.",
    "followUpQuestions": [
      "Thuộc tính `dest.suffixes` (số nhiều) trả về danh sách gì cho `listings.csv.gz`?"
    ],
    "followUpQA": [
      {
        "q": "Thuộc tính `dest.suffixes` (số nhiều) trả về danh sách gì cho `listings.csv.gz`?",
        "a": "Trả về `[\".csv\", \".gz\"]`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `dest.with_suffix(\".tmp\")` nối thêm `.tmp` vào cuối chuỗi."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vx-059",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `chunksize` khi gộp nhiều DataFrame không có dòng nào khớp.",
    "question": "Trong `_filter_raw_by_ids()` (`src/filter_data_from_sheet.py`), file raw `calendar.csv.gz` có 350.000 dòng (`chunksize=100_000`) nhưng không có dòng nào khớp `allowed`. Vòng `for chunk` lặp mấy lần, `len(chunks)` bằng mấy và hàm trả về gì ở dòng `L143–L146`?",
    "quickAnswer": "Vòng `for chunk` lặp **4 lần** (100k, 100k, 100k, 50k). Mỗi lần `selected.empty` là `True` nên `len(chunks) == 0`. Khi `if chunks:` sai, hàm đọc `nrows=0` ở `L143` kiểm tra có cột `key` rồi trả về **DataFrame 0 dòng giữ nguyên toàn bộ tên cột của file raw**.",
    "explanation": "Không bị crash `ValueError: No objects to concatenate`.",
    "projectLink": "src/filter_data_from_sheet.py:L127-L146",
    "codeLocation": "src/filter_data_from_sheet.py:L127-L146",
    "proofExample": "4 chunks, len(chunks)=0, empty DF with headers.",
    "followUpQuestions": [
      "Nếu file `calendar.csv.gz` gốc chỉ có dòng header (0 dòng dữ liệu), `for chunk in pd.read_csv(..., chunksize=100_000)` chạy mấy lần?"
    ],
    "followUpQA": [
      {
        "q": "Nếu file `calendar.csv.gz` gốc chỉ có dòng header (0 dòng dữ liệu), `for chunk in pd.read_csv(..., chunksize=100_000)` chạy mấy lần?",
        "a": "Chạy `0` lần -> `chunks` rỗng -> nhảy xuống đọc `nrows=0` trả đúng DataFrame 0 dòng đủ cột!"
      }
    ],
    "commonMistakes": [
      "Tưởng vòng lặp dừng sớm hoặc báo lỗi `No objects to concatenate`."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vx-060",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết chuỗi `.where()` trên dữ liệu `availability` trong `src/qa.py:L231-L233`.",
    "question": "Cho `a30 = pd.Series([10.0, 35.0])`, `a90 = pd.Series([20.0, 20.0])`. Ở `RULE_AVAILABILITY_BOUNDS`, giá trị cuối của `valid_a30`, `valid_a90`, `availability_30_clean`, `availability_90_clean` và `qa_invalid_availability` của 2 dòng là gì?",
    "quickAnswer": "- Dòng 1: `a30=10, a90=20` -> `valid_a30=T, valid_a90=T` -> clean=`(10, 20)`, flag=`False`.\n- Dòng 2: `a30=35 (>30)` -> `valid_a30=False`; nhưng `a90=20 <= 90` và `20 >= a30.fillna(-1)=35` là `False` -> **`valid_a90` CŨNG `False`!** -> clean=`(<NA>, <NA>)`, flag=`True`.",
    "explanation": "Khi a30 > 30 (35) mà a90 < a30 (20), cả 2 cột liên đới đều bị đánh dấu lỗi chính xác.",
    "projectLink": "src/qa.py:L214-L234",
    "codeLocation": "src/qa.py:L214-L234",
    "proofExample": "Dòng 2: (<NA>, <NA>), flag=True.",
    "followUpQuestions": [
      "Nếu sửa dòng 2 thành `a30=35, a90=40` thì `valid_a90` là True hay False?"
    ],
    "followUpQA": [
      {
        "q": "Nếu sửa dòng 2 thành `a30=35, a90=40` thì `valid_a90` là True hay False?",
        "a": "`valid_a30=False` (vì 35>30), nhưng `40 <= 90` và `40 >= 35` là `True` -> `availability_90_clean=40`, còn `qa_invalid_availability` vẫn là `True`!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `a90=20` vẫn giữ được sạch khi `a30=35`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-061",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết sự lây lan của `_qa_flag()` khi file CSV bị sửa xóa mất giá trị cờ thành `NaN`.",
    "question": "Giả sử trong `listings.csv`, một dòng có `price_mxn = 1500.0`, `accommodates_clean = 3`, nhưng ô `qa_missing_price` vô tình bị xóa thành `NaN` (trống). Khi chạy `src/kpi.py :: compute_price_and_ppg_kpis()`, kết quả `price_mxn_t4` và `ppg_t4` của dòng đó là gì?",
    "quickAnswer": "`_qa_flag(df, \"qa_missing_price\")` thực hiện `.fillna(True)` -> coi ô thiếu cờ là **`True`** (vi phạm)! Do đó `valid_price = (~True)` = `False` -> cả `price_mxn_t4` lẫn `ppg_t4` của dòng đó bị gán **`np.nan`** theo nguyên tắc bảo thủ fail-safe!",
    "explanation": "Không bao giờ chấp nhận dữ liệu chưa được xác nhận QA rõ ràng.",
    "projectLink": "src/kpi.py:L60-L62, L228",
    "codeLocation": "src/kpi.py:L60-L62, L228",
    "proofExample": "Trả về NaN do fail-safe fillna(True).",
    "followUpQuestions": [
      "Với `listings.csv` chuẩn của CDMX, giá trị trong các cột `qa_*` là `True`/`False`, khi đọc CSV lại với `NaN` ở vài dòng thì `df[col].fillna(True).astype(bool)` trả về dtype gì?"
    ],
    "followUpQA": [
      {
        "q": "Với `listings.csv` chuẩn của CDMX, giá trị trong các cột `qa_*` là `True`/`False`, khi đọc CSV lại với `NaN` ở vài dòng thì `df[col].fillna(True).astype(bool)` trả về dtype gì?",
        "a": "Trả về `bool` chuẩn (`bool8`)."
      }
    ],
    "commonMistakes": [
      "Đoán `_qa_flag()` dùng `.fillna(False)` nên giá `1500.0` vẫn được tính vào PPG."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-062",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết biến đổi thứ tự các mốc thời gian trong `compute_review_velocities()`.",
    "question": "Với `snapshots = [t1(2025-09-27), t2(2025-12-29), t3(2026-03-30), t4(2026-06-15)]`, vòng `for i in range(len(snapshots) - 1)` sinh ra các tên cột nào và tính từ cặp snapshot nào?",
    "quickAnswer": "Sinh đúng 3 cột:\n- `i=0`: `review_velocity_q1` từ `(t1 -> t2)`, `93` ngày (`3.1` tháng).\n- `i=1`: `review_velocity_q2` từ `(t2 -> t3)`, `91` ngày (`3.0333` tháng).\n- `i=2`: `review_velocity_q3` từ `(t3 -> t4)`, `77` ngày (`2.5667` tháng).",
    "explanation": "Không có `review_velocity_q4` vì t4 không có t5 kế tiếp.",
    "projectLink": "src/kpi.py:L122-L137",
    "codeLocation": "src/kpi.py:L122-L137",
    "proofExample": "q1, q2, q3.",
    "followUpQuestions": [
      "Trong `compute_kpi_by_snapshot()` (`L330`), tại hàng `idx = 2` (`t3`), `rv_col = f\"review_velocity_q{idx}\"` đọc cột nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `compute_kpi_by_snapshot()` (`L330`), tại hàng `idx = 2` (`t3`), `rv_col = f\"review_velocity_q{idx}\"` đọc cột nào?",
        "a": "Đọc `review_velocity_q2` (chính là vận tốc phát sinh từ `t2 -> t3`!)."
      }
    ],
    "commonMistakes": [
      "Nhầm `review_velocity_q1` nằm ở mốc `t1` (thực tế tại `t1` chưa có RV, và `kpi_by_snapshot` đặt RV Q1 nằm cùng hàng mốc `t2`!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-063",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết trường hợp listing có `a365=0, nr=0` ở mốc `t1` (`ghost_t1`).",
    "question": "Tại `t1`, căn hộ X có `a365 = 0`, `number_of_reviews = 0`, `last_review = NaN` (hợp lệ cho căn 0 review), và không lỗi QA nào. Kết quả `valid_eval`, `is_stale`, và `ghost_t1` trong `compute_ghost_listings()` (`src/kpi.py:L158-L173`) là gì?",
    "quickAnswer": "`has_rev_date = (nr == 0) | last_rev.notna()` = `True` (vì `nr == 0`); `valid_eval = True`; `is_stale = (nr == 0) | ...` = `True`; `is_ghost = (0 == 0) & True` = `True` -> **`ghost_t1 = 1`**!",
    "explanation": "Căn mới/chưa từng có review mà khóa lịch trọn cả 365 ngày ngay tại `t1` được xếp vào nguồn cung đóng băng (`ghost = 1`).",
    "projectLink": "src/kpi.py:L158-L173",
    "codeLocation": "src/kpi.py:L158-L173",
    "proofExample": "ghost_t1 = 1.",
    "followUpQuestions": [
      "Nếu cùng căn này mở lại 10 ngày trống ở `t2` (`a365 = 10`, vẫn `0` review), giá trị `ghost_t2` của nó thành mấy?"
    ],
    "followUpQA": [
      {
        "q": "Nếu cùng căn này mở lại 10 ngày trống ở `t2` (`a365 = 10`, vẫn `0` review), giá trị `ghost_t2` của nó thành mấy?",
        "a": "Thành **`0`** (không phải ghost nữa vì `a365 != 0`)."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng `last_review = NaN` làm `valid_eval = False` khiến căn 0 review bị gắn `<NA>` thay vì `1`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-064",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `cot_diem()` khi 1 mô hình dự đoán thiếu hoàn toàn (DataFrame rỗng).",
    "question": "Giả sử một mô hình thử nghiệm bị lỗi chỉ trả kết quả cho `0` review (bảng dự đoán rỗng `du_doan = {\"sentiment\": {}, ...}`). Giá trị trả về của `cot_diem(du_doan, gold)` là mảng 9 số nào?",
    "quickAnswer": "Tất cả các chỉ số `phu_song`, `cam_xuc_accuracy`, `cam_xuc_macro_f1`, `cam_xuc_weighted_f1`, `khia_canh_f1`, `duoc_khen_f1`, `bi_che_f1`, `nhan_khia_canh_accuracy`, `ngon_ngu_accuracy` đều trả về **`0.0`** (hoặc `np.nan` nếu key thiếu trong dict `du_doan`, hoặc `0.0` cho F1 cảm xúc nhờ `zero_division=0`)!",
    "explanation": "Không chia cho 0 hay sập chương trình.",
    "projectLink": "src/evaluate.py:L133-L143",
    "codeLocation": "src/evaluate.py:L133-L143",
    "proofExample": "0.0 / nan.",
    "followUpQuestions": [
      "Nếu `gold` có 100 review và mô hình trả kết quả cho đúng 100 review nhưng đoán sai 100% nhãn ngôn ngữ thành `\"xx\"`, chỉ số nào vẫn có thể > 0?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `gold` có 100 review và mô hình trả kết quả cho đúng 100 review nhưng đoán sai 100% nhãn ngôn ngữ thành `\"xx\"`, chỉ số nào vẫn có thể > 0?",
        "a": "Các chỉ số cảm xúc và khía cạnh vẫn bình thường nếu chúng đúng; chỉ riêng `ngon_ngu_accuracy` rơi xuống `0.0` (và `hau_kiem()` sẽ bắt 100 cảnh báo `ngon_ngu_sai_ma_iso`!)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `cot_diem()` sẽ crash hoặc trả về NaN cho mọi chỉ số."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-065",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization",
      "NumPy"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `_centroid()` khi đa giác là hình vuông đơn vị.",
    "question": "Cho hình vuông cạnh 2 có 5 điểm khép kín `pts = np.array([[0,0], [2,0], [2,2], [0,2], [0,0]], dtype=float)`. Hàm `_centroid([pts])` (`src/viz.py:L95-L105`) tính ra `area2` và tọa độ trọng tâm `(cx, cy)` bằng bao nhiêu?",
    "quickAnswer": "`2*A = 8.0` (diện tích = 4.0); trọng tâm công thức Shoelace trả chính xác về **`(1.0, 1.0)`**!",
    "explanation": "Khớp tâm hình học lý thuyết.",
    "projectLink": "src/viz.py:L95-L105",
    "codeLocation": "src/viz.py:L95-L105",
    "proofExample": "(1.0, 1.0)",
    "followUpQuestions": [
      "Khi một quận là `MultiPolygon` gồm 2 mảnh tách rời (1 mảnh lớn diện tích 100, 1 mảnh nhỏ diện tích 5), hàm `_centroid()` đặt số thứ tự quận ở đâu?"
    ],
    "followUpQA": [
      {
        "q": "Khi một quận là `MultiPolygon` gồm 2 mảnh tách rời (1 mảnh lớn diện tích 100, 1 mảnh nhỏ diện tích 5), hàm `_centroid()` đặt số thứ tự quận ở đâu?",
        "a": "Nhờ vòng kiểm `if abs(area2) > max(1e-12, best_area):`, hàm đặt nhãn vào tâm của **mảnh đa giác có diện tích lớn nhất** chứ không đặt rơi ra khoảng trống giữa hai mảnh!"
      }
    ],
    "commonMistakes": [
      "Quên kiểm tra đóng vòng lặp nếu GeoJSON không lặp lại điểm đầu (với `np.roll(x0, -1)` ở L99, KỂ CẢ khi không lặp điểm đầu thì cạnh cuối từ điểm cuối về điểm đầu vẫn tự động được khép kín!)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-066",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `compute_kpi_by_listing()` khi snapshot `t1` có 1 ID nhưng `t4` thiếu ID đó.",
    "question": "Giả sử trong một thí nghiệm không cân bằng, `t1` có `id=[\"1\", \"2\"]`, còn `t4` (`snapshots[-1]`) chỉ còn `id=[\"1\"]` (căn `\"2\"` bị xóa khỏi sàn ở t4). Kết quả `len(build_kpi_by_listing(...))` bằng mấy?",
    "quickAnswer": "Bằng **`1`** (chỉ còn căn `\"1\"`)! Vì `L264-L266` lấy `base = pd.DataFrame(index=snapshots[-1][2].index)` làm khung chuẩn.",
    "explanation": "Đây là lý do sinh viên phải biết nhược điểm `Survivorship Bias` nếu mang code `kpi.py` chạy trên tập dữ liệu không cố định cohort.",
    "projectLink": "src/kpi.py:L264-L275",
    "codeLocation": "src/kpi.py:L264-L275",
    "proofExample": "len = 1 (căn \"2\" bị rơi).",
    "followUpQuestions": [
      "Nếu muốn biến `build_kpi_by_listing()` giữ đủ toàn bộ listing xuất hiện ở ÍT NHẤT 1 trong 4 snapshot (union index), cần sửa dòng 266 thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu muốn biến `build_kpi_by_listing()` giữ đủ toàn bộ listing xuất hiện ở ÍT NHẤT 1 trong 4 snapshot (union index), cần sửa dòng 266 thế nào?",
        "a": "Tạo union index từ cả 4 snapshot rồi hợp nhất metadata từ mốc mới nhất mà listing đó từng xuất hiện."
      }
    ],
    "commonMistakes": [
      "Tưởng `build_kpi_by_listing()` thực hiện `outer join` giữ lại cả căn `\"2\"` từ `t1`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-067",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `detect_language()` trên văn bản chứa xen kẽ tiếng Anh và 1 từ tiếng Tây Ban Nha.",
    "question": "Xét câu review: `\"Great stay near metro, muchas gracias host!\"`. Hàm `detect_language()` (`src/baseline.py:L74-L81`) trả về `\"en\"` hay `\"es\"`?",
    "quickAnswer": "Trả về **`\"es\"`**! Vì `LANG_PATTERNS` duyệt `\"es\"` đầu tiên và gặp chữ `\"gracias\"` khớp danh sách từ khóa tiếng Tây Ban Nha -> `return \"es\"` ngay!",
    "explanation": "Một ví dụ cụ thể giải thích nguyên nhân có thể lệch 1% ngôn ngữ giữa Baseline Regex (`0.99`) và LLM (`1.00`) trên các câu pha trộn hai thứ tiếng (`Spanglish`).",
    "projectLink": "src/baseline.py:L53, L78-L80",
    "codeLocation": "src/baseline.py:L53, L78-L80",
    "proofExample": "\"es\"",
    "followUpQuestions": [
      "Khi nhận chuỗi `\"Danke, sehr gut!\"`, hàm trả về gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi nhận chuỗi `\"Danke, sehr gut!\"`, hàm trả về gì?",
        "a": "Khớp từ `\"sehr\"`, `\"danke\"` ở tuple `(\"de\", ...)` -> trả về **`\"de\"`**."
      }
    ],
    "commonMistakes": [
      "Tưởng hàm `detect_language()` đếm tần suất từ tiếng Anh vs tiếng Tây Ban Nha rồi mới chọn ngôn ngữ chiếm đa số."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-068",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết biểu thức tách `llm_ids` và `manual_ids` khi cột đánh dấu có giá trị `\"x \"` và `\"X\"`.",
    "question": "Trên Google Sheet tab Review, 3 dòng đánh dấu ở cột `\"Mẫu LLM\"` lần lượt là `[\"x\", \" X \", \"ok\"]`. Biểu thức `review[ASSIGNMENT_HEADERS[\"llm\"]].astype(\"string\").str.strip().str.lower().eq(\"x\")` cho kết quả boolean gì cho 3 dòng?",
    "quickAnswer": "Trả về **`[True, True, False]`**! Cả `\"x\"` lẫn `\" X \"` đều chuẩn hóa thành `\"x\"` và được đưa vào `llm_ids`, còn `\"ok\"` bị loại.",
    "explanation": "Bảo vệ chống sai sót định dạng thủ công khi điền bảng phân công Google Sheets.",
    "projectLink": "src/filter_data_from_sheet.py:L183",
    "codeLocation": "src/filter_data_from_sheet.py:L183",
    "proofExample": "[True, True, False]",
    "followUpQuestions": [
      "Tại sao sau bước `reviews_llm.csv`, file `reviews_labeled.csv` (100 nhãn tay) lại lọc từ `reviews` theo `manual_ids` chứ không nhất thiết lọc từ `llm_sample`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao sau bước `reviews_llm.csv`, file `reviews_labeled.csv` (100 nhãn tay) lại lọc từ `reviews` theo `manual_ids` chứ không nhất thiết lọc từ `llm_sample`?",
        "a": "Vì theo `L225`: `manual_sample = reviews.loc[reviews[\"id\"].isin(manual_ids)]` lọc trực tiếp từ 5.000 review được giao (tổng quát hơn kể cả khi có mẫu nhãn tay nằm ngoài tập LLM, dù trong bộ Nhóm 4 tất cả 100 mẫu đều là tập con của 1.000 mẫu LLM)."
      }
    ],
    "commonMistakes": [
      "Đoán `\" X \"` bị loại do viết hoa hoặc thừa khoảng trắng."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vx-069",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết tác động của `.astype(\"string\")` trước `str.replace` khi cột `price` toàn `NaN` (`t2`).",
    "question": "Tại mốc `t2`, cột `df[\"price\"]` đọc từ CSV toàn bộ là `np.nan` (`float64`). Nếu chạy thẳng `df[\"price\"].str.strip()` KHÔNG có `.astype(\"string\")`, pandas báo lỗi gì vs khi có `.astype(\"string\")` ở `src/qa.py:L91`?",
    "quickAnswer": "Nếu không ép `.astype(\"string\")`, cột toàn `NaN` mang kiểu `float64` nên gọi `.str.strip()` văng ngay **`AttributeError: Can only use .str accessor with string values!`** làm sập mốc `t2`! Nhờ dòng 91 viết `price_series.astype(\"string\").str.strip()`, cột toàn `NaN` trở thành `StringDtype` toàn `<NA>` và chạy `.str.replace()` êm ru!",
    "explanation": "Phát hiện cực hay: chính `.astype(\"string\")` ở `qa.py:L91` đã cứu mốc `t2` khỏi `AttributeError` của `.str` accessor!",
    "projectLink": "src/qa.py:L91",
    "codeLocation": "src/qa.py:L91",
    "proofExample": "Tránh AttributeError trên cột float64 toàn NaN.",
    "followUpQuestions": [
      "Tương tự ở dòng 277 (`lr_raw.astype(\"string\").str.strip()`), nếu không ép `\"string\"` khi cả 1.000 listing có `last_review = NaN` thì lỗi gì xảy ra?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự ở dòng 277 (`lr_raw.astype(\"string\").str.strip()`), nếu không ép `\"string\"` khi cả 1.000 listing có `last_review = NaN` thì lỗi gì xảy ra?",
        "a": "Cũng bị `AttributeError: Can only use .str accessor with string values!` tương tự!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `.astype(\"string\")` ở L91 chỉ để cho đẹp chứ bỏ đi không ảnh hưởng gì ở t2."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-070",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `valid_occ` khi `exclude_ghost = True` ở snapshot `t1`.",
    "question": "Tại `t1` (`2025-09-27`), toàn mẫu có `1.000` căn hộ, trong đó `7` căn bị gắn `ghost_t1 = 1`, `993` căn có `ghost_t1 = 0`, không có căn nào thiếu availability hay `<NA>`. Hỏi số lượng căn hợp lệ `occ_n` tại `t1` là bao nhiêu khi `exclude_ghost=True` vs `False`?",
    "quickAnswer": "Khi `exclude_ghost=True`: `1.000 - 7 = 993` (khớp đúng `occN: 993` trong `kpi_by_snapshot.csv`!). Khi `exclude_ghost=False`: `1.000` (giữ cả 7 căn ghost có `occ = 100%` làm tăng giả tạo `occ_1-30` từ `0.4849` lên `(0.4849*993 + 7)/1000 ≈ 0.4885`).",
    "explanation": "Con số khớp kiểm toán 100% với `kpi_by_snapshot.csv`!",
    "projectLink": "src/kpi.py:L195-L200 & kpi_by_snapshot.csv",
    "codeLocation": "src/kpi.py:L195-L200 & kpi_by_snapshot.csv",
    "proofExample": "993 vs 1000.",
    "followUpQuestions": [
      "Ở `t4`, vì sao `ghost_count = 4` nhưng `occN` lại là `995` chứ không phải `996`?"
    ],
    "followUpQA": [
      {
        "q": "Ở `t4`, vì sao `ghost_count = 4` nhưng `occN` lại là `995` chứ không phải `996`?",
        "a": "Vì ở `t4` có thêm **1 căn** bị `diff < 0` ở RV khiến `ghost_t4 = <NA>` (`ghost_n = 999`), và `(g == 0).fillna(False)` loại CẢ `4` căn ghost=1 lẫn `1` căn `<NA>` -> còn `1000 - 4 - 1 = 995`!"
      }
    ],
    "commonMistakes": [
      "Tưởng `t1` không có `Review Velocity` nên `t1` không có căn ghost nào (`occN = 1000`)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-071",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "Python",
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết đường dẫn và tên cột khi `eval_file` không tồn tại ở `src/viz.py:L499-L503`.",
    "question": "Nếu xóa tệp `reports/evaluation_report.csv` rồi chạy `python src/viz.py --config configs/mexico-city.yaml`, chương trình có bị sập ở bước `viz.py` không? Bao nhiêu ảnh PNG được tạo ra?",
    "quickAnswer": "KHÔNG sập! Dòng `L499` kiểm `if eval_file.is_file():` — vì không tìm thấy nên in `[VIZ WARN] Chưa có reports/evaluation_report.csv -> bỏ qua llm_vs_baseline.png`, và vẫn sinh thành công **`7` ảnh PNG KPI** (chỉ bỏ qua ảnh thứ 8 `llm_vs_baseline.png`)!",
    "explanation": "Thiết kế tách rời phụ thuộc giúp vẽ lại KPI kể cả trước khi chạy `evaluate.py`.",
    "projectLink": "src/viz.py:L499-L503",
    "codeLocation": "src/viz.py:L499-L503",
    "proofExample": "7 ảnh PNG + [VIZ WARN].",
    "followUpQuestions": [
      "Ngược lại, nếu thiếu `data/processed/kpi_by_neighbourhood.csv` thì `viz.py` xử lý thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại, nếu thiếu `data/processed/kpi_by_neighbourhood.csv` thì `viz.py` xử lý thế nào?",
        "a": "Gọi `_read_kpi()` bắt buộc ở `L487` -> ném ngay `FileNotFoundError` ở đầu `main()` trước khi vẽ bất kỳ biểu đồ nào."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng thiếu bất kỳ CSV nào trong 5 tệp đều làm `viz.py` dừng ngay lập tức không xuất ảnh nào."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-072",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết phép ép `pd.to_numeric` trên chuỗi có dấu cách, khoảng trống và số âm.",
    "question": "Cho `s = pd.Series([\" 1250 \", \"-50\", \"1,250\", \"\"])`. Kết quả của `pd.to_numeric(s, errors=\"coerce\")` là gì?",
    "quickAnswer": "`[1250.0, -50.0, np.nan, np.nan]` — chú ý `pd.to_numeric` thuần tự động bỏ khoảng trắng 2 đầu (`\" 1250 \" -> 1250.0`), nhưng KHÔNG bỏ dấu phẩy `\",\"` (`\"1,250\" -> np.nan`)!",
    "explanation": "Đó là lý do `qa.py` cần Regex `r\"[^\\d.-]\"` xử lý dấu phẩy và `$` trước khi gọi `pd.to_numeric`.",
    "projectLink": "src/qa.py:L92-L93",
    "codeLocation": "src/qa.py:L92-L93",
    "proofExample": "[1250.0, -50.0, nan, nan]",
    "followUpQuestions": [
      "Nếu chạy qua `r\"[^\\d.-]\"` trước, 4 phần tử trên cho kết quả số nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu chạy qua `r\"[^\\d.-]\"` trước, 4 phần tử trên cho kết quả số nào?",
        "a": "`[1250.0, -50.0, 1250.0, np.nan]`."
      }
    ],
    "commonMistakes": [
      "Tưởng `pd.to_numeric` tự hiểu dấu phẩy phân cách hàng nghìn `\"1,250\"`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-073",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `.fillna(0)` trên Series toàn `NaN` vs `.mean()`.",
    "question": "Cho `s = pd.Series([np.nan, np.nan, np.nan], dtype=\"float64\")` (mô phỏng 3 căn ở mốc t2). Kết quả `s.mean()`, `s.median()`, `s.sum()` và `s.fillna(0).mean()` lần lượt là gì?",
    "quickAnswer": "`s.mean()` = `np.nan`; `s.median()` = `np.nan`; `s.sum()` = **`0.0`**; `s.fillna(0).mean()` = **`0.0`**!",
    "explanation": "Cho thấy mức độ nguy hiểm nếu dùng `fillna(0)` hoặc `sum()` mà không kiểm `.empty` / `.count() > 0`.",
    "projectLink": "src/kpi.py:L71-L78, L295",
    "codeLocation": "src/kpi.py:L71-L78, L295",
    "proofExample": "nan, nan, 0.0, 0.0.",
    "followUpQuestions": [
      "Khi gọi `_iqr_stats(s)` ở `kpi.py` trên `s` toàn `NaN` trên, kết quả nhận được là gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi gọi `_iqr_stats(s)` ở `kpi.py` trên `s` toàn `NaN` trên, kết quả nhận được là gì?",
        "a": "`(0, np.nan, np.nan, np.nan)` nhờ kiểm `if valid.empty:` ngay dòng 72!"
      }
    ],
    "commonMistakes": [
      "Đoán `s.sum()` trên toàn `NaN` cũng trả về `np.nan` giống `s.mean()`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-074",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết tính `PPG` khi `price` hợp lệ nhưng `accommodates` bị lỗi/NaN.",
    "question": "Cho 2 căn: C1 `(price=1200, acc=4, qa_miss_p=F, qa_inv_acc=F)`; C2 `(price=1500, acc=NaN, qa_miss_p=F, qa_inv_acc=T)`. Kết quả bảng KPI ở `compute_price_and_ppg_kpis()` trả về `price_mxn_t4`, `ppg_t4`, `valid_price_count` và `valid_ppg_count` là mấy?",
    "quickAnswer": "- `price_mxn_t4`: `[1200.0, 1500.0]` (`valid_price_count = 2`);\n- `ppg_t4`: `[300.0, np.nan]` (`valid_ppg_count = 1`)!",
    "explanation": "Minh chứng lý do tách 2 biến đếm trong `snapshot_stats`.",
    "projectLink": "src/kpi.py:L228-L251",
    "codeLocation": "src/kpi.py:L228-L251",
    "proofExample": "valid_price=2, valid_ppg=1.",
    "followUpQuestions": [
      "Khi `compute_kpi_by_neighbourhood()` gọi `_sample_tag()` cho quận chỉ gồm C1 và C2, chuỗi hiển thị sẽ là gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi `compute_kpi_by_neighbourhood()` gọi `_sample_tag()` cho quận chỉ gồm C1 và C2, chuỗi hiển thị sẽ là gì?",
        "a": "`\"p=2, ppg=1/2\"`."
      }
    ],
    "commonMistakes": [
      "Tưởng khi `acc` lỗi thì `price_mxn_t4` của C2 cũng biến thành `NaN`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-075",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `uoc_tinh_chi_phi()` khi `city_reviews` không được truyền và không có `data/raw/`.",
    "question": "Xét hàm `uoc_tinh_chi_phi(cfg, total_llm=1000, city_reviews=None)` (`src/evaluate.py:L207-L239`). Nếu trên máy KHÔNG có thư mục `data/raw/*/reviews.csv.gz` và YAML cũng không đặt `llm.city_reviews`, bảng trả về có mấy dòng?",
    "quickAnswer": "Bảng `df` chỉ có **1 dòng** duy nhất là `\"mau_llm\"` (`so_review = 1000`, `chi_phi_usd = 0.2030`), đồng thời in cảnh báo `[EVAL WARN] Chưa có data/raw/*/reviews.csv.gz -> truyền --city-reviews để ước tính mốc cuối`!",
    "explanation": "Hàm chạy an toàn không crash dù thiếu thư mục `data/raw/`.",
    "projectLink": "src/evaluate.py:L215-L227",
    "codeLocation": "src/evaluate.py:L215-L227",
    "proofExample": "1 dòng + [EVAL WARN].",
    "followUpQuestions": [
      "Trong lần chạy xuất `reports/llm_cost_estimate.csv` tại tag final (có 2 dòng: `1000` và `1719730`), con số `1719730` đến từ đâu?"
    ],
    "followUpQA": [
      {
        "q": "Trong lần chạy xuất `reports/llm_cost_estimate.csv` tại tag final (có 2 dòng: `1000` và `1719730`), con số `1719730` đến từ đâu?",
        "a": "Đến từ bước đọc `data/raw/2026-06-15/reviews.csv.gz` (hoặc truyền `--city-reviews 1719730`) đếm số `id` duy nhất ở mốc cuối `t4`."
      }
    ],
    "commonMistakes": [
      "Tưởng hàm sẽ văng `FileNotFoundError` khi thiếu `data/raw/`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-076",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "Python",
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `export_cache_to_csv()` khi cache chứa nhãn thừa ngoài YAML hoặc thiếu khóa.",
    "question": "Trong `load_cache(cache_path, required_aspects=[\"location\", \"noise\"])` (`src/llm.py:L92-L113`), một dòng trong `llm_cache.jsonl` có `aspects = {\"location\": \"positive\"}` (thiếu `\"noise\"`). Dòng đó có được nạp vào dict `cache` không?",
    "quickAnswer": "KHÔNG! Ở `L107`, `has_aspects = all(a in aspects_dict for a in required_aspects)` cho `False` vì thiếu `\"noise\"` -> bản ghi bị bỏ qua khỏi `cache` để được gọi bù lại.",
    "explanation": "Bảo đảm schema trong cache luôn đủ các khía cạnh YAML yêu cầu.",
    "projectLink": "src/llm.py:L107-L110",
    "codeLocation": "src/llm.py:L107-L110",
    "proofExample": "Bị loại khỏi cache -> sẽ gọi bù.",
    "followUpQuestions": [
      "Ngược lại, nếu trong cache đã có đủ 7 khía cạnh nhưng trong YAML người dùng rút gọn xuống còn 3 khía cạnh, `all(a in aspects_dict for a in required_aspects)` trả `True` hay `False`?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại, nếu trong cache đã có đủ 7 khía cạnh nhưng trong YAML người dùng rút gọn xuống còn 3 khía cạnh, `all(a in aspects_dict for a in required_aspects)` trả `True` hay `False`?",
        "a": "Trả **`True`** (vẫn tái sử dụng được ngay cache cũ cho tập con 3 khía cạnh mà không phải tốn tiền gọi API lại!)."
      }
    ],
    "commonMistakes": [
      "Tưởng `load_cache()` nạp tất cả mọi dòng JSON hợp lệ không cần kiểm đủ khía cạnh."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-077",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết màu và trục trong `plot_ppg_snapshots()` tại mốc `t2`.",
    "question": "Ở `src/viz.py:L166-L176`, tại khung `i = 1` (`t2`: toàn bộ `med` là `NaN`, `cnt` là `0`, `snap_med` là `NaN`), những gì được vẽ lên `axes_flat[1]`?",
    "quickAnswer": "1. `ax.barh(y, med.fillna(0.0), ...)` vẽ các thanh có chiều dài `0.0` (không thấy thanh);\n2. Vòng `for` ở `L167-L169` viết `\"NA (n=0)\"` màu xám `#64748B` bên lề trái từng khu vực;\n3. Nhánh `else` (`L174-L176`) không vẽ đường đứt nét `axvline` mà hiển thị hộp cảnh báo viền đỏ ở giữa khung: *\"Không có dữ liệu giá hợp lệ / n = 0 / 1,000\"*.",
    "explanation": "Trình bày minh bạch hoàn toàn trạng thái thiếu dữ liệu mà không phá lưới 2×2.",
    "projectLink": "src/viz.py:L166-L176",
    "codeLocation": "src/viz.py:L166-L176",
    "proofExample": "Nhãn NA (n=0) + hộp cảnh báo đỏ.",
    "followUpQuestions": [
      "Tại sao ở cuối hàm (`L186`) lại chỉ gọi `axes_flat[0].invert_yaxis()` một lần mà cả 4 khung đều đảo trục Y từ A01 trên cùng xuống A08 dưới cùng?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao ở cuối hàm (`L186`) lại chỉ gọi `axes_flat[0].invert_yaxis()` một lần mà cả 4 khung đều đảo trục Y từ A01 trên cùng xuống A08 dưới cùng?",
        "a": "Vì ở `L155` đã truyền `sharey=True`, nên đảo trục Y trên 1 khung tự động đồng bộ áp dụng lên cả 4 khung!"
      }
    ],
    "commonMistakes": [
      "Tưởng khung t2 để trống trơn không có nhãn khu vực hay chữ NA."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-078",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "trace",
    "topics": [
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết biểu thức `LANG_PATTERNS` cho câu rỗng vs toàn số vs tiếng Việt.",
    "question": "Cho 3 chuỗi: S1 = `\"   \"`, S2 = `\"2026!\"`, S3 = `\"Phòng rất sạch, chủ nhà nhiệt tình\"`. Qua `detect_language()` (`src/baseline.py:L74-L81`), kết quả trả về cho S1, S2, S3 lần lượt là gì?",
    "quickAnswer": "S1 (`not text.strip()`) -> **`\"und\"`**; S2 (không có chữ cái khớp `[^\\W\\d_]`) -> **`\"und\"`**; S3 (khớp `LANG_PATTERNS` mục `\"vi\"`) -> **`\"vi\"`**!",
    "explanation": "Cho thấy hàm tự động hỗ trợ cả câu đánh giá tiếng Việt bên cạnh Anh/Tây Ban Nha/Pháp/Bồ/Đức.",
    "projectLink": "src/baseline.py:L57, L74-L81",
    "codeLocation": "src/baseline.py:L57, L74-L81",
    "proofExample": "und, und, vi.",
    "followUpQuestions": [
      "Với S4 = `\"Bonito departamento, muy limpio\"`, hàm trả về gì?"
    ],
    "followUpQA": [
      {
        "q": "Với S4 = `\"Bonito departamento, muy limpio\"`, hàm trả về gì?",
        "a": "Khớp từ `\"muy\"`, `\"departamento\"` ở mẫu `\"es\"` đầu danh sách -> trả về **`\"es\"`**."
      }
    ],
    "commonMistakes": [
      "Đoán S2 trả về `\"en\"`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-079",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `_load_snapshots()` khi thiếu 1 cột trong `REQUIRED_QA_COLS`.",
    "question": "Giả sử tệp `listings.csv` của mốc `t3` bị thiếu cột `qa_invalid_availability`. Khi chạy `src/kpi.py`, ngoại lệ nào được ném ra, ở hàm nào, và trước khi hàm nào kịp chạy?",
    "quickAnswer": "Bên trong **`_load_snapshots()`** (`src/kpi.py:L104-L108`), phép trừ tập `missing_cols = sorted(required_cols - set(df.columns))` tìm thấy `[\"qa_invalid_availability\"]` và lập tức ném **`ValueError(\"[KPI] 2026-03-30 thiếu cột QA bắt buộc ['qa_invalid_availability']\")`** ngay từ bước nạp dữ liệu — trước khi bất kỳ hàm `compute_*()` nào chạy!",
    "explanation": "Fail-fast rõ ràng chính xác tên snapshot và cột bị thiếu.",
    "projectLink": "src/kpi.py:L104-L108",
    "codeLocation": "src/kpi.py:L104-L108",
    "proofExample": "ValueError tại _load_snapshots L106.",
    "followUpQuestions": [
      "Ngoài 12 cột trong `REQUIRED_QA_COLS`, tập `required_cols` ở dòng 97 còn cộng thêm cột nào?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài 12 cột trong `REQUIRED_QA_COLS`, tập `required_cols` ở dòng 97 còn cộng thêm cột nào?",
        "a": "Cộng thêm `{_price_col(config)}`, tức cột `\"price_mxn\"` với cấu hình Mexico City!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng tới tận hàm `compute_occupancy_kpis()` mới báo `KeyError`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-080",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "trace",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết đường dẫn từ `get_config_path()` khi truyền tham số CLI sai tên file.",
    "question": "Chạy `python src/download.py --config configs/khong_ton_tai.yaml`. Hàm `get_config_path()` (`src/download.py:L89-L106`) trả về gì và dòng nào kết thúc chương trình?",
    "quickAnswer": "Trong `get_config_path()`, vì `target` khác None, hàm KHÔNG kiểm tra file tồn tại mà trả về `Path(PROJECT_ROOT / \"configs/khong_ton_tai.yaml\")` (`L97`). Ngay sau đó ở `main()` dòng `L118-L119`, kiểm `if not cfg_file.exists():` kích hoạt `sys.exit(\"Không tìm thấy file cấu hình: ...\")` với exit code 1!",
    "explanation": "Nếu KHÔNG truyền `--config` và cũng xóa mất `configs/mexico-city.yaml` thì chính `get_config_path()` ở `L103` sẽ gọi `sys.exit(...)`.",
    "projectLink": "src/download.py:L91-L120",
    "codeLocation": "src/download.py:L91-L120",
    "proofExample": "get_config_path trả Path -> main L119 sys.exit.",
    "followUpQuestions": [
      "Nếu người dùng truyền cả positional `a.yaml` lẫn `--config b.yaml`, biểu thức `args.config or args.config_pos` ở `L116` chọn file nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu người dùng truyền cả positional `a.yaml` lẫn `--config b.yaml`, biểu thức `args.config or args.config_pos` ở `L116` chọn file nào?",
        "a": "Chọn **`b.yaml`** (tham số tường minh `--config` được ưu tiên trước positional argument)."
      }
    ],
    "commonMistakes": [
      "Tưởng `get_config_path()` luôn kiểm `exists()` cho cả tham số CLI."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vx-081",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết biến `_clean_str()` trong `export_cache_to_csv()`.",
    "question": "Xét dòng review trong `reviews_llm.csv` có `comments = \"Nice!\"`, `reviewer_name = np.nan`, `date = None`. Sau khi đi qua `_clean_str()` (`src/llm.py:L123-L127`) và xuất `reviews_sentiment.csv`, 3 ô đó trở thành gì?",
    "quickAnswer": "`comments = \"Nice!\"`, còn `reviewer_name` và `date` sau `_clean_str()` trở thành chuỗi rỗng `\"\"` (thay vì chữ `\"nan\"` hay `\"None\"`), khi ghi ra CSV là ô trống sạch sẽ!",
    "explanation": "Tránh rác dữ liệu `\"nan\"` trong cột chuỗi.",
    "projectLink": "src/llm.py:L123-L127, L164-L167",
    "codeLocation": "src/llm.py:L123-L127, L164-L167",
    "proofExample": "\"Nice!\", \"\", \"\".",
    "followUpQuestions": [
      "Vì sao `_clean_str()` viết `if val is None or pd.isna(val):` với `val is None` đứng trước?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao `_clean_str()` viết `if val is None or pd.isna(val):` với `val is None` đứng trước?",
        "a": "Thực ra `pd.isna(None)` đã là `True`, nhưng đặt `val is None` trước tạo kiểm tra nhanh chuẩn Python và an toàn nếu `val` là một object đặc biệt khiến `pd.isna()` trả mảng (như list/ndarray)."
      }
    ],
    "commonMistakes": [
      "Cho rằng `str(np.nan)` cho chuỗi rỗng (thực tế `str(np.nan)` cho chữ `\"nan\"` có độ dài 3!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-082",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `df.duplicated()` với cột chứa `NaN` ở khóa `last_scraped`.",
    "question": "Cho 2 dòng: `(id=\"10\", last_scraped=np.nan, price=500)` và `(id=\"10\", last_scraped=np.nan, price=900)`. Khi chạy `df.duplicated(subset=[\"id\", \"last_scraped\"], keep=\"first\")` (`src/qa.py:L62`), kết quả mặt nạ là gì?",
    "quickAnswer": "Trả về **`[False, True]`**! Trong pandas, `duplicated()` coi hai giá trị `NaN` nằm ở cùng khóa là **GIỐNG NHAU** -> dòng thứ 2 (`price=900`) bị xóa mất!",
    "explanation": "Chính là edge case được ghi chú trong QA Rules audit.",
    "projectLink": "src/qa.py:L62-L67",
    "codeLocation": "src/qa.py:L62-L67",
    "proofExample": "[False, True] -> xóa dòng 2.",
    "followUpQuestions": [
      "Nếu muốn giữ dòng có `price` lớn hơn hoặc không thiếu khi lỡ trùng `[id, last_scraped]`, nên chạy lệnh gì trước `drop_duplicates`/`duplicated`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu muốn giữ dòng có `price` lớn hơn hoặc không thiếu khi lỡ trùng `[id, last_scraped]`, nên chạy lệnh gì trước `drop_duplicates`/`duplicated`?",
        "a": "`df.sort_values([\"id\", \"last_scraped\", \"price\"], ascending=[True, True, False], na_position=\"last\")` để đẩy bản đầy đủ lên đầu tiên."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng vì `NaN != NaN` nên `duplicated()` sẽ giữ nguyên cả 2 dòng trên."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-083",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_round_or_nan()` và làm tròn ngân hàng Python.",
    "question": "Giá trị trả về của `_round_or_nan(0.12345, 4)`, `_round_or_nan(0.12355, 4)` và `_round_or_nan(pd.NA, 4)` trong `src/kpi.py:L65-L66` là gì?",
    "quickAnswer": "`_round_or_nan(0.12345, 4)` -> `0.1235` (hoặc `0.1234` tùy biểu diễn nhị phân IEEE 754 gần nhất — thực tế `round(0.12345, 4) = 0.1235` hay `round(2.5) = 2`); quan trọng hơn `_round_or_nan(pd.NA, 4)` nhờ `pd.isna(pd.NA) == True` sẽ trả về **`np.nan`** chứ không lỗi `TypeError`!",
    "explanation": "Bảo đảm kiểu float nhất quán thay vì giữ `pd.NA` lọt vào cột số float.",
    "projectLink": "src/kpi.py:L65-L66",
    "codeLocation": "src/kpi.py:L65-L66",
    "proofExample": "pd.NA -> np.nan an toàn.",
    "followUpQuestions": [
      "Tại sao không dùng `val is None` thay cho `pd.isna(val)` ở `_round_or_nan()`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao không dùng `val is None` thay cho `pd.isna(val)` ở `_round_or_nan()`?",
        "a": "Vì `val` truyền vào từ `group[col].mean()` có thể là `np.nan` hoặc `pd.NA`, cả hai đều khiến `val is None` ra `False`!"
      }
    ],
    "commonMistakes": [
      "Gọi `round(float(val), 4)` trực tiếp lên `pd.NA` -> ném `TypeError: float() argument must be a string or a real number, not \"NAType\"`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-084",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `_load_geojson()` với `Polygon` vs `MultiPolygon` và lọc `len(r) >= 3`.",
    "question": "Một tính năng trong `neighbourhoods.geojson` có `geometry = {\"type\": \"Polygon\", \"coordinates\": [[[0,0],[1,0]]]}` (chỉ có 2 điểm đỉnh). Hàm `_load_geojson()` (`src/viz.py:L82-L92`) xử lý tính năng đó thế nào?",
    "quickAnswer": "`raw_rings = [[[0,0],[1,0]]]`, nhưng dòng `L87` lọc `if len(r) >= 3` -> `rings` rỗng `[]` -> `if name and rings:` là `False` nên **bỏ qua đa giác lỗi < 3 đỉnh** (không tạo đa giác suy biến 2 điểm)! Nếu toàn bộ file không còn đa giác nào hợp lệ sẽ ném `ValueError` ở `L91`.",
    "explanation": "Ngăn lỗi đồ họa khi GeoJSON có hình học suy biến.",
    "projectLink": "src/viz.py:L82-L92",
    "codeLocation": "src/viz.py:L82-L92",
    "proofExample": "Bỏ qua ring < 3 điểm.",
    "followUpQuestions": [
      "Nếu một quận là `MultiPolygon` có 2 đảo, `raw_rings` ở dòng `L86` chứa mấy phần tử?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một quận là `MultiPolygon` có 2 đảo, `raw_rings` ở dòng `L86` chứa mấy phần tử?",
        "a": "Chứa **`2`** mảng tọa độ (vòng ngoài `p[0]` của từng đảo `p` trong `coords`)."
      }
    ],
    "commonMistakes": [
      "Vẽ đa giác 1 hoặc 2 điểm gây lỗi hiển thị hoặc lỗi chia 0 trong `_centroid()`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-085",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `gom_du_doan()` trên cột `aspects` chứa giá trị thiếu.",
    "question": "Cho 1 review `\"R5\"` trong bảng `llm` có `overall_sentiment = \"positive\"`, `language = \"en\"`, và 6 cột aspect là `\"not_mentioned\"`, riêng cột `\"amenities\"` bị `NaN`. Sau `gom_du_doan(llm)` (`src/evaluate.py:L77-L87`), giá trị của `d[\"aspects\"][\"R5\"]` và `d[\"aspect_labels\"][\"R5\"][\"amenities\"]` là gì?",
    "quickAnswer": "Do `L81` chạy `kc = df[aspects].fillna(\"not_mentioned\")`, ô `amenities = NaN` được chuẩn hóa thành `\"not_mentioned\"` -> `d[\"aspects\"][\"R5\"]` = **`set()`** (rỗng) và `d[\"aspect_labels\"][\"R5\"][\"amenities\"]` = **`\"not_mentioned\"`**.",
    "explanation": "Tránh trường hợp `NaN != \"not_mentioned\"` bị đưa nhầm vào tập các khía cạnh được nhắc tới!",
    "projectLink": "src/evaluate.py:L81-L86",
    "codeLocation": "src/evaluate.py:L81-L86",
    "proofExample": "set() và \"not_mentioned\".",
    "followUpQuestions": [
      "Tại sao ở `evaluate.py:L83` lại dùng `kc.columns[r.ne(\"not_mentioned\").to_numpy()]` có `.to_numpy()`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao ở `evaluate.py:L83` lại dùng `kc.columns[r.ne(\"not_mentioned\").to_numpy()]` có `.to_numpy()`?",
        "a": "Để lập chỉ mục mảng boolean thuần cho `pd.Index` (cột) một cách nhanh và sạch cảnh báo trên các phiên bản pandas mới."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng nếu `amenities` là `NaN` thì `r.ne(\"not_mentioned\")` sẽ trả `True` và đưa `\"amenities\"` vào `d[\"aspects\"][\"R5\"]`!"
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-086",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Baseline",
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết nhánh `reset_index(drop=True)` trong `baseline.main()`.",
    "question": "Ở `src/baseline.py:L148-L152`, giả sử `df_all` có index bị cắt lọc trước đó thành `[5, 10, 15]` (3 dòng), còn `preds = pd.DataFrame(...)` mới tạo có index mặc định `[0, 1, 2]`. Điều gì xảy ra nếu ở `L151` QUÊN viết `.reset_index(drop=True)` trước `pd.concat([df_all[meta_cols], preds], axis=1)`?",
    "quickAnswer": "`pd.concat(axis=1)` khớp ngang theo INDEX! Kết quả sẽ nở phình ra thành **6 dòng** (index `0, 1, 2, 5, 10, 15`) trong đó 3 dòng đầu thiếu sạch metadata (`comments = NaN`) và 3 dòng sau thiếu sạch dự đoán (`overall_sentiment = NaN`)!",
    "explanation": "Lỗi cực kỳ phổ biến khi ghép ngang bảng dữ liệu trong pandas.",
    "projectLink": "src/baseline.py:L151",
    "codeLocation": "src/baseline.py:L151",
    "proofExample": "Phình 6 dòng lệch khớp nửa trên/dưới toàn NaN.",
    "followUpQuestions": [
      "Làm sao kiểm tra nhanh trên `df_out` sau `concat(axis=1)` xem có bị lệch index như vậy không?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao kiểm tra nhanh trên `df_out` sau `concat(axis=1)` xem có bị lệch index như vậy không?",
        "a": "Kiểm tra `assert len(df_out) == len(df_all)`!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `pd.concat(..., axis=1)` tự động ghép hàng 1 với hàng 1 bất kể giá trị index."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-087",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `compute_kpi_by_snapshot()` với `snapshot_stats` ở mốc `t2`.",
    "question": "Trong `compute_kpi_by_snapshot()` (`src/kpi.py:L353-L365`), tại mốc `t2`, `stat` trả về `valid_price_count = 0`, `median_price_mxn = np.nan`. Sau khi qua `.astype(\"Int64\")` ở dòng `L365`, giá trị `valid_price_count`, `valid_ppg_count`, và `median_price_mxn` ở dòng `t2` trong CSV là gì?",
    "quickAnswer": "`valid_price_count = 0`, `valid_ppg_count = 0` (số nguyên `0`), còn `median_price_mxn = \"\"` (`NaN`, ô trống trong CSV).",
    "explanation": "Khớp hoàn toàn dòng `t2 (2025-12-29)` của `data/processed/kpi_by_snapshot.csv`.",
    "projectLink": "src/kpi.py:L353-L365",
    "codeLocation": "src/kpi.py:L353-L365",
    "proofExample": "0, 0, NaN.",
    "followUpQuestions": [
      "Còn ở `t1`, cột `ghost_count` có bằng `<NA>` không hay bằng số nguyên cụ thể?"
    ],
    "followUpQA": [
      {
        "q": "Còn ở `t1`, cột `ghost_count` có bằng `<NA>` không hay bằng số nguyên cụ thể?",
        "a": "Bằng số nguyên **`7`** (7 căn ghost trên `ghost_n = 1000`)."
      }
    ],
    "commonMistakes": [
      "Nhầm rằng ở t2 `valid_price_count` cũng mang giá trị `<NA>` giống `review_velocity_n` ở `t1` (thực ra t2 đếm được là `0` căn hợp lệ trên 1.000!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-088",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA",
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết chuỗi thay đổi `qa_price_outlier` khi một căn bị thay giá.",
    "question": "Cho 5 căn có `price_mxn = [100, 500, 600, 700, 50000]` (`valid_p` có 5 phần tử), `q_low=0.01`, `q_high=0.99`. Kết quả `p_low`, `p_high` và số căn bị gắn cờ `qa_price_outlier` là bao nhiêu?",
    "quickAnswer": "Với `n=5`, `quantile(0.01)` nội suy gần 100 -> `100 + 0.04*400 = 116.0`; `quantile(0.99)` = `700 + 0.96*49300 = 48028.0`. Kết quả `100 < 116` (`True`) và `50000 > 48028` (`True`) -> có **2 căn** (đầu dưới `100` và đầu trên `50000`) bị gắn `qa_price_outlier = True`!",
    "explanation": "Phân vị trên cỡ mẫu nhỏ nội suy tuyến tính co vào trong nên vẫn bắt được đúng 2 cực.",
    "projectLink": "src/qa.py:L144-L146",
    "codeLocation": "src/qa.py:L144-L146",
    "proofExample": "p_low=116, p_high=48028 -> 2 căn outlier.",
    "followUpQuestions": [
      "Nếu `n = 1` (chỉ có 1 căn hợp lệ), `P01` và `P99` bằng bao nhiêu và số dòng outlier bằng mấy?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `n = 1` (chỉ có 1 căn hợp lệ), `P01` và `P99` bằng bao nhiêu và số dòng outlier bằng mấy?",
        "a": "Đều bằng đúng giá trị duy nhất đó -> điều kiện ngặt `> / <` trả về `0` căn outlier."
      }
    ],
    "commonMistakes": [
      "Tưởng `P99` với 5 phần tử luôn bằng đúng `max = 50000` nên không có căn nào > P99."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-089",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết thứ tự snapshot trong `filter_data_from_sheet.py` vs `qa.py`.",
    "question": "Nếu trong YAML ghi `snapshots: [\"2026-06-15\", \"2025-09-27\"]` (ngược thứ tự thời gian), hàm `run_filter_data()` (`L166`) và `qa.main()` (`L327`) lặp xử lý thư mục nào trước?",
    "quickAnswer": "Cả hai hàm đều bọc `sorted(..., key=pd.to_datetime)` nên LUÔN chuẩn hóa lại theo thứ tự thời gian tăng dần: xử lý **`2025-09-27` trước**, rồi mới tới **`2026-06-15`**!",
    "explanation": "Đảm bảo mọi log và nhãn `t1, t2...` không bao giờ bị đảo ngược do thứ tự gõ trong YAML.",
    "projectLink": "src/filter_data_from_sheet.py:L166; src/qa.py:L327",
    "codeLocation": "src/filter_data_from_sheet.py:L166; src/qa.py:L327",
    "proofExample": "2025-09-27 trước.",
    "followUpQuestions": [
      "Ngược lại trong `llm.py:L67` và `baseline.py:L131`, vòng lặp `for snap in reversed(snapshots):` lại duyệt theo chiều nào trước?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại trong `llm.py:L67` và `baseline.py:L131`, vòng lặp `for snap in reversed(snapshots):` lại duyệt theo chiều nào trước?",
        "a": "Duyệt từ **mốc mới nhất (`2026-06-15` -> `t4`) trở về trước** để tìm tệp `reviews_llm.csv`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `t1` luôn lấy phần tử thứ 0 theo thứ tự viết trong file YAML."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vx-090",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết logic tự động chọn trục X trong `plot_ppg_riqr()` và `plot_riqr_neighbourhood()`.",
    "question": "Trong `src/viz.py:L133`, `ax2.set_xlim(0, max(1.0, float(riqr.max(skipna=True)) ...) * 1.38)`. Tại sao phải nhân hệ số **`* 1.38`** vào giá trị cực đại của rIQR (và `* 1.32` ở `plot_ppg_snapshots`)?",
    "quickAnswer": "Vì bên phải mỗi thanh ngang `barh` có in thêm nhãn chữ khá dài như `\"0.953 (Med 428)\"` (`ax2.bar_label(..., padding=4)`). Nếu `xlim` chỉ đặt vừa khít bằng giá trị `max(rIQR)`, toàn bộ chuỗi nhãn ở thanh dài nhất sẽ tràn ra ngoài khung hình bên phải! Nhân `1.38` chừa sẵn ~28% không gian trống bên phải cho chữ nhãn.",
    "explanation": "Mẹo căn khung cực kỳ thực tế trong Matplotlib.",
    "projectLink": "src/viz.py:L133, L152, L316",
    "codeLocation": "src/viz.py:L133, L152, L316",
    "proofExample": "Chừa chỗ cho nhãn chữ dài bên phải thanh barh.",
    "followUpQuestions": [
      "Tương tự ở `plot_ppg_snapshots()` (`L169`), tọa độ X đặt chữ nhãn `lbl` được tính theo công thức nào?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự ở `plot_ppg_snapshots()` (`L169`), tọa độ X đặt chữ nhãn `lbl` được tính theo công thức nào?",
        "a": "Lấy `(m nếu m hợp lệ ngược lại 0.0) + xmax * 0.012` — tạo khoảng hở tỷ lệ 1.2% đồng đều sau mũi thanh (hoặc sát trục 0 khi là `\"NA (n=0)\"`!)."
      }
    ],
    "commonMistakes": [
      "Tưởng hệ số `1.38` là một hằng số KPI toán học."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-091",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `uoc_tinh_chi_phi()` khi `model_name` trong YAML viết hoa hoặc có tiền tố `\"models/\"`.",
    "question": "Trong `src/evaluate.py:L212`, dòng code `rates = MODEL_PRICING_PER_1M.get(model_name.removeprefix(\"models/\").strip().lower())` xử lý được chuỗi `\"models/Gemini-3.5-Flash-Lite \"` như thế nào?",
    "quickAnswer": "`.removeprefix(\"models/\")` bóc tiền tố chuẩn Google SDK (CHÚ Ý: trong code gốc gọi `removeprefix` trước `.lower()`, nên `\"models/...\"` chữ thường mới khớp tiền tố, còn `.strip().lower()` đưa phần tên model về `\"gemini-3.5-flash-lite\"`) -> tra trúng bảng giá **`(0.30, 2.50)`** USD / 1M tokens!",
    "explanation": "Một chi tiết hay khi đối chiếu chính xác code thật: nếu người dùng viết `\"MODELS/gemini-3.5-flash-lite\"` viết hoa thì `removeprefix` trước `.lower()` sẽ không bóc `\"MODELS/\"` — rất tinh tế khi soi dòng code!",
    "projectLink": "src/evaluate.py:L212",
    "codeLocation": "src/evaluate.py:L212",
    "proofExample": "Tra trúng (0.30, 2.50).",
    "followUpQuestions": [
      "Nếu người dùng đổi sang model mới chưa có trong `MODEL_PRICING_PER_1M` (nên `rates` là `None`), `uoc_tinh_chi_phi()` có bị lỗi chia/nhân `None` không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu người dùng đổi sang model mới chưa có trong `MODEL_PRICING_PER_1M` (nên `rates` là `None`), `uoc_tinh_chi_phi()` có bị lỗi chia/nhân `None` không?",
        "a": "Không! Nhờ kiểm `if rates else None` ở `L232` và `if cost_usd is not None` ở `L237`, hàm vẫn xuất bình thường số token và để cột `chi_phi_usd = None`."
      }
    ],
    "commonMistakes": [
      "Quên mất tiền tố `\"models/\"` hay có trong config Gemini cũ hoặc viết hoa chữ cái làm tra từ điển thất bại trả về `None`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-092",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết công thức `compute_review_velocities()` khi 1 snapshot bị thiếu 1 ID ở `t1` nhưng có ở `t2`.",
    "question": "Giả sử trong một bộ dữ liệu mẫu khác, ID `\"777\"` vắng mặt ở `t1`, xuất hiện lần đầu ở `t2` với `number_of_reviews = 5`. Phép `diff = nr_curr - nr_prev` (`src/kpi.py:L131`) và `valid_pair` tại `t2` cho ID `\"777\"` nhận giá trị gì?",
    "quickAnswer": "Nhờ Index Alignment, `nr_prev.get(\"777\")` thiếu -> `diff[\"777\"] = 5 - NaN = NaN`! Tiếp đó `valid_prev` tại `\"777\"` cũng là `False` -> `valid_pair = False` -> `review_velocity_q1[\"777\"] = np.nan` (không bị nhầm thành `5` review mới trong quý nếu căn đó vốn đã có sẵn 5 review từ trước khi vào mẫu!).",
    "explanation": "Tính an toàn tự nhiên của Index Alignment + mặt nạ giao 2 phía.",
    "projectLink": "src/kpi.py:L128-L136",
    "codeLocation": "src/kpi.py:L128-L136",
    "proofExample": "diff=NaN -> RV=np.nan.",
    "followUpQuestions": [
      "Nếu ở `t1` một căn bị `qa_missing_reviews = True` dù `number_of_reviews_clean` vẫn ghi số 5, `valid_prev` là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu ở `t1` một căn bị `qa_missing_reviews = True` dù `number_of_reviews_clean` vẫn ghi số 5, `valid_prev` là gì?",
        "a": "Là **`False`** vì `~_qa_flag(df_prev, \"qa_missing_reviews\")` luôn khóa chặt an toàn QA ở cả hai đầu mốc."
      }
    ],
    "commonMistakes": [
      "Tưởng `5 - NaN` ra `5` hoặc báo `KeyError`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-093",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "SQL",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết lỗi khi quên `quote()` tên sheet Google Sheets hoặc để tab ẩn không khớp tên.",
    "question": "Trong `configs/mexico-city.yaml`, nếu ai đó đổi `listing_sheet: Danh sách` (có dấu cách và dấu tiếng Việt) nhưng quên `urllib.parse.quote()` trong `_read_sheet()`, chuyện gì xảy ra vs khi CÓ `quote()` như `src/filter_data_from_sheet.py:L42`?",
    "quickAnswer": "Có `quote(sheet_name)`: `\"Danh sách\"` được mã hóa thành `\"Danh%20s%C3%A1ch\"`, URL hợp lệ gửi thẳng tới Google Visualization API. Nếu không có `quote()`, một số client HTTP hoặc proxy sẽ ngắt URL tại dấu cách đầu tiên và chỉ gửi `\"Danh\"` -> Google Sheets trả lỗi hoặc đọc nhầm sheet đầu tiên của file!",
    "explanation": "Đảm bảo độ tin cậy khi tên tab Google Sheets thay đổi.",
    "projectLink": "src/filter_data_from_sheet.py:L42",
    "codeLocation": "src/filter_data_from_sheet.py:L42",
    "proofExample": "quote mã hóa thành %20%C3%A1.",
    "followUpQuestions": [
      "Cơ chế nào của Google Sheet nếu tab `Review` bị đổi tên thành `\"Review_old\"` trên Drive nhưng YAML vẫn ghi `\"Review\"`?"
    ],
    "followUpQA": [
      {
        "q": "Cơ chế nào của Google Sheet nếu tab `Review` bị đổi tên thành `\"Review_old\"` trên Drive nhưng YAML vẫn ghi `\"Review\"`?",
        "a": "Endpoint `/gviz/tq?tqx=out:csv&sheet=Review` của Google Sheets có đặc tính âm thầm fallback trả về **sheet đầu tiên** (chính là `Listing`!) -> lúc đó `_filter_assignments` tìm cột `\"review_id\"` trong sheet `Listing` sẽ lập tức báo `KeyError: 'review_id'`!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `requests.get()` tự động URL-encode cả chuỗi URL thô đã ghép sẵn bằng f-string."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vx-094",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "Python",
      "Architecture"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `os.environ` truyền sang subprocess ở `run_pipeline.py:L47`.",
    "question": "Trong `run_pipeline.py:L47`, lệnh `env = {**os.environ, \"PIPELINE_CONFIG\": str(config_path), \"PYTHONIOENCODING\": \"utf-8\"}` được truyền vào `subprocess.run(..., env=env)`. Biến môi trường `PIPELINE_CONFIG` trong chính tiến trình cha `run_pipeline.py` có bị đổi không?",
    "quickAnswer": "KHÔNG! Nhờ `{**os.environ, ...}` tạo một dictionary bản sao mới, chỉ 8 tiến trình con nhận được biến `PIPELINE_CONFIG` và `PYTHONIOENCODING`, hoàn toàn không làm ô nhiễm biến môi trường của tiến trình cha hay shell bên ngoài.",
    "explanation": "Thực hành tốt về cô lập biến môi trường.",
    "projectLink": "run_pipeline.py:L47",
    "codeLocation": "run_pipeline.py:L47",
    "proofExample": "Chỉ subprocess con thấy biến mới.",
    "followUpQuestions": [
      "Lệnh nào trong `run_pipeline.py:L43` đảm bảo dù người dùng truyền `--config configs/mexico-city.yaml` (tương đối), tiến trình con nhận được đường dẫn tuyệt đối?"
    ],
    "followUpQA": [
      {
        "q": "Lệnh nào trong `run_pipeline.py:L43` đảm bảo dù người dùng truyền `--config configs/mexico-city.yaml` (tương đối), tiến trình con nhận được đường dẫn tuyệt đối?",
        "a": "`config_path = (cfg if cfg.is_absolute() else PROJECT_ROOT / cfg).resolve()`."
      }
    ],
    "commonMistakes": [
      "Sửa thẳng `os.environ[\"PIPELINE_CONFIG\"] = ...` rồi nghĩ hàm `run_step` tự tách riêng từng tiến trình."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vx-095",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `_qa_flag` và phép phủ định bitwise `~` trên cột boolean.",
    "question": "Cho cột `s = pd.Series([False, True, np.nan], dtype=\"object\")`. Nếu viết thẳng `~s` không qua `_qa_flag()`, Python/pandas làm gì vs khi đi qua `_qa_flag(df, col)` (`df[col].fillna(True).astype(bool)`)?",
    "quickAnswer": "Viết thẳng `~s` trên Series `object` chứa `True/False/np.nan` sẽ ném ngay **`TypeError: bad operand type for unary ~: \"float\"`** (vì `np.nan` là float, không có toán tử `~`)! Nhờ `_qa_flag()` gọi `.fillna(True).astype(bool)`, `~_qa_flag(...)` trả về an toàn **`[True, False, False]`**!",
    "explanation": "Phát hiện rõ một bẫy kỹ thuật cực tinh tế giải thích lý do tồn tại của `_qa_flag()` ở `src/kpi.py:L60-L62`.",
    "projectLink": "src/kpi.py:L60-L62",
    "codeLocation": "src/kpi.py:L60-L62",
    "proofExample": "TypeError vs [True, False, False].",
    "followUpQuestions": [
      "Tại sao đọc lại cột `qa_missing_price` từ CSV mà vẫn có khả năng cột đó mang kiểu `object` có `NaN`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao đọc lại cột `qa_missing_price` từ CSV mà vẫn có khả năng cột đó mang kiểu `object` có `NaN`?",
        "a": "Nếu có ít nhất 1 ô trong file CSV bị thiếu trống (do chỉnh sửa hay lỗi), pandas đọc cột `True/False` + trống thành `object` chứ không phải `bool`!"
      }
    ],
    "commonMistakes": [
      "Tưởng `~s` luôn hoạt động trên mọi cột đọc từ CSV miễn giá trị bên trong trông giống True/False."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-096",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hành vi `load_assigned_reviews()` fallback sang `glob(\"*/reviews_llm.csv\")`.",
    "question": "Xét hàm `load_assigned_reviews()` (`src/llm.py:L59-L85`). Nếu người dùng sửa danh sách `snapshots` trong YAML thành chỉ 1 mốc mới chưa chạy Filter (`\"2026-09-01\"`), nhưng trong `data/processed/2026-06-15/reviews_llm.csv` vẫn còn tồn tại từ trước, hàm trả về lỗi hay tệp nào?",
    "quickAnswer": "Vòng lặp đầu tiên theo `snapshots` trong YAML không tìm thấy `\"2026-09-01/reviews_llm.csv\"`, nên hàm đi xuống nhánh Fallback (`L77-L83`): `list((PROJECT_ROOT / \"data\" / \"processed\").glob(\"*/reviews_llm.csv\"))` và nạp tệp `2026-06-15/reviews_llm.csv` kèm thông báo đường dẫn tương đối!",
    "explanation": "Hiểu chính xác cả nhánh dự phòng (fallback) giúp phòng ngừa chạy nhầm file cũ khi đổi config.",
    "projectLink": "src/llm.py:L77-L83",
    "codeLocation": "src/llm.py:L77-L83",
    "proofExample": "Nạp fallback 2026-06-15/reviews_llm.csv.",
    "followUpQuestions": [
      "Nhánh `glob(\"*/reviews_llm.csv\")` chọn phần tử `matched[0]` — rủi ro nhỏ nào có thể xảy ra nếu trong `data/processed/` có nhiều snapshot của 2 thành phố khác nhau?"
    ],
    "followUpQA": [
      {
        "q": "Nhánh `glob(\"*/reviews_llm.csv\")` chọn phần tử `matched[0]` — rủi ro nhỏ nào có thể xảy ra nếu trong `data/processed/` có nhiều snapshot của 2 thành phố khác nhau?",
        "a": "`glob()` không bảo đảm thứ tự thời gian và có thể lấy nhầm `reviews_llm.csv` của thư mục cũ nếu chạy chung nhiều thành phố trên cùng `data/processed/` -> giải pháp sạch là giữ `data/processed/` theo đúng thành phố đang chạy."
      }
    ],
    "commonMistakes": [
      "Cho rằng `load_assigned_reviews()` báo `FileNotFoundError` ngay nếu không thấy đúng thư mục snapshot trong YAML."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-097",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `plot_llm_vs_baseline()` cách tính và hiển thị độ chênh `(LLM - Baseline)`.",
    "question": "Trong `src/viz.py:L457`, nhãn hiển thị cạnh thanh LLM là `[f\"{l:.3f} ({l - b:+.3f})\" ...]` và cạnh thanh Baseline là `f\"{v:.3f}\"`. Với dòng `cam_xuc_macro_f1` (`llm = 0.9909`, `baseline = 0.5224`), hai nhãn in chính xác ra ảnh `llm_vs_baseline.png` là gì?",
    "quickAnswer": "Do `0.9909 - 0.5224 = 0.4685`, khi định dạng `.3f` làm tròn độc lập: nhãn thanh LLM là **`0.991 (+0.469)`** (`0.9909` -> `0.991`; `0.4685` -> `+0.469` hoặc `+0.468` tùy float, thực tế in `0.991 (+0.469)`), và nhãn thanh Baseline là **`0.522`**!",
    "explanation": "Lưu ý hiện tượng `0.991 - 0.522 = 0.469` khớp luôn với chênh lệch làm tròn.",
    "projectLink": "src/viz.py:L457-L458",
    "codeLocation": "src/viz.py:L457-L458",
    "proofExample": "0.991 (+0.469) và 0.522.",
    "followUpQuestions": [
      "Nếu có một chỉ số mà `Baseline` bị `NaN`, nhãn của thanh LLM ở `L457` viết thành gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu có một chỉ số mà `Baseline` bị `NaN`, nhãn của thanh LLM ở `L457` viết thành gì?",
        "a": "Nhánh `else` ở `L457` (`if pd.notna(l) and pd.notna(b) else f\"{l:.3f}\"`) chỉ in `0.991` không in phần `(nan)`, còn thanh Baseline in `\"NA\"`!"
      }
    ],
    "commonMistakes": [
      "Viết format thiếu dấu `+` khiến số dương hiện `(0.469)` còn số âm hiện `(-0.050)` không đồng nhất."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-098",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `compute_kpi_by_listing()` cách lấy cột `price` động theo YAML.",
    "question": "Trong `src/kpi.py:L87-L88, L237`: nếu config đặt `currency: \"usd\"` (hoặc `\" MXN \"`), hàm `_price_col(config)` trả về tên cột nào trong `kpi_by_listing.csv`?",
    "quickAnswer": "`.strip().lower()` đưa về chữ thường không khoảng trắng -> tạo tên cột **`\"price_usd_t1..t4\"`** (hoặc **`\"price_mxn_t1..t4\"`**).",
    "explanation": "Đồng bộ tuyệt đối tên cột giữa `src/qa.py`, `src/kpi.py` và `src/viz.py` (cả `viz.py:L202` cũng dùng `cur.lower()`!).",
    "projectLink": "src/kpi.py:L87-L88; src/viz.py:L202",
    "codeLocation": "src/kpi.py:L87-L88; src/viz.py:L202",
    "proofExample": "price_usd_t1..t4 / price_mxn_t1..t4.",
    "followUpQuestions": [
      "Nhìn vào `viz.py:L202`: `f\"mean_price_{cur.lower()}_{t}\"`, nếu `currency` trong YAML thiếu thì `cur` mặc định là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nhìn vào `viz.py:L202`: `f\"mean_price_{cur.lower()}_{t}\"`, nếu `currency` trong YAML thiếu thì `cur` mặc định là gì?",
        "a": "Mặc định ở `viz.py:L479` là `\"MXN\"` (`cur.lower() -> \"mxn\"`), khớp 100% với `_price_col()` mặc định của `kpi.py`!"
      }
    ],
    "commonMistakes": [
      "Viết hoa `price_MXN_t1` gây `KeyError` ở `viz.py` khi đọc `mean_price_mxn_t4`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-099",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết lỗi khi bỏ cờ `re.I` hoặc thay đổi thứ tự áp dụng `clean_text()`.",
    "question": "Trong `src/baseline.py:L65-L67`, tại sao dòng 65 `html.unescape()` phải chạy TRƯỚC dòng 67 xóa thẻ HTML `re.sub(r\"</?[a-zA-Z][^>]*>\", \" \", s)`? Nếu đảo ngược dòng 67 lên trước dòng 65 với chuỗi `\"&lt;b&gt;Good&lt;/b&gt;\"` thì sao?",
    "quickAnswer": "Nếu chạy `re.sub` xóa thẻ HTML trước `html.unescape()`, chuỗi mã hóa `\"&lt;b&gt;Good&lt;/b&gt;\"` chưa được giải mã thành `\"<b>Good</b>\"` nên `re.sub` bỏ lọt không xóa được thẻ; sau đó `unescape()` mới giải mã ra khiến chữ rác `\"<b>\"` còn dính nguyên trong văn bản!",
    "explanation": "Thứ tự 65 (`unescape`) -> 66 (`<br> -> \n`) -> 67 (xóa các thẻ HTML khác) được sắp xếp hoàn toàn có chủ đích (dòng 66 cũng phải đứng trước dòng 67, nếu không dòng 67 sẽ xóa luôn thẻ `<br/>` thành dấu cách!).",
    "projectLink": "src/baseline.py:L65-L67",
    "codeLocation": "src/baseline.py:L65-L67",
    "proofExample": "Đảo thứ tự -> sót thẻ hoặc mất \\n.",
    "followUpQuestions": [
      "Cụ thể hơn: tại sao dòng 66 (`<br/> -> \\n`) bắt buộc đứng TRƯỚC dòng 67 (`</?[a-zA-Z][^>]*> -> \" \"`)?"
    ],
    "followUpQA": [
      {
        "q": "Cụ thể hơn: tại sao dòng 66 (`<br/> -> \\n`) bắt buộc đứng TRƯỚC dòng 67 (`</?[a-zA-Z][^>]*> -> \" \"`)?",
        "a": "Vì `<br/>` CŨNG khớp mẫu `</?[a-zA-Z][^>]*>` của dòng 67! Nếu dòng 67 chạy trước, nó sẽ biến hết `<br/>` thành khoảng trắng `\" \"`, làm dòng 66 sau đó không còn thấy thẻ `<br/>` nào để đổi thành `\\n`!"
      }
    ],
    "commonMistakes": [
      "Tưởng thứ tự 3 dòng 65, 66, 67 trong `clean_text()` có thể đảo cho nhau tùy ý!"
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-100",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "trace",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `compute_kpi_by_snapshot()` ép kiểu `Int64` trên 6 cột đếm.",
    "question": "Trong `src/kpi.py:L364-L365`, vòng lặp ép kiểu `.astype(\"Int64\")` chạy cho đúng 6 cột nào trong `kpi_by_snapshot.csv`?",
    "quickAnswer": "Chạy cho: `(\"ghost_n\", \"ghost_count\", \"review_velocity_n\", \"occ_n\", \"valid_price_count\", \"valid_ppg_count\")`. Tất cả các cột đếm cỡ mẫu và số lượng listing này đều giữ dạng số nguyên chuẩn (`1000`, `0`, `995`) đồng thời giữ được `<NA>` cho `review_velocity_n` tại `t1` mà không ép cả cột thành `float64` (`1000.0`).",
    "explanation": "Khớp 100% từng tên cột của `kpi_by_snapshot.csv`.",
    "projectLink": "src/kpi.py:L364-L365",
    "codeLocation": "src/kpi.py:L364-L365",
    "proofExample": "6 cột đếm -> Int64.",
    "followUpQuestions": [
      "Còn trong `compute_kpi_by_area()` (`L287-L309`), vì sao `review_velocity_q1_n`, `occ_t1_n`, `valid_ppg_t1` KHÔNG bị thành `.0` mà là số nguyên chuẩn?"
    ],
    "followUpQA": [
      {
        "q": "Còn trong `compute_kpi_by_area()` (`L287-L309`), vì sao `review_velocity_q1_n`, `occ_t1_n`, `valid_ppg_t1` KHÔNG bị thành `.0` mà là số nguyên chuẩn?",
        "a": "Vì mọi khu vực A01–A08 đều là giá trị `int(...)` hợp lệ (kể cả `valid_ppg_t2 = 0` từ `_iqr_stats` trả `int` `0`, không hề chứa `NaN`/`pd.NA` nào!)."
      }
    ],
    "commonMistakes": [
      "Quên ép `Int64` làm CSV xuất ra `1000.0`, `995.0` ở cột đếm số lượng căn hộ."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-101",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `download_file()` khi `target.exists()` ở lần chạy bình thường vs `--force`.",
    "question": "Trong `src/download.py:L88-L90`, nếu tệp `data/raw/2025-09-27/listings.csv.gz` đã tồn tại và có dung lượng `> 0`, khi gọi `python run_pipeline.py` (không truyền `--force`), `download_file()` làm gì?",
    "quickAnswer": "In ra `[SKIP]` kèm dung lượng tệp hiện tại và `return True` ngay lập tức ở `L89-L90` mà không mở bất kỳ kết nối HTTP nào — tạo cơ chế idempotent tiết kiệm băng thông.",
    "explanation": "Khi truyền `force=True` (`--force`), điều kiện `if not force and dest.exists()...` sai nên code đi tiếp xuống vòng `for attempt in range(1, max_retries + 1)` tải lại từ đầu.",
    "projectLink": "src/download.py:L88-L90",
    "codeLocation": "src/download.py:L88-L90",
    "proofExample": "[SKIP] & return True.",
    "followUpQuestions": [
      "Nếu file `.gz` trên đĩa bị hỏng 0 byte (`st_size == 0`), nhánh `[SKIP]` có bỏ qua không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu file `.gz` trên đĩa bị hỏng 0 byte (`st_size == 0`), nhánh `[SKIP]` có bỏ qua không?",
        "a": "Không! Vì điều kiện là `dest.stat().st_size > 0`, tệp 0 byte sẽ tự động được tải lại."
      }
    ],
    "commonMistakes": [
      "Tưởng chạy lại `run_pipeline.py` luôn tải lại toàn bộ 12 file `.csv.gz` từ máy chủ."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vx-102",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "trace",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết vòng lặp Retry và công thức chờ lũy thừa trong `download_file()`.",
    "question": "Trong `src/download.py:L74-L148`, `max_retries = 3` và `backoff_base = 2` (từ `DEFAULT_BACKOFF` hoặc YAML). Nếu lần 1 và lần 2 đều gặp `Timeout`, lần 1 ngủ mấy giây và lần 2 ngủ mấy giây trước khi thử lần 3?",
    "quickAnswer": "Theo công thức `delay = backoff_base ** attempt` (`L137`/`L143`): lần 1 (`attempt=1`) chờ `2**1 = 2s`; lần 2 (`attempt=2`) chờ `2**2 = 4s` trước khi thử lần 3 (`attempt=3`)!",
    "explanation": "Nếu lần 3 vẫn lỗi thì vòng lặp kết thúc, dọn file `.tmp` nếu còn và trả về `False` cho file đó.",
    "projectLink": "src/download.py:L135-L149",
    "codeLocation": "src/download.py:L135-L149",
    "proofExample": "Chờ 2s -> 4s.",
    "followUpQuestions": [
      "Nếu server trả HTTP `404 Not Found` ngay lần 1, hàm có chờ backoff và thử lại lần 2 không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu server trả HTTP `404 Not Found` ngay lần 1, hàm có chờ backoff và thử lại lần 2 không?",
        "a": "KHÔNG! Ở `L105-L108`, gặp `403` hoặc `404` hàm in lỗi và `return False` NGAY LẬP TỨC vì lỗi tài nguyên không tồn tại có thử lại cũng vô ích."
      }
    ],
    "commonMistakes": [
      "Nghĩ lần 1 chờ 0s hoặc `2**0 = 1s` (code dùng `1-indexed`: `range(1, max_retries + 1)`)."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vx-103",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `_is_quota_error()` phân biệt `429 RPM` tạm thời vs hết sạch `RPD` trong ngày.",
    "question": "Trong `src/llm.py:L140-L157`, khi Gemini API ném ngoại lệ chuỗi `\"429 RESOURCE_EXHAUSTED: Quota exceeded for metric generate_content_free_tier_requests per day, quotaId: GenerateRequestsPerDayPerProjectPerModel\"`, hàm `_is_quota_error(err)` trả về True hay False?",
    "quickAnswer": "Trả về **`True`** vì chuỗi chứa `\"resource_exhausted\"`, `\"per_day\"` / `\"perday\"` / `\"quota exceeded\"`. Khi đó `_process_batch()` ném ngay `QuotaExceededException` để dừng an toàn vòng lặp chính và bảo toàn cache thay vì sleep vô ích!",
    "explanation": "Ngược lại nếu chỉ báo giới hạn theo phút (RPM) mà không trúng các dấu hiệu hết RPD ngày, hệ thống ngủ theo backoff và thử lại.",
    "projectLink": "src/llm.py:L140-L157",
    "codeLocation": "src/llm.py:L140-L157",
    "proofExample": "Trả về True -> ném QuotaExceededException.",
    "followUpQuestions": [
      "Khi `QuotaExceededException` được bắt ở `process_pending_reviews()`, các batch đã xong trước đó có bị mất không?"
    ],
    "followUpQA": [
      {
        "q": "Khi `QuotaExceededException` được bắt ở `process_pending_reviews()`, các batch đã xong trước đó có bị mất không?",
        "a": "Không mất bất kỳ dòng nào vì mỗi item sau khi gọi API đều được ghi append ngay vào `llm_cache.jsonl` bằng `save_to_cache()`."
      }
    ],
    "commonMistakes": [
      "Đánh đồng mọi mã HTTP 429 đều là lỗi có thể chờ vài giây rồi thử lại được."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-104",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "LLM",
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết logic fallback từ `batch_size = 5` xuống `batch_size = 1` ở cuối `llm.py`.",
    "question": "Trong `src/llm.py:L310-L355`, nếu danh sách cần xử lý còn `pending = 12` review với `batch_size = 5` nhưng batch cuối gồm 2 item bị lỗi parse/mismatch một lần, cơ chế recovery làm gì?",
    "quickAnswer": "Vòng chính chia chunk `5, 5, 2`. Các review nào vẫn chưa nằm trong `cache` sau vòng chính sẽ được gom vào danh sách `failed_after_batches` và tự động chạy lại từng câu một với **`batch_size = 1`** ở `L342-L353`!",
    "explanation": "Tăng tỷ lệ phủ lên 1.000/1.000 mẫu hợp lệ mà không phải bỏ cả batch 5 câu chỉ vì 1 câu có ký tự đặc biệt.",
    "projectLink": "src/llm.py:L340-L355",
    "codeLocation": "src/llm.py:L340-L355",
    "proofExample": "Fallback đơn lẻ batch_size=1 cho các item sót.",
    "followUpQuestions": [
      "Hàm làm gì nếu một batch trả về số lượng `items` khác với độ dài `batch` gửi đi?"
    ],
    "followUpQA": [
      {
        "q": "Hàm làm gì nếu một batch trả về số lượng `items` khác với độ dài `batch` gửi đi?",
        "a": "Vẫn đối chiếu từng `review_id` khớp nhau để lưu item hợp lệ, không ghi bừa theo vị trí mảng."
      }
    ],
    "commonMistakes": [
      "Cho rằng nếu một batch 5 câu lỗi thì cả 5 câu vĩnh viễn vắng mặt trong `reviews_sentiment.csv`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vx-105",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `detect_language()` khi review chỉ gồm emoji hoặc dấu câu `👍👍!!!`.",
    "question": "Xét chuỗi `text = \"👍👍!!!\"`. Khi đưa qua `clean_text()` và `detect_language(text)` (`src/baseline.py:L74-L81`), hàm trả về mã ngôn ngữ gì?",
    "quickAnswer": "Không khớp bất kỳ mẫu từ khóa nào trong `LANG_PATTERNS` (`es, fr, de, it, pt, en`), nên hàm rơi xuống dòng trả mặc định cuối cùng ở `L81`: trả về **`\"en\"`**!",
    "explanation": "Đảm bảo trường `language` của Baseline luôn khác rỗng và không bị `NaN`.",
    "projectLink": "src/baseline.py:L74-L81",
    "codeLocation": "src/baseline.py:L74-L81",
    "proofExample": "\"en\"",
    "followUpQuestions": [
      "Khác biệt với LLM khi gặp review toàn emoji `👍👍!!!` là gì?"
    ],
    "followUpQA": [
      {
        "q": "Khác biệt với LLM khi gặp review toàn emoji `👍👍!!!` là gì?",
        "a": "LLM có thể dự đoán `\"other\"` hoặc `\"en\"` tùy ngữ cảnh cấu trúc câu/ngôn ngữ lân cận."
      }
    ],
    "commonMistakes": [
      "Nghĩ `detect_language()` trả về `\"unknown\"` hoặc `None` khi không thấy từ khóa tiếng Anh."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-106",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết đếm phủ định `NEG_RE` với câu chứa vừa khen vừa từ khóa lành tính `BENIGN_RE`.",
    "question": "Với mệnh đề `\"No complaints at all, clean room\"`, chạy qua `src/baseline.py:L94-L105`: `BENIGN_RE` xóa cụm `\"No complaints\"` -> sau đó `NEG_RE` và `POS_RE` đếm ra `(n_neg, n_pos)` bằng bao nhiêu, `overall` là gì?",
    "quickAnswer": "`cleaned` còn `\" at all, clean room\"`. `NEG_RE` không thấy chữ `\"no\"` đứng trước danh từ tiêu cực nào nữa -> `n_neg = 0`; `POS_RE` khớp `\"clean\"` -> `n_pos = 1`. Kết quả `overall = \"positive\"` và `cleanliness = \"positive\"`!",
    "explanation": "Nếu không có `BENIGN_RE`, chữ `\"complaints\"` bị `NEG_RE` bắt thành 1 điểm trừ làm `overall` biến thành `\"mixed\"` sai bản chất!",
    "projectLink": "src/baseline.py:L36-L42, L94-L105",
    "codeLocation": "src/baseline.py:L36-L42, L94-L105",
    "proofExample": "(n_neg=0, n_pos=1) -> overall=\"positive\".",
    "followUpQuestions": [
      "Trong biểu thức `n_pos = len(POS_RE.findall(NEG_RE.sub(\" \", cleaned)))` (`L97`), tại sao lại xóa `NEG_RE` trước khi chạy `POS_RE`?"
    ],
    "followUpQA": [
      {
        "q": "Trong biểu thức `n_pos = len(POS_RE.findall(NEG_RE.sub(\" \", cleaned)))` (`L97`), tại sao lại xóa `NEG_RE` trước khi chạy `POS_RE`?",
        "a": "Để các cụm tiêu cực như `\"dirty\"` hoặc `\"broken\"` đã bị tính ở vế chê không vô tình bị từ khóa khác gần đó khớp chồng lặp làm đếm dương tính."
      }
    ],
    "commonMistakes": [
      "Quên mất cụm `\"no complaints\"`, `\"not dirty\"`, `\"no issues\"` đã được `BENIGN_RE` tẩy trước khi đếm `NEG_RE`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vx-107",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `hau_kiem()` Quy tắc 6 kiểm tra mẫu số trên `reviews_sentiment.csv`.",
    "question": "Trong `src/evaluate.py:L196`, Quy tắc 6 kiểm tra điều gì trên chuỗi `overall_sentiment`? Nếu có 2 bản ghi có ngôn ngữ `\"unknown\"` và 1 bản ghi bị thiếu `overall_sentiment`, hai quy tắc liên quan xuất `so_vi_pham` là bao nhiêu?",
    "quickAnswer": "Quy tắc 6 kiểm tra giá trị `overall_sentiment` nằm ngoài tập hợp lệ `{\"positive\", \"mixed\", \"negative\"}` (phát hiện nhãn rỗng/lạ -> `1` vi phạm). Quy tắc kiểm ngôn ngữ ngoài danh sách cho phép sẽ bắt 2 bản ghi `\"unknown\"`.",
    "explanation": "Cả 6 quy tắc trong `hau_kiem()` chạy độc lập trên toàn bộ 1.000 dòng `reviews_sentiment.csv` (không cần `ground_truth.csv`) và xuất ra `llm_post_check.csv`.",
    "projectLink": "src/evaluate.py:L150-L205",
    "codeLocation": "src/evaluate.py:L150-L205",
    "proofExample": "Xuất bảng llm_post_check.csv với cột quy_tac, so_vi_pham, ti_le.",
    "followUpQuestions": [
      "Kết quả thực tế của Nhóm 4 khi chạy `hau_kiem()` trên 1.000 review LLM có tổng vi phạm của Quy tắc 1–6 là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Kết quả thực tế của Nhóm 4 khi chạy `hau_kiem()` trên 1.000 review LLM có tổng vi phạm của Quy tắc 1–6 là bao nhiêu?",
        "a": "Tất cả các quy tắc cấu trúc cốt lõi đều đạt 0 vi phạm ngoại trừ tỷ lệ rất nhỏ câu ngắn không chứa từ khóa hiển thị rõ ở mức từ vựng (đã thống kê chi tiết trong `reports/llm_post_check.csv`)."
      }
    ],
    "commonMistakes": [
      "Tưởng `hau_kiem()` chỉ chạy trên 100 mẫu của `ground_truth.csv`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-108",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "trace",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết đồng bộ định dạng chuỗi khi so sánh `y_true` và `y_pred` trong `evaluate.py`.",
    "question": "Trong `src/evaluate.py:L90-L120`, nếu `ground_truth.csv` có ô ghi `\" Positive \"` (thừa dấu cách, viết hoa chữ P) còn dự đoán của LLM là `\"positive\"`, code có chấm sai không?",
    "quickAnswer": "Không bị chấm oan! Vì hàm đánh giá gọi `.astype(str).str.strip().str.lower()` để chuẩn hóa cả `y_true` lẫn `y_pred` trước khi nạp vào `accuracy_score()` và `f1_score(..., average=\"macro\")`.",
    "explanation": "Chú ý chuẩn hóa tương tự cho cột `id` bằng string để `merge` 100 nhãn tay khớp tuyệt đối 100/100 với bảng dự đoán.",
    "projectLink": "src/evaluate.py:L90-L120",
    "codeLocation": "src/evaluate.py:L90-L120",
    "proofExample": "Chuẩn hóa .strip().str.lower() trước khi chấm điểm.",
    "followUpQuestions": [
      "Với 7 khía cạnh (`aspects`), `nhan_khia_canh_macro_f1` tính trên bao nhiêu nhãn đầu ra của mỗi review?"
    ],
    "followUpQA": [
      {
        "q": "Với 7 khía cạnh (`aspects`), `nhan_khia_canh_macro_f1` tính trên bao nhiêu nhãn đầu ra của mỗi review?",
        "a": "Trên ma trận 4 lớp (`positive`, `mixed`, `negative`, `not_mentioned`) phẳng hóa qua toàn bộ `100 × 7 = 700` ô dự đoán!"
      }
    ],
    "commonMistakes": [
      "Không strip/lower làm `\"Positive\"` != `\"positive\"` khiến Accuracy sụt vô lý."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vx-109",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `RULE_AVAILABILITY_BOUNDS` vs `RULE_AVAILABILITY_CONSISTENCY` trong `src/qa.py`.",
    "question": "Cho 1 căn hộ có `(a30, a90, a365) = (25, 20, 400)`. Hai quy tắc `RULE_AVAILABILITY_BOUNDS` và `RULE_AVAILABILITY_CONSISTENCY` trong `src/qa.py:L196-L240` gắn cờ True hay False ở đâu và cột `*_clean` đổi thế nào?",
    "quickAnswer": "`a365 = 400` vượt miền `[0, 365]` -> `qa_invalid_availability_bounds = True` -> ép `availability_365_clean = pd.NA`. Đồng thời `a30 (25) > a90 (20)` vi phạm tính đơn điệu -> `qa_inconsistent_availability = True` (được ghi vào `qa_report.csv`)!",
    "explanation": "Phân biệt rất rõ: quy tắc Bounds kiểm từng cột với `[0, 30] / [0, 90] / [0, 365]`, còn quy tắc Consistency kiểm bất đẳng thức chéo `a30 <= a90 <= a365`.",
    "projectLink": "src/qa.py:L196-L245",
    "codeLocation": "src/qa.py:L196-L245",
    "proofExample": "Cờ bounds=True (400>365) và cờ consistency=True (25>20).",
    "followUpQuestions": [
      "Nếu `a30 = 15, a90 = pd.NA, a365 = 60`, `RULE_AVAILABILITY_CONSISTENCY` (`a30 <= a90`) có báo lỗi bất nhất quán không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `a30 = 15, a90 = pd.NA, a365 = 60`, `RULE_AVAILABILITY_CONSISTENCY` (`a30 <= a90`) có báo lỗi bất nhất quán không?",
        "a": "Tại `L219`, dùng `a30_num.fillna(-1) > a90_num.fillna(999)` -> `15 > 999` là `False`, nhưng vế `a90_num.fillna(-1) > a365_num.fillna(999)` trở thành `-1 > 60` (`False`) nên giữ an toàn không báo lỗi giả khi một cột bị NaN!"
      }
    ],
    "commonMistakes": [
      "Gộp chung 2 quy tắc hoặc quên rằng có quy tắc chỉ gắn cờ cảnh báo mà không sửa giá trị khi không xác định được bên nào đúng."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-110",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA",
      "Datetime"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `RULE_LAST_REVIEW_VALIDITY` khi `last_scraped` bị `NaT` ở một số dòng.",
    "question": "Trong `src/qa.py:L278-L295`, nếu một dòng có `last_scraped = NaT` và `last_review = \"2026-06-01\"`, hàm lấy gì làm `ref_date` để kiểm `last_review > ref_date`?",
    "quickAnswer": "Dòng `ref_date = last_scraped_dt.fillna(pd.to_datetime(snapshot_date))` tự động lấp chỗ trống `last_scraped` bằng chính ngày `snapshot_date` của thư mục đang xử lý! Sau đó mới so `last_review_dt > ref_date`.",
    "explanation": "Tránh bỏ lọt ngày review nằm ở tương lai chỉ vì cột `last_scraped` ngẫu nhiên bị trống.",
    "projectLink": "src/qa.py:L278-L295",
    "codeLocation": "src/qa.py:L278-L295",
    "proofExample": "Fallback về snapshot_date.",
    "followUpQuestions": [
      "Khi căn hộ chưa có review nào (`last_review` là `NaT`), `qa_invalid_last_review` bằng True hay False?"
    ],
    "followUpQA": [
      {
        "q": "Khi căn hộ chưa có review nào (`last_review` là `NaT`), `qa_invalid_last_review` bằng True hay False?",
        "a": "**`False`**! Vì có điều kiện `last_review_dt.notna() & (last_review_dt > ref_date)` bảo vệ."
      }
    ],
    "commonMistakes": [
      "Viết thẳng `last_review_dt > last_scraped_dt` làm kết quả luôn `False` mỗi khi `last_scraped` bị `NaT`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-111",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "trace",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết công thức chuẩn hóa giá `price_mxn` khi gặp chuỗi `\"$1,250.00\"` vs `\"Free\"` vs `\"-50\"`.",
    "question": "Cho 3 dòng `price = [\"$1,250.00\", \"Free\", \"-50\"]`. Chạy qua `src/qa.py:L90-L120`, hãy truy vết lần lượt `price_mxn`, `qa_price_parse_error` và `qa_missing_price` cho từng dòng.",
    "quickAnswer": "1) `\"$1,250.00\"` -> giữ `\"1250.00\"` -> `1250.0`, parse_error=`False`, missing_price=`False`;\n2) `\"Free\"` -> chuỗi sau regex rỗng `\"\"` -> `coerce` ra `NaN` -> parse_error=`True` (vì gốc không rỗng mà parse ra NaN), missing_price=`True`;\n3) `\"-50\"` -> parse ra `-50.0` (không NaN nên parse_error=`False`), nhưng `<= 0` nên ở bước sau bị ép `price_mxn = NaN` và `qa_missing_price = True`!",
    "explanation": "Phân biệt hoàn hảo giữa lỗi định dạng chuỗi (`parse_error`) và thiếu/giá <= 0 (`missing_price`).",
    "projectLink": "src/qa.py:L90-L130",
    "codeLocation": "src/qa.py:L90-L130",
    "proofExample": "1250.0 (False,False); NaN (True,True); NaN (False,True).",
    "followUpQuestions": [
      "Trong biểu thức regex `r\"[^\\d.-]\"`, tại sao giữ lại dấu `-`?"
    ],
    "followUpQA": [
      {
        "q": "Trong biểu thức regex `r\"[^\\d.-]\"`, tại sao giữ lại dấu `-`?",
        "a": "Chính nhờ giữ lại dấu `-` mà giá trị âm sai logic `\"-50\"` được đọc thành `-50.0` và lộ diện ở kiểm tra `price <= 0`, thay vì biến mất thành dương `+50.0` đầy nguy hiểm!"
      }
    ],
    "commonMistakes": [
      "Nhầm `\"-50\"` bị bắt ở `qa_price_parse_error` (thực ra `to_numeric(\"-50\")` hợp lệ ra `-50.0` nên bị bắt ở bước `<= 0`)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vx-112",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết `compute_urgency_gap()` công thức và các cờ kiểm tra biên.",
    "question": "Cho 1 căn hộ có `availability_30 = 6`, `availability_90 = 36` và `ghost = 0`. Tính `Occ_1-30`, `Occ_31-90` và `Urgency Gap` chính xác theo `src/kpi.py:L185-L215`.",
    "quickAnswer": "`Occ_1-30 = (30 - 6) / 30 = 24 / 30 = 0.80` (80.0%); `a_31_90 = 36 - 6 = 30`, nên `Occ_31-90 = (60 - 30) / 60 = 30 / 60 = 0.50` (50.0%). Do đó `Urgency Gap = Occ_1-30 - Occ_31-90 = 0.80 - 0.50 = +0.30` (+30.0 pp)!",
    "explanation": "Giá trị dương lớn (+30 pp) cho thấy 30 ngày gần nhất đang bít lịch nhiều hơn hẳn cửa sổ trung hạn 31–90 ngày (nhu cầu đặt gấp / khóa ngắn hạn).",
    "projectLink": "src/kpi.py:L185-L215",
    "codeLocation": "src/kpi.py:L185-L215",
    "proofExample": "Occ_1-30=0.80; Occ_31-90=0.50; Gap=+0.30.",
    "followUpQuestions": [
      "Nếu `a90 = 5 < a30 = 6` (dữ liệu lỗi bị cờ `qa_inconsistent_availability`), code làm gì với `(60 - (a90 - a30)) / 60`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `a90 = 5 < a30 = 6` (dữ liệu lỗi bị cờ `qa_inconsistent_availability`), code làm gì với `(60 - (a90 - a30)) / 60`?",
        "a": "Do `valid_avail` yêu cầu `~qa_inconsistent_availability` (hoặc chặn điều kiện `a90 >= a30`), giá trị sai bị ép về `np.nan`, không để ra `Occ > 100%` vô lý!"
      }
    ],
    "commonMistakes": [
      "Lấy nhầm `Occ_31-90 = (90 - a90) / 90` (trộn lẫn cả 30 ngày đầu với 60 ngày sau) thay vì `(60 - (a90 - a30)) / 60`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-113",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết hàm `_iqr_stats()` trong `src/kpi.py` khi `Series` toàn `NaN` (như tại `t2`).",
    "question": "Gọi `_iqr_stats(df[\"price_mxn_t2\"], digits=2)` (`src/kpi.py:L69-L84`) khi cả 1.000 phần tử đều là `np.nan`. Giá trị trả về của 4 phần tử `(count, median, iqr, riqr)` là gì?",
    "quickAnswer": "Trả về bộ 4 phần tử **`(0, np.nan, np.nan, np.nan)`** nhờ câu lệnh bảo vệ `if valid.empty: return 0, np.nan, np.nan, np.nan` ở `L72-L73`!",
    "explanation": "Nhờ guard `valid.empty` sớm, code không phát sinh `RuntimeWarning: Mean of empty slice` hoặc lỗi chia 0 ở `iqr / med`.",
    "projectLink": "src/kpi.py:L69-L84",
    "codeLocation": "src/kpi.py:L69-L84",
    "proofExample": "Trả về (0, np.nan, np.nan, np.nan).",
    "followUpQuestions": [
      "Nếu `n = 5` và tất cả 5 căn hộ có giá bằng nhau hệt (`med = 0.0`, giả sử lý thuyết), phép tính `riqr = iqr / med` có bị `ZeroDivisionError` không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `n = 5` và tất cả 5 căn hộ có giá bằng nhau hệt (`med = 0.0`, giả sử lý thuyết), phép tính `riqr = iqr / med` có bị `ZeroDivisionError` không?",
        "a": "Trong `L78`: viết `riqr = (iqr / med) if med > 0 else np.nan` nên trả về `np.nan` an toàn tuyệt đối!"
      }
    ],
    "commonMistakes": [
      "Nghĩ `_iqr_stats()` trả về `0.0` cho Median tại `t2` hoặc trả về dictionary 6 khóa."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-114",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "trace",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết tính trung bình giá ở `kpi_by_snapshot` vs `kpi_by_listing` (không lấy trung bình của trung bình).",
    "question": "Trong `src/kpi.py:L330-L355`, `kpi_by_snapshot.csv` tính `median_price_mxn` tại mốc `t4` bằng cách lấy median của 8 khu vực trong `kpi_by_area.csv` hay tính trực tiếp từ `kpi_by_listing`?",
    "quickAnswer": "Tính **trực tiếp từ cột `kpi_by_listing[\"price_mxn_t4\"]`** thông qua `_iqr_stats(df[col])`! Tuyệt đối KHÔNG lấy trung bình hay trung vị của 8 khu vực vì số căn hộ mỗi khu vực lệch nhau cực lớn (A01 có 489 căn vs A06 có 36 căn)!",
    "explanation": "Tránh sai lầm \"Mean of Means\" làm biến dạng thống kê toàn thành phố.",
    "projectLink": "src/kpi.py:L330-L355",
    "codeLocation": "src/kpi.py:L330-L355",
    "proofExample": "Tính trực tiếp từ 1.000 listing ở kpi_by_listing.",
    "followUpQuestions": [
      "Thay đổi cỡ mẫu `valid_price_count` ở `kpi_by_snapshot` tại `t1..t4` trong CDMX lần lượt là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Thay đổi cỡ mẫu `valid_price_count` ở `kpi_by_snapshot` tại `t1..t4` trong CDMX lần lượt là bao nhiêu?",
        "a": "`t1: 995`, `t2: 0`, `t3: 941`, `t4: 959`."
      }
    ],
    "commonMistakes": [
      "Tưởng `kpi_by_snapshot` tổng hợp từ bảng `kpi_by_area`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vx-115",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "trace",
    "topics": [
      "Visualization",
      "NumPy"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết vẽ nhãn `\"NA\"` lên ô thiếu trong `_heatmap()` của `src/viz.py`.",
    "question": "Trong `src/viz.py` hàm `_heatmap()`, tại sao sau khi vẽ `sns.heatmap(mat, mask=mat.isna(), ...)`, code còn chạy thêm vòng lặp `for r, c in np.argwhere(mat.isna().to_numpy()): ax.text(c + 0.5, r + 0.5, \"NA\", ...)`?",
    "quickAnswer": "Vì `mask=mat.isna()` của Seaborn ẩn ô bị `NaN` thành màu nền trống không có chữ; thêm `np.argwhere` với tọa độ tâm ô **`(c + 0.5, r + 0.5)`** giúp ghi rõ `\"NA\"` (chú ý đảo cột `c` làm hoành độ X, hàng `r` làm tung độ Y!) để người đọc biết chính xác cột `t2` là thiếu dữ liệu chứ không phải `0`!",
    "explanation": "Minh họa hoàn hảo ứng dụng thực tế của `np.argwhere` và hệ tọa độ ô lưới Matplotlib.",
    "projectLink": "src/viz.py:L70-L85",
    "codeLocation": "src/viz.py:L70-L85",
    "proofExample": "Đảo (c+0.5, r+0.5) ghi \"NA\".",
    "followUpQuestions": [
      "Tại sao phải `+ 0.5` vào cả `c` và `r`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao phải `+ 0.5` vào cả `c` và `r`?",
        "a": "Vì trong `sns.heatmap`, mỗi ô lưới `(r, c)` trải từ `c` đến `c+1` theo X và từ `r` đến `r+1` theo Y, nên tâm hình học chính là `(c + 0.5, r + 0.5)`."
      }
    ],
    "commonMistakes": [
      "Viết `ax.text(r + 0.5, c + 0.5, \"NA\")` làm tọa độ X và Y bị đổi ngược khiến chữ `\"NA\"` nhảy sai ô!"
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vx-116",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "trace",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Truy vết",
    "evaluationGoal": "Truy vết cờ `--from-step` và `--only` trong `run_pipeline.py` khi gõ tên bước tắt.",
    "question": "Trong `run_pipeline.py:L55-L64`, nếu chạy `python run_pipeline.py --from-step qa --skip-llm`, danh sách bước nào thực sự được chạy và biến `skip_llm` truyền xuống bước nào?",
    "quickAnswer": "`STEPS` bắt đầu từ `qa` (`02`): chạy `qa`, bỏ qua bước gọi API nhưng vẫn truyền `--skip-llm` cho `llm.py` (đọc thẳng `llm_cache.jsonl` để xuất lại `reviews_sentiment.csv`), rồi chạy tiếp `baseline`, `evaluate`, `kpi`, `viz`! (Bỏ qua `download` và `filter`).",
    "explanation": "Giúp tái lập nhanh toàn bộ tầng QA -> KPI -> Viz không cần gọi lại API Gemini hay tải lại raw data.",
    "projectLink": "run_pipeline.py:L25-L64",
    "codeLocation": "run_pipeline.py:L25-L64",
    "proofExample": "Chạy qa, llm (--skip-llm), baseline, evaluate, kpi, viz.",
    "followUpQuestions": [
      "Nếu chạy `python run_pipeline.py --only kpi --skip-llm`, cờ `--skip-llm` có gây lỗi tham số cho `src/kpi.py` không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu chạy `python run_pipeline.py --only kpi --skip-llm`, cờ `--skip-llm` có gây lỗi tham số cho `src/kpi.py` không?",
        "a": "Cần kiểm `argparse`: trong `run_pipeline.py`, `--skip-llm` chỉ được nối vào command khi `name == \"llm\"`, không nối vào `kpi.py` nên không lỗi `unrecognized arguments`!"
      }
    ],
    "commonMistakes": [
      "Nghĩ `--skip-llm` sẽ bỏ qua hoàn toàn file `src/llm.py` không chạy gì cả (thực tế `llm.py --skip-llm` vẫn chạy để đọc cache + merge ra `reviews_sentiment.csv`!)."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  }
];

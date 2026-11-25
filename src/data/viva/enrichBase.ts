import type { VivaQuestion } from '../../types';

export const VIVA_BASE_ENRICHMENT: Record<string, Partial<VivaQuestion>> = {
  "vq-01": {
    "bucket": "theory",
    "topics": [
      "pandas",
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Phân biệt Series vs DataFrame vs ndarray và lý do chọn DataFrame cho dữ liệu hỗn hợp.",
    "codeLocation": "src/qa.py:L42; src/kpi.py:L103",
    "followUpQA": [
      {
        "q": "Một cột lấy ra bằng df[\"gia\"] khác gì với df[[\"gia\"]]?",
        "a": "df[\"gia\"] trả về pandas Series (1D), còn df[[\"gia\"]] truyền danh sách 1 phần tử nên trả về DataFrame 1 cột (2D)."
      },
      {
        "q": "df.dtypes trả về kiểu dữ liệu gì?",
        "a": "df.dtypes trả về một pandas Series có index là tên cột và giá trị là kiểu dữ liệu từng cột."
      }
    ]
  },
  "vq-02": {
    "bucket": "theory",
    "topics": [
      "pandas",
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Giải thích cơ chế vectorization và đánh giá đúng khi nào vòng lặp nhỏ được chấp nhận.",
    "codeLocation": "src/kpi.py:L201; src/llm.py:L324",
    "followUpQA": [
      {
        "q": "Trong src/llm.py có dùng .iterrows() ở process_pending_reviews, vì sao ở đó lại chấp nhận được?",
        "a": "Vì danh sách review LLM chỉ có 1.000 dòng và nút cổ chai thực sự nằm ở độ trễ mạng Gemini API (~1s/lô), không phải CPU lặp DataFrame."
      },
      {
        "q": "Broadcasting xuất hiện ở đâu trong công thức (30.0 - a30) / 30.0?",
        "a": "Broadcasting xảy ra khi số vô hướng 30.0 (shape ()) được mở rộng tự động để trừ và chia cho toàn bộ Series a30 (shape (1000,))."
      }
    ]
  },
  "vq-03": {
    "bucket": "trace",
    "topics": [
      "pandas"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "evaluationGoal": "Kiểm tra hiểu biết Copy-on-Write và Chained Assignment trong pandas 2.2/3.0.",
    "codeLocation": "src/qa.py:L58; src/filter_data_from_sheet.py:L67",
    "followUpQA": [
      {
        "q": "Tại sao df[mask][\"col\"] = val cũng mắc cùng lỗi này?",
        "a": "Vì df[mask] cũng tạo bước chọn thứ nhất tách biệt với df gốc trước khi mở ngoặc thứ hai [\"col\"] = val -> cần gộp 1 bước df.loc[mask, \"col\"] = val."
      },
      {
        "q": "ChainedAssignmentError là FutureWarning/ChainedAssignmentError từ pandas 2.2 hay hành vi bắt buộc từ pandas 3.0?",
        "a": "Từ pandas 2.2 (tùy chọn CoW), nó phát cảnh báo/lỗi ChainedAssignmentError; từ pandas 3.0 bật CoW mặc định, phép gán dây chuyền bị chặn không sửa bảng gốc."
      }
    ]
  },
  "vq-04": {
    "bucket": "code",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết phép trừ Series dựa trên Index Alignment trong compute_review_velocities.",
    "codeLocation": "src/kpi.py:L110, L126-L132, L276",
    "followUpQA": [
      {
        "q": "Nếu một id có ở t2 nhưng vắng mặt ở t1 thì kết quả diff của id đó là gì?",
        "a": "Nhờ Index Alignment, phép trừ giữa t1 (vắng id) và t2 (có id) không báo lỗi mà trả về NaN cho id đó."
      },
      {
        "q": "Tại sao cuối build_kpi_by_listing() phải gọi .reset_index()?",
        "a": "Vì _load_snapshots() đặt \"id\" làm index; .reset_index() đưa \"id\" trở lại thành cột dữ liệu bình thường trước khi xuất CSV với index=False."
      }
    ]
  },
  "vq-05": {
    "bucket": "theory",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Hiểu bản chất nullable Int64 vs int64 và giá trị thiếu <NA>.",
    "codeLocation": "src/qa.py:L189, L231; src/kpi.py:L171",
    "followUpQA": [
      {
        "q": "Sự khác biệt giữa np.nan và pd.NA khi thực hiện phép so sánh g == 0 là gì?",
        "a": "g == 0 trên np.nan trả False (float), còn trên pd.NA của Int64 trả về pd.NA theo logic 3 giá trị Kleene (cần .fillna(False) trước khi làm mask)."
      },
      {
        "q": "Nếu một cột có NaN mà ép .astype(\"int64\") viết thường thì Python báo lỗi gì?",
        "a": "Python báo IntCastingNaNError / ValueError: Cannot convert non-finite values (NA or inf) to integer."
      }
    ]
  },
  "vq-06": {
    "bucket": "theory",
    "topics": [
      "pandas",
      "KPI"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "evaluationGoal": "Phân biệt chính xác size() và count() trong groupby để tránh sai mẫu số KPI.",
    "codeLocation": "src/kpi.py:L287-L299",
    "followUpQA": [
      {
        "q": "Trong compute_kpi_by_area(), total_listings = len(group) tương đương size() hay count()?",
        "a": "total_listings = len(group) đếm toàn bộ hàng trong nhóm (kể cả NaN), do đó tương đương .size()."
      }
    ]
  },
  "vq-07": {
    "bucket": "theory",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Bảo toàn ID 18–19 chữ số dạng string ngay từ lúc đọc file CSV.",
    "codeLocation": "src/filter_data_from_sheet.py:L33-L36, L130",
    "followUpQA": [
      {
        "q": "Ngoài dtype=\"string\", hàm _normalise_id() còn làm thêm bước gì?",
        "a": "Ngoài ép string, _normalise_id() còn gọi .str.strip().fillna(\"\") để cắt khoảng trắng dư và loại bỏ <NA>."
      },
      {
        "q": "Định dạng file nào khắc phục nhược điểm không lưu schema của CSV?",
        "a": "Định dạng nhị phân hướng cột Parquet (hoặc Feather) lưu kèm metadata schema rõ ràng, không cần suy đoán lại kiểu cột như CSV."
      }
    ]
  },
  "vq-08": {
    "bucket": "code",
    "topics": [
      "File I/O",
      "SQL",
      "Architecture"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Đọc hiểu cơ chế lọc streaming chunksize=100_000 và phòng thủ thiếu cột khóa.",
    "codeLocation": "src/filter_data_from_sheet.py:L115-L146",
    "followUpQA": [
      {
        "q": "Ngoài chunksize của pandas, môn học còn giới thiệu công cụ nào để truy vấn trực tiếp trên .csv.gz?",
        "a": "Môn học giới thiệu DuckDB (hệ quản trị CSDL phân tích nhúng đọc trực tiếp .csv.gz / Parquet bằng SQL không tốn RAM)."
      },
      {
        "q": "Vì sao hàm vẫn kiểm tra key not in chunk.columns bên trong vòng lặp?",
        "a": "Để bảo vệ hợp đồng dữ liệu sớm (fail-fast): nếu file nguồn đổi cấu trúc hoặc truyền nhầm tên khóa sẽ dừng ngay bằng ValueError rõ ràng."
      }
    ]
  },
  "vq-09": {
    "bucket": "code",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Hiểu rõ cấu trúc try/except, HTTP 403/404, .tmp replace và Backoff trong download.py.",
    "codeLocation": "src/download.py:L28-L86",
    "followUpQA": [
      {
        "q": "Tại sao có tham số --force trong download.py?",
        "a": "Tham số --force cho phép bỏ qua kiểm tra file đã tồn tại để ép tải lại từ đầu khi nghi ngờ dữ liệu nguồn được cập nhật."
      },
      {
        "q": "Nếu server không gửi header Content-Length (expected_size = -1) thì điều kiện if có báo lỗi nhầm không?",
        "a": "Không báo lỗi nhầm: nhánh kiểm tra viết rõ `if expected_size > 0 and actual_size != expected_size:` nên khi expected_size = -1 điều kiện bỏ qua an toàn."
      }
    ]
  },
  "vq-10": {
    "bucket": "scenario",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Xử lý rủi ro truy cập Google Sheets endpoint và bảo mật repo public.",
    "codeLocation": "src/filter_data_from_sheet.py:L39-L55",
    "followUpQA": [
      {
        "q": "Endpoint /gviz/tq?tqx=out:csv hoạt động dựa trên điều kiện gì của Google Sheet?",
        "a": "Google Sheet bắt buộc phải đang bật quyền chia sẻ đọc công khai (\"Anyone with the link can view\"), nếu tắt quyền sẽ trả trang HTML đăng nhập gây ParserError."
      },
      {
        "q": "Vì sao không đưa spreadsheet_id lên website public này?",
        "a": "Repo website là công khai trên GitHub; đưa spreadsheet_id vào tài liệu học công khai dễ làm lộ bảng phân công/danh sách lớp không cần thiết."
      }
    ]
  },
  "vq-11": {
    "bucket": "code",
    "topics": [
      "Filter",
      "pandas",
      "SQL"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Phân biệt chính xác cột khóa lọc giữa Listings, Calendar và Reviews.",
    "codeLocation": "src/filter_data_from_sheet.py:L207-L227",
    "followUpQA": [
      {
        "q": "Nếu chuyển bước lọc calendar sang DuckDB thì câu SQL viết thế nào?",
        "a": "SELECT c.* FROM read_csv_auto(\"calendar.csv.gz\", types={\"listing_id\": \"VARCHAR\"}) c JOIN assigned_listings l ON CAST(c.listing_id AS VARCHAR) = l.id."
      },
      {
        "q": "Trong SQL, khác biệt giữa WHERE và HAVING là gì?",
        "a": "WHERE lọc từng hàng thô trước khi nhóm GROUP BY; HAVING lọc trên các nhóm sau khi đã gom nhóm và tính hàm tổng hợp (COUNT/AVG)."
      }
    ]
  },
  "vq-12": {
    "bucket": "code",
    "topics": [
      "Regex",
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Đọc hiểu từng bước làm sạch văn bản clean_text() trong baseline.py.",
    "codeLocation": "src/baseline.py:L61-L71",
    "followUpQA": [
      {
        "q": "html.unescape() giải quyết trường hợp gì (ví dụ &amp; hay &quot;)?",
        "a": "html.unescape() giải mã ký tự mã hóa HTML như \"&amp;\" -> \"&\", \"&quot;\" -> \"\"\", \"&#39;\" -> \"'\" giúp Regex nhận diện từ khóa tự nhiên."
      },
      {
        "q": "Nếu không xóa URL trước khi đếm Regex thì có thể xảy ra lỗi gì?",
        "a": "URL thường chứa từ tiếng Anh như \"location\", \"host\", \"airbnb\" hoặc ký tự ngẫu nhiên gây khớp nhầm từ khóa khía cạnh và cảm xúc."
      }
    ]
  },
  "vq-13": {
    "bucket": "code",
    "topics": [
      "Regex",
      "Data Cleaning",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Đọc hiểu biểu thức chuẩn hóa giá tiền tệ và các tình huống chuỗi dị biệt.",
    "codeLocation": "src/qa.py:L90-L105",
    "followUpQA": [
      {
        "q": "Nếu chuỗi là \"1.2.3\" thì Regex không xóa dấu chấm, khi đó hàm nào chặn lại?",
        "a": "Chuỗi \"1.2.3\" giữ nguyên sau Regex nhưng khi qua `pd.to_numeric(..., errors=\"coerce\")` sẽ không phải số hợp lệ và tự biến thành NaN."
      },
      {
        "q": "Tại sao không dùng .str.replace(\"$\", \"\") đơn giản?",
        "a": "Vì chuỗi giá của Airbnb ngoài \"$\" còn chứa dấu phẩy ngăn cách hàng nghìn (\",\") và khoảng trắng (\"$1,250.00 \"); .replace(\"$\", \"\") sẽ làm to_numeric thất bại."
      }
    ]
  },
  "vq-14": {
    "bucket": "code",
    "topics": [
      "Regex",
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết xử lý phủ định hai tầng (BENIGN_RE và NEG_RE) trong predict_review_regex().",
    "codeLocation": "src/baseline.py:L92-L98",
    "followUpQA": [
      {
        "q": "Sau BENIGN_RE, tại sao dòng 95 lại tiếp tục bọc NEG_RE.sub(\" \", cleaned) trước khi chạy POS_RE.findall()?",
        "a": "Vì cụm \"not clean\" khớp NEG_RE; nếu không xóa cụm NEG_RE khỏi cleaned trước khi chạy POS_RE thì từ \"clean\" nằm bên trong vẫn bị đếm nhầm là +1 tích cực."
      },
      {
        "q": "BENIGN_RE có bao phủ được mọi cách nói phủ định lành tính đa ngôn ngữ không?",
        "a": "Không thể bao phủ 100%: tiếng Tây Ban Nha hay cách nói lóng/ẩn dụ mới nằm ngoài danh sách từ điển vẫn có thể lọt qua -> đây chính là hạn chế cốt lõi của Regex so với LLM."
      }
    ]
  },
  "vq-15": {
    "bucket": "code",
    "topics": [
      "Datetime",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Hiểu logic kiểm tra Date Validity có điều kiện và xử lý NaN hợp lệ.",
    "codeLocation": "src/qa.py:L276-L295",
    "followUpQA": [
      {
        "q": "Tại sao biến ref_date ưu tiên lấy last_scraped trước khi fallback về snap_dt?",
        "a": "Vì một listing có thể cào chậm hoặc sớm hơn 1–2 ngày so với ngày danh nghĩa của snapshot; last_scraped là mốc thu thập thật của chính dòng đó."
      },
      {
        "q": "Điều gì xảy ra ở src/kpi.py nếu một căn hộ có number_of_reviews > 0 nhưng last_review lại là NaN?",
        "a": "QA bỏ qua không gắn cờ, nhưng đến bước KPI ở t1 (`compute_ghost_listings`), `has_rev_date = (nr == 0) | last_rev.notna()` trở thành False nên căn đó nhận `ghost_t1 = <NA>`."
      }
    ]
  },
  "vq-16": {
    "bucket": "trace",
    "topics": [
      "Datetime",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết điều kiện diff < 0 và lý do không ép bằng 0.",
    "codeLocation": "src/kpi.py:L131-L137, L166-L173",
    "followUpQA": [
      {
        "q": "Tại sao khi listing này có rv = NaN ở t4 thì ghost_t4 của nó cũng thành <NA>?",
        "a": "Vì tại `t2..t4`, hàm `compute_ghost_listings()` kiểm tra `valid_eval = valid_base & rv.notna()`. Khi `rv` là `NaN`, không thể phân biệt `rv == 0` hay `rv > 0` nên phải giữ `<NA>`."
      },
      {
        "q": "Có nên dùng .clip(lower=0) để biến diff âm thành 0 thay vì NaN không?",
        "a": "KHÔNG nên `.clip(lower=0)`! Nếu tổng review giảm 40 -> 39, ép thành 0 sẽ biến căn hộ đang hoạt động bình thường (nếu a365=0) thành căn hộ ma (ghost) sai sự thật."
      }
    ]
  },
  "vq-17": {
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Phân biệt Flag và Drop cùng hợp đồng QA -> KPI.",
    "codeLocation": "src/qa.py:L58-L78; src/kpi.py:L18-L31",
    "followUpQA": [
      {
        "q": "Quy tắc duy nhất nào trong src/qa.py có hành động xóa dòng? Khi nào nó xóa?",
        "a": "Quy tắc duy nhất có xóa dòng là `RULE_DEDUPLICATION`, và chỉ xóa khi trùng cả cặp khóa `[id, last_scraped]` bên trong cùng 1 snapshot (trong dữ liệu CDMX số dòng xóa = 0)."
      },
      {
        "q": "Tầng KPI kiểm tra hợp đồng dữ liệu từ QA bằng biến nào?",
        "a": "Kiểm tra bằng tập hằng `REQUIRED_QA_COLS` (12 cột sạch/cờ) cộng thêm cột `price_<cur>` trong `_load_snapshots()`."
      }
    ]
  },
  "vq-18": {
    "bucket": "critique",
    "topics": [
      "QA",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Giải trình quyết định giữ lại giá ngoại lai P01–P99 khi tính KPI giá và PPG.",
    "codeLocation": "src/qa.py:L138-L155; src/kpi.py:L221",
    "followUpQA": [
      {
        "q": "Nếu muốn kiểm tra độ nhạy của Mean Price khi bỏ outlier, bạn viết 1 dòng pandas thế nào từ listings.csv?",
        "a": "`df.loc[(~df[\"qa_missing_price\"]) & (~df[\"qa_price_outlier\"]), \"price_mxn\"].mean()` cho thấy mức sụt ngay khi bỏ 2% đuôi."
      },
      {
        "q": "Tại sao không dùng ngưỡng cố định MXN thay cho P01–P99 trong YAML?",
        "a": "Vì mỗi thành phố khác nhau (CDMX MXN vs Santiago CLP vs Barcelona EUR) có đơn vị tiền và phân bố khác hẳn nhau; dùng phân vị P01–P99 trong YAML giúp tổng quát hóa đa thành phố."
      }
    ]
  },
  "vq-19": {
    "bucket": "storytelling",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Xử lý trung thực biến cố thiếu 100% giá tại t2 (2025-12-29) thay vì nội suy.",
    "codeLocation": "reports/qa_report.csv; data/processed/kpi_by_snapshot.csv",
    "followUpQA": [
      {
        "q": "Theo bạn vì sao mốc 2025-12-29 của CDMX lại thiếu 100% giá từ nguồn?",
        "a": "Trên kho lưu trữ cộng đồng Inside Airbnb đôi khi lần cào cuối năm gặp lỗi scraper trường price hoặc thay đổi cấu trúc trang web chưa kịp vá -> nguồn gốc trả toàn ô trống."
      },
      {
        "q": "Trong kpi_by_snapshot.csv, các cột giá của t2 có giá trị gì?",
        "a": "Trong `kpi_by_snapshot.csv`, hàng `t2` có `valid_price_count = 0`, `valid_ppg_count = 0`, toàn bộ cột giá/PPG (median, iqr, riqr) để trống (`NaN`)."
      }
    ]
  },
  "vq-20": {
    "bucket": "critique",
    "topics": [
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "evaluationGoal": "Phát hiện bẫy đánh giá quy tắc phân vị tương đối P01–P99 theo từng snapshot.",
    "codeLocation": "src/qa.py:L138-L146; reports/qa_report.csv",
    "followUpQA": [
      {
        "q": "Nhược điểm của việc tính lại P01–P99 độc lập ở mỗi snapshot là gì?",
        "a": "Vì ngưỡng cắt tự dịch theo mặt bằng từng quý nên không cố định trên trục tuyệt đối (P99 nhảy từ 7.049 lên 14.084 MXN nhưng vẫn chỉ gắn cờ ~1% mỗi phía)."
      },
      {
        "q": "Nếu cả thị trường tăng giá gấp đôi thì số căn bị gắn cờ P99 có tăng gấp đôi không?",
        "a": "KHÔNG tăng gấp đôi! Khi mọi giá đều nhân 2, phân vị P01 và P99 cũng tự động nhân 2 theo -> tỷ lệ bị gắn cờ vẫn giữ xấp xỉ ~2% (~19–20 căn)."
      }
    ]
  },
  "vq-21": {
    "bucket": "trace",
    "topics": [
      "QA",
      "KPI",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Truy vết sự cố sai lệch thứ tự bước và biến đổi Int64.",
    "codeLocation": "src/qa.py:L189; src/kpi.py:L104-L108",
    "followUpQA": [
      {
        "q": "Điều gì xảy ra nếu chạy src/kpi.py trước khi chạy src/qa.py?",
        "a": "`_load_snapshots()` kiểm tra `REQUIRED_QA_COLS` thấy thiếu cột `qa_*` và lập tức dừng bằng `ValueError` trước khi tính toán sai."
      },
      {
        "q": "Tại sao phải có danh sách REQUIRED_QA_COLS?",
        "a": "Để thiết lập \"hợp đồng dữ liệu\" (data contract) giữa bước QA và KPI, đảm bảo không có bảng chưa sạch nào lọt qua bước tính KPI."
      }
    ]
  },
  "vq-22": {
    "bucket": "critique",
    "topics": [
      "Architecture",
      "QA"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Phân biệt mô tả AI_USAGE/PDF với code thực tế tại tag final (trung thực học thuật).",
    "codeLocation": "src/qa.py; reports/qa_report.csv",
    "followUpQA": [
      {
        "q": "Việc bỏ hard-code 875/125 khỏi src/qa.py có lợi ích gì cho tiêu chí chấm A2 của đề bài?",
        "a": "Tách bỏ các luật kiểm tra cứng 875/125 của riêng cohort giúp `src/qa.py` hoàn toàn tổng quát theo YAML, chạy lại được trên mọi thành phố khác mà không cần sửa code (đạt chuẩn điểm A2)."
      }
    ]
  },
  "vq-23": {
    "bucket": "code",
    "topics": [
      "LLM",
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Hiểu cơ chế Pydantic Structured Outputs và ranh giới chống ảo giác.",
    "codeLocation": "src/llm.py:L28-L39, L274-L275",
    "followUpQA": [
      {
        "q": "Tại sao dùng pydantic.create_model thay vì khai báo class cứng?",
        "a": "Đọc danh sách khía cạnh từ YAML (`llm.aspects`), thêm/bớt khía cạnh thứ 8 chỉ cần sửa config YAML mà không phải mở file Python sửa class."
      },
      {
        "q": "Đúng Pydantic schema có đảm bảo LLM không hallucinate nội dung không?",
        "a": "KHÔNG đảm bảo 100%: Schema chỉ ép đúng cấu trúc JSON & tập giá trị Literal, còn model vẫn có thể gắn sai nhãn ý nghĩa (nên vẫn cần `ground_truth` và `hau_kiem()`)."
      }
    ]
  },
  "vq-24": {
    "bucket": "scenario",
    "topics": [
      "LLM",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Hiểu cơ chế cache JSONL, vô hiệu hóa cache khi đổi prompt và hỗ trợ --skip-llm.",
    "codeLocation": "src/llm.py:L92-L120, L388-L451",
    "followUpQA": [
      {
        "q": "Nếu bạn sửa prompt trong build_batch_prompt() mà giữ nguyên llm_cache.jsonl thì chuyện gì xảy ra?",
        "a": "`load_cache()` sẽ nạp kết quả CŨ đã lưu và coi `pending_rows = 0` -> thay đổi prompt KHÔNG có hiệu lực nếu không xóa hoặc đổi tên tệp cache!"
      },
      {
        "q": "Nếu cache chỉ có 950/1.000 review mà chạy --skip-llm thì 50 review kia trong reviews_sentiment.csv nhận giá trị gì?",
        "a": "50 review thiếu trong cache được xuất vào `reviews_sentiment.csv` với các cột nhãn bằng trống (`NaN`), tuyệt đối không điền nhãn mặc định."
      }
    ]
  },
  "vq-25": {
    "bucket": "code",
    "topics": [
      "API",
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Phân tích chiến lược Retry & Phân loại 429 RPM vs RPD trong llm.py.",
    "codeLocation": "src/llm.py:L226-L296, L314-L318",
    "followUpQA": [
      {
        "q": "Tại sao vòng chạy bù cuối cùng (pass 2) lại hạ batch_size từ 5 xuống 1?",
        "a": "Khi một lô 5 câu bị hỏng JSON do 1 câu quá dài hoặc ký tự dị biệt, tách lẻ `batch_size=1` ở vòng 2 giúp cô lập câu đó và cứu toàn bộ 4 câu còn lại."
      }
    ]
  },
  "vq-26": {
    "bucket": "storytelling",
    "topics": [
      "Evaluation",
      "Baseline",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Giải thích bằng chứng định lượng LLM vượt Baseline trên 9 chỉ số.",
    "codeLocation": "reports/evaluation_report.csv; figures/llm_vs_baseline.png",
    "followUpQA": [
      {
        "q": "Trong 9 chỉ số đánh giá, chỉ số nào của LLM chỉ hơn Baseline rất ít (0.6364 vs 0.5833) và vì sao?",
        "a": "Chỉ số `bi_che_f1` (0.6364 vs 0.5833) chênh ít nhất vì trong 100 mẫu nhãn tay chỉ có rất ít khía cạnh mang nhãn thuần `negative` (lớp hiếm nên độ dao động cao chỉ cần sai 1–2 ca)."
      },
      {
        "q": "Nếu chi phí chạy toàn CDMX là $349 USD, làm sao giảm chi phí thực tế?",
        "a": "Có thể truyền tham số Batch API (-50% giá, chờ 24h -> ~$174.55), hoặc chỉ phân tích những khu vực trọng điểm / lọc review dài trên 5 từ."
      }
    ]
  },
  "vq-27": {
    "bucket": "code",
    "topics": [
      "Evaluation"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Đọc hiểu hàm phan_tich_loi() và phân loại 46 lỗi trên 900 ô kiểm định.",
    "codeLocation": "src/evaluate.py:L150-L171; reports/llm_error_analysis.csv",
    "followUpQA": [
      {
        "q": "Trong evaluate.py, hàm f1() tính cho `bi_che_f1` chỉ lấy nhãn `negative` hay gộp cả `mixed`?",
        "a": "`f1()` trên `aspects_negative` chỉ tính nhãn đúng bằng `\"negative\"`, không gộp `\"mixed\"`."
      },
      {
        "q": "Lỗi `thieu` trên amenities hay xảy ra với loại tính từ nào?",
        "a": "Lỗi `thieu` trên `amenities` (27/46 lỗi) hay gặp ở các tính từ mô tả tổng quát như `\"cozy\"`, `\"comfy\"`, `\"well appointed\"` mà người chấm gán amenities nhưng prompt bảo thủ bỏ qua."
      }
    ]
  },
  "vq-28": {
    "bucket": "code",
    "topics": [
      "Evaluation"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Phân biệt cảnh báo hậu kiểm không nhãn tay với lỗi thật để tránh sửa máy móc.",
    "codeLocation": "src/evaluate.py:L174-L195; reports/llm_postcheck.csv",
    "followUpQA": [
      {
        "q": "Có bao nhiêu review vi phạm lỗi rỗng nhưng có nhãn hoặc ngôn ngữ sai mã ISO trong llm_postcheck.csv?",
        "a": "Có **0** vi phạm cấu trúc cho cả 4 quy tắc (rỗng có nhãn, ngắn nhiều khía cạnh, sai mã ISO, tích cực nhưng chỉ chê); toàn bộ 193 cảnh báo chỉ gồm 1 `tieu_cuc_nhung_chi_duoc_khen` và 192 `khia_canh_khong_can_cu`."
      },
      {
        "q": "Làm sao phân biệt lỗi thật sự với cảnh báo nhầm của hậu kiểm?",
        "a": "Trong `\"Everything felt like home!\"`, từ `\"home\"` / `\"felt\"` giúp LLM gán `host` hoặc `amenities`, nhưng không khớp Regex từ khóa cứng nào trong `TU_KHOA`."
      }
    ]
  },
  "vq-29": {
    "bucket": "storytelling",
    "topics": [
      "LLM",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Tính toán & bảo vệ chi phí mở rộng API cho toàn thành phố.",
    "codeLocation": "src/evaluate.py:L198-L239; reports/llm_cost_estimate.csv",
    "followUpQA": [
      {
        "q": "Phép ước tính này có những giả định và hạn chế nào (nếu review ở thành phố dài hơn hoặc bật Batch API 50% giá)?",
        "a": "Nếu văn bản review ở thành phố khác dài gấp đôi (~220 input token) thì chi phí tăng lên, ngược lại bật Batch API sẽ giảm 50% đơn giá ($0.15/1M in, $1.25/1M out). Ngoài ra đây là ước tính trung bình tuyến tính chứ chưa tính biến động tỷ lệ lỗi retry."
      },
      {
        "q": "Tại sao nếu không có thư mục data/raw/ thì cần truyền --city-reviews?",
        "a": "Vì nếu không có data/raw/*/reviews.csv.gz trên máy, `uoc_tinh_chi_phi()` không đọc được số ID review duy nhất ở snapshot cuối nên phải truyền `--city-reviews 1719730` để vẫn xuất được dòng ước tính toàn CDMX."
      }
    ]
  },
  "vq-30": {
    "bucket": "critique",
    "topics": [
      "Baseline",
      "LLM",
      "Evaluation"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "evaluationGoal": "Nhận diện giới hạn kích thước & thiên lệch ngôn ngữ của ground_truth.csv 100 mẫu.",
    "codeLocation": "src/evaluate.py:L279; data/samples/ground_truth.csv",
    "followUpQA": [
      {
        "q": "Nếu muốn kiểm chứng tốt hơn cho tiếng Tây Ban Nha ở CDMX, cần chọn mẫu nhãn tay như thế nào?",
        "a": "Nên áp dụng lấy mẫu phân tầng theo ngôn ngữ (**stratified sampling**) sao cho tiếng Tây Ban Nha và các ngôn ngữ không phải tiếng Anh có đủ cỡ mẫu đánh giá (thay vì lấy ngẫu nhiên làm 99–100% rơi vào tiếng Anh)."
      }
    ]
  },
  "vq-31": {
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết xử lý thiếu dự đoán trong ti_le_dung() và f1_cam_xuc().",
    "codeLocation": "src/evaluate.py:L94-L118",
    "followUpQA": [
      {
        "q": "Tại sao trong f1_score() phải truyền thêm `labels=SENTIMENTS` khi y_pred có thể chứa `\"khong_co\"`?",
        "a": "Vì khi `y_pred` chứa giá trị `\"khong_co\"` (cho review bị thiếu dự đoán), nếu bỏ `labels=SENTIMENTS`, scikit-learn sẽ coi `\"khong_co\"` như lớp thứ 4 và lấy trung bình chia cho 4 thay vì 3! Truyền `labels=SENTIMENTS` giữ mẫu số Macro F1 cố định là 3 lớp nhưng vẫn trừ Recall của lớp thật bị đoán thành `\"khong_co\"`."
      }
    ]
  },
  "vq-32": {
    "bucket": "code",
    "topics": [
      "Filter",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết biểu thức tách tập Mẫu LLM (1.000) và Nhãn tay (100) từ Google Sheet.",
    "codeLocation": "src/filter_data_from_sheet.py:L181-L192, L224-L227",
    "followUpQA": [
      {
        "q": "Tại sao lại chuẩn hóa `.str.strip().str.lower().eq(\"x\")`?",
        "a": "Nếu chỉ viết `.eq(\"x\")` không kèm `.str.strip().str.lower()`, một ô đánh nhầm `\" X \"` (hoa hoặc thừa cách) trên Google Sheets sẽ bị bỏ sót không đưa vào mẫu LLM/nhãn tay!"
      }
    ]
  },
  "vq-33": {
    "bucket": "code",
    "topics": [
      "QA"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "evaluationGoal": "Xác định điều kiện phát hiện và hành động của từng quy tắc QA trong qa.py.",
    "codeLocation": "src/qa.py:L208-L247",
    "followUpQA": [
      {
        "q": "Nếu availability_30 = 35 thì có vi phạm không?",
        "a": "CÓ! `availability_30 = 35` vượt quá miền [0, 30] -> `valid_a30 = False`, cột `availability_30_clean` nhận `<NA>` và cờ `qa_invalid_availability = True`."
      }
    ]
  },
  "vq-34": {
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Hiểu công thức PPG = price / accommodates và điều kiện so sánh giữa các loại chỗ ở.",
    "codeLocation": "src/kpi.py:L215-L252",
    "followUpQA": [
      {
        "q": "PPG có hạn chế gì khi đánh giá giá trị thực tế cho một khách đi du lịch một mình?",
        "a": "Khách đi du lịch **một mình** (solo traveler) thường chỉ đặt 1 studio/phòng riêng và phải trả trọn giá đêm (`Price`) chứ không chia tiền phòng với nhóm 4–12 người được, nên họ quan tâm `Price` hơn `PPG`."
      },
      {
        "q": "Tại sao src/kpi.py vẫn lưu cả Mean và Median trong kpi_by_neighbourhood.csv?",
        "a": "Để phát hiện hiện tượng **Mean bị kéo lệch bởi Outlier**: so sánh trực tiếp `Mean Price` vs `Median Price` trên cùng một quận chứng minh mức độ lệch phải của đuôi giá đầu cơ World Cup."
      }
    ]
  },
  "vq-35": {
    "bucket": "code",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Hiểu bản chất rIQR = IQR / Median và khả năng kháng outlier so với Std/Mean.",
    "codeLocation": "src/kpi.py:L69-L84",
    "followUpQA": [
      {
        "q": "Điều kiện trong code _iqr_stats() để tránh lỗi chia 0 là gì?",
        "a": "Điều kiện bảo vệ ở dòng 78: `riqr = (iqr / med) if med > 0 else np.nan`."
      },
      {
        "q": "Vì sao không dùng hệ số biến thiên CV = Std / Mean?",
        "a": "Hệ số biến thiên `CV = Std / Mean` dùng cả Mean và Độ lệch chuẩn — cả hai đều bị bóp méo cực mạnh bởi vài căn treo giá >150.000 MXN; còn rIQR dùng Q1, Median, Q3 nên kháng hoàn toàn 25% đầu/đuôi."
      }
    ]
  },
  "vq-36": {
    "bucket": "code",
    "topics": [
      "KPI",
      "Datetime"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết điều kiện xác định Ghost Listing tại t1 vs t2..t4.",
    "codeLocation": "src/kpi.py:L140-L174",
    "followUpQA": [
      {
        "q": "Nếu stale_review_days trong YAML tăng từ 90 lên 180 ngày thì Ghost Rate ở t1 tăng hay giảm?",
        "a": "Tăng ngưỡng `stale_review_days` từ 90 lên 180 ngày là tiêu chuẩn khắt khe hơn (phải trên 180 ngày không review mới tính là cũ) -> số căn bị gắn Ghost tại t1 sẽ **giảm xuống** (hoặc giữ nguyên)."
      },
      {
        "q": "Một căn có a365 = 0, nr = 10 và last_review mới cách t1 15 ngày thì ghost_t1 bằng mấy?",
        "a": "Mặc dù `a365=0`, nhưng `last_review` mới cách t1 15 ngày (<= 90 ngày) nên `is_stale = False` -> `ghost_t1 = 0` (vừa mới hết phòng thật)."
      }
    ]
  },
  "vq-37": {
    "bucket": "trace",
    "topics": [
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết chính xác hai phép trừ tạo nên Occ_31-90 và Urgency Gap.",
    "codeLocation": "src/kpi.py:L193-L210",
    "followUpQA": [
      {
        "q": "Nếu căn hộ này là ghost = 1 và exclude_ghost = True thì hàm trả về gì?",
        "a": "Khi `ghost == 1` và `exclude_ghost=True`, `(g == 0).fillna(False)` ra `False` -> `valid_occ = False` -> tất cả `occ_1-30`, `occ_31-90` và `urgency_gap` đều nhận `np.nan` (nhưng `availability_31-90` vẫn được tính ở dòng 193!)."
      },
      {
        "q": "Urgency Gap âm có ý nghĩa gì?",
        "a": "Urgency Gap âm (`Occ_1-30 < Occ_31-90`) nghĩa là lịch tương lai xa (tháng thứ 2–3) đang kín hơn tháng sắp tới — dấu hiệu của một sự kiện lớn đã được đặt kín sớm từ nhiều tháng trước hoặc chủ nhà mở bán muộn ở kỳ gần."
      }
    ]
  },
  "vq-38": {
    "bucket": "code",
    "topics": [
      "KPI",
      "Architecture"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Hiểu lý do phân tách cấp Neighbourhood (15 quận) và Area (A01–A08) trong kpi.py.",
    "codeLocation": "src/kpi.py:L279-L461",
    "followUpQA": [
      {
        "q": "Tại sao kpi_by_area.csv không chứa các cột complaint LLM giống kpi_by_neighbourhood.csv?",
        "a": "Vì 1.000 review LLM phân bổ không đều theo đơn vị hành chính quận để báo cáo cho SECTUR CDMX (quận lõi Cuauhtémoc chiếm 749, ngoại vi 0–7), không gán theo nhóm chia mẫu A01–A08 trong `reviews_sentiment.csv`."
      },
      {
        "q": "Trong kpi_by_neighbourhood.csv, tổng llm_review_count của 15 quận bằng bao nhiêu?",
        "a": "Tổng `llm_review_count` cộng trên toàn bộ 15 dòng của `kpi_by_neighbourhood.csv` bằng đúng `749 + 150 + 37 + 21 + 17 + 7 + 6 + 4 + 3 + 3 + 2 + 1 + 0 + 0 + 0 = 1.000`."
      }
    ]
  },
  "vq-39": {
    "bucket": "critique",
    "topics": [
      "KPI"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "evaluationGoal": "Phản biện thiết kế Ghost Supply chống sai lệch Occupancy.",
    "codeLocation": "src/kpi.py:L140-L212",
    "followUpQA": [
      {
        "q": "Nếu bỏ điều kiện `RV == 0` và chỉ kiểm tra `a365 == 0`, chuyện gì xảy ra với Occupancy?",
        "a": "Những căn hộ siêu đắt hoặc căn mới vừa được khách đặt kín nguyên lịch năm (`a365=0`) nhưng VẪN ĐANG ĐÓN KHÁCH (có `RV > 0` hoặc mới có review gần đây) sẽ bị gắn oan thành Ghost và bị loại khỏi `Occupancy` -> làm tụt giả tạo tỷ lệ lấp đầy của nhóm căn đắt khách!"
      }
    ]
  },
  "vq-40": {
    "bucket": "storytelling",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Giải thích lựa chọn thang log cho dữ liệu giá lệch phải trên Boxplot.",
    "codeLocation": "src/viz.py:L108-L143; figures/kpi_ppg_riqr_2026-06-15.png",
    "followUpQA": [
      {
        "q": "Thang log có nhược điểm gì khi người đọc không quen đọc biểu đồ kỹ thuật nhìn vào?",
        "a": "Người đọc ít kinh nghiệm dễ hiểu nhầm khoảng cách đều nhau giữa các vạch chia `10^2`, `10^3`, `10^4` là tăng tuyến tính (+ bằng nhau) thay vì tăng theo cấp số nhân (gấp 10 lần)."
      },
      {
        "q": "Cạnh phải biểu đồ hộp này ghép với biểu đồ gì?",
        "a": "Khung bên phải của `kpi_ppg_riqr_2026-06-15.png` ghép với biểu đồ thanh ngang `rIQR(PPG)` theo 8 khu vực A01–A08 kèm nhãn `rIQR (Med M)`."
      }
    ]
  },
  "vq-41": {
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Hiểu kỹ thuật vẽ Choropleth bằng GeoJSON + matplotlib.patches.Polygon không cần GeoPandas.",
    "codeLocation": "src/viz.py:L77-L105, L198-L298",
    "followUpQA": [
      {
        "q": "Tại sao bản đồ phải đặt `ax.set_aspect(geo_aspect)` bằng 1/cos(vĩ độ)?",
        "a": "Vì 1 độ vĩ độ và 1 độ kinh độ ở vĩ độ 19.4°N của CDMX không có chiều dài mét bằng nhau (kinh độ thu hẹp theo `cos(lat)`). Chia `1 / cos(radians(lat))` giúp hình dạng 16 quận trên bản đồ chuẩn tỉ lệ địa lý không bị bẹp."
      },
      {
        "q": "Cách xử lý quận Tláhuac trên bản đồ là gì?",
        "a": "Quận Tláhuac (vắng mặt trong `kpi_by_neighbourhood.csv`) được giữ nguyên đa giác ranh giới từ GeoJSON, tô màu xám nhạt `#E5E7EB` kèm nét gạch chéo `hatch=\"///\"` và chú giải riêng \"Không có trong mẫu / NA\"."
      }
    ]
  },
  "vq-42": {
    "bucket": "storytelling",
    "topics": [
      "Visualization",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Phân biệt Mean vs Median qua biểu đồ bản đồ 4 khung và nghịch lý Xochimilco.",
    "codeLocation": "figures/kpi_ppg_neighbourhood.png; src/viz.py:L204-L211",
    "followUpQA": [
      {
        "q": "Số #1..#15 in trên cả 4 bản đồ được đánh số theo chỉ số nào?",
        "a": "Số thứ tự `#1..#15` trên CẢ 4 bản đồ được cố định đánh số theo thứ tự giảm dần của `rank_price_t4` (**Price Mean** ở mốc t4) — nhờ vậy người đọc mới thấy ngay quận `#1 Xochimilco` trên bảng Price Mean rơi xuống mức màu rất nhạt ở ô Median PPG phía dưới!"
      }
    ]
  },
  "vq-43": {
    "bucket": "storytelling",
    "topics": [
      "Visualization",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Giải trình cỡ mẫu quận, xử lý quận không có review LLM và chống hiểu nhầm thang màu Heatmap.",
    "codeLocation": "figures/llm_insights.png; src/viz.py:L403-L432",
    "followUpQA": [
      {
        "q": "Tại sao có 15 quận trong kpi_by_neighbourhood.csv nhưng heatmap llm_insights.png chỉ hiển thị 12 quận?",
        "a": "Vì dòng 404 lọc `llm_review_count > 0`; trên 15 quận có listing thì có 3 quận ngoại vi (Iztapalapa, Milpa Alta, Xochimilco) có 0 review LLM nên 15 − 3 = 12 quận được vẽ trên heatmap trải nghiệm (tránh để 3 hàng NA hoàn toàn)."
      }
    ]
  },
  "vq-44": {
    "bucket": "storytelling",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Đọc hiểu Small Multiples dùng chung thang trục X để tránh lừa thị giác.",
    "codeLocation": "figures/kpi_ppg_snapshots.png; src/viz.py:L146-L188",
    "followUpQA": [
      {
        "q": "Đường đứt nét màu cam thẳng đứng trên khung t1, t3, t4 biểu diễn giá trị gì?",
        "a": "Đường đứt nét thẳng đứng màu cam (`#B45309`) biểu diễn **Trung vị PPG toàn thị trường** tại chính snapshot đó (t1: 382 MXN, t3: 565 MXN, t4: 627 MXN)."
      }
    ]
  },
  "vq-45": {
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Phân tích số liệu tăng giá +67.3% đồng thời tránh bẫy Correlation vs Causation.",
    "codeLocation": "data/processed/kpi_by_snapshot.csv; kpi_by_area.csv",
    "followUpQA": [
      {
        "q": "Tại sao nói \"hiệu ứng World Cup thu hẹp vùng đệm giá rẻ\" của mẫu nghiên cứu?",
        "a": "Vì 2 khu vực bình dân nhất mẫu lại ghi nhận mức tăng % PPG cao nhất (`A03: +70.1%`, `A08: +65.7%`), nhanh hơn mặt bằng chung (+64.1%) làm thu hẹp nguồn cung giá thấp cho du khách ngân sách vừa."
      },
      {
        "q": "Cần tránh lỗi ngôn từ gì khi kết luận về nguyên nhân tăng giá?",
        "a": "Tuyệt đối tránh khẳng định \"World Cup GÂY RA tăng giá 67.3%\" (nhân quả); chỉ được nêu dữ liệu quan sát cho thấy xu hướng tăng giá diễn ra đồng thời trong giai đoạn tiến tới giải đấu, và 1/3 đà tăng lớn đã xuất hiện từ Semana Santa (t3)."
      }
    ]
  },
  "vq-46": {
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Kết hợp rIQR(Price) và rIQR(PPG) giải mã bản chất phân hóa căn hộ theo sức chứa.",
    "codeLocation": "data/processed/kpi_by_neighbourhood.csv; figures/kpi_riqr_neighbourhood.png",
    "followUpQA": [
      {
        "q": "Tại sao Miguel Hidalgo có rIQR(Price) = 1.053 cao hơn chuẩn thị trường nhưng rIQR(PPG) lại co xuống 0.707?",
        "a": "Vì `Miguel Hidalgo` vừa có các phòng đơn/nhỏ vừa có những biệt thự/căn hộ lớn ở Polanco/Lomas làm giá nguyên căn (`Price`) chênh nhau cực mạnh (rIQR Price = 1.053), nhưng khi chia cho `accommodates`, giá mỗi đầu khách (`PPG`) của biệt thự lớn lại gần với phòng tiêu chuẩn nên rIQR PPG co xuống còn 0.707."
      }
    ]
  },
  "vq-47": {
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Biện luận kết quả bất ngờ t3 Semana Santa vs t4 World Cup cho SECTUR CDMX.",
    "codeLocation": "kpi_by_snapshot.csv; kpi_by_area.csv; figures/kpi_occupancy_gap.png",
    "followUpQA": [
      {
        "q": "Urgency Gap ở t3 cao (+21.38 pp) nhưng Occ_31-90 chỉ ở mức 27.10% nói lên điều gì về thói quen đặt phòng dịp Semana Santa?",
        "a": "Cho thấy kỳ nghỉ lễ truyền thống Tuần Thánh (`Semana Santa`) tạo sức ép đặt sát ngày cực mạnh (tỷ lệ không khả dụng tháng đầu vọt lên 48.5% nhưng tháng 2–3 chỉ là 27.1%), trong khi ở t4 chủ nhà tăng giá quá cao khiến một bộ phận khách chần chừ. (Luôn lưu ý `Occ` dựa trên availability nên gồm cả chủ nhà tự khóa lịch)."
      }
    ]
  },
  "vq-48": {
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Evaluation"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Xây dựng khuyến nghị hành động thực tế cho SECTUR CDMX gắn chặt với giới hạn mẫu.",
    "codeLocation": "reports/report.pdf Mục 5–6; data/processed/*",
    "followUpQA": [
      {
        "q": "Giới hạn lớn nhất khiến SECTUR không thể áp dụng trực tiếp con số mẫu này cho toàn bộ 31.430 căn CDMX là gì?",
        "a": "Thứ nhất: 1.000 căn chỉ chiếm ~3.2% trong 31.430 căn toàn CDMX (thiếu Tláhuac và bỏ qua nguồn cung mới mở sau t1). Thứ hai: 1.000 review LLM tập trung 74.9% ở Cuauhtémoc và 99.9% tiếng Anh, nên khuyến nghị chỉ mang tính cảnh báo sớm cho vùng lõi và không suy rộng cơ học cho toàn thành phố."
      }
    ]
  },
  "vq-49": {
    "bucket": "code",
    "topics": [
      "Evaluation",
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Đọc hiểu quy trình nạp bảng và ánh xạ từ khóa evaluate.py.",
    "codeLocation": "src/evaluate.py:L54-L69",
    "followUpQA": [
      {
        "q": "Trong 100 mẫu nhãn tay ground_truth.csv có bao nhiêu ngôn ngữ?",
        "a": "Kiểm tra trong `reviews_sentiment.csv` trên tập mẫu 1.000 review có 999 `\"en\"` và 1 `\"es\"`; trên 100 mẫu nhãn tay `ground_truth.csv` cũng có 100% tiếng Anh (hoặc đa số tiếng Anh nên Accuracy ngôn ngữ của Baseline đạt 0.99 và LLM đạt 1.00)."
      }
    ]
  },
  "vq-50": {
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết thao tác merge và chống phình mẫu số trong compute_kpi_by_neighbourhood().",
    "codeLocation": "src/kpi.py:L406-L426",
    "followUpQA": [
      {
        "q": "Tại sao dòng 412 lại lọc `rev_merged[aspects_list].notna().any(axis=1)` trước khi groupby?",
        "a": "Để loại trừ những dòng review (nếu có) bị thiếu toàn bộ nhãn khía cạnh do chưa chạy LLM hoặc cache thiếu -> tránh cộng dòng trống vào mẫu số `llm_review_count` làm giảm ảo tỷ lệ phàn nàn."
      }
    ]
  },
  "vq-51": {
    "bucket": "trace",
    "topics": [
      "LLM",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Truy vết hành vi load_assigned_reviews() và rủi ro lệch cohort giữa các mốc.",
    "codeLocation": "src/llm.py:L65-L85",
    "followUpQA": [
      {
        "q": "Nếu ở snapshot t1 có một review thuộc listing sau đó bị xóa ở t4 thì có rủi ro gì khi chỉ đọc từ reversed(snapshots)?",
        "a": "Nếu tệp `reviews_llm.csv` tại mốc t4 thiếu mất review do chỗ ở bị xóa khỏi Airbnb trước t4, đọc từ `reversed(snapshots)` (t4 trước) sẽ lấy thiếu dòng so với t1 -> với bộ Nhóm 4 mẫu phân công cố định xuất hiện đủ ở cả 4 mốc nên cả 4 tệp đều có đúng 1.000 dòng giống hệt nhau."
      }
    ]
  },
  "vq-52": {
    "bucket": "trace",
    "topics": [
      "File I/O",
      "LLM"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết tính bền vững JSONL cache khi mất điện giữa chừng.",
    "codeLocation": "src/llm.py:L97-L113",
    "followUpQA": [
      {
        "q": "Nếu tệp cache bị một dòng JSON cụt do mất điện giữa chừng khi ghi thì vòng `try/except (json.JSONDecodeError, TypeError)` xử lý ra sao?",
        "a": "Khối `try ... except (json.JSONDecodeError, TypeError): continue` chỉ bỏ qua đúng 1 dòng JSON bị cụt cuối tệp; toàn bộ 999 dòng phía trên vẫn nạp thành công và review bị mất dòng cuối sẽ tự động được `process_pending_reviews()` gọi bổ sung ngay ở lượt chạy tiếp theo."
      }
    ]
  },
  "vq-53": {
    "bucket": "code",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Đọc hiểu kiến trúc subprocess điều phối tại run_pipeline.py.",
    "codeLocation": "run_pipeline.py:L29-L33",
    "followUpQA": [
      {
        "q": "Nếu truyền --skip-llm vào run_pipeline.py thì cờ này được chuyển tiếp vào script nào?",
        "a": "Cờ `--skip-llm` chỉ được gắn vào duy nhất câu lệnh chạy `src/llm.py` thông qua điều kiện `if script_path == \"src/llm.py\" and skip_llm:` để các script khác không bị lỗi `unrecognized arguments`."
      }
    ]
  },
  "vq-54": {
    "bucket": "critique",
    "topics": [
      "KPI",
      "Architecture"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "evaluationGoal": "Phát hiện giả định ẩn trong build_kpi_by_listing() cho dữ liệu panel.",
    "codeLocation": "src/kpi.py:L264-L275",
    "followUpQA": [
      {
        "q": "Nếu áp dụng code này cho một mẫu KHÔNG cân bằng (có căn mới gia nhập ở t4 hoặc rời bỏ sau t1) thì nhược điểm của `snapshots[-1]` là gì?",
        "a": "`snapshots[-1]` chỉ giữ lại danh sách `id` có mặt ở mốc cuối `t4` làm index khung (`base = pd.DataFrame(index=final_df.index)`); bất kỳ căn hộ nào hoạt động ở `t1–t3` nhưng ngừng hoạt động/bị xóa trước `t4` sẽ bị rơi khỏi bảng tổng hợp (Survivorship Bias nếu không dùng tập hợp `union` các ID!)."
      }
    ]
  },
  "vq-55": {
    "bucket": "trace",
    "topics": [
      "Regex",
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Truy vết ngưỡng quyết định overall_sentiment trong baseline.py.",
    "codeLocation": "src/baseline.py:L105",
    "followUpQA": [
      {
        "q": "Nếu review hoàn toàn không khớp từ nào trong POS_RE và NEG_RE (total_pos = 0, total_neg = 0) thì câu đó bị gán nhãn gì?",
        "a": "Với `total_pos = 0` và `total_neg = 0`, điều kiện đầu tiên `if total_neg == 0` thỏa mãn ngay -> câu đó bị gán nhãn `\"positive\"` (nhờ giả định đa số review Airbnb không có từ chê đều là khen ngắn kiểu \"Good!\" hoặc trung tính nghiêng tích cực)."
      }
    ]
  },
  "vq-56": {
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Kiểm tra fail-fast và hợp đồng file trong src/viz.py.",
    "codeLocation": "src/viz.py:L77-L92, L490-L504",
    "followUpQA": [
      {
        "q": "Nếu thiếu `neighbourhoods.geojson` thì `viz.py` báo lỗi ở biểu đồ nào?",
        "a": "`viz.py` sẽ ném `FileNotFoundError` ở ngay biểu đồ bản đồ `plot_ppg_neighbourhood()` (hàm gọi `_load_geojson()`), kèm thông báo hướng dẫn chạy lại `filter_data_from_sheet.py`."
      }
    ]
  },
  "vq-57": {
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Phân tích đồ thị phụ thuộc thực tế giữa 8 mô-đun Python.",
    "codeLocation": "run_pipeline.py:L9-L18",
    "followUpQA": [
      {
        "q": "Bước Baseline và Bước LLM có phụ thuộc nhau về thứ tự không? Có thể chạy Baseline trước LLM không?",
        "a": "Không phụ thuộc lẫn nhau! Cả `src/llm.py` và `src/baseline.py` đều đọc chung đầu vào là `reviews_llm.csv` và chỉ hợp nhất đầu ra ở bước `src/evaluate.py`, hoàn toàn có thể chạy Baseline trước LLM."
      }
    ]
  },
  "vq-58": {
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Truy vết tham số config-driven từ YAML sang nhãn biểu đồ trong viz.py.",
    "codeLocation": "src/viz.py:L476-L481",
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, nhãn trục và tiêu đề tự động lấy tên thành phố và tiền tệ từ đâu?",
        "a": "Đọc động từ khóa `city` (chuyển `\"mexico-city\"` -> `\"Mexico City\"`) và `currency` (`\"MXN\"`) trong tệp YAML cấu hình truyền vào `--config`."
      }
    ]
  },
  "vq-59": {
    "bucket": "scenario",
    "topics": [
      "Architecture",
      "Filter"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Lập kế hoạch khôi phục và tái lập toàn bộ pipeline từ thư mục rỗng.",
    "codeLocation": "src/filter_data_from_sheet.py; src/download.py",
    "followUpQA": [
      {
        "q": "Nếu muốn chạy lại bước Filter từ con số 0 trên máy mới thì cần điều kiện gì?",
        "a": "(1) Cài môi trường Python + `requirements.txt`; (2) Có kết nối Internet để tải Inside Airbnb (hoặc có sẵn bản raw t1 khi server chặn 403) và kết nối Google Visualization API để đọc Google Sheets phân công với quyền xem công khai; (3) Nếu không có GEMINI_API_KEY thì phải có sẵn `data/processed/llm_cache.jsonl` và chạy `--skip-llm`."
      }
    ]
  },
  "vq-60": {
    "bucket": "scenario",
    "topics": [
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Tuân thủ nguyên tắc Vấn đáp Hoàn toàn Cá nhân và minh bạch AI.",
    "codeLocation": "AI_USAGE.md; project_airbnb.html",
    "followUpQA": [
      {
        "q": "Trong buổi vấn đáp cá nhân 10 phút, nếu giảng viên chọn hỏi ngẫu nhiên bất kỳ dòng code nào của dự án (dù không phải phần bạn tự tay gõ đầu tiên), nguyên tắc xử lý là gì?",
        "a": "Theo quy chế `project_airbnb.html`: thi cá nhân 10 phút là độc lập tuyệt đối. Sinh viên phải nắm trọn vẹn kiến thức, mã nguồn, hàm và số liệu của TẤT CẢ 9 tệp Python — trả lời trực tiếp câu hỏi bằng logic code và bằng chứng CSV thay vì đổ sang thành viên khác."
      }
    ]
  },
  "vq-61": {
    "bucket": "scenario",
    "topics": [
      "Architecture"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "evaluationGoal": "Nắm vững quy chế phòng thi vấn đáp thực tế của môn UET.DSE2049.",
    "codeLocation": "project_airbnb.html (Mục Quy tắc vấn đáp)",
    "followUpQA": [
      {
        "q": "Nếu câu hỏi của người hỏi chỉ sai chỗ trong code hoặc mất điện thì xử lý ra sao?",
        "a": "Nếu đề có lỗi hoặc khó hiểu hoặc gặp sự cố mất điện/mạng: báo ngay với giảng viên coi thi tại chỗ; giảng viên sẽ ghi nhận để chuyển câu hoặc xử lý thi bù (tối đa 1 lần nếu sự cố khách quan có xác nhận)."
      }
    ]
  },
  "vq-62": {
    "bucket": "trace",
    "topics": [
      "QA",
      "KPI"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Phân biệt valid_price_count vs valid_ppg_count và tác động của qa_price_outlier.",
    "codeLocation": "src/kpi.py:L227-L251; src/viz.py:L191-L195",
    "followUpQA": [
      {
        "q": "Nếu price > 0 bị gắn cờ qa_price_outlier = True thì có nằm trong valid_price_count không?",
        "a": "CÓ! Điều kiện của `valid_price` chỉ kiểm tra `(~_qa_flag(df, \"qa_missing_price\")) & price.notna() & (price > 0)`, hoàn toàn KHÔNG loại `qa_price_outlier` -> giá > 0 ngoại lai vẫn nằm trong `valid_price_count` và `valid_ppg_count`."
      }
    ]
  },
  "vq-63": {
    "bucket": "storytelling",
    "topics": [
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Đọc và giải thích số liệu từ biểu đồ kpi_review_ghost.png.",
    "codeLocation": "data/processed/kpi_by_area.csv; figures/kpi_review_ghost.png",
    "followUpQA": [
      {
        "q": "Vì sao RV ở Q1 (t1->t2) cao hơn Q2 và Q3 (tính chất mùa vụ cuối năm hay yếu tố khác)?",
        "a": "Do tính chất mùa vụ lễ hội cuối năm (Giáng sinh, Năm mới, Día de Muertos tháng 11 tại Q1 t1->t2) thường có lượng khách du lịch lưu trú rất cao và để lại review dày hơn, đồng thời Q3 (t3->t4) mới đến ngày 15/06 có thể có một phần review chuyến đi đầu tháng 6 chưa kịp đăng (review lag)."
      }
    ]
  },
  "vq-64": {
    "bucket": "storytelling",
    "topics": [
      "LLM",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Phân biệt chính xác 2 mẫu số đánh giá: tổng review của mẫu/quận vs số lượt nhắc đến khía cạnh.",
    "codeLocation": "data/processed/reviews_sentiment.csv; reports/report.pdf",
    "followUpQA": [
      {
        "q": "Tại sao tỷ lệ phàn nàn trên lượt nhắc của Noise (39%) lại cao hơn Amenities (21.9%) dù tổng số review chê Amenities nhiều hơn?",
        "a": "Vì `Amenities` được nhắc rộng rãi ở 622/1.000 review (136 điểm trừ / 622 = 21.9%), trong khi `Noise` ít khi được khách nhắc trừ khi phòng thật sự yên tĩnh hoặc ồn khó chịu — trong 187 review có nhắc đến tiếng ồn thì có tới 73 câu phàn nàn/góp ý (39.0%)!"
      }
    ]
  },
  "vq-65": {
    "bucket": "trace",
    "topics": [
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "evaluationGoal": "Giải thích sự ổn định của số phần tử cắt bởi phân vị P01–P99 qua các mốc.",
    "codeLocation": "src/qa.py:L138-L146; reports/qa_report.csv",
    "followUpQA": [
      {
        "q": "Tại sao P99 tăng gấp đôi từ t1 lên t4 nhưng `rows_affected` vẫn chỉ quanh 19–20 căn?",
        "a": "Vì `qa_price_outlier` cắt cố định 1% dưới (P01) và 1% trên (P99) trên tập giá hợp lệ `valid_p` tại CHÍNH mốc đó (`t1: 960 -> ~19-20`, `t4: 980 -> ~19-20`), nên dù mặt bằng giá và P99 tăng gấp đôi thì tỷ lệ dòng bị gắn cờ vẫn luôn xấp xỉ 2% của ~980."
      }
    ]
  },
  "vq-66": {
    "bucket": "scenario",
    "topics": [
      "Architecture",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "evaluationGoal": "Trình bày quy trình tự kiểm chứng mã nguồn độc lập không phụ thuộc AI.",
    "codeLocation": "AI_USAGE.md",
    "followUpQA": [
      {
        "q": "Nếu giảng viên hỏi phương pháp kiểm chứng bất kỳ hàm nào trong 9 tệp Python của nhóm mà không mở công cụ AI, bạn trình bày quy trình kiểm thử thế nào?",
        "a": "Chạy thử từng mô-đun trên mẫu nhỏ đối chiếu tay (hand-calculation), kiểm tra schema và số dòng trung gian (`qa_report.csv` = 32, `evaluation_report` đối chiếu `ground_truth`), kiểm thử edge case (mốc t2 0 giá, chuỗi tiền tệ dị biệt, 429 RPD vs RPM) và đối chiếu mọi con số biểu đồ ngược lại về các tệp CSV đầu ra."
      }
    ]
  }
};

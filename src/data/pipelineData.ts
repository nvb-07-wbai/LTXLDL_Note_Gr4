import type { PipelineStage } from '../types';

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'download',
    order: 1,
    name: 'Bước 1: Thu thập dữ liệu (Download)',
    shortName: 'Download',
    goal: 'Tự động tải 4 tệp chuẩn Inside Airbnb cho 4 mốc snapshot về data/raw/<snapshot>/ kèm kiểm tra toàn vẹn kích thước và cơ chế thử lại khi lỗi mạng.',
    inputs: ['configs/mexico-city.yaml (data_root, snapshots)', 'https://data.insideairbnb.com/...'],
    outputs: ['data/raw/{snapshot}/listings.csv.gz', 'data/raw/{snapshot}/calendar.csv.gz', 'data/raw/{snapshot}/reviews.csv.gz', 'data/raw/{snapshot}/neighbourhoods.geojson'],
    filePath: 'src/download.py',
    mainFunctions: ['download(url, dest, max_attempts=3, force=False)', 'get_config_path(args_path)', 'main()'],
    libraries: ['requests', 'yaml', 'pathlib', 'time', 'argparse'],
    mechanism: [
      'Đọc data_root và danh sách snapshots từ YAML, sắp xếp theo thứ tự thời gian.',
      'Dựng URL động: https://data.insideairbnb.com/{data_root}/{snap}/{subfolder}/{fname}.',
      'Idempotent check: nếu file đích đã tồn tại (> 0 bytes) và không có --force thì bỏ qua.',
      'Tải streaming theo chunk 65.536 bytes vào tệp tạm .tmp trước khi dùng tmp.replace(dest).',
      'Nếu gặp HTTP 403/404: dừng ngay không retry vô ích, dùng bản local dự phòng nếu có (thực tế mốc t1 = 2025-09-27 trả HTTP 403 trên server nên dùng bản gốc đã tải trước đó, đã đối chiếu khớp SHA-256 với bản sao Google Drive: 27.051 listings / 9.873.624 calendar không có price / 1.454.740 reviews).',
      'Nếu lỗi mạng/IOError/thiếu byte (Content-Length mismatch): xóa .tmp và chờ Exponential Backoff (2**attempt = 1s, 2s).',
    ],
    rationale: 'Ghi qua tệp tạm .tmp tránh file hỏng nửa chừng khi rớt mạng; Exponential Backoff tránh spam server; tự cài bằng requests + time.sleep giúp requirements.txt gọn nhẹ không phụ thuộc tenacity.',
    risksIfWrong: [
      'Ghi trực tiếp vào đích khi rớt mạng tạo file .csv.gz cụt gây EOFError ở bước Filter.',
      'Retry cả lỗi 403/404 làm treo pipeline vô ích.',
      'Dùng lệnh input() như bản nháp cũ sẽ gây EOFError khi run_pipeline.py chạy tự động.',
    ],
    verification: 'Kiểm tra log "16/16 tệp hợp lệ" và sự tồn tại của 4 thư mục snapshot trong data/raw/ với dung lượng > 0 bytes.',
    theoryRefs: ['Bài 6: HTTP Requests, Status Codes, File I/O & CSV.GZ'],
    vivaQuestions: [
      'Tại sao phải ghi ra file .tmp rồi mới replace() sang file đích?',
      'Vì sao gặp mã 403/404 lại không retry, còn timeout/lỗi mạng mới dùng Exponential Backoff?',
      'Mốc 2025-09-27 xử lý thế nào khi server Inside Airbnb trả HTTP 403?',
    ],
    codeSnippet: {
      title: 'src/download.py — Tải streaming, kiểm Content-Length & Exponential Backoff',
      lines: 'L28–L86',
      code: `def download(url, dest, max_attempts=3, force=False):
    if dest.exists() and dest.stat().st_size > 0 and not force:
        return True
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".tmp")
    for attempt in range(max_attempts):
        try:
            resp = requests.get(url, stream=True, timeout=60)
            if resp.status_code in (403, 404):
                if tmp.exists(): tmp.unlink()
                return dest.exists() and dest.stat().st_size > 0
            resp.raise_for_status()
            expected_size = int(resp.headers.get("Content-Length", -1))
            with open(tmp, "wb") as f:
                for chunk in resp.iter_content(chunk_size=65536):
                    f.write(chunk)
            actual_size = tmp.stat().st_size
            if expected_size > 0 and actual_size != expected_size:
                raise IOError(f"Tải chưa đủ: {actual_size:,}/{expected_size:,} bytes")
            tmp.replace(dest)
            return True
        except (requests.RequestException, IOError):
            if tmp.exists(): tmp.unlink()
            if attempt < max_attempts - 1:
                time.sleep(2 ** attempt)
    return dest.exists() and dest.stat().st_size > 0`,
      annotations: [
        { label: 'Idempotent check', detail: 'File đã tồn tại và > 0 byte thì không tải lại trừ khi truyền --force.' },
        { label: 'HTTP 403/404 guard', detail: 'Lỗi quyền/không tồn tại không thể tự hết sau vài giây -> thoát sớm và fallback local nếu có.' },
        { label: 'Atomic .tmp -> replace', detail: 'Chỉ khi actual_size khớp Content-Length mới đổi tên thành file đích chính thức.' },
        { label: 'Exponential Backoff', detail: 'attempt=0 chờ 1s (2^0), attempt=1 chờ 2s (2^1) trước lần thử thứ 3.' },
      ],
    },
  },
  {
    id: 'filter',
    order: 2,
    name: 'Bước 2: Đọc phân công & Lọc dữ liệu (Filter)',
    shortName: 'Filter',
    goal: 'Đọc bảng phân công từ Google Sheets (1.000 listing_id, 5.000 review_id, cờ Mẫu LLM & Nhãn tay), lọc dữ liệu thô khổng lồ bằng chunksize và gắn cột analysis_area.',
    inputs: ['Google Sheets CSV endpoint (/gviz/tq?tqx=out:csv)', 'data/raw/{snapshot}/*.csv.gz & neighbourhoods.geojson'],
    outputs: ['data/processed/{snapshot}/listings.csv', 'calendar.csv', 'reviews.csv', 'reviews_llm.csv', 'reviews_labeled.csv', 'data/processed/neighbourhoods.geojson'],
    filePath: 'src/filter_data_from_sheet.py',
    mainFunctions: ['_read_sheet()', '_load_assignments()', '_filter_raw_by_ids()', 'run_filter_data()'],
    libraries: ['pandas', 'requests', 'yaml', 'shutil', 'urllib.parse'],
    mechanism: [
      'Đọc tab Listing và Review từ Google Sheets qua Google Visualization API CSV endpoint với dtype="string" và keep_default_na=False.',
      'Lọc đúng hàng của lớp và nhóm từ YAML (không hard-code), chuẩn hóa ID bằng _normalise_id (ép string + strip).',
      'Tách tập llm_ids (cột "Mẫu LLM" == "x") và manual_ids (cột "Nhãn tay" == "x").',
      'Đọc từng file .csv.gz lớn theo lô chunksize=100_000 với dtype={"id": "string", "listing_id": "string"}.',
      'Kiểm tra sự tồn tại của cột khóa (id cho listings/reviews, listing_id cho calendar), lọc bằng chunk[key].isin(allowed) với allowed là Python set O(1).',
      'Gắn cột analysis_area (A01–A08) cho listings bằng .map(area_by_listing) và sao chép neighbourhoods.geojson sang data/processed/.',
    ],
    rationale: 'Đọc CSV endpoint công khai không cần Service Account OAuth phức tạp; chunksize=100_000 + set O(1) giúp lọc file calendar chục triệu dòng mà không tràn RAM; giữ ID dạng string tránh lỗi float64 hoặc mất chính xác số nguyên 64-bit vượt quá 2^53.',
    risksIfWrong: [
      'Lọc reviews theo listing_id thay vì review_id (id) sẽ lấy thừa hàng chục nghìn review không được phân công.',
      'Để pandas tự suy luận ID thành float64/int64 làm biến dạng mã 19 chữ số (ví dụ 1495709040675944121).',
      'Không có mạng / Google Sheets đổi quyền truy cập -> requests.RequestException làm dừng bước Filter.',
    ],
    verification: 'Log mỗi snapshot in ra đúng: listings=1000, reviews=5000, LLM=1000, manual=100.',
    theoryRefs: ['Bài 5: .map() & .isin()', 'Bài 6: CSV dtype, Chunk Processing, Web endpoint'],
    vivaQuestions: [
      'Tại sao reviews lại lọc theo cột "id" (review_id) chứ không lọc theo "listing_id"?',
      'Tại sao phải ép dtype={"id": "string", "listing_id": "string"} ngay khi đọc CSV?',
      'chunksize=100_000 và set(assigned_ids) giải quyết vấn đề gì về hiệu năng?',
    ],
    codeSnippet: {
      title: 'src/filter_data_from_sheet.py — Lọc streaming chunksize & phân tách Mẫu LLM / Nhãn tay',
      lines: 'L115–L228',
      code: `def _filter_raw_by_ids(path: Path, key: str, assigned_ids: pd.Series, *, chunksize: int = 100_000) -> pd.DataFrame:
    allowed = set(assigned_ids)
    chunks: list[pd.DataFrame] = []
    for chunk in pd.read_csv(
        path, compression="infer",
        dtype={"id": "string", "listing_id": "string"},
        low_memory=False, chunksize=chunksize,
    ):
        if key not in chunk.columns:
            raise ValueError(f"{path} thiếu cột khóa '{key}'.")
        chunk[key] = _normalise_id(chunk[key])
        selected = chunk.loc[chunk[key].isin(allowed)].copy()
        if not selected.empty:
            chunks.append(selected)
    return pd.concat(chunks, ignore_index=True) if chunks else ...`,
      annotations: [
        { label: 'set(assigned_ids)', detail: 'Chuyển Series thành hash set để tra cứu isin() trong O(1) thay vì O(N).' },
        { label: 'dtype={"id": "string"}', detail: 'Bảo toàn tuyệt đối ID 18-19 chữ số của Airbnb, tránh tràn hoặc biến thành float.' },
        { label: 'reviews -> key="id"', detail: 'Khớp đúng review_id phân công; sau đó lọc tiếp llm_ids và manual_ids từ reviews["id"].' },
      ],
    },
  },
  {
    id: 'qa',
    order: 3,
    name: 'Bước 3: Kiểm soát chất lượng dữ liệu (QA)',
    shortName: 'QA',
    goal: 'Áp dụng 8 quy tắc QA lên listings.csv ở từng snapshot theo triết lý "Ưu tiên Gắn cờ & Bảo toàn NaN", tạo các cột *_clean và qa_*, đồng thời xuất báo cáo tác động qa_report.csv (32 dòng).',
    inputs: ['data/processed/{snapshot}/listings.csv', 'configs/mexico-city.yaml (qa.dedupe_keys, price_outlier_quantiles, currency)'],
    outputs: ['Cập nhật data/processed/{snapshot}/listings.csv (thêm cột *_clean & qa_*)', 'reports/qa_report.csv (32 dòng = 8 rules × 4 snapshots)'],
    filePath: 'src/qa.py',
    mainFunctions: ['apply_qa_rules(df, snapshot, config)', 'load_config()', 'main()'],
    libraries: ['pandas', 'numpy', 'yaml', 'argparse'],
    mechanism: [
      'Khử trùng lặp theo khóa nghiệp vụ [id, last_scraped] (chỉ xóa bản ghi trùng thực sự trong cùng snapshot).',
      'Làm sạch chuỗi giá bằng Regex r"[^\\d.-]" và pd.to_numeric(..., errors="coerce") -> tạo cột price_mxn.',
      'Gắn cờ qa_missing_price cho bản ghi thiếu giá hoặc giá <= 0; gắn cờ qa_price_outlier cho giá ngoài [P01, P99] (nhưng KHÔNG xóa).',
      'Chuẩn hóa sức chứa accommodates_clean (Int64) giữ <NA> nếu <= 0; kiểm tra miền và thứ tự logic availability_30 <= availability_90 <= availability_365.',
      'Kiểm tra number_of_reviews_clean là số nguyên >= 0 và last_review_clean <= last_scraped (bỏ qua NaN hợp lệ của căn 0 review).',
      'Ghi nhận đầy đủ 8 dòng/snapshot vào qa_report.csv kể cả khi rows_affected == 0.',
    ],
    rationale: 'Không dùng df.dropna() hay .fillna(0) vì sẽ phá vỡ kích thước mẫu 1.000 listing và làm sai lệch nghiêm trọng thống kê (nhất là t2 khuyết 100% giá). Dùng cột cờ boolean và kiểu nullable Int64 giúp KPI chỉ loại trừ ở đúng phép tính bị ảnh hưởng.',
    risksIfWrong: [
      'Dùng fillna(0) cho price/availability làm giả tạo mức giá 0 MXN hoặc occupancy 100%.',
      'Xóa các dòng outlier P01/P99 làm mất phản ánh thực tế về hành vi đầu cơ giá World Cup.',
      'Quên kiểm tra last_review > last_scraped hoặc gắn cờ nhầm cho căn 0 review (last_review = NaN).',
    ],
    verification: 'Mở reports/qa_report.csv kiểm tra đủ 32 dòng (8 quy tắc × 4 mốc), kiểm chứng mốc t2 ghi nhận 1000/1000 thiếu giá và quy tắc giá ngoại lai bỏ qua an toàn.',
    theoryRefs: ['Bài 7: Regex & String cleaning', 'Bài 8: Datetime parsing', 'Bài 10: Missing, Outliers, Deduplication, QA Rules'],
    vivaQuestions: [
      'Tại sao qa_price_outlier gắn cờ mà vẫn giữ lại khi tính KPI giá và PPG?',
      'Vì sao RULE_LAST_REVIEW_VALIDITY bỏ qua giá trị NaN thay vì gắn cờ lỗi?',
      'Nếu snapshot t2 khuyết 100% giá, code qa.py xử lý thế nào để không bị crash?',
    ],
    codeSnippet: {
      title: 'src/qa.py — Chuẩn hóa giá, gắn cờ thiếu & ngoại lai P01–P99',
      lines: 'L90–L179',
      code: `price_raw = price_series.astype("string").str.strip()
raw_numeric = pd.to_numeric(price_raw, errors="coerce")
price_numeric = pd.to_numeric(price_raw.str.replace(r"[^\\d.-]", "", regex=True), errors="coerce")
missing_price_mask = price_numeric.isna() | (price_numeric <= 0)
df["qa_missing_price"] = missing_price_mask

df["qa_price_outlier"] = False
valid_p = price_numeric.loc[~missing_price_mask]
if not valid_p.empty:
    p_high, p_low = valid_p.quantile(q_high), valid_p.quantile(q_low)
    df["qa_price_outlier"] = (~missing_price_mask) & ((price_numeric > p_high) | (price_numeric < p_low))
df[price_col] = price_numeric`,
      annotations: [
        { label: 'before_ok vs after_ok', detail: 'So sánh số parse được trước/sau khi bỏ ký tự "$", "," để đo chính xác rows_parsed.' },
        { label: 'not valid_p.empty', detail: 'Guard bắt buộc giúp mốc t2 (0 giá hợp lệ) không bị lỗi khi gọi quantile().' },
        { label: 'Chỉ gắn cờ, không xóa', detail: 'df giữ nguyên 1.000 dòng; price_mxn giữ NaN tại ô thiếu/<=0.' },
      ],
    },
  },
  {
    id: 'llm',
    order: 4,
    name: 'Bước 4: Trích xuất LLM có cấu trúc (LLM Inference)',
    shortName: 'LLM',
    goal: 'Dùng Google Gemini (gemini-3.5-flash-lite) kết hợp Pydantic Structured Outputs phân tích 1.000 review mẫu thành cảm xúc tổng thể, mã ngôn ngữ ISO và cảm xúc 7 khía cạnh, lưu cache JSONL để chạy tái lập không cần API Key.',
    inputs: ['data/processed/{snapshot}/reviews_llm.csv (1.000 reviews)', 'GEMINI_API_KEY trong .env (khi chưa đủ cache)', 'configs/mexico-city.yaml'],
    outputs: ['data/processed/llm_cache.jsonl (1.000 dòng JSONL)', 'data/processed/reviews_sentiment.csv (1.000 dòng × 15 cột)'],
    filePath: 'src/llm.py',
    mainFunctions: ['build_schemas(aspects)', 'load_cache()', 'call_llm_batch()', 'process_pending_reviews()', 'export_cache_to_csv()'],
    libraries: ['google-genai', 'pydantic', 'pandas', 'python-dotenv', 'tqdm', 'yaml'],
    mechanism: [
      'Khởi tạo dynamic Pydantic schema bằng create_model từ danh sách 7 khía cạnh trong YAML.',
      'Đọc llm_cache.jsonl: chỉ công nhận bản ghi hợp lệ đã đủ cả 7 aspects, language và overall_sentiment.',
      'Nếu bật --skip-llm hoặc cache đã đủ 1.000/1.000 -> bỏ qua gọi API (không đòi API Key).',
      'Gửi lô batch_size=5 với HTTP timeout 60s; phân loại lỗi 429 theo phút (RPM -> cooldown chờ) và theo ngày (RPD -> QuotaExceededException dừng sớm).',
      'Mỗi bản ghi thành công được append ngay lập tức vào llm_cache.jsonl; có 2 vòng tự chạy bù (vòng cuối batch_size=1).',
      'Xuất reviews_sentiment.csv, giữ NaN nếu review chưa có nhãn thay vì gán mặc định.',
    ],
    rationale: 'Structured Outputs đảm bảo JSON 100% đúng tên trường và kiểu Literal; batch_size=5 giảm chi phí token prompt lặp; append-only JSONL cache giúp gián đoạn giữa chừng không mất dữ liệu và giảng viên chấm lại được bằng --skip-llm.',
    risksIfWrong: [
      'Không lưu cache từng bước -> mất toàn bộ kết quả nếu gặp lỗi mạng ở review thứ 900.',
      'Gộp nhầm lỗi 429 RPM và RPD làm retry vô ích khi hết quota ngày.',
      'Điền mặc định "positive" cho bản ghi lỗi/thiếu trong CSV làm sai lệch đánh giá.',
    ],
    verification: 'Chạy python src/llm.py --skip-llm kiểm tra log "ĐỦ 1000/1000" và file reviews_sentiment.csv có 1.000 dòng × 15 cột không chứa NaN nhãn.',
    theoryRefs: ['Bài 11: Prompt Engineering, Structured Output, Pydantic, Cache & Rate Limit'],
    vivaQuestions: [
      'Tại sao giảng viên chấm bài không cần GEMINI_API_KEY mà pipeline vẫn chạy hết?',
      'Hàm _classify_rate_limit_error phân biệt 429 RPM và 429 RPD để làm gì?',
      'Sự khác nhau giữa mixed và positive trong prompt của nhóm là gì?',
    ],
    codeSnippet: {
      title: 'src/llm.py — Dynamic Pydantic Schema & Gọi API theo lô có phân loại 429',
      lines: 'L28–L39, L254–L296',
      code: `def build_schemas(aspects: List[str]):
    fields = {str(a).strip(): (SentimentLiteral, ...) for a in aspects if str(a).strip()}
    aspect_model = create_model("AspectSentiment", **fields)
    review_model = create_model(
        "ReviewAnalysis",
        id=(str, Field(description="Mã định danh ID của review")),
        language=(str, Field(description='Mã ngôn ngữ ISO 639-1 viết thường')),
        overall_sentiment=(Literal["positive", "mixed", "negative"], ...),
        aspects=(aspect_model, ...),
    )
    return aspect_model, review_model`,
      annotations: [
        { label: 'create_model động', detail: 'Đọc danh sách aspects trực tiếp từ YAML -> thêm/bớt khía cạnh không cần sửa class cứng.' },
        { label: 'SentimentLiteral', detail: 'Ép 4 giá trị chuẩn: positive, mixed, negative, not_mentioned.' },
        { label: 'Append cache JSONL', detail: 'Ghi từng review ngay sau khi validate thành công để chống mất dữ liệu.' },
      ],
    },
  },
  {
    id: 'baseline',
    order: 5,
    name: 'Bước 5: Mô hình đối chứng Regex (Baseline)',
    shortName: 'Baseline',
    goal: 'Xây dựng bộ phân loại hoàn toàn không dùng LLM dựa trên Regex song ngữ Anh–Tây Ban Nha và tách mệnh đề để làm chuẩn so sánh định lượng cho LLM.',
    inputs: ['data/processed/{snapshot}/reviews_llm.csv (1.000 reviews)', 'configs/mexico-city.yaml'],
    outputs: ['data/processed/reviews_baseline.csv (1.000 dòng × 15 cột cùng schema với LLM)'],
    filePath: 'src/baseline.py',
    mainFunctions: ['clean_text()', 'detect_language()', 'predict_review_regex()', 'main()'],
    libraries: ['re', 'html', 'unicodedata', 'pandas', 'yaml'],
    mechanism: [
      'clean_text: giải mã HTML entities, đổi <br/> thành \\n (giữ ranh giới câu), chuẩn hóa NFKC và xóa URL.',
      'Tách từng review thành các mệnh đề độc lập theo dấu câu [.!?;] và liên từ đối lập (but, however, pero, aunque...).',
      'Loại bỏ các cụm phủ định lành tính (BENIGN_RE: "no issues", "no noise", "ningún problema") trước khi đếm từ chê.',
      'Đếm từ tiêu cực (NEG_RE) và tích cực (POS_RE) trên từng mệnh đề; đối chiếu 7 ASPECT_PATTERNS để suy ra nhãn từng khía cạnh.',
      'Nhận diện ngôn ngữ nhanh qua LANG_PATTERNS (es, fr, pt, de, vi), mặc định "en", không chữ cái trả "und".',
    ],
    rationale: 'Theo Bài 11, nếu không có baseline đơn giản chạy lại được với chi phí 0đ thì không thể chứng minh LLM đáng dùng. Nhóm chọn Regex tách mệnh đề thay cho TF-IDF + LogisticRegression vì 100 mẫu nhãn tay quá nhỏ để train mô hình ML đa nhãn (tránh overfitting/leakage).',
    risksIfWrong: [
      'Không xử lý BENIGN_RE làm cụm "no noise" bị tính là phàn nàn tiếng ồn.',
      'Thay <br/> bằng khoảng trắng làm mất ranh giới mệnh đề khi tách câu.',
      'Bám từ khóa đặc thù của 100 mẫu nhãn tay gây overfitting giả tạo.',
    ],
    verification: 'Kiểm tra reviews_baseline.csv có đủ 1.000 dòng và 15 cột trùng khớp hoàn toàn schema của reviews_sentiment.csv.',
    theoryRefs: ['Bài 7: Regex, word boundary \\b, text normalization', 'Bài 11: Rule-based Baseline & Negation trap'],
    vivaQuestions: [
      'Vì sao nhóm bỏ mô hình TF-IDF + Logistic Regression ban đầu để chuyển sang Regex?',
      'Vai trò của BENIGN_RE và CLAUSE_RE trong src/baseline.py là gì?',
      'Nếu một khía cạnh được nhắc đến trong mệnh đề nhưng không có từ POS/NEG đi kèm, code gán nhãn gì?',
    ],
    codeSnippet: {
      title: 'src/baseline.py — Tách mệnh đề & lọc cụm phủ định lành tính BENIGN_RE',
      lines: 'L84–L118',
      code: `for clause in CLAUSE_RE.split(raw):
    cleaned = BENIGN_RE.sub(" ", clause)
    n_neg = len(NEG_RE.findall(cleaned))
    n_pos = len(POS_RE.findall(NEG_RE.sub(" ", cleaned)))
    total_pos += n_pos
    total_neg += n_neg
    for asp in aspects:
        pat = ASPECT_PATTERNS.get(asp)
        if pat and pat.search(clause):
            aspect_flags[asp][0] = True
            aspect_flags[asp][1] |= n_pos > 0
            aspect_flags[asp][2] |= n_neg > 0
overall = "positive" if total_neg == 0 else "negative" if (total_pos == 0 or total_neg >= max(3, 2 * total_pos)) else "mixed"`,
      annotations: [
        { label: 'BENIGN_RE.sub(" ", clause)', detail: 'Xóa "no noise", "no issues" trước khi đếm NEG_RE để không bắt nhầm phủ định tốt.' },
        { label: 'NEG_RE.sub(" ", cleaned)', detail: 'Xóa cụm phủ định tiêu cực (vd: "not clean") trước khi đếm POS_RE để tránh đếm nhầm "clean".' },
        { label: 'Aspect fallback', detail: 'Nếu có nhắc khía cạnh nhưng clause không có từ POS/NEG riêng thì mượn cực của overall.' },
      ],
    },
  },
  {
    id: 'evaluate',
    order: 6,
    name: 'Bước 6: Đánh giá, Hậu kiểm & Ước tính chi phí (Evaluate)',
    shortName: 'Evaluation',
    goal: 'Chấm điểm LLM vs Baseline trên 100 mẫu nhãn tay (9 chỉ số), phân tích 46 lỗi trường, chạy 6 quy tắc hậu kiểm trên toàn bộ 1.000 review LLM và ước tính chi phí API.',
    inputs: ['data/samples/ground_truth.csv (100 nhãn tay)', 'data/processed/reviews_sentiment.csv', 'data/processed/reviews_baseline.csv'],
    outputs: ['reports/evaluation_report.csv', 'reports/llm_error_analysis.csv', 'reports/llm_postcheck.csv', 'reports/llm_cost_estimate.csv'],
    filePath: 'src/evaluate.py',
    mainFunctions: ['cot_diem()', 'f1()', 'f1_cam_xuc()', 'phan_tich_loi()', 'hau_kiem()', 'uoc_tinh_chi_phi()'],
    libraries: ['pandas', 'numpy', 'scikit-learn (f1_score)', 'yaml'],
    mechanism: [
      'Đưa dữ liệu nhãn tay, LLM và Baseline về cấu trúc chuẩn hóa qua gom_du_doan() để chấm đồng nhất.',
      'Tính 9 chỉ số: Coverage, Sentiment Accuracy/Macro F1/Weighted F1, Aspect Mention F1, Praise F1, Complaint F1, Aspect Label Accuracy, Language Accuracy.',
      'Review thiếu dự đoán bị tính là sai (không bỏ ra khỏi mẫu số để tránh thổi phồng điểm).',
      'phan_tich_loi() đối chiếu 900 ô (100 review × 9 trường), phân loại lỗi thành thua / thieu / sai_nhan.',
      'hau_kiem() quét 6 quy tắc logic nội tại trên cả 1.000 review LLM mà không cần nhãn tay.',
      'uoc_tinh_chi_phi() tính token & USD dựa trên định mức ~110 token vào + ~68 token ra/review.',
    ],
    rationale: 'Macro F1 phơi bày yếu điểm của Baseline trên lớp thiểu số (mixed/negative); Hậu kiểm phát hiện ảo giác ở 900 review còn lại không có nhãn tay.',
    risksIfWrong: [
      'Chỉ báo cáo Accuracy khi lớp positive chiếm 73% sẽ che lấp thất bại của Baseline trên lớp negative/mixed.',
      'Không đưa review thiếu nhãn vào mẫu số khiến Coverage giả tạo.',
      'Tự động xóa nhãn dựa trên cảnh báo hau_kiem() (nhiều cảnh báo là ngôn ngữ gián tiếp hợp lệ).',
    ],
    verification: 'Kiểm tra 4 file CSV trong reports/: LLM đạt Accuracy 0.99, Macro F1 0.9909 (so với Baseline 0.85 và 0.5224); 46 lỗi trường; 193 cảnh báo hậu kiểm.',
    theoryRefs: ['Bài 11: Precision, Recall, Micro/Macro/Weighted F1, Error Analysis, Post-check & Token Cost'],
    vivaQuestions: [
      'Tại sao Accuracy của Baseline đạt 0.85 nhưng Macro F1 chỉ còn 0.5224?',
      'Hàm f1() cho đa nhãn (multi-label) trong evaluate.py đang tính theo Micro F1 hay Macro F1?',
      'Vì sao có tới 192 cảnh báo khia_canh_khong_can_cu nhưng không nên xóa các nhãn đó?',
    ],
    codeSnippet: {
      title: 'src/evaluate.py — Micro F1 đa nhãn & Hậu kiểm nội tại 6 quy tắc',
      lines: 'L101–L118, L174–L196',
      code: `def f1(du_doan, nhan_tay, truong):
    """F1 gộp (micro) cho trường nhiều nhãn: cộng TP/FP/FN của mọi review rồi mới tính."""
    tp = fp = fn = 0
    for ma, t in nhan_tay[truong].items():
        p = du_doan[truong].get(ma, set())
        tp += len(p & t)
        fp += len(p - t)
        fn += len(t - p)
    return 2 * tp / (2 * tp + fp + fn) if (tp + fp + fn) else np.nan

def f1_cam_xuc(du_doan, nhan_tay, average):
    y_true = list(nhan_tay["sentiment"].values())
    y_pred = [du_doan["sentiment"].get(ma, "khong_co") for ma in nhan_tay["sentiment"]]
    return f1_score(y_true, y_pred, labels=SENTIMENTS, average=average, zero_division=0)`,
      annotations: [
        { label: 'Micro-F1 gộp TP/FP/FN', detail: 'Cộng dồn tập giao/hiệu trên toàn bộ 100 review rồi mới tính công thức 2TP/(2TP+FP+FN).' },
        { label: 'get(ma, "khong_co")', detail: 'Đảm bảo nếu LLM thiếu dự đoán, mẫu số vẫn giữ nguyên và bị phạt thành sai.' },
      ],
    },
  },
  {
    id: 'kpi',
    order: 7,
    name: 'Bước 7: Động cơ tính KPI đa cấp (KPI Engine)',
    shortName: 'KPI',
    goal: 'Tính toàn bộ các chỉ số thị trường và trải nghiệm LLM sau QA trên 4 cấp độ: Listing, Area (A01–A08), Snapshot (t1–t4) và Neighbourhood (15 quận).',
    inputs: ['data/processed/{snapshot}/listings.csv (đã qua QA)', 'data/processed/reviews_sentiment.csv', 'configs/mexico-city.yaml'],
    outputs: ['data/processed/kpi_by_listing.csv', 'kpi_by_area.csv', 'kpi_by_snapshot.csv', 'kpi_by_neighbourhood.csv'],
    filePath: 'src/kpi.py',
    mainFunctions: ['compute_review_velocities()', 'compute_ghost_listings()', 'compute_occupancy_kpis()', 'compute_price_and_ppg_kpis()', 'compute_kpi_by_neighbourhood()'],
    libraries: ['pandas', 'numpy', 'yaml'],
    mechanism: [
      'Xác thực hợp đồng dữ liệu QA->KPI bằng REQUIRED_QA_COLS (12 cột bắt buộc); nếu thiếu báo ValueError ngay.',
      'Tính Review Velocity giữa 2 mốc liên tiếp (diff / (days/30)); gán NaN nếu thiếu hoặc diff < 0.',
      'Xác định Ghost Listing: tại t1 dùng (a365==0) & (nr==0 | t1 - last_review > 90 ngày); tại t2–t4 dùng (a365==0) & (review_velocity==0).',
      'Tính Occ_1-30, Occ_31-90 và Urgency Gap; khi exclude_ghost=True, loại cả ghost == 1 và ghost == <NA>.',
      'Tính Price, PPG = price / accommodates, Median, IQR, rIQR = IQR / Median (giữ nguyên qa_price_outlier).',
      'Ghép reviews_sentiment vào listing để tính tỷ lệ phàn nàn 7 khía cạnh theo quận (complaint_<aspect> và complaint_mixed_<aspect>).',
    ],
    rationale: 'Tách 4 cấp bảng KPI phục vụ đúng từng câu hỏi của SECTUR CDMX và nguyên tắc SOLID để src/viz.py chỉ đọc và vẽ.',
    risksIfWrong: [
      'Không loại ghost khi tính Occupancy làm thổi phồng công suất phòng giả tạo (căn hộ khóa lịch cả năm thành kín 100%).',
      'Gán Ghost tại t1 giống t2–t4 khi chưa có Review Velocity.',
      'Ghép bảng review vào listing theo chiều right join làm xuất hiện quận không có mẫu hoặc sai mẫu số.',
    ],
    verification: 'Kiểm tra 4 file kpi_by_*.csv: 1.000 dòng listing, 8 dòng area, 4 dòng snapshot, 15 dòng neighbourhood.',
    theoryRefs: ['Bài 3: Vectorization', 'Bài 5: GroupBy, Index Alignment, Merge', 'Bài 8: Timedelta & Snapshot comparison'],
    vivaQuestions: [
      'Logic xác định Ghost Listing ở mốc t1 khác gì so với t2, t3, t4?',
      'Khi exclude_ghost=True, những listing có ghost == <NA> được xử lý thế nào khi tính Occupancy?',
      'Vì sao rIQR dùng IQR/Median thay vì độ lệch chuẩn (Std)?',
    ],
    codeSnippet: {
      title: 'src/kpi.py — Ghost Listing (t1 vs t2..t4) & Occupancy Urgency Gap',
      lines: 'L153–L206',
      code: `if i == 0:
    last_rev = pd.to_datetime(df["last_review_clean"], errors="coerce")
    valid_lr = ~_qa_flag(df, "qa_invalid_last_review")
    valid_eval = valid_base & valid_lr & ((nr == 0) | last_rev.notna())
    is_stale = (nr == 0) | ((pd.to_datetime(snap) - last_rev).dt.days > stale_days)
    is_ghost = (a365 == 0) & is_stale
else:
    rv = velocities[f"review_velocity_q{i}"].reindex(df.index)
    valid_eval = valid_base & rv.notna()
    is_ghost = (a365 == 0) & (rv == 0)

# Occupancy (loại cả ghost == 1 và ghost == <NA> khi exclude_ghost=True)
valid_occ = valid_avail & (g == 0).fillna(False) if exclude_ghost else valid_avail`,
      annotations: [
        { label: 'Mốc đầu t1', detail: 'Chưa có mốc trước để tính RV nên kiểm tra độ cũ của last_review (> 90 ngày) hoặc chưa có review.' },
        { label: 'Mốc sau t2..t4', detail: 'Dùng chính Review Velocity == 0 kết hợp availability_365 == 0.' },
        { label: '(g == 0).fillna(False)', detail: 'Chuyển <NA> thành False để không đưa căn hộ thiếu dữ liệu vào tính Occupancy.' },
      ],
    },
  },
  {
    id: 'viz',
    order: 8,
    name: 'Bước 8: Trực quan hóa đa chiều (Visualization)',
    shortName: 'Visualization',
    goal: 'Tự động sinh 8 biểu đồ PNG chất lượng xuất bản từ các bảng KPI, GeoJSON và evaluation_report.csv, đảm bảo đủ góc nhìn Không gian, Thời gian và LLM.',
    inputs: ['data/processed/kpi_by_*.csv', 'data/processed/neighbourhoods.geojson', 'reports/evaluation_report.csv'],
    outputs: ['figures/kpi_ppg_riqr_2026-06-15.png', 'kpi_ppg_snapshots.png', 'kpi_ppg_neighbourhood.png', 'kpi_riqr_neighbourhood.png', 'kpi_review_ghost.png', 'kpi_occupancy_gap.png', 'llm_insights.png', 'llm_vs_baseline.png'],
    filePath: 'src/viz.py',
    mainFunctions: ['plot_ppg_riqr()', 'plot_ppg_snapshots()', 'plot_ppg_neighbourhood()', 'plot_riqr_neighbourhood()', 'plot_review_ghost()', 'plot_occupancy_gap()', 'plot_llm_insights()', 'plot_llm_vs_baseline()'],
    libraries: ['matplotlib', 'seaborn', 'numpy', 'pandas', 'json', 'yaml'],
    mechanism: [
      'Tuân thủ nguyên tắc phân tách trách nhiệm (chỉ đọc bảng KPI đã tính sẵn để vẽ, không tính toán lại KPI trong code vẽ).',
      'Vẽ bản đồ Choropleth 16 quận bằng matplotlib.patches.Polygon từ GeoJSON thuần, không cần phụ thuộc nặng GeoPandas.',
      'Quận không nằm trong mẫu (Tláhuac) được tô xám gạch chéo hatch="///" kèm chú giải rõ ràng.',
      'Dùng thang log cho boxplot PPG bị lệch phải; dùng chung thang đo sharex/sharey cho các khung so sánh; luôn ghi rõ cỡ mẫu n và nguồn trong caption.',
    ],
    rationale: 'Tránh cài thư viện GIS nặng (GDAL/GeoPandas) dễ gãy môi trường Windows/Python 3.14; đảm bảo 5 điểm kiểm tra một hình theo Bài 12–13.',
    risksIfWrong: [
      'Không dùng chung thang màu/thang trục giữa 4 khung bản đồ hoặc 4 snapshot dẫn đến đánh lừa thị giác.',
      'Biểu đồ cột ngang không bắt đầu từ 0.',
      'Không ghi chú cỡ mẫu n=1 (Milpa Alta) hay n=5 (Xochimilco) làm người đọc hiểu nhầm kết quả có ý nghĩa thống kê lớn.',
    ],
    verification: 'Kiểm tra đủ 8 tệp PNG trong figures/ và đối chiếu trực tiếp mọi con số trên hình với CSV.',
    theoryRefs: ['Bài 12: Matplotlib Object-Oriented API, Histogram, Bar, Log scale', 'Bài 13: Seaborn Boxplot, Heatmap, Choropleth, 5 điểm kiểm tra hình'],
    vivaQuestions: [
      'Làm thế nào src/viz.py vẽ bản đồ 16 quận CDMX mà không cần cài thư viện GeoPandas?',
      'Tại sao biểu đồ kpi_ppg_riqr phải vẽ boxplot PPG trên thang log (log_scale=True)?',
      'Quận Tláhuac không có listing nào trong mẫu được xử lý thế nào giữa kpi_by_neighbourhood.csv và bản đồ Choropleth?',
    ],
    codeSnippet: {
      title: 'src/viz.py — Vẽ đa giác Choropleth thuần & đánh dấu quận khuyết Tláhuac',
      lines: 'L240–L264',
      code: `for ax, m_col, n_col, norm, cbar_lbl, sub in map_specs:
    has_missing_poly = False
    for name, rings in features:
        in_kpi = name in nb_idx.index
        v = nb_idx[m_col].get(name, np.nan) if in_kpi else np.nan
        cnt = int(nb_idx[n_col].get(name, 0)) if in_kpi and pd.notna(nb_idx[n_col].get(name, 0)) else 0
        if (not in_kpi) or pd.isna(v) or cnt == 0:
            has_missing_poly = True
            for ring in rings:
                ax.add_patch(Polygon(ring, closed=True, facecolor="#E5E7EB", edgecolor="#64748B", hatch="///", linewidth=0.0, zorder=1))
        else:
            face = cmap(norm(float(v)))
            for ring in rings:
                ax.add_patch(Polygon(ring, closed=True, facecolor=face, edgecolor="#1E293B", linewidth=0.9, zorder=1))`,
      annotations: [
        { label: 'GeoJSON -> Polygon', detail: 'Đọc tọa độ đa giác trực tiếp bằng json.loads và vẽ bằng matplotlib.patches.Polygon.' },
        { label: 'Tláhuac hatch="///"', detail: 'Không chèn dòng giả vào CSV; chỉ tô gạch chéo xám nhạt trên bản đồ để minh bạch vùng khuyết mẫu.' },
        { label: 'Shared Normalize', detail: 'price_norm dùng chung cho Price Mean & Median; ppg_norm dùng chung cho PPG Mean & Median.' },
      ],
    },
  },
  {
    id: 'report',
    order: 9,
    name: 'Bước 9: Tổng hợp Báo cáo & Khuyến nghị (Report)',
    shortName: 'Report',
    goal: 'Kết nối số liệu đã kiểm chứng và 8 biểu đồ thành câu chuyện dữ liệu cho SECTUR CDMX, nêu rõ khuyến nghị chính sách và giới hạn nghiên cứu.',
    inputs: ['figures/*.png', 'reports/*.csv', 'data/processed/kpi_*.csv'],
    outputs: ['reports/report.pdf', 'README.md', 'AI_USAGE.md'],
    filePath: 'reports/report.pdf',
    mainFunctions: ['Cấu trúc 6 chương báo cáo', 'Khai báo minh bạch AI_USAGE.md'],
    libraries: ['Markdown / LaTeX / PDF'],
    mechanism: [
      'Đi từ câu hỏi nghiệp vụ của SECTUR CDMX -> thiết kế pipeline & QA -> hệ thống KPI -> 4 câu chuyện dữ liệu -> đánh giá LLM/Baseline -> khuyến nghị & giới hạn.',
      'Đặt giới hạn rõ ràng: mẫu 1.000 căn không đại diện toàn thị trường, t2 khuyết giá, availability là đại diện chứ không phải doanh thu/đặt phòng thật.',
    ],
    rationale: 'Theo Bài 14 (Data Storytelling), biểu đồ và số liệu chỉ có giá trị khi đi kèm bối cảnh, giới hạn và hàm ý hành động cụ thể.',
    risksIfWrong: [
      'Suy diễn nhân quả từ dữ liệu quan sát ("World Cup gây tăng giá" thay vì "tăng cùng thời điểm").',
      'Báo cáo dài 18 trang PDF vượt chuẩn 10 trang trong rubric C2 — cần lưu ý giải thích rõ khi được hỏi.',
    ],
    verification: 'Đối chiếu mọi con số trong report.pdf với các bảng CSV tại commit f69ebb195a375c2f7afbf1c75dfdc104be785614.',
    theoryRefs: ['Bài 14: Data Storytelling, Causality vs Correlation, Limitations'],
    vivaQuestions: [
      'Làm sao chứng minh những con số trong report.pdf không phải do AI bịa ra?',
      '3 khuyến nghị chính sách dành cho SECTUR CDMX trong báo cáo là gì?',
      'Những điểm nào trong báo cáo/AI_USAGE.md có sai lệch nhỏ so với code tại tag final?',
    ],
    codeSnippet: {
      title: 'run_pipeline.py — Điều phối toàn bộ 8 bước qua 1 lệnh duy nhất',
      lines: 'L9–L59',
      code: `STEPS = [
    ("Data Download", "src/download.py"),
    ("Data Filtering", "src/filter_data_from_sheet.py"),
    ("Quality Assurance", "src/qa.py"),
    ("LLM Inference", "src/llm.py"),
    ("Baseline Calculation", "src/baseline.py"),
    ("Evaluation", "src/evaluate.py"),
    ("KPI Calculation", "src/kpi.py"),
    ("Visualization", "src/viz.py"),
]
cmd = [sys.executable, str(script), "--config", str(config_path)]
if script_path == "src/llm.py" and skip_llm:
    cmd.append("--skip-llm")
subprocess.run(cmd, cwd=PROJECT_ROOT, env=env, check=True)`,
      annotations: [
        { label: 'subprocess.run(check=True)', detail: 'Chạy tuần tự từng mô-đun và dừng ngay với mã thoát 1 nếu có bước lỗi.' },
        { label: 'PYTHONIOENCODING=utf-8', detail: 'Tránh lỗi cp1252 sập terminal trên Windows khi in tiếng Việt.' },
        { label: '--skip-llm', detail: 'Chạy lại toàn bộ pipeline bằng llm_cache.jsonl mà không cần API Key.' },
      ],
    },
  },
];

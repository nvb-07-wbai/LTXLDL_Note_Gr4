import type { CodeTraceScenario } from '../../types';

export const CODE_TRACE_SCENARIOS: CodeTraceScenario[] = [
  {
    id: 'trace-filter-reviews',
    title: '1. Lọc Review từ chunk CSV (filter_data_from_sheet.py)',
    file: 'src/filter_data_from_sheet.py',
    lineRange: 'L125–L142',
    startLine: 125,
    code: `allowed = set(assigned_ids)
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
        chunks.append(selected)`,
    predictQuestion: 'Nếu lọc reviews.csv.gz với assigned_ids gồm 5.000 review_id và chunk có 100.000 dòng, trong đó 230 dòng khớp `id` và có 2 dòng `review_id` bị thừa dấu cách `" 133860 "`. Sau dòng `selected = chunk.loc[...]`, `selected` có bao nhiêu dòng và có làm thay đổi `chunk` gốc không?',
    predictOptions: [
      '228 dòng vì không khớp dấu cách; có sửa chunk gốc',
      '230 dòng vì _normalise_id() đã strip() trước khi isin(); dùng .copy() nên không sửa chunk gốc',
      '5.000 dòng vì nhân bản theo assigned_ids',
      'Báo lỗi TypeError vì set không truyền được vào isin()',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Hàm _normalise_id() thực hiện `.astype("string").str.strip().fillna("")` ngay trước `.isin(allowed)` nên cả `" 133860 "` vẫn khớp thành 230 dòng. Gọi `.copy()` tách rời khỏi chunk để tuân thủ Copy-on-Write.',
    steps: [
      {
        lineNumber: 125,
        highlightLines: [125],
        variables: [{ name: 'allowed', value: 'set of 5,000 strings', dtype: 'set[str]' }],
        dfSummary: 'Chưa đọc file; tạo bảng băm tra cứu O(1)',
        explanation: 'Chuyển Series thành Python set để mỗi lần kiểm tra isin() tốn O(1) trung bình thay vì quét tuyến tính O(5000).',
      },
      {
        lineNumber: 127,
        highlightLines: [127, 128, 129, 130, 131],
        variables: [{ name: 'chunk', value: 'DataFrame (100,000 rows)', dtype: 'id: string, listing_id: string' }],
        dfSummary: 'pd.read_csv trả TextFileReader đọc từng lô 100.000 dòng giải nén từ .csv.gz',
        explanation: 'Ép dtype={"id": "string", "listing_id": "string"} từ đầu ngăn ID 19 chữ số bị biến thành float64 mất chữ số cuối.',
      },
      {
        lineNumber: 132,
        highlightLines: [132, 133],
        variables: [{ name: 'key', value: '"id" (cho reviews)', dtype: 'str' }],
        dfSummary: 'Bảo vệ schema: nếu đổi phiên bản CSV làm mất cột khóa -> ValueError ngay',
        explanation: 'Fail-fast: thà dừng ngay còn hơn lọc ra bảng 0 dòng rồi hiểu nhầm dữ liệu trống.',
      },
      {
        lineNumber: 134,
        highlightLines: [134],
        variables: [{ name: 'chunk[key]', value: 'đã ép string + strip()', dtype: 'pd.StringDtype' }],
        dfSummary: 'Chuẩn hóa khoảng trắng đầu/cuối và thay NA bằng ""',
        explanation: 'Đảm bảo mã `" 133860 "` khớp với `"133860"` trong `allowed`.',
      },
      {
        lineNumber: 135,
        highlightLines: [135, 136, 137],
        variables: [{ name: 'selected', value: 'DataFrame (230 rows)', dtype: 'DataFrame copy' }],
        dfSummary: 'chunks nhận thêm 1 DataFrame 230 dòng (tiết kiệm >99% RAM so với giữ cả chunk)',
        explanation: 'Chỉ append khi `not selected.empty` tránh nối các chunk rỗng gây cảnh báo/lệch dtype khi concat.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu `assigned_ids` rỗng hoặc không có dòng nào khớp trong toàn bộ file?', result: '`chunks` rỗng -> hàm đọc header `nrows=0` rồi trả về DataFrame rỗng giữ nguyên đủ tên cột.' },
      { condition: 'Nếu dùng `key="listing_id"` thay cho `key="id"` khi lọc reviews?', result: 'Lấy nhầm toàn bộ chục nghìn review của 1.000 listing thay vì 5.000 review_id được phân công.' },
      { condition: 'Nếu bỏ `dtype={"id": "string"}`?', result: 'Khi cột ID có giá trị rỗng hoặc quá 15 chữ số, float64 làm tròn mất đuôi ID khiến phép so sánh isin() thất bại.' },
    ],
  },
  {
    id: 'trace-download-atomic',
    title: '2. Tải luồng nguyên tử & Backoff (download.py)',
    file: 'src/download.py',
    lineRange: 'L28–L69',
    startLine: 28,
    code: `if dest.exists() and dest.stat().st_size > 0 and not force:
    return True
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
            raise IOError("Incomplete")
        tmp.replace(dest)
        return True
    except (requests.RequestException, IOError):
        if tmp.exists(): tmp.unlink()
        if attempt < max_attempts - 1:
            time.sleep(2 ** attempt)`,
    predictQuestion: 'Giả sử `dest` CHƯA tồn tại, `max_attempts=3`. Lần 1 (`attempt=0`) bị `ReadTimeout`; Lần 2 (`attempt=1`) nhận `HTTP 403`. Tổng thời gian `sleep` là bao nhiêu giây, kết quả trả về là gì, và có tồn tại file `.tmp` trên đĩa không?',
    predictOptions: [
      'sleep 1+2=3s, trả về True, còn file .tmp',
      'sleep 1s sau lần 1; lần 2 gặp 403 xóa .tmp và return False ngay (không thử lần 3)',
      'sleep 1s, retry tiếp lần 3 rồi ném HTTPError',
      'sleep 2s và ghi file rỗng 0 byte vào dest',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Ở attempt=0, ReadTimeout bị bắt bởi except -> ngủ 2^0 = 1s. Ở attempt=1, status_code == 403 rơi vào nhánh `if resp.status_code in (403, 404)` nên unlink(.tmp) rồi return `dest.exists() ...` = False ngay lập tức!',
    steps: [
      {
        lineNumber: 28,
        highlightLines: [28, 29, 30],
        variables: [{ name: 'dest.exists()', value: 'False' }, { name: 'tmp', value: 'listings.csv.gz.tmp' }],
        dfSummary: 'Bỏ qua idempotent check vì file chưa có trên đĩa',
        explanation: 'Chuẩn bị đường dẫn tạm `.tmp` để bảo vệ file đích khỏi trạng thái tải dở dang.',
      },
      {
        lineNumber: 33,
        highlightLines: [33, 47, 48, 49, 50],
        variables: [{ name: 'attempt', value: '0' }, { name: 'Exception', value: 'ReadTimeout' }],
        dfSummary: 'Lần 1 lỗi mạng -> dọn .tmp -> time.sleep(2**0 = 1s)',
        explanation: 'Exponential Backoff: chờ 1 giây trước khi thử lại lần 2 để tránh nghẽn mạng.',
      },
      {
        lineNumber: 34,
        highlightLines: [34, 35, 36],
        variables: [{ name: 'attempt', value: '1' }, { name: 'status_code', value: '403' }],
        dfSummary: 'Lần 2 server từ chối quyền truy cập -> thoát vòng lặp ngay',
        explanation: '403/404 không phải lỗi mạng nhất thời nên không retry vô ích và kiểm tra xem có file local cũ hay không (trả False vì không có).',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu server trả HTTP 500 (Internal Server Error)?', result: 'Không thuộc (403, 404) nên đi tới `resp.raise_for_status()`, ném `HTTPError` (con của RequestException) -> ngủ 2^attempt giây và retry.' },
      { condition: 'Nếu đã có sẵn bản `t1/listings.csv.gz` lưu tay từ trước khi Inside Airbnb chặn 403?', result: 'Idempotent check ở dòng 28–29 trả về `True` ngay mà không cần gửi request mạng!' },
    ],
  },
  {
    id: 'trace-qa-price-t2',
    title: '3. Parse giá & Xử lý mốc t2 khuyết 100% giá (qa.py)',
    file: 'src/qa.py',
    lineRange: 'L90–L146',
    startLine: 90,
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
    predictQuestion: 'Tại mốc `t2` (2025-12-29), toàn bộ 1.000 dòng cột `price` là `NaN`. Kết thúc đoạn code trên: `len(df)`, số dòng `df["qa_missing_price"] == True`, và giá trị `df["qa_price_outlier"].sum()` lần lượt là bao nhiêu?',
    predictOptions: [
      'len(df)=0, missing=1000, outlier=0',
      'len(df)=1000, missing=1000, outlier=0 (không crash nhờ guard not valid_p.empty)',
      'len(df)=1000, missing=0, outlier=0',
      'Crash ZeroDivisionError hoặc IndexError tại valid_p.quantile()',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Nhờ nguyên tắc Flagging (không dropna), `len(df)` giữ nguyên 1.000 dòng để tính Occupancy & Review Velocity. Toàn bộ 1.000 ô là `qa_missing_price=True` -> `valid_p` rỗng -> nhảy qua `if not valid_p.empty:` -> `qa_price_outlier` giữ toàn `False` (sum = 0).',
    steps: [
      {
        lineNumber: 90,
        highlightLines: [90, 91, 92],
        variables: [{ name: 'price_raw', value: 'Series[1000] toàn <NA>' }, { name: 'price_numeric', value: 'Series[1000] toàn NaN', dtype: 'float64' }],
        dfSummary: 'Với chuỗi có ký tự tiền tệ (ở t1/t3/t4), raw_numeric là NaN còn price_numeric parse được thành công',
        explanation: 'Tách `raw_numeric` và `price_numeric` giúp đo chính xác bao nhiêu dòng đã được Regex r"[^\\d.-]" giải cứu.',
      },
      {
        lineNumber: 93,
        highlightLines: [93, 94],
        variables: [{ name: 'missing_price_mask.sum()', value: '1000 (ở t2)' }, { name: 'qa_missing_price', value: 'True × 1000', dtype: 'bool' }],
        dfSummary: 'Gắn cờ thiếu giá hoặc <= 0 nhưng KHÔNG xóa dòng khỏi bảng',
        explanation: 'Bảo toàn đủ 1.000 căn hộ cho bước tính Occupancy và Review Velocity.',
      },
      {
        lineNumber: 96,
        highlightLines: [96, 97, 98, 99, 100, 101],
        variables: [{ name: 'valid_p.empty', value: 'True (0 phần tử)' }, { name: 'qa_price_outlier.sum()', value: '0' }],
        dfSummary: 'Bỏ qua khối if not valid_p.empty, df[price_mxn] giữ toàn NaN',
        explanation: 'Guard `if not valid_p.empty:` bảo vệ pipeline không sinh ngoại lệ ở mốc t2 khuyết giá.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu ở mốc `t4`, một căn hộ hợp lệ có giá `153,540.00 MXN` (lớn hơn P99 = 14,084)?', result: '`qa_missing_price` = False, `qa_price_outlier` = True, nhưng `df["price_mxn"]` VẪN giữ nguyên `153540.0` (không xóa, không NaN hóa).' },
      { condition: 'Nếu dữ liệu là tiền tệ Châu Âu ghi `"$1.250,00"`?', result: 'Regex `r"[^\\d.-]"` xóa dấu `,` biến thành `"1.25000"` -> số thực `1.25` (sai lệch 1.000 lần!).' },
    ],
  },
  {
    id: 'trace-qa-avail',
    title: '4. Kiểm tra Availability Bounds & Thứ tự tập con (qa.py)',
    file: 'src/qa.py',
    lineRange: 'L214–L234',
    startLine: 214,
    code: `valid_a30 = a30_num.notna() & (a30_num >= 0) & (a30_num <= 30)
valid_a90 = (
    a90_num.notna()
    & (a90_num >= 0)
    & (a90_num <= 90)
    & (a90_num >= a30_num.fillna(-1))
)
valid_a365 = (
    a365_num.notna()
    & (a365_num >= 0)
    & (a365_num <= 365)
    & (a365_num >= a90_num.fillna(-1))
)
inv_avail_mask = (~valid_a30) | (~valid_a90) | (~valid_a365)
df["qa_invalid_availability"] = inv_avail_mask`,
    predictQuestion: 'Một dòng có `a30 = NaN`, `a90 = 20`, `a365 = 100`. Các biến `valid_a30`, `valid_a90`, `valid_a365` và kết quả cuối `inv_avail_mask` nhận giá trị gì?',
    predictOptions: [
      'valid_a30=False, valid_a90=False, valid_a365=True -> inv_avail_mask=True',
      'valid_a30=False, valid_a90=True (nhờ fillna(-1)), valid_a365=True -> inv_avail_mask=True (bị gắn cờ lỗi chung)',
      'inv_avail_mask=False vì 20 >= -1',
      'Crash TypeError khi so sánh NaN với >=',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Vì `a30_num.fillna(-1)` đổi `NaN` thành `-1`, nên `20 >= -1` là `True` giúp `valid_a90 = True` (không đánh dấu nhầm cột a90 là hỏng trong `availability_90_clean`). Tuy nhiên `(~valid_a30)` là `True` nên cờ tổng `inv_avail_mask` vẫn bắt chính xác là `True`!',
    steps: [
      {
        lineNumber: 214,
        highlightLines: [214],
        variables: [{ name: 'valid_a30', value: 'False (vì a30 is NaN)' }],
        dfSummary: 'Cột availability_30_clean sẽ nhận <NA>',
        explanation: 'a30 thiếu khiến bước kiểm tra tổng thể phải gắn cờ.',
      },
      {
        lineNumber: 215,
        highlightLines: [215, 219, 220],
        variables: [{ name: 'a30_num.fillna(-1)', value: '-1' }, { name: 'valid_a90', value: 'True (20 >= -1)' }],
        dfSummary: 'availability_90_clean giữ giá trị 20 hợp lệ riêng cho cột 90 ngày',
        explanation: 'Tránh dây chuyền làm mất luôn giá trị a90 hợp lệ chỉ vì a30 bị thiếu.',
      },
      {
        lineNumber: 227,
        highlightLines: [227, 228],
        variables: [{ name: 'inv_avail_mask', value: 'True' }, { name: 'qa_invalid_availability', value: 'True' }],
        dfSummary: 'Toàn dòng bị gắn cờ không đủ điều kiện tính Occupancy 1-30 / 31-90',
        explanation: 'Đảm bảo bước KPI không tính được a31_90 = a90 - a30 khi thiếu a30.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu một dòng có `a30 = 25`, `a90 = 15`, `a365 = 200`?', result: '`valid_a30=True`, nhưng `15 >= 25` là False nên `valid_a90=False` -> `qa_invalid_availability=True` (ngăn chặn lỗi `a31_90 = -10` âm).' },
    ],
  },
  {
    id: 'trace-llm-429',
    title: '5. Phân loại lỗi 429 RPM vs RPD (llm.py)',
    file: 'src/llm.py',
    lineRange: 'L233–L290',
    startLine: 233,
    code: `rate_kind = _classify_rate_limit_error(e)
if rate_kind == "daily":
    raise QuotaExceededException(f"Hạn ngạch ngày đã cạn: {e}")
if attempt < max_retries - 1:
    if rate_kind == "rate":
        cooldown = min(60, 20 * (attempt + 1))
        time.sleep(cooldown)
    else:
        wait_time = delays[attempt] if attempt < len(delays) else delays[-1]
        time.sleep(wait_time)`,
    predictQuestion: 'Khi gọi `call_llm_batch(..., max_retries=5)` ở `attempt = 1`, nếu Gemini API trả về lỗi `"429 RESOURCE_EXHAUSTED: RequestsPerMinute limit exceeded"`, code chạy nhánh nào và chờ bao lâu? Còn nếu chuỗi chứa `"RequestsPerDay"` thì sao?',
    predictOptions: [
      'Cả hai đều chờ delays[1] = 15 giây',
      'RequestsPerMinute -> rate_kind="rate", chờ cooldown = min(60, 20*(1+1)) = 40s; RequestsPerDay -> ném QuotaExceededException dừng cả batch loop',
      'RequestsPerMinute ném QuotaExceededException',
      'Bỏ qua và ghi "positive" vào cache',
    ],
    correctOptionIndex: 1,
    predictExplanation: '`_classify_rate_limit_error()` tìm cụm `perday/per_day/requestsperday/daily`. Nếu không có -> trả `"rate"`, tại `attempt=1` tính `20 * (1 + 1) = 40s`. Nếu là `"daily"` -> ném `QuotaExceededException` để `process_pending_reviews()` thoát vòng lặp ngay không đốt request vô ích.',
    steps: [
      {
        lineNumber: 283,
        highlightLines: [283],
        variables: [{ name: 'rate_kind', value: '"rate" (hoặc "daily")' }],
        dfSummary: 'Phân tách lỗi giới hạn theo phút (tạm thời) và theo ngày (hết hẳn)',
        explanation: 'Kiểm tra chuỗi error message, status RESOURCE_EXHAUSTED và mã HTTP 429.',
      },
      {
        lineNumber: 284,
        highlightLines: [284, 285],
        variables: [{ name: 'QuotaExceededException', value: 'Raised nếu daily' }],
        dfSummary: 'Dừng sớm vòng lặp process_pending_reviews, bảo toàn toàn bộ cache đã append',
        explanation: 'Không cố retry 5 lần × 200 batch còn lại khi quota ngày đã về 0.',
      },
      {
        lineNumber: 287,
        highlightLines: [287, 288, 290],
        variables: [{ name: 'attempt', value: '1' }, { name: 'cooldown', value: '40 giây' }],
        dfSummary: 'Chờ 20s (attempt=0), 40s (attempt=1), tối đa 60s cho RPM',
        explanation: 'Cho cửa sổ 1 phút kịp hồi phục rồi gọi tiếp đúng lô hiện tại.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu API trả về HTTP 503 Unavailable ở `attempt = 2`?', result: '`rate_kind` là `None` -> rơi vào nhánh `else`, dùng `delays[2] = 30` giây.' },
    ],
  },
  {
    id: 'trace-llm-cache',
    title: '6. Nạp Cache JSONL & Chống rác (llm.py)',
    file: 'src/llm.py',
    lineRange: 'L92–L113',
    startLine: 92,
    code: `cache: Dict[str, Any] = {}
if not cache_path.exists():
    return cache
with open(cache_path, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line: continue
        try:
            rec = json.loads(line)
            r_id = str(rec.get("review_id", "")).strip()
            aspects = rec.get("aspects", {})
            has_all_aspects = (
                isinstance(aspects, dict)
                and all(a in aspects for a in required_aspects)
            )
            if r_id and rec.get("language") and rec.get("overall_sentiment") and has_all_aspects:
                cache[r_id] = rec
        except Exception:
            continue`,
    predictQuestion: 'Nếu `llm_cache.jsonl` có 1.000 dòng, trong đó dòng cuối bị ngắt điện nửa chừng (lỗi JSON) và 1 dòng khác thiếu mất khía cạnh `"safety"`, hàm `load_cache()` trả về bao nhiêu phần tử và xử lý thế nào ở bước chạy sau?',
    predictOptions: [
      'Crash JSONDecodeError toàn chương trình',
      'Trả về 998 phần tử hợp lệ; 2 review còn thiếu sẽ tự động được liệt vào `pending_rows` để gọi bù API',
      'Trả về 999 phần tử (vẫn giữ dòng thiếu safety)',
      'Xóa toàn bộ file cache để chạy lại từ đầu',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Nhánh `except Exception: continue` bỏ qua dòng JSON hỏng nửa chừng; điều kiện `all(a in aspects for a in required_aspects)` loại dòng thiếu `"safety"`. Cả 2 ID vắng mặt trong dict `cache` sẽ được `process_pending_reviews()` phát hiện và chạy bù.',
    steps: [
      {
        lineNumber: 99,
        highlightLines: [99, 100, 101],
        variables: [{ name: 'rec', value: 'dict từ 1 dòng JSONL' }],
        dfSummary: 'Mỗi dòng độc lập -> 1 dòng lỗi không làm hỏng 999 dòng khác',
        explanation: 'Ưu điểm vượt trội của JSONL so với mảng JSON khổng lồ `[...]`.',
      },
      {
        lineNumber: 103,
        highlightLines: [103, 104, 105, 106],
        variables: [{ name: 'has_all_aspects', value: 'bool (kiểm đủ 7 aspect từ YAML)' }],
        dfSummary: 'Nếu đổi danh sách aspects trong YAML -> cache cũ thiếu aspect mới sẽ tự chạy bổ sung',
        explanation: 'Đảm bảo cache luôn khớp schema hiện hành trong cấu hình.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu chạy `python src/llm.py --skip-llm` khi cache chỉ mới có 998/1.000 bản ghi?', result: 'Hàm `export_cache_to_csv()` vẫn xuất bảng 1.000 dòng nhưng giữ trống (NaN) ở 2 dòng thiếu thay vì gán nhãn giả.' },
    ],
  },
  {
    id: 'trace-baseline-clause',
    title: '7. Tách mệnh đề & Trừ phủ định BENIGN_RE (baseline.py)',
    file: 'src/baseline.py',
    lineRange: 'L92–L118',
    startLine: 92,
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
    predictQuestion: 'Xét chuỗi review: `"Great location! Not clean at all, but no noise issues."`. Dự đoán kết quả của `predict_review_regex()` cho `overall_sentiment`, `location`, `cleanliness`, và `noise`?',
    predictOptions: [
      'overall="mixed", location="positive", cleanliness="negative", noise="negative"',
      'overall="mixed", location="positive", cleanliness="negative", noise="positive"',
      'overall="positive", cleanliness="positive" vì có từ "clean"',
      'overall="negative" vì chứa 2 mệnh đề phủ định',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Mệnh đề 1 (`Great location`) -> pos=1, location=(T,T,F) -> `"positive"`. Mệnh đề 2 (`Not clean at all`) -> `"Not clean"` khớp NEG_RE rồi bị xóa trước khi đếm POS_RE (tránh đếm nhầm `"clean"`) -> neg=1, cleanliness=(T,F,T) -> `"negative"`. Mệnh đề 3 (`no noise issues`): BENIGN_RE xóa `"no noise issues"` nên `n_neg=0, n_pos=0`, nhưng `pat.search(clause)` vẫn thấy `"noise"` (`mentioned=True, has_pos=F, has_neg=F`) -> fallback sang `overall ("mixed" != "negative")` nên gán `"positive"`! (Chứng minh Regex có thể gán nhãn khía cạnh bằng fallback cực tính).',
    steps: [
      {
        lineNumber: 92,
        highlightLines: [92],
        variables: [{ name: 'clauses', value: '["Great location", " Not clean at all", " no noise issues."]' }],
        dfSummary: 'CLAUSE_RE tách tại `!`, `,`, `but`',
        explanation: 'Giữ ý khen và ý chê tách biệt theo từng mệnh đề ngắn.',
      },
      {
        lineNumber: 94,
        highlightLines: [93, 94, 95],
        variables: [{ name: 'Clause 2 n_neg', value: '1 ("Not clean")' }, { name: 'Clause 2 n_pos', value: '0 (vì "Not clean" đã bị thay bằng " ")' }],
        dfSummary: 'Tránh bẫy phủ định đảo dấu ("not clean" không được tính là +1 clean)',
        explanation: 'Thủ thuật `NEG_RE.sub(" ", cleaned)` trước khi chạy `POS_RE` là điểm then chốt của baseline.py.',
      },
      {
        lineNumber: 105,
        highlightLines: [105, 117],
        variables: [{ name: 'total_pos / total_neg', value: '1 / 1 -> overall = "mixed"' }],
        dfSummary: 'Mệnh đề 3 ("no noise issues") bị BENIGN_RE tẩy -> falling back sang "positive"',
        explanation: 'Cho thấy giới hạn của luật từ điển cứng khi mệnh đề lành tính không mang tính từ khen rõ rệt.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu `raw` là chuỗi chỉ gồm emoji `"👍🔥"` không chứa chữ cái?', result: '`clean_text` giữ `"👍🔥"`, `total_neg=0` -> overall="positive", `detect_language` không thấy chữ cái `[^\\W\\d_]` -> `"und"`.' },
    ],
  },
  {
    id: 'trace-evaluate-f1',
    title: '8. Micro F1 Đa nhãn & Penalty thiếu nhãn (evaluate.py)',
    file: 'src/evaluate.py',
    lineRange: 'L101–L117',
    startLine: 101,
    code: `def f1(du_doan, nhan_tay, truong):
    if truong not in du_doan:
        return np.nan
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
    predictQuestion: 'Xét 2 review trong nhãn tay: R1 có nhãn thật `{"location", "host"}` và mô hình đoán `{"location"}`; R2 có nhãn thật `{"noise"}` nhưng mô hình BỊ THIẾU bản ghi (`ma` không có trong `du_doan`). Giá trị `f1(...)` trả về là bao nhiêu?',
    predictOptions: [
      '0.50 (vì R2 không có trong dự đoán nên được bỏ qua)',
      '0.50 với TP=1, FP=0, FN=2 -> 2*1 / (2*1 + 0 + 2) = 0.50 (R2 góp FN=1 vào mẫu số)',
      '1.00 vì phần dự đoán đúng 100%',
      'KeyError vì thiếu R2',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Hàm dùng `.get(ma, set())` nên khi R2 vắng mặt, `p = set()`, `t - p = {"noise"}` làm `fn` tăng thêm 1! Tổng TP=1, FP=0, FN=2 -> `2 / 4 = 0.50`. Tương tự `f1_cam_xuc()` điền `"khong_co"` để phạt vào Recall của lớp thực.',
    steps: [
      {
        lineNumber: 106,
        highlightLines: [106, 107, 108, 109, 110],
        variables: [{ name: 'R1 (p & t, t - p)', value: 'TP+=1, FP+=0, FN+=1' }, { name: 'R2 (p=set())', value: 'TP+=0, FP+=0, FN+=1' }],
        dfSummary: 'Không bỏ review thiếu dự đoán ra khỏi vòng lặp ground truth',
        explanation: 'Đảm bảo Coverage < 1.0 sẽ lập tức kéo tụt F1 của toàn bộ mô hình.',
      },
      {
        lineNumber: 111,
        highlightLines: [111],
        variables: [{ name: 'Result', value: '2*1 / (2+0+2) = 0.5' }],
        dfSummary: 'Micro F1 tính gộp TP/FP/FN trên tất cả mẫu rồi mới chia',
        explanation: 'Khác với Macro F1 (tính F1 từng review hoặc từng lớp rồi mới lấy trung bình cộng).',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu ở `f1_cam_xuc()`, lớp `negative` chỉ có 2 mẫu và mô hình dự đoán sai cả 2?', result: 'F1 lớp `negative` = `0.0`. Macro F1 kéo tụt mạnh vì lấy (F1_pos + F1_mix + 0.0) / 3.' },
    ],
  },
  {
    id: 'trace-kpi-rv-ghost',
    title: '9. Review Velocity & Index Alignment (kpi.py)',
    file: 'src/kpi.py',
    lineRange: 'L122–L137',
    startLine: 122,
    code: `for i in range(len(snapshots) - 1):
    snap_prev, _, df_prev = snapshots[i]
    snap_curr, _, df_curr = snapshots[i + 1]
    nr_prev = pd.to_numeric(df_prev["number_of_reviews_clean"], errors="coerce")
    nr_curr = pd.to_numeric(df_curr["number_of_reviews_clean"], errors="coerce")
    valid_prev = (~_qa_flag(df_prev, "qa_missing_reviews")) & nr_prev.notna()
    valid_curr = (~_qa_flag(df_curr, "qa_missing_reviews")) & nr_curr.notna()
    diff = nr_curr - nr_prev
    valid_pair = valid_prev & valid_curr & (diff >= 0)
    delta_months = max((pd.to_datetime(snap_curr) - pd.to_datetime(snap_prev)).days, 1) / 30.0
    velocities[f"review_velocity_q{i + 1}"] = (diff / delta_months).where(valid_pair, np.nan).round(4)`,
    predictQuestion: 'Từ `2026-03-30` (t3) đến `2026-06-15` (t4, cách nhau 77 ngày), Listing L1 có `nr` giảm từ `12` xuống `11` (do nền tảng xóa 1 spam review), còn Listing L2 tăng từ `10` lên `15`. Kết quả `review_velocity_q3` của L1 và L2 là gì?',
    predictOptions: [
      'L1 = -0.3896, L2 = 1.9481',
      'L1 = NaN (vì diff = -1 < 0 làm valid_pair = False), L2 = 5 / (77/30) = 1.9481',
      'L1 = 0.0 (tự ép về 0), L2 = 1.9481',
      'Bị lỗi nếu thứ tự dòng ở t3 và t4 khác nhau',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Index của `df_prev` và `df_curr` đã được gắn bằng `"id"` trong `_load_snapshots()` nên phép trừ `nr_curr - nr_prev` luôn khớp đúng ID. Vì L1 có `diff = -1 < 0`, `valid_pair` là `False` -> giữ `np.nan` (trong CSV thực tế tại Q3 có đúng 1/1.000 căn rơi vào trường hợp này nên `rvN = 999`).',
    steps: [
      {
        lineNumber: 131,
        highlightLines: [131, 132],
        variables: [{ name: 'L1 diff', value: '-1 -> valid_pair=False' }, { name: 'L2 diff', value: '5 -> valid_pair=True' }],
        dfSummary: 'Index Alignment tự ghép đúng ID giữa 2 bảng bất kể thứ tự hàng',
        explanation: 'Không gán RV âm hoặc ép 0 giả cho L1 vì giảm review là nhiễu xóa bình luận từ hệ thống Airbnb.',
      },
      {
        lineNumber: 133,
        highlightLines: [133, 136],
        variables: [{ name: 'delta_months', value: '77 / 30 = 2.5667' }, { name: 'L2 RV', value: 'round(5 / 2.5667, 4) = 1.9481' }],
        dfSummary: 'Chuẩn hóa về đơn vị reviews / 30 ngày giúp Q1 (93d), Q2 (91d), Q3 (77d) so được với nhau',
        explanation: 'Nếu không chia cho (days/30), quý 93 ngày sẽ luôn có vẻ nóng hơn quý 77 ngày dù tốc độ thật bằng nhau.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu ở một bảng, `qa_missing_reviews` thiếu (`NaN`)?', result: 'Hàm `_qa_flag()` gọi `.fillna(True)` -> coi là vi phạm QA (an toàn bảo thủ) nên `valid_curr = False`.' },
    ],
  },
  {
    id: 'trace-kpi-ghost-occ',
    title: '10. Ghost Listing & Kleene logic pd.NA trong Occupancy (kpi.py)',
    file: 'src/kpi.py',
    lineRange: 'L170–L206',
    startLine: 170,
    code: `series = pd.Series(pd.NA, index=df.index, dtype="Int64", name=col)
series = series.mask(valid_eval & is_ghost, 1)
ghost_dict[col] = series.mask(valid_eval & (~is_ghost), 0)
...
if exclude_ghost:
    g = ghost_dict[f"ghost_{t_lbl}"].reindex(df.index)
    valid_occ = valid_avail & (g == 0).fillna(False)
else:
    valid_occ = valid_avail
occ_30_raw = ((30.0 - a30) / 30.0).where(valid_occ, np.nan)`,
    predictQuestion: 'Tại t4, Listing L1 (cùng căn có `diff < 0` ở câu trên) có `rv_q3 = NaN` và `a30 = 10`. Khi `exclude_ghost=True`, giá trị `ghost_t4` và `occ_1-30_t4` của L1 là gì? Điều gì xảy ra nếu bỏ `.fillna(False)` sau `(g == 0)`?',
    predictOptions: [
      'ghost_t4 = 0, occ_1-30_t4 = 0.6667',
      'ghost_t4 = <NA>, occ_1-30_t4 = NaN; nếu bỏ .fillna(False) thì phép `&` giữa bool và <NA> tạo mảng chứa <NA> và làm crash phép lọc/gán',
      'ghost_t4 = 1, occ_1-30_t4 = 0.0',
      'Không có tác dụng gì vì Int64 không chứa được <NA>',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Do `rv_q3` là `NaN`, `valid_eval` là `False` -> `ghost_t4` giữ `<NA>` (nên `ghost_n_t4 = 999`). Ở Occupancy, `<NA> == 0` cho kết quả `pd.NA` (logic 3 giá trị Kleene), nhờ `.fillna(False)` biến nó thành `False` một cách an toàn -> `occ_1-30_t4` nhận `NaN` (`occ_n_t4 = 995 = 999 - 4 căn ghost`).',
    steps: [
      {
        lineNumber: 171,
        highlightLines: [171, 172, 173],
        variables: [{ name: 'L1 valid_eval', value: 'False' }, { name: 'L1 ghost_t4', value: '<NA>', dtype: 'Int64' }],
        dfSummary: 'Phân biệt rạch ròi 3 trạng thái: 0 (hoạt động), 1 (ghost), <NA> (chưa đủ dữ liệu đánh giá)',
        explanation: 'Không suy đoán một căn thiếu RV là 0 hay 1.',
      },
      {
        lineNumber: 196,
        highlightLines: [196, 197, 201],
        variables: [{ name: '(g == 0)', value: '<NA> cho L1', dtype: 'boolean' }, { name: 'valid_occ', value: 'False cho L1' }],
        dfSummary: 'Loại cả 4 căn ghost == 1 và 1 căn ghost == <NA> -> 1000 - 4 - 1 = 995 căn ở occ_n_t4',
        explanation: 'Chứng minh khớp 100% với số `occ_n = 995` trong `kpi_by_snapshot.csv`!',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu bật `exclude_ghost: false` trong YAML?', result: 'Cả 4 căn `ghost=1` có `a30=0` được gộp vào tính Occupancy (Occ=100%), làm `occ_1-30` tăng ảo.' },
    ],
  },
  {
    id: 'trace-viz-choropleth',
    title: '11. Vẽ bản đồ Choropleth thuần & Gạch chéo Tláhuac (viz.py)',
    file: 'src/viz.py',
    lineRange: 'L240–L253',
    startLine: 240,
    code: `for name, rings in features:
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
    predictQuestion: 'GeoJSON của Mexico City có 16 quận, nhưng `kpi_by_neighbourhood.csv` chỉ có 15 dòng (vắng `"Tláhuac"`). Khi vòng lặp gặp `"Tláhuac"`, kết quả thực thi ra sao?',
    predictOptions: [
      'Ném KeyError vì "Tláhuac" không có trong nb_idx.index',
      'in_kpi=False -> vào nhánh if, vẽ Polygon màu xám nhạt #E5E7EB có gạch chéo "///" và bật has_missing_poly=True để thêm chú giải',
      'Bỏ qua không vẽ đa giác Tláhuac tạo lỗ thủng trắng',
      'Tự chèn dòng giá bằng 0 vào file CSV',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Nhờ kiểm tra `in_kpi = name in nb_idx.index` trước khi truy cập `nb_idx[m_col].get(...)`, vùng khuyết mẫu không gây KeyError mà được tô xám gạch chéo `hatch="///"` rất minh bạch.',
    steps: [
      {
        lineNumber: 240,
        highlightLines: [240, 241, 242],
        variables: [{ name: 'name', value: '"Tláhuac"' }, { name: 'in_kpi', value: 'False' }, { name: 'v, cnt', value: 'np.nan, 0' }],
        dfSummary: 'An toàn hoàn toàn khi bảng KPI chỉ có 15/16 quận',
        explanation: 'Tuân thủ SOLID: viz.py tự xử lý hiển thị khuyết trên hình, không làm bẩn CSV.',
      },
      {
        lineNumber: 244,
        highlightLines: [244, 245, 246, 247],
        variables: [{ name: 'has_missing_poly', value: 'True' }, { name: 'hatch', value: '"///"' }],
        dfSummary: 'Hiển thị ô chú giải phụ "Không có trong mẫu" cạnh bản đồ',
        explanation: 'Giúp SECTUR CDMX không hiểu nhầm Tláhuac là vùng giá 0 MXN.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu ở một quận có trong CSV (15 dòng) nhưng tất cả listing của quận đó đều thiếu giá (`cnt == 0`)?', result: 'Điều kiện `cnt == 0` vẫn kích hoạt tô xám gạch chéo chính xác.' },
    ],
  },
  {
    id: 'trace-run-pipeline',
    title: '12. Orchestrator dừng lỗi & Truyền cờ --skip-llm (run_pipeline.py)',
    file: 'run_pipeline.py',
    lineRange: 'L21–L58',
    startLine: 21,
    code: `cmd = [sys.executable, str(script), "--config", str(config_path)]
if script_path == "src/llm.py" and skip_llm:
    cmd.append("--skip-llm")
subprocess.run(cmd, cwd=PROJECT_ROOT, env=env, check=True)
...
for name, script in STEPS:
    try:
        run_step(name, script, config_path, env, skip_llm=args.skip_llm)
    except subprocess.CalledProcessError as error:
        print(f"[FATAL] Step '{name}' failed (exit code: {error.returncode})")
        sys.exit(1)`,
    predictQuestion: 'Khi giảng viên chạy `python run_pipeline.py --config configs/mexico-city.yaml --skip-llm` trên máy KHÔNG có biến môi trường `GEMINI_API_KEY`, giả sử bước `Quality Assurance` chạy xong còn bước `LLM Inference` gặp cache đủ 1.000/1.000. Luồng lệnh thực tế xảy ra thế nào?',
    predictOptions: [
      'Bước LLM tự động bị bỏ qua không chạy `src/llm.py`',
      'Vẫn chạy `src/llm.py --config ... --skip-llm` -> đọc `llm_cache.jsonl`, bỏ qua `init_client()`, xuất `reviews_sentiment.csv` rồi sang `src/baseline.py`',
      'Lỗi FileNotFoundError đòi tệp `.env`',
      'Tất cả 8 script chạy song song cùng lúc',
    ],
    correctOptionIndex: 1,
    predictExplanation: 'Cờ `--skip-llm` không skip toàn bộ script `src/llm.py` mà truyền tham số `--skip-llm` vào lệnh gọi `src/llm.py`! Bên trong `src/llm.py`, chế độ này vẫn nạp cache 1.000 dòng và xuất `reviews_sentiment.csv` cho các bước Evaluate, KPI và Viz phía sau.',
    steps: [
      {
        lineNumber: 29,
        highlightLines: [29, 30, 31],
        variables: [{ name: 'cmd', value: '[python, "src/llm.py", "--config", "...", "--skip-llm"]' }],
        dfSummary: 'Chỉ gắn thêm `--skip-llm` cho đúng `src/llm.py` (không truyền sang các script khác gây lỗi argparse)',
        explanation: 'Dùng `sys.executable` bảo đảm tiến trình con chạy trong đúng `.venv` đang kích hoạt.',
      },
      {
        lineNumber: 33,
        highlightLines: [33],
        variables: [{ name: 'subprocess.run', value: 'blocking + check=True' }],
        dfSummary: 'Chờ bước trước ghi file hoàn tất mới chạy bước tiếp theo',
        explanation: 'Khắc phục lỗi tranh chấp file (race condition) khi dùng `Popen`.',
      },
    ],
    whatIfVariants: [
      { condition: 'Nếu bước `Data Filtering` mất mạng trả về exit code 1?', result: '`subprocess.run(check=True)` ném `CalledProcessError`, vòng `for` bắt lỗi, in `[FATAL]` và `sys.exit(1)` ngay lập tức không chạy tiếp QA trên dữ liệu cũ.' },
    ],
  },
];

import type { CodeFunctionDoc } from '../../types';

export const CODEBASE_FUNCTIONS_PART_2: CodeFunctionDoc[] = [
  {
    "id": "evaluate-load-config",
    "file": "src/evaluate.py",
    "name": "load_config",
    "kind": "function",
    "lineStart": 48,
    "lineEnd": 51,
    "signature": "def load_config(path=None):",
    "purpose": "Đọc file cấu hình YAML cho bước Evaluation (đường dẫn ground truth, LLM CSV, Baseline CSV và llm.model/sample_size).",
    "flow": [
      "Xác định Path từ tham số/PIPELINE_CONFIG/mặc định và parse YAML."
    ],
    "input": "path (str | None)",
    "output": "dict",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: Path, get, is_absolute, read_text, safe_load"
    ],
    "example": "cfg = load_config(\"configs/mexico-city.yaml\")",
    "usage": "Gọi trong main() của src/evaluate.py.",
    "potentialBugs": [
      "Không kiểm tra is_file() rõ như các module khác -> nếu thiếu path sẽ ném OSError mặc định từ read_text()."
    ],
    "viva": [
      {
        "q": "Những khóa YAML nào phục vụ evaluate.py?",
        "a": "evaluate.ground_truth, llm.output_csv, baseline.output_csv, llm.model, llm.sample_size và snapshots."
      }
    ],
    "code": "def load_config(path=None):\n    p = Path(path or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\"))\n    p = p if p.is_absolute() else ROOT / p\n    return yaml.safe_load(p.read_text(encoding=\"utf-8\"))"
  },
  {
    "id": "evaluate-doc-bang",
    "file": "src/evaluate.py",
    "name": "doc_bang",
    "kind": "function",
    "lineStart": 54,
    "lineEnd": 69,
    "signature": "def doc_bang(path, bat_buoc=True, aspects=ASPECTS):",
    "purpose": "Đọc một bảng nhãn CSV (ground truth, LLM hoặc baseline), chuẩn hóa tên cột id, ép lowercase/strip cho các cột nhãn và đặt id làm index.",
    "flow": [
      "Kiểm tra file tồn tại (nếu bat_buoc=True -> FileNotFoundError; False -> trả None).",
      "Đọc CSV với dtype=str (giữ nguyên ID 19 chữ số), đổi \"review_id\" thành \"id\" nếu cần.",
      "Strip + lower toàn bộ cột nhãn (overall_sentiment, baseline_sentiment, language, 7 aspects).",
      "Loại trùng id nếu có (drop_duplicates(\"id\")) và set_index(\"id\")."
    ],
    "input": "path (str | Path), bat_buoc (bool=True), aspects",
    "output": "pd.DataFrame đã đặt index là \"id\" (hoặc None nếu không bắt buộc).",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: FileNotFoundError, Path, apply, drop_duplicates, is_absolute, is_file, lower, print, read_csv, rename, set_index, strip"
    ],
    "example": "gt = doc_bang(\"data/samples/ground_truth.csv\") -> 100 dòng, index=id",
    "usage": "Đọc cả 3 bảng: ground_truth.csv, reviews_sentiment.csv và reviews_baseline.csv trong main().",
    "potentialBugs": [
      "Dùng `.apply(lambda s: s.str.strip().str.lower())` trên df[cot_nhan] giả định pandas đọc mọi ô dạng string/object (an toàn vì đã truyền dtype=str)."
    ],
    "viva": [
      {
        "q": "Vì sao `doc_bang()` truyền `dtype=str` khi đọc ground_truth.csv và reviews_sentiment.csv?",
        "a": "Để ID review 19 chữ số không bị hỏng do float64 khi ghép chỉ số giữa bảng nhãn tay và bảng dự đoán."
      }
    ],
    "code": "def doc_bang(path, bat_buoc=True, aspects=ASPECTS):\n    \"\"\"Đọc CSV, chuẩn hoá id và nhãn (strip + lower), đặt id làm index.\"\"\"\n    p = Path(path)\n    p = p if p.is_absolute() else ROOT / p\n    if not p.is_file():\n        if bat_buoc:\n            raise FileNotFoundError(f\"[EVAL] Không tìm thấy {p}\")\n        print(f\"[EVAL WARN] Chưa có {p.name} -> bỏ qua cột này.\")\n        return None\n    df = pd.read_csv(p, dtype=str)\n    if \"id\" not in df.columns and \"review_id\" in df.columns:\n        df = df.rename(columns={\"review_id\": \"id\"})\n    df[\"id\"] = df[\"id\"].str.strip()\n    cot_nhan = [c for c in [\"overall_sentiment\", \"baseline_sentiment\", \"language\", *aspects] if c in df.columns]\n    df[cot_nhan] = df[cot_nhan].apply(lambda s: s.str.strip().str.lower())\n    return df.drop_duplicates(\"id\").set_index(\"id\")"
  },
  {
    "id": "evaluate-loc-hop-le",
    "file": "src/evaluate.py",
    "name": "loc_hop_le",
    "kind": "function",
    "lineStart": 72,
    "lineEnd": 74,
    "signature": "def loc_hop_le(llm):",
    "purpose": "Lọc các dòng LLM có kết quả hợp lệ (overall_sentiment thuộc [\"positive\", \"mixed\", \"negative\"] và language khác NaN).",
    "flow": [
      "Dùng boolean indexing `llm[\"overall_sentiment\"].isin(SENTIMENTS) & llm[\"language\"].notna()`."
    ],
    "input": "llm (pd.DataFrame)",
    "output": "pd.DataFrame chỉ gồm các dòng đã có nhãn hợp lệ.",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: isin, notna"
    ],
    "example": "llm_clean = loc_hop_le(llm) -> 1.000 dòng (nếu cache đầy đủ).",
    "usage": "Dùng trước gom_du_doan(llm_hop_le), phan_tich_loi() và hau_kiem().",
    "potentialBugs": [
      "Các dòng bị loại khỏi llm_hop_le vẫn bị tính là thiếu (sai) ở bước chấm điểm vì gom_du_doan() so với tập 100 mẫu ground truth gốc!"
    ],
    "viva": [
      {
        "q": "Nếu LLM bỏ sót 10 dòng (NaN) và loc_hop_le() bỏ 10 dòng đó đi, điểm Accuracy có bị thổi phồng giả không?",
        "a": "KHÔNG! Vì cot_diem() lặp qua toàn bộ 100 mã trong nhan_tay và coi bất kỳ mã nào vắng trong du_doan là đoán sai (\"khong_co\" / set())."
      }
    ],
    "code": "def loc_hop_le(llm):\n    \"\"\"Chỉ giữ dòng có đủ overall_sentiment và language hợp lệ (bỏ dòng trống).\"\"\"\n    return llm[llm[\"overall_sentiment\"].isin(SENTIMENTS) & llm[\"language\"].notna()]"
  },
  {
    "id": "evaluate-gom-du-doan",
    "file": "src/evaluate.py",
    "name": "gom_du_doan",
    "kind": "function",
    "lineStart": 77,
    "lineEnd": 87,
    "signature": "def gom_du_doan(df, cot_cam_xuc=\"overall_sentiment\", aspects=ASPECTS):",
    "purpose": "Chuyển đổi bảng CSV dự đoán/nhãn tay thành dictionary thống nhất cho các hàm chấm điểm (sentiment dict, language dict, tập khía cạnh được nhắc/khen/chê).",
    "flow": [
      "Tạo dict sentiment = df[cot_cam_xuc].dropna().to_dict().",
      "Điền \"not_mentioned\" vào các ô aspect thiếu (kc = df[aspects].fillna(\"not_mentioned\")).",
      "Với từng review, trích 3 tập set(): aspects (khác not_mentioned), aspects_positive (== positive), aspects_negative (== negative), và aspect_labels."
    ],
    "input": "df (DataFrame), cot_cam_xuc (str), aspects",
    "output": "Dict[str, Dict] dùng trực tiếp cho ti_le_dung(), f1(), f1_cam_xuc(), ti_le_dung_nhan_khia_canh().",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: dropna, eq, fillna, iterrows, ne, set, to_dict, to_numpy"
    ],
    "example": "gold = gom_du_doan(gt)",
    "usage": "Chuẩn hóa cấu trúc cho cả Ground Truth, Baseline và LLM trước khi gọi cot_diem().",
    "potentialBugs": [
      "Gán `kc = df[aspects].fillna(\"not_mentioned\")` nên nếu nhãn tay có ô khuyết (rỗng), nó được quy về không nhắc tới."
    ],
    "viva": [
      {
        "q": "Tại sao gom_du_doan() phải nhận tham số cot_cam_xuc thay vì mặc định always \"overall_sentiment\"?",
        "a": "Vì bảng baseline có thể đặt tên cột là \"baseline_sentiment\" hoặc \"overall_sentiment\" (code thực tế tự chọn cột tồn tại)."
      }
    ],
    "code": "def gom_du_doan(df, cot_cam_xuc=\"overall_sentiment\", aspects=ASPECTS):\n    \"\"\"Đổi bảng nhãn về dạng: trường -> {mã review: giá trị} (giống Bài 11).\"\"\"\n    d = {\"sentiment\": df[cot_cam_xuc].dropna().to_dict()}\n    if set(aspects) <= set(df.columns):\n        kc = df[aspects].fillna(\"not_mentioned\")\n        d[\"language\"] = df[\"language\"].to_dict()\n        d[\"aspects\"] = {ma: set(kc.columns[r.ne(\"not_mentioned\").to_numpy()]) for ma, r in kc.iterrows()}\n        d[\"aspects_positive\"] = {ma: set(kc.columns[r.eq(\"positive\").to_numpy()]) for ma, r in kc.iterrows()}\n        d[\"aspects_negative\"] = {ma: set(kc.columns[r.eq(\"negative\").to_numpy()]) for ma, r in kc.iterrows()}\n        d[\"aspect_labels\"] = kc.to_dict(\"index\")\n    return d"
  },
  {
    "id": "evaluate-ti-le-dung",
    "file": "src/evaluate.py",
    "name": "ti_le_dung",
    "kind": "function",
    "lineStart": 94,
    "lineEnd": 98,
    "signature": "def ti_le_dung(du_doan, nhan_tay, truong):",
    "purpose": "Tính Accuracy (tỷ lệ khớp đúng chính xác) cho một trường đơn nhãn (sentiment hoặc language) trên toàn bộ tập nhãn tay.",
    "flow": [
      "Duyệt mọi cặp (ma, g) trong nhan_tay[truong], kiểm tra du_doan[truong].get(ma) == g, chia cho len(nhan_tay)."
    ],
    "input": "du_doan (dict), nhan_tay (dict), truong (str)",
    "output": "float ∈ [0, 1] (hoặc np.nan nếu thiếu trường).",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: get, items, len, sum"
    ],
    "example": "ti_le_dung(d_llm, gold, \"sentiment\") -> 0.99",
    "usage": "Tính cam_xuc_accuracy và ngon_ngu_accuracy trong cot_diem().",
    "potentialBugs": [
      "Nếu dữ liệu mất cân bằng nặng (73% positive), Accuracy cao vẫn có thể che lấp lỗi dự đoán kém ở lớp hiếm."
    ],
    "viva": [
      {
        "q": "Vì sao `du_doan[truong].get(ma) == g` phạt được lỗi thiếu dự đoán?",
        "a": "Vì .get(ma) trả về None khi ma không tồn tại, luôn khác giá trị nhãn thật `g`, khiến review bị thiếu vẫn nằm ở mẫu số len(dung)."
      }
    ],
    "code": "def ti_le_dung(du_doan, nhan_tay, truong):\n    if truong not in du_doan:\n        return np.nan\n    dung = [du_doan[truong].get(ma) == g for ma, g in nhan_tay[truong].items()]\n    return sum(dung) / len(dung)"
  },
  {
    "id": "evaluate-f1",
    "file": "src/evaluate.py",
    "name": "f1",
    "kind": "function",
    "lineStart": 101,
    "lineEnd": 111,
    "signature": "def f1(du_doan, nhan_tay, truong):",
    "purpose": "Tính Micro F1 cho bài toán đa nhãn (multi-label) bằng cách cộng dồn toàn bộ TP, FP, FN qua 100 review rồi áp công thức 2TP/(2TP+FP+FN).",
    "flow": [
      "Khởi tạo tp = fp = fn = 0.",
      "Với mỗi review trong nhan_tay: lấy tập thật t và tập đoán p = get(ma, set()).",
      "Cộng dồn giao p & t (TP), p - t (FP), t - p (FN). Trả về 2*tp / (2*tp + fp + fn)."
    ],
    "input": "du_doan (dict), nhan_tay (dict), truong (\"aspects\" | \"aspects_positive\" | \"aspects_negative\")",
    "output": "float ∈ [0, 1] (hoặc np.nan).",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: get, items, len, set"
    ],
    "example": "f1(d_llm, gold, \"aspects\") -> 0.9393 (Mention F1)",
    "usage": "Tính khia_canh_f1, duoc_khen_f1 và bi_che_f1 trong cot_diem().",
    "potentialBugs": [
      "Ở bi_che_f1, số khía cạnh thuần negative trong 100 mẫu GT rất ít (~vài trường hợp), nên chỉ 1–2 ca lệch nhãn với mixed cũng kéo F1 xuống ~0.636."
    ],
    "viva": [
      {
        "q": "Hàm `f1()` trong `src/evaluate.py` đang tính Micro F1 hay Macro F1?",
        "a": "Đang tính **Micro F1** vì cộng dồn TP, FP, FN qua tất cả 100 review rồi mới chia một lần."
      }
    ],
    "code": "def f1(du_doan, nhan_tay, truong):\n    \"\"\"F1 gộp (micro) cho trường nhiều nhãn: cộng TP/FP/FN của mọi review rồi mới tính.\"\"\"\n    if truong not in du_doan:\n        return np.nan\n    tp = fp = fn = 0\n    for ma, t in nhan_tay[truong].items():\n        p = du_doan[truong].get(ma, set())\n        tp += len(p & t)\n        fp += len(p - t)\n        fn += len(t - p)\n    return 2 * tp / (2 * tp + fp + fn) if (tp + fp + fn) else np.nan"
  },
  {
    "id": "evaluate-f1-cam-xuc",
    "file": "src/evaluate.py",
    "name": "f1_cam_xuc",
    "kind": "function",
    "lineStart": 114,
    "lineEnd": 117,
    "signature": "def f1_cam_xuc(du_doan, nhan_tay, average):",
    "purpose": "Tính điểm F1 cho cảm xúc tổng thể 3 lớp (positive, mixed, negative) dùng sklearn.metrics.f1_score với average=\"macro\" hoặc \"weighted\".",
    "flow": [
      "Trích y_true = list(nhan_tay[\"sentiment\"].values()).",
      "Trích y_pred, thay mẫu bị thiếu bằng \"khong_co\".",
      "Gọi f1_score(y_true, y_pred, labels=SENTIMENTS, average=average, zero_division=0)."
    ],
    "input": "du_doan (dict), nhan_tay (dict), average (\"macro\" | \"weighted\")",
    "output": "float ∈ [0, 1].",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: f1_score, get, list, values"
    ],
    "example": "f1_cam_xuc(d_base, gold, \"macro\") -> 0.5224 (vs LLM 0.9909)",
    "usage": "Tính cam_xuc_macro_f1 và cam_xuc_weighted_f1 trong cot_diem().",
    "potentialBugs": [
      "Truyền labels=SENTIMENTS đảm bảo lớp \"khong_co\" (nếu có) chỉ làm giảm Recall của nhãn thật chứ không được tính thêm như một lớp thứ 4 trong phép chia trung bình Macro."
    ],
    "viva": [
      {
        "q": "Tham số labels=SENTIMENTS và zero_division=0 trong f1_score() giải quyết bẫy gì?",
        "a": "labels=SENTIMENTS cố định đúng 3 lớp đánh giá không tính \"khong_co\" làm lớp thứ 4; zero_division=0 trả 0 thay vì ném lỗi/cảnh báo nếu mô hình không đoán trúng mẫu nào của lớp hiếm (negative)."
      }
    ],
    "code": "def f1_cam_xuc(du_doan, nhan_tay, average):\n    y_true = list(nhan_tay[\"sentiment\"].values())\n    y_pred = [du_doan[\"sentiment\"].get(ma, \"khong_co\") for ma in nhan_tay[\"sentiment\"]]\n    return f1_score(y_true, y_pred, labels=SENTIMENTS, average=average, zero_division=0)"
  },
  {
    "id": "evaluate-ti-le-dung-nhan-khia-canh",
    "file": "src/evaluate.py",
    "name": "ti_le_dung_nhan_khia_canh",
    "kind": "function",
    "lineStart": 120,
    "lineEnd": 126,
    "signature": "def ti_le_dung_nhan_khia_canh(du_doan, nhan_tay, aspects=ASPECTS):",
    "purpose": "Đo tỷ lệ chính xác tuyệt đối trên toàn bộ 700 cặp (100 review × 7 khía cạnh) khớp đúng 1 trong 4 nhãn (positive/mixed/negative/not_mentioned).",
    "flow": [
      "So sánh p[a] == g[a] qua từng review ma và từng khía cạnh a, lấy trung bình np.mean(dung)."
    ],
    "input": "du_doan (dict), nhan_tay (dict), aspects",
    "output": "float ∈ [0, 1].",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: float, get, items, mean"
    ],
    "example": "ti_le_dung_nhan_khia_canh(d_llm, gold) -> 0.9357 (655 / 700 ô đúng)",
    "usage": "Tính nhan_khia_canh_accuracy trong cot_diem().",
    "potentialBugs": [
      "Vì khoảng ~60% số ô (review, aspect) là not_mentioned, chỉ số này cao tự nhiên hơn so với Praise/Complaint F1; cần đọc cùng Mention F1 và Complaint F1."
    ],
    "viva": [
      {
        "q": "655/700 = 0.9357 -> 45 ô sai khía cạnh kết hợp với 1 ô sai sentiment tổng thể tương ứng với bao nhiêu lỗi trong llm_error_analysis.csv?",
        "a": "Đúng bằng 45 + 1 = 46 lỗi trường được phan_tich_loi() xuất ra!"
      }
    ],
    "code": "def ti_le_dung_nhan_khia_canh(du_doan, nhan_tay, aspects=ASPECTS):\n    \"\"\"Tỷ lệ cặp (review, khía cạnh) đoán đúng chính xác 1 trong 4 nhãn.\"\"\"\n    if \"aspect_labels\" not in du_doan:\n        return np.nan\n    dung = [du_doan[\"aspect_labels\"].get(ma, {}).get(a) == g[a]\n            for ma, g in nhan_tay[\"aspect_labels\"].items() for a in aspects]\n    return float(np.mean(dung))"
  },
  {
    "id": "evaluate-cot-diem",
    "file": "src/evaluate.py",
    "name": "cot_diem",
    "kind": "function",
    "lineStart": 133,
    "lineEnd": 143,
    "signature": "def cot_diem(d, gold, aspects=ASPECTS):",
    "purpose": "Gom đủ 9 chỉ số đánh giá chuẩn từ CHI_SO thành một danh sách điểm hoàn chỉnh cho một mô hình (Baseline hoặc LLM).",
    "flow": [
      "TínhCoverage (phu_song) rồi lần lượt gọi ti_le_dung, f1_cam_xuc, f1 và ti_le_dung_nhan_khia_canh cho 8 chỉ số còn lại."
    ],
    "input": "d (dict dự đoán), gold (dict nhãn tay), aspects",
    "output": "List[float] dài 9 phần tử tương ứng với CHI_SO.",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: f1, f1_cam_xuc, float, mean, ti_le_dung, ti_le_dung_nhan_khia_canh"
    ],
    "example": "cot_diem(d_llm, gold) -> [1.0, 0.99, 0.9909, 0.9899, 0.9393, 0.9279, 0.6364, 0.9357, 1.0]",
    "usage": "Được main() gọi cho cả Baseline và LLM để ghép thành evaluation_report.csv.",
    "potentialBugs": [
      "Nếu truyền sai thứ tự hoặc thiếu phần tử so với danh sách CHI_SO, bảng evaluation_report.csv sẽ lệch cột."
    ],
    "viva": [
      {
        "q": "Mối liên hệ giữa `evaluation_report.csv` và biểu đồ `llm_vs_baseline.png` là gì?",
        "a": "Hàm `plot_llm_vs_baseline()` trong `viz.py` đọc trực tiếp 9 hàng của `evaluation_report.csv` do `cot_diem()` sinh ra."
      }
    ],
    "code": "def cot_diem(d, gold, aspects=ASPECTS):\n    phu_song = float(np.mean([ma in d[\"sentiment\"] for ma in gold[\"sentiment\"]]))\n    return [phu_song,\n            ti_le_dung(d, gold, \"sentiment\"),\n            f1_cam_xuc(d, gold, \"macro\"),\n            f1_cam_xuc(d, gold, \"weighted\"),\n            f1(d, gold, \"aspects\"),\n            f1(d, gold, \"aspects_positive\"),\n            f1(d, gold, \"aspects_negative\"),\n            ti_le_dung_nhan_khia_canh(d, gold, aspects),\n            ti_le_dung(d, gold, \"language\")]"
  },
  {
    "id": "evaluate-phan-tich-loi",
    "file": "src/evaluate.py",
    "name": "phan_tich_loi",
    "kind": "function",
    "lineStart": 150,
    "lineEnd": 171,
    "signature": "def phan_tich_loi(llm, gt, aspects=ASPECTS):",
    "purpose": "Đối chiếu từng review trong 100 mẫu nhãn tay với LLM trên cả 9 trường, phân loại cụ thể mọi sai lệch thành \"thua\", \"thieu\", \"sai_nhan\" hoặc \"khong_co_ket_qua\".",
    "flow": [
      "Chuẩn hóa NaN ở 7 cột aspect thành \"not_mentioned\".",
      "Lặp 100 review của ground_truth: nếu thiếu ID ở LLM -> ghi \"khong_co_ket_qua\".",
      "So sánh 9 trường: nhan==\"not_mentioned\" -> \"thua\"; doan==\"not_mentioned\" -> \"thieu\"; khác cả hai -> \"sai_nhan\".",
      "Ghép thêm nội dung comments để đọc kiểm tra bằng mắt -> xuất bảng DataFrame."
    ],
    "input": "llm (DataFrame), gt (DataFrame), aspects",
    "output": "pd.DataFrame gồm các cột id, truong, nhan_tay, llm, loai_loi, comments (46 dòng thực tế).",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: DataFrame, append, copy, fillna, isna, iterrows, list, merge"
    ],
    "example": "phan_tich_loi(llm, gt) -> 46 lỗi trường trên 37/100 review.",
    "usage": "Sinh reports/llm_error_analysis.csv trong main().",
    "potentialBugs": [
      "Chỉ kiểm tra được trên 100 mẫu có nhãn tay (Ground Truth)."
    ],
    "viva": [
      {
        "q": "Trong 46 lỗi phân tích được ở BTL, khía cạnh nào chiếm nhiều lỗi nhất và loại lỗi nào phổ biến nhất?",
        "a": "Khía cạnh `amenities` chiếm 27/46 lỗi; loại lỗi nhiều nhất là `thieu` (21 lỗi, do LLM bỏ qua các tính từ gián tiếp như \"cozy\", \"comfy\")."
      }
    ],
    "code": "def phan_tich_loi(llm, gt, aspects=ASPECTS):\n    \"\"\"So từng review với nhãn tay; ghi rõ khía cạnh thừa / thiếu / sai nhãn.\"\"\"\n    aspect_cols = list(aspects)\n    gt_norm = gt.copy()\n    llm_norm = llm.copy()\n    gt_norm[aspect_cols] = gt_norm[aspect_cols].fillna(\"not_mentioned\")\n    llm_norm[aspect_cols] = llm_norm[aspect_cols].fillna(\"not_mentioned\")\n    rows = []\n    for ma, g in gt_norm.iterrows():\n        if ma not in llm_norm.index:\n            rows.append((ma, \"toan_bo\", None, None, \"khong_co_ket_qua\"))\n            continue\n        r = llm_norm.loc[ma]\n        for truong in [\"overall_sentiment\", \"language\", *aspect_cols]:\n            nhan, doan = g[truong], r[truong]\n            if pd.isna(nhan) and pd.isna(doan):\n                continue\n            if nhan != doan:\n                loai = \"thua\" if nhan == \"not_mentioned\" else \"thieu\" if doan == \"not_mentioned\" else \"sai_nhan\"\n                rows.append((ma, truong, nhan, doan, loai))\n    loi = pd.DataFrame(rows, columns=[\"id\", \"truong\", \"nhan_tay\", \"llm\", \"loai_loi\"])\n    return loi.merge(gt[[\"comments\"]], left_on=\"id\", right_index=True, how=\"left\")"
  },
  {
    "id": "evaluate-hau-kiem",
    "file": "src/evaluate.py",
    "name": "hau_kiem",
    "kind": "function",
    "lineStart": 174,
    "lineEnd": 195,
    "signature": "def hau_kiem(llm, aspects=ASPECTS):",
    "purpose": "Chạy 6 quy tắc kiểm tra tính nhất quán nội tại trên TOÀN BỘ 1.000 review LLM mà không cần nhãn tay (phát hiện ảo giác hoặc mẫu đáng ngờ).",
    "flow": [
      "Tính số từ (so_tu) và mặt nạ các khía cạnh được nhắc tới (nhac).",
      "Đánh giá 5 quy tắc vector hóa (rỗng có nhãn, ngắn 1–5 từ nhưng >=2 khía cạnh, mã ISO sai, positive nhưng chỉ chê, negative nhưng chỉ khen).",
      "Kiểm tra quy tắc 6 (khia_canh_khong_can_cu): LLM gán nhãn khía cạnh nhưng comments không khớp Regex TU_KHOA."
    ],
    "input": "llm (DataFrame 1.000 dòng), aspects",
    "output": "pd.DataFrame các cảnh báo (id, quy_tac, chi_tiet) -> 193 cảnh báo thực tế.",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: DataFrame, any, between, contains, eq, fillna, fullmatch, ge, get, gt, items, len"
    ],
    "example": "hau_kiem(llm) -> 1 cảnh báo tieu_cuc_nhung_chi_duoc_khen + 192 khia_canh_khong_can_cu.",
    "usage": "Sinh reports/llm_postcheck.csv trong main().",
    "potentialBugs": [
      "Nhắc lại: TU_KHOA chỉ dùng làm từ khóa căn cứ cảnh báo để con người đọc lại, tuyệt đối không dùng để tự động xóa kết quả LLM."
    ],
    "viva": [
      {
        "q": "Vì sao `khia_canh_khong_can_cu` xuất hiện tới 192 lần mà kết quả LLM vẫn đúng?",
        "a": "Vì LLM hiểu ngữ nghĩa đồng nghĩa/ẩn dụ (\"great sleep\" -> noise/amenities, \"felt at home\" -> host) không có trong danh sách Regex cứng TU_KHOA."
      }
    ],
    "code": "def hau_kiem(llm, aspects=ASPECTS):\n    \"\"\"Quy tắc chạy trên mọi kết quả LLM, không cần nhãn tay (đúng schema chưa chắc đúng nội dung).\"\"\"\n    van_ban = llm[\"comments\"].fillna(\"\")\n    so_tu = van_ban.str.split().str.len()\n    nhac = llm[aspects].ne(\"not_mentioned\") & llm[aspects].notna()\n    so_kc = nhac.sum(axis=1)\n    quy_tac = {\n        \"rong_nhung_co_nhan\": so_tu.eq(0) & (so_kc.gt(0) | llm[\"overall_sentiment\"].ne(\"mixed\")),\n        \"ngan_nhung_nhieu_khia_canh\": so_tu.between(1, 5) & so_kc.ge(2),\n        \"ngon_ngu_sai_ma_iso\": ~llm[\"language\"].str.fullmatch(r\"[a-z]{2}|und\", na=False),\n        \"tich_cuc_nhung_chi_bi_che\": llm[\"overall_sentiment\"].eq(\"positive\")\n        & llm[aspects].eq(\"negative\").any(axis=1) & ~llm[aspects].eq(\"positive\").any(axis=1),\n        \"tieu_cuc_nhung_chi_duoc_khen\": llm[\"overall_sentiment\"].eq(\"negative\")\n        & llm[aspects].eq(\"positive\").any(axis=1) & ~llm[aspects].eq(\"negative\").any(axis=1),\n    }\n    rows = [(ma, ten, \"\") for ten, mask in quy_tac.items() for ma in llm.index[mask]]\n    for a in aspects:  # khía cạnh LLM gán phải có ít nhất 1 từ khoá làm căn cứ\n        mau = TU_KHOA.get(a)\n        if mau:\n            khong_can_cu = nhac[a] & ~van_ban.str.contains(mau, case=False, regex=True)\n            rows += [(ma, \"khia_canh_khong_can_cu\", a) for ma in llm.index[khong_can_cu]]\n    return pd.DataFrame(rows, columns=[\"id\", \"quy_tac\", \"chi_tiet\"])"
  },
  {
    "id": "evaluate-uoc-tinh-chi-phi",
    "file": "src/evaluate.py",
    "name": "uoc_tinh_chi_phi",
    "kind": "function",
    "lineStart": 207,
    "lineEnd": 239,
    "signature": "def uoc_tinh_chi_phi(cfg, total_llm, city_reviews=None, in_tok=110, out_tok=68):",
    "purpose": "Tính tổng số input/output token và chi phí USD dự kiến theo bảng giá ai.google.dev cho cả 1.000 mẫu LLM lẫn toàn thành phố ở mốc t4.",
    "flow": [
      "Tra bảng MODEL_PRICING_PER_1M theo tên model trong YAML (gemini-3.5-flash-lite: $0.30/1M in, $2.50/1M out).",
      "Xác định tổng review toàn thành phố t4: ưu tiên --city-reviews, hoặc tự đếm id duy nhất trong data/raw/{last_snap}/reviews.csv.gz.",
      "Nhân hệ số thực đo ~110 input token + ~68 output token / review -> tính tổng token & USD làm tròn 4 chữ số."
    ],
    "input": "cfg, total_llm, city_reviews=None, in_tok=110, out_tok=68",
    "output": "pd.DataFrame 2 dòng -> reports/llm_cost_estimate.csv.",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: DataFrame, append, dropna, get, int, is_file, lower, nunique, print, read_csv, removeprefix, round"
    ],
    "example": "uoc_tinh_chi_phi(cfg, 1000, 1719730) -> $0.2030 và $349.1052.",
    "usage": "Sinh reports/llm_cost_estimate.csv ở cuối main().",
    "potentialBugs": [
      "Nếu không còn file data/raw/*/reviews.csv.gz và không truyền --city-reviews, dòng toàn thành phố sẽ bị bỏ qua kèm [EVAL WARN]."
    ],
    "viva": [
      {
        "q": "Vì sao giá 1M output token ($2.50) lại ảnh hưởng chi phí mạnh hơn nhiều so với 1M input token ($0.30)?",
        "a": "Giá output đắt gấp 8.33 lần input; đó là lý do `src/llm.py` thiết kế Pydantic schema cực gọn, không bắt model sinh trường giải thích summary dài dòng."
      }
    ],
    "code": "def uoc_tinh_chi_phi(cfg, total_llm, city_reviews=None, in_tok=110, out_tok=68):\n    \"\"\"Ước tính token và chi phí API (USD) cho 1.000 mẫu LLM và toàn thành phố ở mốc cuối.\"\"\"\n    # shortcut: dùng hệ số trung bình ~110 token vào + ~68 token ra/review đo từ 1.000 mẫu\n    llm_cfg = cfg.get(\"llm\") or {}\n    model_name = str(llm_cfg.get(\"model\", \"gemini-3.5-flash-lite\"))\n    rates = MODEL_PRICING_PER_1M.get(model_name.removeprefix(\"models/\").strip().lower())\n    mucs = [(\"mau_llm\", int(llm_cfg.get(\"sample_size\", total_llm)))]\n\n    n_city = city_reviews if city_reviews is not None else llm_cfg.get(\"city_reviews\")\n    if n_city is not None:\n        mucs.append((\"toan_thanh_pho_moc_cuoi\", int(n_city)))\n    else:\n        snaps = sorted((str(s).strip() for s in cfg.get(\"snapshots\", [])), key=pd.to_datetime)\n        raw_files = [(s, p) for s in snaps if (p := ROOT / \"data\" / \"raw\" / s / \"reviews.csv.gz\").is_file()]\n        if raw_files:\n            last_snap, raw_path = raw_files[-1]\n            n_city = int(pd.read_csv(raw_path, usecols=[\"id\"], dtype={\"id\": \"string\"})[\"id\"].dropna().nunique())\n            mucs.append((f\"snapshot_moi_nhat_{last_snap}\", n_city))\n        else:\n            print(\"[EVAL WARN] Chưa có data/raw/*/reviews.csv.gz -> truyền --city-reviews để ước tính mốc cuối.\")\n\n    rows = []\n    print(f\"\\n[EVAL] Ước tính chi phí API ({model_name}, ~{in_tok} vào + ~{out_tok} ra token/review):\")\n    for ten, n in mucs:\n        tok_in, tok_out = n * in_tok, n * out_tok\n        cost_usd = round((tok_in * rates[0] + tok_out * rates[1]) / 1_000_000, 4) if rates else None\n        rows.append({\n            \"quy_mo\": ten, \"so_review\": n, \"model\": model_name,\n            \"token_vao\": tok_in, \"token_ra\": tok_out, \"tong_token\": tok_in + tok_out, \"chi_phi_usd\": cost_usd,\n        })\n        cost_txt = f\" | ~${cost_usd:,.4f}\" if cost_usd is not None else \"\"\n        print(f\"  - {ten} ({n:,} review): ~{tok_in:,} vào + ~{tok_out:,} ra = ~{tok_in + tok_out:,} token{cost_txt}\")\n    return pd.DataFrame(rows)"
  },
  {
    "id": "evaluate-main",
    "file": "src/evaluate.py",
    "name": "main",
    "kind": "function",
    "lineStart": 246,
    "lineEnd": 302,
    "signature": "def main():",
    "purpose": "Điều phối toàn bộ quy trình Evaluate: đọc GT/LLM/Baseline, chấm 9 chỉ số, phân tích 46 lỗi, chạy hậu kiểm 6 quy tắc và ước tính chi phí.",
    "flow": [
      "Parse --config, --out-dir, --city-reviews; đọc 3 bảng qua doc_bang().",
      "Lọc hợp lệ, chạy cot_diem() cho Baseline và LLM -> xuất evaluation_report.csv.",
      "Chạy phan_tich_loi() -> llm_error_analysis.csv; hau_kiem() -> llm_postcheck.csv; uoc_tinh_chi_phi() -> llm_cost_estimate.csv."
    ],
    "input": "CLI args (--config, --out-dir, --city-reviews)",
    "output": "4 tệp CSV phân tích chất lượng trong reports/.",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "numpy",
      "pandas",
      "yaml",
      "sklearn.metrics (f1_score)",
      "llm (DEFAULT_ASPECTS)",
      "Gọi hàm: ArgumentParser, DataFrame, Path, add_argument, cot_diem, crosstab, doc_bang, get, gom_du_doan, groupby, hau_kiem, int"
    ],
    "example": "python src/evaluate.py --config configs/mexico-city.yaml",
    "usage": "Chặng 6 của STEPS trong run_pipeline.py.",
    "potentialBugs": [
      "Nếu thiếu file ground_truth.csv, script dừng với FileNotFoundError."
    ],
    "viva": [
      {
        "q": "4 tệp đầu ra của evaluate.py trong thư mục reports/ là gì?",
        "a": "evaluation_report.csv, llm_error_analysis.csv, llm_postcheck.csv và llm_cost_estimate.csv."
      }
    ],
    "code": "def main():\n    ap = argparse.ArgumentParser(description=\"Đánh giá LLM vs Baseline trên bộ nhãn tay\")\n    ap.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    ap.add_argument(\"--out-dir\", default=\"reports\", help=\"Thư mục ghi báo cáo\")\n    ap.add_argument(\"--city-reviews\", type=int, default=None, help=\"Số review mốc cuối toàn thành phố (nếu bỏ qua đọc raw)\")\n    args = ap.parse_args()\n\n    cfg = load_config(args.config)\n    llm_cfg = cfg.get(\"llm\") or {}\n    aspects = [str(a).strip() for a in (llm_cfg.get(\"aspects\") or ASPECTS) if str(a).strip()] or ASPECTS\n    out_dir = Path(args.out_dir) if Path(args.out_dir).is_absolute() else ROOT / args.out_dir\n    out_dir.mkdir(parents=True, exist_ok=True)\n\n    gt_path = (cfg.get(\"evaluate\") or {}).get(\"ground_truth\", \"data/samples/ground_truth.csv\")\n    gt = doc_bang(gt_path, aspects=aspects)\n    llm_all = doc_bang(llm_cfg.get(\"output_csv\", \"data/processed/reviews_sentiment.csv\"), aspects=aspects)\n    base = doc_bang((cfg.get(\"baseline\") or {}).get(\"output_csv\", \"data/processed/reviews_baseline.csv\"), bat_buoc=False, aspects=aspects)\n    llm = loc_hop_le(llm_all)\n    gold = gom_du_doan(gt, aspects=aspects)\n\n    co_nhan = int(gt.index.isin(llm.index).sum())\n    print(\"=\" * 65)\n    print(f\"[EVAL] Nhãn tay: {len(gt)} | LLM hợp lệ: {len(llm)}/{len(llm_all)} | Nhãn tay có kết quả LLM: {co_nhan}/{len(gt)}\")\n    if co_nhan < len(gt):\n        print(f\"[EVAL WARN] {len(gt) - co_nhan} nhãn tay chưa có kết quả LLM -> bị tính là sai. Hãy chạy src/llm.py cho đủ cache.\")\n\n    # 1. Bảng điểm\n    bang = {\"llm\": cot_diem(gom_du_doan(llm, aspects=aspects), gold, aspects=aspects)}\n    if base is not None:\n        base_col = \"overall_sentiment\" if \"overall_sentiment\" in base.columns else \"baseline_sentiment\"\n        bang = {\"baseline\": cot_diem(gom_du_doan(base, base_col, aspects=aspects), gold, aspects=aspects), **bang}\n    bang_diem = pd.DataFrame(bang, index=CHI_SO).round(4)\n    bang_diem.to_csv(out_dir / \"evaluation_report.csv\", index_label=\"chi_so\", encoding=\"utf-8\")\n    print(f\"\\n[EVAL] Bảng điểm (n = {len(gt)} nhãn tay; mẫu nhỏ, chênh vài điểm % chưa đủ để kết luận):\")\n    print(bang_diem.to_string())\n\n    # 2. LLM sai ở đâu?\n    loi = phan_tich_loi(llm, gt, aspects=aspects)\n    loi.to_csv(out_dir / \"llm_error_analysis.csv\", index=False, encoding=\"utf-8\")\n    print(f\"\\n[EVAL] {len(loi)} chỗ LLM lệch nhãn tay:\")\n    if not loi.empty:\n        print(pd.crosstab(loi[\"truong\"], loi[\"loai_loi\"]).to_string())\n\n    # 3. Hậu kiểm trên toàn bộ kết quả LLM\n    hk = hau_kiem(llm, aspects=aspects)\n    hk.to_csv(out_dir / \"llm_postcheck.csv\", index=False, encoding=\"utf-8\")\n    print(f\"\\n[EVAL] Hậu kiểm: {hk['id'].nunique()}/{len(llm)} review bị cảnh báo\")\n    if not hk.empty:\n        print(hk.groupby([\"quy_tac\", \"chi_tiet\"]).size().to_string())\n\n    # 4. Chi phí API (1.000 mẫu LLM và mốc cuối toàn thành phố)\n    if len(llm):\n        chi_phi = uoc_tinh_chi_phi(cfg, len(llm_all), city_reviews=args.city_reviews)\n        chi_phi.to_csv(out_dir / \"llm_cost_estimate.csv\", index=False, encoding=\"utf-8\")\n\n    print(f\"\\n[EVAL] Đã ghi báo cáo vào: {out_dir}\")\n    print(\"=\" * 65)"
  },
  {
    "id": "kpi-load-config",
    "file": "src/kpi.py",
    "name": "load_config",
    "kind": "function",
    "lineStart": 48,
    "lineEnd": 57,
    "signature": "def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:",
    "purpose": "Đọc file YAML lấy area_col, stale_review_days (90), exclude_ghost (True), snapshots và currency.",
    "flow": [
      "Kiểm đường dẫn tuyệt đối/tương đối, đọc UTF-8, trả yaml.safe_load()."
    ],
    "input": "config_path_str",
    "output": "Dict[str, Any]",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: FileNotFoundError, Path, get, is_absolute, is_file, open, safe_load"
    ],
    "example": "cfg = load_config(\"configs/mexico-city.yaml\")",
    "usage": "Gọi đầu tiên trong main() của src/kpi.py.",
    "potentialBugs": [
      "Cần đảm bảo tên khóa currency khớp với cột price_<cur> đã tạo ở src/qa.py."
    ],
    "viva": [
      {
        "q": "Tham số `exclude_ghost: true` và `stale_review_days: 90` nằm ở đâu?",
        "a": "Nằm trong khối `kpi:` của configs/mexico-city.yaml và được đọc bởi main() trong src/kpi.py."
      }
    ],
    "code": "def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:\n    \"\"\"Đọc file cấu hình YAML từ CLI, PIPELINE_CONFIG hoặc đường dẫn mặc định.\"\"\"\n    target = config_path_str or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\")\n    cfg_file = Path(target)\n    if not cfg_file.is_absolute():\n        cfg_file = PROJECT_ROOT / cfg_file\n    if not cfg_file.is_file():\n        raise FileNotFoundError(f\"[KPI] Không tìm thấy file cấu hình: {cfg_file}\")\n    with cfg_file.open(\"r\", encoding=\"utf-8\") as f:\n        return yaml.safe_load(f)"
  },
  {
    "id": "kpi--qa-flag",
    "file": "src/kpi.py",
    "name": "_qa_flag",
    "kind": "function",
    "lineStart": 60,
    "lineEnd": 62,
    "signature": "def _qa_flag(df: pd.DataFrame, col: str) -> pd.Series:",
    "purpose": "Đọc cột cờ QA boolean an toàn: nếu giá trị cờ bị thiếu (NaN) thì mặc định coi là True (vi phạm) theo nguyên tắc bảo thủ.",
    "flow": [
      "Gọi `df[col].fillna(True).astype(bool)`."
    ],
    "input": "df (DataFrame), col (str tên cột qa_*)",
    "output": "pd.Series kiểu bool.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: astype, fillna"
    ],
    "example": "valid_price = (~_qa_flag(df, \"qa_missing_price\"))",
    "usage": "Gọi liên tục trong compute_review_velocities, compute_ghost_listings, compute_occupancy_kpis và compute_price_and_ppg_kpis.",
    "potentialBugs": [
      "Nếu cờ bị missing mà fillna(False), dữ liệu chưa được QA sẽ lọt qua như dữ liệu sạch — dùng fillna(True) giúp fail-safe."
    ],
    "viva": [
      {
        "q": "Tại sao `_qa_flag()` gọi `.fillna(True)` thay vì `.fillna(False)`?",
        "a": "Theo nguyên tắc bảo thủ (fail-safe): nếu trạng thái kiểm định bị thiếu thì coi là chưa an toàn (vi phạm=True) để không đưa vào tính KPI."
      }
    ],
    "code": "def _qa_flag(df: pd.DataFrame, col: str) -> pd.Series:\n    \"\"\"Đọc cờ QA dạng bool; nếu giá trị cờ bị thiếu (NaN) thì coi là vi phạm (True).\"\"\"\n    return df[col].fillna(True).astype(bool)"
  },
  {
    "id": "kpi--round-or-nan",
    "file": "src/kpi.py",
    "name": "_round_or_nan",
    "kind": "function",
    "lineStart": 65,
    "lineEnd": 66,
    "signature": "def _round_or_nan(val: Any, digits: int = 4) -> float:",
    "purpose": "Làm tròn giá trị số thực tới digits chữ số sau dấu phẩy nhưng giữ nguyên np.nan nếu đầu vào bị thiếu.",
    "flow": [
      "Kiểm tra pd.isna(val) -> np.nan; ngược lại round(float(val), digits)."
    ],
    "input": "val (Any), digits (int=4)",
    "output": "float (hoặc np.nan).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: float, isna, round"
    ],
    "example": "_round_or_nan(np.nan, 4) -> nan; _round_or_nan(0.16678, 4) -> 0.1668",
    "usage": "Dùng trong _iqr_stats(), compute_kpi_by_area(), compute_kpi_by_snapshot(), compute_kpi_by_neighbourhood().",
    "potentialBugs": [
      "Python round() dùng round-half-to-even (làm tròn ngân hàng), khác với làm tròn số học truyền thống ở đuôi .5 đúng."
    ],
    "viva": [
      {
        "q": "Vì sao `0.4849 - 0.3182 = 0.1667` nhưng kpi_by_snapshot.csv ghi `urgency_gap_mean = 0.1668` tại t1?",
        "a": "Do `occ_1-30_mean`, `occ_31-90_mean` và `urgency_gap_mean` đều được làm tròn độc lập qua `_round_or_nan()` từ các giá trị float đầy đủ ở bước listing."
      }
    ],
    "code": "def _round_or_nan(val: Any, digits: int = 4) -> float:\n    return np.nan if pd.isna(val) else round(float(val), digits)"
  },
  {
    "id": "kpi--iqr-stats",
    "file": "src/kpi.py",
    "name": "_iqr_stats",
    "kind": "function",
    "lineStart": 69,
    "lineEnd": 84,
    "signature": "def _iqr_stats(series: pd.Series, digits: int = 2) -> Tuple[int, float, float, float]:",
    "purpose": "Tính bộ 4 thống kê bền vững (count, median, IQR, rIQR) trên chuỗi sạch, có guard chống rỗng và Median <= 0.",
    "flow": [
      "Lọc bỏ NaN: valid = series.dropna(). Nếu rỗng trả về (0, nan, nan, nan).",
      "Tính Q1 = quantile(0.25), med = median(), Q3 = quantile(0.75), iqr = Q3 - Q1.",
      "Guard: riqr = (iqr / med) if med > 0 else np.nan; làm tròn và trả tuple 4 phần tử."
    ],
    "input": "series (pd.Series), digits (int=2)",
    "output": "Tuple (count: int, median: float, iqr: float, riqr: float).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: _round_or_nan, dropna, float, len, median, quantile, round"
    ],
    "example": "_iqr_stats(valid_ppg_t4) -> (980, 626.79, 495.75, 0.7909)",
    "usage": "Dùng cho Price & PPG ở cả 3 cấp độ: Snapshot, Area và Neighbourhood.",
    "potentialBugs": [
      "Khi cỡ mẫu quận bằng 1 (Milpa Alta n=1), Q1 == Q3 == Median -> IQR=0 và rIQR=0.0 (không lỗi chia 0, nhưng không mang ý nghĩa phân tán thực sự)."
    ],
    "viva": [
      {
        "q": "Nếu một quận toàn bộ có giá = 0 (hoặc median <= 0), `_iqr_stats()` xử lý sao?",
        "a": "Nhánh `if med > 0 else np.nan` ngăn ZeroDivisionError và trả rIQR là NaN."
      }
    ],
    "code": "def _iqr_stats(series: pd.Series, digits: int = 2) -> Tuple[int, float, float, float]:\n    \"\"\"Tính (count, median, IQR, rIQR) trên chuỗi sạch; trả về NaN nếu rỗng.\"\"\"\n    valid = series.dropna()\n    if valid.empty:\n        return 0, np.nan, np.nan, np.nan\n    q1 = float(valid.quantile(0.25))\n    med = float(valid.median())\n    q3 = float(valid.quantile(0.75))\n    iqr = q3 - q1\n    riqr = (iqr / med) if med > 0 else np.nan\n    return (\n        len(valid),\n        round(med, digits),\n        round(iqr, digits),\n        _round_or_nan(riqr, 4),\n    )"
  },
  {
    "id": "kpi--price-col",
    "file": "src/kpi.py",
    "name": "_price_col",
    "kind": "function",
    "lineStart": 87,
    "lineEnd": 88,
    "signature": "def _price_col(config: Dict[str, Any]) -> str:",
    "purpose": "Sinh tên cột giá chuẩn hóa theo mã tiền tệ trong YAML (ví dụ \"MXN\" -> \"price_mxn\").",
    "flow": [
      "Trả về f\"price_{str(config.get(\"currency\", \"MXN\")).strip().lower()}\"."
    ],
    "input": "config (Dict)",
    "output": "str (tên cột giá, ở CDMX là \"price_mxn\").",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: get, lower, str, strip"
    ],
    "example": "_price_col({\"currency\": \"MXN\"}) -> \"price_mxn\"",
    "usage": "Dùng trong _load_snapshots(), compute_price_and_ppg_kpis(), compute_kpi_by_snapshot(), compute_kpi_by_neighbourhood().",
    "potentialBugs": [
      "Đòi hỏi config.currency phải đồng bộ hoàn toàn giữa qa.py và kpi.py."
    ],
    "viva": [
      {
        "q": "Lợi ích của hàm `_price_col()` so với viết cứng \"price_mxn\" là gì?",
        "a": "Giúp cùng một mã nguồn chạy lại được cho bất kỳ thành phố nào khác (ví dụ CLP, EUR, GBP) chỉ bằng cách sửa YAML."
      }
    ],
    "code": "def _price_col(config: Dict[str, Any]) -> str:\n    return f\"price_{str(config.get('currency', 'MXN')).strip().lower()}\""
  },
  {
    "id": "kpi--load-snapshots",
    "file": "src/kpi.py",
    "name": "_load_snapshots",
    "kind": "function",
    "lineStart": 91,
    "lineEnd": 111,
    "signature": "def _load_snapshots(config: Dict[str, Any]) -> List[Tuple[str, str, pd.DataFrame]]:",
    "purpose": "Nạp tuần tự 4 bảng listings.csv đã qua QA, xác thực hợp đồng dữ liệu 13 cột bắt buộc (REQUIRED_QA_COLS + price_col) và gắn index=\"id\".",
    "flow": [
      "Sắp xếp snapshots tăng dần theo pd.to_datetime; ghép tập required_cols = REQUIRED_QA_COLS | {_price_col(config)}.",
      "Đọc từng CSV với dtype={\"id\": \"string\"}; kiểm tra `missing_cols = required_cols - set(df.columns)` -> ném ValueError nếu thiếu.",
      "Strip chuỗi id, gắn df.set_index(\"id\") và gán nhãn t1..t4."
    ],
    "input": "config (Dict)",
    "output": "List[(snap_date, t_label, df_indexed)] với t1..t4.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: FileNotFoundError, ValueError, _price_col, append, astype, enumerate, get, is_file, read_csv, set, set_index, sorted"
    ],
    "example": "_load_snapshots(cfg) -> 4 tuple cho 2025-09-27 (t1) .. 2026-06-15 (t4).",
    "usage": "Bước nạp dữ liệu nền tảng trong main() của src/kpi.py.",
    "potentialBugs": [
      "Nếu bảng nào có trùng lặp id do bỏ qua bước qa.py, set_index(\"id\") sẽ tạo duplicate index gây nhân dòng ở phép toán sau."
    ],
    "viva": [
      {
        "q": "Hợp đồng dữ liệu REQUIRED_QA_COLS trong _load_snapshots() bảo vệ pipeline khỏi lỗi gì?",
        "a": "Ngăn trường hợp chạy kpi.py trước qa.py (hoặc dùng bản listings chưa QA) làm các phép tính sau đọc nhầm cột thô hoặc thiếu cờ QA."
      }
    ],
    "code": "def _load_snapshots(config: Dict[str, Any]) -> List[Tuple[str, str, pd.DataFrame]]:\n    \"\"\"Nạp dữ liệu đã qua QA theo thứ tự thời gian tăng dần: [(snap, t_label, df_indexed)].\"\"\"\n    snaps = sorted([str(s).strip() for s in config.get(\"snapshots\", [])], key=pd.to_datetime)\n    if not snaps:\n        raise ValueError(\"[KPI] Config không có danh sách snapshots.\")\n\n    required_cols = REQUIRED_QA_COLS | {_price_col(config)}\n    loaded: List[Tuple[str, str, pd.DataFrame]] = []\n    for idx, snap in enumerate(snaps):\n        path = PROJECT_ROOT / \"data\" / \"processed\" / snap / \"listings.csv\"\n        if not path.is_file():\n            raise FileNotFoundError(f\"[KPI] Không tìm thấy: {path}\")\n        df = pd.read_csv(path, low_memory=False, dtype={\"id\": \"string\"})\n        missing_cols = sorted(required_cols - set(df.columns))\n        if missing_cols:\n            raise ValueError(\n                f\"[KPI] {snap} thiếu cột QA bắt buộc {missing_cols}\"\n            )\n        df[\"id\"] = df[\"id\"].astype(\"string\").str.strip()\n        loaded.append((snap, f\"t{idx + 1}\", df.set_index(\"id\")))\n    return loaded"
  },
  {
    "id": "kpi-compute-review-velocities",
    "file": "src/kpi.py",
    "name": "compute_review_velocities",
    "kind": "function",
    "lineStart": 114,
    "lineEnd": 137,
    "signature": "def compute_review_velocities(",
    "purpose": "Tính Review Velocity (số review mới trung bình mỗi 30 ngày) giữa 3 cặp snapshot liên tiếp (Q1: t1->t2, Q2: t2->t3, Q3: t3->t4).",
    "flow": [
      "Duyệt 3 cặp (snapshots[i], snapshots[i+1]).",
      "Kiểm cờ ~qa_missing_reviews ở cả hai đầu mốc.",
      "Tính diff = nr_curr - nr_prev (tự khớp đúng ID nhờ index=\"id\"); đặt valid_pair &= (diff >= 0).",
      "Quy đổi delta_months = max(days, 1) / 30.0; giữ np.nan nếu không hợp lệ."
    ],
    "input": "snapshots (List[(snap, t_lbl, df)])",
    "output": "Dict {\"review_velocity_q1\": Series, \"q2\": Series, \"q3\": Series}.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: _qa_flag, len, max, notna, range, rename, round, to_datetime, to_numeric, where"
    ],
    "example": "L2 tăng 5 review trong 77 ngày (t3->t4) -> 5 / (77/30) = 1.9481 rv/30d.",
    "usage": "Cấp đầu vào trực tiếp cho compute_ghost_listings() và build_kpi_by_listing().",
    "potentialBugs": [
      "Nếu một listing bị Airbnb xóa spam làm tổng review giảm (diff < 0), code gán NaN thay vì giá trị âm vô nghĩa (1 ca xảy ra ở Q3 -> rvN=999)."
    ],
    "viva": [
      {
        "q": "Vì sao Q1 dài 93 ngày, Q3 dài 77 ngày nhưng Review Velocity vẫn so sánh trực tiếp được?",
        "a": "Vì phép chia cho delta_months = days / 30.0 chuẩn hóa mọi quý về cùng đơn vị review / 30 ngày."
      }
    ],
    "code": "def compute_review_velocities(\n    snapshots: List[Tuple[str, str, pd.DataFrame]]\n) -> Dict[str, pd.Series]:\n    \"\"\"\n    Tính Review Velocity (review mới/tháng) giữa các mốc liên tiếp.\n    Nếu một trong hai mốc bị qa_missing_reviews hoặc số review giảm (diff < 0) -> NaN.\n    \"\"\"\n    velocities: Dict[str, pd.Series] = {}\n    for i in range(len(snapshots) - 1):\n        snap_prev, _, df_prev = snapshots[i]\n        snap_curr, _, df_curr = snapshots[i + 1]\n\n        nr_prev = pd.to_numeric(df_prev[\"number_of_reviews_clean\"], errors=\"coerce\")\n        nr_curr = pd.to_numeric(df_curr[\"number_of_reviews_clean\"], errors=\"coerce\")\n        valid_prev = (~_qa_flag(df_prev, \"qa_missing_reviews\")) & nr_prev.notna()\n        valid_curr = (~_qa_flag(df_curr, \"qa_missing_reviews\")) & nr_curr.notna()\n\n        diff = nr_curr - nr_prev\n        valid_pair = valid_prev & valid_curr & (diff >= 0)\n        delta_months = max((pd.to_datetime(snap_curr) - pd.to_datetime(snap_prev)).days, 1) / 30.0\n\n        col = f\"review_velocity_q{i + 1}\"\n        velocities[col] = (diff / delta_months).where(valid_pair, np.nan).round(4).rename(col)\n    return velocities"
  },
  {
    "id": "kpi-compute-ghost-listings",
    "file": "src/kpi.py",
    "name": "compute_ghost_listings",
    "kind": "function",
    "lineStart": 140,
    "lineEnd": 174,
    "signature": "def compute_ghost_listings(",
    "purpose": "Phân loại từng căn hộ thành 3 trạng thái: 1 (Ghost), 0 (Hoạt động) hoặc <NA> (thiếu căn cứ QA/RV) theo logic riêng cho t1 và t2..t4.",
    "flow": [
      "Kiểm tra điều kiện nền: ~qa_invalid_availability & ~qa_missing_reviews & a365.notna() & nr.notna().",
      "Nếu i == 0 (mốc t1): chưa có RV -> ghost = (a365 == 0) & ((nr == 0) | ((t1 - last_review).dt.days > stale_days)).",
      "Nếu i > 0 (t2..t4): dùng RV tương ứng đã tính -> ghost = (a365 == 0) & (rv == 0).",
      "Khởi tạo Series toàn pd.NA (dtype=\"Int64\"), dùng .mask() điền 1 và 0 cho các dòng hợp lệ."
    ],
    "input": "snapshots, velocities (Dict), stale_days (int=90)",
    "output": "Dict {\"ghost_t1\": Series, ..., \"ghost_t4\": Series} kiểu Int64.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: Series, _qa_flag, enumerate, mask, notna, reindex, to_datetime, to_numeric"
    ],
    "example": "Tại t4 có 4 căn ghost=1, 995 căn ghost=0, 1 căn ghost=<NA> (do rv_q3=NaN).",
    "usage": "Dùng làm bộ lọc exclude_ghost cho compute_occupancy_kpis() và thống kê Ghost Rate.",
    "potentialBugs": [
      "Không thể áp dụng cùng một công thức cho t1 và t2..t4 vì t1 không có snapshot t0 đứng trước."
    ],
    "viva": [
      {
        "q": "Ở t1, một căn có a365=0, number_of_reviews=12 và last_review cách t1 đúng 15 ngày thì có bị xem là Ghost không?",
        "a": "Không! Vì delta = 15 <= 90 ngày -> is_stale = False -> ghost_t1 = 0 (có thể căn hộ vừa mới kín khách)."
      }
    ],
    "code": "def compute_ghost_listings(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    velocities: Dict[str, pd.Series],\n    stale_days: int = 90,\n) -> Dict[str, pd.Series]:\n    \"\"\"\n    Phân loại căn hộ ma (1 = ma, 0 = không ma, <NA> = thiếu dữ liệu QA/thành phần):\n      - Mốc t1: ~qa_invalid_availability & ~qa_missing_reviews & ((nr == 0) | last_review hợp lệ),\n        ghost = (a365 == 0) & ((nr == 0) | (t1 - last_review > stale_days ngày)).\n      - Mốc t2..t4: ~qa_invalid_availability & ~qa_missing_reviews & review_velocity hợp lệ,\n        ghost = (a365 == 0) & (review_velocity == 0).\n    \"\"\"\n    ghost_dict: Dict[str, pd.Series] = {}\n    for i, (snap, t_lbl, df) in enumerate(snapshots):\n        a365 = pd.to_numeric(df[\"availability_365_clean\"], errors=\"coerce\")\n        nr = pd.to_numeric(df[\"number_of_reviews_clean\"], errors=\"coerce\")\n        valid_base = (~_qa_flag(df, \"qa_invalid_availability\")) & (~_qa_flag(df, \"qa_missing_reviews\")) & a365.notna() & nr.notna()\n\n        if i == 0:\n            last_rev = pd.to_datetime(df[\"last_review_clean\"], errors=\"coerce\")\n            valid_lr = ~_qa_flag(df, \"qa_invalid_last_review\")\n            has_rev_date = (nr == 0) | last_rev.notna()\n            valid_eval = valid_base & valid_lr & has_rev_date\n            is_stale = (nr == 0) | ((pd.to_datetime(snap) - last_rev).dt.days > stale_days)\n            is_ghost = (a365 == 0) & is_stale\n        else:\n            rv = velocities[f\"review_velocity_q{i}\"].reindex(df.index)\n            valid_eval = valid_base & rv.notna()\n            is_ghost = (a365 == 0) & (rv == 0)\n\n        col = f\"ghost_{t_lbl}\"\n        series = pd.Series(pd.NA, index=df.index, dtype=\"Int64\", name=col)\n        series = series.mask(valid_eval & is_ghost, 1)\n        ghost_dict[col] = series.mask(valid_eval & (~is_ghost), 0)\n    return ghost_dict"
  },
  {
    "id": "kpi-compute-occupancy-kpis",
    "file": "src/kpi.py",
    "name": "compute_occupancy_kpis",
    "kind": "function",
    "lineStart": 177,
    "lineEnd": 212,
    "signature": "def compute_occupancy_kpis(",
    "purpose": "Tính availability_31-90, tỷ lệ không khả dụng occ_1-30, occ_31-90 và urgency_gap cho cả 4 mốc, hỗ trợ loại bỏ ghost & <NA> khi exclude_ghost=True.",
    "flow": [
      "Kiểm tra ~qa_invalid_availability và a90 >= a30; tính a31_90 = (a90 - a30) kiểu Int64.",
      "Nếu exclude_ghost=True: lấy ghost_t_lbl và lọc thêm `& (g == 0).fillna(False)` (loại cả 1 và <NA>).",
      "Tính vector hóa occ_30_raw = (30 - a30)/30, occ_31_90_raw = (60 - a31_90)/60.",
      "Làm tròn 4 chữ số độc lập từ các bản float raw (occ_30, occ_31_90, gap = occ_30_raw - occ_31_90_raw)."
    ],
    "input": "snapshots, ghost_dict, exclude_ghost (bool=True)",
    "output": "Dict chứa 16 Series (4 chỉ số × 4 mốc t1..t4).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: _qa_flag, astype, fillna, notna, reindex, round, to_numeric, where"
    ],
    "example": "a30=6, a90=48, ghost=0 -> Occ_1-30 = 0.8000, Occ_31-90 = 0.3000, Urgency Gap = 0.5000.",
    "usage": "Tổng hợp vào kpi_by_listing và trả lời câu hỏi về áp lực đặt sát ngày cho SECTUR CDMX.",
    "potentialBugs": [
      "Thiếu `.fillna(False)` ở `(g == 0)` sẽ làm lỗi mặt nạ chứa pd.NA (logic 3 giá trị Kleene)."
    ],
    "viva": [
      {
        "q": "Tại sao có trường hợp `a90 >= a30` được kiểm lại trong `compute_occupancy_kpis()` dù `qa.py` đã kiểm?",
        "a": "Nguyên tắc lập trình phòng thủ (Defense in depth): lỡ file bị sửa ngoài luồng thì hàm KPI vẫn không sinh a31_90 âm."
      }
    ],
    "code": "def compute_occupancy_kpis(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    ghost_dict: Dict[str, pd.Series],\n    exclude_ghost: bool = True,\n) -> Dict[str, pd.Series]:\n    \"\"\"\n    Tính availability_31-90, occ_1-30, occ_31-90 và urgency_gap cho từng mốc.\n    Nếu vi phạm qa_invalid_availability hoặc (khi exclude_ghost=True) ghost là 1 hoặc <NA> -> giữ NaN.\n    \"\"\"\n    out: Dict[str, pd.Series] = {}\n    for _, t_lbl, df in snapshots:\n        inv_avail = _qa_flag(df, \"qa_invalid_availability\")\n        a30 = pd.to_numeric(df[\"availability_30_clean\"], errors=\"coerce\")\n        a90 = pd.to_numeric(df[\"availability_90_clean\"], errors=\"coerce\")\n        valid_avail = (~inv_avail) & a30.notna() & a90.notna() & (a90 >= a30)\n\n        a31_90 = (a90 - a30).where(valid_avail, np.nan).astype(\"Int64\")\n\n        if exclude_ghost:\n            g = ghost_dict[f\"ghost_{t_lbl}\"].reindex(df.index)\n            valid_occ = valid_avail & (g == 0).fillna(False)\n        else:\n            valid_occ = valid_avail\n\n        occ_30_raw = ((30.0 - a30) / 30.0).where(valid_occ, np.nan).astype(\"float64\")\n        occ_31_90_raw = ((60.0 - a31_90.astype(\"float64\")) / 60.0).where(valid_occ, np.nan).astype(\"float64\")\n        occ_30 = occ_30_raw.round(4)\n        occ_31_90 = occ_31_90_raw.round(4)\n        gap = (occ_30_raw - occ_31_90_raw).round(4)\n\n        out[f\"availability_31-90_{t_lbl}\"] = a31_90\n        out[f\"occ_1-30_{t_lbl}\"] = occ_30\n        out[f\"occ_31-90_{t_lbl}\"] = occ_31_90\n        out[f\"urgency_gap_{t_lbl}\"] = gap\n\n    return out"
  },
  {
    "id": "kpi-compute-price-and-ppg-kpis",
    "file": "src/kpi.py",
    "name": "compute_price_and_ppg_kpis",
    "kind": "function",
    "lineStart": 215,
    "lineEnd": 252,
    "signature": "def compute_price_and_ppg_kpis(",
    "purpose": "Tính Price sạch và PPG = price / accommodates trên từng listing (loại giá thiếu/<=0, GIỮ ngoại lai P01–P99), đồng thời trả thống kê snapshot.",
    "flow": [
      "Xác thực valid_price (~qa_missing_price & > 0) và valid_acc (~qa_invalid_accommodates & > 0).",
      "Tính ppg = (clean_price / clean_acc) khi cả hai đều hợp lệ; làm tròn 2 chữ số.",
      "Gọi _iqr_stats() tách riêng cho clean_price (valid_price_count) và ppg (valid_ppg_count) lưu vào snapshot_stats."
    ],
    "input": "snapshots, price_col=\"price_mxn\"",
    "output": "Tuple (listing_series: Dict, snapshot_stats: Dict theo ngày snapshot).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: _iqr_stats, _qa_flag, astype, notna, round, to_numeric, where"
    ],
    "example": "Ở t2 trả valid_price_count=0 và các chỉ số NaN; ở t4 trả 980 căn, Median Price 1.940,00, Median PPG 626,79.",
    "usage": "Cung cấp chuỗi giá/PPG cho bảng listing và thống kê chuẩn xác (trước làm tròn từng phần) cho bảng snapshot.",
    "potentialBugs": [
      "Khi một listing có giá hợp lệ nhưng health check accommodates bị lỗi, valid_price_count và valid_ppg_count sẽ khác nhau."
    ],
    "viva": [
      {
        "q": "Tại sao không dùng median của các giá trị trung bình khu vực mà phải tính `_iqr_stats()` trực tiếp trên toàn chuỗi clean_price/ppg của snapshot?",
        "a": "Trung vị của các trung vị nhóm (median of medians) không bằng trung vị toàn mẫu! Tính trực tiếp trên 980 căn mới đúng toán học."
      }
    ],
    "code": "def compute_price_and_ppg_kpis(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    price_col: str = \"price_mxn\",\n) -> Tuple[Dict[str, pd.Series], Dict[str, Dict[str, Any]]]:\n    \"\"\"\n    Tính Price và PPG = price / accommodates (chỉ loại giá thiếu/<= 0 và sức chứa không hợp lệ).\n    Giữ lại giá trị ngoại lai (qa_price_outlier).\n    \"\"\"\n    listing_series: Dict[str, pd.Series] = {}\n    snapshot_stats: Dict[str, Dict[str, Any]] = {}\n\n    for snap, t_lbl, df in snapshots:\n        price = pd.to_numeric(df[price_col], errors=\"coerce\")\n        valid_price = (~_qa_flag(df, \"qa_missing_price\")) & price.notna() & (price > 0)\n        clean_price = price.where(valid_price, np.nan).astype(\"float64\")\n\n        acc = pd.to_numeric(df[\"accommodates_clean\"], errors=\"coerce\")\n        valid_acc = (~_qa_flag(df, \"qa_invalid_accommodates\")) & acc.notna() & (acc > 0)\n        clean_acc = acc.where(valid_acc, np.nan).astype(\"float64\")\n\n        ppg = (clean_price / clean_acc).where(valid_price & valid_acc, np.nan)\n\n        listing_series[f\"{price_col}_{t_lbl}\"] = clean_price.round(2)\n        listing_series[f\"ppg_{t_lbl}\"] = ppg.round(2)\n\n        p_cnt, p_med, p_iqr, p_riqr = _iqr_stats(clean_price)\n        ppg_cnt, ppg_med, ppg_iqr, ppg_riqr = _iqr_stats(ppg)\n        snapshot_stats[snap] = {\n            \"valid_price_count\": p_cnt,\n            \"valid_ppg_count\": ppg_cnt,\n            f\"median_{price_col}\": p_med,\n            f\"iqr_{price_col}\": p_iqr,\n            \"riqr_price\": p_riqr,\n            \"median_ppg\": ppg_med,\n            \"iqr_ppg\": ppg_iqr,\n            \"riqr_ppg\": ppg_riqr,\n        }\n    return listing_series, snapshot_stats"
  },
  {
    "id": "kpi-build-kpi-by-listing",
    "file": "src/kpi.py",
    "name": "build_kpi_by_listing",
    "kind": "function",
    "lineStart": 255,
    "lineEnd": 276,
    "signature": "def build_kpi_by_listing(",
    "purpose": "Hợp nhất toàn bộ chuỗi KPI xuyên suốt 4 mốc thời gian của 1.000 căn hộ thành một bảng tổng hợp ngang cấp listing (1 dòng / căn hộ).",
    "flow": [
      "Lấy metadata (area_col, neighbourhood_cleansed, room_type) từ snapshot cuối cùng (snapshots[-1]).",
      "Lần lượt gắn các Series từ velocities, ghost_dict, occ_dict, price_dict theo chỉ mục id (.reindex(final_df.index)).",
      "Gọi .reset_index() đưa id trở lại làm cột thông thường."
    ],
    "input": "snapshots, velocities, ghost_dict, occ_dict, price_dict, area_col",
    "output": "pd.DataFrame (1.000 dòng -> data/processed/kpi_by_listing.csv).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: DataFrame, fromkeys, items, reindex, reset_index"
    ],
    "example": "kpi_by_listing -> 1.000 dòng với các cột t1..t4 song song cho từng căn.",
    "usage": "Là nguồn cấp dữ liệu trực tiếp cho compute_kpi_by_area(), compute_kpi_by_snapshot() và compute_kpi_by_neighbourhood().",
    "potentialBugs": [
      "Lấy metadata từ snapshot cuối cùng giả định quận/loại phòng của 1.000 listing cố định không đổi qua 4 quý."
    ],
    "viva": [
      {
        "q": "Tại sao cuối hàm phải gọi `.reset_index()` trước khi xuất CSV?",
        "a": "Vì _load_snapshots() đặt \"id\" làm index; .reset_index() trả \"id\" về lại thành cột đầu tiên khi gọi to_csv(..., index=False)."
      }
    ],
    "code": "def build_kpi_by_listing(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    velocities: Dict[str, pd.Series],\n    ghost_dict: Dict[str, pd.Series],\n    occ_dict: Dict[str, pd.Series],\n    price_dict: Dict[str, pd.Series],\n    area_col: str = \"analysis_area\",\n) -> pd.DataFrame:\n    \"\"\"Tổng hợp bảng KPI cấp listing từ mốc cuối cùng và chuỗi các mốc theo id.\"\"\"\n    _, _, final_df = snapshots[-1]\n\n    base = pd.DataFrame(index=final_df.index)\n    for col in dict.fromkeys((area_col, \"neighbourhood_cleansed\", \"room_type\")):\n        if col in final_df.columns:\n            base[col] = final_df[col]\n\n    for series_group in (velocities, ghost_dict, occ_dict, price_dict):\n        for col, s in series_group.items():\n            if col not in base.columns:\n                base[col] = s.reindex(final_df.index)\n\n    return base.reset_index()"
  },
  {
    "id": "kpi-compute-kpi-by-area",
    "file": "src/kpi.py",
    "name": "compute_kpi_by_area",
    "kind": "function",
    "lineStart": 279,
    "lineEnd": 311,
    "signature": "def compute_kpi_by_area(",
    "purpose": "Tổng hợp 4 nhóm KPI (RV mean, Ghost count/n/rate, Occ/Gap mean, Median/IQR/rIQR PPG) theo từng khu vực phân tích A01–A08.",
    "flow": [
      "Groupby theo area_col (dropna=False) tính total_listings = len(group).",
      "Đếm mẫu hợp lệ bằng .count() (loại NaN) cho RV, Ghost, Occupancy.",
      "Tính Median, IQR, rIQR PPG từng mốc bằng _iqr_stats().",
      "Sắp xếp theo area_col từ A01 đến A08."
    ],
    "input": "kpi_by_listing, t_labels, area_col=\"analysis_area\"",
    "output": "pd.DataFrame (8 dòng A01–A08 -> data/processed/kpi_by_area.csv).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: DataFrame, _iqr_stats, _round_or_nan, append, count, dropna, float, groupby, int, len, mean, range"
    ],
    "example": "A05: Med PPG t4 = 819.31, rIQR = 0.6597; A08: Med PPG t4 = 427.97, rIQR = 0.9526.",
    "usage": "Dữ liệu nguồn cho 4 biểu đồ khu vực/thời gian trong src/viz.py.",
    "potentialBugs": [
      "Nếu 1 khu vực thiếu hẳn dữ liệu (vd PPG ở t2), _iqr_stats() trả về 0 và NaN an toàn."
    ],
    "viva": [
      {
        "q": "Tại sao dùng `.mean()` cho `occ_1-30` trong khu vực A01–A08 nhưng lại dùng `_iqr_stats()` (Median & rIQR) cho `ppg`?",
        "a": "Vì Occupancy bị chặn cứng trong [0, 1] không có outlier cực đoan, còn PPG lệch phải rất mạnh nên cần Median & rIQR."
      }
    ],
    "code": "def compute_kpi_by_area(\n    kpi_by_listing: pd.DataFrame,\n    t_labels: List[str],\n    area_col: str = \"analysis_area\",\n) -> pd.DataFrame:\n    \"\"\"Tổng hợp KPI theo từng khu vực phân tích; giữ NaN nếu không có mẫu hợp lệ.\"\"\"\n    rows: List[Dict[str, Any]] = []\n    for area, group in kpi_by_listing.groupby(area_col, dropna=False):\n        row: Dict[str, Any] = {area_col: area, \"total_listings\": len(group)}\n        for i in range(1, len(t_labels)):\n            rv_col = f\"review_velocity_q{i}\"\n            if rv_col in group.columns:\n                row[f\"{rv_col}_n\"] = int(group[rv_col].count())\n                row[f\"{rv_col}_mean\"] = _round_or_nan(group[rv_col].mean(), 4)\n        for t in t_labels:\n            g_valid = group[f\"ghost_{t}\"].dropna()\n            row[f\"ghost_{t}_count\"] = 0 if g_valid.empty else int(g_valid.sum())\n            row[f\"ghost_{t}_n\"] = len(g_valid)\n            row[f\"ghost_rate_{t}\"] = np.nan if g_valid.empty else round(float(g_valid.sum()) / len(g_valid), 4)\n        for t in t_labels:\n            row[f\"occ_{t}_n\"] = int(group[f\"occ_1-30_{t}\"].count())\n            for metric in (\"occ_1-30\", \"occ_31-90\", \"urgency_gap\"):\n                row[f\"{metric}_{t}_mean\"] = _round_or_nan(group[f\"{metric}_{t}\"].mean(), 4)\n        for t in t_labels:\n            ppg_col = f\"ppg_{t}\"\n            if ppg_col in group.columns:\n                valid_ppg, med_ppg, iqr_ppg, riqr_ppg = _iqr_stats(group[ppg_col])\n                row[f\"valid_ppg_{t}\"] = valid_ppg\n                row[f\"median_ppg_{t}\"] = med_ppg\n                row[f\"iqr_ppg_{t}\"] = iqr_ppg\n                row[f\"riqr_ppg_{t}\"] = riqr_ppg\n        rows.append(row)\n    return pd.DataFrame(rows).sort_values(area_col).reset_index(drop=True)"
  },
  {
    "id": "kpi-compute-kpi-by-snapshot",
    "file": "src/kpi.py",
    "name": "compute_kpi_by_snapshot",
    "kind": "function",
    "lineStart": 314,
    "lineEnd": 366,
    "signature": "def compute_kpi_by_snapshot(",
    "purpose": "Tổng hợp KPI toàn thị trường qua 4 dòng t1..t4, kết hợp thống kê Ghost/RV/Occ từ kpi_by_listing và thống kê Price/PPG chính xác từ snapshot_stats.",
    "flow": [
      "Duyệt 4 mốc: tính ghost_n, ghost_count, ghost_rate (lưu pd.NA/NaN nếu rỗng).",
      "Với t1 (idx == 0) gán review_velocity_n = pd.NA và mean = np.nan; t2..t4 đếm count() và mean().",
      "Ghép Price/PPG stats từ snapshot_stats; ép các cột đếm sang Int64 để giữ <NA> ở t1."
    ],
    "input": "snapshots, kpi_by_listing, snapshot_stats, price_col",
    "output": "pd.DataFrame (4 dòng -> data/processed/kpi_by_snapshot.csv).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: DataFrame, _round_or_nan, append, astype, count, dropna, enumerate, get, int, len, mean, round"
    ],
    "example": "t1: rv_n=<NA>, valid_price_count=960; t2: valid_price_count=0; t4: valid_price_count=980.",
    "usage": "Xuất bảng kpi_by_snapshot.csv và làm tham chiếu đường đứt nét trên các biểu đồ.",
    "potentialBugs": [
      "Ép kiểu .astype(\"Int64\") cuối hàm là bắt buộc để `review_velocity_n` tại t1 không biến thành `1000.0` (float) trong CSV."
    ],
    "viva": [
      {
        "q": "Vì sao tổng hợp Price/PPG ở kpi_by_snapshot lại lấy từ snapshot_stats thay vì tự tính lại?",
        "a": "Để tính trực tiếp trên độ chính xác float đầy đủ trước khi chuỗi kpi_by_listing bị làm tròn 2 chữ số."
      }
    ],
    "code": "def compute_kpi_by_snapshot(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    kpi_by_listing: pd.DataFrame,\n    snapshot_stats: Dict[str, Dict[str, Any]],\n    price_col: str = \"price_mxn\",\n) -> pd.DataFrame:\n    \"\"\"Tổng hợp KPI toàn thị trường theo từng snapshot; giữ <NA>/NaN nếu không có mẫu hợp lệ.\"\"\"\n    rows: List[Dict[str, Any]] = []\n    total_cnt = len(kpi_by_listing)\n\n    for idx, (snap, t_lbl, _) in enumerate(snapshots):\n        g_valid = kpi_by_listing[f\"ghost_{t_lbl}\"].dropna()\n        ghost_n = len(g_valid)\n        ghost_cnt = pd.NA if g_valid.empty else int(g_valid.sum())\n        ghost_rate = np.nan if g_valid.empty else round(int(g_valid.sum()) / ghost_n, 4)\n\n        rv_col = f\"review_velocity_q{idx}\"\n        if idx > 0 and rv_col in kpi_by_listing.columns:\n            rv_s = pd.to_numeric(kpi_by_listing[rv_col], errors=\"coerce\")\n            rv_n = int(rv_s.count())\n            rv_mean = _round_or_nan(rv_s.mean(), 4)\n        else:\n            rv_n = pd.NA\n            rv_mean = np.nan\n\n        stat = snapshot_stats.get(snap, {})\n        rows.append({\n            \"snapshot\": snap,\n            \"label\": t_lbl,\n            \"total_listings\": total_cnt,\n            \"ghost_n\": ghost_n,\n            \"ghost_count\": ghost_cnt,\n            \"ghost_rate\": ghost_rate,\n            \"review_velocity_n\": rv_n,\n            \"review_velocity_mean\": rv_mean,\n            \"occ_n\": int(kpi_by_listing[f\"occ_1-30_{t_lbl}\"].count()),\n            \"occ_1-30_mean\": _round_or_nan(kpi_by_listing[f\"occ_1-30_{t_lbl}\"].mean(), 4),\n            \"occ_31-90_mean\": _round_or_nan(kpi_by_listing[f\"occ_31-90_{t_lbl}\"].mean(), 4),\n            \"urgency_gap_mean\": _round_or_nan(kpi_by_listing[f\"urgency_gap_{t_lbl}\"].mean(), 4),\n            \"valid_price_count\": stat.get(\"valid_price_count\", np.nan),\n            \"valid_ppg_count\": stat.get(\"valid_ppg_count\", np.nan),\n            f\"median_{price_col}\": stat.get(f\"median_{price_col}\", np.nan),\n            f\"iqr_{price_col}\": stat.get(f\"iqr_{price_col}\", np.nan),\n            \"riqr_price\": stat.get(\"riqr_price\", np.nan),\n            \"median_ppg\": stat.get(\"median_ppg\", np.nan),\n            \"iqr_ppg\": stat.get(\"iqr_ppg\", np.nan),\n            \"riqr_ppg\": stat.get(\"riqr_ppg\", np.nan),\n        })\n\n    df_out = pd.DataFrame(rows)\n    for col in (\"ghost_n\", \"ghost_count\", \"review_velocity_n\", \"occ_n\", \"valid_price_count\", \"valid_ppg_count\"):\n        df_out[col] = df_out[col].astype(\"Int64\")\n    return df_out"
  },
  {
    "id": "kpi--load-llm-reviews",
    "file": "src/kpi.py",
    "name": "_load_llm_reviews",
    "kind": "function",
    "lineStart": 369,
    "lineEnd": 379,
    "signature": "def _load_llm_reviews(config: Dict[str, Any]) -> Tuple[pd.DataFrame, List[str]]:",
    "purpose": "Đọc file reviews_sentiment.csv (với id và listing_id dạng string) và danh sách khía cạnh từ cấu hình YAML.",
    "flow": [
      "Lấy đường dẫn output_csv và aspects từ config.llm; kiểm tra file tồn tại; đọc CSV giữ ID dạng chuỗi."
    ],
    "input": "config (Dict)",
    "output": "Tuple (reviews_df: DataFrame, aspects: List[str]).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: FileNotFoundError, Path, get, is_absolute, is_file, read_csv, str, strip"
    ],
    "example": "df, aspects = _load_llm_reviews(cfg) -> 1.000 dòng, 7 khía cạnh.",
    "usage": "Được main() gọi để chuyển dữ liệu LLM sang compute_kpi_by_neighbourhood().",
    "potentialBugs": [
      "Ném FileNotFoundError nếu chạy src/kpi.py khi chưa chạy xong src/llm.py."
    ],
    "viva": [
      {
        "q": "Tại sao `_load_llm_reviews()` đọc cả `id` lẫn `listing_id` dưới dạng `string`?",
        "a": "Để bước merge vào `kpi_by_listing` theo `listing_id` trong `compute_kpi_by_neighbourhood()` khớp chính xác 100% mã 18–19 chữ số."
      }
    ],
    "code": "def _load_llm_reviews(config: Dict[str, Any]) -> Tuple[pd.DataFrame, List[str]]:\n    \"\"\"Nạp bảng kết quả LLM từ cấu hình để phục vụ tính KPI trải nghiệm theo quận.\"\"\"\n    llm_cfg = config.get(\"llm\", {})\n    aspects = [str(a).strip() for a in llm_cfg.get(\"aspects\", DEFAULT_LLM_ASPECTS) if str(a).strip()] or DEFAULT_LLM_ASPECTS\n    path = Path(llm_cfg.get(\"output_csv\", \"data/processed/reviews_sentiment.csv\"))\n    if not path.is_absolute():\n        path = PROJECT_ROOT / path\n    if not path.is_file():\n        raise FileNotFoundError(f\"[KPI] Không tìm thấy kết quả LLM: {path}. Hãy chạy src/llm.py trước!\")\n    df = pd.read_csv(path, low_memory=False, dtype={\"id\": \"string\", \"listing_id\": \"string\"})\n    return df, aspects"
  },
  {
    "id": "kpi-compute-kpi-by-neighbourhood",
    "file": "src/kpi.py",
    "name": "compute_kpi_by_neighbourhood",
    "kind": "function",
    "lineStart": 382,
    "lineEnd": 461,
    "signature": "def compute_kpi_by_neighbourhood(",
    "purpose": "Ánh xạ 1.000 review LLM về đúng quận qua bảng listing, tính 14 cột tỷ lệ phàn nàn (complaint & complaint_mixed × 7) và ghép thống kê Price/PPG qua 4 mốc cho đủ 15 quận.",
    "flow": [
      "Kiểm tra hợp đồng cột ở cả kpi_by_listing và reviews_df.",
      "Nối left-join reviews vào bảng tra cứu listing->neighbourhood theo listing_id; chỉ giữ review có ít nhất 1 nhãn khía cạnh khác NaN.",
      "Ánh xạ nhãn bằng COMPLAINT_SCORE_MAP (negative=1) và COMPLAINT_MIXED_SCORE_MAP (negative/mixed=1) rồi groupby quận.",
      "Reindex bảng kết quả theo đủ tất cả 15 quận có trong kpi_by_listing (3 quận 0 LLM giữ count=0 và tỷ lệ phàn nàn = NaN).",
      "Tính Mean, Median, IQR, rIQR, Rank Price & PPG theo từng mốc cho tất cả 15 quận."
    ],
    "input": "kpi_by_listing, reviews_df, aspects, t_labels, price_col",
    "output": "pd.DataFrame (15 dòng sắp theo llm_review_count giảm dần -> kpi_by_neighbourhood.csv).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: DataFrame, ValueError, _iqr_stats, _round_or_nan, any, astype, copy, count, drop_duplicates, dropna, fillna, groupby"
    ],
    "example": "Cuauhtémoc (llm=749, complaints_mix_amenities=0.1482); Xochimilco (llm=0 -> complaint giữ NaN).",
    "usage": "Cấp bảng dữ liệu chính cho 3 biểu đồ kpi_ppg_neighbourhood, kpi_riqr_neighbourhood và llm_insights.",
    "potentialBugs": [
      "Các quận nhỏ (n=1 ở Milpa Alta, n=3 ở Magdalena Contreras, n=4 ở Iztapalapa) có rank/rIQR dao động rất mạnh."
    ],
    "viva": [
      {
        "q": "3 quận có llm_review_count = 0 (Iztapalapa, Milpa Alta, Xochimilco) vẫn có mặt trong kpi_by_neighbourhood.csv bằng cách nào?",
        "a": "Nhờ bước `out = out.reindex(all_neighs)` theo danh sách tất cả 15 quận lấy từ `kpi_by_listing`, điền `llm_review_count=0` nhưng giữ `NaN` ở 14 cột tỷ lệ phàn nàn."
      }
    ],
    "code": "def compute_kpi_by_neighbourhood(\n    kpi_by_listing: pd.DataFrame,\n    reviews_df: pd.DataFrame,\n    aspects: Optional[List[str]] = None,\n    t_labels: Optional[List[str]] = None,\n    price_col: str = \"price_mxn\",\n) -> pd.DataFrame:\n    \"\"\"\n    Tính tỷ lệ phàn nàn LLM và thống kê Price/PPG theo quận ngay trên mẫu listings được giao.\n    \"\"\"\n    missing_listing_cols = sorted({\"id\", \"neighbourhood_cleansed\"} - set(kpi_by_listing.columns))\n    if missing_listing_cols:\n        raise ValueError(f\"[KPI] kpi_by_listing thiếu cột bắt buộc {missing_listing_cols}.\")\n\n    aspects_list = [str(a) for a in (aspects or DEFAULT_LLM_ASPECTS)]\n    missing_rev_cols = sorted({\"id\", \"listing_id\", *aspects_list} - set(reviews_df.columns))\n    if missing_rev_cols:\n        raise ValueError(f\"[KPI] Bảng LLM thiếu cột bắt buộc {missing_rev_cols}.\")\n\n    # Tra cứu neighbourhood_cleansed theo listing_id và merge vào bản sao bảng review LLM\n    id_to_neigh = kpi_by_listing[[\"id\", \"neighbourhood_cleansed\"]].drop_duplicates(\"id\").copy()\n    id_to_neigh[\"listing_id\"] = id_to_neigh.pop(\"id\").astype(\"string\").str.strip()\n    id_to_neigh[\"neighbourhood_cleansed\"] = id_to_neigh[\"neighbourhood_cleansed\"].astype(\"string\").str.strip()\n\n    rev_merged = reviews_df[[\"id\", \"listing_id\", *aspects_list]].rename(columns={\"id\": \"review_id\"}).copy()\n    rev_merged[\"review_id\"] = rev_merged[\"review_id\"].astype(\"string\").str.strip()\n    rev_merged[\"listing_id\"] = rev_merged[\"listing_id\"].astype(\"string\").str.strip()\n    rev_merged = rev_merged.dropna(subset=[\"review_id\", \"listing_id\"]).merge(id_to_neigh, on=\"listing_id\", how=\"left\")\n\n    # Chỉ giữ bản ghi có ít nhất 1 nhãn aspect hợp lệ để không thổi phồng llm_review_count bằng review rỗng\n    rev_merged = rev_merged.loc[rev_merged[aspects_list].notna().any(axis=1)].copy()\n\n    complaint_cols = [f\"complaint_{asp}\" for asp in aspects_list]\n    complaint_mixed_cols = [f\"complaint_mixed_{asp}\" for asp in aspects_list]\n    for asp, col, col_m in zip(aspects_list, complaint_cols, complaint_mixed_cols):\n        vals = rev_merged[asp].astype(\"string\").str.strip().str.lower()\n        rev_merged[col] = vals.map(COMPLAINT_SCORE_MAP)\n        rev_merged[col_m] = vals.map(COMPLAINT_MIXED_SCORE_MAP)\n\n    # Group theo neighbourhood_cleansed từ chính bảng review LLM đã gắn quận\n    grouped = rev_merged.groupby(\"neighbourhood_cleansed\", dropna=True)\n    out = pd.DataFrame(\n        {\n            \"llm_review_count\": grouped[\"review_id\"].count(),\n            **{col: grouped[col].mean().round(4) for col in (*complaint_cols, *complaint_mixed_cols)},\n        }\n    )\n\n    neigh_key = kpi_by_listing[\"neighbourhood_cleansed\"].astype(\"string\").str.strip()\n    groups = {str(k): g for k, g in kpi_by_listing.groupby(neigh_key, dropna=True)}\n    all_neighs = sorted(groups)\n    out = out.reindex(all_neighs)\n    out.index.name = \"neighbourhood_cleansed\"\n    out[\"llm_review_count\"] = out[\"llm_review_count\"].fillna(0).astype(int)\n    out[\"total_listings\"] = [len(groups[n]) for n in all_neighs]\n\n    labels = list(t_labels) if t_labels is not None else [c[4:] for c in kpi_by_listing if c.startswith(\"ppg_\")]\n    for t in labels:\n        p_vals = [pd.to_numeric(groups[n][f\"{price_col}_{t}\"], errors=\"coerce\").dropna() for n in all_neighs]\n        g_vals = [pd.to_numeric(groups[n][f\"ppg_{t}\"], errors=\"coerce\").dropna() for n in all_neighs]\n        p_stats = [_iqr_stats(s) for s in p_vals]\n        out[f\"valid_price_{t}\"] = [c for c, _, _, _ in p_stats]\n        out[f\"mean_{price_col}_{t}\"] = [np.nan if s.empty else _round_or_nan(s.mean(), 2) for s in p_vals]\n        out[f\"median_{price_col}_{t}\"] = [m for _, m, _, _ in p_stats]\n        out[f\"iqr_{price_col}_{t}\"] = [i for _, _, i, _ in p_stats]\n        out[f\"riqr_price_{t}\"] = [r for _, _, _, r in p_stats]\n        g_stats = [_iqr_stats(s) for s in g_vals]\n        out[f\"valid_ppg_{t}\"] = [c for c, _, _, _ in g_stats]\n        out[f\"mean_ppg_{t}\"] = [np.nan if s.empty else _round_or_nan(s.mean(), 2) for s in g_vals]\n        out[f\"median_ppg_{t}\"] = [m for _, m, _, _ in g_stats]\n        out[f\"iqr_ppg_{t}\"] = [i for _, _, i, _ in g_stats]\n        out[f\"riqr_ppg_{t}\"] = [r for _, _, _, r in g_stats]\n        out[f\"rank_price_{t}\"] = out[f\"mean_{price_col}_{t}\"].rank(ascending=False, method=\"min\").astype(\"Int64\")\n        out[f\"rank_ppg_{t}\"] = out[f\"mean_ppg_{t}\"].rank(ascending=False, method=\"min\").astype(\"Int64\")\n\n    return (\n        out.reset_index()\n        .sort_values([\"llm_review_count\", \"neighbourhood_cleansed\"], ascending=[False, True])\n        .reset_index(drop=True)\n    )"
  },
  {
    "id": "kpi-main",
    "file": "src/kpi.py",
    "name": "main",
    "kind": "function",
    "lineStart": 464,
    "lineEnd": 511,
    "signature": "def main() -> None:",
    "purpose": "Điều phối tính toàn bộ 4 cấp KPI (Listing, Area, Snapshot, Neighbourhood) từ 4 file listings QA + reviews_sentiment.csv và lưu 4 tệp CSV vào data/processed/.",
    "flow": [
      "Đọc config, nạp 4 snapshot qua _load_snapshots().",
      "Tính tuần tự velocities -> ghost_dict -> occ_dict -> price_dict -> _load_llm_reviews().",
      "Dựng 4 bảng: kpi_by_listing, kpi_by_area, kpi_by_snapshot, kpi_by_neighbourhood và lưu CSV."
    ],
    "input": "CLI arg --config",
    "output": "4 tệp kpi_by_{listing,area,snapshot,neighbourhood}.csv trong data/processed/.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Optional, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: ArgumentParser, _load_llm_reviews, _load_snapshots, _price_col, add_argument, bool, build_kpi_by_listing, compute_ghost_listings, compute_kpi_by_area, compute_kpi_by_neighbourhood, compute_kpi_by_snapshot, compute_occupancy_kpis"
    ],
    "example": "python src/kpi.py --config configs/mexico-city.yaml",
    "usage": "Chặng 7 của STEPS trong run_pipeline.py.",
    "potentialBugs": [
      "Yêu cầu bước QA (chặng 3) và LLM (chặng 4) phải đã chạy hoàn tất trước đó."
    ],
    "viva": [
      {
        "q": "Mối liên hệ phụ thuộc giữa 4 bảng đầu ra của kpi.py là gì?",
        "a": "kpi_by_listing (1.000 dòng) là bảng trung tâm sinh ra trực tiếp kpi_by_area (8 dòng), kpi_by_snapshot (4 dòng) và ghép với reviews_sentiment tạo kpi_by_neighbourhood (15 dòng)."
      }
    ],
    "code": "def main() -> None:\n    parser = argparse.ArgumentParser(description=\"Inside Airbnb KPI Precomputation Module\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    args = parser.parse_args()\n\n    print(\"=\" * 70)\n    print(\"[KPI] BẮT ĐẦU TÍNH TOÁN KPI\")\n    print(\"=\" * 70)\n\n    config = load_config(args.config)\n    kpi_cfg = config.get(\"kpi\", {})\n    area_col = str(kpi_cfg.get(\"area_col\") or config.get(\"qa\", {}).get(\"area_col\", \"analysis_area\"))\n    stale_days = int(kpi_cfg.get(\"stale_review_days\", 90))\n    exclude_ghost = bool(kpi_cfg.get(\"exclude_ghost\", True))\n    price_col = _price_col(config)\n    snapshots = _load_snapshots(config)\n    t_labels = [t for _, t, _ in snapshots]\n\n    velocities = compute_review_velocities(snapshots)\n    ghost_dict = compute_ghost_listings(snapshots, velocities, stale_days=stale_days)\n    occ_dict = compute_occupancy_kpis(snapshots, ghost_dict, exclude_ghost=exclude_ghost)\n    price_dict, snapshot_stats = compute_price_and_ppg_kpis(snapshots, price_col=price_col)\n    reviews_df, aspects = _load_llm_reviews(config)\n\n    for col, s in ghost_dict.items():\n        valid = s.dropna()\n        rate = (valid.sum() / len(valid) * 100) if not valid.empty else float(\"nan\")\n        print(f\"  • {col}: {int(valid.sum()) if not valid.empty else 'N/A'} căn hộ ma ({rate:.2f}%)\")\n\n    kpi_by_listing = build_kpi_by_listing(snapshots, velocities, ghost_dict, occ_dict, price_dict, area_col=area_col)\n    kpi_by_area = compute_kpi_by_area(kpi_by_listing, t_labels, area_col=area_col)\n    kpi_by_snapshot = compute_kpi_by_snapshot(snapshots, kpi_by_listing, snapshot_stats, price_col=price_col)\n    kpi_by_neighbourhood = compute_kpi_by_neighbourhood(\n        kpi_by_listing, reviews_df, aspects=aspects, t_labels=t_labels, price_col=price_col\n    )\n\n    proc_dir = PROJECT_ROOT / \"data\" / \"processed\"\n    proc_dir.mkdir(parents=True, exist_ok=True)\n    outputs = [\n        (proc_dir / \"kpi_by_listing.csv\", kpi_by_listing),\n        (proc_dir / \"kpi_by_area.csv\", kpi_by_area),\n        (proc_dir / \"kpi_by_snapshot.csv\", kpi_by_snapshot),\n        (proc_dir / \"kpi_by_neighbourhood.csv\", kpi_by_neighbourhood),\n    ]\n    for path, df_out in outputs:\n        df_out.to_csv(path, index=False, encoding=\"utf-8\")\n        print(f\"[KPI] Đã xuất: {path.relative_to(PROJECT_ROOT)} ({len(df_out)} dòng)\")\n    print(\"=\" * 70)"
  },
  {
    "id": "viz--read-kpi",
    "file": "src/viz.py",
    "name": "_read_kpi",
    "kind": "function",
    "lineStart": 30,
    "lineEnd": 36,
    "signature": "def _read_kpi(proc: Path, name: str, cols: list[str] | None = None, **kw) -> pd.DataFrame:",
    "purpose": "Hàm helper đọc file CSV đầu vào cho viz.py kèm kiểm tra không rỗng và đủ mọi cột bắt buộc.",
    "flow": [
      "pd.read_csv(proc/name)",
      "Nếu df.empty hoặc thiếu cột trong cols -> ném ValueError ngay kèm tên bảng."
    ],
    "input": "proc (Path), name (str), cols (list | None), **kw",
    "output": "pd.DataFrame",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: ValueError, read_csv"
    ],
    "example": "_read_kpi(proc, \"kpi_by_area.csv\", [\"analysis_area\", \"total_listings\"])",
    "usage": "Đọc 4 bảng KPI và evaluation_report.csv trong main() của src/viz.py.",
    "potentialBugs": [
      "Chỉ kiểm tra cột ở mức sự tồn tại chứ không ép lại kiểu số (được từng hàm plot_* ép tiếp bằng pd.to_numeric)."
    ],
    "viva": [
      {
        "q": "Nguyên tắc SOLID trong docstring đầu tệp `src/viz.py` thể hiện ở điểm nào?",
        "a": "viz.py chỉ làm duy nhất nhiệm vụ đọc bảng KPI đã tính sẵn để vẽ; tuyệt đối không tự tính lại PPG, rIQR hay Ghost trong code vẽ."
      }
    ],
    "code": "def _read_kpi(proc: Path, name: str, cols: list[str] | None = None, **kw) -> pd.DataFrame:\n    df = pd.read_csv(proc / name, low_memory=False, **kw)\n    if df.empty:\n        raise ValueError(f\"[VIZ] Bảng KPI rỗng: {name}\")\n    if cols and (missing := [c for c in cols if c not in df.columns]):\n        raise ValueError(f\"[VIZ] {name} thiếu cột: {missing}\")\n    return df"
  },
  {
    "id": "viz--mat",
    "file": "src/viz.py",
    "name": "_mat",
    "kind": "function",
    "lineStart": 39,
    "lineEnd": 44,
    "signature": "def _mat(df: pd.DataFrame, idx: str, cols: list[str], headers: list[str], scale: float = 1.0) -> pd.DataFrame:",
    "purpose": "Trích xuất tập cột từ DataFrame KPI theo cột index thành ma trận float chuẩn bị đưa vào Seaborn heatmap (có thể nhân hệ số scale=100 cho %).",
    "flow": [
      "Kiểm tra đủ cột -> set_index(idx)[cols].astype(float) * scale -> đổi tên cột theo headers đẹp."
    ],
    "input": "df, idx, cols, headers, scale=1.0",
    "output": "pd.DataFrame ma trận số.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: ValueError, astype, set_index"
    ],
    "example": "_mat(area_s, \"analysis_area\", [\"occ_1-30_t1_mean\", ...], headers, 100.0)",
    "usage": "Dùng trong plot_review_ghost(), plot_occupancy_gap() và plot_llm_insights().",
    "potentialBugs": [
      "Nếu đặt sai thứ tự headers so với cols, nhãn trục X của heatmap sẽ bị hoán đổi."
    ],
    "viva": [
      {
        "q": "Tại sao các ô trong `plot_occupancy_gap` nhân với `scale=100.0`?",
        "a": "Vì CSV lưu tỷ lệ trong [0, 1] (vd 0.4847) nhưng heatmap hiển thị phần trăm (48.5%) để trực quan dễ đọc."
      }
    ],
    "code": "def _mat(df: pd.DataFrame, idx: str, cols: list[str], headers: list[str], scale: float = 1.0) -> pd.DataFrame:\n    if missing := [c for c in cols if c not in df.columns]:\n        raise ValueError(f\"[VIZ] Thiếu cột KPI: {missing}\")\n    mat = df.set_index(idx)[cols].astype(float) * scale\n    mat.columns = headers\n    return mat"
  },
  {
    "id": "viz--save",
    "file": "src/viz.py",
    "name": "_save",
    "kind": "function",
    "lineStart": 47,
    "lineEnd": 56,
    "signature": "def _save(fig: plt.Figure, path: Path, title: str, caption: str, use_tight: bool = True) -> Path:",
    "purpose": "Chuẩn hóa quy trình xuất ảnh PNG 150 DPI theo 5 điểm kiểm tra hình: gắn Action Title ở trên, bọc dòng Caption nguồn/cỡ mẫu ở dưới và cân chỉnh khoảng đệm không bị đè chữ.",
    "flow": [
      "Bọc dòng caption theo chiều rộng figure bằng textwrap.fill.",
      "Đặt suptitle ở y=0.985 và caption nguồn ở đáy figure (0.015, 0.015).",
      "Tự tính vùng rect cho tight_layout (nếu use_tight=True) và gọi fig.savefig(path, dpi=150, bbox_inches=\"tight\")."
    ],
    "input": "fig, path, title, caption, use_tight=True",
    "output": "Path tới ảnh PNG đã lưu.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: fill, get_figheight, get_figwidth, int, join, len, max, min, mkdir, savefig, splitlines, suptitle"
    ],
    "example": "_save(fig, out_dir / \"kpi_ppg_snapshots.png\", title, caption)",
    "usage": "Gọi ở câu lệnh return của toàn bộ 8 hàm plot_*().",
    "potentialBugs": [
      "Với figure phức tạp dùng GridSpec riêng như plot_ppg_neighbourhood(), phải truyền use_tight=False để tight_layout không phá hỏng chú thích ở dưới."
    ],
    "viva": [
      {
        "q": "Tại sao `plot_ppg_neighbourhood()` lại gọi `_save(..., use_tight=False)`?",
        "a": "Vì biểu đồ bản đồ 4 khung tự chia bố cục bằng fig.add_gridspec(3, 2) kèm hộp chú thích ở hàng 3; chạy tight_layout() sẽ làm co méo aspect bản đồ."
      }
    ],
    "code": "def _save(fig: plt.Figure, path: Path, title: str, caption: str, use_tight: bool = True) -> Path:\n    path.parent.mkdir(parents=True, exist_ok=True)\n    wrapped = \"\\n\".join(fill(line, width=max(85, int(fig.get_figwidth() * 11.5)), break_long_words=False, break_on_hyphens=False) for line in caption.splitlines())\n    fig.suptitle(title, fontsize=13, fontweight=\"bold\", y=0.985)\n    fig.text(0.015, 0.015, wrapped, fontsize=8, va=\"bottom\", color=\"#334155\")\n    footer = min(0.28, max(0.11, (len(wrapped.splitlines()) * 11 + 16) / 72 / fig.get_figheight()))\n    if use_tight:\n        fig.tight_layout(rect=(0, footer, 1, 0.93))\n    fig.savefig(path, dpi=150, bbox_inches=\"tight\")\n    return path"
  },
  {
    "id": "viz--heatmap",
    "file": "src/viz.py",
    "name": "_heatmap",
    "kind": "function",
    "lineStart": 59,
    "lineEnd": 74,
    "signature": "def _heatmap(ax: plt.Axes, mat: pd.DataFrame, title: str, cbar: str, cmap: str, fmt: str = \".1f\", vmin: float | None = 0.0, vmax: float | None = None, center: float | None = None, counts: pd.DataFrame | None = None, nums: pd.DataFrame | None = None) -> None:",
    "purpose": "Hàm vẽ Heatmap tùy biến: nền xám cho NA, chú thích kèm phân số/cỡ mẫu (vd `2.31 (3/130)`), và điền nhãn chữ \"NA\" rõ ràng tại các ô bị thiếu.",
    "flow": [
      "Đặt màu nền #E5E7EB cho ô mặt nạ (mat.isna()).",
      "Nếu có bảng counts (và nums): tự dựng bảng chuỗi annot chứa giá trị + cỡ mẫu trong ngoặc.",
      "Vẽ sns.heatmap(mask=mat.isna(), ...) rồi duyệt np.argwhere(mat.isna()) để viết chữ \"NA\" ở tâm ô khuyết."
    ],
    "input": "ax, mat, title, cbar, cmap, fmt, vmin, vmax, center, counts, nums",
    "output": "None; vẽ trực tiếp lên đối tượng matplotlib Axes.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: DataFrame, argwhere, full, heatmap, int, isna, notna, set, set_facecolor, text, tick_params, to_numpy"
    ],
    "example": "_heatmap(ax2, gh_m, \"Ghost Rate (%)\", ..., counts=gh_n, nums=gh_c)",
    "usage": "Dùng trong plot_review_ghost(), plot_occupancy_gap() và plot_llm_insights().",
    "potentialBugs": [
      "Phải truyền thêm `fmt=\"\"` cho sns.heatmap khi dùng annot dạng chuỗi tùy biến để tránh lỗi format string."
    ],
    "viva": [
      {
        "q": "Cách `viz.py` minh bạch hóa các ô khuyết mẫu (như RV ở Q1 hay quận ít mẫu) trên Heatmap là gì?",
        "a": "Đắp mặt nạ `mask=mat.isna()` trên nền xám nhạt + viết nhãn chữ `\"NA\"` giữa ô và luôn in `(u/c)` hoặc `(n=c)` kèm dưới mỗi giá trị."
      }
    ],
    "code": "def _heatmap(ax: plt.Axes, mat: pd.DataFrame, title: str, cbar: str, cmap: str, fmt: str = \".1f\", vmin: float | None = 0.0, vmax: float | None = None, center: float | None = None, counts: pd.DataFrame | None = None, nums: pd.DataFrame | None = None) -> None:\n    ax.set_facecolor(\"#E5E7EB\")\n    if counts is not None:\n        num_rows = nums.to_numpy() if nums is not None else np.full(mat.shape, np.nan)\n        annot = pd.DataFrame(\n            [[(f\"{v:{fmt}}\\n({int(u)}/{int(c)})\" if pd.notna(u) else f\"{v:{fmt}}\\n(n={int(c)})\") if pd.notna(v) and pd.notna(c) else \"\" for v, u, c in zip(vr, ur, cr)] for vr, ur, cr in zip(mat.to_numpy(), num_rows, counts.to_numpy())],\n            index=mat.index, columns=mat.columns,\n        )\n        sns.heatmap(mat, mask=mat.isna(), annot=annot, fmt=\"\", annot_kws={\"fontsize\": 8}, cmap=cmap, vmin=vmin, vmax=vmax, center=center, linewidths=0.6, linecolor=\"white\", cbar_kws={\"label\": cbar, \"shrink\": 0.85}, ax=ax)\n    else:\n        sns.heatmap(mat, mask=mat.isna(), annot=True, fmt=fmt, annot_kws={\"fontsize\": 9}, cmap=cmap, vmin=vmin, vmax=vmax, center=center, linewidths=0.6, linecolor=\"white\", cbar_kws={\"label\": cbar, \"shrink\": 0.85}, ax=ax)\n    for r, c in np.argwhere(mat.isna().to_numpy()):\n        ax.text(c + 0.5, r + 0.5, \"NA\", ha=\"center\", va=\"center\", fontsize=8, color=\"#365784\")\n    ax.set(title=title, xlabel=\"\")\n    ax.tick_params(axis=\"x\", labelrotation=0, labelsize=9)\n    ax.tick_params(axis=\"y\", labelrotation=0, labelsize=9)"
  },
  {
    "id": "viz--load-geojson",
    "file": "src/viz.py",
    "name": "_load_geojson",
    "kind": "function",
    "lineStart": 77,
    "lineEnd": 92,
    "signature": "def _load_geojson(path: Path) -> list[tuple[str, list[np.ndarray]]]:",
    "purpose": "Đọc trực tiếp tệp ranh giới hành chính GeoJSON bằng module json thuần thành danh sách đa giác NumPy cho từng quận mà không cần GeoPandas.",
    "flow": [
      "Đọc và parse JSON từ data/processed/neighbourhoods.geojson.",
      "Lặp qua features: đọc thuộc tính \"neighbourhood\", trích vòng tọa độ ngoài cho cả Polygon và MultiPolygon.",
      "Chuyển từng ring thành mảng NumPy (N, 2) tọa độ (lon, lat); lọc bỏ ring < 3 đỉnh."
    ],
    "input": "path (Path tới neighbourhoods.geojson)",
    "output": "list[(ten_quan: str, rings: list[np.ndarray])].",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: FileNotFoundError, ValueError, append, asarray, get, is_file, len, loads, read_text, relative_to, str, strip"
    ],
    "example": "features = _load_geojson(Path(\"data/processed/neighbourhoods.geojson\")) -> 16 quận CDMX.",
    "usage": "Được plot_ppg_neighbourhood() gọi để lấy hình dạng 16 quận.",
    "potentialBugs": [
      "Chỉ lấy vòng bao ngoài của đa giác (ring 0); nếu một quận có \"lỗ thủng\" rỗng bên trong (interior hole) thì ring ngoài vẫn phủ qua."
    ],
    "viva": [
      {
        "q": "Vì sao nhóm tự viết `_load_geojson()` đọc JSON thuần thay vì cài GeoPandas?",
        "a": "GeoPandas phụ thuộc vào GDAL/Fiona rất dễ lỗi biên dịch trên Windows/Python 3.14; đọc JSON + matplotlib Polygon chỉ tốn ~15 dòng code thuần gọn nhẹ."
      }
    ],
    "code": "def _load_geojson(path: Path) -> list[tuple[str, list[np.ndarray]]]:\n    if not path.is_file():\n        raise FileNotFoundError(f\"[VIZ] Thiếu {path.relative_to(ROOT)}; hãy chạy lại filter_data_from_sheet.py.\")\n    data = json.loads(path.read_text(encoding=\"utf-8\"))\n    features: list[tuple[str, list[np.ndarray]]] = []\n    for feat in data.get(\"features\", []):\n        name = str(feat.get(\"properties\", {}).get(\"neighbourhood\", \"\")).strip()\n        geom = feat.get(\"geometry\") or {}\n        gtype, coords = geom.get(\"type\"), geom.get(\"coordinates\") or []\n        raw_rings = [coords[0]] if gtype == \"Polygon\" and coords else [p[0] for p in coords if p] if gtype == \"MultiPolygon\" else []\n        rings = [np.asarray(r, dtype=float) for r in raw_rings if len(r) >= 3]\n        if name and rings:\n            features.append((name, rings))\n    if not features:\n        raise ValueError(f\"[VIZ] Không đọc được đa giác quận từ {path}.\")\n    return features"
  },
  {
    "id": "viz--centroid",
    "file": "src/viz.py",
    "name": "_centroid",
    "kind": "function",
    "lineStart": 95,
    "lineEnd": 105,
    "signature": "def _centroid(rings: list[np.ndarray]) -> tuple[float, float]:",
    "purpose": "Tính tọa độ tâm hình học chính xác theo công thức Shoelace (tổng hợp diện tích đa giác có hướng) để đặt số thứ hạng #1..#15 nằm gọn giữa lòng quận.",
    "flow": [
      "Tìm mảnh đa giác có diện tích lớn nhất trong rings (đối với MultiPolygon).",
      "Tính cross = x0*y1 - x1*y0 và diện tích 2*A = cross.sum().",
      "Tính tọa độ trọng tâm (cx, cy) theo công thức đa giác; fallback về mean() nếu diện tích tiệm cận 0."
    ],
    "input": "rings (list[np.ndarray])",
    "output": "Tuple (cx: float, cy: float).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: abs, array, float, max, mean, roll, sum"
    ],
    "example": "cx, cy = _centroid(rings) -> đặt nhãn #1 trên đa giác Cuauhtémoc.",
    "usage": "Được plot_ppg_neighbourhood() gọi để gắn số thứ hạng lên 15 quận.",
    "potentialBugs": [
      "Với các quận hình lưỡi liềm cực kỳ lõm, trọng tâm hình học lý thuyết có thể rơi gần rìa nhưng đa phần quận CDMX lồi ổn định."
    ],
    "viva": [
      {
        "q": "Tại sao tính tâm bằng diện tích Shoelace tốt hơn lấy trung bình cộng tọa độ đỉnh `pts.mean(axis=0)`?",
        "a": "Vì trung bình đỉnh bị kéo lệch về phía các đoạn đường biên có nhiều điểm gấp khúc (vd ven sông/rìa núi) chứ không phải tâm diện tích thực của quận."
      }
    ],
    "code": "def _centroid(rings: list[np.ndarray]) -> tuple[float, float]:\n    best_area, best_xy = -1.0, rings[0].mean(axis=0)\n    for pts in rings:\n        x0, y0 = pts[:, 0], pts[:, 1]\n        x1, y1 = np.roll(x0, -1), np.roll(y0, -1)\n        cross = x0 * y1 - x1 * y0\n        area2 = float(cross.sum())\n        if abs(area2) > max(1e-12, best_area):\n            best_area = abs(area2)\n            best_xy = np.array([((x0 + x1) * cross).sum(), ((y0 + y1) * cross).sum()]) / (3.0 * area2)\n    return float(best_xy[0]), float(best_xy[1])"
  },
  {
    "id": "viz-plot-ppg-riqr",
    "file": "src/viz.py",
    "name": "plot_ppg_riqr",
    "kind": "function",
    "lineStart": 108,
    "lineEnd": 143,
    "signature": "def plot_ppg_riqr(listing: pd.DataFrame, area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ biểu đồ 2 khung (kpi_ppg_riqr_2026-06-15.png): Trái là Boxplot PPG theo loại phòng (trục X thang log); Phải là cột ngang rIQR(PPG) & Trung vị theo 8 khu vực A01–A08.",
    "flow": [
      "Đọc snapshot cuối từ snap.iloc[-1]; lọc các dòng có PPG > 0.",
      "Khung trái: vẽ sns.boxplot(..., log_scale=True, palette=\"colorblind\") chia hue room_type.",
      "Khung phải: vẽ thanh ngang barh rIQR(PPG) kèm nhãn `rIQR (Med M)`.",
      "Lưu ảnh qua _save() với tiêu đề nêu nổi bật khu vực đắt nhất A05."
    ],
    "input": "listing, area, snap, city, area_col, out_dir, cur=\"MXN\"",
    "output": "Tuple (Path, plt.Figure) -> figures/kpi_ppg_riqr_2026-06-15.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: ValueError, _save, any, astype, bar_label, barh, boxplot, copy, fillna, float, get_legend, grid"
    ],
    "example": "A05 dẫn đầu Median PPG (819 MXN, rIQR=0.660); A08 thấp nhất (428 MXN, rIQR=0.953).",
    "usage": "Job thứ 1 trong main() của src/viz.py.",
    "potentialBugs": [
      "Nếu không bật log_scale=True trên boxplot, 2% căn đầu cơ giá cực cao sẽ ép toàn bộ phần hộp dữ liệu chính co rúm sát lề trái."
    ],
    "viva": [
      {
        "q": "Nhìn vào `kpi_ppg_riqr_2026-06-15.png`, vì sao phải ghép cả Boxplot (trái) và thanh rIQR (phải)?",
        "a": "Boxplot cho thấy phân bố từng nhóm phòng (Entire vs Private) cùng outlier đuôi phải, còn rIQR cho thấy mức độ đồng đều chuẩn hóa (A05 đồng đều hơn A08)."
      }
    ],
    "code": "def plot_ppg_riqr(listing: pd.DataFrame, area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    final = snap.iloc[-1]\n    dt, t = str(final[\"snapshot\"]), str(final[\"label\"])\n    ppg_col, n_col, riqr_col, med_col = f\"ppg_{t}\", f\"valid_ppg_{t}\", f\"riqr_ppg_{t}\", f\"median_ppg_{t}\"\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    areas = area_s[area_col].astype(str).tolist()\n\n    valid = listing.loc[pd.to_numeric(listing[ppg_col], errors=\"coerce\") > 0].copy()\n    valid[ppg_col] = pd.to_numeric(valid[ppg_col], errors=\"coerce\")\n    valid[\"room_type\"] = valid[\"room_type\"].fillna(\"Không rõ\").astype(str)\n    if valid.empty:\n        raise ValueError(f\"[VIZ] Không có giá trị dương ở {ppg_col}.\")\n    room_types = sorted(valid[\"room_type\"].unique())\n\n    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15.5, max(6.0, 0.65 * len(areas) + 2.5)), sharey=True, gridspec_kw={\"width_ratios\": [1.5, 1.0]})\n    sns.boxplot(data=valid, x=ppg_col, y=area_col, hue=\"room_type\", log_scale=True, order=areas, hue_order=room_types, palette=\"colorblind\", dodge=True, fliersize=2, linewidth=0.9, ax=ax1)\n    ax1.set_title(\"Phân bố PPG theo loại phòng (thang log)\", fontsize=11, pad=26)\n    ax1.set(xlabel=f\"PPG ({cur}/khách/đêm; thang log)\", ylabel=\"Khu vực (n PPG hợp lệ sau QA)\")\n    ax1.set_yticks(range(len(areas)), labels=[f\"{r[area_col]} (n={int(r[n_col]) if pd.notna(r[n_col]) else 0})\" for _, r in area_s.iterrows()])\n    if ax1.get_legend():\n        sns.move_legend(ax1, \"lower left\", bbox_to_anchor=(0, 1.01), ncol=len(room_types), frameon=False, title=\"\", fontsize=9)\n\n    riqr, med = pd.to_numeric(area_s[riqr_col], errors=\"coerce\"), pd.to_numeric(area_s[med_col], errors=\"coerce\")\n    bars = ax2.barh(range(len(areas)), riqr, color=\"#0F766E\", height=0.6)\n    ax2.bar_label(bars, labels=[f\"{r:.3f} (Med {m:.0f})\" if pd.notna(r) and pd.notna(m) else \"NA\" for r, m in zip(riqr, med)], padding=4, fontsize=9)\n    ax2.set_xlim(0, max(1.0, float(riqr.max(skipna=True)) if riqr.notna().any() else 1.0) * 1.38)\n    ax2.set_title(\"Độ phân tán tương đối rIQR(PPG) theo khu vực\", fontsize=11, pad=26)\n    ax2.set(xlabel=\"rIQR(PPG) = IQR / Trung vị (không thứ nguyên)\")\n    ax2.tick_params(axis=\"y\", labelleft=False)\n    ax2.grid(axis=\"x\", alpha=0.25)\n\n    top_area = area_s.loc[med.idxmax(), area_col] if med.notna().any() else \"N/A\"\n    ppg_n = int(final[\"valid_ppg_count\"]) if pd.notna(final[\"valid_ppg_count\"]) else 0\n    caption = (f\"Nguồn: kpi_by_listing.csv, kpi_by_area.csv, kpi_by_snapshot.csv ({dt}) | Toàn thị trường: n={ppg_n:,}/{int(final['total_listings']):,} có PPG hợp lệ, \"\n               f\"Trung vị={final['median_ppg']} {cur}, rIQR={final['riqr_ppg']}.\")\n    return _save(fig, out_dir / f\"kpi_ppg_riqr_{dt}.png\", f\"Giá mỗi khách (PPG) & độ phân tán rIQR tại snapshot cuối — Cao nhất tại {top_area}\\n{city} | {dt}\", caption), fig"
  },
  {
    "id": "viz-plot-ppg-snapshots",
    "file": "src/viz.py",
    "name": "plot_ppg_snapshots",
    "kind": "function",
    "lineStart": 146,
    "lineEnd": 188,
    "signature": "def plot_ppg_snapshots(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ lưới 4 khung Small Multiples (kpi_ppg_snapshots.png) cùng trục X [0, xmax] để so sánh trực tiếp Trung vị PPG qua t1–t4 và hiển thị khung cảnh báo đỏ tại t2.",
    "flow": [
      "Tìm xmax chung trên toàn bộ 4 mốc để giữ cùng một thang đo.",
      "Tạo lưới 2×2 với sharex=True, sharey=True.",
      "Tại từng mốc: nếu snap_med hợp lệ -> vẽ thanh ngang + đường đứt nét trung vị thị trường; nếu t2 khuyết giá -> hiển thị hộp cảnh báo đỏ n=0/1.000."
    ],
    "input": "area, snap, city, area_col, out_dir, cur=\"MXN\"",
    "output": "Tuple (Path, plt.Figure) -> figures/kpi_ppg_snapshots.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: _save, arange, astype, atleast_1d, axvline, barh, ceil, concat, dict, dropna, enumerate, fillna"
    ],
    "example": "Median PPG toàn mẫu tăng từ 382 (t1) -> NA (t2) -> 565 (t3) -> 627 MXN (t4).",
    "usage": "Job thứ 2 trong main() của src/viz.py.",
    "potentialBugs": [
      "Nếu bỏ `sharex=True` hoặc tự động co giãn trục từng khung, sự nhảy vọt +64.1% từ t1 lên t4 sẽ bị bóp méo thị giác."
    ],
    "viva": [
      {
        "q": "Mốc t2 không có giá thì vì sao không ẩn luôn khung t2 để chỉ vẽ 3 hình cho đẹp?",
        "a": "Theo Bài 12–14, ẩn khung t2 là che giấu dữ liệu khuyết; đặt đủ 4 khung cùng trục thời gian kèm cảnh báo đỏ chứng tỏ sự minh bạch tuyệt đối."
      }
    ],
    "code": "def plot_ppg_snapshots(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    areas = area_s[area_col].astype(str).tolist()\n    y = np.arange(len(areas))\n    med_cols = [f\"median_ppg_{t}\" for t in snap[\"label\"].astype(str)]\n    all_vals = pd.concat([pd.to_numeric(area_s[c], errors=\"coerce\") for c in med_cols]).dropna()\n    xmax = (float(all_vals.max()) * 1.32) if not all_vals.empty else 1000.0\n\n    nrows = max(1, int(np.ceil(len(snap) / 2)))\n    fig, axes = plt.subplots(nrows, 2, figsize=(13.5, 4.2 * nrows + 1.0), sharex=True, sharey=True)\n    axes_flat = np.atleast_1d(axes).ravel()\n    for i, row in snap.reset_index(drop=True).iterrows():\n        ax = axes_flat[i]\n        dt, t = str(row[\"snapshot\"]), str(row[\"label\"])\n        med = pd.to_numeric(area_s[f\"median_ppg_{t}\"], errors=\"coerce\")\n        cnt = pd.to_numeric(area_s[f\"valid_ppg_{t}\"], errors=\"coerce\").fillna(0).astype(int)\n        snap_n = int(row[\"valid_ppg_count\"]) if pd.notna(row[\"valid_ppg_count\"]) else 0\n        snap_tot = int(row[\"total_listings\"])\n        snap_med = pd.to_numeric(row[\"median_ppg\"], errors=\"coerce\")\n\n        ax.barh(y, med.fillna(0.0), height=0.62, color=\"#0F766E\")\n        for idx_y, (m, n) in enumerate(zip(med, cnt)):\n            lbl = f\"{m:.0f} (n={n})\" if pd.notna(m) and n > 0 else \"NA (n=0)\"\n            ax.text((float(m) if pd.notna(m) else 0.0) + xmax * 0.012, idx_y, lbl, va=\"center\", fontsize=8.5, color=\"#0F172A\" if n > 0 else \"#64748B\")\n        if pd.notna(snap_med):\n            ax.axvline(float(snap_med), color=\"#B45309\", linestyle=\"--\", linewidth=1.2)\n            ax.set_title(f\"{t} ({dt}) — n={snap_n:,}/{snap_tot:,} (Med={snap_med:.0f} {cur})\", fontsize=10.5)\n        else:\n            ax.text(0.55, 0.5, f\"Không có dữ liệu giá hợp lệ\\nn = 0 / {snap_tot:,}\", transform=ax.transAxes, ha=\"center\", va=\"center\", fontsize=9.5, color=\"#B91C1C\",\n                    bbox=dict(boxstyle=\"round,pad=0.35\", facecolor=\"#FEF2F2\", edgecolor=\"#FCA5A5\"))\n            ax.set_title(f\"{t} ({dt}) — n=0/{snap_tot:,} (Thiếu dữ liệu giá)\", fontsize=10.5)\n        ax.set(xlim=(0, xmax))\n        ax.set_yticks(y, labels=areas)\n        ax.grid(axis=\"x\", alpha=0.25)\n        if i % 2 == 0:\n            ax.set_ylabel(\"Khu vực phân tích\")\n        if i >= (nrows - 1) * 2:\n            ax.set_xlabel(f\"Trung vị PPG ({cur}/khách/đêm)\")\n    for ax in axes_flat[len(snap):]:\n        ax.set_visible(False)\n    axes_flat[0].invert_yaxis()\n    caption = \"Nguồn: kpi_by_area.csv, kpi_by_snapshot.csv. Đường đứt nét là trung vị PPG toàn thị trường tại từng mốc; nhãn kèm cỡ mẫu hợp lệ n sau QA.\"\n    return _save(fig, out_dir / \"kpi_ppg_snapshots.png\", f\"So sánh Trung vị PPG giữa các mốc thời gian (cùng thang đo)\\n{city}\", caption), fig"
  },
  {
    "id": "viz--sample-tag",
    "file": "src/viz.py",
    "name": "_sample_tag",
    "kind": "function",
    "lineStart": 191,
    "lineEnd": 195,
    "signature": "def _sample_tag(row: pd.Series, vp_col: str, vg_col: str) -> str:",
    "purpose": "Định dạng chuỗi chú thích cỡ mẫu ngắn gọn cho từng quận: nếu valid_price == valid_ppg thì ghi \"n=514/525\", ngược lại tách rõ \"p=..., ppg=.../...\".",
    "flow": [
      "Đọc vp, vg, tot; so sánh vp == vg để quyết định chuỗi định dạng."
    ],
    "input": "row (pd.Series), vp_col (str), vg_col (str)",
    "output": "str (ví dụ \"n=514/525\").",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: int, notna"
    ],
    "example": "_sample_tag(cuauhtemoc_row, \"valid_price_t4\", \"valid_ppg_t4\") -> \"n=514/525\"",
    "usage": "Dùng chung trong chú thích của cả plot_ppg_neighbourhood() và plot_riqr_neighbourhood().",
    "potentialBugs": [
      "Tránh hiển thị nhầm một mẫu số chung khi thành phố khác có lỗi thiếu health check `accommodates`."
    ],
    "viva": [
      {
        "q": "Trong chú thích bản đồ CDMX, `n=51/53` tại Coyoacán nghĩa là gì?",
        "a": "Có 53 listing phân công ở Coyoacán và trong đó có 51 listing có giá + PPG hợp lệ sau QA ở mốc t4."
      }
    ],
    "code": "def _sample_tag(row: pd.Series, vp_col: str, vg_col: str) -> str:\n    vp = int(row[vp_col]) if pd.notna(row[vp_col]) else 0\n    vg = int(row[vg_col]) if pd.notna(row[vg_col]) else 0\n    tot = int(row[\"total_listings\"]) if pd.notna(row[\"total_listings\"]) else 0\n    return f\"n={vp}/{tot}\" if vp == vg else f\"p={vp}, ppg={vg}/{tot}\""
  },
  {
    "id": "viz-plot-ppg-neighbourhood",
    "file": "src/viz.py",
    "name": "plot_ppg_neighbourhood",
    "kind": "function",
    "lineStart": 198,
    "lineEnd": 298,
    "signature": "def plot_ppg_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, geo_path: Path, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ bản đồ Choropleth 4 khung (Price Mean/Median hàng trên; PPG Mean/Median hàng dưới) kèm đa giác Tláhuac gạch chéo và bảng mã quận #1..#15.",
    "flow": [
      "Đọc đa giác 16 quận qua _load_geojson() và tính geo_aspect hiệu chỉnh tỉ lệ kinh/vĩ độ.",
      "Tạo 2 chuẩn màu Normalize dùng chung: price_norm cho hàng Price, ppg_norm cho hàng PPG.",
      "Lặp từng quận vẽ Patch Polygon; tô xám hatch=\"///\" cho Tláhuac; đặt số thứ hạng #1..#15 tại _centroid().",
      "Vẽ bảng chú giải 3 cột ở phía dưới khớp chính xác #rank -> tên quận + cỡ mẫu."
    ],
    "input": "nb, snap, geo_path, city, out_dir, cur=\"MXN\"",
    "output": "Tuple (Path, plt.Figure) -> figures/kpi_ppg_neighbourhood.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: MaxNLocator, Normalize, Patch, Polygon, ScalarMappable, ValueError, _centroid, _load_geojson, _norm, _sample_tag, _save, add_gridspec"
    ],
    "example": "Xochimilco #1 Mean Price (3.848 MXN) nhưng tụt xuống #11 Median PPG (377 MXN); Miguel Hidalgo #1 Median PPG (706 MXN).",
    "usage": "Job thứ 3 trong main() của src/viz.py.",
    "potentialBugs": [
      "Nếu không chia chuẩn `geo_aspect = 1 / cos(radians(lat))`, bản đồ CDMX (vĩ độ ~19.4°N) sẽ bị dẹt theo chiều ngang/dọc."
    ],
    "viva": [
      {
        "q": "Vì sao hàng trên (Price Mean & Median) bắt buộc phải dùng chung một thanh colorbar `price_norm`?",
        "a": "Nếu mỗi khung tự scale màu từ min đến max của riêng nó, Cuauhtémoc có Mean 3.529 và Median 2.215 sẽ đều tô màu đỏ sẫm như nhau -> che lấp tác động của outlier."
      }
    ],
    "code": "def plot_ppg_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, geo_path: Path, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    features = _load_geojson(geo_path)\n    final = snap.iloc[-1]\n    dt, t = str(final[\"snapshot\"]), str(final[\"label\"])\n    price_col, med_price_col = f\"mean_price_{cur.lower()}_{t}\", f\"median_price_{cur.lower()}_{t}\"\n    ppg_col, med_ppg_col = f\"mean_ppg_{t}\", f\"median_ppg_{t}\"\n    vp_col, vg_col, rp_col = f\"valid_price_{t}\", f\"valid_ppg_{t}\", f\"rank_price_{t}\"\n\n    nb_s = nb.copy()\n    for c in (price_col, med_price_col, ppg_col, med_ppg_col, vp_col, vg_col, rp_col, \"total_listings\"):\n        if c not in nb_s.columns:\n            raise ValueError(f\"[VIZ] kpi_by_neighbourhood.csv thiếu cột: {c}\")\n        nb_s[c] = pd.to_numeric(nb_s[c], errors=\"coerce\")\n    nb_s = nb_s.sort_values([rp_col, \"neighbourhood_cleansed\"], ascending=[True, True], na_position=\"last\").reset_index(drop=True)\n    nb_idx = nb_s.set_index(\"neighbourhood_cleansed\")\n\n    pts = np.vstack([r for _, rings in features for r in rings])\n    xmin, ymin = pts.min(axis=0)\n    xmax, ymax = pts.max(axis=0)\n    geo_aspect = 1.0 / np.cos(np.radians(0.5 * (ymin + ymax)))\n    tot_price = int(final[\"valid_price_count\"]) if pd.notna(final[\"valid_price_count\"]) else 0\n    tot_ppg = int(final[\"valid_ppg_count\"]) if pd.notna(final[\"valid_ppg_count\"]) else 0\n    tot_all = int(final[\"total_listings\"])\n\n    def _norm(vals: pd.Series) -> Normalize:\n        clean = vals.dropna()\n        vmin, vmax = (float(clean.min()) * 0.95, float(clean.max()) * 1.02) if not clean.empty else (0.0, 1.0)\n        return Normalize(vmin=vmin, vmax=max(vmax, vmin + 1e-6))\n\n    price_norm = _norm(pd.concat([nb_idx[price_col], nb_idx[med_price_col]]))\n    ppg_norm = _norm(pd.concat([nb_idx[ppg_col], nb_idx[med_ppg_col]]))\n\n    fig = plt.figure(figsize=(11.2, 13.2))\n    gs = fig.add_gridspec(3, 2, height_ratios=[1.0, 1.0, 0.28], hspace=0.16, wspace=0.16, left=0.08, right=0.92, bottom=0.09, top=0.91)\n    axes = [fig.add_subplot(gs[r, c]) for r in range(2) for c in range(2)]\n    cmap = plt.get_cmap(\"YlOrRd\")\n    map_specs = [\n        (axes[0], price_col, vp_col, price_norm, f\"Giá đêm ({cur}/đêm)\", f\"Price Mean theo quận ({t}, n={tot_price:,}/{tot_all:,})\"),\n        (axes[1], med_price_col, vp_col, price_norm, f\"Giá đêm ({cur}/đêm)\", f\"Price Median theo quận ({t}, n={tot_price:,}/{tot_all:,})\"),\n        (axes[2], ppg_col, vg_col, ppg_norm, f\"PPG ({cur}/khách/đêm)\", f\"PPG Mean theo quận ({t}, n={tot_ppg:,}/{tot_all:,})\"),\n        (axes[3], med_ppg_col, vg_col, ppg_norm, f\"PPG ({cur}/khách/đêm)\", f\"PPG Median theo quận ({t}, n={tot_ppg:,}/{tot_all:,})\"),\n    ]\n    for ax, m_col, n_col, norm, cbar_lbl, sub in map_specs:\n        has_missing_poly = False\n        for name, rings in features:\n            in_kpi = name in nb_idx.index\n            v = nb_idx[m_col].get(name, np.nan) if in_kpi else np.nan\n            cnt = int(nb_idx[n_col].get(name, 0)) if in_kpi and pd.notna(nb_idx[n_col].get(name, 0)) else 0\n            rk = nb_idx[rp_col].get(name, np.nan) if in_kpi else np.nan\n            if (not in_kpi) or pd.isna(v) or cnt == 0:\n                has_missing_poly = True\n                for ring in rings:\n                    ax.add_patch(Polygon(ring, closed=True, facecolor=\"#E5E7EB\", edgecolor=\"#64748B\", hatch=\"///\", linewidth=0.0, zorder=1))\n                    ax.add_patch(Polygon(ring, closed=True, facecolor=\"none\", edgecolor=\"#1E293B\", linewidth=0.9, zorder=1.5))\n            else:\n                face = cmap(norm(float(v)))\n                for ring in rings:\n                    ax.add_patch(Polygon(ring, closed=True, facecolor=face, edgecolor=\"#1E293B\", linewidth=0.9, zorder=1))\n            if pd.notna(rk):\n                cx, cy = _centroid(rings)\n                ax.text(cx, cy, str(int(rk)), ha=\"center\", va=\"center\", fontsize=7.5, fontweight=\"bold\", color=\"#0F172A\",\n                        bbox=dict(boxstyle=\"round,pad=0.14\", facecolor=\"white\", edgecolor=\"#94A3B8\", linewidth=0.5, alpha=0.82), zorder=2)\n        if has_missing_poly:\n            ax.legend(\n                handles=[Patch(facecolor=\"#E5E7EB\", edgecolor=\"#64748B\", hatch=\"///\", label=\"Không có trong mẫu / NA\")],\n                loc=\"lower left\", fontsize=8, frameon=True, facecolor=\"white\", edgecolor=\"#CBD5E1\",\n            )\n        ax.set(xlim=(xmin - 0.015, xmax + 0.015), ylim=(ymin - 0.015, ymax + 0.015), title=sub)\n        ax.xaxis.set_major_locator(MaxNLocator(4))\n        ax.set_aspect(geo_aspect, anchor=\"N\")\n        ax.grid(alpha=0.2, zorder=0)\n        fig.colorbar(cm.ScalarMappable(norm=norm, cmap=cmap), ax=ax, fraction=0.046, pad=0.025, label=cbar_lbl)\n    for ax in (axes[0], axes[2]):\n        ax.set_ylabel(\"Vĩ độ (lat)\")\n    for ax in (axes[1], axes[3]):\n        ax.tick_params(labelleft=False)\n    for ax in (axes[0], axes[1]):\n        ax.tick_params(labelbottom=False)\n    for ax in (axes[2], axes[3]):\n        ax.set_xlabel(\"Kinh độ (lon)\")\n\n    ax_leg = fig.add_subplot(gs[2, :])\n    ax_leg.set(xlim=(0, 1), ylim=(0, 1), xticks=[], yticks=[])\n    ax_leg.set_facecolor(\"#F8FAFC\")\n    for sp in ax_leg.spines.values():\n        sp.set_visible(True)\n        sp.set_color(\"#CBD5E1\")\n        sp.set_linewidth(0.9)\n    ax_leg.text(0.012, 0.87, f\"Chú thích mã quận theo thứ tự Price Mean ({t}) & cỡ mẫu (n hợp lệ / tổng):\", fontsize=9.5, fontweight=\"bold\", color=\"#0F172A\", va=\"center\")\n    ncols = 3\n    nrows = max(1, int(np.ceil(len(nb_s) / ncols)))\n    for idx, (_, r) in enumerate(nb_s.iterrows()):\n        rk_txt = str(int(r[rp_col])) if pd.notna(r[rp_col]) else \"-\"\n        col_i, row_i = idx // nrows, idx % nrows\n        ax_leg.text(0.012 + col_i * 0.335, 0.69 - row_i * 0.155, f\"#{rk_txt}  {r['neighbourhood_cleansed']} ({_sample_tag(r, vp_col, vg_col)})\", fontsize=9.0, color=\"#1E293B\", va=\"center\")\n\n    caption = (\n        f\"Nguồn: kpi_by_neighbourhood.csv, kpi_by_snapshot.csv, neighbourhoods.geojson ({dt}) | \"\n        f\"Mỗi hàng dùng chung thang màu ({cur}/đêm cho Price; {cur}/khách/đêm cho PPG); số trên cả 4 bản đồ đánh theo rank_price_{t} ({len(nb_s)}/{len(features)} quận có mẫu; vùng xám gạch chéo không nằm trong mẫu).\"\n    )\n    return _save(fig, out_dir / \"kpi_ppg_neighbourhood.png\", f\"Bản đồ phân bố Price & PPG (Mean vs Median) theo quận ({tot_all:,} listings)\\n{city} | {dt}\", caption, use_tight=False), fig"
  },
  {
    "id": "viz-plot-riqr-neighbourhood",
    "file": "src/viz.py",
    "name": "plot_riqr_neighbourhood",
    "kind": "function",
    "lineStart": 301,
    "lineEnd": 349,
    "signature": "def plot_riqr_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ 2 biểu đồ cột ngang song song so sánh rIQR(Price) và rIQR(PPG) của 15 quận có mẫu, kèm đường đứt nét tham chiếu toàn thị trường.",
    "flow": [
      "Sắp xếp 15 quận giảm dần theo total_listings (từ Cuauhtémoc 525 xuống Milpa Alta 1).",
      "Vẽ rIQR(Price) (trái, cam) và rIQR(PPG) (phải, xanh teal) chung trục X [0, xmax].",
      "Gắn đường đứt nét toàn thị trường và ghi chú trên nhãn: `rIQR (Med M)`."
    ],
    "input": "nb, snap, city, out_dir, cur=\"MXN\"",
    "output": "Tuple (Path, plt.Figure) -> figures/kpi_riqr_neighbourhood.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: ValueError, _sample_tag, _save, arange, axvline, bar_label, barh, concat, copy, dict, dropna, fillna"
    ],
    "example": "Tlalpan: rIQR(Price)=1.395, rIQR(PPG)=1.100; Xochimilco (n=5): rIQR(Price)=2.264 -> rIQR(PPG)=0.421.",
    "usage": "Job thứ 4 trong main() của src/viz.py.",
    "potentialBugs": [
      "Phải sắp theo `total_listings` chứ không sắp theo rIQR để người xem thấy ngay quận nào có cỡ mẫu đáng tin cậy (trên) vs tham khảo n < 5 (dưới cùng)."
    ],
    "viva": [
      {
        "q": "Tại sao trên biểu đồ `kpi_riqr_neighbourhood.png`, Xochimilco đứng cuối bảng với thanh cam rIQR(Price) dài nhất nhưng thanh xanh rIQR(PPG) lại ngắn?",
        "a": "Do 5 căn ở Xochimilco chênh nhau rất mạnh về sức chứa (phòng nhỏ vs nhà vườn 12–14 khách); khi chia giá cho sức chứa thì giá mỗi người trở nên đồng đều hơn hẳn."
      }
    ],
    "code": "def plot_riqr_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    final = snap.iloc[-1]\n    dt, t = str(final[\"snapshot\"]), str(final[\"label\"])\n    riqr_p_col, med_p_col, vp_col = f\"riqr_price_{t}\", f\"median_price_{cur.lower()}_{t}\", f\"valid_price_{t}\"\n    riqr_g_col, med_g_col, vg_col = f\"riqr_ppg_{t}\", f\"median_ppg_{t}\", f\"valid_ppg_{t}\"\n\n    nb_s = nb.copy()\n    for c in (riqr_p_col, med_p_col, vp_col, riqr_g_col, med_g_col, vg_col, \"total_listings\"):\n        if c not in nb_s.columns:\n            raise ValueError(f\"[VIZ] kpi_by_neighbourhood.csv thiếu cột: {c}\")\n        nb_s[c] = pd.to_numeric(nb_s[c], errors=\"coerce\")\n    nb_s = nb_s.sort_values([\"total_listings\", vp_col, \"neighbourhood_cleansed\"], ascending=[False, False, True], na_position=\"last\").reset_index(drop=True)\n\n    y = np.arange(len(nb_s))\n    all_riqr = pd.concat([nb_s[riqr_p_col], nb_s[riqr_g_col]]).dropna()\n    xmax = max(1.0, float(all_riqr.max())) * 1.38 if not all_riqr.empty else 1.5\n    mkt_p, mkt_g = pd.to_numeric(final[\"riqr_price\"], errors=\"coerce\"), pd.to_numeric(final[\"riqr_ppg\"], errors=\"coerce\")\n\n    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15.5, max(6.0, 0.48 * len(nb_s) + 2.6)), sharey=True, sharex=True)\n    specs = [\n        (ax1, riqr_p_col, med_p_col, mkt_p, \"#D97706\", f\"rIQR(Price) theo quận ({t})\", \"rIQR(Price) = IQR / Trung vị (không thứ nguyên)\"),\n        (ax2, riqr_g_col, med_g_col, mkt_g, \"#0F766E\", f\"rIQR(PPG) theo quận ({t})\", \"rIQR(PPG) = IQR / Trung vị (không thứ nguyên)\"),\n    ]\n    for ax, r_col, m_col, mkt_val, color, sub, xl in specs:\n        vals, meds = nb_s[r_col], nb_s[m_col]\n        bars = ax.barh(y, vals.fillna(0.0), height=0.62, color=color, zorder=2)\n        labels = [f\"{r:.3f} (Med {m:,.0f})\" if pd.notna(r) and pd.notna(m) else \"NA\" for r, m in zip(vals, meds)]\n        txts = ax.bar_label(bars, labels=labels, padding=4, fontsize=8.5, zorder=4)\n        for txt in txts:\n            txt.set_bbox(dict(boxstyle=\"square,pad=0.06\", facecolor=\"white\", edgecolor=\"none\", alpha=0.85))\n        if pd.notna(mkt_val):\n            ax.axvline(float(mkt_val), color=\"#1E293B\", linestyle=\"--\", linewidth=1.2, zorder=3, label=f\"Toàn thị trường: {float(mkt_val):.3f}\")\n            ax.legend(loc=\"lower right\", fontsize=8.5, frameon=True, facecolor=\"white\", edgecolor=\"#CBD5E1\")\n        ax.set(xlim=(0, xmax), title=sub, xlabel=xl)\n        ax.grid(axis=\"x\", alpha=0.25, zorder=0)\n\n    y_labels = [f\"{r['neighbourhood_cleansed']} ({_sample_tag(r, vp_col, vg_col)})\" for _, r in nb_s.iterrows()]\n    ax1.set_yticks(y, labels=y_labels, fontsize=9)\n    ax1.set_ylabel(\"Quận (cỡ mẫu hợp lệ / tổng)\")\n    ax1.invert_yaxis()\n    ax2.tick_params(axis=\"y\", labelleft=False)\n\n    caption = (\n        f\"Nguồn: kpi_by_neighbourhood.csv, kpi_by_snapshot.csv ({dt}) | \"\n        f\"Đường đứt nét là rIQR toàn thị trường (Price={float(mkt_p):.3f}, PPG={float(mkt_g):.3f}); quận có n < 5 chỉ mang tính tham khảo.\"\n        if pd.notna(mkt_p) and pd.notna(mkt_g)\n        else f\"Nguồn: kpi_by_neighbourhood.csv, kpi_by_snapshot.csv ({dt}) | Quận có n < 5 chỉ mang tính tham khảo.\"\n    )\n    return _save(fig, out_dir / \"kpi_riqr_neighbourhood.png\", f\"Độ phân tán tương đối rIQR(Price) & rIQR(PPG) theo từng quận ({t})\\n{city} | {dt}\", caption), fig"
  },
  {
    "id": "viz-plot-review-ghost",
    "file": "src/viz.py",
    "name": "plot_review_ghost",
    "kind": "function",
    "lineStart": 352,
    "lineEnd": 377,
    "signature": "def plot_review_ghost(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path) -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ 2 Heatmap ghép cặp (kpi_review_ghost.png): Trái là Review Velocity (Q1–Q3); Phải là Ghost Rate % (t1–t4) kèm chú thích phân số (ghost_count/ghost_n).",
    "flow": [
      "Chuẩn hóa ngày header qua pd.Timestamp; trích ma trận RV (scale=1) và Ghost Rate (scale=100%).",
      "Gọi _heatmap() cho cả 2 trục với bảng counts/nums để in đúng cỡ mẫu trong từng ô.",
      "Đọc và hiển thị tóm tắt RV toàn mẫu ở caption nguồn."
    ],
    "input": "area, snap, city, area_col, out_dir",
    "output": "Tuple (Path, plt.Figure) -> figures/kpi_review_ghost.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: Timestamp, _heatmap, _mat, _save, any, astype, ceil, enumerate, float, int, isfinite, iterrows"
    ],
    "example": "A04 dẫn đầu RV cả 3 quý (3.97 -> 3.01 -> 3.25); A06 cao nhất Ghost Rate t4 (2.31%, 3/130).",
    "usage": "Job thứ 5 trong main() của src/viz.py.",
    "potentialBugs": [
      "Nếu không truyền `nums=gh_c`, người xem chỉ thấy % (vd 0.77%) mà không biết đó chỉ là 1/130 căn."
    ],
    "viva": [
      {
        "q": "Tại sao Review Velocity chỉ vẽ 3 cột Q1, Q2, Q3 trong khi Ghost Rate vẽ đủ 4 cột t1, t2, t3, t4?",
        "a": "Vì RV là vận tốc biến thiên GIỮA 2 mốc (chỉ có 3 khoảng từ 4 mốc), còn Ghost Rate đo tại TỪNG thời điểm snapshot (nhưng dùng logic riêng cho t1)."
      }
    ],
    "code": "def plot_review_ghost(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path) -> tuple[Path, plt.Figure]:\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    ts, dates = snap[\"label\"].astype(str).tolist(), snap[\"snapshot\"].astype(str).tolist()\n    rv_h = [f\"Q{i} ({ts[i-1]}→{ts[i]})\\n{pd.Timestamp(dates[i-1]):%d/%m}–{pd.Timestamp(dates[i]):%d/%m/%y}\" for i in range(1, len(ts))]\n    gh_h = [f\"{t}\\n{pd.Timestamp(d):%d/%m/%Y}\" for t, d in zip(ts, dates)]\n\n    rv_m = _mat(area_s, area_col, [f\"review_velocity_q{i}_mean\" for i in range(1, len(ts))], rv_h)\n    rv_n = _mat(area_s, area_col, [f\"review_velocity_q{i}_n\" for i in range(1, len(ts))], rv_h)\n    gh_m = _mat(area_s, area_col, [f\"ghost_rate_{t}\" for t in ts], gh_h, scale=100.0)\n    gh_c = _mat(area_s, area_col, [f\"ghost_{t}_count\" for t in ts], gh_h)\n    gh_n = _mat(area_s, area_col, [f\"ghost_{t}_n\" for t in ts], gh_h)\n\n    rv_vals = rv_m.to_numpy(dtype=float)\n    rv_vmax = max(1.0, float(np.ceil(np.nanmax(rv_vals)))) if np.isfinite(rv_vals).any() else 1.0\n    gh_vals = gh_m.to_numpy(dtype=float)\n    gh_vmax = max(1.0, float(np.ceil(np.nanmax(gh_vals)))) if np.isfinite(gh_vals).any() else 1.0\n\n    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16.5, max(6.0, 0.65 * len(area_s) + 2.5)), sharey=True, gridspec_kw={\"width_ratios\": [max(1, len(rv_h)), len(gh_h)]})\n    _heatmap(ax1, rv_m, \"Review Velocity TB (review / 30 ngày)\\n(n = review_velocity_n)\", \"Review / 30 ngày\", \"Blues\", \".2f\", vmax=rv_vmax, counts=rv_n)\n    _heatmap(ax2, gh_m, \"Tỷ lệ căn hộ ma — Ghost Rate (%)\\n(ghost_count / ghost_n)\", \"Ghost Rate (%)\", \"Oranges\", \".2f\", vmax=gh_vmax, counts=gh_n, nums=gh_c)\n    ax1.set_ylabel(\"Khu vực phân tích\")\n    ax2.tick_params(axis=\"y\", labelleft=False)\n    ax2.set_ylabel(\"\")\n    rv_summary = \", \".join(f\"Q{i} (n={int(r['review_velocity_n']):,}/{int(r['total_listings']):,})\" for i, (_, r) in enumerate(snap.iloc[1:].iterrows(), 1) if pd.notna(r[\"review_velocity_n\"]))\n    caption = f\"Nguồn: kpi_by_area.csv, kpi_by_snapshot.csv. RV: {rv_summary}. Ghost (%): trong ngoặc là (ghost_count / ghost_n).\"\n    return _save(fig, out_dir / \"kpi_review_ghost.png\", f\"Tốc độ đánh giá (RV) & Tỷ lệ căn hộ đóng băng (Ghost)\\n{city} | {dates[0]} đến {dates[-1]}\", caption), fig"
  },
  {
    "id": "viz-plot-occupancy-gap",
    "file": "src/viz.py",
    "name": "plot_occupancy_gap",
    "kind": "function",
    "lineStart": 380,
    "lineEnd": 400,
    "signature": "def plot_occupancy_gap(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, exclude_ghost: bool = True) -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ bộ 3 Heatmap (kpi_occupancy_gap.png): Occ30, Occ31–90 (thang 0–100%) và Urgency Gap = Occ30 − Occ31–90 (bảng màu phân kỳ RdBu_r cân đối quanh 0.0 pp).",
    "flow": [
      "Nhân các cột occ và gap với 100.0 sang đơn vị % / pp.",
      "Tính giới hạn đối xứng `[-limit, +limit]` quanh center=0.0 cho Urgency Gap.",
      "Vẽ 3 heatmap nối tiếp qua _heatmap(), ghi chú rõ exclude_ghost ở caption."
    ],
    "input": "area, snap, city, area_col, out_dir, exclude_ghost=True",
    "output": "Tuple (Path, plt.Figure) -> figures/kpi_occupancy_gap.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: Timestamp, _heatmap, _mat, _save, abs, any, astype, ceil, float, isfinite, len, max"
    ],
    "example": "t3 (Semana Santa) đỉnh Urgency Gap (+21.38 pp); A03 tại t4 tụt còn Occ30 = 34.6%.",
    "usage": "Job thứ 6 trong main() của src/viz.py.",
    "potentialBugs": [
      "Nếu dùng colormap tuần tự (như Blues) cho Urgency Gap có thể chứa số âm và dương, biểu đồ sẽ không phân biệt trực quan hai chiều xung quanh 0."
    ],
    "viva": [
      {
        "q": "Urgency Gap dương ở 100% ô trên heatmap chứng minh điều gì và giới hạn của nó là gì?",
        "a": "Chứng minh lịch gần (1–30 ngày) luôn ít trống hơn hẳn lịch xa (31–90 ngày) do xu hướng đặt gần ngày và chủ nhà khóa lịch gần — tuy nhiên availability không phân biệt đặt thật và tự khóa."
      }
    ],
    "code": "def plot_occupancy_gap(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, exclude_ghost: bool = True) -> tuple[Path, plt.Figure]:\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    ts, dates = snap[\"label\"].astype(str).tolist(), snap[\"snapshot\"].astype(str).tolist()\n    headers = [f\"{t}\\n{pd.Timestamp(d):%d/%m/%Y}\" for t, d in zip(ts, dates)]\n    occ_n = _mat(area_s, area_col, [f\"occ_{t}_n\" for t in ts], headers)\n    occ30 = _mat(area_s, area_col, [f\"occ_1-30_{t}_mean\" for t in ts], headers, 100.0)\n    occ60 = _mat(area_s, area_col, [f\"occ_31-90_{t}_mean\" for t in ts], headers, 100.0)\n    gap = _mat(area_s, area_col, [f\"urgency_gap_{t}_mean\" for t in ts], headers, 100.0)\n    gap_vals = np.abs(gap.to_numpy(dtype=float))\n    limit = max(5.0, float(np.ceil(np.nanmax(gap_vals) / 5.0) * 5.0)) if np.isfinite(gap_vals).any() else 5.0\n\n    fig, axes = plt.subplots(1, 3, figsize=(18.5, max(6.0, 0.65 * len(area_s) + 2.5)), sharey=True)\n    _heatmap(axes[0], occ30, \"Occ30: Ngày 1–30 không khả dụng\", \"Tỷ lệ không khả dụng (%)\", \"Blues\", \".1f\", vmax=100.0, counts=occ_n)\n    _heatmap(axes[1], occ60, \"Occ31–90: Ngày 31–90 không khả dụng\", \"Tỷ lệ không khả dụng (%)\", \"Blues\", \".1f\", vmax=100.0, counts=occ_n)\n    _heatmap(axes[2], gap, \"Urgency Gap = Occ30 − Occ31–90\", \"Điểm phần trăm (pp)\", \"RdBu_r\", \".1f\", vmin=-limit, vmax=limit, center=0.0, counts=occ_n)\n    axes[0].set_ylabel(\"Khu vực phân tích\")\n    for ax in axes[1:]:\n        ax.set_ylabel(\"\")\n        ax.tick_params(axis=\"y\", labelleft=False)\n    caption = f\"Nguồn: kpi_by_area.csv, kpi_by_snapshot.csv. Cỡ mẫu n đọc từ occ_<label>_n (exclude_ghost={exclude_ghost}).\"\n    return _save(fig, out_dir / \"kpi_occupancy_gap.png\", f\"Công suất lịch (Occ30, Occ31–90) & Urgency Gap\\n{city} | {len(ts)} snapshots\", caption), fig"
  },
  {
    "id": "viz-plot-llm-insights",
    "file": "src/viz.py",
    "name": "plot_llm_insights",
    "kind": "function",
    "lineStart": 403,
    "lineEnd": 432,
    "signature": "def plot_llm_insights(nb: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ 2 Heatmap so sánh trực tiếp tỷ lệ thuần Negative vs Có điểm trừ (Negative+Mixed) trên 7 khía cạnh cho 12 quận có review LLM, kèm cột ngang cỡ mẫu ở bên phải.",
    "flow": [
      "Lọc bỏ 3 quận có llm_review_count == 0 (Iztapalapa, Milpa Alta, Xochimilco).",
      "Tính vmax chung trên các quận có n >= 5 để không bị quận n=1–4 (33%–100%) làm nhạt hết bảng màu chính.",
      "Vẽ 2 heatmap (Reds) chung thang vmax cạnh biểu đồ cột ngang cỡ mẫu (1..749)."
    ],
    "input": "nb, cfg, city, out_dir",
    "output": "Tuple (Path, plt.Figure) -> figures/llm_insights.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: MaxNLocator, ValueError, _heatmap, _mat, _save, any, arange, astype, bar_label, barh, ceil, concatenate"
    ],
    "example": "Cuauhtémoc (n=749): Amenities từ 1.9% (Neg) -> 14.8% (Neg+Mix); Noise từ 4.0% -> 8.1%.",
    "usage": "Job thứ 7 trong main() của src/viz.py.",
    "potentialBugs": [
      "Vì vmax khóa theo các quận n >= 5, những ô 33.3% ở quận n=3 bị bão hòa màu đỏ đậm nhưng vẫn giữ giá trị số chính xác trên ô để không che giấu."
    ],
    "viva": [
      {
        "q": "Cột thứ 3 bên phải (Cỡ mẫu review LLM) đóng vai trò gì trên `llm_insights.png`?",
        "a": "Giúp người đọc lập tức phân biệt tín hiệu đáng tin (Cuauhtémoc n=749, Miguel Hidalgo n=150) với nhiễu mẫu nhỏ (Tlalpan n=4, Magdalena Contreras n=1)."
      }
    ],
    "code": "def plot_llm_insights(nb: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:\n    nb_llm = nb.loc[pd.to_numeric(nb[\"llm_review_count\"], errors=\"coerce\").fillna(0) > 0].reset_index(drop=True)\n    if nb_llm.empty:\n        raise ValueError(\"[VIZ] Không có quận nào có llm_review_count > 0.\")\n    aspects = [str(a).strip() for a in cfg.get(\"llm\", {}).get(\"aspects\", DEFAULT_ASPECTS) if str(a).strip()] or DEFAULT_ASPECTS\n    counts = pd.to_numeric(nb_llm[\"llm_review_count\"], errors=\"coerce\").fillna(0).astype(int)\n    rates_neg = _mat(nb_llm, \"neighbourhood_cleansed\", [f\"complaint_{a}\" for a in aspects], aspects, 100.0)\n    rates_mix = _mat(nb_llm, \"neighbourhood_cleansed\", [f\"complaint_mixed_{a}\" for a in aspects], aspects, 100.0)\n    ref = rates_mix.loc[counts.to_numpy() >= 5] if (counts >= 5).any() else rates_mix\n    r_vals = np.concatenate([rates_neg.to_numpy(dtype=float).ravel(), ref.to_numpy(dtype=float).ravel()])\n    vmax = min(100.0, max(10.0, float(np.ceil(np.nanmax(r_vals) / 5.0) * 5.0))) if np.isfinite(r_vals).any() else 10.0\n\n    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(19.5, max(6.5, 0.45 * len(nb_llm) + 2.6)), sharey=True, gridspec_kw={\"width_ratios\": [1.85, 1.85, 0.9]})\n    _heatmap(ax1, rates_neg, \"Thuần tiêu cực — negative (%)\", \"Tỷ lệ (%)\", \"Reds\", \".1f\", vmax=vmax)\n    _heatmap(ax2, rates_mix, \"Có điểm trừ — negative + mixed (%)\", \"Tỷ lệ (%)\", \"Reds\", \".1f\", vmax=vmax)\n    ax1.set_ylabel(\"Quận (neighbourhood_cleansed)\")\n    ax2.set_ylabel(\"\")\n    ax2.tick_params(axis=\"y\", labelleft=False)\n\n    bars = ax3.barh(np.arange(len(nb_llm)) + 0.5, counts, height=0.68, color=\"#1E93AB\")\n    ax3.bar_label(bars, labels=[f\"{c:,}\" for c in counts], padding=4, fontsize=9)\n    ax3.set(ylim=(len(nb_llm), 0), xlim=(0, max(1, int(counts.max())) * 1.2), title=\"Cỡ mẫu review LLM\", xlabel=\"Số review (llm_review_count)\")\n    ax3.xaxis.set_major_locator(MaxNLocator(integer=True))\n    ax3.tick_params(axis=\"y\", labelleft=False)\n    ax3.grid(axis=\"x\", alpha=0.25)\n    caption = (\n        f\"Nguồn: kpi_by_neighbourhood.csv. Trái: thuần negative (complaint_<aspect> * 100); giữa: negative + mixed (complaint_mixed_<aspect> * 100); \"\n        f\"thang màu chung 0–{vmax:.0f}% lấy theo các quận n ≥ 5 (ô vượt ngưỡng ở quận n nhỏ bão hòa màu đỏ đậm nhưng vẫn ghi đúng %).\"\n    )\n    return _save(fig, out_dir / \"llm_insights.png\", f\"Tỷ lệ phàn nàn (Negative vs Negative + Mixed) & Độ phủ mẫu LLM theo quận\\n{city}\", caption), fig"
  },
  {
    "id": "viz-plot-llm-vs-baseline",
    "file": "src/viz.py",
    "name": "plot_llm_vs_baseline",
    "kind": "function",
    "lineStart": 448,
    "lineEnd": 465,
    "signature": "def plot_llm_vs_baseline(ev: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:",
    "purpose": "Vẽ biểu đồ cột ngang ghép cặp (kpi_llm_vs_baseline.png) đối chiếu 9 chỉ số giữa Gemini 3.5 Flash Lite và Baseline Regex trên 100 mẫu GT kèm độ chênh Δ.",
    "flow": [
      "Đọc điểm baseline và llm từ DataFrame evaluation_report.",
      "Vẽ 2 thanh barh so le mỗi hàng (y - h/2 và y + h/2) cho 9 tiêu chí đánh giá.",
      "Gắn nhãn điểm và chênh lệch (l - b:+.3f) bằng bar_label(); giới hạn xlim=(0, 1.24) tránh cắt chữ."
    ],
    "input": "ev, cfg, city, out_dir",
    "output": "Tuple (Path, plt.Figure) -> figures/llm_vs_baseline.png.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: _save, arange, bar_label, barh, fillna, get, grid, invert_yaxis, legend, len, linspace, max"
    ],
    "example": "Macro F1: LLM 0.991 (+0.469) so với Baseline 0.522.",
    "usage": "Job thứ 8 (chạy khi đã tồn tại reports/evaluation_report.csv) trong main().",
    "potentialBugs": [
      "Nếu chưa chạy evaluate.py, main() in [VIZ WARN] và chỉ vẽ 7 biểu đồ KPI trước đó."
    ],
    "viva": [
      {
        "q": "Tại sao xlim được đặt là (0, 1.24) dù thang điểm F1/Accuracy chỉ tối đa 1.0?",
        "a": "Để chừa khoảng trống bên phải cho chuỗi nhãn dài như `0.991 (+0.469)` nằm ngoài đầu cột không bị chạm khung hình."
      }
    ],
    "code": "def plot_llm_vs_baseline(ev: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:\n    y, h = np.arange(len(ev)), 0.36\n    base = pd.to_numeric(ev[\"baseline\"], errors=\"coerce\")\n    llm = pd.to_numeric(ev[\"llm\"], errors=\"coerce\")\n    model = str((cfg.get(\"llm\") or {}).get(\"model\", \"LLM\"))\n\n    fig, ax = plt.subplots(figsize=(10.5, max(5.2, 0.55 * len(ev) + 1.8)))\n    b_llm = ax.barh(y - h / 2, llm.fillna(0.0), height=h, color=\"#0F766E\", label=f\"LLM ({model})\")\n    b_base = ax.barh(y + h / 2, base.fillna(0.0), height=h, color=\"#94A3B8\", label=\"Baseline (Regex)\")\n    ax.bar_label(b_llm, labels=[f\"{l:.3f} ({l - b:+.3f})\" if pd.notna(l) and pd.notna(b) else f\"{l:.3f}\" if pd.notna(l) else \"NA\" for l, b in zip(llm, base)], padding=4, fontsize=8.5, fontweight=\"bold\", color=\"#0F172A\")\n    ax.bar_label(b_base, labels=[f\"{v:.3f}\" if pd.notna(v) else \"NA\" for v in base], padding=4, fontsize=8.5, color=\"#475569\")\n    ax.set_yticks(y, labels=[EVAL_LABELS.get(str(k), str(k)) for k in ev[\"chi_so\"]], fontsize=9.5)\n    ax.invert_yaxis()\n    ax.set(xlim=(0, 1.24), xticks=np.linspace(0, 1, 6), xlabel=\"Điểm số (thang 0–1)\")\n    ax.grid(axis=\"x\", alpha=0.25)\n    ax.legend(loc=\"lower left\", bbox_to_anchor=(0, 1.01), ncol=2, frameon=False, fontsize=9.5)\n    caption = \"Nguồn: reports/evaluation_report.csv (đối chứng trên tập nhãn tay ground_truth.csv). Nhãn cạnh cột LLM gồm điểm và độ chênh (LLM − Baseline).\"\n    return _save(fig, out_dir / \"llm_vs_baseline.png\", f\"So sánh hiệu năng mô hình LLM vs Baseline Regex\\n{city}\", caption), fig"
  },
  {
    "id": "viz-main",
    "file": "src/viz.py",
    "name": "main",
    "kind": "function",
    "lineStart": 468,
    "lineEnd": 511,
    "signature": "def main() -> None:",
    "purpose": "Điểm vào CLI đọc 4 bảng kpi_by_*.csv, GeoJSON và evaluation_report.csv rồi thực thi tuần tự 8 hàm vẽ lưu ảnh PNG vào figures/.",
    "flow": [
      "Parse --config và --show; chuyển sang TkAgg backend nếu người dùng muốn bật cửa sổ xem ảnh (--show).",
      "Đọc đủ 4 bảng KPI qua _read_kpi() (fail-fast nếu thiếu cột).",
      "Lần lượt chạy danh sách 7 plot_jobs (thêm plot_llm_vs_baseline nếu có evaluation_report.csv), đóng figure sau khi lưu nếu không bật --show."
    ],
    "input": "CLI args (--config, --show)",
    "output": "Tạo 8 tệp PNG trong figures/.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "json",
      "os",
      "sys",
      "pathlib (Path)",
      "textwrap (fill)",
      "matplotlib.cm",
      "matplotlib.colors (Normalize)",
      "matplotlib.patches (Patch, Polygon)",
      "matplotlib.pyplot",
      "matplotlib.ticker (MaxNLocator)",
      "numpy",
      "pandas",
      "seaborn",
      "yaml",
      "Gọi hàm: ArgumentParser, Path, _read_kpi, add_argument, append, bool, close, expanduser, get, get_backend, get_fignums, is_absolute"
    ],
    "example": "python src/viz.py --config configs/mexico-city.yaml",
    "usage": "Chặng 8 (cuối cùng) của STEPS trong run_pipeline.py.",
    "potentialBugs": [
      "Quên `plt.close(fig)` trong vòng lặp hàng loạt có thể gây rò rỉ bộ nhớ Matplotlib nếu mở rộng nhiều biểu đồ hơn."
    ],
    "viva": [
      {
        "q": "Làm sao kiểm chứng 8 hình trong figures/ hoàn toàn khớp với CSV?",
        "a": "Vì toàn bộ 8 hàm trong `src/viz.py` đọc trực tiếp giá trị từ 4 tệp `kpi_by_*.csv` và `evaluation_report.csv` mà không tự tính hay sửa đổi số liệu."
      }
    ],
    "code": "def main() -> None:\n    ap = argparse.ArgumentParser(description=\"Visualize precomputed Inside Airbnb KPIs.\")\n    ap.add_argument(\"--config\", default=None)\n    ap.add_argument(\"--show\", action=\"store_true\")\n    args = ap.parse_args()\n    if args.show and plt.get_backend().lower() == \"agg\":\n        plt.switch_backend(\"TkAgg\")\n\n    cfg_path = Path(args.config or os.environ.get(\"PIPELINE_CONFIG\") or ROOT / \"configs/mexico-city.yaml\").expanduser()\n    cfg = yaml.safe_load((cfg_path if cfg_path.is_absolute() else ROOT / cfg_path).read_text(encoding=\"utf-8\"))\n    city = str(cfg.get(\"city\", \"Airbnb\")).replace(\"-\", \" \").title()\n    cur = str(cfg.get(\"currency\", \"MXN\")).strip().upper()\n    area_col = str(cfg.get(\"kpi\", {}).get(\"area_col\") or cfg.get(\"qa\", {}).get(\"area_col\", \"analysis_area\"))\n    exclude_ghost = bool(cfg.get(\"kpi\", {}).get(\"exclude_ghost\", True))\n    proc, out_dir = ROOT / \"data/processed\", ROOT / \"figures\"\n\n    listing = _read_kpi(proc, \"kpi_by_listing.csv\", dtype={\"id\": \"string\"})\n    area = _read_kpi(proc, \"kpi_by_area.csv\", [area_col, \"total_listings\"])\n    snap = _read_kpi(proc, \"kpi_by_snapshot.csv\", [\"snapshot\", \"label\", \"total_listings\", \"valid_price_count\", \"valid_ppg_count\", \"review_velocity_n\", \"riqr_price\", \"riqr_ppg\"])\n    nb = _read_kpi(proc, \"kpi_by_neighbourhood.csv\", [\"neighbourhood_cleansed\", \"llm_review_count\", \"total_listings\"], dtype={\"neighbourhood_cleansed\": \"string\"})\n    eval_file = ROOT / \"reports\" / \"evaluation_report.csv\"\n\n    plot_jobs = [\n        lambda: plot_ppg_riqr(listing, area, snap, city, area_col, out_dir, cur=cur),\n        lambda: plot_ppg_snapshots(area, snap, city, area_col, out_dir, cur=cur),\n        lambda: plot_ppg_neighbourhood(nb, snap, proc / \"neighbourhoods.geojson\", city, out_dir, cur=cur),\n        lambda: plot_riqr_neighbourhood(nb, snap, city, out_dir, cur=cur),\n        lambda: plot_review_ghost(area, snap, city, area_col, out_dir),\n        lambda: plot_occupancy_gap(area, snap, city, area_col, out_dir, exclude_ghost=exclude_ghost),\n        lambda: plot_llm_insights(nb, cfg, city, out_dir),\n    ]\n    if eval_file.is_file():\n        ev = _read_kpi(eval_file.parent, eval_file.name, [\"chi_so\", \"baseline\", \"llm\"])\n        plot_jobs.append(lambda: plot_llm_vs_baseline(ev, cfg, city, out_dir))\n    else:\n        print(f\"[VIZ WARN] Chưa có {eval_file.relative_to(ROOT)} -> bỏ qua llm_vs_baseline.png\")\n\n    for make_plot in plot_jobs:\n        path, fig = make_plot()\n        print(f\"[VIZ] Đã lưu: {path.relative_to(ROOT)}\")\n        if not args.show:\n            plt.close(fig)\n    if args.show and plt.get_fignums():\n        plt.show(block=True)"
  }
];

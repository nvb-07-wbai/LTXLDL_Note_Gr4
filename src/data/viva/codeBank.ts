import type { VivaQuestion } from '../../types';

export const VIVA_CODE_BANK: VivaQuestion[] = [
  {
    "id": "vc-001",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "code",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `run_pipeline.py :: run_step`.",
    "question": "Đọc hiểu hàm `run_step()` trong `run_pipeline.py` (`L21–L33`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao dùng sys.executable thay vì gọi chuỗi \"python\"?",
    "quickAnswer": "Thực thi một mô-đun Python trong danh sách STEPS như một tiến trình con đồng bộ kèm tham số --config và cờ --skip-llm (riêng cho src/llm.py). Cụ thể: Vì sys.executable trỏ thẳng vào file thực thi Python của .venv đang kích hoạt, tránh gọi nhầm Python hệ thống không có đủ thư viện.",
    "explanation": "**Chữ ký:** `def run_step(name, script_path, config_path, env, skip_llm=False):`.\n**Luồng chạy:** In tiêu đề bước [STEP] <name> với flush=True để nhật ký hiển thị ngay theo thời gian thực. -> Kiểm tra sự tồn tại (is_file()) và dung lượng khác 0 (st_size > 0) của script nguồn. -> Tạo danh sách lệnh cmd bắt đầu bằng sys.executable (giữ đúng môi trường .venv hiện hành)..\n**Input:** name (str), script_path (str), config_path (Path), env (dict), skip_llm (bool) -> **Output:** Không trả về giá trị (None); side-effect thực thi script và có thể ném FileNotFoundError, RuntimeError hoặc CalledProcessError..\n**Giải đáp sâu:** Vì sys.executable trỏ thẳng vào file thực thi Python của .venv đang kích hoạt, tránh gọi nhầm Python hệ thống không có đủ thư viện.",
    "projectLink": "run_pipeline.py:L21-L33",
    "codeLocation": "run_pipeline.py:L21-L33",
    "proofExample": "Ví dụ: `run_step(\"Quality Assurance\", \"src/qa.py\", Path(\"configs/mexico-city.yaml\"), env, False) -> chạy python src/qa.py --config ...`. Sử dụng tại: Được gọi trong vòng lặp tuần tự STEPS tại main() của run_pipeline.py.",
    "followUpQuestions": [
      "Tham số check=True trong subprocess.run() có ý nghĩa gì?"
    ],
    "followUpQA": [
      {
        "q": "Tham số check=True trong subprocess.run() có ý nghĩa gì?",
        "a": "Nếu tiến trình con thoát với returncode != 0, Python lập tức ném CalledProcessError để main() dừng toàn bộ pipeline."
      }
    ],
    "commonMistakes": [
      "Nếu đổi subprocess.run sang subprocess.Popen không chờ wait(), bước sau sẽ đọc file khi bước trước chưa ghi xong.",
      "Nếu truyền \"--skip-llm\" cho các script khác (như qa.py), argparse của script đó sẽ báo lỗi unrecognized arguments."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ],
    "codeBlock": {
      "file": "run_pipeline.py",
      "lines": "L21-L33",
      "code": "def run_step(name, script_path, config_path, env, skip_llm=False):\n    print(f\"\\n{'=' * 50}\\n[STEP] {name}\\n{'=' * 50}\", flush=True)\n    script = PROJECT_ROOT / script_path\n    if not script.is_file():\n        raise FileNotFoundError(f\"Khong tim thay file: {script}\")\n    if script.stat().st_size == 0:\n        raise RuntimeError(f\"Step script is empty (not implemented): {script}\")\n\n    cmd = [sys.executable, str(script), \"--config\", str(config_path)]\n    if script_path == \"src/llm.py\" and skip_llm:\n        cmd.append(\"--skip-llm\")\n\n    subprocess.run(cmd, cwd=PROJECT_ROOT, env=env, check=True)"
    }
  },
  {
    "id": "vc-002",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "code",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `run_pipeline.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `run_pipeline.py` (`L36–L60`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao bước Baseline đứng sau LLM trong STEPS dù hai mô hình chạy độc lập?",
    "quickAnswer": "Điểm khởi chạy CLI chính điều phối tuần tự toàn bộ 8 script xử lý dữ liệu Inside Airbnb qua một lệnh duy nhất. Cụ thể: Tất cả cùng đọc reviews_llm.csv nên đổi vị trí Baseline trước hay sau LLM đều ra cùng kết quả, miễn cả hai hoàn tất trước bước Evaluate.",
    "explanation": "**Chữ ký:** `def main():`.\n**Luồng chạy:** Phân tích tham số dòng lệnh --config (mặc định configs/mexico-city.yaml) và --skip-llm. -> Chuẩn hóa đường dẫn config_path về tuyệt đối và kiểm tra file cấu hình có tồn tại. -> Thiết lập env với PIPELINE_CONFIG và PYTHONIOENCODING=\"utf-8\" cho tiến trình con..\n**Input:** CLI args (--config, --skip-llm) -> **Output:** Mã thoát 0 khi 8/8 bước thành công, hoặc sys.exit(1) ngay tại bước đầu tiên gặp lỗi..\n**Giải đáp sâu:** Tất cả cùng đọc reviews_llm.csv nên đổi vị trí Baseline trước hay sau LLM đều ra cùng kết quả, miễn cả hai hoàn tất trước bước Evaluate.",
    "projectLink": "run_pipeline.py:L36-L60",
    "codeLocation": "run_pipeline.py:L36-L60",
    "proofExample": "Ví dụ: `python run_pipeline.py --config configs/mexico-city.yaml --skip-llm -> chạy lại trọn bộ bằng cache LLM.`. Sử dụng tại: Lệnh gốc để sinh viên chạy pipeline và giảng viên chấm điểm tái lập (Rubric 1-command run).",
    "followUpQuestions": [
      "Nếu bước QA ở giữa lỗi nhưng vẫn tiếp tục Evaluate/KPI thì hậu quả là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu bước QA ở giữa lỗi nhưng vẫn tiếp tục Evaluate/KPI thì hậu quả là gì?",
        "a": "Bước KPI sẽ đọc listings.csv chưa có cột qa_*/clean từ lần chạy cũ hoặc thiếu cột gây kết quả sai ngầm."
      }
    ],
    "commonMistakes": [
      "Quên set PYTHONIOENCODING=\"utf-8\" sẽ làm các bước sau văng UnicodeEncodeError khi in tiếng Việt trên Windows cp1252.",
      "Không dừng ở sys.exit(1) khi một bước lỗi sẽ khiến bước KPI/Viz dùng nhầm dữ liệu cũ còn sót từ lần chạy trước."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ],
    "codeBlock": {
      "file": "run_pipeline.py",
      "lines": "L36-L60",
      "code": "def main():\n    parser = argparse.ArgumentParser(description=\"Run the full Inside Airbnb pipeline\")\n    parser.add_argument(\"--config\", default=\"configs/mexico-city.yaml\", help=\"Path to config file\")\n    parser.add_argument(\"--skip-llm\", action=\"store_true\", help=\"Skip Gemini API calls and use cache\")\n    args = parser.parse_args()\n\n    cfg = Path(args.config)\n    config_path = (cfg if cfg.is_absolute() else PROJECT_ROOT / cfg).resolve()\n    if not config_path.is_file():\n        raise FileNotFoundError(f\"Khong tim thay config: {config_path}\")\n\n    env = {**os.environ, \"PIPELINE_CONFIG\": str(config_path), \"PYTHONIOENCODING\": \"utf-8\"}\n    print(f\"Starting pipeline: {config_path}\", flush=True)\n"
    }
  },
  {
    "id": "vc-003",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/baseline.py :: clean_text`.",
    "question": "Đọc hiểu hàm `clean_text()` trong `src/baseline.py` (`L61–L71`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao phải dùng unicodedata.normalize(\"NFKC\", s)?",
    "quickAnswer": "Giải mã HTML entities, chuyển thẻ <br/> thành ký tự xuống dòng \\n để giữ ranh giới mệnh đề, xóa HTML tags còn lại, chuẩn hóa Unicode NFKC và loại bỏ URL. Cụ thể: Để đưa các biến thể ký tự Unicode (ví dụ dấu nháy, chữ có dấu tổ hợp tiếng Tây Ban Nha) về cùng dạng chuẩn giúp Regex khớp đồng nhất.",
    "explanation": "**Chữ ký:** `def clean_text(text: Any) -> str:`.\n**Luồng chạy:** Trả về \"\" nếu None hoặc pd.isna(text). -> Gọi html.unescape(str(text)) giải mã ký tự như &amp;, &#39;. -> Thay <br> / <br/> thành \"\\n\", xóa các thẻ HTML khác bằng khoảng trắng..\n**Input:** text (Any) -> **Output:** str đã làm sạch nhưng còn dấu xuống dòng \\n..\n**Giải đáp sâu:** Để đưa các biến thể ký tự Unicode (ví dụ dấu nháy, chữ có dấu tổ hợp tiếng Tây Ban Nha) về cùng dạng chuẩn giúp Regex khớp đồng nhất.",
    "projectLink": "src/baseline.py:L61-L71",
    "codeLocation": "src/baseline.py:L61-L71",
    "proofExample": "Ví dụ: `clean_text(\"Great!<br/>Check http://a.co &amp; go\") -> \"Great!\\nCheck & go\"`. Sử dụng tại: Bước tiền xử lý đầu tiên bên trong predict_review_regex().",
    "followUpQuestions": [
      "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `clean_text` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `clean_text` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu vô tình đổi <br/> thành dấu cách \" \" thay vì \"\\n\", hai câu khen và chê trên 2 dòng khác nhau sẽ bị nối dính làm hỏng CLAUSE_RE."
      }
    ],
    "commonMistakes": [
      "Nếu vô tình đổi <br/> thành dấu cách \" \" thay vì \"\\n\", hai câu khen và chê trên 2 dòng khác nhau sẽ bị nối dính làm hỏng CLAUSE_RE."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ],
    "codeBlock": {
      "file": "src/baseline.py",
      "lines": "L61-L71",
      "code": "def clean_text(text: Any) -> str:\n    \"\"\"Chuẩn hóa HTML/Unicode/URL nhưng giữ nguyên ngắt dòng (<br/>, \\\\n) cho tách mệnh đề.\"\"\"\n    if text is None or pd.isna(text):\n        return \"\"\n    s = html.unescape(str(text))\n    s = re.sub(r\"<br\\s*/?>\", \"\\n\", s, flags=re.I)\n    s = re.sub(r\"</?[a-zA-Z][^>]*>\", \" \", s)\n    s = unicodedata.normalize(\"NFKC\", s)\n    s = re.sub(r\"https?://\\S+|www\\.\\S+\", \" \", s)\n    s = re.sub(r\"[ \\t\\r]+\", \" \", s)\n    return re.sub(r\"\\n+\", \"\\n\", s).strip()"
    }
  },
  {
    "id": "vc-004",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/baseline.py :: detect_language`.",
    "question": "Đọc hiểu hàm `detect_language()` trong `src/baseline.py` (`L74–L81`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Regex [^\\W\\d_] nghĩa là gì trong hàm detect_language()?",
    "quickAnswer": "Nhận diện nhanh mã ngôn ngữ ISO 639-1 (es, fr, pt, de, vi, mặc định en, không chữ cái -> \"und\") hoàn toàn bằng Regex. Cụ thể: \\W là ký tự không phải chữ/số/_, nên [^\\W\\d_] (tất cả ký tự chữ trừ số và gạch dưới) dùng để kiểm tra có tồn tại chữ cái thật hay chỉ là emoji/số.",
    "explanation": "**Chữ ký:** `def detect_language(text: str) -> str:`.\n**Luồng chạy:** Nếu chuỗi rỗng hoặc không chứa ký tự chữ cái nào (regex [^\\W\\d_]) -> trả \"und\". -> Kiểm tra lần lượt LANG_PATTERNS (es có dấu ¿¡ và từ phổ thông Tây Ban Nha, fr, pt, de, vi). -> Nếu không khớp ngôn ngữ ngoài Anh nào -> mặc định trả về \"en\"..\n**Input:** text (str đã qua clean_text) -> **Output:** Mã ngôn ngữ 2 ký tự (es, fr, pt, de, vi, en) hoặc \"und\"..\n**Giải đáp sâu:** \\W là ký tự không phải chữ/số/_, nên [^\\W\\d_] (tất cả ký tự chữ trừ số và gạch dưới) dùng để kiểm tra có tồn tại chữ cái thật hay chỉ là emoji/số.",
    "projectLink": "src/baseline.py:L74-L81",
    "codeLocation": "src/baseline.py:L74-L81",
    "proofExample": "Ví dụ: `detect_language(\"¡Muy limpio y tranquilo!\") -> \"es\"`. Sử dụng tại: Được predict_review_regex() gọi để điền cột language cho baseline.",
    "followUpQuestions": [
      "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `detect_language` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `detect_language` nếu dữ liệu đầu vào bất thường?",
        "a": "Mặc định trả về \"en\" khi không khớp từ điển 5 ngôn ngữ kia, nên có thể đoán nhầm các ngôn ngữ ít gặp (Ý, Nhật...) sang \"en\" (trong mẫu 100 GT đạt 99% vì 999/1000 là tiếng Anh)."
      }
    ],
    "commonMistakes": [
      "Mặc định trả về \"en\" khi không khớp từ điển 5 ngôn ngữ kia, nên có thể đoán nhầm các ngôn ngữ ít gặp (Ý, Nhật...) sang \"en\" (trong mẫu 100 GT đạt 99% vì 999/1000 là tiếng Anh)."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ],
    "codeBlock": {
      "file": "src/baseline.py",
      "lines": "L74-L81",
      "code": "def detect_language(text: str) -> str:\n    \"\"\"Nhận diện nhanh mã ngôn ngữ ISO 639-1 bằng regex (chuỗi không chữ cái -> 'und').\"\"\"\n    if not text.strip() or not re.search(r\"[^\\W\\d_]\", text):\n        return \"und\"\n    for code, pat in LANG_PATTERNS:\n        if pat.search(text):\n            return code\n    return \"en\""
    }
  },
  {
    "id": "vc-005",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/baseline.py :: predict_review_regex`.",
    "question": "Đọc hiểu hàm `predict_review_regex()` trong `src/baseline.py` (`L84–L118`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao phải chạy NEG_RE.sub(\" \", cleaned) trước khi đếm POS_RE.findall(...)?",
    "quickAnswer": "Dự đoán đồng thời language, overall_sentiment và 7 nhãn khía cạnh cho 1 review bằng phương pháp tách mệnh đề & lọc phủ định lành tính. Cụ thể: Vì trong \"not clean\", cụm \"not clean\" khớp NEG_RE; nếu không xóa nó đi thì POS_RE sẽ đếm nhầm từ \"clean\" thành +1 tích cực!",
    "explanation": "**Chữ ký:** `def predict_review_regex(text: Any, aspects: tuple[str, ...] = ASPECTS) -> dict[str, str]:`.\n**Luồng chạy:** Làm sạch text bằng clean_text(); nếu rỗng -> trả về language=\"und\", overall=\"mixed\", các khía cạnh \"not_mentioned\". -> Tách raw theo CLAUSE_RE (dấu câu [.!?;], xuống dòng \\n và liên từ đối lập but/however/pero/aunque...). -> Với mỗi clause: xóa cụm phủ định lành tính BENIGN_RE (\"no noise\", \"no issues\") -> đếm NEG_RE -> xóa NEG_RE trước khi đếm POS_RE..\n**Input:** text (Any), aspects (tuple) -> **Output:** dict[str, str] gồm 9 khóa: language, overall_sentiment và 7 khía cạnh..\n**Giải đáp sâu:** Vì trong \"not clean\", cụm \"not clean\" khớp NEG_RE; nếu không xóa nó đi thì POS_RE sẽ đếm nhầm từ \"clean\" thành +1 tích cực!",
    "projectLink": "src/baseline.py:L84-L118",
    "codeLocation": "src/baseline.py:L84-L118",
    "proofExample": "Ví dụ: `predict_review_regex(\"Great host, but WiFi didn't work\") -> overall=\"mixed\", host=\"positive\", amenities=\"negative\".`. Sử dụng tại: Áp dụng cho từng review của reviews_llm.csv trong main() của src/baseline.py.",
    "followUpQuestions": [
      "Nếu 1 review rỗng hoàn toàn thì overall_sentiment mặc định của baseline.py là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu 1 review rỗng hoàn toàn thì overall_sentiment mặc định của baseline.py là gì?",
        "a": "Là \"mixed\" kèm language=\"und\" và toàn bộ khía cạnh \"not_mentioned\", thống nhất với quy ước kiểm tra của evaluate.py."
      }
    ],
    "commonMistakes": [
      "Mệnh đề \"không chê\" dạng \"no noise issues\" bị BENIGN_RE xóa mất từ khóa chê khiến n_pos=0, n_neg=0 rồi rơi vào nhánh fallback theo overall.",
      "Không hiểu mỉa mai (sarcasm) hoặc góp ý hàm ý không nằm trong từ điển từ khóa."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ],
    "codeBlock": {
      "file": "src/baseline.py",
      "lines": "L84-L118",
      "code": "def predict_review_regex(text: Any, aspects: tuple[str, ...] = ASPECTS) -> dict[str, str]:\n    \"\"\"Dự đoán ngôn ngữ, cảm xúc tổng thể và các khía cạnh cho 1 review bằng regex.\"\"\"\n    raw = clean_text(text)\n    if not raw:\n        return {\"language\": \"und\", \"overall_sentiment\": \"mixed\", **{a: \"not_mentioned\" for a in aspects}}\n\n    total_pos = total_neg = 0\n    aspect_flags: dict[str, list[bool]] = {a: [False, False, False] for a in aspects}\n    for clause in CLAUSE_RE.split(raw):\n        cleaned = BENIGN_RE.sub(\" \", clause)\n        n_neg = len(NEG_RE.findall(cleaned))\n        n_pos = len(POS_RE.findall(NEG_RE.sub(\" \", cleaned)))\n        total_pos += n_pos\n        total_neg += n_neg"
    }
  },
  {
    "id": "vc-006",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/baseline.py :: load_config`.",
    "question": "Đọc hiểu hàm `load_config()` trong `src/baseline.py` (`L121–L126`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Baseline đọc danh sách khía cạnh từ đâu?",
    "quickAnswer": "Đọc file cấu hình YAML cho mô-đun Baseline. Cụ thể: Đọc từ cấu hình llm.aspects trong YAML (nếu thiếu mới dùng hằng ASPECTS mặc định) để khớp 100% schema với LLM.",
    "explanation": "**Chữ ký:** `def load_config(config_path: str | None = None) -> dict[str, Any]:`.\n**Luồng chạy:** Đọc đường dẫn CLI hoặc PIPELINE_CONFIG hoặc configs/mexico-city.yaml và trả yaml.safe_load()..\n**Input:** config_path (str | None) -> **Output:** dict[str, Any].\n**Giải đáp sâu:** Đọc từ cấu hình llm.aspects trong YAML (nếu thiếu mới dùng hằng ASPECTS mặc định) để khớp 100% schema với LLM.",
    "projectLink": "src/baseline.py:L121-L126",
    "codeLocation": "src/baseline.py:L121-L126",
    "proofExample": "Ví dụ: `cfg = load_config(\"configs/mexico-city.yaml\")`. Sử dụng tại: Gọi trong main() của src/baseline.py để lấy snapshots, llm.aspects và đường dẫn đầu ra baseline.",
    "followUpQuestions": [
      "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?",
        "a": "Ném FileNotFoundError nếu truyền sai đường dẫn config."
      }
    ],
    "commonMistakes": [
      "Ném FileNotFoundError nếu truyền sai đường dẫn config."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ],
    "codeBlock": {
      "file": "src/baseline.py",
      "lines": "L121-L126",
      "code": "def load_config(config_path: str | None = None) -> dict[str, Any]:\n    target = Path(config_path or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\"))\n    path = target if target.is_absolute() else ROOT / target\n    if not path.is_file():\n        raise FileNotFoundError(f\"[Baseline] Không tìm thấy config: {path}\")\n    return yaml.safe_load(path.read_text(encoding=\"utf-8\"))"
    }
  },
  {
    "id": "vc-007",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/baseline.py :: load_reviews_llm`.",
    "question": "Đọc hiểu hàm `load_reviews_llm()` trong `src/baseline.py` (`L129–L138`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao Baseline phải đọc đúng reviews_llm.csv thay vì đọc reviews_labeled.csv (100 mẫu)?",
    "quickAnswer": "Tìm và đọc chính tập 1.000 review trong reviews_llm.csv để chạy đối chứng công bằng trên cùng đầu vào với LLM. Cụ thể: Để vừa chấm được trên 100 mẫu giao nhau với ground truth, vừa sinh đủ 1.000 dự đoán song song kiểm tra độ phủ (Coverage) như LLM.",
    "explanation": "**Chữ ký:** `def load_reviews_llm(cfg: dict[str, Any]) -> pd.DataFrame:`.\n**Luồng chạy:** Duyệt ngược danh sách snapshots, nạp file reviews_llm.csv đầu tiên tìm thấy với dtype=str, strip id và fillna(\"\") cho comments..\n**Input:** cfg (dict) -> **Output:** pd.DataFrame chứa 1.000 review..\n**Giải đáp sâu:** Để vừa chấm được trên 100 mẫu giao nhau với ground truth, vừa sinh đủ 1.000 dự đoán song song kiểm tra độ phủ (Coverage) như LLM.",
    "projectLink": "src/baseline.py:L129-L138",
    "codeLocation": "src/baseline.py:L129-L138",
    "proofExample": "Ví dụ: `df = load_reviews_llm(cfg) -> 1.000 dòng.`. Sử dụng tại: Gọi trong main() của src/baseline.py.",
    "followUpQuestions": [
      "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_reviews_llm` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_reviews_llm` nếu dữ liệu đầu vào bất thường?",
        "a": "Giả định reviews_llm.csv đã được tạo bởi Filter; nếu thiếu sẽ báo FileNotFoundError."
      }
    ],
    "commonMistakes": [
      "Giả định reviews_llm.csv đã được tạo bởi Filter; nếu thiếu sẽ báo FileNotFoundError."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ],
    "codeBlock": {
      "file": "src/baseline.py",
      "lines": "L129-L138",
      "code": "def load_reviews_llm(cfg: dict[str, Any]) -> pd.DataFrame:\n    snaps = sorted((str(s).strip() for s in (cfg.get(\"snapshots\") or [])), key=pd.to_datetime)\n    for snap in reversed(snaps):\n        path = ROOT / \"data\" / \"processed\" / snap / \"reviews_llm.csv\"\n        if path.is_file():\n            df = pd.read_csv(path, dtype=str)\n            df[\"id\"] = df[\"id\"].fillna(\"\").str.strip()\n            df[\"comments\"] = df[\"comments\"].fillna(\"\")\n            return df\n    raise FileNotFoundError(\"[Baseline] Không tìm thấy reviews_llm.csv trong data/processed/*/\")"
    }
  },
  {
    "id": "vc-008",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/baseline.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/baseline.py` (`L141–L158`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Lý do `df_all[meta_cols].reset_index(drop=True)` xuất hiện ở dòng 151 của src/baseline.py?",
    "quickAnswer": "Chạy suy luận Regex Baseline trên toàn bộ 1.000 review và xuất data/processed/reviews_baseline.csv (15 cột cùng schema LLM). Cụ thể: Để bảo đảm index của bảng metadata (0..999) khớp 1-1 với index mặc định của DataFrame preds mới tạo khi ghép ngang bằng pd.concat(axis=1).",
    "explanation": "**Chữ ký:** `def main() -> None:`.\n**Luồng chạy:** Parse --config, nạp YAML và lấy danh sách aspects. -> Nạp df_all qua load_reviews_llm(cfg), giữ các cột metadata. -> Chạy predict_review_regex(c, aspects) cho từng comments, ghép với metadata qua pd.concat(..., axis=1)..\n**Input:** CLI arg --config -> **Output:** Tạo tệp data/processed/reviews_baseline.csv (1.000 dòng × 15 cột)..\n**Giải đáp sâu:** Để bảo đảm index của bảng metadata (0..999) khớp 1-1 với index mặc định của DataFrame preds mới tạo khi ghép ngang bằng pd.concat(axis=1).",
    "projectLink": "src/baseline.py:L141-L158",
    "codeLocation": "src/baseline.py:L141-L158",
    "proofExample": "Ví dụ: `python src/baseline.py --config configs/mexico-city.yaml`. Sử dụng tại: Chặng 5 của STEPS trong run_pipeline.py.",
    "followUpQuestions": [
      "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/baseline.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu df_all và preds không reset_index(drop=True) trước khi pd.concat(..., axis=1), hai DataFrame lệch index sẽ tạo ra hàng NaN thừa."
      }
    ],
    "commonMistakes": [
      "Nếu df_all và preds không reset_index(drop=True) trước khi pd.concat(..., axis=1), hai DataFrame lệch index sẽ tạo ra hàng NaN thừa."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ],
    "codeBlock": {
      "file": "src/baseline.py",
      "lines": "L141-L158",
      "code": "def main() -> None:\n    ap = argparse.ArgumentParser(description=\"Regex Baseline cho cảm xúc, ngôn ngữ & 7 khía cạnh Inside Airbnb\")\n    ap.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    args = ap.parse_args()\n\n    cfg = load_config(args.config)\n    aspects = tuple(str(a).strip() for a in ((cfg.get(\"llm\") or {}).get(\"aspects\") or ASPECTS) if str(a).strip()) or ASPECTS\n    df_all = load_reviews_llm(cfg)\n    meta_cols = [c for c in (\"id\", \"listing_id\", \"date\", \"reviewer_id\", \"reviewer_name\", \"comments\") if c in df_all.columns]\n    preds = pd.DataFrame([predict_review_regex(c, aspects) for c in df_all[\"comments\"]])\n    out_df = pd.concat([df_all[meta_cols].fillna(\"\").reset_index(drop=True), preds], axis=1)\n\n    out_cfg = Path((cfg.get(\"baseline\") or {}).get(\"output_csv\", \"data/processed/reviews_baseline.csv\"))\n    out_path = out_cfg if out_cfg.is_absolute() else ROOT / out_cfg"
    }
  },
  {
    "id": "vc-009",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/download.py :: _display_path`.",
    "question": "Đọc hiểu hàm `_display_path()` trong `src/download.py` (`L24–L25`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao không in đường dẫn tuyệt đối trực tiếp trong log?",
    "quickAnswer": "Rút gọn đường dẫn file tuyệt đối thành đường dẫn tương đối so với PROJECT_ROOT để log gọn đẹp, không lộ đường dẫn ổ đĩa cá nhân. Cụ thể: Để tránh lộ thông tin thư mục máy cá nhân và giữ log đồng nhất giữa Windows/Linux.",
    "explanation": "**Chữ ký:** `def _display_path(path):`.\n**Luồng chạy:** Kiểm tra path.is_relative_to(PROJECT_ROOT). -> Nếu đúng thì trả về str(path.relative_to(PROJECT_ROOT)), ngược lại giữ nguyên str(path)..\n**Input:** path (Path) -> **Output:** str (ví dụ \"data/raw/2026-06-15/listings.csv.gz\")..\n**Giải đáp sâu:** Để tránh lộ thông tin thư mục máy cá nhân và giữ log đồng nhất giữa Windows/Linux.",
    "projectLink": "src/download.py:L24-L25",
    "codeLocation": "src/download.py:L24-L25",
    "proofExample": "Ví dụ: `_display_path(PROJECT_ROOT / \"data/raw/2026-06-15/listings.csv.gz\") -> \"data\\\\raw\\\\2026-06-15\\\\listings.csv.gz\"`. Sử dụng tại: Dùng trong thông báo log của hàm download() tại src/download.py.",
    "followUpQuestions": [
      "Trong `src/download.py`, lỗi tiềm ẩn nào dễ xảy ra với `_display_path` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/download.py`, lỗi tiềm ẩn nào dễ xảy ra với `_display_path` nếu dữ liệu đầu vào bất thường?",
        "a": "Chỉ hoạt động tốt từ Python 3.9+ vì phương thức Path.is_relative_to() mới có từ bản 3.9."
      }
    ],
    "commonMistakes": [
      "Chỉ hoạt động tốt từ Python 3.9+ vì phương thức Path.is_relative_to() mới có từ bản 3.9."
    ],
    "relatedFiles": [
      "src/download.py"
    ],
    "codeBlock": {
      "file": "src/download.py",
      "lines": "L24-L25",
      "code": "def _display_path(path):\n    return path.relative_to(PROJECT_ROOT) if path.is_relative_to(PROJECT_ROOT) else path"
    }
  },
  {
    "id": "vc-010",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/download.py :: download`.",
    "question": "Đọc hiểu hàm `download()` trong `src/download.py` (`L28–L86`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao dùng tmp.replace(dest) thay vì ghi thẳng vào dest?",
    "quickAnswer": "Tải một tệp từ URL về dest an toàn theo luồng 64KB qua tệp tạm .tmp, kiểm tra Content-Length và thử lại theo Exponential Backoff. Cụ thể: Nếu rớt mạng ở 50%, dest không bị hỏng nửa chừng; nếu để file cụt trên đĩa, lần chạy sau idempotent check thấy size > 0 sẽ tưởng đã tải xong.",
    "explanation": "**Chữ ký:** `def download(url, dest, max_attempts=3, force=False):`.\n**Luồng chạy:** Idempotent check: nếu dest tồn tại (> 0 bytes) và không bật --force -> trả về True ngay. -> Tạo thư mục cha và xác định tệp tạm tmp có hậu tố .tmp. -> Trong tối đa max_attempts lần thử: gửi requests.get(url, stream=True, timeout=60)..\n**Input:** url (str), dest (Path), max_attempts (int=3), force (bool=False) -> **Output:** bool (True nếu tệp hợp lệ đã có tại dest, False nếu tải thất bại). Side-effect ghi file ra data/raw/..\n**Giải đáp sâu:** Nếu rớt mạng ở 50%, dest không bị hỏng nửa chừng; nếu để file cụt trên đĩa, lần chạy sau idempotent check thấy size > 0 sẽ tưởng đã tải xong.",
    "projectLink": "src/download.py:L28-L86",
    "codeLocation": "src/download.py:L28-L86",
    "proofExample": "Ví dụ: `download(\"https://data.insideairbnb.com/.../listings.csv.gz\", Path(\"data/raw/2026-06-15/listings.csv.gz\")) -> True`. Sử dụng tại: Hàm tải cốt lõi được main() của src/download.py gọi cho 16 tệp (4 tệp × 4 snapshot).",
    "followUpQuestions": [
      "Nếu attempt=0 và attempt=1 đều bị Timeout thì tổng thời gian chờ Exponential Backoff là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Nếu attempt=0 và attempt=1 đều bị Timeout thì tổng thời gian chờ Exponential Backoff là bao nhiêu?",
        "a": "2^0 + 2^1 = 1 + 2 = 3 giây (ở lần thử cuối cùng attempt=2 nếu vẫn lỗi thì không sleep nữa)."
      }
    ],
    "commonMistakes": [
      "Nếu CDN nén động (Transfer-Encoding: chunked) không trả Content-Length (expected_size=-1), kiểm tra kích thước byte sẽ bị bỏ qua.",
      "Nếu server trả HTTP 200 kèm trang HTML chặn bot (Cloudflare), file vẫn có size > 0 và chỉ bị phát hiện khi bước Filter giải nén."
    ],
    "relatedFiles": [
      "src/download.py"
    ],
    "codeBlock": {
      "file": "src/download.py",
      "lines": "L28-L86",
      "code": "def download(url, dest, max_attempts=3, force=False):\n    \"\"\"Tải một tệp từ url về dest. Trả về True nếu thành công, False nếu thất bại.\"\"\"\n    # Nếu file đã tồn tại và không yêu cầu tải lại (--force) -> bỏ qua tải để tiết kiệm thời gian\n    if dest.exists() and dest.stat().st_size > 0 and not force:\n        print(f\"  [Existing]: {_display_path(dest)}  ({dest.stat().st_size:,} bytes)\")\n        return True\n\n    dest.parent.mkdir(parents=True, exist_ok=True)\n    tmp = dest.with_suffix(dest.suffix + \".tmp\")\n\n    for attempt in range(max_attempts):\n        print(f\"  [>>] Downloading (attempt {attempt + 1}/{max_attempts}): {url}\")\n        try:\n            resp = requests.get(url, stream=True, timeout=60)"
    }
  },
  {
    "id": "vc-011",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/download.py :: get_config_path`.",
    "question": "Đọc hiểu hàm `get_config_path()` trong `src/download.py` (`L89–L106`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Thứ tự ưu tiên đọc đường dẫn config là gì?",
    "quickAnswer": "Tìm file cấu hình YAML theo thứ tự ưu tiên: tham số CLI -> biến môi trường PIPELINE_CONFIG -> mặc định configs/mexico-city.yaml. Cụ thể: CLI (--config hoặc positional) -> biến môi trường PIPELINE_CONFIG -> configs/mexico-city.yaml.",
    "explanation": "**Chữ ký:** `def get_config_path(args_path=None):`.\n**Luồng chạy:** Lấy target từ args_path hoặc os.environ.get(\"PIPELINE_CONFIG\"). -> Nếu target tồn tại và là đường dẫn tương đối, ưu tiên kiểm tra Path.cwd()/target rồi mới fallback về PROJECT_ROOT/target. -> Nếu không truyền target, trả về configs/mexico-city.yaml nếu tồn tại..\n**Input:** args_path (str | None) -> **Output:** Path (đường dẫn tới tệp YAML cấu hình)..\n**Giải đáp sâu:** CLI (--config hoặc positional) -> biến môi trường PIPELINE_CONFIG -> configs/mexico-city.yaml.",
    "projectLink": "src/download.py:L89-L106",
    "codeLocation": "src/download.py:L89-L106",
    "proofExample": "Ví dụ: `get_config_path(\"configs/mexico-city.yaml\") -> Path(\".../configs/mexico-city.yaml\")`. Sử dụng tại: Được main() trong src/download.py gọi ở đầu chương trình.",
    "followUpQuestions": [
      "Trong `src/download.py`, lỗi tiềm ẩn nào dễ xảy ra với `get_config_path` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/download.py`, lỗi tiềm ẩn nào dễ xảy ra với `get_config_path` nếu dữ liệu đầu vào bất thường?",
        "a": "Không kiểm tra đuôi .yaml trước khi trả về ở nhánh target có giá trị (việc kiểm tra exists() nằm tiếp ở main())."
      }
    ],
    "commonMistakes": [
      "Không kiểm tra đuôi .yaml trước khi trả về ở nhánh target có giá trị (việc kiểm tra exists() nằm tiếp ở main())."
    ],
    "relatedFiles": [
      "src/download.py"
    ],
    "codeBlock": {
      "file": "src/download.py",
      "lines": "L89-L106",
      "code": "def get_config_path(args_path=None):\n    \"\"\"Xác định đường dẫn file cấu hình YAML.\"\"\"\n    target = args_path or os.environ.get(\"PIPELINE_CONFIG\")\n    if target:\n        cfg_path = Path(target)\n        if not cfg_path.is_absolute():\n            cwd_path = Path.cwd() / cfg_path\n            cfg_path = cwd_path if cwd_path.exists() else PROJECT_ROOT / cfg_path\n        return cfg_path\n\n    default_config = PROJECT_ROOT / \"configs\" / \"mexico-city.yaml\"\n    if default_config.exists():\n        return default_config\n"
    }
  },
  {
    "id": "vc-012",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/download.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/download.py` (`L109–L158`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nếu 15/16 tệp thành công và 1 tệp thất bại, main() trả về mã gì?",
    "quickAnswer": "Phân tích tham số dòng lệnh, đọc data_root & snapshots từ YAML và tải đủ 16 tệp (4 bảng × 4 mốc thời gian). Cụ thể: Danh sách errors khác rỗng nên gọi sys.exit(1), báo run_pipeline.py dừng pipeline để không lọc thiếu.",
    "explanation": "**Chữ ký:** `def main():`.\n**Luồng chạy:** Parse positional config_pos, --config và --force qua argparse. -> Đọc YAML qua yaml.safe_load(), kiểm tra bắt buộc phải có data_root và snapshots. -> Sắp xếp danh sách snapshots theo thứ tự chuỗi ngày và lặp lồng 4 tệp trong FILES..\n**Input:** CLI flags (--config, --force) -> **Output:** 16 tệp trong data/raw/{snapshot}/; thoát 0 nếu đủ 16/16 hoặc sys.exit(1) nếu thiếu..\n**Giải đáp sâu:** Danh sách errors khác rỗng nên gọi sys.exit(1), báo run_pipeline.py dừng pipeline để không lọc thiếu.",
    "projectLink": "src/download.py:L109-L158",
    "codeLocation": "src/download.py:L109-L158",
    "proofExample": "Ví dụ: `python src/download.py --config configs/mexico-city.yaml -> \"Kết quả: 16/16 tệp hợp lệ.\"`. Sử dụng tại: Chặng 1 của STEPS trong run_pipeline.py.",
    "followUpQuestions": [
      "Trong `src/download.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/download.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu sửa tên tệp hoặc cấu trúc thư mục trên máy chủ Inside Airbnb (như data/ vs visualisations/), URL ghép cứng sẽ trả 404."
      }
    ],
    "commonMistakes": [
      "Nếu sửa tên tệp hoặc cấu trúc thư mục trên máy chủ Inside Airbnb (như data/ vs visualisations/), URL ghép cứng sẽ trả 404."
    ],
    "relatedFiles": [
      "src/download.py"
    ],
    "codeBlock": {
      "file": "src/download.py",
      "lines": "L109-L158",
      "code": "def main():\n    parser = argparse.ArgumentParser(description=\"Download Inside Airbnb raw data\")\n    parser.add_argument(\"config_pos\", nargs=\"?\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    parser.add_argument(\"--force\", action=\"store_true\", help=\"Bắt buộc tải lại dù file đã tồn tại\")\n    args = parser.parse_args()\n\n    cfg_file = get_config_path(args.config or args.config_pos)\n\n    if not cfg_file.exists():\n        sys.exit(f\"Không tìm thấy file cấu hình: {cfg_file}\")\n\n    try:\n        with open(cfg_file, encoding=\"utf-8\") as f:"
    }
  },
  {
    "id": "vc-013",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: _normalise_id`.",
    "question": "Đọc hiểu hàm `_normalise_id()` trong `src/filter_data_from_sheet.py` (`L33–L36`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao không viết astype(str) thường mà dùng astype(\"string\")?",
    "quickAnswer": "Chuẩn hóa Series chứa ID thành kiểu chuỗi sạch (ép string, bỏ khoảng trắng đầu/cuối, đổi NA thành \"\"). Cụ thể: astype(\"string\") dùng StringDtype của pandas giữ ngữ nghĩa chuẩn chuỗi và hoạt động nhất quán với .str.strip().fillna(\"\").",
    "explanation": "**Chữ ký:** `def _normalise_id(values: pd.Series) -> pd.Series:`.\n**Luồng chạy:** Gọi values.astype(\"string\").str.strip().fillna(\"\"). -> Trả về pandas Series đồng nhất định dạng chuỗi..\n**Input:** values (pd.Series chứa ID thô) -> **Output:** pd.Series (kiểu string không có khoảng trắng dư và không còn <NA>)..\n**Giải đáp sâu:** astype(\"string\") dùng StringDtype của pandas giữ ngữ nghĩa chuẩn chuỗi và hoạt động nhất quán với .str.strip().fillna(\"\").",
    "projectLink": "src/filter_data_from_sheet.py:L33-L36",
    "codeLocation": "src/filter_data_from_sheet.py:L33-L36",
    "proofExample": "Ví dụ: `_normalise_id(pd.Series([\" 12345 \", None])) -> Series([\"12345\", \"\"])`. Sử dụng tại: Dùng trong _filter_assignments(), _filter_raw_by_ids() và run_filter_data().",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_normalise_id` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_normalise_id` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu đầu vào bị đọc thành float trước đó (chứa \".0\" ở cuối như \"123.0\"), _normalise_id chỉ strip chứ không tự xóa \".0\" — nên luôn phải ép dtype=\"string\" ngay từ read_csv()."
      }
    ],
    "commonMistakes": [
      "Nếu đầu vào bị đọc thành float trước đó (chứa \".0\" ở cuối như \"123.0\"), _normalise_id chỉ strip chứ không tự xóa \".0\" — nên luôn phải ép dtype=\"string\" ngay từ read_csv()."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L33-L36",
      "code": "def _normalise_id(values: pd.Series) -> pd.Series:\n    return (\n        values.astype(\"string\").str.strip().fillna(\"\")\n    )"
    }
  },
  {
    "id": "vc-014",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: _read_sheet`.",
    "question": "Đọc hiểu hàm `_read_sheet()` trong `src/filter_data_from_sheet.py` (`L39–L55`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tham số keep_default_na=False khi đọc Google Sheets có tác dụng gì?",
    "quickAnswer": "Tải một tab cụ thể của Google Sheets thông qua endpoint Google Visualization API (/gviz/tq?tqx=out:csv). Cụ thể: Ngăn pandas tự đổi các chuỗi ngắn như \"NA\" hay ô trống thành NaN, giữ nguyên chuỗi gốc để lọc chính xác cờ \"x\".",
    "explanation": "**Chữ ký:** `def _read_sheet(spreadsheet_id: str, sheet_name: str) -> pd.DataFrame:`.\n**Luồng chạy:** Mã hóa tên sheet bằng urllib.parse.quote(sheet_name) ghép vào URL Google Sheets CSV. -> Gửi requests.get(url, timeout=60) và kiểm tra resp.raise_for_status(). -> Giải mã UTF-8-SIG (loại BOM) qua StringIO và đọc bằng pd.read_csv(..., dtype=\"string\", keep_default_na=False)..\n**Input:** spreadsheet_id (str), sheet_name (str) -> **Output:** pd.DataFrame toàn bộ các cột dưới dạng string..\n**Giải đáp sâu:** Ngăn pandas tự đổi các chuỗi ngắn như \"NA\" hay ô trống thành NaN, giữ nguyên chuỗi gốc để lọc chính xác cờ \"x\".",
    "projectLink": "src/filter_data_from_sheet.py:L39-L55",
    "codeLocation": "src/filter_data_from_sheet.py:L39-L55",
    "proofExample": "Ví dụ: `_read_sheet(\"<sheet_id>\", \"Review\") -> DataFrame các dòng phân công review.`. Sử dụng tại: Được _load_assignments() gọi hai lần cho tab Listing và tab Review.",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_read_sheet` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_read_sheet` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu bảng tính Google Sheets mất mạng hoặc bị thu hồi quyền \"Anyone with link can view\", request trả HTML gây ParserError hoặc HTTPError."
      }
    ],
    "commonMistakes": [
      "Nếu bảng tính Google Sheets mất mạng hoặc bị thu hồi quyền \"Anyone with link can view\", request trả HTML gây ParserError hoặc HTTPError."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L39-L55",
      "code": "def _read_sheet(spreadsheet_id: str, sheet_name: str) -> pd.DataFrame:\n    url = (\n        f\"https://docs.google.com/spreadsheets/d/{spreadsheet_id}\"\n        f\"/gviz/tq?tqx=out:csv&sheet={quote(sheet_name)}\"\n    )\n    response = requests.get(url, timeout=60)\n    response.raise_for_status()\n    try:\n        return pd.read_csv(\n            StringIO(response.content.decode(\"utf-8-sig\")),\n            dtype=\"string\",\n            keep_default_na=False,\n        )\n    except pd.errors.ParserError as exc:"
    }
  },
  {
    "id": "vc-015",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: _filter_assignments`.",
    "question": "Đọc hiểu hàm `_filter_assignments()` trong `src/filter_data_from_sheet.py` (`L58–L69`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nếu trên Google Sheets có khoảng trắng dư trong tên nhóm nhưng YAML không có thì sao?",
    "quickAnswer": "Lọc bảng phân công chung của cả học phần để giữ lại đúng hàng của lớp và nhóm cấu hình trong YAML. Cụ thể: Phép so sánh .eq() so khớp chính xác chuỗi nên sẽ trả về 0 dòng và _load_assignments() lập tức báo ValueError.",
    "explanation": "**Chữ ký:** `def _filter_assignments(`.\n**Luồng chạy:** Lọc các hàng có cột ASSIGNMENT_HEADERS[\"class\"] == class_name và ASSIGNMENT_HEADERS[\"group\"] == group. -> Tạo .copy() tách khỏi bảng gốc (tuân thủ Copy-on-Write). -> Chuẩn hóa cột id_column bằng _normalise_id()..\n**Input:** assignments (pd.DataFrame), class_name (str), group (str), id_column (str) -> **Output:** pd.DataFrame chỉ chứa bản ghi phân công của đúng nhóm..\n**Giải đáp sâu:** Phép so sánh .eq() so khớp chính xác chuỗi nên sẽ trả về 0 dòng và _load_assignments() lập tức báo ValueError.",
    "projectLink": "src/filter_data_from_sheet.py:L58-L69",
    "codeLocation": "src/filter_data_from_sheet.py:L58-L69",
    "proofExample": "Ví dụ: `_filter_assignments(df_sheet, \"Lớp\", \"Nhóm\", \"listing_id\") -> DataFrame 1.000 dòng.`. Sử dụng tại: Được _load_assignments() gọi cho cả tab Listing (1.000) và Review (5.000).",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_filter_assignments` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_filter_assignments` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu tên cột trên Google Sheets đổi khác ASSIGNMENT_HEADERS, hàm sẽ ném KeyError."
      }
    ],
    "commonMistakes": [
      "Nếu tên cột trên Google Sheets đổi khác ASSIGNMENT_HEADERS, hàm sẽ ném KeyError."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L58-L69",
      "code": "def _filter_assignments(\n    assignments: pd.DataFrame,\n    class_name: str,\n    group: str,\n    id_column: str,\n) -> pd.DataFrame:\n    selected = assignments.loc[\n        assignments[ASSIGNMENT_HEADERS[\"class\"]].eq(class_name)\n        & assignments[ASSIGNMENT_HEADERS[\"group\"]].eq(group)\n    ].copy()\n    selected[id_column] = _normalise_id(selected[id_column])\n    return selected"
    }
  },
  {
    "id": "vc-016",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: _load_assignments`.",
    "question": "Đọc hiểu hàm `_load_assignments()` trong `src/filter_data_from_sheet.py` (`L72–L112`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao _load_assignments truyền id_column khác nhau cho 2 sheet?",
    "quickAnswer": "Đọc cấu hình mục assignment từ YAML và tải đồng thời 2 DataFrame phân công (Listing 1.000 và Review 5.000). Cụ thể: Tab Listing giao theo cột \"listing_id\", còn tab Review giao chính xác từng bình luận theo cột \"review_id\".",
    "explanation": "**Chữ ký:** `def _load_assignments(`.\n**Luồng chạy:** Kiểm tra block assignment phải là dict và đủ class, group, spreadsheet_id. -> Gọi _read_sheet() + _filter_assignments() cho cả sheet \"Listing\" (theo listing_id) và sheet \"Review\" (theo review_id). -> Kiểm tra nếu một trong hai bảng rỗng -> ném ValueError dừng sớm..\n**Input:** config (dict từ YAML) -> **Output:** Tuple (listing_df, review_df)..\n**Giải đáp sâu:** Tab Listing giao theo cột \"listing_id\", còn tab Review giao chính xác từng bình luận theo cột \"review_id\".",
    "projectLink": "src/filter_data_from_sheet.py:L72-L112",
    "codeLocation": "src/filter_data_from_sheet.py:L72-L112",
    "proofExample": "Ví dụ: `listing, review = _load_assignments(config) -> (1000 dòng, 5000 dòng).`. Sử dụng tại: Được gọi ở bước đầu của run_filter_data().",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_assignments` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_assignments` nếu dữ liệu đầu vào bất thường?",
        "a": "Phụ thuộc kết nối Internet tới Google Sheets mỗi lần chạy Filter nếu chưa có bản cache sheet offline."
      }
    ],
    "commonMistakes": [
      "Phụ thuộc kết nối Internet tới Google Sheets mỗi lần chạy Filter nếu chưa có bản cache sheet offline."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L72-L112",
      "code": "def _load_assignments(\n    config: dict[str, Any],\n) -> tuple[pd.DataFrame, pd.DataFrame]:\n    assignment = config.get(\"assignment\")\n    if not isinstance(assignment, dict):\n        raise ValueError(\"Config thiếu mapping 'assignment'.\")\n\n    class_name, group, spreadsheet_id = (\n        str(assignment.get(key, \"\")).strip()\n        for key in (\"class\", \"group\", \"spreadsheet_id\")\n    )\n    if not all((class_name, group, spreadsheet_id)):\n        raise ValueError(\n            \"Cần cấu hình assignment.class, assignment.group và \""
    }
  },
  {
    "id": "vc-017",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: _filter_raw_by_ids`.",
    "question": "Đọc hiểu hàm `_filter_raw_by_ids()` trong `src/filter_data_from_sheet.py` (`L115–L146`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao không dùng _filter_raw_by_ids với key=\"listing_id\" cho file reviews.csv.gz?",
    "quickAnswer": "Đọc file .csv.gz lớn theo từng lô chunksize=100_000, giữ ID dạng string và lọc theo bảng băm Python set O(1). Cụ thể: Vì bảng phân công chỉ định 5.000 review_id cụ thể chứ không phải toàn bộ review của 1.000 listing; lọc bằng listing_id sẽ lấy thừa hàng chục nghìn review.",
    "explanation": "**Chữ ký:** `def _filter_raw_by_ids(`.\n**Luồng chạy:** Kiểm tra tệp thô tồn tại; chuyển assigned_ids thành allowed = set(assigned_ids). -> Khởi tạo iterator pd.read_csv(compression=\"infer\", dtype={\"id\":\"string\",\"listing_id\":\"string\"}, chunksize=chunksize). -> Với mỗi chunk: xác nhận cột key có tồn tại, chuẩn hóa _normalise_id(chunk[key]), lọc chunk[key].isin(allowed).copy()..\n**Input:** path (Path), key (str), assigned_ids (pd.Series), chunksize (int=100_000) -> **Output:** pd.DataFrame đã lọc..\n**Giải đáp sâu:** Vì bảng phân công chỉ định 5.000 review_id cụ thể chứ không phải toàn bộ review của 1.000 listing; lọc bằng listing_id sẽ lấy thừa hàng chục nghìn review.",
    "projectLink": "src/filter_data_from_sheet.py:L115-L146",
    "codeLocation": "src/filter_data_from_sheet.py:L115-L146",
    "proofExample": "Ví dụ: `_filter_raw_by_ids(Path(\".../reviews.csv.gz\"), \"id\", review_ids) -> DataFrame 5.000 reviews.`. Sử dụng tại: Lọc cả listings.csv.gz (key=\"id\"), calendar.csv.gz (key=\"listing_id\") và reviews.csv.gz (key=\"id\").",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_filter_raw_by_ids` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_filter_raw_by_ids` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu file raw bị lỗi nén gzip giữa chừng do bước Download chưa trọn vẹn, vòng lặp chunk sẽ văng EOFError/OSError."
      }
    ],
    "commonMistakes": [
      "Nếu file raw bị lỗi nén gzip giữa chừng do bước Download chưa trọn vẹn, vòng lặp chunk sẽ văng EOFError/OSError."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L115-L146",
      "code": "def _filter_raw_by_ids(\n    path: Path,\n    key: str,\n    assigned_ids: pd.Series,\n    *,\n    chunksize: int = 100_000,\n) -> pd.DataFrame:\n    if not path.is_file():\n        raise FileNotFoundError(f\"Không tìm thấy raw data: {path}\")\n\n    allowed = set(assigned_ids)\n    chunks: list[pd.DataFrame] = []\n    for chunk in pd.read_csv(\n        path,"
    }
  },
  {
    "id": "vc-018",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: _save_frame`.",
    "question": "Đọc hiểu hàm `_save_frame()` trong `src/filter_data_from_sheet.py` (`L149–L151`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao không xuất luôn .csv.gz ở thư mục processed?",
    "quickAnswer": "Tạo thư mục cha nếu chưa có và xuất DataFrame ra tệp CSV chuẩn UTF-8 không kèm chỉ mục hàng. Cụ thể: Sau khi lọc còn 1.000–5.000 dòng, kích thước CSV rất nhỏ và đọc ghi trực tiếp ở bước QA/KPI nhanh và dễ mở kiểm tra.",
    "explanation": "**Chữ ký:** `def _save_frame(frame: pd.DataFrame, path: Path) -> None:`.\n**Luồng chạy:** Gọi path.parent.mkdir(parents=True, exist_ok=True). -> Gọi frame.to_csv(path, index=False, encoding=\"utf-8\")..\n**Input:** frame (pd.DataFrame), path (Path) -> **Output:** None; side-effect ghi tệp CSV ra ổ đĩa..\n**Giải đáp sâu:** Sau khi lọc còn 1.000–5.000 dòng, kích thước CSV rất nhỏ và đọc ghi trực tiếp ở bước QA/KPI nhanh và dễ mở kiểm tra.",
    "projectLink": "src/filter_data_from_sheet.py:L149-L151",
    "codeLocation": "src/filter_data_from_sheet.py:L149-L151",
    "proofExample": "Ví dụ: `_save_frame(listings, Path(\"data/processed/2026-06-15/listings.csv\"))`. Sử dụng tại: Lưu 5 tệp CSV cho mỗi snapshot trong run_filter_data().",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_save_frame` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_save_frame` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu bỏ index=False, file CSV sẽ sinh cột \"Unnamed: 0\" dư thừa cho bước sau."
      }
    ],
    "commonMistakes": [
      "Nếu bỏ index=False, file CSV sẽ sinh cột \"Unnamed: 0\" dư thừa cho bước sau."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L149-L151",
      "code": "def _save_frame(frame: pd.DataFrame, path: Path) -> None:\n    path.parent.mkdir(parents=True, exist_ok=True)\n    frame.to_csv(path, index=False, encoding=\"utf-8\")"
    }
  },
  {
    "id": "vc-019",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: run_filter_data`.",
    "question": "Đọc hiểu hàm `run_filter_data()` trong `src/filter_data_from_sheet.py` (`L154–L234`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Hàm map(area_by_listing) gán cột analysis_area hoạt động ra sao nếu có 1 ID không nằm trong dict?",
    "quickAnswer": "Điều phối lọc dữ liệu phân công trên toàn bộ 4 mốc snapshot: sao chép GeoJSON, lọc listings (gắn analysis_area), calendar, reviews, reviews_llm và reviews_labeled. Cụ thể: Series.map(dict) trả về NaN cho những khóa vắng mặt trong từ điển.",
    "explanation": "**Chữ ký:** `def run_filter_data(`.\n**Luồng chạy:** Đọc YAML, sắp xếp snapshots theo thời gian, gọi _load_assignments() lấy listing_ids, review_ids, area_by_listing, llm_ids, manual_ids. -> Trong vòng lặp 4 snapshot: copy neighbourhoods.geojson một lần sang data/processed/. -> Lọc listings theo key=\"id\", ánh xạ cột analysis_area = _normalise_id(listings[\"id\"]).map(area_by_listing)..\n**Input:** config_path (Path), raw_dir (Path), output_dir (Path) -> **Output:** Tạo trọn bộ data/processed/{snap}/{listings,calendar,reviews,reviews_llm,reviews_labeled}.csv và neighbourhoods.geojson..\n**Giải đáp sâu:** Series.map(dict) trả về NaN cho những khóa vắng mặt trong từ điển.",
    "projectLink": "src/filter_data_from_sheet.py:L154-L234",
    "codeLocation": "src/filter_data_from_sheet.py:L154-L234",
    "proofExample": "Ví dụ: `run_filter_data(Path(\"configs/mexico-city.yaml\")) -> log listings=1000, reviews=5000, LLM=1000, manual=100.`. Sử dụng tại: Hàm lõi được main() của filter_data_from_sheet.py gọi.",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `run_filter_data` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `run_filter_data` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu snapshot t1 trên nguồn thiếu listing mới mở sau này, panel 1.000 căn có thể lệch nếu không kiểm tra len(listings)."
      }
    ],
    "commonMistakes": [
      "Nếu snapshot t1 trên nguồn thiếu listing mới mở sau này, panel 1.000 căn có thể lệch nếu không kiểm tra len(listings)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L154-L234",
      "code": "def run_filter_data(\n    config_path: Path,\n    raw_dir: Path = RAW_DIR,\n    output_dir: Path = PROCESSED_DIR,\n) -> None:\n    config_path = config_path if config_path.is_absolute() or config_path.exists() else PROJECT_ROOT / config_path\n    config_path = config_path.resolve()\n    with config_path.open(encoding=\"utf-8\") as config_file:\n        config = yaml.safe_load(config_file)\n    if not isinstance(config, dict):\n        raise ValueError(f\"Config phải là YAML mapping: {config_path}\")\n\n    snapshots = sorted((str(snapshot).strip() for snapshot in config.get(\"snapshots\", [])), key=pd.to_datetime)\n    area_col = str("
    }
  },
  {
    "id": "vc-020",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: _parse_args`.",
    "question": "Đọc hiểu hàm `_parse_args()` trong `src/filter_data_from_sheet.py` (`L237–L248`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tác dụng của --raw-dir và --output-dir trong _parse_args() là gì?",
    "quickAnswer": "Khai báo và phân tích các tham số CLI --config, --raw-dir và --output-dir cho module Filter. Cụ thể: Cho phép kiểm thử hàm lọc trên một thư mục dữ liệu mẫu nhỏ mà không ghi đè data/processed/ thật.",
    "explanation": "**Chữ ký:** `def _parse_args() -> argparse.Namespace:`.\n**Luồng chạy:** Dùng argparse.ArgumentParser nhận 3 Path arguments có giá trị mặc định rõ ràng..\n**Input:** CLI flags -> **Output:** argparse.Namespace.\n**Giải đáp sâu:** Cho phép kiểm thử hàm lọc trên một thư mục dữ liệu mẫu nhỏ mà không ghi đè data/processed/ thật.",
    "projectLink": "src/filter_data_from_sheet.py:L237-L248",
    "codeLocation": "src/filter_data_from_sheet.py:L237-L248",
    "proofExample": "Ví dụ: `python src/filter_data_from_sheet.py --config configs/mexico-city.yaml`. Sử dụng tại: Được main() gọi đầu tiên.",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_parse_args` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `_parse_args` nếu dữ liệu đầu vào bất thường?",
        "a": "Không có; giá trị đường dẫn tương đối sẽ được run_filter_data() giải quyết tiếp."
      }
    ],
    "commonMistakes": [
      "Không có; giá trị đường dẫn tương đối sẽ được run_filter_data() giải quyết tiếp."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L237-L248",
      "code": "def _parse_args() -> argparse.Namespace:\n    parser = argparse.ArgumentParser(\n        description=\"Filter assigned listings, calendar and reviews from raw data.\"\n    )\n    parser.add_argument(\n        \"--config\",\n        type=Path,\n        default=Path(os.environ.get(\"PIPELINE_CONFIG\", PROJECT_ROOT / \"configs\" / \"mexico-city.yaml\")),\n    )\n    parser.add_argument(\"--raw-dir\", type=Path, default=RAW_DIR)\n    parser.add_argument(\"--output-dir\", type=Path, default=PROCESSED_DIR)\n    return parser.parse_args()"
    }
  },
  {
    "id": "vc-021",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "code",
    "topics": [
      "File I/O",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/filter_data_from_sheet.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/filter_data_from_sheet.py` (`L251–L270`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao main() dùng `raise SystemExit(main())` ở cuối file?",
    "quickAnswer": "Hàm bao bọc CLI cho bước Filter, thiết lập UTF-8 stdout và chuyển đổi các lỗi phổ biến thành exit code 1 sạch sẽ. Cụ thể: Đây là chuẩn Python để trả chính xác mã thoát integer (0/1) về cho hệ điều hành hoặc subprocess.run(check=True).",
    "explanation": "**Chữ ký:** `def main() -> int:`.\n**Luồng chạy:** Cấu hình sys.stdout UTF-8 để tránh lỗi font Windows. -> Gọi run_filter_data() trong khối try/except bắt OSError, ValueError, YAMLError, ParserError, RequestException. -> Trả về 0 nếu thành công, 1 (in ra stderr) nếu lỗi..\n**Input:** CLI args -> **Output:** int (0 hoặc 1 dùng với raise SystemExit(main()))..\n**Giải đáp sâu:** Đây là chuẩn Python để trả chính xác mã thoát integer (0/1) về cho hệ điều hành hoặc subprocess.run(check=True).",
    "projectLink": "src/filter_data_from_sheet.py:L251-L270",
    "codeLocation": "src/filter_data_from_sheet.py:L251-L270",
    "proofExample": "Ví dụ: `raise SystemExit(main())`. Sử dụng tại: Điểm vào chính khi run_pipeline.py gọi src/filter_data_from_sheet.py.",
    "followUpQuestions": [
      "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/filter_data_from_sheet.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Các lỗi lập trình ngoài danh sách except (vd KeyError do sai header sheet) vẫn sẽ traceback đầy đủ giúp debug."
      }
    ],
    "commonMistakes": [
      "Các lỗi lập trình ngoài danh sách except (vd KeyError do sai header sheet) vẫn sẽ traceback đầy đủ giúp debug."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ],
    "codeBlock": {
      "file": "src/filter_data_from_sheet.py",
      "lines": "L251-L270",
      "code": "def main() -> int:\n    if callable(getattr(sys.stdout, \"reconfigure\", None)):\n        sys.stdout.reconfigure(encoding=\"utf-8\", errors=\"replace\")\n    args = _parse_args()\n    try:\n        run_filter_data(\n            config_path=args.config,\n            raw_dir=args.raw_dir,\n            output_dir=args.output_dir,\n        )\n    except (\n        OSError,\n        ValueError,\n        yaml.YAMLError,"
    }
  },
  {
    "id": "vc-022",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: build_schemas`.",
    "question": "Đọc hiểu hàm `build_schemas()` trong `src/llm.py` (`L28–L39`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao overall_sentiment chỉ có 3 giá trị còn mỗi aspect lại có tới 4 giá trị?",
    "quickAnswer": "Tạo động 2 class Pydantic (AspectSentiment và ReviewAnalysis) dựa trên danh sách khía cạnh từ YAML để dùng làm Structured Output schema cho Gemini. Cụ thể: Mọi review đều mang sắc thái tổng thể (positive/mixed/negative), trong khi một khía cạnh cụ thể hoàn toàn có thể không được nhắc tới (not_mentioned).",
    "explanation": "**Chữ ký:** `def build_schemas(aspects: List[str]):`.\n**Luồng chạy:** Dựng dict fields ánh xạ từng tên aspect -> (SentimentLiteral, ...). -> Gọi pydantic.create_model(\"AspectSentiment\", **fields). -> Tạo model ReviewAnalysis chứa id (str), language (str), overall_sentiment (Literal 3 giá trị) và aspects (AspectSentiment)..\n**Input:** aspects (List[str], vd 7 khía cạnh trong config) -> **Output:** Tuple (AspectSentiment class, ReviewAnalysis class)..\n**Giải đáp sâu:** Mọi review đều mang sắc thái tổng thể (positive/mixed/negative), trong khi một khía cạnh cụ thể hoàn toàn có thể không được nhắc tới (not_mentioned).",
    "projectLink": "src/llm.py:L28-L39",
    "codeLocation": "src/llm.py:L28-L39",
    "proofExample": "Ví dụ: `aspect_m, rev_m = build_schemas([\"location\", \"noise\"])`. Sử dụng tại: Gọi ở cấp module (mặc định 7 khía cạnh) và trong main() theo YAML.",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `build_schemas` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `build_schemas` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu tên khía cạnh trong YAML chứa khoảng trắng hoặc ký tự không phải định danh Python hợp lệ, create_model sẽ lỗi."
      }
    ],
    "commonMistakes": [
      "Nếu tên khía cạnh trong YAML chứa khoảng trắng hoặc ký tự không phải định danh Python hợp lệ, create_model sẽ lỗi."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L28-L39",
      "code": "def build_schemas(aspects: List[str]):\n    \"\"\"Tạo động AspectSentiment và ReviewAnalysis từ danh sách llm.aspects trong config.\"\"\"\n    fields = {str(a).strip(): (SentimentLiteral, ...) for a in aspects if str(a).strip()}\n    aspect_model = create_model(\"AspectSentiment\", **fields)\n    review_model = create_model(\n        \"ReviewAnalysis\",\n        id=(str, Field(description=\"Mã định danh ID của review\")),\n        language=(str, Field(description='Mã ngôn ngữ ISO 639-1 viết thường 2 ký tự (vd: es, en, fr) hoặc \"und\"')),\n        overall_sentiment=(Literal[\"positive\", \"mixed\", \"negative\"], Field(description=\"Cảm xúc tổng thể\")),\n        aspects=(aspect_model, Field(description=f\"Cảm xúc theo {len(fields)} khía cạnh quy chuẩn\")),\n    )\n    return aspect_model, review_model"
    }
  },
  {
    "id": "vc-023",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: load_config`.",
    "question": "Đọc hiểu hàm `load_config()` trong `src/llm.py` (`L49–L56`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tên model trong YAML của Nhóm 4 là gì?",
    "quickAnswer": "Đọc file cấu hình YAML cho mô-đun LLM (lấy tên model, batch_size, danh sách aspects, đường dẫn cache và output CSV). Cụ thể: gemini-3.5-flash-lite với batch_size: 5.",
    "explanation": "**Chữ ký:** `def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:`.\n**Luồng chạy:** Xác định cfg_path, kiểm tra tồn tại, dùng yaml.safe_load()..\n**Input:** config_path_str (Optional[str]) -> **Output:** Dict[str, Any].\n**Giải đáp sâu:** gemini-3.5-flash-lite với batch_size: 5.",
    "projectLink": "src/llm.py:L49-L56",
    "codeLocation": "src/llm.py:L49-L56",
    "proofExample": "Ví dụ: `config = load_config(\"configs/mexico-city.yaml\")`. Sử dụng tại: Gọi đầu tiên trong main() của src/llm.py.",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?",
        "a": "Thiếu khóa llm trong YAML sẽ dùng các giá trị fallback trong main()."
      }
    ],
    "commonMistakes": [
      "Thiếu khóa llm trong YAML sẽ dùng các giá trị fallback trong main()."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L49-L56",
      "code": "def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:\n    \"\"\"Nạp cấu hình từ file YAML (từ CLI, biến môi trường PIPELINE_CONFIG hoặc mặc định).\"\"\"\n    cfg_path = Path(config_path_str or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\"))\n    cfg_path = cfg_path if cfg_path.is_absolute() else PROJECT_ROOT / cfg_path\n    if not cfg_path.exists():\n        raise FileNotFoundError(f\"[LLM] Không tìm thấy file cấu hình: {cfg_path}\")\n    with cfg_path.open(\"r\", encoding=\"utf-8\") as f:\n        return yaml.safe_load(f)"
    }
  },
  {
    "id": "vc-024",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: load_assigned_reviews`.",
    "question": "Đọc hiểu hàm `load_assigned_reviews()` trong `src/llm.py` (`L59–L85`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao chỉ đọc 1 tệp reviews_llm.csv chứ không đọc cả 4 snapshot?",
    "quickAnswer": "Đọc danh sách 1.000 review cần gán nhãn LLM từ tệp reviews_llm.csv mới nhất sẵn có trong data/processed/. Cụ thể: Vì 1.000 Mẫu LLM được chọn cố định từ bảng phân công review, giống hệt nhau ở các mốc snapshot nên không cần đọc lặp tốn API.",
    "explanation": "**Chữ ký:** `def load_assigned_reviews(config: Dict[str, Any]) -> pd.DataFrame:`.\n**Luồng chạy:** Duyệt reversed(snapshots) tìm tệp data/processed/{snap}/reviews_llm.csv đầu tiên tồn tại. -> Đọc CSV với dtype={\"id\": \"string\", \"listing_id\": \"string\"}, strip ID và fillna(\"\") cho comments. -> Nếu không thấy theo tên snapshot chuẩn, thử glob */reviews_llm.csv làm dự phòng..\n**Input:** config (Dict) -> **Output:** pd.DataFrame chứa 1.000 reviews phân công LLM..\n**Giải đáp sâu:** Vì 1.000 Mẫu LLM được chọn cố định từ bảng phân công review, giống hệt nhau ở các mốc snapshot nên không cần đọc lặp tốn API.",
    "projectLink": "src/llm.py:L59-L85",
    "codeLocation": "src/llm.py:L59-L85",
    "proofExample": "Ví dụ: `df = load_assigned_reviews(cfg) -> 1.000 dòng.`. Sử dụng tại: Gọi trong main() của src/llm.py trước khi đối chiếu cache.",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_assigned_reviews` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_assigned_reviews` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu quên chạy Filter trước, hàm sẽ ném FileNotFoundError ngay lập tức."
      }
    ],
    "commonMistakes": [
      "Nếu quên chạy Filter trước, hàm sẽ ném FileNotFoundError ngay lập tức."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L59-L85",
      "code": "def load_assigned_reviews(config: Dict[str, Any]) -> pd.DataFrame:\n    \"\"\"\n    Nạp trực tiếp file reviews_llm.csv từ data/processed.\n    Do 1.000 listing được phân công cố định, reviews_llm ở các snapshot là đồng nhất.\n    Chỉ cần lấy ở một mốc snapshot có sẵn, không duyệt for nhiều mốc hay lấy từ raw.\n    \"\"\"\n    snapshots = sorted((str(s).strip() for s in config.get(\"snapshots\", [])), key=pd.to_datetime)\n    # Tìm mốc snapshot có sẵn reviews_llm.csv\n    for snap in reversed(snapshots):\n        path = PROJECT_ROOT / \"data\" / \"processed\" / str(snap) / \"reviews_llm.csv\"\n        if path.is_file():\n            df = pd.read_csv(path, dtype={\"id\": \"string\", \"listing_id\": \"string\"})\n            df[\"id\"] = df[\"id\"].astype(\"string\").str.strip()\n            df[\"comments\"] = df[\"comments\"].fillna(\"\")"
    }
  },
  {
    "id": "vc-025",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: load_cache`.",
    "question": "Đọc hiểu hàm `load_cache()` trong `src/llm.py` (`L92–L113`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nếu YAML bổ sung thêm khía cạnh thứ 8, load_cache() phản ứng ra sao?",
    "quickAnswer": "Đọc tệp cache JSONL từng dòng một, xác thực tính hợp lệ và độ đầy đủ khía cạnh (required_aspects) để khôi phục tiến độ trước đó. Cụ thể: Do has_aspects kiểm tra all(a in aspects for a in required_aspects), các bản ghi cũ thiếu trường thứ 8 sẽ bị loại khỏi cache để gọi bổ sung.",
    "explanation": "**Chữ ký:** `def load_cache(cache_path: Path, required_aspects: Optional[List[str]] = None) -> Dict[str, Any]:`.\n**Luồng chạy:** Nếu file chưa tồn tại trả dict rỗng {}. -> Đọc từng dòng JSONL; parse JSON, lấy review_id/id, language (lower), overall_sentiment và dict aspects. -> Chỉ giữ bản ghi hợp lệ đã có đủ mọi khía cạnh trong required_aspects; bỏ qua dòng hỏng JSON..\n**Input:** cache_path (Path), required_aspects (Optional[List[str]]) -> **Output:** Dict[str, Any] ánh xạ review_id -> bản ghi kết quả đã cache..\n**Giải đáp sâu:** Do has_aspects kiểm tra all(a in aspects for a in required_aspects), các bản ghi cũ thiếu trường thứ 8 sẽ bị loại khỏi cache để gọi bổ sung.",
    "projectLink": "src/llm.py:L92-L113",
    "codeLocation": "src/llm.py:L92-L113",
    "proofExample": "Ví dụ: `cache = load_cache(Path(\"data/processed/llm_cache.jsonl\"), [\"location\", ...]) -> len=1000`. Sử dụng tại: Gọi trong main() của src/llm.py trước cả process_pending_reviews() và export_cache_to_csv().",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_cache` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_cache` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu có 2 dòng trùng review_id trong tệp append-only JSONL, dòng đọc sau sẽ ghi đè bản ghi cũ trong dict `cache`."
      }
    ],
    "commonMistakes": [
      "Nếu có 2 dòng trùng review_id trong tệp append-only JSONL, dòng đọc sau sẽ ghi đè bản ghi cũ trong dict `cache`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L92-L113",
      "code": "def load_cache(cache_path: Path, required_aspects: Optional[List[str]] = None) -> Dict[str, Any]:\n    \"\"\"Đọc cache JSONL để kiểm tra các review đã được xử lý (tránh gọi API lặp).\"\"\"\n    if not cache_path.exists():\n        return {}\n    cache = {}\n    with cache_path.open(\"r\", encoding=\"utf-8\") as f:\n        for line in f:\n            line_str = line.strip()\n            if not line_str:\n                continue\n            try:\n                rec = json.loads(line_str)\n                r_id = str(rec.get(\"review_id\", rec.get(\"id\", \"\"))).strip()\n                lang = str(rec.get(\"language\") or \"\").strip().lower()"
    }
  },
  {
    "id": "vc-026",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: save_to_cache`.",
    "question": "Đọc hiểu hàm `save_to_cache()` trong `src/llm.py` (`L116–L120`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao lưu JSONL từng dòng ngay sau mỗi lô thay vì đợi xong 1.000 câu mới lưu một file CSV?",
    "quickAnswer": "Ghi nối thêm (append-only) ngay lập tức 1 bản ghi kết quả review vừa phân tích thành công xuống tệp JSONL. Cụ thể: Nếu bị ngắt mạng hoặc cạn quota RPD ở câu thứ 800, 795 câu trước vẫn an toàn trên đĩa.",
    "explanation": "**Chữ ký:** `def save_to_cache(cache_path: Path, record: Dict[str, Any]) -> None:`.\n**Luồng chạy:** Tạo thư mục cha nếu cần. -> Mở file ở chế độ \"a\" UTF-8 và ghi json.dumps(record, ensure_ascii=False) + \"\\n\"..\n**Input:** cache_path (Path), record (Dict) -> **Output:** None; side-effect ghi thêm 1 dòng JSONL xuống đĩa..\n**Giải đáp sâu:** Nếu bị ngắt mạng hoặc cạn quota RPD ở câu thứ 800, 795 câu trước vẫn an toàn trên đĩa.",
    "projectLink": "src/llm.py:L116-L120",
    "codeLocation": "src/llm.py:L116-L120",
    "proofExample": "Ví dụ: `save_to_cache(Path(\"data/processed/llm_cache.jsonl\"), rec)`. Sử dụng tại: Gọi ngay sau mỗi review hợp lệ trong process_pending_reviews().",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `save_to_cache` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `save_to_cache` nếu dữ liệu đầu vào bất thường?",
        "a": "Không nên vừa chạy 2 tiến trình ghi vào cùng tệp JSONL cùng lúc (có thể xen kẽ byte)."
      }
    ],
    "commonMistakes": [
      "Không nên vừa chạy 2 tiến trình ghi vào cùng tệp JSONL cùng lúc (có thể xen kẽ byte)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L116-L120",
      "code": "def save_to_cache(cache_path: Path, record: Dict[str, Any]) -> None:\n    \"\"\"Ghi thêm 1 bản ghi vào cache JSONL (không lưu summary/timestamp để tối ưu).\"\"\"\n    cache_path.parent.mkdir(parents=True, exist_ok=True)\n    with cache_path.open(\"a\", encoding=\"utf-8\") as f:\n        f.write(json.dumps(record, ensure_ascii=False) + \"\\n\")"
    }
  },
  {
    "id": "vc-027",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: _clean_str`.",
    "question": "Đọc hiểu hàm `_clean_str()` trong `src/llm.py` (`L123–L127`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Lỗi gì xảy ra nếu thay _clean_str(x) bằng str(x) khi reviewer_name bị NaN?",
    "quickAnswer": "Chuyển an toàn giá trị metadata sang chuỗi str, chuyển None/NaN/<NA> thành chuỗi rỗng \"\" thay vì chữ \"nan\". Cụ thể: Ô bị thiếu sẽ bị biến thành chuỗi văn bản chữ \"nan\" hoặc \"<NA>\" trong CSV.",
    "explanation": "**Chữ ký:** `def _clean_str(val: Any) -> str:`.\n**Luồng chạy:** Kiểm tra val is None or pd.isna(val) -> trả về \"\"; ngược lại trả str(val)..\n**Input:** val (Any) -> **Output:** str.\n**Giải đáp sâu:** Ô bị thiếu sẽ bị biến thành chuỗi văn bản chữ \"nan\" hoặc \"<NA>\" trong CSV.",
    "projectLink": "src/llm.py:L123-L127",
    "codeLocation": "src/llm.py:L123-L127",
    "proofExample": "Ví dụ: `_clean_str(pd.NA) -> \"\" (thay vì \"<NA>\")`. Sử dụng tại: Dùng trong export_cache_to_csv() và process_pending_reviews().",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `_clean_str` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `_clean_str` nếu dữ liệu đầu vào bất thường?",
        "a": "Không có; giúp dữ liệu metadata (reviewer_name, comments) sạch khi xuất CSV."
      }
    ],
    "commonMistakes": [
      "Không có; giúp dữ liệu metadata (reviewer_name, comments) sạch khi xuất CSV."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L123-L127",
      "code": "def _clean_str(val: Any) -> str:\n    \"\"\"Chuyển giá trị metadata sang chuỗi an toàn, tránh biến NaN/<NA> thành chuỗi 'nan'/'<NA>'.\"\"\"\n    if val is None or pd.isna(val):\n        return \"\"\n    return str(val)"
    }
  },
  {
    "id": "vc-028",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: export_cache_to_csv`.",
    "question": "Đọc hiểu hàm `export_cache_to_csv()` trong `src/llm.py` (`L130–L190`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao không tự gán \"positive\" cho các review bị thiếu nhãn khi xuất CSV?",
    "quickAnswer": "Kết hợp bảng reviews_llm.csv với từ điển cache để xuất file phẳng data/processed/reviews_sentiment.csv (15 cột), giữ NaN nếu thiếu. Cụ thể: Gán nhãn mặc định làm sai lệch thống kê và gian lận điểm Coverage giả tạo trong Evaluation.",
    "explanation": "**Chữ ký:** `def export_cache_to_csv(`.\n**Luồng chạy:** Lặp qua từng dòng của reviews_df (giữ đúng thứ tự 1.000 mẫu phân công). -> Tra cứu cached = cache.get(r_id). Nếu thiếu -> gán language=None, overall_sentiment=None, aspects={}. -> Gom metadata (id, listing_id, date, reviewer_id, reviewer_name, comments) và 7 cột aspect thành dict hàng..\n**Input:** reviews_df (DataFrame), cache (Dict), output_path (Path), aspect_keys (Optional[List[str]]) -> **Output:** Path tới reviews_sentiment.csv đã xuất..\n**Giải đáp sâu:** Gán nhãn mặc định làm sai lệch thống kê và gian lận điểm Coverage giả tạo trong Evaluation.",
    "projectLink": "src/llm.py:L130-L190",
    "codeLocation": "src/llm.py:L130-L190",
    "proofExample": "Ví dụ: `export_cache_to_csv(df, cache, Path(\"data/processed/reviews_sentiment.csv\")) -> 1.000 dòng`. Sử dụng tại: Bước cuối trong main() của src/llm.py (chạy cho cả chế độ thường và --skip-llm).",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `export_cache_to_csv` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `export_cache_to_csv` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu cache không đủ 1.000/1.000 khi chạy --skip-llm, file CSV vẫn xuất đủ 1.000 dòng nhưng có NaN (sẽ bị phạt Coverage ở evaluate.py)."
      }
    ],
    "commonMistakes": [
      "Nếu cache không đủ 1.000/1.000 khi chạy --skip-llm, file CSV vẫn xuất đủ 1.000 dòng nhưng có NaN (sẽ bị phạt Coverage ở evaluate.py)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L130-L190",
      "code": "def export_cache_to_csv(\n    reviews_df: pd.DataFrame,\n    cache: Dict[str, Any],\n    output_path: Path,\n    aspect_keys: Optional[List[str]] = None,\n) -> Path:\n    \"\"\"\n    Chuyển đổi kết quả trong cache thành file CSV dạng phẳng (tabular).\n    Các review chưa có trong cache được giữ trống (NaN), tuyệt đối không gán nhãn mặc định.\n    \"\"\"\n    rows = []\n    aspect_keys = [str(a) for a in (aspect_keys or AspectSentiment.model_fields.keys())]\n    missing_count = 0\n"
    }
  },
  {
    "id": "vc-029",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: init_client`.",
    "question": "Đọc hiểu hàm `init_client()` trong `src/llm.py` (`L197–L204`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao from google import genai lại import bên trong hàm init_client() thay vì đầu file?",
    "quickAnswer": "Khởi tạo đối tượng Gemini API Client (google.genai.Client) kèm cấu hình HTTP timeout (60.000 ms). Cụ thể: Giúp chạy --skip-llm hoặc import DEFAULT_ASPECTS từ evaluate.py hoàn toàn không cần nạp SDK nặng hoặc khi thiếu API Key.",
    "explanation": "**Chữ ký:** `def init_client(api_key: str, timeout_ms: int = 60_000):`.\n**Luồng chạy:** Lazy-import google.genai và types. -> Trả về genai.Client(api_key=api_key, http_options=types.HttpOptions(timeout=timeout_ms))..\n**Input:** api_key (str), timeout_ms (int=60_000) -> **Output:** google.genai.Client instance..\n**Giải đáp sâu:** Giúp chạy --skip-llm hoặc import DEFAULT_ASPECTS từ evaluate.py hoàn toàn không cần nạp SDK nặng hoặc khi thiếu API Key.",
    "projectLink": "src/llm.py:L197-L204",
    "codeLocation": "src/llm.py:L197-L204",
    "proofExample": "Ví dụ: `client = init_client(api_key)`. Sử dụng tại: Chỉ được gọi trong main() khi KHÔNG bật --skip-llm và còn pending_count > 0.",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `init_client` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `init_client` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu mạng treo vô thời hạn khi gọi API mà thiếu timeout_ms, pipeline có thể kẹt mãi."
      }
    ],
    "commonMistakes": [
      "Nếu mạng treo vô thời hạn khi gọi API mà thiếu timeout_ms, pipeline có thể kẹt mãi."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L197-L204",
      "code": "def init_client(api_key: str, timeout_ms: int = 60_000):\n    \"\"\"Khởi tạo Gemini Client từ google-genai với HTTP timeout (mặc định 60s).\"\"\"\n    from google import genai\n    from google.genai import types\n    return genai.Client(\n        api_key=api_key,\n        http_options=types.HttpOptions(timeout=timeout_ms),\n    )"
    }
  },
  {
    "id": "vc-030",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: build_batch_prompt`.",
    "question": "Đọc hiểu hàm `build_batch_prompt()` trong `src/llm.py` (`L207–L219`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao định nghĩa lớp mixed trong prompt nhấn mạnh \"khen lẫn góp ý dù nhẹ\"?",
    "quickAnswer": "Tạo chuỗi prompt ngắn gọn gồm quy tắc chấm 3 lớp tổng thể + 4 nhãn khía cạnh + mã ngôn ngữ ISO kèm danh sách review của một lô. Cụ thể: Khách Airbnb rất hay viết khen 90% câu và chê nhẹ 10% cuối câu (\"great place, just no hot water\"); nếu không định nghĩa chặt sẽ bị gom nhầm hết vào positive.",
    "explanation": "**Chữ ký:** `def build_batch_prompt(items: List[Dict[str, str]]) -> str:`.\n**Luồng chạy:** Bọc từng review dưới dạng ID: <id> và Text: \"\"\"<text>\"\"\". -> Ghép cùng hướng dẫn phân biệt positive/mixed/negative, cấm suy diễn (not_mentioned), quy ước ISO 639-1/\"und\"..\n**Input:** items (List[Dict[str, str]] chứa id và text) -> **Output:** str (prompt hoàn chỉnh gửi API)..\n**Giải đáp sâu:** Khách Airbnb rất hay viết khen 90% câu và chê nhẹ 10% cuối câu (\"great place, just no hot water\"); nếu không định nghĩa chặt sẽ bị gom nhầm hết vào positive.",
    "projectLink": "src/llm.py:L207-L219",
    "codeLocation": "src/llm.py:L207-L219",
    "proofExample": "Ví dụ: `build_batch_prompt([{\"id\": \"101\", \"text\": \"Great stay!\"}])`. Sử dụng tại: Gọi cho từng lô trong process_pending_reviews().",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `build_batch_prompt` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `build_batch_prompt` nếu dữ liệu đầu vào bất thường?",
        "a": "Bọc văn bản bằng ba dấu nháy \"\"\" giúp hạn chế prompt injection nếu review gốc chứa dấu ngoặc kép hoặc lệnh giả."
      }
    ],
    "commonMistakes": [
      "Bọc văn bản bằng ba dấu nháy \"\"\" giúp hạn chế prompt injection nếu review gốc chứa dấu ngoặc kép hoặc lệnh giả."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L207-L219",
      "code": "def build_batch_prompt(items: List[Dict[str, str]]) -> str:\n    \"\"\"Tạo prompt tinh gọn gửi theo lô (batch) tới Gemini API với quy tắc chấm nhất quán với baseline.\"\"\"\n    reviews_formatted = [f\"ID: {it['id']}\\nText: \\\"\\\"\\\"{it['text']}\\\"\\\"\\\"\" for it in items]\n    return f\"\"\"Bạn là chuyên gia phân tích đánh giá khách hàng Airbnb. Phân tích từng Review và trả về đúng JSON Schema theo quy tắc:\n1. overall_sentiment:\n   - positive: chỉ khen, không có điểm chê/bất tiện nào.\n   - mixed: có cả khen lẫn chê/góp ý bất tiện dù nhẹ (vd: nước nóng chậm, ồn nhẹ, thiếu đồ, nệm cứng, cầu thang...).\n   - negative: chủ yếu chê hoặc lỗi nghiêm trọng áp đảo.\n2. aspects (positive/mixed/negative/not_mentioned): chỉ gán khi câu văn nhắc trực tiếp, không suy diễn; nếu vừa khen vừa chê cùng khía cạnh thì gán mixed\n3. language: mã ISO 639-1 viết thường theo ngôn ngữ chính; \"und\" nếu rỗng, chỉ có emoji/số hoặc không xác định được.\n\n{chr(10).join(reviews_formatted)}\n\"\"\""
    }
  },
  {
    "id": "vc-031",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: QuotaExceededException`.",
    "question": "Đọc hiểu lớp ngoại lệ `QuotaExceededException` trong `src/llm.py` (`L222–L223`): Vai trò của lớp này trong xử lý lỗi API là gì?",
    "quickAnswer": "Lớp ngoại lệ chuyên biệt biểu thị lỗi 429 hết hạn ngạch ngày (RPD) để báo hiệu dừng toàn bộ vòng gọi API. Cụ thể: Để phân tách hẳn lỗi RPD (dừng ngay toàn bộ các lô sau) với lỗi RPM/mạng (chỉ thử lại chính lô đó).",
    "explanation": "**Chữ ký:** `class QuotaExceededException(Exception):`.\n**Luồng chạy:** Kế thừa trực tiếp Exception làm tín hiệu luồng điều khiển rõ ràng giữa call_llm_batch và process_pending_reviews..\n**Input:** Exception message string -> **Output:** Exception class.\n**Giải đáp sâu:** Để phân tách hẳn lỗi RPD (dừng ngay toàn bộ các lô sau) với lỗi RPM/mạng (chỉ thử lại chính lô đó).",
    "projectLink": "src/llm.py:L222-L223",
    "codeLocation": "src/llm.py:L222-L223",
    "proofExample": "Ví dụ: `raise QuotaExceededException(\"Hạn ngạch ngày đã cạn\")`. Sử dụng tại: Phát ra trong call_llm_batch() và bắt tại process_pending_reviews().",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `QuotaExceededException` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `QuotaExceededException` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu dùng nhầm Exception chung chung, caller không phân biệt được lỗi hết quota ngày với lỗi 1 batch đơn lẻ."
      }
    ],
    "commonMistakes": [
      "Nếu dùng nhầm Exception chung chung, caller không phân biệt được lỗi hết quota ngày với lỗi 1 batch đơn lẻ."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L222-L223",
      "code": "class QuotaExceededException(Exception):\n    \"\"\"Ném ra khi Gemini API trả về lỗi 429 RESOURCE_EXHAUSTED (chạm trần hạn ngạch ngày).\"\"\""
    }
  },
  {
    "id": "vc-032",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: _classify_rate_limit_error`.",
    "question": "Đọc hiểu hàm `_classify_rate_limit_error()` trong `src/llm.py` (`L226–L251`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nếu API trả về lỗi 503 Service Unavailable thì _classify_rate_limit_error trả về gì?",
    "quickAnswer": "Phân tích đối tượng ngoại lệ từ SDK để phân loại: \"daily\" (hết RPD), \"rate\" (quá tốc độ RPM/TPM tạm thời), hoặc None (lỗi khác). Cụ thể: Trả về None, nhờ vậy call_llm_batch đi vào nhánh delays = [5, 15, 30, 60]s thay vì chờ cooldown RPM.",
    "explanation": "**Chữ ký:** `def _classify_rate_limit_error(err: Exception) -> Optional[str]:`.\n**Luồng chạy:** Trích xuất code, status, details và chuỗi mô tả err. -> Kiểm tra xem có phải 429 / RESOURCE_EXHAUSTED không; nếu không trả về None. -> Nếu chuỗi thường chứa \"perday\", \"per_day\", \"requestsperday\" hoặc \"daily\" -> trả \"daily\"; ngược lại trả \"rate\"..\n**Input:** err (Exception) -> **Output:** Optional[str] (\"daily\" | \"rate\" | None)..\n**Giải đáp sâu:** Trả về None, nhờ vậy call_llm_batch đi vào nhánh delays = [5, 15, 30, 60]s thay vì chờ cooldown RPM.",
    "projectLink": "src/llm.py:L226-L251",
    "codeLocation": "src/llm.py:L226-L251",
    "proofExample": "Ví dụ: `_classify_rate_limit_error(Exception(\"429 RESOURCE_EXHAUSTED: RequestsPerMinute\")) -> \"rate\"`. Sử dụng tại: Gọi bên trong except Exception của call_llm_batch().",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `_classify_rate_limit_error` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `_classify_rate_limit_error` nếu dữ liệu đầu vào bất thường?",
        "a": "Phụ thuộc từ khóa trong thông báo lỗi của Google SDK nếu Google thay đổi wording cho quota ngày."
      }
    ],
    "commonMistakes": [
      "Phụ thuộc từ khóa trong thông báo lỗi của Google SDK nếu Google thay đổi wording cho quota ngày."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L226-L251",
      "code": "def _classify_rate_limit_error(err: Exception) -> Optional[str]:\n    \"\"\"\n    Phân loại lỗi 429 từ Gemini API:\n    - Trả về 'daily' nếu hết hạn ngạch ngày (RPD).\n    - Trả về 'rate' nếu chỉ quá tốc độ theo phút (RPM/TPM).\n    - Trả về None nếu không phải lỗi 429 / RESOURCE_EXHAUSTED.\n    \"\"\"\n    code = getattr(err, \"code\", None)\n    status = str(getattr(err, \"status\", \"\") or \"\").upper()\n    details_str = str(getattr(err, \"details\", \"\") or \"\")\n    err_str = f\"{err} {details_str}\"\n    lower_err = err_str.lower()\n\n    is_429 = ("
    }
  },
  {
    "id": "vc-033",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: call_llm_batch`.",
    "question": "Đọc hiểu hàm `call_llm_batch()` trong `src/llm.py` (`L254–L296`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nếu 1 lô gồm 5 câu nhưng model chỉ trả về 4 câu hợp lệ trong JSON thì code xử lý câu thiếu thế nào?",
    "quickAnswer": "Gọi Gemini API cho 1 lô review với Pydantic Structured Outputs, parse JSON và validate từng phần tử kèm cơ chế thử lại thông minh. Cụ thể: 4 câu hợp lệ vẫn được lưu vào cache ngay; 1 câu thiếu bị ghi nhận missing_in_batch và tự động gửi bù ở 2 vòng sau (vòng cuối tách lẻ batch_size=1).",
    "explanation": "**Chữ ký:** `def call_llm_batch(`.\n**Luồng chạy:** Gọi client.models.generate_content() với response_mime_type=\"application/json\" và response_schema=list[review_model]. -> Kiểm tra phản hồi khác rỗng, parse json.loads(resp.text) và chạy review_model.model_validate(item).model_dump(). -> Nếu gặp exception: kiểm tra _classify_rate_limit_error() -> \"daily\" ném QuotaExceededException; \"rate\" ngủ min(60, 20*(attempt+1))s; lỗi khác ngủ [5,15,30,60]s..\n**Input:** client, prompt (str), model_name (str), max_retries (int=5), review_model -> **Output:** Optional[List[Dict[str, Any]]] (None nếu hỏng sau 5 lần thử)..\n**Giải đáp sâu:** 4 câu hợp lệ vẫn được lưu vào cache ngay; 1 câu thiếu bị ghi nhận missing_in_batch và tự động gửi bù ở 2 vòng sau (vòng cuối tách lẻ batch_size=1).",
    "projectLink": "src/llm.py:L254-L296",
    "codeLocation": "src/llm.py:L254-L296",
    "proofExample": "Ví dụ: `results = call_llm_batch(client, prompt, \"gemini-3.5-flash-lite\", review_model=rev_m)`. Sử dụng tại: Được process_pending_reviews() gọi cho mỗi lô.",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `call_llm_batch` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `call_llm_batch` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu batch_size quá lớn, mô hình có thể sinh JSON dài vượt max output tokens dẫn tới JSON bị cắt cụt (JSONDecodeError -> retry và được tách nhỏ ở vòng 2)."
      }
    ],
    "commonMistakes": [
      "Nếu batch_size quá lớn, mô hình có thể sinh JSON dài vượt max output tokens dẫn tới JSON bị cắt cụt (JSONDecodeError -> retry và được tách nhỏ ở vòng 2)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L254-L296",
      "code": "def call_llm_batch(\n    client,\n    prompt: str,\n    model_name: str,\n    max_retries: int = 5,\n    review_model=ReviewAnalysis,\n) -> Optional[List[Dict[str, Any]]]:\n    \"\"\"\n    Gọi Gemini API cho 1 lô review với mô hình chỉ định (sử dụng Pydantic Structured Outputs).\n    - 429 hết quota ngày (RPD) -> ném QuotaExceededException để dừng sớm.\n    - 429 quá tốc độ theo phút (RPM/TPM) -> chờ cooldown tăng dần rồi thử lại cùng model.\n    - 503 / lỗi mạng / phản hồi rỗng hoặc JSON lỗi -> retry với backoff [5, 15, 30, 60]s.\n    \"\"\"\n    delays = [5, 15, 30, 60]"
    }
  },
  {
    "id": "vc-034",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: process_pending_reviews`.",
    "question": "Đọc hiểu hàm `process_pending_reviews()` trong `src/llm.py` (`L303–L385`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao vòng chạy bù thứ 2 hạ batch_size xuống còn 1?",
    "quickAnswer": "Điều phối vòng chạy chính (batch_size=5) kèm tự kiểm tra tối đa 2 vòng chạy bù (vòng cuối hạ xuống batch_size=1) và lưu cache tức thời. Cụ thể: Nếu 1 câu review quá dài hoặc chứa ký tự lạ làm hỏng JSON cả lô 5 câu, tách lẻ thành batch_size=1 giúp cô lập đúng câu đó và cứu 4 câu còn lại.",
    "explanation": "**Chữ ký:** `def process_pending_reviews(`.\n**Luồng chạy:** Lặp qua pass_plan: lượt chính (batch_size=5), bù vòng 1 (batch_size=5), bù vòng 2 (batch_size=1). -> Mỗi vòng lọc pending_rows (ID chưa có trong cache); dừng ngay nếu rỗng hoặc quota_exhausted=True. -> Chia pending_rows thành batches, tạo prompt và gọi call_llm_batch()..\n**Input:** client, reviews_df, cache, cache_path, model_name, review_model, batch_size=5, retry_cooldown=15 -> **Output:** int (số review mới xử lý thành công trong phiên)..\n**Giải đáp sâu:** Nếu 1 câu review quá dài hoặc chứa ký tự lạ làm hỏng JSON cả lô 5 câu, tách lẻ thành batch_size=1 giúp cô lập đúng câu đó và cứu 4 câu còn lại.",
    "projectLink": "src/llm.py:L303-L385",
    "codeLocation": "src/llm.py:L303-L385",
    "proofExample": "Ví dụ: `added = process_pending_reviews(client, df, cache, cache_path, \"gemini-3.5-flash-lite\", rev_m)`. Sử dụng tại: Được main() gọi khi cache chưa đủ và không bật --skip-llm.",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `process_pending_reviews` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `process_pending_reviews` nếu dữ liệu đầu vào bất thường?",
        "a": "Dùng reviews_df.iterrows() nhưng hoàn toàn chấp nhận được vì số lượng review LLM chỉ là 1.000 câu (chi phí API 1s/lô lấn át hoàn toàn tốc độ Pandas)."
      }
    ],
    "commonMistakes": [
      "Dùng reviews_df.iterrows() nhưng hoàn toàn chấp nhận được vì số lượng review LLM chỉ là 1.000 câu (chi phí API 1s/lô lấn át hoàn toàn tốc độ Pandas)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L303-L385",
      "code": "def process_pending_reviews(\n    client,\n    reviews_df: pd.DataFrame,\n    cache: Dict[str, Any],\n    cache_path: Path,\n    model_name: str,\n    review_model,\n    batch_size: int = 5,\n    retry_cooldown: int = 15,\n) -> int:\n    \"\"\"Chạy lượt chính rồi tự kiểm tra và chạy bù tối đa 2 vòng (vòng cuối tách lẻ batch_size=1).\"\"\"\n    pass_plan = [\n        (batch_size, \"Xử lý lô review\"),\n        (batch_size, \"Chạy bù vòng 1\"),"
    }
  },
  {
    "id": "vc-035",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/llm.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/llm.py` (`L388–L451`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Điều kiện nào khiến src/llm.py KHÔNG đòi hỏi GEMINI_API_KEY ngay cả khi không truyền --skip-llm?",
    "quickAnswer": "Điểm vào CLI cho bước LLM: nạp .env + YAML, kiểm cache, quyết định gọi API hoặc chạy offline với --skip-llm, và xuất reviews_sentiment.csv. Cụ thể: Khi cache đã có đủ 1.000/1.000 bản ghi hợp lệ (`pending_count == 0`), điều kiện `if args.skip_llm:` hoặc `elif pending_count == 0:` bỏ qua bước kiểm API Key.",
    "explanation": "**Chữ ký:** `def main():`.\n**Luồng chạy:** Nạp .env (dotenv) và YAML config; trích model, batch_size, aspects, cache_path, output_csv. -> Gọi build_schemas(aspects) dựng schema động và load_assigned_reviews() đọc 1.000 mẫu. -> Nạp cache JSONL hiện có; tính pending_count = số review còn thiếu..\n**Input:** CLI args (--config, --skip-llm) -> **Output:** Cập nhật llm_cache.jsonl (nếu chạy online) và xuất data/processed/reviews_sentiment.csv..\n**Giải đáp sâu:** Khi cache đã có đủ 1.000/1.000 bản ghi hợp lệ (`pending_count == 0`), điều kiện `if args.skip_llm:` hoặc `elif pending_count == 0:` bỏ qua bước kiểm API Key.",
    "projectLink": "src/llm.py:L388-L451",
    "codeLocation": "src/llm.py:L388-L451",
    "proofExample": "Ví dụ: `python src/llm.py --config configs/mexico-city.yaml --skip-llm`. Sử dụng tại: Chặng 4 của STEPS trong run_pipeline.py.",
    "followUpQuestions": [
      "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu --skip-llm được bật khi cache chưa đủ 1.000 dòng, export_cache_to_csv() sẽ xuất bảng có dòng NaN và in cảnh báo."
      }
    ],
    "commonMistakes": [
      "Nếu --skip-llm được bật khi cache chưa đủ 1.000 dòng, export_cache_to_csv() sẽ xuất bảng có dòng NaN và in cảnh báo."
    ],
    "relatedFiles": [
      "src/llm.py"
    ],
    "codeBlock": {
      "file": "src/llm.py",
      "lines": "L388-L451",
      "code": "def main():\n    parser = argparse.ArgumentParser(description=\"LLM Sentiment & ABSA Analysis (Gemini + Pydantic Schema)\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    parser.add_argument(\"--skip-llm\", action=\"store_true\", help=\"Bỏ qua gọi API, dùng cache có sẵn\")\n    args = parser.parse_args()\n\n    print(\"=\" * 65)\n    print(\"[LLM] BẮT ĐẦU QUY TRÌNH PHÂN TÍCH ĐÁNH GIÁ (GEMINI API)\")\n    print(\"=\" * 65)\n\n    load_dotenv(PROJECT_ROOT / \".env\")\n    config = load_config(args.config)\n    llm_cfg = config.get(\"llm\", {})\n    model_name = llm_cfg.get(\"model\", \"gemini-3.5-flash-lite\")"
    }
  },
  {
    "id": "vc-036",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "code",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/qa.py :: load_config`.",
    "question": "Đọc hiểu hàm `load_config()` trong `src/qa.py` (`L22–L35`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Các tham số nào trong YAML điều khiển hành vi của src/qa.py?",
    "quickAnswer": "Nạp tệp cấu hình YAML cho bước QA theo thứ tự CLI -> PIPELINE_CONFIG -> configs/mexico-city.yaml. Cụ thể: snapshots, currency (tạo tên cột price_mxn), qa.dedupe_keys ([id, last_scraped]), và qa.price_outlier_quantiles ([0.01, 0.99]).",
    "explanation": "**Chữ ký:** `def load_config(config_path_str: str | None = None) -> Dict[str, Any]:`.\n**Luồng chạy:** Kiểm tra đường dẫn tương đối/tuyệt đối, ném FileNotFoundError nếu thiếu, trả dict YAML..\n**Input:** config_path_str (str | None) -> **Output:** Dict[str, Any].\n**Giải đáp sâu:** snapshots, currency (tạo tên cột price_mxn), qa.dedupe_keys ([id, last_scraped]), và qa.price_outlier_quantiles ([0.01, 0.99]).",
    "projectLink": "src/qa.py:L22-L35",
    "codeLocation": "src/qa.py:L22-L35",
    "proofExample": "Ví dụ: `cfg = load_config(\"configs/mexico-city.yaml\")`. Sử dụng tại: Được main() của src/qa.py gọi để lấy snapshots, currency, qa.dedupe_keys và qa.price_outlier_quantiles.",
    "followUpQuestions": [
      "Trong `src/qa.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/qa.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu file YAML rỗng hoàn toàn, yaml.safe_load() trả về None thay vì dict rỗng."
      }
    ],
    "commonMistakes": [
      "Nếu file YAML rỗng hoàn toàn, yaml.safe_load() trả về None thay vì dict rỗng."
    ],
    "relatedFiles": [
      "src/qa.py"
    ],
    "codeBlock": {
      "file": "src/qa.py",
      "lines": "L22-L35",
      "code": "def load_config(config_path_str: str | None = None) -> Dict[str, Any]:\n    \"\"\"Nạp cấu hình YAML từ CLI, biến môi trường PIPELINE_CONFIG hoặc mặc định.\"\"\"\n    cfg_target = config_path_str or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\")\n    cfg_path = Path(cfg_target)\n    if not cfg_path.is_absolute():\n        cfg_path = PROJECT_ROOT / cfg_path\n\n    if not cfg_path.is_file():\n        raise FileNotFoundError(f\"[QA] Không tìm thấy file cấu hình: {cfg_path}\")\n\n    with cfg_path.open(encoding=\"utf-8\") as f:\n        config = yaml.safe_load(f)\n\n    return config"
    }
  },
  {
    "id": "vc-037",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "code",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/qa.py :: apply_qa_rules`.",
    "question": "Đọc hiểu hàm `apply_qa_rules()` trong `src/qa.py` (`L42–L311`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao ở t2 (2025-12-29), qa_report.csv vẫn đủ 8 dòng dù giá thiếu 100%?",
    "quickAnswer": "Áp dụng tuần tự 8 quy tắc QA trên một snapshot listings DataFrame theo triết lý Gắn cờ (Flagging) & Bảo toàn NaN, ghi nhận tác động vào 8 bản ghi qa_records. Cụ thể: Vì code ghi nhận cả các rule có rows_affected=0 và nhánh if not valid_p.empty bỏ qua an toàn việc tính P01–P99 nhưng vẫn append dòng RULE_PRICE_OUTLIER với N/A.",
    "explanation": "**Chữ ký:** `def apply_qa_rules(`.\n**Luồng chạy:** RULE 1 (DEDUPLICATION): Khử bản trùng lặp thật theo subset [id, last_scraped] giữ bản đầu tiên. -> RULE 2 & 3 (PRICE_PARSE & MISSING_PRICE): Xóa ký tự tiền tệ bằng Regex r\"[^\\d.-]\", ép số pd.to_numeric(errors=\"coerce\"), gắn cờ qa_missing_price cho NaN/<=0. -> RULE 4 (PRICE_OUTLIER): Nếu valid_p khác rỗng, tính P01–P99 và gắn cờ qa_price_outlier (không xóa, không sửa giá trị)..\n**Input:** df (pd.DataFrame), snapshot (str), config (Dict) -> **Output:** Tuple (df_cleaned: pd.DataFrame, qa_records: List[Dict]) gồm 8 bản ghi thống kê..\n**Giải đáp sâu:** Vì code ghi nhận cả các rule có rows_affected=0 và nhánh if not valid_p.empty bỏ qua an toàn việc tính P01–P99 nhưng vẫn append dòng RULE_PRICE_OUTLIER với N/A.",
    "projectLink": "src/qa.py:L42-L311",
    "codeLocation": "src/qa.py:L42-L311",
    "proofExample": "Ví dụ: `cleaned, recs = apply_qa_rules(raw_df, \"2025-12-29\", cfg) -> recs[2][\"rows_affected\"] = 1000 (thiếu giá).`. Sử dụng tại: Hàm trung tâm của src/qa.py, chạy lặp cho cả 4 mốc snapshot để tạo 32 dòng trong qa_report.csv.",
    "followUpQuestions": [
      "Tại sao RULE 4 ghi kpi_before == kpi_after cho Mean Price?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao RULE 4 ghi kpi_before == kpi_after cho Mean Price?",
        "a": "Vì nhóm chủ trương chỉ gắn cờ qa_price_outlier chứ giữ nguyên giá trị để phản ánh đúng đuôi phải đầu cơ trên thị trường."
      }
    ],
    "commonMistakes": [
      "RULE 5 & 6 chưa kiểm tra phần thập phân (% 1 != 0) trước khi ép .astype(\"Int64\") như RULE 7 (nếu có số 2.5 khách sẽ gây TypeError/ValueError).",
      "Regex r\"[^\\d.-]\" sẽ sai 1.000 lần nếu chạy sang thành phố châu Âu dùng dấu phẩy thập phân.",
      "Không kiểm tra mâu thuẫn chéo number_of_reviews > 0 mà last_review = NaN."
    ],
    "relatedFiles": [
      "src/qa.py"
    ],
    "codeBlock": {
      "file": "src/qa.py",
      "lines": "L42-L311",
      "code": "def apply_qa_rules(\n    df: pd.DataFrame,\n    snapshot: str,\n    config: Dict[str, Any]\n) -> Tuple[pd.DataFrame, List[Dict[str, Any]]]:\n    \"\"\"\n    Thực hiện 8 quy tắc QA chuẩn mực (Type, Missing, Outliers, Bounds, Duplicates, Date Validity).\n    Áp dụng nguyên tắc: ƯU TIÊN GẮN CỜ (Flagging) để bảo tồn dữ liệu gốc,\n    chỉ loại trừ / điền giá trị cho các cột bắt buộc khi tính toán downstream.\n    \"\"\"\n    qa_cfg = config.get(\"qa\", {})\n    dedupe_keys = qa_cfg.get(\"dedupe_keys\", [\"id\", \"last_scraped\"])\n    cur = str(config.get(\"currency\", \"MXN\")).strip().upper()\n    price_col = f\"price_{cur.lower()}\""
    }
  },
  {
    "id": "vc-038",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "code",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/qa.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/qa.py` (`L317–L356`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Làm sao kiểm tra qa.py đã chạy đủ trước khi chạy kpi.py?",
    "quickAnswer": "Đọc từng listings.csv theo thứ tự thời gian, gọi apply_qa_rules(), ghi đè cột sạch & cờ QA vào chính tệp listings.csv và xuất reports/qa_report.csv. Cụ thể: Kiểm tra reports/qa_report.csv có đủ 32 dòng và REQUIRED_QA_COLS đều xuất hiện trong listings.csv.",
    "explanation": "**Chữ ký:** `def main():`.\n**Luồng chạy:** Đọc config YAML và sắp xếp snapshots tăng dần theo pd.to_datetime. -> Với mỗi snapshot: đọc data/processed/{snap}/listings.csv với dtype={\"id\": \"string\"}. -> Chạy apply_qa_rules() -> lưu đè listings.csv đã có đủ cột *_clean và qa_*..\n**Input:** CLI arg --config -> **Output:** Cập nhật 4 tệp listings.csv và tạo reports/qa_report.csv (32 dòng)..\n**Giải đáp sâu:** Kiểm tra reports/qa_report.csv có đủ 32 dòng và REQUIRED_QA_COLS đều xuất hiện trong listings.csv.",
    "projectLink": "src/qa.py:L317-L356",
    "codeLocation": "src/qa.py:L317-L356",
    "proofExample": "Ví dụ: `python src/qa.py --config configs/mexico-city.yaml`. Sử dụng tại: Chặng 3 của STEPS trong run_pipeline.py.",
    "followUpQuestions": [
      "Trong `src/qa.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/qa.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Vì qa.py ghi đè trực tiếp lên data/processed/{snap}/listings.csv, nếu chạy lại nhiều lần thì cột *_clean đã có sẽ được tính lại sạch từ cột thô gốc (idempotent)."
      }
    ],
    "commonMistakes": [
      "Vì qa.py ghi đè trực tiếp lên data/processed/{snap}/listings.csv, nếu chạy lại nhiều lần thì cột *_clean đã có sẽ được tính lại sạch từ cột thô gốc (idempotent)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ],
    "codeBlock": {
      "file": "src/qa.py",
      "lines": "L317-L356",
      "code": "def main():\n    parser = argparse.ArgumentParser(description=\"Inside Airbnb Quality Assurance (QA) Module\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    args = parser.parse_args()\n\n    print(\"=\" * 70)\n    print(\"[QA] BẮT ĐẦU QUY TRÌNH KIỂM SOÁT CHẤT LƯỢNG (QA) & LÀM SẠCH DỮ LIỆU\")\n    print(\"=\" * 70)\n\n    config = load_config(args.config)\n    snapshots = sorted((str(s).strip() for s in config.get(\"snapshots\", [])), key=pd.to_datetime)\n\n    all_qa_records: List[Dict[str, Any]] = []\n"
    }
  },
  {
    "id": "vc-039",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: load_config`.",
    "question": "Đọc hiểu hàm `load_config()` trong `src/evaluate.py` (`L48–L51`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Những khóa YAML nào phục vụ evaluate.py?",
    "quickAnswer": "Đọc file cấu hình YAML cho bước Evaluation (đường dẫn ground truth, LLM CSV, Baseline CSV và llm.model/sample_size). Cụ thể: evaluate.ground_truth, llm.output_csv, baseline.output_csv, llm.model, llm.sample_size và snapshots.",
    "explanation": "**Chữ ký:** `def load_config(path=None):`.\n**Luồng chạy:** Xác định Path từ tham số/PIPELINE_CONFIG/mặc định và parse YAML..\n**Input:** path (str | None) -> **Output:** dict.\n**Giải đáp sâu:** evaluate.ground_truth, llm.output_csv, baseline.output_csv, llm.model, llm.sample_size và snapshots.",
    "projectLink": "src/evaluate.py:L48-L51",
    "codeLocation": "src/evaluate.py:L48-L51",
    "proofExample": "Ví dụ: `cfg = load_config(\"configs/mexico-city.yaml\")`. Sử dụng tại: Gọi trong main() của src/evaluate.py.",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?",
        "a": "Không kiểm tra is_file() rõ như các module khác -> nếu thiếu path sẽ ném OSError mặc định từ read_text()."
      }
    ],
    "commonMistakes": [
      "Không kiểm tra is_file() rõ như các module khác -> nếu thiếu path sẽ ném OSError mặc định từ read_text()."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L48-L51",
      "code": "def load_config(path=None):\n    p = Path(path or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\"))\n    p = p if p.is_absolute() else ROOT / p\n    return yaml.safe_load(p.read_text(encoding=\"utf-8\"))"
    }
  },
  {
    "id": "vc-040",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: doc_bang`.",
    "question": "Đọc hiểu hàm `doc_bang()` trong `src/evaluate.py` (`L54–L69`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao `doc_bang()` truyền `dtype=str` khi đọc ground_truth.csv và reviews_sentiment.csv?",
    "quickAnswer": "Đọc một bảng nhãn CSV (ground truth, LLM hoặc baseline), chuẩn hóa tên cột id, ép lowercase/strip cho các cột nhãn và đặt id làm index. Cụ thể: Để ID review 19 chữ số không bị hỏng do float64 khi ghép chỉ số giữa bảng nhãn tay và bảng dự đoán.",
    "explanation": "**Chữ ký:** `def doc_bang(path, bat_buoc=True, aspects=ASPECTS):`.\n**Luồng chạy:** Kiểm tra file tồn tại (nếu bat_buoc=True -> FileNotFoundError; False -> trả None). -> Đọc CSV với dtype=str (giữ nguyên ID 19 chữ số), đổi \"review_id\" thành \"id\" nếu cần. -> Strip + lower toàn bộ cột nhãn (overall_sentiment, baseline_sentiment, language, 7 aspects)..\n**Input:** path (str | Path), bat_buoc (bool=True), aspects -> **Output:** pd.DataFrame đã đặt index là \"id\" (hoặc None nếu không bắt buộc)..\n**Giải đáp sâu:** Để ID review 19 chữ số không bị hỏng do float64 khi ghép chỉ số giữa bảng nhãn tay và bảng dự đoán.",
    "projectLink": "src/evaluate.py:L54-L69",
    "codeLocation": "src/evaluate.py:L54-L69",
    "proofExample": "Ví dụ: `gt = doc_bang(\"data/samples/ground_truth.csv\") -> 100 dòng, index=id`. Sử dụng tại: Đọc cả 3 bảng: ground_truth.csv, reviews_sentiment.csv và reviews_baseline.csv trong main().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `doc_bang` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `doc_bang` nếu dữ liệu đầu vào bất thường?",
        "a": "Dùng `.apply(lambda s: s.str.strip().str.lower())` trên df[cot_nhan] giả định pandas đọc mọi ô dạng string/object (an toàn vì đã truyền dtype=str)."
      }
    ],
    "commonMistakes": [
      "Dùng `.apply(lambda s: s.str.strip().str.lower())` trên df[cot_nhan] giả định pandas đọc mọi ô dạng string/object (an toàn vì đã truyền dtype=str)."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L54-L69",
      "code": "def doc_bang(path, bat_buoc=True, aspects=ASPECTS):\n    \"\"\"Đọc CSV, chuẩn hoá id và nhãn (strip + lower), đặt id làm index.\"\"\"\n    p = Path(path)\n    p = p if p.is_absolute() else ROOT / p\n    if not p.is_file():\n        if bat_buoc:\n            raise FileNotFoundError(f\"[EVAL] Không tìm thấy {p}\")\n        print(f\"[EVAL WARN] Chưa có {p.name} -> bỏ qua cột này.\")\n        return None\n    df = pd.read_csv(p, dtype=str)\n    if \"id\" not in df.columns and \"review_id\" in df.columns:\n        df = df.rename(columns={\"review_id\": \"id\"})\n    df[\"id\"] = df[\"id\"].str.strip()\n    cot_nhan = [c for c in [\"overall_sentiment\", \"baseline_sentiment\", \"language\", *aspects] if c in df.columns]"
    }
  },
  {
    "id": "vc-041",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: loc_hop_le`.",
    "question": "Đọc hiểu hàm `loc_hop_le()` trong `src/evaluate.py` (`L72–L74`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nếu LLM bỏ sót 10 dòng (NaN) và loc_hop_le() bỏ 10 dòng đó đi, điểm Accuracy có bị thổi phồng giả không?",
    "quickAnswer": "Lọc các dòng LLM có kết quả hợp lệ (overall_sentiment thuộc [\"positive\", \"mixed\", \"negative\"] và language khác NaN). Cụ thể: KHÔNG! Vì cot_diem() lặp qua toàn bộ 100 mã trong nhan_tay và coi bất kỳ mã nào vắng trong du_doan là đoán sai (\"khong_co\" / set()).",
    "explanation": "**Chữ ký:** `def loc_hop_le(llm):`.\n**Luồng chạy:** Dùng boolean indexing `llm[\"overall_sentiment\"].isin(SENTIMENTS) & llm[\"language\"].notna()`..\n**Input:** llm (pd.DataFrame) -> **Output:** pd.DataFrame chỉ gồm các dòng đã có nhãn hợp lệ..\n**Giải đáp sâu:** KHÔNG! Vì cot_diem() lặp qua toàn bộ 100 mã trong nhan_tay và coi bất kỳ mã nào vắng trong du_doan là đoán sai (\"khong_co\" / set()).",
    "projectLink": "src/evaluate.py:L72-L74",
    "codeLocation": "src/evaluate.py:L72-L74",
    "proofExample": "Ví dụ: `llm_clean = loc_hop_le(llm) -> 1.000 dòng (nếu cache đầy đủ).`. Sử dụng tại: Dùng trước gom_du_doan(llm_hop_le), phan_tich_loi() và hau_kiem().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `loc_hop_le` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `loc_hop_le` nếu dữ liệu đầu vào bất thường?",
        "a": "Các dòng bị loại khỏi llm_hop_le vẫn bị tính là thiếu (sai) ở bước chấm điểm vì gom_du_doan() so với tập 100 mẫu ground truth gốc!"
      }
    ],
    "commonMistakes": [
      "Các dòng bị loại khỏi llm_hop_le vẫn bị tính là thiếu (sai) ở bước chấm điểm vì gom_du_doan() so với tập 100 mẫu ground truth gốc!"
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L72-L74",
      "code": "def loc_hop_le(llm):\n    \"\"\"Chỉ giữ dòng có đủ overall_sentiment và language hợp lệ (bỏ dòng trống).\"\"\"\n    return llm[llm[\"overall_sentiment\"].isin(SENTIMENTS) & llm[\"language\"].notna()]"
    }
  },
  {
    "id": "vc-042",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: gom_du_doan`.",
    "question": "Đọc hiểu hàm `gom_du_doan()` trong `src/evaluate.py` (`L77–L87`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao gom_du_doan() phải nhận tham số cot_cam_xuc thay vì mặc định always \"overall_sentiment\"?",
    "quickAnswer": "Chuyển đổi bảng CSV dự đoán/nhãn tay thành dictionary thống nhất cho các hàm chấm điểm (sentiment dict, language dict, tập khía cạnh được nhắc/khen/chê). Cụ thể: Vì bảng baseline có thể đặt tên cột là \"baseline_sentiment\" hoặc \"overall_sentiment\" (code thực tế tự chọn cột tồn tại).",
    "explanation": "**Chữ ký:** `def gom_du_doan(df, cot_cam_xuc=\"overall_sentiment\", aspects=ASPECTS):`.\n**Luồng chạy:** Tạo dict sentiment = df[cot_cam_xuc].dropna().to_dict(). -> Điền \"not_mentioned\" vào các ô aspect thiếu (kc = df[aspects].fillna(\"not_mentioned\")). -> Với từng review, trích 3 tập set(): aspects (khác not_mentioned), aspects_positive (== positive), aspects_negative (== negative), và aspect_labels..\n**Input:** df (DataFrame), cot_cam_xuc (str), aspects -> **Output:** Dict[str, Dict] dùng trực tiếp cho ti_le_dung(), f1(), f1_cam_xuc(), ti_le_dung_nhan_khia_canh()..\n**Giải đáp sâu:** Vì bảng baseline có thể đặt tên cột là \"baseline_sentiment\" hoặc \"overall_sentiment\" (code thực tế tự chọn cột tồn tại).",
    "projectLink": "src/evaluate.py:L77-L87",
    "codeLocation": "src/evaluate.py:L77-L87",
    "proofExample": "Ví dụ: `gold = gom_du_doan(gt)`. Sử dụng tại: Chuẩn hóa cấu trúc cho cả Ground Truth, Baseline và LLM trước khi gọi cot_diem().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `gom_du_doan` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `gom_du_doan` nếu dữ liệu đầu vào bất thường?",
        "a": "Gán `kc = df[aspects].fillna(\"not_mentioned\")` nên nếu nhãn tay có ô khuyết (rỗng), nó được quy về không nhắc tới."
      }
    ],
    "commonMistakes": [
      "Gán `kc = df[aspects].fillna(\"not_mentioned\")` nên nếu nhãn tay có ô khuyết (rỗng), nó được quy về không nhắc tới."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L77-L87",
      "code": "def gom_du_doan(df, cot_cam_xuc=\"overall_sentiment\", aspects=ASPECTS):\n    \"\"\"Đổi bảng nhãn về dạng: trường -> {mã review: giá trị} (giống Bài 11).\"\"\"\n    d = {\"sentiment\": df[cot_cam_xuc].dropna().to_dict()}\n    if set(aspects) <= set(df.columns):\n        kc = df[aspects].fillna(\"not_mentioned\")\n        d[\"language\"] = df[\"language\"].to_dict()\n        d[\"aspects\"] = {ma: set(kc.columns[r.ne(\"not_mentioned\").to_numpy()]) for ma, r in kc.iterrows()}\n        d[\"aspects_positive\"] = {ma: set(kc.columns[r.eq(\"positive\").to_numpy()]) for ma, r in kc.iterrows()}\n        d[\"aspects_negative\"] = {ma: set(kc.columns[r.eq(\"negative\").to_numpy()]) for ma, r in kc.iterrows()}\n        d[\"aspect_labels\"] = kc.to_dict(\"index\")\n    return d"
    }
  },
  {
    "id": "vc-043",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: ti_le_dung`.",
    "question": "Đọc hiểu hàm `ti_le_dung()` trong `src/evaluate.py` (`L94–L98`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao `du_doan[truong].get(ma) == g` phạt được lỗi thiếu dự đoán?",
    "quickAnswer": "Tính Accuracy (tỷ lệ khớp đúng chính xác) cho một trường đơn nhãn (sentiment hoặc language) trên toàn bộ tập nhãn tay. Cụ thể: Vì .get(ma) trả về None khi ma không tồn tại, luôn khác giá trị nhãn thật `g`, khiến review bị thiếu vẫn nằm ở mẫu số len(dung).",
    "explanation": "**Chữ ký:** `def ti_le_dung(du_doan, nhan_tay, truong):`.\n**Luồng chạy:** Duyệt mọi cặp (ma, g) trong nhan_tay[truong], kiểm tra du_doan[truong].get(ma) == g, chia cho len(nhan_tay)..\n**Input:** du_doan (dict), nhan_tay (dict), truong (str) -> **Output:** float ∈ [0, 1] (hoặc np.nan nếu thiếu trường)..\n**Giải đáp sâu:** Vì .get(ma) trả về None khi ma không tồn tại, luôn khác giá trị nhãn thật `g`, khiến review bị thiếu vẫn nằm ở mẫu số len(dung).",
    "projectLink": "src/evaluate.py:L94-L98",
    "codeLocation": "src/evaluate.py:L94-L98",
    "proofExample": "Ví dụ: `ti_le_dung(d_llm, gold, \"sentiment\") -> 0.99`. Sử dụng tại: Tính cam_xuc_accuracy và ngon_ngu_accuracy trong cot_diem().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `ti_le_dung` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `ti_le_dung` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu dữ liệu mất cân bằng nặng (73% positive), Accuracy cao vẫn có thể che lấp lỗi dự đoán kém ở lớp hiếm."
      }
    ],
    "commonMistakes": [
      "Nếu dữ liệu mất cân bằng nặng (73% positive), Accuracy cao vẫn có thể che lấp lỗi dự đoán kém ở lớp hiếm."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L94-L98",
      "code": "def ti_le_dung(du_doan, nhan_tay, truong):\n    if truong not in du_doan:\n        return np.nan\n    dung = [du_doan[truong].get(ma) == g for ma, g in nhan_tay[truong].items()]\n    return sum(dung) / len(dung)"
    }
  },
  {
    "id": "vc-044",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: f1`.",
    "question": "Đọc hiểu hàm `f1()` trong `src/evaluate.py` (`L101–L111`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Hàm `f1()` trong `src/evaluate.py` đang tính Micro F1 hay Macro F1?",
    "quickAnswer": "Tính Micro F1 cho bài toán đa nhãn (multi-label) bằng cách cộng dồn toàn bộ TP, FP, FN qua 100 review rồi áp công thức 2TP/(2TP+FP+FN). Cụ thể: Đang tính **Micro F1** vì cộng dồn TP, FP, FN qua tất cả 100 review rồi mới chia một lần.",
    "explanation": "**Chữ ký:** `def f1(du_doan, nhan_tay, truong):`.\n**Luồng chạy:** Khởi tạo tp = fp = fn = 0. -> Với mỗi review trong nhan_tay: lấy tập thật t và tập đoán p = get(ma, set()). -> Cộng dồn giao p & t (TP), p - t (FP), t - p (FN). Trả về 2*tp / (2*tp + fp + fn)..\n**Input:** du_doan (dict), nhan_tay (dict), truong (\"aspects\" | \"aspects_positive\" | \"aspects_negative\") -> **Output:** float ∈ [0, 1] (hoặc np.nan)..\n**Giải đáp sâu:** Đang tính **Micro F1** vì cộng dồn TP, FP, FN qua tất cả 100 review rồi mới chia một lần.",
    "projectLink": "src/evaluate.py:L101-L111",
    "codeLocation": "src/evaluate.py:L101-L111",
    "proofExample": "Ví dụ: `f1(d_llm, gold, \"aspects\") -> 0.9393 (Mention F1)`. Sử dụng tại: Tính khia_canh_f1, duoc_khen_f1 và bi_che_f1 trong cot_diem().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `f1` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `f1` nếu dữ liệu đầu vào bất thường?",
        "a": "Ở bi_che_f1, số khía cạnh thuần negative trong 100 mẫu GT rất ít (~vài trường hợp), nên chỉ 1–2 ca lệch nhãn với mixed cũng kéo F1 xuống ~0.636."
      }
    ],
    "commonMistakes": [
      "Ở bi_che_f1, số khía cạnh thuần negative trong 100 mẫu GT rất ít (~vài trường hợp), nên chỉ 1–2 ca lệch nhãn với mixed cũng kéo F1 xuống ~0.636."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L101-L111",
      "code": "def f1(du_doan, nhan_tay, truong):\n    \"\"\"F1 gộp (micro) cho trường nhiều nhãn: cộng TP/FP/FN của mọi review rồi mới tính.\"\"\"\n    if truong not in du_doan:\n        return np.nan\n    tp = fp = fn = 0\n    for ma, t in nhan_tay[truong].items():\n        p = du_doan[truong].get(ma, set())\n        tp += len(p & t)\n        fp += len(p - t)\n        fn += len(t - p)\n    return 2 * tp / (2 * tp + fp + fn) if (tp + fp + fn) else np.nan"
    }
  },
  {
    "id": "vc-045",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: f1_cam_xuc`.",
    "question": "Đọc hiểu hàm `f1_cam_xuc()` trong `src/evaluate.py` (`L114–L117`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tham số labels=SENTIMENTS và zero_division=0 trong f1_score() giải quyết bẫy gì?",
    "quickAnswer": "Tính điểm F1 cho cảm xúc tổng thể 3 lớp (positive, mixed, negative) dùng sklearn.metrics.f1_score với average=\"macro\" hoặc \"weighted\". Cụ thể: labels=SENTIMENTS cố định đúng 3 lớp đánh giá không tính \"khong_co\" làm lớp thứ 4; zero_division=0 trả 0 thay vì ném lỗi/cảnh báo nếu mô hình không đoán trúng mẫu nào của lớp hiếm (negative).",
    "explanation": "**Chữ ký:** `def f1_cam_xuc(du_doan, nhan_tay, average):`.\n**Luồng chạy:** Trích y_true = list(nhan_tay[\"sentiment\"].values()). -> Trích y_pred, thay mẫu bị thiếu bằng \"khong_co\". -> Gọi f1_score(y_true, y_pred, labels=SENTIMENTS, average=average, zero_division=0)..\n**Input:** du_doan (dict), nhan_tay (dict), average (\"macro\" | \"weighted\") -> **Output:** float ∈ [0, 1]..\n**Giải đáp sâu:** labels=SENTIMENTS cố định đúng 3 lớp đánh giá không tính \"khong_co\" làm lớp thứ 4; zero_division=0 trả 0 thay vì ném lỗi/cảnh báo nếu mô hình không đoán trúng mẫu nào của lớp hiếm (negative).",
    "projectLink": "src/evaluate.py:L114-L117",
    "codeLocation": "src/evaluate.py:L114-L117",
    "proofExample": "Ví dụ: `f1_cam_xuc(d_base, gold, \"macro\") -> 0.5224 (vs LLM 0.9909)`. Sử dụng tại: Tính cam_xuc_macro_f1 và cam_xuc_weighted_f1 trong cot_diem().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `f1_cam_xuc` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `f1_cam_xuc` nếu dữ liệu đầu vào bất thường?",
        "a": "Truyền labels=SENTIMENTS đảm bảo lớp \"khong_co\" (nếu có) chỉ làm giảm Recall của nhãn thật chứ không được tính thêm như một lớp thứ 4 trong phép chia trung bình Macro."
      }
    ],
    "commonMistakes": [
      "Truyền labels=SENTIMENTS đảm bảo lớp \"khong_co\" (nếu có) chỉ làm giảm Recall của nhãn thật chứ không được tính thêm như một lớp thứ 4 trong phép chia trung bình Macro."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L114-L117",
      "code": "def f1_cam_xuc(du_doan, nhan_tay, average):\n    y_true = list(nhan_tay[\"sentiment\"].values())\n    y_pred = [du_doan[\"sentiment\"].get(ma, \"khong_co\") for ma in nhan_tay[\"sentiment\"]]\n    return f1_score(y_true, y_pred, labels=SENTIMENTS, average=average, zero_division=0)"
    }
  },
  {
    "id": "vc-046",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: ti_le_dung_nhan_khia_canh`.",
    "question": "Đọc hiểu hàm `ti_le_dung_nhan_khia_canh()` trong `src/evaluate.py` (`L120–L126`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: 655/700 = 0.9357 -> 45 ô sai khía cạnh kết hợp với 1 ô sai sentiment tổng thể tương ứng với bao nhiêu lỗi trong llm_error_analysis.csv?",
    "quickAnswer": "Đo tỷ lệ chính xác tuyệt đối trên toàn bộ 700 cặp (100 review × 7 khía cạnh) khớp đúng 1 trong 4 nhãn (positive/mixed/negative/not_mentioned). Cụ thể: Đúng bằng 45 + 1 = 46 lỗi trường được phan_tich_loi() xuất ra!",
    "explanation": "**Chữ ký:** `def ti_le_dung_nhan_khia_canh(du_doan, nhan_tay, aspects=ASPECTS):`.\n**Luồng chạy:** So sánh p[a] == g[a] qua từng review ma và từng khía cạnh a, lấy trung bình np.mean(dung)..\n**Input:** du_doan (dict), nhan_tay (dict), aspects -> **Output:** float ∈ [0, 1]..\n**Giải đáp sâu:** Đúng bằng 45 + 1 = 46 lỗi trường được phan_tich_loi() xuất ra!",
    "projectLink": "src/evaluate.py:L120-L126",
    "codeLocation": "src/evaluate.py:L120-L126",
    "proofExample": "Ví dụ: `ti_le_dung_nhan_khia_canh(d_llm, gold) -> 0.9357 (655 / 700 ô đúng)`. Sử dụng tại: Tính nhan_khia_canh_accuracy trong cot_diem().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `ti_le_dung_nhan_khia_canh` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `ti_le_dung_nhan_khia_canh` nếu dữ liệu đầu vào bất thường?",
        "a": "Vì khoảng ~60% số ô (review, aspect) là not_mentioned, chỉ số này cao tự nhiên hơn so với Praise/Complaint F1; cần đọc cùng Mention F1 và Complaint F1."
      }
    ],
    "commonMistakes": [
      "Vì khoảng ~60% số ô (review, aspect) là not_mentioned, chỉ số này cao tự nhiên hơn so với Praise/Complaint F1; cần đọc cùng Mention F1 và Complaint F1."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L120-L126",
      "code": "def ti_le_dung_nhan_khia_canh(du_doan, nhan_tay, aspects=ASPECTS):\n    \"\"\"Tỷ lệ cặp (review, khía cạnh) đoán đúng chính xác 1 trong 4 nhãn.\"\"\"\n    if \"aspect_labels\" not in du_doan:\n        return np.nan\n    dung = [du_doan[\"aspect_labels\"].get(ma, {}).get(a) == g[a]\n            for ma, g in nhan_tay[\"aspect_labels\"].items() for a in aspects]\n    return float(np.mean(dung))"
    }
  },
  {
    "id": "vc-047",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: cot_diem`.",
    "question": "Đọc hiểu hàm `cot_diem()` trong `src/evaluate.py` (`L133–L143`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Mối liên hệ giữa `evaluation_report.csv` và biểu đồ `llm_vs_baseline.png` là gì?",
    "quickAnswer": "Gom đủ 9 chỉ số đánh giá chuẩn từ CHI_SO thành một danh sách điểm hoàn chỉnh cho một mô hình (Baseline hoặc LLM). Cụ thể: Hàm `plot_llm_vs_baseline()` trong `viz.py` đọc trực tiếp 9 hàng của `evaluation_report.csv` do `cot_diem()` sinh ra.",
    "explanation": "**Chữ ký:** `def cot_diem(d, gold, aspects=ASPECTS):`.\n**Luồng chạy:** TínhCoverage (phu_song) rồi lần lượt gọi ti_le_dung, f1_cam_xuc, f1 và ti_le_dung_nhan_khia_canh cho 8 chỉ số còn lại..\n**Input:** d (dict dự đoán), gold (dict nhãn tay), aspects -> **Output:** List[float] dài 9 phần tử tương ứng với CHI_SO..\n**Giải đáp sâu:** Hàm `plot_llm_vs_baseline()` trong `viz.py` đọc trực tiếp 9 hàng của `evaluation_report.csv` do `cot_diem()` sinh ra.",
    "projectLink": "src/evaluate.py:L133-L143",
    "codeLocation": "src/evaluate.py:L133-L143",
    "proofExample": "Ví dụ: `cot_diem(d_llm, gold) -> [1.0, 0.99, 0.9909, 0.9899, 0.9393, 0.9279, 0.6364, 0.9357, 1.0]`. Sử dụng tại: Được main() gọi cho cả Baseline và LLM để ghép thành evaluation_report.csv.",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `cot_diem` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `cot_diem` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu truyền sai thứ tự hoặc thiếu phần tử so với danh sách CHI_SO, bảng evaluation_report.csv sẽ lệch cột."
      }
    ],
    "commonMistakes": [
      "Nếu truyền sai thứ tự hoặc thiếu phần tử so với danh sách CHI_SO, bảng evaluation_report.csv sẽ lệch cột."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L133-L143",
      "code": "def cot_diem(d, gold, aspects=ASPECTS):\n    phu_song = float(np.mean([ma in d[\"sentiment\"] for ma in gold[\"sentiment\"]]))\n    return [phu_song,\n            ti_le_dung(d, gold, \"sentiment\"),\n            f1_cam_xuc(d, gold, \"macro\"),\n            f1_cam_xuc(d, gold, \"weighted\"),\n            f1(d, gold, \"aspects\"),\n            f1(d, gold, \"aspects_positive\"),\n            f1(d, gold, \"aspects_negative\"),\n            ti_le_dung_nhan_khia_canh(d, gold, aspects),\n            ti_le_dung(d, gold, \"language\")]"
    }
  },
  {
    "id": "vc-048",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: phan_tich_loi`.",
    "question": "Đọc hiểu hàm `phan_tich_loi()` trong `src/evaluate.py` (`L150–L171`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Trong 46 lỗi phân tích được ở BTL, khía cạnh nào chiếm nhiều lỗi nhất và loại lỗi nào phổ biến nhất?",
    "quickAnswer": "Đối chiếu từng review trong 100 mẫu nhãn tay với LLM trên cả 9 trường, phân loại cụ thể mọi sai lệch thành \"thua\", \"thieu\", \"sai_nhan\" hoặc \"khong_co_ket_qua\". Cụ thể: Khía cạnh `amenities` chiếm 27/46 lỗi; loại lỗi nhiều nhất là `thieu` (21 lỗi, do LLM bỏ qua các tính từ gián tiếp như \"cozy\", \"comfy\").",
    "explanation": "**Chữ ký:** `def phan_tich_loi(llm, gt, aspects=ASPECTS):`.\n**Luồng chạy:** Chuẩn hóa NaN ở 7 cột aspect thành \"not_mentioned\". -> Lặp 100 review của ground_truth: nếu thiếu ID ở LLM -> ghi \"khong_co_ket_qua\". -> So sánh 9 trường: nhan==\"not_mentioned\" -> \"thua\"; doan==\"not_mentioned\" -> \"thieu\"; khác cả hai -> \"sai_nhan\"..\n**Input:** llm (DataFrame), gt (DataFrame), aspects -> **Output:** pd.DataFrame gồm các cột id, truong, nhan_tay, llm, loai_loi, comments (46 dòng thực tế)..\n**Giải đáp sâu:** Khía cạnh `amenities` chiếm 27/46 lỗi; loại lỗi nhiều nhất là `thieu` (21 lỗi, do LLM bỏ qua các tính từ gián tiếp như \"cozy\", \"comfy\").",
    "projectLink": "src/evaluate.py:L150-L171",
    "codeLocation": "src/evaluate.py:L150-L171",
    "proofExample": "Ví dụ: `phan_tich_loi(llm, gt) -> 46 lỗi trường trên 37/100 review.`. Sử dụng tại: Sinh reports/llm_error_analysis.csv trong main().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `phan_tich_loi` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `phan_tich_loi` nếu dữ liệu đầu vào bất thường?",
        "a": "Chỉ kiểm tra được trên 100 mẫu có nhãn tay (Ground Truth)."
      }
    ],
    "commonMistakes": [
      "Chỉ kiểm tra được trên 100 mẫu có nhãn tay (Ground Truth)."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L150-L171",
      "code": "def phan_tich_loi(llm, gt, aspects=ASPECTS):\n    \"\"\"So từng review với nhãn tay; ghi rõ khía cạnh thừa / thiếu / sai nhãn.\"\"\"\n    aspect_cols = list(aspects)\n    gt_norm = gt.copy()\n    llm_norm = llm.copy()\n    gt_norm[aspect_cols] = gt_norm[aspect_cols].fillna(\"not_mentioned\")\n    llm_norm[aspect_cols] = llm_norm[aspect_cols].fillna(\"not_mentioned\")\n    rows = []\n    for ma, g in gt_norm.iterrows():\n        if ma not in llm_norm.index:\n            rows.append((ma, \"toan_bo\", None, None, \"khong_co_ket_qua\"))\n            continue\n        r = llm_norm.loc[ma]\n        for truong in [\"overall_sentiment\", \"language\", *aspect_cols]:"
    }
  },
  {
    "id": "vc-049",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: hau_kiem`.",
    "question": "Đọc hiểu hàm `hau_kiem()` trong `src/evaluate.py` (`L174–L195`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao `khia_canh_khong_can_cu` xuất hiện tới 192 lần mà kết quả LLM vẫn đúng?",
    "quickAnswer": "Chạy 6 quy tắc kiểm tra tính nhất quán nội tại trên TOÀN BỘ 1.000 review LLM mà không cần nhãn tay (phát hiện ảo giác hoặc mẫu đáng ngờ). Cụ thể: Vì LLM hiểu ngữ nghĩa đồng nghĩa/ẩn dụ (\"great sleep\" -> noise/amenities, \"felt at home\" -> host) không có trong danh sách Regex cứng TU_KHOA.",
    "explanation": "**Chữ ký:** `def hau_kiem(llm, aspects=ASPECTS):`.\n**Luồng chạy:** Tính số từ (so_tu) và mặt nạ các khía cạnh được nhắc tới (nhac). -> Đánh giá 5 quy tắc vector hóa (rỗng có nhãn, ngắn 1–5 từ nhưng >=2 khía cạnh, mã ISO sai, positive nhưng chỉ chê, negative nhưng chỉ khen). -> Kiểm tra quy tắc 6 (khia_canh_khong_can_cu): LLM gán nhãn khía cạnh nhưng comments không khớp Regex TU_KHOA..\n**Input:** llm (DataFrame 1.000 dòng), aspects -> **Output:** pd.DataFrame các cảnh báo (id, quy_tac, chi_tiet) -> 193 cảnh báo thực tế..\n**Giải đáp sâu:** Vì LLM hiểu ngữ nghĩa đồng nghĩa/ẩn dụ (\"great sleep\" -> noise/amenities, \"felt at home\" -> host) không có trong danh sách Regex cứng TU_KHOA.",
    "projectLink": "src/evaluate.py:L174-L195",
    "codeLocation": "src/evaluate.py:L174-L195",
    "proofExample": "Ví dụ: `hau_kiem(llm) -> 1 cảnh báo tieu_cuc_nhung_chi_duoc_khen + 192 khia_canh_khong_can_cu.`. Sử dụng tại: Sinh reports/llm_postcheck.csv trong main().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `hau_kiem` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `hau_kiem` nếu dữ liệu đầu vào bất thường?",
        "a": "Nhắc lại: TU_KHOA chỉ dùng làm từ khóa căn cứ cảnh báo để con người đọc lại, tuyệt đối không dùng để tự động xóa kết quả LLM."
      }
    ],
    "commonMistakes": [
      "Nhắc lại: TU_KHOA chỉ dùng làm từ khóa căn cứ cảnh báo để con người đọc lại, tuyệt đối không dùng để tự động xóa kết quả LLM."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L174-L195",
      "code": "def hau_kiem(llm, aspects=ASPECTS):\n    \"\"\"Quy tắc chạy trên mọi kết quả LLM, không cần nhãn tay (đúng schema chưa chắc đúng nội dung).\"\"\"\n    van_ban = llm[\"comments\"].fillna(\"\")\n    so_tu = van_ban.str.split().str.len()\n    nhac = llm[aspects].ne(\"not_mentioned\") & llm[aspects].notna()\n    so_kc = nhac.sum(axis=1)\n    quy_tac = {\n        \"rong_nhung_co_nhan\": so_tu.eq(0) & (so_kc.gt(0) | llm[\"overall_sentiment\"].ne(\"mixed\")),\n        \"ngan_nhung_nhieu_khia_canh\": so_tu.between(1, 5) & so_kc.ge(2),\n        \"ngon_ngu_sai_ma_iso\": ~llm[\"language\"].str.fullmatch(r\"[a-z]{2}|und\", na=False),\n        \"tich_cuc_nhung_chi_bi_che\": llm[\"overall_sentiment\"].eq(\"positive\")\n        & llm[aspects].eq(\"negative\").any(axis=1) & ~llm[aspects].eq(\"positive\").any(axis=1),\n        \"tieu_cuc_nhung_chi_duoc_khen\": llm[\"overall_sentiment\"].eq(\"negative\")\n        & llm[aspects].eq(\"positive\").any(axis=1) & ~llm[aspects].eq(\"negative\").any(axis=1),"
    }
  },
  {
    "id": "vc-050",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: uoc_tinh_chi_phi`.",
    "question": "Đọc hiểu hàm `uoc_tinh_chi_phi()` trong `src/evaluate.py` (`L207–L239`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao giá 1M output token ($2.50) lại ảnh hưởng chi phí mạnh hơn nhiều so với 1M input token ($0.30)?",
    "quickAnswer": "Tính tổng số input/output token và chi phí USD dự kiến theo bảng giá ai.google.dev cho cả 1.000 mẫu LLM lẫn toàn thành phố ở mốc t4. Cụ thể: Giá output đắt gấp 8.33 lần input; đó là lý do `src/llm.py` thiết kế Pydantic schema cực gọn, không bắt model sinh trường giải thích summary dài dòng.",
    "explanation": "**Chữ ký:** `def uoc_tinh_chi_phi(cfg, total_llm, city_reviews=None, in_tok=110, out_tok=68):`.\n**Luồng chạy:** Tra bảng MODEL_PRICING_PER_1M theo tên model trong YAML (gemini-3.5-flash-lite: $0.30/1M in, $2.50/1M out). -> Xác định tổng review toàn thành phố t4: ưu tiên --city-reviews, hoặc tự đếm id duy nhất trong data/raw/{last_snap}/reviews.csv.gz. -> Nhân hệ số thực đo ~110 input token + ~68 output token / review -> tính tổng token & USD làm tròn 4 chữ số..\n**Input:** cfg, total_llm, city_reviews=None, in_tok=110, out_tok=68 -> **Output:** pd.DataFrame 2 dòng -> reports/llm_cost_estimate.csv..\n**Giải đáp sâu:** Giá output đắt gấp 8.33 lần input; đó là lý do `src/llm.py` thiết kế Pydantic schema cực gọn, không bắt model sinh trường giải thích summary dài dòng.",
    "projectLink": "src/evaluate.py:L207-L239",
    "codeLocation": "src/evaluate.py:L207-L239",
    "proofExample": "Ví dụ: `uoc_tinh_chi_phi(cfg, 1000, 1719730) -> $0.2030 và $349.1052.`. Sử dụng tại: Sinh reports/llm_cost_estimate.csv ở cuối main().",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `uoc_tinh_chi_phi` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `uoc_tinh_chi_phi` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu không còn file data/raw/*/reviews.csv.gz và không truyền --city-reviews, dòng toàn thành phố sẽ bị bỏ qua kèm [EVAL WARN]."
      }
    ],
    "commonMistakes": [
      "Nếu không còn file data/raw/*/reviews.csv.gz và không truyền --city-reviews, dòng toàn thành phố sẽ bị bỏ qua kèm [EVAL WARN]."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L207-L239",
      "code": "def uoc_tinh_chi_phi(cfg, total_llm, city_reviews=None, in_tok=110, out_tok=68):\n    \"\"\"Ước tính token và chi phí API (USD) cho 1.000 mẫu LLM và toàn thành phố ở mốc cuối.\"\"\"\n    # shortcut: dùng hệ số trung bình ~110 token vào + ~68 token ra/review đo từ 1.000 mẫu\n    llm_cfg = cfg.get(\"llm\") or {}\n    model_name = str(llm_cfg.get(\"model\", \"gemini-3.5-flash-lite\"))\n    rates = MODEL_PRICING_PER_1M.get(model_name.removeprefix(\"models/\").strip().lower())\n    mucs = [(\"mau_llm\", int(llm_cfg.get(\"sample_size\", total_llm)))]\n\n    n_city = city_reviews if city_reviews is not None else llm_cfg.get(\"city_reviews\")\n    if n_city is not None:\n        mucs.append((\"toan_thanh_pho_moc_cuoi\", int(n_city)))\n    else:\n        snaps = sorted((str(s).strip() for s in cfg.get(\"snapshots\", [])), key=pd.to_datetime)\n        raw_files = [(s, p) for s in snaps if (p := ROOT / \"data\" / \"raw\" / s / \"reviews.csv.gz\").is_file()]"
    }
  },
  {
    "id": "vc-051",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "code",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/evaluate.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/evaluate.py` (`L246–L302`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: 4 tệp đầu ra của evaluate.py trong thư mục reports/ là gì?",
    "quickAnswer": "Điều phối toàn bộ quy trình Evaluate: đọc GT/LLM/Baseline, chấm 9 chỉ số, phân tích 46 lỗi, chạy hậu kiểm 6 quy tắc và ước tính chi phí. Cụ thể: evaluation_report.csv, llm_error_analysis.csv, llm_postcheck.csv và llm_cost_estimate.csv.",
    "explanation": "**Chữ ký:** `def main():`.\n**Luồng chạy:** Parse --config, --out-dir, --city-reviews; đọc 3 bảng qua doc_bang(). -> Lọc hợp lệ, chạy cot_diem() cho Baseline và LLM -> xuất evaluation_report.csv. -> Chạy phan_tich_loi() -> llm_error_analysis.csv; hau_kiem() -> llm_postcheck.csv; uoc_tinh_chi_phi() -> llm_cost_estimate.csv..\n**Input:** CLI args (--config, --out-dir, --city-reviews) -> **Output:** 4 tệp CSV phân tích chất lượng trong reports/..\n**Giải đáp sâu:** evaluation_report.csv, llm_error_analysis.csv, llm_postcheck.csv và llm_cost_estimate.csv.",
    "projectLink": "src/evaluate.py:L246-L302",
    "codeLocation": "src/evaluate.py:L246-L302",
    "proofExample": "Ví dụ: `python src/evaluate.py --config configs/mexico-city.yaml`. Sử dụng tại: Chặng 6 của STEPS trong run_pipeline.py.",
    "followUpQuestions": [
      "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu thiếu file ground_truth.csv, script dừng với FileNotFoundError."
      }
    ],
    "commonMistakes": [
      "Nếu thiếu file ground_truth.csv, script dừng với FileNotFoundError."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ],
    "codeBlock": {
      "file": "src/evaluate.py",
      "lines": "L246-L302",
      "code": "def main():\n    ap = argparse.ArgumentParser(description=\"Đánh giá LLM vs Baseline trên bộ nhãn tay\")\n    ap.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    ap.add_argument(\"--out-dir\", default=\"reports\", help=\"Thư mục ghi báo cáo\")\n    ap.add_argument(\"--city-reviews\", type=int, default=None, help=\"Số review mốc cuối toàn thành phố (nếu bỏ qua đọc raw)\")\n    args = ap.parse_args()\n\n    cfg = load_config(args.config)\n    llm_cfg = cfg.get(\"llm\") or {}\n    aspects = [str(a).strip() for a in (llm_cfg.get(\"aspects\") or ASPECTS) if str(a).strip()] or ASPECTS\n    out_dir = Path(args.out_dir) if Path(args.out_dir).is_absolute() else ROOT / args.out_dir\n    out_dir.mkdir(parents=True, exist_ok=True)\n\n    gt_path = (cfg.get(\"evaluate\") or {}).get(\"ground_truth\", \"data/samples/ground_truth.csv\")"
    }
  },
  {
    "id": "vc-052",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: load_config`.",
    "question": "Đọc hiểu hàm `load_config()` trong `src/kpi.py` (`L48–L57`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tham số `exclude_ghost: true` và `stale_review_days: 90` nằm ở đâu?",
    "quickAnswer": "Đọc file YAML lấy area_col, stale_review_days (90), exclude_ghost (True), snapshots và currency. Cụ thể: Nằm trong khối `kpi:` của configs/mexico-city.yaml và được đọc bởi main() trong src/kpi.py.",
    "explanation": "**Chữ ký:** `def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:`.\n**Luồng chạy:** Kiểm đường dẫn tuyệt đối/tương đối, đọc UTF-8, trả yaml.safe_load()..\n**Input:** config_path_str -> **Output:** Dict[str, Any].\n**Giải đáp sâu:** Nằm trong khối `kpi:` của configs/mexico-city.yaml và được đọc bởi main() trong src/kpi.py.",
    "projectLink": "src/kpi.py:L48-L57",
    "codeLocation": "src/kpi.py:L48-L57",
    "proofExample": "Ví dụ: `cfg = load_config(\"configs/mexico-city.yaml\")`. Sử dụng tại: Gọi đầu tiên trong main() của src/kpi.py.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `load_config` nếu dữ liệu đầu vào bất thường?",
        "a": "Cần đảm bảo tên khóa currency khớp với cột price_<cur> đã tạo ở src/qa.py."
      }
    ],
    "commonMistakes": [
      "Cần đảm bảo tên khóa currency khớp với cột price_<cur> đã tạo ở src/qa.py."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L48-L57",
      "code": "def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:\n    \"\"\"Đọc file cấu hình YAML từ CLI, PIPELINE_CONFIG hoặc đường dẫn mặc định.\"\"\"\n    target = config_path_str or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\")\n    cfg_file = Path(target)\n    if not cfg_file.is_absolute():\n        cfg_file = PROJECT_ROOT / cfg_file\n    if not cfg_file.is_file():\n        raise FileNotFoundError(f\"[KPI] Không tìm thấy file cấu hình: {cfg_file}\")\n    with cfg_file.open(\"r\", encoding=\"utf-8\") as f:\n        return yaml.safe_load(f)"
    }
  },
  {
    "id": "vc-053",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: _qa_flag`.",
    "question": "Đọc hiểu hàm `_qa_flag()` trong `src/kpi.py` (`L60–L62`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao `_qa_flag()` gọi `.fillna(True)` thay vì `.fillna(False)`?",
    "quickAnswer": "Đọc cột cờ QA boolean an toàn: nếu giá trị cờ bị thiếu (NaN) thì mặc định coi là True (vi phạm) theo nguyên tắc bảo thủ. Cụ thể: Theo nguyên tắc bảo thủ (fail-safe): nếu trạng thái kiểm định bị thiếu thì coi là chưa an toàn (vi phạm=True) để không đưa vào tính KPI.",
    "explanation": "**Chữ ký:** `def _qa_flag(df: pd.DataFrame, col: str) -> pd.Series:`.\n**Luồng chạy:** Gọi `df[col].fillna(True).astype(bool)`..\n**Input:** df (DataFrame), col (str tên cột qa_*) -> **Output:** pd.Series kiểu bool..\n**Giải đáp sâu:** Theo nguyên tắc bảo thủ (fail-safe): nếu trạng thái kiểm định bị thiếu thì coi là chưa an toàn (vi phạm=True) để không đưa vào tính KPI.",
    "projectLink": "src/kpi.py:L60-L62",
    "codeLocation": "src/kpi.py:L60-L62",
    "proofExample": "Ví dụ: `valid_price = (~_qa_flag(df, \"qa_missing_price\"))`. Sử dụng tại: Gọi liên tục trong compute_review_velocities, compute_ghost_listings, compute_occupancy_kpis và compute_price_and_ppg_kpis.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_qa_flag` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_qa_flag` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu cờ bị missing mà fillna(False), dữ liệu chưa được QA sẽ lọt qua như dữ liệu sạch — dùng fillna(True) giúp fail-safe."
      }
    ],
    "commonMistakes": [
      "Nếu cờ bị missing mà fillna(False), dữ liệu chưa được QA sẽ lọt qua như dữ liệu sạch — dùng fillna(True) giúp fail-safe."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L60-L62",
      "code": "def _qa_flag(df: pd.DataFrame, col: str) -> pd.Series:\n    \"\"\"Đọc cờ QA dạng bool; nếu giá trị cờ bị thiếu (NaN) thì coi là vi phạm (True).\"\"\"\n    return df[col].fillna(True).astype(bool)"
    }
  },
  {
    "id": "vc-054",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: _round_or_nan`.",
    "question": "Đọc hiểu hàm `_round_or_nan()` trong `src/kpi.py` (`L65–L66`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao `0.4849 - 0.3182 = 0.1667` nhưng kpi_by_snapshot.csv ghi `urgency_gap_mean = 0.1668` tại t1?",
    "quickAnswer": "Làm tròn giá trị số thực tới digits chữ số sau dấu phẩy nhưng giữ nguyên np.nan nếu đầu vào bị thiếu. Cụ thể: Do `occ_1-30_mean`, `occ_31-90_mean` và `urgency_gap_mean` đều được làm tròn độc lập qua `_round_or_nan()` từ các giá trị float đầy đủ ở bước listing.",
    "explanation": "**Chữ ký:** `def _round_or_nan(val: Any, digits: int = 4) -> float:`.\n**Luồng chạy:** Kiểm tra pd.isna(val) -> np.nan; ngược lại round(float(val), digits)..\n**Input:** val (Any), digits (int=4) -> **Output:** float (hoặc np.nan)..\n**Giải đáp sâu:** Do `occ_1-30_mean`, `occ_31-90_mean` và `urgency_gap_mean` đều được làm tròn độc lập qua `_round_or_nan()` từ các giá trị float đầy đủ ở bước listing.",
    "projectLink": "src/kpi.py:L65-L66",
    "codeLocation": "src/kpi.py:L65-L66",
    "proofExample": "Ví dụ: `_round_or_nan(np.nan, 4) -> nan; _round_or_nan(0.16678, 4) -> 0.1668`. Sử dụng tại: Dùng trong _iqr_stats(), compute_kpi_by_area(), compute_kpi_by_snapshot(), compute_kpi_by_neighbourhood().",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_round_or_nan` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_round_or_nan` nếu dữ liệu đầu vào bất thường?",
        "a": "Python round() dùng round-half-to-even (làm tròn ngân hàng), khác với làm tròn số học truyền thống ở đuôi .5 đúng."
      }
    ],
    "commonMistakes": [
      "Python round() dùng round-half-to-even (làm tròn ngân hàng), khác với làm tròn số học truyền thống ở đuôi .5 đúng."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L65-L66",
      "code": "def _round_or_nan(val: Any, digits: int = 4) -> float:\n    return np.nan if pd.isna(val) else round(float(val), digits)"
    }
  },
  {
    "id": "vc-055",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: _iqr_stats`.",
    "question": "Đọc hiểu hàm `_iqr_stats()` trong `src/kpi.py` (`L69–L84`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nếu một quận toàn bộ có giá = 0 (hoặc median <= 0), `_iqr_stats()` xử lý sao?",
    "quickAnswer": "Tính bộ 4 thống kê bền vững (count, median, IQR, rIQR) trên chuỗi sạch, có guard chống rỗng và Median <= 0. Cụ thể: Nhánh `if med > 0 else np.nan` ngăn ZeroDivisionError và trả rIQR là NaN.",
    "explanation": "**Chữ ký:** `def _iqr_stats(series: pd.Series, digits: int = 2) -> Tuple[int, float, float, float]:`.\n**Luồng chạy:** Lọc bỏ NaN: valid = series.dropna(). Nếu rỗng trả về (0, nan, nan, nan). -> Tính Q1 = quantile(0.25), med = median(), Q3 = quantile(0.75), iqr = Q3 - Q1. -> Guard: riqr = (iqr / med) if med > 0 else np.nan; làm tròn và trả tuple 4 phần tử..\n**Input:** series (pd.Series), digits (int=2) -> **Output:** Tuple (count: int, median: float, iqr: float, riqr: float)..\n**Giải đáp sâu:** Nhánh `if med > 0 else np.nan` ngăn ZeroDivisionError và trả rIQR là NaN.",
    "projectLink": "src/kpi.py:L69-L84",
    "codeLocation": "src/kpi.py:L69-L84",
    "proofExample": "Ví dụ: `_iqr_stats(valid_ppg_t4) -> (980, 626.79, 495.75, 0.7909)`. Sử dụng tại: Dùng cho Price & PPG ở cả 3 cấp độ: Snapshot, Area và Neighbourhood.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_iqr_stats` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_iqr_stats` nếu dữ liệu đầu vào bất thường?",
        "a": "Khi cỡ mẫu quận bằng 1 (Milpa Alta n=1), Q1 == Q3 == Median -> IQR=0 và rIQR=0.0 (không lỗi chia 0, nhưng không mang ý nghĩa phân tán thực sự)."
      }
    ],
    "commonMistakes": [
      "Khi cỡ mẫu quận bằng 1 (Milpa Alta n=1), Q1 == Q3 == Median -> IQR=0 và rIQR=0.0 (không lỗi chia 0, nhưng không mang ý nghĩa phân tán thực sự)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L69-L84",
      "code": "def _iqr_stats(series: pd.Series, digits: int = 2) -> Tuple[int, float, float, float]:\n    \"\"\"Tính (count, median, IQR, rIQR) trên chuỗi sạch; trả về NaN nếu rỗng.\"\"\"\n    valid = series.dropna()\n    if valid.empty:\n        return 0, np.nan, np.nan, np.nan\n    q1 = float(valid.quantile(0.25))\n    med = float(valid.median())\n    q3 = float(valid.quantile(0.75))\n    iqr = q3 - q1\n    riqr = (iqr / med) if med > 0 else np.nan\n    return (\n        len(valid),\n        round(med, digits),\n        round(iqr, digits),"
    }
  },
  {
    "id": "vc-056",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: _price_col`.",
    "question": "Đọc hiểu hàm `_price_col()` trong `src/kpi.py` (`L87–L88`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Lợi ích của hàm `_price_col()` so với viết cứng \"price_mxn\" là gì?",
    "quickAnswer": "Sinh tên cột giá chuẩn hóa theo mã tiền tệ trong YAML (ví dụ \"MXN\" -> \"price_mxn\"). Cụ thể: Giúp cùng một mã nguồn chạy lại được cho bất kỳ thành phố nào khác (ví dụ CLP, EUR, GBP) chỉ bằng cách sửa YAML.",
    "explanation": "**Chữ ký:** `def _price_col(config: Dict[str, Any]) -> str:`.\n**Luồng chạy:** Trả về f\"price_{str(config.get(\"currency\", \"MXN\")).strip().lower()}\"..\n**Input:** config (Dict) -> **Output:** str (tên cột giá, ở CDMX là \"price_mxn\")..\n**Giải đáp sâu:** Giúp cùng một mã nguồn chạy lại được cho bất kỳ thành phố nào khác (ví dụ CLP, EUR, GBP) chỉ bằng cách sửa YAML.",
    "projectLink": "src/kpi.py:L87-L88",
    "codeLocation": "src/kpi.py:L87-L88",
    "proofExample": "Ví dụ: `_price_col({\"currency\": \"MXN\"}) -> \"price_mxn\"`. Sử dụng tại: Dùng trong _load_snapshots(), compute_price_and_ppg_kpis(), compute_kpi_by_snapshot(), compute_kpi_by_neighbourhood().",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_price_col` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_price_col` nếu dữ liệu đầu vào bất thường?",
        "a": "Đòi hỏi config.currency phải đồng bộ hoàn toàn giữa qa.py và kpi.py."
      }
    ],
    "commonMistakes": [
      "Đòi hỏi config.currency phải đồng bộ hoàn toàn giữa qa.py và kpi.py."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L87-L88",
      "code": "def _price_col(config: Dict[str, Any]) -> str:\n    return f\"price_{str(config.get('currency', 'MXN')).strip().lower()}\""
    }
  },
  {
    "id": "vc-057",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: _load_snapshots`.",
    "question": "Đọc hiểu hàm `_load_snapshots()` trong `src/kpi.py` (`L91–L111`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Hợp đồng dữ liệu REQUIRED_QA_COLS trong _load_snapshots() bảo vệ pipeline khỏi lỗi gì?",
    "quickAnswer": "Nạp tuần tự 4 bảng listings.csv đã qua QA, xác thực hợp đồng dữ liệu 13 cột bắt buộc (REQUIRED_QA_COLS + price_col) và gắn index=\"id\". Cụ thể: Ngăn trường hợp chạy kpi.py trước qa.py (hoặc dùng bản listings chưa QA) làm các phép tính sau đọc nhầm cột thô hoặc thiếu cờ QA.",
    "explanation": "**Chữ ký:** `def _load_snapshots(config: Dict[str, Any]) -> List[Tuple[str, str, pd.DataFrame]]:`.\n**Luồng chạy:** Sắp xếp snapshots tăng dần theo pd.to_datetime; ghép tập required_cols = REQUIRED_QA_COLS | {_price_col(config)}. -> Đọc từng CSV với dtype={\"id\": \"string\"}; kiểm tra `missing_cols = required_cols - set(df.columns)` -> ném ValueError nếu thiếu. -> Strip chuỗi id, gắn df.set_index(\"id\") và gán nhãn t1..t4..\n**Input:** config (Dict) -> **Output:** List[(snap_date, t_label, df_indexed)] với t1..t4..\n**Giải đáp sâu:** Ngăn trường hợp chạy kpi.py trước qa.py (hoặc dùng bản listings chưa QA) làm các phép tính sau đọc nhầm cột thô hoặc thiếu cờ QA.",
    "projectLink": "src/kpi.py:L91-L111",
    "codeLocation": "src/kpi.py:L91-L111",
    "proofExample": "Ví dụ: `_load_snapshots(cfg) -> 4 tuple cho 2025-09-27 (t1) .. 2026-06-15 (t4).`. Sử dụng tại: Bước nạp dữ liệu nền tảng trong main() của src/kpi.py.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_snapshots` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_snapshots` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu bảng nào có trùng lặp id do bỏ qua bước qa.py, set_index(\"id\") sẽ tạo duplicate index gây nhân dòng ở phép toán sau."
      }
    ],
    "commonMistakes": [
      "Nếu bảng nào có trùng lặp id do bỏ qua bước qa.py, set_index(\"id\") sẽ tạo duplicate index gây nhân dòng ở phép toán sau."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L91-L111",
      "code": "def _load_snapshots(config: Dict[str, Any]) -> List[Tuple[str, str, pd.DataFrame]]:\n    \"\"\"Nạp dữ liệu đã qua QA theo thứ tự thời gian tăng dần: [(snap, t_label, df_indexed)].\"\"\"\n    snaps = sorted([str(s).strip() for s in config.get(\"snapshots\", [])], key=pd.to_datetime)\n    if not snaps:\n        raise ValueError(\"[KPI] Config không có danh sách snapshots.\")\n\n    required_cols = REQUIRED_QA_COLS | {_price_col(config)}\n    loaded: List[Tuple[str, str, pd.DataFrame]] = []\n    for idx, snap in enumerate(snaps):\n        path = PROJECT_ROOT / \"data\" / \"processed\" / snap / \"listings.csv\"\n        if not path.is_file():\n            raise FileNotFoundError(f\"[KPI] Không tìm thấy: {path}\")\n        df = pd.read_csv(path, low_memory=False, dtype={\"id\": \"string\"})\n        missing_cols = sorted(required_cols - set(df.columns))"
    }
  },
  {
    "id": "vc-058",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: compute_review_velocities`.",
    "question": "Đọc hiểu hàm `compute_review_velocities()` trong `src/kpi.py` (`L114–L137`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao Q1 dài 93 ngày, Q3 dài 77 ngày nhưng Review Velocity vẫn so sánh trực tiếp được?",
    "quickAnswer": "Tính Review Velocity (số review mới trung bình mỗi 30 ngày) giữa 3 cặp snapshot liên tiếp (Q1: t1->t2, Q2: t2->t3, Q3: t3->t4). Cụ thể: Vì phép chia cho delta_months = days / 30.0 chuẩn hóa mọi quý về cùng đơn vị review / 30 ngày.",
    "explanation": "**Chữ ký:** `def compute_review_velocities(`.\n**Luồng chạy:** Duyệt 3 cặp (snapshots[i], snapshots[i+1]). -> Kiểm cờ ~qa_missing_reviews ở cả hai đầu mốc. -> Tính diff = nr_curr - nr_prev (tự khớp đúng ID nhờ index=\"id\"); đặt valid_pair &= (diff >= 0)..\n**Input:** snapshots (List[(snap, t_lbl, df)]) -> **Output:** Dict {\"review_velocity_q1\": Series, \"q2\": Series, \"q3\": Series}..\n**Giải đáp sâu:** Vì phép chia cho delta_months = days / 30.0 chuẩn hóa mọi quý về cùng đơn vị review / 30 ngày.",
    "projectLink": "src/kpi.py:L114-L137",
    "codeLocation": "src/kpi.py:L114-L137",
    "proofExample": "Ví dụ: `L2 tăng 5 review trong 77 ngày (t3->t4) -> 5 / (77/30) = 1.9481 rv/30d.`. Sử dụng tại: Cấp đầu vào trực tiếp cho compute_ghost_listings() và build_kpi_by_listing().",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_review_velocities` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_review_velocities` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu một listing bị Airbnb xóa spam làm tổng review giảm (diff < 0), code gán NaN thay vì giá trị âm vô nghĩa (1 ca xảy ra ở Q3 -> rvN=999)."
      }
    ],
    "commonMistakes": [
      "Nếu một listing bị Airbnb xóa spam làm tổng review giảm (diff < 0), code gán NaN thay vì giá trị âm vô nghĩa (1 ca xảy ra ở Q3 -> rvN=999)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L114-L137",
      "code": "def compute_review_velocities(\n    snapshots: List[Tuple[str, str, pd.DataFrame]]\n) -> Dict[str, pd.Series]:\n    \"\"\"\n    Tính Review Velocity (review mới/tháng) giữa các mốc liên tiếp.\n    Nếu một trong hai mốc bị qa_missing_reviews hoặc số review giảm (diff < 0) -> NaN.\n    \"\"\"\n    velocities: Dict[str, pd.Series] = {}\n    for i in range(len(snapshots) - 1):\n        snap_prev, _, df_prev = snapshots[i]\n        snap_curr, _, df_curr = snapshots[i + 1]\n\n        nr_prev = pd.to_numeric(df_prev[\"number_of_reviews_clean\"], errors=\"coerce\")\n        nr_curr = pd.to_numeric(df_curr[\"number_of_reviews_clean\"], errors=\"coerce\")"
    }
  },
  {
    "id": "vc-059",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: compute_ghost_listings`.",
    "question": "Đọc hiểu hàm `compute_ghost_listings()` trong `src/kpi.py` (`L140–L174`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Ở t1, một căn có a365=0, number_of_reviews=12 và last_review cách t1 đúng 15 ngày thì có bị xem là Ghost không?",
    "quickAnswer": "Phân loại từng căn hộ thành 3 trạng thái: 1 (Ghost), 0 (Hoạt động) hoặc <NA> (thiếu căn cứ QA/RV) theo logic riêng cho t1 và t2..t4. Cụ thể: Không! Vì delta = 15 <= 90 ngày -> is_stale = False -> ghost_t1 = 0 (có thể căn hộ vừa mới kín khách).",
    "explanation": "**Chữ ký:** `def compute_ghost_listings(`.\n**Luồng chạy:** Kiểm tra điều kiện nền: ~qa_invalid_availability & ~qa_missing_reviews & a365.notna() & nr.notna(). -> Nếu i == 0 (mốc t1): chưa có RV -> ghost = (a365 == 0) & ((nr == 0) | ((t1 - last_review).dt.days > stale_days)). -> Nếu i > 0 (t2..t4): dùng RV tương ứng đã tính -> ghost = (a365 == 0) & (rv == 0)..\n**Input:** snapshots, velocities (Dict), stale_days (int=90) -> **Output:** Dict {\"ghost_t1\": Series, ..., \"ghost_t4\": Series} kiểu Int64..\n**Giải đáp sâu:** Không! Vì delta = 15 <= 90 ngày -> is_stale = False -> ghost_t1 = 0 (có thể căn hộ vừa mới kín khách).",
    "projectLink": "src/kpi.py:L140-L174",
    "codeLocation": "src/kpi.py:L140-L174",
    "proofExample": "Ví dụ: `Tại t4 có 4 căn ghost=1, 995 căn ghost=0, 1 căn ghost=<NA> (do rv_q3=NaN).`. Sử dụng tại: Dùng làm bộ lọc exclude_ghost cho compute_occupancy_kpis() và thống kê Ghost Rate.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_ghost_listings` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_ghost_listings` nếu dữ liệu đầu vào bất thường?",
        "a": "Không thể áp dụng cùng một công thức cho t1 và t2..t4 vì t1 không có snapshot t0 đứng trước."
      }
    ],
    "commonMistakes": [
      "Không thể áp dụng cùng một công thức cho t1 và t2..t4 vì t1 không có snapshot t0 đứng trước."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L140-L174",
      "code": "def compute_ghost_listings(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    velocities: Dict[str, pd.Series],\n    stale_days: int = 90,\n) -> Dict[str, pd.Series]:\n    \"\"\"\n    Phân loại căn hộ ma (1 = ma, 0 = không ma, <NA> = thiếu dữ liệu QA/thành phần):\n      - Mốc t1: ~qa_invalid_availability & ~qa_missing_reviews & ((nr == 0) | last_review hợp lệ),\n        ghost = (a365 == 0) & ((nr == 0) | (t1 - last_review > stale_days ngày)).\n      - Mốc t2..t4: ~qa_invalid_availability & ~qa_missing_reviews & review_velocity hợp lệ,\n        ghost = (a365 == 0) & (review_velocity == 0).\n    \"\"\"\n    ghost_dict: Dict[str, pd.Series] = {}\n    for i, (snap, t_lbl, df) in enumerate(snapshots):"
    }
  },
  {
    "id": "vc-060",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: compute_occupancy_kpis`.",
    "question": "Đọc hiểu hàm `compute_occupancy_kpis()` trong `src/kpi.py` (`L177–L212`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao có trường hợp `a90 >= a30` được kiểm lại trong `compute_occupancy_kpis()` dù `qa.py` đã kiểm?",
    "quickAnswer": "Tính availability_31-90, tỷ lệ không khả dụng occ_1-30, occ_31-90 và urgency_gap cho cả 4 mốc, hỗ trợ loại bỏ ghost & <NA> khi exclude_ghost=True. Cụ thể: Nguyên tắc lập trình phòng thủ (Defense in depth): lỡ file bị sửa ngoài luồng thì hàm KPI vẫn không sinh a31_90 âm.",
    "explanation": "**Chữ ký:** `def compute_occupancy_kpis(`.\n**Luồng chạy:** Kiểm tra ~qa_invalid_availability và a90 >= a30; tính a31_90 = (a90 - a30) kiểu Int64. -> Nếu exclude_ghost=True: lấy ghost_t_lbl và lọc thêm `& (g == 0).fillna(False)` (loại cả 1 và <NA>). -> Tính vector hóa occ_30_raw = (30 - a30)/30, occ_31_90_raw = (60 - a31_90)/60..\n**Input:** snapshots, ghost_dict, exclude_ghost (bool=True) -> **Output:** Dict chứa 16 Series (4 chỉ số × 4 mốc t1..t4)..\n**Giải đáp sâu:** Nguyên tắc lập trình phòng thủ (Defense in depth): lỡ file bị sửa ngoài luồng thì hàm KPI vẫn không sinh a31_90 âm.",
    "projectLink": "src/kpi.py:L177-L212",
    "codeLocation": "src/kpi.py:L177-L212",
    "proofExample": "Ví dụ: `a30=6, a90=48, ghost=0 -> Occ_1-30 = 0.8000, Occ_31-90 = 0.3000, Urgency Gap = 0.5000.`. Sử dụng tại: Tổng hợp vào kpi_by_listing và trả lời câu hỏi về áp lực đặt sát ngày cho SECTUR CDMX.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_occupancy_kpis` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_occupancy_kpis` nếu dữ liệu đầu vào bất thường?",
        "a": "Thiếu `.fillna(False)` ở `(g == 0)` sẽ làm lỗi mặt nạ chứa pd.NA (logic 3 giá trị Kleene)."
      }
    ],
    "commonMistakes": [
      "Thiếu `.fillna(False)` ở `(g == 0)` sẽ làm lỗi mặt nạ chứa pd.NA (logic 3 giá trị Kleene)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L177-L212",
      "code": "def compute_occupancy_kpis(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    ghost_dict: Dict[str, pd.Series],\n    exclude_ghost: bool = True,\n) -> Dict[str, pd.Series]:\n    \"\"\"\n    Tính availability_31-90, occ_1-30, occ_31-90 và urgency_gap cho từng mốc.\n    Nếu vi phạm qa_invalid_availability hoặc (khi exclude_ghost=True) ghost là 1 hoặc <NA> -> giữ NaN.\n    \"\"\"\n    out: Dict[str, pd.Series] = {}\n    for _, t_lbl, df in snapshots:\n        inv_avail = _qa_flag(df, \"qa_invalid_availability\")\n        a30 = pd.to_numeric(df[\"availability_30_clean\"], errors=\"coerce\")\n        a90 = pd.to_numeric(df[\"availability_90_clean\"], errors=\"coerce\")"
    }
  },
  {
    "id": "vc-061",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: compute_price_and_ppg_kpis`.",
    "question": "Đọc hiểu hàm `compute_price_and_ppg_kpis()` trong `src/kpi.py` (`L215–L252`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao không dùng median của các giá trị trung bình khu vực mà phải tính `_iqr_stats()` trực tiếp trên toàn chuỗi clean_price/ppg của snapshot?",
    "quickAnswer": "Tính Price sạch và PPG = price / accommodates trên từng listing (loại giá thiếu/<=0, GIỮ ngoại lai P01–P99), đồng thời trả thống kê snapshot. Cụ thể: Trung vị của các trung vị nhóm (median of medians) không bằng trung vị toàn mẫu! Tính trực tiếp trên 980 căn mới đúng toán học.",
    "explanation": "**Chữ ký:** `def compute_price_and_ppg_kpis(`.\n**Luồng chạy:** Xác thực valid_price (~qa_missing_price & > 0) và valid_acc (~qa_invalid_accommodates & > 0). -> Tính ppg = (clean_price / clean_acc) khi cả hai đều hợp lệ; làm tròn 2 chữ số. -> Gọi _iqr_stats() tách riêng cho clean_price (valid_price_count) và ppg (valid_ppg_count) lưu vào snapshot_stats..\n**Input:** snapshots, price_col=\"price_mxn\" -> **Output:** Tuple (listing_series: Dict, snapshot_stats: Dict theo ngày snapshot)..\n**Giải đáp sâu:** Trung vị của các trung vị nhóm (median of medians) không bằng trung vị toàn mẫu! Tính trực tiếp trên 980 căn mới đúng toán học.",
    "projectLink": "src/kpi.py:L215-L252",
    "codeLocation": "src/kpi.py:L215-L252",
    "proofExample": "Ví dụ: `Ở t2 trả valid_price_count=0 và các chỉ số NaN; ở t4 trả 980 căn, Median Price 1.940,00, Median PPG 626,79.`. Sử dụng tại: Cung cấp chuỗi giá/PPG cho bảng listing và thống kê chuẩn xác (trước làm tròn từng phần) cho bảng snapshot.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_price_and_ppg_kpis` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_price_and_ppg_kpis` nếu dữ liệu đầu vào bất thường?",
        "a": "Khi một listing có giá hợp lệ nhưng health check accommodates bị lỗi, valid_price_count và valid_ppg_count sẽ khác nhau."
      }
    ],
    "commonMistakes": [
      "Khi một listing có giá hợp lệ nhưng health check accommodates bị lỗi, valid_price_count và valid_ppg_count sẽ khác nhau."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L215-L252",
      "code": "def compute_price_and_ppg_kpis(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    price_col: str = \"price_mxn\",\n) -> Tuple[Dict[str, pd.Series], Dict[str, Dict[str, Any]]]:\n    \"\"\"\n    Tính Price và PPG = price / accommodates (chỉ loại giá thiếu/<= 0 và sức chứa không hợp lệ).\n    Giữ lại giá trị ngoại lai (qa_price_outlier).\n    \"\"\"\n    listing_series: Dict[str, pd.Series] = {}\n    snapshot_stats: Dict[str, Dict[str, Any]] = {}\n\n    for snap, t_lbl, df in snapshots:\n        price = pd.to_numeric(df[price_col], errors=\"coerce\")\n        valid_price = (~_qa_flag(df, \"qa_missing_price\")) & price.notna() & (price > 0)"
    }
  },
  {
    "id": "vc-062",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: build_kpi_by_listing`.",
    "question": "Đọc hiểu hàm `build_kpi_by_listing()` trong `src/kpi.py` (`L255–L276`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao cuối hàm phải gọi `.reset_index()` trước khi xuất CSV?",
    "quickAnswer": "Hợp nhất toàn bộ chuỗi KPI xuyên suốt 4 mốc thời gian của 1.000 căn hộ thành một bảng tổng hợp ngang cấp listing (1 dòng / căn hộ). Cụ thể: Vì _load_snapshots() đặt \"id\" làm index; .reset_index() trả \"id\" về lại thành cột đầu tiên khi gọi to_csv(..., index=False).",
    "explanation": "**Chữ ký:** `def build_kpi_by_listing(`.\n**Luồng chạy:** Lấy metadata (area_col, neighbourhood_cleansed, room_type) từ snapshot cuối cùng (snapshots[-1]). -> Lần lượt gắn các Series từ velocities, ghost_dict, occ_dict, price_dict theo chỉ mục id (.reindex(final_df.index)). -> Gọi .reset_index() đưa id trở lại làm cột thông thường..\n**Input:** snapshots, velocities, ghost_dict, occ_dict, price_dict, area_col -> **Output:** pd.DataFrame (1.000 dòng -> data/processed/kpi_by_listing.csv)..\n**Giải đáp sâu:** Vì _load_snapshots() đặt \"id\" làm index; .reset_index() trả \"id\" về lại thành cột đầu tiên khi gọi to_csv(..., index=False).",
    "projectLink": "src/kpi.py:L255-L276",
    "codeLocation": "src/kpi.py:L255-L276",
    "proofExample": "Ví dụ: `kpi_by_listing -> 1.000 dòng với các cột t1..t4 song song cho từng căn.`. Sử dụng tại: Là nguồn cấp dữ liệu trực tiếp cho compute_kpi_by_area(), compute_kpi_by_snapshot() và compute_kpi_by_neighbourhood().",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `build_kpi_by_listing` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `build_kpi_by_listing` nếu dữ liệu đầu vào bất thường?",
        "a": "Lấy metadata từ snapshot cuối cùng giả định quận/loại phòng của 1.000 listing cố định không đổi qua 4 quý."
      }
    ],
    "commonMistakes": [
      "Lấy metadata từ snapshot cuối cùng giả định quận/loại phòng của 1.000 listing cố định không đổi qua 4 quý."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L255-L276",
      "code": "def build_kpi_by_listing(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    velocities: Dict[str, pd.Series],\n    ghost_dict: Dict[str, pd.Series],\n    occ_dict: Dict[str, pd.Series],\n    price_dict: Dict[str, pd.Series],\n    area_col: str = \"analysis_area\",\n) -> pd.DataFrame:\n    \"\"\"Tổng hợp bảng KPI cấp listing từ mốc cuối cùng và chuỗi các mốc theo id.\"\"\"\n    _, _, final_df = snapshots[-1]\n\n    base = pd.DataFrame(index=final_df.index)\n    for col in dict.fromkeys((area_col, \"neighbourhood_cleansed\", \"room_type\")):\n        if col in final_df.columns:"
    }
  },
  {
    "id": "vc-063",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: compute_kpi_by_area`.",
    "question": "Đọc hiểu hàm `compute_kpi_by_area()` trong `src/kpi.py` (`L279–L311`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao dùng `.mean()` cho `occ_1-30` trong khu vực A01–A08 nhưng lại dùng `_iqr_stats()` (Median & rIQR) cho `ppg`?",
    "quickAnswer": "Tổng hợp 4 nhóm KPI (RV mean, Ghost count/n/rate, Occ/Gap mean, Median/IQR/rIQR PPG) theo từng khu vực phân tích A01–A08. Cụ thể: Vì Occupancy bị chặn cứng trong [0, 1] không có outlier cực đoan, còn PPG lệch phải rất mạnh nên cần Median & rIQR.",
    "explanation": "**Chữ ký:** `def compute_kpi_by_area(`.\n**Luồng chạy:** Groupby theo area_col (dropna=False) tính total_listings = len(group). -> Đếm mẫu hợp lệ bằng .count() (loại NaN) cho RV, Ghost, Occupancy. -> Tính Median, IQR, rIQR PPG từng mốc bằng _iqr_stats()..\n**Input:** kpi_by_listing, t_labels, area_col=\"analysis_area\" -> **Output:** pd.DataFrame (8 dòng A01–A08 -> data/processed/kpi_by_area.csv)..\n**Giải đáp sâu:** Vì Occupancy bị chặn cứng trong [0, 1] không có outlier cực đoan, còn PPG lệch phải rất mạnh nên cần Median & rIQR.",
    "projectLink": "src/kpi.py:L279-L311",
    "codeLocation": "src/kpi.py:L279-L311",
    "proofExample": "Ví dụ: `A05: Med PPG t4 = 819.31, rIQR = 0.6597; A08: Med PPG t4 = 427.97, rIQR = 0.9526.`. Sử dụng tại: Dữ liệu nguồn cho 4 biểu đồ khu vực/thời gian trong src/viz.py.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_kpi_by_area` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_kpi_by_area` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu 1 khu vực thiếu hẳn dữ liệu (vd PPG ở t2), _iqr_stats() trả về 0 và NaN an toàn."
      }
    ],
    "commonMistakes": [
      "Nếu 1 khu vực thiếu hẳn dữ liệu (vd PPG ở t2), _iqr_stats() trả về 0 và NaN an toàn."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L279-L311",
      "code": "def compute_kpi_by_area(\n    kpi_by_listing: pd.DataFrame,\n    t_labels: List[str],\n    area_col: str = \"analysis_area\",\n) -> pd.DataFrame:\n    \"\"\"Tổng hợp KPI theo từng khu vực phân tích; giữ NaN nếu không có mẫu hợp lệ.\"\"\"\n    rows: List[Dict[str, Any]] = []\n    for area, group in kpi_by_listing.groupby(area_col, dropna=False):\n        row: Dict[str, Any] = {area_col: area, \"total_listings\": len(group)}\n        for i in range(1, len(t_labels)):\n            rv_col = f\"review_velocity_q{i}\"\n            if rv_col in group.columns:\n                row[f\"{rv_col}_n\"] = int(group[rv_col].count())\n                row[f\"{rv_col}_mean\"] = _round_or_nan(group[rv_col].mean(), 4)"
    }
  },
  {
    "id": "vc-064",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: compute_kpi_by_snapshot`.",
    "question": "Đọc hiểu hàm `compute_kpi_by_snapshot()` trong `src/kpi.py` (`L314–L366`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao tổng hợp Price/PPG ở kpi_by_snapshot lại lấy từ snapshot_stats thay vì tự tính lại?",
    "quickAnswer": "Tổng hợp KPI toàn thị trường qua 4 dòng t1..t4, kết hợp thống kê Ghost/RV/Occ từ kpi_by_listing và thống kê Price/PPG chính xác từ snapshot_stats. Cụ thể: Để tính trực tiếp trên độ chính xác float đầy đủ trước khi chuỗi kpi_by_listing bị làm tròn 2 chữ số.",
    "explanation": "**Chữ ký:** `def compute_kpi_by_snapshot(`.\n**Luồng chạy:** Duyệt 4 mốc: tính ghost_n, ghost_count, ghost_rate (lưu pd.NA/NaN nếu rỗng). -> Với t1 (idx == 0) gán review_velocity_n = pd.NA và mean = np.nan; t2..t4 đếm count() và mean(). -> Ghép Price/PPG stats từ snapshot_stats; ép các cột đếm sang Int64 để giữ <NA> ở t1..\n**Input:** snapshots, kpi_by_listing, snapshot_stats, price_col -> **Output:** pd.DataFrame (4 dòng -> data/processed/kpi_by_snapshot.csv)..\n**Giải đáp sâu:** Để tính trực tiếp trên độ chính xác float đầy đủ trước khi chuỗi kpi_by_listing bị làm tròn 2 chữ số.",
    "projectLink": "src/kpi.py:L314-L366",
    "codeLocation": "src/kpi.py:L314-L366",
    "proofExample": "Ví dụ: `t1: rv_n=<NA>, valid_price_count=960; t2: valid_price_count=0; t4: valid_price_count=980.`. Sử dụng tại: Xuất bảng kpi_by_snapshot.csv và làm tham chiếu đường đứt nét trên các biểu đồ.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_kpi_by_snapshot` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_kpi_by_snapshot` nếu dữ liệu đầu vào bất thường?",
        "a": "Ép kiểu .astype(\"Int64\") cuối hàm là bắt buộc để `review_velocity_n` tại t1 không biến thành `1000.0` (float) trong CSV."
      }
    ],
    "commonMistakes": [
      "Ép kiểu .astype(\"Int64\") cuối hàm là bắt buộc để `review_velocity_n` tại t1 không biến thành `1000.0` (float) trong CSV."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L314-L366",
      "code": "def compute_kpi_by_snapshot(\n    snapshots: List[Tuple[str, str, pd.DataFrame]],\n    kpi_by_listing: pd.DataFrame,\n    snapshot_stats: Dict[str, Dict[str, Any]],\n    price_col: str = \"price_mxn\",\n) -> pd.DataFrame:\n    \"\"\"Tổng hợp KPI toàn thị trường theo từng snapshot; giữ <NA>/NaN nếu không có mẫu hợp lệ.\"\"\"\n    rows: List[Dict[str, Any]] = []\n    total_cnt = len(kpi_by_listing)\n\n    for idx, (snap, t_lbl, _) in enumerate(snapshots):\n        g_valid = kpi_by_listing[f\"ghost_{t_lbl}\"].dropna()\n        ghost_n = len(g_valid)\n        ghost_cnt = pd.NA if g_valid.empty else int(g_valid.sum())"
    }
  },
  {
    "id": "vc-065",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: _load_llm_reviews`.",
    "question": "Đọc hiểu hàm `_load_llm_reviews()` trong `src/kpi.py` (`L369–L379`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao `_load_llm_reviews()` đọc cả `id` lẫn `listing_id` dưới dạng `string`?",
    "quickAnswer": "Đọc file reviews_sentiment.csv (với id và listing_id dạng string) và danh sách khía cạnh từ cấu hình YAML. Cụ thể: Để bước merge vào `kpi_by_listing` theo `listing_id` trong `compute_kpi_by_neighbourhood()` khớp chính xác 100% mã 18–19 chữ số.",
    "explanation": "**Chữ ký:** `def _load_llm_reviews(config: Dict[str, Any]) -> Tuple[pd.DataFrame, List[str]]:`.\n**Luồng chạy:** Lấy đường dẫn output_csv và aspects từ config.llm; kiểm tra file tồn tại; đọc CSV giữ ID dạng chuỗi..\n**Input:** config (Dict) -> **Output:** Tuple (reviews_df: DataFrame, aspects: List[str])..\n**Giải đáp sâu:** Để bước merge vào `kpi_by_listing` theo `listing_id` trong `compute_kpi_by_neighbourhood()` khớp chính xác 100% mã 18–19 chữ số.",
    "projectLink": "src/kpi.py:L369-L379",
    "codeLocation": "src/kpi.py:L369-L379",
    "proofExample": "Ví dụ: `df, aspects = _load_llm_reviews(cfg) -> 1.000 dòng, 7 khía cạnh.`. Sử dụng tại: Được main() gọi để chuyển dữ liệu LLM sang compute_kpi_by_neighbourhood().",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_llm_reviews` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_llm_reviews` nếu dữ liệu đầu vào bất thường?",
        "a": "Ném FileNotFoundError nếu chạy src/kpi.py khi chưa chạy xong src/llm.py."
      }
    ],
    "commonMistakes": [
      "Ném FileNotFoundError nếu chạy src/kpi.py khi chưa chạy xong src/llm.py."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L369-L379",
      "code": "def _load_llm_reviews(config: Dict[str, Any]) -> Tuple[pd.DataFrame, List[str]]:\n    \"\"\"Nạp bảng kết quả LLM từ cấu hình để phục vụ tính KPI trải nghiệm theo quận.\"\"\"\n    llm_cfg = config.get(\"llm\", {})\n    aspects = [str(a).strip() for a in llm_cfg.get(\"aspects\", DEFAULT_LLM_ASPECTS) if str(a).strip()] or DEFAULT_LLM_ASPECTS\n    path = Path(llm_cfg.get(\"output_csv\", \"data/processed/reviews_sentiment.csv\"))\n    if not path.is_absolute():\n        path = PROJECT_ROOT / path\n    if not path.is_file():\n        raise FileNotFoundError(f\"[KPI] Không tìm thấy kết quả LLM: {path}. Hãy chạy src/llm.py trước!\")\n    df = pd.read_csv(path, low_memory=False, dtype={\"id\": \"string\", \"listing_id\": \"string\"})\n    return df, aspects"
    }
  },
  {
    "id": "vc-066",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: compute_kpi_by_neighbourhood`.",
    "question": "Đọc hiểu hàm `compute_kpi_by_neighbourhood()` trong `src/kpi.py` (`L382–L461`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: 3 quận có llm_review_count = 0 (Iztapalapa, Milpa Alta, Xochimilco) vẫn có mặt trong kpi_by_neighbourhood.csv bằng cách nào?",
    "quickAnswer": "Ánh xạ 1.000 review LLM về đúng quận qua bảng listing, tính 14 cột tỷ lệ phàn nàn (complaint & complaint_mixed × 7) và ghép thống kê Price/PPG qua 4 mốc cho đủ 15 quận. Cụ thể: Nhờ bước `out = out.reindex(all_neighs)` theo danh sách tất cả 15 quận lấy từ `kpi_by_listing`, điền `llm_review_count=0` nhưng giữ `NaN` ở 14 cột tỷ lệ phàn nàn.",
    "explanation": "**Chữ ký:** `def compute_kpi_by_neighbourhood(`.\n**Luồng chạy:** Kiểm tra hợp đồng cột ở cả kpi_by_listing và reviews_df. -> Nối left-join reviews vào bảng tra cứu listing->neighbourhood theo listing_id; chỉ giữ review có ít nhất 1 nhãn khía cạnh khác NaN. -> Ánh xạ nhãn bằng COMPLAINT_SCORE_MAP (negative=1) và COMPLAINT_MIXED_SCORE_MAP (negative/mixed=1) rồi groupby quận..\n**Input:** kpi_by_listing, reviews_df, aspects, t_labels, price_col -> **Output:** pd.DataFrame (15 dòng sắp theo llm_review_count giảm dần -> kpi_by_neighbourhood.csv)..\n**Giải đáp sâu:** Nhờ bước `out = out.reindex(all_neighs)` theo danh sách tất cả 15 quận lấy từ `kpi_by_listing`, điền `llm_review_count=0` nhưng giữ `NaN` ở 14 cột tỷ lệ phàn nàn.",
    "projectLink": "src/kpi.py:L382-L461",
    "codeLocation": "src/kpi.py:L382-L461",
    "proofExample": "Ví dụ: `Cuauhtémoc (llm=749, complaints_mix_amenities=0.1482); Xochimilco (llm=0 -> complaint giữ NaN).`. Sử dụng tại: Cấp bảng dữ liệu chính cho 3 biểu đồ kpi_ppg_neighbourhood, kpi_riqr_neighbourhood và llm_insights.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_kpi_by_neighbourhood` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `compute_kpi_by_neighbourhood` nếu dữ liệu đầu vào bất thường?",
        "a": "Các quận nhỏ (n=1 ở Milpa Alta, n=3 ở Magdalena Contreras, n=4 ở Iztapalapa) có rank/rIQR dao động rất mạnh."
      }
    ],
    "commonMistakes": [
      "Các quận nhỏ (n=1 ở Milpa Alta, n=3 ở Magdalena Contreras, n=4 ở Iztapalapa) có rank/rIQR dao động rất mạnh."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L382-L461",
      "code": "def compute_kpi_by_neighbourhood(\n    kpi_by_listing: pd.DataFrame,\n    reviews_df: pd.DataFrame,\n    aspects: Optional[List[str]] = None,\n    t_labels: Optional[List[str]] = None,\n    price_col: str = \"price_mxn\",\n) -> pd.DataFrame:\n    \"\"\"\n    Tính tỷ lệ phàn nàn LLM và thống kê Price/PPG theo quận ngay trên mẫu listings được giao.\n    \"\"\"\n    missing_listing_cols = sorted({\"id\", \"neighbourhood_cleansed\"} - set(kpi_by_listing.columns))\n    if missing_listing_cols:\n        raise ValueError(f\"[KPI] kpi_by_listing thiếu cột bắt buộc {missing_listing_cols}.\")\n"
    }
  },
  {
    "id": "vc-067",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "pandas"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/kpi.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/kpi.py` (`L464–L511`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Mối liên hệ phụ thuộc giữa 4 bảng đầu ra của kpi.py là gì?",
    "quickAnswer": "Điều phối tính toàn bộ 4 cấp KPI (Listing, Area, Snapshot, Neighbourhood) từ 4 file listings QA + reviews_sentiment.csv và lưu 4 tệp CSV vào data/processed/. Cụ thể: kpi_by_listing (1.000 dòng) là bảng trung tâm sinh ra trực tiếp kpi_by_area (8 dòng), kpi_by_snapshot (4 dòng) và ghép với reviews_sentiment tạo kpi_by_neighbourhood (15 dòng).",
    "explanation": "**Chữ ký:** `def main() -> None:`.\n**Luồng chạy:** Đọc config, nạp 4 snapshot qua _load_snapshots(). -> Tính tuần tự velocities -> ghost_dict -> occ_dict -> price_dict -> _load_llm_reviews(). -> Dựng 4 bảng: kpi_by_listing, kpi_by_area, kpi_by_snapshot, kpi_by_neighbourhood và lưu CSV..\n**Input:** CLI arg --config -> **Output:** 4 tệp kpi_by_{listing,area,snapshot,neighbourhood}.csv trong data/processed/..\n**Giải đáp sâu:** kpi_by_listing (1.000 dòng) là bảng trung tâm sinh ra trực tiếp kpi_by_area (8 dòng), kpi_by_snapshot (4 dòng) và ghép với reviews_sentiment tạo kpi_by_neighbourhood (15 dòng).",
    "projectLink": "src/kpi.py:L464-L511",
    "codeLocation": "src/kpi.py:L464-L511",
    "proofExample": "Ví dụ: `python src/kpi.py --config configs/mexico-city.yaml`. Sử dụng tại: Chặng 7 của STEPS trong run_pipeline.py.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Yêu cầu bước QA (chặng 3) và LLM (chặng 4) phải đã chạy hoàn tất trước đó."
      }
    ],
    "commonMistakes": [
      "Yêu cầu bước QA (chặng 3) và LLM (chặng 4) phải đã chạy hoàn tất trước đó."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L464-L511",
      "code": "def main() -> None:\n    parser = argparse.ArgumentParser(description=\"Inside Airbnb KPI Precomputation Module\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    args = parser.parse_args()\n\n    print(\"=\" * 70)\n    print(\"[KPI] BẮT ĐẦU TÍNH TOÁN KPI\")\n    print(\"=\" * 70)\n\n    config = load_config(args.config)\n    kpi_cfg = config.get(\"kpi\", {})\n    area_col = str(kpi_cfg.get(\"area_col\") or config.get(\"qa\", {}).get(\"area_col\", \"analysis_area\"))\n    stale_days = int(kpi_cfg.get(\"stale_review_days\", 90))\n    exclude_ghost = bool(kpi_cfg.get(\"exclude_ghost\", True))"
    }
  },
  {
    "id": "vc-068",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: _read_kpi`.",
    "question": "Đọc hiểu hàm `_read_kpi()` trong `src/viz.py` (`L30–L36`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nguyên tắc SOLID trong docstring đầu tệp `src/viz.py` thể hiện ở điểm nào?",
    "quickAnswer": "Hàm helper đọc file CSV đầu vào cho viz.py kèm kiểm tra không rỗng và đủ mọi cột bắt buộc. Cụ thể: viz.py chỉ làm duy nhất nhiệm vụ đọc bảng KPI đã tính sẵn để vẽ; tuyệt đối không tự tính lại PPG, rIQR hay Ghost trong code vẽ.",
    "explanation": "**Chữ ký:** `def _read_kpi(proc: Path, name: str, cols: list[str] | None = None, **kw) -> pd.DataFrame:`.\n**Luồng chạy:** pd.read_csv(proc/name) -> Nếu df.empty hoặc thiếu cột trong cols -> ném ValueError ngay kèm tên bảng..\n**Input:** proc (Path), name (str), cols (list | None), **kw -> **Output:** pd.DataFrame.\n**Giải đáp sâu:** viz.py chỉ làm duy nhất nhiệm vụ đọc bảng KPI đã tính sẵn để vẽ; tuyệt đối không tự tính lại PPG, rIQR hay Ghost trong code vẽ.",
    "projectLink": "src/viz.py:L30-L36",
    "codeLocation": "src/viz.py:L30-L36",
    "proofExample": "Ví dụ: `_read_kpi(proc, \"kpi_by_area.csv\", [\"analysis_area\", \"total_listings\"])`. Sử dụng tại: Đọc 4 bảng KPI và evaluation_report.csv trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_read_kpi` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_read_kpi` nếu dữ liệu đầu vào bất thường?",
        "a": "Chỉ kiểm tra cột ở mức sự tồn tại chứ không ép lại kiểu số (được từng hàm plot_* ép tiếp bằng pd.to_numeric)."
      }
    ],
    "commonMistakes": [
      "Chỉ kiểm tra cột ở mức sự tồn tại chứ không ép lại kiểu số (được từng hàm plot_* ép tiếp bằng pd.to_numeric)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L30-L36",
      "code": "def _read_kpi(proc: Path, name: str, cols: list[str] | None = None, **kw) -> pd.DataFrame:\n    df = pd.read_csv(proc / name, low_memory=False, **kw)\n    if df.empty:\n        raise ValueError(f\"[VIZ] Bảng KPI rỗng: {name}\")\n    if cols and (missing := [c for c in cols if c not in df.columns]):\n        raise ValueError(f\"[VIZ] {name} thiếu cột: {missing}\")\n    return df"
    }
  },
  {
    "id": "vc-069",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: _mat`.",
    "question": "Đọc hiểu hàm `_mat()` trong `src/viz.py` (`L39–L44`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao các ô trong `plot_occupancy_gap` nhân với `scale=100.0`?",
    "quickAnswer": "Trích xuất tập cột từ DataFrame KPI theo cột index thành ma trận float chuẩn bị đưa vào Seaborn heatmap (có thể nhân hệ số scale=100 cho %). Cụ thể: Vì CSV lưu tỷ lệ trong [0, 1] (vd 0.4847) nhưng heatmap hiển thị phần trăm (48.5%) để trực quan dễ đọc.",
    "explanation": "**Chữ ký:** `def _mat(df: pd.DataFrame, idx: str, cols: list[str], headers: list[str], scale: float = 1.0) -> pd.DataFrame:`.\n**Luồng chạy:** Kiểm tra đủ cột -> set_index(idx)[cols].astype(float) * scale -> đổi tên cột theo headers đẹp..\n**Input:** df, idx, cols, headers, scale=1.0 -> **Output:** pd.DataFrame ma trận số..\n**Giải đáp sâu:** Vì CSV lưu tỷ lệ trong [0, 1] (vd 0.4847) nhưng heatmap hiển thị phần trăm (48.5%) để trực quan dễ đọc.",
    "projectLink": "src/viz.py:L39-L44",
    "codeLocation": "src/viz.py:L39-L44",
    "proofExample": "Ví dụ: `_mat(area_s, \"analysis_area\", [\"occ_1-30_t1_mean\", ...], headers, 100.0)`. Sử dụng tại: Dùng trong plot_review_ghost(), plot_occupancy_gap() và plot_llm_insights().",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_mat` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_mat` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu đặt sai thứ tự headers so với cols, nhãn trục X của heatmap sẽ bị hoán đổi."
      }
    ],
    "commonMistakes": [
      "Nếu đặt sai thứ tự headers so với cols, nhãn trục X của heatmap sẽ bị hoán đổi."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L39-L44",
      "code": "def _mat(df: pd.DataFrame, idx: str, cols: list[str], headers: list[str], scale: float = 1.0) -> pd.DataFrame:\n    if missing := [c for c in cols if c not in df.columns]:\n        raise ValueError(f\"[VIZ] Thiếu cột KPI: {missing}\")\n    mat = df.set_index(idx)[cols].astype(float) * scale\n    mat.columns = headers\n    return mat"
    }
  },
  {
    "id": "vc-070",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: _save`.",
    "question": "Đọc hiểu hàm `_save()` trong `src/viz.py` (`L47–L56`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao `plot_ppg_neighbourhood()` lại gọi `_save(..., use_tight=False)`?",
    "quickAnswer": "Chuẩn hóa quy trình xuất ảnh PNG 150 DPI theo 5 điểm kiểm tra hình: gắn Action Title ở trên, bọc dòng Caption nguồn/cỡ mẫu ở dưới và cân chỉnh khoảng đệm không bị đè chữ. Cụ thể: Vì biểu đồ bản đồ 4 khung tự chia bố cục bằng fig.add_gridspec(3, 2) kèm hộp chú thích ở hàng 3; chạy tight_layout() sẽ làm co méo aspect bản đồ.",
    "explanation": "**Chữ ký:** `def _save(fig: plt.Figure, path: Path, title: str, caption: str, use_tight: bool = True) -> Path:`.\n**Luồng chạy:** Bọc dòng caption theo chiều rộng figure bằng textwrap.fill. -> Đặt suptitle ở y=0.985 và caption nguồn ở đáy figure (0.015, 0.015). -> Tự tính vùng rect cho tight_layout (nếu use_tight=True) và gọi fig.savefig(path, dpi=150, bbox_inches=\"tight\")..\n**Input:** fig, path, title, caption, use_tight=True -> **Output:** Path tới ảnh PNG đã lưu..\n**Giải đáp sâu:** Vì biểu đồ bản đồ 4 khung tự chia bố cục bằng fig.add_gridspec(3, 2) kèm hộp chú thích ở hàng 3; chạy tight_layout() sẽ làm co méo aspect bản đồ.",
    "projectLink": "src/viz.py:L47-L56",
    "codeLocation": "src/viz.py:L47-L56",
    "proofExample": "Ví dụ: `_save(fig, out_dir / \"kpi_ppg_snapshots.png\", title, caption)`. Sử dụng tại: Gọi ở câu lệnh return của toàn bộ 8 hàm plot_*().",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_save` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_save` nếu dữ liệu đầu vào bất thường?",
        "a": "Với figure phức tạp dùng GridSpec riêng như plot_ppg_neighbourhood(), phải truyền use_tight=False để tight_layout không phá hỏng chú thích ở dưới."
      }
    ],
    "commonMistakes": [
      "Với figure phức tạp dùng GridSpec riêng như plot_ppg_neighbourhood(), phải truyền use_tight=False để tight_layout không phá hỏng chú thích ở dưới."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L47-L56",
      "code": "def _save(fig: plt.Figure, path: Path, title: str, caption: str, use_tight: bool = True) -> Path:\n    path.parent.mkdir(parents=True, exist_ok=True)\n    wrapped = \"\\n\".join(fill(line, width=max(85, int(fig.get_figwidth() * 11.5)), break_long_words=False, break_on_hyphens=False) for line in caption.splitlines())\n    fig.suptitle(title, fontsize=13, fontweight=\"bold\", y=0.985)\n    fig.text(0.015, 0.015, wrapped, fontsize=8, va=\"bottom\", color=\"#334155\")\n    footer = min(0.28, max(0.11, (len(wrapped.splitlines()) * 11 + 16) / 72 / fig.get_figheight()))\n    if use_tight:\n        fig.tight_layout(rect=(0, footer, 1, 0.93))\n    fig.savefig(path, dpi=150, bbox_inches=\"tight\")\n    return path"
    }
  },
  {
    "id": "vc-071",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: _heatmap`.",
    "question": "Đọc hiểu hàm `_heatmap()` trong `src/viz.py` (`L59–L74`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Cách `viz.py` minh bạch hóa các ô khuyết mẫu (như RV ở Q1 hay quận ít mẫu) trên Heatmap là gì?",
    "quickAnswer": "Hàm vẽ Heatmap tùy biến: nền xám cho NA, chú thích kèm phân số/cỡ mẫu (vd `2.31 (3/130)`), và điền nhãn chữ \"NA\" rõ ràng tại các ô bị thiếu. Cụ thể: Đắp mặt nạ `mask=mat.isna()` trên nền xám nhạt + viết nhãn chữ `\"NA\"` giữa ô và luôn in `(u/c)` hoặc `(n=c)` kèm dưới mỗi giá trị.",
    "explanation": "**Chữ ký:** `def _heatmap(ax: plt.Axes, mat: pd.DataFrame, title: str, cbar: str, cmap: str, fmt: str = \".1f\", vmin: float | None = 0.0, vmax: float | None = None, center: float | None = None, counts: pd.DataFrame | None = None, nums: pd.DataFrame | None = None) -> None:`.\n**Luồng chạy:** Đặt màu nền #E5E7EB cho ô mặt nạ (mat.isna()). -> Nếu có bảng counts (và nums): tự dựng bảng chuỗi annot chứa giá trị + cỡ mẫu trong ngoặc. -> Vẽ sns.heatmap(mask=mat.isna(), ...) rồi duyệt np.argwhere(mat.isna()) để viết chữ \"NA\" ở tâm ô khuyết..\n**Input:** ax, mat, title, cbar, cmap, fmt, vmin, vmax, center, counts, nums -> **Output:** None; vẽ trực tiếp lên đối tượng matplotlib Axes..\n**Giải đáp sâu:** Đắp mặt nạ `mask=mat.isna()` trên nền xám nhạt + viết nhãn chữ `\"NA\"` giữa ô và luôn in `(u/c)` hoặc `(n=c)` kèm dưới mỗi giá trị.",
    "projectLink": "src/viz.py:L59-L74",
    "codeLocation": "src/viz.py:L59-L74",
    "proofExample": "Ví dụ: `_heatmap(ax2, gh_m, \"Ghost Rate (%)\", ..., counts=gh_n, nums=gh_c)`. Sử dụng tại: Dùng trong plot_review_ghost(), plot_occupancy_gap() và plot_llm_insights().",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_heatmap` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_heatmap` nếu dữ liệu đầu vào bất thường?",
        "a": "Phải truyền thêm `fmt=\"\"` cho sns.heatmap khi dùng annot dạng chuỗi tùy biến để tránh lỗi format string."
      }
    ],
    "commonMistakes": [
      "Phải truyền thêm `fmt=\"\"` cho sns.heatmap khi dùng annot dạng chuỗi tùy biến để tránh lỗi format string."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L59-L74",
      "code": "def _heatmap(ax: plt.Axes, mat: pd.DataFrame, title: str, cbar: str, cmap: str, fmt: str = \".1f\", vmin: float | None = 0.0, vmax: float | None = None, center: float | None = None, counts: pd.DataFrame | None = None, nums: pd.DataFrame | None = None) -> None:\n    ax.set_facecolor(\"#E5E7EB\")\n    if counts is not None:\n        num_rows = nums.to_numpy() if nums is not None else np.full(mat.shape, np.nan)\n        annot = pd.DataFrame(\n            [[(f\"{v:{fmt}}\\n({int(u)}/{int(c)})\" if pd.notna(u) else f\"{v:{fmt}}\\n(n={int(c)})\") if pd.notna(v) and pd.notna(c) else \"\" for v, u, c in zip(vr, ur, cr)] for vr, ur, cr in zip(mat.to_numpy(), num_rows, counts.to_numpy())],\n            index=mat.index, columns=mat.columns,\n        )\n        sns.heatmap(mat, mask=mat.isna(), annot=annot, fmt=\"\", annot_kws={\"fontsize\": 8}, cmap=cmap, vmin=vmin, vmax=vmax, center=center, linewidths=0.6, linecolor=\"white\", cbar_kws={\"label\": cbar, \"shrink\": 0.85}, ax=ax)\n    else:\n        sns.heatmap(mat, mask=mat.isna(), annot=True, fmt=fmt, annot_kws={\"fontsize\": 9}, cmap=cmap, vmin=vmin, vmax=vmax, center=center, linewidths=0.6, linecolor=\"white\", cbar_kws={\"label\": cbar, \"shrink\": 0.85}, ax=ax)\n    for r, c in np.argwhere(mat.isna().to_numpy()):\n        ax.text(c + 0.5, r + 0.5, \"NA\", ha=\"center\", va=\"center\", fontsize=8, color=\"#365784\")\n    ax.set(title=title, xlabel=\"\")"
    }
  },
  {
    "id": "vc-072",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: _load_geojson`.",
    "question": "Đọc hiểu hàm `_load_geojson()` trong `src/viz.py` (`L77–L92`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao nhóm tự viết `_load_geojson()` đọc JSON thuần thay vì cài GeoPandas?",
    "quickAnswer": "Đọc trực tiếp tệp ranh giới hành chính GeoJSON bằng module json thuần thành danh sách đa giác NumPy cho từng quận mà không cần GeoPandas. Cụ thể: GeoPandas phụ thuộc vào GDAL/Fiona rất dễ lỗi biên dịch trên Windows/Python 3.14; đọc JSON + matplotlib Polygon chỉ tốn ~15 dòng code thuần gọn nhẹ.",
    "explanation": "**Chữ ký:** `def _load_geojson(path: Path) -> list[tuple[str, list[np.ndarray]]]:`.\n**Luồng chạy:** Đọc và parse JSON từ data/processed/neighbourhoods.geojson. -> Lặp qua features: đọc thuộc tính \"neighbourhood\", trích vòng tọa độ ngoài cho cả Polygon và MultiPolygon. -> Chuyển từng ring thành mảng NumPy (N, 2) tọa độ (lon, lat); lọc bỏ ring < 3 đỉnh..\n**Input:** path (Path tới neighbourhoods.geojson) -> **Output:** list[(ten_quan: str, rings: list[np.ndarray])]..\n**Giải đáp sâu:** GeoPandas phụ thuộc vào GDAL/Fiona rất dễ lỗi biên dịch trên Windows/Python 3.14; đọc JSON + matplotlib Polygon chỉ tốn ~15 dòng code thuần gọn nhẹ.",
    "projectLink": "src/viz.py:L77-L92",
    "codeLocation": "src/viz.py:L77-L92",
    "proofExample": "Ví dụ: `features = _load_geojson(Path(\"data/processed/neighbourhoods.geojson\")) -> 16 quận CDMX.`. Sử dụng tại: Được plot_ppg_neighbourhood() gọi để lấy hình dạng 16 quận.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_geojson` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_load_geojson` nếu dữ liệu đầu vào bất thường?",
        "a": "Chỉ lấy vòng bao ngoài của đa giác (ring 0); nếu một quận có \"lỗ thủng\" rỗng bên trong (interior hole) thì ring ngoài vẫn phủ qua."
      }
    ],
    "commonMistakes": [
      "Chỉ lấy vòng bao ngoài của đa giác (ring 0); nếu một quận có \"lỗ thủng\" rỗng bên trong (interior hole) thì ring ngoài vẫn phủ qua."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L77-L92",
      "code": "def _load_geojson(path: Path) -> list[tuple[str, list[np.ndarray]]]:\n    if not path.is_file():\n        raise FileNotFoundError(f\"[VIZ] Thiếu {path.relative_to(ROOT)}; hãy chạy lại filter_data_from_sheet.py.\")\n    data = json.loads(path.read_text(encoding=\"utf-8\"))\n    features: list[tuple[str, list[np.ndarray]]] = []\n    for feat in data.get(\"features\", []):\n        name = str(feat.get(\"properties\", {}).get(\"neighbourhood\", \"\")).strip()\n        geom = feat.get(\"geometry\") or {}\n        gtype, coords = geom.get(\"type\"), geom.get(\"coordinates\") or []\n        raw_rings = [coords[0]] if gtype == \"Polygon\" and coords else [p[0] for p in coords if p] if gtype == \"MultiPolygon\" else []\n        rings = [np.asarray(r, dtype=float) for r in raw_rings if len(r) >= 3]\n        if name and rings:\n            features.append((name, rings))\n    if not features:"
    }
  },
  {
    "id": "vc-073",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: _centroid`.",
    "question": "Đọc hiểu hàm `_centroid()` trong `src/viz.py` (`L95–L105`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao tính tâm bằng diện tích Shoelace tốt hơn lấy trung bình cộng tọa độ đỉnh `pts.mean(axis=0)`?",
    "quickAnswer": "Tính tọa độ tâm hình học chính xác theo công thức Shoelace (tổng hợp diện tích đa giác có hướng) để đặt số thứ hạng #1..#15 nằm gọn giữa lòng quận. Cụ thể: Vì trung bình đỉnh bị kéo lệch về phía các đoạn đường biên có nhiều điểm gấp khúc (vd ven sông/rìa núi) chứ không phải tâm diện tích thực của quận.",
    "explanation": "**Chữ ký:** `def _centroid(rings: list[np.ndarray]) -> tuple[float, float]:`.\n**Luồng chạy:** Tìm mảnh đa giác có diện tích lớn nhất trong rings (đối với MultiPolygon). -> Tính cross = x0*y1 - x1*y0 và diện tích 2*A = cross.sum(). -> Tính tọa độ trọng tâm (cx, cy) theo công thức đa giác; fallback về mean() nếu diện tích tiệm cận 0..\n**Input:** rings (list[np.ndarray]) -> **Output:** Tuple (cx: float, cy: float)..\n**Giải đáp sâu:** Vì trung bình đỉnh bị kéo lệch về phía các đoạn đường biên có nhiều điểm gấp khúc (vd ven sông/rìa núi) chứ không phải tâm diện tích thực của quận.",
    "projectLink": "src/viz.py:L95-L105",
    "codeLocation": "src/viz.py:L95-L105",
    "proofExample": "Ví dụ: `cx, cy = _centroid(rings) -> đặt nhãn #1 trên đa giác Cuauhtémoc.`. Sử dụng tại: Được plot_ppg_neighbourhood() gọi để gắn số thứ hạng lên 15 quận.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_centroid` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_centroid` nếu dữ liệu đầu vào bất thường?",
        "a": "Với các quận hình lưỡi liềm cực kỳ lõm, trọng tâm hình học lý thuyết có thể rơi gần rìa nhưng đa phần quận CDMX lồi ổn định."
      }
    ],
    "commonMistakes": [
      "Với các quận hình lưỡi liềm cực kỳ lõm, trọng tâm hình học lý thuyết có thể rơi gần rìa nhưng đa phần quận CDMX lồi ổn định."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L95-L105",
      "code": "def _centroid(rings: list[np.ndarray]) -> tuple[float, float]:\n    best_area, best_xy = -1.0, rings[0].mean(axis=0)\n    for pts in rings:\n        x0, y0 = pts[:, 0], pts[:, 1]\n        x1, y1 = np.roll(x0, -1), np.roll(y0, -1)\n        cross = x0 * y1 - x1 * y0\n        area2 = float(cross.sum())\n        if abs(area2) > max(1e-12, best_area):\n            best_area = abs(area2)\n            best_xy = np.array([((x0 + x1) * cross).sum(), ((y0 + y1) * cross).sum()]) / (3.0 * area2)\n    return float(best_xy[0]), float(best_xy[1])"
    }
  },
  {
    "id": "vc-074",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_ppg_riqr`.",
    "question": "Đọc hiểu hàm `plot_ppg_riqr()` trong `src/viz.py` (`L108–L143`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Nhìn vào `kpi_ppg_riqr_2026-06-15.png`, vì sao phải ghép cả Boxplot (trái) và thanh rIQR (phải)?",
    "quickAnswer": "Vẽ biểu đồ 2 khung (kpi_ppg_riqr_2026-06-15.png): Trái là Boxplot PPG theo loại phòng (trục X thang log); Phải là cột ngang rIQR(PPG) & Trung vị theo 8 khu vực A01–A08. Cụ thể: Boxplot cho thấy phân bố từng nhóm phòng (Entire vs Private) cùng outlier đuôi phải, còn rIQR cho thấy mức độ đồng đều chuẩn hóa (A05 đồng đều hơn A08).",
    "explanation": "**Chữ ký:** `def plot_ppg_riqr(listing: pd.DataFrame, area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Đọc snapshot cuối từ snap.iloc[-1]; lọc các dòng có PPG > 0. -> Khung trái: vẽ sns.boxplot(..., log_scale=True, palette=\"colorblind\") chia hue room_type. -> Khung phải: vẽ thanh ngang barh rIQR(PPG) kèm nhãn `rIQR (Med M)`..\n**Input:** listing, area, snap, city, area_col, out_dir, cur=\"MXN\" -> **Output:** Tuple (Path, plt.Figure) -> figures/kpi_ppg_riqr_2026-06-15.png..\n**Giải đáp sâu:** Boxplot cho thấy phân bố từng nhóm phòng (Entire vs Private) cùng outlier đuôi phải, còn rIQR cho thấy mức độ đồng đều chuẩn hóa (A05 đồng đều hơn A08).",
    "projectLink": "src/viz.py:L108-L143",
    "codeLocation": "src/viz.py:L108-L143",
    "proofExample": "Ví dụ: `A05 dẫn đầu Median PPG (819 MXN, rIQR=0.660); A08 thấp nhất (428 MXN, rIQR=0.953).`. Sử dụng tại: Job thứ 1 trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_ppg_riqr` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_ppg_riqr` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu không bật log_scale=True trên boxplot, 2% căn đầu cơ giá cực cao sẽ ép toàn bộ phần hộp dữ liệu chính co rúm sát lề trái."
      }
    ],
    "commonMistakes": [
      "Nếu không bật log_scale=True trên boxplot, 2% căn đầu cơ giá cực cao sẽ ép toàn bộ phần hộp dữ liệu chính co rúm sát lề trái."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L108-L143",
      "code": "def plot_ppg_riqr(listing: pd.DataFrame, area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    final = snap.iloc[-1]\n    dt, t = str(final[\"snapshot\"]), str(final[\"label\"])\n    ppg_col, n_col, riqr_col, med_col = f\"ppg_{t}\", f\"valid_ppg_{t}\", f\"riqr_ppg_{t}\", f\"median_ppg_{t}\"\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    areas = area_s[area_col].astype(str).tolist()\n\n    valid = listing.loc[pd.to_numeric(listing[ppg_col], errors=\"coerce\") > 0].copy()\n    valid[ppg_col] = pd.to_numeric(valid[ppg_col], errors=\"coerce\")\n    valid[\"room_type\"] = valid[\"room_type\"].fillna(\"Không rõ\").astype(str)\n    if valid.empty:\n        raise ValueError(f\"[VIZ] Không có giá trị dương ở {ppg_col}.\")\n    room_types = sorted(valid[\"room_type\"].unique())\n"
    }
  },
  {
    "id": "vc-075",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_ppg_snapshots`.",
    "question": "Đọc hiểu hàm `plot_ppg_snapshots()` trong `src/viz.py` (`L146–L188`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Mốc t2 không có giá thì vì sao không ẩn luôn khung t2 để chỉ vẽ 3 hình cho đẹp?",
    "quickAnswer": "Vẽ lưới 4 khung Small Multiples (kpi_ppg_snapshots.png) cùng trục X [0, xmax] để so sánh trực tiếp Trung vị PPG qua t1–t4 và hiển thị khung cảnh báo đỏ tại t2. Cụ thể: Theo Bài 12–14, ẩn khung t2 là che giấu dữ liệu khuyết; đặt đủ 4 khung cùng trục thời gian kèm cảnh báo đỏ chứng tỏ sự minh bạch tuyệt đối.",
    "explanation": "**Chữ ký:** `def plot_ppg_snapshots(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Tìm xmax chung trên toàn bộ 4 mốc để giữ cùng một thang đo. -> Tạo lưới 2×2 với sharex=True, sharey=True. -> Tại từng mốc: nếu snap_med hợp lệ -> vẽ thanh ngang + đường đứt nét trung vị thị trường; nếu t2 khuyết giá -> hiển thị hộp cảnh báo đỏ n=0/1.000..\n**Input:** area, snap, city, area_col, out_dir, cur=\"MXN\" -> **Output:** Tuple (Path, plt.Figure) -> figures/kpi_ppg_snapshots.png..\n**Giải đáp sâu:** Theo Bài 12–14, ẩn khung t2 là che giấu dữ liệu khuyết; đặt đủ 4 khung cùng trục thời gian kèm cảnh báo đỏ chứng tỏ sự minh bạch tuyệt đối.",
    "projectLink": "src/viz.py:L146-L188",
    "codeLocation": "src/viz.py:L146-L188",
    "proofExample": "Ví dụ: `Median PPG toàn mẫu tăng từ 382 (t1) -> NA (t2) -> 565 (t3) -> 627 MXN (t4).`. Sử dụng tại: Job thứ 2 trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_ppg_snapshots` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_ppg_snapshots` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu bỏ `sharex=True` hoặc tự động co giãn trục từng khung, sự nhảy vọt +64.1% từ t1 lên t4 sẽ bị bóp méo thị giác."
      }
    ],
    "commonMistakes": [
      "Nếu bỏ `sharex=True` hoặc tự động co giãn trục từng khung, sự nhảy vọt +64.1% từ t1 lên t4 sẽ bị bóp méo thị giác."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L146-L188",
      "code": "def plot_ppg_snapshots(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    areas = area_s[area_col].astype(str).tolist()\n    y = np.arange(len(areas))\n    med_cols = [f\"median_ppg_{t}\" for t in snap[\"label\"].astype(str)]\n    all_vals = pd.concat([pd.to_numeric(area_s[c], errors=\"coerce\") for c in med_cols]).dropna()\n    xmax = (float(all_vals.max()) * 1.32) if not all_vals.empty else 1000.0\n\n    nrows = max(1, int(np.ceil(len(snap) / 2)))\n    fig, axes = plt.subplots(nrows, 2, figsize=(13.5, 4.2 * nrows + 1.0), sharex=True, sharey=True)\n    axes_flat = np.atleast_1d(axes).ravel()\n    for i, row in snap.reset_index(drop=True).iterrows():\n        ax = axes_flat[i]\n        dt, t = str(row[\"snapshot\"]), str(row[\"label\"])"
    }
  },
  {
    "id": "vc-076",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: _sample_tag`.",
    "question": "Đọc hiểu hàm `_sample_tag()` trong `src/viz.py` (`L191–L195`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Trong chú thích bản đồ CDMX, `n=51/53` tại Coyoacán nghĩa là gì?",
    "quickAnswer": "Định dạng chuỗi chú thích cỡ mẫu ngắn gọn cho từng quận: nếu valid_price == valid_ppg thì ghi \"n=514/525\", ngược lại tách rõ \"p=..., ppg=.../...\". Cụ thể: Có 53 listing phân công ở Coyoacán và trong đó có 51 listing có giá + PPG hợp lệ sau QA ở mốc t4.",
    "explanation": "**Chữ ký:** `def _sample_tag(row: pd.Series, vp_col: str, vg_col: str) -> str:`.\n**Luồng chạy:** Đọc vp, vg, tot; so sánh vp == vg để quyết định chuỗi định dạng..\n**Input:** row (pd.Series), vp_col (str), vg_col (str) -> **Output:** str (ví dụ \"n=514/525\")..\n**Giải đáp sâu:** Có 53 listing phân công ở Coyoacán và trong đó có 51 listing có giá + PPG hợp lệ sau QA ở mốc t4.",
    "projectLink": "src/viz.py:L191-L195",
    "codeLocation": "src/viz.py:L191-L195",
    "proofExample": "Ví dụ: `_sample_tag(cuauhtemoc_row, \"valid_price_t4\", \"valid_ppg_t4\") -> \"n=514/525\"`. Sử dụng tại: Dùng chung trong chú thích của cả plot_ppg_neighbourhood() và plot_riqr_neighbourhood().",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_sample_tag` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `_sample_tag` nếu dữ liệu đầu vào bất thường?",
        "a": "Tránh hiển thị nhầm một mẫu số chung khi thành phố khác có lỗi thiếu health check `accommodates`."
      }
    ],
    "commonMistakes": [
      "Tránh hiển thị nhầm một mẫu số chung khi thành phố khác có lỗi thiếu health check `accommodates`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L191-L195",
      "code": "def _sample_tag(row: pd.Series, vp_col: str, vg_col: str) -> str:\n    vp = int(row[vp_col]) if pd.notna(row[vp_col]) else 0\n    vg = int(row[vg_col]) if pd.notna(row[vg_col]) else 0\n    tot = int(row[\"total_listings\"]) if pd.notna(row[\"total_listings\"]) else 0\n    return f\"n={vp}/{tot}\" if vp == vg else f\"p={vp}, ppg={vg}/{tot}\""
    }
  },
  {
    "id": "vc-077",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_ppg_neighbourhood`.",
    "question": "Đọc hiểu hàm `plot_ppg_neighbourhood()` trong `src/viz.py` (`L198–L298`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Vì sao hàng trên (Price Mean & Median) bắt buộc phải dùng chung một thanh colorbar `price_norm`?",
    "quickAnswer": "Vẽ bản đồ Choropleth 4 khung (Price Mean/Median hàng trên; PPG Mean/Median hàng dưới) kèm đa giác Tláhuac gạch chéo và bảng mã quận #1..#15. Cụ thể: Nếu mỗi khung tự scale màu từ min đến max của riêng nó, Cuauhtémoc có Mean 3.529 và Median 2.215 sẽ đều tô màu đỏ sẫm như nhau -> che lấp tác động của outlier.",
    "explanation": "**Chữ ký:** `def plot_ppg_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, geo_path: Path, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Đọc đa giác 16 quận qua _load_geojson() và tính geo_aspect hiệu chỉnh tỉ lệ kinh/vĩ độ. -> Tạo 2 chuẩn màu Normalize dùng chung: price_norm cho hàng Price, ppg_norm cho hàng PPG. -> Lặp từng quận vẽ Patch Polygon; tô xám hatch=\"///\" cho Tláhuac; đặt số thứ hạng #1..#15 tại _centroid()..\n**Input:** nb, snap, geo_path, city, out_dir, cur=\"MXN\" -> **Output:** Tuple (Path, plt.Figure) -> figures/kpi_ppg_neighbourhood.png..\n**Giải đáp sâu:** Nếu mỗi khung tự scale màu từ min đến max của riêng nó, Cuauhtémoc có Mean 3.529 và Median 2.215 sẽ đều tô màu đỏ sẫm như nhau -> che lấp tác động của outlier.",
    "projectLink": "src/viz.py:L198-L298",
    "codeLocation": "src/viz.py:L198-L298",
    "proofExample": "Ví dụ: `Xochimilco #1 Mean Price (3.848 MXN) nhưng tụt xuống #11 Mean PPG (521,29 MXN) / #10 Median PPG (376,59 MXN); Miguel Hidalgo #1 Median PPG (706,12 MXN).`. Sử dụng tại: Job thứ 3 trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_ppg_neighbourhood` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_ppg_neighbourhood` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu không chia chuẩn `geo_aspect = 1 / cos(radians(lat))`, bản đồ CDMX (vĩ độ ~19.4°N) sẽ bị dẹt theo chiều ngang/dọc."
      }
    ],
    "commonMistakes": [
      "Nếu không chia chuẩn `geo_aspect = 1 / cos(radians(lat))`, bản đồ CDMX (vĩ độ ~19.4°N) sẽ bị dẹt theo chiều ngang/dọc."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L198-L298",
      "code": "def plot_ppg_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, geo_path: Path, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    features = _load_geojson(geo_path)\n    final = snap.iloc[-1]\n    dt, t = str(final[\"snapshot\"]), str(final[\"label\"])\n    price_col, med_price_col = f\"mean_price_{cur.lower()}_{t}\", f\"median_price_{cur.lower()}_{t}\"\n    ppg_col, med_ppg_col = f\"mean_ppg_{t}\", f\"median_ppg_{t}\"\n    vp_col, vg_col, rp_col = f\"valid_price_{t}\", f\"valid_ppg_{t}\", f\"rank_price_{t}\"\n\n    nb_s = nb.copy()\n    for c in (price_col, med_price_col, ppg_col, med_ppg_col, vp_col, vg_col, rp_col, \"total_listings\"):\n        if c not in nb_s.columns:\n            raise ValueError(f\"[VIZ] kpi_by_neighbourhood.csv thiếu cột: {c}\")\n        nb_s[c] = pd.to_numeric(nb_s[c], errors=\"coerce\")\n    nb_s = nb_s.sort_values([rp_col, \"neighbourhood_cleansed\"], ascending=[True, True], na_position=\"last\").reset_index(drop=True)"
    }
  },
  {
    "id": "vc-078",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_riqr_neighbourhood`.",
    "question": "Đọc hiểu hàm `plot_riqr_neighbourhood()` trong `src/viz.py` (`L301–L349`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao trên biểu đồ `kpi_riqr_neighbourhood.png`, Xochimilco đứng cuối bảng với thanh cam rIQR(Price) dài nhất nhưng thanh xanh rIQR(PPG) lại ngắn?",
    "quickAnswer": "Vẽ 2 biểu đồ cột ngang song song so sánh rIQR(Price) và rIQR(PPG) của 15 quận có mẫu, kèm đường đứt nét tham chiếu toàn thị trường. Cụ thể: Do 5 căn ở Xochimilco chênh nhau rất mạnh về sức chứa (phòng nhỏ vs nhà vườn 12–14 khách); khi chia giá cho sức chứa thì giá mỗi người trở nên đồng đều hơn hẳn.",
    "explanation": "**Chữ ký:** `def plot_riqr_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Sắp xếp 15 quận giảm dần theo total_listings (từ Cuauhtémoc 525 xuống Milpa Alta 1). -> Vẽ rIQR(Price) (trái, cam) và rIQR(PPG) (phải, xanh teal) chung trục X [0, xmax]. -> Gắn đường đứt nét toàn thị trường và ghi chú trên nhãn: `rIQR (Med M)`..\n**Input:** nb, snap, city, out_dir, cur=\"MXN\" -> **Output:** Tuple (Path, plt.Figure) -> figures/kpi_riqr_neighbourhood.png..\n**Giải đáp sâu:** Do 5 căn ở Xochimilco chênh nhau rất mạnh về sức chứa (phòng nhỏ vs nhà vườn 12–14 khách); khi chia giá cho sức chứa thì giá mỗi người trở nên đồng đều hơn hẳn.",
    "projectLink": "src/viz.py:L301-L349",
    "codeLocation": "src/viz.py:L301-L349",
    "proofExample": "Ví dụ: `Tlalpan: rIQR(Price)=1.395, rIQR(PPG)=1.100; Xochimilco (n=5): rIQR(Price)=2.264 -> rIQR(PPG)=0.421.`. Sử dụng tại: Job thứ 4 trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_riqr_neighbourhood` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_riqr_neighbourhood` nếu dữ liệu đầu vào bất thường?",
        "a": "Phải sắp theo `total_listings` chứ không sắp theo rIQR để người xem thấy ngay quận nào có cỡ mẫu đáng tin cậy (trên) vs tham khảo n < 5 (dưới cùng)."
      }
    ],
    "commonMistakes": [
      "Phải sắp theo `total_listings` chứ không sắp theo rIQR để người xem thấy ngay quận nào có cỡ mẫu đáng tin cậy (trên) vs tham khảo n < 5 (dưới cùng)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L301-L349",
      "code": "def plot_riqr_neighbourhood(nb: pd.DataFrame, snap: pd.DataFrame, city: str, out_dir: Path, cur: str = \"MXN\") -> tuple[Path, plt.Figure]:\n    final = snap.iloc[-1]\n    dt, t = str(final[\"snapshot\"]), str(final[\"label\"])\n    riqr_p_col, med_p_col, vp_col = f\"riqr_price_{t}\", f\"median_price_{cur.lower()}_{t}\", f\"valid_price_{t}\"\n    riqr_g_col, med_g_col, vg_col = f\"riqr_ppg_{t}\", f\"median_ppg_{t}\", f\"valid_ppg_{t}\"\n\n    nb_s = nb.copy()\n    for c in (riqr_p_col, med_p_col, vp_col, riqr_g_col, med_g_col, vg_col, \"total_listings\"):\n        if c not in nb_s.columns:\n            raise ValueError(f\"[VIZ] kpi_by_neighbourhood.csv thiếu cột: {c}\")\n        nb_s[c] = pd.to_numeric(nb_s[c], errors=\"coerce\")\n    nb_s = nb_s.sort_values([\"total_listings\", vp_col, \"neighbourhood_cleansed\"], ascending=[False, False, True], na_position=\"last\").reset_index(drop=True)\n\n    y = np.arange(len(nb_s))"
    }
  },
  {
    "id": "vc-079",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_review_ghost`.",
    "question": "Đọc hiểu hàm `plot_review_ghost()` trong `src/viz.py` (`L352–L377`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao Review Velocity chỉ vẽ 3 cột Q1, Q2, Q3 trong khi Ghost Rate vẽ đủ 4 cột t1, t2, t3, t4?",
    "quickAnswer": "Vẽ 2 Heatmap ghép cặp (kpi_review_ghost.png): Trái là Review Velocity (Q1–Q3); Phải là Ghost Rate % (t1–t4) kèm chú thích phân số (ghost_count/ghost_n). Cụ thể: Vì RV là vận tốc biến thiên GIỮA 2 mốc (chỉ có 3 khoảng từ 4 mốc), còn Ghost Rate đo tại TỪNG thời điểm snapshot (nhưng dùng logic riêng cho t1).",
    "explanation": "**Chữ ký:** `def plot_review_ghost(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path) -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Chuẩn hóa ngày header qua pd.Timestamp; trích ma trận RV (scale=1) và Ghost Rate (scale=100%). -> Gọi _heatmap() cho cả 2 trục với bảng counts/nums để in đúng cỡ mẫu trong từng ô. -> Đọc và hiển thị tóm tắt RV toàn mẫu ở caption nguồn..\n**Input:** area, snap, city, area_col, out_dir -> **Output:** Tuple (Path, plt.Figure) -> figures/kpi_review_ghost.png..\n**Giải đáp sâu:** Vì RV là vận tốc biến thiên GIỮA 2 mốc (chỉ có 3 khoảng từ 4 mốc), còn Ghost Rate đo tại TỪNG thời điểm snapshot (nhưng dùng logic riêng cho t1).",
    "projectLink": "src/viz.py:L352-L377",
    "codeLocation": "src/viz.py:L352-L377",
    "proofExample": "Ví dụ: `A04 dẫn đầu RV cả 3 quý (3.97 -> 3.01 -> 3.25); A06 cao nhất Ghost Rate t4 (2.31%, 3/130).`. Sử dụng tại: Job thứ 5 trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_review_ghost` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_review_ghost` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu không truyền `nums=gh_c`, người xem chỉ thấy % (vd 0.77%) mà không biết đó chỉ là 1/130 căn."
      }
    ],
    "commonMistakes": [
      "Nếu không truyền `nums=gh_c`, người xem chỉ thấy % (vd 0.77%) mà không biết đó chỉ là 1/130 căn."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L352-L377",
      "code": "def plot_review_ghost(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path) -> tuple[Path, plt.Figure]:\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    ts, dates = snap[\"label\"].astype(str).tolist(), snap[\"snapshot\"].astype(str).tolist()\n    rv_h = [f\"Q{i} ({ts[i-1]}→{ts[i]})\\n{pd.Timestamp(dates[i-1]):%d/%m}–{pd.Timestamp(dates[i]):%d/%m/%y}\" for i in range(1, len(ts))]\n    gh_h = [f\"{t}\\n{pd.Timestamp(d):%d/%m/%Y}\" for t, d in zip(ts, dates)]\n\n    rv_m = _mat(area_s, area_col, [f\"review_velocity_q{i}_mean\" for i in range(1, len(ts))], rv_h)\n    rv_n = _mat(area_s, area_col, [f\"review_velocity_q{i}_n\" for i in range(1, len(ts))], rv_h)\n    gh_m = _mat(area_s, area_col, [f\"ghost_rate_{t}\" for t in ts], gh_h, scale=100.0)\n    gh_c = _mat(area_s, area_col, [f\"ghost_{t}_count\" for t in ts], gh_h)\n    gh_n = _mat(area_s, area_col, [f\"ghost_{t}_n\" for t in ts], gh_h)\n\n    rv_vals = rv_m.to_numpy(dtype=float)\n    rv_vmax = max(1.0, float(np.ceil(np.nanmax(rv_vals)))) if np.isfinite(rv_vals).any() else 1.0"
    }
  },
  {
    "id": "vc-080",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_occupancy_gap`.",
    "question": "Đọc hiểu hàm `plot_occupancy_gap()` trong `src/viz.py` (`L380–L400`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Urgency Gap dương ở 100% ô trên heatmap chứng minh điều gì và giới hạn của nó là gì?",
    "quickAnswer": "Vẽ bộ 3 Heatmap (kpi_occupancy_gap.png): Occ30, Occ31–90 (thang 0–100%) và Urgency Gap = Occ30 − Occ31–90 (bảng màu phân kỳ RdBu_r cân đối quanh 0.0 pp). Cụ thể: Chứng minh lịch gần (1–30 ngày) luôn ít trống hơn hẳn lịch xa (31–90 ngày) do xu hướng đặt gần ngày và chủ nhà khóa lịch gần — tuy nhiên availability không phân biệt đặt thật và tự khóa.",
    "explanation": "**Chữ ký:** `def plot_occupancy_gap(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, exclude_ghost: bool = True) -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Nhân các cột occ và gap với 100.0 sang đơn vị % / pp. -> Tính giới hạn đối xứng `[-limit, +limit]` quanh center=0.0 cho Urgency Gap. -> Vẽ 3 heatmap nối tiếp qua _heatmap(), ghi chú rõ exclude_ghost ở caption..\n**Input:** area, snap, city, area_col, out_dir, exclude_ghost=True -> **Output:** Tuple (Path, plt.Figure) -> figures/kpi_occupancy_gap.png..\n**Giải đáp sâu:** Chứng minh lịch gần (1–30 ngày) luôn ít trống hơn hẳn lịch xa (31–90 ngày) do xu hướng đặt gần ngày và chủ nhà khóa lịch gần — tuy nhiên availability không phân biệt đặt thật và tự khóa.",
    "projectLink": "src/viz.py:L380-L400",
    "codeLocation": "src/viz.py:L380-L400",
    "proofExample": "Ví dụ: `t3 (Semana Santa) đỉnh Urgency Gap (+21.38 pp); A03 tại t4 tụt còn Occ30 = 34.6%.`. Sử dụng tại: Job thứ 6 trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_occupancy_gap` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_occupancy_gap` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu dùng colormap tuần tự (như Blues) cho Urgency Gap có thể chứa số âm và dương, biểu đồ sẽ không phân biệt trực quan hai chiều xung quanh 0."
      }
    ],
    "commonMistakes": [
      "Nếu dùng colormap tuần tự (như Blues) cho Urgency Gap có thể chứa số âm và dương, biểu đồ sẽ không phân biệt trực quan hai chiều xung quanh 0."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L380-L400",
      "code": "def plot_occupancy_gap(area: pd.DataFrame, snap: pd.DataFrame, city: str, area_col: str, out_dir: Path, exclude_ghost: bool = True) -> tuple[Path, plt.Figure]:\n    area_s = area.sort_values(area_col).reset_index(drop=True)\n    ts, dates = snap[\"label\"].astype(str).tolist(), snap[\"snapshot\"].astype(str).tolist()\n    headers = [f\"{t}\\n{pd.Timestamp(d):%d/%m/%Y}\" for t, d in zip(ts, dates)]\n    occ_n = _mat(area_s, area_col, [f\"occ_{t}_n\" for t in ts], headers)\n    occ30 = _mat(area_s, area_col, [f\"occ_1-30_{t}_mean\" for t in ts], headers, 100.0)\n    occ60 = _mat(area_s, area_col, [f\"occ_31-90_{t}_mean\" for t in ts], headers, 100.0)\n    gap = _mat(area_s, area_col, [f\"urgency_gap_{t}_mean\" for t in ts], headers, 100.0)\n    gap_vals = np.abs(gap.to_numpy(dtype=float))\n    limit = max(5.0, float(np.ceil(np.nanmax(gap_vals) / 5.0) * 5.0)) if np.isfinite(gap_vals).any() else 5.0\n\n    fig, axes = plt.subplots(1, 3, figsize=(18.5, max(6.0, 0.65 * len(area_s) + 2.5)), sharey=True)\n    _heatmap(axes[0], occ30, \"Occ30: Ngày 1–30 không khả dụng\", \"Tỷ lệ không khả dụng (%)\", \"Blues\", \".1f\", vmax=100.0, counts=occ_n)\n    _heatmap(axes[1], occ60, \"Occ31–90: Ngày 31–90 không khả dụng\", \"Tỷ lệ không khả dụng (%)\", \"Blues\", \".1f\", vmax=100.0, counts=occ_n)"
    }
  },
  {
    "id": "vc-081",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_llm_insights`.",
    "question": "Đọc hiểu hàm `plot_llm_insights()` trong `src/viz.py` (`L403–L432`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Cột thứ 3 bên phải (Cỡ mẫu review LLM) đóng vai trò gì trên `llm_insights.png`?",
    "quickAnswer": "Vẽ 2 Heatmap so sánh trực tiếp tỷ lệ thuần Negative vs Có điểm trừ (Negative+Mixed) trên 7 khía cạnh cho 12 quận có review LLM, kèm cột ngang cỡ mẫu ở bên phải. Cụ thể: Giúp người đọc lập tức phân biệt tín hiệu đáng tin (Cuauhtémoc n=749, Miguel Hidalgo n=150) với nhiễu mẫu nhỏ (Tlalpan n=4, Magdalena Contreras n=1).",
    "explanation": "**Chữ ký:** `def plot_llm_insights(nb: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Lọc bỏ 3 quận có llm_review_count == 0 (Iztapalapa, Milpa Alta, Xochimilco). -> Tính vmax chung trên các quận có n >= 5 để không bị quận n=1–4 (33%–100%) làm nhạt hết bảng màu chính. -> Vẽ 2 heatmap (Reds) chung thang vmax cạnh biểu đồ cột ngang cỡ mẫu (1..749)..\n**Input:** nb, cfg, city, out_dir -> **Output:** Tuple (Path, plt.Figure) -> figures/llm_insights.png..\n**Giải đáp sâu:** Giúp người đọc lập tức phân biệt tín hiệu đáng tin (Cuauhtémoc n=749, Miguel Hidalgo n=150) với nhiễu mẫu nhỏ (Tlalpan n=4, Magdalena Contreras n=1).",
    "projectLink": "src/viz.py:L403-L432",
    "codeLocation": "src/viz.py:L403-L432",
    "proofExample": "Ví dụ: `Cuauhtémoc (n=749): Amenities từ 1.9% (Neg) -> 14.8% (Neg+Mix); Noise từ 4.0% -> 8.1%.`. Sử dụng tại: Job thứ 7 trong main() của src/viz.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_llm_insights` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_llm_insights` nếu dữ liệu đầu vào bất thường?",
        "a": "Vì vmax khóa theo các quận n >= 5, những ô 33.3% ở quận n=3 bị bão hòa màu đỏ đậm nhưng vẫn giữ giá trị số chính xác trên ô để không che giấu."
      }
    ],
    "commonMistakes": [
      "Vì vmax khóa theo các quận n >= 5, những ô 33.3% ở quận n=3 bị bão hòa màu đỏ đậm nhưng vẫn giữ giá trị số chính xác trên ô để không che giấu."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L403-L432",
      "code": "def plot_llm_insights(nb: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:\n    nb_llm = nb.loc[pd.to_numeric(nb[\"llm_review_count\"], errors=\"coerce\").fillna(0) > 0].reset_index(drop=True)\n    if nb_llm.empty:\n        raise ValueError(\"[VIZ] Không có quận nào có llm_review_count > 0.\")\n    aspects = [str(a).strip() for a in cfg.get(\"llm\", {}).get(\"aspects\", DEFAULT_ASPECTS) if str(a).strip()] or DEFAULT_ASPECTS\n    counts = pd.to_numeric(nb_llm[\"llm_review_count\"], errors=\"coerce\").fillna(0).astype(int)\n    rates_neg = _mat(nb_llm, \"neighbourhood_cleansed\", [f\"complaint_{a}\" for a in aspects], aspects, 100.0)\n    rates_mix = _mat(nb_llm, \"neighbourhood_cleansed\", [f\"complaint_mixed_{a}\" for a in aspects], aspects, 100.0)\n    ref = rates_mix.loc[counts.to_numpy() >= 5] if (counts >= 5).any() else rates_mix\n    r_vals = np.concatenate([rates_neg.to_numpy(dtype=float).ravel(), ref.to_numpy(dtype=float).ravel()])\n    vmax = min(100.0, max(10.0, float(np.ceil(np.nanmax(r_vals) / 5.0) * 5.0))) if np.isfinite(r_vals).any() else 10.0\n\n    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(19.5, max(6.5, 0.45 * len(nb_llm) + 2.6)), sharey=True, gridspec_kw={\"width_ratios\": [1.85, 1.85, 0.9]})\n    _heatmap(ax1, rates_neg, \"Thuần tiêu cực — negative (%)\", \"Tỷ lệ (%)\", \"Reds\", \".1f\", vmax=vmax)"
    }
  },
  {
    "id": "vc-082",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: plot_llm_vs_baseline`.",
    "question": "Đọc hiểu hàm `plot_llm_vs_baseline()` trong `src/viz.py` (`L448–L465`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Tại sao xlim được đặt là (0, 1.24) dù thang điểm F1/Accuracy chỉ tối đa 1.0?",
    "quickAnswer": "Vẽ biểu đồ cột ngang ghép cặp (kpi_llm_vs_baseline.png) đối chiếu 9 chỉ số giữa Gemini 3.5 Flash Lite và Baseline Regex trên 100 mẫu GT kèm độ chênh Δ. Cụ thể: Để chừa khoảng trống bên phải cho chuỗi nhãn dài như `0.991 (+0.469)` nằm ngoài đầu cột không bị chạm khung hình.",
    "explanation": "**Chữ ký:** `def plot_llm_vs_baseline(ev: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:`.\n**Luồng chạy:** Đọc điểm baseline và llm từ DataFrame evaluation_report. -> Vẽ 2 thanh barh so le mỗi hàng (y - h/2 và y + h/2) cho 9 tiêu chí đánh giá. -> Gắn nhãn điểm và chênh lệch (l - b:+.3f) bằng bar_label(); giới hạn xlim=(0, 1.24) tránh cắt chữ..\n**Input:** ev, cfg, city, out_dir -> **Output:** Tuple (Path, plt.Figure) -> figures/llm_vs_baseline.png..\n**Giải đáp sâu:** Để chừa khoảng trống bên phải cho chuỗi nhãn dài như `0.991 (+0.469)` nằm ngoài đầu cột không bị chạm khung hình.",
    "projectLink": "src/viz.py:L448-L465",
    "codeLocation": "src/viz.py:L448-L465",
    "proofExample": "Ví dụ: `Macro F1: LLM 0.991 (+0.469) so với Baseline 0.522.`. Sử dụng tại: Job thứ 8 (chạy khi đã tồn tại reports/evaluation_report.csv) trong main().",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_llm_vs_baseline` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `plot_llm_vs_baseline` nếu dữ liệu đầu vào bất thường?",
        "a": "Nếu chưa chạy evaluate.py, main() in [VIZ WARN] và chỉ vẽ 7 biểu đồ KPI trước đó."
      }
    ],
    "commonMistakes": [
      "Nếu chưa chạy evaluate.py, main() in [VIZ WARN] và chỉ vẽ 7 biểu đồ KPI trước đó."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L448-L465",
      "code": "def plot_llm_vs_baseline(ev: pd.DataFrame, cfg: dict, city: str, out_dir: Path) -> tuple[Path, plt.Figure]:\n    y, h = np.arange(len(ev)), 0.36\n    base = pd.to_numeric(ev[\"baseline\"], errors=\"coerce\")\n    llm = pd.to_numeric(ev[\"llm\"], errors=\"coerce\")\n    model = str((cfg.get(\"llm\") or {}).get(\"model\", \"LLM\"))\n\n    fig, ax = plt.subplots(figsize=(10.5, max(5.2, 0.55 * len(ev) + 1.8)))\n    b_llm = ax.barh(y - h / 2, llm.fillna(0.0), height=h, color=\"#0F766E\", label=f\"LLM ({model})\")\n    b_base = ax.barh(y + h / 2, base.fillna(0.0), height=h, color=\"#94A3B8\", label=\"Baseline (Regex)\")\n    ax.bar_label(b_llm, labels=[f\"{l:.3f} ({l - b:+.3f})\" if pd.notna(l) and pd.notna(b) else f\"{l:.3f}\" if pd.notna(l) else \"NA\" for l, b in zip(llm, base)], padding=4, fontsize=8.5, fontweight=\"bold\", color=\"#0F172A\")\n    ax.bar_label(b_base, labels=[f\"{v:.3f}\" if pd.notna(v) else \"NA\" for v in base], padding=4, fontsize=8.5, color=\"#475569\")\n    ax.set_yticks(y, labels=[EVAL_LABELS.get(str(k), str(k)) for k in ev[\"chi_so\"]], fontsize=9.5)\n    ax.invert_yaxis()\n    ax.set(xlim=(0, 1.24), xticks=np.linspace(0, 1, 6), xlabel=\"Điểm số (thang 0–1)\")"
    }
  },
  {
    "id": "vc-083",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "code",
    "topics": [
      "Visualization"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu chữ ký, luồng chạy, đầu vào/ra và bẫy lỗi của `src/viz.py :: main`.",
    "question": "Đọc hiểu hàm `main()` trong `src/viz.py` (`L468–L511`): Nêu mục đích chính, luồng thực thi từng bước và giải thích điểm kỹ thuật then chốt: Làm sao kiểm chứng 8 hình trong figures/ hoàn toàn khớp với CSV?",
    "quickAnswer": "Điểm vào CLI đọc 4 bảng kpi_by_*.csv, GeoJSON và evaluation_report.csv rồi thực thi tuần tự 8 hàm vẽ lưu ảnh PNG vào figures/. Cụ thể: Vì toàn bộ 8 hàm trong `src/viz.py` đọc trực tiếp giá trị từ 4 tệp `kpi_by_*.csv` và `evaluation_report.csv` mà không tự tính hay sửa đổi số liệu.",
    "explanation": "**Chữ ký:** `def main() -> None:`.\n**Luồng chạy:** Parse --config và --show; chuyển sang TkAgg backend nếu người dùng muốn bật cửa sổ xem ảnh (--show). -> Đọc đủ 4 bảng KPI qua _read_kpi() (fail-fast nếu thiếu cột). -> Lần lượt chạy danh sách 7 plot_jobs (thêm plot_llm_vs_baseline nếu có evaluation_report.csv), đóng figure sau khi lưu nếu không bật --show..\n**Input:** CLI args (--config, --show) -> **Output:** Tạo 8 tệp PNG trong figures/..\n**Giải đáp sâu:** Vì toàn bộ 8 hàm trong `src/viz.py` đọc trực tiếp giá trị từ 4 tệp `kpi_by_*.csv` và `evaluation_report.csv` mà không tự tính hay sửa đổi số liệu.",
    "projectLink": "src/viz.py:L468-L511",
    "codeLocation": "src/viz.py:L468-L511",
    "proofExample": "Ví dụ: `python src/viz.py --config configs/mexico-city.yaml`. Sử dụng tại: Chặng 8 (cuối cùng) của STEPS trong run_pipeline.py.",
    "followUpQuestions": [
      "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, lỗi tiềm ẩn nào dễ xảy ra với `main` nếu dữ liệu đầu vào bất thường?",
        "a": "Quên `plt.close(fig)` trong vòng lặp hàng loạt có thể gây rò rỉ bộ nhớ Matplotlib nếu mở rộng nhiều biểu đồ hơn."
      }
    ],
    "commonMistakes": [
      "Quên `plt.close(fig)` trong vòng lặp hàng loạt có thể gây rò rỉ bộ nhớ Matplotlib nếu mở rộng nhiều biểu đồ hơn."
    ],
    "relatedFiles": [
      "src/viz.py"
    ],
    "codeBlock": {
      "file": "src/viz.py",
      "lines": "L468-L511",
      "code": "def main() -> None:\n    ap = argparse.ArgumentParser(description=\"Visualize precomputed Inside Airbnb KPIs.\")\n    ap.add_argument(\"--config\", default=None)\n    ap.add_argument(\"--show\", action=\"store_true\")\n    args = ap.parse_args()\n    if args.show and plt.get_backend().lower() == \"agg\":\n        plt.switch_backend(\"TkAgg\")\n\n    cfg_path = Path(args.config or os.environ.get(\"PIPELINE_CONFIG\") or ROOT / \"configs/mexico-city.yaml\").expanduser()\n    cfg = yaml.safe_load((cfg_path if cfg_path.is_absolute() else ROOT / cfg_path).read_text(encoding=\"utf-8\"))\n    city = str(cfg.get(\"city\", \"Airbnb\")).replace(\"-\", \" \").title()\n    cur = str(cfg.get(\"currency\", \"MXN\")).strip().upper()\n    area_col = str(cfg.get(\"kpi\", {}).get(\"area_col\") or cfg.get(\"qa\", {}).get(\"area_col\", \"analysis_area\"))\n    exclude_ghost = bool(cfg.get(\"kpi\", {}).get(\"exclude_ghost\", True))"
    }
  },
  {
    "id": "vc-084",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "code",
    "topics": [
      "KPI",
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu hằng hợp đồng dữ liệu REQUIRED_QA_COLS và COMPLAINT_SCORE_MAP trong src/kpi.py.",
    "question": "Trong `src/kpi.py` (`L18–L45`), hãy giải thích vai trò của `REQUIRED_QA_COLS` (12 cột) và sự khác nhau giữa hai từ điển `COMPLAINT_SCORE_MAP` vs `COMPLAINT_MIXED_SCORE_MAP`.",
    "quickAnswer": "`REQUIRED_QA_COLS` là hợp đồng bắt buộc giữa `qa.py` và `kpi.py`; `COMPLAINT_SCORE_MAP` chỉ tính `negative=1.0` còn `COMPLAINT_MIXED_SCORE_MAP` tính cả `negative=1.0` lẫn `mixed=1.0` (các nhãn khác `0.0`).",
    "explanation": "Nếu thiếu bất kỳ cột nào trong 12 cột của `REQUIRED_QA_COLS` (cộng `price_mxn`), `_load_snapshots()` dừng ngay bằng `ValueError`. Còn hai bản đồ điểm biến 7 cột nhãn LLM thành cột nhị phân `0/1` để tính tỷ lệ phàn nàn theo quận bằng `.mean()`.",
    "projectLink": "src/kpi.py:L18-L45",
    "codeLocation": "src/kpi.py:L18-L45",
    "proofExample": "Ở Cuauhtémoc (n=749), `COMPLAINT_SCORE_MAP` cho `amenities` = `1.87%` (14/749), `COMPLAINT_MIXED_SCORE_MAP` cho `14.82%` (111/749).",
    "followUpQuestions": [
      "Nếu đổi `not_mentioned` thành `np.nan` trong `COMPLAINT_SCORE_MAP`, ý nghĩa của `complaint_amenities` thay đổi thành gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu đổi `not_mentioned` thành `np.nan` trong `COMPLAINT_SCORE_MAP`, ý nghĩa của `complaint_amenities` thay đổi thành gì?",
        "a": "Biến đổi từ \"tỷ lệ phàn nàn trên tổng review của quận\" thành \"tỷ lệ phàn nàn CHỈ trên những review có nhắc tới tiện nghi\"."
      }
    ],
    "commonMistakes": [
      "Tưởng `qa_price_outlier` cũng nằm trong `REQUIRED_QA_COLS` hoặc `not_mentioned` được gán `NaN` làm loại khỏi mẫu số quận."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ],
    "codeBlock": {
      "file": "src/kpi.py",
      "lines": "L34-L45",
      "code": "COMPLAINT_SCORE_MAP = {\"negative\": 1.0, \"positive\": 0.0, \"mixed\": 0.0, \"not_mentioned\": 0.0}\nCOMPLAINT_MIXED_SCORE_MAP = {\"negative\": 1.0, \"mixed\": 1.0, \"positive\": 0.0, \"not_mentioned\": 0.0}"
    }
  },
  {
    "id": "vc-085",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "code",
    "topics": [
      "Architecture",
      "QA",
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Đọc hiểu toàn bộ các khối cấu hình trong `configs/mexico-city.yaml`.",
    "question": "Trình bày đầy đủ 5 khối tham số trong `configs/mexico-city.yaml` và chỉ rõ từng khối đang điều khiển script Python nào.",
    "quickAnswer": "(1) Thông tin chung (`city`, `data_root`, `currency`, `snapshots`) -> cả 8 script; (2) `assignment` -> `filter_data_from_sheet.py`; (3) `qa` (`dedupe_keys`, `price_outlier_quantiles`) -> `qa.py`; (4) `kpi` (`area_col`, `stale_review_days=90`, `exclude_ghost=true`) -> `kpi.py` & `viz.py`; (5) `llm` (`model=gemini-3.5-flash-lite`, `batch_size=5`, 7 `aspects`, `cache`, `output_csv`) -> `llm.py`, `baseline.py`, `evaluate.py`, `kpi.py`, `viz.py`.",
    "explanation": "Cấu trúc YAML tách hoàn toàn dữ liệu đặc thù CDMX khỏi mã nguồn Python tổng quát.",
    "projectLink": "configs/mexico-city.yaml:L1-L32",
    "codeLocation": "configs/mexico-city.yaml:L1-L32",
    "proofExample": "Thay `stale_review_days: 90` thành `180` hay sửa `aspects` trong YAML sẽ tác động đồng bộ mà không sửa 1 dòng `.py`.",
    "followUpQuestions": [
      "Nếu thêm khía cạnh `\"checkin\"` vào `llm.aspects` trong YAML, những tệp Python nào tự động thích ứng không cần sửa code?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thêm khía cạnh `\"checkin\"` vào `llm.aspects` trong YAML, những tệp Python nào tự động thích ứng không cần sửa code?",
        "a": "`src/llm.py` (`build_schemas`), `src/baseline.py`, `src/evaluate.py`, `src/kpi.py` và `src/viz.py` đều đọc động từ `cfg[\"llm\"][\"aspects\"]`!"
      }
    ],
    "commonMistakes": [
      "Nhầm `llm.model` là `gemini-2.5-flash` (ví dụ trong docs) thay vì `gemini-3.5-flash-lite` trong YAML thực tế."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  }
];

import type { CodeFunctionDoc } from '../../types';

export const CODEBASE_FUNCTIONS_PART_1: CodeFunctionDoc[] = [
  {
    "id": "run-pipeline-run-step",
    "file": "run_pipeline.py",
    "name": "run_step",
    "kind": "function",
    "lineStart": 21,
    "lineEnd": 33,
    "signature": "def run_step(name, script_path, config_path, env, skip_llm=False):",
    "purpose": "Thực thi một mô-đun Python trong danh sách STEPS như một tiến trình con đồng bộ kèm tham số --config và cờ --skip-llm (riêng cho src/llm.py).",
    "flow": [
      "In tiêu đề bước [STEP] <name> với flush=True để nhật ký hiển thị ngay theo thời gian thực.",
      "Kiểm tra sự tồn tại (is_file()) và dung lượng khác 0 (st_size > 0) của script nguồn.",
      "Tạo danh sách lệnh cmd bắt đầu bằng sys.executable (giữ đúng môi trường .venv hiện hành).",
      "Chỉ gắn thêm \"--skip-llm\" nếu script_path == \"src/llm.py\" và skip_llm=True.",
      "Gọi subprocess.run(cmd, cwd=PROJECT_ROOT, env=env, check=True) để chờ bước chạy xong hoàn toàn."
    ],
    "input": "name (str), script_path (str), config_path (Path), env (dict), skip_llm (bool)",
    "output": "Không trả về giá trị (None); side-effect thực thi script và có thể ném FileNotFoundError, RuntimeError hoặc CalledProcessError.",
    "libraries": [
      "argparse",
      "os",
      "subprocess",
      "sys",
      "pathlib (Path)",
      "Gọi hàm: FileNotFoundError, RuntimeError, append, is_file, print, run, stat, str"
    ],
    "example": "run_step(\"Quality Assurance\", \"src/qa.py\", Path(\"configs/mexico-city.yaml\"), env, False) -> chạy python src/qa.py --config ...",
    "usage": "Được gọi trong vòng lặp tuần tự STEPS tại main() của run_pipeline.py.",
    "potentialBugs": [
      "Nếu đổi subprocess.run sang subprocess.Popen không chờ wait(), bước sau sẽ đọc file khi bước trước chưa ghi xong.",
      "Nếu truyền \"--skip-llm\" cho các script khác (như qa.py), argparse của script đó sẽ báo lỗi unrecognized arguments."
    ],
    "viva": [
      {
        "q": "Tại sao dùng sys.executable thay vì gọi chuỗi \"python\"?",
        "a": "Vì sys.executable trỏ thẳng vào file thực thi Python của .venv đang kích hoạt, tránh gọi nhầm Python hệ thống không có đủ thư viện."
      },
      {
        "q": "Tham số check=True trong subprocess.run() có ý nghĩa gì?",
        "a": "Nếu tiến trình con thoát với returncode != 0, Python lập tức ném CalledProcessError để main() dừng toàn bộ pipeline."
      }
    ],
    "code": "def run_step(name, script_path, config_path, env, skip_llm=False):\n    print(f\"\\n{'=' * 50}\\n[STEP] {name}\\n{'=' * 50}\", flush=True)\n    script = PROJECT_ROOT / script_path\n    if not script.is_file():\n        raise FileNotFoundError(f\"Khong tim thay file: {script}\")\n    if script.stat().st_size == 0:\n        raise RuntimeError(f\"Step script is empty (not implemented): {script}\")\n\n    cmd = [sys.executable, str(script), \"--config\", str(config_path)]\n    if script_path == \"src/llm.py\" and skip_llm:\n        cmd.append(\"--skip-llm\")\n\n    subprocess.run(cmd, cwd=PROJECT_ROOT, env=env, check=True)"
  },
  {
    "id": "run-pipeline-main",
    "file": "run_pipeline.py",
    "name": "main",
    "kind": "function",
    "lineStart": 36,
    "lineEnd": 60,
    "signature": "def main():",
    "purpose": "Điểm khởi chạy CLI chính điều phối tuần tự toàn bộ 8 script xử lý dữ liệu Inside Airbnb qua một lệnh duy nhất.",
    "flow": [
      "Phân tích tham số dòng lệnh --config (mặc định configs/mexico-city.yaml) và --skip-llm.",
      "Chuẩn hóa đường dẫn config_path về tuyệt đối và kiểm tra file cấu hình có tồn tại.",
      "Thiết lập env với PIPELINE_CONFIG và PYTHONIOENCODING=\"utf-8\" cho tiến trình con.",
      "Lặp qua 8 phần tử STEPS theo đúng thứ tự Download -> Filter -> QA -> LLM -> Baseline -> Evaluate -> KPI -> Viz.",
      "Bắt CalledProcessError / FileNotFoundError / RuntimeError -> in [FATAL] và thoát với sys.exit(1)."
    ],
    "input": "CLI args (--config, --skip-llm)",
    "output": "Mã thoát 0 khi 8/8 bước thành công, hoặc sys.exit(1) ngay tại bước đầu tiên gặp lỗi.",
    "libraries": [
      "argparse",
      "os",
      "subprocess",
      "sys",
      "pathlib (Path)",
      "Gọi hàm: ArgumentParser, FileNotFoundError, Path, add_argument, exit, is_absolute, is_file, parse_args, print, resolve, run_step, str"
    ],
    "example": "python run_pipeline.py --config configs/mexico-city.yaml --skip-llm -> chạy lại trọn bộ bằng cache LLM.",
    "usage": "Lệnh gốc để sinh viên chạy pipeline và giảng viên chấm điểm tái lập (Rubric 1-command run).",
    "potentialBugs": [
      "Quên set PYTHONIOENCODING=\"utf-8\" sẽ làm các bước sau văng UnicodeEncodeError khi in tiếng Việt trên Windows cp1252.",
      "Không dừng ở sys.exit(1) khi một bước lỗi sẽ khiến bước KPI/Viz dùng nhầm dữ liệu cũ còn sót từ lần chạy trước."
    ],
    "viva": [
      {
        "q": "Tại sao bước Baseline đứng sau LLM trong STEPS dù hai mô hình chạy độc lập?",
        "a": "Tất cả cùng đọc reviews_llm.csv nên đổi vị trí Baseline trước hay sau LLM đều ra cùng kết quả, miễn cả hai hoàn tất trước bước Evaluate."
      },
      {
        "q": "Nếu bước QA ở giữa lỗi nhưng vẫn tiếp tục Evaluate/KPI thì hậu quả là gì?",
        "a": "Bước KPI sẽ đọc listings.csv chưa có cột qa_*/clean từ lần chạy cũ hoặc thiếu cột gây kết quả sai ngầm."
      }
    ],
    "code": "def main():\n    parser = argparse.ArgumentParser(description=\"Run the full Inside Airbnb pipeline\")\n    parser.add_argument(\"--config\", default=\"configs/mexico-city.yaml\", help=\"Path to config file\")\n    parser.add_argument(\"--skip-llm\", action=\"store_true\", help=\"Skip Gemini API calls and use cache\")\n    args = parser.parse_args()\n\n    cfg = Path(args.config)\n    config_path = (cfg if cfg.is_absolute() else PROJECT_ROOT / cfg).resolve()\n    if not config_path.is_file():\n        raise FileNotFoundError(f\"Khong tim thay config: {config_path}\")\n\n    env = {**os.environ, \"PIPELINE_CONFIG\": str(config_path), \"PYTHONIOENCODING\": \"utf-8\"}\n    print(f\"Starting pipeline: {config_path}\", flush=True)\n\n    for name, script in STEPS:\n        try:\n            run_step(name, script, config_path, env, skip_llm=args.skip_llm)\n        except subprocess.CalledProcessError as error:\n            print(f\"[FATAL] Step '{name}' failed (exit code: {error.returncode})\")\n            sys.exit(1)\n        except (FileNotFoundError, RuntimeError) as error:\n            print(f\"[FATAL] {error}\")\n            sys.exit(1)\n\n    print(\"\\n[SUCCESS] Pipeline completed successfully!\")"
  },
  {
    "id": "baseline-clean-text",
    "file": "src/baseline.py",
    "name": "clean_text",
    "kind": "function",
    "lineStart": 61,
    "lineEnd": 71,
    "signature": "def clean_text(text: Any) -> str:",
    "purpose": "Giải mã HTML entities, chuyển thẻ <br/> thành ký tự xuống dòng \\n để giữ ranh giới mệnh đề, xóa HTML tags còn lại, chuẩn hóa Unicode NFKC và loại bỏ URL.",
    "flow": [
      "Trả về \"\" nếu None hoặc pd.isna(text).",
      "Gọi html.unescape(str(text)) giải mã ký tự như &amp;, &#39;.",
      "Thay <br> / <br/> thành \"\\n\", xóa các thẻ HTML khác bằng khoảng trắng.",
      "Chuẩn hóa NFKC (đưa các ký tự toàn chiều rộng / dấu ghép về dạng chuẩn), xóa URL http/www và rút gọn khoảng trắng."
    ],
    "input": "text (Any)",
    "output": "str đã làm sạch nhưng còn dấu xuống dòng \\n.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "html",
      "os",
      "re",
      "sys",
      "unicodedata",
      "pathlib (Path)",
      "typing (Any)",
      "pandas",
      "yaml",
      "Gọi hàm: isna, normalize, str, strip, sub, unescape"
    ],
    "example": "clean_text(\"Great!<br/>Check http://a.co &amp; go\") -> \"Great!\\nCheck & go\"",
    "usage": "Bước tiền xử lý đầu tiên bên trong predict_review_regex().",
    "potentialBugs": [
      "Nếu vô tình đổi <br/> thành dấu cách \" \" thay vì \"\\n\", hai câu khen và chê trên 2 dòng khác nhau sẽ bị nối dính làm hỏng CLAUSE_RE."
    ],
    "viva": [
      {
        "q": "Tại sao phải dùng unicodedata.normalize(\"NFKC\", s)?",
        "a": "Để đưa các biến thể ký tự Unicode (ví dụ dấu nháy, chữ có dấu tổ hợp tiếng Tây Ban Nha) về cùng dạng chuẩn giúp Regex khớp đồng nhất."
      }
    ],
    "code": "def clean_text(text: Any) -> str:\n    \"\"\"Chuẩn hóa HTML/Unicode/URL nhưng giữ nguyên ngắt dòng (<br/>, \\\\n) cho tách mệnh đề.\"\"\"\n    if text is None or pd.isna(text):\n        return \"\"\n    s = html.unescape(str(text))\n    s = re.sub(r\"<br\\s*/?>\", \"\\n\", s, flags=re.I)\n    s = re.sub(r\"</?[a-zA-Z][^>]*>\", \" \", s)\n    s = unicodedata.normalize(\"NFKC\", s)\n    s = re.sub(r\"https?://\\S+|www\\.\\S+\", \" \", s)\n    s = re.sub(r\"[ \\t\\r]+\", \" \", s)\n    return re.sub(r\"\\n+\", \"\\n\", s).strip()"
  },
  {
    "id": "baseline-detect-language",
    "file": "src/baseline.py",
    "name": "detect_language",
    "kind": "function",
    "lineStart": 74,
    "lineEnd": 81,
    "signature": "def detect_language(text: str) -> str:",
    "purpose": "Nhận diện nhanh mã ngôn ngữ ISO 639-1 (es, fr, pt, de, vi, mặc định en, không chữ cái -> \"und\") hoàn toàn bằng Regex.",
    "flow": [
      "Nếu chuỗi rỗng hoặc không chứa ký tự chữ cái nào (regex [^\\W\\d_]) -> trả \"und\".",
      "Kiểm tra lần lượt LANG_PATTERNS (es có dấu ¿¡ và từ phổ thông Tây Ban Nha, fr, pt, de, vi).",
      "Nếu không khớp ngôn ngữ ngoài Anh nào -> mặc định trả về \"en\"."
    ],
    "input": "text (str đã qua clean_text)",
    "output": "Mã ngôn ngữ 2 ký tự (es, fr, pt, de, vi, en) hoặc \"und\".",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "html",
      "os",
      "re",
      "sys",
      "unicodedata",
      "pathlib (Path)",
      "typing (Any)",
      "pandas",
      "yaml",
      "Gọi hàm: search, strip"
    ],
    "example": "detect_language(\"¡Muy limpio y tranquilo!\") -> \"es\"",
    "usage": "Được predict_review_regex() gọi để điền cột language cho baseline.",
    "potentialBugs": [
      "Mặc định trả về \"en\" khi không khớp từ điển 5 ngôn ngữ kia, nên có thể đoán nhầm các ngôn ngữ ít gặp (Ý, Nhật...) sang \"en\" (trong mẫu 100 GT đạt 99% vì 999/1000 là tiếng Anh)."
    ],
    "viva": [
      {
        "q": "Regex [^\\W\\d_] nghĩa là gì trong hàm detect_language()?",
        "a": "\\W là ký tự không phải chữ/số/_, nên [^\\W\\d_] (tất cả ký tự chữ trừ số và gạch dưới) dùng để kiểm tra có tồn tại chữ cái thật hay chỉ là emoji/số."
      }
    ],
    "code": "def detect_language(text: str) -> str:\n    \"\"\"Nhận diện nhanh mã ngôn ngữ ISO 639-1 bằng regex (chuỗi không chữ cái -> 'und').\"\"\"\n    if not text.strip() or not re.search(r\"[^\\W\\d_]\", text):\n        return \"und\"\n    for code, pat in LANG_PATTERNS:\n        if pat.search(text):\n            return code\n    return \"en\""
  },
  {
    "id": "baseline-predict-review-regex",
    "file": "src/baseline.py",
    "name": "predict_review_regex",
    "kind": "function",
    "lineStart": 84,
    "lineEnd": 118,
    "signature": "def predict_review_regex(text: Any, aspects: tuple[str, ...] = ASPECTS) -> dict[str, str]:",
    "purpose": "Dự đoán đồng thời language, overall_sentiment và 7 nhãn khía cạnh cho 1 review bằng phương pháp tách mệnh đề & lọc phủ định lành tính.",
    "flow": [
      "Làm sạch text bằng clean_text(); nếu rỗng -> trả về language=\"und\", overall=\"mixed\", các khía cạnh \"not_mentioned\".",
      "Tách raw theo CLAUSE_RE (dấu câu [.!?;], xuống dòng \\n và liên từ đối lập but/however/pero/aunque...).",
      "Với mỗi clause: xóa cụm phủ định lành tính BENIGN_RE (\"no noise\", \"no issues\") -> đếm NEG_RE -> xóa NEG_RE trước khi đếm POS_RE.",
      "Cập nhật cờ [mentioned, has_pos, has_neg] cho từng aspect khớp ASPECT_PATTERNS trên clause đó.",
      "Suy ra overall (\"positive\" nếu total_neg==0; \"negative\" nếu total_pos==0 hoặc total_neg >= max(3, 2*total_pos); còn lại \"mixed\") và quy đổi 7 khía cạnh."
    ],
    "input": "text (Any), aspects (tuple)",
    "output": "dict[str, str] gồm 9 khóa: language, overall_sentiment và 7 khía cạnh.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "html",
      "os",
      "re",
      "sys",
      "unicodedata",
      "pathlib (Path)",
      "typing (Any)",
      "pandas",
      "yaml",
      "Gọi hàm: clean_text, detect_language, findall, get, items, len, max, search, split, sub"
    ],
    "example": "predict_review_regex(\"Great host, but WiFi didn't work\") -> overall=\"mixed\", host=\"positive\", amenities=\"negative\".",
    "usage": "Áp dụng cho từng review của reviews_llm.csv trong main() của src/baseline.py.",
    "potentialBugs": [
      "Mệnh đề \"không chê\" dạng \"no noise issues\" bị BENIGN_RE xóa mất từ khóa chê khiến n_pos=0, n_neg=0 rồi rơi vào nhánh fallback theo overall.",
      "Không hiểu mỉa mai (sarcasm) hoặc góp ý hàm ý không nằm trong từ điển từ khóa."
    ],
    "viva": [
      {
        "q": "Tại sao phải chạy NEG_RE.sub(\" \", cleaned) trước khi đếm POS_RE.findall(...)?",
        "a": "Vì trong \"not clean\", cụm \"not clean\" khớp NEG_RE; nếu không xóa nó đi thì POS_RE sẽ đếm nhầm từ \"clean\" thành +1 tích cực!"
      },
      {
        "q": "Nếu 1 review rỗng hoàn toàn thì overall_sentiment mặc định của baseline.py là gì?",
        "a": "Là \"mixed\" kèm language=\"und\" và toàn bộ khía cạnh \"not_mentioned\", thống nhất với quy ước kiểm tra của evaluate.py."
      }
    ],
    "code": "def predict_review_regex(text: Any, aspects: tuple[str, ...] = ASPECTS) -> dict[str, str]:\n    \"\"\"Dự đoán ngôn ngữ, cảm xúc tổng thể và các khía cạnh cho 1 review bằng regex.\"\"\"\n    raw = clean_text(text)\n    if not raw:\n        return {\"language\": \"und\", \"overall_sentiment\": \"mixed\", **{a: \"not_mentioned\" for a in aspects}}\n\n    total_pos = total_neg = 0\n    aspect_flags: dict[str, list[bool]] = {a: [False, False, False] for a in aspects}\n    for clause in CLAUSE_RE.split(raw):\n        cleaned = BENIGN_RE.sub(\" \", clause)\n        n_neg = len(NEG_RE.findall(cleaned))\n        n_pos = len(POS_RE.findall(NEG_RE.sub(\" \", cleaned)))\n        total_pos += n_pos\n        total_neg += n_neg\n        for asp in aspects:\n            pat = ASPECT_PATTERNS.get(asp)\n            if pat and pat.search(clause):\n                aspect_flags[asp][0] = True\n                aspect_flags[asp][1] |= n_pos > 0\n                aspect_flags[asp][2] |= n_neg > 0\n\n    overall = \"positive\" if total_neg == 0 else \"negative\" if (total_pos == 0 or total_neg >= max(3, 2 * total_pos)) else \"mixed\"\n    out = {\"language\": detect_language(raw), \"overall_sentiment\": overall}\n    for asp, (mentioned, has_pos, has_neg) in aspect_flags.items():\n        if not mentioned:\n            out[asp] = \"not_mentioned\"\n        elif has_pos and has_neg:\n            out[asp] = \"mixed\"\n        elif has_neg:\n            out[asp] = \"negative\"\n        elif has_pos:\n            out[asp] = \"positive\"\n        else:\n            out[asp] = \"negative\" if overall == \"negative\" else \"positive\"\n    return out"
  },
  {
    "id": "baseline-load-config",
    "file": "src/baseline.py",
    "name": "load_config",
    "kind": "function",
    "lineStart": 121,
    "lineEnd": 126,
    "signature": "def load_config(config_path: str | None = None) -> dict[str, Any]:",
    "purpose": "Đọc file cấu hình YAML cho mô-đun Baseline.",
    "flow": [
      "Đọc đường dẫn CLI hoặc PIPELINE_CONFIG hoặc configs/mexico-city.yaml và trả yaml.safe_load()."
    ],
    "input": "config_path (str | None)",
    "output": "dict[str, Any]",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "html",
      "os",
      "re",
      "sys",
      "unicodedata",
      "pathlib (Path)",
      "typing (Any)",
      "pandas",
      "yaml",
      "Gọi hàm: FileNotFoundError, Path, get, is_absolute, is_file, read_text, safe_load"
    ],
    "example": "cfg = load_config(\"configs/mexico-city.yaml\")",
    "usage": "Gọi trong main() của src/baseline.py để lấy snapshots, llm.aspects và đường dẫn đầu ra baseline.",
    "potentialBugs": [
      "Ném FileNotFoundError nếu truyền sai đường dẫn config."
    ],
    "viva": [
      {
        "q": "Baseline đọc danh sách khía cạnh từ đâu?",
        "a": "Đọc từ cấu hình llm.aspects trong YAML (nếu thiếu mới dùng hằng ASPECTS mặc định) để khớp 100% schema với LLM."
      }
    ],
    "code": "def load_config(config_path: str | None = None) -> dict[str, Any]:\n    target = Path(config_path or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\"))\n    path = target if target.is_absolute() else ROOT / target\n    if not path.is_file():\n        raise FileNotFoundError(f\"[Baseline] Không tìm thấy config: {path}\")\n    return yaml.safe_load(path.read_text(encoding=\"utf-8\"))"
  },
  {
    "id": "baseline-load-reviews-llm",
    "file": "src/baseline.py",
    "name": "load_reviews_llm",
    "kind": "function",
    "lineStart": 129,
    "lineEnd": 138,
    "signature": "def load_reviews_llm(cfg: dict[str, Any]) -> pd.DataFrame:",
    "purpose": "Tìm và đọc chính tập 1.000 review trong reviews_llm.csv để chạy đối chứng công bằng trên cùng đầu vào với LLM.",
    "flow": [
      "Duyệt ngược danh sách snapshots, nạp file reviews_llm.csv đầu tiên tìm thấy với dtype=str, strip id và fillna(\"\") cho comments."
    ],
    "input": "cfg (dict)",
    "output": "pd.DataFrame chứa 1.000 review.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "html",
      "os",
      "re",
      "sys",
      "unicodedata",
      "pathlib (Path)",
      "typing (Any)",
      "pandas",
      "yaml",
      "Gọi hàm: FileNotFoundError, fillna, get, is_file, read_csv, reversed, sorted, str, strip"
    ],
    "example": "df = load_reviews_llm(cfg) -> 1.000 dòng.",
    "usage": "Gọi trong main() của src/baseline.py.",
    "potentialBugs": [
      "Giả định reviews_llm.csv đã được tạo bởi Filter; nếu thiếu sẽ báo FileNotFoundError."
    ],
    "viva": [
      {
        "q": "Vì sao Baseline phải đọc đúng reviews_llm.csv thay vì đọc reviews_labeled.csv (100 mẫu)?",
        "a": "Để vừa chấm được trên 100 mẫu giao nhau với ground truth, vừa sinh đủ 1.000 dự đoán song song kiểm tra độ phủ (Coverage) như LLM."
      }
    ],
    "code": "def load_reviews_llm(cfg: dict[str, Any]) -> pd.DataFrame:\n    snaps = sorted((str(s).strip() for s in (cfg.get(\"snapshots\") or [])), key=pd.to_datetime)\n    for snap in reversed(snaps):\n        path = ROOT / \"data\" / \"processed\" / snap / \"reviews_llm.csv\"\n        if path.is_file():\n            df = pd.read_csv(path, dtype=str)\n            df[\"id\"] = df[\"id\"].fillna(\"\").str.strip()\n            df[\"comments\"] = df[\"comments\"].fillna(\"\")\n            return df\n    raise FileNotFoundError(\"[Baseline] Không tìm thấy reviews_llm.csv trong data/processed/*/\")"
  },
  {
    "id": "baseline-main",
    "file": "src/baseline.py",
    "name": "main",
    "kind": "function",
    "lineStart": 141,
    "lineEnd": 158,
    "signature": "def main() -> None:",
    "purpose": "Chạy suy luận Regex Baseline trên toàn bộ 1.000 review và xuất data/processed/reviews_baseline.csv (15 cột cùng schema LLM).",
    "flow": [
      "Parse --config, nạp YAML và lấy danh sách aspects.",
      "Nạp df_all qua load_reviews_llm(cfg), giữ các cột metadata.",
      "Chạy predict_review_regex(c, aspects) cho từng comments, ghép với metadata qua pd.concat(..., axis=1).",
      "Xuất ra reviews_baseline.csv (UTF-8) và in log tổng kết."
    ],
    "input": "CLI arg --config",
    "output": "Tạo tệp data/processed/reviews_baseline.csv (1.000 dòng × 15 cột).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "html",
      "os",
      "re",
      "sys",
      "unicodedata",
      "pathlib (Path)",
      "typing (Any)",
      "pandas",
      "yaml",
      "Gọi hàm: ArgumentParser, DataFrame, Path, add_argument, concat, fillna, get, is_absolute, is_relative_to, len, load_config, load_reviews_llm"
    ],
    "example": "python src/baseline.py --config configs/mexico-city.yaml",
    "usage": "Chặng 5 của STEPS trong run_pipeline.py.",
    "potentialBugs": [
      "Nếu df_all và preds không reset_index(drop=True) trước khi pd.concat(..., axis=1), hai DataFrame lệch index sẽ tạo ra hàng NaN thừa."
    ],
    "viva": [
      {
        "q": "Lý do `df_all[meta_cols].reset_index(drop=True)` xuất hiện ở dòng 151 của src/baseline.py?",
        "a": "Để bảo đảm index của bảng metadata (0..999) khớp 1-1 với index mặc định của DataFrame preds mới tạo khi ghép ngang bằng pd.concat(axis=1)."
      }
    ],
    "code": "def main() -> None:\n    ap = argparse.ArgumentParser(description=\"Regex Baseline cho cảm xúc, ngôn ngữ & 7 khía cạnh Inside Airbnb\")\n    ap.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    args = ap.parse_args()\n\n    cfg = load_config(args.config)\n    aspects = tuple(str(a).strip() for a in ((cfg.get(\"llm\") or {}).get(\"aspects\") or ASPECTS) if str(a).strip()) or ASPECTS\n    df_all = load_reviews_llm(cfg)\n    meta_cols = [c for c in (\"id\", \"listing_id\", \"date\", \"reviewer_id\", \"reviewer_name\", \"comments\") if c in df_all.columns]\n    preds = pd.DataFrame([predict_review_regex(c, aspects) for c in df_all[\"comments\"]])\n    out_df = pd.concat([df_all[meta_cols].fillna(\"\").reset_index(drop=True), preds], axis=1)\n\n    out_cfg = Path((cfg.get(\"baseline\") or {}).get(\"output_csv\", \"data/processed/reviews_baseline.csv\"))\n    out_path = out_cfg if out_cfg.is_absolute() else ROOT / out_cfg\n    out_path.parent.mkdir(parents=True, exist_ok=True)\n    out_df.to_csv(out_path, index=False, encoding=\"utf-8\")\n    disp = out_path.relative_to(ROOT) if out_path.is_relative_to(ROOT) else out_path\n    print(f\"[Baseline Regex] Đã xuất {len(out_df)} bản ghi -> {disp}\")"
  },
  {
    "id": "download--display-path",
    "file": "src/download.py",
    "name": "_display_path",
    "kind": "function",
    "lineStart": 24,
    "lineEnd": 25,
    "signature": "def _display_path(path):",
    "purpose": "Rút gọn đường dẫn file tuyệt đối thành đường dẫn tương đối so với PROJECT_ROOT để log gọn đẹp, không lộ đường dẫn ổ đĩa cá nhân.",
    "flow": [
      "Kiểm tra path.is_relative_to(PROJECT_ROOT).",
      "Nếu đúng thì trả về str(path.relative_to(PROJECT_ROOT)), ngược lại giữ nguyên str(path)."
    ],
    "input": "path (Path)",
    "output": "str (ví dụ \"data/raw/2026-06-15/listings.csv.gz\").",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "time",
      "yaml",
      "requests",
      "pathlib (Path)",
      "Gọi hàm: is_relative_to, relative_to"
    ],
    "example": "_display_path(PROJECT_ROOT / \"data/raw/2026-06-15/listings.csv.gz\") -> \"data\\\\raw\\\\2026-06-15\\\\listings.csv.gz\"",
    "usage": "Dùng trong thông báo log của hàm download() tại src/download.py.",
    "potentialBugs": [
      "Chỉ hoạt động tốt từ Python 3.9+ vì phương thức Path.is_relative_to() mới có từ bản 3.9."
    ],
    "viva": [
      {
        "q": "Vì sao không in đường dẫn tuyệt đối trực tiếp trong log?",
        "a": "Để tránh lộ thông tin thư mục máy cá nhân và giữ log đồng nhất giữa Windows/Linux."
      }
    ],
    "code": "def _display_path(path):\n    return path.relative_to(PROJECT_ROOT) if path.is_relative_to(PROJECT_ROOT) else path"
  },
  {
    "id": "download-download",
    "file": "src/download.py",
    "name": "download",
    "kind": "function",
    "lineStart": 28,
    "lineEnd": 86,
    "signature": "def download(url, dest, max_attempts=3, force=False):",
    "purpose": "Tải một tệp từ URL về dest an toàn theo luồng 64KB qua tệp tạm .tmp, kiểm tra Content-Length và thử lại theo Exponential Backoff.",
    "flow": [
      "Idempotent check: nếu dest tồn tại (> 0 bytes) và không bật --force -> trả về True ngay.",
      "Tạo thư mục cha và xác định tệp tạm tmp có hậu tố .tmp.",
      "Trong tối đa max_attempts lần thử: gửi requests.get(url, stream=True, timeout=60).",
      "Nếu HTTP 403 hoặc 404: xóa .tmp và thoát sớm, chỉ trả True nếu bản dự phòng local đang tồn tại (> 0 bytes).",
      "Nếu thành công: tải từng chunk 65.536 bytes vào .tmp; kiểm tra actual_size == expected_size (nếu server trả Content-Length).",
      "Gọi tmp.replace(dest) để đổi tên nguyên tử; nếu lỗi mạng/IOError thì xóa .tmp và sleep(2**attempt) giây rồi thử lại."
    ],
    "input": "url (str), dest (Path), max_attempts (int=3), force (bool=False)",
    "output": "bool (True nếu tệp hợp lệ đã có tại dest, False nếu tải thất bại). Side-effect ghi file ra data/raw/.",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "time",
      "yaml",
      "requests",
      "pathlib (Path)",
      "Gọi hàm: IOError, _display_path, exists, get, int, iter_content, mkdir, open, print, raise_for_status, range, replace"
    ],
    "example": "download(\"https://data.insideairbnb.com/.../listings.csv.gz\", Path(\"data/raw/2026-06-15/listings.csv.gz\")) -> True",
    "usage": "Hàm tải cốt lõi được main() của src/download.py gọi cho 16 tệp (4 tệp × 4 snapshot).",
    "potentialBugs": [
      "Nếu CDN nén động (Transfer-Encoding: chunked) không trả Content-Length (expected_size=-1), kiểm tra kích thước byte sẽ bị bỏ qua.",
      "Nếu server trả HTTP 200 kèm trang HTML chặn bot (Cloudflare), file vẫn có size > 0 và chỉ bị phát hiện khi bước Filter giải nén."
    ],
    "viva": [
      {
        "q": "Tại sao dùng tmp.replace(dest) thay vì ghi thẳng vào dest?",
        "a": "Nếu rớt mạng ở 50%, dest không bị hỏng nửa chừng; nếu để file cụt trên đĩa, lần chạy sau idempotent check thấy size > 0 sẽ tưởng đã tải xong."
      },
      {
        "q": "Nếu attempt=0 và attempt=1 đều bị Timeout thì tổng thời gian chờ Exponential Backoff là bao nhiêu?",
        "a": "2^0 + 2^1 = 1 + 2 = 3 giây (ở lần thử cuối cùng attempt=2 nếu vẫn lỗi thì không sleep nữa)."
      }
    ],
    "code": "def download(url, dest, max_attempts=3, force=False):\n    \"\"\"Tải một tệp từ url về dest. Trả về True nếu thành công, False nếu thất bại.\"\"\"\n    # Nếu file đã tồn tại và không yêu cầu tải lại (--force) -> bỏ qua tải để tiết kiệm thời gian\n    if dest.exists() and dest.stat().st_size > 0 and not force:\n        print(f\"  [Existing]: {_display_path(dest)}  ({dest.stat().st_size:,} bytes)\")\n        return True\n\n    dest.parent.mkdir(parents=True, exist_ok=True)\n    tmp = dest.with_suffix(dest.suffix + \".tmp\")\n\n    for attempt in range(max_attempts):\n        print(f\"  [>>] Downloading (attempt {attempt + 1}/{max_attempts}): {url}\")\n        try:\n            resp = requests.get(url, stream=True, timeout=60)\n\n            # Nếu máy chủ trả 403 hoặc 404: báo lỗi và không retry vô ích\n            if resp.status_code in (403, 404):\n                print(f\"  [ERROR] Server trả về mã {resp.status_code}. Bỏ qua tệp này.\")\n                if tmp.exists():\n                    tmp.unlink()\n                # Nếu đã có file local dự phòng trước đó thì giữ nguyên\n                if dest.exists() and dest.stat().st_size > 0:\n                    print(f\"  [FALLBACK]: Sử dụng bản lưu trữ cục bộ: {_display_path(dest)}\")\n                    return True\n                return False\n\n            resp.raise_for_status()\n            expected_size = int(resp.headers.get(\"Content-Length\", -1))\n\n            with open(tmp, \"wb\") as f:\n                for chunk in resp.iter_content(chunk_size=65536):\n                    f.write(chunk)\n\n            actual_size = tmp.stat().st_size\n            if expected_size > 0 and actual_size != expected_size:\n                raise IOError(f\"Tải chưa đủ: {actual_size:,}/{expected_size:,} bytes\")\n\n            tmp.replace(dest)\n            print(f\"    -> Đã lưu: {_display_path(dest)}  ({dest.stat().st_size:,} bytes)\")\n            return True\n\n        except (requests.RequestException, IOError) as exc:\n            print(f\"    [WARNING] Lần thử {attempt + 1} thất bại: {exc}\")\n            if tmp.exists():\n                tmp.unlink()\n\n            if attempt < max_attempts - 1:\n                wait_time = 2 ** attempt\n                print(f\"    Chờ {wait_time}s trước khi thử lại...\")\n                time.sleep(wait_time)\n            else:\n                print(f\"  [ERROR] Không thể tải {url} sau {max_attempts} lần thử.\")\n\n    # Kiểm tra phương án dự phòng nếu file cục bộ đã có\n    if dest.exists() and dest.stat().st_size > 0:\n        print(f\"  [FALLBACK]: Giữ bản lưu trữ cục bộ: {_display_path(dest)}\")\n        return True\n\n    return False"
  },
  {
    "id": "download-get-config-path",
    "file": "src/download.py",
    "name": "get_config_path",
    "kind": "function",
    "lineStart": 89,
    "lineEnd": 106,
    "signature": "def get_config_path(args_path=None):",
    "purpose": "Tìm file cấu hình YAML theo thứ tự ưu tiên: tham số CLI -> biến môi trường PIPELINE_CONFIG -> mặc định configs/mexico-city.yaml.",
    "flow": [
      "Lấy target từ args_path hoặc os.environ.get(\"PIPELINE_CONFIG\").",
      "Nếu target tồn tại và là đường dẫn tương đối, ưu tiên kiểm tra Path.cwd()/target rồi mới fallback về PROJECT_ROOT/target.",
      "Nếu không truyền target, trả về configs/mexico-city.yaml nếu tồn tại.",
      "Nếu vẫn không tìm thấy -> gọi sys.exit() kèm hướng dẫn sử dụng --config."
    ],
    "input": "args_path (str | None)",
    "output": "Path (đường dẫn tới tệp YAML cấu hình).",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "time",
      "yaml",
      "requests",
      "pathlib (Path)",
      "Gọi hàm: Path, cwd, exists, exit, get, is_absolute"
    ],
    "example": "get_config_path(\"configs/mexico-city.yaml\") -> Path(\".../configs/mexico-city.yaml\")",
    "usage": "Được main() trong src/download.py gọi ở đầu chương trình.",
    "potentialBugs": [
      "Không kiểm tra đuôi .yaml trước khi trả về ở nhánh target có giá trị (việc kiểm tra exists() nằm tiếp ở main())."
    ],
    "viva": [
      {
        "q": "Thứ tự ưu tiên đọc đường dẫn config là gì?",
        "a": "CLI (--config hoặc positional) -> biến môi trường PIPELINE_CONFIG -> configs/mexico-city.yaml."
      }
    ],
    "code": "def get_config_path(args_path=None):\n    \"\"\"Xác định đường dẫn file cấu hình YAML.\"\"\"\n    target = args_path or os.environ.get(\"PIPELINE_CONFIG\")\n    if target:\n        cfg_path = Path(target)\n        if not cfg_path.is_absolute():\n            cwd_path = Path.cwd() / cfg_path\n            cfg_path = cwd_path if cwd_path.exists() else PROJECT_ROOT / cfg_path\n        return cfg_path\n\n    default_config = PROJECT_ROOT / \"configs\" / \"mexico-city.yaml\"\n    if default_config.exists():\n        return default_config\n\n    sys.exit(\n        f\"[Download ERROR] Không tìm thấy file cấu hình mặc định: {default_config}\\n\"\n        \"Vui lòng truyền tham số --config <đường_dẫn_yaml> hoặc thiết lập biến môi trường PIPELINE_CONFIG.\"\n    )"
  },
  {
    "id": "download-main",
    "file": "src/download.py",
    "name": "main",
    "kind": "function",
    "lineStart": 109,
    "lineEnd": 158,
    "signature": "def main():",
    "purpose": "Phân tích tham số dòng lệnh, đọc data_root & snapshots từ YAML và tải đủ 16 tệp (4 bảng × 4 mốc thời gian).",
    "flow": [
      "Parse positional config_pos, --config và --force qua argparse.",
      "Đọc YAML qua yaml.safe_load(), kiểm tra bắt buộc phải có data_root và snapshots.",
      "Sắp xếp danh sách snapshots theo thứ tự chuỗi ngày và lặp lồng 4 tệp trong FILES.",
      "Ghép URL chuẩn Inside Airbnb và đích RAW_DIR / snap / fname, gọi download().",
      "Tổng kết ok/total (16/16); nếu có errors thì in danh sách và thoát sys.exit(1)."
    ],
    "input": "CLI flags (--config, --force)",
    "output": "16 tệp trong data/raw/{snapshot}/; thoát 0 nếu đủ 16/16 hoặc sys.exit(1) nếu thiếu.",
    "libraries": [
      "argparse",
      "os",
      "sys",
      "time",
      "yaml",
      "requests",
      "pathlib (Path)",
      "Gọi hàm: ArgumentParser, add_argument, append, download, exists, exit, get, get_config_path, len, open, parse_args, print"
    ],
    "example": "python src/download.py --config configs/mexico-city.yaml -> \"Kết quả: 16/16 tệp hợp lệ.\"",
    "usage": "Chặng 1 của STEPS trong run_pipeline.py.",
    "potentialBugs": [
      "Nếu sửa tên tệp hoặc cấu trúc thư mục trên máy chủ Inside Airbnb (như data/ vs visualisations/), URL ghép cứng sẽ trả 404."
    ],
    "viva": [
      {
        "q": "Nếu 15/16 tệp thành công và 1 tệp thất bại, main() trả về mã gì?",
        "a": "Danh sách errors khác rỗng nên gọi sys.exit(1), báo run_pipeline.py dừng pipeline để không lọc thiếu."
      }
    ],
    "code": "def main():\n    parser = argparse.ArgumentParser(description=\"Download Inside Airbnb raw data\")\n    parser.add_argument(\"config_pos\", nargs=\"?\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    parser.add_argument(\"--force\", action=\"store_true\", help=\"Bắt buộc tải lại dù file đã tồn tại\")\n    args = parser.parse_args()\n\n    cfg_file = get_config_path(args.config or args.config_pos)\n\n    if not cfg_file.exists():\n        sys.exit(f\"Không tìm thấy file cấu hình: {cfg_file}\")\n\n    try:\n        with open(cfg_file, encoding=\"utf-8\") as f:\n            cfg = yaml.safe_load(f)\n    except yaml.YAMLError as e:\n        sys.exit(f\"Lỗi parse YAML: {e}\")\n\n    data_root = cfg.get(\"data_root\")\n    snapshots = cfg.get(\"snapshots\")\n\n    if not data_root or not snapshots:\n        sys.exit(\"File cấu hình thiếu 'data_root' hoặc 'snapshots'.\")\n\n    snapshots = sorted(str(s).strip() for s in snapshots)\n    total = len(snapshots) * len(FILES)\n    ok = 0\n    errors = []\n\n    for snap in snapshots:\n        print(f\"\\n[Snapshot] {snap}\")\n        for subfolder, fname in FILES:\n            url = f\"{BASE_URL}/{data_root}/{snap}/{subfolder}/{fname}\"\n            dest = RAW_DIR / str(snap) / fname\n\n            if download(url, dest, force=args.force):\n                ok += 1\n            else:\n                errors.append(f\"{snap}/{fname}\")\n\n    print(f\"\\n{'='*50}\")\n    print(f\"Kết quả: {ok}/{total} tệp hợp lệ.\")\n\n    if errors:\n        print(\"Các tệp tải thất bại:\")\n        for e in errors:\n            print(f\"  - {e}\")\n        sys.exit(1)\n    else:\n        print(\"Tất cả tệp đã sẵn sàng trong data/raw/!\")"
  },
  {
    "id": "filter-data-from-sheet--normalise-id",
    "file": "src/filter_data_from_sheet.py",
    "name": "_normalise_id",
    "kind": "function",
    "lineStart": 33,
    "lineEnd": 36,
    "signature": "def _normalise_id(values: pd.Series) -> pd.Series:",
    "purpose": "Chuẩn hóa Series chứa ID thành kiểu chuỗi sạch (ép string, bỏ khoảng trắng đầu/cuối, đổi NA thành \"\").",
    "flow": [
      "Gọi values.astype(\"string\").str.strip().fillna(\"\").",
      "Trả về pandas Series đồng nhất định dạng chuỗi."
    ],
    "input": "values (pd.Series chứa ID thô)",
    "output": "pd.Series (kiểu string không có khoảng trắng dư và không còn <NA>).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: astype, fillna, strip"
    ],
    "example": "_normalise_id(pd.Series([\" 12345 \", None])) -> Series([\"12345\", \"\"])",
    "usage": "Dùng trong _filter_assignments(), _filter_raw_by_ids() và run_filter_data().",
    "potentialBugs": [
      "Nếu đầu vào bị đọc thành float trước đó (chứa \".0\" ở cuối như \"123.0\"), _normalise_id chỉ strip chứ không tự xóa \".0\" — nên luôn phải ép dtype=\"string\" ngay từ read_csv()."
    ],
    "viva": [
      {
        "q": "Vì sao không viết astype(str) thường mà dùng astype(\"string\")?",
        "a": "astype(\"string\") dùng StringDtype của pandas giữ ngữ nghĩa chuẩn chuỗi và hoạt động nhất quán với .str.strip().fillna(\"\")."
      }
    ],
    "code": "def _normalise_id(values: pd.Series) -> pd.Series:\n    return (\n        values.astype(\"string\").str.strip().fillna(\"\")\n    )"
  },
  {
    "id": "filter-data-from-sheet--read-sheet",
    "file": "src/filter_data_from_sheet.py",
    "name": "_read_sheet",
    "kind": "function",
    "lineStart": 39,
    "lineEnd": 55,
    "signature": "def _read_sheet(spreadsheet_id: str, sheet_name: str) -> pd.DataFrame:",
    "purpose": "Tải một tab cụ thể của Google Sheets thông qua endpoint Google Visualization API (/gviz/tq?tqx=out:csv).",
    "flow": [
      "Mã hóa tên sheet bằng urllib.parse.quote(sheet_name) ghép vào URL Google Sheets CSV.",
      "Gửi requests.get(url, timeout=60) và kiểm tra resp.raise_for_status().",
      "Giải mã UTF-8-SIG (loại BOM) qua StringIO và đọc bằng pd.read_csv(..., dtype=\"string\", keep_default_na=False).",
      "Bắt ParserError (thường xảy ra nếu sheet bị chuyển quyền riêng tư trả về trang HTML đăng nhập)."
    ],
    "input": "spreadsheet_id (str), sheet_name (str)",
    "output": "pd.DataFrame toàn bộ các cột dưới dạng string.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: StringIO, ValueError, decode, get, quote, raise_for_status, read_csv"
    ],
    "example": "_read_sheet(\"<sheet_id>\", \"Review\") -> DataFrame các dòng phân công review.",
    "usage": "Được _load_assignments() gọi hai lần cho tab Listing và tab Review.",
    "potentialBugs": [
      "Nếu bảng tính Google Sheets mất mạng hoặc bị thu hồi quyền \"Anyone with link can view\", request trả HTML gây ParserError hoặc HTTPError."
    ],
    "viva": [
      {
        "q": "Tham số keep_default_na=False khi đọc Google Sheets có tác dụng gì?",
        "a": "Ngăn pandas tự đổi các chuỗi ngắn như \"NA\" hay ô trống thành NaN, giữ nguyên chuỗi gốc để lọc chính xác cờ \"x\"."
      }
    ],
    "code": "def _read_sheet(spreadsheet_id: str, sheet_name: str) -> pd.DataFrame:\n    url = (\n        f\"https://docs.google.com/spreadsheets/d/{spreadsheet_id}\"\n        f\"/gviz/tq?tqx=out:csv&sheet={quote(sheet_name)}\"\n    )\n    response = requests.get(url, timeout=60)\n    response.raise_for_status()\n    try:\n        return pd.read_csv(\n            StringIO(response.content.decode(\"utf-8-sig\")),\n            dtype=\"string\",\n            keep_default_na=False,\n        )\n    except pd.errors.ParserError as exc:\n        raise ValueError(\n            f\"Không đọc được tab '{sheet_name}' từ Google Sheets. \"\n        ) from exc"
  },
  {
    "id": "filter-data-from-sheet--filter-assignments",
    "file": "src/filter_data_from_sheet.py",
    "name": "_filter_assignments",
    "kind": "function",
    "lineStart": 58,
    "lineEnd": 69,
    "signature": "def _filter_assignments(",
    "purpose": "Lọc bảng phân công chung của cả học phần để giữ lại đúng hàng của lớp và nhóm cấu hình trong YAML.",
    "flow": [
      "Lọc các hàng có cột ASSIGNMENT_HEADERS[\"class\"] == class_name và ASSIGNMENT_HEADERS[\"group\"] == group.",
      "Tạo .copy() tách khỏi bảng gốc (tuân thủ Copy-on-Write).",
      "Chuẩn hóa cột id_column bằng _normalise_id()."
    ],
    "input": "assignments (pd.DataFrame), class_name (str), group (str), id_column (str)",
    "output": "pd.DataFrame chỉ chứa bản ghi phân công của đúng nhóm.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: _normalise_id, copy, eq"
    ],
    "example": "_filter_assignments(df_sheet, \"Lớp\", \"Nhóm\", \"listing_id\") -> DataFrame 1.000 dòng.",
    "usage": "Được _load_assignments() gọi cho cả tab Listing (1.000) và Review (5.000).",
    "potentialBugs": [
      "Nếu tên cột trên Google Sheets đổi khác ASSIGNMENT_HEADERS, hàm sẽ ném KeyError."
    ],
    "viva": [
      {
        "q": "Nếu trên Google Sheets có khoảng trắng dư trong tên nhóm nhưng YAML không có thì sao?",
        "a": "Phép so sánh .eq() so khớp chính xác chuỗi nên sẽ trả về 0 dòng và _load_assignments() lập tức báo ValueError."
      }
    ],
    "code": "def _filter_assignments(\n    assignments: pd.DataFrame,\n    class_name: str,\n    group: str,\n    id_column: str,\n) -> pd.DataFrame:\n    selected = assignments.loc[\n        assignments[ASSIGNMENT_HEADERS[\"class\"]].eq(class_name)\n        & assignments[ASSIGNMENT_HEADERS[\"group\"]].eq(group)\n    ].copy()\n    selected[id_column] = _normalise_id(selected[id_column])\n    return selected"
  },
  {
    "id": "filter-data-from-sheet--load-assignments",
    "file": "src/filter_data_from_sheet.py",
    "name": "_load_assignments",
    "kind": "function",
    "lineStart": 72,
    "lineEnd": 112,
    "signature": "def _load_assignments(",
    "purpose": "Đọc cấu hình mục assignment từ YAML và tải đồng thời 2 DataFrame phân công (Listing 1.000 và Review 5.000).",
    "flow": [
      "Kiểm tra block assignment phải là dict và đủ class, group, spreadsheet_id.",
      "Gọi _read_sheet() + _filter_assignments() cho cả sheet \"Listing\" (theo listing_id) và sheet \"Review\" (theo review_id).",
      "Kiểm tra nếu một trong hai bảng rỗng -> ném ValueError dừng sớm."
    ],
    "input": "config (dict từ YAML)",
    "output": "Tuple (listing_df, review_df).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: ValueError, _filter_assignments, _read_sheet, all, get, isinstance, len, str, strip"
    ],
    "example": "listing, review = _load_assignments(config) -> (1000 dòng, 5000 dòng).",
    "usage": "Được gọi ở bước đầu của run_filter_data().",
    "potentialBugs": [
      "Phụ thuộc kết nối Internet tới Google Sheets mỗi lần chạy Filter nếu chưa có bản cache sheet offline."
    ],
    "viva": [
      {
        "q": "Tại sao _load_assignments truyền id_column khác nhau cho 2 sheet?",
        "a": "Tab Listing giao theo cột \"listing_id\", còn tab Review giao chính xác từng bình luận theo cột \"review_id\"."
      }
    ],
    "code": "def _load_assignments(\n    config: dict[str, Any],\n) -> tuple[pd.DataFrame, pd.DataFrame]:\n    assignment = config.get(\"assignment\")\n    if not isinstance(assignment, dict):\n        raise ValueError(\"Config thiếu mapping 'assignment'.\")\n\n    class_name, group, spreadsheet_id = (\n        str(assignment.get(key, \"\")).strip()\n        for key in (\"class\", \"group\", \"spreadsheet_id\")\n    )\n    if not all((class_name, group, spreadsheet_id)):\n        raise ValueError(\n            \"Cần cấu hình assignment.class, assignment.group và \"\n            \"assignment.spreadsheet_id.\"\n        )\n\n    sheets = {\n        \"listing\": str(assignment.get(\"listing_sheet\", \"Listing\")),\n        \"review\": str(assignment.get(\"review_sheet\", \"Review\")),\n    }\n    listing = _filter_assignments(\n        _read_sheet(spreadsheet_id, sheets[\"listing\"]),\n        class_name,\n        group,\n        ASSIGNMENT_HEADERS[\"listing_id\"],\n    )\n    review = _filter_assignments(\n        _read_sheet(spreadsheet_id, sheets[\"review\"]),\n        class_name,\n        group,\n        ASSIGNMENT_HEADERS[\"review_id\"],\n    )\n\n    if listing.empty or review.empty:\n        raise ValueError(\n            f\"Không tìm thấy phân công cho lớp '{class_name}', nhóm '{group}' \"\n            f\"(listings={len(listing)}, reviews={len(review)}).\"\n        )\n\n    return listing, review"
  },
  {
    "id": "filter-data-from-sheet--filter-raw-by-ids",
    "file": "src/filter_data_from_sheet.py",
    "name": "_filter_raw_by_ids",
    "kind": "function",
    "lineStart": 115,
    "lineEnd": 146,
    "signature": "def _filter_raw_by_ids(",
    "purpose": "Đọc file .csv.gz lớn theo từng lô chunksize=100_000, giữ ID dạng string và lọc theo bảng băm Python set O(1).",
    "flow": [
      "Kiểm tra tệp thô tồn tại; chuyển assigned_ids thành allowed = set(assigned_ids).",
      "Khởi tạo iterator pd.read_csv(compression=\"infer\", dtype={\"id\":\"string\",\"listing_id\":\"string\"}, chunksize=chunksize).",
      "Với mỗi chunk: xác nhận cột key có tồn tại, chuẩn hóa _normalise_id(chunk[key]), lọc chunk[key].isin(allowed).copy().",
      "Nối các selected khác rỗng bằng pd.concat(chunks, ignore_index=True); nếu không khớp dòng nào trả về bảng rỗng đúng header."
    ],
    "input": "path (Path), key (str), assigned_ids (pd.Series), chunksize (int=100_000)",
    "output": "pd.DataFrame đã lọc.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: FileNotFoundError, ValueError, _normalise_id, append, concat, copy, is_file, isin, read_csv, set"
    ],
    "example": "_filter_raw_by_ids(Path(\".../reviews.csv.gz\"), \"id\", review_ids) -> DataFrame 5.000 reviews.",
    "usage": "Lọc cả listings.csv.gz (key=\"id\"), calendar.csv.gz (key=\"listing_id\") và reviews.csv.gz (key=\"id\").",
    "potentialBugs": [
      "Nếu file raw bị lỗi nén gzip giữa chừng do bước Download chưa trọn vẹn, vòng lặp chunk sẽ văng EOFError/OSError."
    ],
    "viva": [
      {
        "q": "Tại sao không dùng _filter_raw_by_ids với key=\"listing_id\" cho file reviews.csv.gz?",
        "a": "Vì bảng phân công chỉ định 5.000 review_id cụ thể chứ không phải toàn bộ review của 1.000 listing; lọc bằng listing_id sẽ lấy thừa hàng chục nghìn review."
      }
    ],
    "code": "def _filter_raw_by_ids(\n    path: Path,\n    key: str,\n    assigned_ids: pd.Series,\n    *,\n    chunksize: int = 100_000,\n) -> pd.DataFrame:\n    if not path.is_file():\n        raise FileNotFoundError(f\"Không tìm thấy raw data: {path}\")\n\n    allowed = set(assigned_ids)\n    chunks: list[pd.DataFrame] = []\n    for chunk in pd.read_csv(\n        path,\n        compression=\"infer\",\n        dtype={\"id\": \"string\", \"listing_id\": \"string\"},\n        low_memory=False,\n        chunksize=chunksize,\n    ):\n        if key not in chunk.columns:\n            raise ValueError(f\"{path} thiếu cột khóa '{key}'.\")\n        chunk[key] = _normalise_id(chunk[key])\n        selected = chunk.loc[chunk[key].isin(allowed)].copy()\n        if not selected.empty:\n            chunks.append(selected)\n\n    if chunks:\n        return pd.concat(chunks, ignore_index=True)\n    header = pd.read_csv(path, compression=\"infer\", nrows=0)\n    if key not in header.columns:\n        raise ValueError(f\"{path} thiếu cột khóa '{key}'.\")\n    return header"
  },
  {
    "id": "filter-data-from-sheet--save-frame",
    "file": "src/filter_data_from_sheet.py",
    "name": "_save_frame",
    "kind": "function",
    "lineStart": 149,
    "lineEnd": 151,
    "signature": "def _save_frame(frame: pd.DataFrame, path: Path) -> None:",
    "purpose": "Tạo thư mục cha nếu chưa có và xuất DataFrame ra tệp CSV chuẩn UTF-8 không kèm chỉ mục hàng.",
    "flow": [
      "Gọi path.parent.mkdir(parents=True, exist_ok=True).",
      "Gọi frame.to_csv(path, index=False, encoding=\"utf-8\")."
    ],
    "input": "frame (pd.DataFrame), path (Path)",
    "output": "None; side-effect ghi tệp CSV ra ổ đĩa.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: mkdir, to_csv"
    ],
    "example": "_save_frame(listings, Path(\"data/processed/2026-06-15/listings.csv\"))",
    "usage": "Lưu 5 tệp CSV cho mỗi snapshot trong run_filter_data().",
    "potentialBugs": [
      "Nếu bỏ index=False, file CSV sẽ sinh cột \"Unnamed: 0\" dư thừa cho bước sau."
    ],
    "viva": [
      {
        "q": "Tại sao không xuất luôn .csv.gz ở thư mục processed?",
        "a": "Sau khi lọc còn 1.000–5.000 dòng, kích thước CSV rất nhỏ và đọc ghi trực tiếp ở bước QA/KPI nhanh và dễ mở kiểm tra."
      }
    ],
    "code": "def _save_frame(frame: pd.DataFrame, path: Path) -> None:\n    path.parent.mkdir(parents=True, exist_ok=True)\n    frame.to_csv(path, index=False, encoding=\"utf-8\")"
  },
  {
    "id": "filter-data-from-sheet-run-filter-data",
    "file": "src/filter_data_from_sheet.py",
    "name": "run_filter_data",
    "kind": "function",
    "lineStart": 154,
    "lineEnd": 234,
    "signature": "def run_filter_data(",
    "purpose": "Điều phối lọc dữ liệu phân công trên toàn bộ 4 mốc snapshot: sao chép GeoJSON, lọc listings (gắn analysis_area), calendar, reviews, reviews_llm và reviews_labeled.",
    "flow": [
      "Đọc YAML, sắp xếp snapshots theo thời gian, gọi _load_assignments() lấy listing_ids, review_ids, area_by_listing, llm_ids, manual_ids.",
      "Trong vòng lặp 4 snapshot: copy neighbourhoods.geojson một lần sang data/processed/.",
      "Lọc listings theo key=\"id\", ánh xạ cột analysis_area = _normalise_id(listings[\"id\"]).map(area_by_listing).",
      "Lọc calendar theo key=\"listing_id\"; lọc reviews theo key=\"id\" (5.000 review).",
      "Từ reviews vừa lọc, tách tiếp reviews_llm (1.000 dòng theo cờ \"Mẫu LLM\") và reviews_labeled (100 dòng theo cờ \"Nhãn tay\")."
    ],
    "input": "config_path (Path), raw_dir (Path), output_dir (Path)",
    "output": "Tạo trọn bộ data/processed/{snap}/{listings,calendar,reviews,reviews_llm,reviews_labeled}.csv và neighbourhoods.geojson.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: ValueError, _filter_raw_by_ids, _load_assignments, _normalise_id, _save_frame, astype, copyfile, dict, eq, exists, get, is_absolute"
    ],
    "example": "run_filter_data(Path(\"configs/mexico-city.yaml\")) -> log listings=1000, reviews=5000, LLM=1000, manual=100.",
    "usage": "Hàm lõi được main() của filter_data_from_sheet.py gọi.",
    "potentialBugs": [
      "Nếu snapshot t1 trên nguồn thiếu listing mới mở sau này, panel 1.000 căn có thể lệch nếu không kiểm tra len(listings)."
    ],
    "viva": [
      {
        "q": "Hàm map(area_by_listing) gán cột analysis_area hoạt động ra sao nếu có 1 ID không nằm trong dict?",
        "a": "Series.map(dict) trả về NaN cho những khóa vắng mặt trong từ điển."
      }
    ],
    "code": "def run_filter_data(\n    config_path: Path,\n    raw_dir: Path = RAW_DIR,\n    output_dir: Path = PROCESSED_DIR,\n) -> None:\n    config_path = config_path if config_path.is_absolute() or config_path.exists() else PROJECT_ROOT / config_path\n    config_path = config_path.resolve()\n    with config_path.open(encoding=\"utf-8\") as config_file:\n        config = yaml.safe_load(config_file)\n    if not isinstance(config, dict):\n        raise ValueError(f\"Config phải là YAML mapping: {config_path}\")\n\n    snapshots = sorted((str(snapshot).strip() for snapshot in config.get(\"snapshots\", [])), key=pd.to_datetime)\n    area_col = str(\n        config.get(\"qa\", {}).get(\"area_col\")\n        or config.get(\"kpi\", {}).get(\"area_col\")\n        or ASSIGNMENT_HEADERS[\"analysis_area\"]\n    )\n    listing, review = _load_assignments(config)\n    listing_ids = listing[ASSIGNMENT_HEADERS[\"listing_id\"]]\n    review_ids = review[ASSIGNMENT_HEADERS[\"review_id\"]]\n    area_by_listing = dict(\n        zip(\n            listing_ids,\n            listing[ASSIGNMENT_HEADERS[\"analysis_area\"]],\n        )\n    )\n    llm_ids = set(\n        review.loc[\n            review[ASSIGNMENT_HEADERS[\"llm\"]].astype(\"string\").str.strip().str.lower().eq(\"x\"),\n            ASSIGNMENT_HEADERS[\"review_id\"],\n        ]\n    )\n    manual_ids = set(\n        review.loc[\n            review[ASSIGNMENT_HEADERS[\"manual\"]].astype(\"string\").str.strip().str.lower().eq(\"x\"),\n            ASSIGNMENT_HEADERS[\"review_id\"],\n        ]\n    )\n\n    geojson_copied = False\n    for snapshot in snapshots:\n        print(f\"[Filter] {snapshot}\")\n        raw_snapshot = raw_dir / snapshot\n        processed_snapshot = output_dir / snapshot\n\n        geojson_src = raw_snapshot / \"neighbourhoods.geojson\"\n        geojson_dst = output_dir / \"neighbourhoods.geojson\"\n        if geojson_src.is_file() and not geojson_copied:\n            output_dir.mkdir(parents=True, exist_ok=True)\n            shutil.copyfile(geojson_src, geojson_dst)\n            geojson_copied = True\n\n        listings = _filter_raw_by_ids(\n            raw_snapshot / \"listings.csv.gz\", \"id\", listing_ids\n        )\n        listings[area_col] = _normalise_id(listings[\"id\"]).map(area_by_listing)\n        _save_frame(listings, processed_snapshot / \"listings.csv\")\n\n        calendar = _filter_raw_by_ids(\n            raw_snapshot / \"calendar.csv.gz\", \"listing_id\", listing_ids\n        )\n        _save_frame(calendar, processed_snapshot / \"calendar.csv\")\n\n        reviews = _filter_raw_by_ids(\n            raw_snapshot / \"reviews.csv.gz\", \"id\", review_ids\n        )\n        reviews[\"id\"] = _normalise_id(reviews[\"id\"])\n        _save_frame(reviews, processed_snapshot / \"reviews.csv\")\n\n        llm_sample = reviews.loc[reviews[\"id\"].isin(llm_ids)]\n        manual_sample = reviews.loc[reviews[\"id\"].isin(manual_ids)]\n        _save_frame(llm_sample, processed_snapshot / \"reviews_llm.csv\")\n        _save_frame(manual_sample, processed_snapshot / \"reviews_labeled.csv\")\n        print(\n            f\"  listings={len(listings)}, calendar={len(calendar)}, \"\n            f\"reviews={len(reviews)}, LLM={len(llm_sample)}, \"\n            f\"manual={len(manual_sample)}\"\n        )\n\n    print(f\"[Filter] Filtered data saved to {output_dir}\")"
  },
  {
    "id": "filter-data-from-sheet--parse-args",
    "file": "src/filter_data_from_sheet.py",
    "name": "_parse_args",
    "kind": "function",
    "lineStart": 237,
    "lineEnd": 248,
    "signature": "def _parse_args() -> argparse.Namespace:",
    "purpose": "Khai báo và phân tích các tham số CLI --config, --raw-dir và --output-dir cho module Filter.",
    "flow": [
      "Dùng argparse.ArgumentParser nhận 3 Path arguments có giá trị mặc định rõ ràng."
    ],
    "input": "CLI flags",
    "output": "argparse.Namespace",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: ArgumentParser, Path, add_argument, get, parse_args"
    ],
    "example": "python src/filter_data_from_sheet.py --config configs/mexico-city.yaml",
    "usage": "Được main() gọi đầu tiên.",
    "potentialBugs": [
      "Không có; giá trị đường dẫn tương đối sẽ được run_filter_data() giải quyết tiếp."
    ],
    "viva": [
      {
        "q": "Tác dụng của --raw-dir và --output-dir trong _parse_args() là gì?",
        "a": "Cho phép kiểm thử hàm lọc trên một thư mục dữ liệu mẫu nhỏ mà không ghi đè data/processed/ thật."
      }
    ],
    "code": "def _parse_args() -> argparse.Namespace:\n    parser = argparse.ArgumentParser(\n        description=\"Filter assigned listings, calendar and reviews from raw data.\"\n    )\n    parser.add_argument(\n        \"--config\",\n        type=Path,\n        default=Path(os.environ.get(\"PIPELINE_CONFIG\", PROJECT_ROOT / \"configs\" / \"mexico-city.yaml\")),\n    )\n    parser.add_argument(\"--raw-dir\", type=Path, default=RAW_DIR)\n    parser.add_argument(\"--output-dir\", type=Path, default=PROCESSED_DIR)\n    return parser.parse_args()"
  },
  {
    "id": "filter-data-from-sheet-main",
    "file": "src/filter_data_from_sheet.py",
    "name": "main",
    "kind": "function",
    "lineStart": 251,
    "lineEnd": 270,
    "signature": "def main() -> int:",
    "purpose": "Hàm bao bọc CLI cho bước Filter, thiết lập UTF-8 stdout và chuyển đổi các lỗi phổ biến thành exit code 1 sạch sẽ.",
    "flow": [
      "Cấu hình sys.stdout UTF-8 để tránh lỗi font Windows.",
      "Gọi run_filter_data() trong khối try/except bắt OSError, ValueError, YAMLError, ParserError, RequestException.",
      "Trả về 0 nếu thành công, 1 (in ra stderr) nếu lỗi."
    ],
    "input": "CLI args",
    "output": "int (0 hoặc 1 dùng với raise SystemExit(main())).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "io (StringIO)",
      "os",
      "shutil",
      "sys",
      "pathlib (Path)",
      "typing (Any)",
      "urllib.parse (quote)",
      "pandas",
      "requests",
      "yaml",
      "Gọi hàm: _parse_args, callable, getattr, print, reconfigure, run_filter_data"
    ],
    "example": "raise SystemExit(main())",
    "usage": "Điểm vào chính khi run_pipeline.py gọi src/filter_data_from_sheet.py.",
    "potentialBugs": [
      "Các lỗi lập trình ngoài danh sách except (vd KeyError do sai header sheet) vẫn sẽ traceback đầy đủ giúp debug."
    ],
    "viva": [
      {
        "q": "Tại sao main() dùng `raise SystemExit(main())` ở cuối file?",
        "a": "Đây là chuẩn Python để trả chính xác mã thoát integer (0/1) về cho hệ điều hành hoặc subprocess.run(check=True)."
      }
    ],
    "code": "def main() -> int:\n    if callable(getattr(sys.stdout, \"reconfigure\", None)):\n        sys.stdout.reconfigure(encoding=\"utf-8\", errors=\"replace\")\n    args = _parse_args()\n    try:\n        run_filter_data(\n            config_path=args.config,\n            raw_dir=args.raw_dir,\n            output_dir=args.output_dir,\n        )\n    except (\n        OSError,\n        ValueError,\n        yaml.YAMLError,\n        pd.errors.ParserError,\n        requests.RequestException,\n    ) as exc:\n        print(f\"[Filter ERROR] {exc}\", file=sys.stderr)\n        return 1\n    return 0"
  },
  {
    "id": "llm-build-schemas",
    "file": "src/llm.py",
    "name": "build_schemas",
    "kind": "function",
    "lineStart": 28,
    "lineEnd": 39,
    "signature": "def build_schemas(aspects: List[str]):",
    "purpose": "Tạo động 2 class Pydantic (AspectSentiment và ReviewAnalysis) dựa trên danh sách khía cạnh từ YAML để dùng làm Structured Output schema cho Gemini.",
    "flow": [
      "Dựng dict fields ánh xạ từng tên aspect -> (SentimentLiteral, ...).",
      "Gọi pydantic.create_model(\"AspectSentiment\", **fields).",
      "Tạo model ReviewAnalysis chứa id (str), language (str), overall_sentiment (Literal 3 giá trị) và aspects (AspectSentiment)."
    ],
    "input": "aspects (List[str], vd 7 khía cạnh trong config)",
    "output": "Tuple (AspectSentiment class, ReviewAnalysis class).",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: Field, create_model, len, str, strip"
    ],
    "example": "aspect_m, rev_m = build_schemas([\"location\", \"noise\"])",
    "usage": "Gọi ở cấp module (mặc định 7 khía cạnh) và trong main() theo YAML.",
    "potentialBugs": [
      "Nếu tên khía cạnh trong YAML chứa khoảng trắng hoặc ký tự không phải định danh Python hợp lệ, create_model sẽ lỗi."
    ],
    "viva": [
      {
        "q": "Tại sao overall_sentiment chỉ có 3 giá trị còn mỗi aspect lại có tới 4 giá trị?",
        "a": "Mọi review đều mang sắc thái tổng thể (positive/mixed/negative), trong khi một khía cạnh cụ thể hoàn toàn có thể không được nhắc tới (not_mentioned)."
      }
    ],
    "code": "def build_schemas(aspects: List[str]):\n    \"\"\"Tạo động AspectSentiment và ReviewAnalysis từ danh sách llm.aspects trong config.\"\"\"\n    fields = {str(a).strip(): (SentimentLiteral, ...) for a in aspects if str(a).strip()}\n    aspect_model = create_model(\"AspectSentiment\", **fields)\n    review_model = create_model(\n        \"ReviewAnalysis\",\n        id=(str, Field(description=\"Mã định danh ID của review\")),\n        language=(str, Field(description='Mã ngôn ngữ ISO 639-1 viết thường 2 ký tự (vd: es, en, fr) hoặc \"und\"')),\n        overall_sentiment=(Literal[\"positive\", \"mixed\", \"negative\"], Field(description=\"Cảm xúc tổng thể\")),\n        aspects=(aspect_model, Field(description=f\"Cảm xúc theo {len(fields)} khía cạnh quy chuẩn\")),\n    )\n    return aspect_model, review_model"
  },
  {
    "id": "llm-load-config",
    "file": "src/llm.py",
    "name": "load_config",
    "kind": "function",
    "lineStart": 49,
    "lineEnd": 56,
    "signature": "def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:",
    "purpose": "Đọc file cấu hình YAML cho mô-đun LLM (lấy tên model, batch_size, danh sách aspects, đường dẫn cache và output CSV).",
    "flow": [
      "Xác định cfg_path, kiểm tra tồn tại, dùng yaml.safe_load()."
    ],
    "input": "config_path_str (Optional[str])",
    "output": "Dict[str, Any]",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: FileNotFoundError, Path, exists, get, is_absolute, open, safe_load"
    ],
    "example": "config = load_config(\"configs/mexico-city.yaml\")",
    "usage": "Gọi đầu tiên trong main() của src/llm.py.",
    "potentialBugs": [
      "Thiếu khóa llm trong YAML sẽ dùng các giá trị fallback trong main()."
    ],
    "viva": [
      {
        "q": "Tên model trong YAML của Nhóm 4 là gì?",
        "a": "gemini-3.5-flash-lite với batch_size: 5."
      }
    ],
    "code": "def load_config(config_path_str: Optional[str] = None) -> Dict[str, Any]:\n    \"\"\"Nạp cấu hình từ file YAML (từ CLI, biến môi trường PIPELINE_CONFIG hoặc mặc định).\"\"\"\n    cfg_path = Path(config_path_str or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\"))\n    cfg_path = cfg_path if cfg_path.is_absolute() else PROJECT_ROOT / cfg_path\n    if not cfg_path.exists():\n        raise FileNotFoundError(f\"[LLM] Không tìm thấy file cấu hình: {cfg_path}\")\n    with cfg_path.open(\"r\", encoding=\"utf-8\") as f:\n        return yaml.safe_load(f)"
  },
  {
    "id": "llm-load-assigned-reviews",
    "file": "src/llm.py",
    "name": "load_assigned_reviews",
    "kind": "function",
    "lineStart": 59,
    "lineEnd": 85,
    "signature": "def load_assigned_reviews(config: Dict[str, Any]) -> pd.DataFrame:",
    "purpose": "Đọc danh sách 1.000 review cần gán nhãn LLM từ tệp reviews_llm.csv mới nhất sẵn có trong data/processed/.",
    "flow": [
      "Duyệt reversed(snapshots) tìm tệp data/processed/{snap}/reviews_llm.csv đầu tiên tồn tại.",
      "Đọc CSV với dtype={\"id\": \"string\", \"listing_id\": \"string\"}, strip ID và fillna(\"\") cho comments.",
      "Nếu không thấy theo tên snapshot chuẩn, thử glob */reviews_llm.csv làm dự phòng."
    ],
    "input": "config (Dict)",
    "output": "pd.DataFrame chứa 1.000 reviews phân công LLM.",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: FileNotFoundError, astype, fillna, get, glob, is_file, len, list, print, read_csv, relative_to, reversed"
    ],
    "example": "df = load_assigned_reviews(cfg) -> 1.000 dòng.",
    "usage": "Gọi trong main() của src/llm.py trước khi đối chiếu cache.",
    "potentialBugs": [
      "Nếu quên chạy Filter trước, hàm sẽ ném FileNotFoundError ngay lập tức."
    ],
    "viva": [
      {
        "q": "Tại sao chỉ đọc 1 tệp reviews_llm.csv chứ không đọc cả 4 snapshot?",
        "a": "Vì 1.000 Mẫu LLM được chọn cố định từ bảng phân công review, giống hệt nhau ở các mốc snapshot nên không cần đọc lặp tốn API."
      }
    ],
    "code": "def load_assigned_reviews(config: Dict[str, Any]) -> pd.DataFrame:\n    \"\"\"\n    Nạp trực tiếp file reviews_llm.csv từ data/processed.\n    Do 1.000 listing được phân công cố định, reviews_llm ở các snapshot là đồng nhất.\n    Chỉ cần lấy ở một mốc snapshot có sẵn, không duyệt for nhiều mốc hay lấy từ raw.\n    \"\"\"\n    snapshots = sorted((str(s).strip() for s in config.get(\"snapshots\", [])), key=pd.to_datetime)\n    # Tìm mốc snapshot có sẵn reviews_llm.csv\n    for snap in reversed(snapshots):\n        path = PROJECT_ROOT / \"data\" / \"processed\" / str(snap) / \"reviews_llm.csv\"\n        if path.is_file():\n            df = pd.read_csv(path, dtype={\"id\": \"string\", \"listing_id\": \"string\"})\n            df[\"id\"] = df[\"id\"].astype(\"string\").str.strip()\n            df[\"comments\"] = df[\"comments\"].fillna(\"\")\n            print(f\"[LLM] Đã tìm thấy {len(df):,} reviews phân công tại: {path.relative_to(PROJECT_ROOT)}\")\n            return df\n\n    # Fallback nếu đường dẫn snapshot khác\n    matched = list((PROJECT_ROOT / \"data\" / \"processed\").glob(\"*/reviews_llm.csv\"))\n    if matched:\n        print(f\"[LLM] Đã tìm thấy reviews phân công tại: {matched[0].relative_to(PROJECT_ROOT)}\")\n        df = pd.read_csv(matched[0], dtype={\"id\": \"string\", \"listing_id\": \"string\"})\n        df[\"id\"] = df[\"id\"].astype(\"string\").str.strip()\n        df[\"comments\"] = df[\"comments\"].fillna(\"\")\n        return df\n\n    raise FileNotFoundError(\"[LLM] Không tìm thấy file reviews_llm.csv nào trong data/processed/*/\")"
  },
  {
    "id": "llm-load-cache",
    "file": "src/llm.py",
    "name": "load_cache",
    "kind": "function",
    "lineStart": 92,
    "lineEnd": 113,
    "signature": "def load_cache(cache_path: Path, required_aspects: Optional[List[str]] = None) -> Dict[str, Any]:",
    "purpose": "Đọc tệp cache JSONL từng dòng một, xác thực tính hợp lệ và độ đầy đủ khía cạnh (required_aspects) để khôi phục tiến độ trước đó.",
    "flow": [
      "Nếu file chưa tồn tại trả dict rỗng {}.",
      "Đọc từng dòng JSONL; parse JSON, lấy review_id/id, language (lower), overall_sentiment và dict aspects.",
      "Chỉ giữ bản ghi hợp lệ đã có đủ mọi khía cạnh trong required_aspects; bỏ qua dòng hỏng JSON."
    ],
    "input": "cache_path (Path), required_aspects (Optional[List[str]])",
    "output": "Dict[str, Any] ánh xạ review_id -> bản ghi kết quả đã cache.",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: all, exists, get, isinstance, loads, lower, open, str, strip"
    ],
    "example": "cache = load_cache(Path(\"data/processed/llm_cache.jsonl\"), [\"location\", ...]) -> len=1000",
    "usage": "Gọi trong main() của src/llm.py trước cả process_pending_reviews() và export_cache_to_csv().",
    "potentialBugs": [
      "Nếu có 2 dòng trùng review_id trong tệp append-only JSONL, dòng đọc sau sẽ ghi đè bản ghi cũ trong dict `cache`."
    ],
    "viva": [
      {
        "q": "Nếu YAML bổ sung thêm khía cạnh thứ 8, load_cache() phản ứng ra sao?",
        "a": "Do has_aspects kiểm tra all(a in aspects for a in required_aspects), các bản ghi cũ thiếu trường thứ 8 sẽ bị loại khỏi cache để gọi bổ sung."
      }
    ],
    "code": "def load_cache(cache_path: Path, required_aspects: Optional[List[str]] = None) -> Dict[str, Any]:\n    \"\"\"Đọc cache JSONL để kiểm tra các review đã được xử lý (tránh gọi API lặp).\"\"\"\n    if not cache_path.exists():\n        return {}\n    cache = {}\n    with cache_path.open(\"r\", encoding=\"utf-8\") as f:\n        for line in f:\n            line_str = line.strip()\n            if not line_str:\n                continue\n            try:\n                rec = json.loads(line_str)\n                r_id = str(rec.get(\"review_id\", rec.get(\"id\", \"\"))).strip()\n                lang = str(rec.get(\"language\") or \"\").strip().lower()\n                aspects_dict = rec.get(\"aspects\")\n                has_aspects = not required_aspects or (isinstance(aspects_dict, dict) and all(a in aspects_dict for a in required_aspects))\n                if r_id and lang and rec.get(\"overall_sentiment\") and isinstance(aspects_dict, dict) and has_aspects:\n                    rec[\"language\"] = lang\n                    cache[r_id] = rec\n            except (json.JSONDecodeError, TypeError):\n                continue\n    return cache"
  },
  {
    "id": "llm-save-to-cache",
    "file": "src/llm.py",
    "name": "save_to_cache",
    "kind": "function",
    "lineStart": 116,
    "lineEnd": 120,
    "signature": "def save_to_cache(cache_path: Path, record: Dict[str, Any]) -> None:",
    "purpose": "Ghi nối thêm (append-only) ngay lập tức 1 bản ghi kết quả review vừa phân tích thành công xuống tệp JSONL.",
    "flow": [
      "Tạo thư mục cha nếu cần.",
      "Mở file ở chế độ \"a\" UTF-8 và ghi json.dumps(record, ensure_ascii=False) + \"\\n\"."
    ],
    "input": "cache_path (Path), record (Dict)",
    "output": "None; side-effect ghi thêm 1 dòng JSONL xuống đĩa.",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: dumps, mkdir, open, write"
    ],
    "example": "save_to_cache(Path(\"data/processed/llm_cache.jsonl\"), rec)",
    "usage": "Gọi ngay sau mỗi review hợp lệ trong process_pending_reviews().",
    "potentialBugs": [
      "Không nên vừa chạy 2 tiến trình ghi vào cùng tệp JSONL cùng lúc (có thể xen kẽ byte)."
    ],
    "viva": [
      {
        "q": "Tại sao lưu JSONL từng dòng ngay sau mỗi lô thay vì đợi xong 1.000 câu mới lưu một file CSV?",
        "a": "Nếu bị ngắt mạng hoặc cạn quota RPD ở câu thứ 800, 795 câu trước vẫn an toàn trên đĩa."
      }
    ],
    "code": "def save_to_cache(cache_path: Path, record: Dict[str, Any]) -> None:\n    \"\"\"Ghi thêm 1 bản ghi vào cache JSONL (không lưu summary/timestamp để tối ưu).\"\"\"\n    cache_path.parent.mkdir(parents=True, exist_ok=True)\n    with cache_path.open(\"a\", encoding=\"utf-8\") as f:\n        f.write(json.dumps(record, ensure_ascii=False) + \"\\n\")"
  },
  {
    "id": "llm--clean-str",
    "file": "src/llm.py",
    "name": "_clean_str",
    "kind": "function",
    "lineStart": 123,
    "lineEnd": 127,
    "signature": "def _clean_str(val: Any) -> str:",
    "purpose": "Chuyển an toàn giá trị metadata sang chuỗi str, chuyển None/NaN/<NA> thành chuỗi rỗng \"\" thay vì chữ \"nan\".",
    "flow": [
      "Kiểm tra val is None or pd.isna(val) -> trả về \"\"; ngược lại trả str(val)."
    ],
    "input": "val (Any)",
    "output": "str",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: isna, str"
    ],
    "example": "_clean_str(pd.NA) -> \"\" (thay vì \"<NA>\")",
    "usage": "Dùng trong export_cache_to_csv() và process_pending_reviews().",
    "potentialBugs": [
      "Không có; giúp dữ liệu metadata (reviewer_name, comments) sạch khi xuất CSV."
    ],
    "viva": [
      {
        "q": "Lỗi gì xảy ra nếu thay _clean_str(x) bằng str(x) khi reviewer_name bị NaN?",
        "a": "Ô bị thiếu sẽ bị biến thành chuỗi văn bản chữ \"nan\" hoặc \"<NA>\" trong CSV."
      }
    ],
    "code": "def _clean_str(val: Any) -> str:\n    \"\"\"Chuyển giá trị metadata sang chuỗi an toàn, tránh biến NaN/<NA> thành chuỗi 'nan'/'<NA>'.\"\"\"\n    if val is None or pd.isna(val):\n        return \"\"\n    return str(val)"
  },
  {
    "id": "llm-export-cache-to-csv",
    "file": "src/llm.py",
    "name": "export_cache_to_csv",
    "kind": "function",
    "lineStart": 130,
    "lineEnd": 190,
    "signature": "def export_cache_to_csv(",
    "purpose": "Kết hợp bảng reviews_llm.csv với từ điển cache để xuất file phẳng data/processed/reviews_sentiment.csv (15 cột), giữ NaN nếu thiếu.",
    "flow": [
      "Lặp qua từng dòng của reviews_df (giữ đúng thứ tự 1.000 mẫu phân công).",
      "Tra cứu cached = cache.get(r_id). Nếu thiếu -> gán language=None, overall_sentiment=None, aspects={}.",
      "Gom metadata (id, listing_id, date, reviewer_id, reviewer_name, comments) và 7 cột aspect thành dict hàng.",
      "Xuất DataFrame ra output_path (tạo 1.000 dòng × 15 cột) và cảnh báo nếu missing_count > 0."
    ],
    "input": "reviews_df (DataFrame), cache (Dict), output_path (Path), aspect_keys (Optional[List[str]])",
    "output": "Path tới reviews_sentiment.csv đã xuất.",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: DataFrame, _clean_str, append, get, isinstance, iterrows, keys, len, mkdir, print, relative_to, resolve"
    ],
    "example": "export_cache_to_csv(df, cache, Path(\"data/processed/reviews_sentiment.csv\")) -> 1.000 dòng",
    "usage": "Bước cuối trong main() của src/llm.py (chạy cho cả chế độ thường và --skip-llm).",
    "potentialBugs": [
      "Nếu cache không đủ 1.000/1.000 khi chạy --skip-llm, file CSV vẫn xuất đủ 1.000 dòng nhưng có NaN (sẽ bị phạt Coverage ở evaluate.py)."
    ],
    "viva": [
      {
        "q": "Tại sao không tự gán \"positive\" cho các review bị thiếu nhãn khi xuất CSV?",
        "a": "Gán nhãn mặc định làm sai lệch thống kê và gian lận điểm Coverage giả tạo trong Evaluation."
      }
    ],
    "code": "def export_cache_to_csv(\n    reviews_df: pd.DataFrame,\n    cache: Dict[str, Any],\n    output_path: Path,\n    aspect_keys: Optional[List[str]] = None,\n) -> Path:\n    \"\"\"\n    Chuyển đổi kết quả trong cache thành file CSV dạng phẳng (tabular).\n    Các review chưa có trong cache được giữ trống (NaN), tuyệt đối không gán nhãn mặc định.\n    \"\"\"\n    rows = []\n    aspect_keys = [str(a) for a in (aspect_keys or AspectSentiment.model_fields.keys())]\n    missing_count = 0\n\n    for _, r in reviews_df.iterrows():\n        r_id = str(r[\"id\"]).strip()\n        cached = cache.get(r_id)\n\n        if not isinstance(cached, dict):\n            missing_count += 1\n            language = None\n            overall_sentiment = None\n            aspects: Dict[str, Any] = {}\n        else:\n            language = cached.get(\"language\")\n            overall_sentiment = cached.get(\"overall_sentiment\")\n            raw_aspects = cached.get(\"aspects\")\n            aspects = raw_aspects if isinstance(raw_aspects, dict) else {}\n            if not overall_sentiment:\n                missing_count += 1\n\n        row_dict: Dict[str, Any] = {\n            \"id\": r_id,\n            \"listing_id\": _clean_str(r.get(\"listing_id\")) or (_clean_str(cached.get(\"listing_id\")) if isinstance(cached, dict) else \"\"),\n            \"date\": _clean_str(r.get(\"date\")),\n            \"reviewer_id\": _clean_str(r.get(\"reviewer_id\")),\n            \"reviewer_name\": _clean_str(r.get(\"reviewer_name\")),\n            \"comments\": _clean_str(r.get(\"comments\")),\n            \"language\": language,\n            \"overall_sentiment\": overall_sentiment,\n        }\n        for asp in aspect_keys:\n            row_dict[asp] = aspects.get(asp)\n\n        rows.append(row_dict)\n\n    if missing_count > 0:\n        print(\n            f\"[LLM WARN] Có {missing_count}/{len(reviews_df)} review chưa có nhãn trong cache \"\n            \"-> để trống (NaN), không gán nhãn mặc định.\"\n        )\n\n    df_out = pd.DataFrame(rows)\n    output_path.parent.mkdir(parents=True, exist_ok=True)\n    df_out.to_csv(output_path, index=False, encoding=\"utf-8\")\n    try:\n        disp_path = output_path.resolve().relative_to(PROJECT_ROOT)\n    except ValueError:\n        disp_path = output_path\n    print(f\"[LLM] Đã xuất {len(df_out)} bản ghi ra file CSV: {disp_path}\")\n    return output_path"
  },
  {
    "id": "llm-init-client",
    "file": "src/llm.py",
    "name": "init_client",
    "kind": "function",
    "lineStart": 197,
    "lineEnd": 204,
    "signature": "def init_client(api_key: str, timeout_ms: int = 60_000):",
    "purpose": "Khởi tạo đối tượng Gemini API Client (google.genai.Client) kèm cấu hình HTTP timeout (60.000 ms).",
    "flow": [
      "Lazy-import google.genai và types.",
      "Trả về genai.Client(api_key=api_key, http_options=types.HttpOptions(timeout=timeout_ms))."
    ],
    "input": "api_key (str), timeout_ms (int=60_000)",
    "output": "google.genai.Client instance.",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: Client, HttpOptions"
    ],
    "example": "client = init_client(api_key)",
    "usage": "Chỉ được gọi trong main() khi KHÔNG bật --skip-llm và còn pending_count > 0.",
    "potentialBugs": [
      "Nếu mạng treo vô thời hạn khi gọi API mà thiếu timeout_ms, pipeline có thể kẹt mãi."
    ],
    "viva": [
      {
        "q": "Tại sao from google import genai lại import bên trong hàm init_client() thay vì đầu file?",
        "a": "Giúp chạy --skip-llm hoặc import DEFAULT_ASPECTS từ evaluate.py hoàn toàn không cần nạp SDK nặng hoặc khi thiếu API Key."
      }
    ],
    "code": "def init_client(api_key: str, timeout_ms: int = 60_000):\n    \"\"\"Khởi tạo Gemini Client từ google-genai với HTTP timeout (mặc định 60s).\"\"\"\n    from google import genai\n    from google.genai import types\n    return genai.Client(\n        api_key=api_key,\n        http_options=types.HttpOptions(timeout=timeout_ms),\n    )"
  },
  {
    "id": "llm-build-batch-prompt",
    "file": "src/llm.py",
    "name": "build_batch_prompt",
    "kind": "function",
    "lineStart": 207,
    "lineEnd": 219,
    "signature": "def build_batch_prompt(items: List[Dict[str, str]]) -> str:",
    "purpose": "Tạo chuỗi prompt ngắn gọn gồm quy tắc chấm 3 lớp tổng thể + 4 nhãn khía cạnh + mã ngôn ngữ ISO kèm danh sách review của một lô.",
    "flow": [
      "Bọc từng review dưới dạng ID: <id> và Text: \"\"\"<text>\"\"\".",
      "Ghép cùng hướng dẫn phân biệt positive/mixed/negative, cấm suy diễn (not_mentioned), quy ước ISO 639-1/\"und\"."
    ],
    "input": "items (List[Dict[str, str]] chứa id và text)",
    "output": "str (prompt hoàn chỉnh gửi API).",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: chr, join"
    ],
    "example": "build_batch_prompt([{\"id\": \"101\", \"text\": \"Great stay!\"}])",
    "usage": "Gọi cho từng lô trong process_pending_reviews().",
    "potentialBugs": [
      "Bọc văn bản bằng ba dấu nháy \"\"\" giúp hạn chế prompt injection nếu review gốc chứa dấu ngoặc kép hoặc lệnh giả."
    ],
    "viva": [
      {
        "q": "Vì sao định nghĩa lớp mixed trong prompt nhấn mạnh \"khen lẫn góp ý dù nhẹ\"?",
        "a": "Khách Airbnb rất hay viết khen 90% câu và chê nhẹ 10% cuối câu (\"great place, just no hot water\"); nếu không định nghĩa chặt sẽ bị gom nhầm hết vào positive."
      }
    ],
    "code": "def build_batch_prompt(items: List[Dict[str, str]]) -> str:\n    \"\"\"Tạo prompt tinh gọn gửi theo lô (batch) tới Gemini API với quy tắc chấm nhất quán với baseline.\"\"\"\n    reviews_formatted = [f\"ID: {it['id']}\\nText: \\\"\\\"\\\"{it['text']}\\\"\\\"\\\"\" for it in items]\n    return f\"\"\"Bạn là chuyên gia phân tích đánh giá khách hàng Airbnb. Phân tích từng Review và trả về đúng JSON Schema theo quy tắc:\n1. overall_sentiment:\n   - positive: chỉ khen, không có điểm chê/bất tiện nào.\n   - mixed: có cả khen lẫn chê/góp ý bất tiện dù nhẹ (vd: nước nóng chậm, ồn nhẹ, thiếu đồ, nệm cứng, cầu thang...).\n   - negative: chủ yếu chê hoặc lỗi nghiêm trọng áp đảo.\n2. aspects (positive/mixed/negative/not_mentioned): chỉ gán khi câu văn nhắc trực tiếp, không suy diễn; nếu vừa khen vừa chê cùng khía cạnh thì gán mixed\n3. language: mã ISO 639-1 viết thường theo ngôn ngữ chính; \"und\" nếu rỗng, chỉ có emoji/số hoặc không xác định được.\n\n{chr(10).join(reviews_formatted)}\n\"\"\""
  },
  {
    "id": "llm-QuotaExceededException",
    "file": "src/llm.py",
    "name": "QuotaExceededException",
    "kind": "class",
    "lineStart": 222,
    "lineEnd": 223,
    "signature": "class QuotaExceededException(Exception):",
    "purpose": "Lớp ngoại lệ chuyên biệt biểu thị lỗi 429 hết hạn ngạch ngày (RPD) để báo hiệu dừng toàn bộ vòng gọi API.",
    "flow": [
      "Kế thừa trực tiếp Exception làm tín hiệu luồng điều khiển rõ ràng giữa call_llm_batch và process_pending_reviews."
    ],
    "input": "Exception message string",
    "output": "Exception class",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)"
    ],
    "example": "raise QuotaExceededException(\"Hạn ngạch ngày đã cạn\")",
    "usage": "Phát ra trong call_llm_batch() và bắt tại process_pending_reviews().",
    "potentialBugs": [
      "Nếu dùng nhầm Exception chung chung, caller không phân biệt được lỗi hết quota ngày với lỗi 1 batch đơn lẻ."
    ],
    "viva": [
      {
        "q": "Tạo class QuotaExceededException riêng để làm gì?",
        "a": "Để phân tách hẳn lỗi RPD (dừng ngay toàn bộ các lô sau) với lỗi RPM/mạng (chỉ thử lại chính lô đó)."
      }
    ],
    "code": "class QuotaExceededException(Exception):\n    \"\"\"Ném ra khi Gemini API trả về lỗi 429 RESOURCE_EXHAUSTED (chạm trần hạn ngạch ngày).\"\"\""
  },
  {
    "id": "llm--classify-rate-limit-error",
    "file": "src/llm.py",
    "name": "_classify_rate_limit_error",
    "kind": "function",
    "lineStart": 226,
    "lineEnd": 251,
    "signature": "def _classify_rate_limit_error(err: Exception) -> Optional[str]:",
    "purpose": "Phân tích đối tượng ngoại lệ từ SDK để phân loại: \"daily\" (hết RPD), \"rate\" (quá tốc độ RPM/TPM tạm thời), hoặc None (lỗi khác).",
    "flow": [
      "Trích xuất code, status, details và chuỗi mô tả err.",
      "Kiểm tra xem có phải 429 / RESOURCE_EXHAUSTED không; nếu không trả về None.",
      "Nếu chuỗi thường chứa \"perday\", \"per_day\", \"requestsperday\" hoặc \"daily\" -> trả \"daily\"; ngược lại trả \"rate\"."
    ],
    "input": "err (Exception)",
    "output": "Optional[str] (\"daily\" | \"rate\" | None).",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: any, getattr, lower, lstrip, startswith, str, upper"
    ],
    "example": "_classify_rate_limit_error(Exception(\"429 RESOURCE_EXHAUSTED: RequestsPerMinute\")) -> \"rate\"",
    "usage": "Gọi bên trong except Exception của call_llm_batch().",
    "potentialBugs": [
      "Phụ thuộc từ khóa trong thông báo lỗi của Google SDK nếu Google thay đổi wording cho quota ngày."
    ],
    "viva": [
      {
        "q": "Nếu API trả về lỗi 503 Service Unavailable thì _classify_rate_limit_error trả về gì?",
        "a": "Trả về None, nhờ vậy call_llm_batch đi vào nhánh delays = [5, 15, 30, 60]s thay vì chờ cooldown RPM."
      }
    ],
    "code": "def _classify_rate_limit_error(err: Exception) -> Optional[str]:\n    \"\"\"\n    Phân loại lỗi 429 từ Gemini API:\n    - Trả về 'daily' nếu hết hạn ngạch ngày (RPD).\n    - Trả về 'rate' nếu chỉ quá tốc độ theo phút (RPM/TPM).\n    - Trả về None nếu không phải lỗi 429 / RESOURCE_EXHAUSTED.\n    \"\"\"\n    code = getattr(err, \"code\", None)\n    status = str(getattr(err, \"status\", \"\") or \"\").upper()\n    details_str = str(getattr(err, \"details\", \"\") or \"\")\n    err_str = f\"{err} {details_str}\"\n    lower_err = err_str.lower()\n\n    is_429 = (\n        code == 429\n        or status == \"RESOURCE_EXHAUSTED\"\n        or \"RESOURCE_EXHAUSTED\" in err_str\n        or str(err).lstrip().startswith(\"429\")\n    )\n    if not is_429:\n        return None\n\n    daily_markers = (\"perday\", \"per_day\", \"requestsperday\", \"daily\")\n    if any(marker in lower_err for marker in daily_markers):\n        return \"daily\"\n    return \"rate\""
  },
  {
    "id": "llm-call-llm-batch",
    "file": "src/llm.py",
    "name": "call_llm_batch",
    "kind": "function",
    "lineStart": 254,
    "lineEnd": 296,
    "signature": "def call_llm_batch(",
    "purpose": "Gọi Gemini API cho 1 lô review với Pydantic Structured Outputs, parse JSON và validate từng phần tử kèm cơ chế thử lại thông minh.",
    "flow": [
      "Gọi client.models.generate_content() với response_mime_type=\"application/json\" và response_schema=list[review_model].",
      "Kiểm tra phản hồi khác rỗng, parse json.loads(resp.text) và chạy review_model.model_validate(item).model_dump().",
      "Nếu gặp exception: kiểm tra _classify_rate_limit_error() -> \"daily\" ném QuotaExceededException; \"rate\" ngủ min(60, 20*(attempt+1))s; lỗi khác ngủ [5,15,30,60]s."
    ],
    "input": "client, prompt (str), model_name (str), max_retries (int=5), review_model",
    "output": "Optional[List[Dict[str, Any]]] (None nếu hỏng sau 5 lần thử).",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: QuotaExceededException, ValueError, _classify_rate_limit_error, generate_content, len, loads, min, model_dump, model_validate, print, range, sleep"
    ],
    "example": "results = call_llm_batch(client, prompt, \"gemini-3.5-flash-lite\", review_model=rev_m)",
    "usage": "Được process_pending_reviews() gọi cho mỗi lô.",
    "potentialBugs": [
      "Nếu batch_size quá lớn, mô hình có thể sinh JSON dài vượt max output tokens dẫn tới JSON bị cắt cụt (JSONDecodeError -> retry và được tách nhỏ ở vòng 2)."
    ],
    "viva": [
      {
        "q": "Nếu 1 lô gồm 5 câu nhưng model chỉ trả về 4 câu hợp lệ trong JSON thì code xử lý câu thiếu thế nào?",
        "a": "4 câu hợp lệ vẫn được lưu vào cache ngay; 1 câu thiếu bị ghi nhận missing_in_batch và tự động gửi bù ở 2 vòng sau (vòng cuối tách lẻ batch_size=1)."
      }
    ],
    "code": "def call_llm_batch(\n    client,\n    prompt: str,\n    model_name: str,\n    max_retries: int = 5,\n    review_model=ReviewAnalysis,\n) -> Optional[List[Dict[str, Any]]]:\n    \"\"\"\n    Gọi Gemini API cho 1 lô review với mô hình chỉ định (sử dụng Pydantic Structured Outputs).\n    - 429 hết quota ngày (RPD) -> ném QuotaExceededException để dừng sớm.\n    - 429 quá tốc độ theo phút (RPM/TPM) -> chờ cooldown tăng dần rồi thử lại cùng model.\n    - 503 / lỗi mạng / phản hồi rỗng hoặc JSON lỗi -> retry với backoff [5, 15, 30, 60]s.\n    \"\"\"\n    delays = [5, 15, 30, 60]\n    for attempt in range(max_retries):\n        try:\n            resp = client.models.generate_content(\n                model=model_name,\n                contents=prompt,\n                config={\n                    \"response_mime_type\": \"application/json\",\n                    \"response_schema\": list[review_model],\n                }\n            )\n            if not resp.text:\n                raise ValueError(\"API trả về phản hồi rỗng (resp.text is empty)\")\n            raw_items = json.loads(resp.text)\n            return [review_model.model_validate(item).model_dump() for item in raw_items]\n        except Exception as e:\n            rate_kind = _classify_rate_limit_error(e)\n            if rate_kind == \"daily\":\n                raise QuotaExceededException(f\"Hạn ngạch ngày của {model_name} đã cạn: {e}\")\n            if attempt < max_retries - 1:\n                if rate_kind == \"rate\":\n                    cooldown = min(60, 20 * (attempt + 1))\n                    print(f\"\\n[WARN] Chạm giới hạn tốc độ tạm thời ({model_name}), chờ {cooldown}s rồi thử lại...\")\n                    time.sleep(cooldown)\n                else:\n                    wait_time = delays[attempt] if attempt < len(delays) else delays[-1]\n                    time.sleep(wait_time)\n            else:\n                print(f\"\\n[WARN] Lỗi API ({model_name}) sau {max_retries} lần thử: {e}\")\n    return None"
  },
  {
    "id": "llm-process-pending-reviews",
    "file": "src/llm.py",
    "name": "process_pending_reviews",
    "kind": "function",
    "lineStart": 303,
    "lineEnd": 385,
    "signature": "def process_pending_reviews(",
    "purpose": "Điều phối vòng chạy chính (batch_size=5) kèm tự kiểm tra tối đa 2 vòng chạy bù (vòng cuối hạ xuống batch_size=1) và lưu cache tức thời.",
    "flow": [
      "Lặp qua pass_plan: lượt chính (batch_size=5), bù vòng 1 (batch_size=5), bù vòng 2 (batch_size=1).",
      "Mỗi vòng lọc pending_rows (ID chưa có trong cache); dừng ngay nếu rỗng hoặc quota_exhausted=True.",
      "Chia pending_rows thành batches, tạo prompt và gọi call_llm_batch().",
      "Ánh xạ theo id, kiểm tra đủ trường, lưu ngay save_to_cache() + cập nhật dict cache, giãn cách time.sleep(1.0) giữa các request."
    ],
    "input": "client, reviews_df, cache, cache_path, model_name, review_model, batch_size=5, retry_cooldown=15",
    "output": "int (số review mới xử lý thành công trong phiên).",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: _clean_str, build_batch_prompt, call_llm_batch, enumerate, get, isinstance, iterrows, len, lower, print, range, save_to_cache"
    ],
    "example": "added = process_pending_reviews(client, df, cache, cache_path, \"gemini-3.5-flash-lite\", rev_m)",
    "usage": "Được main() gọi khi cache chưa đủ và không bật --skip-llm.",
    "potentialBugs": [
      "Dùng reviews_df.iterrows() nhưng hoàn toàn chấp nhận được vì số lượng review LLM chỉ là 1.000 câu (chi phí API 1s/lô lấn át hoàn toàn tốc độ Pandas)."
    ],
    "viva": [
      {
        "q": "Tại sao vòng chạy bù thứ 2 hạ batch_size xuống còn 1?",
        "a": "Nếu 1 câu review quá dài hoặc chứa ký tự lạ làm hỏng JSON cả lô 5 câu, tách lẻ thành batch_size=1 giúp cô lập đúng câu đó và cứu 4 câu còn lại."
      }
    ],
    "code": "def process_pending_reviews(\n    client,\n    reviews_df: pd.DataFrame,\n    cache: Dict[str, Any],\n    cache_path: Path,\n    model_name: str,\n    review_model,\n    batch_size: int = 5,\n    retry_cooldown: int = 15,\n) -> int:\n    \"\"\"Chạy lượt chính rồi tự kiểm tra và chạy bù tối đa 2 vòng (vòng cuối tách lẻ batch_size=1).\"\"\"\n    pass_plan = [\n        (batch_size, \"Xử lý lô review\"),\n        (batch_size, \"Chạy bù vòng 1\"),\n        (1, \"Chạy bù vòng 2 (tách lẻ)\"),\n    ]\n    new_count = 0\n    quota_exhausted = False\n\n    for pass_idx, (cur_batch_size, desc) in enumerate(pass_plan):\n        pending_rows = [\n            row for _, row in reviews_df.iterrows()\n            if str(row[\"id\"]).strip() not in cache\n        ]\n        if not pending_rows or quota_exhausted:\n            break\n\n        if pass_idx == 0:\n            print(f\"[LLM] Đang gửi {len(pending_rows)} review còn thiếu tới API...\")\n        else:\n            print(f\"\\n[LLM] Tự kiểm tra: còn thiếu {len(pending_rows)} review -> chờ {retry_cooldown}s rồi {desc.lower()} (batch_size={cur_batch_size})...\")\n            time.sleep(retry_cooldown)\n\n        batches = [pending_rows[i:i + cur_batch_size] for i in range(0, len(pending_rows), cur_batch_size)]\n        for batch in tqdm(batches, desc=desc):\n            items = [{\"id\": str(r[\"id\"]).strip(), \"text\": str(r[\"comments\"]).strip()} for r in batch]\n            prompt = build_batch_prompt(items)\n\n            try:\n                results = call_llm_batch(client, prompt, model_name=model_name, review_model=review_model)\n            except QuotaExceededException as qe:\n                print(f\"\\n[ERROR] Mô hình '{model_name}' đã hết hạn ngạch ngày: {qe}\")\n                quota_exhausted = True\n                break\n\n            res_by_id = {str(item[\"id\"]).strip(): item for item in (results or []) if \"id\" in item}\n            missing_in_batch = 0\n\n            for row in batch:\n                r_id = str(row[\"id\"]).strip()\n                if r_id in res_by_id:\n                    res = res_by_id[r_id]\n                    language = str(res.get(\"language\") or \"\").strip().lower()\n                    overall_sentiment = str(res.get(\"overall_sentiment\") or \"\").strip().lower()\n                    res_aspects = res.get(\"aspects\")\n                    if not language or not overall_sentiment or not isinstance(res_aspects, dict):\n                        missing_in_batch += 1\n                        continue\n                    rec = {\n                        \"review_id\": r_id,\n                        \"listing_id\": _clean_str(row.get(\"listing_id\")),\n                        \"language\": language,\n                        \"overall_sentiment\": overall_sentiment,\n                        \"aspects\": res_aspects,\n                    }\n                    save_to_cache(cache_path, rec)\n                    cache[r_id] = rec\n                    new_count += 1\n                else:\n                    missing_in_batch += 1\n\n            if missing_in_batch > 0:\n                print(f\"\\n[LLM WARN] Lô hiện tại có {missing_in_batch} review không có kết quả hợp lệ từ API (bỏ qua, sẽ tự kiểm tra chạy bù sau).\")\n\n            time.sleep(1.0)  # Giãn cách 1 giây giữa các request\n\n    remaining = sum(1 for _, row in reviews_df.iterrows() if str(row[\"id\"]).strip() not in cache)\n    total = len(reviews_df)\n    if remaining == 0:\n        print(f\"\\n[LLM] Tự kiểm tra cuối: ĐỦ {total}/{total} review trong cache.\")\n    else:\n        print(f\"\\n[LLM WARN] Tự kiểm tra cuối: vẫn còn thiếu {remaining}/{total} review trong cache.\")\n    return new_count"
  },
  {
    "id": "llm-main",
    "file": "src/llm.py",
    "name": "main",
    "kind": "function",
    "lineStart": 388,
    "lineEnd": 451,
    "signature": "def main():",
    "purpose": "Điểm vào CLI cho bước LLM: nạp .env + YAML, kiểm cache, quyết định gọi API hoặc chạy offline với --skip-llm, và xuất reviews_sentiment.csv.",
    "flow": [
      "Nạp .env (dotenv) và YAML config; trích model, batch_size, aspects, cache_path, output_csv.",
      "Gọi build_schemas(aspects) dựng schema động và load_assigned_reviews() đọc 1.000 mẫu.",
      "Nạp cache JSONL hiện có; tính pending_count = số review còn thiếu.",
      "Nếu --skip-llm hoặc pending_count == 0 -> bỏ qua init_client() (không cần GEMINI_API_KEY!).",
      "Ngược lại kiểm tra GEMINI_API_KEY -> khởi tạo client -> chạy process_pending_reviews(). Cuối cùng gọi export_cache_to_csv()."
    ],
    "input": "CLI args (--config, --skip-llm)",
    "output": "Cập nhật llm_cache.jsonl (nếu chạy online) và xuất data/processed/reviews_sentiment.csv.",
    "libraries": [
      "os",
      "sys",
      "json",
      "time",
      "argparse",
      "pathlib (Path)",
      "typing (List, Dict, Any, Optional, Literal)",
      "pandas",
      "yaml",
      "dotenv (load_dotenv)",
      "pydantic (Field, create_model)",
      "tqdm (tqdm)",
      "Gọi hàm: ArgumentParser, Path, add_argument, build_schemas, exit, export_cache_to_csv, get, init_client, int, is_absolute, is_relative_to, iterrows"
    ],
    "example": "python src/llm.py --config configs/mexico-city.yaml --skip-llm",
    "usage": "Chặng 4 của STEPS trong run_pipeline.py.",
    "potentialBugs": [
      "Nếu --skip-llm được bật khi cache chưa đủ 1.000 dòng, export_cache_to_csv() sẽ xuất bảng có dòng NaN và in cảnh báo."
    ],
    "viva": [
      {
        "q": "Điều kiện nào khiến src/llm.py KHÔNG đòi hỏi GEMINI_API_KEY ngay cả khi không truyền --skip-llm?",
        "a": "Khi cache đã có đủ 1.000/1.000 bản ghi hợp lệ (`pending_count == 0`), điều kiện `if args.skip_llm:` hoặc `elif pending_count == 0:` bỏ qua bước kiểm API Key."
      }
    ],
    "code": "def main():\n    parser = argparse.ArgumentParser(description=\"LLM Sentiment & ABSA Analysis (Gemini + Pydantic Schema)\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    parser.add_argument(\"--skip-llm\", action=\"store_true\", help=\"Bỏ qua gọi API, dùng cache có sẵn\")\n    args = parser.parse_args()\n\n    print(\"=\" * 65)\n    print(\"[LLM] BẮT ĐẦU QUY TRÌNH PHÂN TÍCH ĐÁNH GIÁ (GEMINI API)\")\n    print(\"=\" * 65)\n\n    load_dotenv(PROJECT_ROOT / \".env\")\n    config = load_config(args.config)\n    llm_cfg = config.get(\"llm\", {})\n    model_name = llm_cfg.get(\"model\", \"gemini-3.5-flash-lite\")\n    aspects = [str(a).strip() for a in llm_cfg.get(\"aspects\", DEFAULT_ASPECTS) if str(a).strip()] or DEFAULT_ASPECTS\n    _, review_model = build_schemas(aspects)\n    batch_size = max(1, int(llm_cfg.get(\"batch_size\", 5)))\n\n    cache_cfg = Path(llm_cfg.get(\"cache\", \"data/processed/llm_cache.jsonl\"))\n    cache_path = cache_cfg if cache_cfg.is_absolute() else PROJECT_ROOT / cache_cfg\n    out_cfg = Path(llm_cfg.get(\"output_csv\", \"data/processed/reviews_sentiment.csv\"))\n    csv_output_path = out_cfg if out_cfg.is_absolute() else PROJECT_ROOT / out_cfg\n\n    # 1. Nạp danh sách review từ processed\n    reviews_df = load_assigned_reviews(config)\n    total_assigned = len(reviews_df)\n\n    # 2. Đọc cache JSONL (chỉ giữ bản ghi đã đủ mọi aspect trong config)\n    cache = load_cache(cache_path, required_aspects=aspects)\n    cache_disp = cache_path.relative_to(PROJECT_ROOT) if cache_path.is_relative_to(PROJECT_ROOT) else cache_path\n    print(f\"[LLM] Đã nạp {len(cache)} bản ghi từ cache ({cache_disp}).\")\n\n    # 3. Lọc chính xác các review chưa có trong cache\n    pending_rows = [\n        row for _, row in reviews_df.iterrows()\n        if str(row[\"id\"]).strip() not in cache\n    ]\n    print(f\"[LLM] Tổng mẫu phân công: {total_assigned} | Đã có: {total_assigned - len(pending_rows)} | Cần gửi API: {len(pending_rows)}\")\n\n    # 4. Nếu bật cờ --skip-llm hoặc đã đủ cache thì bỏ qua gọi API\n    if args.skip_llm or not pending_rows:\n        print(\"[LLM] Bật cờ --skip-llm.\" if args.skip_llm else \"[LLM] 100% đánh giá đã có đầy đủ trong cache! Không cần gọi API thêm.\")\n    else:\n        # 5. Kiểm tra API Key khi thực sự cần gọi bổ sung\n        api_key = os.environ.get(\"GEMINI_API_KEY\")\n        if not api_key:\n            sys.exit(\"[ERROR] Thiếu GEMINI_API_KEY trong .env hoặc biến môi trường!\")\n\n        client = init_client(api_key=api_key)\n        print(f\"[LLM] Mô hình sử dụng: '{model_name}' | batch_size={batch_size}\")\n        new_count = process_pending_reviews(\n            client,\n            reviews_df,\n            cache,\n            cache_path,\n            model_name=model_name,\n            review_model=review_model,\n            batch_size=batch_size,\n        )\n        print(f\"[LLM] Đã bổ sung thành công {new_count} review vào cache. Tổng cache: {len(cache)}/{total_assigned}\")\n\n    # 6. Xuất toàn bộ cache ra CSV bảng biểu chuẩn & ước tính chi phí API theo model\n    export_cache_to_csv(reviews_df, cache, csv_output_path, aspect_keys=aspects)\n    print(\"=\" * 65)"
  },
  {
    "id": "qa-load-config",
    "file": "src/qa.py",
    "name": "load_config",
    "kind": "function",
    "lineStart": 22,
    "lineEnd": 35,
    "signature": "def load_config(config_path_str: str | None = None) -> Dict[str, Any]:",
    "purpose": "Nạp tệp cấu hình YAML cho bước QA theo thứ tự CLI -> PIPELINE_CONFIG -> configs/mexico-city.yaml.",
    "flow": [
      "Kiểm tra đường dẫn tương đối/tuyệt đối, ném FileNotFoundError nếu thiếu, trả dict YAML."
    ],
    "input": "config_path_str (str | None)",
    "output": "Dict[str, Any]",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: FileNotFoundError, Path, get, is_absolute, is_file, open, safe_load"
    ],
    "example": "cfg = load_config(\"configs/mexico-city.yaml\")",
    "usage": "Được main() của src/qa.py gọi để lấy snapshots, currency, qa.dedupe_keys và qa.price_outlier_quantiles.",
    "potentialBugs": [
      "Nếu file YAML rỗng hoàn toàn, yaml.safe_load() trả về None thay vì dict rỗng."
    ],
    "viva": [
      {
        "q": "Các tham số nào trong YAML điều khiển hành vi của src/qa.py?",
        "a": "snapshots, currency (tạo tên cột price_mxn), qa.dedupe_keys ([id, last_scraped]), và qa.price_outlier_quantiles ([0.01, 0.99])."
      }
    ],
    "code": "def load_config(config_path_str: str | None = None) -> Dict[str, Any]:\n    \"\"\"Nạp cấu hình YAML từ CLI, biến môi trường PIPELINE_CONFIG hoặc mặc định.\"\"\"\n    cfg_target = config_path_str or os.environ.get(\"PIPELINE_CONFIG\", \"configs/mexico-city.yaml\")\n    cfg_path = Path(cfg_target)\n    if not cfg_path.is_absolute():\n        cfg_path = PROJECT_ROOT / cfg_path\n\n    if not cfg_path.is_file():\n        raise FileNotFoundError(f\"[QA] Không tìm thấy file cấu hình: {cfg_path}\")\n\n    with cfg_path.open(encoding=\"utf-8\") as f:\n        config = yaml.safe_load(f)\n\n    return config"
  },
  {
    "id": "qa-apply-qa-rules",
    "file": "src/qa.py",
    "name": "apply_qa_rules",
    "kind": "function",
    "lineStart": 42,
    "lineEnd": 311,
    "signature": "def apply_qa_rules(",
    "purpose": "Áp dụng tuần tự 8 quy tắc QA trên một snapshot listings DataFrame theo triết lý Gắn cờ (Flagging) & Bảo toàn NaN, ghi nhận tác động vào 8 bản ghi qa_records.",
    "flow": [
      "RULE 1 (DEDUPLICATION): Khử bản trùng lặp thật theo subset [id, last_scraped] giữ bản đầu tiên.",
      "RULE 2 & 3 (PRICE_PARSE & MISSING_PRICE): Xóa ký tự tiền tệ bằng Regex r\"[^\\d.-]\", ép số pd.to_numeric(errors=\"coerce\"), gắn cờ qa_missing_price cho NaN/<=0.",
      "RULE 4 (PRICE_OUTLIER): Nếu valid_p khác rỗng, tính P01–P99 và gắn cờ qa_price_outlier (không xóa, không sửa giá trị).",
      "RULE 5 (ACCOMMODATES_BOUNDS): Kiểm tra > 0, xuất accommodates_clean kiểu Int64 giữ <NA>.",
      "RULE 6 (AVAILABILITY_BOUNDS): Kiểm tra miền [0,30/90/365] và a90 >= a30, a365 >= a90 -> xuất *_clean (Int64).",
      "RULE 7 & 8 (REVIEWS_BOUNDS & LAST_REVIEW_VALIDITY): Kiểm tra nguyên không âm và last_review <= last_scraped (bỏ qua NaN hợp lệ của căn 0 review)."
    ],
    "input": "df (pd.DataFrame), snapshot (str), config (Dict)",
    "output": "Tuple (df_cleaned: pd.DataFrame, qa_records: List[Dict]) gồm 8 bản ghi thống kê.",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: Series, append, astype, copy, duplicated, eq, fillna, float, get, int, isin, isna"
    ],
    "example": "cleaned, recs = apply_qa_rules(raw_df, \"2025-12-29\", cfg) -> recs[2][\"rows_affected\"] = 1000 (thiếu giá).",
    "usage": "Hàm trung tâm của src/qa.py, chạy lặp cho cả 4 mốc snapshot để tạo 32 dòng trong qa_report.csv.",
    "potentialBugs": [
      "RULE 5 & 6 chưa kiểm tra phần thập phân (% 1 != 0) trước khi ép .astype(\"Int64\") như RULE 7 (nếu có số 2.5 khách sẽ gây TypeError/ValueError).",
      "Regex r\"[^\\d.-]\" sẽ sai 1.000 lần nếu chạy sang thành phố châu Âu dùng dấu phẩy thập phân.",
      "Không kiểm tra mâu thuẫn chéo number_of_reviews > 0 mà last_review = NaN."
    ],
    "viva": [
      {
        "q": "Tại sao ở t2 (2025-12-29), qa_report.csv vẫn đủ 8 dòng dù giá thiếu 100%?",
        "a": "Vì code ghi nhận cả các rule có rows_affected=0 và nhánh if not valid_p.empty bỏ qua an toàn việc tính P01–P99 nhưng vẫn append dòng RULE_PRICE_OUTLIER với N/A."
      },
      {
        "q": "Tại sao RULE 4 ghi kpi_before == kpi_after cho Mean Price?",
        "a": "Vì nhóm chủ trương chỉ gắn cờ qa_price_outlier chứ giữ nguyên giá trị để phản ánh đúng đuôi phải đầu cơ trên thị trường."
      }
    ],
    "code": "def apply_qa_rules(\n    df: pd.DataFrame,\n    snapshot: str,\n    config: Dict[str, Any]\n) -> Tuple[pd.DataFrame, List[Dict[str, Any]]]:\n    \"\"\"\n    Thực hiện 8 quy tắc QA chuẩn mực (Type, Missing, Outliers, Bounds, Duplicates, Date Validity).\n    Áp dụng nguyên tắc: ƯU TIÊN GẮN CỜ (Flagging) để bảo tồn dữ liệu gốc,\n    chỉ loại trừ / điền giá trị cho các cột bắt buộc khi tính toán downstream.\n    \"\"\"\n    qa_cfg = config.get(\"qa\", {})\n    dedupe_keys = qa_cfg.get(\"dedupe_keys\", [\"id\", \"last_scraped\"])\n    cur = str(config.get(\"currency\", \"MXN\")).strip().upper()\n    price_col = f\"price_{cur.lower()}\"\n    q_low, q_high = qa_cfg.get(\"price_outlier_quantiles\", [0.01, 0.99])\n\n    df = df.copy()\n    if \"id\" in df.columns:\n        df[\"id\"] = df[\"id\"].astype(\"string\").str.strip()\n    qa_records: List[Dict[str, Any]] = []\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 1: RULE_DEDUPLICATION (Kiểm tra trùng lặp bản ghi)\n    # --------------------------------------------------------------------------\n    available_dedupe = [k for k in dedupe_keys if k in df.columns]\n    dup_mask = df.duplicated(subset=available_dedupe, keep=\"first\") if available_dedupe else pd.Series(False, index=df.index)\n    num_dups = int(dup_mask.sum())\n    qa_records.append({\n        \"rule_id\": \"RULE_DEDUPLICATION\",\n        \"rule_name\": \"Kiểm tra và khử trùng lặp bản ghi trong cùng mốc\",\n        \"target_column\": \", \".join(str(k) for k in dedupe_keys),\n        \"condition\": \"duplicated(subset=dedupe_keys)\",\n        \"reason\": \"Tránh đếm lặp 1 căn hộ gây sai lệch tổng cung và phân bố\",\n        \"action\": \"Giữ lại bản ghi đầu tiên, loại bỏ bản ghi trùng\",\n        \"snapshot\": snapshot,\n        \"rows_affected\": num_dups,\n        \"kpi_affected\": \"Total Listings\",\n        \"kpi_before\": len(df),\n        \"kpi_after\": len(df) - num_dups,\n    })\n    if num_dups > 0:\n        df = df.loc[~dup_mask].copy()\n\n    n_rows = len(df)\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 2: RULE_PRICE_PARSE (Chuẩn hóa kiểu dữ liệu cột giá)\n    # --------------------------------------------------------------------------\n    price_series = df[\"price\"] if \"price\" in df.columns else pd.Series(pd.NA, index=df.index)\n    price_raw = price_series.astype(\"string\").str.strip()\n    raw_numeric = pd.to_numeric(price_raw, errors=\"coerce\")\n    price_numeric = pd.to_numeric(price_raw.str.replace(r\"[^\\d.-]\", \"\", regex=True), errors=\"coerce\")\n    before_ok = raw_numeric.notna()\n    after_ok = price_numeric.notna()\n    rows_parsed = int((after_ok & ~before_ok).sum())\n\n    # KPI ảnh hưởng: Tỷ lệ bản ghi có giá ép kiểu số thành công (không gộp ô NaN vào before)\n    qa_records.append({\n        \"rule_id\": \"RULE_PRICE_PARSE\",\n        \"rule_name\": \"Chuẩn hóa chuỗi giá tiền tệ sang số thực (Float)\",\n        \"target_column\": \"price\",\n        \"condition\": \"price contains [$,\\\\s] & parseable to float\",\n        \"reason\": \"Dữ liệu Inside Airbnb lưu giá dạng chuỗi '$1,250.00', cần ép kiểu để tính toán\",\n        \"action\": f\"Xóa ký tự $, dấu phẩy và ép kiểu sang float ({price_col})\",\n        \"snapshot\": snapshot,\n        \"rows_affected\": rows_parsed,\n        \"kpi_affected\": \"Parseable Price Rate (%)\",\n        \"kpi_before\": f\"{((before_ok.sum() / n_rows) * 100) if n_rows else 0.0:.1f}%\",\n        \"kpi_after\": f\"{((after_ok.sum() / n_rows) * 100) if n_rows else 0.0:.1f}%\",\n    })\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 3: RULE_MISSING_PRICE (Xử lý ô thiếu giá, giá không hợp lệ)\n    # --------------------------------------------------------------------------\n    missing_price_mask = price_numeric.isna() | (price_numeric <= 0)\n    num_missing_price = int(missing_price_mask.sum())\n    df[\"qa_missing_price\"] = missing_price_mask\n\n    qa_records.append({\n        \"rule_id\": \"RULE_MISSING_PRICE\",\n        \"rule_name\": \"Gắn cờ các bản ghi khuyết thiếu giá hoặc giá <= 0\",\n        \"target_column\": \"price\",\n        \"condition\": \"price.isna() | price <= 0\",\n        \"reason\": \"Không có giá hoặc giá không hợp lệ sẽ làm sai các tính toán tài chính\",\n        \"action\": \"Gắn cờ qa_missing_price = True; loại trừ khỏi mẫu khi tính KPI tài chính\",\n        \"snapshot\": snapshot,\n        \"rows_affected\": num_missing_price,\n        \"kpi_affected\": \"Valid Price Listings Count\",\n        \"kpi_before\": n_rows,\n        \"kpi_after\": n_rows - num_missing_price,\n    })\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 4: RULE_PRICE_OUTLIER (Xử lý ngoại lai giá)\n    # --------------------------------------------------------------------------\n    df[\"qa_price_outlier\"] = False\n    valid_p = price_numeric.loc[~missing_price_mask]\n    if not valid_p.empty:\n        p_high = valid_p.quantile(q_high)\n        p_low = valid_p.quantile(q_low)\n\n        # Ngoại lai nếu nằm ngoài khoảng [q_low, q_high]; giữ nguyên trong tính toán KPI\n        outlier_mask = (~missing_price_mask) & ((price_numeric > p_high) | (price_numeric < p_low))\n        df[\"qa_price_outlier\"] = outlier_mask\n        num_outliers = int(outlier_mask.sum())\n        price_mean = float(valid_p.mean())\n\n        qa_records.append({\n            \"rule_id\": \"RULE_PRICE_OUTLIER\",\n            \"rule_name\": \"Phát hiện và gắn cờ giá trị ngoại lai (Outliers)\",\n            \"target_column\": price_col,\n            \"condition\": f\"price > P{int(round(q_high * 100)):02d}({p_high:.0f}) | price < P{int(round(q_low * 100)):02d}({p_low:.0f})\",\n            \"reason\": \"Cảnh báo các căn hộ có mức giá bất thường; giữ nguyên phân bố thực tế khi tổng hợp KPI\",\n            \"action\": \"Gắn cờ qa_price_outlier = True để cảnh báo; giữ nguyên ngoại lai khi tính KPI giá và PPG\",\n            \"snapshot\": snapshot,\n            \"rows_affected\": num_outliers,\n            \"kpi_affected\": f\"Mean Price ({cur})\",\n            \"kpi_before\": f\"{price_mean:.2f}\",\n            \"kpi_after\": f\"{price_mean:.2f}\",\n        })\n    else:\n        qa_records.append({\n            \"rule_id\": \"RULE_PRICE_OUTLIER\",\n            \"rule_name\": \"Phát hiện và gắn cờ giá trị ngoại lai (Outliers)\",\n            \"target_column\": price_col,\n            \"condition\": \"N/A (Mốc không có dữ liệu giá)\",\n            \"reason\": f\"Mốc {snapshot} không có dữ liệu giá hợp lệ trong raw\",\n            \"action\": \"Bỏ qua kiểm tra giá cho mốc này\",\n            \"snapshot\": snapshot,\n            \"rows_affected\": 0,\n            \"kpi_affected\": f\"Mean Price ({cur})\",\n            \"kpi_before\": \"N/A\",\n            \"kpi_after\": \"N/A\",\n        })\n\n    # Lưu cột giá sạch đã làm sạch\n    df[price_col] = price_numeric\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 5: RULE_ACCOMMODATES_BOUNDS (Chuẩn hóa sức chứa khách)\n    # --------------------------------------------------------------------------\n    acc_raw = df[\"accommodates\"] if \"accommodates\" in df.columns else pd.Series(np.nan, index=df.index)\n    acc_numeric = pd.to_numeric(acc_raw, errors=\"coerce\")\n    invalid_acc_mask = acc_numeric.isna() | (acc_numeric <= 0)\n    num_invalid_acc = int(invalid_acc_mask.sum())\n\n    # Quyết định hành động: Giữ nguyên NaN nếu thiếu hoặc <= 0, gắn cờ lỗi (không tự ý điền 1)\n    df[\"accommodates_clean\"] = acc_numeric.where(~invalid_acc_mask, np.nan).astype(\"Int64\")\n    df[\"qa_invalid_accommodates\"] = invalid_acc_mask\n    valid_acc_pct = f\"{(((n_rows - num_invalid_acc) / n_rows) * 100) if n_rows else 0.0:.1f}%\"\n\n    qa_records.append({\n        \"rule_id\": \"RULE_ACCOMMODATES_BOUNDS\",\n        \"rule_name\": \"Ràng buộc sức chứa khách (Accommodates >= 1)\",\n        \"target_column\": \"accommodates\",\n        \"condition\": \"accommodates.isna() | accommodates <= 0\",\n        \"reason\": \"Sức chứa phòng phải tối thiểu 1 người để tính PPG, không tự ý điền giả lập\",\n        \"action\": \"Gắn cờ qa_invalid_accommodates = True; giữ nguyên NaN trong accommodates_clean để bỏ qua khi tính KPI\",\n        \"snapshot\": snapshot,\n        \"rows_affected\": num_invalid_acc,\n        \"kpi_affected\": \"Valid Accommodates Rate (%)\",\n        \"kpi_before\": valid_acc_pct,\n        \"kpi_after\": valid_acc_pct,\n    })\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 6: RULE_AVAILABILITY_BOUNDS (Kiểm tra khuyết thiếu & làm sạch lịch trống)\n    # --------------------------------------------------------------------------\n    a30_raw = df[\"availability_30\"] if \"availability_30\" in df.columns else pd.Series(np.nan, index=df.index)\n    a90_raw = df[\"availability_90\"] if \"availability_90\" in df.columns else pd.Series(np.nan, index=df.index)\n    a365_raw = df[\"availability_365\"] if \"availability_365\" in df.columns else pd.Series(np.nan, index=df.index)\n    a30_num = pd.to_numeric(a30_raw, errors=\"coerce\")\n    a90_num = pd.to_numeric(a90_raw, errors=\"coerce\")\n    a365_num = pd.to_numeric(a365_raw, errors=\"coerce\")\n\n    # Kiểm tra tính hợp lệ của từng trường (không null, trong miền [0, max_days] và đúng thứ tự)\n    valid_a30 = a30_num.notna() & (a30_num >= 0) & (a30_num <= 30)\n    valid_a90 = a90_num.notna() & (a90_num >= 0) & (a90_num <= 90) & (a90_num >= a30_num.fillna(-1))\n    valid_a365 = a365_num.notna() & (a365_num >= 0) & (a365_num <= 365) & (a365_num >= a90_num.fillna(-1))\n\n    # Bản ghi vi phạm nếu có bất kỳ trường nào bị null hoặc sai logic\n    inv_avail_mask = (~valid_a30) | (~valid_a90) | (~valid_a365)\n    num_inv_avail = int(inv_avail_mask.sum())\n    valid_avail_pct = f\"{(((n_rows - num_inv_avail) / n_rows) * 100) if n_rows else 0.0:.1f}%\"\n\n    # Gắn cờ flagging\n    df[\"qa_invalid_availability\"] = inv_avail_mask\n\n    # Tạo các cột cleaned: giữ nguyên NaN/null nếu bị thiếu hoặc vi phạm, KHÔNG tự ý fillna\n    df[\"availability_30_clean\"] = a30_num.where(valid_a30, np.nan).astype(\"Int64\")\n    df[\"availability_90_clean\"] = a90_num.where(valid_a90, np.nan).astype(\"Int64\")\n    df[\"availability_365_clean\"] = a365_num.where(valid_a365, np.nan).astype(\"Int64\")\n\n    qa_records.append({\n        \"rule_id\": \"RULE_AVAILABILITY_BOUNDS\",\n        \"rule_name\": \"Kiểm tra khuyết thiếu và làm sạch cột lịch trống phòng\",\n        \"target_column\": \"availability_30, availability_90, availability_365\",\n        \"condition\": \"availability.isna() | ngoài [0, max_days] | vi phạm thứ tự logic\",\n        \"reason\": \"Lịch trống thiếu hoặc vi phạm logic sẽ làm sai lệch occupancy và ghost listings\",\n        \"action\": \"Tạo các cột availability_*_clean (giữ nguyên NaN nếu null); gắn cờ qa_invalid_availability\",\n        \"snapshot\": snapshot,\n        \"rows_affected\": num_inv_avail,\n        \"kpi_affected\": \"Valid Availability Rate (%)\",\n        \"kpi_before\": valid_avail_pct,\n        \"kpi_after\": valid_avail_pct,\n    })\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 7: RULE_REVIEWS_BOUNDS (Kiểm tra và gắn cờ thiếu số lượng review)\n    # --------------------------------------------------------------------------\n    nr_raw = df[\"number_of_reviews\"] if \"number_of_reviews\" in df.columns else pd.Series(np.nan, index=df.index)\n    nr_series = pd.to_numeric(nr_raw, errors=\"coerce\")\n    missing_reviews_mask = nr_series.isna() | (nr_series < 0) | ((nr_series % 1) != 0)\n    num_missing_reviews = int(missing_reviews_mask.sum())\n    df[\"number_of_reviews_clean\"] = nr_series.where(~missing_reviews_mask, np.nan).astype(\"Int64\")\n    df[\"qa_missing_reviews\"] = missing_reviews_mask\n\n    qa_records.append({\n        \"rule_id\": \"RULE_REVIEWS_BOUNDS\",\n        \"rule_name\": \"Kiểm tra và gắn cờ bản ghi khuyết thiếu số lượng review\",\n        \"target_column\": \"number_of_reviews\",\n        \"condition\": \"number_of_reviews.isna() | number_of_reviews < 0\",\n        \"reason\": \"Số lượng review rỗng hoặc không hợp lệ gây sai lệch vận tốc review và phân loại căn hộ ma\",\n        \"action\": \"Gắn cờ qa_missing_reviews = True; tạo number_of_reviews_clean (giữ NaN nếu lỗi) để bỏ qua khi tính KPI\",\n        \"snapshot\": snapshot,\n        \"rows_affected\": num_missing_reviews,\n        \"kpi_affected\": \"Valid Reviews Listings Count\",\n        \"kpi_before\": n_rows,\n        \"kpi_after\": n_rows - num_missing_reviews,\n    })\n\n    # --------------------------------------------------------------------------\n    # QUY TẮC 8: RULE_LAST_REVIEW_VALIDITY (Kiểm tra ngày review gần nhất; bỏ qua NaN)\n    # --------------------------------------------------------------------------\n    lr_raw = df[\"last_review\"] if \"last_review\" in df.columns else pd.Series(pd.NA, index=df.index)\n    lr_str = lr_raw.astype(\"string\").str.strip()\n    lr_missing = lr_str.isna() | lr_str.eq(\"\") | lr_str.str.lower().isin([\"nan\", \"nat\", \"none\"])\n    lr_parsed = pd.to_datetime(lr_str.where(~lr_missing, pd.NA), errors=\"coerce\")\n\n    snap_dt = pd.to_datetime(snapshot)\n    if \"last_scraped\" in df.columns:\n        ref_date = pd.to_datetime(df[\"last_scraped\"], errors=\"coerce\").fillna(snap_dt)\n    else:\n        ref_date = pd.Series(snap_dt, index=df.index)\n\n    # Bỏ qua giá trị NaN/trống; chỉ gắn cờ khi có giá trị nhưng không parse được hoặc > last_scraped/snapshot\n    invalid_lr_mask = (~lr_missing) & (lr_parsed.isna() | (lr_parsed > ref_date))\n    valid_lr_mask = (~lr_missing) & (~invalid_lr_mask)\n    df[\"last_review_clean\"] = lr_parsed.where(valid_lr_mask).dt.strftime(\"%Y-%m-%d\").astype(\"string\")\n    df[\"qa_invalid_last_review\"] = invalid_lr_mask\n\n    non_null_lr = int((~lr_missing).sum())\n    num_invalid_lr = int(invalid_lr_mask.sum())\n    valid_lr_pct = f\"{(((non_null_lr - num_invalid_lr) / non_null_lr) * 100) if non_null_lr else 100.0:.1f}%\"\n\n    qa_records.append({\n        \"rule_id\": \"RULE_LAST_REVIEW_VALIDITY\",\n        \"rule_name\": \"Kiểm tra tính hợp lệ của ngày review gần nhất (bỏ qua NaN)\",\n        \"target_column\": \"last_review\",\n        \"condition\": \"last_review.notna() & (invalid_date | last_review > last_scraped)\",\n        \"reason\": \"Ngày last_review sai định dạng hoặc vượt quá ngày thu thập gây sai lệch phát hiện căn hộ ma (NaN hợp lệ với căn 0 review)\",\n        \"action\": \"Bỏ qua NaN; gắn cờ qa_invalid_last_review = True và giữ NaN trong last_review_clean nếu không hợp lệ\",\n        \"snapshot\": snapshot,\n        \"rows_affected\": num_invalid_lr,\n        \"kpi_affected\": \"Valid Non-Null Last Review Rate (%)\",\n        \"kpi_before\": valid_lr_pct,\n        \"kpi_after\": valid_lr_pct,\n    })\n\n    return df, qa_records"
  },
  {
    "id": "qa-main",
    "file": "src/qa.py",
    "name": "main",
    "kind": "function",
    "lineStart": 317,
    "lineEnd": 356,
    "signature": "def main():",
    "purpose": "Đọc từng listings.csv theo thứ tự thời gian, gọi apply_qa_rules(), ghi đè cột sạch & cờ QA vào chính tệp listings.csv và xuất reports/qa_report.csv.",
    "flow": [
      "Đọc config YAML và sắp xếp snapshots tăng dần theo pd.to_datetime.",
      "Với mỗi snapshot: đọc data/processed/{snap}/listings.csv với dtype={\"id\": \"string\"}.",
      "Chạy apply_qa_rules() -> lưu đè listings.csv đã có đủ cột *_clean và qa_*.",
      "Gom toàn bộ 32 dòng (8 rules × 4 mốc) xuất ra reports/qa_report.csv."
    ],
    "input": "CLI arg --config",
    "output": "Cập nhật 4 tệp listings.csv và tạo reports/qa_report.csv (32 dòng).",
    "libraries": [
      "__future__ (annotations)",
      "argparse",
      "os",
      "sys",
      "pathlib (Path)",
      "typing (Any, Dict, List, Tuple)",
      "numpy",
      "pandas",
      "yaml",
      "Gọi hàm: ArgumentParser, DataFrame, FileNotFoundError, add_argument, apply_qa_rules, extend, get, is_file, len, load_config, mkdir, parse_args"
    ],
    "example": "python src/qa.py --config configs/mexico-city.yaml",
    "usage": "Chặng 3 của STEPS trong run_pipeline.py.",
    "potentialBugs": [
      "Vì qa.py ghi đè trực tiếp lên data/processed/{snap}/listings.csv, nếu chạy lại nhiều lần thì cột *_clean đã có sẽ được tính lại sạch từ cột thô gốc (idempotent)."
    ],
    "viva": [
      {
        "q": "Làm sao kiểm tra qa.py đã chạy đủ trước khi chạy kpi.py?",
        "a": "Kiểm tra reports/qa_report.csv có đủ 32 dòng và REQUIRED_QA_COLS đều xuất hiện trong listings.csv."
      }
    ],
    "code": "def main():\n    parser = argparse.ArgumentParser(description=\"Inside Airbnb Quality Assurance (QA) Module\")\n    parser.add_argument(\"--config\", default=None, help=\"Đường dẫn file cấu hình YAML\")\n    args = parser.parse_args()\n\n    print(\"=\" * 70)\n    print(\"[QA] BẮT ĐẦU QUY TRÌNH KIỂM SOÁT CHẤT LƯỢNG (QA) & LÀM SẠCH DỮ LIỆU\")\n    print(\"=\" * 70)\n\n    config = load_config(args.config)\n    snapshots = sorted((str(s).strip() for s in config.get(\"snapshots\", [])), key=pd.to_datetime)\n\n    all_qa_records: List[Dict[str, Any]] = []\n\n    # 1. Thực hiện QA & Làm sạch cho từng snapshot\n    for snap in snapshots:\n        listing_path = PROJECT_ROOT / \"data\" / \"processed\" / snap / \"listings.csv\"\n        if not listing_path.is_file():\n            raise FileNotFoundError(f\"[QA] Không tìm thấy dữ liệu phân công: {listing_path}\")\n\n        raw_df = pd.read_csv(listing_path, low_memory=False, dtype={\"id\": \"string\"})\n\n        # Bước 1.1: Áp dụng các quy tắc QA và gắn cờ (Flagging)\n        cleaned_df, qa_records = apply_qa_rules(raw_df, snap, config)\n        all_qa_records.extend(qa_records)\n\n        # Bước 1.2: Cập nhật lại file listings.csv đã có các cột chuẩn hóa và cờ QA\n        cleaned_df.to_csv(listing_path, index=False, encoding=\"utf-8\")\n        print(f\"  -> Đã cập nhật cờ QA & dữ liệu sạch vào: {listing_path.relative_to(PROJECT_ROOT)}\")\n\n    # 2. Xuất báo cáo kiểm định chất lượng dữ liệu (QA Report)\n    reports_dir = PROJECT_ROOT / \"reports\"\n    reports_dir.mkdir(parents=True, exist_ok=True)\n    qa_report_path = reports_dir / \"qa_report.csv\"\n    qa_report_df = pd.DataFrame(all_qa_records)\n    qa_report_df.to_csv(qa_report_path, index=False, encoding=\"utf-8\")\n    \n    print(\"\\n\" + \"=\" * 70)\n    print(f\"[QA] HOÀN TẤT QA! ĐÃ XUẤT BÁO CÁO: {qa_report_path.relative_to(PROJECT_ROOT)} ({len(qa_report_df)} quy tắc ghi nhận)\")\n    print(\"=\" * 70)"
  }
];

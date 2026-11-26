import type { LessonItem } from '../../types';

export const LESSONS_PART_2: LessonItem[] = [
  {
    id: 'bai-07',
    number: 'Bài 7',
    group: 'Nhóm 2 – Kết nối & biến đổi dữ liệu',
    title: 'Xử lý dữ liệu chuỗi',
    subtitle: 'String Methods (.str), Chuẩn hóa văn bản, Regex & Tách danh sách JSON',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Thành thạo các phương thức chuỗi vector hóa qua .str (strip, lower, contains, replace, extract, fullmatch).',
      'Xây dựng biểu thức chính quy (Regex) chính xác, tránh bẫy khớp nhầm chuỗi con bằng word boundary \\b.',
      'Phân tích chuỗi danh sách JSON (amenities) đúng cách bằng json.loads và explode() mà không sai mẫu số.',
    ],
    coreConcepts: [
      'pandas 3 str.contains mặc định regex=True, còn str.replace mặc định regex=False.',
      'Word boundary \\b: r"\\bnot\\b" tránh khớp nhầm vào "notable" (nhưng lưu ý r"\\bnot\\b" KHÔNG khớp "isn\'t" — cần n[\'’]t).',
      'Bẫy dấu thập phân châu Âu (","): Regex r"[^\\d.-]" đúng cho CDMX ("$1,250.00"), nhưng sẽ biến "1.250,50 €" thành 1.25 (giảm 1.000x!) nếu không tách locale.',
      'Giữ cột gốc trước khi chuyển đổi (price -> price_mxn) để phân biệt thiếu từ nguồn với lỗi parse.',
    ],
    terms: [
      { term: 'Regex (Regular Expression)', meaning: 'Mẫu mô tả cấu trúc chuỗi ký tự dùng để khớp, trích xuất hoặc thay thế.' },
      { term: 'Word Boundary (\\b)', meaning: 'Ranh giới giữa ký tự từ (chữ/số/_) và ký tự không phải từ, giúp tránh bắt nhầm tiền tố/hậu tố.' },
      { term: 'NFKC Normalization', meaning: 'Chuẩn hóa Unicode đưa các ký tự có hình dạng tương đương về dạng chuẩn thống nhất.' },
    ],
    essence: 'Trong dữ liệu Inside Airbnb, giá tiền là chuỗi "$1,250.00", nhận xét có thẻ HTML "<br/>", tên phòng viết hoa/thường lẫn lộn, còn amenities là chuỗi JSON. Regex giải quyết xuất sắc các mẫu có quy luật cố định (tiền, số phòng, từ khóa đối chứng), nhưng cần ranh giới từ và xử lý phủ định cẩn thận.',
    pythonExample: {
      title: 'Làm sạch giá và bẫy word boundary trong Regex',
      code: `import re
s = pd.Series(["$1,250.00", "notable", "not clean"])
# 1. Làm sạch giá trong src/qa.py
p = pd.to_numeric(s.iloc[:1].str.replace(r"[^\\d.-]", "", regex=True), errors="coerce")
# 2. So sánh có và không có \\b
print("Không \\b:", s.str.contains("not").tolist())
print("Có \\b:", s.str.contains(r"\\bnot\\b", regex=True).tolist())`,
      output: 'Không \\b: [False, True, True]\nCó \\b: [False, False, True]',
    },
    handCalculation: {
      prompt: 'Có 3 chỗ ở với danh sách amenities: P1=["Wifi", "Kitchen"], P2=["Kitchen"], P3=[]. Sau khi explode() bỏ NaN còn 3 dòng tiện nghi. Tỷ lệ chỗ ở có Wifi là bao nhiêu?',
      steps: [
        'Tỷ lệ chỗ ở có Wifi = (số căn có Wifi) / (tổng số chỗ ở) = 1 / 3 = 33.3% (tính trên ds trước khi explode).',
        'Sai lầm hay gặp: chia cho số dòng sau explode (1 / 3 = 33.3% tình cờ trùng, nhưng nếu tính Kitchen: 2/3 căn = 66.7% chứ không phải 2/3 mục tiện nghi!).',
      ],
      answer: '33.3% (mẫu số là 3 chỗ ở, không phải tổng số mục tiện nghi).',
    },
    airbnbApplication: 'src/qa.py dùng r"[^\\d.-]" chuyển chuỗi giá "$1,250.00" sang float64. src/baseline.py dùng clean_text() đổi <br/> thành \\n, chuẩn hóa NFKC và chạy 5 bộ Regex lớn (CLAUSE_RE, BENIGN_RE, NEG_RE, POS_RE, ASPECT_PATTERNS) với ranh giới từ \\b.',
    commonPitfalls: [
      'Quên tiền tố raw string r"..." khiến Python hiểu \\b là ký tự backspace.',
      'Thay thế toàn bộ <br/> bằng chuỗi rỗng "" làm hai chữ dính liền (vd: "great.<br/>Noisy" -> "great.Noisy").',
      'Cắt chuỗi JSON amenities bằng .split(",") khiến "Stove, gas" bị xẻ đôi.',
    ],
    selfCheckQuestions: [
      { q: 'Tại sao trong src/baseline.py hàm clean_text() lại thay <br/> bằng "\\n" chứ không phải khoảng trắng?', a: 'Vì CLAUSE_RE dùng dấu xuống dòng "\\n" như một ranh giới tách mệnh đề độc lập để tách ý khen và chê ở hai dòng khác nhau.' },
      { q: 'str.contains(pat, na=False) có tác dụng gì?', a: 'Ép các ô giá trị thiếu thành False thay vì <NA>, đảm bảo mask boolean luôn đồng nhất giữa các dtype.' },
    ],
    vivaQuestions: [
      { q: 'Giải thích biểu thức r"[^\\d.-]" trong src/qa.py: dấu ^ ở đầu trong [...] có nghĩa là gì?', a: 'Trong ngoặc vuông [^...], dấu ^ mang nghĩa phủ định ("không phải"): biểu thức tìm mọi ký tự KHÔNG phải chữ số (\\d), dấu chấm (.) hoặc dấu trừ (-), rồi thay bằng rỗng để bóc tách số thực.' },
    ],
    summary: [
      'Luôn viết Regex bằng raw string r"..." và kiểm soát ranh giới từ \\b.',
      'Giữ cột chuỗi gốc trước khi ép kiểu số để phát hiện lỗi chuyển đổi.',
      'Dùng json.loads() cho cột JSON thay vì cắt thô bằng split(",").',
    ],
  },
  {
    id: 'bai-08',
    number: 'Bài 8',
    group: 'Nhóm 2 – Kết nối & biến đổi dữ liệu',
    title: 'Xử lý dữ liệu thời gian',
    subtitle: 'Timestamp, Timedelta, Parse Date, Snapshot, Resampling & Rolling',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Chuyển chuỗi ngày giờ an toàn bằng pd.to_datetime(..., format=..., errors="coerce").',
      'Phân biệt Timestamp (thời điểm) và Timedelta (khoảng thời gian, .dt.days).',
      'Nhận diện bẫy so sánh theo kỳ: ngày vượt mốc chụp, kỳ cuối chưa trọn vẹn và lệch shift khi thiếu kỳ.',
    ],
    coreConcepts: [
      'Luôn truyền format="%Y-%m-%d" (hoặc "%d/%m/%Y") và errors="coerce" (trả NaT cho chuỗi ngày sai định dạng thay vì crash) để tránh đảo ngày/tháng âm thầm (03/07 vs 07/03).',
      'NaT (Not a Time) hành xử tương tự NaN: NaT == NaT là False và mọi phép so sánh (> ref_date) cho False -> bắt buộc kiểm .notna().',
      'Hiệu hai Timestamp cho Timedelta; dùng .dt.days để quy đổi ra số ngày chuẩn; cẩn trọng đồng bộ tz-naive vs tz-aware trước khi so sánh.',
      'Pandas mới dùng tần suất "ME" (Month End) và "QE" (Quarter End) thay cho "M"/"Q" đã ngừng hỗ trợ; kỳ cuối chưa trọn vẹn (t4: 15/06) không được so sánh ngang hàng với tháng đủ 30 ngày.',
    ],
    terms: [
      { term: 'Timestamp', meaning: 'Kiểu dữ liệu biểu diễn một mốc thời gian cụ thể trong pandas.' },
      { term: 'Timedelta', meaning: 'Khoảng cách thời gian giữa hai Timestamp, dùng .dt.days để lấy số ngày.' },
      { term: 'Resample', meaning: 'Gom nhóm dữ liệu theo lịch thời gian cố định (ngày D, tuần W, tháng ME, quý QE).' },
      { term: 'Rolling Window', meaning: 'Cửa sổ trượt tính trung bình/tổng của k kỳ liên tiếp nhằm làm mượt nhiễu ngắn hạn.' },
    ],
    essence: 'Chuỗi "03/07/2026" có thể đọc là 3 tháng 7 hoặc 7 tháng 3 mà Python không báo lỗi. Ngoài ra, dữ liệu thực tế luôn có độ trễ hoặc ngày cào kéo dài qua nửa đêm, tạo ra các mốc last_review > snapshot hoặc tháng cuối bị cắt cụt (right-censoring).',
    formulas: [
      { label: 'Quy đổi khoảng thời gian sang tháng chuẩn 30 ngày', latex: '\\Delta \\tau_k = \\frac{\\max(\\text{days}(t_k - t_{k-1}), 1)}{30.0}' },
    ],
    pythonExample: {
      title: 'Tính số ngày trôi qua từ last_review đến snapshot',
      code: `snap_dt = pd.to_datetime("2025-09-27")
last_rev = pd.to_datetime(pd.Series(["2025-05-01", "2025-10-01", None]), errors="coerce")
days_stale = (snap_dt - last_rev).dt.days
print(days_stale.tolist())  # [149.0, -4.0 (lỗi tương lai!), nan]`,
      output: '[149.0, -4.0, nan]',
    },
    handCalculation: {
      prompt: 'Từ 2025-09-27 (t1) đến 2025-12-29 (t2) có 93 ngày. Căn hộ tăng từ 10 lên 19 review. Tính Review Velocity (reviews/30 ngày).',
      steps: [
        'diff = 19 - 10 = 9 reviews.',
        'delta_months = 93 / 30 = 3.1 tháng.',
        'RV = 9 / 3.1 = 2.9032 reviews/30 ngày.',
      ],
      answer: '2.9032 reviews/30 ngày.',
    },
    airbnbApplication: 'src/qa.py (RULE_LAST_REVIEW_VALIDITY) kiểm tra last_review <= last_scraped/snapshot; src/kpi.py dùng (pd.to_datetime(snap_curr) - pd.to_datetime(snap_prev)).days / 30.0 tính Review Velocity và (pd.to_datetime(snap) - last_rev).dt.days > 90 để phát hiện Ghost Listing ở mốc t1.',
    commonPitfalls: [
      'Không truyền format khi parse ngày DD/MM/YYYY làm pandas tự đoán theo hàng đầu tiên.',
      'Dùng shift(1) trên chuỗi thời gian bị khuyết một tháng mà không chèn đủ lịch (asfreq).',
      'Vẽ biểu đồ tháng cuối chưa trọn vẹn rồi kết luận "thị trường lao dốc".',
    ],
    selfCheckQuestions: [
      { q: 'Tại sao trong src/kpi.py dùng max((snap_curr - snap_prev).days, 1) / 30.0?', a: 'Hàm max(..., 1) bảo vệ phép chia khỏi lỗi ZeroDivisionError nếu hai ngày cấu hình bị nhập trùng nhau.' },
      { q: 'Vì sao cùng một tháng 6/2025 lại có số lượng review khác nhau khi đếm ở snapshot t1 và snapshot t4?', a: 'Vì Inside Airbnb chỉ chứa review của các listing còn tồn tại tại thời điểm chụp; những listing bị gỡ khỏi nền tảng giữa t1 và t4 sẽ mất cả lịch sử review của chúng.' },
    ],
    vivaQuestions: [
      { q: 'Trong src/qa.py RULE_LAST_REVIEW_VALIDITY, biến ref_date lấy từ đâu và để làm gì?', a: 'Lấy từ cột last_scraped (nếu thiếu thì fallback về ngày snapshot) để làm mốc đối chiếu: nếu last_review > ref_date thì bản ghi bị gắn cờ qa_invalid_last_review = True vì ngày đánh giá không thể nằm sau ngày cào dữ liệu.' },
    ],
    summary: [
      'Luôn chỉ định rõ format và errors="coerce" khi parse ngày giờ.',
      'Dùng Timedelta (.dt.days) để tính khoảng cách giữa 2 mốc thời gian.',
      'Cẩn trọng với ngày vượt mốc chụp, kỳ chưa trọn vẹn và hiệu ứng right-censoring.',
    ],
  },
  {
    id: 'bai-10',
    number: 'Bài 10',
    group: 'Nhóm 3 – Làm sạch & phân tích hiện đại',
    title: 'Làm sạch dữ liệu có cấu trúc',
    subtitle: 'Missing Values, Outliers, Deduplication, Bounds & Rule-based QA',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Hiểu bản chất cơ chế giá trị thiếu trước khi quyết định xóa, giữ NaN hay điền.',
      'Phân biệt giá trị sai miền (invalid), giá trị ngoại lai (outlier) và dữ liệu phân khúc khác.',
      'Thiết kế bộ quy tắc QA theo hướng gắn cờ (Flagging) và xuất báo cáo tác động qa_report.csv.',
    ],
    coreConcepts: [
      'Không dùng df.dropna() bừa bãi trên toàn bảng -> chỉ kiểm tra thiếu theo đúng cột phục vụ phép tính.',
      'Khử trùng lặp phải đúng khóa nghiệp vụ: [id, last_scraped] trong 1 snapshot, không xóa mất quan sát lặp theo thời gian (panel data).',
      'Gắn cờ cả các quy tắc có 0 vi phạm vào qa_report.csv để chứng minh quy tắc đã được thực thi.',
    ],
    terms: [
      { term: 'QA Flagging', meaning: 'Tạo các cột boolean qa_* đánh dấu bất thường mà không làm mất bản ghi gốc.' },
      { term: 'IQR vs Quantile vs MAD', meaning: 'IQR = Q3 - Q1; Quantile P01/P99 cắt 2% đuôi; MAD = median(|x - median(x)|) bền vững hơn Z-score không bị masking effect (nhưng bằng 0 nếu >50% giá trị trùng nhau).' },
      { term: 'Winsorization (clip)', meaning: 'Chặn các giá trị vượt ngưỡng về đúng giá trị ngưỡng (thay đổi số liệu gốc, khác với xóa dòng trimming).' },
    ],
    essence: 'Làm sạch dữ liệu không phải là "xóa hết mọi dòng có vấn đề" hay "điền 0 cho hết NaN". Nếu một căn hộ thiếu giá ở t2 (1.000/1.000 căn) mà bạn gọi dropna(), toàn bộ bảng t2 biến mất và mất luôn dữ liệu Occupancy/Review Velocity vẫn đang hoàn toàn hợp lệ!',
    formulas: [
      { label: 'Quy tắc hàng rào IQR', latex: '[Q_1 - 1.5 \\times \\text{IQR},\\; Q_3 + 1.5 \\times \\text{IQR}]' },
      { label: 'Ngưỡng phân vị P01–P99 trong BTL', latex: '[Q_{0.01}(\\text{price}),\\; Q_{0.99}(\\text{price})]' },
    ],
    pythonExample: {
      title: 'Phân biệt missing hợp lệ vs lỗi miền trên thang điểm',
      code: `diem = pd.Series([4.8, 6.0, np.nan, -1.0])
sai_mien = diem.notna() & ~diem.between(0, 5)
# Chỉ hàng 1 (6.0) và hàng 3 (-1.0) sai miền; hàng 2 (NaN) không bị đánh dấu sai miền`,
      output: '0: False, 1: True, 2: False, 3: True',
    },
    handCalculation: {
      prompt: 'Cho dãy giá [100, 120, 140, 160, 1000]. So sánh Mean và Median trước và sau khi bỏ giá ngoại lai 1000.',
      steps: [
        'Có 1000: Mean = (100+120+140+160+1000)/5 = 304; Median = 140.',
        'Bỏ 1000: Mean = (100+120+140+160)/4 = 130 (giảm mạnh -57.2%); Median = (120+140)/2 = 130 (thay đổi nhẹ).',
      ],
      answer: 'Outlier kéo Mean rất mạnh (304 vs 130) nhưng tác động rất ít tới Median (140 vs 130).',
    },
    airbnbApplication: 'Toàn bộ src/qa.py triển khai đúng 8 quy tắc cho 4 mốc snapshot thành 32 dòng trong reports/qa_report.csv. Đặc biệt: giá ngoại lai P01–P99 được gắn cờ qa_price_outlier nhưng vẫn giữ nguyên trong price_mxn để src/kpi.py phản ánh đúng độ lệch thị trường.',
    commonPitfalls: [
      'Điền fillna(0) cho giá hoặc điểm đánh giá làm kéo tụt chỉ số.',
      'Tính P99 riêng cho mỗi kỳ rồi dùng tỷ lệ bị gắn cờ (~1%) để kết luận "giá không tăng" (khi cả thị trường tăng gấp đôi, P99 cũng tăng gấp đôi).',
      'Bỏ qua không ghi các quy tắc có 0 dòng vi phạm vào qa_report.csv.',
    ],
    selfCheckQuestions: [
      { q: 'Tại sao không dùng z-score |z| > 3 để lọc ngoại lai giá Airbnb?', a: 'Vì phân phối giá Airbnb lệch phải cực mạnh; các giá trị ngoại lai lớn tự làm phồng cả Mean lẫn Std, khiến z-score bị che khuất (masking effect).' },
      { q: 'Khác nhau giữa IQR (1.5×IQR) và Quantile [0.01, 0.99] là gì?', a: 'Hàng rào 1.5×IQR phụ thuộc độ trải phân phối (thường bắt ~8.5% dữ liệu lệch phải); Quantile [0.01, 0.99] luôn đánh dấu cố định ~2% hai đuôi cực đoan nhất.' },
    ],
    vivaQuestions: [
      { q: 'Nếu qa_price_outlier không bị xóa khỏi phép tính KPI giá, vậy gắn cờ qa_price_outlier có tác dụng gì?', a: 'Nó giúp truy vết nhanh các căn hộ bất thường (như 2 căn treo 153.540 MXN ở Cuauhtémoc) trong quá trình kiểm toán dữ liệu, đồng thời vẫn cho phép phân tích độ nhạy nếu muốn so sánh KPI có/không có outlier.' },
    ],
    summary: [
      'Ưu tiên Gắn cờ (Flagging) + giữ NaN ở cột *_clean thay vì xóa dòng hay điền số giả.',
      'Phải ghi đủ mọi quy tắc vào qa_report.csv kể cả khi vi phạm = 0.',
      'Dùng Median và rIQR cho dữ liệu giá lệch phải.',
    ],
  },
  {
    id: 'bai-11',
    number: 'Bài 11',
    group: 'Nhóm 3 – Làm sạch & phân tích hiện đại',
    title: 'Xử lý dữ liệu phi cấu trúc bằng LLM',
    subtitle: 'Structured Output, Pydantic, Cache JSONL, Baseline Regex, F1 & Chi phí Token',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Hiểu vì sao cần biến đổi văn bản tự do (phi cấu trúc) thành bảng nhãn có cấu trúc.',
      'Thiết kế mô hình đối chứng Baseline không dùng LLM và dùng Pydantic Structured Output ép schema JSON.',
      'Đo lường chất lượng bằng Accuracy, Micro/Macro/Weighted F1 trên tập nhãn tay, phân tích lỗi, hậu kiểm và ước tính chi phí token.',
    ],
    coreConcepts: [
      'Đúng Pydantic schema chưa chắc đúng nội dung (LLM vẫn có thể hallucinate hoặc hiểu nhầm sắc thái mixed).',
      'Vòng lặp gọi LLM có kỷ luật: đọc cache JSONL -> gửi batch -> validate -> ghi ngay từng dòng -> phân loại lỗi 429 RPM vs RPD.',
      'Baseline không cần phức tạp nhưng phải chạy lại được, chi phí 0đ và chấm cùng thước đo với LLM.',
    ],
    terms: [
      { term: 'Structured Output', meaning: 'Ép LLM trả về JSON tuân thủ chặt chẽ JSON Schema / Pydantic BaseModel đã khai báo.' },
      { term: 'Macro F1 vs Weighted F1', meaning: 'Macro F1 lấy trung bình đều F1 mọi lớp (coi trọng lớp hiếm); Weighted F1 lấy trung bình theo số mẫu từng lớp.' },
      { term: 'Post-check (Hậu kiểm)', meaning: 'Bộ quy tắc kiểm tra tính nhất quán nội tại trên toàn bộ đầu ra LLM mà không cần nhãn tay.' },
    ],
    essence: 'Regex chạy miễn phí trong 1 giây cho cả triệu review nhưng gục ngã trước câu phủ định kép ("not bad"), đa ngôn ngữ hoặc câu vừa khen vừa chê tinh tế ("Great location, hot water takes forever"). LLM giải quyết ngữ nghĩa tốt hơn hẳn (Macro F1: 0.991 vs 0.522), nhưng tốn chi phí token, bị giới hạn rate limit và phải được kiểm chứng trên tập nhãn tay.',
    formulas: [
      { label: 'Precision, Recall và F1-score', latex: 'P = \\frac{TP}{TP+FP},\\quad R = \\frac{TP}{TP+FN},\\quad F_1 = \\frac{2PR}{P+R}' },
      { label: 'Ước tính chi phí API theo Token', latex: '\\text{Cost} = \\frac{N \\cdot T_{\\text{in}}}{10^6} P_{\\text{in}} + \\frac{N \\cdot T_{\\text{out}}}{10^6} P_{\\text{out}}' },
    ],
    pythonExample: {
      title: 'Ép kiểu Literal với Pydantic trong src/llm.py',
      code: `SentimentLiteral = Literal["positive", "mixed", "negative", "not_mentioned"]
# Bất kỳ nhãn lạ nào ngoài 4 giá trị này (vd: "neutral") sẽ bị Pydantic chặn ngay lập tức!`,
      output: 'ValidationError: Input should be "positive", "mixed", "negative" or "not_mentioned"',
    },
    handCalculation: {
      prompt: 'Một review có nhãn tay khen [location, noise, amenities]. LLM đoán [location, noise, amenities, cleanliness, host]. Tính P, R, F1.',
      steps: [
        'TP = 3 (location, noise, amenities), FP = 2 (cleanliness, host), FN = 0.',
        'Precision = 3 / (3 + 2) = 0.60.',
        'Recall = 3 / (3 + 0) = 1.00.',
        'F1 = 2 × 0.60 × 1.00 / (0.60 + 1.00) = 1.20 / 1.60 = 0.75.',
      ],
      answer: 'P = 0.60, R = 1.00, F1 = 0.75.',
    },
    airbnbApplication: 'Nhóm 4 dùng gemini-3.5-flash-lite (batch_size=5, cache JSONL 1.000 mẫu), đối chứng với Baseline Regex tách mệnh đề trên 100 nhãn tay (ground_truth.csv): LLM đạt 0.99 Accuracy / 0.9909 Macro F1 so với 0.85 / 0.5224 của Baseline. Chi phí 1.000 mẫu là $0.203 USD (~$349.11 USD nếu chạy hết 1.719.730 review toàn CDMX tại t4).',
    commonPitfalls: [
      'Gộp lưu cache sau khi chạy hết 1.000 review -> rớt mạng ở dòng 500 là mất trắng.',
      'Sửa prompt nhưng quên xóa cache cũ -> trộn lẫn kết quả giữa 2 phiên bản prompt.',
      'Tin tuyệt đối vào Accuracy cao khi lớp positive chiếm đa số.',
    ],
    selfCheckQuestions: [
      { q: 'Khi nào nên dùng Regex thay vì LLM?', a: 'Khi mẫu dữ liệu có quy luật hình thức rõ ràng (giá tiền, mã ID, ngày tháng) hoặc khi cần xử lý hàng triệu dòng chi phí 0đ mà sai số vài phần trăm ở mức từ khóa là chấp nhận được.' },
      { q: 'Vì sao Output Token của LLM thường đắt hơn Input Token nhiều lần?', a: 'Vì sinh từng token đầu ra tốn tài nguyên giải mã tuần tự (autoregressive decoding) hơn nhiều so với đọc song song Input (prefill); trên gemini-3.5-flash-lite giá Output ($2.50/1M) gấp >8 lần Input ($0.30/1M).' },
    ],
    vivaQuestions: [
      { q: 'Tại sao phải viết hàm hau_kiem() trong src/evaluate.py khi đã có ground_truth.csv?', a: 'Vì ground_truth.csv chỉ phủ 100/1.000 review. 900 review còn lại không có nhãn tay nên phải dùng 6 quy tắc hậu kiểm logic nội tại (như câu tiêu cực nhưng chỉ khen, khía cạnh không chứa từ khóa) để rà soát ảo giác.' },
    ],
    summary: [
      'Pydantic Structured Output khóa chặt cấu trúc đầu ra.',
      'Cache JSONL append-only bảo vệ tiến trình và đảm bảo tái lập (--skip-llm).',
      'Luôn có Baseline + Nhãn tay + Hậu kiểm + Ước tính chi phí.',
    ],
  },
  {
    id: 'bai-12',
    number: 'Bài 12',
    group: 'Nhóm 4 – Trực quan hóa & tư duy phân tích',
    title: 'Trực quan hóa cơ bản',
    subtitle: 'Matplotlib OOP (Figure/Axes), Line/Bar/Hist/Scatter & 5 điểm kiểm tra hình',
    relevance: 'Liên quan trực tiếp',
    objectives: [
      'Hiểu vì sao bảng thống kê tóm tắt có thể che giấu hình dạng dữ liệu (Bộ tứ Anscombe).',
      'Sử dụng giao diện hướng đối tượng fig, ax = plt.subplots() để kiểm soát nhiều khung hình.',
      'Áp dụng thành thạo 5 điểm kiểm tra một hình và thang log cho dữ liệu lệch phải.',
    ],
    coreConcepts: [
      '5 điểm kiểm tra một hình: (1) Thông điệp tiêu đề, (2) Trục & đơn vị (cột bắt đầu từ 0), (3) Cỡ mẫu n, (4) Dạng & màu phù hợp, (5) Nguồn & diễn giải đúng mức.',
      'Dùng sharex=True, sharey=True khi đặt nhiều khung so sánh cạnh nhau.',
      'Lưu hình tự động bằng fig.savefig(..., bbox_inches="tight") thay vì chụp màn hình.',
    ],
    terms: [
      { term: 'Figure & Axes', meaning: 'Figure là toàn bộ khung ảnh chứa 1 hoặc nhiều Axes (khung tọa độ biểu đồ con).' },
      { term: 'Anscombe Quartet', meaning: '4 bộ dữ liệu có cùng Mean, Std, tương quan r=0.82 nhưng hình dạng hoàn toàn khác nhau khi vẽ.' },
      { term: 'Log Scale', meaning: 'Biến đổi logarit giúp trải rộng vùng giá thấp dày đặc và thu gọn đuôi phải cực dài.' },
    ],
    essence: 'Thống kê tóm tắt (Mean, Std, r) có thể giống hệt nhau trên 4 tập dữ liệu khác hẳn nhau (Anscombe Quartet). Biểu đồ vừa giúp khám phá cấu trúc dữ liệu, vừa truyền đạt phát hiện chính xác nếu tuân thủ trung thực trục tọa độ và thang đo.',
    pythonExample: {
      title: 'Khởi tạo Figure/Axes chuẩn trong src/viz.py',
      code: `fig, axes = plt.subplots(2, 2, figsize=(13.5, 9.4), sharex=True, sharey=True)
# Dùng chung trục X/Y để so sánh trung thực Trung vị PPG qua 4 snapshot t1..t4`,
      output: 'Tạo lưới 2x2 chung thang đo [0, 1050] MXN giữa cả 4 mốc thời gian.',
    },
    handCalculation: {
      prompt: 'Một biểu đồ cột so sánh giá phòng riêng (34.000) và khách sạn (117.000) nhưng cắt trục y bắt đầu từ 30.000. Độ dài thanh bị bóp méo thế nào?',
      steps: [
        'Tỷ lệ thực tế: 117.000 / 34.000 = 3.44 lần.',
        'Độ dài thanh nhìn thấy khi cắt từ 30.000: (117.000 - 30.000) / (34.000 - 30.000) = 87.000 / 4.000 = 21.75 lần!',
      ],
      answer: 'Thị giác bị đánh lừa từ gấp 3.4 lần thành gấp gần 22 lần.',
    },
    airbnbApplication: 'src/viz.py dùng hoàn toàn giao diện OOP (fig, ax), bỏ viền trên/phải (spines.top/right=False), đặt sharex/sharey trong kpi_ppg_snapshots.png và bắt đầu trục cột từ 0 trong kpi_riqr_neighbourhood.png và llm_vs_baseline.png.',
    commonPitfalls: [
      'Cắt trục giá trị của biểu đồ cột không bắt đầu từ 0.',
      'Không dùng chung thang đo giữa các biểu đồ con khi so sánh các nhóm/mốc thời gian.',
      'Vẽ histogram giá Airbnb trên thang tuyến tính khi có ngoại lai 153.000 MXN -> dồn hết vào 1 cột duy nhất.',
    ],
    selfCheckQuestions: [
      { q: 'Khi nào biểu đồ đường không bắt buộc bắt đầu trục tung từ 0, còn biểu đồ cột thì bắt buộc?', a: 'Biểu đồ cột dùng độ dài thanh từ gốc để so sánh tỷ lệ độ lớn nên bắt buộc bắt đầu từ 0; biểu đồ đường so sánh biên độ biến thiên theo thời gian nên có thể phóng to vùng dao động.' },
    ],
    vivaQuestions: [
      { q: 'Kể tên 5 điểm kiểm tra một biểu đồ mà src/viz.py phải đáp ứng.', a: '1. Tiêu đề nêu thông điệp (Action Title); 2. Trục rõ nhãn/đơn vị, cột từ 0, dùng chung thang so sánh; 3. Ghi rõ cỡ mẫu n; 4. Chọn đúng dạng biểu đồ và màu sắc thân thiện mù màu; 5. Ghi nguồn, mốc chụp và diễn giải không vượt quá dữ liệu.' },
    ],
    summary: [
      'Vẽ hình bằng code OOP (fig, ax) để tự động hóa và tái lập.',
      'Dùng thang log cho biến giá lệch phải và sharex/sharey cho các khung so sánh.',
      'Luôn kiểm tra 5 tiêu chí trước khi đưa hình vào báo cáo.',
    ],
  },
  {
    id: 'bai-13',
    number: 'Bài 13',
    group: 'Nhóm 4 – Trực quan hóa & tư duy phân tích',
    title: 'Trực quan hóa nâng cao và phản biện biểu đồ',
    subtitle: 'Seaborn Boxplot, Heatmap, Choropleth GeoJSON & Bẫy trực quan hóa',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Đọc và vẽ được Boxplot so sánh phân phối nhiều nhóm (Median, Q1–Q3, râu 1.5×IQR, outliers).',
      'Thiết kế Heatmap đa biến và bản đồ Choropleth từ GeoJSON.',
      'Phản biện phát hiện lỗi sai trên biểu đồ (sai thang màu, mất cỡ mẫu, chọn sai loại hình).',
    ],
    coreConcepts: [
      'Boxplot hiển thị đồng thời trung vị, IQR, độ lệch đuôi và điểm ngoại lai trên nhiều nhóm.',
      'Heatmap hiệu quả cho ma trận 2 chiều (Khu vực × Thời gian hoặc Quận × Khía cạnh) với bảng màu an toàn mù màu.',
      'Bản đồ Choropleth dễ đánh lừa thị giác nếu vùng ngoại ô diện tích lớn nhưng chỉ có n=1..5 quan sát.',
    ],
    terms: [
      { term: 'Boxplot', meaning: 'Biểu đồ hộp tóm tắt phân phối qua Q1, Median, Q3 (hộp = IQR), râu 1.5×IQR và các điểm ngoại lai.' },
      { term: 'Heatmap', meaning: 'Ma trận biểu diễn giá trị số bằng cường độ màu sắc kết hợp ghi chú số trực tiếp trong từng ô.' },
      { term: 'Colorblind-safe Palette', meaning: 'Bảng màu thân thiện người mù màu (Okabe-Ito, colorblind, viridis, RdBu).' },
    ],
    essence: 'Một biểu đồ nâng cao không nhằm mục đích "trông cho phức tạp" mà để so sánh nhiều chiều dữ liệu trên cùng một khung nhìn. Tuy nhiên, Choropleth hay Heatmap càng dễ gây ngộ nhận nếu thiếu ghi chú cỡ mẫu n hoặc dùng thang màu bão hòa thiếu công bằng.',
    pythonExample: {
      title: 'Seaborn Boxplot thang log theo loại phòng trong src/viz.py',
      code: `sns.boxplot(data=valid, x=ppg_col, y=area_col, hue="room_type",
            log_scale=True, palette="colorblind", ax=ax1)`,
      output: 'Hiển thị song song phân phối Entire home/apt và Private room của 8 khu vực trên trục log dễ đọc.',
    },
    handCalculation: {
      prompt: 'Một hộp Boxplot có Q1 = 400, Median = 600, Q3 = 900. Điểm râu trên tối đa theo quy tắc 1.5×IQR là bao nhiêu?',
      steps: [
        'IQR = Q3 - Q1 = 900 - 400 = 500.',
        'Giới hạn râu trên = Q3 + 1.5 × IQR = 900 + 1.5 × 500 = 900 + 750 = 1.650.',
      ],
      answer: '1.650 (các giá trị > 1.650 sẽ được vẽ thành các chấm tròn outlier).',
    },
    airbnbApplication: 'src/viz.py sử dụng sns.boxplot(..., log_scale=True, palette="colorblind") cho Hình 1, sns.heatmap() kèm số liệu (u/c) cho Hình 5, 6, 7, và matplotlib.patches.Polygon đọc từ GeoJSON cho Hình 3 (bản đồ 16 quận CDMX).',
    commonPitfalls: [
      'Để diện tích địa lý lớn trên Choropleth (như Xochimilco hay Tlalpan) đánh lừa người đọc quên mất cỡ mẫu chỉ có n=5 hoặc n=23 so với Cuauhtémoc n=525.',
      'Dùng thang màu mặc định làm 1 ô có n=2 (100% phàn nàn) bão hòa màu đỏ và che lấp sự khác biệt giữa các quận lớn -> trong Hình 7 nhóm đã giới hạn vmax theo các quận n >= 5!',
    ],
    selfCheckQuestions: [
      { q: 'Vì sao trong Hình 7 (llm_insights.png), vmax của thang màu được tính dựa trên các quận có n >= 5?', a: 'Vì nếu lấy max trên tất cả quận, ô 100% của Azcapotzalco (n=2) sẽ đẩy vmax lên 100%, làm các quận lớn như Cuauhtémoc (14.8%) và Miguel Hidalgo (10.0%) đều bị nhạt màu gần như nhau, mất khả năng phân biệt.' },
    ],
    vivaQuestions: [
      { q: 'Làm thế nào src/viz.py tính vị trí đặt nhãn số thứ tự (#1..#15) đúng tâm từng quận trên bản đồ Choropleth?', a: 'Hàm _centroid() tính trọng tâm hình học (polygon centroid) của đa giác có diện tích lớn nhất trong mỗi quận (trường hợp MultiPolygon), sau đó đặt hộp nhãn số thứ tự rank_price_t4 vào tọa độ (cx, cy).' },
    ],
    summary: [
      'Boxplot vượt trội Bar chart khi cần so sánh phân phối lệch và nhiều phân khúc.',
      'Luôn đặt cỡ mẫu n ngay bên cạnh nhãn trục hoặc trong từng ô Heatmap.',
      'Trên bản đồ Choropleth, diện tích lớn != cỡ mẫu lớn.',
    ],
  },
  {
    id: 'bai-14',
    number: 'Bài 14',
    group: 'Nhóm 4 – Trực quan hóa & tư duy phân tích',
    title: 'Kể chuyện bằng dữ liệu và thẩm định phân tích AI',
    subtitle: 'Data Storytelling, Stakeholder, Causality vs Correlation, Simpson & AI Audit',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Phân biệt Khám phá (Exploratory trong notebook) và Trình bày (Explanatory trong báo cáo).',
      'Xây dựng câu chuyện dữ liệu theo nhu cầu Stakeholder: Kết luận trước -> Bằng chứng -> Giới hạn.',
      'Thẩm định (audit) kết quả/báo cáo do AI viết qua 4 bước để loại bỏ suy diễn nhân quả và ảo giác.',
    ],
    coreConcepts: [
      'Cấu trúc trình bày: Nêu Ý chính (Big Idea) -> Mở đầu -> Vấn đề -> Phân tích bằng chứng -> Kết luận kèm Giới hạn.',
      '4 bẫy diễn giải kinh điển: Nhân quả từ tương quan, Nghịch lý Simpson / Cơ cấu nhóm, Mốc so sánh bất thường, Kỳ chưa trọn vẹn.',
      '4 bước thẩm định AI: (1) Tính lại số liệu, (2) Kiểm tra phương pháp/cỡ mẫu, (3) Soi từng động từ diễn giải, (4) Chốt Giữ / Sửa / Chưa đủ căn cứ.',
    ],
    terms: [
      { term: 'Data Storytelling', meaning: 'Nghệ thuật kết nối số liệu và biểu đồ thành mạch lập luận có ngữ cảnh giúp stakeholder ra quyết định.' },
      { term: "Simpson's Paradox", meaning: 'Xu hướng số gộp bị đảo ngược so với từng nhóm con do biến gây nhiễu hoặc thay đổi cơ cấu tỷ trọng.' },
      { term: 'Selection Bias', meaning: 'Thiên lệch do mẫu thu thập không đại diện đều cho toàn bộ tổng thể.' },
    ],
    essence: 'AI có thể trích xuất đúng 100% con số từ bảng tóm tắt nhưng vẫn viết ra một báo cáo SAI hoàn toàn về mặt khoa học — vì AI thường tự suy diễn nhân quả ("chứng minh", "làm cho"), bỏ qua ghi chú cỡ mẫu nhỏ, hoặc bịa thêm bối cảnh ngoài dữ liệu.',
    pythonExample: {
      title: 'Kiểm chứng số liệu AI bằng câu lệnh đối chiếu trên CSV',
      code: `# Kiểm tra lại nhận định Cuauhtémoc Mean vs Median và tác động của 2 căn >153k MXN:
c = kpi_listing[kpi_listing["neighbourhood_cleansed"] == "Cuauhtémoc"]["price_mxn_t4"].dropna()
print("Mean đủ:", round(c.mean(), 2), "| Mean bỏ >100k:", round(c[c < 100000].mean(), 2))`,
      output: 'Mean đủ: 3529.04 | Mean bỏ >100k: 2944.xx (chính xác 2 căn thổi Mean thêm ~20%).',
    },
    handCalculation: {
      prompt: 'Quận A (100 căn) và Quận B (100 căn): Kỳ 1 giá TB mỗi quận là 100 và 200 (TB chung 150). Kỳ 2 Quận A tăng lên 110 (chỉ còn 20 căn), Quận B tăng lên 210 (chỉ còn 180 căn)? Không — thử ngược lại: Kỳ 2 Quận A tăng lên 110 (180 căn), Quận B tăng lên 210 (20 căn). Tính TB chung Kỳ 2.',
      steps: [
        'Kỳ 1: (100×100 + 200×100) / 200 = 150.',
        'Kỳ 2: (110×180 + 210×20) / 200 = (19800 + 4200) / 200 = 24000 / 200 = 120!',
        'Cả hai quận đều tăng +10, nhưng trung bình chung giảm từ 150 xuống 120 (Nghịch lý Simpson)!',
      ],
      answer: '120 (giảm -20% dù mọi nhóm con đều tăng +10).',
    },
    airbnbApplication: 'Chương 4 và Chương 6 của report.pdf đi đúng mạch câu chuyện cho SECTUR CDMX (Cú sốc giá -> Bản đồ Mean vs Median -> Lịch đặt phòng Semana Santa vs World Cup -> Tiếng nói du khách LLM -> Khuyến nghị & 3 Giới hạn cốt lõi).',
    commonPitfalls: [
      'Kể lể nhật ký công việc ("đầu tiên em import pandas, rồi em tải file...") thay vì đưa phát hiện và kết luận lên đầu.',
      'Dùng các từ khẳng định nhân quả ("World Cup làm giá tăng", "tiếng ồn làm giá giảm") trên dữ liệu quan sát.',
      'Giấu nhẹm các giới hạn như mốc t2 mất giá hay cỡ mẫu 1.000 căn chỉ chiếm 3.2% thị trường.',
    ],
    selfCheckQuestions: [
      { q: 'Thế nào là "nêu giới hạn cạnh kết luận"? Vì sao làm thế báo cáo lại đáng tin hơn?', a: 'Khi nói "PPG tăng 64.1%", phải nêu ngay giới hạn "trên mẫu 1.000 listing cố định, giá chào niêm yết". Điều này cho thấy người phân tích hiểu biên độ hiệu lực của kết quả và không thổi phồng sự thật.' },
    ],
    vivaQuestions: [
      { q: 'Nếu AI đọc bảng kpi_by_neighbourhood.csv và viết: "Xochimilco có giá đắt nhất Mexico City (3.848 MXN), chứng minh du khách đổ về khu sinh thái phía Nam", bạn phản biện thế nào?', a: 'Phản biện theo 3 điểm: (1) Xochimilco chỉ có n=5 listing (quá nhỏ để đại diện); (2) Giá cao do đây là các nhà vườn sức chứa 12–14 khách, tính PPG trung vị chỉ còn 377 MXN (#11/15); (3) Giá chào cao hoàn toàn không chứng minh được lượng khách đổ về (thực tế 3/5 căn tại đây có Occ_1-30 = 0%).' },
    ],
    summary: [
      'Đưa kết luận lên đầu, giữ bằng chứng sát số liệu, luôn đặt giới hạn đi kèm.',
      'Tương quan != Nhân quả; kiểm tra cơ cấu nhóm trước khi kết luận từ số gộp.',
      'Thẩm định mọi câu chữ do AI sinh qua 4 bước kiểm chứng.',
    ],
  },
];

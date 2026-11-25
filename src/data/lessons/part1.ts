import type { LessonItem } from '../../types';

export const LESSONS_PART_1: LessonItem[] = [
  {
    id: 'bai-01',
    number: 'Bài 1',
    group: 'Nhóm 1 – Nền tảng lập trình & xử lý dữ liệu',
    title: 'Tổng quan môn học, công cụ & chính sách AI',
    subtitle: 'Data Pipeline, Reproducibility, Git và 2 chế độ Đóng/Mở',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Hiểu chuỗi xử lý dữ liệu chuẩn: Dữ liệu thô -> Dữ liệu sạch -> Thông tin -> Quyết định.',
      'Nắm vững các công cụ phát triển: Python, Virtual Environment (.venv), Git, VS Code, Colab.',
      'Phân biệt chính xác chế độ Mở (✅) và Đóng (🚫), cùng 3 nghĩa vụ khi dùng AI.',
    ],
    coreConcepts: [
      'Pipeline 5 chặng tổng quát: Thu thập -> Làm sạch -> Biến đổi -> Trực quan -> Kể chuyện.',
      'Tính tái lập (Reproducibility): Ghim phiên bản Python (.python-version) và thư viện (requirements.txt) để chạy lại trên máy sạch.',
      'Chính sách AI: Khai báo trung thực (AI_USAGE.md), đọc hiểu toàn diện, tự kiểm chứng trên mẫu nhỏ.',
    ],
    terms: [
      { term: 'Data Pipeline', meaning: 'Chuỗi các bước xử lý dữ liệu tự động theo thứ tự từ nguồn thô tới đầu ra cuối.' },
      { term: 'Virtual Environment (.venv)', meaning: 'Môi trường Python cô lập giúp đóng gói đúng phiên bản thư viện cho từng dự án.' },
      { term: 'Reproducibility', meaning: 'Khả năng tái tạo chính xác kết quả và biểu đồ khi chạy lại trên máy khác.' },
      { term: 'Closed vs Open Mode', meaning: 'Chế độ Đóng (cấm AI: thi, kiểm tra, vấn đáp) và Mở (được dùng AI có khai báo: lab, BTL tại nhà).' },
    ],
    essence: 'Code chạy không lỗi chưa có nghĩa là kết luận đúng. Nếu dữ liệu thô bẩn ("$45,647.00", thiếu giá, 999 đêm tối thiểu) mà đưa thẳng vào tính toán, kết luận rút ra cũng bẩn. Do đó pipeline phải tách bước rõ ràng, lưu cấu hình ngoài code và kiểm chứng ở từng chặng.',
    pythonExample: {
      title: 'Điều phối pipeline tuần tự an toàn trong run_pipeline.py',
      code: `import subprocess, sys
cmd = [sys.executable, "src/qa.py", "--config", "configs/mexico-city.yaml"]
subprocess.run(cmd, check=True)  # Dừng ngay nếu exit code != 0`,
      output: '[QA] HOÀN TẤT QA! ĐÃ XUẤT BÁO CÁO: reports/qa_report.csv (32 quy tắc ghi nhận)',
    },
    handCalculation: {
      prompt: 'Tính điểm tối đa và tỷ trọng cá nhân khi BTL chiếm 60% điểm học phần (5đ Project nhóm + 5đ Vấn đáp cá nhân).',
      steps: [
        'Giả sử Project nhóm đạt 4.5/5 và sinh viên vấn đáp đạt 4.0/5.',
        'Tổng điểm BTL = 4.5 + 4.0 = 8.5 / 10.',
        'Đóng góp vào điểm học phần = 8.5 × 60% = 5.10 điểm.',
      ],
      answer: 'Điểm vấn đáp tính riêng từng cá nhân; nếu không giải thích được phần mình được hỏi -> 0đ phần đó.',
    },
    airbnbApplication: 'Nhóm 4 tổ chức repo theo chuẩn 8 bước (run_pipeline.py), ghim Python 3.14.7 trong .python-version, tách tham số vào configs/mexico-city.yaml, lưu cache để giảng viên chạy lại với --skip-llm, và ghi chi tiết 11 phiên làm việc vào AI_USAGE.md.',
    commonPitfalls: [
      'Commit tệp .env chứa GEMINI_API_KEY hoặc dữ liệu raw nặng lên GitHub.',
      'Hiểu nhầm "được dùng AI làm BTL" nghĩa là không cần hiểu code bạn khác viết.',
      'Gán cứng đường dẫn máy cá nhân (C:\\Users\\...) thay vì dùng Path(__file__).resolve().',
    ],
    selfCheckQuestions: [
      { q: 'Tại sao không dùng chung 1 môi trường Python toàn cục cho mọi dự án?', a: 'Vì xung đột phiên bản thư viện (ví dụ pandas 2 vs pandas 3 Copy-on-Write) khiến code chạy máy này nhưng lỗi máy chấm.' },
      { q: 'Thế nào là vi phạm chính sách AI trong BTL?', a: 'Dùng AI trong phòng thi vấn đáp, không khai báo hoặc khai man trong AI_USAGE.md, bịa số liệu, hoặc chép code nhóm khác.' },
    ],
    vivaQuestions: [
      { q: 'Tại sao AI_USAGE.md của Nhóm 4 chia rõ AI hỗ trợ lập trình và AI trong pipeline?', a: 'AI hỗ trợ lập trình (ChatGPT/Claude/Gemini ngoài luồng) giúp viết/gỡ lỗi code, còn Gemini API trong src/llm.py là một thành phần thuật toán chạy trên dữ liệu thật của sản phẩm.' },
      { q: 'Nếu giảng viên clone repo của nhóm sang máy mới không có GEMINI_API_KEY, làm sao chạy lại được?', a: 'Chạy python run_pipeline.py --config configs/mexico-city.yaml --skip-llm để đọc trực tiếp 1.000 bản ghi đã lưu trong data/processed/llm_cache.jsonl.' },
    ],
    summary: [
      'Dữ liệu thô -> Dữ liệu sạch -> Thông tin -> Quyết định.',
      'Tách cấu hình khỏi code (YAML), tách bước theo mô-đun (src/).',
      'Vấn đáp là chế độ Đóng: mọi thành viên phải tự bảo vệ toàn bộ repo.',
    ],
  },
  {
    id: 'bai-02',
    number: 'Bài 2',
    group: 'Nhóm 1 – Nền tảng lập trình & xử lý dữ liệu',
    title: 'Python cơ bản cho xử lý dữ liệu',
    subtitle: 'Kiểu dữ liệu, None vs 0, Dict/Set, Comprehension & Exception Handling',
    relevance: 'Nền tảng quan trọng',
    objectives: [
      'Phân biệt chính xác None (thiếu thông tin) với 0 và chuỗi rỗng "".',
      'Vận dụng Dict, Set (tra cứu O(1)), List/Dict comprehension và f-string định dạng số liệu.',
      'Sử dụng try/except đúng chỗ để pipeline bền bỉ trước lỗi mạng, JSON hoặc file.',
    ],
    coreConcepts: [
      'None != 0 != "": Thiếu giá không có nghĩa là miễn phí (0 đồng).',
      'f-string báo cáo: :,.0f (phân cách hàng nghìn) và :.1% (tỷ lệ phần trăm).',
      'Set lookup O(1) vs List lookup O(N) khi lọc hàng triệu dòng.',
    ],
    terms: [
      { term: 'Set', meaning: 'Tập hợp các phần tử duy nhất dựa trên bảng băm, kiểm tra thuộc tập (in) trong O(1).' },
      { term: 'Dictionary', meaning: 'Cấu trúc ánh xạ key -> value, dùng làm bảng tra mã hoặc chuyển thành bản ghi JSON.' },
      { term: 'Exception Handling', meaning: 'Cơ chế try/except bắt và xử lý ngoại lệ cụ thể thay vì để chương trình sập đột ngột.' },
    ],
    essence: 'Python là ngôn ngữ kết nối toàn bộ pipeline. Chọn đúng cấu trúc dữ liệu (như chuyển danh sách 1.000 listing_id thành Python set trước khi lọc chunk) quyết định tốc độ chạy, còn phân biệt None với 0 quyết định tính đúng đắn của mọi chỉ số.',
    pythonExample: {
      title: 'Tra cứu set O(1) và định dạng số liệu báo cáo',
      code: `prices = [1200, None, 950]
valid = [p for p in prices if p is not None]
avg_price = sum(valid) / len(valid)
print(f"Giá TB: {avg_price:,.1f} MXN (hợp lệ: {len(valid)/len(prices):.1%})")`,
      output: 'Giá TB: 1,075.0 MXN (hợp lệ: 66.7%)',
    },
    handCalculation: {
      prompt: 'Cho danh sách giá [100, 0, None, 200]. Tính trung bình nếu (a) bỏ None, giữ 0; (b) tự ý thay None thành 0.',
      steps: [
        'Cách (a) đúng: (100 + 0 + 200) / 3 = 100.0.',
        'Cách (b) sai: (100 + 0 + 0 + 200) / 4 = 75.0 (tụt 25% do điền 0 giả).',
      ],
      answer: '100.0 (đúng) vs 75.0 (sai).',
    },
    airbnbApplication: 'src/filter_data_from_sheet.py ép assigned_ids thành allowed = set(assigned_ids) để lọc nhanh; src/llm.py dùng try/except bắt QuotaExceededException và JSONDecodeError; src/qa.py tách bạch giá thiếu (NaN) và giữ nguyên không điền 0.',
    commonPitfalls: [
      'Dùng try: ... except Exception: pass nuốt lỗi thầm lặng không in cảnh báo.',
      'Kiểm tra thiếu bằng x == None hoặc x == np.nan thay vì x is None / pd.isna(x).',
      'Lặp qua list ID bên trong vòng lặp lớn gây độ phức tạp O(N × M).',
    ],
    selfCheckQuestions: [
      { q: 'Sự khác nhau giữa None, 0 và "" là gì?', a: '0 là giá trị số đã đo được bằng không; "" là chuỗi có độ dài 0; None/NaN biểu thị thông tin chưa biết hoặc bị thiếu.' },
      { q: 'Vì sao dùng set(assigned_ids) trước khi gọi .isin()?', a: 'Bảng băm của set cho phép kiểm tra phần tử trong O(1), tránh quét tuyến tính qua 1.000–5.000 ID trên hàng triệu dòng.' },
    ],
    vivaQuestions: [
      { q: 'Trong src/llm.py, hàm _clean_str(val) xử lý pd.isna(val) như thế nào và vì sao?', a: 'Nếu val là None hoặc pd.isna(val), hàm trả về "" thay vì str(val) để tránh biến giá trị thiếu thành chuỗi chữ "nan" hay "<NA>" khi xuất CSV.' },
    ],
    summary: [
      'Không bao giờ đánh đồng thiếu (None/NaN) với giá trị 0.',
      'Ưu tiên Set/Dict để ánh xạ và lọc nhanh.',
      'Bắt ngoại lệ cụ thể (requests.RequestException, json.JSONDecodeError) và log rõ ràng.',
    ],
  },
  {
    id: 'bai-03',
    number: 'Bài 3',
    group: 'Nhóm 1 – Nền tảng lập trình & xử lý dữ liệu',
    title: 'NumPy và tư duy Vectorization',
    subtitle: 'ndarray, Shape, Broadcasting, Axis và Boolean Masking',
    relevance: 'Liên quan trực tiếp',
    objectives: [
      'Hiểu cấu trúc mảng đa chiều ndarray: vùng nhớ liên tiếp, đồng nhất kiểu dtype, shape và ndim.',
      'Áp dụng tư duy Vectorization và Broadcasting thay thế vòng lặp for trên dữ liệu lớn.',
      'Thành thạo Boolean Masking, np.where và phép tổng hợp theo axis.',
    ],
    coreConcepts: [
      'Vectorization: Đẩy vòng lặp xuống mã C tối ưu, nhanh hơn for Python hàng trăm lần.',
      'Broadcasting: Tự động khớp kích thước khi tính toán mảng với số vô hướng hoặc mảng 1D.',
      'View vs Copy: Sửa lát cắt (slice) trong NumPy có thể làm đổi mảng gốc nếu không .copy().',
    ],
    terms: [
      { term: 'ndarray', meaning: 'Cấu trúc mảng N chiều đồng nhất kiểu dữ liệu, lưu trữ liên tiếp trong bộ nhớ.' },
      { term: 'Vectorization', meaning: 'Thực hiện phép toán trên toàn bộ mảng cùng lúc thay vì duyệt từng phần tử bằng vòng lặp.' },
      { term: 'Broadcasting', meaning: 'Quy tắc mở rộng ngầm định kích thước mảng nhỏ cho khớp mảng lớn trong phép toán.' },
      { term: 'Boolean Masking', meaning: 'Dùng mảng True/False để chọn hoặc thay thế các phần tử thỏa điều kiện.' },
    ],
    essence: 'Trong Python thuần, mỗi phần tử của list là một con trỏ tới đối tượng rời rạc, buộc vòng for phải kiểm tra kiểu dữ liệu ở từng bước. NumPy lưu dữ liệu liên tiếp cùng 1 dtype nên CPU thực hiện phép toán vector hóa cực nhanh.',
    formulas: [
      { label: 'Chuẩn hóa z-score vector hóa', latex: 'z = \\frac{x - \\mu}{\\sigma}' },
      { label: 'Tính Occ_1-30 bằng Broadcasting', latex: '\\text{Occ}_{1-30} = \\frac{30.0 - A_{30}}{30.0}' },
    ],
    pythonExample: {
      title: 'Dùng np.where và Boolean Masking trên mảng giá',
      code: `import numpy as np
a30 = np.array([0, 15, 30, 10])
occ30 = (30.0 - a30) / 30.0  # Broadcasting số 30.0
high_occ = occ30[occ30 >= 0.5]
print("Occ30:", np.round(occ30, 2), "| >=50%:", high_occ)`,
      output: 'Occ30: [1.   0.5  0.   0.67] | >=50%: [1.   0.5  0.67]',
    },
    handCalculation: {
      prompt: 'Cho mảng A = [[10, 20], [30, 40]]. Tính A.sum(axis=0) và A.sum(axis=1).',
      steps: [
        'axis=0 (gộp dọc theo các hàng): cột 0 = 10+30 = 40; cột 1 = 20+40 = 60 -> [40, 60].',
        'axis=1 (gộp ngang theo các cột): hàng 0 = 10+20 = 30; hàng 1 = 30+40 = 70 -> [30, 70].',
      ],
      answer: 'axis=0 -> [40, 60]; axis=1 -> [30, 70].',
    },
    airbnbApplication: 'src/kpi.py dùng phép toán vector hóa hoàn toàn để tính PPG, Occ_1-30, Occ_31-90 và Urgency Gap cho 1.000 listing; src/viz.py dùng np.argwhere(mat.isna().to_numpy()) để gắn chữ "NA" lên các ô thiếu của heatmap.',
    commonPitfalls: [
      'Dùng and / or của Python thay cho & / | khi kết hợp hai boolean mask.',
      'Quên dấu ngoặc quanh từng điều kiện: (a > 0) & (a < 30).',
      'Nhầm lẫn chiều axis=0 và axis=1 khi tính sum/mean trên bảng 2D.',
    ],
    selfCheckQuestions: [
      { q: 'Vì sao NumPy tính nhanh hơn Python list?', a: 'Vì ndarray lưu phần tử cùng 1 dtype liên tiếp trong RAM, tránh overhead kiểm tra kiểu ở mỗi vòng lặp và tận dụng SIMD của CPU.' },
      { q: 'Trong (30 - a30) / 30, Broadcasting diễn ra ở đâu?', a: 'Số vô hướng 30 được broadcast thành mảng có cùng shape với a30 để trừ và chia từng phần tử.' },
    ],
    vivaQuestions: [
      { q: 'Tại sao trong src/viz.py hàm _heatmap() dùng np.argwhere(mat.isna().to_numpy())?', a: 'Để lấy chính xác cặp tọa độ (hàng r, cột c) của mọi ô bị NaN trên ma trận heatmap và vẽ nhãn "NA" vào đúng tâm ô đó.' },
    ],
    summary: [
      'Luôn ưu tiên vectorization trước khi nghĩ tới vòng lặp for.',
      'Dùng &, |, ~ và đặt ngoặc từng vế khi tạo boolean mask.',
      'axis=0 tổng hợp theo cột; axis=1 tổng hợp theo hàng.',
    ],
  },
  {
    id: 'bai-04',
    number: 'Bài 4',
    group: 'Nhóm 1 – Nền tảng lập trình & xử lý dữ liệu',
    title: 'Làm quen với pandas',
    subtitle: 'Series, DataFrame, Index, Selection, Filtering & Copy-on-Write',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Hiểu sự khác biệt giữa NumPy ndarray (theo vị trí) và pandas Series/DataFrame (có nhãn index & columns).',
      'Phân biệt .loc (theo nhãn) và .iloc (theo vị trí số nguyên).',
      'Tránh lỗi Chained Assignment và bẫy so sánh trung bình khi tập quan sát thay đổi.',
    ],
    coreConcepts: [
      'Series = dữ liệu 1D có nhãn index + dtype; DataFrame = bảng 2D gồm nhiều Series cùng index.',
      '.loc["a":"b"] lấy cả mốc cuối "b"; .iloc[0:2] bỏ mốc cuối 2.',
      'pandas 3 Copy-on-Write: sửa Series tách ra hoặc df["col"]["a"] = ... không sửa bảng gốc; phải dùng df.loc[mask, "col"] = val.',
    ],
    terms: [
      { term: 'DataFrame', meaning: 'Cấu trúc bảng dữ liệu hai chiều có nhãn hàng (index) và nhãn cột (columns), mỗi cột có thể mang dtype riêng.' },
      { term: 'Series', meaning: 'Cấu trúc dữ liệu một chiều có nhãn chỉ mục (index).' },
      { term: 'Chained Assignment', meaning: 'Gán qua 2 cặp ngoặc liên tiếp như df[mask]["col"] = x — bị lỗi/cảnh báo và không đảm bảo ghi vào bảng gốc.' },
    ],
    essence: 'Trong dữ liệu thực tế như Airbnb, mỗi cột mang một kiểu khác nhau (ID là chuỗi, giá là số thực, ngày là datetime) và mỗi hàng gắn với một mã chỗ ở. pandas gắn nhãn cho hàng và cột để ta thao tác bằng tên thay vì phải nhớ cột giá nằm ở vị trí số mấy.',
    pythonExample: {
      title: 'Lọc và gán an toàn bằng .loc trong pandas',
      code: `import pandas as pd, numpy as np
df = pd.DataFrame({"loai": ["Entire", "Private"], "gia": [100.0, 50.0]}, index=["L1", "L2"])
mask = df["loai"] == "Entire"
df.loc[mask, "gia_sau_thue"] = df.loc[mask, "gia"] * 1.1
print(df)`,
      output: '      loai    gia  gia_sau_thue\nL1  Entire  100.0         110.0\nL2  Private  50.0           NaN',
    },
    handCalculation: {
      prompt: 'Kỳ 1 có 3 căn giá [100, 200, 300]; Kỳ 2 có [110, 210, NaN]. Vì sao trung bình chung giảm từ 200 xuống 160 dù mọi căn có giá đều tăng?',
      steps: [
        'Kỳ 1: (100 + 200 + 300) / 3 = 200.',
        'Kỳ 2: (110 + 210) / 2 = 160 (vì căn 300 bị thiếu giá).',
        'Nếu chỉ xét 2 căn có đủ giá cả 2 kỳ: (100+200)/2 = 150 -> (110+210)/2 = 160 (tăng +10).',
      ],
      answer: 'Do tập quan sát có giá bị thay đổi giữa 2 kỳ, không phải giá giảm.',
    },
    airbnbApplication: 'Mỗi bảng listings.csv của Nhóm 4 gồm 1.000 hàng và >70 cột. Toàn bộ phép lọc trong filter_data_from_sheet.py, qa.py và kpi.py đều dùng .loc[mask, cols] và .copy() trước khi biến đổi bảng.',
    commonPitfalls: [
      'Ghi đè bang_gia = df mà quên .copy() khiến sửa bang_gia làm hỏng df gốc.',
      'Dùng df["gia"] trả về Series nhưng df[["gia"]] trả về DataFrame 1 cột.',
      'Lưu CSV bằng to_csv(index=False) khi đang đặt "id" làm index -> làm mất luôn cột id!',
    ],
    selfCheckQuestions: [
      { q: 'df.loc[0:2] và df.iloc[0:2] khác nhau thế nào khi index là [0, 1, 2, 3]?', a: 'df.loc[0:2] lấy 3 hàng (nhãn 0, 1, 2); df.iloc[0:2] chỉ lấy 2 hàng đầu (vị trí 0, 1).' },
      { q: 'Tại sao cột id luôn phải kiểm tra trước khi to_csv(..., index=False)?', a: 'Nếu id đang làm index (như sau set_index("id")), phải gọi .reset_index() trước khi to_csv(index=False) nếu không sẽ mất cột id.' },
    ],
    vivaQuestions: [
      { q: 'Trong src/kpi.py hàm build_kpi_by_listing(), tại sao cuối hàm lại có return base.reset_index()?', a: 'Vì trong quá trình tính toán, bảng base dùng cột "id" làm index để reindex các Series KPI giữa 4 snapshot khớp nhau; trước khi xuất ra kpi_by_listing.csv với index=False phải gọi reset_index() để đưa "id" trở lại thành cột bình thường.' },
    ],
    summary: [
      'Dùng .loc cho nhãn, .iloc cho vị trí số nguyên.',
      'Luôn dùng .loc[mask, col] = value để gán, tránh chained assignment.',
      'Kiểm tra xem khóa chính có đang ở index không trước khi lưu CSV.',
    ],
  },
  {
    id: 'bai-05',
    number: 'Bài 5',
    group: 'Nhóm 1 – Nền tảng lập trình & xử lý dữ liệu',
    title: 'Series và DataFrame chuyên sâu',
    subtitle: 'Index Alignment, map/apply, cut/qcut, groupby/agg/transform & merge',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Nắm vững cơ chế căn chỉnh chỉ mục tự động (Index Alignment) khi tính toán giữa 2 Series.',
      'Phân biệt map(), apply(), agg() và transform().',
      'Sử dụng groupby() với Named Aggregation và merge(..., validate=...) an toàn.',
    ],
    coreConcepts: [
      'Index Alignment: Phép trừ s2 - s1 khớp theo nhãn index, không theo thứ tự hàng.',
      'size() đếm mọi hàng kể cả NaN; count() chỉ đếm giá trị không thiếu.',
      'transform() trả kết quả cùng chiều dài bảng gốc (dùng để điền theo nhóm hoặc so sánh từng hàng với trung bình nhóm).',
      'cut (ngưỡng cố định so được qua nhiều kỳ) vs qcut (chia nhóm cỡ bằng nhau theo phân vị).',
    ],
    terms: [
      { term: 'Index Alignment', meaning: 'Pandas tự động ghép cặp phần tử dựa trên nhãn index khi cộng/trừ/gán Series.' },
      { term: 'Split-Apply-Combine', meaning: 'Mô hình 3 bước của groupby: chia nhóm -> tính trên từng nhóm -> gộp lại thành bảng.' },
      { term: 'validate="many_to_one"', meaning: 'Tham số kiểm tra quan hệ khóa trong merge() để báo lỗi ngay nếu bảng phải bị trùng khóa.' },
    ],
    essence: 'Khi tính toán giữa 4 snapshot khác nhau, thứ tự hàng có thể bị xáo trộn hoặc thiếu hàng. Nếu chuyển sang mảng NumPy (.to_numpy()) để trừ trực tiếp, dữ liệu của căn hộ A sẽ trừ nhầm sang căn hộ B. Index Alignment và merge/reindex của pandas giải quyết triệt để rủi ro này.',
    pythonExample: {
      title: 'Index Alignment và GroupBy Named Aggregation',
      code: `s1 = pd.Series([100, 80], index=["L1", "L2"])
s2 = pd.Series([90, 120], index=["L2", "L1"])
print(s2 - s1)  # Khớp đúng L1=20, L2=10 dù thứ tự đảo ngược`,
      output: 'L1    20\nL2    10\ndtype: int64',
    },
    handCalculation: {
      prompt: 'Khu A có 2 căn (mean=100), Khu B có 8 căn (mean=200). Trung bình cộng của toàn bộ 10 căn là bao nhiêu?',
      steps: [
        'Sai lầm phổ biến: lấy (100 + 200)/2 = 150.',
        'Đúng (bình quân gia quyền theo cỡ mẫu): (100×2 + 200×8) / (2 + 8) = 1800 / 10 = 180.',
      ],
      answer: '180 (không phải 150).',
    },
    airbnbApplication: 'src/kpi.py gọi df.set_index("id") cho cả 4 snapshot để tính Review Velocity (nr_curr - nr_prev) và dùng .reindex(df.index) đảm bảo khớp đúng ID; dùng merge(..., how="left") để gắn neighbourhood_cleansed vào bảng review LLM.',
    commonPitfalls: [
      'Dùng .values / .to_numpy() giữa 2 bảng chưa chắc cùng thứ tự hàng làm ghép sai ID.',
      'Dùng apply(axis=1) cho công thức số học đơn giản làm chậm gấp ~1.000 lần vector hóa.',
      'Quên dropna=False trong groupby() khiến các bản ghi thiếu nhãn nhóm âm thầm biến mất.',
    ],
    selfCheckQuestions: [
      { q: 'size và count trong groupby khác nhau thế nào?', a: 'size đếm tất cả các hàng trong nhóm (kể cả NaN); count chỉ đếm các ô không thiếu (non-null) ở cột đang xét.' },
      { q: 'Khi nào nên dùng pd.cut thay cho pd.qcut?', a: 'Khi cần so sánh qua nhiều mốc thời gian hoặc nhiều thành phố trên cùng một ngưỡng cố định (vd: giá cao >= 2.000 MXN).' },
    ],
    vivaQuestions: [
      { q: 'Trong src/kpi.py, tại sao compute_review_velocities() có thể viết trực tiếp diff = nr_curr - nr_prev giữa 2 snapshot?', a: 'Vì ở _load_snapshots(), mỗi DataFrame đã được df.set_index("id"). Nhờ Index Alignment của pandas, nr_curr - nr_prev tự động trừ đúng từng cặp listing cùng id kể cả khi thứ tự dòng khác nhau.' },
    ],
    summary: [
      'Không bao giờ bỏ nhãn (.to_numpy()) khi thao tác giữa 2 bảng có mã định danh.',
      'Phân biệt agg (thu gọn mỗi nhóm 1 dòng) với transform (giữ nguyên số dòng gốc).',
      'Kiểm tra quan hệ khóa khi merge bằng tham số validate.',
    ],
  },
  {
    id: 'bai-06',
    number: 'Bài 6',
    group: 'Nhóm 2 – Kết nối & biến đổi dữ liệu',
    title: 'Kết nối và truy xuất dữ liệu ngoài',
    subtitle: 'CSV vs Parquet, HTTP Requests, Status Codes, Chunk Processing & DuckDB',
    relevance: 'Cốt lõi BTL',
    objectives: [
      'Hiểu bẫy "CSV không lưu kiểu dữ liệu" và cách dùng dtype, keep_default_na, na_values khi đọc.',
      'Sử dụng thư viện requests đúng chuẩn: timeout, raise_for_status(), kiểm mã HTTP và lưu tệp stream an toàn.',
      'Hiểu nguyên lý Chunk Processing và truy vấn SQL tại nguồn bằng DuckDB trên tệp lớn.',
    ],
    coreConcepts: [
      'CSV lưu văn bản thuần nên ID dài/số 0 ở đầu dễ bị ép nhầm sang int64/float64.',
      'keep_default_na=False tránh trường hợp mã hợp lệ (như "NA" - North America) bị biến thành NaN.',
      'requests.get(url, stream=True, timeout=60) + ghi file .tmp + kiểm Content-Length.',
      'Chunking (chunksize=100_000) xử lý file lớn từng phần mà không tràn RAM.',
    ],
    terms: [
      { term: 'CSV.GZ', meaning: 'Tệp văn bản phân cách dấu phẩy được nén bằng thuật toán gzip; pandas đọc trực tiếp qua compression="infer".' },
      { term: 'Parquet', meaning: 'Định dạng nhị phân lưu theo cột (columnar), bảo toàn schema/dtype và nén hiệu quả cho bảng trung gian.' },
      { term: 'HTTP Status Code', meaning: 'Mã trạng thái phản hồi (200 OK, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 503 Unavailable).' },
      { term: 'DuckDB', meaning: 'Hệ quản trị CSDL phân tích nhúng chạy SQL trực tiếp trên file CSV/Parquet/DataFrame mà không cần server.' },
    ],
    essence: 'Mọi dữ liệu thô đi vào pipeline đều đến từ thế giới bên ngoài (file nén trên web, Google Sheets CSV endpoint, REST API). Nếu đọc sai kiểu ngay từ cửa vào (ví dụ mất chính xác ID 19 chữ số khi ép float) hoặc tải file bị cụt giữa chừng không kiểm tra, toàn bộ tầng QA và KPI phía sau đều hỏng.',
    pythonExample: {
      title: 'Đọc Google Sheets CSV endpoint an toàn với dtype="string"',
      code: `resp = requests.get(sheet_csv_url, timeout=60)
resp.raise_for_status()
df = pd.read_csv(StringIO(resp.content.decode("utf-8-sig")), dtype="string", keep_default_na=False)`,
      output: 'Giữ nguyên toàn bộ ID dưới dạng string, không biến chuỗi rỗng hay chữ "NA" thành NaN.',
    },
    handCalculation: {
      prompt: 'Một file calendar.csv.gz khi giải nén có 15 triệu dòng, mỗi lần đọc chunksize=100_000. Cần bao nhiêu vòng lặp để quét hết file?',
      steps: [
        'Số chunk = 15.000.000 / 100.000 = 150 chunk.',
        'Mỗi chunk chỉ giữ các dòng có listing_id thuộc tập 1.000 ID (~400.000 dòng cuối cùng sau khi gộp) -> RAM luôn ổn định nhỏ.',
      ],
      answer: '150 lượt đọc tuần tự.',
    },
    airbnbApplication: 'src/download.py dùng requests stream + .tmp + Exponential Backoff; src/filter_data_from_sheet.py đọc Google Sheets bằng /gviz/tq?tqx=out:csv và lọc file .csv.gz bằng chunksize=100_000 + dtype={"id": "string", "listing_id": "string"}.',
    commonPitfalls: [
      'Không truyền dtype={"id": "string"} làm mã ID 19 chữ số (vd 1495709040675944121) bị làm tròn thành float64 mất các chữ số cuối.',
      'Dùng requests.get() không có timeout khiến chương trình treo vô hạn khi server không phản hồi.',
      'Thấy status 200 hoặc đọc JSON thành công nhưng quên kiểm tra cấu trúc cột bắt buộc.',
    ],
    selfCheckQuestions: [
      { q: 'Tại sao không chuyển listing_id hay review_id sang float/int để tiết kiệm RAM?', a: 'Float64 chỉ chính xác đến ~15–16 chữ số (2^53), trong khi ID Airbnb dài 18–19 chữ số nên ép float sẽ làm nhiều ID khác nhau gộp thành 1 số giống hệt nhau!' },
      { q: 'WHERE và HAVING trong SQL khác nhau thế nào?', a: 'WHERE lọc từng hàng trước khi GROUP BY; HAVING lọc các nhóm sau khi đã tính hàm tổng hợp (AVG, COUNT).' },
    ],
    vivaQuestions: [
      { q: 'Vì sao src/filter_data_from_sheet.py truyền keep_default_na=False khi đọc Google Sheets?', a: 'Để kiểm soát chặt chẽ dữ liệu phân công dạng chuỗi: giữ nguyên các ô trống thành "" thay vì tự động biến chuỗi như "NA" hoặc ô trống thành NaN gây lỗi khi gọi .str.strip() hoặc so sánh eq("x").' },
    ],
    summary: [
      'CSV không lưu schema -> luôn khai báo dtype cho cột mã định danh.',
      'Luôn có timeout, raise_for_status() và ghi tạm .tmp khi tải qua HTTP.',
      'Dùng chunksize (hoặc DuckDB) để xử lý tệp lớn hơn RAM.',
    ],
  },
];

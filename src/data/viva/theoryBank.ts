import type { VivaQuestion } from '../../types';

export const VIVA_THEORY_BANK: VivaQuestion[] = [
  {
    "id": "vt-001",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt dict vs set trong Python.",
    "question": "Trong Python, `set` và `dict` giống và khác nhau thế nào về cấu trúc lưu trữ và ứng dụng?",
    "quickAnswer": "Cả hai đều dùng bảng băm (hash table) tra cứu trung bình O(1), nhưng `set` chỉ lưu tập khóa duy nhất còn `dict` lưu cặp `key: value`.",
    "explanation": "Do băm khóa, phần tử trong `set` và khóa trong `dict` phải hashable (như str, int, tuple; không thể là list). Trong BTL, `set` lọc ID còn `dict` ánh xạ ID -> khu vực hoặc cache.",
    "projectLink": "src/filter_data_from_sheet.py:L125, L175",
    "codeLocation": "src/filter_data_from_sheet.py:L125, L175",
    "proofExample": "filter_data_from_sheet.py:L125 dùng `allowed = set(assigned_ids)` và `area_by_listing = dict(zip(...))`.",
    "followUpQuestions": [
      "Nếu viết `list(assigned_ids)` thay cho `set(assigned_ids)` trước `.isin()`, hiệu năng thay đổi ra sao?"
    ],
    "followUpQA": [
      {
        "q": "Nếu viết `list(assigned_ids)` thay cho `set(assigned_ids)` trước `.isin()`, hiệu năng thay đổi ra sao?",
        "a": "Thực ra `Series.isin()` trong pandas có tạo hashtable nội bộ cho list, nhưng chuẩn hóa sẵn thành `set` tránh trùng lặp phần tử và rõ ràng về mặt thuật toán."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng tra cứu `x in list` cũng nhanh O(1) như `x in set`."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-002",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Phân biệt shallow copy vs deep copy trong Python.",
    "question": "Sự khác nhau giữa bản sao nông (`list.copy()` / `copy.copy()`) và bản sao sâu (`copy.deepcopy()`) là gì?",
    "quickAnswer": "Shallow copy chỉ tạo vỏ container mới nhưng vẫn trỏ chung các đối tượng lồng bên trong; deep copy nhân bản đệ quy toàn bộ các cấp lồng nhau.",
    "explanation": "Nếu sửa phần tử lồng bên trong (ví dụ list trong dict) ở bản shallow copy, bản gốc bị biến đổi theo; dùng `deepcopy` tách ly hoàn toàn.",
    "projectLink": "Bài 2 & src/llm.py:L361-L369",
    "codeLocation": "Bài 2 & src/llm.py:L361-L369",
    "proofExample": "Trong `src/llm.py:L368`, cache lưu dict có trường lồng `aspects` -> nếu chỉnh `rec[\"aspects\"]` mà không copy riêng sẽ ảnh hưởng đối tượng chia sẻ.",
    "followUpQuestions": [
      "Trong pandas, `df.copy(deep=True)` (mặc định) khác `df.copy(deep=False)` như thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas, `df.copy(deep=True)` (mặc định) khác `df.copy(deep=False)` như thế nào?",
        "a": "`deep=True` tạo bản sao dữ liệu và index riêng; `deep=False` tạo vỏ DataFrame mới chia sẻ chung vùng nhớ mảng (từ pandas 3 CoW vẫn bảo vệ không ghi chéo)."
      }
    ],
    "commonMistakes": [
      "Tưởng `.copy()` trên dict lồng dict đã độc lập hoàn toàn mọi tầng sâu."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-003",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt 4 từ khóa điều khiển luồng return, break, continue, pass.",
    "question": "Phân biệt chính xác tác dụng của `return`, `break`, `continue` và `pass` trong hàm và vòng lặp Python.",
    "quickAnswer": "`return` thoát hàm và trả giá trị; `break` thoát khỏi vòng lặp gần nhất; `continue` nhảy qua lượt lặp tiếp theo; `pass` không làm gì cả (placeholder).",
    "explanation": "Mỗi từ khóa kiểm soát luồng khác hẳn nhau: nhầm `continue` với `break` trong vòng `load_cache()` sẽ làm mất toàn bộ phần còn lại của tệp chỉ vì 1 dòng hỏng.",
    "projectLink": "src/llm.py:L112, L222",
    "codeLocation": "src/llm.py:L112, L222",
    "proofExample": "src/llm.py:L112 dùng `continue` khi gặp `JSONDecodeError` để bỏ qua 1 dòng hỏng và đọc tiếp 999 dòng sau.",
    "followUpQuestions": [
      "Nếu viết `class QuotaExceededException(Exception): pass` (hoặc docstring), bỏ thân class không viết gì có hợp lệ không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu viết `class QuotaExceededException(Exception): pass` (hoặc docstring), bỏ thân class không viết gì có hợp lệ không?",
        "a": "Có thể viết docstring thay cho `pass`, nhưng nếu không có bất kỳ câu lệnh/docstring nào trong thân class thì Python báo `IndentationError`."
      }
    ],
    "commonMistakes": [
      "Dùng `break` thay vì `continue` khi gặp dòng JSON lỗi trong vòng lặp đọc file."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-004",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Hiểu rõ cơ chế ngoại lệ cụ thể vs except Exception chung.",
    "question": "Tại sao nên bắt ngoại lệ cụ thể (như `except (requests.RequestException, IOError):`) thay vì `except:` trần trụi?",
    "quickAnswer": "`except:` trần bắt cả `KeyboardInterrupt` (Ctrl+C) và lỗi cú pháp/lỗi logic (`NameError`, `KeyError`), che giấu bug khiến chương trình hỏng âm thầm.",
    "explanation": "Bắt đúng nhóm ngoại lệ lường trước giúp tách bạch sự cố môi trường (mạng rớt, JSON hỏng) với lỗi lập trình thật sự.",
    "projectLink": "src/download.py:L68; src/filter_data_from_sheet.py:L261-L269",
    "codeLocation": "src/download.py:L68; src/filter_data_from_sheet.py:L261-L269",
    "proofExample": "src/download.py:L68 bắt `(requests.RequestException, IOError)` còn `filter_data_from_sheet.py:L261` liệt kê đúng 5 nhóm ngoại lệ.",
    "followUpQuestions": [
      "Tại sao `KeyboardInterrupt` không kế thừa từ `Exception` trong Python?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `KeyboardInterrupt` không kế thừa từ `Exception` trong Python?",
        "a": "Nó kế thừa từ `BaseException`, nên `except Exception:` sẽ không nuốt nhầm thao tác nhấn Ctrl+C của người dùng."
      }
    ],
    "commonMistakes": [
      "Viết `except Exception: pass` làm mất dấu vết lỗi hoàn toàn."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-005",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Hiểu hàm lambda và giới hạn của lambda trong xử lý dữ liệu.",
    "question": "Khi nào nên dùng `lambda` trong Python và khi nào tuyệt đối nên tránh dùng `lambda` trong pandas?",
    "quickAnswer": "`lambda` phù hợp làm hàm ẩn danh 1 dòng cho `key=` trong `sorted()` hoặc biểu thức ngắn; nhưng nên tránh truyền `lambda` từng dòng vào `df.apply()` vì làm mất tối ưu vector hóa.",
    "explanation": "Khi gọi `df.apply(lambda row: ..., axis=1)`, Python phải thực thi bytecode hàm cho từng hàng thay vì chạy trên vector NumPy/C.",
    "projectLink": "Bài 2 & src/evaluate.py:L68",
    "codeLocation": "Bài 2 & src/evaluate.py:L68",
    "proofExample": "src/evaluate.py:L68 chỉ dùng lambda trên 11 cột nhỏ của 100/1.000 dòng sau khi đọc nhãn; còn `src/kpi.py` dùng vector hóa hoàn toàn.",
    "followUpQuestions": [
      "Nếu cần sắp xếp danh sách tuple `(snap, path)` theo ngày thật thay vì chuỗi chữ cái, viết `sorted(..., key=...)` thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu cần sắp xếp danh sách tuple `(snap, path)` theo ngày thật thay vì chuỗi chữ cái, viết `sorted(..., key=...)` thế nào?",
        "a": "Truyền `key=pd.to_datetime` trực tiếp vào `sorted()`, như `src/qa.py:L327`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `lambda` giúp code chạy nhanh hơn hàm `def` thường (tốc độ giống hệt nhau)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-006",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Hiểu List/Dict/Set Comprehension và Generator Expression.",
    "question": "Sự khác biệt về bộ nhớ và tốc độ giữa List Comprehension `[x for ...]` và Generator Expression `(x for ...)` là gì?",
    "quickAnswer": "List Comprehension tạo toàn bộ danh sách trong RAM ngay lập tức; Generator Expression sinh phần tử lười (lazy evaluation) từng cái một, tốn bộ nhớ O(1).",
    "explanation": "Khi đếm tổng số dòng hoặc nối tập lớn mà không cần lập chỉ mục ngẫu nhiên, Generator như `sum(1 for ...)` tối ưu RAM vượt trội.",
    "projectLink": "src/llm.py:L379",
    "codeLocation": "src/llm.py:L379",
    "proofExample": "src/llm.py:L379 dùng `sum(1 for _, row in reviews_df.iterrows() if ...)` (generator bên trong `sum`) không tạo list phụ.",
    "followUpQuestions": [
      "Tại sao gọi `list(gen)` lần thứ hai trên cùng một Generator lại ra danh sách rỗng `[]`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao gọi `list(gen)` lần thứ hai trên cùng một Generator lại ra danh sách rỗng `[]`?",
        "a": "Vì Generator là iterator dùng một lần (single-pass); sau khi duyệt hết con trỏ đã tới cuối luồng."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng Generator có thể lấy độ dài bằng `len(gen)` hoặc duyệt lại lần 2."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-007",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Phân biệt `is` vs `==` khi kiểm tra `None` và số.",
    "question": "Tại sao kiểm tra `None` phải viết `val is None` thay vì `val == None`, và điều đó liên quan gì tới pandas `NaN`?",
    "quickAnswer": "`is` kiểm tra đồng nhất định danh bộ nhớ (identity) của singleton `None` và không bị operator overloading ghi đè; còn `np.nan == np.nan` lại trả về `False`.",
    "explanation": "Trong pandas, một ô có thể là `None`, `np.nan`, `pd.NA` hoặc `pd.NaT`, nên hàm chuẩn tổng quát nhất là `pd.isna(val)`.",
    "projectLink": "src/llm.py:L125",
    "codeLocation": "src/llm.py:L125",
    "proofExample": "src/llm.py:L125 kiểm tra `if val is None or pd.isna(val):` trong `_clean_str()`.",
    "followUpQuestions": [
      "Tại sao `bool(np.nan)` lại trả về `True` trong Python?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `bool(np.nan)` lại trả về `True` trong Python?",
        "a": "Vì theo chuẩn IEEE 754 mọi số thực khác `0.0` đều truthy, mà `NaN != 0.0` nên `if val:` khi `val = np.nan` sẽ chạy nhánh True — cực kỳ nguy hiểm!"
      }
    ],
    "commonMistakes": [
      "Viết `if val == np.nan:` (luôn cho False kể cả khi `val` đúng là `np.nan`!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-008",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hiểu Mutable Default Argument Trap trong định nghĩa hàm Python.",
    "question": "Bẫy `def f(x, cache={}):` (Mutable Default Argument) là gì và BTL tránh bẫy này như thế nào?",
    "quickAnswer": "Giá trị mặc định trong định nghĩa hàm chỉ khởi tạo MỘT LẦN lúc load module; nếu là list/dict, mọi lần gọi sau đều dùng chung và làm biến đổi cùng một đối tượng đó!",
    "explanation": "Cách chuẩn Python là đặt mặc định `= None`, rồi kiểm tra `if cache is None: cache = {}` bên trong thân hàm, hoặc dùng `tuple` (immutable) cho tham số mặc định.",
    "projectLink": "src/baseline.py:L84; src/kpi.py:L385",
    "codeLocation": "src/baseline.py:L84; src/kpi.py:L385",
    "proofExample": "src/baseline.py:L84 dùng tuple bất biến `aspects: tuple[str, ...] = ASPECTS`; `src/kpi.py:L385` dùng `aspects: Optional[List[str]] = None`.",
    "followUpQuestions": [
      "Trong `src/evaluate.py:L54`, tham số `aspects=ASPECTS` có mắc bẫy này không nếu trong hàm chỉ đọc chứ không `.append()`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py:L54`, tham số `aspects=ASPECTS` có mắc bẫy này không nếu trong hàm chỉ đọc chứ không `.append()`?",
        "a": "Không gây lỗi runtime nếu không mutate `ASPECTS`, nhưng vẫn nên dùng tuple hoặc `None` làm default cho an toàn tuyệt đối."
      }
    ],
    "commonMistakes": [
      "Truyền trực tiếp `= []` hoặc `= {}` làm tham số mặc định trong hàm xử lý dữ liệu."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-009",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt Module, Package và cơ chế `if __name__ == \"__main__\":`.",
    "question": "Khối `if __name__ == \"__main__\":` cuối mỗi tệp trong `src/` có tác dụng gì đối với việc tái sử dụng code?",
    "quickAnswer": "Nó đảm bảo hàm `main()` chỉ chạy khi file được thực thi trực tiếp, và KHÔNG tự chạy khi file được file khác `import`.",
    "explanation": "Nếu thiếu guard này, khi `src/evaluate.py` chạy dòng `from llm import DEFAULT_ASPECTS`, toàn bộ pipeline LLM sẽ bị kích hoạt lại ngoài ý muốn!",
    "projectLink": "src/evaluate.py:L26; src/llm.py:L454",
    "codeLocation": "src/evaluate.py:L26; src/llm.py:L454",
    "proofExample": "src/evaluate.py:L26 import `DEFAULT_ASPECTS` từ `src/llm.py` mà không làm `llm.main()` chạy.",
    "followUpQuestions": [
      "Khi chạy `python src/qa.py`, giá trị của biến `__name__` bên trong `qa.py` là gì vs khi `evaluate.py` import `llm.py`?"
    ],
    "followUpQA": [
      {
        "q": "Khi chạy `python src/qa.py`, giá trị của biến `__name__` bên trong `qa.py` là gì vs khi `evaluate.py` import `llm.py`?",
        "a": "Chạy trực tiếp: `\"__main__\"`; khi được import: tên module `\"llm\"`."
      }
    ],
    "commonMistakes": [
      "Quên guard `if __name__ == \"__main__\":` khiến câu lệnh `import` kích hoạt luôn cả pipeline nặng."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-010",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hiểu pathlib.Path(__file__).resolve() cho tính khả chuyển (Portability).",
    "question": "Tại sao toàn bộ BTL dùng `Path(__file__).resolve().parent.parent` thay vì dùng đường dẫn tương đối thuần hoặc `os.getcwd()`?",
    "quickAnswer": "Vì `Path(__file__).resolve()` neo cố định vào vị trí thực tế của file mã nguồn bất kể người dùng đang đứng ở thư mục làm việc (`cwd`) nào khi gõ lệnh python.",
    "explanation": "Dùng `pathlib.Path` tự xử lý dấu `/` trên Linux/Mac và `\\` trên Windows thay vì nối chuỗi thủ công dễ lỗi.",
    "projectLink": "run_pipeline.py:L8; src/viz.py:L26",
    "codeLocation": "run_pipeline.py:L8; src/viz.py:L26",
    "proofExample": "Cả 9 tệp từ `run_pipeline.py:L8` tới `src/viz.py:L26` đều định nghĩa `PROJECT_ROOT`/`ROOT` từ `__file__`.",
    "followUpQuestions": [
      "Nếu người dùng gõ `cd src && python kpi.py`, `PROJECT_ROOT` theo `__file__` trỏ đi đâu vs `Path.cwd()`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu người dùng gõ `cd src && python kpi.py`, `PROJECT_ROOT` theo `__file__` trỏ đi đâu vs `Path.cwd()`?",
        "a": "`Path.cwd()` trỏ vào `src/`, còn `Path(__file__).resolve().parent.parent` vẫn trỏ đúng về thư mục gốc dự án."
      }
    ],
    "commonMistakes": [
      "Dùng đường dẫn cứng `\"C:\\Users\\TenSV\\...\"` làm sập ngay khi chuyển sang máy giảng viên."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vt-011",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Hiểu f-string formatting cho báo cáo số liệu.",
    "question": "Giải thích ý nghĩa các định dạng f-string hay dùng trong BTL: `:,`, `:.2f`, `:.1%`, `:+0.3f`.",
    "quickAnswer": "`:,` phân cách hàng nghìn bằng dấu phẩy; `:.2f` làm tròn 2 chữ số thập phân cố định; `:.1%` nhân 100 và gắn dấu %; `:.3f` có `+` luôn in dấu `+/-`.",
    "explanation": "Định dạng đúng giúp log và nhãn biểu đồ dễ đọc và nhất quán giữa các lần chạy.",
    "projectLink": "src/viz.py:L457; src/qa.py:L295",
    "codeLocation": "src/viz.py:L457; src/qa.py:L295",
    "proofExample": "src/viz.py:L457 dùng `f\"{l:.3f} ({l - b:+.3f})\"` để hiển thị điểm LLM kèm độ chênh so với Baseline.",
    "followUpQuestions": [
      "Biểu thức `f\"{0.007:.2%}\"` cho kết quả chuỗi là gì?"
    ],
    "followUpQA": [
      {
        "q": "Biểu thức `f\"{0.007:.2%}\"` cho kết quả chuỗi là gì?",
        "a": "Cho ra `\"0.70%\"` (đúng với Ghost Rate mốc t1)."
      }
    ],
    "commonMistakes": [
      "Truyền giá trị đã nhân 100 sẵn (như `48.5`) vào `:.1%` khiến kết quả biến thành `4850.0%`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-012",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hiểu biến môi trường (`os.environ`), `.env` và `python-dotenv`.",
    "question": "Tại sao lưu API key trong `.env` + `.gitignore` + `load_dotenv()`, thay vì khai báo hằng trong code hay truyền qua tham số CLI?",
    "quickAnswer": "Code trên GitHub công khai sẽ lộ vĩnh viễn API key trong lịch sử commit nếu ghi vào file `.py`; còn truyền qua CLI có thể lưu lại trong shell history.",
    "explanation": "`.env` nằm trong `.gitignore` chỉ tồn tại trên máy cục bộ, được `load_dotenv()` nạp vào `os.environ` trước khi `os.getenv(\"GEMINI_API_KEY\")` đọc ra.",
    "projectLink": "src/llm.py:L398; .gitignore",
    "codeLocation": "src/llm.py:L398; .gitignore",
    "proofExample": "src/llm.py:L398 nạp `load_dotenv(PROJECT_ROOT / \".env\")` và repo mẫu có `.env.example`.",
    "followUpQuestions": [
      "Nếu biến môi trường `GEMINI_API_KEY` đã được set sẵn trên hệ điều hành trước đó, `load_dotenv()` mặc định có ghi đè bằng giá trị trong `.env` không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu biến môi trường `GEMINI_API_KEY` đã được set sẵn trên hệ điều hành trước đó, `load_dotenv()` mặc định có ghi đè bằng giá trị trong `.env` không?",
        "a": "Mặc định `override=False`, nên biến môi trường hệ thống được ưu tiên giữ nguyên nếu đã có."
      }
    ],
    "commonMistakes": [
      "Commit file `.env` lên Git rồi mới xóa ở commit sau (key vẫn còn trong git log cũ!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-013",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Hiểu `sys.stdout.reconfigure(encoding=\"utf-8\")` trên Windows.",
    "question": "Vì sao nhiều file trong `src/` có đoạn kiểm tra `sys.stdout.reconfigure(encoding=\"utf-8\", errors=\"replace\")`?",
    "quickAnswer": "Console Windows cũ mặc định dùng bảng mã `cp1252`, sẽ ném `UnicodeEncodeError` làm crash chương trình khi `print()` tiếng Việt có dấu.",
    "explanation": "Gọi `reconfigure` (kèm `callable(getattr(..., \"reconfigure\", None))` phòng môi trường test không hỗ trợ) ép luồng xuất dùng UTF-8, kết hợp `PYTHONIOENCODING=utf-8` trong `run_pipeline.py`.",
    "projectLink": "src/kpi.py:L13-L14; run_pipeline.py:L47",
    "codeLocation": "src/kpi.py:L13-L14; run_pipeline.py:L47",
    "proofExample": "src/qa.py:L17, src/llm.py:L16, src/kpi.py:L13, src/evaluate.py:L17, run_pipeline.py:L47.",
    "followUpQuestions": [
      "Tại sao phải kiểm tra `callable(getattr(sys.stdout, \"reconfigure\", None))` thay vì gọi thẳng `sys.stdout.reconfigure()`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao phải kiểm tra `callable(getattr(sys.stdout, \"reconfigure\", None))` thay vì gọi thẳng `sys.stdout.reconfigure()`?",
        "a": "Vì một số môi trường như Jupyter Notebook, pytest capture hoặc ống dẫn cũ bọc stdout không có phương thức `.reconfigure`."
      }
    ],
    "commonMistakes": [
      "Bỏ qua lỗi encoding tiếng Việt khiến pipeline chạy được trên macOS nhưng chết ngay khi chấm trên Windows."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-014",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Vận dụng",
    "evaluationGoal": "Hiểu Độ phức tạp Thời gian (Big-O) của các cấu trúc dữ liệu trong BTL.",
    "question": "So sánh độ phức tạp thời gian của tra cứu `list`, `set`, `dict` và thuật toán gom lỗi `phan_tich_loi()` trong BTL.",
    "quickAnswer": "Tra cứu `x in list` là O(N); `x in set` và `dict[k]` là O(1) trung bình; việc chuẩn bị `res_by_id` / `allowed = set(...)` hạ độ phức tạp ghép bảng từ O(N²) xuống O(N).",
    "explanation": "Khi N = 10 triệu dòng `calendar`, thuật toán O(N × M) không chỉ chậm mà còn có thể treo hàng giờ; bảng băm biến phép đối chiếu xuống vài giây.",
    "projectLink": "src/filter_data_from_sheet.py:L125; src/llm.py:L348",
    "codeLocation": "src/filter_data_from_sheet.py:L125; src/llm.py:L348",
    "proofExample": "src/llm.py:L348 tạo `res_by_id = {str(item[\"id\"]).strip(): item ...}` tra cứu O(1) cho từng row trong batch.",
    "followUpQuestions": [
      "Độ phức tạp không gian (RAM) của `_filter_raw_by_ids()` với `chunksize=100_000` phụ thuộc vào kích thước toàn file hay kích thước chunk?"
    ],
    "followUpQA": [
      {
        "q": "Độ phức tạp không gian (RAM) của `_filter_raw_by_ids()` với `chunksize=100_000` phụ thuộc vào kích thước toàn file hay kích thước chunk?",
        "a": "Phụ thuộc chủ yếu vào kích thước 1 chunk (100.000 dòng) + kích thước tập kết quả đã lọc (1.000–5.000 dòng), không tỷ lệ với dung lượng cả file gốc."
      }
    ],
    "commonMistakes": [
      "Viết vòng lặp tìm kiếm tuyến tính lồng nhau trong batch hoặc filter."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-015",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Đặc điểm ndarray đồng nhất dtype và thuộc tính shape/ndim/size.",
    "question": "Ba thuộc tính `shape`, `ndim`, `size` và ràng buộc `dtype` của mảng NumPy `ndarray` nghĩa là gì?",
    "quickAnswer": "`ndarray` bắt buộc mọi phần tử cùng 1 kiểu (`dtype`) nằm liên tiếp trên RAM; `shape` là kích thước từng trục, `ndim` là số chiều, `size` là tổng phần tử.",
    "explanation": "Nhờ dữ liệu liên tiếp cùng kiểu trên vùng nhớ C, NumPy chạy SIMD vector nhanh hơn list Python hàng trăm lần.",
    "projectLink": "Bài 3 & src/viz.py:L214-L215",
    "codeLocation": "Bài 3 & src/viz.py:L214-L215",
    "proofExample": "src/viz.py:L214 dùng `pts = np.vstack(...)` để tìm `xmin, ymin = pts.min(axis=0)` cho bản đồ Choropleth.",
    "followUpQuestions": [
      "Nếu tạo `np.array([1, 2.5, \"3\"])`, `dtype` của mảng thu được là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu tạo `np.array([1, 2.5, \"3\"])`, `dtype` của mảng thu được là gì?",
        "a": "Bị ép kiểu đồng nhất thành chuỗi Unicode (`<U32` — toàn bộ phần tử thành `\"1\"`, `\"2.5\"`, `\"3\"`)."
      }
    ],
    "commonMistakes": [
      "Trộn lẫn chuỗi và số vào một `ndarray` mà tưởng mỗi phần tử vẫn giữ nguyên kiểu riêng (thực tế bị upcast hết thành string `<U...>` hoặc `object`)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-016",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Quy tắc Broadcasting 1D–2D từ phải sang trái.",
    "question": "Phát biểu quy tắc tương thích Broadcasting trong NumPy và giải thích vì sao trừ mảng `(10, 4)` với mảng `(10,)` lại lỗi?",
    "quickAnswer": "NumPy so khớp `shape` từng cặp từ PHẢI sang TRÁI: hai chiều tương thích khi bằng nhau hoặc một trong hai bằng `1`. `(10, 4)` vs `(10,)` lệch ngay ở chiều cuối (`4 != 10`).",
    "explanation": "Muốn trừ mỗi hàng cho giá trị tương ứng của nó (theo chiều dọc dài 10), bắt buộc mở rộng trục cuối thành `(10, 1)` bằng `v[:, np.newaxis]` hoặc `v.reshape(-1, 1)`.",
    "projectLink": "Bài 3",
    "codeLocation": "Bài 3",
    "proofExample": "Tính chuẩn hóa ma trận KPI hoặc tính điểm Z theo hàng/cột.",
    "followUpQuestions": [
      "Tham số `keepdims=True` trong `arr.mean(axis=1, keepdims=True)` giúp gì cho Broadcasting?"
    ],
    "followUpQA": [
      {
        "q": "Tham số `keepdims=True` trong `arr.mean(axis=1, keepdims=True)` giúp gì cho Broadcasting?",
        "a": "Giữ shape đầu ra thành `(10, 1)` thay vì `(10,)` để phép `arr - arr.mean(axis=1, keepdims=True)` broadcast hợp lệ ngay lập tức."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng cứ mảng `(10,)` thì tự khớp với chiều có độ dài 10 của ma trận `(10, 4)` (thực tế phải kiểm từ phải sang trái!)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-017",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Cái bẫy Eager Evaluation của np.where(cond, a, b).",
    "question": "Tại sao viết `np.where(x > 0, 100 / x, np.nan)` vẫn phát sinh cảnh báo `RuntimeWarning: divide by zero` khi `x` chứa số `0`?",
    "quickAnswer": "Vì Python/NumPy tính toán XONG cả hai nhánh `100 / x` và `np.nan` rồi mới đưa vào `np.where()` lọc chọn, nên phép chia `100 / 0` vẫn xảy ra trên phần tử bằng 0!",
    "explanation": "Trong pandas, viết `s.where(s > 0, np.nan)` trước rồi mới chia (`100 / clean_s`), hoặc lọc index trước khi chia như `clean_price / clean_acc`.",
    "projectLink": "Bài 3 & src/kpi.py:L233-L235",
    "codeLocation": "Bài 3 & src/kpi.py:L233-L235",
    "proofExample": "src/kpi.py:L235 dùng `.where(valid_price & valid_acc, np.nan)` trên mẫu số đã được làm sạch `clean_acc` (> 0) nên không sinh cảnh báo chia 0.",
    "followUpQuestions": [
      "Trong pandas, `Series.where(cond, other)` giữ giá trị gốc khi `cond` là `True` hay `False`?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas, `Series.where(cond, other)` giữ giá trị gốc khi `cond` là `True` hay `False`?",
        "a": "Ngược nhiều người hay nhầm: `s.where(cond, np.nan)` GIỮ giá trị gốc nơi `cond == True` và thay thành `np.nan` nơi `cond == False`! (Hàm `mask()` mới làm ngược lại)."
      }
    ],
    "commonMistakes": [
      "Tưởng `np.where()` hoạt động lười (lazy) như câu lệnh `if/else` chỉ tính nhánh thỏa điều kiện."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-018",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt axis=0 và axis=1 trong các phép tổng hợp.",
    "question": "Trong mảng 2D `(hàng, cột)` hoặc DataFrame, `axis=0` và `axis=1` thực hiện phép toán theo chiều nào?",
    "quickAnswer": "`axis=0` gộp dọc theo các hàng (thu gọn chiều 0 -> cho kết quả theo từng CỘT); `axis=1` gộp ngang qua các cột (thu gọn chiều 1 -> cho kết quả theo từng HÀNG).",
    "explanation": "Quy tắc nhớ nhanh: `axis=k` nghĩa là \"nén/triệt tiêu chiều thứ k\".",
    "projectLink": "src/evaluate.py:L179; src/viz.py:L215",
    "codeLocation": "src/evaluate.py:L179; src/viz.py:L215",
    "proofExample": "src/evaluate.py:L179 `so_kc = nhac.sum(axis=1)` đếm số khía cạnh trên mỗi dòng review; `src/viz.py:L215` `pts.min(axis=0)` tìm min kinh độ và vĩ độ theo 2 cột.",
    "followUpQuestions": [
      "Nếu một DataFrame có shape `(1000, 7)` gồm các cột boolean, kết quả của `df.any(axis=1)` có shape là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một DataFrame có shape `(1000, 7)` gồm các cột boolean, kết quả của `df.any(axis=1)` có shape là gì?",
        "a": "Shape `(1000,)` — kiểm tra xem mỗi review có ít nhất 1 khía cạnh được nhắc hay không (`src/kpi.py:L412`)."
      }
    ],
    "commonMistakes": [
      "Nhầm `axis=0` là tính tổng từng hàng còn `axis=1` là tổng từng cột."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-019",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hành vi của `np.nan` trong thống kê NumPy vs pandas.",
    "question": "Sự khác biệt mặc định khi tính trung bình trên mảng có `NaN` giữa `np.mean(arr)` và `series.mean()` trong pandas là gì?",
    "quickAnswer": "`np.mean(arr)` mặc định KHÔNG bỏ qua `NaN` (nếu có 1 `NaN` trả về toàn bộ `nan`, phải dùng `np.nanmean`); còn `pandas.Series.mean()` mặc định `skipna=True` tự bỏ `NaN`.",
    "explanation": "Điều này giải thích vì sao dùng `np.nanmax()` trong `src/viz.py:L365, L389` thay cho `np.max()`.",
    "projectLink": "src/viz.py:L365, L389",
    "codeLocation": "src/viz.py:L365, L389",
    "proofExample": "src/viz.py:L365 dùng `np.nanmax(rv_vals)` vì Q1 có cột NaN hoặc thiếu dữ liệu.",
    "followUpQuestions": [
      "Trong `np.percentile()` vs `pd.Series.quantile()`, hai hàm xử lý thiếu khác nhau thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `np.percentile()` vs `pd.Series.quantile()`, hai hàm xử lý thiếu khác nhau thế nào?",
        "a": "`np.percentile()` trả NaN nếu mảng có NaN (phải dùng `np.nanpercentile()`), còn `pd.Series.quantile()` tự loại NaN."
      }
    ],
    "commonMistakes": [
      "Quên kiểm `np.isfinite(...).any()` trước khi gọi `np.nanmax()` trên toàn mảng NaN gây `All-NaN slice` warning."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-020",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `np.arange` và `np.linspace`.",
    "question": "`np.arange(0, 1, 0.2)` và `np.linspace(0, 1, 6)` khác nhau cơ bản ở tham số nào và cái nào dùng an toàn hơn cho số thực?",
    "quickAnswer": "`arange` truyền bước nhảy (`step`) có thể bị lệch điểm cuối do sai số dấu phẩy động; `linspace` truyền số lượng điểm chia (`num=6`) và mặc định bao gồm cả mốc cuối `1.0`.",
    "explanation": "Dùng `linspace` để chia vạch trục biểu đồ số thực như thang `[0.0, 0.2, ..., 1.0]` rất chính xác; `arange` hợp với số nguyên.",
    "projectLink": "src/viz.py:L449, L461",
    "codeLocation": "src/viz.py:L449, L461",
    "proofExample": "src/viz.py:L461 dùng `xticks=np.linspace(0, 1, 6)` cho trục F1 [0–1] và `y = np.arange(len(ev))` cho tọa độ nguyên các thanh bar.",
    "followUpQuestions": [
      "`np.linspace(0, 1, 5)` sinh ra các vạch nào (bước 0.2 hay 0.25)?"
    ],
    "followUpQA": [
      {
        "q": "`np.linspace(0, 1, 5)` sinh ra các vạch nào (bước 0.2 hay 0.25)?",
        "a": "5 điểm gồm cả 2 đầu là `[0.0, 0.25, 0.5, 0.75, 1.0]` — muốn bước 0.2 phải truyền `6` điểm!"
      }
    ],
    "commonMistakes": [
      "Dùng `np.arange(0, 1.0, 0.2)` bị thiếu vạch `1.0` ở rìa phải biểu đồ."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-021",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Vector hóa phép chia/tạo mặt nạ nhị phân thay thế hoàn toàn if/for.",
    "question": "Cách chuyển biểu thức phân đoạn `if/else` theo từng phần tử sang NumPy/pandas không dùng vòng lặp `for`?",
    "quickAnswer": "Dùng tổ hợp mặt nạ boolean `&`, `|`, `~`, `.where()`, `.mask()`, hoặc `np.select([cond1, cond2], [val1, val2], default=...)`.",
    "explanation": "Các hàm mặt nạ hoạt động trực tiếp trên toàn bộ mảng, giúp xử lý sạch, dễ đọc và không tạo nhánh rẽ Python từng dòng.",
    "projectLink": "src/kpi.py:L171-L173",
    "codeLocation": "src/kpi.py:L171-L173",
    "proofExample": "src/kpi.py:L171-L173 dùng `series.mask(valid_eval & is_ghost, 1).mask(valid_eval & (~is_ghost), 0)`.",
    "followUpQuestions": [
      "Phép toán `&` và `and` khác nhau gì khi kết hợp 2 điều kiện boolean trên pandas Series?"
    ],
    "followUpQA": [
      {
        "q": "Phép toán `&` và `and` khác nhau gì khi kết hợp 2 điều kiện boolean trên pandas Series?",
        "a": "`and` cố ép toàn Series thành 1 giá trị True/False và ném `ValueError: truth value of a Series is ambiguous`; bắt buộc dùng toán tử bitwise `&` kèm ngoặc đơn `(...) & (...)`."
      }
    ],
    "commonMistakes": [
      "Viết hàm `def ghost_row(r): if ...` rồi gọi `.apply(ghost_row, axis=1)`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-022",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Hiểu `np.argwhere` và tìm tọa độ ô khuyết trên ma trận.",
    "question": "Đoạn lệnh `for r, c in np.argwhere(mat.isna().to_numpy()):` trong `src/viz.py:L70` trả về cấu trúc dữ liệu gì?",
    "quickAnswer": "`np.argwhere(mask)` trả về mảng 2D các cặp chỉ số `(row_idx, col_idx)` của mọi ô mang giá trị `True` (tức các ô bị `NaN`).",
    "explanation": "Nhờ có cặp tọa độ nguyên `(r, c)`, matplotlib dễ dàng đặt chữ `\"NA\"` vào chính giữa ô heatmap tại tọa độ `(c + 0.5, r + 0.5)`.",
    "projectLink": "src/viz.py:L70-L71",
    "codeLocation": "src/viz.py:L70-L71",
    "proofExample": "src/viz.py:L70-L71 tô chữ `\"NA\"` lên mọi ô khuyết của Q1 trong `kpi_review_ghost.png`.",
    "followUpQuestions": [
      "Nếu `mat` không có bất kỳ giá trị `NaN` nào, vòng `for r, c in np.argwhere(...)` có lỗi không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `mat` không có bất kỳ giá trị `NaN` nào, vòng `for r, c in np.argwhere(...)` có lỗi không?",
        "a": "Không lỗi: `np.argwhere` trả về mảng shape `(0, 2)` nên vòng lặp chạy 0 lần."
      }
    ],
    "commonMistakes": [
      "Truyền nhầm `(r + 0.5, c + 0.5)` vào `ax.text(x, y, ...)` làm chữ NA bị hoán đổi trục X/Y (trục X là cột `c`, trục Y là hàng `r`)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-023",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Tính đồng nhất khi gộp tọa độ và dùng `np.roll` trong Shoelace centroid.",
    "question": "Phép `np.roll(x0, -1)` trong hàm `_centroid()` của `src/viz.py` thực hiện thao tác hình học gì?",
    "quickAnswer": "Dịch vòng mảng tọa độ đỉnh đi 1 bước sang trái để ghép từng đỉnh `P_i = (x_i, y_i)` với đỉnh kế tiếp `P_{i+1} = (x_{i+1}, y_{i+1})` (và đỉnh cuối khép kín về đỉnh đầu).",
    "explanation": "Nhờ vector hóa phép nhân chéo `x0 * y1 - x1 * y0` bằng NumPy, diện tích và trọng tâm đa giác hàng trăm đỉnh được tính tức thì không cần vòng `for`.",
    "projectLink": "src/viz.py:L98-L104",
    "codeLocation": "src/viz.py:L98-L104",
    "proofExample": "src/viz.py:L98-L104 tính trọng tâm 16 quận CDMX.",
    "followUpQuestions": [
      "Nếu một đa giác có thứ tự các đỉnh bị ngược chiều kim đồng hồ vs cùng chiều kim đồng hồ, `area2` thay đổi dấu nhưng `(cx, cy)` có bị đổi dấu không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một đa giác có thứ tự các đỉnh bị ngược chiều kim đồng hồ vs cùng chiều kim đồng hồ, `area2` thay đổi dấu nhưng `(cx, cy)` có bị đổi dấu không?",
        "a": "Không! Vì cả tử số `sum((x0+x1)*cross)` lẫn mẫu số `3*area2` đều đổi dấu cùng lúc nên dấu âm triệt tiêu, `(cx, cy)` vẫn chuẩn xác."
      }
    ],
    "commonMistakes": [
      "Tính trọng tâm bằng `mean()` tọa độ đỉnh khiến nhãn số thứ tự bị kéo lệch về đoạn biên có mật độ đỉnh dày."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-024",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hiểu `np.ceil` trong tự động căn thang trục biểu đồ.",
    "question": "Tại sao `src/viz.py:L365` viết `float(np.ceil(np.nanmax(rv_vals)))` hoặc chia 5 nhân 5 trước khi `ceil` ở L389?",
    "quickAnswer": "`np.ceil()` làm tròn lên số nguyên (hoặc bội số 5 gần nhất) giúp giới hạn trục/thang màu đẹp, chẵn vạch và không bao giờ cắt cụt thanh dữ liệu cao nhất.",
    "explanation": "Trong Matplotlib, nếu để tự động hoặc `round()`, cột dữ liệu lớn nhất có thể chạm sát mép trên khiến nhãn giá trị bị cắt mất khỏi khung hình.",
    "projectLink": "src/viz.py:L389, L413",
    "codeLocation": "src/viz.py:L389, L413",
    "proofExample": "Chia 5 -> `ceil` -> nhân 5 tại `L389` biến ví dụ `21.38 pp` thành giới hạn đối xứng đẹp `[-25.0, +25.0] pp`.",
    "followUpQuestions": [
      "Với `llm_insights.png` (L413), nếu giá trị max trong nhóm `n>=5` là `14.82%`, `vmax` được tính ra bằng bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Với `llm_insights.png` (L413), nếu giá trị max trong nhóm `n>=5` là `14.82%`, `vmax` được tính ra bằng bao nhiêu?",
        "a": "`ceil(14.82 / 5) * 5 = ceil(2.964) * 5 = 3 * 5 = 15.0%` (hoặc tùy các khía cạnh khác nếu vượt 15%)."
      }
    ],
    "commonMistakes": [
      "Dùng `round()` làm giới hạn trục đôi khi bị làm tròn xuống thấp hơn giá trị thực tế lớn nhất."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-025",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `np.atleast_1d(...).ravel()` với mảng axes từ `plt.subplots`.",
    "question": "Vì sao hàm `plot_ppg_snapshots()` gọi `np.atleast_1d(axes).ravel()` ngay sau `plt.subplots(nrows, 2, ...)`?",
    "quickAnswer": "Khi `nrows == 1` hoặc `1x1`, `plt.subplots` có thể trả về mảng 1D hoặc 1 đối tượng Axes duy nhất thay vì mảng 2D; `np.atleast_1d(axes).ravel()` ép mọi trường hợp về mảng 1D lặp được đồng nhất.",
    "explanation": "Lập trình phòng thủ kiểu này giúp hàm vẽ không phụ thuộc cứng vào số lượng snapshot cố định là 4, hỗ trợ tái sử dụng cho cấu hình 1 hoặc 2 snapshot.",
    "projectLink": "src/viz.py:L156",
    "codeLocation": "src/viz.py:L156",
    "proofExample": "Thiết kế phòng thủ này đảm bảo code vẫn chạy êm nếu cấu hình YAML chỉ có 1 hoặc 2 snapshot thay vì 4.",
    "followUpQuestions": [
      "`.ravel()` khác `.flatten()` ở điểm nào trong NumPy?"
    ],
    "followUpQA": [
      {
        "q": "`.ravel()` khác `.flatten()` ở điểm nào trong NumPy?",
        "a": "`.ravel()` trả về view dùng chung vùng nhớ nếu mảng liên tục (nhanh hơn, không tốn RAM sao chép), còn `.flatten()` luôn tạo bản copy mới."
      }
    ],
    "commonMistakes": [
      "Viết `axes[i // 2, i % 2]` sẽ crash `TypeError` hoặc `IndexError` ngay khi chạy cho bộ dữ liệu chỉ có 2 snapshot (`nrows=1`)."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-026",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Độ chính xác dấu phẩy động IEEE 754 (float64) và lý do không lưu ID Airbnb bằng float64.",
    "question": "Giới hạn độ chính xác số nguyên của chuẩn `float64` (2^53) là gì và gây thảm họa gì với dữ liệu Inside Airbnb?",
    "quickAnswer": "`float64` chỉ biểu diễn chính xác tối đa 53 bit phần định trị (~9 × 10^15, tức khoảng 15–16 chữ số thập phân); các số nguyên 18–19 chữ số vượt ngưỡng này sẽ bị làm tròn các chữ số cuối.",
    "explanation": "ID review và ID listing của Airbnb từ 2024–2026 đều dài 18–19 chữ số (vd `1338606907362090089`), nên đọc thành `float64` sẽ gộp nhầm nhiều review khác nhau thành cùng 1 mã!",
    "projectLink": "src/filter_data_from_sheet.py:L130; src/kpi.py:L103",
    "codeLocation": "src/filter_data_from_sheet.py:L130; src/kpi.py:L103",
    "proofExample": "Tất cả bước đọc CSV ở `filter_data_from_sheet.py`, `qa.py`, `llm.py`, `evaluate.py`, `kpi.py` đều ép `id` thành `string`.",
    "followUpQuestions": [
      "Số `2^53` xấp xỉ bao nhiêu và có ít hơn `1338606907362090089` không?"
    ],
    "followUpQA": [
      {
        "q": "Số `2^53` xấp xỉ bao nhiêu và có ít hơn `1338606907362090089` không?",
        "a": "`2^53 = 9,007,199,254,740,992` (~9×10^15), nhỏ hơn `1.33×10^18` tới hơn 140 lần!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `int64` không làm tròn nhưng quên mất khi cột CSV có một ô rỗng `NaN`, pandas tự động nâng cả cột từ `int64` sang `float64`!"
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-027",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `.loc` và `.iloc` kể cả quy tắc slicing và bẫy chỉ số âm/không liên tục.",
    "question": "Nêu 3 điểm khác nhau chí mạng giữa `.loc[]` và `.iloc[]` trong pandas, đặc biệt với slicing và nhãn số nguyên.",
    "quickAnswer": "(1) `.loc` truy cập theo NHÃN index/tên cột, `.iloc` theo VỊ TRÍ nguyên 0..n-1; (2) slicing `.loc[a:b]` LẤY CẢ `b`, còn `.iloc[0:2]` BỎ mốc cuối `2`; (3) `.iloc[-1]` lấy dòng cuối, còn `.loc[-1]` tìm nhãn số `-1` (thường báo `KeyError`).",
    "explanation": "Ngoài ra nếu index là các số nguyên rời rạc `[0, 2, 5]`, `df.loc[0:2]` chỉ trả về 2 hàng (nhãn 0 và 2), khác hẳn `df.iloc[0:2]` (vị trí 0 và 1).",
    "projectLink": "Bài 4 & src/filter_data_from_sheet.py:L135",
    "codeLocation": "Bài 4 & src/filter_data_from_sheet.py:L135",
    "proofExample": "src/qa.py:L67, src/filter_data_from_sheet.py:L135 đều dùng `.loc[mask]` để tránh chained indexing.",
    "followUpQuestions": [
      "Nếu một DataFrame có nhãn index bị trùng (ví dụ có 2 dòng cùng index `\"101\"`), kết quả `df.loc[\"101\"]` trả về kiểu gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một DataFrame có nhãn index bị trùng (ví dụ có 2 dòng cùng index `\"101\"`), kết quả `df.loc[\"101\"]` trả về kiểu gì?",
        "a": "Trả về một `DataFrame` 2 dòng thay vì `Series` 1 dòng!"
      }
    ],
    "commonMistakes": [
      "Nhầm rằng `.loc[0:5]` cũng trả 5 dòng giống `.iloc[0:5]`, hoặc truyền danh sách tên cột vào `.iloc[]`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-028",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `Series.map()`, `DataFrame.map()`, `apply()`, `transform()` và `agg()`.",
    "question": "So sánh tác dụng và tình huống dùng của `Series.map()`, `DataFrame.map()`, `apply()`, `transform()` và `agg()`.",
    "quickAnswer": "`Series.map()` ánh xạ 1-1 qua dict/hàm trên từng phần tử (khóa thiếu thành `NaN`); `DataFrame.map()` (pandas 2.1+, thay `applymap`) tác động từng ô; `groupby().agg()` thu gọn mỗi nhóm thành 1 dòng; `groupby().transform()` trả về cùng độ dài & index bảng gốc; `apply()` linh hoạt nhất nhưng chạy vòng lặp Python.",
    "explanation": "Chọn đúng hàm giúp code vừa sạch vừa không mất tốc độ Cython.",
    "projectLink": "Bài 5 & src/filter_data_from_sheet.py:L210",
    "codeLocation": "Bài 5 & src/filter_data_from_sheet.py:L210",
    "proofExample": "filter_data_from_sheet.py:L210 dùng `id.map(area_by_listing)` để gán cột `analysis_area`; `kpi.py` dùng `.agg()`/`.mean()`/`.count()` qua từng cột nhóm.",
    "followUpQuestions": [
      "Khi dùng `df.groupby(\"area\")[\"price\"].transform(\"median\")`, kích thước đầu ra có bằng `len(df)` hay bằng số lượng khu vực (8)?"
    ],
    "followUpQA": [
      {
        "q": "Khi dùng `df.groupby(\"area\")[\"price\"].transform(\"median\")`, kích thước đầu ra có bằng `len(df)` hay bằng số lượng khu vực (8)?",
        "a": "Bằng đúng `len(df)` (1.000 phần tử) — giá trị trung vị của khu vực được phát sóng (broadcast) lặp lại cho từng dòng thuộc khu vực đó."
      }
    ],
    "commonMistakes": [
      "Viết `.replace(dict)` khi muốn ánh xạ toàn bộ sang tập mới (mà quên `replace` giữ nguyên giá trị nếu thiếu khóa, còn `map` biến khóa thiếu thành `NaN`)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-029",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `pd.concat()` vs `pd.merge()` và hành vi nguy hiểm của `NaN == NaN` trong `pd.merge()`.",
    "question": "Khi nào dùng `pd.concat()` vs `pd.merge()`? Vì sao cần đặc biệt cảnh giác giá trị `NaN` ở cột khóa khi gọi `pd.merge()`?",
    "quickAnswer": "`pd.concat([a, b], axis=0/1)` xếp chồng dọc theo cột hoặc ghép ngang theo index; `pd.merge()` thực hiện phép JOIN theo giá trị cột khóa. Đặc biệt: trái với SQL (`NULL != NULL`), `pd.merge()` mặc định COI `NaN == NaN` là KHỚP NHAU!",
    "explanation": "Nếu bảng trái có 100 dòng `listing_id = NaN` và bảng phải có 50 dòng `listing_id = NaN`, `pd.merge()` sẽ bùng nổ thành 5.000 dòng tích Đề-các!",
    "projectLink": "src/kpi.py:L409 & Bài 5",
    "codeLocation": "src/kpi.py:L409 & Bài 5",
    "proofExample": "src/kpi.py:L409 lọc `.dropna(subset=[\"review_id\", \"listing_id\"])` NGAY TRƯỚC khi gọi `.merge(id_to_neigh, on=\"listing_id\", how=\"left\")`.",
    "followUpQuestions": [
      "Nếu ghép các bảng không cùng kiểu khóa (bên trái `id` là `string`, bên phải `id` là `int64`), `pd.merge()` xử lý sao?"
    ],
    "followUpQA": [
      {
        "q": "Nếu ghép các bảng không cùng kiểu khóa (bên trái `id` là `string`, bên phải `id` là `int64`), `pd.merge()` xử lý sao?",
        "a": "Báo `ValueError: You are trying to merge on object/string and int64 columns` — bắt buộc chuẩn hóa ID cùng `string` trước."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `pd.merge()` tự bỏ qua khóa `NaN` giống `INNER JOIN` trong SQL."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-030",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Tham số `validate=` và `indicator=True` trong `pd.merge()`.",
    "question": "Tham số `validate=\"many_to_one\"` và `indicator=True` khi gọi `pd.merge()` giúp bắt lỗi dữ liệu nào?",
    "quickAnswer": "`validate=\"many_to_one\"` bắt buộc cột khóa bảng phải là duy nhất (nếu trùng sẽ ném `MergeError` thay vì nhân đôi dòng âm thầm); `indicator=True` sinh cột `_merge` (`left_only`, `right_only`, `both`) để kiểm tra bản ghi mồ côi.",
    "explanation": "Trong BTL, nếu bảng tra cứu `id -> neighbourhood` có 1 ID bị trùng 2 dòng với tên quận khác nhau, không có `drop_duplicates(\"id\")` hay `validate` sẽ làm nhân đôi toàn bộ review của căn đó.",
    "projectLink": "src/kpi.py:L402-L409",
    "codeLocation": "src/kpi.py:L402-L409",
    "proofExample": "src/kpi.py:L402 chủ động gọi `.drop_duplicates(\"id\")` trước khi merge sang `reviews_df`.",
    "followUpQuestions": [
      "Nếu hai bảng có chung tên một cột KHÔNG phải khóa (ví dụ cả hai đều có cột `\"comments\"`), `pd.merge()` đặt tên mới thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu hai bảng có chung tên một cột KHÔNG phải khóa (ví dụ cả hai đều có cột `\"comments\"`), `pd.merge()` đặt tên mới thế nào?",
        "a": "Tự động gắn hậu tố `\"_x\"` cho bảng trái và `\"_y\"` cho bảng phải (hoặc theo tham số `suffixes=`)."
      }
    ],
    "commonMistakes": [
      "Tin tưởng mặc định bảng tra cứu khóa chính không bao giờ bị trùng rồi không kiểm tra hoặc deduplicate."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-031",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cơ chế Index Alignment và sự khác nhau với thao tác mảng thuần.",
    "question": "Index Alignment (Căn chỉnh chỉ mục) là gì và khi nào nó vừa là cứu tinh vừa có thể trở thành bẫy?",
    "quickAnswer": "Khi cộng, trừ hoặc gán giữa hai đối tượng pandas, hệ thống tự động khớp theo GIÁ TRỊ NHÃN `index` (bổ sung `NaN` nếu thiếu một phía), thay vì khớp theo vị trí vật lý `0, 1, 2`.",
    "explanation": "Nó là cứu tinh ở `nr_curr - nr_prev` (`kpi.py:L131`) khi `index=\"id\"`; nhưng sẽ là bẫy sinh toàn `NaN` nếu quên `reset_index(drop=True)` trước khi gán/ghép ngang 2 bảng có index khác nhau.",
    "projectLink": "src/baseline.py:L151; src/kpi.py:L131, L166",
    "codeLocation": "src/baseline.py:L151; src/kpi.py:L131, L166",
    "proofExample": "src/baseline.py:L151 gọi `reset_index(drop=True)` trước `pd.concat(..., axis=1)`; `src/kpi.py:L166` gọi `.reindex(df.index)`.",
    "followUpQuestions": [
      "Nếu `s1 = Series([10, 20], index=[\"a\", \"b\"])` và `s2 = Series([1, 2], index=[\"b\", \"c\"])`, kết quả `s1 + s2` là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `s1 = Series([10, 20], index=[\"a\", \"b\"])` và `s2 = Series([1, 2], index=[\"b\", \"c\"])`, kết quả `s1 + s2` là gì?",
        "a": "Trả về Series 3 phần tử có index `[\"a\", \"b\", \"c\"]` với giá trị `[NaN, 21.0, NaN]`."
      }
    ],
    "commonMistakes": [
      "Quên reset index sau khi `.dropna()` hoặc lọc rồi gán sang DataFrame mới đánh số từ 0."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-032",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Boolean Indexing + Kleene 3-valued logic với `pd.NA` + Ưu tiên toán tử.",
    "question": "Tại sao điều kiện lọc `(df[\"a\"] > 0) & (df[\"b\"] < 10)` bắt buộc phải có ngoặc đơn, và tại sao cột `Int64` cần `.fillna(False)`?",
    "quickAnswer": "(1) Toán tử bitwise `&`, `|` có độ ưu tiên CAO HƠN phép so sánh `>`, `<`, nên thiếu ngoặc sẽ gộp sai thành `0 & df[\"b\"]` gây lỗi; (2) Kiểu nullable `Int64` khi so sánh tại ô `<NA>` sinh ra `pd.NA` chứ không phải `False`, làm crash boolean indexing nếu không gọi `.fillna(False)`.",
    "explanation": "Quy luật Kleene 3 giá trị: `True & pd.NA` là `pd.NA`, còn `False & pd.NA` mới là `False`.",
    "projectLink": "src/kpi.py:L197",
    "codeLocation": "src/kpi.py:L197",
    "proofExample": "src/kpi.py:L197 dùng `(g == 0).fillna(False)` trên cột `ghost` kiểu `Int64` trước khi dùng làm mặt nạ Occupancy.",
    "followUpQuestions": [
      "Khi chạy `df.loc[s == 0]` mà `s` mang dtype `Int64` và có 1 ô `<NA>`, pandas ném ngoại lệ gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi chạy `df.loc[s == 0]` mà `s` mang dtype `Int64` và có 1 ô `<NA>`, pandas ném ngoại lệ gì?",
        "a": "Ném `ValueError: Cannot mask with non-boolean array containing NA / NaN values`."
      }
    ],
    "commonMistakes": [
      "Viết `df[\"a\"] > 0 & df[\"b\"] < 10` không ngoặc hoặc lọc thẳng `df[df[\"ghost\"] == 0]` khi `ghost` có `<NA>`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-033",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Upcasting khi cắt 1 hàng `df.loc[row]` vs giữ dtype theo cột.",
    "question": "Tại sao trích một CỘT `df[\"price_mxn\"]` giữ nguyên `float64`, còn trích một HÀNG `df.loc[0]` thường biến hết thành `object`?",
    "quickAnswer": "Một `Series` chỉ có DUY NHẤT một `dtype`. Mỗi cột đồng nhất kiểu nên giữ nguyên `dtype`, còn một hàng chứa đồng thời chuỗi (`id`), số nguyên (`accommodates`), số thực (`price`), nên pandas buộc phải upcast cả hàng thành `object`.",
    "explanation": "Vì vậy không nên lặp từng hàng rồi ép tính toán số học trực tiếp từ đối tượng hàng nếu cột có kiểu hỗn hợp.",
    "projectLink": "Bài 4 & src/evaluate.py:L162",
    "codeLocation": "Bài 4 & src/evaluate.py:L162",
    "proofExample": "src/evaluate.py:L162 đọc từng hàng GT để so chuỗi `nhan, doan` trong `phan_tich_loi()`, nơi dữ liệu đã đồng nhất `str`.",
    "followUpQuestions": [
      "Kiểm tra kiểu dữ liệu từng cột hiệu quả nhất bằng thuộc tính gì của DataFrame?"
    ],
    "followUpQA": [
      {
        "q": "Kiểm tra kiểu dữ liệu từng cột hiệu quả nhất bằng thuộc tính gì của DataFrame?",
        "a": "`df.dtypes` hoặc `df.info()`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `row[\"price\"]` sau `df.iloc[0]` luôn giữ nguyên kiểu `float64` tốc độ cao."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-034",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Groupby traps: `dropna=True` mặc định, `observed`, `MultiIndex` và `lambda` cost.",
    "question": "Nêu 3 cái bẫy phổ biến nhất khi dùng `df.groupby()` với nhiều cột hoặc nhiều hàm tổng hợp.",
    "quickAnswer": "(1) Mặc định `dropna=True` âm thầm VỨT BỎ nhóm có khóa là `NaN` (trừ khi truyền `dropna=False`); (2) `.agg([\"mean\", \"median\"])` tạo cột `MultiIndex` 2 tầng khó truy xuất; (3) Với cột `Categorical`, `observed=False` sinh các tổ hợp nhóm 0 phần tử rỗng gây phình bảng.",
    "explanation": "Ngoài ra, `groupby().agg(func)` chỉ nhận 1 Series mỗi lần chứ không tham chiếu chéo 2 cột như tính tỷ số tổng (phải tự tính ở ngoài như `_iqr_stats`).",
    "projectLink": "src/kpi.py:L286, L422",
    "codeLocation": "src/kpi.py:L286, L422",
    "proofExample": "src/kpi.py:L286 truyền rõ `groupby(area_col, dropna=False)` cho area còn `L422` dùng `dropna=True` cho quận của review.",
    "followUpQuestions": [
      "Làm sao biến cột MultiIndex sinh bởi `.agg([\"mean\", \"median\"])` về bảng cột phẳng 1 tầng?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao biến cột MultiIndex sinh bởi `.agg([\"mean\", \"median\"])` về bảng cột phẳng 1 tầng?",
        "a": "Dùng Named Aggregation: `.groupby(\"col\").agg(avg_price=(\"price\", \"mean\"), med_price=(\"price\", \"median\"))`."
      }
    ],
    "commonMistakes": [
      "Quên kiểm tra xem trong cột phân nhóm có giá trị `NaN` bị `groupby()` mặc định nuốt mất hay không."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-035",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `pd.cut()` (khoảng giá trị cố định) vs `pd.qcut()` (phân vị đều cỡ).",
    "question": "Khi phân chia phân khúc giá phòng qua 4 quý, sự khác biệt giữa `pd.cut()` và `pd.qcut()` là gì?",
    "quickAnswer": "`pd.cut()` cắt theo ngưỡng giá trị cố định (so sánh được sự dịch chuyển số lượng giữa các mốc thời gian); `pd.qcut()` cắt theo phân vị (luôn ép mỗi nhóm có số lượng listing xấp xỉ bằng nhau).",
    "explanation": "Nếu cả CDMX tăng giá 67%, `pd.cut([0, 1000, 2000, inf])` phản ánh rõ dòng căn hộ tràn sang nhóm cao cấp, còn `pd.qcut(q=3)` vẫn giữ tỷ lệ 33%-33%-33%.",
    "projectLink": "Bài 5",
    "codeLocation": "Bài 5",
    "proofExample": "Nguyên lý phân tích phân tầng giá trong Bài 5 & diễn giải thu hẹp vùng đệm giá rẻ ở `story-price-ppg`.",
    "followUpQuestions": [
      "Hàm `pd.qcut` có thể báo lỗi gì nếu rất nhiều căn hộ có cùng một giá trị (ví dụ nhiều căn giá 0 hoặc 1.000 giống hệt nhau)?"
    ],
    "followUpQA": [
      {
        "q": "Hàm `pd.qcut` có thể báo lỗi gì nếu rất nhiều căn hộ có cùng một giá trị (ví dụ nhiều căn giá 0 hoặc 1.000 giống hệt nhau)?",
        "a": "Báo `ValueError: Bin edges must be unique` nếu không truyền `duplicates=\"drop\"`."
      }
    ],
    "commonMistakes": [
      "Dùng `pd.qcut` riêng từng snapshot rồi kết luận \"tỷ lệ căn hộ bình dân qua các quý vẫn luôn là 25% không đổi\"."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-036",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `.duplicated()` và `.drop_duplicates()` cùng tham số `subset` & `keep`.",
    "question": "Trong `src/qa.py`, tại sao `RULE_DEDUPLICATION` dùng `subset=[\"id\", \"last_scraped\"]` và `keep=\"first\"`?",
    "quickAnswer": "`subset` chỉ xét trùng trên khóa nghiệp vụ `(mã căn hộ, ngày cào)` trong cùng 1 snapshot; `keep=\"first\"` đánh dấu bản xuất hiện đầu tiên là `False` (giữ lại) và các bản lặp sau là `True` (xóa).",
    "explanation": "Nếu dùng `keep=False`, TẤT CẢ các bản trùng (kể cả bản đầu tiên) đều bị đánh dấu `True` và bị xóa sạch không còn bản nào!",
    "projectLink": "src/qa.py:L62-L67",
    "codeLocation": "src/qa.py:L62-L67",
    "proofExample": "src/qa.py:L62-L67 lọc `~dup_mask` sau `duplicated(subset=available_dedupe, keep=\"first\")`.",
    "followUpQuestions": [
      "Nếu có 2 dòng cùng `id` và `last_scraped` nhưng cột `price` lại khác nhau (hoặc `last_scraped = NaN`), rủi ro của `keep=\"first\"` là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu có 2 dòng cùng `id` và `last_scraped` nhưng cột `price` lại khác nhau (hoặc `last_scraped = NaN`), rủi ro của `keep=\"first\"` là gì?",
        "a": "`keep=\"first\"` giữ dòng trên và âm thầm vứt bỏ dòng dưới (đôi khi dòng dưới mới có giá không bị NaN); còn các dòng `NaN == NaN` cũng bị pandas coi là trùng khóa."
      }
    ],
    "commonMistakes": [
      "Dùng `subset=[\"id\"]` khi gộp cả 4 snapshot (xóa mất chuỗi lịch sử 4 quý của cùng một căn hộ!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-037",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hành vi `SettingWithCopy` / Copy-on-Write (CoW) trên pandas 2.2 vs 3.0.",
    "question": "Cơ chế Copy-on-Write (CoW) từ pandas 3.0 làm thay đổi cách viết code thao tác DataFrame như thế nào?",
    "quickAnswer": "Mọi thao tác indexing hoặc cắt lát DataFrame đều hành xử như trả về một bản sao độc lập (nhưng chỉ thật sự cấp phát bộ nhớ khi có phép ghi); bất kỳ Chained Assignment nào đều bị vô hiệu hóa không làm thay đổi bảng gốc.",
    "explanation": "Nhờ đó lập trình viên không còn bị thay đổi ngầm bảng cha qua biến con, nhưng bắt buộc phải viết `.loc[row_sel, col] = val` thay cho `df[row_sel][col] = val`.",
    "projectLink": "src/qa.py:L58 & Bài 4",
    "codeLocation": "src/qa.py:L58 & Bài 4",
    "proofExample": "src/qa.py:L58 chủ động tạo `df = df.copy()` ở đầu hàm để không ảnh hưởng `raw_df` truyền vào.",
    "followUpQuestions": [
      "Trong đoạn `a = df[[\"id\", \"price\"]]; a[\"price\"] = 0`, theo Copy-on-Write của pandas 3.0, `df` gốc có bị đổi không?"
    ],
    "followUpQA": [
      {
        "q": "Trong đoạn `a = df[[\"id\", \"price\"]]; a[\"price\"] = 0`, theo Copy-on-Write của pandas 3.0, `df` gốc có bị đổi không?",
        "a": "Không đổi! `a` tự tách bản sao khi thực hiện phép gán, giữ nguyên hoàn toàn `df` ban đầu."
      }
    ],
    "commonMistakes": [
      "Vẫn dùng thói quen pandas 1.x `subset = df[cond]; subset[\"a\"] = 1` và tưởng `df` đã đổi."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-038",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `value_counts(dropna=False)` và `.nunique(dropna=True)`.",
    "question": "Khi khám phá phân bố cột phân loại như `room_type` hay `neighbourhood_cleansed`, tại sao nên truyền `dropna=False` cho `value_counts()`?",
    "quickAnswer": "Mặc định `value_counts()` ẩn các ô `NaN` (`dropna=True`); truyền `dropna=False` giúp phát hiện ngay liệu cột phân loại đó có dòng thiếu nhãn hay không.",
    "explanation": "Tương tự, `normalize=True` biến số đếm thành tỷ trọng phần trăm tổng bằng 1.0.",
    "projectLink": "Bài 4",
    "codeLocation": "Bài 4",
    "proofExample": "Kiểm tra cấu trúc 875 Entire home / 125 Private room trong mẫu 1.000 listing CDMX.",
    "followUpQuestions": [
      "Cột `room_type` ở t4 nếu có 875 Entire, 125 Private, tổng `nunique()` trả về mấy?"
    ],
    "followUpQA": [
      {
        "q": "Cột `room_type` ở t4 nếu có 875 Entire, 125 Private, tổng `nunique()` trả về mấy?",
        "a": "Trả về `2`."
      }
    ],
    "commonMistakes": [
      "Tin vào `df[\"col\"].nunique()` bằng 15 rồi nghĩ cả cột không có giá trị thiếu (thực tế `nunique` cũng mặc định bỏ qua `NaN`)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-039",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Kiểm tra an toàn kiểu số với `pd.to_numeric(..., errors=\"coerce\")`.",
    "question": "Tại sao luôn dùng `pd.to_numeric(s, errors=\"coerce\")` thay vì gọi `.astype(float)` trong bước làm sạch dữ liệu?",
    "quickAnswer": "`.astype(float)` ném `ValueError` và làm sập toàn bộ pipeline ngay khi gặp 1 ô chữ bất kỳ (như `\"N/A\"`, `\"contact host\"`); còn `errors=\"coerce\"` âm thầm biến mọi ô không hợp lệ thành `NaN` để bước QA đếm và gắn cờ.",
    "explanation": "Đây là ranh giới sống còn giữa pipeline bền bỉ trước dữ liệu thực tế bẩn và script chỉ chạy được trên dữ liệu sạch giả lập.",
    "projectLink": "src/qa.py:L92-L93",
    "codeLocation": "src/qa.py:L92-L93",
    "proofExample": "src/qa.py:L92-L93, L186, L211, L253 và toàn bộ `src/kpi.py` đều dùng `pd.to_numeric(..., errors=\"coerce\")`.",
    "followUpQuestions": [
      "Nếu dùng `errors=\"ignore\"` thay vì `errors=\"coerce\"` thì chuyện gì xảy ra nếu có 1 chuỗi lỗi?"
    ],
    "followUpQA": [
      {
        "q": "Nếu dùng `errors=\"ignore\"` thay vì `errors=\"coerce\"` thì chuyện gì xảy ra nếu có 1 chuỗi lỗi?",
        "a": "pandas (phiên bản cũ) trả nguyên cả cột kiểu `object` không ép số luôn (và từ pandas 2.2+ `errors=\"ignore\"` đã bị deprecate/loại bỏ)!"
      }
    ],
    "commonMistakes": [
      "Gọi `.astype(float)` trực tiếp lên dữ liệu thô từ CSV."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-040",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Sự khác nhau giữa `.pivot()` / `.pivot_table()` và `.melt()`.",
    "question": "Phân biệt định dạng bảng Wide vs Long và tác dụng của `melt()` vs `pivot_table()` trong pandas.",
    "quickAnswer": "`melt()` xoay bảng ngang (Wide) thành dọc (Long) bằng cách gộp nhiều cột mốc thời gian thành cặp `(variable, value)`; `pivot_table()` làm chiều ngược lại kèm hàm tổng hợp (như biến `kpi_by_listing` thành ma trận Heatmap).",
    "explanation": "Trong BTL, `kpi_by_listing` ở dạng Wide (có `ppg_t1..ppg_t4`, `occ_1-30_t1..t4`) giúp trừ chéo giữa các snapshot trên cùng 1 hàng cực nhanh; còn Seaborn/Altair thường ưa dạng Long.",
    "projectLink": "Bài 5 & src/viz.py:L39",
    "codeLocation": "Bài 5 & src/viz.py:L39",
    "proofExample": "src/viz.py:L39 (`_mat`) trích xuất bảng ma trận khu vực × mốc thời gian để đưa trực tiếp vào heatmap.",
    "followUpQuestions": [
      "Tại sao `kpi_by_listing.csv` được thiết kế theo dạng Wide (mỗi cột gắn `_t1.._t4`) thay vì Long (4.000 dòng)?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `kpi_by_listing.csv` được thiết kế theo dạng Wide (mỗi cột gắn `_t1.._t4`) thay vì Long (4.000 dòng)?",
        "a": "Vì 1 dòng tương ứng duy nhất với 1 căn hộ xuyên suốt 4 quý (panel cân bằng), dễ quan sát biến động giá/ghost của cùng căn hộ và tính ngay được 1.000 dòng = 1.000 căn."
      }
    ],
    "commonMistakes": [
      "Dùng `.pivot()` trên dữ liệu có cặp khóa trùng thay vì `.pivot_table(aggfunc=...)` gây `ValueError: Index contains duplicate entries`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-041",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Đếm số lượng và xếp hạng `.rank(ascending=False, method=\"min\")`.",
    "question": "Tham số `method=\"min\"` trong `rank(ascending=False, method=\"min\")` của `src/kpi.py:L454` hoạt động thế nào khi hai quận có giá trung bình bằng nhau?",
    "quickAnswer": "Nếu hai quận cùng đứng hạng 2 (hạng 2 và 3), `method=\"min\"` gán cả hai quận cùng nhận hạng `#2`, và quận tiếp theo nhảy sang hạng `#4` (kiểu xếp hạng thể thao chuẩn 1, 2, 2, 4).",
    "explanation": "Ngoài ra bảng xếp hạng bỏ qua giá trị `NaN` và ép `Int64` để quận thiếu giá ở mốc `t2` giữ hạng `<NA>`.",
    "projectLink": "src/kpi.py:L454-L455",
    "codeLocation": "src/kpi.py:L454-L455",
    "proofExample": "src/kpi.py:L454-L455 tính `rank_price_t4` và `rank_ppg_t4` in trực tiếp lên bản đồ Choropleth.",
    "followUpQuestions": [
      "Nếu để mặc định `method=\"average\"` rồi gọi `.astype(\"Int64\")` khi có 2 quận hòa điểm 2.5 thì có lỗi gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu để mặc định `method=\"average\"` rồi gọi `.astype(\"Int64\")` khi có 2 quận hòa điểm 2.5 thì có lỗi gì?",
        "a": "Báo lỗi `TypeError/IntCastingNaNError` vì số `2.5` không thể ép trực tiếp sang kiểu số nguyên `Int64`!"
      }
    ],
    "commonMistakes": [
      "Không phân biệt `method=\"average\"` (mặc định trả số thực `2.5`) với `method=\"min\"` (số nguyên)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-042",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Sự khác nhau giữa `.reindex()` và `.loc[]` khi tập nhãn đích lớn hơn tập nguồn.",
    "question": "Tại sao `src/kpi.py` dùng `velocities[col].reindex(df.index)` và `out.reindex(all_neighs)` thay vì `df.loc[all_neighs]`?",
    "quickAnswer": "Từ các phiên bản pandas mới, truyền danh sách nhãn có chứa phần tử KHÔNG TỒN TẠI vào `.loc[keys]` sẽ báo `KeyError`; trong khi `.reindex(keys)` tự giữ `NaN` an toàn cho mọi nhãn vắng mặt.",
    "explanation": "Nhờ `.reindex(all_neighs)`, 3 quận có `llm_review_count = 0` vẫn được chèn vào bảng `kpi_by_neighbourhood` một cách mượt mà.",
    "projectLink": "src/kpi.py:L433",
    "codeLocation": "src/kpi.py:L433",
    "proofExample": "src/kpi.py:L166, L196, L274, L433.",
    "followUpQuestions": [
      "Khi dùng `.reindex(all_neighs, fill_value=0)` cho toàn bộ bảng `out` có nên không?"
    ],
    "followUpQA": [
      {
        "q": "Khi dùng `.reindex(all_neighs, fill_value=0)` cho toàn bộ bảng `out` có nên không?",
        "a": "KHÔNG nên! Điền `fill_value=0` cho cả bảng sẽ biến 14 cột tỷ lệ phàn nàn của quận không có review LLM thành 0.0% sai sự thật (chỉ điền 0 cho cột đếm `llm_review_count`!)."
      }
    ],
    "commonMistakes": [
      "Gọi `out.loc[all_neighs]` gây crash `KeyError: \"['Xochimilco', ...] not in index\"`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-043",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích của `low_memory=False` trong `pd.read_csv()`.",
    "question": "Cờ `low_memory=False` trong lệnh `pd.read_csv()` của `filter_data_from_sheet.py`, `qa.py`, `kpi.py` giải quyết vấn đề gì?",
    "quickAnswer": "Khi `low_memory=True` (mặc định với engine C), pandas đọc và suy luận `dtype` từng chunk 1 phần nhỏ bên trong file -> cùng 1 cột có thể nửa trên là `int`, nửa dưới là `str` sinh `DtypeWarning`; `low_memory=False` đọc toàn bộ cột (hoặc chunk chuẩn) để thống nhất 1 dtype duy nhất.",
    "explanation": "Kết hợp với truyền `dtype={\"id\": \"string\"}` giúp kiểm soát hoàn toàn kiểu dữ liệu cột khóa.",
    "projectLink": "src/filter_data_from_sheet.py:L131",
    "codeLocation": "src/filter_data_from_sheet.py:L131",
    "proofExample": "Xuất hiện ở `filter_data_from_sheet.py:L131`, `qa.py:L337`, `kpi.py:L103`, `viz.py:L31`.",
    "followUpQuestions": [
      "Nếu một file CSV nặng 5GB mà dùng `low_memory=False` không có `chunksize` thì có giải quyết được lỗi tràn RAM không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một file CSV nặng 5GB mà dùng `low_memory=False` không có `chunksize` thì có giải quyết được lỗi tràn RAM không?",
        "a": "KHÔNG! Để không tràn RAM khi file vượt bộ nhớ máy, bắt buộc phải truyền `chunksize=...` (hoặc dùng `usecols=` / DuckDB)."
      }
    ],
    "commonMistakes": [
      "Nhầm rằng `low_memory=False` làm chương trình tốn RAM gấp đôi (thực tế chỉ giúp thống nhất kiểu suy luận và tránh DtypeWarning)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-044",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hàm `.to_dict(\"index\")` vs `.to_dict()` mặc định.",
    "question": "Sự khác biệt giữa `df.to_dict()` (mặc định) và `df.to_dict(\"index\")` trong hàm `gom_du_doan()` ở `src/evaluate.py:L86` là gì?",
    "quickAnswer": "Mặc định `to_dict()` ánh xạ `{tên_cột: {index: giá_trị}}`; còn `to_dict(\"index\")` xoay ngược lại thành `{index (mã review): {tên_khía_cạnh: nhãn}}` để tra nhanh theo từng review.",
    "explanation": "Nhờ `aspect_labels = kc.to_dict(\"index\")`, hàm `ti_le_dung_nhan_khia_canh()` tra ngay `du_doan[\"aspect_labels\"].get(ma, {}).get(a)` trong O(1).",
    "projectLink": "src/evaluate.py:L79-L86",
    "codeLocation": "src/evaluate.py:L79-L86",
    "proofExample": "src/evaluate.py:L79, L86",
    "followUpQuestions": [
      "Để `to_dict(\"index\")` hoạt động đúng mà không bị trùng khóa mất dòng, `doc_bang()` đã làm gì trước đó?"
    ],
    "followUpQA": [
      {
        "q": "Để `to_dict(\"index\")` hoạt động đúng mà không bị trùng khóa mất dòng, `doc_bang()` đã làm gì trước đó?",
        "a": "Gọi `df.drop_duplicates(\"id\").set_index(\"id\")` ở `src/evaluate.py:L69`."
      }
    ],
    "commonMistakes": [
      "Truy vấn ngược `aspects` và `id` do không biết cấu trúc `orient=\"index\"`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-045",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "So sánh định dạng CSV, CSV.GZ và Apache Parquet.",
    "question": "So sánh 3 định dạng CSV, CSV.GZ và Parquet về dung lượng đĩa, khả năng lưu kiểu dữ liệu (schema) và tốc độ đọc.",
    "quickAnswer": "CSV thuần dễ đọc bằng mắt nhưng dung lượng lớn và KHÔNG lưu schema; CSV.GZ nén gzip giảm 5–10 lần dung lượng nhưng vẫn phải giải nén tuần tự và suy luận lại dtype; Parquet lưu nhị phân hướng cột, nén rất gọn, giữ nguyên schema và đọc cực nhanh chỉ đúng cột cần dùng (`column pruning`).",
    "explanation": "Inside Airbnb phân phối dữ liệu nguồn dưới dạng `.csv.gz`, còn bước lọc xuất `.csv` nhỏ để dễ kiểm tra nhanh bằng mắt/Excel.",
    "projectLink": "Bài 6 & src/filter_data_from_sheet.py:L128, L151",
    "codeLocation": "Bài 6 & src/filter_data_from_sheet.py:L128, L151",
    "proofExample": "src/filter_data_from_sheet.py:L128 đọc `.csv.gz` bằng `compression=\"infer\"` và xuất `.csv` bằng `encoding=\"utf-8\"`.",
    "followUpQuestions": [
      "Khi gọi `pd.read_csv(\"listings.csv.gz\", nrows=5)`, pandas có phải giải nén toàn bộ hàng trăm MB file mới đọc được 5 dòng đầu không?"
    ],
    "followUpQA": [
      {
        "q": "Khi gọi `pd.read_csv(\"listings.csv.gz\", nrows=5)`, pandas có phải giải nén toàn bộ hàng trăm MB file mới đọc được 5 dòng đầu không?",
        "a": "Không! Nhờ đọc theo luồng `gzip`, pandas dừng giải nén ngay sau khi lấy đủ 5 dòng đầu (và tương tự khi đọc `nrows=0` chỉ lấy tiêu đề cột ở `L143`)."
      }
    ],
    "commonMistakes": [
      "Tưởng `.csv.gz` bắt buộc phải giải nén bằng WinRAR ra ổ cứng rồi pandas mới đọc được."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-046",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cơ chế `TextFileReader` và hạn chế của `chunksize` khi tính Median/Deduplicate.",
    "question": "Khi gọi `pd.read_csv(path, chunksize=100_000)`, giá trị trả về là gì và những phép toán nào KHÔNG thể tính trực tiếp trên từng chunk?",
    "quickAnswer": "Trả về một iterator `TextFileReader` sinh từng DataFrame 100.000 dòng; dùng một lần rồi hết. Phép lọc dòng (`isin`) làm độc lập từng chunk tốt, nhưng **Median/Quantile toàn cục**, **khử trùng lặp toàn file**, và **trung bình cộng đơn giản (Mean không trọng số cỡ chunk)** KHÔNG thể tính chuẩn trên từng chunk lẻ.",
    "explanation": "Nếu tính `mean(mean của từng chunk)` khi chunk cuối chỉ có 200 dòng sẽ bị sai lệch trọng số cực nặng!",
    "projectLink": "Bài 6 & src/filter_data_from_sheet.py:L127-L140",
    "codeLocation": "Bài 6 & src/filter_data_from_sheet.py:L127-L140",
    "proofExample": "src/filter_data_from_sheet.py chỉ dùng `chunksize=100_000` cho đúng tác vụ **lọc theo tập ID** (`_filter_raw_by_ids`), còn QA/Median thực hiện sau khi đã thu gọn còn 1.000 dòng.",
    "followUpQuestions": [
      "Ngoài `dtype`, tại sao nếu không truyền `dtype={\"id\": \"string\"}` trong vòng lặp `chunksize`, hai chunk liên tiếp có thể khác dtype nhau?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài `dtype`, tại sao nếu không truyền `dtype={\"id\": \"string\"}` trong vòng lặp `chunksize`, hai chunk liên tiếp có thể khác dtype nhau?",
        "a": "Chunk 1 toàn ID số nên suy ra `int64`, sang chunk 2 có một dòng ID bị rỗng nên chunk 2 tự biến thành `float64` -> lúc `pd.concat` bị ép hỗn hợp!"
      }
    ],
    "commonMistakes": [
      "Gán `df = pd.read_csv(..., chunksize=100_000)` rồi gọi `len(df)` hoặc `df.head()` gây `AttributeError`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-047",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "UTF-8 vs UTF-8-SIG (BOM) khi đọc từ Web/Google Sheets và mở Excel.",
    "question": "Ký tự BOM trong `utf-8-sig` là gì và vì sao `_read_sheet()` dùng `.decode(\"utf-8-sig\")`?",
    "quickAnswer": "Một số máy chủ (như Google Sheets CSV export hoặc Excel) chèn 3 byte BOM (`\\xef\\xbb\\xbf`) ở đầu file UTF-8; giải mã bằng `\"utf-8\"` thường sẽ khiến tên cột đầu tiên dính ký tự ẩn `\"\\ufeffLớp\"` làm `df[\"Lớp\"]` báo `KeyError`!",
    "explanation": "Dùng `utf-8-sig` tự động bóc 3 byte BOM nếu có (và vẫn đọc bình thường nếu không có BOM).",
    "projectLink": "src/filter_data_from_sheet.py:L48",
    "codeLocation": "src/filter_data_from_sheet.py:L48",
    "proofExample": "src/filter_data_from_sheet.py:L48: `StringIO(response.content.decode(\"utf-8-sig\"))`.",
    "followUpQuestions": [
      "Nếu muốn giảng viên mở file CSV xuất từ Python bằng Microsoft Excel trên Windows mà không bị lỗi font tiếng Việt/Tây Ban Nha, encoding nào hỗ trợ tốt nhất?"
    ],
    "followUpQA": [
      {
        "q": "Nếu muốn giảng viên mở file CSV xuất từ Python bằng Microsoft Excel trên Windows mà không bị lỗi font tiếng Việt/Tây Ban Nha, encoding nào hỗ trợ tốt nhất?",
        "a": "`encoding=\"utf-8-sig\"` (nhưng với công cụ Python/pandas tiêu chuẩn như trong `_save_frame` thì `\"utf-8\"` rất gọn nhẹ)."
      }
    ],
    "commonMistakes": [
      "Gặp lỗi `KeyError: 'Lớp'` dù in `df.columns` nhìn bằng mắt thấy rõ chữ `Lớp` (do ký tự vô hình `\\ufeff` đứng trước)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-048",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Đọc chỉ Header (`nrows=0`) và phòng thủ bảng rỗng trong `_filter_raw_by_ids`.",
    "question": "Đoạn `header = pd.read_csv(path, compression=\"infer\", nrows=0)` ở dòng 143 của `filter_data_from_sheet.py` có tác dụng gì?",
    "quickAnswer": "Nếu file `.csv.gz` không chứa bất kỳ ID nào khớp (`chunks` rỗng), `pd.concat([])` sẽ ném `ValueError: No objects to concatenate`. Đọc `nrows=0` giúp trả về DataFrame 0 dòng nhưng VẪN ĐỦ ĐÚNG CẤU TRÚC CỘT của file nguồn.",
    "explanation": "Giữ nguyên schema cột cho cả file 0 dòng giúp tránh gãy toàn bộ các bước kiểm tra schema ở `qa.py` hoặc bước ghép nối phía sau.",
    "projectLink": "src/filter_data_from_sheet.py:L141-L146",
    "codeLocation": "src/filter_data_from_sheet.py:L141-L146",
    "proofExample": "Đây là kỹ thuật giữ schema đầu ra đồng nhất giúp bước QA phía sau kiểm tra được cột thay vì chết vì file 0 byte.",
    "followUpQuestions": [
      "Trong trường hợp `chunks` rỗng, dòng 144 kiểm tra lại `if key not in header.columns:` để làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong trường hợp `chunks` rỗng, dòng 144 kiểm tra lại `if key not in header.columns:` để làm gì?",
        "a": "Xác nhận chắc chắn không có dòng khớp là do ID vắng mặt chứ không phải do file raw bị thiếu mất cột khóa `key`."
      }
    ],
    "commonMistakes": [
      "Viết `return pd.DataFrame()` rỗng hoàn toàn khi `not chunks`, khiến `qa.py` hoặc `to_csv` mất hết header cột."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-049",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân nhóm mã trạng thái HTTP 2xx, 3xx, 4xx, 5xx và hành xử của `requests.get()`.",
    "question": "Liệt kê ý nghĩa 4 nhóm mã HTTP chính (2xx, 3xx, 4xx, 5xx) và cho biết `requests.get()` có tự ném lỗi khi gặp 404 hay 500 không?",
    "quickAnswer": "2xx (Thành công, 200 OK); 3xx (Chuyển hướng); 4xx (Lỗi phía client: 403 Forbidden, 404 Not Found, 429 Too Many Requests); 5xx (Lỗi phía server: 500, 502, 503). Đặc biệt: `requests.get()` KHÔNG tự ném ngoại lệ khi gặp 4xx/5xx — bắt buộc phải tự kiểm `status_code` hoặc gọi `resp.raise_for_status()`!",
    "explanation": "Nếu quên `raise_for_status()`, code sẽ tải nguyên nội dung trang HTML \"404 Not Found\" lưu thành file `.csv.gz` và báo thành công giả!",
    "projectLink": "src/download.py:L34-L37 & Bài 6",
    "codeLocation": "src/download.py:L34-L37 & Bài 6",
    "proofExample": "src/download.py:L34-L37 kiểm `403/404` trước rồi mới gọi `resp.raise_for_status()`.",
    "followUpQuestions": [
      "Với HTTP 429 (Too Many Requests) hoặc 503 (Service Unavailable), nên kiểm tra HTTP Header nào trước khi tự sleep theo công thức lũy thừa?"
    ],
    "followUpQA": [
      {
        "q": "Với HTTP 429 (Too Many Requests) hoặc 503 (Service Unavailable), nên kiểm tra HTTP Header nào trước khi tự sleep theo công thức lũy thừa?",
        "a": "Header `Retry-After` (chỉ định chính xác số giây server yêu cầu chờ trước khi gửi lại)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `try: requests.get(url) except RequestException:` tự bắt được lỗi 404 hoặc 500 mà không cần `raise_for_status()`."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-050",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Bẫy \"HTTP 200 OK nhưng nội dung là trang HTML chặn bot\".",
    "question": "Tại sao nhận được HTTP `200 OK` rồi nhưng giải nén `.csv.gz` vẫn có thể lỗi, và làm sao kiểm tra thực sự?",
    "quickAnswer": "Nhiều WAF/Cloudflare hoặc cổng đăng nhập Google trả mã `200 OK` kèm một trang HTML thông báo (\"Access denied\" / \"Please sign in\") thay vì dữ liệu nhị phân gzip!",
    "explanation": "Cách phát hiện sớm: kiểm tra header `Content-Type` (`text/html`), kiểm tra 2 magic bytes đầu tiên của gzip (`1f 8b`), hoặc mở thử bằng `gzip.open()` / bắt `ParserError` như `_read_sheet`.",
    "projectLink": "src/filter_data_from_sheet.py:L52 & docs/01",
    "codeLocation": "src/filter_data_from_sheet.py:L52 & docs/01",
    "proofExample": "src/filter_data_from_sheet.py:L52 bắt `pd.errors.ParserError` nếu Google Sheets trả HTML thay vì CSV.",
    "followUpQuestions": [
      "Trong `src/download.py`, vì sao `stream=True` lại quan trọng khi tải tệp `calendar.csv.gz` nặng vài trăm MB?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/download.py`, vì sao `stream=True` lại quan trọng khi tải tệp `calendar.csv.gz` nặng vài trăm MB?",
        "a": "`stream=True` giúp không nạp toàn bộ tệp hàng trăm MB vào biến RAM `resp.content` trước, mà xả trực tiếp từng chunk 64KB xuống đĩa `.tmp`."
      }
    ],
    "commonMistakes": [
      "Tin tưởng 100% rằng `status_code == 200` là dữ liệu chắc chắn hợp lệ."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-051",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cơ chế Google Visualization API (`/gviz/tq?tqx=out:csv`).",
    "question": "Endpoint `/gviz/tq?tqx=out:csv&sheet=...` trong `filter_data_from_sheet.py` hoạt động thế nào và ưu/nhược điểm so với thư viện `gspread`?",
    "quickAnswer": "Đây là endpoint xuất CSV trực tiếp của Google Visualization API cho bảng tính bật chia sẻ công khai, không cần cài thêm `gspread` hay cấu hình file JSON khóa bí mật Service Account OAuth2.",
    "explanation": "Nhược điểm: chỉ đọc được (read-only) và đòi hỏi sheet mở quyền \"Anyone with the link can view\", dễ bị chặn trong mạng nội bộ không có Internet.",
    "projectLink": "src/filter_data_from_sheet.py:L40-L43",
    "codeLocation": "src/filter_data_from_sheet.py:L40-L43",
    "proofExample": "src/filter_data_from_sheet.py:L40-L43 kèm `urllib.parse.quote(sheet_name)` để mã hóa an toàn tên sheet có dấu cách hoặc tiếng Việt.",
    "followUpQuestions": [
      "Tại sao phải có `timeout=60` trong `requests.get(url, timeout=60)` của cả `download.py` và `filter_data_from_sheet.py`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao phải có `timeout=60` trong `requests.get(url, timeout=60)` của cả `download.py` và `filter_data_from_sheet.py`?",
        "a": "Mặc định `requests.get()` không có timeout (`None`), nên nếu server giữ kết nối treo vĩnh viễn, tiến trình Python sẽ đơ mãi không thoát được."
      }
    ],
    "commonMistakes": [
      "Quên `quote(sheet_name)` khiến tên sheet có khoảng trắng làm URL sai cú pháp HTTP."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-052",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "DuckDB là gì và khi nào dùng DuckDB thay cho pandas?",
    "question": "DuckDB là hệ quản trị CSDL gì và có ưu điểm gì nổi bật so với SQLite hay pandas thuần khi xử lý Inside Airbnb?",
    "quickAnswer": "DuckDB là CSDL phân tích hướng cột nhúng ngay trong Python (OLAP in-process, không cần cài server), thực thi SQL trực tiếp trên file `.csv.gz` / `.parquet` lớn hơn RAM nhờ xử lý ngoài bộ nhớ (out-of-core).",
    "explanation": "Trong khi SQLite thiên về giao dịch hàng (OLTP) và pandas giữ bảng trong RAM, DuckDB rất mạnh cho `JOIN` và `GROUP BY` dữ liệu `calendar.csv.gz` chục triệu dòng.",
    "projectLink": "Bài 6 & docs/01",
    "codeLocation": "Bài 6 & docs/01",
    "proofExample": "Bài 6 & tài liệu `docs/01` minh họa truy vấn DuckDB `read_csv_auto()`, trong khi code Nhóm 4 dùng pandas `chunksize=100_000` để đồng bộ với Google Sheets.",
    "followUpQuestions": [
      "Bẫy nào xảy ra nếu dùng `SELECT * FROM read_csv_auto(\"listings.csv.gz\")` của DuckDB mà không ép kiểu cột `id`?"
    ],
    "followUpQA": [
      {
        "q": "Bẫy nào xảy ra nếu dùng `SELECT * FROM read_csv_auto(\"listings.csv.gz\")` của DuckDB mà không ép kiểu cột `id`?",
        "a": "`read_csv_auto` chỉ quét mẫu vài nghìn dòng đầu, có thể suy luận sai cột ID 19 chữ số hoặc cột có số 0 ở đầu (như mã bưu điện `zipcode`) thành kiểu số nguyên/thực!"
      }
    ],
    "commonMistakes": [
      "Nhầm rằng Nhóm 4 có cài DuckDB trong `requirements.txt` (thực tế Nhóm 4 chỉ dùng pandas thuần, DuckDB thuộc phần lý thuyết Bài 6 & docs tham khảo)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-053",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "So sánh `WHERE` vs `HAVING` và quy tắc `GROUP BY` (BinderException).",
    "question": "Phân biệt `WHERE` và `HAVING` trong SQL; đồng thời giải thích vì sao viết `SELECT listing_id, snapshot_date, COUNT(*) FROM tbl GROUP BY listing_id` gây lỗi `BinderException`?",
    "quickAnswer": "`WHERE` lọc từng hàng thô TRƯỚC khi gom nhóm; `HAVING` lọc trên các nhóm ĐÃ tổng hợp SAU `GROUP BY`. Trong SQL chuẩn (như DuckDB), mọi cột không nằm trong hàm tổng hợp ở `SELECT` bắt buộc phải liệt kê trong `GROUP BY` -> nếu thiếu `snapshot_date` sẽ báo `BinderException`.",
    "explanation": "Nguyên tắc này ngăn chặn sự mơ hồ khi mỗi nhóm `listing_id` có thể mang nhiều giá trị `snapshot_date` khác nhau mà không rõ lấy dòng nào.",
    "projectLink": "Bài 6 & đối chiếu lỗi trong `docs/01:L90-100`",
    "codeLocation": "Bài 6 & đối chiếu lỗi trong `docs/01:L90-100`",
    "proofExample": "(Chính ví dụ minh họa ở `docs/01:L90-100` mắc lỗi đặt `CAST(? AS DATE) AS snapshot_date` trong `SELECT` mà thiếu trong `GROUP BY`).",
    "followUpQuestions": [
      "Khi lọc một điều kiện áp dụng được cả trước và sau nhóm (như `neighbourhood = \"Cuauhtémoc\"`), nên đặt ở `WHERE` hay `HAVING`?"
    ],
    "followUpQA": [
      {
        "q": "Khi lọc một điều kiện áp dụng được cả trước và sau nhóm (như `neighbourhood = \"Cuauhtémoc\"`), nên đặt ở `WHERE` hay `HAVING`?",
        "a": "Nên đặt ở `WHERE` để loại bớt dữ liệu trước khi thực hiện băm gom nhóm `GROUP BY`, nhanh hơn nhiều!"
      }
    ],
    "commonMistakes": [
      "Đưa điều kiện `COUNT(*) > 5` vào `WHERE` (báo lỗi cú pháp SQL) hoặc dùng `HAVING` để lọc điều kiện hàng thô gây chậm truy vấn."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-054",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Ngữ nghĩa SQL `NULL`: `COUNT(*)` vs `COUNT(col)` và `NULL != NULL` trong JOIN.",
    "question": "Trong SQL chuẩn (DuckDB/Postgres), `COUNT(*)`, `COUNT(price)`, và `INNER JOIN` trên hai bảng có khóa `NULL` cho kết quả khác gì pandas `pd.merge()`?",
    "quickAnswer": "`COUNT(*)` đếm TẤT CẢ các hàng (kể cả hàng có `NULL`), còn `COUNT(price)` chỉ đếm ô `price IS NOT NULL`. Trong SQL `NULL = NULL` trả về `UNKNOWN` (sai) nên 2 hàng khóa `NULL` KHÔNG BAO GIỜ ghép với nhau trong `INNER JOIN` — trái ngược với `pd.merge()` mặc định ghép cả `NaN == NaN`!",
    "explanation": "Ngoài ra phép `WHERE col != 0` trong SQL cũng tự động LOẠI BỎ luôn các hàng `col IS NULL` (vì `NULL != 0` là UNKNOWN)!",
    "projectLink": "Bài 6 & src/kpi.py:L409",
    "codeLocation": "Bài 6 & src/kpi.py:L409",
    "proofExample": "Bài 6 & so sánh với `src/kpi.py:L409` lọc `dropna` trước `merge`.",
    "followUpQuestions": [
      "Trong SQL, kết quả của biểu thức `SELECT COUNT(*) FROM t WHERE price > 0 OR price <= 0` có đếm được các dòng `price IS NULL` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong SQL, kết quả của biểu thức `SELECT COUNT(*) FROM t WHERE price > 0 OR price <= 0` có đếm được các dòng `price IS NULL` không?",
        "a": "KHÔNG! Với hàng `NULL`, cả `price > 0` và `price <= 0` đều ra `UNKNOWN` nên bị `WHERE` loại sạch."
      }
    ],
    "commonMistakes": [
      "Viết `WHERE price = NULL` trong SQL (luôn ra 0 dòng! Bắt buộc viết `IS NULL`)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-055",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `INNER JOIN`, `LEFT JOIN` và `Window Functions` (`RANK` / `ROW_NUMBER`).",
    "question": "Tại sao bước ghép review LLM vào bảng quận (`kpi_by_neighbourhood`) dùng tương đương `LEFT JOIN` từ bảng review sang tra cứu quận, và sau đó vẫn phải reindex đủ 15 quận?",
    "quickAnswer": "`LEFT JOIN` giữ toàn bộ review ở bảng trái để gán quận cho từng review hợp lệ, không vô tình tạo ra các review ma từ những listing không có review LLM. Sau khi `groupby(quận)`, reindex lại danh sách 15 quận đảm bảo 3 quận không có review vẫn hiện diện với thông số giá hợp lệ.",
    "explanation": "Nếu dùng `RIGHT JOIN` ngay từ đầu sẽ làm xuất hiện dòng review giả mang `review_id = NaN` khiến `count()` dễ đếm nhầm nếu thiếu lọc!",
    "projectLink": "src/kpi.py:L409-L435",
    "codeLocation": "src/kpi.py:L409-L435",
    "proofExample": "src/kpi.py:L409-L435",
    "followUpQuestions": [
      "Trong SQL Window Functions, `ROW_NUMBER()`, `RANK()` và `DENSE_RANK()` khác nhau thế nào khi có 2 giá trị bằng nhau?"
    ],
    "followUpQA": [
      {
        "q": "Trong SQL Window Functions, `ROW_NUMBER()`, `RANK()` và `DENSE_RANK()` khác nhau thế nào khi có 2 giá trị bằng nhau?",
        "a": "Với điểm `[100, 100, 90]`: `ROW_NUMBER()` cho `1, 2, 3`; `RANK()` cho `1, 1, 3` (giống `method=\"min\"` ở `kpi.py`); `DENSE_RANK()` cho `1, 1, 2`."
      }
    ],
    "commonMistakes": [
      "Dùng `RIGHT JOIN` khiến 3 quận 0 review sinh ra các hàng có `review_id = NaN` làm sai phép đếm."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-056",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Tác dụng của `r\"...\"` raw string, `\\b` word boundary và biên ký tự không phải chữ.",
    "question": "Tại sao mọi mẫu Regex trong Python đều viết dạng `r\"...\"` (raw string), tác dụng của `\\b` là gì, và khi nào `\\b` thất bại?",
    "quickAnswer": "Raw string `r\"...\"` giữ nguyên dấu `\\` khỏi bị chuỗi Python diễn giải (như `\\b` bị hiểu thành ký tự backspace ASCII!). `\\b` khớp ranh giới giữa ký tự từ `[a-zA-Z0-9_]` và ký tự không phải từ — do đó `\\b` KHÔNG khớp ranh giới với ký tự đặc biệt như `$`, `*`, `+` (ví dụ `r\"\\b$\\b\"` là VÔ DỤNG)!",
    "explanation": "Đây là lý do chuỗi `ASPECT_PATTERNS` trong `baseline.py` đặt `\\b` quanh từ chữ cái tiếng Anh/Tây Ban Nha, còn làm sạch ký tự `$` trong `qa.py` dùng nhóm phủ định `r\"[^\\d.-]\"`.",
    "projectLink": "src/baseline.py:L23; src/qa.py:L93",
    "codeLocation": "src/baseline.py:L23; src/qa.py:L93",
    "proofExample": "src/baseline.py:L22-L50; src/qa.py:L93",
    "followUpQuestions": [
      "Trong `ASPECT_PATTERNS[\"noise\"]`, mẫu `r\"\\b(?:nois\\w*|...)\\b\"` dùng `(?:...)` thay vì `(...)` để làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong `ASPECT_PATTERNS[\"noise\"]`, mẫu `r\"\\b(?:nois\\w*|...)\\b\"` dùng `(?:...)` thay vì `(...)` để làm gì?",
        "a": "`(?:...)` là **nhóm không bắt giữ (non-capturing group)**, giúp nhóm lựa chọn tốc độ cao và tránh sinh `UserWarning: This pattern is interpreted as a regular expression, and has match groups` khi dùng với `pandas.str.contains()`!"
      }
    ],
    "commonMistakes": [
      "Quên chữ `r` trước chuỗi `\"\bnot\b\"` biến `\\b` thành mã điều khiển `\b`, khiến Regex không khớp từ nào cả!"
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-057",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Khác biệt mặc định `regex=` trong `pandas.Series.str.contains` vs `str.replace`.",
    "question": "Cảnh báo quan trọng khi dùng `str.contains()` so với `str.replace()` trong pandas (đặc biệt trên pandas 2/3)?",
    "quickAnswer": "Mặc định `str.contains()` đặt `regex=True`, trong khi `str.replace()` từ pandas 2+ mặc định đặt `regex=False`! Nếu truyền mẫu regex như `r\"[^\\d.-]\"` vào `str.replace()` mà quên `regex=True`, pandas sẽ tìm đúng cụm chữ `[^\\d.-]` theo nghĩa đen và chẳng xóa được dấu `$` nào!",
    "explanation": "Ngoài ra với `str.contains(\"$\", regex=False)` tìm ký tự đô la thật cần tắt `regex=False` vì trong Regex `$` có nghĩa là \"cuối dòng\"!",
    "projectLink": "src/qa.py:L93 & Bài 7",
    "codeLocation": "src/qa.py:L93 & Bài 7",
    "proofExample": "src/qa.py:L93 bắt buộc truyền rõ `str.replace(r\"[^\\d.-]\", \"\", regex=True)`.",
    "followUpQuestions": [
      "Nếu viết `df[\"comments\"].str.contains(\"căn hộ (đẹp|rộng)\")` trong pandas thì chuyện gì xảy ra?"
    ],
    "followUpQA": [
      {
        "q": "Nếu viết `df[\"comments\"].str.contains(\"căn hộ (đẹp|rộng)\")` trong pandas thì chuyện gì xảy ra?",
        "a": "Pandas phát cảnh báo `UserWarning` vì thấy dấu ngoặc bắt nhóm `(...)` trong `contains` — nên viết thành `(?:đẹp|rộng)`."
      }
    ],
    "commonMistakes": [
      "Quên tham số `regex=True` trong `str.replace()` dẫn đến toàn bộ giá tiền tệ không parse được thành `NaN` hết."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-058",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy dấu phẩy thập phân châu Âu với `r\"[^\\d.-]\"`.",
    "question": "Nếu áp dụng dòng `price_raw.str.replace(r\"[^\\d.-]\", \"\", regex=True)` của Nhóm 4 sang thành phố Madrid hoặc Paris ghi giá `\"1.250,00 €\"`, điều gì xảy ra?",
    "quickAnswer": "Regex sẽ xóa mất dấu phẩy `,` và ký tự `€`, biến `\"1.250,00 €\"` thành `\"1.25000\"` -> ép sang số thành **`1.25` EUR thay vì `1250.0` EUR** (sai lệch tới **1.000 lần**)!",
    "explanation": "Điều kiện áp dụng hợp lệ của `r\"[^\\d.-]\"` là thành phố sử dụng dấu chấm `.` làm dấu thập phân và dấu phẩy `,` làm phân cách hàng nghìn (đúng với Mexico City / Mỹ).",
    "projectLink": "src/qa.py:L93",
    "codeLocation": "src/qa.py:L93",
    "proofExample": "src/qa.py:L93 & Bài 7 / Audit 1.",
    "followUpQuestions": [
      "Làm thế nào sửa Regex để xử lý được định dạng châu Âu `\"1.250,00 €\"`?"
    ],
    "followUpQA": [
      {
        "q": "Làm thế nào sửa Regex để xử lý được định dạng châu Âu `\"1.250,00 €\"`?",
        "a": "Xóa ký tự không phải số/dấu phẩy/dấu chấm -> xóa dấu chấm phân cách nghìn trước -> đổi dấu phẩy `,` thành dấu chấm `.` rồi mới gọi `pd.to_numeric()`."
      }
    ],
    "commonMistakes": [
      "Áp dụng mù quáng cùng một Regex làm sạch tiền tệ cho dữ liệu các nước dùng chuẩn dấu phẩy thập phân ngược nhau."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-059",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lượng từ Tham lam (`.*`) vs Không tham lam (`.*?`) và cờ `re.I`, `re.DOTALL`.",
    "question": "Phân biệt matching tham lam (`.*`) vs không tham lam (`.*?`) khi bóc tách thẻ HTML hoặc dấu ngoặc trong văn bản review.",
    "quickAnswer": "Lượng từ tham lam `.*` nuốt dài nhất có thể đến ký tự đóng cuối cùng trên dòng; còn `.*?` dừng lại ở lần xuất hiện đầu tiên.",
    "explanation": "Ví dụ với chuỗi `\"<b>Tốt</b> nhưng <i>ồn</i>\"`, mẫu tham lam `r\"<.*>\"` nuốt trọn cả câu biến mất hết chữ `\"nhưng\"`, trong khi `r\"</?[a-zA-Z][^>]*>\"` (như `baseline.py:L67`) hoặc `<.*?>` chỉ xóa đúng từng cặp thẻ HTML!",
    "projectLink": "src/baseline.py:L67",
    "codeLocation": "src/baseline.py:L67",
    "proofExample": "src/baseline.py:L67 dùng `re.sub(r\"</?[a-zA-Z][^>]*>\", \" \", s)` kết hợp phủ định lớp ký tự `[^>]*` an toàn hơn hẳn `.*`.",
    "followUpQuestions": [
      "Tại sao `baseline.py:L67` viết `</?[a-zA-Z][^>]*>` thay vì `<[^>]*>` đơn giản hơn?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `baseline.py:L67` viết `</?[a-zA-Z][^>]*>` thay vì `<[^>]*>` đơn giản hơn?",
        "a": "Để tránh xóa nhầm các biểu tượng cảm xúc hoặc so sánh toán học của khách viết trong review như `\"< 5 minutes walk\"` hay `\"<3 this place\"`!"
      }
    ],
    "commonMistakes": [
      "Dùng `re.sub(r\"<.*>\", \"\", text)` xóa bay toàn bộ văn bản nằm giữa 2 thẻ HTML ở đầu và cuối review!"
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-060",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Tại sao cần `re.compile()` và `unicodedata.normalize(\"NFKC\")`.",
    "question": "Biên dịch sẵn Regex bằng `re.compile()` ở cấp module mang lại lợi ích gì trong `src/baseline.py`?",
    "quickAnswer": "`re.compile()` biên dịch mẫu Regex sang máy trạng thái hữu hạn (automaton) một lần duy nhất lúc khởi chạy, giúp hàng chục nghìn lần gọi `.findall()`/`.search()` trong vòng lặp không phải phân tích lại chuỗi pattern.",
    "explanation": "Kết hợp `unicodedata.normalize(\"NFKC\", s)` xử lý đồng nhất chữ cái có dấu tổ hợp (tiếng Tây Ban Nha/Việt) và ký tự đặc biệt.",
    "projectLink": "src/baseline.py:L22-L58, L68",
    "codeLocation": "src/baseline.py:L22-L58, L68",
    "proofExample": "src/baseline.py:L22-L58 biên dịch sẵn tất cả `ASPECT_PATTERNS`, `CLAUSE_RE`, `BENIGN_RE`, `NEG_RE`, `POS_RE`, `LANG_PATTERNS`.",
    "followUpQuestions": [
      "Nếu không dùng `re.I` (IGNORECASE) cho `POS_RE` và `NEG_RE`, hệ quả gì xảy ra trên văn bản review?"
    ],
    "followUpQA": [
      {
        "q": "Nếu không dùng `re.I` (IGNORECASE) cho `POS_RE` và `NEG_RE`, hệ quả gì xảy ra trên văn bản review?",
        "a": "Các từ viết hoa đầu câu như `\"Great location\"` hay `\"Not clean\"` hoặc viết hoa nhấn mạnh `\"TERRIBLE\"` sẽ bị bỏ sót hoàn toàn!"
      }
    ],
    "commonMistakes": [
      "Viết lại `re.search(pattern_string, text, re.I)` liên tục bên trong vòng lặp lồng nhau."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-061",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `Timestamp`, `Timedelta`, `DatetimeIndex` và `NaT`.",
    "question": "Phân biệt `Timestamp`, `Timedelta` và `NaT` (Not a Time) trong pandas, và cho biết hiệu giữa hai chuỗi ngày lấy ra số ngày bằng thuộc tính nào?",
    "quickAnswer": "`Timestamp` là một mốc thời điểm cụ thể; trừ hai `Timestamp` tạo ra `Timedelta` (khoảng thời gian); `NaT` là giá trị khuyết riêng cho dữ liệu thời gian. Trên một Series `Timedelta`, truy cập số ngày nguyên bằng `.dt.days` (trên 1 hiệu vô hướng dùng `.days`).",
    "explanation": "Đặc biệt lưu ý: `NaT == NaT` là `False` (tương tự `NaN`), và khi gọi `.dt.days` trên Series chứa `NaT`, kết quả ép thành `float64` (chứa `NaN` tại vị trí `NaT`).",
    "projectLink": "src/kpi.py:L133, L163",
    "codeLocation": "src/kpi.py:L133, L163",
    "proofExample": "src/kpi.py:L133 dùng `(pd.to_datetime(snap_curr) - pd.to_datetime(snap_prev)).days` (vô hướng); `L163` dùng `(pd.to_datetime(snap) - last_rev).dt.days` (Series).",
    "followUpQuestions": [
      "Nếu cột ngày đầu vào chứa chuỗi hỏng như `\"not-a-date\"`, truyền `errors=\"coerce\"` vào `pd.to_datetime()` tạo ra giá trị gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu cột ngày đầu vào chứa chuỗi hỏng như `\"not-a-date\"`, truyền `errors=\"coerce\"` vào `pd.to_datetime()` tạo ra giá trị gì?",
        "a": "Tạo ra `pd.NaT` (nhờ vậy `src/qa.py:L288` bắt được qua `lr_parsed.isna()` mà không sập pipeline)."
      }
    ],
    "commonMistakes": [
      "Gọi `.days` trực tiếp trên một Series `Timedelta` (báo `AttributeError`, phải có accessor `.dt.days`)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-062",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Bẫy `format=` trong `pd.to_datetime` và cắt phần dư khi dùng `.dt.days`.",
    "question": "Vì sao nên truyền rõ `format=\"%Y-%m-%d\"` vào `pd.to_datetime()` và `.dt.days` có bẫy làm tròn nào nếu chuỗi có cả giờ/phút?",
    "quickAnswer": "(1) Bỏ qua `format=` dễ làm pandas đoán nhầm định dạng Mỹ `MM/DD/YYYY` với `DD/MM/YYYY` trên các ngày nhỏ hơn 12; (2) `.dt.days` lấy phần NGUYÊN SÀN (floor) theo giây (ví dụ chênh `23 giờ 59 phút` bị `.dt.days` cắt xuống thành `0` ngày, còn `-1 giây` bị cắt thành `-1` ngày!).",
    "explanation": "Nếu so sánh mốc chuẩn ngày `00:00:00` với `last_review` có kèm giờ chiều, có thể dùng `.dt.normalize()` để đưa về đúng 0h00 trước khi trừ.",
    "projectLink": "src/qa.py:L279-L290 & Bài 8",
    "codeLocation": "src/qa.py:L279-L290 & Bài 8",
    "proofExample": "Trong dữ liệu Inside Airbnb, `last_scraped` và `last_review` đều theo chuẩn ISO `YYYY-MM-DD` (nên giờ mặc định là `00:00:00`).",
    "followUpQuestions": [
      "Dòng 290 `qa.py` gọi `lr_parsed.where(valid_lr_mask).dt.strftime(\"%Y-%m-%d\")` để làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Dòng 290 `qa.py` gọi `lr_parsed.where(valid_lr_mask).dt.strftime(\"%Y-%m-%d\")` để làm gì?",
        "a": "Xuất `last_review_clean` về lại chuỗi chuẩn ISO `\"YYYY-MM-DD\"` đồng nhất (và các ô bị `where(..., NaT)` sẽ thành `<NA>` trong chuỗi)."
      }
    ],
    "commonMistakes": [
      "Parse ngày `\"04/07/2026\"` thành 7 tháng 4 thay vì 4 tháng 7 mà chương trình vẫn chạy êm ru không báo lỗi."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-063",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lệch múi giờ (`tz-aware` vs `tz-naive`) và đổi alias `ME`/`QE` ở pandas mới.",
    "question": "Hai lỗi hay gặp khi nâng cấp lên pandas 2.2/3.0 và xử lý timestamp đa múi giờ là gì?",
    "quickAnswer": "(1) Phép trừ giữa Timestamp có múi giờ (`tz-aware`, vd UTC) và không có múi giờ (`tz-naive`) ném `TypeError: Cannot subtract tz-naive and tz-aware datetime-like objects`; (2) Từ pandas 2.2/3.0, mã `resample(\"M\")` / `\"Q\"` bị cảnh báo và loại bỏ, bắt buộc đổi thành `\"ME\"` (MonthEnd) và `\"QE\"` (QuarterEnd).",
    "explanation": "Khi cần bỏ múi giờ để đồng nhất trong pandas, dùng `.dt.tz_localize(None)`.",
    "projectLink": "Bài 8 & src/qa.py:L279",
    "codeLocation": "Bài 8 & src/qa.py:L279",
    "proofExample": "Bài giảng Bài 8 (`bai-08`) và tính khoảng cách ngày giữa các snapshot.",
    "followUpQuestions": [
      "Nếu một cột ngày có hỗn hợp chuỗi giờ khác múi giờ nhau (ví dụ `+00:00` và `-06:00`), `pd.to_datetime(..., utc=True)` giải quyết được lỗi gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một cột ngày có hỗn hợp chuỗi giờ khác múi giờ nhau (ví dụ `+00:00` và `-06:00`), `pd.to_datetime(..., utc=True)` giải quyết được lỗi gì?",
        "a": "Quy đổi toàn bộ các dòng về chung múi giờ chuẩn `UTC`, giúp trả ra Series `datetime64[ns, UTC]` đồng nhất thay vì bị rơi về cột `object` chứa hỗn hợp nhiều múi giờ!"
      }
    ],
    "commonMistakes": [
      "Copy code `df.resample(\"M\").median()` từ tài liệu cũ khiến code crash trên pandas 3.0+."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-064",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Incomplete Period Trap & Panel cân bằng qua 4 snapshot.",
    "question": "Incomplete Period Trap (Bẫy kỳ chưa trọn vẹn) là gì và xuất hiện như thế nào khi phân tích 4 snapshot Inside Airbnb?",
    "quickAnswer": "Là lỗi đem số tổng cộng (tổng review/doanh thu) của một tháng/quý chưa kết thúc (như đến giữa tháng) so trực tiếp với tháng đủ 30 ngày rồi kết luận nhầm là sụt giảm.",
    "explanation": "Ở BTL, 4 khoảng thời gian giữa các snapshot không bằng nhau (`Q1: 93 ngày`, `Q2: 91 ngày`, `Q3: 77 ngày` kết thúc ngày 15/06). Vì vậy `Review Velocity` bắt buộc chia cho `days / 30.0` để quy chuẩn cùng đơn vị 30 ngày.",
    "projectLink": "src/kpi.py:L133 & Bài 8",
    "codeLocation": "src/kpi.py:L133 & Bài 8",
    "proofExample": "src/kpi.py:L133 chuẩn hóa `delta_months = max(days, 1) / 30.0` và giới hạn ngày cuối `2026-06-15` được ghi rõ trong `report.pdf`.",
    "followUpQuestions": [
      "Hàm `max(..., 1)` ở dòng 133 `src/kpi.py` dùng để phòng trường hợp bất thường nào?"
    ],
    "followUpQA": [
      {
        "q": "Hàm `max(..., 1)` ở dòng 133 `src/kpi.py` dùng để phòng trường hợp bất thường nào?",
        "a": "Phòng trường hợp cấu hình bị trùng 2 snapshot cùng 1 ngày (`days == 0`), ngăn lỗi `ZeroDivisionError` khi chia cho `delta_months`."
      }
    ],
    "commonMistakes": [
      "So sánh thẳng số lượng review mới của Q3 (77 ngày) với Q1 (93 ngày) mà không chia cho số ngày!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-065",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Vai trò của `CLAUSE_RE` và liên từ đối lập song ngữ trong `baseline.py`.",
    "question": "Tại sao biểu thức `CLAUSE_RE` ngoài dấu câu `[.!?;]+` và `\\n` lại đưa thêm các từ như `but`, `however`, `pero`, `aunque`, `sin embargo`?",
    "quickAnswer": "Trong đánh giá khách sạn/Airbnb, cấu trúc điển hình của review `mixed` là 1 câu duy nhất chứa 2 vế nối bởi liên từ nhượng bộ/đối lập (vd: `\"Great apartment but noisy street\"`).",
    "explanation": "Nếu chỉ cắt theo dấu chấm câu `.!?;`, cả câu trên nằm trong 1 mệnh đề làm cả khía cạnh `location/apartment` lẫn `noise` bị dính chung cờ `+` và `-` với nhau.",
    "projectLink": "src/baseline.py:L31-L34",
    "codeLocation": "src/baseline.py:L31-L34",
    "proofExample": "src/baseline.py:L31-L34 tách riêng vế trước và vế sau `but/pero`.",
    "followUpQuestions": [
      "Từ `whereas` hoặc `though` đặt đầu câu (\"Though it was a bit noisy, we loved the host\") có được `CLAUSE_RE` tách không?"
    ],
    "followUpQA": [
      {
        "q": "Từ `whereas` hoặc `though` đặt đầu câu (\"Though it was a bit noisy, we loved the host\") có được `CLAUSE_RE` tách không?",
        "a": "Có! Vì có `\\b(?:...|though|whereas|...)\\b` nên chữ `\"Though\"` ở đầu tách ra tạo một mệnh đề rỗng đầu tiên rồi mệnh đề 2 là `\" it was a bit noisy\"` vẫn được xử lý đúng."
      }
    ],
    "commonMistakes": [
      "Xóa dấu xuống dòng hoặc chỉ cắt theo dấu chấm `.` khiến các câu dài ngăn bằng `but` bị trộn lẫn cực tính hai chiều."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-066",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt Data Validation (Kiểm định) vs Data Cleaning (Làm sạch).",
    "question": "Phân biệt giữa **Data Validation** (Kiểm định) và **Data Cleaning** (Làm sạch), và chỉ ra hai phần này tương ứng với thành phần nào trong `src/qa.py`?",
    "quickAnswer": "Data Validation là quá trình kiểm tra và đo lường xem dữ liệu có vi phạm quy tắc hay không (sinh các cột cờ `qa_*` và đếm `rows_affected` trong `qa_report.csv`). Data Cleaning là hành động sửa/chuẩn hóa giá trị để đưa vào tính toán (xóa ký tự `$`, ép kiểu `Int64`, tách tạo cột `*_clean`, khử bản trùng).",
    "explanation": "Thực hiện Validation song song Cleaning giúp truy vết được bao nhiêu % dữ liệu bị bẩn trước khi tính KPI.",
    "projectLink": "src/qa.py & Bài 10",
    "codeLocation": "src/qa.py & Bài 10",
    "proofExample": "src/qa.py tạo song song cả cột chuẩn hóa (`price_mxn`, `accommodates_clean`) lẫn cột cờ kiểm định (`qa_missing_price`, `qa_price_outlier`...).",
    "followUpQuestions": [
      "Tại sao `src/qa.py` vẫn giữ lại cột `price` gốc bên cạnh cột mới `price_mxn`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/qa.py` vẫn giữ lại cột `price` gốc bên cạnh cột mới `price_mxn`?",
        "a": "Để đối chiếu audit: có thể kiểm chứng lại bất kỳ lúc nào chuỗi gốc trước khi parse là gì (vd phân biệt giá thiếu từ nguồn vs lỗi regex)."
      }
    ],
    "commonMistakes": [
      "Làm sạch mù quáng bằng cách xóa/ghi đè trực tiếp cột gốc mà không lưu lại bất kỳ báo cáo hay cờ kiểm chứng nào."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-067",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Lý do không dùng `dropna()` hoặc `fillna(0)` trên bảng chính.",
    "question": "Nêu cụ thể 2 thảm họa xảy ra với BTL Nhóm 4 nếu thay thế logic của `src/qa.py` bằng `df.dropna()` hoặc `df.fillna(0)`.",
    "quickAnswer": "1. `df.dropna()` mặc định `how=\"any\"` xóa hàng hễ có bất kỳ cột nào rỗng -> tại mốc `t2` (khuyết 100% giá), toàn bộ 1.000 dòng bị xóa sạch! 2. `df.fillna(0)` biến 1.000 căn hộ thiếu giá ở t2 thành 0 MXN/đêm và biến căn thiếu lịch thành kín phòng 100% (`a30=0`).",
    "explanation": "Quy tắc vàng Bài 10: thiếu dữ liệu (`NaN`/`<NA>`) KHÔNG đồng nghĩa bằng `0` và không được xóa cả bản ghi làm hỏng các cột hợp lệ khác.",
    "projectLink": "src/qa.py & AI_USAGE.md",
    "codeLocation": "src/qa.py & AI_USAGE.md",
    "proofExample": "BTL chọn **QA Flagging + Nullable Int64 + Giữ NaN**; xem minh chứng ở `qa_report.csv` (1.000 căn vẫn còn nguyên để tính Occupancy ở t2 = 44.42%).",
    "followUpQuestions": [
      "Khi nào mới được phép dùng `.fillna(0)` một cách hợp lệ?"
    ],
    "followUpQA": [
      {
        "q": "Khi nào mới được phép dùng `.fillna(0)` một cách hợp lệ?",
        "a": "Chỉ khi biến đó mang ý nghĩa số đếm đã xác định thiếu chính là không phát sinh (ví dụ `valid_ppg_count = 0` hay `llm_review_count = 0` khi một quận không có review LLM nào được gán)."
      }
    ],
    "commonMistakes": [
      "Tự động đề xuất `.fillna(0)` hoặc `.fillna(median)` cho giá khi cột thiếu sạch như mốc `t2`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-068",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `Outlier` (Ngoại lai) với `Invalid Value` (Giá trị sai hợp lệ).",
    "question": "Tại sao một căn hộ có giá `153.540 MXN/đêm` được gắn cờ `qa_price_outlier = True` nhưng KHÔNG phải là `Invalid Value` bị xóa bỏ?",
    "quickAnswer": "Giá âm (`-50`) hay `accommodates = 0` là **Invalid Value** (vô lý về mặt vật lý/toán học -> bắt buộc loại khỏi phép tính). Còn `153.540 MXN/đêm` là **Outlier** có thật trên sàn Airbnb (biệt thự cao cấp hoặc chủ nhà treo giá đầu cơ chặn lịch World Cup), không sai về kiểu hay miền dương.",
    "explanation": "Giữ lại trong `price_mxn` (không xóa/không sửa) và dùng thước đo kháng outlier (**Median**, **IQR**, **rIQR**) giúp vừa trung thực với hiện tượng đầu cơ vừa bảo vệ xu hướng trung tâm.",
    "projectLink": "src/qa.py:L138-L155 & src/kpi.py:L221",
    "codeLocation": "src/qa.py:L138-L155 & src/kpi.py:L221",
    "proofExample": "2 căn hộ giá >153.000 MXN ở Cuauhtémoc có `Occ30 = 0%`, được giữ lại để minh họa \"Bẫy Mean vs Median\" trong Story 2.",
    "followUpQuestions": [
      "Phương pháp **Winsorization (`.clip()`)** chặn trần các giá trị vượt P99 có nhược điểm gì so với giữ nguyên + dùng Median?"
    ],
    "followUpQA": [
      {
        "q": "Phương pháp **Winsorization (`.clip()`)** chặn trần các giá trị vượt P99 có nhược điểm gì so với giữ nguyên + dùng Median?",
        "a": "Winsorization tạo ra một \"đỉnh gai nhân tạo\" (spike) dồn toàn bộ các căn đắt nhất về đúng giá trị trần P99, làm méo phân phối đuôi phải và biểu đồ Boxplot/Histogram."
      }
    ],
    "commonMistakes": [
      "Gom tất cả Outlier và Error vào chung một rổ rồi bấm nút xóa sạch mọi điểm > P99."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-069",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "So sánh 4 phương pháp phát hiện Outlier: P01–P99, 1.5×IQR, Z-score và MAD.",
    "question": "So sánh ưu/nhược điểm của P01–P99 (Nhóm 4 dùng), hàng rào 1.5×IQR, Z-score (`|z|>3`) và MAD (Median Absolute Deviation).",
    "quickAnswer": "`|z|>3` dùng Mean & Std nên tự sụp đổ khi có vài outlier khổng lồ kéo cả Mean/Std lệch theo (masking effect); `1.5×IQR` tốt với phân phối đối xứng nhưng cắt quá nhiều đuôi phải với dữ liệu giá Airbnb lệch phải mạnh; `MAD = median(|X - median(X)|)` cực bền vững trước tới 50% nhiễu; `P01–P99` đơn giản, cố định tỷ lệ kiểm tra 2% đuôi độc lập với đơn vị tiền tệ nhưng không phân biệt phân phối đã sạch hay chưa.",
    "explanation": "Với bài toán bất động sản đa sức chứa, kết hợp chuẩn hóa thành **PPG** trước hoặc phân tầng theo `room_type` khắc phục được việc P99 toàn cục đánh nhầm biệt thự 16 khách thành ngoại lai.",
    "projectLink": "Bài 10 & src/qa.py:L138-L146",
    "codeLocation": "Bài 10 & src/qa.py:L138-L146",
    "proofExample": "src/qa.py:L56 đọc `price_outlier_quantiles: [0.01, 0.99]` từ YAML.",
    "followUpQuestions": [
      "Trong dữ liệu lệch phải, giữa `1.5×IQR` và `P99`, hàng rào nào thường gắn cờ nhiều căn hơn?"
    ],
    "followUpQA": [
      {
        "q": "Trong dữ liệu lệch phải, giữa `1.5×IQR` và `P99`, hàng rào nào thường gắn cờ nhiều căn hơn?",
        "a": "Tùy hình dạng đuôi nhưng thông thường hàng rào trên `Q3 + 1.5×IQR` có thể gắn cờ từ 5%–10% mẫu trên dữ liệu giá nhà lệch phải, trong khi `P99` chỉ gắn đúng 1% cao nhất."
      }
    ],
    "commonMistakes": [
      "Dùng Z-score chuẩn hóa trên cột giá Airbnb lệch phải cực mạnh có đuôi >150.000 MXN."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-070",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt Flagging vs Dropping trong thiết kế QA.",
    "question": "Tóm tắt nguyên tắc thiết kế QA \"Flagging over Dropping\" của dự án và liệt kê những cột do bước QA sinh thêm vào `listings.csv`.",
    "quickAnswer": "Thay vì xóa hàng (`drop`), QA bảo toàn đủ 1.000 dòng căn hộ, chỉ giữ lại bản đầu khi trùng khóa thật `[id, last_scraped]`, thêm 6 cột cờ boolean `qa_*` và các cột giá trị đã làm sạch `price_mxn`, `*_clean` chứa `NaN`/`<NA>` tại các ô vi phạm.",
    "explanation": "Nhờ tách bạch cờ từng thuộc tính, một căn hộ bị lỗi giá vẫn tham gia tính `Occupancy` và `Review Velocity` bình thường.",
    "projectLink": "src/qa.py:L42-L311 & src/kpi.py:L18-L31",
    "codeLocation": "src/qa.py:L42-L311 & src/kpi.py:L18-L31",
    "proofExample": "8 cột cờ/clean chuẩn là nền tảng kiểm chứng của `REQUIRED_QA_COLS` (12 cột) trong `src/kpi.py`.",
    "followUpQuestions": [
      "8 quy tắc QA xuất ra `qa_report.csv` gồm bao nhiêu dòng tất cả và vì sao quy tắc 0 dòng vi phạm vẫn ghi vào báo cáo?"
    ],
    "followUpQA": [
      {
        "q": "8 quy tắc QA xuất ra `qa_report.csv` gồm bao nhiêu dòng tất cả và vì sao quy tắc 0 dòng vi phạm vẫn ghi vào báo cáo?",
        "a": "Xuất đúng `32 dòng = 8 rules × 4 snapshots`; luôn ghi kể cả khi `rows_affected == 0` để chứng minh quy tắc đã thực sự được chạy kiểm tra chứ không bị bỏ sót."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng bảng `listings.csv` sau bước QA phải giảm xuống còn 960 dòng (ở t1) và 0 dòng (ở t2)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-071",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 3,
    "levelLabel": "Cấp độ 3 – Truy vết code",
    "difficulty": "Vận dụng",
    "qType": "Đọc hiểu code",
    "evaluationGoal": "Điều kiện thứ tự tập con của Availability Validity.",
    "question": "Tại sao `RULE_AVAILABILITY_BOUNDS` bắt buộc kiểm tra `a90 >= a30` và `a365 >= a90` bên cạnh kiểm tra cận trên 30, 90, 365?",
    "quickAnswer": "Về mặt logic tập hợp thời gian: 30 ngày tới nằm trọn trong 90 ngày tới, và 90 ngày tới nằm trọn trong 365 ngày tới, nên số ngày trống phải thỏa `0 <= a30 <= a90 <= a365 <= 365`.",
    "explanation": "Nếu dữ liệu thô lỗi để `a90 < a30` (vd `a30=20, a90=10`), thì `availability_31-90 = a90 - a30 = -10` (âm!) và công thức `Occ_31-90 = (60 - (-10))/60 = 116.7%` vô nghĩa!",
    "projectLink": "src/qa.py:L214-L246 & src/kpi.py:L191",
    "codeLocation": "src/qa.py:L214-L246 & src/kpi.py:L191",
    "proofExample": "Kết quả kiểm chứng ở CDMX: `Valid Availability Rate = 100.0%` ở cả 4 mốc.",
    "followUpQuestions": [
      "Độ chênh tối đa hợp lý của `a90 - a30` là 60 ngày; có thể xảy ra trường hợp `0 <= a30 <= 30` và `0 <= a90 <= 90` và `a90 >= a30` nhưng `a90 - a30 > 60` không?"
    ],
    "followUpQA": [
      {
        "q": "Độ chênh tối đa hợp lý của `a90 - a30` là 60 ngày; có thể xảy ra trường hợp `0 <= a30 <= 30` và `0 <= a90 <= 90` và `a90 >= a30` nhưng `a90 - a30 > 60` không?",
        "a": "Có! Ví dụ `a30 = 0`, `a90 = 70` -> `70 - 0 = 70 > 60` (vì thực tế từ ngày 31–90 chỉ có 60 ngày, nghĩa là Airbnb đang lỗi đồng bộ `a30/a90`) -> đây là một edge case có thể nâng cấp thêm nếu muốn siết chặt hơn!"
      }
    ],
    "commonMistakes": [
      "Chỉ kiểm tra `0 <= a30 <= 30`, `0 <= a90 <= 90` độc lập từng cột mà quên kiểm tra quan hệ thứ tự giữa chúng."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-072",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do tách `RULE_LAST_REVIEW_VALIDITY` cho trường hợp `NaN` hợp lệ.",
    "question": "Tại sao `RULE_LAST_REVIEW_VALIDITY` lại viết `lr_missing = ...` để BỎ QUA giá trị trống (`NaN`), chỉ gắn cờ khi `notna()` mà sai định dạng hoặc `> last_scraped`?",
    "quickAnswer": "Vì với các căn hộ mới niêm yết hoặc chưa từng có đánh giá (`number_of_reviews == 0`), cột `last_review` ĐƯƠNG NHIÊN trống (`NaN`). Gắn cờ thiếu cho `last_review = NaN` sẽ đánh dấu oan hàng loạt căn hợp lệ là lỗi dữ liệu.",
    "explanation": "Ngược lại, nếu đã ghi một ngày cụ thể nhưng lại không parse được hoặc nằm sau ngày thu thập dữ liệu (`last_review > last_scraped`) thì chắc chắn là lỗi thời gian.",
    "projectLink": "src/qa.py:L278-L291",
    "codeLocation": "src/qa.py:L278-L291",
    "proofExample": "src/qa.py:L278-L291 định nghĩa rõ `invalid_lr_mask = (~lr_missing) & (lr_parsed.isna() | (lr_parsed > ref_date))`.",
    "followUpQuestions": [
      "Có lỗ hổng nào còn sót lại giữa cột `number_of_reviews` và `last_review` trong `src/qa.py` hiện tại?"
    ],
    "followUpQA": [
      {
        "q": "Có lỗ hổng nào còn sót lại giữa cột `number_of_reviews` và `last_review` trong `src/qa.py` hiện tại?",
        "a": "QA hiện tại chưa kiểm tra mâu thuẫn chéo hai chiều: (a) `number_of_reviews > 0` nhưng `last_review` bị trống, và (b) `number_of_reviews == 0` nhưng `last_review` lại có ngày."
      }
    ],
    "commonMistakes": [
      "Gộp chung `lr_parsed.isna()` không trừ `lr_missing` làm toàn bộ các căn 0 review bị gắn cờ lỗi `qa_invalid_last_review = True`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-073",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Kiểm tra tính nguyên bằng modulo `(x % 1) != 0` trước khi ép `Int64`.",
    "question": "Biểu thức `((nr_series % 1) != 0)` trong `RULE_REVIEWS_BOUNDS` (`src/qa.py:L254`) đóng vai trò gì?",
    "quickAnswer": "Sau khi gọi `pd.to_numeric(..., errors=\"coerce\")`, cột số sẽ có kiểu `float64` nên một giá trị lỗi như `5.7` review không gây lỗi ngay. Phép chia lấy dư `% 1 != 0` bắt các số thập phân phi thực tế cho biến đếm số nguyên trước khi ép kiểu `.astype(\"Int64\")`.",
    "explanation": "Nếu bỏ phép kiểm tra này và gặp số `5.7`, lệnh `.astype(\"Int64\")` sẽ lập tức văng `TypeError: cannot safely cast non-equivalent float64 to int64` làm sập script QA.",
    "projectLink": "src/qa.py:L254-L256",
    "codeLocation": "src/qa.py:L254-L256",
    "proofExample": "src/qa.py:L254-L256 (tốt hơn RULE_ACCOMMODATES_BOUNDS L189 vốn chưa gắn kiểm tra `% 1 != 0`).",
    "followUpQuestions": [
      "Trong Python/pandas, biểu thức `np.nan % 1 != 0` trả về `True` hay `False`?"
    ],
    "followUpQA": [
      {
        "q": "Trong Python/pandas, biểu thức `np.nan % 1 != 0` trả về `True` hay `False`?",
        "a": "`np.nan % 1` là `np.nan`; `np.nan != 0` là **`True`**! Nhưng điều đó không sao vì `nr_series.isna()` đã bắt từ vế đầu của phép OR rồi."
      }
    ],
    "commonMistakes": [
      "Nhầm rằng `.astype(\"Int64\")` tự động làm tròn số `5.7` xuống `5`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-074",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cách chứng minh dữ liệu sau QA sạch hơn và tác động lên KPI.",
    "question": "Làm thế nào chứng minh định lượng cho giảng viên rằng bước QA thực sự cải thiện chất lượng dữ liệu mà không làm méo mẫu?",
    "quickAnswer": "Dựa vào 3 bằng chứng từ `reports/qa_report.csv`: (1) `RULE_PRICE_PARSE`: tỷ lệ giá parse được từ `0.0%` chuỗi thô tăng lên `96.0%` (t1), `98.8%` (t3), `98.0%` (t4); (2) toàn bộ 1.000 dòng được bảo toàn (kể cả mốc t2 thiếu 100% giá); (3) các quy tắc ràng buộc miền/ngày chứng minh 100% đạt chuẩn (`rows_affected = 0`).",
    "explanation": "So sánh cặp cột `kpi_before` vs `kpi_after` cho thấy chính xác từng quy tắc tác động hay giữ nguyên phân bố.",
    "projectLink": "reports/qa_report.csv",
    "codeLocation": "reports/qa_report.csv",
    "proofExample": "reports/qa_report.csv (32 dòng = 8 rules × 4 snapshots).",
    "followUpQuestions": [
      "Tại sao cột `before` của `RULE_PRICE_PARSE` lại được tính bằng `raw_numeric.notna()` trong `src/qa.py:L92`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao cột `before` của `RULE_PRICE_PARSE` lại được tính bằng `raw_numeric.notna()` trong `src/qa.py:L92`?",
        "a": "Vì nếu chưa loại ký tự `$` và dấu `,`, `pd.to_numeric` thuần (`raw_numeric`) chỉ parse được 0% chuỗi tiền tệ; sau Regex `r\"[^\\d.-]\"` mới parse được 96–98.8% -> đo lường đúng phần giá trị mà QA giải cứu được."
      }
    ],
    "commonMistakes": [
      "Trả lời định tính chung chung \"dữ liệu đã sạch 100%\" mà không dẫn số dòng `qa_report.csv` hoặc bỏ quên mốc t2 = 0%."
    ],
    "relatedFiles": [
      "reports/qa_report.csv"
    ]
  },
  {
    "id": "vt-075",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Các cột mà `src/qa.py` xuất thêm và quy ước đặt tên `*_clean`, `qa_*`.",
    "question": "Tại sao `src/qa.py` đặt tiền tố `qa_` cho cờ kiểm định và hậu tố `_clean` (hoặc `_mxn`) cho cột giá trị?",
    "quickAnswer": "Quy ước đặt tên rõ ràng giúp tầng `kpi.py` (qua hợp đồng `REQUIRED_QA_COLS`) phân biệt rạch ròi giữa dữ liệu gốc ban đầu (`price`, `accommodates`), dữ liệu đã làm sạch (`price_mxn`, `accommodates_clean`) và trạng thái vi phạm (`qa_missing_price`, `qa_invalid_accommodates`).",
    "explanation": "Tách rõ 3 nhóm cột cho phép kiểm toán lại bất kỳ điểm dị biệt nào từ kết quả cuối về đúng ô thô ban đầu.",
    "projectLink": "src/qa.py & src/kpi.py:L18-L31",
    "codeLocation": "src/qa.py & src/kpi.py:L18-L31",
    "proofExample": "src/kpi.py:L18-L31 kiểm tra đủ 12 cột chuẩn `qa_*` và `*_clean`.",
    "followUpQuestions": [
      "Trong 6 cờ `qa_*` tạo bởi `qa.py`, cờ nào KHÔNG nằm trong danh sách kiểm tra `REQUIRED_QA_COLS` ở đầu `kpi.py`?"
    ],
    "followUpQA": [
      {
        "q": "Trong 6 cờ `qa_*` tạo bởi `qa.py`, cờ nào KHÔNG nằm trong danh sách kiểm tra `REQUIRED_QA_COLS` ở đầu `kpi.py`?",
        "a": "`qa_price_outlier`! Vì `src/kpi.py` vẫn giữ lại outlier khi tính Price/PPG nên không dùng cờ đó để lọc bỏ (chỉ giữ để cảnh báo/giải trình)."
      }
    ],
    "commonMistakes": [
      "Ghi đè trực tiếp cột `price` hoặc `accommodates` gốc khiến mất dấu vết đối chiếu ban đầu."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-076",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Lý do chọn LLM thay vì chỉ dựa vào số sao (`review_scores_rating`) hay từ điển cảm xúc truyền thống.",
    "question": "Inside Airbnb đã có sẵn điểm số sao đánh giá tổng thể, tại sao dự án vẫn phải dùng LLM để trích xuất 7 khía cạnh từ văn bản `comments`?",
    "quickAnswer": "Thang sao Airbnb thường dồn cụm rất cao (4.7–5.0 sao) và là một con số tổng hợp không cho biết khách khen hay chê CỤ THỂ khía cạnh nào (Vệ sinh, Tiếng ồn, Tiện nghi, An toàn...). LLM trích xuất ABSA bóc tách được từng điểm đau trong cả các bình luận khen kèm góp ý (`mixed`).",
    "explanation": "Trên tập CDMX, tỷ lệ bình luận thuần tiêu cực chỉ là 1.5%, nhưng nhờ lớp `mixed` (20.6%) LLM phát hiện tới 14.8% khách ở Cuauhtémoc có góp ý trừ điểm Tiện nghi.",
    "projectLink": "Bài 11 & src/llm.py",
    "codeLocation": "Bài 11 & src/llm.py",
    "proofExample": "reviews_sentiment.csv (1.000 dòng: 779 pos, 206 mix, 15 neg) & Bài 11.",
    "followUpQuestions": [
      "Vì sao một hệ thống từ điển cảm xúc truyền thống hay mô hình Bag-of-Words đơn giản dễ bỏ sót lớp `mixed`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao một hệ thống từ điển cảm xúc truyền thống hay mô hình Bag-of-Words đơn giản dễ bỏ sót lớp `mixed`?",
        "a": "Vì trong một câu `mixed` thường chứa 4–5 từ khen (\"great, spotless, lovely\") và chỉ 1 cụm chê ngắn (\"no hot water\") khiến tổng điểm tích cực áp đảo điểm trừ nếu không hiểu cấu trúc ngữ nghĩa."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng dùng LLM chỉ để đoán lại 1 nhãn tích cực/tiêu cực tổng thể thay vì trích xuất đa khía cạnh (ABSA)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-077",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Structured Outputs + Pydantic `create_model` động vs Prompt hỏi tự do.",
    "question": "Cơ chế **Structured Outputs** với `response_schema` Pydantic trong `src/llm.py` khác gì với việc chỉ dặn LLM \"hãy trả lời dạng JSON\" trong prompt?",
    "quickAnswer": "Chỉ dặn bằng lời trong prompt vẫn có xác suất model sinh thừa chữ chào hỏi, sai tên trường hoặc bịa nhãn ngoài tập hợp. Truyền `response_schema: list[review_model]` ép ở tầng giải mã (constrained decoding) của Gemini API chỉ cho phép sinh đúng token khớp JSON Schema và tập `Literal` đã định nghĩa.",
    "explanation": "Dùng `pydantic.create_model` động giúp đọc danh sách khía cạnh từ `configs/mexico-city.yaml` mà không phải sửa code Python.",
    "projectLink": "src/llm.py:L28-L39, L273-L276",
    "codeLocation": "src/llm.py:L28-L39, L273-L276",
    "proofExample": "src/llm.py:L28-L39, L273-L276 & `review_model.model_validate()`.",
    "followUpQuestions": [
      "Mặc dù đã bật `response_schema`, vì sao dòng 280–281 trong `src/llm.py` vẫn dùng `json.loads()` và `review_model.model_validate()`?"
    ],
    "followUpQA": [
      {
        "q": "Mặc dù đã bật `response_schema`, vì sao dòng 280–281 trong `src/llm.py` vẫn dùng `json.loads()` và `review_model.model_validate()`?",
        "a": "Kiểm tra phòng thủ (defense-in-depth): đề phòng kết nối bị cắt cụt chuỗi JSON giữa chừng hoặc API trả về phần tử thiếu khiến parser Python ném lỗi để kích hoạt cơ chế retry."
      }
    ],
    "commonMistakes": [
      "Cho rằng Structured Outputs đồng nghĩa kết quả 100% đúng về mặt nội dung ngữ nghĩa (thực chất vẫn cần Evaluation & Hậu kiểm!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-078",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Chiến lược Batching (`batch_size=5`) và cân bằng chi phí – độ chính xác.",
    "question": "Vì sao chọn `batch_size = 5` review trên mỗi lời gọi API thay vì gửi từng câu (`batch_size = 1`) hoặc nhồi 100 câu một lần?",
    "quickAnswer": "Gửi `batch_size=1` tốn 1.000 request và lặp lại toàn bộ phần hướng dẫn prompt 1.000 lần (lãng phí token input + chạm giới hạn RPM/RPD). Ngược lại nhồi `batch_size=50–100` dễ làm LLM mất tập trung (\"lost in the middle\"), quên hoặc đổi lộn ID, hoặc vượt giới hạn output token gây cắt cụt JSON.",
    "explanation": "`batch_size=5` (200 request cho 1.000 review) đạt điểm cân bằng tốt: giảm ~80% token hướng dẫn lặp lại nhưng giữ Accuracy 99%.",
    "projectLink": "src/llm.py:L310-L318 & configs/mexico-city.yaml",
    "codeLocation": "src/llm.py:L310-L318 & configs/mexico-city.yaml",
    "proofExample": "configs/mexico-city.yaml (`batch_size: 5`) và 2 vòng chạy bù trong `src/llm.py:L314-L318`.",
    "followUpQuestions": [
      "Trong vòng chạy bù cuối cùng của `process_pending_reviews()`, tại sao code giảm `batch_size` xuống `1`?"
    ],
    "followUpQA": [
      {
        "q": "Trong vòng chạy bù cuối cùng của `process_pending_reviews()`, tại sao code giảm `batch_size` xuống `1`?",
        "a": "Để cô lập đúng 1 review có thể đang gây kẹt JSON hoặc vi phạm bộ lọc an toàn trong lô 5 câu, giúp cứu các câu bình thường còn lại."
      }
    ],
    "commonMistakes": [
      "Tăng `batch_size=100` để tiết kiệm tối đa nhưng làm tỷ lệ rớt/nhầm ID tăng vọt."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-079",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Sự khác nhau giữa giới hạn tốc độ RPM/TPM và hạn ngạch ngày RPD (`429 RESOURCE_EXHAUSTED`).",
    "question": "Trong hệ thống API LLM (như Google Gemini), lỗi HTTP `429` gồm hai nguyên nhân nào khác nhau hoàn toàn về cách xử lý?",
    "quickAnswer": "1. **RPM / TPM** (Requests/Tokens Per Minute — quá tốc độ tạm thời): chỉ cần ngủ cooldown vài chục giây cho qua cửa sổ 1 phút rồi thử lại tiếp tục. 2. **RPD** (Requests Per Day — cạn hạn ngạch ngày): có chờ vài phút cũng không thể thành công, phải dừng vòng lặp sớm (`QuotaExceededException`) và lưu giữ cache đã chạy.",
    "explanation": "Phân biệt đúng hai loại 429 giúp pipeline không bị treo 5 lần thử vô nghĩa cho hàng trăm lô còn lại khi hết quota ngày.",
    "projectLink": "src/llm.py:L222-L251",
    "codeLocation": "src/llm.py:L222-L251",
    "proofExample": "src/llm.py:L222-L251 (`_classify_rate_limit_error` và `QuotaExceededException`).",
    "followUpQuestions": [
      "Trong `src/llm.py:L377`, lệnh `time.sleep(1.0)` đặt cuối vòng lặp mỗi lô có tác dụng gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py:L377`, lệnh `time.sleep(1.0)` đặt cuối vòng lặp mỗi lô có tác dụng gì?",
        "a": "Chủ động giãn nhịp (rate pacing) tối đa ~60 request/phút để tránh chạm ngưỡng RPM ngay từ đầu."
      }
    ],
    "commonMistakes": [
      "Thấy lỗi 429 là retry cố định 3 lần rồi chết luôn dù chỉ mới nghẽn theo phút, hoặc ngược lại ngủ chờ mãi khi đã hết quota ngày."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-080",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `not_mentioned` vs `negative` vs `mixed` trong ABSA.",
    "question": "Khi một review không nhắc tới `safety` hay `noise`, LLM phải gán nhãn gì và vì sao tuyệt đối KHÔNG được gán nhãn mặc định `positive` hay `negative`?",
    "quickAnswer": "Phải gán **`not_mentioned`** vì câu văn không nhắc trực tiếp tới khía cạnh đó (prompt cấm suy diễn). Nếu tự ý gán `positive`, tỷ lệ khen sẽ bị thổi phồng giả; nếu gán `negative` sẽ tạo ra các phàn nàn ma không có trong trải nghiệm thật của khách.",
    "explanation": "Trong bước KPI (`COMPLAINT_SCORE_MAP`), `not_mentioned` mang giá trị `0.0` phàn nàn, tách bạch rõ với điểm trừ.",
    "projectLink": "src/llm.py:L24, L215",
    "codeLocation": "src/llm.py:L24, L215",
    "proofExample": "src/llm.py:L24, L215; src/kpi.py:L34-L45.",
    "followUpQuestions": [
      "Nếu khách viết `\"Quiet all day, though street got loud after midnight\"`, nhãn cho `noise` là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu khách viết `\"Quiet all day, though street got loud after midnight\"`, nhãn cho `noise` là gì?",
        "a": "Là **`mixed`** (vừa khen yên tĩnh ban ngày vừa chê ồn ban đêm trên CÙNG một khía cạnh `noise`)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng review chung có `overall_sentiment = positive` thì 7 khía cạnh đều phải là `positive`, hoặc không nhắc tiếng ồn nghĩa là `noise = negative`!"
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-081",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Lý do chọn Append-only JSONL làm định dạng Cache LLM.",
    "question": "Tại sao `src/llm.py` chọn định dạng **JSON Lines (`.jsonl`)** ghi nối thêm từng dòng thay vì lưu một tệp `.json` mảng lớn hoặc ghi đè file `.csv` mỗi lô?",
    "quickAnswer": "Một file `.json` `[...]` khổng lồ buộc phải đọc lại toàn bộ và ghi lại từ đầu mỗi lần thêm bản ghi (tốn O(N) I/O mỗi lô và nếu rớt điện lúc ghi sẽ hỏng sạch toàn bộ file!). Trái lại, `.jsonl` có mỗi dòng là 1 JSON độc lập hoàn toàn -> ghi nối thêm `append` chỉ tốn O(1) I/O và 1 dòng hỏng cuối file cũng không ảnh hưởng 999 dòng phía trên.",
    "explanation": "Ngoài ra JSONL giữ nguyên cấu trúc lồng `aspects: {...}` khớp tự nhiên với đối tượng Pydantic trước khi dàn phẳng sang CSV.",
    "projectLink": "src/llm.py:L92-L120",
    "codeLocation": "src/llm.py:L92-L120",
    "proofExample": "src/llm.py:L92-L120 (`load_cache` & `save_to_cache`) và `data/processed/llm_cache.jsonl`.",
    "followUpQuestions": [
      "Dữ liệu cache `llm_cache.jsonl` trong BTL không lưu toàn bộ prompt dài hay timestamp nhằm mục đích gì?"
    ],
    "followUpQA": [
      {
        "q": "Dữ liệu cache `llm_cache.jsonl` trong BTL không lưu toàn bộ prompt dài hay timestamp nhằm mục đích gì?",
        "a": "Giúp giữ file `llm_cache.jsonl` gọn nhẹ (~300 KB cho 1.000 dòng) để commit thẳng vào GitHub làm minh chứng tái lập."
      }
    ],
    "commonMistakes": [
      "Lưu đè toàn bộ tệp JSON/CSV sau mỗi lô 5 câu hoặc chỉ lưu vào bộ nhớ RAM rồi xuất cuối cùng."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-082",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Prompt Injection Delimiters và Non-determinism của LLM.",
    "question": "Việc dùng dấu ba ngoặc kép `\"\"\"...\"\"\"` bọc nội dung review trong `build_batch_prompt()` và vấn đề tính tái lập (Reproducibility) của LLM liên quan gì nhau?",
    "quickAnswer": "Bọc `Text: \"\"\"{it['text']}\"\"\"` giúp phân tách rõ ranh giới giữa lệnh hệ thống (instructions) và dữ liệu đầu vào (untrusted review text), giảm rủi ro nội dung review chứa câu lệnh giả làm chệch JSON. Về tái lập: LLM mang tính xác suất nên gọi API lại ở thời điểm khác (hoặc khi model cập nhật) không đảm bảo khớp 100% từng nhãn — do đó lưu cứng `llm_cache.jsonl` kèm `--skip-llm` là cơ chế bảo đảm tái lập tuyệt đối kết quả của báo cáo.",
    "explanation": "Kết hợp Pydantic Schema khóa chặt format JSON đầu ra.",
    "projectLink": "src/llm.py:L207-L219",
    "codeLocation": "src/llm.py:L207-L219",
    "proofExample": "src/llm.py:L209, L391",
    "followUpQuestions": [
      "Trong prompt của `build_batch_prompt()`, ngôn ngữ nào được dùng để viết quy tắc hướng dẫn và điều đó có cản trở việc đọc review tiếng Tây Ban Nha không?"
    ],
    "followUpQA": [
      {
        "q": "Trong prompt của `build_batch_prompt()`, ngôn ngữ nào được dùng để viết quy tắc hướng dẫn và điều đó có cản trở việc đọc review tiếng Tây Ban Nha không?",
        "a": "Hướng dẫn viết bằng tiếng Việt rõ ràng; các model Gemini đa ngôn ngữ xử lý rất tốt hướng dẫn tiếng Việt trên văn bản đầu vào tiếng Anh/Tây Ban Nha."
      }
    ],
    "commonMistakes": [
      "Khẳng định chỉ cần đặt `temperature=0` là LLM luôn cho kết quả giống nhau 100% mãi mãi qua mọi năm (thực tế server model vẫn có sai số phần cứng/phiên bản)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-083",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Lý do bắt buộc phải có Baseline không dùng LLM trước khi dùng LLM.",
    "question": "Theo Bài 11 và yêu cầu đề bài, tại sao không chạy thẳng Gemini API cho xong mà bắt buộc phải tự xây mô hình đối chứng Baseline?",
    "quickAnswer": "Vì nếu không có một thước đo chuẩn đơn giản (0 USD, không cần AI), ta không thể chứng minh được chi phí tiền và độ phức tạp của LLM mang lại giá trị gia tăng định lượng thực sự bao nhiêu (hay liệu một vài dòng Regex đơn giản đã đạt kết quả tương đương rồi).",
    "explanation": "Tại CDMX, đối chứng định lượng chứng minh LLM nâng Macro F1 cảm xúc từ **0.5224** (Regex) lên **0.9909** (+0.4685) — chứng minh rõ ràng tính hiệu quả của chi phí $0.203.",
    "projectLink": "src/baseline.py & reports/evaluation_report.csv",
    "codeLocation": "src/baseline.py & reports/evaluation_report.csv",
    "proofExample": "reports/evaluation_report.csv & figures/llm_vs_baseline.png.",
    "followUpQuestions": [
      "Một baseline đơn giản nhất kiểu Majority Class (đoán 100% là `positive`) trên `ground_truth.csv` sẽ đạt Accuracy bao nhiêu và Macro F1 bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Một baseline đơn giản nhất kiểu Majority Class (đoán 100% là `positive`) trên `ground_truth.csv` sẽ đạt Accuracy bao nhiêu và Macro F1 bao nhiêu?",
        "a": "Đạt Accuracy = `0.73` (73/100) nhưng Recall lớp `mixed` và `negative` bằng 0 nên Macro F1 tụt xuống còn `~0.28` (`0.844 / 3`)."
      }
    ],
    "commonMistakes": [
      "Tạo một baseline \"ngẫu nhiên\" hoặc gán toàn bộ bằng `\"positive\"` để LLM trông có vẻ tốt hơn giả tạo (trái lại Regex của Nhóm 4 được thiết kế nghiêm túc song ngữ Anh–Tây Ban Nha + tách mệnh đề)."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-084",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Evaluation"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Công thức Precision, Recall, F1 và Ma trận nhầm lẫn (Confusion Matrix).",
    "question": "Phát biểu công thức Precision, Recall và F1-score từ 4 thành phần TP, FP, FN, TN; ý nghĩa của F1 (trung bình điều hòa) là gì?",
    "quickAnswer": "Precision = `TP / (TP + FP)` (trong những ca đoán dương, đúng bao nhiêu?); Recall = `TP / (TP + FN)` (trong những ca thực sự dương, bắt được bao nhiêu?); F1 = `2 × Precision × Recall / (Precision + Recall) = 2TP / (2TP + FP + FN)`. F1 là trung bình điều hòa nên bị kéo mạnh xuống nếu một trong hai chỉ số Precision hoặc Recall rất thấp.",
    "explanation": "Khác với trung bình cộng thông thường `(P+R)/2`, nếu Precision=1.0 nhưng Recall=0.0 thì F1 gần bằng `0.0` chứ không phải `0.50`.",
    "projectLink": "src/evaluate.py:L101-L111",
    "codeLocation": "src/evaluate.py:L101-L111",
    "proofExample": "src/evaluate.py:L101-L111 tự cài công thức `2 * tp / (2 * tp + fp + fn)`.",
    "followUpQuestions": [
      "Trong phát hiện phàn nàn dịch vụ (`negative`), nếu mô hình dự đoán bảo thủ ít gắn nhãn `negative` (Precision cao, Recall thấp) thì chỉ số nào tụt mạnh?"
    ],
    "followUpQA": [
      {
        "q": "Trong phát hiện phàn nàn dịch vụ (`negative`), nếu mô hình dự đoán bảo thủ ít gắn nhãn `negative` (Precision cao, Recall thấp) thì chỉ số nào tụt mạnh?",
        "a": "Recall tụt mạnh dẫn tới `bi_che_f1` giảm theo dù Precision có thể cao."
      }
    ],
    "commonMistakes": [
      "Nhầm lẫn giữa mẫu số của Precision (`TP+FP` = cột/hàng dự đoán) và Recall (`TP+FN` = nhãn thật)."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-085",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Evaluation"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt Micro F1, Macro F1 và Weighted F1 trên dữ liệu mất cân bằng.",
    "question": "Giải thích chính xác sự khác biệt toán học giữa **Micro F1**, **Macro F1** và **Weighted F1** trong phân loại đa lớp & đa nhãn.",
    "quickAnswer": "- **Micro F1:** Cộng dồn TP, FP, FN toàn tập trước rồi tính một lần (trong bài toán đơn nhãn mỗi câu đúng 1 nhãn, **Micro F1 luôn bằng đúng Accuracy**!).\n- **Macro F1:** Tính F1 riêng cho từng lớp rồi lấy **trung bình cộng đều** (chia cho số lớp K) — đánh giá công bằng cả lớp thiểu số.\n- **Weighted F1:** Trung bình F1 từng lớp **nhân trọng số theo số lượng mẫu** (support) của lớp đó — dễ che giấu thất bại ở lớp hiếm.",
    "explanation": "Chính vì thế với `ground_truth.csv` (73 positive, 25 mixed, 2 negative), Weighted F1 của Baseline là 0.8316 nhưng Macro F1 tụt còn 0.5224.",
    "projectLink": "src/evaluate.py:L101-L118",
    "codeLocation": "src/evaluate.py:L101-L118",
    "proofExample": "src/evaluate.py:L101-L118 & `evaluation_report.csv`.",
    "followUpQuestions": [
      "Nếu tập Ground Truth chỉ có `n = 2` mẫu `negative`, rủi ro thống kê đối với điểm Macro F1 là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu tập Ground Truth chỉ có `n = 2` mẫu `negative`, rủi ro thống kê đối với điểm Macro F1 là gì?",
        "a": "Phương sai cực lớn: chỉ thay đổi dự đoán đúng/sai 1 mẫu trong lớp `negative` làm F1 lớp đó nhảy ±0.33, kéo Macro F1 dịch chuyển ±0.11 dù 98 mẫu kia giữ nguyên!"
      }
    ],
    "commonMistakes": [
      "Tuyên bố Weighted F1 quan trọng hơn Macro F1 khi bộ dữ liệu bị mất cân bằng lớp 73:25:2."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-086",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Evaluation"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do `evaluate.py` không loại bỏ review thiếu dự đoán (Coverage Penalty).",
    "question": "Thế nào là thước đo `phu_song` (Coverage) và tại sao nếu Coverage < 1.0 mà chỉ chấm Accuracy trên tập đã trả lời được là gian lận đánh giá?",
    "quickAnswer": "Coverage = tỷ lệ mẫu trong tập Ground Truth có nhãn dự đoán hợp lệ. Nếu một mô hình \"né\" 50 câu khó (trả về lỗi/NaN) rồi chỉ chấm 50 câu dễ -> đạt Accuracy 100% giả tạo! Do đó chuẩn đánh giá bắt buộc giữ đủ 100% mẫu Ground Truth ở mẫu số và tính mọi ca thiếu nhãn là sai.",
    "explanation": "Cả LLM và Baseline của Nhóm 4 đều đạt `phu_song = 1.0` (100/100) trước khi tính các chỉ số còn lại.",
    "projectLink": "src/evaluate.py:L134",
    "codeLocation": "src/evaluate.py:L134",
    "proofExample": "src/evaluate.py:L94-L117, L134",
    "followUpQuestions": [
      "Khi gọi `gom_du_doan()` ở Baseline với cột `overall_sentiment`, làm sao code vẫn chạy nếu tên cột đôi khi là `baseline_sentiment`?"
    ],
    "followUpQA": [
      {
        "q": "Khi gọi `gom_du_doan()` ở Baseline với cột `overall_sentiment`, làm sao code vẫn chạy nếu tên cột đôi khi là `baseline_sentiment`?",
        "a": "Trong `main()` (`L258`): `cot = \"baseline_sentiment\" if \"baseline_sentiment\" in base.columns else \"overall_sentiment\"`."
      }
    ],
    "commonMistakes": [
      "Dùng `inner join` giữa bảng dự đoán và bảng nhãn tay trước khi tính Accuracy."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-087",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do chọn PPG, Median, IQR và rIQR thay vì chỉ dùng Price Mean & Std.",
    "question": "Trình bày mạch lạc lý do thống kê khiến cặp chỉ số **PPG + Median + rIQR** vượt trội hơn **Price + Mean + Std** trên dữ liệu giá lưu trú ngắn hạn.",
    "quickAnswer": "1. **PPG (`Price / Accommodates`)** chuẩn hóa khác biệt sức chứa từ 1–16 khách; 2. **Median** không bị các giá đầu cơ cực đoan (vd >153.000 MXN) kéo vọt như **Mean**; 3. **rIQR = (Q3−Q1)/Median** chuẩn hóa độ trải rộng tương đối theo chính mặt bằng giá của từng khu vực mà không phụ thuộc đơn vị tiền hay bị đuôi cực đoan phá hủy như **Std**.",
    "explanation": "Ví dụ kinh điển ở CDMX: Xochimilco đứng #1 Mean Price (3.848 MXN) nhưng rơi xuống #11 Median PPG (377 MXN) vì nhà vườn sức chứa lớn.",
    "projectLink": "src/kpi.py:L69-L84, L235",
    "codeLocation": "src/kpi.py:L69-L84, L235",
    "proofExample": "src/kpi.py:L69-L84, L215-L252; `kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Tại sao `rIQR` vô thứ nguyên lại so sánh được giữa khu vực đắt (A05) và khu vực rẻ (A08), thậm chí giữa 2 thành phố khác đồng tiền?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `rIQR` vô thứ nguyên lại so sánh được giữa khu vực đắt (A05) và khu vực rẻ (A08), thậm chí giữa 2 thành phố khác đồng tiền?",
        "a": "Vì cả tử số (`IQR`) và mẫu số (`Median`) đều cùng đơn vị (MXN hoặc EUR) nên khi chia nhau đơn vị bị triệt tiêu hoàn toàn!"
      }
    ],
    "commonMistakes": [
      "Đo độ phân tán bằng `Max - Min` (Range) hay `Std` trên dữ liệu có outlier hàng trăm nghìn MXN."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-088",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "So sánh `Review Velocity` tự tính vs `reviews_per_month` có sẵn của Inside Airbnb.",
    "question": "Bảng `listings.csv` của Inside Airbnb vốn đã có cột `reviews_per_month`. Tại sao Nhóm 4 không dùng luôn cột đó mà phải viết hàm `compute_review_velocities()`?",
    "quickAnswer": "`reviews_per_month` có sẵn là trung bình cộng tích lũy từ NGÀY ĐẦU TIÊN listing mở tài khoản (có thể từ 5–10 năm trước), nên rất ì và không phản ánh sức nóng của ĐÚNG từng quý gần đây (Q1, Q2, Q3 năm 2025–2026).",
    "explanation": "Ngược lại, `RV` tự tính lấy hiệu số review thực phát sinh giữa 2 snapshot chia cho khoảng ngày quy đổi 30 ngày -> phản ánh chính xác nhịp đập hiện tại.",
    "projectLink": "src/kpi.py:L114-L137",
    "codeLocation": "src/kpi.py:L114-L137",
    "proofExample": "src/kpi.py:L114-L137 tính 3 chuỗi RV cho Q1 (2.55), Q2 (2.14), Q3 (2.08).",
    "followUpQuestions": [
      "Hạn chế cố hữu của chính `Review Velocity` khi dùng để suy đoán số lượng khách lưu trú là gì?"
    ],
    "followUpQA": [
      {
        "q": "Hạn chế cố hữu của chính `Review Velocity` khi dùng để suy đoán số lượng khách lưu trú là gì?",
        "a": "Không phải 100% khách đều viết review (tỷ lệ để lại review thường ~50–70%), độ dài chuyến đi khác nhau (1 đêm vs 30 đêm đều tối đa 1 review), và luôn có độ trễ thời gian trả phòng mới viết review."
      }
    ],
    "commonMistakes": [
      "Tưởng cột `reviews_per_month` luôn phản ánh số review trong 30 ngày gần nhất."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-089",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải tại sao Ghost Rate dùng 2 công thức khác nhau cho t1 vs t2..t4.",
    "question": "Giải thích thiết kế quy tắc Ghost Listing giữa mốc t1 và các mốc t2–t4 trong `src/kpi.py`.",
    "quickAnswer": "Tại `t2–t4`, ta đã có `Review Velocity` của quý ngay trước đó nên định nghĩa chặt là `(a365 == 0) & (rv == 0)` (khóa lịch nguyên năm và không phát sinh review mới). Tại `t1`, do KHÔNG có mốc t0 để tính `rv`, code dùng thước đo thay thế là lịch năm bằng 0 kết hợp với chưa có review nào (`nr == 0`) hoặc review cuối cùng đã quá hạn `stale_days = 90` ngày trước mốc `t1`.",
    "explanation": "Cả hai mốc đều lọc thêm điều kiện hợp lệ QA và gán `<NA>` nếu thiếu căn cứ.",
    "projectLink": "src/kpi.py:L158-L169",
    "codeLocation": "src/kpi.py:L158-L169",
    "proofExample": "src/kpi.py:L140-L174 & `kpi_by_snapshot.csv` (Ghost Rate: 0.7%, 0.3%, 0.0%, 0.4%).",
    "followUpQuestions": [
      "Một listing có `a365 = 0` và `last_review` cách đây 100 ngày trước `t1` bị gắn `ghost_t1 = 1`; liệu điều đó có chắc chắn 100% căn hộ đã \"chết\" vĩnh viễn không?"
    ],
    "followUpQA": [
      {
        "q": "Một listing có `a365 = 0` và `last_review` cách đây 100 ngày trước `t1` bị gắn `ghost_t1 = 1`; liệu điều đó có chắc chắn 100% căn hộ đã \"chết\" vĩnh viễn không?",
        "a": "Không! Nó có thể đang sửa chữa nhà hoặc chủ nhà tự khóa tạm mùa thấp điểm — bằng chứng là trong mẫu 1.000 căn CDMX, không có BẤT KỲ căn nào bị gắn ghost liên tục qua cả 4 mốc t1–t4!"
      }
    ],
    "commonMistakes": [
      "Bịa rằng t1 cũng dùng `RV == 0` hoặc gán luôn `ghost_t1 = 0` cho toàn bộ mẫu để đỡ tính."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-090",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Bản chất Proxy của `Occupancy` & ý nghĩa thực tế của `Urgency Gap`.",
    "question": "Công thức `Occ_1-30`, `Occ_31-90` và `Urgency Gap` đo lường cái gì về mặt toán học và vì sao gọi `Occupancy` là chỉ số đại diện (Proxy)?",
    "quickAnswer": "`Occ_1-30 = (30 - a30) / 30` là tỷ lệ ngày KHÔNG MỞ ĐẶT trong 30 ngày tới; `Occ_31-90 = (60 - (a90 - a30)) / 60` là cho 60 ngày tiếp theo; `Urgency Gap = Occ_1-30 - Occ_31-90`. Gọi là Proxy vì dữ liệu công khai của Airbnb KHÔNG tách được ngày \"đã có khách trả tiền\" với ngày \"chủ nhà tự khóa lịch không cho thuê\".",
    "explanation": "Urgency Gap dương lớn (như +21.38 pp tại t3 Semana Santa) phản ánh lịch gần kín hơn hẳn lịch xa -> hành vi đặt phòng sát ngày hoặc chủ nhà đóng bớt lịch gần.",
    "projectLink": "src/kpi.py:L201-L206",
    "codeLocation": "src/kpi.py:L201-L206",
    "proofExample": "src/kpi.py:L177-L212 & `kpi_occupancy_gap.png`.",
    "followUpQuestions": [
      "Vì sao phải tách khoảng `31–90 ngày tới` bằng `a90 - a30` chia cho `60` thay vì dùng thẳng `(90 - a90) / 90`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao phải tách khoảng `31–90 ngày tới` bằng `a90 - a30` chia cho `60` thay vì dùng thẳng `(90 - a90) / 90`?",
        "a": "Vì `a90` bao gồm cả `a30` bên trong! Nếu không trừ `a30`, khoảng 30 ngày đầu sẽ bị tính đè vào cả 2 chỉ số làm `Occ_1-30` và `Occ_1-90` bị phụ thuộc chồng chéo lẫn nhau."
      }
    ],
    "commonMistakes": [
      "Khẳng định `Occ_1-30 = 48.5%` nghĩa là \"48.5% số đêm đã bán được cho khách du lịch trả tiền\"."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-091",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Ý nghĩa phân tách `complaint_<aspect>` vs `complaint_mixed_<aspect>`.",
    "question": "Trong `compute_kpi_by_neighbourhood()`, việc tách song song `complaint_<aspect>` và `complaint_mixed_<aspect>` đem lại góc nhìn phân tích mới nào cho SECTUR CDMX?",
    "quickAnswer": "Nếu chỉ đếm review thuần `negative` (`COMPLAINT_SCORE_MAP`), tỷ lệ phàn nàn bị ẩn rất thấp (vd Amenities tại Cuauhtémoc chỉ là `1.87%`). Khi gộp thêm các câu khen kèm góp ý (`mixed` qua `COMPLAINT_MIXED_SCORE_MAP`), tỷ lệ có điểm trừ tăng vọt gấp gần 8 lần lên **`14.82%`** (111/749 reviews)!",
    "explanation": "Điều này phản ánh văn hóa viết review lịch sự của khách quốc tế trên Airbnb: khen tổng thể nhưng gài góp ý chi tiết vào thân bài.",
    "projectLink": "src/kpi.py:L34-L45, L414-L426",
    "codeLocation": "src/kpi.py:L34-L45, L414-L426",
    "proofExample": "src/kpi.py:L34-L45, L414-L426 & `figures/llm_insights.png`.",
    "followUpQuestions": [
      "Trong `COMPLAINT_SCORE_MAP` và `COMPLAINT_MIXED_SCORE_MAP`, giá trị `\"not_mentioned\"` được gán trọng số bao nhiêu và có được loại ra khỏi mẫu số quận `N_LLM(k)` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `COMPLAINT_SCORE_MAP` và `COMPLAINT_MIXED_SCORE_MAP`, giá trị `\"not_mentioned\"` được gán trọng số bao nhiêu và có được loại ra khỏi mẫu số quận `N_LLM(k)` không?",
        "a": "Gán `0.0` và KHÔNG loại khỏi `N_LLM(k)` của quận (`grouped[col].mean()` tính trên toàn bộ `N_LLM(k)` review của quận để đo tỷ lệ khách phàn nàn trên tổng lưu lượng review của quận đó)."
      }
    ],
    "commonMistakes": [
      "Chỉ đếm mỗi nhãn `negative` rồi kết luận \"du khách gần như không có vấn đề gì với tiện nghi (chỉ 1.9%)\"."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-092",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "theory",
    "topics": [
      "Visualization"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Matplotlib Object-Oriented API (`fig, ax`) vs Pyplot trạng thái (`plt.*`).",
    "question": "Tại sao toàn bộ `src/viz.py` dùng giao diện hướng đối tượng `fig, ax = plt.subplots(...)` và `ax.set(...)` thay vì gọi `plt.title()`, `plt.xlim()` toàn cục?",
    "quickAnswer": "Khi vẽ nhiều khung biểu đồ trong cùng một hình (như 2 khung trong `plot_ppg_riqr`, lưới 2×2 trong `plot_ppg_snapshots`, bản đồ 4 khung trong `plot_ppg_neighbourhood`), API hướng đối tượng kiểm soát chính xác từng `Axes` (`ax1`, `ax2`, `axes[3]`) mà không bị lỗi ghi nhầm tiêu đề/trục sang khung hiện hành.",
    "explanation": "Ngoài ra `fig` dễ dàng được chuyển thẳng vào helper chuẩn hóa `_save(fig, path, title, caption)`.",
    "projectLink": "src/viz.py:L122, L230-L232",
    "codeLocation": "src/viz.py:L122, L230-L232",
    "proofExample": "Toàn bộ 8 hàm `plot_*()` trong `src/viz.py` đều dùng `fig, ax` / `GridSpec` và trả về `(path, fig)`.",
    "followUpQuestions": [
      "Khi chạy tự động qua `run_pipeline.py` (không truyền `--show`), tại sao `viz.py:L509` gọi `plt.close(fig)` ngay sau khi lưu PNG?"
    ],
    "followUpQA": [
      {
        "q": "Khi chạy tự động qua `run_pipeline.py` (không truyền `--show`), tại sao `viz.py:L509` gọi `plt.close(fig)` ngay sau khi lưu PNG?",
        "a": "Để giải phóng hoàn toàn bộ nhớ RAM của các đối tượng đồ họa Matplotlib và ngăn cửa sổ UI chặn tiến trình tự động."
      }
    ],
    "commonMistakes": [
      "Dùng `plt.xlim(...)` khi vẽ nhiều subplot khiến chỉ có subplot cuối cùng được set trục."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-093",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "theory",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lựa chọn thang đo, chung trục và bảng màu an toàn cho người mù màu.",
    "question": "Liệt kê 4 kỹ thuật chống đánh lừa thị giác (Visual Integrity) đã được áp dụng thực tế trong `src/viz.py`.",
    "quickAnswer": "1. **Chung thang trục (`sharex=True`, `sharey=True`)** ở `kpi_ppg_snapshots.png` và `kpi_riqr_neighbourhood.png` để thanh dài bằng nhau mới biểu diễn giá trị bằng nhau;\n2. **Chung chuẩn màu (`Normalize`)** trên cùng một hàng bản đồ Choropleth (Price Mean vs Median) và `vmin/vmax` cân đối quanh `0.0` (`RdBu_r`) cho Urgency Gap;\n3. **Trục giá bắt đầu từ `0`** trên biểu đồ thanh ngang;\n4. **Bảng màu `\"colorblind\"`** trên boxplot và màu tương phản cao, ghi kèm số liệu & cỡ mẫu `n` trực tiếp.",
    "explanation": "Không cắt cụt trục tung/ngang trên biểu đồ cột để phóng đại chênh lệch.",
    "projectLink": "src/viz.py:L123, L227-L228, L319",
    "codeLocation": "src/viz.py:L123, L227-L228, L319",
    "proofExample": "src/viz.py:L123, L155, L227-L228, L319, L394.",
    "followUpQuestions": [
      "Tại sao trên `plot_ppg_riqr` dùng thang log (`log_scale=True`) cho Boxplot nhưng vẫn giữ trục bắt đầu từ 0 cho thanh ngang `rIQR`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao trên `plot_ppg_riqr` dùng thang log (`log_scale=True`) cho Boxplot nhưng vẫn giữ trục bắt đầu từ 0 cho thanh ngang `rIQR`?",
        "a": "Boxplot biểu diễn phân bố trải rộng nhiều bậc độ lớn (300 → 153.000 MXN) cần thang log để nhìn rõ các tứ phân vị Q1–Med–Q3; còn biểu đồ độ dài thanh ngang rIQR so sánh tỉ lệ độ dài nên bắt buộc bắt đầu từ 0."
      }
    ],
    "commonMistakes": [
      "Tự động để matplotlib scale riêng trục X cho từng ô `t1`, `t3`, `t4` khiến sự tăng +64.1% trông phẳng lặng như nhau."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-094",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "theory",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "5 điểm kiểm tra một hình theo Bài 12–13.",
    "question": "Nêu đầy đủ **5 điểm kiểm tra chất lượng một biểu đồ** theo slide Bài 12–13 và chỉ ra cách `_save()` trong `src/viz.py` thực thi chúng.",
    "quickAnswer": "1. Tiêu đề nêu thông điệp chính (Action Title, không chỉ mô tả tên biến);\n2. Đầy đủ nhãn trục, đơn vị, cột từ 0 và chung thang đo khi so sánh;\n3. Ghi rõ cỡ mẫu `n` và các nhóm thiếu (`NA`);\n4. Chọn đúng dạng biểu đồ theo loại biến + bảng màu dễ đọc (an toàn mù màu);\n5. Ghi chú nguồn dữ liệu rõ ràng dưới chân hình và không diễn giải vượt quá số liệu.",
    "explanation": "Hàm `_save()` ép mọi figure đều có `suptitle` (Action Title) ở trên và `caption` bọc dòng ghi nguồn + cỡ mẫu ở chân hình với độ phân giải `150 DPI`.",
    "projectLink": "src/viz.py:L47-L56 & Bài 12–13",
    "codeLocation": "src/viz.py:L47-L56 & Bài 12–13",
    "proofExample": "src/viz.py:L47-L56 (`_save`).",
    "followUpQuestions": [
      "Thao tác `bbox_inches=\"tight\"` trong `fig.savefig(..., dpi=150, bbox_inches=\"tight\")` giúp giải quyết lỗi trình bày nào?"
    ],
    "followUpQA": [
      {
        "q": "Thao tác `bbox_inches=\"tight\"` trong `fig.savefig(..., dpi=150, bbox_inches=\"tight\")` giúp giải quyết lỗi trình bày nào?",
        "a": "Ngăn chữ nhãn trục quá dài hoặc tiêu đề phụ ở lề ngoài bị xén mất khi xuất thành ảnh PNG."
      }
    ],
    "commonMistakes": [
      "Đặt tiêu đề chung chung kiểu \"Biểu đồ giá PPG\" thay vì nêu insight định lượng và địa bàn/thời điểm."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-095",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt Observation (Quan sát) vs Insight (Phát hiện hành động được).",
    "question": "Một **Observation** (Quan sát bề mặt) khác một **Insight** (Phát hiện có giá trị quyết định) như thế nào trong Data Storytelling (Bài 14)?",
    "quickAnswer": "Observation chỉ đọc lại số liệu trên trục (vd: \"Mean Price Cuauhtémoc là 3.529 MXN\"). Insight giải thích **TẠI SAO** điều đó xảy ra, kết nối nhiều góc nhìn và dẫn tới **quyết định cụ thể** (vd: \"Mean bị 2 căn đầu cơ >153k đẩy lên 3.529 MXN dù Occ30=0% và Median chỉ 2.215; SECTUR phải dùng Median PPG thay vì Mean khi giám sát giá\").",
    "explanation": "Cấu trúc chuẩn 3 bước của Bài 14: Bối cảnh & Câu hỏi -> Bằng chứng & Insight -> Hàm ý quyết định & Giới hạn.",
    "projectLink": "Bài 14 & reports/report.pdf",
    "codeLocation": "Bài 14 & reports/report.pdf",
    "proofExample": "Toàn bộ 5 câu chuyện SECTUR CDMX trong báo cáo và trang Storytelling.",
    "followUpQuestions": [
      "Trong câu chuyện 5 (`llm_insights.png`), phát biểu nào là Observation thuần túy vs phát biểu nào là Insight?"
    ],
    "followUpQA": [
      {
        "q": "Trong câu chuyện 5 (`llm_insights.png`), phát biểu nào là Observation thuần túy vs phát biểu nào là Insight?",
        "a": "Observation: \"Tỷ lệ negative thuần cho amenities ở Cuauhtémoc là 1.9%\". Insight: \"Do khách có xu hướng khen rồi góp ý, gộp thêm lớp mixed phơi bày tỷ lệ phàn nàn thực sự tăng vọt gần 8 lần lên 14.8% — SECTUR cần siết tiêu chuẩn kiểm tra tiện nghi cơ bản thay vì chỉ nhìn số sao trung bình\"."
      }
    ],
    "commonMistakes": [
      "Đọc vẹt lại các con số trong bảng CSV mà không lý giải nguyên nhân thị trường hoặc tác động lên quyết định của stakeholder."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-096",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Nghịch lý Simpson (Simpson’s Paradox) & Thiên lệch chọn mẫu (Selection Bias).",
    "question": "Giải thích **Simpson’s Paradox** và **Selection Bias**; chỉ ra hai biểu hiện rõ nhất của Selection Bias trong dữ liệu Nhóm 4.",
    "quickAnswer": "**Simpson’s Paradox**: xu hướng xuất hiện trong từng nhóm con bị đảo ngược khi gộp chung toàn tập do mất cân đối cỡ mẫu giữa các nhóm. **Selection Bias**: mẫu chọn không ngẫu nhiên đại diện cho tổng thể. Trong BTL: (1) 1.000 listing cố định (~3.2% CDMX) thiếu hẳn quận Tláhuac và không đo căn mới gia nhập; (2) 1.000 review LLM tập trung **74.9% tại Cuauhtémoc** và **99.9% bằng tiếng Anh**.",
    "explanation": "Cũng liên quan tới hiện tượng `rank_price`: ở Xochimilco (n=5) tỷ lệ nhà lớn làm Price Mean cao #1 nhưng khi chuẩn hóa PPG lại tụt hạng.",
    "projectLink": "Bài 14 & kpi_by_neighbourhood.csv",
    "codeLocation": "Bài 14 & kpi_by_neighbourhood.csv",
    "proofExample": "reports/report.pdf Mục 6.2 & Bài 14.",
    "followUpQuestions": [
      "Làm thế nào tránh rơi vào bẫy Nghịch lý Simpson khi báo cáo biến động giá PPG của CDMX?"
    ],
    "followUpQA": [
      {
        "q": "Làm thế nào tránh rơi vào bẫy Nghịch lý Simpson khi báo cáo biến động giá PPG của CDMX?",
        "a": "Báo cáo đồng thời ở cả cấp tổng thể (`kpi_by_snapshot`), cấp loại phòng (`Entire home vs Private room` trên boxplot) và cấp từng khu vực/quận (`A01–A08`, `15 quận`)."
      }
    ],
    "commonMistakes": [
      "Quên mất 99.9% review LLM trong mẫu là tiếng Anh và tự tin khuyến nghị chính sách cho toàn bộ khách du lịch nội địa Mexico nói tiếng Tây Ban Nha!"
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-097",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Nguyên tắc Separation of Concerns (SOLID) trong kiến trúc 8 mô-đun BTL.",
    "question": "Nguyên tắc phân tách trách nhiệm (Separation of Concerns) thể hiện thế nào qua cấu trúc tệp trung gian giữa `qa.py`, `kpi.py` và `viz.py`?",
    "quickAnswer": "Mỗi mô-đun chỉ làm đúng 1 nhiệm vụ: `download` tải raw -> `filter` lọc phân công -> `qa` gắn cờ & chuẩn hóa -> `llm`/`baseline` trích nhãn văn bản -> `evaluate` chấm & hậu kiểm -> `kpi` tính toàn bộ chỉ số ra CSV -> `viz` CHỈ đọc CSV đã tính để vẽ hình.",
    "explanation": "Nhờ tách tầng tính (`kpi.py`) khỏi tầng vẽ (`viz.py`), muốn đổi màu sắc hoặc bố cục biểu đồ chỉ cần chạy lại `src/viz.py` trong 3 giây mà không phải chạy lại phép tính hay gọi LLM.",
    "projectLink": "run_pipeline.py & src/viz.py:L1",
    "codeLocation": "run_pipeline.py & src/viz.py:L1",
    "proofExample": "Docstring đầu tệp `src/viz.py:L1`: `\"(SOLID: chỉ đọc và vẽ)\"`.",
    "followUpQuestions": [
      "Nếu phát hiện công thức rIQR bị lỗi dấu ngoặc, cần sửa ở file nào và chạy lại từ bước nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu phát hiện công thức rIQR bị lỗi dấu ngoặc, cần sửa ở file nào và chạy lại từ bước nào?",
        "a": "Sửa duy nhất ở `src/kpi.py :: _iqr_stats()`, sau đó chỉ cần chạy lại `python src/kpi.py` và `python src/viz.py`!"
      }
    ],
    "commonMistakes": [
      "Tính toán lại `PPG = price / accommodates` ngay bên trong hàm vẽ `matplotlib` khiến logic bị nhân đôi và dễ lệch công thức với báo cáo."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vt-098",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Config-driven design với `configs/mexico-city.yaml` và tái lập môi trường.",
    "question": "Tại sao không viết thẳng `\"mexico-city\"`, `\"MXN\"`, `batch_size=5`, `stale_days=90` trong code Python mà đưa hết vào `configs/mexico-city.yaml`?",
    "quickAnswer": "Để tách biệt mã nguồn (logic tổng quát) khỏi tham số cấu hình (dữ liệu từng thành phố/thí nghiệm). Muốn áp dụng trọn bộ pipeline cho Madrid hoặc Barcelona chỉ cần tạo file YAML mới và truyền `--config configs/madrid.yaml` mà không sửa bất kỳ dòng code `.py` nào.",
    "explanation": "Kết hợp với `.python-version` (3.14.7) và `requirements.txt` (ghim version thư viện) tạo nên khả năng tái lập trọn vẹn.",
    "projectLink": "configs/mexico-city.yaml & run_pipeline.py:L38",
    "codeLocation": "configs/mexico-city.yaml & run_pipeline.py:L38",
    "proofExample": "Tất cả 9 tệp từ `run_pipeline.py` đến `src/viz.py` đều hỗ trợ cờ `--config` và biến môi trường `PIPELINE_CONFIG`.",
    "followUpQuestions": [
      "Tại sao `run_pipeline.py:L47` thiết lập biến môi trường `PIPELINE_CONFIG` khi đã truyền `--config` trong dòng lệnh rồi?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `run_pipeline.py:L47` thiết lập biến môi trường `PIPELINE_CONFIG` khi đã truyền `--config` trong dòng lệnh rồi?",
        "a": "Dự phòng kép (fallback): cả truyền tường minh `--config` qua CLI lẫn đặt `PIPELINE_CONFIG` trong `env` đều đảm bảo dù hàm nào tự đọc config cũng nhận đúng cùng một file YAML."
      }
    ],
    "commonMistakes": [
      "Hard-code đường dẫn `mexico-city` ở vài chỗ khiến khi đổi config sang thành phố khác pipeline bị chạy nhầm file cũ."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vt-099",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Quy chế AI Mở/Đóng và trách nhiệm giải trình cá nhân trong môn UET.DSE2049.",
    "question": "Trình bày sự khác biệt giữa chế độ **Mở** (khi làm BTL ở nhà) và chế độ **Đóng** (khi thi vấn đáp), cùng 3 nghĩa vụ bắt buộc khi sử dụng AI.",
    "quickAnswer": "Làm BTL ở nhà là chế độ **Mở** (được dùng AI hỗ trợ lập trình nhưng phải khai báo trung thực vào `AI_USAGE.md`, đọc hiểu 100% và tự kiểm chứng trên mẫu nhỏ). Thi vấn đáp là chế độ **Đóng** (cấm AI, cấm tài liệu; thi riêng từng người 10 phút). Ba nghĩa vụ: Khai báo minh bạch — Hiểu toàn bộ mọi dòng code — Tự kiểm chứng lỗi AI.",
    "explanation": "Việc AI gợi ý sai `Popen`, `.fillna(0)` hay ML overfit chính là bằng chứng nhóm đã thực sự kiểm chứng thay vì copy mù quáng.",
    "projectLink": "AI_USAGE.md",
    "codeLocation": "AI_USAGE.md",
    "proofExample": "AI_USAGE.md & https://courses.iaidev.com/programming-for-data-processing/2627-1/ai-policy.html.",
    "followUpQuestions": [
      "Tại sao trong `AI_USAGE.md` phải tách rõ 2 phạm vi \"AI hỗ trợ code\" và \"AI tích hợp trong pipeline\"?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao trong `AI_USAGE.md` phải tách rõ 2 phạm vi \"AI hỗ trợ code\" và \"AI tích hợp trong pipeline\"?",
        "a": "AI hỗ trợ code là công cụ lập trình ngoài sản phẩm; còn Gemini API trong `src/llm.py` là một mô hình thực nghiệm nằm TRONG luồng dữ liệu, bắt buộc phải đo Accuracy/F1/Chi phí và có Baseline đối chứng."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng mình chỉ làm phần vẽ biểu đồ nên vào phòng thi không cần hiểu code của `download.py`, `llm.py` hay `kpi.py`."
    ],
    "relatedFiles": [
      "AI_USAGE.md"
    ]
  },
  {
    "id": "vt-100",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Kiểu dữ liệu bất biến (Immutable) vs khả biến (Mutable).",
    "question": "Phân biệt kiểu dữ liệu Mutable (`list`, `dict`, `set`) và Immutable (`int`, `float`, `str`, `tuple`) và ảnh hưởng khi truyền tham số vào hàm Python?",
    "quickAnswer": "Immutable không thể sửa đổi giá trị tại chỗ (tạo đối tượng mới khi gán lại); Mutable có thể bị thay đổi ngay bên trong hàm gọi (`in-place`) qua tham chiếu.",
    "explanation": "Truyền một DataFrame hay `dict` vào hàm (như `cache` trong `process_pending_reviews`) có thể làm biến đổi trực tiếp biến của hàm cha nếu không gọi `.copy()`.",
    "projectLink": "src/qa.py:L58; src/llm.py:L369",
    "codeLocation": "src/qa.py:L58; src/llm.py:L369",
    "proofExample": "src/qa.py:L58 gọi `df = df.copy()` đầu hàm `apply_qa_rules()` để tránh làm biến đổi `raw_df` ở `main()`; ngược lại `process_pending_reviews()` cố ý cập nhật trực tiếp `cache[r_id] = rec`.",
    "followUpQuestions": [
      "Kiểu `tuple` có chứa một `list` bên trong như `t = ([1, 2], \"a\")` có sửa được `[1, 2]` bên trong không?"
    ],
    "followUpQA": [
      {
        "q": "Kiểu `tuple` có chứa một `list` bên trong như `t = ([1, 2], \"a\")` có sửa được `[1, 2]` bên trong không?",
        "a": "Có! Tham chiếu tới list nằm trong tuple không đổi, nhưng bản thân phần tử list vẫn là mutable nên `t[0].append(3)` chạy hợp lệ."
      }
    ],
    "commonMistakes": [
      "Vô tình thay đổi danh sách hoặc dict truyền vào mà không nhận ra side-effect lên bên gọi."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-101",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa `enumerate()` và `zip()` trong xử lý bảng và vẽ biểu đồ.",
    "question": "Tại sao trong Python nên viết `for i, val in enumerate(items):` và `zip(col1, col2)` thay vì dùng `for i in range(len(items)):`?",
    "quickAnswer": "`enumerate()` cung cấp đồng thời chỉ số và phần tử gọn sạch; `zip()` ghép từng cặp phần tử tương ứng từ nhiều danh sách song song mà không cần lập chỉ mục thủ công dễ lệch biên `IndexError`.",
    "explanation": "Lưu ý `zip()` mặc định dừng ở danh sách ngắn hơn (trừ khi truyền `strict=True` từ Python 3.10+ để bắt lỗi lệch độ dài!).",
    "projectLink": "src/kpi.py:L99; src/filter_data_from_sheet.py:L176",
    "codeLocation": "src/kpi.py:L99; src/filter_data_from_sheet.py:L176",
    "proofExample": "src/kpi.py:L99 dùng `enumerate(snaps)` để tạo nhãn `t1..t4`; `filter_data_from_sheet.py:L176` dùng `zip(listing_ids, analysis_areas)` tạo dict tra cứu.",
    "followUpQuestions": [
      "Tham số `start=1` trong `enumerate(snap.iloc[1:].iterrows(), 1)` ở `src/viz.py:L375` dùng để làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Tham số `start=1` trong `enumerate(snap.iloc[1:].iterrows(), 1)` ở `src/viz.py:L375` dùng để làm gì?",
        "a": "Bắt đầu đếm chỉ số `i` từ `1` (tạo nhãn `Q1, Q2, Q3`) thay vì bắt đầu từ `0`."
      }
    ],
    "commonMistakes": [
      "Dùng `zip()` khi hai danh sách dài khác nhau âm thầm cắt bỏ phần dư mà không báo lỗi."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-102",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cơ chế Context Manager (`with open(...) as f:`).",
    "question": "Tại sao mọi lệnh mở tệp tin trong `download.py`, `filter_data_from_sheet.py`, `qa.py`, `llm.py` đều nằm trong khối `with open(...) as f:`?",
    "quickAnswer": "Context manager bảo đảm gọi `f.close()` tự động để xả buffer xuống đĩa và giải phóng file handle NGAY CẢ KHI xảy ra ngoại lệ giữa chừng.",
    "explanation": "Nếu quên đóng tệp trên Windows khi ghi `.tmp`, bước `tmp.replace(dest)` tiếp theo sẽ văng `PermissionError` vì file vẫn đang bị tiến trình khóa.",
    "projectLink": "src/download.py:L51-L57",
    "codeLocation": "src/download.py:L51-L57",
    "proofExample": "src/download.py:L51-L53 đóng tệp `.tmp` xong ở cuối khối `with` mới gọi `tmp.replace(dest)`.",
    "followUpQuestions": [
      "Lệnh `json.dumps(record, ensure_ascii=False)` trong `save_to_cache()` bật `ensure_ascii=False` để làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Lệnh `json.dumps(record, ensure_ascii=False)` trong `save_to_cache()` bật `ensure_ascii=False` để làm gì?",
        "a": "Giữ nguyên chữ UTF-8 có dấu (tiếng Việt/Tây Ban Nha) thay vì mã hóa thành chuỗi thoát khó đọc như `\\u00e9`."
      }
    ],
    "commonMistakes": [
      "Viết `f = open(...); f.write(...); f.close()` không dùng `with` — khi gặp lỗi ghi nửa chừng sẽ làm rò rỉ file descriptor và khóa tệp trên Windows."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-103",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Tham số keyword-only sau dấu `*` trong chữ ký hàm Python.",
    "question": "Dấu `*` đứng độc lập trong chữ ký hàm `def _filter_raw_by_ids(path, key, assigned_ids, *, chunksize=100_000):` có ý nghĩa cú pháp gì?",
    "quickAnswer": "Tất cả các tham số sau dấu `*` đều là **keyword-only arguments** — người gọi bắt buộc phải truyền rõ tên `chunksize=...` chứ không được truyền theo vị trí.",
    "explanation": "Giúp lời gọi hàm tự giải thích rõ ý nghĩa tham số số (100.000 là chunksize, không nhầm sang giới hạn số dòng) và an toàn khi thêm tham số về sau.",
    "projectLink": "src/filter_data_from_sheet.py:L115-L120",
    "codeLocation": "src/filter_data_from_sheet.py:L115-L120",
    "proofExample": "src/filter_data_from_sheet.py:L119.",
    "followUpQuestions": [
      "Gọi `_filter_raw_by_ids(p, \"id\", ids, 50_000)` theo vị trí thì Python báo lỗi gì?"
    ],
    "followUpQA": [
      {
        "q": "Gọi `_filter_raw_by_ids(p, \"id\", ids, 50_000)` theo vị trí thì Python báo lỗi gì?",
        "a": "Báo `TypeError: _filter_raw_by_ids() takes 3 positional arguments but 4 were given`."
      }
    ],
    "commonMistakes": [
      "Tưởng `*` trong danh sách tham số này là `*args` (nhiều tham số vị trí)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-104",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Toán tử Walrus `:=` và Dict unpacking `{**a, **b}` trong Python 3.8+.",
    "question": "Giải thích ý nghĩa cú pháp `env = {**os.environ, \"PIPELINE_CONFIG\": ...}` (`run_pipeline.py:L47`) và toán tử `:=` (`src/evaluate.py:L220`, `src/viz.py:L34`).",
    "quickAnswer": "`{**os.environ, ...}` tạo một dictionary mới sao chép toàn bộ biến môi trường hiện có rồi ghi đè/bổ sung thêm khóa mới mà không làm biến đổi `os.environ` toàn cục của tiến trình cha. Toán tử Walrus `:=` cho phép gán biến ngay trong biểu thức điều kiện `if`/`for`.",
    "explanation": "Rút gọn code sạch sẽ mà vẫn rõ ràng phạm vi biến.",
    "projectLink": "run_pipeline.py:L47; src/viz.py:L34",
    "codeLocation": "run_pipeline.py:L47; src/viz.py:L34",
    "proofExample": "src/viz.py:L34 viết `if cols and (missing := [c for c in cols if c not in df.columns]):` vừa tạo biến `missing` vừa kiểm tra danh sách khác rỗng.",
    "followUpQuestions": [
      "Biểu thức `**{col: grouped[col].mean() ...}` trong `src/kpi.py:L426` thực hiện việc gì?"
    ],
    "followUpQA": [
      {
        "q": "Biểu thức `**{col: grouped[col].mean() ...}` trong `src/kpi.py:L426` thực hiện việc gì?",
        "a": "Giải nén dict comprehension chứa 14 cột `complaint_*` thành các tham số tên cột truyền trực tiếp vào `pd.DataFrame(...)`."
      }
    ],
    "commonMistakes": [
      "Sửa trực tiếp `os.environ[\"PIPELINE_CONFIG\"] = ...` ảnh hưởng toàn bộ tiến trình thay vì tạo bản dict riêng cho subprocess."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vt-105",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích của `np.vstack` và cấu trúc mảng đa giác.",
    "question": "Lệnh `pts = np.vstack([r for _, rings in features for r in rings])` trong `src/viz.py:L214` tạo mảng kết quả có shape thế nào?",
    "quickAnswer": "Gom xếp chồng theo chiều dọc tất cả các vòng đa giác `(N_i, 2)` của 16 quận thành một ma trận 2D duy nhất shape `(Tổng_số_đỉnh, 2)` gồm cột 0 (kinh độ `lon`) và cột 1 (vĩ độ `lat`).",
    "explanation": "Sau đó gọi `pts.min(axis=0)` và `pts.max(axis=0)` một lần để tìm khung tọa độ bao trọn toàn bộ Mexico City.",
    "projectLink": "src/viz.py:L214-L216",
    "codeLocation": "src/viz.py:L214-L216",
    "proofExample": "src/viz.py:L214-L216",
    "followUpQuestions": [
      "Vì sao cần `np.isfinite()` trong `src/viz.py:L365` bên cạnh `pd.isna()`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao cần `np.isfinite()` trong `src/viz.py:L365` bên cạnh `pd.isna()`?",
        "a": "Vì `np.isfinite(x)` kiểm tra đồng thời `x` KHÔNG phải `NaN` và KHÔNG phải vô cực (`+inf`, `-inf`) — an toàn tuyệt đối cho trục `ylim`/`vmax` của matplotlib."
      }
    ],
    "commonMistakes": [
      "Dùng vòng `for` tìm min/max từng quận rời rạc gây rườm rà và dễ sót phần tử đa giác phụ trong `MultiPolygon`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-106",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `np.nan`, `float(\"inf\")` và tác động lên `apply_qa_rules`.",
    "question": "Giá trị dương vô cực `np.inf` (sinh ra khi chia cho 0 trong `float64`) có bị điều kiện `isna() | (x <= 0)` bắt lại không?",
    "quickAnswer": "KHÔNG! `np.isnan(np.inf)` là `False` và `np.inf <= 0` cũng là `False`! Nên nếu một ô giá chứa chuỗi `\"inf\"` (chuỗi hợp lệ với `pd.to_numeric`), điều kiện `isna() | (<= 0)` sẽ để lọt số vô cực này.",
    "explanation": "Dùng `~np.isfinite(x)` sẽ bắt trọn cả `NaN`, `+inf` và `-inf` (đây là một edge case hay gặp khi kiểm toán code QA).",
    "projectLink": "src/qa.py:L96 & Bài 3",
    "codeLocation": "src/qa.py:L96 & Bài 3",
    "proofExample": "src/qa.py:L96 chỉ kiểm `price_numeric.isna() | (price_numeric <= 0)` — chưa dùng `np.isfinite`.",
    "followUpQuestions": [
      "Trong pandas, thiết lập nào khiến `pd.isna(np.inf)` trả về `True` (chú ý sắp bị deprecate trong pandas 3)?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas, thiết lập nào khiến `pd.isna(np.inf)` trả về `True` (chú ý sắp bị deprecate trong pandas 3)?",
        "a": "`pd.options.mode.use_inf_as_na = True` (đã deprecated/loại bỏ trong pandas 2.1+/3.0; chuẩn hiện đại là dùng `np.isfinite()` tường minh)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `pd.isna(np.inf)` trả về `True` (thực tế `np.inf` không phải `NaN`)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-107",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lọc giữ cột bằng `df[cols]` vs `.reindex(columns=...)` và thứ tự cột CSV.",
    "question": "Khi chọn một tập con cột bằng danh sách `df[[\"id\", \"price\"]]` vs gọi `df[\"id\"]`, kiểu trả về và rủi ro thiếu cột là gì?",
    "quickAnswer": "`df[[\"id\"]]` (list 1 phần tử) luôn trả về `DataFrame` 2D, còn `df[\"id\"]` (chuỗi đơn) trả về `Series` 1D. Nếu bất kỳ tên cột nào thiếu, `df[cols]` ném `KeyError` ngay (khắc phục trước bằng kiểm tập giao hoặc `[c for c in cols if c in df.columns]`).",
    "explanation": "Cách viết `[c for c in (...) if c in df_all.columns]` tại `src/baseline.py:L149` giúp linh hoạt nếu CSV thiếu một cột metadata tùy chọn như `reviewer_name`.",
    "projectLink": "src/baseline.py:L149; src/kpi.py:L267",
    "codeLocation": "src/baseline.py:L149; src/kpi.py:L267",
    "proofExample": "src/baseline.py:L149; src/kpi.py:L267",
    "followUpQuestions": [
      "Trong `src/kpi.py:L267`, cú pháp `dict.fromkeys((area_col, \"neighbourhood_cleansed\", \"room_type\"))` dùng để làm gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py:L267`, cú pháp `dict.fromkeys((area_col, \"neighbourhood_cleansed\", \"room_type\"))` dùng để làm gì?",
        "a": "Loại bỏ tên cột trùng lặp mà VẪN giữ đúng thứ tự ưu tiên ban đầu (ví dụ nếu người dùng cấu hình `area_col = \"neighbourhood_cleansed\"` trong YAML!)."
      }
    ],
    "commonMistakes": [
      "Truyền cứng danh sách 6 cột metadata vào `df_all[cols]` làm crash khi dữ liệu kiểm thử thiếu cột `reviewer_name`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-108",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Sự khác nhau giữa `.str.strip()`, `.str.lower()` trên `object` vs `string` dtype.",
    "question": "Khi chạy các phương thức `.str.*` trên Series có lẫn `None` và số, `StringDtype` (`astype(\"string\")`) khác `object` truyền thống điểm nào?",
    "quickAnswer": "Trên cột `object` chứa số nguyên `123`, gọi `.str.strip()` biến số thành `NaN` âm thầm! Ngược lại `astype(\"string\")` chuyển mọi phần tử non-null sang chuỗi thật trước khi chạy `.str.strip()` và giữ chuẩn `<NA>` cho ô khuyết.",
    "explanation": "Ngoài ra chuỗi trên backend `object` vẫn là vòng lặp Python thuần qua từng phần tử, còn pandas 3 tích hợp PyArrow strings giúp `.str.*` nhanh hơn hẳn.",
    "projectLink": "src/qa.py:L91, L277; src/filter_data_from_sheet.py:L35",
    "codeLocation": "src/qa.py:L91, L277; src/filter_data_from_sheet.py:L35",
    "proofExample": "src/qa.py:L91, L277 và `filter_data_from_sheet.py:L35` đều ép `.astype(\"string\")` trước `.str.strip()`.",
    "followUpQuestions": [
      "Chuỗi phương thức `df[\"id\"].astype(\"string\").str.strip()` gọi từng bước từ trái sang phải thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Chuỗi phương thức `df[\"id\"].astype(\"string\").str.strip()` gọi từng bước từ trái sang phải thế nào?",
        "a": "`.astype(\"string\")` trả về Series `StringDtype`, từ Series đó truy cập accessor `.str` rồi gọi `.strip()` trả tiếp Series đã cắt khoảng trắng."
      }
    ],
    "commonMistakes": [
      "Gọi `.str.strip()` thẳng trên cột số làm biến toàn bộ dữ liệu số thành `NaN` không báo lỗi."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-109",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `df.sort_values(..., na_position=\"last\")` và `sort_index()`.",
    "question": "Trong `src/viz.py:L211` và `L312`, tham số `na_position=\"last\"` khi gọi `sort_values()` có tác dụng gì?",
    "quickAnswer": "Đẩy mọi hàng có khóa sắp xếp là `NaN` (ví dụ quận không có giá hoặc thiếu rank) xuống cuối bảng thay vì để `ascending=False` hoặc mặc định làm xáo trộn thứ tự hiển thị.",
    "explanation": "Kết hợp truyền nhiều tiêu chí ưu tiên (`total_listings` giảm dần -> `valid_price` giảm dần -> `ten_quan` tăng dần) giúp thứ tự biểu đồ ổn định 100% (deterministic).",
    "projectLink": "src/viz.py:L211, L312",
    "codeLocation": "src/viz.py:L211, L312",
    "proofExample": "src/viz.py:L211, L312 và `src/kpi.py:L459`.",
    "followUpQuestions": [
      "Trong `sort_values([\"llm_review_count\", \"neighbourhood_cleansed\"], ascending=[False, True])` (`src/kpi.py:L459`), các quận có cùng `llm_review_count = 0` xếp theo thứ tự nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `sort_values([\"llm_review_count\", \"neighbourhood_cleansed\"], ascending=[False, True])` (`src/kpi.py:L459`), các quận có cùng `llm_review_count = 0` xếp theo thứ tự nào?",
        "a": "Xếp theo thứ tự bảng chữ cái A–Z của tên quận (`ascending=True`): `Iztapalapa` -> `Milpa Alta` -> `Xochimilco`."
      }
    ],
    "commonMistakes": [
      "Sắp xếp theo chuỗi string ngày `\"2025-12-29\"` mà không kiểm định chuẩn ISO hoặc `key=pd.to_datetime`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-110",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Ý nghĩa của `index=False` trong `.to_csv()` và `Unnamed: 0` trap.",
    "question": "Điều gì xảy ra nếu quên truyền `index=False` khi xuất DataFrame bằng `df.to_csv(path)`?",
    "quickAnswer": "Pandas xuất thêm cột chỉ mục hàng `0, 1, 2...` không có tiêu đề ở cột đầu tiên; khi tệp sau gọi `pd.read_csv()` lại biến nó thành cột rác mang tên `\"Unnamed: 0\"`.",
    "explanation": "Với tệp `kpi_by_listing.csv`, vì đã gọi `.reset_index()` đưa `\"id\"` vào cột thường nên bắt buộc phải dùng `index=False`.",
    "projectLink": "src/filter_data_from_sheet.py:L151; src/kpi.py:L509",
    "codeLocation": "src/filter_data_from_sheet.py:L151; src/kpi.py:L509",
    "proofExample": "Tất cả các hàm xuất CSV trong BTL (`_save_frame`, `qa.py`, `llm.py`, `baseline.py`, `evaluate.py`, `kpi.py`) đều ghi `index=False` (chỉ `evaluate.py` đặt `doc_bang` set index nội bộ và không xuất index rác).",
    "followUpQuestions": [
      "Trong trường hợp nào lại cố tình giữ `index=True` khi xuất `.to_csv()`?"
    ],
    "followUpQA": [
      {
        "q": "Trong trường hợp nào lại cố tình giữ `index=True` khi xuất `.to_csv()`?",
        "a": "Khi chính `index` là khóa nghiệp vụ đã có `index.name` rõ ràng (ví dụ bảng tổng hợp sau `groupby()` chưa gọi `reset_index()`); ở BTL nhóm chọn `reset_index()` + `index=False` cho đồng nhất."
      }
    ],
    "commonMistakes": [
      "Xuất file thiếu `index=False` rồi đọc lại làm `len(df.columns)` tăng dần mỗi lần chạy pipeline."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-111",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Khác biệt giữa `compression=\"infer\"` và `compression=\"gzip\"` khi đọc dữ liệu.",
    "question": "Trong `pd.read_csv(path, compression=\"infer\")`, pandas tự nhận diện kiểu nén dựa vào yếu tố gì?",
    "quickAnswer": "Nhận diện tự động dựa vào phần mở rộng của tên file (`.gz` -> gzip, `.zip`, `.bz2`, `.xz`; còn `.csv` không đuôi nén -> đọc thẳng không giải nén).",
    "explanation": "Ưu điểm: cùng một hàm `_filter_raw_by_ids()` đọc được cả `.csv.gz` thực tế lẫn `.csv` thường trong các test đơn vị!",
    "projectLink": "src/filter_data_from_sheet.py:L129",
    "codeLocation": "src/filter_data_from_sheet.py:L129",
    "proofExample": "src/filter_data_from_sheet.py:L129",
    "followUpQuestions": [
      "Nếu file `.csv.gz` bị đổi tên thành `.csv` (nhưng ruột vẫn nén nhị phân gzip), `compression=\"infer\"` giải nén được không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu file `.csv.gz` bị đổi tên thành `.csv` (nhưng ruột vẫn nén nhị phân gzip), `compression=\"infer\"` giải nén được không?",
        "a": "KHÔNG! `infer` chỉ nhìn đuôi tên file nên sẽ đọc ra bytes rác gây `UnicodeDecodeError`; khi đó phải truyền tường minh `compression=\"gzip\"`."
      }
    ],
    "commonMistakes": [
      "Ghi cứng `compression=\"gzip\"` khiến hàm báo lỗi ngay khi truyền file `.csv` không nén lúc viết test."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-112",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Timeout kết nối vs Timeout đọc dữ liệu và giá trị `timeout_ms` trong `genai.Client`.",
    "question": "So sánh tham số `timeout=60` trong `requests.get()` (giây) với `HttpOptions(timeout=timeout_ms)` trong `src/llm.py:L203` (mili-giây).",
    "quickAnswer": "`requests.get(url, timeout=60)` nhận đơn vị **giây** (60s); còn `google.genai.types.HttpOptions(timeout=60_000)` nhận đơn vị **mili-giây** (60.000 ms = 60s).",
    "explanation": "Quên đổi đơn vị truyền `60` vào `HttpOptions(timeout=60)` sẽ biến timeout thành 60 mili-giây làm 100% lời gọi API bị đứt ngay lập tức!",
    "projectLink": "src/llm.py:L197-L204; src/download.py:L33",
    "codeLocation": "src/llm.py:L197-L204; src/download.py:L33",
    "proofExample": "src/llm.py:L197, L203 ghi rõ tên biến `timeout_ms: int = 60_000`.",
    "followUpQuestions": [
      "Trong Python, viết số `60_000` hay `100_000` có dấu gạch dưới `_` có làm số thành chuỗi `str` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong Python, viết số `60_000` hay `100_000` có dấu gạch dưới `_` có làm số thành chuỗi `str` không?",
        "a": "Không! Dấu `_` là numeric literal separator từ Python 3.6 giúp lập trình viên dễ đọc số lớn; Python hiểu hoàn toàn là `int` (`60000`, `100000`)."
      }
    ],
    "commonMistakes": [
      "Truyền số `60` vào `HttpOptions(timeout=60)` và thắc mắc vì sao API luôn báo `TimeoutError`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-113",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do tách mã 403/404 khỏi vòng Retry Backoff trong `download.py`.",
    "question": "Phân tích chiến lược xử lý lỗi có chọn lọc của `src/download.py`: tại sao HTTP 403/404 dừng ngay không backoff, còn Timeout / 503 / incomplete byte lại backoff?",
    "quickAnswer": "Lỗi 403 (Forbidden — như Inside Airbnb khóa quyền truy cập bản lịch sử t1 cũ) và 404 (Not Found — sai URL) là lỗi cố định không thể tự biến mất sau 1–2 giây; retry chỉ làm tốn thời gian vô ích. Ngược lại Timeout, nghẽn kết nối hay lỗi 502/503 hoặc mất gói cuối là sự cố nhất thời có xác suất thành công cao khi chờ Exponential Backoff `2**attempt`.",
    "explanation": "Đặc biệt nếu người học đã tải tay bản lưu dự phòng khi bị 403, nhánh 403 trả về `dest.exists() and dest.stat().st_size > 0` cho phép pipeline đi tiếp mượt mà.",
    "projectLink": "src/download.py:L34-L64",
    "codeLocation": "src/download.py:L34-L64",
    "proofExample": "src/download.py:L34-L37, L60-L64.",
    "followUpQuestions": [
      "Trong BTL Nhóm 4, snapshot nào thực tế thường trả về HTTP 403 từ máy chủ lưu trữ Inside Airbnb?"
    ],
    "followUpQA": [
      {
        "q": "Trong BTL Nhóm 4, snapshot nào thực tế thường trả về HTTP 403 từ máy chủ lưu trữ Inside Airbnb?",
        "a": "Snapshot cũ nhất `2025-09-27` (`t1`) khi kho Inside Airbnb chuyển sang lưu trữ trả phí/hạn chế archive -> cần giữ file raw local dự phòng cho `t1`."
      }
    ],
    "commonMistakes": [
      "Retry 5 lần với Backoff cả lỗi 404 Not Found rồi mới dừng."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-114",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Chuẩn hóa chuỗi vs Bóc tách cấu trúc JSON từ bảng.",
    "question": "Khi đọc dữ liệu văn bản thô Inside Airbnb (`listings` và `reviews`), những dạng bẩn phổ biến nào cần làm sạch trước khi phân tích?",
    "quickAnswer": "1. Chuỗi tiền tệ chứa `$`, `,`, khoảng trắng (`\"$1,940.00\"`); 2. Thẻ HTML `<br/>`, `&amp;`, URL và ký tự Unicode dị biệt trong bình luận; 3. Giá trị thiếu đa dạng (`\"\"`, `\"N/A\"`, `NaN`, giá `<= 0`); 4. ID dạng số nguyên lớn bị tràn float64; 5. Ngày không hợp lệ hoặc nằm tương lai.",
    "explanation": "Mỗi dạng bẩn được xử lý đúng tầng riêng (`filter` cho ID, `qa` cho giá/miền/ngày, `baseline` cho HTML/URL/NFKC).",
    "projectLink": "src/qa.py; src/baseline.py",
    "codeLocation": "src/qa.py; src/baseline.py",
    "proofExample": "Toàn bộ chuỗi `filter_data_from_sheet.py` -> `qa.py` -> `baseline.py`.",
    "followUpQuestions": [
      "Chuỗi `\"$0.00\"` trong cột `price` có parse được thành số qua Regex không và bước nào trong `qa.py` bắt nó?"
    ],
    "followUpQA": [
      {
        "q": "Chuỗi `\"$0.00\"` trong cột `price` có parse được thành số qua Regex không và bước nào trong `qa.py` bắt nó?",
        "a": "Regex parse được thành `0.0`, sau đó `RULE_MISSING_PRICE` ở `L96` (`price_numeric <= 0`) bắt ngay và gắn cờ `qa_missing_price = True` + đặt `price_mxn = NaN`."
      }
    ],
    "commonMistakes": [
      "Chạy Regex `r\"[^\\d.-]\"` cả trên cột `comments` hoặc quên `html.unescape()` trên review."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-115",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `valid_price_count` và `valid_ppg_count`.",
    "question": "Tại sao trong `kpi_by_snapshot.csv` nhóm thiết kế cả 2 cột `valid_price_count` lẫn `valid_ppg_count` dù ở CDMX giá trị hai cột này tình cờ bằng nhau (960, 0, 988, 980)?",
    "quickAnswer": "Vì Price chỉ cần giá hợp lệ (`> 0`), còn PPG (`Price / Accommodates`) đòi hỏi ĐỒNG THỜI giá hợp lệ VÀ `accommodates >= 1` (`~qa_invalid_accommodates`). Nếu chạy trên thành phố khác có vài listing thiếu sức chứa nhưng vẫn có giá, `valid_ppg_count` sẽ nhỏ hơn `valid_price_count`!",
    "explanation": "Đây là minh chứng thiết kế chặt chẽ của cả `kpi.py` lẫn `_sample_tag()` trong `viz.py`.",
    "projectLink": "src/kpi.py:L240-L251",
    "codeLocation": "src/kpi.py:L240-L251",
    "proofExample": "src/kpi.py:L240-L251 & `src/viz.py:L191-L195`.",
    "followUpQuestions": [
      "Nếu tại một thành phố khác có 900 listing giá hợp lệ và trong đó có 10 listing bị `accommodates = 0`, giá trị của `valid_price_count` và `valid_ppg_count` là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Nếu tại một thành phố khác có 900 listing giá hợp lệ và trong đó có 10 listing bị `accommodates = 0`, giá trị của `valid_price_count` và `valid_ppg_count` là bao nhiêu?",
        "a": "`valid_price_count = 900`, còn `valid_ppg_count = 890`."
      }
    ],
    "commonMistakes": [
      "Gộp dùng chung 1 biến đếm duy nhất cho cả Price và PPG."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-116",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do tách 4 bảng đầu ra ở 4 cấp độ hạt (Granularity) khác nhau.",
    "question": "Vì sao `src/kpi.py` phải xuất tới 4 tệp CSV (`kpi_by_listing`, `kpi_by_area`, `kpi_by_snapshot`, `kpi_by_neighbourhood`) thay vì gộp vào 1 bảng duy nhất?",
    "quickAnswer": "Do 4 đơn vị phân tích (Grain) khác nhau: `listing` có 1.000 dòng theo từng căn hộ panel; `area` có 8 dòng tổng hợp theo A01–A08 cân đối cỡ mẫu (120–130 căn/khu); `snapshot` có 4 dòng theo mốc thời gian toàn mẫu; `neighbourhood` có 15 dòng gắn địa bàn hành chính thật cho SECTUR CDMX kèm tỷ lệ phàn nàn LLM.",
    "explanation": "Gộp chung 4 cấp độ vào 1 bảng sẽ phá vỡ chuẩn bảng dữ liệu Tidy Data (Bài 4/10) và không tính chính xác Median từng cấp được.",
    "projectLink": "src/kpi.py:L493-L507",
    "codeLocation": "src/kpi.py:L493-L507",
    "proofExample": "src/kpi.py:L493-L507.",
    "followUpQuestions": [
      "Giữa `kpi_by_area.csv` (8 khu vực A01–A08) và `kpi_by_neighbourhood.csv` (15 quận), bảng nào phục vụ trực tiếp cho chính sách địa bàn của SECTUR CDMX và bảng nào cân bằng hơn về cỡ mẫu?"
    ],
    "followUpQA": [
      {
        "q": "Giữa `kpi_by_area.csv` (8 khu vực A01–A08) và `kpi_by_neighbourhood.csv` (15 quận), bảng nào phục vụ trực tiếp cho chính sách địa bàn của SECTUR CDMX và bảng nào cân bằng hơn về cỡ mẫu?",
        "a": "`kpi_by_neighbourhood` gắn trực tiếp ranh giới quản lý hành chính của SECTUR CDMX (dù cỡ mẫu lệch mạnh 525 vs 1), còn `kpi_by_area` chia 8 khu có cỡ mẫu đồng đều 120–130 căn giúp so sánh ổn định hơn."
      }
    ],
    "commonMistakes": [
      "Tính `median(trung vị từng quận)` để làm trung vị toàn thị trường thay vì tính lại trên cấp `listing`!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-117",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Khác biệt giữa `evaluation` trên 100 mẫu GT vs `postcheck` trên 1.000 mẫu LLM.",
    "question": "Mục đích của `phan_tich_loi()` và `hau_kiem()` trong `src/evaluate.py` bổ trợ cho nhau thế nào?",
    "quickAnswer": "`phan_tich_loi()` đo lường ĐỘ ĐÚNG so với chân lý của con người (`ground_truth.csv`) nhưng chỉ kiểm tra được trên 100 review có nhãn tay. `hau_kiem()` chạy 6 quy tắc kiểm tra tính NHẤT QUÁN NỘI TẠI không cần nhãn tay trên cả 1.000 review (bao gồm 900 review chưa từng được người chấm).",
    "explanation": "Hai bước kết hợp phủ cả chiều sâu (chất lượng so với người chấm) lẫn chiều rộng (toàn bộ 100% tập LLM).",
    "projectLink": "src/evaluate.py:L150-L195",
    "codeLocation": "src/evaluate.py:L150-L195",
    "proofExample": "src/evaluate.py:L150-L195.",
    "followUpQuestions": [
      "Trong 6 quy tắc của `hau_kiem()`, quy tắc nào bắt được mâu thuẫn ngữ nghĩa nội tại mạnh nhất giữa tổng thể và từng khía cạnh?"
    ],
    "followUpQA": [
      {
        "q": "Trong 6 quy tắc của `hau_kiem()`, quy tắc nào bắt được mâu thuẫn ngữ nghĩa nội tại mạnh nhất giữa tổng thể và từng khía cạnh?",
        "a": "Quy tắc 4 (`tich_cuc_nhung_chi_bi_che`) và Quy tắc 5 (`tieu_cuc_nhung_chi_duoc_khen`) — ví dụ bắt được 1 ca nghi vấn ở `id=1193747167008340969`."
      }
    ],
    "commonMistakes": [
      "Cho rằng đã có `hau_kiem()` rồi thì không cần tự gán nhãn tay `ground_truth.csv` nữa (hậu kiểm KHÔNG phát hiện được nếu mô hình đoán sai ngược nghĩa nhưng hợp logic tự thân!)."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-118",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cấu trúc một báo cáo/trình bày phân tích thuyết phục cho Stakeholder.",
    "question": "Theo Bài 14, thứ tự trình bày một phát hiện dữ liệu cho Stakeholder (SECTUR CDMX) khác gì cách viết nhật ký code của kỹ sư?",
    "quickAnswer": "Kỹ sư hay kể theo trình tự thời gian viết code (tải sao -> parse sao -> merge sao); còn **Data Storytelling** bắt đầu từ **Câu hỏi nghiệp vụ của Stakeholder -> Câu trả lời trực diện (Insight chính) -> Bằng chứng định lượng & Biểu đồ minh bạch -> Khuyến nghị hành động -> Giới hạn cần lưu ý**.",
    "explanation": "Người nghe cần biết \"So what? Now what?\" trước khi xem chi tiết kỹ thuật xử lý.",
    "projectLink": "reports/report.pdf & Bài 14",
    "codeLocation": "reports/report.pdf & Bài 14",
    "proofExample": "Cấu trúc 6 chương trong `reports/report.pdf` và 9 phần trên trang `StorytellingPage`.",
    "followUpQuestions": [
      "Tại sao phải đặt mục **Giới hạn dữ liệu (Limitations)** rõ ràng thay vì giấu đi để báo cáo nghe có vẻ chắc chắn hơn?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao phải đặt mục **Giới hạn dữ liệu (Limitations)** rõ ràng thay vì giấu đi để báo cáo nghe có vẻ chắc chắn hơn?",
        "a": "Sự trung thực khoa học giúp SECTUR CDMX không áp dụng nhầm con số từ 3.2% mẫu hay dữ liệu availability proxy để ban hành chế tài sai lên toàn bộ 31.430 chủ nhà."
      }
    ],
    "commonMistakes": [
      "Đưa toàn bộ log `qa_report` và hàm Python lên đầu buổi thuyết trình với Sở Du lịch thay vì đi từ câu hỏi thị trường."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vt-119",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Tại sao",
    "evaluationGoal": "Lý do dùng `argparse` thay cho `input()` tương tác trong toàn bộ pipeline.",
    "question": "Vì sao phiên bản đầu AI gợi ý dùng `input(\"Nhập đường dẫn config: \")` trong `download.py` lại bị nhóm loại bỏ và thay bằng `argparse` + biến môi trường?",
    "quickAnswer": "Khi chạy tự động qua `run_pipeline.py` (`subprocess.run`) hoặc trên CI/GitHub Actions/máy chấm tự động, không có người ngồi gõ bàn phím nên lệnh `input()` làm tiến trình treo cứng hoặc văng `EOFError: EOF when reading a line`.",
    "explanation": "`argparse` cho phép truyền tham số rõ ràng qua CLI (`--config`, `--skip-llm`, `--force`, `--show`) và sinh sẵn trợ giúp `--help`.",
    "projectLink": "src/download.py:L110-L115 & AI_USAGE.md",
    "codeLocation": "src/download.py:L110-L115 & AI_USAGE.md",
    "proofExample": "AI_USAGE.md mục 1.2 & `src/download.py:L110-L115`.",
    "followUpQuestions": [
      "Vì sao `plt.show(block=True)` trong `src/viz.py:L511` KHÔNG làm treo `run_pipeline.py`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao `plt.show(block=True)` trong `src/viz.py:L511` KHÔNG làm treo `run_pipeline.py`?",
        "a": "Vì nó được bọc sau cờ tùy chọn `if args.show:` (mặc định là `False` nên khi chạy pipeline chỉ lưu PNG và đóng figure)."
      }
    ],
    "commonMistakes": [
      "Để sót một lệnh `input()` hoặc `plt.show()` mặc định chặn màn hình bên trong pipeline tự động."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-120",
    "category": "I",
    "categoryLabel": "Đọc hiểu code",
    "bucket": "theory",
    "topics": [
      "Code Trace"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Truy vết vòng đời kiểu dữ liệu của cột `id` từ Raw CSV.GZ -> Processed -> KPI -> Evaluate.",
    "question": "Theo dõi trọn vẹn hành trình của một mã `listing_id` 19 chữ số (ví dụ `1495709040675944121`) đi qua 6 bước pipeline cho tới biểu đồ cuối.",
    "quickAnswer": "1. Trong `listings.csv.gz` gốc là text; 2. `filter_data_from_sheet.py` đọc bằng `dtype={\"id\": \"string\"}` + `_normalise_id()`, xuất `listings.csv`; 3. `qa.py` đọc tiếp `dtype={\"id\": \"string\"}`, giữ nguyên không đổi kiểu; 4. `kpi.py` đọc `dtype={\"id\": \"string\"}`, gắn `set_index(\"id\")` làm khóa Index Alignment qua 4 mốc và xuất `kpi_by_listing.csv`; 5. `evaluate.py` đọc `dtype=str` để nối `id` với nhãn tay; 6. `viz.py` đọc `kpi_by_listing.csv` với `dtype={\"id\": \"string\"}`.",
    "explanation": "Chỉ cần 1 bước ở giữa quên `dtype=\"string\"`, toàn bộ chuỗi nối ID sau đó sẽ mất độ chính xác hoặc rớt bản ghi.",
    "projectLink": "src/filter_data_from_sheet.py:L130; src/kpi.py:L103",
    "codeLocation": "src/filter_data_from_sheet.py:L130; src/kpi.py:L103",
    "proofExample": "Xuyên suốt `filter_data_from_sheet.py`, `qa.py`, `llm.py`, `baseline.py`, `evaluate.py`, `kpi.py`, `viz.py`.",
    "followUpQuestions": [
      "Khi một file CSV chỉ có chuỗi toàn chữ số như `\"1495709040675944121\"` được lưu không có dấu ngoặc kép bao quanh, lệnh `pd.read_csv(path)` mặc định không có `dtype` đọc thành kiểu gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi một file CSV chỉ có chuỗi toàn chữ số như `\"1495709040675944121\"` được lưu không có dấu ngoặc kép bao quanh, lệnh `pd.read_csv(path)` mặc định không có `dtype` đọc thành kiểu gì?",
        "a": "Sẽ suy luận thành `int64` (nếu không có ô trống và <= 2^63-1) hoặc **`float64`** (nếu có bất kỳ ô trống/NaN hoặc số vượt ngưỡng -> gây mất chữ số!)."
      }
    ],
    "commonMistakes": [
      "Quên ép `dtype={\"id\": \"string\"}` ở duy nhất một file cuối (như `kpi.py` hoặc `evaluate.py`)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-121",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt List Comprehension vs vòng for truyền thống.",
    "question": "List comprehension `[x * 2 for x in nums if x > 0]` có ưu điểm gì hơn vòng `for` + `.append()`?",
    "quickAnswer": "Ngắn gọn 1 biểu thức khai báo, dễ đọc ý định lọc-biến đổi và nhanh hơn vòng `.append()` nhờ tối ưu cấp phát bytecode `LIST_APPEND` ở tầng C.",
    "explanation": "Tuy nhiên không nên lồng quá 2 vòng `for` trong một list comprehension vì sẽ làm giảm tính dễ đọc.",
    "projectLink": "src/baseline.py:L150",
    "codeLocation": "src/baseline.py:L150",
    "proofExample": "src/baseline.py:L150 dùng `[predict_review_regex(c, aspects) for c in df_all[\"comments\"]]`.",
    "followUpQuestions": [
      "Trong `[x if x > 0 else 0 for x in arr]` và `[x for x in arr if x > 0]`, vị trí `if` khác nhau thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `[x if x > 0 else 0 for x in arr]` và `[x for x in arr if x > 0]`, vị trí `if` khác nhau thế nào?",
        "a": "Đứng trước `for` (`x if ... else ...`) là biểu thức tam nguyên biến đổi phần tử (giữ nguyên độ dài list); đứng sau `for` là bộ lọc loại phần tử."
      }
    ],
    "commonMistakes": [
      "Nhét hàm `print()` hoặc câu lệnh có side-effect làm thay đổi state vào bên trong list comprehension."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-122",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cơ chế truyền tham chiếu (Call by Object Reference) trong Python.",
    "question": "Python truyền tham số vào hàm theo \"tham trị\" (by value) hay \"tham chiếu\" (by reference)?",
    "quickAnswer": "Chính xác là **Call by Object Reference** (truyền tham chiếu đối tượng): biến trong hàm nhận cùng địa chỉ trỏ tới đối tượng gốc; nếu gán lại biến đó (`x = 5`) chỉ đổi con trỏ cục bộ, còn nếu gọi phương thức biến đổi nội tại (`list.append`, `dict[k] = v`) sẽ sửa thẳng đối tượng bên ngoài.",
    "explanation": "Chính vì thế trong `src/llm.py:L369`, hàm `process_pending_reviews()` sửa trực tiếp dict `cache[r_id] = rec` không cần `return cache`.",
    "projectLink": "src/llm.py:L369",
    "codeLocation": "src/llm.py:L369",
    "proofExample": "src/llm.py:L369 & `src/qa.py:L58`.",
    "followUpQuestions": [
      "Trong `apply_qa_rules(df, ...)`, vì dòng 67 viết `df = df.loc[~dup_mask].copy()` (gán lại biến `df`), nên câu lệnh ở cuối hàm BẮT BUỘC phải là gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong `apply_qa_rules(df, ...)`, vì dòng 67 viết `df = df.loc[~dup_mask].copy()` (gán lại biến `df`), nên câu lệnh ở cuối hàm BẮT BUỘC phải là gì?",
        "a": "Bắt buộc phải `return df, qa_records` (`L311`) để truyền DataFrame đã biến đổi về cho `main()`."
      }
    ],
    "commonMistakes": [
      "Gọi `df = df[mask]` bên trong hàm rồi nghĩ `df` ở bên ngoài hàm tự bị lọc theo (gán lại biến `df = ...` không ảnh hưởng biến cha!)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-123",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của `try / except / else / finally`.",
    "question": "Trong cấu trúc `try ... except ... else ... finally`, khối `else` và khối `finally` chạy trong điều kiện nào?",
    "quickAnswer": "Khối `else` CHỈ chạy khi khối `try` hoàn tất KHÔNG có bất kỳ ngoại lệ nào; khối `finally` LUÔN chạy bất kể có lỗi hay không (hoặc trước khi `return`).",
    "explanation": "Dùng `finally` để đảm bảo đóng kết nối/xóa tệp tạm dù có ngoại lệ bất ngờ.",
    "projectLink": "src/download.py:L35, L61",
    "codeLocation": "src/download.py:L35, L61",
    "proofExample": "src/download.py xóa tệp `.tmp` trong nhánh `except` và `403/404`.",
    "followUpQuestions": [
      "Tại sao `src/filter_data_from_sheet.py:L47-L55` đặt khối `try ... except pd.errors.ParserError:` riêng chỉ bọc quanh `pd.read_csv(...)` chứ không bọc cả `requests.get()`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/filter_data_from_sheet.py:L47-L55` đặt khối `try ... except pd.errors.ParserError:` riêng chỉ bọc quanh `pd.read_csv(...)` chứ không bọc cả `requests.get()`?",
        "a": "Để tách rõ lỗi mạng HTTP (do `requests` ném ra) với lỗi định dạng CSV trả về từ Google Sheets (do `ParserError` ném ra)."
      }
    ],
    "commonMistakes": [
      "Đặt code xử lý tiếp vào trong `try` khiến một lỗi phát sinh trong bước xử lý sau lại bị `except` ở trên bắt nhầm thành lỗi mạng!"
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-124",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Chuẩn hóa chuỗi vs Bất biến chuỗi khi nối chuỗi trong vòng lặp.",
    "question": "Vì sao nối chuỗi liên tục bằng `s += item` trong vòng lặp hàng nghìn lần kém hiệu quả hơn `\"\".join(list_of_strs)`?",
    "quickAnswer": "Vì chuỗi `str` là immutable; mỗi phép `+=` trên chuỗi dài có thể cấp phát lại vùng nhớ và sao chép toàn bộ chuỗi cũ từ đầu (O(N²)), trong khi `join()` tính tổng độ dài một lần rồi chép O(N).",
    "explanation": "Cú pháp `join()` vừa nhanh vừa sạch sẽ khi ghép danh sách review vào prompt.",
    "projectLink": "src/llm.py:L218",
    "codeLocation": "src/llm.py:L218",
    "proofExample": "src/llm.py:L218 dùng `chr(10).join(reviews_formatted)` ghép 5 review thành một batch prompt.",
    "followUpQuestions": [
      "`chr(10)` trong `src/llm.py:L218` tương đương ký tự nào?"
    ],
    "followUpQA": [
      {
        "q": "`chr(10)` trong `src/llm.py:L218` tương đương ký tự nào?",
        "a": "Tương đương ký tự xuống dòng `\"\\n\"` (mã ASCII 10) — dùng `chr(10)` tránh xung đột escape bên trong biểu thức f-string ở các phiên bản Python trước 3.12!"
      }
    ],
    "commonMistakes": [
      "Viết vòng `for` cộng chuỗi dài trong trình tạo prompt hoặc xuất CSV thủ công."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-125",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `int()`, `float()` và bẫy ép số chuỗi rỗng `\"\"`.",
    "question": "Khi chạy `int(\"\")` hoặc `int(\"3.14\")` trong Python thuần, điều gì xảy ra và hàm nào của pandas giải quyết an toàn trên cả cột?",
    "quickAnswer": "Python thuần ném ngay `ValueError: invalid literal for int() with base 10`; trong pandas dùng `pd.to_numeric(series, errors=\"coerce\")` biến cả `\"\"` lẫn chuỗi chữ thành `NaN`.",
    "explanation": "Lưu ý thêm: chuỗi `\"3.0\"` ép trực tiếp qua `int(\"3.0\")` sẽ lỗi, phải qua `float(\"3.0\")` hoặc `pd.to_numeric()` trước.",
    "projectLink": "src/qa.py:L186",
    "codeLocation": "src/qa.py:L186",
    "proofExample": "src/qa.py:L186 dùng `pd.to_numeric` cho cột `accommodates` trước khi kiểm tra và ép `Int64`.",
    "followUpQuestions": [
      "Trong `src/download.py:L38`, dòng `expected_size = int(resp.headers.get(\"Content-Length\", -1))` có thể lỗi ở tình huống cực hiếm nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/download.py:L38`, dòng `expected_size = int(resp.headers.get(\"Content-Length\", -1))` có thể lỗi ở tình huống cực hiếm nào?",
        "a": "Nếu server cấu hình sai trả về header `Content-Length` rỗng hoặc chuỗi không phải số nguyên (dù hầu hết server web chuẩn luôn trả số nguyên dương)."
      }
    ],
    "commonMistakes": [
      "Dùng `int(x)` trực tiếp trên giá trị chuỗi đọc từ CSV."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-126",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt View (Slicing NumPy) vs Copy (Fancy/Boolean Indexing).",
    "question": "Trong NumPy, phép cắt lát cơ bản `arr[1:5]` khác phép lọc `arr[arr > 0]` về quản lý bộ nhớ như thế nào?",
    "quickAnswer": "Basic slicing `arr[1:5]` trả về **View** dùng chung bộ nhớ với `arr` gốc (sửa view là sửa luôn `arr`!). Trái lại, Boolean Indexing hoặc Fancy Indexing `arr[[0, 2]]` luôn trả về một **Copy** mới độc lập.",
    "explanation": "Hiểu khác biệt này giải thích tại sao đôi khi sửa lát cắt trong NumPy lại biến đổi mảng ban đầu bất ngờ.",
    "projectLink": "Bài 3",
    "codeLocation": "Bài 3",
    "proofExample": "Bài 3 (Nền tảng NumPy).",
    "followUpQuestions": [
      "Làm thế nào kiểm tra nhanh 2 mảng NumPy `a` và `b` có đang dùng chung vùng nhớ không?"
    ],
    "followUpQA": [
      {
        "q": "Làm thế nào kiểm tra nhanh 2 mảng NumPy `a` và `b` có đang dùng chung vùng nhớ không?",
        "a": "Kiểm tra `np.shares_memory(a, b)` hoặc thuộc tính `b.base is a`."
      }
    ],
    "commonMistakes": [
      "Nhầm rằng `arr[1:5]` cũng là bản sao độc lập như slicing `list[1:5]` trong Python thuần!"
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-127",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của `dtype` trong tối ưu bộ nhớ dữ liệu lớn.",
    "question": "Sự chênh lệch dung lượng bộ nhớ giữa một cột 10 triệu phần tử dùng `float64` vs `float32` vs `uint8` là bao nhiêu?",
    "quickAnswer": "10 triệu phần tử `float64` (8 bytes) chiếm ~80 MB; `float32` (4 bytes) chiếm ~40 MB; cờ nhị phân hoặc số nhỏ `[0..30]` lưu `uint8` (1 byte) chỉ tốn ~10 MB (giảm 8 lần RAM)!",
    "explanation": "Chọn đúng kích thước kiểu số rất quan trọng khi xử lý file quy mô lớn nhiều triệu dòng.",
    "projectLink": "Bài 3",
    "codeLocation": "Bài 3",
    "proofExample": "Bài 3 & xử lý cờ nhị phân/số nguyên trong `qa.py`/`kpi.py`.",
    "followUpQuestions": [
      "Tại sao `src/qa.py` dùng `\"Int64\"` (64-bit) chứ không dùng `\"Int8\"` cho cột `availability_30_clean`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/qa.py` dùng `\"Int64\"` (64-bit) chứ không dùng `\"Int8\"` cho cột `availability_30_clean`?",
        "a": "Với mẫu đã lọc chỉ còn 1.000 dòng (~8KB/cột), sự khác biệt RAM không đáng kể; `\"Int64\"` đồng nhất với chuẩn nullable integer mặc định của pandas tránh tràn nếu dùng chung hàm cho `number_of_reviews`."
      }
    ],
    "commonMistakes": [
      "Lưu toàn bộ dữ liệu lớn dạng `object` (con trỏ tới từng PyObject, tốn >30 bytes mỗi ô + mất vector hóa)."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-128",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Ý nghĩa toán học và bẫy trục của `np.concatenate` vs `np.vstack`/`hstack`.",
    "question": "Trong `src/viz.py:L412`, lệnh `np.concatenate([rates_neg.to_numpy().ravel(), ref.to_numpy().ravel()])` nhằm mục đích gì?",
    "quickAnswer": "Duỗi phẳng (`ravel`) cả 2 ma trận `rates_neg` (12×7) và `ref` (`n>=5`×7) thành các mảng 1D rồi nối liền nhau trước khi lấy `np.nanmax()` chung cho thanh colorbar của hai heatmap.",
    "explanation": "Nếu lấy max trực tiếp trên từng ma trận riêng lẻ thì thang màu bên trái (0–10%) và bên phải (0–35%) sẽ không dùng chung một quy chuẩn!",
    "projectLink": "src/viz.py:L411-L413",
    "codeLocation": "src/viz.py:L411-L413",
    "proofExample": "src/viz.py:L411-L413 (`plot_llm_insights`).",
    "followUpQuestions": [
      "Điền thêm chuỗi `dtype=float` trong `.to_numpy(dtype=float)` giải quyết vấn đề gì?"
    ],
    "followUpQA": [
      {
        "q": "Điền thêm chuỗi `dtype=float` trong `.to_numpy(dtype=float)` giải quyết vấn đề gì?",
        "a": "Ép an toàn từ mảng `object` (nếu chứa `pd.NA` hay `None`) sang mảng số thực chuẩn `float64` (biến `pd.NA` thành `np.nan`) để hàm `np.isfinite()` không bị lỗi `TypeError`."
      }
    ],
    "commonMistakes": [
      "Không duỗi `.ravel()` hoặc không gộp chung mảng dẫn đến `rates_neg` và `rates_mix` tô sai lệch cường độ màu đỏ."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-129",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hàm `np.clip()` trong làm sạch dữ liệu và tác động lên phân phối.",
    "question": "Cơ chế của `np.clip(arr, a_min, a_max)` (Winsorization) là gì và vì sao BTL KHÔNG dùng `np.clip` cho cột `price_mxn`?",
    "quickAnswer": "`clip` ép mọi giá trị `< a_min` bằng đúng `a_min` và mọi giá trị `> a_max` bằng đúng `a_max`. BTL không dùng `clip` cho `price_mxn` vì làm vậy sẽ biến các căn treo giá 153.000 MXN thành 14.084 MXN (P99) một cách nhân tạo, bóp méo giá trị trung bình thật và làm biến dạng phân phối.",
    "explanation": "Thay vào đó, BTL giữ nguyên giá gốc và dùng thước đo **Median / IQR / rIQR** vốn tự động kháng nhiễu đuôi phải.",
    "projectLink": "Bài 10 & src/qa.py",
    "codeLocation": "Bài 10 & src/qa.py",
    "proofExample": "Bài 10 & `src/qa.py:L138-L155`.",
    "followUpQuestions": [
      "Trong tình huống nào `np.clip` hoặc `max(x, 1)` lại được dùng hợp lệ trong BTL?"
    ],
    "followUpQA": [
      {
        "q": "Trong tình huống nào `np.clip` hoặc `max(x, 1)` lại được dùng hợp lệ trong BTL?",
        "a": "Trong `src/kpi.py:L133` dùng `max(..., 1)` chống chia 0 cho số ngày; trong `src/llm.py:L288` dùng `min(60, ...)` giới hạn cooldown tối đa 60 giây; trong `src/viz.py:L413` dùng `min(100.0, max(10.0, ...))` giữ giới hạn thang hiển thị % trong `[10, 100]`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `clip` là cách làm sạch outlier chuẩn mực duy nhất không gây tác dụng phụ."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-130",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `df.loc[mask]` vs `df[mask]` khi chỉnh sửa dữ liệu.",
    "question": "Tại sao chọn hàng để sửa giá trị cột luôn viết `df.loc[mask, \"col\"] = val` thay vì viết `df[mask][\"col\"] = val`?",
    "quickAnswer": "`df.loc[mask, \"col\"] = val` thực hiện MỘT thao tác lập chỉ mục duy nhất trực tiếp trên `df` (hoạt động tin cậy ở mọi phiên bản pandas 1, 2, 3); còn `df[mask][\"col\"] = val` là Chained Assignment (2 bước `__getitem__` liên tiếp) sẽ không sửa được `df` ở pandas 3.0 Copy-on-Write.",
    "explanation": "Đây là quy tắc code review số 1 khi viết pandas hiện đại.",
    "projectLink": "Bài 4 & src/filter_data_from_sheet.py:L181",
    "codeLocation": "Bài 4 & src/filter_data_from_sheet.py:L181",
    "proofExample": "src/qa.py & `src/filter_data_from_sheet.py:L181` đều dùng `.loc[...]` 1 tầng hoặc gán toàn cột mới.",
    "followUpQuestions": [
      "Trong `df.loc[rows, cols]`, khi chỉ muốn ĐỌC dữ liệu (như `reviews.loc[reviews[\"id\"].isin(llm_ids)]` ở `filter_data_from_sheet.py:L224`) có cần `.copy()` nếu sau đó đem đi xuất CSV không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `df.loc[rows, cols]`, khi chỉ muốn ĐỌC dữ liệu (như `reviews.loc[reviews[\"id\"].isin(llm_ids)]` ở `filter_data_from_sheet.py:L224`) có cần `.copy()` nếu sau đó đem đi xuất CSV không?",
        "a": "Chỉ đọc rồi gọi `_save_frame(..., to_csv)` không biến đổi dữ liệu nên không bắt buộc, nhưng nếu định gắn thêm cột mới (như ở `L135`) thì gọi `.copy()` là thói quen an toàn nhất."
      }
    ],
    "commonMistakes": [
      "Viết `df[df[\"price\"] < 0][\"qa_missing_price\"] = True` khiến cột cờ không hề chuyển sang True!"
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-131",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lọc giữ tính đa hình với `Series.mask()` vs `Series.where()`.",
    "question": "Phân biệt chính xác điều kiện giữ/thay thế của `s.where(cond, other)` và `s.mask(cond, other)` trong pandas.",
    "quickAnswer": "`s.where(cond, other)`: GIỮ giá trị của `s` ở chỗ `cond == True`, thay bằng `other` ở chỗ `False` (\"where True, keep\"). `s.mask(cond, other)`: NGƯỢC LẠI — che/thay thế bằng `other` ở chỗ `cond == True` (\"mask out where True\").",
    "explanation": "Nhầm lẫn hai hàm này sẽ làm đảo ngược toàn bộ logic lọc sạch và gán cờ!",
    "projectLink": "src/qa.py:L256; src/kpi.py:L172",
    "codeLocation": "src/qa.py:L256; src/kpi.py:L172",
    "proofExample": "src/qa.py:L256 dùng `.where(~missing_reviews_mask, np.nan)` (giữ nơi KHÔNG thiếu); `src/kpi.py:L172` dùng `series.mask(valid_eval & is_ghost, 1)` (gán 1 nơi thỏa điều kiện).",
    "followUpQuestions": [
      "Nếu không truyền tham số `other` trong `s.where(cond)`, giá trị mặc định điền vào những ô bị thay là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu không truyền tham số `other` trong `s.where(cond)`, giá trị mặc định điền vào những ô bị thay là gì?",
        "a": "Mặc định `other=np.nan` (ví dụ `lr_parsed.where(valid_lr_mask)` trong `src/qa.py:L290`)."
      }
    ],
    "commonMistakes": [
      "Truyền nhầm điều kiện `missing_mask` trực tiếp không có dấu `~` vào `.where(missing_mask, np.nan)` làm xóa hết dữ liệu SẠCH và giữ lại dữ liệu BẨN!"
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-132",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Sự khác nhau giữa `.str.contains(na=False)` với mặc định `na=nan`.",
    "question": "Khi lọc chuỗi bằng `df[\"comments\"].str.contains(\"wifi\")`, vì sao cần truyền thêm tham số `na=False` nếu `comments` có thể rỗng?",
    "quickAnswer": "Nếu `comments` chứa `NaN`, `str.contains()` trả về `NaN` tại hàng đó thay vì `False`, làm `df[df[\"comments\"].str.contains(...)]` văng `ValueError`!",
    "explanation": "Tương tự `str.fullmatch(..., na=False)` đặt `na=False` để đảm bảo đầu ra luôn là `bool` thuần 2 giá trị.",
    "projectLink": "src/evaluate.py:L183",
    "codeLocation": "src/evaluate.py:L183",
    "proofExample": "src/evaluate.py:L183 viết `~llm[\"language\"].str.fullmatch(r\"[a-z]{2}|und\", na=False)` -> nếu `language` là `NaN`, `fullmatch` trả `False`, phủ định `~` thành `True` (bắt lỗi!).",
    "followUpQuestions": [
      "Trong `src/evaluate.py:L183`, biểu thức chính quy `r\"[a-z]{2}|und\"` khớp được chuỗi 3 ký tự `\"under\"` hay `\"usa\"` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py:L183`, biểu thức chính quy `r\"[a-z]{2}|und\"` khớp được chuỗi 3 ký tự `\"under\"` hay `\"usa\"` không?",
        "a": "KHÔNG, vì dùng hàm `.fullmatch()` (bắt buộc toàn chuỗi khớp từ đầu đến cuối), khác với `.contains()` chỉ tìm chuỗi con ở bên trong!"
      }
    ],
    "commonMistakes": [
      "Quên `na=False` khiến lệnh lọc crash hễ bảng có một dòng review `NaN`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-133",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do truyền `case=False` và `na=False` khi phân tích văn bản đa ngôn ngữ.",
    "question": "Trong `src/evaluate.py:L193`, hàm `hau_kiem()` viết `van_ban.str.contains(mau, case=False, regex=True)`. Tại sao ở đây KHÔNG lo `na=False`?",
    "quickAnswer": "Vì ngay ở dòng 176 ở đầu hàm, `van_ban = llm[\"comments\"].fillna(\"\")` đã ép toàn bộ `NaN` thành chuỗi rỗng `\"\"` sạch sẽ trước đó rồi!",
    "explanation": "Kết hợp truyền `case=False` giúp từ khóa khớp cả `\"WIFI\"`, `\"Wifi\"` lẫn `\"wifi\"`.",
    "projectLink": "src/evaluate.py:L176, L193",
    "codeLocation": "src/evaluate.py:L176, L193",
    "proofExample": "src/evaluate.py:L176, L193",
    "followUpQuestions": [
      "Nếu một review dài 0 từ (chuỗi rỗng `\"\"`), `\"\".split()` trả về list gì và `so_tu` bằng mấy?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một review dài 0 từ (chuỗi rỗng `\"\"`), `\"\".split()` trả về list gì và `so_tu` bằng mấy?",
        "a": "`\"\".split()` trả về `[]`, nên `.str.len()` bằng `0` (cẩn thận với `\"\".split(\" \")` lại trả `[\"\"]` độ dài `1` — nên không truyền đối số vào `.split()` là chuẩn nhất!)."
      }
    ],
    "commonMistakes": [
      "Quên `.fillna(\"\")` khi tính `.str.split().str.len()` ở dòng 177 làm `so_tu` mang giá trị `NaN`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-134",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Sử dụng `astype(float)` trên `Int64` chứa `<NA>` trước phép toán Matplotlib/NumPy.",
    "question": "Tại sao `src/kpi.py:L202` và `src/viz.py:L42` chuyển cột kiểu nullable `Int64` sang `float64` / `float` trước khi chia hoặc đưa vào Seaborn?",
    "quickAnswer": "Vì một số phiên bản NumPy/Seaborn cũ hoặc phép tính ma trận đồ họa không xử lý trực tiếp `pd.NA` của kiểu mở rộng `Int64Dtype` (gây lỗi ép mảng object). Đưa về `float64` chuẩn đổi `<NA>` thành `np.nan` tương thích 100% với toàn bộ hệ sinh thái khoa học dữ liệu.",
    "explanation": "Nói cách khác: dùng `Int64` để lưu trữ cột nguyên sạch trong CSV/bảng, và ép `float64` khi đưa vào phép chia liên tục hay vẽ heatmap.",
    "projectLink": "src/kpi.py:L202; src/viz.py:L42",
    "codeLocation": "src/kpi.py:L202; src/viz.py:L42",
    "proofExample": "src/kpi.py:L202: `a31_90.astype(\"float64\")` và `src/viz.py:L42`: `.astype(float)`.",
    "followUpQuestions": [
      "Khi chuyển một `Series` kiểu `Int64` chứa `[10, pd.NA]` bằng `.astype(\"float64\")`, giá trị nhận được là gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi chuyển một `Series` kiểu `Int64` chứa `[10, pd.NA]` bằng `.astype(\"float64\")`, giá trị nhận được là gì?",
        "a": "Series kiểu `float64` chứa `[10.0, np.nan]`."
      }
    ],
    "commonMistakes": [
      "Đưa thẳng mảng chứa `pd.NA` vào `sns.heatmap` khiến `to_numpy()` sinh mảng `dtype=object` gây `TypeError`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-135",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `.dropna(subset=[...])` và `.dropna()` mặc định.",
    "question": "So sánh tác động của `df.dropna()` vs `rev_merged.dropna(subset=[\"review_id\", \"listing_id\"])` (`src/kpi.py:L409`).",
    "quickAnswer": "`df.dropna()` không tham số xóa dòng hễ BẤT KỲ cột nào trong 70 cột bị thiếu; còn `subset=[\"review_id\", \"listing_id\"]` CHỈ xóa dòng bị thiếu đúng 2 cột khóa cần thiết cho phép `merge`, bảo vệ hoàn toàn các dòng thiếu cột khác (như cột `reviewer_name`).",
    "explanation": "Hạn chế phạm vi `dropna` bằng `subset=` vừa giữ sạch khóa vừa chống mất dữ liệu oan.",
    "projectLink": "src/kpi.py:L409",
    "codeLocation": "src/kpi.py:L409",
    "proofExample": "src/kpi.py:L409 lọc khóa null ngay trước khi merge.",
    "followUpQuestions": [
      "Tham số `how=\"all\"` khác `how=\"any\"` (mặc định) trong `dropna()` như thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Tham số `how=\"all\"` khác `how=\"any\"` (mặc định) trong `dropna()` như thế nào?",
        "a": "`how=\"any\"` xóa khi ít nhất 1 cột trong `subset` bị thiếu; `how=\"all\"` chỉ xóa khi TẤT CẢ các cột trong `subset` cùng bị thiếu."
      }
    ],
    "commonMistakes": [
      "Viết `rev_merged.dropna()` khiến toàn bộ review bị thiếu bình luận phụ hay khía cạnh đều bị vứt bỏ trước bước merge."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-136",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cơ chế `crosstabs` và kiểm tra cân bằng/phân bố dữ liệu.",
    "question": "Hàm `pd.crosstab()` dùng để làm gì trong đánh giá phân loại và kiểm tra tập nhãn?",
    "quickAnswer": "Tạo bảng tần suất chéo (contingency table / confusion matrix) đếm số lần xuất hiện giữa hai biến phân loại — ví dụ đếm chéo nhãn thật (`gt[\"overall_sentiment\"]`) theo hàng và nhãn LLM dự đoán theo cột để thấy rõ từng cặp nhầm lẫn `mixed` ↔ `negative`.",
    "explanation": "Kết hợp trực quan tốt với điểm số F1 từng lớp.",
    "projectLink": "src/evaluate.py & Bài 4/11",
    "codeLocation": "src/evaluate.py & Bài 4/11",
    "proofExample": "Ma trận phân bố nhãn `ground_truth` (73 pos, 25 mix, 2 neg) vs dự đoán của LLM & Baseline.",
    "followUpQuestions": [
      "Có thể chuẩn hóa `pd.crosstab(..., normalize=\"index\")` để đọc trực tiếp tỷ lệ Recall của từng lớp không?"
    ],
    "followUpQA": [
      {
        "q": "Có thể chuẩn hóa `pd.crosstab(..., normalize=\"index\")` để đọc trực tiếp tỷ lệ Recall của từng lớp không?",
        "a": "Có! `normalize=\"index\"` chia mỗi ô cho tổng hàng (tổng nhãn thật của từng lớp), đường chéo chính lúc đó chính là **Recall** của từng lớp!"
      }
    ],
    "commonMistakes": [
      "Chỉ xem bảng điểm F1 mà không bao giờ lập bảng chéo Confusion Matrix xem hai lớp nào hay bị đoán lẫn vào nhau."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-137",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa ký hiệu đường dẫn `.` , `..` và tệp `.gitkeep`.",
    "question": "Tại sao trong các thư mục rỗng của repo BTL như `data/raw/2026-06-15/.gitkeep` hay `figures/.gitkeep` lại có tệp 0 byte tên `.gitkeep`?",
    "quickAnswer": "Git theo mặc định CHỈ quản lý file, KHÔNG theo dõi thư mục hoàn toàn trống. Thêm tệp `.gitkeep` (kèm quy tắc loại trừ `*.csv.gz` trong `.gitignore`) giúp Git giữ nguyên sẵn cấu trúc cây thư mục cho người tải repo về.",
    "explanation": "Đây là quy chuẩn gọn gàng của các repo khoa học dữ liệu chuyên nghiệp.",
    "projectLink": ".gitignore & repo layout",
    "codeLocation": ".gitignore & repo layout",
    "proofExample": "Cây thư mục repo BTL Nhóm 4: `.gitkeep` nằm trong `data/raw/*`, `data/processed/*`, `figures/`, `reports/`.",
    "followUpQuestions": [
      "Trong `.gitignore` muốn bỏ qua toàn bộ `.csv.gz` bên trong `data/raw/` NHƯNG vẫn giữ lại `.gitkeep`, viết quy tắc thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `.gitignore` muốn bỏ qua toàn bộ `.csv.gz` bên trong `data/raw/` NHƯNG vẫn giữ lại `.gitkeep`, viết quy tắc thế nào?",
        "a": "Bỏ qua `data/raw/*.csv.gz` hoặc dùng `data/raw/**/*.csv.gz` (hoặc `data/raw/*` kèm ngoại lệ `!data/raw/**/.gitkeep`)."
      }
    ],
    "commonMistakes": [
      "Tưởng `.gitkeep` là file cấu hình đặc biệt của Git (thực ra đó chỉ là quy ước tên file bình thường để thư mục không trống)."
    ],
    "relatedFiles": [
      ".gitignore"
    ]
  },
  {
    "id": "vt-138",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "So sánh Retry cố định vs Exponential Backoff + Jitter.",
    "question": "Tại sao hệ thống phân tán lớn thường cộng thêm một chút ngẫu nhiên (**Jitter**) vào công thức Exponential Backoff `2**attempt`?",
    "quickAnswer": "Nếu hàng nghìn client cùng bị rớt mạng một lúc và tất cả cùng ngủ chính xác `1s, 2s, 4s`, chúng sẽ tiếp tục đồng loạt dội request đánh sập lại server ngay tại giây thứ 2 (**Thundering Herd Problem**). Cộng thêm nhiễu ngẫu nhiên nhỏ (Jitter) giúp phân tán đều lượng thử lại theo thời gian.",
    "explanation": "Với bài toán 1 máy chạy tuần tự như `download.py`, `2**attempt` thuần là đủ và rất gọn.",
    "projectLink": "src/download.py:L63",
    "codeLocation": "src/download.py:L63",
    "proofExample": "src/download.py:L63 & Bài 6.",
    "followUpQuestions": [
      "Tại sao trong `download.py`, kiểm tra `if attempt < max_attempts - 1: time.sleep(...)` lại trừ đi 1?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao trong `download.py`, kiểm tra `if attempt < max_attempts - 1: time.sleep(...)` lại trừ đi 1?",
        "a": "Vì ở lần thử cuối cùng (`attempt == max_attempts - 1`) nếu vẫn thất bại thì sẽ thoát hàm trả `False` ngay — ngủ thêm nữa không có ý nghĩa vì không còn lần thử sau!"
      }
    ],
    "commonMistakes": [
      "Thử lại ngay lập tức không `sleep` trong vòng `while True` làm kẹt CPU và bị server khóa IP (rate ban)."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-139",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích của Pushdown Filter & Column Pruning trong DuckDB trên dữ liệu lớn.",
    "question": "Khi chạy câu SQL `SELECT listing_id, COUNT(*) FROM read_csv_auto(\"calendar.csv.gz\") WHERE available = 'f' GROUP BY listing_id` trên DuckDB, vì sao nó chạy nhanh và ít tốn RAM hơn `pd.read_csv(\"calendar.csv.gz\")` mặc định?",
    "quickAnswer": "1. **Column Pruning:** Chỉ giữ 2 cột cần thiết (`listing_id`, `available`), bỏ qua hoàn toàn cột `price`, `date` ngay khi đọc.\n2. **Filter Pushdown / Streaming:** Đếm tổng hợp trực tiếp trong thanh ghi C++ theo luồng, không cần giữ toàn bộ hàng chục triệu dòng thô trong RAM như `pd.read_csv()` không tham số.",
    "explanation": "Tương tự trong pandas, có thể dùng `usecols=[\"id\"]` (như `src/evaluate.py:L223`) để chỉ đọc 1 cột tiết kiệm RAM.",
    "projectLink": "src/evaluate.py:L223 & Bài 6",
    "codeLocation": "src/evaluate.py:L223 & Bài 6",
    "proofExample": "src/evaluate.py:L223 dùng `pd.read_csv(raw_path, usecols=[\"id\"], dtype={\"id\": \"string\"})` đếm 1.719.730 review mốc t4 cực nhẹ!",
    "followUpQuestions": [
      "Dùng `df[\"id\"].dropna().nunique()` vs `len(df)` ở `src/evaluate.py:L223` có ý nghĩa bảo vệ gì?"
    ],
    "followUpQA": [
      {
        "q": "Dùng `df[\"id\"].dropna().nunique()` vs `len(df)` ở `src/evaluate.py:L223` có ý nghĩa bảo vệ gì?",
        "a": "Bảo đảm không đếm trùng review hoặc đếm nhầm các dòng bị rỗng `id` khi ước lượng quy mô toàn thành phố t4 (`1.719.730` review duy nhất)."
      }
    ],
    "commonMistakes": [
      "Đọc đủ tất cả 70 cột của `listings.csv.gz` hay `reviews.csv.gz` chỉ để đếm số lượng 1 cột `id`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-140",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Ý nghĩa của việc sắp xếp danh sách `snapshots` bằng `key=pd.to_datetime` thay vì sort chuỗi chữ cái.",
    "question": "Ngày chuẩn ISO `YYYY-MM-DD` sắp xếp chữ cái đã đúng, vậy tại sao `src/qa.py`, `src/kpi.py`, `src/llm.py` vẫn truyền `key=pd.to_datetime` vào `sorted(snapshots)`?",
    "quickAnswer": "Để bảo vệ code tổng quát (Defense in depth): nếu cấu hình YAML của một thành phố/nhóm khác ghi ngày dạng `\"2026-6-5\"` (thiếu số 0 đệm) hoặc `\"15-06-2026\"`, sort chữ cái sẽ xếp sai thứ tự thời gian, còn `key=pd.to_datetime` luôn sắp xếp chuẩn theo thời gian thực!",
    "explanation": "Ngoài ra chuỗi `sorted(snapshots)` trả đúng thứ tự tăng dần để `snapshots[i+1] - snapshots[i]` luôn dương.",
    "projectLink": "src/kpi.py:L93",
    "codeLocation": "src/kpi.py:L93",
    "proofExample": "src/qa.py:L327; src/kpi.py:L93; src/llm.py:L65; src/filter_data_from_sheet.py:L166.",
    "followUpQuestions": [
      "Nếu thứ tự 4 snapshot trong YAML bị gõ đảo ngược (`t4, t3, t2, t1`) và code KHÔNG sort lại theo thời gian, bước nào bị hỏng nặng nề nhất?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thứ tự 4 snapshot trong YAML bị gõ đảo ngược (`t4, t3, t2, t1`) và code KHÔNG sort lại theo thời gian, bước nào bị hỏng nặng nề nhất?",
        "a": "`compute_review_velocities()` sẽ trừ `nr(t1) - nr(t4)` thành số âm (`diff < 0` -> toàn bộ `RV` thành `NaN`), kéo theo `ghost` và `occupancy` ở t2..t4 sụp đổ thành `<NA>` hết!"
      }
    ],
    "commonMistakes": [
      "Giả định YAML luôn liệt kê các mốc snapshot sẵn theo thứ tự thời gian từ nhỏ đến lớn."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-141",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt In-context Learning (Zero-shot / Few-shot) và Fine-tuning.",
    "question": "Cách dùng Gemini API trong `src/llm.py` thuộc phương pháp nào: Zero-shot, Few-shot hay Fine-tuning? Vì sao chọn cách đó?",
    "quickAnswer": "Là **Zero-shot (kèm hướng dẫn quy tắc định nghĩa nhãn chi tiết)** + Structured Outputs — không tốn dữ liệu huấn luyện lớn hay hạ tầng train/deploy GPU như Fine-tuning, chỉ cần 1 tệp YAML và script Python gọn nhẹ với chi phí $0.203 cho 1.000 mẫu mà đạt 99% Accuracy.",
    "explanation": "Nếu muốn giảm 21 lỗi `thieu` trên `amenities`, có thể nâng nhẹ lên Few-shot (thêm 2–3 ví dụ mẫu vào prompt).",
    "projectLink": "src/llm.py:L207-L219",
    "codeLocation": "src/llm.py:L207-L219",
    "proofExample": "src/llm.py:L207-L219 (`build_batch_prompt`).",
    "followUpQuestions": [
      "Ưu điểm của việc KHÔNG fine-tune theo 100 mẫu `ground_truth.csv` của chính nhóm là gì?"
    ],
    "followUpQA": [
      {
        "q": "Ưu điểm của việc KHÔNG fine-tune theo 100 mẫu `ground_truth.csv` của chính nhóm là gì?",
        "a": "Giữ được 100 mẫu nhãn tay làm **tập kiểm thử độc lập hoàn toàn (Unseen Test Set)** không bị rò rỉ dữ liệu!"
      }
    ],
    "commonMistakes": [
      "Gọi nhầm việc dùng prompt phân loại là \"huấn luyện mô hình LLM\" (lưu ý LLM không học lại trọng số qua prompt API)."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-142",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Độ phức tạp Token và lý do tối giản Output Schema.",
    "question": "Tại sao cùng 1 lượng thông tin, khi thiết kế schema JSON của `src/llm.py`, nhóm chủ ý KHÔNG thêm trường `summary` hay `reasoning` (giải thích lý do)?",
    "quickAnswer": "Vì đơn giá Output Token trên `gemini-3.5-flash-lite` là `$2.50 / 1M`, đắt gấp **8.33 lần** Input Token (`$0.30 / 1M`)! Thêm một câu giải thích ~80 output tokens cho mỗi review sẽ làm tổng chi phí mở rộng toàn CDMX nhảy từ $349 lên hơn $700 mà không phục vụ trực tiếp việc tính KPI bảng `reviews_sentiment.csv`.",
    "explanation": "Tương tự, `save_to_cache` cũng không lưu timestamp/metadata dư thừa.",
    "projectLink": "src/llm.py:L117; src/evaluate.py:L199",
    "codeLocation": "src/llm.py:L117; src/evaluate.py:L199",
    "proofExample": "src/llm.py:L117 (docstring: \"không lưu summary/timestamp để tối ưu\") & `evaluate.py:L199`.",
    "followUpQuestions": [
      "Trong trường hợp muốn mô hình suy nghĩ kỹ hơn (Chain-of-Thought) trên ca khó nhưng vẫn tiết kiệm cache, kỹ thuật nào hỗ trợ?"
    ],
    "followUpQA": [
      {
        "q": "Trong trường hợp muốn mô hình suy nghĩ kỹ hơn (Chain-of-Thought) trên ca khó nhưng vẫn tiết kiệm cache, kỹ thuật nào hỗ trợ?",
        "a": "Dùng `thinking_budget` (nếu model hỗ trợ) cho bước inference hoặc chỉ chạy suy luận chi tiết cho 20% các ca nghi ngờ qua `hau_kiem()`."
      }
    ],
    "commonMistakes": [
      "Bắt mô hình sinh thêm trường `explanation` dài dòng khi xử lý hàng loạt gây chậm gấp đôi và tăng vọt tiền API."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-143",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Evaluation"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt Test Set (`ground_truth.csv`) vs Tập suy luận (`reviews_llm.csv`).",
    "question": "Mối quan hệ về kích thước và tập hợp ID giữa `reviews.csv` (5.000), `reviews_llm.csv` (1.000) và `ground_truth.csv` (100) là gì?",
    "quickAnswer": "`reviews.csv` là 5.000 review được giao từ Google Sheets; `reviews_llm.csv` là tập con **1.000** review có cờ `Mẫu LLM = x`; và 100 review gắn nhãn tay (`reviews_labeled.csv` -> `ground_truth.csv`) là tập con nằm TRONG tập 1.000 LLM đó dùng để chấm đối chứng khách quan hai phương pháp LLM vs Regex Baseline.",
    "explanation": "Cả LLM và Baseline cùng dự đoán cả 1.000 câu, rồi trích giao đúng 100 câu có `ground_truth` để chấm 9 chỉ số.",
    "projectLink": "src/filter_data_from_sheet.py:L224-L227",
    "codeLocation": "src/filter_data_from_sheet.py:L224-L227",
    "proofExample": "src/filter_data_from_sheet.py:L181-L192; `src/evaluate.py:L255-L270`.",
    "followUpQuestions": [
      "Làm sao người gán nhãn tay trong `ground_truth.csv` bảo đảm khách quan không bị thiên kiến bởi kết quả LLM?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao người gán nhãn tay trong `ground_truth.csv` bảo đảm khách quan không bị thiên kiến bởi kết quả LLM?",
        "a": "Con người phải tự đọc bình luận gốc `reviews_labeled.csv` và gán nhãn ĐỘC LẬP trước khi đối chiếu với kết quả do `src/llm.py` xuất ra."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng 100 mẫu nhãn tay là 100 review khác biệt hoàn toàn không nằm trong 1.000 review LLM (nếu không giao nhau thì `evaluate.py` chỉ còn 0 câu đối chiếu!)."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-144",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do tách biệt giá trị niêm yết `Price` vs giá chia sức chứa `PPG` theo loại phòng.",
    "question": "Quan sát biểu đồ `kpi_ppg_riqr_2026-06-15.png`: giá trị PPG của `Entire home/apt` và `Private room` khác biệt thế nào và tại sao có hiện tượng đó?",
    "quickAnswer": "Xét trên tổng giá đêm `Price`, căn hộ nguyên căn (`Entire home/apt`) luôn đắt hơn phòng riêng (`Private room`). Tuy nhiên sau khi chia cho `accommodates`, một phần căn hộ nguyên căn cho nhóm 4–8 người có `PPG` hợp lý tiệm cận thậm chí ngang bằng hoặc thấp hơn một số phòng riêng cao cấp dành cho 1–2 khách ở khu trung tâm.",
    "explanation": "Ngoài ra ở cấp quận, nhờ tính `PPG` mới lật tẩy được ảo giác nhà vườn giá cao ở Xochimilco.",
    "projectLink": "figures/kpi_ppg_riqr_2026-06-15.png",
    "codeLocation": "figures/kpi_ppg_riqr_2026-06-15.png",
    "proofExample": "figures/kpi_ppg_riqr_2026-06-15.png & `src/viz.py:L115-L128`.",
    "followUpQuestions": [
      "Vì sao biểu đồ hộp `kpi_ppg_riqr` đặt 2 hộp `Entire home/apt` và `Private room` cạnh nhau (`dodge=True`) trong từng khu vực A01–A08?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao biểu đồ hộp `kpi_ppg_riqr` đặt 2 hộp `Entire home/apt` và `Private room` cạnh nhau (`dodge=True`) trong từng khu vực A01–A08?",
        "a": "Để kiểm tra xem mức tăng PPG của một khu vực có phải chỉ do khu đó nhiều căn hộ nguyên căn hay cả hai loại phòng đều đắt (kiểm soát yếu tố gây nhiễu `room_type`)."
      }
    ],
    "commonMistakes": [
      "Khẳng định nhà nguyên căn luôn có PPG cao gấp nhiều lần phòng riêng."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_riqr_2026-06-15.png"
    ]
  },
  {
    "id": "vt-145",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "theory",
    "topics": [
      "Visualization"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lựa chọn dạng biểu đồ: Bar ngang vs Bar đứng, Boxplot vs Violin, Heatmap vs Line.",
    "question": "Giải thích lý do chọn đúng 4 dạng biểu đồ chủ đạo trong `src/viz.py`: Bar ngang (Horizontal Bar), Boxplot log, Heatmap và Choropleth.",
    "quickAnswer": "1. **Bar ngang** dùng khi nhãn trục (15 tên quận tiếng Tây Ban Nha dài như `Cuajimalpa de Morelos`, 9 tên chỉ số đánh giá) cần viết ngang dễ đọc không bị xoay chéo mất chữ;\n2. **Boxplot (log)** hiển thị đủ Median, Q1–Q3, và các điểm outlier thực tế trên phân phối lệch phải;\n3. **Heatmap** nén gọn bảng 2 chiều `8 khu × 4 mốc` hoặc `12 quận × 7 khía cạnh` kèm màu và số cỡ mẫu;\n4. **Choropleth** thể hiện tức thì cụm nóng không gian trên bản đồ thực CDMX.",
    "explanation": "Mỗi dạng biểu đồ gắn đúng đặc điểm loại biến (Categorical × Continuous) theo Bài 12–13.",
    "projectLink": "src/viz.py",
    "codeLocation": "src/viz.py",
    "proofExample": "src/viz.py:L108-L465.",
    "followUpQuestions": [
      "Tại sao trên biểu đồ đường xu hướng giá (`KpiQaPage`), mốc `t2` bị bỏ trống không nối thẳng đường từ `t1` sang `t3` (`connectNulls={false}`)?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao trên biểu đồ đường xu hướng giá (`KpiQaPage`), mốc `t2` bị bỏ trống không nối thẳng đường từ `t1` sang `t3` (`connectNulls={false}`)?",
        "a": "Để không ngụy tạo đường nối thẳng tuyến tính đánh lừa người xem rằng giá ở mùa đông tháng 12/2025 tăng đều giữa t1 và t3 (vì hoàn toàn không có dữ liệu quan sát tại t2!)."
      }
    ],
    "commonMistakes": [
      "Dùng biểu đồ tròn (Pie chart) cho 15 quận hay Bar đứng khiến tên quận dài chồng lên nhau."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-146",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Tại sao phân tích khách quan phải trình bày cả điểm mạnh lẫn điểm yếu của mô hình và dữ liệu?",
    "question": "Nếu khi bảo vệ trước hội đồng/SECTUR CDMX, sinh viên chỉ nêu mặt tốt (\"LLM đạt 99%, giá tăng 67%, Ghost rate < 1%\") mà giấu hết hạn chế, giảng viên đánh giá thế nào?",
    "quickAnswer": "Sẽ bị trừ nặng ở Rubric phản biện vì thiếu tư duy khoa học dữ liệu: mọi dữ liệu quan sát đều có thiên lệch và giới hạn (Sample 3.2%, thiếu t2, Availability ≠ Booking, Ground Truth n=100 lệch ngôn ngữ Anh). Biết tự chỉ ra giới hạn trước khi bị hỏi gài chứng tỏ sự làm chủ phương pháp.",
    "explanation": "Mọi slide và báo cáo tốt đều dành hẳn chương giới hạn riêng minh bạch.",
    "projectLink": "reports/report.pdf",
    "codeLocation": "reports/report.pdf",
    "proofExample": "reports/report.pdf Chương 6 & Story 1–5 `limitations`.",
    "followUpQuestions": [
      "Nếu phải tóm tắt 3 khuyến nghị thiết thực nhất cho SECTUR CDMX rút ra từ dự án trong 30 giây, bạn nói gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu phải tóm tắt 3 khuyến nghị thiết thực nhất cho SECTUR CDMX rút ra từ dự án trong 30 giây, bạn nói gì?",
        "a": "1. Chuyển công cụ giám sát giá sang **Median PPG + rIQR** (ưu tiên vùng lõi Cuauhtémoc/Miguel Hidalgo và vùng ven sân Tlalpan) thay cho giá trung bình; 2. Theo dõi sớm áp lực lưu trú từ kỳ lễ nội địa **Semana Santa** chứ không đợi sát World Cup; 3. Ban hành chuẩn tối thiểu tiện nghi (nước nóng, Wi-Fi, cách âm) vì đó là 2 điểm trừ lớn nhất (14.8% & 8.1% ở Cuauhtémoc)."
      }
    ],
    "commonMistakes": [
      "Bảo vệ mù quáng mọi kết quả của nhóm như chân lý tuyệt đối không sai số."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vt-147",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Thứ tự ưu tiên các nguồn đọc config trong toàn dự án.",
    "question": "Nếu đồng thời truyền `--config custom.yaml`, đặt biến môi trường `PIPELINE_CONFIG=env.yaml`, và có sẵn `configs/mexico-city.yaml`, các script trong `src/` sẽ ưu tiên đọc tệp nào?",
    "quickAnswer": "Thứ tự ưu tiên thống nhất ở mọi file là: **(1) Tham số CLI `--config` -> (2) Biến môi trường `PIPELINE_CONFIG` -> (3) Mặc định `configs/mexico-city.yaml`**.",
    "explanation": "Nhờ `run_pipeline.py` đặt cả `PIPELINE_CONFIG` trong env và truyền tường minh `--config` cho 8 tiến trình con, toàn bộ pipeline dùng chung đúng 1 file cấu hình.",
    "projectLink": "src/download.py:L91",
    "codeLocation": "src/download.py:L91",
    "proofExample": "src/download.py:L91; `src/qa.py:L24`; `src/kpi.py:L50`; `src/viz.py:L476`.",
    "followUpQuestions": [
      "Trong `download.py`, vì sao ngoài `--config` lại có thêm positional argument `config_pos` (`nargs=\"?\"`)?"
    ],
    "followUpQA": [
      {
        "q": "Trong `download.py`, vì sao ngoài `--config` lại có thêm positional argument `config_pos` (`nargs=\"?\"`)?",
        "a": "Để hỗ trợ linh hoạt cả hai cách gọi của người dùng: `python src/download.py --config configs/mexico-city.yaml` lẫn `python src/download.py configs/mexico-city.yaml`."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `PIPELINE_CONFIG` ghi đè cờ dòng lệnh `--config` của người dùng."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-148",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích của `yaml.safe_load()` so với `yaml.load()`.",
    "question": "Tại sao mọi file trong `src/` đều gọi `yaml.safe_load()` thay vì `yaml.load()` khi đọc `configs/mexico-city.yaml`?",
    "quickAnswer": "`yaml.load()` mặc định (trong các bản PyYAML cũ) có thể khởi tạo bất kỳ lớp/đối tượng Python tùy ý ẩn trong YAML, tạo ra lỗ hổng thực thi mã từ xa (Arbitrary Code Execution). `yaml.safe_load()` chỉ parse các kiểu dữ liệu cơ bản (`dict`, `list`, `str`, `int`, `float`, `bool`, `None`) rất an toàn.",
    "explanation": "Đây là quy tắc bảo mật chuẩn khi đọc mọi cấu hình YAML trong Python.",
    "projectLink": "src/kpi.py:L57",
    "codeLocation": "src/kpi.py:L57",
    "proofExample": "Xuất hiện đồng bộ ở `download.py`, `filter_data_from_sheet.py`, `qa.py`, `llm.py`, `baseline.py`, `evaluate.py`, `kpi.py`, `viz.py`.",
    "followUpQuestions": [
      "Khi một file YAML rỗng (0 dòng), `yaml.safe_load()` trả về kiểu gì và dòng nào trong `filter_data_from_sheet.py:L163` chặn nó?"
    ],
    "followUpQA": [
      {
        "q": "Khi một file YAML rỗng (0 dòng), `yaml.safe_load()` trả về kiểu gì và dòng nào trong `filter_data_from_sheet.py:L163` chặn nó?",
        "a": "`yaml.safe_load()` trả về `None`; dòng `L163` kiểm tra `if not isinstance(config, dict): raise ValueError(...)`."
      }
    ],
    "commonMistakes": [
      "Viết `yaml.load(f)` thiếu `Loader` gây `TypeError` trên PyYAML 6+ hoặc lỗ hổng bảo mật."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-149",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `re.search()`, `re.match()`, `re.fullmatch()` và `re.findall()`.",
    "question": "Trong thư viện chuẩn `re`, phân biệt 4 hàm `match()`, `fullmatch()`, `search()` và `findall()` khi áp dụng lên văn bản review.",
    "quickAnswer": "`match()` chỉ kiểm tra khớp từ **đầu chuỗi**; `fullmatch()` bắt buộc **toàn bộ chuỗi** khớp từ đầu tới cuối; `search()` tìm **lần xuất hiện đầu tiên bất kỳ đâu** trong chuỗi; `findall()` trả về **danh sách tất cả** các lần khớp không chồng lấn.",
    "explanation": "Dùng nhầm `match()` thay cho `search()` sẽ bỏ sót toàn bộ từ khóa nằm ở giữa hoặc cuối câu review!",
    "projectLink": "src/baseline.py:L94-L100",
    "codeLocation": "src/baseline.py:L94-L100",
    "proofExample": "src/baseline.py:L94 (`NEG_RE.findall` để đếm số lần chê), `L100` (`pat.search(clause)` kiểm tra có nhắc khía cạnh); `src/evaluate.py:L183` (`fullmatch` mã ISO).",
    "followUpQuestions": [
      "Khi `NEG_RE` có chứa nhóm ngoặc đơn `(...)` chứ không phải `(?:...)`, hàm `NEG_RE.findall()` trả về gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi `NEG_RE` có chứa nhóm ngoặc đơn `(...)` chứ không phải `(?:...)`, hàm `NEG_RE.findall()` trả về gì?",
        "a": "Sẽ chỉ trả về nội dung trong nhóm bắt giữ `(...)` (hoặc list các tuple) thay vì toàn chuỗi khớp — may mắn là `src/baseline.py` đều viết chuẩn `(?:...)` nên `findall()` trả về đúng danh sách chuỗi khớp và `len()` đếm chuẩn xác!"
      }
    ],
    "commonMistakes": [
      "Dùng `re.match(pattern, clause)` để tìm từ khóa xuất hiện ở cuối câu!"
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-150",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do dùng `dtype=\"float64\"` vs `pd.to_numeric` với các cột kết quả trung gian.",
    "question": "Trong `src/kpi.py:L201`, biểu thức `((30.0 - a30) / 30.0).where(valid_occ, np.nan).astype(\"float64\")` dùng `30.0` chấm không thay cho `30` và thêm `.astype(\"float64\")` để làm gì?",
    "quickAnswer": "Phép chia `/` trong Python 3 luôn cho `float`, nhưng viết `30.0` làm rõ phép tính số thực và gọi `.astype(\"float64\")` chuyển đổi chắc chắn kết quả từ `Float64` nullable (có thể kế thừa từ `a30_clean` nếu mang dtype `Int64`) về chuẩn `float64` của NumPy để `.round(4)` và Matplotlib xử lý đồng nhất.",
    "explanation": "Đặc biệt nếu `a30` ở bước trước mang kiểu `Int64`, phép trừ với `30.0` sinh ra kiểu `Float64` mở rộng chứa `pd.NA` thay vì `np.nan`.",
    "projectLink": "src/kpi.py:L201-L202",
    "codeLocation": "src/kpi.py:L201-L202",
    "proofExample": "src/kpi.py:L201-L202",
    "followUpQuestions": [
      "Trong `pd.Series([10, pd.NA], dtype=\"Int64\")`, phép `30.0 - s` cho kiểu `dtype` gì trước khi ép `.astype(\"float64\")`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `pd.Series([10, pd.NA], dtype=\"Int64\")`, phép `30.0 - s` cho kiểu `dtype` gì trước khi ép `.astype(\"float64\")`?",
        "a": "Cho kiểu `Float64` (chữ F viết hoa — nullable float của pandas)."
      }
    ],
    "commonMistakes": [
      "Để lọt kiểu `Float64` chứa `<NA>` đi tiếp sang hàm thống kê cũ không nhận diện `<NA>`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-151",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Tại sao cần cẩn thận khi dùng `df.replace()` với giá trị `NaN` hay dict.",
    "question": "Hàm `Series.replace(mapping)` khác gì với `Series.map(mapping)` khi ánh xạ cột giá trị rời rạc trong pandas?",
    "quickAnswer": "`Series.map(mapping)` thay thế toàn bộ giá trị: phần tử không nằm trong `mapping` sẽ bị biến thành `NaN` (rất tốt khi muốn biết nhãn ngoài quy chuẩn như `COMPLAINT_SCORE_MAP`). Còn `Series.replace(mapping)` chỉ sửa các giá trị khớp khóa, những giá trị không có trong dict được **giữ nguyên**.",
    "explanation": "Ví dụ với `COMPLAINT_SCORE_MAP`, nếu LLM lỡ xuất sai 1 giá trị lạ, `.map()` biến nó thành `NaN` (không tính nhầm vào mean), còn `.replace()` sẽ giữ nguyên chuỗi chữ làm crash phép tính `.mean()`!",
    "projectLink": "src/kpi.py:L418-L419",
    "codeLocation": "src/kpi.py:L418-L419",
    "proofExample": "src/kpi.py:L418-L419 dùng `.map(COMPLAINT_SCORE_MAP)` & `.map(COMPLAINT_MIXED_SCORE_MAP)`.",
    "followUpQuestions": [
      "Tại sao `src/kpi.py:L417` lại chuẩn hóa `vals = rev_merged[asp].astype(\"string\").str.strip().str.lower()` trước khi `.map()`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/kpi.py:L417` lại chuẩn hóa `vals = rev_merged[asp].astype(\"string\").str.strip().str.lower()` trước khi `.map()`?",
        "a": "Phòng trường hợp dữ liệu CSV có chữ hoa `\"Negative\"` hoặc thừa khoảng trắng `\" negative \"` bị `.map()` biến thành `NaN` oan."
      }
    ],
    "commonMistakes": [
      "Dùng `.replace()` thay cho `.map()` khiến chuỗi lạ không thuộc từ điển làm cột chuyển thành `object` và hỏng phép tính trung bình."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-152",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Sự khác nhau giữa `df.sort_index()` và `df.sort_values()`.",
    "question": "Khi nào gọi `df.sort_index()` vs `df.sort_values(by=...)` trong pandas?",
    "quickAnswer": "`sort_index()` sắp xếp các hàng dựa trên nhãn **index** (hàng) hoặc tên cột (`axis=1`), còn `sort_values(by=...)` sắp xếp dựa trên **giá trị của một hay nhiều cột dữ liệu**.",
    "explanation": "Thường gọi `sort_index()` sau `groupby` hoặc `set_index` để đưa nhãn về thứ tự chuẩn.",
    "projectLink": "src/kpi.py:L311, L459",
    "codeLocation": "src/kpi.py:L311, L459",
    "proofExample": "src/kpi.py:L311 dùng `sort_values(area_col)` (A01..A08) và `L459` dùng `sort_values([\"llm_review_count\", \"neighbourhood_cleansed\"])`.",
    "followUpQuestions": [
      "Trong `pd.DataFrame.sort_values()`, khi muốn xếp theo 2 cột: cột 1 giảm dần, cột 2 tăng dần, viết tham số `ascending` thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `pd.DataFrame.sort_values()`, khi muốn xếp theo 2 cột: cột 1 giảm dần, cột 2 tăng dần, viết tham số `ascending` thế nào?",
        "a": "Truyền list boolean khớp độ dài: `ascending=[False, True]` (như `src/kpi.py:L459`)."
      }
    ],
    "commonMistakes": [
      "Gọi `sort_values()` mà quên chỉ định tham số `by=` (bắt buộc với DataFrame, báo `TypeError`)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-153",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Ý nghĩa của `ignore_index=True` trong `pd.concat()` và `.reset_index(drop=True)`.",
    "question": "Nếu KHÔNG truyền `ignore_index=True` trong `pd.concat(chunks)` tại `src/filter_data_from_sheet.py:L142`, hậu quả gì xảy ra?",
    "quickAnswer": "Các hàng giữ nguyên index gốc bên trong từng chunk (ví dụ đều bắt đầu từ `0, 100000...` hoặc lặp lại chỉ số giữa các chunk -> gây trùng index!). Truyền `ignore_index=True` đánh lại dãy index sạch liên tục `0, 1, ..., N-1`.",
    "explanation": "Tương tự, `.reset_index(drop=True)` bỏ hẳn cột index cũ thay vì biến nó thành một cột mới mang tên `\"index\"`.",
    "projectLink": "src/filter_data_from_sheet.py:L142",
    "codeLocation": "src/filter_data_from_sheet.py:L142",
    "proofExample": "src/filter_data_from_sheet.py:L142; `src/viz.py:L112, L157, L211`.",
    "followUpQuestions": [
      "Trong `src/kpi.py:L276` (`return base.reset_index()`), tại sao lại KHÔNG truyền `drop=True`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py:L276` (`return base.reset_index()`), tại sao lại KHÔNG truyền `drop=True`?",
        "a": "Vì ở `build_kpi_by_listing()`, index hiện tại chính là mã `\"id\"` của listing — cần giữ `\"id\"` trở thành cột bình thường chứ KHÔNG vứt bỏ nó!"
      }
    ],
    "commonMistakes": [
      "Gọi `.reset_index()` quên `drop=True` sinh thừa cột `\"index\"`, và gọi nhiều lần làm báo lỗi `ValueError: cannot insert level_0, already exists`."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-154",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do tách bước `filter` xuất ra 5 file con mỗi snapshot thay vì giữ nguyên toàn bộ bảng raw.",
    "question": "Việc `filter_data_from_sheet.py` trích và lưu riêng `listings.csv`, `calendar.csv`, `reviews.csv`, `reviews_llm.csv`, `reviews_labeled.csv` vào `data/processed/{snap}/` mang lại lợi ích gì?",
    "quickAnswer": "1. Thu gọn kích thước từ hàng trăm MB file nén xuống vài trăm KB mỗi quý, giúp bước QA/KPI/Baseline/Evaluate đọc chạy chỉ trong <1 giây;\n2. Cô lập rõ 3 tập review phục vụ đúng mục đích khác nhau (5.000 phân công, 1.000 gọi LLM, 100 đối chiếu nhãn tay);\n3. Đảm bảo tính tái lập vì không đụng chạm tệp gốc trong `data/raw/`.",
    "explanation": "Đây là bước chuyển tiếp chuẩn từ tầng Bronze (raw) sang tầng Silver (filtered/cleaned).",
    "projectLink": "src/filter_data_from_sheet.py:L207-L232",
    "codeLocation": "src/filter_data_from_sheet.py:L207-L232",
    "proofExample": "src/filter_data_from_sheet.py:L207-L232",
    "followUpQuestions": [
      "Tệp `calendar.csv` sau bước Filter được lưu vào `data/processed/{snap}/` với số dòng theo 1.000 listing, liệu có được `kpi.py` đọc dùng ở tag final không?"
    ],
    "followUpQA": [
      {
        "q": "Tệp `calendar.csv` sau bước Filter được lưu vào `data/processed/{snap}/` với số dòng theo 1.000 listing, liệu có được `kpi.py` đọc dùng ở tag final không?",
        "a": "Kiểm tra thực tế tại tag `final`: `src/kpi.py` CHỈ đọc `listings.csv` (vì `listings.csv` đã chứa sẵn các cột tổng hợp `availability_30/90/365` và giá đêm) cùng `reviews_sentiment.csv`, KHÔNG đọc `calendar.csv`! (Điểm cần nắm rõ khi bảo vệ kiến trúc)."
      }
    ],
    "commonMistakes": [
      "Đọc trực tiếp `data/raw/` ở mọi bước `qa.py`, `llm.py`, `kpi.py` khiến mỗi bước đều tốn hàng chục giây giải nén lại triệu dòng."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vt-155",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Sự khác nhau giữa đọc luồng (`iter_content`) và tải toàn bộ (`resp.content`) khi gặp mạng yếu.",
    "question": "Khi tải tệp `calendar.csv.gz` dung lượng lớn qua `requests.get(url, stream=True)`, vì sao chọn `chunk_size=65536` (64 KB) trong `resp.iter_content()`?",
    "quickAnswer": "64 KB là kích thước bộ đệm tối ưu (đủ lớn để giảm số lần syscall ghi đĩa, đủ nhỏ để RAM tiêu thụ gần như cố định vài trăm KB thay vì hàng trăm MB). Khi kết nối đứt ở giữa file, vòng lặp dừng lại, `.tmp` bị xóa và không làm phình bộ nhớ.",
    "explanation": "Ngược lại, file Google Sheets chỉ vài nghìn dòng rất nhỏ nên `_read_sheet()` dùng thẳng `response.content` cho đơn giản.",
    "projectLink": "src/download.py:L52-L54",
    "codeLocation": "src/download.py:L52-L54",
    "proofExample": "src/download.py:L33, L52-L54 vs `src/filter_data_from_sheet.py:L44-L48`.",
    "followUpQuestions": [
      "Trong `resp.iter_content(chunk_size=65536)`, nếu một chunk trả về `b\"\"` (keep-alive chunk rỗng), việc gọi `f.write(b\"\")` có ảnh hưởng tới `actual_size` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `resp.iter_content(chunk_size=65536)`, nếu một chunk trả về `b\"\"` (keep-alive chunk rỗng), việc gọi `f.write(b\"\")` có ảnh hưởng tới `actual_size` không?",
        "a": "Ghi 0 byte không làm sai `actual_size`, nhưng thông thường có thể viết thêm `if chunk:` (dù với server HTTP chuẩn `iter_content` bỏ keep-alive)."
      }
    ],
    "commonMistakes": [
      "Dùng `stream=True` nhưng sau đó lại gọi `resp.content` (lập tức nạp hết vào RAM làm mất tác dụng của `stream=True`!)."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-156",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt lệnh `GROUP BY` trong SQL với `.groupby()` trong pandas về mặc định giữ/bỏ `NULL`/`NaN`.",
    "question": "Khi cột phân nhóm chứa giá trị thiếu (`NULL` trong SQL vs `NaN` trong pandas), `GROUP BY col` của SQL (DuckDB) và `df.groupby(\"col\")` mặc định của pandas xử lý khác nhau thế nào?",
    "quickAnswer": "NGƯỢC NHAU HOÀN TOÀN! Trong SQL chuẩn/DuckDB, `GROUP BY col` **GIỮ LẠI** tất cả dòng `NULL` gom chung thành một nhóm `NULL` riêng; còn trong pandas, `df.groupby(\"col\")` mặc định (`dropna=True`) **VỨT BỎ** âm thầm mọi dòng có khóa `NaN` (chỉ giữ lại khi truyền rõ `dropna=False`)!",
    "explanation": "Đây là một chi tiết lý thuyết kinh điển rất hay bị hỏi khi đối chiếu SQL và pandas.",
    "projectLink": "src/kpi.py:L286",
    "codeLocation": "src/kpi.py:L286",
    "proofExample": "Bài 5 & Bài 6; `src/kpi.py:L286` (`dropna=False`).",
    "followUpQuestions": [
      "Khi chuyển bảng kết quả của DuckDB có nhóm `NULL` về DataFrame và gọi `df.to_csv()`, nhóm `NULL` đó trở thành ô gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi chuyển bảng kết quả của DuckDB có nhóm `NULL` về DataFrame và gọi `df.to_csv()`, nhóm `NULL` đó trở thành ô gì?",
        "a": "Trở thành ô trống (hoặc `NaN` khi đọc lại)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `GROUP BY` trong SQL bỏ qua nhóm `NULL` hoặc `df.groupby()` giữ lại nhóm `NaN` giống SQL."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-157",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cách hoạt động của Lookahead / Lookbehind vs tách mệnh đề `CLAUSE_RE` trong phủ định.",
    "question": "Tại sao `src/baseline.py` chọn chiến lược **tách mệnh đề `CLAUSE_RE` + xóa cụm phủ định lành tính `BENIGN_RE` + xóa cụm phủ định chê `NEG_RE`** thay vì viết một biểu thức Regex Lookbehind khổng lồ `(?<!not\\s)clean`?",
    "quickAnswer": "Lookbehind độ dài biến thiên (như `\"not very clean\"`, `\"not at all clean\"`) bị cấm hoặc giới hạn chặt trong module `re` tiêu chuẩn của Python (yêu cầu độ dài cố định!), cực kỳ khó đọc và dễ sập. Tách mệnh đề nhỏ và xử lý theo thứ tự bước làm sạch tuần tự vừa dễ bảo trì, vừa chạy được trên mọi cấu trúc đảo từ đa ngôn ngữ.",
    "explanation": "Minh họa rõ ràng cho nghệ thuật chia nhỏ bài toán xử lý chuỗi thay vì ép mọi thứ vào 1 Regex duy nhất.",
    "projectLink": "src/baseline.py:L92-L96",
    "codeLocation": "src/baseline.py:L92-L96",
    "proofExample": "src/baseline.py:L31-L50, L92-L96.",
    "followUpQuestions": [
      "Tại sao `NEG_RE` ở `src/baseline.py:L43` lại liệt kê các trạng từ chêm ở giữa `not (?:very |too |so |super |really |...)?`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `NEG_RE` ở `src/baseline.py:L43` lại liệt kê các trạng từ chêm ở giữa `not (?:very |too |so |super |really |...)?`?",
        "a": "Để khớp được các cách diễn đạt tự nhiên thực tế như `\"not very clean\"`, `\"not really quiet\"`, `\"n't too comfortable\"` thay vì chỉ khớp cứng `\"not clean\"`."
      }
    ],
    "commonMistakes": [
      "Cố viết Regex `(?<!not .*)` trong thư viện `re` chuẩn -> văng `re.error: look-behind requires fixed-width pattern`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-158",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải tại sao dùng `snap_dt` (`snapshot` YAML) làm fallback cho `last_scraped` trong `RULE_LAST_REVIEW_VALIDITY`.",
    "question": "Trong `src/qa.py:L281-L285`, tại sao khi kiểm tra `last_review > ref_date`, code ưu tiên `last_scraped` và `.fillna(snap_dt)`?",
    "quickAnswer": "Mỗi listing trong cùng 1 snapshot có thể được scraper Inside Airbnb thu thập trong khoảng vài ngày quanh ngày phát hành công bố (ví dụ `2026-06-15` nhưng có dòng `last_scraped = 2026-06-18`). Dùng chính `last_scraped` của từng dòng tránh gắn cờ oan bình luận hợp lệ ngày `16/06`; chỉ khi cột `last_scraped` bị thiếu mới fallback về ngày danh nghĩa của snapshot.",
    "explanation": "Cách làm tinh tế này tôn trọng đúng thời điểm thu thập thực tế của dữ liệu.",
    "projectLink": "src/qa.py:L281-L285",
    "codeLocation": "src/qa.py:L281-L285",
    "proofExample": "src/qa.py:L281-L285",
    "followUpQuestions": [
      "Nếu `last_review_clean` có ngày hợp lệ bằng ĐÚNG ngày `last_scraped` (`last_review == last_scraped`), quy tắc 8 có coi là hợp lệ không?"
    ],
    "followUpQA": [
      {
        "q": "Nếu `last_review_clean` có ngày hợp lệ bằng ĐÚNG ngày `last_scraped` (`last_review == last_scraped`), quy tắc 8 có coi là hợp lệ không?",
        "a": "Có! Vì điều kiện lỗi là `>` (`lr_parsed > ref_date`), nên ngày review trùng đúng ngày cào vẫn hoàn toàn hợp lệ."
      }
    ],
    "commonMistakes": [
      "So sánh cứng `last_review > \"2026-06-15\"` làm gắn cờ sai những review mới đăng từ 16–18/06 của các listing cào muộn vài ngày."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-159",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Tác động dây chuyền nếu một quy tắc QA thay đổi từ Flag sang Drop.",
    "question": "Phân tích điều gì xảy ra nếu thay đổi `RULE_PRICE_OUTLIER` từ chỉ Gắn cờ (`qa_price_outlier`) sang Xóa hẳn các căn ngoài `[P01, P99]` khỏi `listings.csv`?",
    "quickAnswer": "1. Tổng số lượng cung cấp mẫu không còn là `1.000` (tụt xuống ~980 ở t4), làm mất tính nhất quán của panel cân bằng;\n2. `Mean Price` giảm mạnh (ví dụ ở Cuauhtémoc giảm ~20% khi mất 2 căn >153k) nhưng `Median Price` đổi rất ít;\n3. Mất luôn dữ liệu `Occupancy` và `Review Velocity` của các căn biệt thự hạng sang đó.",
    "explanation": "Vì vậy Flagging (gắn cờ giữ nguyên) luôn an toàn hơn Drop trong tầng chuẩn bị dữ liệu.",
    "projectLink": "src/qa.py:L138-L155",
    "codeLocation": "src/qa.py:L138-L155",
    "proofExample": "reports/qa_report.csv & `src/qa.py:L138-L155`.",
    "followUpQuestions": [
      "Trong kịch bản ngược lại (giữ nguyên bảng `listings.csv` nhưng sửa `kpi.py` loại `qa_price_outlier` khi tính Price/PPG), chỉ số nào đổi mạnh hơn: `Median PPG` hay `Mean Price`?"
    ],
    "followUpQA": [
      {
        "q": "Trong kịch bản ngược lại (giữ nguyên bảng `listings.csv` nhưng sửa `kpi.py` loại `qa_price_outlier` khi tính Price/PPG), chỉ số nào đổi mạnh hơn: `Median PPG` hay `Mean Price`?",
        "a": "`Mean Price` đổi rất mạnh vì nhảy theo đuôi cực đoan, còn `Median PPG` và `rIQR` hầu như ít biến động (chỉ dịch ~1% điểm thứ hạng ở giữa)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng xóa 2% outlier ở `qa.py` chỉ ảnh hưởng cột giá mà không ảnh hưởng tới cỡ mẫu Occupancy hay Ghost Rate."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-160",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `overall_sentiment = mixed` vs đánh giá sao cao trên Airbnb.",
    "question": "Tại sao tới **20.6%** review trong mẫu LLM được gán nhãn `mixed` (dù hầu hết khách Airbnb vẫn chấm 4–5 sao trên nền tảng)?",
    "quickAnswer": "Vì thang sao trên Airbnb mang nặng áp lực xã hội (social pressure: dưới 4 sao bị coi là kém), nên du khách rất hay cho 5 sao và khen `\"Great location and host\"` ở đầu câu, rồi khéo léo chêm 1 bất tiện thật (`\"...however the shower water was cold and street noise at night\"`). Mô hình `mixed` bóc tách chính xác sự hai mặt đó phục vụ thanh tra chất lượng.",
    "explanation": "Đây là phát hiện giá trị nhất của phần ABSA đối với SECTUR CDMX.",
    "projectLink": "src/llm.py:L213 & `figures/llm_insights.png`",
    "codeLocation": "src/llm.py:L213 & `figures/llm_insights.png`",
    "proofExample": "reviews_sentiment.csv (206/1.000 câu `mixed`, giúp `complaint_mixed_amenities` đạt 14.8% tại Cuauhtémoc).",
    "followUpQuestions": [
      "Trong `evaluate.py:L168`, nếu người chấm gán `negative` cho một khía cạnh nhưng LLM gán `mixed`, lỗi này bị xếp vào nhóm nào trong `llm_error_analysis.csv`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `evaluate.py:L168`, nếu người chấm gán `negative` cho một khía cạnh nhưng LLM gán `mixed`, lỗi này bị xếp vào nhóm nào trong `llm_error_analysis.csv`?",
        "a": "Xếp vào nhóm `sai_nhan` (cả hai đều không phải `\"not_mentioned\"` nhưng khác nhãn nhau)."
      }
    ],
    "commonMistakes": [
      "Đặt ngưỡng `mixed` quá chặt làm toàn bộ các câu khen kèm góp ý nhỏ bị dồn hết vào `positive`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-161",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Baseline"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải tỷ lệ thắng/thua giữa Baseline Regex và LLM trên 9 chỉ số.",
    "question": "Nhìn lại `evaluation_report.csv`, tại sao Baseline Regex đạt **0.9024** ở `khia_canh_f1` và **0.99** ở `ngon_ngu_accuracy`, nhưng lại thảm bại với **0.5224** ở `cam_xuc_macro_f1`?",
    "quickAnswer": "Bởi vì: (1) Nhận diện tiếng Anh (99%+ dữ liệu) và phát hiện danh từ chủ đề như `\"wifi\"`, `\"metro\"`, `\"host\"` chỉ dựa vào khớp từ khóa là đã khá chuẩn; (2) Nhưng phân loại sắc thái **cảm xúc 3 lớp** (nhất là ranh giới `mixed` vs `negative`) phụ thuộc vào ngữ cảnh, phủ định nhiều bước, mỉa mai và ẩn dụ — điều mà từ điển Regex tĩnh không xử lý nổi.",
    "explanation": "Số liệu thực nghiệm chứng minh rõ thế mạnh của từng công cụ đúng như lý thuyết Bài 11.",
    "projectLink": "reports/evaluation_report.csv",
    "codeLocation": "reports/evaluation_report.csv",
    "proofExample": "reports/evaluation_report.csv: `ngon_ngu_accuracy` (0.99 vs 1.00), `khia_canh_f1` (0.9024 vs 0.9393), `cam_xuc_macro_f1` (0.5224 vs 0.9909).",
    "followUpQuestions": [
      "Ưu điểm nào của Baseline Regex mà LLM không thể thay thế trong một hệ thống chi phí thấp?"
    ],
    "followUpQA": [
      {
        "q": "Ưu điểm nào của Baseline Regex mà LLM không thể thay thế trong một hệ thống chi phí thấp?",
        "a": "Chạy ngoại tuyến 0 USD, tốc độ xử lý vài nghìn câu/giây, hoàn toàn tất định 100% và dễ giải thích từng từ khóa kích hoạt."
      }
    ],
    "commonMistakes": [
      "Nói chung chung \"Regex tệ ở mọi mặt\" mà không nhận ra Regex vẫn đạt 0.90 ở nhận diện chủ đề khía cạnh và 0.99 ở ngôn ngữ."
    ],
    "relatedFiles": [
      "reports/evaluation_report.csv"
    ]
  },
  {
    "id": "vt-162",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Tác dụng và rủi ro của `exclude_ghost = True` khi tính Occupancy.",
    "question": "Tại sao `kpi.exclude_ghost: true` lại hợp lý khi tính mức độ kín lịch `Occupancy` phục vụ SECTUR CDMX?",
    "quickAnswer": "Một căn hộ đóng băng (`availability_365 == 0` và không hề có review mới trong cả quý) đang ở trạng thái tạm ngừng nhận khách / khóa lịch chết. Nếu giữ nó trong phép tính `Occ_1-30 = (30 - 0)/30 = 100%`, nó sẽ kéo vọt tỷ lệ lấp đầy thị trường lên một cách giả tạo như thể du khách đang đặt hết sạch phòng.",
    "explanation": "Dù tại mẫu CDMX tỷ lệ ghost chỉ là `0.0%–0.7%` (nên sai lệch không quá lớn), thiết kế cờ `exclude_ghost` bảo vệ thuật toán an toàn khi chạy trên các thành phố có nhiều tin ảo/đóng băng hơn.",
    "projectLink": "src/kpi.py:L195-L200",
    "codeLocation": "src/kpi.py:L195-L200",
    "proofExample": "src/kpi.py:L195-L200 & `configs/mexico-city.yaml`.",
    "followUpQuestions": [
      "Khi bật `exclude_ghost = True`, tỷ lệ `Occ_1-30` tăng lên hay giảm xuống so với để `False`?"
    ],
    "followUpQA": [
      {
        "q": "Khi bật `exclude_ghost = True`, tỷ lệ `Occ_1-30` tăng lên hay giảm xuống so với để `False`?",
        "a": "Giảm xuống nhẹ (hoặc bằng nếu không có ghost), vì mọi căn ghost đều có `a365 = 0` nên `a30 = 0` tức `Occ_1-30 = 100%` — loại bỏ các căn 100% giả đó sẽ đưa trung bình thực tế xuống."
      }
    ],
    "commonMistakes": [
      "Quên rằng bật `exclude_ghost = True` không chỉ loại `ghost == 1` mà còn loại cả `ghost == <NA>` qua `(g == 0).fillna(False)`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-163",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "theory",
    "topics": [
      "Visualization"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa các kênh thị giác (Visual Encodings) trong trình bày dữ liệu đa biến.",
    "question": "Trong biểu đồ 2D của `src/viz.py`, những kênh thị giác (Visual Encodings) nào được dùng đồng thời để truyền tải tối đa thông tin mà không rối mắt?",
    "quickAnswer": "1. **Vị trí / Độ dài thanh** (`barh`, `boxplot`) cho đại lượng định lượng chính xác như PPG, rIQR;\n2. **Cường độ màu liên tục (Sequential colormap: Blues, Oranges, Reds, YlOrRd)** cho tỷ lệ phần trăm trong Heatmap/Choropleth;\n3. **Màu phân kỳ (Diverging colormap: `RdBu_r` với tâm 0.0)** cho `Urgency Gap`;\n4. **Ký hiệu họa tiết (`hatch=\"///\"`) & nhãn số trực tiếp (`(u/c)`)** cho dữ liệu khuyết và cỡ mẫu.",
    "explanation": "Theo Bài 12–13, độ dài thanh/vị trí cho độ chính xác đọc cao nhất, màu sắc phù hợp nhìn cụm/mẫu hình nhanh.",
    "projectLink": "src/viz.py:L250, L394",
    "codeLocation": "src/viz.py:L250, L394",
    "proofExample": "src/viz.py (`plot_occupancy_gap`, `plot_ppg_neighbourhood`, `plot_llm_insights`).",
    "followUpQuestions": [
      "Tại sao cho `llm_insights.png` dùng bảng màu `\"Reds\"`, cho `Occupancy` dùng `\"Blues\"`, còn cho `Urgency Gap` lại dùng `\"RdBu_r\"`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao cho `llm_insights.png` dùng bảng màu `\"Reds\"`, cho `Occupancy` dùng `\"Blues\"`, còn cho `Urgency Gap` lại dùng `\"RdBu_r\"`?",
        "a": "Tỷ lệ phàn nàn càng cao càng báo động -> sắc đỏ `\"Reds\"`; công suất từ 0–100% là đại lượng một chiều -> `\"Blues\"`; còn Urgency Gap mang dấu `+/-` quanh điểm trung hòa 0.0 pp -> bắt buộc dùng bảng màu phân kỳ `\"RdBu_r\"` đối xứng hai cực xanh/đỏ."
      }
    ],
    "commonMistakes": [
      "Dùng bảng màu cầu vồng (`jet`/`rainbow`) hoặc bảng màu liên tục `Blues` cho dữ liệu có cả giá trị âm và dương quanh mốc 0!"
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-164",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải kết hợp giữa giá tăng mạnh ở `A03` (+70.1%) và công suất giảm ở `t4` (`34.58%`).",
    "question": "Dữ liệu thực nghiệm ở khu vực `A03` cho thấy tín hiệu gì khi ghép biểu đồ giá `PPG` với biểu đồ công suất `Occupancy` qua 4 mốc?",
    "quickAnswer": "Khu vực `A03` (nhóm bình dân ban đầu: t1 có Median PPG 302 MXN) tăng giá phần trăm mạnh nhất toàn mẫu **+70.1%** lên 514 MXN tại t4, đồng thời ghi nhận mức độ không khả dụng ngắn hạn (`Occ_1-30`) thấp nhất trong cả 8 khu vực tại t4 (**34.58%** với Urgency Gap sụt xuống +13.93 pp). Sự kết hợp chéo 2 chỉ số này gợi ý dấu hiệu phản ứng co cầu khi tăng giá quá nhanh vượt kỳ vọng người thuê ở phân khúc bình dân (cần lưu ý giới hạn `Occ` chỉ là proxy lịch trống).",
    "explanation": "Đây là mẫu phân tích chéo đa chỉ số (Triangulation) điển hình ở Bài 14.",
    "projectLink": "data/processed/kpi_by_area.csv",
    "codeLocation": "data/processed/kpi_by_area.csv",
    "proofExample": "kpi_by_area.csv dòng `A03` & Story 4.",
    "followUpQuestions": [
      "Trái ngược với `A03`, khu vực nào tăng giá PPG ít hơn theo % và giữ `Occ_1-30` cao nhất tại `t4`?"
    ],
    "followUpQA": [
      {
        "q": "Trái ngược với `A03`, khu vực nào tăng giá PPG ít hơn theo % và giữ `Occ_1-30` cao nhất tại `t4`?",
        "a": "Khu vực `A02` giữ mức độ không khả dụng ngắn hạn cao nhất tại `t4` (**51.94%**, Urgency Gap +23.01 pp) dù mặt bằng giá PPG cao thứ hai (755.62 MXN)."
      }
    ],
    "commonMistakes": [
      "Kết luận chắc nịch rằng \"100% căn ở A03 tăng giá nên bị ế phòng không ai đặt\" mà quên kiểm tra yếu tố tự khóa lịch hay mùa vụ."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_area.csv"
    ]
  },
  {
    "id": "vt-165",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Chiến lược kiểm chứng tái lập 100% khi chấm bài offline (`--skip-llm`).",
    "question": "Hãy giải thích trọn vẹn kiến trúc giúp giảng viên chạy `python run_pipeline.py --config configs/mexico-city.yaml --skip-llm` trên máy sạch mà không cần API Key Gemini hay Google Sheets nếu đã có processed data?",
    "quickAnswer": "1. Bước `llm.py` nhận `--skip-llm`, nạp trực tiếp 1.000 bản ghi JSON từ `data/processed/llm_cache.jsonl` đã commit sẵn trong repo mà hoàn toàn không gọi `init_client()` hay đọc `.env`;\n2. `qa.py`, `baseline.py`, `evaluate.py`, `kpi.py`, `viz.py` đều chạy offline 100% bằng dữ liệu cục bộ để tái tạo toàn bộ bảng CSV báo cáo và 8 biểu đồ PNG trong vài giây.\n*(Lưu ý: bước `download` và `filter` khi chạy từ con số 0 vẫn cần Internet + raw t1 fallback + Google Sheet mở công khai).*",
    "explanation": "Tách rõ phần phụ thuộc mạng (`download`, `filter`, `llm` lần đầu) với phần tính toán hoàn toàn tái lập (`--skip-llm` -> `viz`).",
    "projectLink": "run_pipeline.py; src/llm.py",
    "codeLocation": "run_pipeline.py; src/llm.py",
    "proofExample": "run_pipeline.py:L29-L31; `src/llm.py:L408-L437`.",
    "followUpQuestions": [
      "Trong `run_pipeline.py`, ngoài `llm.py`, có bước nào trong `STEPS` bắt buộc phải có `raw` data mỗi lần chạy lại nếu `processed` đã tồn tại không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `run_pipeline.py`, ngoài `llm.py`, có bước nào trong `STEPS` bắt buộc phải có `raw` data mỗi lần chạy lại nếu `processed` đã tồn tại không?",
        "a": "Bước `src/download.py` có idempotent check (`dest.exists() & size > 0` -> bỏ qua tải lại); nhưng bước `src/filter_data_from_sheet.py` thì LUÔN đọc lại từ `data/raw/` và Google Sheets để ghi đè `data/processed/`."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng `--skip-llm` nghĩa là bỏ qua không chạy bước `src/llm.py` và xóa mất `reviews_sentiment.csv`."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vt-166",
    "category": "I",
    "categoryLabel": "Đọc hiểu code",
    "bucket": "theory",
    "topics": [
      "Code Trace"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hiểu cơ chế tách `before_ok` vs `after_ok` trong `RULE_PRICE_PARSE`.",
    "question": "Tại sao dòng 92–93 của `src/qa.py` tính cả 2 biến `raw_numeric` (chưa dùng Regex) và `price_numeric` (sau Regex `r\"[^\\d.-]\"`)?",
    "quickAnswer": "Để đo lường chính xác **tỷ lệ được cải thiện** bởi QA (`before_ok -> after_ok` trong `qa_report.csv`). Ví dụ ở mốc t4: `0.0%` parse được từ chuỗi `$1,940.00` thô (`raw_numeric`), và sau Regex tỷ lệ parse thành công vọt lên **`98.0%`** (`980/1.000`).",
    "explanation": "Nếu không tính `raw_numeric`, không có con số `before` khách quan để chứng minh bước chuẩn hóa Regex có tác dụng.",
    "projectLink": "src/qa.py:L91-L108",
    "codeLocation": "src/qa.py:L91-L108",
    "proofExample": "src/qa.py:L91-L108 & `reports/qa_report.csv`.",
    "followUpQuestions": [
      "Biểu thức `int(raw_numeric.notna().sum())` đếm những giá trị nào?"
    ],
    "followUpQA": [
      {
        "q": "Biểu thức `int(raw_numeric.notna().sum())` đếm những giá trị nào?",
        "a": "Đếm những dòng vốn đã ở dạng số thuần túy ngay từ đầu trước khi chạy Regex xóa `$` và dấu phẩy."
      }
    ],
    "commonMistakes": [
      "Ghi `before = 0%` cứng bằng tay thay vì đo thực tế trên `raw_numeric` (nếu một file CSV đã lưu sẵn số không có dấu `$`, `before` phải tự tính đúng là 98% chứ không phải 0%!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-167",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phạm vi biến (Scope: Local, Enclosing, Global, Built-in - LEGB).",
    "question": "Theo quy tắc tìm kiếm tên biến LEGB trong Python, nếu đặt tên biến trùng từ khóa hàm dựng sẵn (ví dụ đặt biến `list = [...]` hay `id = 5` hoặc `str = \"x\"`), hậu quả gì xảy ra?",
    "quickAnswer": "Biến cục bộ (`Local`) che khuất hàm chuẩn (`Built-in`) trong phạm vi hàm đó, làm lệnh `list(...)` hoặc `str(...)` ngay phía sau ném `TypeError: \"str\" object is not callable`!",
    "explanation": "Đó là lý do lập trình viên đặt tên biến là `r_id`, `str_val`, `qa_list` thay vì `id`, `list`, `str`.",
    "projectLink": "src/llm.py:L352",
    "codeLocation": "src/llm.py:L352",
    "proofExample": "src/llm.py:L352 đặt tên `r_id`; `src/evaluate.py:L158` đặt `ma`; `src/kpi.py:L88` đặt `_price_col`.",
    "followUpQuestions": [
      "Trong `src/evaluate.py:L54`, biến tham số `bat_buoc` vs biến `f1` (hàm) có bị đụng độ đặt tên không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/evaluate.py:L54`, biến tham số `bat_buoc` vs biến `f1` (hàm) có bị đụng độ đặt tên không?",
        "a": "Chú ý trong `src/evaluate.py:L101` có hàm tên `f1()`, nên bên trong code tránh đặt biến cục bộ tên `f1 = ...` cùng phạm vi để khỏi che khuất hàm `f1()`."
      }
    ],
    "commonMistakes": [
      "Đặt tên biến là `dict = {...}` hoặc `sum = 0` trong hàm xử lý dữ liệu."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-168",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Đọc hiểu vòng lặp `while` vs `for` và lý do BTL ưu tiên vòng `for` giới hạn.",
    "question": "Tại sao vòng thử lại `retry` trong cả `download.py` lẫn `llm.py` đều dùng `for attempt in range(max_attempts):` thay vì `while True:`?",
    "quickAnswer": "`for attempt in range(max_attempts)` bảo đảm vòng lặp luôn có **cận trên hữu hạn** (`max_attempts = 3` hoặc `5`), không bao giờ rơi vào vòng lặp vô hạn treo vĩnh viễn dù logic điều kiện thoát bên trong có sót trường hợp nào.",
    "explanation": "An toàn tuyệt đối cho pipeline chạy tự động không giám sát.",
    "projectLink": "src/download.py:L31; src/llm.py:L268",
    "codeLocation": "src/download.py:L31; src/llm.py:L268",
    "proofExample": "src/download.py:L31; `src/llm.py:L268`.",
    "followUpQuestions": [
      "Trong `src/llm.py:L322`, vòng lặp chạy bù dùng mấy lượt lặp tất cả?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py:L322`, vòng lặp chạy bù dùng mấy lượt lặp tất cả?",
        "a": "Tối đa 3 lượt theo `pass_plan`: Lượt 0 (`batch_size=5`), Lượt 1 chạy bù (`batch_size=5`), Lượt 2 chạy bù cuối tách lẻ (`batch_size=1`)."
      }
    ],
    "commonMistakes": [
      "Viết `while not success:` mà quên tăng biến đếm khiến server trả lỗi 404 là chương trình treo lặp vô tận."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-169",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Biểu thức điều kiện 3 ngôi (Ternary Operator) và gán gọn nhiều nhánh.",
    "question": "Đọc hiểu cú pháp: `overall = \"positive\" if total_neg == 0 else \"negative\" if (...) else \"mixed\"` (`src/baseline.py:L105`). Thứ tự đánh giá điều kiện như thế nào?",
    "quickAnswer": "Kiểm tra `total_neg == 0` đầu tiên (nếu đúng gán ngay `\"positive\"`); nếu sai mới xét điều kiện 2 `(total_pos == 0 or total_neg >= max(3, 2 * total_pos))` (nếu đúng gán `\"negative\"`); còn lại rơi vào `\"mixed\"`.",
    "explanation": "Gọn trong 1 dòng duy nhất nhưng vẫn rành mạch 3 trường hợp không giao nhau.",
    "projectLink": "src/baseline.py:L105; src/evaluate.py:L168",
    "codeLocation": "src/baseline.py:L105; src/evaluate.py:L168",
    "proofExample": "src/baseline.py:L105 & `src/evaluate.py:L168` (`loai = \"thua\" if ... else \"thieu\" if ... else \"sai_nhan\"`).",
    "followUpQuestions": [
      "Nếu một review có `total_pos = 4` và `total_neg = 3`, nhánh `overall` tại `L105` cho nhãn gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu một review có `total_pos = 4` và `total_neg = 3`, nhánh `overall` tại `L105` cho nhãn gì?",
        "a": "`total_neg != 0`, `total_pos != 0`, và `3 < max(3, 2*4) = 8` -> gán **`\"mixed\"`**."
      }
    ],
    "commonMistakes": [
      "Lồng 4–5 toán tử tam nguyên phức tạp khiến người đọc mất khả năng truy vết điều kiện ưu tiên."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-170",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do kiểm tra điều kiện rỗng trước phép chia (`if denom else np.nan`).",
    "question": "Mẫu lập trình `2 * tp / (2 * tp + fp + fn) if (tp + fp + fn) else np.nan` (`src/evaluate.py:L111`) giải quyết bài toán gì khi tính F1?",
    "quickAnswer": "Trong trường hợp tập Ground Truth không có bất kỳ khía cạnh tiêu cực nào (`t = set()`) VÀ mô hình cũng không đoán nhầm cái nào (`p = set()`), cả `tp, fp, fn` đều bằng 0 -> mẫu số bằng 0! Nếu không kiểm `if (tp + fp + fn)` sẽ ném `ZeroDivisionError`; trả `np.nan` biểu thị trung thực \"không có trường hợp dương nào để đánh giá\".",
    "explanation": "Tương tự `med > 0` trong `_iqr_stats()` và `non_null_lr` trong `RULE_LAST_REVIEW_VALIDITY`.",
    "projectLink": "src/evaluate.py:L111",
    "codeLocation": "src/evaluate.py:L111",
    "proofExample": "src/evaluate.py:L111; `src/qa.py:L295`; `src/kpi.py:L78`.",
    "followUpQuestions": [
      "Trong `f1_cam_xuc()`, scikit-learn xử lý trường hợp `TP=FP=0` thế nào khi truyền `zero_division=0`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `f1_cam_xuc()`, scikit-learn xử lý trường hợp `TP=FP=0` thế nào khi truyền `zero_division=0`?",
        "a": "Trả về điểm `0.0` cho lớp đó thay vì `np.nan` hoặc phát `UndefinedMetricWarning`."
      }
    ],
    "commonMistakes": [
      "Chia thẳng `a / b` mà mặc định b luôn khác 0 trên mọi lát cắt lọc nhỏ."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-171",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "So sánh `np.nan == np.nan` và `pd.isna()` / `np.isnan()`.",
    "question": "Tại sao viết `if x == np.nan:` không bao giờ chạy vào nhánh `if` dù `x` đang mang giá trị `np.nan`?",
    "quickAnswer": "Theo chuẩn số thực IEEE 754, `NaN` không bằng bất kỳ giá trị nào kể cả chính nó (`np.nan == np.nan` luôn là `False`, còn `np.nan != np.nan` lại là `True`). Cách kiểm tra đúng duy nhất là `np.isnan(x)` (trên số thực) hoặc tổng quát nhất trong pandas là `pd.isna(x)`.",
    "explanation": "Ngoài ra `np.isnan(\"abc\")` trên chuỗi ném `TypeError`, còn `pd.isna(\"abc\")` trả `False` rất an toàn!",
    "projectLink": "src/kpi.py:L66; src/llm.py:L125",
    "codeLocation": "src/kpi.py:L66; src/llm.py:L125",
    "proofExample": "src/kpi.py:L66 dùng `pd.isna(val)`; `src/llm.py:L125` dùng `pd.isna(val)`.",
    "followUpQuestions": [
      "Hàm `pd.isna(None)` và `pd.isna(pd.NaT)` và `pd.isna(np.nan)` đều trả về gì?"
    ],
    "followUpQA": [
      {
        "q": "Hàm `pd.isna(None)` và `pd.isna(pd.NaT)` và `pd.isna(np.nan)` đều trả về gì?",
        "a": "Tất cả đều trả về `True` (đây là điểm mạnh thống nhất của `pd.isna()`)."
      }
    ],
    "commonMistakes": [
      "Kiểm tra thiếu trong chuỗi hoặc số hỗn hợp bằng `np.isnan(val)` gây `TypeError` khi gặp string."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-172",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích của Vectorization với bộ nhớ Cache CPU (L1/L2 Cache Locality).",
    "question": "Ngoài việc tránh kiểm tra kiểu dữ liệu động của Python, lý do phần cứng nào khiến phép toán trên mảng `ndarray` nhanh gấp hàng trăm lần `list` Python?",
    "quickAnswer": "Các phần tử của `list` Python thực chất chỉ là mảng con trỏ trỏ tới các `PyObject` nằm rải rác khắp RAM (gây cache miss liên tục). Ngược lại, `ndarray` lưu giá trị thô nằm liền kề nhau trên một khối bộ nhớ liên tục -> tận dụng tối đa đường truyền **CPU Cache Line & tập lệnh SIMD** xử lý nhiều phần tử trong 1 chu kỳ xung nhịp.",
    "explanation": "Kiến thức nền tảng Bài 3 giải thích hiệu năng của xử lý mảng khoa học.",
    "projectLink": "Bài 3",
    "codeLocation": "Bài 3",
    "proofExample": "Bài 3 (Kiến trúc bộ nhớ NumPy).",
    "followUpQuestions": [
      "Khi nối nhiều chunk `selected` thành DataFrame tổng ở cuối `_filter_raw_by_ids()`, tại sao gọi `pd.concat(chunks)` MỘT LẦN ở cuối thay vì `result = pd.concat([result, selected])` trong từng lượt vòng lặp?"
    ],
    "followUpQA": [
      {
        "q": "Khi nối nhiều chunk `selected` thành DataFrame tổng ở cuối `_filter_raw_by_ids()`, tại sao gọi `pd.concat(chunks)` MỘT LẦN ở cuối thay vì `result = pd.concat([result, selected])` trong từng lượt vòng lặp?",
        "a": "Gọi `concat` bên trong vòng lặp phải cấp phát lại vùng nhớ và sao chép toàn bộ dữ liệu cũ lặp lại sau mỗi chunk (O(K²)), còn gom list rồi nối 1 lần ở cuối chỉ sao chép duy nhất 1 lần (O(N))!"
      }
    ],
    "commonMistakes": [
      "Tưởng `ndarray` nhanh chỉ vì viết bằng C mà quên tính chất dữ liệu liên tiếp (contiguous memory) & đồng nhất kiểu."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-173",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `df.drop(columns=...)` vs `del df[col]` vs `df.pop(col)`.",
    "question": "Trong `src/kpi.py:L403`, code viết `id_to_neigh[\"listing_id\"] = id_to_neigh.pop(\"id\")...`. Tác dụng của `.pop(\"id\")` là gì?",
    "quickAnswer": "`df.pop(col)` vừa lấy ra `Series` của cột `\"id\"` ĐỒNG THỜI xóa luôn cột `\"id\"` khỏi `id_to_neigh` tại chỗ — thay cho 2 bước đổi tên + xóa, tránh giữ thừa cả 2 cột `\"id\"` và `\"listing_id\"` mang cùng dữ liệu trước khi `merge`.",
    "explanation": "Thực hiện trên bản `.copy()` (`L402`) nên cực kỳ sạch và an toàn không chạm vào `kpi_by_listing` gốc.",
    "projectLink": "src/kpi.py:L402-L404",
    "codeLocation": "src/kpi.py:L402-L404",
    "proofExample": "src/kpi.py:L402-L404",
    "followUpQuestions": [
      "Tại sao `src/kpi.py:L406` lại dùng `.rename(columns={\"id\": \"review_id\"})` trong khi dòng 403 dùng `.pop(\"id\")`?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/kpi.py:L406` lại dùng `.rename(columns={\"id\": \"review_id\"})` trong khi dòng 403 dùng `.pop(\"id\")`?",
        "a": "Do `L406` giữ nguyên tên cột mới ở vị trí đầu và kết hợp chuỗi `.copy()` trong 1 biểu thức chain gọn, cả hai đều tránh trùng tên `\"id\"` lúc `merge`."
      }
    ],
    "commonMistakes": [
      "Gọi `.pop()` trực tiếp trên `kpi_by_listing` không qua `.copy()` làm biến mất cột `\"id\"` của bảng gốc!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-174",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích của `Categorical` và tham số `observed=True` khi `groupby`.",
    "question": "Khi cột phân loại như `analysis_area` hoặc `room_type` chuyển sang kiểu `category` (`Categorical`), tham số `observed=True` vs `observed=False` trong `.groupby(..., observed=...)` ảnh hưởng thế nào?",
    "quickAnswer": "Nếu nhóm theo tổ hợp nhiều cột `Categorical` (ví dụ `quận × loại phòng`, 16 × 4 = 64 cặp), `observed=False` sinh ra TẤT CẢ 64 hàng kể cả những tổ hợp thực tế có `0` căn hộ (trả `NaN` rỗng!). Truyền `observed=True` (sắp thành mặc định từ pandas 3) chỉ giữ các tổ hợp thực sự xuất hiện trong dữ liệu.",
    "explanation": "Rất hữu ích khi tránh bùng nổ bảng chéo thưa (sparse) ở các thành phố lớn.",
    "projectLink": "Bài 5",
    "codeLocation": "Bài 5",
    "proofExample": "Bài 5 & chuẩn pandas 2.2/3.0.",
    "followUpQuestions": [
      "Trong `src/kpi.py`, các cột phân nhóm (`analysis_area`, `neighbourhood_cleansed`) được đọc kiểu `string`/`object` hay `category`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py`, các cột phân nhóm (`analysis_area`, `neighbourhood_cleansed`) được đọc kiểu `string`/`object` hay `category`?",
        "a": "Kiểu `string`/`object`, nên `groupby()` chỉ gom đúng các giá trị thực có trong bảng."
      }
    ],
    "commonMistakes": [
      "Chạy `groupby([\"neighbourhood\", \"room_type\"])` với kiểu `category` ra hàng chục dòng `NaN` không hiểu nguyên nhân."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-175",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Đọc hiểu `.apply(axis=0)` vs `.apply(axis=1)` và `.map()` trên toàn DataFrame.",
    "question": "Khi viết `df[cot_nhan].apply(lambda s: s.str.strip().str.lower())` (`src/evaluate.py:L68`), `apply` đang chạy theo chiều nào và biến `s` truyền vào lambda là từng hàng hay từng cột?",
    "quickAnswer": "Mặc định `apply()` có `axis=0`, nghĩa là truyền **từng CỘT `Series`** (`overall_sentiment`, `language`, `location`, ...) vào biến `s`! Nhờ chạy theo cột, bên trong vẫn dùng được `.str.strip().str.lower()` vector theo từng cột thay vì lặp từng ô.",
    "explanation": "Nếu nhầm viết `axis=1`, `s` biến thành từng hàng review và mất tách cột độc lập.",
    "projectLink": "src/evaluate.py:L68",
    "codeLocation": "src/evaluate.py:L68",
    "proofExample": "src/evaluate.py:L68.",
    "followUpQuestions": [
      "Trong pandas 2.1+, phương thức nào thay thế cho hàm `applymap()` cũ đã bị xóa khi muốn biến đổi từng Ô một trên cả DataFrame?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas 2.1+, phương thức nào thay thế cho hàm `applymap()` cũ đã bị xóa khi muốn biến đổi từng Ô một trên cả DataFrame?",
        "a": "Là phương thức `df.map(func)` (tách hẳn khỏi `applymap`)."
      }
    ],
    "commonMistakes": [
      "Tưởng `df.apply(...)` mặc định luôn truyền từng hàng vào lambda."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-176",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `df.shape`, `len(df)` và `df.size`.",
    "question": "Với DataFrame `reviews_sentiment.csv` (1.000 hàng, 15 cột), `len(df)`, `df.shape` và `df.size` trả về các giá trị nào?",
    "quickAnswer": "`len(df)` = `1000` (số hàng); `df.shape` = `(1000, 15)` (tuple số hàng, số cột); `df.size` = `15000` (`1000 × 15`, tổng số ô dữ liệu!).",
    "explanation": "Chú ý không nhầm `df.size` (15.000 ô) với `groupby().size()` (đếm số hàng mỗi nhóm!).",
    "projectLink": "src/qa.py:L61",
    "codeLocation": "src/qa.py:L61",
    "proofExample": "src/qa.py:L61 dùng `len(df)` để lấy số dòng thực của mỗi snapshot.",
    "followUpQuestions": [
      "Giá trị trả về của `df.empty` khi `len(df) == 0` là `True` hay `False`?"
    ],
    "followUpQA": [
      {
        "q": "Giá trị trả về của `df.empty` khi `len(df) == 0` là `True` hay `False`?",
        "a": "`True` — dùng `if not df.empty:` là cách kiểm tra sạch nhất theo PEP 8 / pandas."
      }
    ],
    "commonMistakes": [
      "Dùng `df.size` để đếm số lượng bản ghi của DataFrame (bị nhân gấp 15–70 lần!)."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-177",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Lý do dùng `usecols=` và xác định `dtype` lúc đọc CSV để tăng tốc.",
    "question": "Trong `pd.read_csv(path, usecols=[\"id\"], dtype={\"id\": \"string\"})`, hai tham số `usecols` và `dtype` tối ưu những gì?",
    "quickAnswer": "`usecols` bỏ qua việc tạo cột & parse chuỗi cho toàn bộ các cột không dùng đến (giảm mạnh RAM và CPU parsing); `dtype` bỏ qua giai đoạn đoán kiểu 2 lượt của pandas và ngăn lỗi mất chính xác số ID dài hoặc mất số 0 đầu.",
    "explanation": "Đặc biệt hữu ích khi đọc file `reviews.csv.gz` toàn thành phố tới 1.72 triệu dòng để ước tính chi phí trong `evaluate.py`.",
    "projectLink": "src/evaluate.py:L223",
    "codeLocation": "src/evaluate.py:L223",
    "proofExample": "src/evaluate.py:L223 dùng đúng cặp `usecols=[\"id\"], dtype={\"id\": \"string\"}`.",
    "followUpQuestions": [
      "Nếu danh sách `usecols` chứa 1 tên cột không tồn tại trong file CSV, `pd.read_csv` xử lý ra sao?"
    ],
    "followUpQA": [
      {
        "q": "Nếu danh sách `usecols` chứa 1 tên cột không tồn tại trong file CSV, `pd.read_csv` xử lý ra sao?",
        "a": "Ném ngay `ValueError: Usecols do not match columns` — hoạt động như một bước kiểm tra schema cực nhanh."
      }
    ],
    "commonMistakes": [
      "Đọc đủ hàng chục cột văn bản `comments` nặng hàng trăm MB chỉ để đếm `nunique()` của 1 cột `id`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-178",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải tại sao `.tmp -> replace()` giúp thao tác ghi file an toàn trên POSIX và Windows.",
    "question": "Thao tác đổi tên tạm `tmp.replace(dest)` trong `src/download.py:L58` giải quyết vấn đề hệ điều hành gì so với việc ghi trực tiếp hoặc gọi `tmp.rename(dest)` trên Windows?",
    "quickAnswer": "1. Nếu tiến trình bị tắt ngang khi đang tải xuống `dest.tmp`, file `dest` thật chưa tồn tại (hoặc vẫn là bản cũ nguyên vẹn) nên lần chạy sau không bị lừa;\n2. Trên Windows, `Path.rename(dest)` ném `FileExistsError` nếu `dest` đã có sẵn (khi truyền `--force`!), còn `Path.replace(dest)` ghi đè nguyên tử không lỗi!",
    "explanation": "Chi tiết rất tinh tế khi code phải chạy trơn tru trên cả Windows và Linux.",
    "projectLink": "src/download.py:L58",
    "codeLocation": "src/download.py:L58",
    "proofExample": "src/download.py:L58: `tmp.replace(dest)`.",
    "followUpQuestions": [
      "Khi tải lại với `--force` mà lần thử giữa chừng bị lỗi mạng 403/500 và đã có bản cũ từ trước, liệu `download.py` có lỡ xóa mất bản cũ tốt không?"
    ],
    "followUpQA": [
      {
        "q": "Khi tải lại với `--force` mà lần thử giữa chừng bị lỗi mạng 403/500 và đã có bản cũ từ trước, liệu `download.py` có lỡ xóa mất bản cũ tốt không?",
        "a": "KHÔNG! Bởi vì quá trình ghi diễn ra trên `.tmp`; nếu lỗi thì chỉ xóa `.tmp` (`tmp.unlink()`), giữ nguyên vẹn tệp `dest` cũ tốt từ trước!"
      }
    ],
    "commonMistakes": [
      "Dùng `tmp.rename(dest)` làm `--force` thất bại ngay trên Windows với lỗi `WinError 183: Cannot create a file when that file already exists`!"
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vt-179",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Sự khác nhau giữa Rate Limit (RPM/TPM), Quota (RPD) và Timeout.",
    "question": "Phân biệt 3 khái niệm giới hạn API khi gọi LLM thương mại: RPM, TPM, RPD và Timeout.",
    "quickAnswer": "- **RPM (Requests Per Minute):** số request tối đa/phút (chúng ta giảm bằng `batch_size=5` + `sleep(1s)`);\n- **TPM (Tokens Per Minute):** tổng input+output token tối đa/phút;\n- **RPD (Requests Per Day):** tổng request cho phép trong ngày (hết -> `QuotaExceededException`);\n- **Timeout:** thời gian tối đa chờ phản hồi một request trước khi cắt kết nối (`60_000 ms`).",
    "explanation": "Mỗi giới hạn đòi hỏi chiến lược xử lý khác hẳn nhau trong `src/llm.py`.",
    "projectLink": "src/llm.py:L226-L296",
    "codeLocation": "src/llm.py:L226-L296",
    "proofExample": "src/llm.py:L203, L226-L251, L377.",
    "followUpQuestions": [
      "Nếu giữ nguyên 1.000 review nhưng thay đổi `batch_size` từ `5` thành `1`, đại lượng nào tăng gấp 5 lần: số token Output hay số Request (RPM/RPD)?"
    ],
    "followUpQA": [
      {
        "q": "Nếu giữ nguyên 1.000 review nhưng thay đổi `batch_size` từ `5` thành `1`, đại lượng nào tăng gấp 5 lần: số token Output hay số Request (RPM/RPD)?",
        "a": "Số Request (RPD) tăng gấp 5 lần từ `200` lên `1.000` requests (tốn thêm nhiều token Input lặp prompt, trong khi tổng Output token cho 1.000 review gần như không đổi!)."
      }
    ],
    "commonMistakes": [
      "Gom chung mọi lỗi từ API vào 1 nhánh ngủ cố định 5 giây."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-180",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt Subquery, CTE (`WITH ... AS`) và Views trong SQL phân tích.",
    "question": "Tại sao khi viết các câu truy vấn SQL nhiều bước trên Inside Airbnb (như lọc listing -> tính RV -> lọc ghost -> tính Occupancy) lại ưu tiên dùng **CTE (`WITH cte AS (...)`)** hơn là lồng 4 tầng Subquery?",
    "quickAnswer": "CTE chia nhỏ logic thành từng bảng tạm đặt tên có thứ tự đọc từ trên xuống dưới (như từng chặng pipeline), cực kỳ dễ hiểu, dễ sửa từng bước và tránh lồng ngoặc rối rắm.",
    "explanation": "DuckDB tối ưu hóa thực thi các CTE rất hiệu quả và thậm chí hỗ trợ viết `FROM tbl SELECT ...` gọn gàng.",
    "projectLink": "Bài 6",
    "codeLocation": "Bài 6",
    "proofExample": "Bài 6 (DuckDB & SQL nâng cao).",
    "followUpQuestions": [
      "Giữa CTE và bảng tạm vật lý `CREATE TEMP TABLE`, điểm khác biệt về tái sử dụng là gì?"
    ],
    "followUpQA": [
      {
        "q": "Giữa CTE và bảng tạm vật lý `CREATE TEMP TABLE`, điểm khác biệt về tái sử dụng là gì?",
        "a": "CTE chỉ tồn tại trong phạm vi duy nhất 1 câu truy vấn hiện hành; `TEMP TABLE` lưu tạm trong phiên làm việc kết nối đó cho nhiều câu truy vấn sau dùng lại."
      }
    ],
    "commonMistakes": [
      "Viết 4 tầng `SELECT ... FROM (SELECT ... FROM (SELECT ...))` lồng nhau khó kiểm lỗi từng tầng."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-181",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt lớp ký tự nhanh `\\d`, `\\w`, `\\s` và phần bù `\\D`, `\\W`, `\\S`.",
    "question": "Giải thích chính xác ý nghĩa của các shorthand `\\d`, `\\w`, `\\s` và viết hoa `\\D`, `\\W`, `\\S` trong Regex; cho biết `\\w` có khớp dấu gạch dưới `_` hoặc chữ tiếng Việt/Tây Ban Nha không?",
    "quickAnswer": "`\\d` = chữ số `[0-9]`; `\\s` = khoảng trắng (` `, `\\t`, `\\n`); `\\w` = ký tự từ (chữ cái Unicode + số + dấu gạch dưới `_` trong Python 3!). Các ký tự viết HOA (`\\D`, `\\W`, `\\S`) là **phủ định tương ứng** (\"không phải số / không phải từ / không phải khoảng trắng\").",
    "explanation": "Chú ý `[^\\W\\d_]` trong `baseline.py:L76`: lấy phần bù của \"không phải từ\" (= ký tự từ), trừ đi chữ số `\\d` và trừ dấu `_` -> thu được CHÍNH XÁC tập hợp chữ cái ngôn ngữ (`a-z`, `á`, `ñ`, `ớ`, ...)!",
    "projectLink": "src/baseline.py:L76",
    "codeLocation": "src/baseline.py:L76",
    "proofExample": "src/baseline.py:L76 & `src/qa.py:L93`.",
    "followUpQuestions": [
      "Trong biểu thức `r\"[^\\d.-]\"`, tại sao không viết gọn thành `r\"\\D\"`?"
    ],
    "followUpQA": [
      {
        "q": "Trong biểu thức `r\"[^\\d.-]\"`, tại sao không viết gọn thành `r\"\\D\"`?",
        "a": "Vì `r\"\\D\"` sẽ xóa sạch CẢ dấu chấm thập phân `.` và dấu trừ `-`, biến `\"$1,250.50\"` thành `\"125050\"` (tăng gấp 100 lần!!)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `\\w` chỉ gồm `a-zA-Z0-9` và bỏ quên dấu `_` hoặc chữ Unicode có dấu."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-182",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Sự khác nhau giữa phân tích **Cross-sectional** (1 snapshot), **Repeated Cross-section** và **Longitudinal Panel**.",
    "question": "Dữ liệu 1.000 listing của Nhóm 4 qua 4 mốc t1–t4 thuộc loại dữ liệu nào và điều đó giúp kết luận điều gì chắc chắn hơn?",
    "quickAnswer": "Thuộc dạng **Balanced Longitudinal Panel (Dữ liệu bảng cân bằng)**: theo dõi ĐÚNG CÙNG MỘT TẬP 1.000 mã `listing_id` cố định tại 4 thời điểm. Ưu điểm lớn nhất: loại bỏ hoàn toàn nhiễu thay đổi cơ cấu thành phần (\"tháng này có thêm 500 căn biệt thự mới mở nên giá tăng\") -> mọi mức tăng +67.3% thực sự đến từ việc **chính các chủ nhà cũ đó điều chỉnh tăng giá**.",
    "explanation": "Tuy nhiên mặt trái là không đo được tỷ lệ gia nhập mới hay rời bỏ thị trường.",
    "projectLink": "reports/report.pdf",
    "codeLocation": "reports/report.pdf",
    "proofExample": "Mục 2.1 `report.pdf` & Context Q&A của dự án.",
    "followUpQuestions": [
      "Làm sao kiểm tra ngay bằng code Python từ `kpi_by_listing.csv` hoặc 4 file `listings.csv` xem mẫu có đúng là Panel cân bằng 100% cùng 1.000 ID không?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao kiểm tra ngay bằng code Python từ `kpi_by_listing.csv` hoặc 4 file `listings.csv` xem mẫu có đúng là Panel cân bằng 100% cùng 1.000 ID không?",
        "a": "Kiểm tra `set(df_t1[\"id\"]) == set(df_t2[\"id\"]) == set(df_t3[\"id\"]) == set(df_t4[\"id\"])` và `len(...) == 1000`."
      }
    ],
    "commonMistakes": [
      "Giải thích nhầm rằng giá tăng +67.3% là do có thêm nhiều căn hộ mới sang trọng hơn gia nhập thị trường ở t4."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vt-183",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Bẫy lỗi cấu trúc `Unparseable Strings` (ví dụ `1.2.3`) và `Missing Column` trong QA.",
    "question": "Nếu một cột văn bản bẩn có ô chứa chuỗi `\"1.2.3\"` hay `\"N/A\"`, hàm làm sạch giá ở `src/qa.py:L93-L96` xử lý qua hai bước nào để đảm bảo không crash?",
    "quickAnswer": "Bước 1: Regex `r\"[^\\d.-]\"` giữ nguyên `\"1.2.3\"`, xóa sạch chữ ở `\"N/A\"` thành `\"\"`.\nBước 2: `pd.to_numeric(..., errors=\"coerce\")` thấy `\"1.2.3\"` có 2 dấu chấm và `\"\"` rỗng không phải số thực hợp lệ -> biến cả hai thành `NaN`, rồi `RULE_MISSING_PRICE` gắn cờ `qa_missing_price = True`.",
    "explanation": "Thể hiện sự phối hợp nhuần nhuyễn giữa Regex tiền xử lý và `pd.to_numeric` kiểm định.",
    "projectLink": "src/qa.py:L91-L97",
    "codeLocation": "src/qa.py:L91-L97",
    "proofExample": "src/qa.py:L91-L97",
    "followUpQuestions": [
      "Ngoài `\"1.2.3\"`, chuỗi `\"10-20\"` (khoảng giá có dấu gạch ngang ở giữa) sau khi qua Regex `r\"[^\\d.-]\"` và `pd.to_numeric(errors=\"coerce\")` cho kết quả gì?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài `\"1.2.3\"`, chuỗi `\"10-20\"` (khoảng giá có dấu gạch ngang ở giữa) sau khi qua Regex `r\"[^\\d.-]\"` và `pd.to_numeric(errors=\"coerce\")` cho kết quả gì?",
        "a": "Vẫn giữ `\"10-20\"` và bị `to_numeric(errors=\"coerce\")` chuyển an toàn thành `NaN` (vì `-` nằm ở giữa không phải dấu âm hợp lệ)."
      }
    ],
    "commonMistakes": [
      "Tự parse chuỗi bằng `float(re.sub(...))` làm văng `ValueError: could not convert string to float: \"1.2.3\"`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-184",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải tại sao `RULE_MISSING_PRICE` kiểm `<= 0` chứ không kiểm `< 0`.",
    "question": "Trên thực tế dữ liệu Airbnb có tồn tại giá `0` USD/MXN không, và tại sao phải loại cả `price == 0` khỏi thống kê giá & PPG?",
    "quickAnswer": "Có thể xuất hiện do lỗi cào hoặc host điền 0 khi đóng băng/chưa cài giá; một đêm lưu trú có giá `0 MXN` là phi lý thương mại trên nền tảng, nếu giữ lại sẽ kéo tụt Q1/Median và tạo tỷ số `PPG = 0`.",
    "explanation": "Do đó điều kiện hợp lệ chuẩn của giá niêm yết bắt buộc là **dương nghiêm ngặt (`price > 0`)**.",
    "projectLink": "src/qa.py:L96; src/kpi.py:L228",
    "codeLocation": "src/qa.py:L96; src/kpi.py:L228",
    "proofExample": "src/qa.py:L96 (`price_numeric.isna() | (price_numeric <= 0)`) & `src/kpi.py:L228`.",
    "followUpQuestions": [
      "Tương tự `accommodates`: nếu một căn ghi `accommodates = 0`, điều gì xảy ra nếu `RULE_ACCOMMODATES_BOUNDS` chỉ kiểm `< 0`?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự `accommodates`: nếu một căn ghi `accommodates = 0`, điều gì xảy ra nếu `RULE_ACCOMMODATES_BOUNDS` chỉ kiểm `< 0`?",
        "a": "Căn đó lọt qua QA và sang hàm `compute_price_and_ppg_kpis()` gây chia cho 0 (`inf` MXN/khách)! Vì vậy phải kiểm `accommodates <= 0`."
      }
    ],
    "commonMistakes": [
      "Chỉ lọc `price.isna()` hoặc `price < 0`, bỏ lọt giá bằng `0.0`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-185",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Quản lý chi phí & giới hạn khi mở rộng Pipeline LLM lên quy mô toàn thành phố (1.72 triệu review).",
    "question": "Nếu một sở du lịch thực sự muốn áp dụng pipeline của Nhóm 4 lên toàn bộ 1.719.730 review ở mốc t4 với chi phí ~$349.11, những thách thức kỹ thuật nào sẽ xảy ra nếu chạy thẳng script `src/llm.py` hiện tại?",
    "quickAnswer": "1. Script tuần tự 1 luồng (`sleep(1s)/batch=5`) chạy ~344.000 batch mất tối thiểu ~4–5 ngày liên tục mới xong và dễ chạm trần RPD free tier hàng ngày;\n2. File `reviews_sentiment.csv` lớn ~750 MB nhưng vẫn trong khả năng pandas;\n3. Giải pháp sản xuất thật phải chuyển sang **Gemini Batch API** (xử lý bất đồng bộ hàng trăm nghìn request trong 24h với giá giảm 50% còn ~$174.55) hoặc lọc bỏ review quá cũ trước năm 2024!",
    "explanation": "Phân tích tính khả mở (Scalability) luôn là câu hỏi phân loại điểm giỏi khi vấn đáp.",
    "projectLink": "reports/llm_cost_estimate.csv; src/llm.py",
    "codeLocation": "reports/llm_cost_estimate.csv; src/llm.py",
    "proofExample": "reports/llm_cost_estimate.csv ($349.1052) & `src/llm.py`.",
    "followUpQuestions": [
      "Khi dùng `batch_size = 5`, số request cần gửi cho `1.719.730` review là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Khi dùng `batch_size = 5`, số request cần gửi cho `1.719.730` review là bao nhiêu?",
        "a": "`ceil(1.719.730 / 5) = 343.946` requests!"
      }
    ],
    "commonMistakes": [
      "Trả lời rằng chỉ cần tăng `batch_size = 500` và chạy 1 luồng trong 10 phút là xong 1.72 triệu review!"
    ],
    "relatedFiles": [
      "reports/llm_cost_estimate.csv"
    ]
  },
  {
    "id": "vt-186",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Evaluation"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải khái niệm Ground Truth Inter-annotator Agreement & Bias nhãn tay.",
    "question": "Nếu hai người trong nhóm tự đọc độc lập cùng 100 bình luận trong `reviews_labeled.csv`, họ có chắc chắn gán giống hệt nhau 100% ở mọi khía cạnh không? Điều này ảnh hưởng gì tới cách đọc kết quả đánh giá?",
    "quickAnswer": "Không bao giờ đạt 100% đồng thuận (thường khoảng 85%–95%) vì ranh giới cảm nhận chủ quan (như `\"cozy\"` có tính là `amenities` không, hay khen 3 ý chê 1 ý là `mixed` hay `negative`?). Chính điều này giải thích tại sao ngay cả khi LLM đạt **93.57%** so với 1 bộ nhãn tay thì một phần sai khác 6.4% đó đến từ vùng xám chủ quan (như đã thấy trong `llm_error_analysis.csv`) chứ không hẳn LLM sai hoàn toàn.",
    "explanation": "Cho thấy tư duy phản biện sâu sắc về bản chất dữ liệu gán nhãn con người.",
    "projectLink": "reports/llm_error_analysis.csv",
    "codeLocation": "reports/llm_error_analysis.csv",
    "proofExample": "reports/llm_error_analysis.csv (11 `sai_nhan`, 21 `thieu`, 14 `thua`).",
    "followUpQuestions": [
      "Làm thế nào để nâng cao độ tin cậy của bộ `ground_truth.csv` nếu thực hiện lại dự án quy mô lớn hơn?"
    ],
    "followUpQA": [
      {
        "q": "Làm thế nào để nâng cao độ tin cậy của bộ `ground_truth.csv` nếu thực hiện lại dự án quy mô lớn hơn?",
        "a": "Xây dựng tài liệu quy tắc gán nhãn chi tiết (Annotation Guidelines có ví dụ biên), để 2 người gán nhãn độc lập rồi đo hệ số đồng thuận **Cohen’s Kappa** và thảo luận chốt ca bất đồng."
      }
    ],
    "commonMistakes": [
      "Coi bộ nhãn tay 100 mẫu như chân lý toán học tuyệt đối không có bất kỳ vùng xám chủ quan nào."
    ],
    "relatedFiles": [
      "reports/llm_error_analysis.csv"
    ]
  },
  {
    "id": "vt-187",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Mối quan hệ giữa Giá niêm yết, Occupancy, Review Velocity và Ghost Supply trong bức tranh tổng thể.",
    "question": "Nếu một khu vực A đồng thời có **PPG tăng +70%**, **Occ_1-30 thấp nhất (34.6%)**, **Review Velocity giảm dần**, nhưng **Ghost Rate = 0%**, bức tranh kinh tế của khu vực A là gì?",
    "quickAnswer": "Khu vực đó KHÔNG phải là khu có listing ảo chết (`Ghost = 0%` chứng minh chủ nhà vẫn mở lịch và có phát sinh review), mà là khu vực chủ nhà **đẩy giá chào quá cao** vượt ngưỡng sẵn sàng chi trả của khách -> dẫn đến dư cung phòng trống ngắn hạn (`Occ_1-30` thấp).",
    "explanation": "Chính là chân dung định lượng của khu vực **A03** tại CDMX trong kỳ báo cáo.",
    "projectLink": "data/processed/kpi_by_area.csv",
    "codeLocation": "data/processed/kpi_by_area.csv",
    "proofExample": "data/processed/kpi_by_area.csv dòng `A03`.",
    "followUpQuestions": [
      "Ngược lại, nếu một khu vực có `Occ_1-30` rất cao (~80%) NHƯNG `Ghost Rate` cũng vọt lên ~40% và `RV = 0`, nguyên nhân là gì?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại, nếu một khu vực có `Occ_1-30` rất cao (~80%) NHƯNG `Ghost Rate` cũng vọt lên ~40% và `RV = 0`, nguyên nhân là gì?",
        "a": "Đó là **ảo giác kín phòng giả** tạo ra bởi những căn hộ đã đóng băng khóa hết lịch (`a365=0`), hoàn toàn không phải do du khách đặt đông!"
      }
    ],
    "commonMistakes": [
      "Đọc riêng lẻ từng chỉ số mà không biết ghép 4 KPI lại để chẩn đoán nguyên nhân vận hành."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_area.csv"
    ]
  },
  {
    "id": "vt-188",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "theory",
    "topics": [
      "Visualization"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của độ phân giải `dpi=150` và `textwrap.fill` trong xuất ảnh báo cáo.",
    "question": "Hàm `_save()` (`src/viz.py:L47-L56`) tự động tính chiều rộng bọc chữ `width = max(85, ...)` và tính khoảng đệm đáy `footer` nhằm mục đích gì?",
    "quickAnswer": "Vì chiều dài caption nguồn & cỡ mẫu giữa 8 biểu đồ khác nhau (có câu 2 dòng, có câu 4 dòng) và chiều rộng các figure dao động từ `10.5` đến `19.5` inches. Tính động `wrapped` + `footer` + `dpi=150` giúp caption không bao giờ tràn ra khỏi mép phải hoặc bị nhãn trục X của biểu đồ phía trên đè lên!",
    "explanation": "Tự động hóa bố cục đẹp mắt mà không cần chỉnh tay từng ảnh bằng Photoshop/Word.",
    "projectLink": "src/viz.py:L47-L56",
    "codeLocation": "src/viz.py:L47-L56",
    "proofExample": "src/viz.py:L47-L56",
    "followUpQuestions": [
      "Trong `_save()`, `dpi=150` biểu thị điều gì và tại sao không để mặc định `dpi=100` hoặc đặt `dpi=600`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `_save()`, `dpi=150` biểu thị điều gì và tại sao không để mặc định `dpi=100` hoặc đặt `dpi=600`?",
        "a": "DPI (Dots Per Inch) quy định độ nét ảnh PNG: `150 DPI` đủ sắc nét rõ chữ khi chèn vào báo cáo PDF/slide trình chiếu mà dung lượng mỗi PNG chỉ gọn 100–500 KB (trong khi `600 DPI` phình tệp gấp 16 lần tốn dung lượng repo)."
      }
    ],
    "commonMistakes": [
      "Hard-code `rect=(0, 0.1, 1, 0.9)` cố định khiến biểu đồ nhiều chú thích bị đè chữ giữa caption và nhãn trục X."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-189",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải tại sao \"tỷ lệ phàn nàn trên lượt nhắc\" (Conditioned) khác \"tỷ lệ phàn nàn trên tổng review\" (Unconditioned).",
    "question": "So sánh 2 con số đều đúng cho khía cạnh `Noise` trong mẫu LLM: **7.3% trên 1.000 review** (`73/1000`) vs **39.0% trên số lượt nhắc Noise** (`73/187`). Khi nào dùng con số nào?",
    "quickAnswer": "- **7.3% (hay 8.14% tại Cuauhtémoc trên tổng 749 review)**: trả lời câu hỏi *\"Trong toàn bộ khách hàng tới quận này, có bao nhiêu % bị làm phiền bởi tiếng ồn?\"* (đo **mức độ phổ biến toàn địa bàn**).\n- **39.0% (73/187 lượt nhắc)**: trả lời *\"Hễ du khách đã nhắc đến vấn đề tiếng ồn, có bao nhiêu % là chê/góp ý chứ không phải khen yên tĩnh?\"* (đo **tỷ lệ rủi ro / mức độ nhạy cảm của riêng yếu tố đó**).",
    "explanation": "Nói sai mẫu số giữa hai đại lượng này rất dễ khiến stakeholder hiểu nhầm quy mô thực tế của vấn đề.",
    "projectLink": "src/kpi.py:L426; reviews_sentiment.csv",
    "codeLocation": "src/kpi.py:L426; reviews_sentiment.csv",
    "proofExample": "src/kpi.py:L426 (tính theo quận trên tổng `N_LLM(k)`) & `reviews_sentiment.csv` (187 lượt nhắc noise).",
    "followUpQuestions": [
      "Tương tự, với `Amenities` (136 điểm trừ / 622 lượt nhắc = 21.9%; nhưng tính trên 1.000 review là 13.6%), tại sao tổng số review chê Amenities (136) nhiều gấp đôi Noise (73) nhưng tỷ lệ trên lượt nhắc lại thấp hơn (21.9% vs 39.0%)?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự, với `Amenities` (136 điểm trừ / 622 lượt nhắc = 21.9%; nhưng tính trên 1.000 review là 13.6%), tại sao tổng số review chê Amenities (136) nhiều gấp đôi Noise (73) nhưng tỷ lệ trên lượt nhắc lại thấp hơn (21.9% vs 39.0%)?",
        "a": "Vì `Amenities` (giường, wifi, bếp, nước nóng...) là chủ đề khách nhắc tới ở hơn 62% bình luận (cả khen lẫn chê), trong khi `Noise` ít được khen nếu bình thường mà chủ yếu chỉ được nhắc tới khi thật sự yên tĩnh hoặc ồn khó chịu!"
      }
    ],
    "commonMistakes": [
      "Nói \"39% du khách ở Mexico City phàn nàn về tiếng ồn\" (thực ra chỉ là 7.3% tổng khách, nhưng tới 39% số người nhắc đến tiếng ồn!)."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-190",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của `encoding=\"utf-8\", errors=\"replace\"` ở sys.stdout.",
    "question": "Tham số `errors=\"replace\"` khi cấu hình UTF-8 stdout giải quyết lỗi gì nếu lỡ có ký tự emoji bị hỏng mã?",
    "quickAnswer": "Thay vì văng ngoại lệ `UnicodeEncodeError`, Python thay ký tự không giải mã/mã hóa được bằng dấu `?` (U+FFFD) để log tiến độ không bị gián đoạn.",
    "explanation": "Giúp lệnh in tiến độ `print()` an toàn tuyệt đối.",
    "projectLink": "src/kpi.py:L14",
    "codeLocation": "src/kpi.py:L14",
    "proofExample": "src/kpi.py:L14; `src/qa.py:L17`.",
    "followUpQuestions": [
      "Tại sao khi LƯU DỮ LIỆU vào file CSV/JSONL lại KHÔNG dùng `errors=\"replace\"` mà giữ nguyên UTF-8 chuẩn?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao khi LƯU DỮ LIỆU vào file CSV/JSONL lại KHÔNG dùng `errors=\"replace\"` mà giữ nguyên UTF-8 chuẩn?",
        "a": "Vì file cần bảo toàn nguyên vẹn từng ký tự dữ liệu gốc (`Cuauhtémoc`, `¿`, emoji), chỉ dùng `errors=\"replace\"` cho luồng in log ra màn hình console."
      }
    ],
    "commonMistakes": [
      "Để mặc định `errors=\"strict\"` gây crash khi in review chứa emoji lạ trên terminal Windows."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-191",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích của tách hàm nhỏ (Single Responsibility) và đặt tên hàm bắt đầu bằng `_`.",
    "question": "Quy ước đặt dấu gạch dưới `_` ở đầu tên hàm (như `_normalise_id`, `_qa_flag`, `_iqr_stats`, `_centroid`) trong Python biểu thị điều gì?",
    "quickAnswer": "Biểu thị **hàm phụ trợ nội bộ (private helper)** của module đó — hàm phục vụ tái sử dụng logic gọn gàng cho các hàm công khai chính trong cùng tệp, không thiết kế như API chính gọi từ bên ngoài.",
    "explanation": "Giúp người đọc code lập tức phân biệt đâu là hàm pipeline chính (`compute_*`, `plot_*`) và đâu là hàm tiện ích hỗ trợ (`_*`).",
    "projectLink": "src/kpi.py:L60-L91; src/viz.py:L30-L105",
    "codeLocation": "src/kpi.py:L60-L91; src/viz.py:L30-L105",
    "proofExample": "Toàn bộ 8 tệp trong `src/` tuân theo quy ước PEP 8 này.",
    "followUpQuestions": [
      "Dấu `_` ở đầu tên hàm có chặn tuyệt đối file khác `import` nó không, hay chỉ là quy ước?"
    ],
    "followUpQA": [
      {
        "q": "Dấu `_` ở đầu tên hàm có chặn tuyệt đối file khác `import` nó không, hay chỉ là quy ước?",
        "a": "Chỉ là quy ước (trừ khi dùng `from module import *` thì hàm bắt đầu bằng `_` sẽ không được import tự động; nếu import trực tiếp tên vẫn gọi được bình thường)."
      }
    ],
    "commonMistakes": [
      "Viết lặp đi lặp lại cùng 10 dòng tính Q1/Median/IQR/rIQR ở 4 chỗ khác nhau thay vì tách thành `_iqr_stats()`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-192",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của hàm `np.vstack()` và điều kiện số cột khi nối nhiều đa giác.",
    "question": "Trong `np.vstack([r for _, rings in features for r in rings])` (`src/viz.py:L214`), điều kiện bắt buộc để `np.vstack` không ném `ValueError` là gì?",
    "quickAnswer": "Mọi mảng `r` đưa vào xếp dọc bắt buộc phải có **cùng số cột** (chiều thứ 2 bằng `2`, tương ứng cặp tọa độ `(lon, lat)`).",
    "explanation": "Nhờ hàm `_load_geojson()` lọc chuẩn `len(r) >= 3` cho từng ring tọa độ 2D nên `np.vstack` luôn ghép chuẩn xác thành mảng `(K, 2)`.",
    "projectLink": "src/viz.py:L87, L214",
    "codeLocation": "src/viz.py:L87, L214",
    "proofExample": "src/viz.py:L87, L214.",
    "followUpQuestions": [
      "Hàm tương ứng để xếp chồng mảng theo chiều ngang (ghép cột) trong NumPy là gì?"
    ],
    "followUpQA": [
      {
        "q": "Hàm tương ứng để xếp chồng mảng theo chiều ngang (ghép cột) trong NumPy là gì?",
        "a": "`np.hstack()` hoặc `np.column_stack()`."
      }
    ],
    "commonMistakes": [
      "Để lọt ring rỗng hoặc tọa độ 3D `(lon, lat, alt)` lẫn với 2D `(lon, lat)` vào cùng `np.vstack`."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-193",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt `np.round()` (NumPy) và `Series.round()` và lỗi làm tròn nhị phân.",
    "question": "Tại sao `round(2.675, 2)` trong Python đôi khi cho `2.67` thay vì `2.68`?",
    "quickAnswer": "Do hai nguyên nhân: (1) Số thực nhị phân IEEE 754 không biểu diễn chính xác `2.675` (`2.6749999999...`); (2) Python/NumPy áp dụng quy tắc làm tròn ngân hàng **Round-half-to-even** (làm tròn về số chẵn gần nhất khi đúng giữa .5 để triệt tiêu sai số tích lũy thống kê).",
    "explanation": "Cũng tương tự lý do tại sao `kpi_by_snapshot.csv` làm tròn độc lập `occ_1-30`, `occ_31-90` và `urgency_gap` từ bản float đầy đủ (`0.4849 - 0.3182 = 0.1667` nhưng CSV ghi `0.1668`).",
    "projectLink": "src/kpi.py:L203-L205",
    "codeLocation": "src/kpi.py:L203-L205",
    "proofExample": "src/kpi.py:L66, L203-L205 & `kpi_by_snapshot.csv` dòng t1.",
    "followUpQuestions": [
      "Để tránh sai số làm tròn tích lũy trong tính toán tài chính hay khoa học, nguyên tắc chung là làm tròn ở bước nào?"
    ],
    "followUpQA": [
      {
        "q": "Để tránh sai số làm tròn tích lũy trong tính toán tài chính hay khoa học, nguyên tắc chung là làm tròn ở bước nào?",
        "a": "Giữ nguyên `float64` đầy đủ trong toàn bộ phép tính trung gian, CHỈ gọi `.round()` ở bước xuất bảng báo cáo cuối cùng."
      }
    ],
    "commonMistakes": [
      "Lấy hai số đã làm tròn trên báo cáo trừ lại cho nhau rồi hoảng hốt tưởng code trừ sai khi lệch 0.0001."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-194",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `df.iloc[-1]` và `df.tail(1)` khi lấy dòng snapshot cuối.",
    "question": "Trong `src/viz.py:L109`, dòng `final = snap.iloc[-1]` trả về `Series` hay `DataFrame`, khác gì với `snap.tail(1)`?",
    "quickAnswer": "`snap.iloc[-1]` trả về một **`Series`** 1 chiều đại diện cho đúng hàng cuối cùng (truy cập trực tiếp `final[\"snapshot\"]`, `final[\"median_ppg\"]` thành giá trị đơn); còn `snap.tail(1)` trả về **`DataFrame`** 2 chiều 1 hàng!",
    "explanation": "Khi cần đọc các thuộc tính tổng hợp của mốc cuối `t4` để ghép tiêu đề biểu đồ, `.iloc[-1]` rất gọn tiện.",
    "projectLink": "src/viz.py:L109",
    "codeLocation": "src/viz.py:L109",
    "proofExample": "src/viz.py:L109, L200, L302.",
    "followUpQuestions": [
      "Điều kiện nào phải đảm bảo trước khi gọi `snap.iloc[-1]`?"
    ],
    "followUpQA": [
      {
        "q": "Điều kiện nào phải đảm bảo trước khi gọi `snap.iloc[-1]`?",
        "a": "`snap` không được rỗng (nếu rỗng ném `IndexError: single positional indexer is out-of-bounds`) — đã được `_read_kpi()` kiểm tra từ trước!"
      }
    ],
    "commonMistakes": [
      "Viết `final = snap.tail(1)` rồi gọi `str(final[\"snapshot\"])` khiến tiêu đề ảnh in ra cả số index và `Name: snapshot, dtype: object`!"
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-195",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Cơ chế `keep=\"first\" | \"last\" | False` và so sánh `.duplicated()` vs `.drop_duplicates()`.",
    "question": "Sự khác biệt giữa gọi `df.drop_duplicates(subset=[\"id\"], keep=\"first\")` ngay từ đầu vs tạo mặt nạ `dup_mask = df.duplicated(...)` rồi lọc `~dup_mask` ở `src/qa.py:L62-L67`?",
    "quickAnswer": "Tạo `dup_mask = df.duplicated(...)` cho phép **đếm chính xác `num_dups = int(dup_mask.sum())`** để ghi lại số dòng bị xóa vào `qa_report.csv` trước khi thực sự lọc giữ `df = df.loc[~dup_mask].copy()`. Gọi thẳng `drop_duplicates()` sẽ không đếm được ngay nếu không đo hiệu độ dài.",
    "explanation": "Đây là lý do nhất quán với mục tiêu kiểm toán tác động QA.",
    "projectLink": "src/qa.py:L62-L68",
    "codeLocation": "src/qa.py:L62-L68",
    "proofExample": "src/qa.py:L62-L68.",
    "followUpQuestions": [
      "Nếu có 3 dòng giống hệt nhau về `[id, last_scraped]`, giá trị `dup_mask.sum()` bằng bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Nếu có 3 dòng giống hệt nhau về `[id, last_scraped]`, giá trị `dup_mask.sum()` bằng bao nhiêu?",
        "a": "Bằng **`2`** (dòng thứ 1 là `False` được giữ lại, dòng thứ 2 và thứ 3 đều là `True` bị loại -> đúng số dòng dư bị xóa)."
      }
    ],
    "commonMistakes": [
      "Gọi `df.drop_duplicates()` không lưu biến trung gian khiến không thể ghi `rows_affected` vào báo cáo QA."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-196",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lọc và cập nhật từng nhánh bằng `.loc` vs `np.select` và hiệu năng.",
    "question": "Tại sao `compute_kpi_by_neighbourhood()` lại lặp qua danh sách 15 quận `for n in all_neighs:` để tính `_iqr_stats()` thay vì viết một lệnh `.groupby().agg()` duy nhất?",
    "quickAnswer": "Vì cần tính đồng thời tới 10 chỉ số cho mỗi mốc (`valid_price`, `mean`, `median`, `iqr`, `riqr`, `valid_ppg`, ...) qua cả 4 mốc (`40` cột) kèm điều kiện guard `_iqr_stats()` cho quận thiếu giá như `t2`; tách dict `groups = {str(k): g for k, g in ...}` chỉ chạy `groupby` MỘT LẦN duy nhất rồi duyệt 15 nhóm rất nhanh và code cực kỳ tường minh.",
    "explanation": "Trên 15 quận × 4 mốc = 60 lần gọi trên vài trăm phần tử mất chưa tới 5 mili-giây!",
    "projectLink": "src/kpi.py:L431-L453",
    "codeLocation": "src/kpi.py:L431-L453",
    "proofExample": "src/kpi.py:L431-L453.",
    "followUpQuestions": [
      "Trong `L431`, truyền `dropna=True` cho `groupby(neigh_key, dropna=True)` khác gì `L286` (`dropna=False` cho `analysis_area`)?"
    ],
    "followUpQA": [
      {
        "q": "Trong `L431`, truyền `dropna=True` cho `groupby(neigh_key, dropna=True)` khác gì `L286` (`dropna=False` cho `analysis_area`)?",
        "a": "`analysis_area` là cột bắt buộc do phân công gắn vào nên dùng `dropna=False` để phát hiện ngay nếu có căn bị sót khu vực; còn tên quận hành chính dùng `dropna=True` chỉ nhóm 15 quận hợp lệ."
      }
    ],
    "commonMistakes": [
      "Lặp lại phép `kpi_by_listing[kpi_by_listing[\"neighbourhood\"] == n]` 60 lần gây lọc lại toàn bảng nhiều lần."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-197",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt cấu trúc JSON thông thường và JSON Lines (`.jsonl`) khi đọc từng bản ghi lớn.",
    "question": "Khi tập kết quả LLM mở rộng lên 1 triệu review (~300 MB), tại sao đọc cả mảng JSON chuẩn `[...]` nặng nề hơn JSON Lines (`.jsonl`)?",
    "quickAnswer": "Mảng JSON `[...]` bắt buộc parser đọc trọn vẹn toàn bộ 300 MB vào cấu trúc cây bộ nhớ cùng lúc mới phân giải được phần tử đầu tiên (hoặc lỗi toàn bộ nếu thiếu dấu `]` ở cuối). Còn `.jsonl` là luồng độc lập từng dòng nên có thể đọc streaming từng dòng với RAM O(1), dừng/tiếp tục giữa chừng không hỏng tệp.",
    "explanation": "Chuẩn công nghiệp cho lưu trữ log và dữ liệu suy luận LLM hàng loạt.",
    "projectLink": "src/llm.py:L97-L120",
    "codeLocation": "src/llm.py:L97-L120",
    "proofExample": "data/processed/llm_cache.jsonl & `src/llm.py:L97-L120`.",
    "followUpQuestions": [
      "Lệnh `json.dumps(record, ensure_ascii=False) + \"\\n\"` tạo một bản ghi `.jsonl` hợp lệ khi thỏa điều kiện gì bên trong `record`?"
    ],
    "followUpQA": [
      {
        "q": "Lệnh `json.dumps(record, ensure_ascii=False) + \"\\n\"` tạo một bản ghi `.jsonl` hợp lệ khi thỏa điều kiện gì bên trong `record`?",
        "a": "Không được chứa ký tự xuống dòng thật chưa escape bên trong chuỗi JSON — `json.dumps()` tự động thoát mọi xuống dòng bên trong chuỗi thành chuỗi `\\n` 2 ký tự nên mỗi JSON luôn nằm gọn trên ĐÚNG 1 dòng vật lý!"
      }
    ],
    "commonMistakes": [
      "Lưu kết quả trung gian của API LLM dạng file `.json` một mảng lớn khiến mất trắng nếu cúp điện ở batch cuối."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-198",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa cơ chế xác thực qua HTTP Header vs tham số URL.",
    "question": "Trong thực tế bảo mật API (như Google Gemini), tại sao API Key được gửi qua HTTP Header (`x-goog-api-key`) chứ không ghép trực tiếp vào URL query string như `?key=...`?",
    "quickAnswer": "URL query string thường bị ghi lại công khai trong access log của proxy, router mạng, nhật ký lỗi hay lịch sử trình duyệt; trong khi HTTP Headers được mã hóa nằm bên trong kênh TLS (HTTPS) bảo mật cao hơn nhiều.",
    "explanation": "SDK `google-genai` trong `init_client()` tự động gửi `GEMINI_API_KEY` qua header bảo mật chuẩn.",
    "projectLink": "src/llm.py:L197-L204",
    "codeLocation": "src/llm.py:L197-L204",
    "proofExample": "src/llm.py:L197-L204.",
    "followUpQuestions": [
      "Trong `src/llm.py:L408-L428`, nếu người dùng truyền `--skip-llm`, hàm có gọi `os.getenv(\"GEMINI_API_KEY\")` hay `init_client()` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/llm.py:L408-L428`, nếu người dùng truyền `--skip-llm`, hàm có gọi `os.getenv(\"GEMINI_API_KEY\")` hay `init_client()` không?",
        "a": "Không! Nhánh `if args.skip_llm:` chạy thẳng sang `export_cache_to_csv()` mà không kiểm tra biến môi trường API key."
      }
    ],
    "commonMistakes": [
      "Ghép API key lên URL hoặc in thẳng giá trị `api_key` ra console bằng `print()`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-199",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do dùng ranh giới từ `\\b` cho `clean` nhưng xử lý khác cho hậu kiểm `TU_KHOA`.",
    "question": "So sánh danh sách pattern của `ASPECT_PATTERNS` trong `src/baseline.py:L22-L30` và `TU_KHOA` trong `src/evaluate.py:L33-L41`. Điểm khác biệt chính về thiết kế là gì?",
    "quickAnswer": "`ASPECT_PATTERNS` trong `baseline.py` bọc `\\b(?:...)\\b` chặt chẽ hơn và phân tách cả chuỗi mệnh đề phủ định `BENIGN_RE`/`NEG_RE` để làm bộ phân loại đối chứng; còn `TU_KHOA` trong `evaluate.py` là tập tiền tố mở không neo `\\b` (vd `\"locat\"`, `\"amenit\"`, `\"nois\"`, chỉ thêm `\\ba/?c\\b` cho AC) nhằm quét rộng tối đa các gốc từ làm căn cứ cảnh báo hậu kiểm.",
    "explanation": "Dù vậy, `TU_KHOA` vẫn không bắt được các cách khen gián tiếp như `\"felt like home\"` hay `\"slept like a baby\"`.",
    "projectLink": "src/baseline.py:L22; src/evaluate.py:L33",
    "codeLocation": "src/baseline.py:L22; src/evaluate.py:L33",
    "proofExample": "src/baseline.py:L22-L30 vs `src/evaluate.py:L33-L41`.",
    "followUpQuestions": [
      "Tại sao riêng từ khóa `\"a/?c\"` trong `TU_KHOA[\"amenities\"]` lại BẮT BUỘC đặt `\\b` ở hai đầu (`r\"\\ba/?c\\b\"`)?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao riêng từ khóa `\"a/?c\"` trong `TU_KHOA[\"amenities\"]` lại BẮT BUỘC đặt `\\b` ở hai đầu (`r\"\\ba/?c\\b\"`)?",
        "a": "Vì chữ `\"ac\"` 2 ký tự không có `\\b` sẽ khớp nhầm với hàng nghìn từ tiếng Anh thông thường như `\"place\"`, `\"beach\"`, `\"spacious\"`, `\"back\"`, `\"access\"`!"
      }
    ],
    "commonMistakes": [
      "Nhầm lẫn `TU_KHOA` trong `evaluate.py` chính là bộ luật chạy mô hình Baseline!"
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-200",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `pd.to_datetime()` với tham số `errors=\"raise\" | \"coerce\"`.",
    "question": "Sự khác nhau khi parse cột ngày có chứa chuỗi lỗi `\"2026-99-99\"` giữa `pd.to_datetime(s)` (mặc định `errors=\"raise\"`) và `pd.to_datetime(s, errors=\"coerce\")`?",
    "quickAnswer": "Mặc định `errors=\"raise\"` làm sập ngay cả hàm QA với `ValueError: month must be in 1..12` chỉ vì 1 dòng rác; còn `errors=\"coerce\"` chuyển dòng rác thành `pd.NaT` để QA đếm được chính xác bao nhiêu dòng hỏng ngày trong toàn bảng.",
    "explanation": "Toàn bộ bước kiểm tra ngày `RULE_LAST_REVIEW_VALIDITY` dựa trên `errors=\"coerce\"`.",
    "projectLink": "src/qa.py:L279",
    "codeLocation": "src/qa.py:L279",
    "proofExample": "src/qa.py:L279, L283.",
    "followUpQuestions": [
      "Khi chạy `pd.to_datetime(snap)` trong `src/qa.py:L281` với `snapshot` đọc từ cấu hình YAML, tại sao lại KHÔNG dùng `errors=\"coerce\"`?"
    ],
    "followUpQA": [
      {
        "q": "Khi chạy `pd.to_datetime(snap)` trong `src/qa.py:L281` với `snapshot` đọc từ cấu hình YAML, tại sao lại KHÔNG dùng `errors=\"coerce\"`?",
        "a": "Vì `snapshot` trong config là đầu vào cấu hình hệ thống: nếu người dùng gõ sai ngày trong YAML thì cần dừng ngay báo lỗi (`fail-fast`) chứ không được biến ngày snapshot thành `NaT`!"
      }
    ],
    "commonMistakes": [
      "Gọi `pd.to_datetime(df[\"last_review\"])` không truyền `errors=\"coerce\"` rồi tin rằng dữ liệu thực không bao giờ có ngày sai format."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-201",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Lý do tách riêng `qa_missing_price` và `qa_price_outlier` thành 2 cột cờ độc lập.",
    "question": "Tại sao giá bị `NaN` hay `<= 0` được gắn `qa_missing_price = True` còn giá quá thấp/quá cao hợp lệ (`< P01` hoặc `> P99`) gắn `qa_price_outlier = True`, mà không gộp chung thành 1 cột cờ `qa_bad_price`?",
    "quickAnswer": "Vì hành động xử lý ở tầng KPI của hai cờ là **TRÁI NGƯỢC NHAU**: cờ `qa_missing_price` bị **LOẠI BỎ** khỏi phép tính trung vị/trung bình/PPG (`~_qa_flag(df, \"qa_missing_price\")`), còn cờ `qa_price_outlier` được **GIỮ LẠI** để đo phân bố thực và chỉ dùng cho giải trình/đối chứng độ nhạy Mean vs Median.",
    "explanation": "Gộp chung 2 cờ sẽ ép `kpi.py` hoặc phải bỏ luôn các căn đầu cơ giá cao hoặc để lọt giá 0 MXN!",
    "projectLink": "src/qa.py:L96-L146",
    "codeLocation": "src/qa.py:L96-L146",
    "proofExample": "src/qa.py:L96-L146; `src/kpi.py:L228`.",
    "followUpQuestions": [
      "Một căn hộ có `price_mxn = -100` (giá âm sai) có bị gắn thêm cờ `qa_price_outlier = True` ở dòng 146 `src/qa.py` không?"
    ],
    "followUpQA": [
      {
        "q": "Một căn hộ có `price_mxn = -100` (giá âm sai) có bị gắn thêm cờ `qa_price_outlier = True` ở dòng 146 `src/qa.py` không?",
        "a": "KHÔNG! Dòng 146 nhân thêm mặt nạ `(~missing_price_mask) & ...` nên các ô thiếu/<=0 chỉ nhận `qa_missing_price = True` và `qa_price_outlier = False`, không đếm trùng."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng tất cả cột có tiền tố `qa_*` đều sẽ bị `src/kpi.py` lọc loại bỏ hết."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-202",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải 4 quy tắc kiểm soát nhất quán trong `build_batch_prompt()` và rủi ro bỏ qua hướng dẫn.",
    "question": "Nếu xóa dòng hướng dẫn về lớp `mixed` (\"góp ý bất tiện dù nhẹ như nước nóng chậm, ồn nhẹ, cầu thang...\") ra khỏi `build_batch_prompt()`, kết quả của LLM trên `ground_truth.csv` thay đổi thế nào?",
    "quickAnswer": "LLM có xu hướng thân thiện gộp nhiều câu khen 90% chê 10% thành **`positive`** (giống lỗi hay gặp ở hệ thống chấm sao 5/5). Điều đó sẽ làm Recall lớp `mixed` sụt mạnh, kéo `cam_xuc_macro_f1` giảm sâu và giấu mất phần lớn phản ánh của du khách ở `complaint_mixed_*`!",
    "explanation": "Ví dụ cụ thể về các bất tiện nhỏ ngay trong prompt giúp chuẩn hóa ranh giới giữa LLM và tiêu chí gán nhãn tay của người chấm.",
    "projectLink": "src/llm.py:L212-L214",
    "codeLocation": "src/llm.py:L212-L214",
    "proofExample": "src/llm.py:L212-L214.",
    "followUpQuestions": [
      "Trong prompt `L215`, quy tắc `\"chỉ gán khi câu văn nhắc trực tiếp, không suy diễn\"` xử lý tình huống review ghi `\"5 stars!\"` ngắn gọn ra sao?"
    ],
    "followUpQA": [
      {
        "q": "Trong prompt `L215`, quy tắc `\"chỉ gán khi câu văn nhắc trực tiếp, không suy diễn\"` xử lý tình huống review ghi `\"5 stars!\"` ngắn gọn ra sao?",
        "a": "Gán `overall_sentiment = \"positive\"`, còn toàn bộ 7 khía cạnh (`location`, `cleanliness`, `host`, ...) phải giữ là `\"not_mentioned\"` vì không nhắc cụ thể tới yếu tố nào."
      }
    ],
    "commonMistakes": [
      "Viết prompt siêu ngắn kiểu \"Classify sentiment positive/mixed/negative\" mà không định nghĩa ranh giới rõ cho lớp `mixed`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-203",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Evaluation"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý do tách riêng `Accuracy`, `Macro F1` và `Weighted F1` trong báo cáo khoa học.",
    "question": "Khi báo cáo hiệu quả phân loại trên tập dữ liệu 100 mẫu có tỷ lệ `73 positive : 25 mixed : 2 negative`, tại sao phải trình bày cả 3 số `Accuracy`, `Weighted F1` và `Macro F1`?",
    "quickAnswer": "- `Accuracy` cho cái nhìn trực giác tổng thể bao nhiêu % câu đúng;\n- `Weighted F1` cân bằng độ chính xác theo đúng tỷ trọng lưu lượng thực tế xuất hiện trên thị trường;\n- `Macro F1` là thước đo khắc nghiệt nhất ép mô hình phải làm tốt ĐỀU ở cả 3 lớp kể cả `mixed` và `negative`. Chỉ khi cả 3 chỉ số cùng cao (như LLM: 0.99 / 0.9899 / 0.9909) mới khẳng định được mô hình vượt trội thực sự.",
    "explanation": "Báo cáo mỗi Accuracy = 0.85 của Baseline sẽ gây hiểu lầm cực lớn.",
    "projectLink": "reports/evaluation_report.csv",
    "codeLocation": "reports/evaluation_report.csv",
    "proofExample": "reports/evaluation_report.csv & `src/evaluate.py:L129-L143`.",
    "followUpQuestions": [
      "Khi mô hình đoán đúng 100% lớp đa số và đoán sai 100% lớp thiểu số, thứ tự lớn nhỏ giữa `Accuracy`, `Weighted F1` và `Macro F1` thường thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Khi mô hình đoán đúng 100% lớp đa số và đoán sai 100% lớp thiểu số, thứ tự lớn nhỏ giữa `Accuracy`, `Weighted F1` và `Macro F1` thường thế nào?",
        "a": "`Accuracy > Weighted F1 >> Macro F1` (chênh lệch lớn giữa `Accuracy` và `Macro F1` chính là dấu hiệu cảnh báo mất cân bằng lớp!)."
      }
    ],
    "commonMistakes": [
      "Báo cáo mỗi Weighted F1 (0.8316) của Baseline và kết luận Baseline gần ngang ngửa LLM."
    ],
    "relatedFiles": [
      "reports/evaluation_report.csv"
    ]
  },
  {
    "id": "vt-204",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Tại sao `kpi_by_listing.csv` giữ 1.000 dòng theo chiều rộng (`t1..t4`) thay vì 4.000 dòng chiều dọc.",
    "question": "Lợi ích kỹ thuật và phân tích của cấu trúc bảng ngang 1.000 dòng `kpi_by_listing.csv` (mỗi snapshot là một nhóm hậu tố `_t1.._t4`) là gì?",
    "quickAnswer": "1. **Mỗi dòng là một thực thể căn hộ duy nhất** -> nhìn ngang một hàng lập tức thấy trọn lịch sử 4 quý của đúng căn đó (ppg_t1 -> ppg_t3 -> ppg_t4, ghost_t1..t4, RV Q1..Q3);\n2. Đọc vào Tableau/Excel/pandas lọc tỷ lệ căn tăng giá > 2x hay so sánh `ppg_t4 / ppg_t1` chỉ bằng một phép chia 2 cột đơn giản;\n3. Khớp 1-1 ngay khi ghép dữ liệu trải nghiệm quận.",
    "explanation": "Rất tối ưu cho phân tích cohort cố định 1.000 căn hộ.",
    "projectLink": "src/kpi.py:L255-L276",
    "codeLocation": "src/kpi.py:L255-L276",
    "proofExample": "src/kpi.py:L255-L276 (`build_kpi_by_listing`).",
    "followUpQuestions": [
      "Nhược điểm của định dạng Wide (`ppg_t1..ppg_t4`) khi muốn mở rộng từ 4 snapshot lên 20 snapshot là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nhược điểm của định dạng Wide (`ppg_t1..ppg_t4`) khi muốn mở rộng từ 4 snapshot lên 20 snapshot là gì?",
        "a": "Số lượng cột sẽ phình rất rộng (20 × số KPI ~ 160 cột); ở quy mô 20 quý người ta thường lưu bảng sự kiện Long `(id, snapshot, ppg, occ, ...)` rồi pivot khi cần."
      }
    ],
    "commonMistakes": [
      "Lưu bảng dọc 4.000 dòng rồi quên `groupby(snapshot)` khi vẽ scatter, làm 1 căn hộ bị đếm lặp tới 4 lần!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-205",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Ý nghĩa khuyến nghị của việc phát hiện đỉnh `Occ30` rơi vào Semana Santa (`t3`) thay vì World Cup (`t4`).",
    "question": "Tại sao phát hiện đỉnh `Occ_1-30` (48.47%) và `Urgency Gap` (+21.38 pp) ở mốc `t3` (Semana Santa) cao hơn mốc `t4` (15/06 World Cup) lại quan trọng đối với chiến lược truyền thông và quản lý của SECTUR CDMX?",
    "quickAnswer": "Bởi vì truyền thông thường chỉ tập trung báo động quá tải phòng trước tháng 6 (World Cup), nhưng dữ liệu chứng minh hai điều bất ngờ: (1) Kỳ nghỉ lễ nội địa truyền thống Semana Santa cuối tháng 3 vốn đã tạo sức ép đặt phòng sát ngày khốc liệt hơn (`+21.38 pp`), và (2) Đến tháng 6, mức tăng giá quá đà (+67.3% median, riêng A03 +70.1%) đi kèm dấu hiệu tỷ lệ lấp đầy hạ nhiệt xuống 44.5% -> SECTUR cần giám sát thị trường sớm từ quý 1 và cảnh báo hiện tượng đẩy giá vượt sức mua.",
    "explanation": "Insight phản trực giác (counter-intuitive insight) có giá trị hành động cao nhất theo Bài 14.",
    "projectLink": "kpi_by_snapshot.csv; figures/kpi_occupancy_gap.png",
    "codeLocation": "kpi_by_snapshot.csv; figures/kpi_occupancy_gap.png",
    "proofExample": "kpi_by_snapshot.csv & `figures/kpi_occupancy_gap.png`.",
    "followUpQuestions": [
      "Đứng ở góc độ phản biện khoa học, tại sao cũng cần thận trọng rằng ngày chụp `t4` là `2026-06-15` (4 ngày sau trận khai mạc Estadio Azteca `11/06/2026`)?"
    ],
    "followUpQA": [
      {
        "q": "Đứng ở góc độ phản biện khoa học, tại sao cũng cần thận trọng rằng ngày chụp `t4` là `2026-06-15` (4 ngày sau trận khai mạc Estadio Azteca `11/06/2026`)?",
        "a": "Đúng! Cửa sổ 30 ngày của `t4` là `15/06 – 15/07` (bao trùm cả giai đoạn sau khi một số đội/khách đầu giải về nước hoặc chuyển thành phố khác), trong khi trận khai mạc 11/06 đã trôi qua — nên không đo trọn vẹn đỉnh ngày khai mạc 11/06!"
      }
    ],
    "commonMistakes": [
      "Vẫn mặc nhiên phát biểu trong báo cáo rằng \"dịp World Cup t4 đạt độ kín lịch cao nhất trong năm\"."
    ],
    "relatedFiles": [
      "kpi_by_snapshot.csv"
    ]
  },
  {
    "id": "vt-206",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải tầm quan trọng của việc tách biệt `configs/`, `src/`, `data/`, `reports/`, `figures/`.",
    "question": "Nếu một sinh viên muốn tái sử dụng trọn bộ 8 script Python của Nhóm 4 để phân tích thành phố **Barcelona** (EUR), sinh viên đó cần tạo/thay đổi những gì?",
    "quickAnswer": "1. Tạo `configs/barcelona.yaml` với `city: barcelona`, `data_root: spain/catalonia/barcelona`, `currency: EUR`, 4 mốc snapshot của Barcelona và thông tin `assignment`;\n2. Truyền `--config configs/barcelona.yaml` vào `run_pipeline.py`;\n3. Lưu ý kiểm tra định dạng dấu thập phân chuỗi giá ở Tây Ban Nha xem có dùng `,` thập phân hay `.` thập phân để điều chỉnh Regex ở `qa.py` nếu cần!",
    "explanation": "Đây là bài kiểm tra cuối cùng cho tính tổng quát hóa kiến trúc (Rubric A2).",
    "projectLink": "configs/mexico-city.yaml; run_pipeline.py",
    "codeLocation": "configs/mexico-city.yaml; run_pipeline.py",
    "proofExample": "Toàn bộ hệ thống config-driven của BTL Nhóm 4.",
    "followUpQuestions": [
      "Cột giá đầu ra của `qa.py` và `kpi.py` khi chạy với `currency: EUR` sẽ tự đổi tên thành gì?"
    ],
    "followUpQA": [
      {
        "q": "Cột giá đầu ra của `qa.py` và `kpi.py` khi chạy với `currency: EUR` sẽ tự đổi tên thành gì?",
        "a": "Nhờ hàm `_price_col(config)` (`L87` của `kpi.py` và tương ứng trong `qa.py`), tên cột tự đổi động thành **`price_eur`** thay cho `price_mxn`!"
      }
    ],
    "commonMistakes": [
      "Nói \"chỉ cần sửa tên thành phố trong YAML là chạy được ở mọi nơi trên thế giới\" mà quên kiểm tra bẫy dấu thập phân châu Âu ở `qa.py:L93`!"
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vt-207",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "Python"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `os.path.join` và dấu `/` của `pathlib.Path`.",
    "question": "Tại sao trong `pathlib.Path`, toán tử `/` (`PROJECT_ROOT / \"data\" / \"raw\"`) lại hoạt động chuẩn trên Windows vốn dùng dấu `\\`?",
    "quickAnswer": "`pathlib.Path` nạp chồng toán tử `__truediv__` (`/`) để tự động chuyển đổi sang dấu phân cách chuẩn của hệ điều hành đang chạy (`WindowsPath` dùng `\\`, `PosixPath` dùng `/`).",
    "explanation": "Tránh hoàn toàn lỗi nối chuỗi thủ công gây kẹt đường dẫn chéo hệ điều hành.",
    "projectLink": "src/kpi.py:L100",
    "codeLocation": "src/kpi.py:L100",
    "proofExample": "run_pipeline.py:L23; `src/kpi.py:L100`.",
    "followUpQuestions": [
      "Cú pháp `PROJECT_ROOT / cfg` hoạt động thế nào nếu `cfg` đã là một `Path` tuyệt đối như `C:\\tmp\\a.yaml`?"
    ],
    "followUpQA": [
      {
        "q": "Cú pháp `PROJECT_ROOT / cfg` hoạt động thế nào nếu `cfg` đã là một `Path` tuyệt đối như `C:\\tmp\\a.yaml`?",
        "a": "Trong `pathlib`, khi vế phải là đường dẫn tuyệt đối, phép `/` tự trả về đúng vế phải (`C:\\tmp\\a.yaml`); tuy vậy code BTL vẫn kiểm rõ `is_absolute()` cho dễ đọc."
      }
    ],
    "commonMistakes": [
      "Viết chuỗi cứng `\"data\\\\raw\\\\\"` bằng tay khiến code chạy lỗi trên Linux/macOS/Colab."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-208",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "NumPy"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Khởi tạo dãy chỉ mục trong vẽ cột ghép bằng `np.arange` ± offset.",
    "question": "Tại sao `plot_llm_vs_baseline()` (`src/viz.py:L455-L456`) dùng `y - h / 2` và `y + h / 2` với `h = 0.36`?",
    "quickAnswer": "Để đặt 2 thanh ngang (`LLM` và `Baseline`) của cùng 1 chỉ số nằm sát đối xứng ngay hai bên tâm tọa độ `y`, không chồng đè lên nhau và giữ đúng tổng bề rộng nhóm thanh `2*h = 0.72` (< 1.0 nên vẫn còn khe hở giữa 9 nhóm hàng).",
    "explanation": "Áp dụng tương tự cho Grouped Bar Chart trong Matplotlib.",
    "projectLink": "src/viz.py:L455-L456",
    "codeLocation": "src/viz.py:L455-L456",
    "proofExample": "src/viz.py:L449, L455-L456.",
    "followUpQuestions": [
      "Nếu viết `y - 0.25` và `y + 0.25` nhưng đặt `height = 0.6` thì hai thanh sẽ thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu viết `y - 0.25` và `y + 0.25` nhưng đặt `height = 0.6` thì hai thanh sẽ thế nào?",
        "a": "Sẽ đè lấn lên nhau một khoảng `0.6 - 0.5 = 0.1` đơn vị -> bắt buộc `height <= khoảng cách giữa hai tâm`!"
      }
    ],
    "commonMistakes": [
      "Vẽ 2 lệnh `ax.barh(y, ...)` cùng tọa độ `y` làm thanh vẽ sau che khuất hoàn toàn thanh vẽ trước!"
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-209",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt `df.loc[row, col]` và `df.at[row, col]` / `df.iat[r, c]`.",
    "question": "Khi cần đọc/ghi CHÍNH XÁC MỘT Ô ĐƠN LẺ trong pandas, `.at[]`/`.iat[]` khác `.loc[]`/`.iloc[]` điểm nào?",
    "quickAnswer": "`.loc`/`.iloc` hỗ trợ cắt lát nhiều dòng nhiều cột tổng quát (trả về Series/DataFrame), còn `.at`/`.iat` chuyên dụng truy xuất nhanh **1 giá trị scalar duy nhất** (nhanh hơn `.loc` khi gọi lặp nhiều lần).",
    "explanation": "Không dùng `.at` để truyền danh sách hay boolean mask.",
    "projectLink": "Bài 4",
    "codeLocation": "Bài 4",
    "proofExample": "Bài 4 (Truy xuất DataFrame).",
    "followUpQuestions": [
      "Trong `src/kpi.py:L264`, dùng `.iloc[-1]` trên list Python `snapshots[-1]` hay trên DataFrame?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/kpi.py:L264`, dùng `.iloc[-1]` trên list Python `snapshots[-1]` hay trên DataFrame?",
        "a": "`snapshots[-1]` là lấy phần tử cuối của **Python list** `[(snap, t_lbl, df), ...]` (tuple 3 thành phần), khác với `snap.iloc[-1]` trên DataFrame trong `src/viz.py`."
      }
    ],
    "commonMistakes": [
      "Truyền slice `0:5` vào `.iat[0:5, 0]` gây lỗi `ValueError: iAt based indexing can only have integer indexers`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vt-210",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lợi ích và bẫy của `infer` kiểu trong `pd.read_csv(..., dtype=str)`.",
    "question": "Tại sao trong `src/evaluate.py:L63` và `src/baseline.py:L134`, lệnh `pd.read_csv()` truyền `dtype=str` cho TOÀN BỘ bảng thay vì truyền từ điển chỉ định riêng từng cột?",
    "quickAnswer": "Vì toàn bộ các cột trong `ground_truth.csv`, `reviews_sentiment.csv` và `reviews_baseline.csv` đều là văn bản/nhãn/ID (`id`, `listing_id`, `date`, `comments`, `language`, `overall_sentiment`, 7 khía cạnh), không có cột số học! Ép `dtype=str` toàn bảng vừa bảo toàn 100% ID dài 19 chữ số vừa tránh pandas tự chuyển chữ `\"None\"` hay nhãn trống phức tạp.",
    "explanation": "Ngược lại ở `qa.py` và `kpi.py`, bảng `listings.csv` có tới 70 cột hỗn hợp nên truyền từ điển hẹp `dtype={\"id\": \"string\"}`.",
    "projectLink": "src/evaluate.py:L63",
    "codeLocation": "src/evaluate.py:L63",
    "proofExample": "src/evaluate.py:L63; `src/baseline.py:L134`.",
    "followUpQuestions": [
      "Khi truyền `dtype=str` đọc `reviews_sentiment.csv`, những ô trống thực sự (ví dụ nếu thiếu nhãn LLM) trở thành giá trị gì trong pandas?"
    ],
    "followUpQA": [
      {
        "q": "Khi truyền `dtype=str` đọc `reviews_sentiment.csv`, những ô trống thực sự (ví dụ nếu thiếu nhãn LLM) trở thành giá trị gì trong pandas?",
        "a": "Mặc định `keep_default_na=True`, nên ô hoàn toàn trống trong CSV vẫn trở thành **`NaN`**, còn các chuỗi có chữ trở thành `str` (hoặc `StringDtype` ở pandas 3)."
      }
    ],
    "commonMistakes": [
      "Dùng `dtype=str` khi đọc `listings.csv` rồi sau đó phải tự ép `to_numeric` lại cả những cột số sẵn như `latitude`, `longitude`."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-211",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "theory",
    "topics": [
      "pandas"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hiểu cơ chế `mask` và `annotate` trong vẽ bảng màu & Heatmap.",
    "question": "Nếu một bảng chứa dữ liệu tỷ lệ nằm trong `[0, 1]` hoặc phần trăm `[0, 100]`, tại sao trước khi gọi `sns.heatmap()` không chuyển trước ô `NaN` thành chữ `\"NA\"` ngay trong ma trận số `mat`?",
    "quickAnswer": "Vì nếu thay bất kỳ ô `NaN` nào bằng chuỗi chữ `\"NA\"` bên trong ma trận chính `mat`, toàn bộ cột đó sẽ biến thành `dtype=object` làm `sns.heatmap` CRASH với `TypeError: Image data of dtype object cannot be converted to float`! Phải giữ `mat` là số `float`, truyền `mask=mat.isna()`, và tách nhãn chữ `\"NA\"` sang tham số `annot=` hoặc `ax.text()`.",
    "explanation": "Chính là kỹ thuật mà `_heatmap()` tại `src/viz.py:L59-L71` thực hiện rất bài bản.",
    "projectLink": "src/viz.py:L59-L71",
    "codeLocation": "src/viz.py:L59-L71",
    "proofExample": "src/viz.py:L59-L71.",
    "followUpQuestions": [
      "Ngoài `mat.isna()`, bảng `annot` trong `_heatmap()` định dạng hiển thị `(3/130)` bằng thuộc tính nào?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài `mat.isna()`, bảng `annot` trong `_heatmap()` định dạng hiển thị `(3/130)` bằng thuộc tính nào?",
        "a": "Tạo DataFrame chuỗi `annot` cùng shape và truyền `annot=annot, fmt=\"\"` (chuỗi rỗng để Seaborn in nguyên chuỗi đã format sẵn)."
      }
    ],
    "commonMistakes": [
      "Gọi `mat.fillna(\"NA\")` trực tiếp trên DataFrame đưa vào `sns.heatmap(mat)` -> báo `TypeError` ngay lập tức!"
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-212",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "File I/O"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của `.env.example` so với `.env`.",
    "question": "Tại sao repository BTL chứa file `.env.example` (36 bytes) công khai trên GitHub dù đã loại `.env` trong `.gitignore`?",
    "quickAnswer": "`.env.example` chỉ lưu **tên biến mẫu không chứa giá trị thật** (ví dụ `GEMINI_API_KEY=your_api_key_here`), giúp người dùng mới biết cần khai báo biến môi trường gì khi tự tạo file `.env` cục bộ mà không lộ bất kỳ bí mật nào.",
    "explanation": "Quy chuẩn bảo mật phần mềm mọi sinh viên cần nắm.",
    "projectLink": ".env.example",
    "codeLocation": ".env.example",
    "proofExample": "btl_final/.env.example & `.gitignore`.",
    "followUpQuestions": [
      "Nếu lỡ tay push file `.env` chứa API key lên repo công khai rồi mới xóa ở commit sau, việc cần làm đầu tiên là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu lỡ tay push file `.env` chứa API key lên repo công khai rồi mới xóa ở commit sau, việc cần làm đầu tiên là gì?",
        "a": "Lập tức **thu hồi (Revoke / Rotate)** API key đó trên Google AI Studio ngay lập tức (vì lịch sử Git và bot quét công khai đã lưu key cũ rồi!), sau đó mới dọn lịch sử Git."
      }
    ],
    "commonMistakes": [
      "Điền thẳng API key thật vào `.env.example` rồi commit push lên GitHub public!"
    ],
    "relatedFiles": [
      ".env.example"
    ]
  },
  {
    "id": "vt-213",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "API"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Phân biệt Sync Blocking vs Async/Batch và ý nghĩa `time.sleep()`.",
    "question": "Trong một tiến trình đồng bộ như `download.py` và `llm.py`, hàm `time.sleep()` làm gì và khi nào nó cần thiết vs gây hại?",
    "quickAnswer": "`time.sleep(s)` tạm dừng luồng thực thi hiện tại đúng `s` giây. Rất cần thiết để tôn trọng giới hạn tốc độ API (`1.0s` rate pacing, cooldown RPM `20..60s`, exponential backoff mạng `1s, 2s`); nhưng tuyệt đối không đặt `sleep()` bừa bãi làm chậm không cần thiết hoặc đặt nhầm trong vòng lặp chạy trên triệu dòng.",
    "explanation": "Kết hợp `tqdm(batches)` ở `src/llm.py:L337` giúp người dùng quan sát thanh tiến trình ước tính thời gian còn lại.",
    "projectLink": "src/llm.py:L290, L377",
    "codeLocation": "src/llm.py:L290, L377",
    "proofExample": "src/download.py:L63; `src/llm.py:L290, L334, L377`.",
    "followUpQuestions": [
      "Trong `process_pending_reviews()`, tham số `retry_cooldown = 15` (giây) chạy vào thời điểm nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong `process_pending_reviews()`, tham số `retry_cooldown = 15` (giây) chạy vào thời điểm nào?",
        "a": "Chạy ở đầu **vòng chạy bù 1 và vòng chạy bù 2** (`L334`) khi `pass_idx > 0` và vẫn còn `pending_rows`, giúp API kịp giải tỏa cửa sổ RPM trước khi chạy bù."
      }
    ],
    "commonMistakes": [
      "Đặt `time.sleep(1)` trong bước lọc 1.000 dòng cục bộ hoặc bỏ quên `sleep` khi chạm lỗi 429 RPM."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vt-214",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "theory",
    "topics": [
      "SQL"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "So sánh `COALESCE(a, b)` trong SQL với `.fillna(b)` / `.combine_first()` trong pandas.",
    "question": "Hàm `COALESCE(col1, col2, 'unknown')` trong SQL tương đương với biểu thức nào trong pandas khi xử lý giá trị thiếu theo thứ tự ưu tiên?",
    "quickAnswer": "`COALESCE` trả về giá trị **KHÔNG NULL đầu tiên** trong danh sách tham số -> tương đương hoàn toàn với `s1.combine_first(s2).fillna(\"unknown\")` trong pandas.",
    "explanation": "Trong `src/qa.py:L283`, fallback `last_scraped -> snap_dt` chính là logic tương đương `COALESCE(last_scraped, snapshot_date)`.",
    "projectLink": "src/qa.py:L283",
    "codeLocation": "src/qa.py:L283",
    "proofExample": "src/qa.py:L283 & Bài 6.",
    "followUpQuestions": [
      "Khi xử lý chuỗi giá trong `src/llm.py:L163`: `_clean_str(r.get(\"listing_id\")) or _clean_str(cached.get(\"listing_id\"))`, toán tử `or` của Python hoạt động tương tự gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi xử lý chuỗi giá trong `src/llm.py:L163`: `_clean_str(r.get(\"listing_id\")) or _clean_str(cached.get(\"listing_id\"))`, toán tử `or` của Python hoạt động tương tự gì?",
        "a": "Tương tự `COALESCE` cho chuỗi rỗng `\"\"`: nếu `listing_id` trong bảng đầu rỗng (`\"\"` là falsy), Python lấy dự phòng `listing_id` đã lưu trong cache!"
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `COALESCE(a, b)` cộng hoặc nối chuỗi hai cột lại với nhau."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-215",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Regex"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Bẫy khoảng trắng ẩn (`\\xa0` Non-breaking space) và chuẩn hóa NFKC.",
    "question": "Ngoài thẻ `<br/>`, văn bản cào từ web thường chứa ký tự khoảng trắng đặc biệt như `&nbsp;` (`\\xa0` non-breaking space). Chuỗi lệnh nào của `clean_text()` trong `baseline.py` giải quyết triệt để ký tự này?",
    "quickAnswer": "1. `html.unescape()` chuyển `&nbsp;` thành ký tự `\\xa0`;\n2. `unicodedata.normalize(\"NFKC\", s)` biến đổi ký tự khoảng trắng không ngắt `\\xa0` thành dấu cách ASCII chuẩn `\" \"`;\n3. `re.sub(r\"[ \\t\\r]+\", \" \", s)` gom các khoảng trắng thừa thành một dấu cách duy nhất!",
    "explanation": "Nếu thiếu bước NFKC hoặc `\\s`, Regex tìm kiếm dấu cách thường `\" \"` sẽ không khớp với `&nbsp;`!",
    "projectLink": "src/baseline.py:L65-L70",
    "codeLocation": "src/baseline.py:L65-L70",
    "proofExample": "src/baseline.py:L65-L70.",
    "followUpQuestions": [
      "Lệnh `re.sub(r\"[ \\t\\r]+\", \" \", s)` ở `L70` cố tình KHÔNG viết thành `r\"\\s+\"` để giữ lại ký tự nào?"
    ],
    "followUpQA": [
      {
        "q": "Lệnh `re.sub(r\"[ \\t\\r]+\", \" \", s)` ở `L70` cố tình KHÔNG viết thành `r\"\\s+\"` để giữ lại ký tự nào?",
        "a": "Cố tình **GIỮ LẠI ký tự xuống dòng `\\n`** để bước `CLAUSE_RE.split(raw)` sau đó vẫn tách được các dòng review khác nhau thành mệnh đề riêng!"
      }
    ],
    "commonMistakes": [
      "Viết `.replace(\" \", \"\")` mà quên rằng `\\xa0` hoặc tab `\\t` không bị xóa."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vt-216",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "theory",
    "topics": [
      "Datetime"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải `last_scraped` vs `snapshot` khi xác định tuổi review.",
    "question": "Nếu một listing có `last_scraped = 2025-10-01` (thuộc snapshot danh nghĩa `t1 = 2025-09-27`) và `last_review = 2025-09-29`, hàm `qa.py` đánh dấu hợp lệ hay vi phạm, và tại `kpi.py` phép trừ `t1 - last_review` ra số dương hay âm?",
    "quickAnswer": "Ở `src/qa.py:L283`, `ref_date` ưu tiên lấy `last_scraped` (`2025-10-01`) >= `2025-09-29` -> **hợp lệ (`qa_invalid_last_review = False`)**! Còn ở `src/kpi.py:L163`, phép kiểm `(pd.to_datetime(snap) - last_rev).dt.days > 90` lấy `2025-09-27 - 2025-09-29 = -2` ngày (`-2 > 90` là `False`) -> `is_stale = False` (rất an toàn!).",
    "explanation": "Hai bước kết hợp ăn khớp logic không gây báo lỗi giả.",
    "projectLink": "src/qa.py:L283; src/kpi.py:L163",
    "codeLocation": "src/qa.py:L283; src/kpi.py:L163",
    "proofExample": "src/qa.py:L283; `src/kpi.py:L163`.",
    "followUpQuestions": [
      "Trong công thức tính Ghost tại `t1` (`is_stale`), có trường hợp nào một căn đã có review rất mới (`-2` ngày) mà bị gắn `ghost_t1 = 1` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong công thức tính Ghost tại `t1` (`is_stale`), có trường hợp nào một căn đã có review rất mới (`-2` ngày) mà bị gắn `ghost_t1 = 1` không?",
        "a": "Không bao giờ, vì `-2 > 90` là `False` và `nr > 0` nên `is_stale = False` -> `ghost_t1 = 0`."
      }
    ],
    "commonMistakes": [
      "Tưởng rằng nếu `t1 - last_review` ra `-2` ngày thì code tính Ghost sẽ bị lỗi số âm!"
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-217",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "Data Cleaning",
      "QA"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt Missing Completely At Random (MCAR) vs Missing Not At Random (MNAR) trên mốc `t2`.",
    "question": "Sự cố mất 100% giá tại mốc `t2 (2025-12-29)` và các căn thiếu `last_review` (do 0 review) minh họa hai cơ chế thiếu dữ liệu khác nhau thế nào?",
    "quickAnswer": "Mất toàn bộ cột `price` tại `t2` do lỗi cào hệ thống nguồn tại thời điểm chụp là dạng thiếu mang tính hệ thống theo kỳ (**không liên quan đến giá trị thật đắt hay rẻ của từng căn** — gần giống MAR/lỗi thu thập theo mốc); còn `last_review = NaN` ở những căn `number_of_reviews = 0` là thiếu có quy luật cấu trúc (**Structural Missingness / MNAR** -> bản thân nó không có ngày nào để ghi chứ không phải bị mất).",
    "explanation": "Nhận diện đúng bản chất giúp xử lý đúng cách: bảo toàn NaN ở `t2` (không điền bừa) và bỏ qua NaN hợp lệ ở `last_review`.",
    "projectLink": "src/qa.py:L288",
    "codeLocation": "src/qa.py:L288",
    "proofExample": "reports/qa_report.csv & `src/qa.py:L288`.",
    "followUpQuestions": [
      "Còn 40 căn thiếu giá tại `t1` và 20 căn thiếu giá tại `t4` có thể đến từ nguyên nhân thực tế nào trên Airbnb?"
    ],
    "followUpQA": [
      {
        "q": "Còn 40 căn thiếu giá tại `t1` và 20 căn thiếu giá tại `t4` có thể đến từ nguyên nhân thực tế nào trên Airbnb?",
        "a": "Chủ nhà đang tạm ẩn phòng dài hạn, chưa cài giá cho kỳ mở bán, hoặc scraper gặp lỗi trích xuất ở một số trang con."
      }
    ],
    "commonMistakes": [
      "Xử lý mọi ô `NaN` bằng cùng một công thức chung mà không phân biệt thiếu do lỗi cào hay thiếu tự nhiên."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vt-218",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "theory",
    "topics": [
      "QA"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Lý giải `kpi_before` và `kpi_after` của 8 quy tắc trong `qa_report.csv`.",
    "question": "Trong `reports/qa_report.csv`, tại sao cột `kpi_before` và `kpi_after` lại mang các đơn vị khác nhau giữa các hàng (lúc thì `1000`, lúc `0.0% -> 96.0%`, lúc `1535.15 MXN`)?",
    "quickAnswer": "Vì mỗi quy tắc QA đo tác động lên **đúng chỉ số KPI chịu ảnh hưởng trực tiếp bởi quy tắc đó** (ghi rõ ở cột `kpi_affected`): `DEDUPLICATION` đo `Total Listings` (`1000`); `PRICE_PARSE` đo `Parseable Price Rate (%)` (`0% -> 96%`); `MISSING_PRICE` đo `Valid Price Listings Count` (`1000 -> 960`); `PRICE_OUTLIER` đo `Mean Price` (`1535.15 -> 1535.15`); `AVAILABILITY_BOUNDS` đo `Valid Availability Rate (%)` (`100.0%`).",
    "explanation": "Thiết kế báo cáo tự giải thích tác động từng quy tắc rõ ràng.",
    "projectLink": "reports/qa_report.csv",
    "codeLocation": "reports/qa_report.csv",
    "proofExample": "src/qa.py:L70-L309 & `reports/qa_report.csv`.",
    "followUpQuestions": [
      "Khi nhìn `RULE_PRICE_OUTLIER` thấy `kpi_before == kpi_after` (cùng bằng `1535.15` ở t1, `3013.09` ở t4), chứng minh điều gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi nhìn `RULE_PRICE_OUTLIER` thấy `kpi_before == kpi_after` (cùng bằng `1535.15` ở t1, `3013.09` ở t4), chứng minh điều gì?",
        "a": "Chứng minh rõ ràng trong số liệu thực nghiệm rằng quy tắc outlier CHỈ GẮN CỜ cảnh báo chứ KHÔNG xóa hay thay đổi bất kỳ giá trị nào ảnh hưởng đến Mean Price!"
      }
    ],
    "commonMistakes": [
      "Thấy cột `kpi_before/after` chứa cả phần trăm lẫn số nguyên và giá thực nên tưởng file CSV bị lỗi format."
    ],
    "relatedFiles": [
      "reports/qa_report.csv"
    ]
  },
  {
    "id": "vt-219",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "LLM"
    ],
    "level": 2,
    "levelLabel": "Cấp độ 2 – Giải thích",
    "difficulty": "Cơ bản",
    "qType": "Giải thích",
    "evaluationGoal": "Hiểu định mức Token (`110 input + 68 output`) và phép cộng chi phí bất đối xứng.",
    "question": "Vì sao dù 1 lô có 5 review nhưng tính trung bình mỗi review chỉ tốn ~110 input tokens (đã gồm prompt hệ thống)?",
    "quickAnswer": "Phần prompt hướng dẫn cố định (~200–250 tokens) được **chia đều cho 5 review** trong cùng 1 batch (`~45–50 tokens/review`), cộng thêm trung bình ~60 tokens nội dung text của mỗi review -> bình quân chỉ còn ~110 input tokens/review! Ngược lại Output JSON sinh riêng kết quả cho đủ 5 review nên vẫn tốn ~68 tokens cho từng câu.",
    "explanation": "Thấy rõ hiệu quả kinh tế trực tiếp của cơ chế gom lô (`batch_size=5`).",
    "projectLink": "src/evaluate.py:L207-L239",
    "codeLocation": "src/evaluate.py:L207-L239",
    "proofExample": "src/evaluate.py:L207-L239 (`in_tok=110, out_tok=68`) & `reports/llm_cost_estimate.csv`.",
    "followUpQuestions": [
      "Nếu thay model từ `gemini-3.5-flash-lite` ($0.30 in / $2.50 out) sang `gemini-3.6-flash` ($0.75 in / $3.75 out), chi phí cho 1.000 review tăng lên bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thay model từ `gemini-3.5-flash-lite` ($0.30 in / $2.50 out) sang `gemini-3.6-flash` ($0.75 in / $3.75 out), chi phí cho 1.000 review tăng lên bao nhiêu?",
        "a": "Input: `0.11 × 0.75 = $0.0825`; Output: `0.068 × 3.75 = $0.2550` -> Tổng = **`$0.3375`** (tăng +66% so với $0.2030)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng tăng `batch_size` sẽ giúp giảm cả số lượng Output tokens trên mỗi review!"
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-220",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "theory",
    "topics": [
      "Evaluation"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của `Coverage` và phân biệt lỗi `khong_co_ket_qua` vs `sai_nhan`.",
    "question": "Trong `evaluate.py`, sự khác nhau giữa lỗi `\"khong_co_ket_qua\"` trong `phan_tich_loi()` và lỗi `\"sai_nhan\"` là gì?",
    "quickAnswer": "`\"khong_co_ket_qua\"` xảy ra khi mã review trong `ground_truth.csv` hoàn toàn vắng mặt trong bảng dự đoán hợp lệ (làm giảm Coverage < 1.0); còn `\"sai_nhan\"` là mô hình đã xuất kết quả đầy đủ nhưng chọn sai giá trị nhãn (như đoán `mixed` thay vì `negative`).",
    "explanation": "Trong bản nộp `final`, LLM đạt Coverage 1.0 nên có `0` lỗi `\"khong_co_ket_qua\"`, toàn bộ 46 lỗi nằm trong 3 loại `thieu` (21), `thua` (14), `sai_nhan` (11).",
    "projectLink": "src/evaluate.py:L159-L169",
    "codeLocation": "src/evaluate.py:L159-L169",
    "proofExample": "src/evaluate.py:L159-L169 & `reports/llm_error_analysis.csv`.",
    "followUpQuestions": [
      "Trong `eval_df`, số lỗi `21 + 14 + 11 = 46` được đếm trên tổng số bao nhiêu ô kiểm tra (100 review × mấy trường)?"
    ],
    "followUpQA": [
      {
        "q": "Trong `eval_df`, số lỗi `21 + 14 + 11 = 46` được đếm trên tổng số bao nhiêu ô kiểm tra (100 review × mấy trường)?",
        "a": "Trên tổng số **`900` ô** (`100 review × 9 trường = [overall_sentiment, language, 7 aspects]`), tương ứng tỷ lệ khớp toàn cục trên cả 9 trường đạt **854 / 900 = 94.89%**."
      }
    ],
    "commonMistakes": [
      "Gộp cả các ca LLM bị mất kết quả do API error vào làm `sai_nhan` hoặc xóa khỏi mẫu chấm."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vt-221",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "theory",
    "topics": [
      "KPI"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của hai nhóm cột `complaint_*` và sự khác biệt với `overall_sentiment`.",
    "question": "Tại sao bảng `kpi_by_neighbourhood.csv` tính tỷ lệ phàn nàn trên **7 khía cạnh riêng** chứ không tính mỗi tỷ lệ `overall_sentiment = negative` theo quận?",
    "quickAnswer": "Biết một quận có nhiều `negative` tổng thể không giúp SECTUR biết nên đi sửa cái gì! Tách theo 7 khía cạnh cho biết **hành động cụ thể**: Cuauhtémoc và Miguel Hidalgo yếu ở **`amenities` (14.8%, 10.0%)** và **`noise` (8.1%, 5.3%)**, còn `host` và `location` hầu như cực kỳ tốt (>97% hài lòng).",
    "explanation": "Đưa phân tích văn bản gắn thẳng vào bài toán nghiệp vụ địa bàn.",
    "projectLink": "src/kpi.py:L414-L428",
    "codeLocation": "src/kpi.py:L414-L428",
    "proofExample": "src/kpi.py:L414-L428 & `figures/llm_insights.png`.",
    "followUpQuestions": [
      "Trong `kpi_by_neighbourhood.csv`, nếu một quận có `llm_review_count = 17` và `complaint_mixed_noise = 0.1176` (Venustiano Carranza), số review thực tế chê tiếng ồn ở quận này là mấy?"
    ],
    "followUpQA": [
      {
        "q": "Trong `kpi_by_neighbourhood.csv`, nếu một quận có `llm_review_count = 17` và `complaint_mixed_noise = 0.1176` (Venustiano Carranza), số review thực tế chê tiếng ồn ở quận này là mấy?",
        "a": "`round(17 × 0.1176) = 2` review (chính xác `2 / 17 = 0.117647`!)."
      }
    ],
    "commonMistakes": [
      "Cho rằng phân tích cảm xúc chỉ cần 1 nhãn positive/negative tổng thể là đủ cho báo cáo."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vt-222",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "theory",
    "topics": [
      "Visualization"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt Heatmap, Small Multiples và Choropleth trong hệ thống 8 biểu đồ.",
    "question": "Trong 8 biểu đồ PNG của Nhóm 4, những biểu đồ nào sử dụng kỹ thuật **Small Multiples** (nhiều khung cùng biến cùng thang đo)?",
    "quickAnswer": "1. **`kpi_ppg_snapshots.png`**: 4 khung cùng trục X [0, xmax] và cùng thứ tự A01–A08 cho 4 mốc t1–t4;\n2. **`kpi_ppg_neighbourhood.png`**: 4 khung bản đồ CDMX chia sẻ chung chuẩn màu từng hàng (Price Mean/Median; PPG Mean/Median);\n3. **`kpi_riqr_neighbourhood.png`**, **`kpi_occupancy_gap.png`**, **`llm_insights.png`**: đặt 2–3 biểu đồ dùng chung trục Y (`sharey=True`) để gióng thẳng hàng so sánh ngang tức thì.",
    "explanation": "Small Multiples là kỹ thuật trình bày đa chiều cực mạnh trong Bài 13.",
    "projectLink": "src/viz.py",
    "codeLocation": "src/viz.py",
    "proofExample": "src/viz.py (`sharex=True`, `sharey=True`).",
    "followUpQuestions": [
      "Khi đặt `sharey=True` cho 2 biểu đồ cạnh nhau, vì sao `viz.py` gọi `ax2.tick_params(axis=\"y\", labelleft=False)`?"
    ],
    "followUpQA": [
      {
        "q": "Khi đặt `sharey=True` cho 2 biểu đồ cạnh nhau, vì sao `viz.py` gọi `ax2.tick_params(axis=\"y\", labelleft=False)`?",
        "a": "Để ẩn phần chữ nhãn tên quận/khu vực bị lặp lại ở khung bên phải, giữ hình gọn sạch và tránh chữ đè lên khoảng hở giữa 2 khung."
      }
    ],
    "commonMistakes": [
      "Vẽ 4 biểu đồ rời rạc mỗi cái một tỷ lệ trục rồi dán cạnh nhau trong báo cáo Word."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vt-223",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "theory",
    "topics": [
      "Storytelling"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Phân biệt \"Dữ liệu công bố trên Inside Airbnb\" và \"Thị trường lưu trú thực tế tại CDMX\".",
    "question": "Ngoài giới hạn mẫu 1.000 căn (3.2%), bản thân dữ liệu nguồn Inside Airbnb của toàn Mexico City còn có khoảng mù (blind spots) nào mà SECTUR CDMX cần biết?",
    "quickAnswer": "1. **Chỉ phủ duy nhất nền tảng Airbnb**, bỏ qua khách sạn truyền thống, Vrbo, Booking.com hay thuê chui ngoại tuyến;\n2. **Giá niêm yết (listed price)** chưa gồm phí dọn dẹp (`cleaning_fee`), phí dịch vụ, thuế lưu trú địa phương CDMX và chiết khấu dài ngày;\n3. **Không có dữ liệu doanh thu/đêm ở thực** (`availability=0` trộn lẫn khách đặt và chủ khóa lịch);\n4. **Survivorship Bias**: các listing và review bị xóa trước thời điểm cào không còn lưu vết trên bản snapshot sau.",
    "explanation": "Trình bày đầy đủ thể hiện sự am hiểu sâu sắc về dữ liệu nguồn.",
    "projectLink": "reports/report.pdf",
    "codeLocation": "reports/report.pdf",
    "proofExample": "reports/report.pdf Chương 6 & Bài 14.",
    "followUpQuestions": [
      "Tại sao `fees` (như phí dọn dẹp 500–1.500 MXN/chuyến) khiến giá 1 đêm ở thực của khách thuê ngắn ngày 1–2 đêm đắt hơn hẳn so với `Price` niêm yết?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `fees` (như phí dọn dẹp 500–1.500 MXN/chuyến) khiến giá 1 đêm ở thực của khách thuê ngắn ngày 1–2 đêm đắt hơn hẳn so với `Price` niêm yết?",
        "a": "Vì phí dọn dẹp tính cố định mỗi lần đặt nên khi chia cho chỉ 1–2 đêm, đơn giá thực tế mỗi đêm tăng thêm 25%–50%, khác với khách thuê 14 ngày."
      }
    ],
    "commonMistakes": [
      "Nhầm giá chào `price` trên Airbnb là tổng số tiền thực tế khách phải trả hoặc doanh thu ròng của chủ nhà."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vt-224",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "theory",
    "topics": [
      "Architecture"
    ],
    "level": 1,
    "levelLabel": "Cấp độ 1 – Nhận biết",
    "difficulty": "Cơ bản",
    "qType": "Kiến thức",
    "evaluationGoal": "Ý nghĩa của Git Tag `final` và cơ chế kiểm chứng Commit SHA.",
    "question": "Trong đề bài và quy trình làm việc kỹ sư dữ liệu, **Git Tag `final`** và **Commit SHA (`f69ebb195a375c2f7afbf1c75dfdc104be785614`)** dùng để đảm bảo nguyên tắc gì?",
    "quickAnswer": "Nhánh `main` có thể tiếp tục có commit mới về sau, nhưng **Git Tag `final`** đóng băng chính xác trạng thái mã nguồn, cấu hình và báo cáo đã nộp chấm điểm tại một Commit SHA duy nhất (40 ký tự hex băm mật mã SHA-1). Nhờ ghi rõ Commit SHA vào `report.pdf`, giảng viên và bất kỳ kiểm toán viên nào đều đối chiếu được đúng phiên bản gốc không thể chối cãi.",
    "explanation": "Đây cũng là lý do toàn bộ website học tập này neo chặt vào tag `final` chứ không trộn lẫn code thử nghiệm khác.",
    "projectLink": "configs/mexico-city.yaml & report.pdf",
    "codeLocation": "configs/mexico-city.yaml & report.pdf",
    "proofExample": "Toàn bộ Project Explorer & `project_airbnb.html`.",
    "followUpQuestions": [
      "Khi clone repo BTL về để kiểm chứng lại bản nộp, lệnh Git nào đưa workspace về đúng trạng thái tag `final`?"
    ],
    "followUpQA": [
      {
        "q": "Khi clone repo BTL về để kiểm chứng lại bản nộp, lệnh Git nào đưa workspace về đúng trạng thái tag `final`?",
        "a": "`git checkout final` (chế độ detached HEAD tại đúng commit `f69ebb195a375c2f7afbf1c75dfdc104be785614`)."
      }
    ],
    "commonMistakes": [
      "Nộp báo cáo ghi chung chung \"code trên nhánh main\" khiến giảng viên chấm không khớp nếu có ai push thêm sau deadline."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  }
];

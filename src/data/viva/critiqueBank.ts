import type { VivaQuestion } from '../../types';

export const VIVA_CRITIQUE_BANK: VivaQuestion[] = [
  {
    "id": "vr-001",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "Storytelling"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy Mean bị ngoại lai thổi phồng trên bản đồ giá quận (`Cuauhtémoc` và `Xochimilco`).",
    "question": "Câu hỏi gài: Trên bản đồ `kpi_ppg_neighbourhood.png`, Xochimilco có giá niêm yết trung bình cao nhất thành phố (`3.848 MXN`), và Cuauhtémoc đạt Mean `3.529 MXN` (tăng +129% so với t1). Vậy có thể khẳng định \"du khách phải trả đắt nhất ở Xochimilco và phân khúc siêu sang đang chiếm đa số ở Cuauhtémoc\" không?",
    "quickAnswer": "**SAI HOÀN TOÀN!** Hai bẫy chồng lên nhau:\n(1) **Xochimilco** chỉ có `n = 5` listing toàn loại nhà vườn lớn 12–14 khách; khi chuẩn hóa theo đầu khách, Xochimilco rơi xuống **hạng `#11/15` theo `rank_ppg_t4` (`Mean PPG 521,29 MXN`) và `#10/15` theo `Median PPG` (`376,59 MXN/khách`)**!\n(2) **Cuauhtémoc (`n=514`)**: `Mean` bị đúng **2 căn hộ treo giá đầu cơ `153.540 MXN/đêm`** (đều có `Occ_1-30 = 0%`, không ai đặt) kéo vọt lên `+20%`, trong khi `Median Price` thực tế của đa số căn chỉ là **`2.215,25 MXN`** và `Median PPG` là **`678,00 MXN` (đứng sau Miguel Hidalgo `706,12 MXN`)**!",
    "explanation": "Một câu phản biện mẫu mực đánh trúng 3 chiều: Cỡ mẫu `n`, Độ lớn căn hộ (`accommodates -> PPG`), và Ngoại lai kéo lệch Mean (`153.540 MXN`).",
    "projectLink": "figures/kpi_ppg_neighbourhood.png; reports/report.pdf",
    "codeLocation": "figures/kpi_ppg_neighbourhood.png; reports/report.pdf",
    "proofExample": "Xem đối chứng hàng trên vs hàng dưới của `figures/kpi_ppg_neighbourhood.png` và 2 ID `1495709040675944121`, `1415442841269763701`.",
    "followUpQuestions": [
      "Trong 2 căn treo `153.540 MXN` tại Cuauhtémoc, cả hai có đặc điểm `Occ_1-30` giống nhau ra sao?"
    ],
    "followUpQA": [
      {
        "q": "Trong 2 căn treo `153.540 MXN` tại Cuauhtémoc, cả hai có đặc điểm `Occ_1-30` giống nhau ra sao?",
        "a": "Cả 2 đều ghi nhận `Occ_1-30 = 0.0%` (`availability_30 = 30`, hoàn toàn trống trơn không khách đặt!)."
      }
    ],
    "commonMistakes": [
      "Thấy Mean tăng mạnh hơn Median liền kết luận phân khúc siêu sang đang chiếm đa số số lượng căn hộ."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_neighbourhood.png"
    ]
  },
  {
    "id": "vr-002",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "Storytelling"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy % tăng trưởng trên nền gốc thấp (`Coyoacán +77.5%` vs `Cuauhtémoc +57.5%`).",
    "question": "Câu hỏi gài: Coyoacán tăng Median PPG `+77.5%` trong khi Cuauhtémoc chỉ tăng `+57.5%`. Có đúng là tại thời điểm khai mạc World Cup `t4`, giá thuê tính trên đầu khách ở Coyoacán đã vượt mặt đắt hơn Cuauhtémoc không?",
    "quickAnswer": "**KHÔNG ĐÚNG!** Tỷ lệ `%` tăng cao hơn chỉ vì nền giá gốc tại `t1` của Coyoacán thấp hơn (`352,00 MXN`) so với Cuauhtémoc (`417,50 MXN`). Thực tế tại `t4`, Median PPG của **Cuauhtémoc vẫn là `678,00 MXN/khách`**, cao hơn **Coyoacán (`601,16 MXN/khách`)**!",
    "explanation": "Phân biệt tốc độ tăng trưởng tương đối (`% delta`) với mức giá tuyệt đối tại kỳ cuối (`t4`).",
    "projectLink": "data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Dữ liệu `data/processed/kpi_by_neighbourhood.csv`: `Cuauhtémoc median_ppg_t4 = 678.00`, `Coyoacán = 601.16`.",
    "followUpQuestions": [
      "Nếu quận X tăng từ `100 -> 300 MXN` (`+200%`) và quận Y tăng từ `500 -> 900 MXN` (`+80%`), khoản tiền tăng tuyệt đối của quận nào lớn hơn?"
    ],
    "followUpQA": [
      {
        "q": "Nếu quận X tăng từ `100 -> 300 MXN` (`+200%`) và quận Y tăng từ `500 -> 900 MXN` (`+80%`), khoản tiền tăng tuyệt đối của quận nào lớn hơn?",
        "a": "Quận Y tăng tuyệt đối `+400 MXN/khách`, gấp đôi quận X (`+200 MXN/khách`)!"
      }
    ],
    "commonMistakes": [
      "Đánh đồng \"% tăng trưởng cao nhất\" với \"giá trị cuối kỳ cao nhất\"."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_neighbourhood.csv"
    ]
  },
  {
    "id": "vr-003",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "Storytelling"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện lỗi \"Trung bình của các Trung bình\" (`Mean of Area Means`).",
    "question": "Phản biện: Một sinh viên tính giá trung bình toàn thành phố `t4` bằng cách mở `kpi_by_area.csv` (8 dòng) rồi lấy bình quân cộng 8 giá trị `mean_price_mxn_t4`. Con số ra khác `3.013,09 MXN` trong `kpi_by_snapshot.csv` — vì sao cách làm đó sai bản chất toán học?",
    "quickAnswer": "Vì trọng số (cỡ mẫu `valid_price_count`) của 8 khu vực chênh nhau tới **13.5 lần**: khu `A04` có `547` căn hợp lệ còn khu `A06` chỉ có `36` căn! Lấy trung bình cộng 8 khu ngang bằng nhau sẽ thổi phồng ảnh hưởng của các khu nhỏ ngoại vi lên gấp chục lần và dìm khu lõi xuống. Muốn tính đúng toàn mẫu phải **bình quân gia quyền theo cỡ mẫu** (hoặc tính trực tiếp từ bảng `kpi_by_listing.csv` như `src/kpi.py:L340`!).",
    "explanation": "Lỗi Mean of Means / Median of Medians là lỗ hổng thống kê nghiêm trọng nhất khi đọc bảng tổng hợp phân tầng.",
    "projectLink": "src/kpi.py:L330-L355; Bài 5",
    "codeLocation": "src/kpi.py:L330-L355; Bài 5",
    "proofExample": "Ví dụ cụ thể Bài 5: `(100×2 + 200×8)/10 = 180 != (100+200)/2 = 150`.",
    "followUpQuestions": [
      "Đặc biệt đối với **Median**, liệu có tồn tại công thức \"bình quân gia quyền các Median khu vực\" để ra đúng Median toàn thành phố không?"
    ],
    "followUpQA": [
      {
        "q": "Đặc biệt đối với **Median**, liệu có tồn tại công thức \"bình quân gia quyền các Median khu vực\" để ra đúng Median toàn thành phố không?",
        "a": "**KHÔNG BAO GIỜ!** Median là thống kê phi tuyến dựa trên thứ tự phần tử toàn cục — bắt buộc phải tính trực tiếp từ danh sách phẳng `kpi_by_listing.csv`!"
      }
    ],
    "commonMistakes": [
      "Tin rằng `mean(area_means)` chỉ lệch sai số làm tròn nhỏ so với `mean(all_listings)`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-004",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy làm tròn số độc lập tại `t1` (`Urgency Gap = 0.1667 vs 0.1668`).",
    "question": "Câu hỏi gài: Trên `kpi_by_snapshot.csv` tại mốc `t1`, cột `occ_1_30` in `0.4849` và `occ_31_90` in `0.3182`, hiệu bằng mắt là `0.1667`, nhưng cột `urgency_gap` lại ghi `0.1668`! Có phải code `src/kpi.py` trừ sai phép tính cộng trừ cơ bản không?",
    "quickAnswer": "**CODE HOÀN TOÀN ĐÚNG!** Đây là hiện tượng chuẩn của làm tròn độc lập (`round half to even` ở chữ số thứ 4): thực tế `mean(Occ_1-30) = 0.484928...` làm tròn 4 chữ số thành `0.4849`; `mean(Occ_31-90) = 0.318176...` làm tròn thành `0.3182`. Trong code `src/kpi.py:L205`, `urgency_gap` được tính trên **giá trị float64 nguyên bản chính xác** trước khi xuất (`0.484928 - 0.318176 = 0.166752...`), nên khi làm tròn 4 chữ số độc lập thành `0.1668`!",
    "explanation": "Phản biện bén nhạy dựa trên toán học dấu phẩy động thực tế của chính tệp CSV trong repo.",
    "projectLink": "data/processed/kpi_by_snapshot.csv; src/kpi.py:L205",
    "codeLocation": "data/processed/kpi_by_snapshot.csv; src/kpi.py:L205",
    "proofExample": "Đối chiếu trực tiếp `data/processed/kpi_by_snapshot.csv` dòng `t1`.",
    "followUpQuestions": [
      "Trong hai số `0.1667` (từ hiệu số đã làm tròn) và `0.1668` (từ giá trị gốc làm tròn sau), con số nào mới chính xác về mặt toán học?"
    ],
    "followUpQA": [
      {
        "q": "Trong hai số `0.1667` (từ hiệu số đã làm tròn) và `0.1668` (từ giá trị gốc làm tròn sau), con số nào mới chính xác về mặt toán học?",
        "a": "`0.1668` (`0.484928 - 0.318176 = 0.166752`), vì quy tắc tính chuẩn luôn làm tròn ở bước hiển thị cuối cùng!"
      }
    ],
    "commonMistakes": [
      "Vội thừa nhận \"chắc máy em bị lỗi làm tròn trong src/kpi.py\" hoặc sửa lại bằng lấy 2 số đã làm tròn trừ cho nhau làm sai lệch kết quả chuẩn."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_snapshot.csv"
    ]
  },
  {
    "id": "vr-005",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy nhầm World Cup `t4` là đỉnh công suất đặt phòng thay vì Semana Santa `t3`.",
    "question": "Câu hỏi gài: Có phải vì World Cup 2026 khai mạc ở CDMX đúng tuần `t4` (`2026-06-15`) nên cả **giá**, **Occupancy ngắn hạn (`Occ_1-30`)** lẫn **Urgency Gap** đều đạt đỉnh cao nhất toàn dự án ngay tại `t4` đúng không?",
    "quickAnswer": "**CHỈ ĐÚNG 1/3 (GIÁ), SAI 2/3 CÒN LẠI (OCCUPANCY & URGENCY GAP)!** Theo `kpi_by_snapshot.csv`: chỉ có **Giá/PPG** đạt đỉnh ở `t4` (`1.940 MXN / 626.79 MXN`). Ngược lại, đỉnh của **`Occ_1-30` (`48.47%`)** và **`Urgency Gap` (`+21.38 pp`)** thực chất rơi vào **`t3` (`2026-03-30`, Tuần Thánh Semana Santa)**; còn đến `t4`, `Occ_1-30` giảm nhẹ về `44.53%` và Urgency Gap hạ về `+18.06 pp`!",
    "explanation": "Bẫy tư duy cảm tính \"sự kiện thể thao nổi tiếng nhất phải kéo mọi chỉ số đạt đỉnh cùng lúc\".",
    "projectLink": "figures/kpi_occupancy_gap.png; data/processed/kpi_by_snapshot.csv",
    "codeLocation": "figures/kpi_occupancy_gap.png; data/processed/kpi_by_snapshot.csv",
    "proofExample": "Xem trực tiếp `figures/kpi_occupancy_gap.png` và `kpi_by_snapshot.csv`.",
    "followUpQuestions": [
      "Thậm chí so sánh `Occ_1-30` giữa `t1` (tháng 9/2025: `48.49%`) và `t4` (World Cup: `44.53%`), nhận xét nào chính xác?"
    ],
    "followUpQA": [
      {
        "q": "Thậm chí so sánh `Occ_1-30` giữa `t1` (tháng 9/2025: `48.49%`) và `t4` (World Cup: `44.53%`), nhận xét nào chính xác?",
        "a": "`Occ_1-30` của `t4` thực tế thậm chí THẤP hơn cả `t1` (`44.53% < 48.49%`), dù mặt bằng giá chào tại `t4` cao hơn tới `+67.3%`!"
      }
    ],
    "commonMistakes": [
      "Đoán theo cảm tính mọi chỉ số đều tăng thẳng đứng từ `t1` đến `t4`."
    ],
    "relatedFiles": [
      "figures/kpi_occupancy_gap.png"
    ]
  },
  {
    "id": "vr-006",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "Storytelling"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `Availability` != `Occupancy thực tế đã thanh toán`.",
    "question": "Câu hỏi gài: Báo cáo ghi nhận `Occ_1-30` tại `t3` là `48.47%` và tại khu `A04` `t4` là `49.7%`. Có thể báo cáo với SECTUR CDMX rằng *\"49.7% số đêm phòng ở trung tâm đã bán hết có khách tới ở và đóng thuế lưu trú\"* không?",
    "quickAnswer": "**TUYỆT ĐỐI KHÔNG!** Inside Airbnb hoàn toàn không có lịch sử giao dịch thanh toán! Số liệu `Occ_1-30 = (30 - availability_30) / 30` thực chất là **tỷ lệ ngày không mở đặt (Unavailability Proxy)**: một ngày bị trừ khỏi `availability_30` có thể do (a) khách đã đặt thật trên Airbnb, HOẶC (b) chủ nhà tự khóa lịch để ở, sửa nhà, đầu cơ giữ phòng chờ giá cao hay bán qua Booking.com! Mặc dù đã lọc `Ghost Listing`, nhóm vẫn không thể tách biệt phần chủ nhà tự khóa lịch ngắn hạn.",
    "explanation": "Bảo vệ đúng Ranh giới Khái niệm số 2 của Bài 14.",
    "projectLink": "src/kpi.py:L185-L215; reports/report.pdf",
    "codeLocation": "src/kpi.py:L185-L215; reports/report.pdf",
    "proofExample": "Thí dụ rõ nhất ngay trong dữ liệu: 2 căn treo `153.540 MXN` có `Occ = 0%` còn một số căn khóa dài lại biến thành `Occ = 100%` nếu chưa lọc Ghost.",
    "followUpQuestions": [
      "Tín hiệu bổ trợ nào giúp nghi ngờ một khu vực có `Occ` cao bất thường do khóa lịch giả chứ không phải nhiều khách đặt?"
    ],
    "followUpQA": [
      {
        "q": "Tín hiệu bổ trợ nào giúp nghi ngờ một khu vực có `Occ` cao bất thường do khóa lịch giả chứ không phải nhiều khách đặt?",
        "a": "Đối chiếu thêm `Review Velocity`: nếu `Occ` cao chót vót nhưng `Review Velocity` liên tiếp bằng 0 thì nghi vấn khóa lịch thủ công cực cao!"
      }
    ],
    "commonMistakes": [
      "Gọi thẳng `Occ_1-30` là \"tỷ lệ phòng đã có khách đặt\" trong câu kết luận doanh thu/thuế."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-007",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy \"Nhân quả từ Tương quan\": Giá tăng +67.3% vào 06/2026 -> \"World Cup gây ra tăng giá 67.3%\".",
    "question": "Câu hỏi gài: Nếu AI viết bản tóm tắt rằng *\"Kết quả pipeline chứng minh FIFA World Cup 2026 đã làm giá phòng Mexico City tăng +67.3%\"*, câu văn này mắc bao nhiêu lỗi khoa học nghiêm trọng?",
    "quickAnswer": "Mắc **3 lỗi sai nghiêm trọng**:\n1) **Suy diễn nhân quả từ dữ liệu quan sát:** Không có nhóm đối chứng (một CDMX khác năm 2026 không có World Cup để chạy DiD), mà thực tế ngay từ `t3` (cuối tháng 3 — cách World Cup gần 3 tháng) giá đã tăng tới `+52.5%` rồi (hòa lẫn yếu tố mùa vụ, lạm phát, Semana Santa);\n2) **Đánh đồng mẫu 1.000 căn với \"Mexico City\":** Mẫu cố định phân công chỉ chiếm `~3.2%` thị trường và tập trung `52.5%` ở Cuauhtémoc;\n3) **Đánh đồng giá chào với giá chốt:** `+67.3%` là mức tăng giá niêm yết (`listed price`), chưa chắc khách giao dịch khớp lệnh ở mức giá này!",
    "explanation": "Đáp án đanh thép chuẩn Bài 14 cho bài toán thẩm định kết luận AI.",
    "projectLink": "reports/report.pdf; Bài 14",
    "codeLocation": "reports/report.pdf; Bài 14",
    "proofExample": "Đối chiếu tốc độ tăng `t1 -> t3 (+52.5%)` vs `t3 -> t4 (+9.7% thêm)` ngay trên `kpi_by_snapshot.csv`.",
    "followUpQuestions": [
      "Hãy viết lại đúng 1 câu văn khoa học thay thế hoàn hảo cho câu lỗi trên."
    ],
    "followUpQA": [
      {
        "q": "Hãy viết lại đúng 1 câu văn khoa học thay thế hoàn hảo cho câu lỗi trên.",
        "a": "\"Trên mẫu cố định 1.000 chỗ ở khảo sát tại CDMX, trung vị giá chào niêm yết đã tăng 67.3% từ mốc nền tháng 9/2025 (`t1`) lên 1.940 MXN/đêm tại mốc trùng tuần khai mạc World Cup tháng 6/2026 (`t4`).\""
      }
    ],
    "commonMistakes": [
      "Chỉ nói chung chung \"thiếu nhóm đối chứng\" mà quên mất mốc `t3` đã gánh sẵn `52.5%` trong tổng `67.3%`!"
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vr-008",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy \"Mất dữ liệu t2 là bằng chứng giá đứng yên\" hay nội suy bừa `t2 = (t1 + t3)/2`.",
    "question": "Câu hỏi gài: Trên biểu đồ `kpi_ppg_snapshots.png`, có thể nối thẳng đường từ `t1` sang `t3` (nội suy tuyến tính cho `t2`) hoặc giải thích thiếu giá tại `t2` nghĩa là \"mùa đông cuối năm không ai niêm yết giá\" được không?",
    "quickAnswer": "**TUYỆT ĐỐI KHÔNG!** Cả 2 đều ngụy biện:\n- Thiếu giá ở `t2` là do tệp nguồn của Inside Airbnb ngày `2025-12-29` khuyết cột `price` (`1.000/1.000` căn thiếu, dù có tới `997` căn vẫn có lịch phòng hoạt động bình thường!).\n- Nếu nội suy tuyến tính `t2 = (t1 + t3)/2`, ta bỏ qua hoàn toàn hiệu ứng cao điểm Giáng sinh–Năm mới cuối tháng 12 vốn hoàn toàn có thể cao vọt lên rồi hạ sau Tết! Báo cáo trung thực bắt buộc để `t2` hiển thị là **`NA` / Khoảng trống nguồn**.",
    "explanation": "Bảo toàn nguyên tắc Không bịa số liệu cho khoảng thiếu cấu trúc.",
    "projectLink": "figures/kpi_ppg_snapshots.png; reports/qa_report.csv",
    "codeLocation": "figures/kpi_ppg_snapshots.png; reports/qa_report.csv",
    "proofExample": "`figures/kpi_ppg_snapshots.png` khung `t2` in rõ thông báo `Thiếu dữ liệu giá (n=0)`.",
    "followUpQuestions": [
      "Số liệu thực tế tại `t2` chứng minh `997` căn vẫn hoạt động là lấy từ biến nào?"
    ],
    "followUpQA": [
      {
        "q": "Số liệu thực tế tại `t2` chứng minh `997` căn vẫn hoạt động là lấy từ biến nào?",
        "a": "`occ_n = 997` và `review_velocity_n = 1.000` trong `kpi_by_snapshot.csv`!"
      }
    ],
    "commonMistakes": [
      "Vẽ đường thẳng nối liền qua mốc `t2` khiến người đọc ngỡ giá tăng đều đặn giữa tháng 9 và tháng 3."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_snapshots.png"
    ]
  },
  {
    "id": "vr-009",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện: Review giảm/0 review != Căn hộ ngừng kinh doanh (`Ghost = 1`).",
    "question": "Phản biện: Nếu một căn hộ tại CDMX có `Ghost = 1` ở `t1` (`a365 = 0` và `last_review > 90 ngày`), liệu chủ nhà đã bỏ nghề/rời Airbnb vĩnh viễn chưa? Lấy bằng chứng ngay trong dữ liệu CDMX.",
    "quickAnswer": "Chưa chắc chắn rời vĩnh viễn! `Ghost = 1` chỉ là trạng thái vận hành tạm thời trên dữ liệu quan sát: chủ nhà có thể đi du lịch khóa lịch, cải tạo nhà, hoặc chuyển sang cho thuê dài hạn vài tháng ngoài nền tảng rồi mở lại! **Bằng chứng đanh thép trong `kpi_by_listing.csv`:** tỷ lệ Ghost cực nhỏ (`0.0%–0.7%`) và **0/1.000 căn hộ nào bị gắn nhãn `ghost = 1` liên tiếp cả 4 mốc `t1..t4`** — tất cả các căn `ghost` ở `t1` hoặc `t2` đều đã mở lại hoặc phục hồi hoạt động ở kỳ `t3`!",
    "explanation": "Kết hợp lập luận logic với chứng cứ xác thực từ panel `kpi_by_listing.csv`.",
    "projectLink": "src/kpi.py:L150-L184; data/processed/kpi_by_listing.csv",
    "codeLocation": "src/kpi.py:L150-L184; data/processed/kpi_by_listing.csv",
    "proofExample": "Quan sát tại `t3`: `ghost_count = 0` (`0.0%`).",
    "followUpQuestions": [
      "Tại sao `src/kpi.py` lại phải tạo biến `Ghost` nếu ở CDMX tỷ lệ tối đa chỉ 0.7%?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/kpi.py` lại phải tạo biến `Ghost` nếu ở CDMX tỷ lệ tối đa chỉ 0.7%?",
        "a": "Để đảm bảo sạch logic khi tính Occupancy (tránh căn khóa năm `a30 = 0` bị hiểu nhầm thành `Occ = 100%`) và bảo đảm tính tổng quát khi chạy pipeline sang các thành phố khác có nhiều căn bỏ hoang hơn."
      }
    ],
    "commonMistakes": [
      "Đánh đồng định nghĩa vận hành `ghost = 1` với \"tài khoản rác đã chết vĩnh viễn\"."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-010",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "LLM"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy chọn mẫu review LLM (`14.8% phàn nàn tiện nghi ở Cuauhtémoc` != `14.8% toàn thành phố`).",
    "question": "Câu hỏi gài: Trên `llm_insights.png`, khía cạnh `amenities` ghi nhận `14.8%` phàn nàn (`negative+mixed`) ở Cuauhtémoc. Có thể phát biểu *\"Khoảng 15% khách du lịch trên toàn Mexico City đang bất mãn về tiện nghi phòng Airbnb\"* không?",
    "quickAnswer": "**SAI 3 LẦN:**\n(1) `749/1.000` (74.9%) review LLM nằm riêng tại Cuauhtémoc, không đại diện cho toàn bộ 16 quận thành phố (3 quận không có review LLM nào, nhiều quận chỉ `n = 1..5`);\n(2) Con số `14.8%` gồm **gộp cả `mixed` (chủ yếu là khen kèm góp ý nhỏ như nước nóng chậm, chứ không phải \"bất mãn toàn phần\" — tỷ lệ thuần `negative` chỉ là `1.87%`!)**;\n(3) Khách viết review tự chọn lọc trên nền tảng cũng mang đặc trưng khác khách thuê dài ngày im lặng.",
    "explanation": "Tách bạch rạch ròi: **Mức độ nghiêm trọng (`negative` vs `mixed`)** và **Phạm vi mẫu địa bàn (`Cuauhtémoc n=749` vs toàn thành phố)**.",
    "projectLink": "figures/llm_insights.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/llm_insights.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Trên bảng `kpi_by_neighbourhood.csv`: `Cuauhtémoc` có `14` ca `negative` (`1.87%`) và `97` ca `mixed` (`12.95%`).",
    "followUpQuestions": [
      "Cũng trên hình đó, tại quận `Benito Juárez` hay `Azcapotzalco` thấy cột màu đỏ rất đậm (`25%` hoặc hơn), vì sao không được coi là \"điểm nóng khủng hoảng lớn nhất CDMX\"?"
    ],
    "followUpQA": [
      {
        "q": "Cũng trên hình đó, tại quận `Benito Juárez` hay `Azcapotzalco` thấy cột màu đỏ rất đậm (`25%` hoặc hơn), vì sao không được coi là \"điểm nóng khủng hoảng lớn nhất CDMX\"?",
        "a": "Vì cỡ mẫu review LLM của `Azcapotzalco` chỉ có **`n = 2`** (hoặc các quận nhỏ chỉ `n = 1..15`), chỉ 1 câu góp ý đã đẩy tỷ lệ `%` vọt lên rất cao do mẫu số nhỏ!"
      }
    ],
    "commonMistakes": [
      "Đọc `complaint_mixed_amenities = 14.82%` thành \"14.82% đánh giá chê bai tệ hại (negative)\"."
    ],
    "relatedFiles": [
      "figures/llm_insights.png"
    ]
  },
  {
    "id": "vr-011",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "Evaluation",
      "Baseline"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy \"Accuracy 85% là tốt\" khi lớp `positive` chiếm 73/100 mẫu.",
    "question": "Câu hỏi gài: `Baseline Regex` trong `evaluation_report.csv` đạt `cam_xuc_accuracy = 0.85` (85%). Tại sao Nhóm 4 không dừng lại ở Baseline cho miễn phí (`$0`) mà vẫn tốn tiền dùng Gemini LLM?",
    "quickAnswer": "Vì **Accuracy `85%` là ảo giác của mất cân bằng lớp**: có tới `73/100` mẫu là `positive`, nên mô hình chỉ cần đoán bừa thiên về `positive` đã sẵn 73% điểm! Thước đo công bằng mọi lớp **`Macro F1` đã bóc trần Baseline tụt thê thảm xuống `0.5224`** (`0.4648` trên 7 khía cạnh) vì nó thất bại nặng ở chính nhóm **mixed và negative** — nơi chứa thông tin giá trị nhất về các phàn nàn tiện nghi & tiếng ồn cho SECTUR CDMX!",
    "explanation": "Giải thích chuẩn kinh tế–kỹ thuật lý do ROI của LLM (`$0.2030` cho 1.000 mẫu đổi lấy bước nhảy Macro F1 `+0.4685`).",
    "projectLink": "reports/evaluation_report.csv; figures/llm_vs_baseline.png",
    "codeLocation": "reports/evaluation_report.csv; figures/llm_vs_baseline.png",
    "proofExample": "So sánh `cam_xuc_accuracy` (`0.85 vs 0.99`) với `cam_xuc_macro_f1` (`0.5224 vs 0.9909`).",
    "followUpQuestions": [
      "Thậm chí nếu bài toán chỉ nhằm trích xuất câu thuần tiếng Anh rất đơn giản và kinh phí `$0`, ngưỡng `Accuracy` tối thiểu của mô hình đoán toàn `positive` là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Thậm chí nếu bài toán chỉ nhằm trích xuất câu thuần tiếng Anh rất đơn giản và kinh phí `$0`, ngưỡng `Accuracy` tối thiểu của mô hình đoán toàn `positive` là bao nhiêu?",
        "a": "`0.73` (`73%`) — nghĩa là Baseline Regex thực chất chỉ cải thiện hơn bộ đoán ngây thơ hằng số có `12%` về Accuracy tổng!"
      }
    ],
    "commonMistakes": [
      "Trả lời chung chung \"vì đề bài bắt dùng LLM\" thay vì chứng minh bằng lỗ hổng Macro F1 trên lớp thiểu số!"
    ],
    "relatedFiles": [
      "reports/evaluation_report.csv"
    ]
  },
  {
    "id": "vr-012",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "LLM",
      "Evaluation"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện: \"LLM đạt 0.99 Accuracy trên 100 nhãn tay, vậy chắc chắn LLM đúng 99% trên toàn 1.000 mẫu và không có lỗi hệ thống nào\".",
    "question": "Phản biện nhận định: *\"Vì LLM đạt `0.99` Accuracy và `0.9909` Macro F1 trên 100 mẫu nhãn tay (`ground_truth.csv`), nên có thể khẳng định 900 mẫu còn lại trong `reviews_sentiment.csv` cũng chính xác tuyệt đối 99% không cần kiểm tra thêm.\"* Lập luận này hổng ở đâu?",
    "quickAnswer": "Hổng ở **3 điểm**:\n(1) `100` mẫu nhãn tay chỉ là 10% mẫu LLM, có độ bất định chọn mẫu (ví dụ trong 100 mẫu chỉ có 2 câu `negative`);\n(2) 900 câu còn lại có thể chứa nhiều câu cực ngắn, ngôn ngữ hiếm hoặc lỗi nội tại chưa từng xuất hiện ở 100 mẫu -> đó là lý do bắt buộc phải chạy hàm **`hau_kiem()`** (`src/evaluate.py:L150`) kiểm tra 6 quy tắc logic trên toàn 1.000 mẫu (`llm_postcheck.csv`);\n(3) `ground_truth.csv` do người gán tay tạo nên vẫn tồn tại ranh giới chủ quan giữa `positive` nhẹ và `mixed`.",
    "explanation": "Phản biện tư duy quá tự tin vào điểm test nhỏ (`Generalization Gap`) và vai trò bắt buộc của Hậu kiểm (`Post-check`).",
    "projectLink": "src/evaluate.py:L150-L205; reports/llm_postcheck.csv",
    "codeLocation": "src/evaluate.py:L150-L205; reports/llm_postcheck.csv",
    "proofExample": "`llm_postcheck.csv` thực tế đã cảnh báo `193` lượt trên `176/1.000` câu cần kiểm tra chéo.",
    "followUpQuestions": [
      "Trong 6 quy tắc của `hau_kiem()`, quy tắc nào đóng góp nhiều cảnh báo nhất nhưng lại thường là \"cảnh báo lành tính\" với tiếng Tây Ban Nha?"
    ],
    "followUpQA": [
      {
        "q": "Trong 6 quy tắc của `hau_kiem()`, quy tắc nào đóng góp nhiều cảnh báo nhất nhưng lại thường là \"cảnh báo lành tính\" với tiếng Tây Ban Nha?",
        "a": "Quy tắc `khia_canh_khong_can_cu`: vì hàm hậu kiểm kiểm bằng từ điển từ khóa tiếng Anh hẹp trên một câu tiếng Tây Ban Nha/Đức/Pháp hợp lệ!"
      }
    ],
    "commonMistakes": [
      "Tin tuyệt đối điểm test trên 100 câu đồng nghĩa 100% hoàn hảo ở ngoài tập nhãn tay."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vr-013",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "LLM",
      "Python"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện thiết kế `Pydantic`: \"Structured Output đảm bảo JSON hợp lệ 100%, vậy nó có ngăn được LLM gán sai cảm xúc hoặc bịa thông tin không?\"",
    "question": "Phản biện: Vì `src/llm.py` dùng `response_schema` kết hợp `Pydantic BaseModel` khóa chặt các trường `Literal[\"positive\", \"mixed\", \"negative\", \"not_mentioned\"]`, điều này có bảo đảm LLM không bao giờ \"hallucinate\" (ảo giác) không?",
    "quickAnswer": "**KHÔNG!** Pydantic và `response_schema` chỉ khóa chặt **cú pháp (Syntax/Schema Validity)** — đảm bảo không thiếu khóa, không bị sai chính tả nhãn (vd không ra `\"neutral\"`). Nó hoàn toàn KHÔNG kiểm soát được **ngữ nghĩa đúng sai (Semantic Accuracy)**: mô hình vẫn có thể gán `\"noise\": \"negative\"` đúng cú pháp 100% cho một câu review thực tế khen nhà cực kỳ yên tĩnh! Chính vì thế mới cần bộ 3 lớp bảo vệ: Baseline đối chứng + `ground_truth.csv` + `hau_kiem()`.",
    "explanation": "Phân biệt sắc bén **Schema Validity** (Pydantic) vs **Semantic Correctness** (Evaluation & Post-check) — Bài 11.",
    "projectLink": "src/llm.py:L110-L135; src/evaluate.py; Bài 11",
    "codeLocation": "src/llm.py:L110-L135; src/evaluate.py; Bài 11",
    "proofExample": "Minh chứng ngay trong dữ liệu thật: LLM qua 100% Pydantic ở cả 1.000 câu nhưng vẫn sai `1` mẫu `overall` và vài nhãn khía cạnh so với `ground_truth.csv`.",
    "followUpQuestions": [
      "Tại sao `src/evaluate.py` lại kiểm tra cả `rong_nhung_co_nhan` nếu đã có Pydantic khóa đầu ra?"
    ],
    "followUpQA": [
      {
        "q": "Tại sao `src/evaluate.py` lại kiểm tra cả `rong_nhung_co_nhan` nếu đã có Pydantic khóa đầu ra?",
        "a": "Vì với một review rỗng `\"\"`, Pydantic vẫn chấp nhận bất kỳ tổ hợp `Literal` nào mà LLM sinh bừa ra (Pydantic không so sánh chéo nội dung văn bản gốc với nhãn đầu ra!)."
      }
    ],
    "commonMistakes": [
      "Tưởng Pydantic validation passed = dữ liệu AI hoàn toàn đúng sự thật."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vr-014",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "LLM",
      "API"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện quyết định dùng `batch_size = 5` thay vì `1` hoặc `50`.",
    "question": "Phản biện: Giả sử có người đề xuất: *\"Sao `src/llm.py` không gửi `batch_size = 1` cho đỡ lẫn lộn giữa các câu, hoặc gửi `batch_size = 100` cho nhanh hết 1 lần?\"* Hãy phân tích đánh đổi 3 chiều (Chi phí, Chất lượng, Rate Limit/Hồi phục)!",
    "quickAnswer": "- **`batch_size = 1`:** cần tới `1.000` request -> dễ đụng trần RPD (20–500 RPD tùy tier/model) và lặp lại 1.000 lần prompt hướng dẫn tốn kém input tokens!\n- **`batch_size = 50–100`:** tuy tiết kiệm số request nhưng ngữ cảnh quá dài khiến LLM dễ bỏ sót phần tử, đánh nhầm `review_id` giữa các câu, và nếu câu #42 gặp lỗi schema là hỏng cả batch 100 câu.\n- **`batch_size = 5` (kèm fallback `1`):** tối ưu cân bằng: giảm 5 lần số request (~200 request), mỗi batch ngắn (~550 input + ~340 output token) giữ độ chính xác `0.99` và dễ thu hồi câu sót với `batch_size = 1`!",
    "explanation": "Phân tích Trade-off có định lượng từ thực nghiệm BTL.",
    "projectLink": "configs/mexico-city.yaml:L28; src/llm.py:L310-L355",
    "codeLocation": "configs/mexico-city.yaml:L28; src/llm.py:L310-L355",
    "proofExample": "Chỉ tốn `$0.2030` USD cho trọn 1.000 mẫu và đạt tỷ lệ thành công 1.000/1.000.",
    "followUpQuestions": [
      "Trong code `src/llm.py:L250-L290`, cơ chế nào đảm bảo kể cả khi `batch_size = 5`, LLM không tráo nhầm nhãn của câu A sang câu B?"
    ],
    "followUpQA": [
      {
        "q": "Trong code `src/llm.py:L250-L290`, cơ chế nào đảm bảo kể cả khi `batch_size = 5`, LLM không tráo nhầm nhãn của câu A sang câu B?",
        "a": "Mỗi mục đầu vào gán nguyên `review_id`, schema yêu cầu xuất đúng trường `review_id`, và code ghép đối chiếu theo chính `review_id` trước khi lưu cache."
      }
    ],
    "commonMistakes": [
      "Cho rằng `batch_size` càng lớn càng tốt vì không thay đổi gì tới chất lượng gán nhãn của LLM."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vr-015",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "Baseline",
      "Regex"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy đọc code `src/baseline.py`: Tại sao câu `\"No noise at all\"` có `overall=\"positive\"` nhưng `noise=\"positive\"`?",
    "question": "Câu hỏi gài: Trong `src/baseline.py` dòng 92–118, khi phân tích câu `\"Great location! No noise at all.\"`, nhiều người đoán `aspect \"noise\"` sẽ mang nhãn `\"not_mentioned\"` vì `BENIGN_RE` đã xóa cụm `\"No noise\"` trước khi đếm `NEG_RE`! Tại sao kết quả chạy thật của `baseline.py` lại gán `out[\"noise\"] = \"positive\"`?",
    "quickAnswer": "Đọc chính xác code `L94-L118`:\n1) `BENIGN_RE` chỉ xóa `\"No noise\"` trong biến `cleaned` để đếm `n_neg = 0`, `n_pos = 0` (`clause` gốc vẫn còn nguyên chữ `\"noise\"`);\n2) Ở `L102`: `if pat and pat.search(clause):` tìm trên **`clause` gốc** nên thấy chữ `\"noise\"` -> đặt `aspect_flags[\"noise\"][0] = True` (`mentioned=True`);\n3) Ở `L117`: khi một khía cạnh được nhắc nhưng cả `has_pos` lẫn `has_neg` trên riêng mệnh đề đó đều là `False`, code rơi về **`overall`** (ở đây `overall = \"positive\"` từ mệnh đề đầu!) -> gán `out[\"noise\"] = \"positive\"`!",
    "explanation": "Đọc truy vết chính xác đến từng biến `cleaned` vs `clause` trong `src/baseline.py`.",
    "projectLink": "src/baseline.py:L94-L118",
    "codeLocation": "src/baseline.py:L94-L118",
    "proofExample": "Thực chất ở câu `\"Great location! No noise at all.\"`, gán `noise: positive` là HỢP LÝ về ngữ nghĩa (khách khen không ồn!), nhưng ở câu `\"Nice stay, street noise\"` mà `street noise` lọt từ điển `NEG_RE`, chính cơ chế fallback về `overall` lại vô tình gán nhầm `noise = positive`!",
    "followUpQuestions": [
      "Ngược lại nếu review chỉ có đúng 1 mệnh đề `\"No noise at all\"` (không có `\"Great location\"`), khi đó `total_pos = 0, total_neg = 0` thì `overall` và `noise` nhận giá trị gì?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại nếu review chỉ có đúng 1 mệnh đề `\"No noise at all\"` (không có `\"Great location\"`), khi đó `total_pos = 0, total_neg = 0` thì `overall` và `noise` nhận giá trị gì?",
        "a": "Ở `L109-L110`, khi `total_neg == 0` thì `overall = \"positive\"`, nên `out[\"noise\"]` cũng là `\"positive\"`!"
      }
    ],
    "commonMistakes": [
      "Nhìn `BENIGN_RE.sub` ở `L94` rồi tưởng `ASPECT_PATTERNS.search` cũng chạy trên `cleaned`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vr-016",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "critique",
    "topics": [
      "QA",
      "Code Trace"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện sai lệch giữa `AI_USAGE.md` / `docs/` và Code thực tế tại tag `final`.",
    "question": "Phản biện: Trong `AI_USAGE.md` từng nhắc hàm `validate_cohort_integrity` hoặc trong `docs/03` minh họa các chỉ số `Rev30`, `CommercialRatio`, `NSS` — nhưng tìm khắp `src/` tại tag `final` không thấy! Tại sao có hiện tượng này và cách giải trình đúng đắn khi vấn đáp là gì?",
    "quickAnswer": "Đúng thực tế mã nguồn tại tag `final` (`f69ebb19`): (1) `src/qa.py` chỉ có đúng 3 hàm/chính gồm **8 quy tắc QA** và KHÔNG tồn tại hàm `validate_cohort_integrity` (câu chuyện AI_USAGE.md phản ánh một đề xuất ý tưởng ban đầu ở phiên làm việc AI nhưng đã bị bỏ/thay thế khỏi bản nộp cuối); (2) `docs/03` là tài liệu tham khảo lý thuyết trên dữ liệu ví dụ **Santiago** (`Rev30`, `NSS`), còn Nhóm 4 phân tích **Mexico City (CDMX)** và cài bộ KPI riêng trong `src/kpi.py` (`Price/PPG`, `rIQR`, `RV`, `Ghost`, `Occ`, `Urgency Gap`, `Complaints`). **Nguyên tắc bảo vệ chuẩn:** Luôn căn cứ 100% vào code & CSV thực tại tag `final`, trung thực giải thích sự khác biệt giữa tài liệu tham khảo/lịch sử AI với sản phẩm thực tế, không được nhận vơ chức năng không tồn tại trong code!",
    "explanation": "Điểm 10 cho tinh thần trung thực khoa học (Honest Audit & AI Transparency).",
    "projectLink": "src/qa.py; src/kpi.py; AI_USAGE.md",
    "codeLocation": "src/qa.py; src/kpi.py; AI_USAGE.md",
    "proofExample": "Đã kiểm chứng toàn bộ AST 83 phần tử của `run_pipeline.py` + `src/*.py` tại tag `final`.",
    "followUpQuestions": [
      "Tương tự, tài liệu `docs/00` và `docs/05` ghi thời gian thi vấn đáp là `\"20 phút\"` còn đề bài chính thức `2627-1` ghi bao nhiêu phút?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự, tài liệu `docs/00` và `docs/05` ghi thời gian thi vấn đáp là `\"20 phút\"` còn đề bài chính thức `2627-1` ghi bao nhiêu phút?",
        "a": "Trang đề bài chính thức `2627-1` quy định **10 phút** mỗi sinh viên (5 câu × 90 giây; 20 phút chỉ dành trường hợp đặc biệt có đơn xác nhận từ trước)!"
      }
    ],
    "commonMistakes": [
      "Học thuộc lòng `AI_USAGE.md` hoặc `docs/03` rồi khẳng định với giảng viên \"trong code của em có hàm `validate_cohort_integrity` và tính `Rev30`\" — bị mở file `src/` kiểm tra tại chỗ là rớt ngay!"
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vr-017",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "critique",
    "topics": [
      "QA",
      "Data Cleaning"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện quyết định \"Gắn cờ không xóa\" (`qa_price_outlier` & `qa_missing_price`) so với pipeline truyền thống `df.dropna()`.",
    "question": "Phản biện: Nhiều sách giáo khoa dạy bước đầu tiên của làm sạch dữ liệu là `df = df.dropna()` và `clip` bỏ outlier. Tại sao `src/qa.py` của Nhóm 4 lại giữ cả hàng thiếu giá lẫn giá 153.540 MXN ngay trong bảng sạch `listings.csv`?",
    "quickAnswer": "Xóa hàng ở tầng QA (`df.dropna()`) là hành động phá hoại trong bài toán đa chỉ số:\n(1) Ở mốc `t2` thiếu 100% giá -> `dropna()` xóa trắng cả bảng `t2`, hủy diệt luôn 997 dòng dữ liệu Occupancy và 1.000 dòng Review Velocity vẫn hoàn toàn sạch!\n(2) Giá `153.540 MXN` tuy là ngoại lai nhưng là giá niêm yết thật của chủ nhà đầu cơ dịp World Cup — gắn cờ `qa_price_outlier` để truy vết kiểm toán nhưng giữ lại và dùng **Median/rIQR** mới thể hiện đúng bản chất phân hóa thị trường vs độ nhiễu của Mean.",
    "explanation": "Bảo vệ trọn vẹn triết lý thiết kế dữ liệu của Bài 10 & Nhóm 4.",
    "projectLink": "src/qa.py:L90-L150; reports/qa_report.csv",
    "codeLocation": "src/qa.py:L90-L150; reports/qa_report.csv",
    "proofExample": "Kết quả đối chứng trong `qa_report.csv`: `t2` giữ 1.000 dòng, `valid_price_count=0`, `occ_n=997`.",
    "followUpQuestions": [
      "Nhờ tách bạch trách nhiệm: `qa.py` gắn cờ và giữ `price_mxn`, vậy tầng nào chịu trách nhiệm thực sự loại giá thiếu/`<= 0` khỏi phép chia trung bình?"
    ],
    "followUpQA": [
      {
        "q": "Nhờ tách bạch trách nhiệm: `qa.py` gắn cờ và giữ `price_mxn`, vậy tầng nào chịu trách nhiệm thực sự loại giá thiếu/`<= 0` khỏi phép chia trung bình?",
        "a": "Tầng `src/kpi.py` tại dòng `L108`, `L228` với mặt nạ `~_qa_flag(df, \"qa_missing_price\") & df[price_col].notna() & (df[price_col] > 0)`!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `qa.py` chưa làm sạch xong vì vẫn còn `NaN` và số `153.540` nằm trong file `data/processed/*/listings.csv`."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vr-018",
    "category": "I",
    "categoryLabel": "Đọc hiểu code",
    "bucket": "critique",
    "topics": [
      "Code Trace",
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `price_mxn` khi giá = `\"-300\"` hay `\"0\"` trong `src/qa.py:L148`: file CSV có giữ số `-300.0` không?",
    "question": "Câu hỏi gài: Cho dữ liệu thô có dòng ghi `price = \"-300\"`. Sau khi chạy `src/qa.py`, giá trị trong cột `price_mxn` của `listings.csv` được đổi thành `NaN` (trống) hay vẫn lưu `-300.0`?",
    "quickAnswer": "**VẪN LƯU `-300.0` TRONG CỘT `price_mxn`, NHƯNG ĐỒNG THỜI GẮN CỜ `qa_missing_price = True`!** Đọc kỹ `src/qa.py:L94-L148`: biến `price_numeric = pd.to_numeric(...)` ra `-300.0`, mặt nạ `missing_price_mask` đánh dấu `True` cho `isna() | (<= 0)`, rồi dòng `L148` gán thẳng `df[price_col] = price_numeric` (chỉ có `accommodates_clean`, `availability_*_clean`, `number_of_reviews_clean` mới `.where(~mask, np.nan)`!). Sau đó `src/kpi.py:L228` mới dùng cả `~_qa_flag & (price > 0)` để loại `-300.0`!",
    "explanation": "Một câu hỏi soi code thực tế cực gắt chỉ ai đọc kỹ từng dòng `src/qa.py:L94-L148` mới trả lời trúng!",
    "projectLink": "src/qa.py:L94-L148, L191; src/kpi.py:L228",
    "codeLocation": "src/qa.py:L94-L148, L191; src/kpi.py:L228",
    "proofExample": "Khác biệt thực sự giữa cách xử lý `price_mxn` (`L148`) với `accommodates_clean` (`L191`).",
    "followUpQuestions": [
      "Hàm/điều kiện nào bên phía `src/kpi.py` ngăn chặn `-300.0` hay `0.0` lọt vào phép tính Mean/Median Price nếu giả sử có dữ liệu âm trong file CSV?"
    ],
    "followUpQA": [
      {
        "q": "Hàm/điều kiện nào bên phía `src/kpi.py` ngăn chặn `-300.0` hay `0.0` lọt vào phép tính Mean/Median Price nếu giả sử có dữ liệu âm trong file CSV?",
        "a": "Tại `src/kpi.py:L109, L228`: `~_qa_flag(df, \"qa_missing_price\") & df[price_col].notna() & (df[price_col] > 0)` — kiểm tra kép cả 2 lớp cờ QA lẫn `> 0`!"
      }
    ],
    "commonMistakes": [
      "Đoán rằng `qa.py` viết `.where(~missing_price_mask, np.nan)` giống hệt các cột `*_clean` khác."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vr-019",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "critique",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện nguyên tắc \"Vấn đáp Hoàn toàn Cá nhân\": Tại sao không thể trả lời \"phần code này do thành viên khác viết nên em chỉ phụ trách phần biểu đồ\"?",
    "question": "Phản biện: Trong đồ án nhóm 4 người, giả sử khi vấn đáp bạn bốc trúng câu hỏi truy vết dòng `140` của `src/llm.py` hoặc công thức `_iqr_stats()` trong `src/kpi.py`. Việc trả lời *\"Phần này do thành viên phụ trách backend LLM/KPI viết, em phụ trách phần QA/Visual nên em chỉ nắm sơ qua\"* bị đánh giá thế nào theo quy định học phần UET.DSE2049?",
    "quickAnswer": "**BỊ CHẤM 0 ĐIỂM PHẦN ĐÓ (HOẶC ĐÁNH GIÁ CHƯA ĐẠT CHUẨN CÁ NHÂN)!** Quy định chính thức của môn UET.DSE2049 yêu cầu **One Project – Every Student Understands Everything**: AI có thể hỗ trợ lập trình và các thành viên có thể phối hợp triển khai lúc làm BTL ở nhà, nhưng tại kỳ vấn đáp cá nhân (chế độ Đóng 10 phút), **mỗi cá nhân phải tự giải thích, bảo vệ và truy vết độc lập toàn bộ bài toán, dữ liệu, thuật toán và mọi tệp code** từ `download.py` tới `viz.py` mà không được viện dẫn phân công nhóm!",
    "explanation": "Khẳng định triết lý cốt lõi xuyên suốt học phần & hệ thống ôn tập.",
    "projectLink": "project_airbnb.html; AI_USAGE.md",
    "codeLocation": "project_airbnb.html; AI_USAGE.md",
    "proofExample": "Quy định ghi rõ ở `project_airbnb.html`: Vấn đáp chiếm 50% tổng điểm BTL, hỏi cá nhân trực tiếp trên mọi thành phần của repo đã nộp.",
    "followUpQuestions": [
      "Nếu sử dụng AI hỗ trợ viết một hàm phức tạp như `_centroid()` trong `src/viz.py` hay `build_schemas()` trong `src/llm.py`, sinh viên cần làm gì trước buổi vấn đáp?"
    ],
    "followUpQA": [
      {
        "q": "Nếu sử dụng AI hỗ trợ viết một hàm phức tạp như `_centroid()` trong `src/viz.py` hay `build_schemas()` trong `src/llm.py`, sinh viên cần làm gì trước buổi vấn đáp?",
        "a": "Phải tự đọc từng dòng, tự kiểm chứng đầu vào/ra bằng ví dụ nhỏ bằng tay (như Code Explorer A–J và Code Trace Mode trên web này) và giải thích được vì sao chọn thuật toán đó."
      }
    ],
    "commonMistakes": [
      "Chuẩn bị kiểu \"học tủ phần mình tự gõ code, bỏ qua file khác\"."
    ],
    "relatedFiles": [
      "project_airbnb.html"
    ]
  },
  {
    "id": "vr-020",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "pandas",
      "SQL"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `BinderException` & SQL `NULL` trong `docs/01` khi chuyển sang kiểm chứng code thật.",
    "question": "Câu hỏi gài: Trong `docs/01:L90-100` có viết câu SQL DuckDB minh họa: `SELECT listing_id, CAST(? AS DATE) AS snapshot_date, COUNT(*) ... GROUP BY listing_id`. Câu SQL này chạy trên DuckDB có bị lỗi không, và tại sao `INNER JOIN` hai bảng có khóa `NULL` trong SQL lại khác `pd.merge()` trong pandas?",
    "quickAnswer": "Có **2 bẫy liên tiếp**:\n(1) `snapshot_date` nằm ở `SELECT` không nằm trong hàm tổng hợp nhưng lại thiếu trong `GROUP BY` -> DuckDB báo ngay **`BinderException: column \"snapshot_date\" must appear in the GROUP BY clause`** (phải thêm vào `GROUP BY` hoặc bọc `ANY_VALUE()`/`MAX()`);\n(2) Trong SQL chuẩn, `NULL = NULL` trả về `UNKNOWN` nên 2 hàng thiếu khóa bị **LOẠI khỏi `INNER JOIN`**; còn trong `pd.merge(df1, df2, on=\"id\")`, pandas mặc định xem **`NaN == NaN` là `True`** nên sẽ **GHÉP TÍCH ĐỀ-CÁC MỌI HÀNG THIẾU ID VỚI NHAU** (nổ dữ liệu kinh hoàng nếu cột `id` có nhiều dòng `NaN`)!",
    "explanation": "Phát hiện lỗi ngay trong tài liệu tham khảo và đối chiếu khác biệt giữa SQL và pandas (Bài 5–6).",
    "projectLink": "src/kpi.py:L409; docs/01; Bài 5 & Bài 6",
    "codeLocation": "src/kpi.py:L409; docs/01; Bài 5 & Bài 6",
    "proofExample": "Cũng chính vì bẫy `NaN == NaN` của `pd.merge()`, `src/kpi.py:L409` viết `dropna(subset=[\"listing_id\"])` sạch sẽ trước khi ghép!",
    "followUpQuestions": [
      "Trong pandas từ bản 2.2/3.0 trở đi, có tham số hoặc cách nào an toàn hơn trước khi gọi `pd.merge()`?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas từ bản 2.2/3.0 trở đi, có tham số hoặc cách nào an toàn hơn trước khi gọi `pd.merge()`?",
        "a": "Luôn kiểm khóa `df[key].isna().sum()`, lọc `.dropna(subset=[key])`, và truyền `validate=\"many_to_one\"` hoặc `\"one_to_one\"`."
      }
    ],
    "commonMistakes": [
      "Tin rằng `pd.merge()` luôn bỏ qua các dòng khóa `NaN` giống `INNER JOIN` của SQL!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-021",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "NumPy",
      "pandas"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `df[\"price_mxn\"]` trên `pd.concat` vs `reset_index(drop=True)` khi nối cột ngang `axis=1`.",
    "question": "Câu hỏi gài: Nếu có hai Series cùng độ dài `s1` (index `[0, 1, 2]`) và `s2` (index `[1, 2, 0]` sau khi `sort_values`), rồi ai đó ghép ngang bằng `pd.concat([s1, s2], axis=1)`. Kết quả có giữ đúng thứ tự ghép phần tử đầu với đầu không?",
    "quickAnswer": "**KHÔNG!** `pd.concat(..., axis=1)` vẫn tuân thủ **Index Alignment**: ghép `s1[0]` với `s2[0]` (dù `s2[0]` đang nằm ở cuối), `s1[1]` với `s2[1]`... Ngược lại nếu hai Series có tập nhãn index hoàn toàn lệch nhau (`[0,1,2]` vs `[3,4,5]`), `pd.concat([s1, s2], axis=1)` tạo ra bảng **6 dòng đầy `NaN`** thay vì 3 dòng! Đây là lý do trong `src/kpi.py`, mọi Series giữa 4 snapshot đều ép chung `.set_index(\"id\")` và `.reindex(base.index)`.",
    "explanation": "Kiểm tra hiểu biết sâu về Index Alignment khi nối ngang `axis=1`.",
    "projectLink": "src/kpi.py:L90-L120; Bài 5",
    "codeLocation": "src/kpi.py:L90-L120; Bài 5",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L90-L120; Bài 5`.",
    "followUpQuestions": [
      "Nếu thực sự muốn ghép ngang 2 bảng theo thứ tự vị trí sau khi đã cố ý sort đồng bộ mà không theo index cũ, cần gọi hàm gì trước?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thực sự muốn ghép ngang 2 bảng theo thứ tự vị trí sau khi đã cố ý sort đồng bộ mà không theo index cũ, cần gọi hàm gì trước?",
        "a": "Gọi `.reset_index(drop=True)` trên từng phần trước khi `concat(..., axis=1)`."
      }
    ],
    "commonMistakes": [
      "Nghĩ `pd.concat(..., axis=1)` dán 2 cột cạnh nhau đơn thuần theo vị trí hàng thứ `i` bất kể index."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-022",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "pandas",
      "Datetime"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `.between(0, 5)` khi có `NaN` vs so sánh `~col.between(0, 5)` trong QA.",
    "question": "Câu hỏi gài: Trong biểu thức kiểm tra điểm đánh giá ở Bài 10: `df[\"rating\"] = [4.8, 6.0, np.nan]`. Nếu viết thiếu `rating.notna()` và chỉ viết `sai_mien = ~df[\"rating\"].between(0, 5)`, ô `np.nan` ở dòng 2 bị đánh dấu `True` hay `False`?",
    "quickAnswer": "Bị đánh dấu **`True` (GẮN CỜ LỖI OAN CHO Ô THIẾU)!** Vì `np.nan.between(0, 5)` trả về `False`, nên phủ định `~False` trở thành **`True`**! Phải viết **`df[\"rating\"].notna() & ~df[\"rating\"].between(0, 5)`** (giống hệt cách `src/qa.py:L278` bọc `last_review_dt.notna() & ...` để không phạt oan căn 0 review!).",
    "explanation": "Bẫy `~between()` kinh điển của Bài 10 khi lọc vi phạm miền giá trị mà quên tách rời giá trị thiếu (`missing`) và sai miền (`out of bounds`).",
    "projectLink": "src/qa.py:L278; Bài 10",
    "codeLocation": "src/qa.py:L278; Bài 10",
    "proofExample": "Kiểm chứng ngay trong `src/qa.py:L278` (`RULE_LAST_REVIEW_VALIDITY`): `(~lr_missing) & (...)`.",
    "followUpQuestions": [
      "Thế nếu viết `~missing_mask & ...` với kiểu nullable `pd.NA` (boolean) có bẫy gì tương tự không?"
    ],
    "followUpQA": [
      {
        "q": "Thế nếu viết `~missing_mask & ...` với kiểu nullable `pd.NA` (boolean) có bẫy gì tương tự không?",
        "a": "Nếu `~pd.NA` ra `pd.NA` thì mặt nạ dùng ở `df[mask]` lỗi ngay -> luôn ép chắc sang `bool` chuẩn hoặc `.fillna(False)`."
      }
    ],
    "commonMistakes": [
      "Quên bọc `notna()` trước toán tử phủ định `~` làm tất cả các ô trống hợp lệ bị coi là giá trị ngoại biên sai miền!"
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vr-023",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "Python",
      "Regex"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy thoát ký tự backslash `\\` khi không dùng raw string `r\"...\"` với `\\b`.",
    "question": "Câu hỏi gài: Trong `src/baseline.py` hoặc `src/qa.py`, nếu lập trình viên vô tình xóa chữ `r` trước chuỗi mẫu `pat = \"\\bnot\\b\"` (viết thành `\"\\bnot\\b\"` thường với 1 dấu gạch chéo `\"\\bnot\\b\"`), Python hiểu chuỗi đó thành gì và hậu quả ra sao?",
    "quickAnswer": "Không có tiền tố `r`, Python biến `\\b` thành ký tự điều khiển **Backspace (mã ASCII `0x08`)** chứ không còn là ranh giới từ Regex! Lúc đó mẫu khớp trượt sạch sẽ 100% câu văn bản bình thường mà **HOÀN TOÀN KHÔNG BÁO LỖI SYNTAX HAY RUNTIME NÀO** — khiến toàn bộ cột nhận diện của Baseline sụp đổ thầm lặng!",
    "explanation": "Lỗi thầm lặng cực kỳ nguy hiểm của Python Regex (Bài 7).",
    "projectLink": "src/baseline.py:L25-L60; src/qa.py:L93; Bài 7",
    "codeLocation": "src/baseline.py:L25-L60; src/qa.py:L93; Bài 7",
    "proofExample": "Đối chiếu trực tiếp tại `src/baseline.py:L25-L60; src/qa.py:L93; Bài 7`.",
    "followUpQuestions": [
      "Còn với `\"\\d\"` hay `\"\\s\"` khi không có `r\"\"` trên Python 3.12+ thì chuyện gì xảy ra?"
    ],
    "followUpQA": [
      {
        "q": "Còn với `\"\\d\"` hay `\"\\s\"` khi không có `r\"\"` trên Python 3.12+ thì chuyện gì xảy ra?",
        "a": "Python 3.12+ phát `SyntaxWarning: invalid escape sequence \"\\d\"`, còn với `\"\\b\"` thậm chí không có cả cảnh báo vì `\\b` vốn là escape sequence hợp lệ trong chuỗi thường!"
      }
    ],
    "commonMistakes": [
      "Cho rằng quên chữ `r` trong `\"\\bnot\\b\"` sẽ làm Python văng `SyntaxError`."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vr-024",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "Code Trace"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện giả định Balanced Panel trong `build_kpi_by_listing()` (`snapshots[-1]`).",
    "question": "Phản biện: Tại sao hàm `build_kpi_by_listing()` (`src/kpi.py:L231`) lấy danh sách căn hộ cơ sở từ `snapshots[-1]` (`t4`) thay vì lấy hợp (`union`) tất cả ID ở 4 mốc? Điều này an toàn cho dữ liệu Nhóm 4 nhưng gãy ở kịch bản dữ liệu nào?",
    "quickAnswer": "Với bộ dữ liệu Nhóm 4 (bảng cân bằng cố định đúng cùng `1.000` listing hiện hữu ở cả `t1..t4`), `snapshots[-1]` cho tập ID đồng nhất `1.000` căn và thuận tiện lấy metadata mới nhất (`neighbourhood_cleansed`, `room_type` ở `t4`). **Tuy nhiên**, nếu áp dụng pipeline sang dữ liệu thực tế mở rộng có listing bị đóng cửa/gỡ khỏi nền tảng giữa `t2` và `t4` (unbalanced panel), việc neo ở `snapshots[-1]` sẽ **vô tình làm biến mất hoàn toàn các listing từng tồn tại ở `t1..t3`** (Survivorship Bias — thiên lệch kẻ sống sót)!",
    "explanation": "Chỉ rõ chính xác từng dòng code (`L231`, `L264`), giới hạn giả định và đề xuất sửa bằng `Index.union` nếu tổng quát hóa.",
    "projectLink": "src/kpi.py:L231, L264",
    "codeLocation": "src/kpi.py:L231, L264",
    "proofExample": "Trong tập CDMX Nhóm 4, cả 4 mốc đều giữ 1.000 ID khớp 1–1 nên không xảy ra Survivorship Bias giữa nội bộ mẫu, nhưng vấn đề vẫn tồn tại ở gốc chọn mẫu ban đầu (1.000 căn còn tồn tại đến `t4`).",
    "followUpQuestions": [
      "Survivorship Bias nhẹ khác vốn tồn tại ngay trong thiết kế mẫu 1.000 căn của cả dự án là gì?"
    ],
    "followUpQA": [
      {
        "q": "Survivorship Bias nhẹ khác vốn tồn tại ngay trong thiết kế mẫu 1.000 căn của cả dự án là gì?",
        "a": "Các căn hộ đã hoạt động nhộn nhịp ở `t1` nhưng phá sản/ngừng kinh doanh trước `t4` thường không lọt vào tập panel ổn định 4 mốc, có xu hướng thiên nhẹ về các chủ nhà bền bỉ."
      }
    ],
    "commonMistakes": [
      "Khẳng định `kpi.py` hỗ trợ tự động mọi listing biến mất giữa kỳ mà không có Survivorship Bias."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-025",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "critique",
    "topics": [
      "Visualization",
      "Code Trace"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện quyết định dùng hàm vẽ bản đồ tự viết bằng Matplotlib `Polygon` thay vì cài `geopandas` / `folium`.",
    "question": "Phản biện: Tại sao `src/viz.py` chọn viết thủ công `_centroid()` (công thức Shoelace) và `matplotlib.patches.Polygon` để vẽ Choropleth thay vì dùng một dòng `gdf.plot()` của `geopandas`?",
    "quickAnswer": "Vì **tính tái lập & gọn nhẹ môi trường (Reproducibility)**: `geopandas` kéo theo chuỗi thư viện C địa lý nặng nề (`GDAL`, `Fiona`, `PyProj`, `Shapely`) rất hay xung đột hoặc kẹt cài đặt trên Windows/Python 3.14 khi giảng viên chạy lại `pip install -r requirements.txt`! Tự viết ~40 dòng thuần Python + Matplotlib xử lý GeoJSON hoàn thành trọn vẹn bản đồ 4 khung sắc nét, có hatch gạch chéo `Tláhuac`, không phụ thuộc thư viện nặng.",
    "explanation": "Bảo vệ quyết định kỹ thuật xuất sắc dựa trên mục tiêu triển khai & chấm bài thực tế.",
    "projectLink": "src/viz.py:L55-L105, L240-L280",
    "codeLocation": "src/viz.py:L55-L105, L240-L280",
    "proofExample": "`requirements.txt` giữ siêu gọn nhẹ và `deploy/chấm bài` cài đặt không gặp xung đột hệ thống.",
    "followUpQuestions": [
      "Công thức toán học nào được dùng bên trong `_centroid()` để đảm bảo tính đúng tâm đa giác lồi/lõm thay vì lấy trung bình tọa độ các đỉnh?"
    ],
    "followUpQA": [
      {
        "q": "Công thức toán học nào được dùng bên trong `_centroid()` để đảm bảo tính đúng tâm đa giác lồi/lõm thay vì lấy trung bình tọa độ các đỉnh?",
        "a": "Công thức **Diện tích đa giác Shoelace (`area2 = sum(x0*y1 - x1*y0)`)** và trọng tâm đa giác theo trọng số từng tam giác biên!"
      }
    ],
    "commonMistakes": [
      "Nói rằng \"vì `geopandas` không vẽ được bản đồ Choropleth hoặc không đọc được GeoJSON\"."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vr-026",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `price_mxn_t2` vs `Ghost Rate` tại `t2`: vì sao `kpi_by_snapshot.csv` thiếu giá nhưng vẫn tính được Ghost?",
    "question": "Câu hỏi gài: Ở mốc `t2` (2025-12-29), toàn bộ 1.000 căn đều bị thiếu `price` (`qa_missing_price = True`), vậy hàm `compute_ghost_listings()` tính ra `ghost_rate = 0.3%` bằng cách nào — có phải nó lấy giá ở `t1` bù qua không?",
    "quickAnswer": "**KHÔNG ĐỤNG TỚI GIÁ!** Tại `t2..t4`, công thức Ghost Listing là **`(availability_365_clean == 0) & (review_velocity == 0)`** (`src/kpi.py:L171`), chỉ sử dụng cột `availability_365` và `number_of_reviews` (cả hai đều đầy đủ `1.000/1.000` hợp lệ ở `t2`!). Đây chính là quả ngọt của kiến trúc gắn cờ từng cột ở `src/qa.py`: thiếu `price` không hề lây bệnh sang các KPI lịch và review!",
    "explanation": "Chứng minh tính độc lập giữa các cột QA giúp bảo vệ dữ liệu `t2` khỏi bị vứt bỏ.",
    "projectLink": "src/kpi.py:L170-L180; data/processed/kpi_by_snapshot.csv",
    "codeLocation": "src/kpi.py:L170-L180; data/processed/kpi_by_snapshot.csv",
    "proofExample": "Kết quả thực tế tại `t2`: `ghost_n = 1.000`, `ghost_count = 3`, `occ_n = 997`.",
    "followUpQuestions": [
      "Vậy những cột KPI nào tại `t2` mới thực sự trở thành `NaN`?"
    ],
    "followUpQA": [
      {
        "q": "Vậy những cột KPI nào tại `t2` mới thực sự trở thành `NaN`?",
        "a": "Toàn bộ 10+ chỉ số gắn với Giá/PPG tại `t2` (`valid_price_count=0, valid_ppg_count=0, mean/median/q1/q3/riqr của price và ppg đều NaN`)."
      }
    ],
    "commonMistakes": [
      "Cho rằng `t2` mất cột `price` nên kéo theo `Ghost` hoặc `Occ` cũng phải dựa vào giá ở `t1`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-027",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "QA"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện công thức `Ghost_t1` (> 90 ngày) vs `Ghost_t2..t4` (`RV == 0`): Sự không đồng nhất mốc thời gian.",
    "question": "Phản biện: Ở `src/kpi.py:L150-L180`, điều kiện gắn nhãn `Ghost` tại `t1` là `(a365 == 0) & (nr == 0 | days_since_last_review > 90)` còn tại `t2..t4` lại đổi thành `(a365 == 0) & (RV == 0)`. Sự thay đổi tiêu chí này có làm lệch so sánh giữa `t1` (`0.7%`) với `t2..t4` (`0.0%–0.4%`) không?",
    "quickAnswer": "Đây là đánh đổi thiết kế có chủ ý nhưng **cần thừa nhận rõ hạn chế bất đối xứng giữa `t1` và `t2..t4`**: ở `t1` không có `t0` đứng trước để tính hiệu số `Review Velocity`, buộc phải dùng ngưỡng thay thế `last_review > 90 ngày`. Từ `t2` trở đi, giữa `t1` (`2025-09-27`) và `t2` (`2025-12-29`) là `93` ngày (cùng khung ~1 quý `~90 ngày`, `t2->t3` là `91` ngày, `t3->t4` là `77` ngày!). Dù `Q3` chỉ `77` ngày hơi khắt khe hơn ngưỡng `90` ngày, `Ghost Rate` vẫn rất thấp (`0.4%`), và điều chỉnh này luôn phải minh bạch khi so sánh `t1` với `t2..t4`.",
    "explanation": "Phân tích sâu sự tương đồng (~91–93 ngày vs 90 ngày) và chênh lệch thực tế (77 ngày ở Q3) giữa hai công thức.",
    "projectLink": "src/kpi.py:L156-L182",
    "codeLocation": "src/kpi.py:L156-L182",
    "proofExample": "Xem `src/kpi.py:L156-L182` và khoảng ngày `93 / 91 / 77` giữa 4 snapshot YAML.",
    "followUpQuestions": [
      "Tại `Q3` (`t3 -> t4`) khoảng thời gian ngắn hơn (`77` ngày so với `93` ngày), điều đó làm `RV_q3 == 0` dễ xảy ra hơn hay khó xảy ra hơn?"
    ],
    "followUpQA": [
      {
        "q": "Tại `Q3` (`t3 -> t4`) khoảng thời gian ngắn hơn (`77` ngày so với `93` ngày), điều đó làm `RV_q3 == 0` dễ xảy ra hơn hay khó xảy ra hơn?",
        "a": "Dễ xảy ra `RV == 0` hơn một chút (vì chỉ có 77 ngày để phát sinh ít nhất 1 review thay vì 93 ngày), góp phần lý giải `ghost_t4` tăng nhẹ từ `0` lên `4` căn."
      }
    ],
    "commonMistakes": [
      "Nói hai công thức `Ghost` của `t1` và `t2..t4` là hoàn toàn giống hệt nhau về mặt toán học."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-028",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "critique",
    "topics": [
      "Visualization",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện biểu đồ `kpi_riqr_neighbourhood.png`: Vì sao đặt 2 biểu đồ `rIQR(Price)` và `rIQR(PPG)` cạnh nhau tạo nên phát hiện bất ngờ tại Xochimilco?",
    "question": "Phản biện: Có người chê `kpi_riqr_neighbourhood.png` thừa thãi khi vẽ cả `rIQR(Price)` lẫn `rIQR(PPG)`. Hãy chứng minh sự khác biệt giữa 2 thanh của riêng quận **Xochimilco** trên hình đó là lý do quan trọng nhất giữ lại cả hai!",
    "quickAnswer": "Nhìn trực tiếp `kpi_riqr_neighbourhood.png`: Ở cột `rIQR(Price)`, **Xochimilco đứng vọt lên tận `2.264` (cao nhất CDMX!)** khiến ai chỉ nhìn Price tưởng Xochimilco phân tầng giá điên loạn nhất. Nhưng sang cột bên cạnh `rIQR(PPG)` (chia cho số khách sức chứa), thanh của Xochimilco **sập thẳng xuống `0.421` (thuộc nhóm đồng đều nhất!)**! Chứng minh cực rõ ràng sự chênh lệch khổng lồ ở giá thuê cả căn Xochimilco đến từ **sự khác biệt quy mô chỗ ở (studio nhỏ vs nhà vườn 14 khách)** chứ không phải phân hóa đơn giá trên mỗi đầu khách!",
    "explanation": "Phát hiện đa chiều tinh tế trực tiếp từ `figures/kpi_riqr_neighbourhood.png`.",
    "projectLink": "figures/kpi_riqr_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/kpi_riqr_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Dữ liệu `kpi_by_neighbourhood.csv`: Xochimilco `riqr_price_t4 = 2.2642`, `riqr_ppg_t4 = 0.4208`.",
    "followUpQuestions": [
      "Ngược lại, quận nào giữ vị trí phân tán cao vượt chuẩn ở **CẢ hai** thước đo `rIQR(Price)` và `rIQR(PPG)` (với `n >= 20`)?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại, quận nào giữ vị trí phân tán cao vượt chuẩn ở **CẢ hai** thước đo `rIQR(Price)` và `rIQR(PPG)` (với `n >= 20`)?",
        "a": "Quận **Tlalpan** (`n=23`, giáp sân Estadio Azteca): `rIQR(Price) = 1.395` và `rIQR(PPG) = 1.100` — chứng tỏ độ chênh đơn giá thật trên đầu khách tại đây rất lớn."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `rIQR(Price)` và `rIQR(PPG)` luôn có thứ hạng giống hệt nhau ở mọi quận."
    ],
    "relatedFiles": [
      "figures/kpi_riqr_neighbourhood.png"
    ]
  },
  {
    "id": "vr-029",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "critique",
    "topics": [
      "Data Cleaning",
      "Regex"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy thay `<br/>` trong `clean_text()` của `src/baseline.py`: Điều gì xảy ra nếu đổi `<br/>` thành `\" \"` thay vì `\"\\n\"`?",
    "question": "Câu hỏi gài: Trong `src/baseline.py:L66`, hàm `clean_text()` đổi thẻ `<br/>` thành ký tự xuống dòng `\"\\n\"`, không phải dấu cách `\" \"`. Nếu sửa thành `\" \"` thì mệnh đề nào trong review bị gộp sai dẫn đến đổi nhãn cảm xúc?",
    "quickAnswer": "Vì ngay sau đó ở `L25`: **`CLAUSE_RE`** dùng `[.!?;\\n]+` để **ngắt câu thành từng mệnh đề độc lập**! Nhiều khách du lịch viết gạch đầu dòng bằng `<br/>` không chấm câu ở cuối dòng: `\"Great bed<br/>Street very noisy\"`. Nếu đổi `<br/>` thành `\"\\n\"`, `CLAUSE_RE` tách chuẩn thành 2 mệnh đề riêng (`\"Great bed\"` khen, `\"Street very noisy\"` chê -> `mixed` đúng khía cạnh!). Nếu đổi thành `\" \"`, cả hai dính thành `\"Great bed Street very noisy\"` -> làm `location/cleanliness` dính nhầm cờ `has_neg = True` từ chữ `\"noisy\"` ở cùng một mệnh đề!",
    "explanation": "Truy vết chính xác tương tác giữa `clean_text()` (`L66`) và `CLAUSE_RE` (`L25`)!",
    "projectLink": "src/baseline.py:L25, L66",
    "codeLocation": "src/baseline.py:L25, L66",
    "proofExample": "Đối chiếu trực tiếp tại `src/baseline.py:L25, L66`.",
    "followUpQuestions": [
      "Và tại sao `L66` (`<br/> -> \\n`) bắt buộc chạy TRƯỚC `L67` (xóa `</?[a-zA-Z][^>]*>`)?"
    ],
    "followUpQA": [
      {
        "q": "Và tại sao `L66` (`<br/> -> \\n`) bắt buộc chạy TRƯỚC `L67` (xóa `</?[a-zA-Z][^>]*>`)?",
        "a": "Vì thẻ `<br/>` cũng khớp với mẫu thẻ HTML tổng quát ở `L67`; nếu `L67` chạy trước nó sẽ thay `<br/>` bằng dấu cách `\" \"` mất trước khi `L66` kịp biến thành `\\n`!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `clean_text()` đổi `<br/>` thành `\\n` chỉ để in ra console cho đẹp mắt."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vr-030",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "Evaluation",
      "LLM"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy đọc bảng `llm_cost_estimate.csv`: \"Chi phí tăng tuyến tính — vậy chạy 1.719.730 review chắc chắn tốn đúng `$349.11` không cần tính lại?\"",
    "question": "Câu hỏi gài: File `llm_cost_estimate.csv` ước tính chạy hết 1.719.730 review toàn thành phố hết **`$349.1052` USD**. Giả định ngầm phía sau phép ngoại suy tuyến tính này có rủi ro lệch thực tế nào?",
    "quickAnswer": "Phép tính trong `uoc_tinh_chi_phi()` giả định **phân bố độ dài văn bản (`T_in`, `T_out`) của 1.719.730 review toàn thành phố giống hệt mẫu 1.000 review LLM** (vốn tập trung `74.9%` ở Cuauhtémoc!). Ngoài ra, nếu tăng `batch_size` lên lớn hơn (20–30 review/call) hoặc dùng Gemini Batch API (giảm giá ~50%), chi phí thực tế sẽ **giảm xuống dưới `$349`**; ngược lại nếu các review cũ bị lặp nhiều ký tự/dài hơn mẫu Cuauhtémoc, tiền Input token có thể nhích lên.",
    "explanation": "Đánh giá sắc bén giả định ẩn của mô hình ngoại suy chi phí `uoc_tinh_chi_phi()`.",
    "projectLink": "src/evaluate.py:L207-L248; reports/llm_cost_estimate.csv",
    "codeLocation": "src/evaluate.py:L207-L248; reports/llm_cost_estimate.csv",
    "proofExample": "Đối chiếu trực tiếp tại `src/evaluate.py:L207-L248; reports/llm_cost_estimate.csv`.",
    "followUpQuestions": [
      "Trong bảng giá `MODEL_PRICING_PER_1M`, mức giá đơn vị cho `gemini-3.5-flash-lite` được khai báo là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Trong bảng giá `MODEL_PRICING_PER_1M`, mức giá đơn vị cho `gemini-3.5-flash-lite` được khai báo là bao nhiêu?",
        "a": "`(0.30, 2.50)` — tức `$0.30` / 1 triệu Input token và `$2.50` / 1 triệu Output token."
      }
    ],
    "commonMistakes": [
      "Coi con số `$349.1052` như hóa đơn chính xác tuyệt đối tới từng cent bất chấp batch_size hay chính sách giá Batch API."
    ],
    "relatedFiles": [
      "src/evaluate.py"
    ]
  },
  {
    "id": "vr-031",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "critique",
    "topics": [
      "API",
      "File I/O"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `snapshot` fallback khi Inside Airbnb chặn bot (`t1: 2025-09-27`) — làm sao biết file local `t1` không bị giả mạo?",
    "question": "Câu hỏi gài: Vì máy chủ Inside Airbnb trả HTTP 403 trên URL cũ của `t1` (`2025-09-27`), `download.py` sử dụng cơ chế `[SKIP]` đọc lại tệp `.csv.gz` đã có sẵn từ lúc nhóm tải được sớm hơn. Làm sao bảo vệ tính toàn vẹn để giảng viên tin rằng `t1` là dữ liệu thật từ Inside Airbnb chứ không phải nhóm tự sửa?",
    "quickAnswer": "Kiểm chứng đa điểm: (1) File giữ nguyên định dạng gốc `.csv.gz` đầy đủ `27.000+` listing (và toàn bộ cột nguyên bản của Inside Airbnb gồm cả `host_id`, `latitude`, `longitude`, `last_scraped = 2025-09-27`, `calendar_last_scraped`), KHÔNG phải file đã cắt 1.000 dòng; (2) Toàn bộ `1.000` ID trong `data/processed/2025-09-27/listings.csv` đối chiếu khớp 1–1 với Google Sheets phân công của môn học và liền mạch thống nhất với `number_of_reviews` ở `t2`, `t3`, `t4` (trừ đi vẫn `>= 0` ở 100% 1.000 căn tại Q1)!",
    "explanation": "Lập luận kỹ thuật chặt chẽ bảo vệ tính xác thực của bộ dữ liệu nguồn trước nghi vấn fallback local.",
    "projectLink": "src/download.py:L88-L90; data/processed/kpi_by_snapshot.csv",
    "codeLocation": "src/download.py:L88-L90; data/processed/kpi_by_snapshot.csv",
    "proofExample": "Đối chiếu trực tiếp tại `src/download.py:L88-L90; data/processed/kpi_by_snapshot.csv`.",
    "followUpQuestions": [
      "Cũng trong trường hợp `403/404`, dòng log nào của `download.py` thông báo rõ cho người chạy biết đã sử dụng bản local hay thiếu file?"
    ],
    "followUpQA": [
      {
        "q": "Cũng trong trường hợp `403/404`, dòng log nào của `download.py` thông báo rõ cho người chạy biết đã sử dụng bản local hay thiếu file?",
        "a": "Khi file có sẵn `st_size > 0` từ đầu, hàm in `[SKIP] <path> (da co, ...)`; nếu phải gọi tải mà nhận `403/404`, hàm in `[ERR] HTTP 403/404 -> bo qua retry` và chỉ dùng bản local nếu được cấu hình giữ sẵn trước đó."
      }
    ],
    "commonMistakes": [
      "Nói bừa rằng `download.py` tự tải mới 100% thành công cả `t1..t4` từ Internet ở thời điểm nộp bài (mâu thuẫn với HTTP 403 trên `t1`)."
    ],
    "relatedFiles": [
      "src/download.py"
    ]
  },
  {
    "id": "vr-032",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "pandas",
      "Python"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `pd.Series([True, False, np.nan]).astype(bool)` biến `np.nan` thành `True`!",
    "question": "Câu hỏi gài: Nếu quên `.fillna(True)` hay `.fillna(False)` mà gõ thẳng `pd.Series([False, np.nan]).astype(bool)`, phần tử thứ 2 (`np.nan`) trở thành `True` hay `False`?",
    "quickAnswer": "Trở thành **`True`!** Vì trong Python/NumPy, `bool(float(\"nan\"))` là **`True`** (mọi float khác `0.0` kể cả `NaN` đều là truthy)! Cho nên nếu gán thẳng `df[\"qa_invalid_last_review\"].astype(bool)` trên cột có `np.nan`, toàn bộ ô trống bỗng biến thành **`True` (báo lỗi hàng loạt!)** — đó là lý do `_qa_flag()` luôn tường minh gọi `.fillna(True)` hoặc `.fillna(False)` trước `.astype(bool)`!",
    "explanation": "Phát hiện cạm bẫy Python/NumPy cực tinh vi giải thích vì sao không bao giờ ép `.astype(bool)` trực tiếp khi còn `NaN`.",
    "projectLink": "src/kpi.py:L62",
    "codeLocation": "src/kpi.py:L62",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L62`.",
    "followUpQuestions": [
      "Vậy `bool(None)` vs `bool(np.nan)` khác nhau thế nào trong Python thuần?"
    ],
    "followUpQA": [
      {
        "q": "Vậy `bool(None)` vs `bool(np.nan)` khác nhau thế nào trong Python thuần?",
        "a": "`bool(None)` là `False`, nhưng `bool(float(\"nan\"))` (và `bool(np.nan)`) là **`True`**!"
      }
    ],
    "commonMistakes": [
      "Tưởng `bool(np.nan)` trả về `False` giống `0` hoặc `None`!"
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-033",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "pandas",
      "Data Cleaning"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `df.dropna(how=\"all\")` vs `df.dropna()` và `df.drop_duplicates()` mặc định.",
    "question": "Câu hỏi gài: Trong bài thi vấn đáp, nếu viết `df = df.dropna()` thay cho `df = df.dropna(subset=[\"listing_id\"])` trên bảng `reviews_sentiment` hoặc bảng `listings` gồm 75 cột, điều thảm họa gì xảy ra ở bước `listings`?",
    "quickAnswer": "Trong 75 cột của `listings.csv` Inside Airbnb luôn có các cột gần như trống 100% (như `neighbourhood_group_cleansed` thường toàn `NaN` ở CDMX, hoặc `license`!). Gọi `df.dropna()` trần (mặc định `how=\"any\"` trên TẤT CẢ 75 cột) sẽ **XÓA SẠCH 100% BẢNG THÀNH DATAFRAME 0 DÒNG** ngay lập tức!",
    "explanation": "Kinh nghiệm xương máu với bảng dữ liệu thực Inside Airbnb nhiều cột trống toàn phần.",
    "projectLink": "src/kpi.py:L409; Bài 10",
    "codeLocation": "src/kpi.py:L409; Bài 10",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L409; Bài 10`.",
    "followUpQuestions": [
      "Muốn chỉ xóa những dòng bị rỗng tất cả mọi cột thì phải truyền tham số gì?"
    ],
    "followUpQA": [
      {
        "q": "Muốn chỉ xóa những dòng bị rỗng tất cả mọi cột thì phải truyền tham số gì?",
        "a": "`df.dropna(how=\"all\")` (còn để bảo vệ riêng khóa chính, luôn truyền `subset=[\"id\"]`)."
      }
    ],
    "commonMistakes": [
      "Tưởng `df.dropna()` chỉ xóa những dòng bị thiếu toàn bộ mọi cột."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-034",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "NumPy",
      "pandas"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `np.argmax()` / `.idxmax()` khi nhiều quận hòa điểm cao nhất hoặc có `NaN`.",
    "question": "Câu hỏi gài: Cho `s = pd.Series([np.nan, 0.5, 0.5], index=[\"A\", \"B\", \"C\"])`. Giá trị của `s.idxmax()` và `np.argmax(s.to_numpy())` khác nhau thế nào?",
    "quickAnswer": "`s.idxmax()` bỏ qua `NaN` theo mặc định (`skipna=True`) và trả về phần tử đầu tiên đạt max là **`\"B\"`**. Trong khi đó **`np.argmax(s.to_numpy())`** KHÔNG bỏ qua `NaN`: nó trả về vị trí **`0`** (chính phần tử `np.nan` đầu tiên!) — làm lệch hoàn toàn kết quả tìm cực đại nếu dùng NumPy trên mảng còn `NaN` (phải dùng `np.nanargmax`!).",
    "explanation": "Bẫy `np.argmax` vs `np.nanargmax` vs `Series.idxmax` — Bài 3 & Bài 4.",
    "projectLink": "Bài 3 & Bài 4",
    "codeLocation": "Bài 3 & Bài 4",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 3 & Bài 4`.",
    "followUpQuestions": [
      "Tương tự, với một cột toàn `np.nan` (như giá ở `t2`), gọi `s.idxmax()` thì pandas trả gì?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự, với một cột toàn `np.nan` (như giá ở `t2`), gọi `s.idxmax()` thì pandas trả gì?",
        "a": "Pandas từ 2.1+ phát `FutureWarning`/`ValueError: attempt to get argmax of an empty sequence` (cần kiểm `if not s.dropna().empty:` trước!)."
      }
    ],
    "commonMistakes": [
      "Nghĩ `np.argmax` tự động bỏ qua `np.nan` giống hàm `idxmax()` của pandas."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vr-035",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "critique",
    "topics": [
      "SQL",
      "pandas"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy SQL `WHERE col != \"Cuauhtémoc\"` âm thầm nuốt mất các dòng `col IS NULL`!",
    "question": "Câu hỏi gài: Trên DuckDB SQL đọc bảng CSV, một cột `neighbourhood` có 100 dòng `\"Cuauhtémoc\"`, 50 dòng `\"Benito Juárez\"` và 10 dòng `NULL`. Nếu viết `SELECT COUNT(*) FROM tbl WHERE neighbourhood != 'Cuauhtémoc'`, kết quả ra `60` hay `50`?",
    "quickAnswer": "Ra **`50` (MẤT LUÔN 10 DÒNG `NULL`)!** Vì trong logic 3 giá trị của SQL, `NULL != 'Cuauhtémoc'` trả về `UNKNOWN` (không phải `TRUE`), nên `WHERE` loại bỏ cả 10 dòng `NULL`! Để đếm cả `NULL` phải viết `WHERE neighbourhood IS DISTINCT FROM 'Cuauhtémoc'` (hoặc `WHERE neighbourhood != 'Cuauhtémoc' OR neighbourhood IS NULL`). Tương tự trong pandas, `df[\"col\"] != \"Cuauhtémoc\"` lại trả `True` cho `np.nan` — **hai công cụ cho kết quả ngược nhau (`50` vs `60`)**!",
    "explanation": "Phản ánh chính xác khác biệt sâu sắc giữa SQL NULL và pandas NaN ở Bài 6.",
    "projectLink": "Bài 6",
    "codeLocation": "Bài 6",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 6`.",
    "followUpQuestions": [
      "Trong pandas, nếu muốn viết câu tương đương hoàn toàn với SQL `!= value` (tức loại cả `NaN`), cần thêm điều kiện gì?"
    ],
    "followUpQA": [
      {
        "q": "Trong pandas, nếu muốn viết câu tương đương hoàn toàn với SQL `!= value` (tức loại cả `NaN`), cần thêm điều kiện gì?",
        "a": "Viết `df[\"col\"].notna() & (df[\"col\"] != \"Cuauhtémoc\")`."
      }
    ],
    "commonMistakes": [
      "Tưởng câu `col != value` trong SQL và pandas luôn trả ra cùng một số lượng bản ghi."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vr-036",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "critique",
    "topics": [
      "Datetime",
      "pandas"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `resample(\"ME\")` vs `groupby(df[\"date\"].dt.month)` khi dữ liệu kéo dài qua nhiều năm (`2025–2026`).",
    "question": "Câu hỏi gài: Tập dữ liệu `reviews.csv.gz` của CDMX chứa đánh giá từ `2025` đến `2026` (thậm chí nhiều năm `2018–2026`). Nếu viết `df.groupby(df[\"date\"].dt.month).size()` để xem \"xu hướng từng tháng hướng tới World Cup\", sai lầm chết người nào xảy ra?",
    "quickAnswer": "`df[\"date\"].dt.month` chỉ lấy **số tháng 1..12 bỏ mất năm**, khiến **tháng 6/2025, tháng 6/2024 và tháng 6/2026 bị cộng dồn chung thành 1 cục**! Phải dùng `df.set_index(\"date\").resample(\"ME\").size()` hoặc `df[\"date\"].dt.to_period(\"M\")` để tách riêng `2025-06` và `2026-06`!",
    "explanation": "Lỗi kinh điển phân tích chuỗi thời gian nhiều năm (Bài 8).",
    "projectLink": "Bài 8",
    "codeLocation": "Bài 8",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 8`.",
    "followUpQuestions": [
      "Và giả sử dùng `shift(1)` sau `resample(\"ME\")`, nhưng một tháng giữa năm không có review nào thì nên dùng `.resample(\"ME\")` hay tự `groupby().to_period(\"M\")`?"
    ],
    "followUpQA": [
      {
        "q": "Và giả sử dùng `shift(1)` sau `resample(\"ME\")`, nhưng một tháng giữa năm không có review nào thì nên dùng `.resample(\"ME\")` hay tự `groupby().to_period(\"M\")`?",
        "a": "`resample(\"ME\")` tự động chèn đủ mọi tháng liên tục trong lịch (tháng không có dữ liệu hiện số `0`) nên `.shift(1)` luôn lùi đúng `1` tháng lịch, không bị nhảy cóc sang tháng khác như `groupby`!"
      }
    ],
    "commonMistakes": [
      "Gom nhóm theo `.dt.month` khi dữ liệu trải qua hơn 12 tháng rồi vẽ thành đường xu hướng thời gian."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vr-037",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "LLM",
      "Evaluation"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện hiện tượng 193 cảnh báo trong `reports/llm_postcheck.csv`: Có phải LLM bị sai 19.3% không?",
    "question": "Phản biện: Giả sử khi phản biện có người mở `reports/llm_postcheck.csv` cộng tổng cột `so_vi_pham` ra **193 lần trên 176/1.000 review** rồi kết luận *\"LLM của nhóm bị ảo giác sai tới 17.6%–19.3%\"*. Bạn bác bỏ nhận định này bằng số liệu thực tế nào?",
    "quickAnswer": "Bác bỏ bằng **3 bằng chứng cụ thể**:\n1) Trong 6 quy tắc của `hau_kiem()`, **tất cả các quy tắc sai logic nghiêm trọng** (`rong_nhung_co_nhan`, `ngon_ngu_sai_ma_iso`, `tich_cuc_nhung_chi_bi_che`, `tieu_cuc_nhung_chi_khen`) **đều gần như bằng 0**;\n2) Gần như toàn bộ `193` cảnh báo rơi vào 2 quy tắc kiểm bằng **từ khóa/độ dài bề mặt** (`khia_canh_khong_can_cu` & `ngan_nhung_nhieu_khia_canh`) — ví dụ review tiếng Tây Ban Nha `\"Todo impecable, buena ubicación\"` có khía cạnh `cleanliness` & `location` hoàn toàn ĐÚNG nhưng không khớp danh sách từ khóa tiếng Anh đơn giản trong `hau_kiem()`!\n3) Khi đối chiếu trực tiếp trên 100 nhãn tay độc lập (`ground_truth.csv`), LLM đạt **0.9909 Macro F1 cảm xúc** và **0.9711 F1 phát hiện khía cạnh**.",
    "explanation": "Giải thích chuẩn xác ranh giới \"Cảnh báo Heuristic (Post-check Warnings)\" vs \"Lỗi thật (Evaluation Errors)\".",
    "projectLink": "reports/llm_postcheck.csv; reports/evaluation_report.csv",
    "codeLocation": "reports/llm_postcheck.csv; reports/evaluation_report.csv",
    "proofExample": "Đối chiếu trực tiếp tại `reports/llm_postcheck.csv; reports/evaluation_report.csv`.",
    "followUpQuestions": [
      "Cũng trên 100 câu có nhãn tay (`ground_truth.csv`), sai số thực sự giữa LLM và nhãn tay cho khía cạnh thường nằm ở trường hợp ranh giới nào?"
    ],
    "followUpQA": [
      {
        "q": "Cũng trên 100 câu có nhãn tay (`ground_truth.csv`), sai số thực sự giữa LLM và nhãn tay cho khía cạnh thường nằm ở trường hợp ranh giới nào?",
        "a": "Ranh giới mỏng giữa việc 1 câu tổng quát kiểu `\"Very nice place\"` có tính là khen `cleanliness`/`value` ẩn hay chỉ `overall = positive` (`nhan_khia_canh_macro_f1 = 0.9138`)."
      }
    ],
    "commonMistakes": [
      "Thừa nhận bừa rằng 193 dòng trong `llm_postcheck.csv` tương đương 193 câu LLM làm sai."
    ],
    "relatedFiles": [
      "reports/llm_postcheck.csv"
    ]
  },
  {
    "id": "vr-038",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "critique",
    "topics": [
      "Visualization",
      "Storytelling"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện: Tại sao đồ án dùng 8 ảnh PNG trong `figures/` mà không vẽ biểu đồ tròn (Pie chart) cho cơ cấu cảm xúc LLM (`77.9% / 20.6% / 1.5%`)?",
    "question": "Phản biện: Ở Bài 12–13, vì sao giảng viên thường khuyên hạn chế Pie Chart và trong `src/viz.py` tác giả luôn dùng Bar ngang (`barh`), Line chart, Boxplot và Heatmap cho cả 8 biểu đồ?",
    "quickAnswer": "Mắt người phân biệt **chiều dài dọc theo một trục chung** (Bar chart) chính xác hơn nhiều so với ước lượng **góc quạt / diện tích cung** (Pie chart), đặc biệt khi có >3 nhóm hoặc có các lát mỏng (`negative = 1.5%`). Dùng `barh` (có ghi số % + `n` trực tiếp bên cạnh thanh) giúp so sánh chính xác ngay cả sự khác biệt nhỏ như `1.9%` vs `14.8%`, dễ mở rộng theo 15 quận (`llm_insights.png`) và giữ thống nhất phong cách khoa học toàn báo cáo.",
    "explanation": "Vận dụng lý thuyết nhận thức thị giác của Bài 12 vào 8 hình thực tế của BTL.",
    "projectLink": "src/viz.py; Bài 12",
    "codeLocation": "src/viz.py; Bài 12",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py; Bài 12`.",
    "followUpQuestions": [
      "Trong 8 biểu đồ `figures/*.png`, biểu đồ nào phục vụ so sánh **hai biến định lượng phân tầng theo vùng và thời gian** hiệu quả nhất?"
    ],
    "followUpQA": [
      {
        "q": "Trong 8 biểu đồ `figures/*.png`, biểu đồ nào phục vụ so sánh **hai biến định lượng phân tầng theo vùng và thời gian** hiệu quả nhất?",
        "a": "`kpi_ppg_snapshots.png` (Small Multiples `barh` 8 khu vực × 4 mốc `sharex/sharey`) và `kpi_occupancy_gap.png` (Line/Bar qua 4 mốc kết hợp khu vực)."
      }
    ],
    "commonMistakes": [
      "Cho rằng Matplotlib không hỗ trợ vẽ Pie Chart hoặc nói đại \"Pie chart xấu\"."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vr-039",
    "category": "I",
    "categoryLabel": "Đọc hiểu code",
    "bucket": "critique",
    "topics": [
      "Code Trace",
      "Python"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy đọc code `run_pipeline.py`: Chạy `--only baseline` khi chưa có `data/processed/*/reviews_llm.csv` thì sao?",
    "question": "Câu hỏi gài: Nếu người dùng chỉ mới tải xong (`download`), bỏ qua bước `filter`, rồi gõ `python run_pipeline.py --config configs/mexico-city.yaml --only baseline`, chuyện gì xảy ra và thông báo lỗi nằm ở file nào?",
    "quickAnswer": "`baseline.py:L131` (hoặc `load_assigned_reviews`) kiểm tra `data/processed/<snap>/reviews_llm.csv` (vốn do bước `filter` sinh ra). Vì chưa chạy `filter` nên không có tệp nguồn -> `baseline.py` báo lỗi thiếu dữ liệu / `FileNotFoundError` và thoát với exit code `1` -> `run_pipeline.py` cũng dừng theo ở `subprocess.run(..., check=True)`!",
    "explanation": "Nắm rõ đồ thị phụ thuộc dữ liệu giữa các file (`filter` -> `llm` & `baseline` -> `evaluate` -> `kpi` -> `viz`).",
    "projectLink": "run_pipeline.py; src/baseline.py:L131",
    "codeLocation": "run_pipeline.py; src/baseline.py:L131",
    "proofExample": "Đối chiếu trực tiếp tại `run_pipeline.py; src/baseline.py:L131`.",
    "followUpQuestions": [
      "Ngược lại, `baseline.py` và `llm.py` có phụ thuộc lẫn nhau không — có thể đổi thứ tự chạy `baseline` trước `llm` trong `STEPS` được không?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại, `baseline.py` và `llm.py` có phụ thuộc lẫn nhau không — có thể đổi thứ tự chạy `baseline` trước `llm` trong `STEPS` được không?",
        "a": "HOÀN TOÀN ĐƯỢC! Cả `llm.py` và `baseline.py` đều chỉ đọc đầu vào `reviews_llm.csv` từ `filter` và xuất ra 2 tệp tách biệt (`reviews_sentiment.csv` vs `reviews_baseline.csv`), chỉ có `evaluate.py` phía sau mới đọc cả hai!"
      }
    ],
    "commonMistakes": [
      "Tưởng `baseline.py` đọc trực tiếp từ file thô `data/raw/*/reviews.csv.gz` không cần qua `filter`."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vr-040",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "Storytelling"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy đọc đồ thị `kpi_review_ghost.png`: \"Review Velocity của A04 giảm từ 3.97 xuống 3.01 -> 3.25 — vậy có phải khách thuê A04 sụt giảm mạnh so với Q1?\"",
    "question": "Câu hỏi gài: Nhìn hình `kpi_review_ghost.png`, đường Review Velocity của toàn mẫu giảm từ `2.55` (`Q1`) xuống `2.08` (`Q3`), còn riêng A04 giảm từ `3.97` xuống `3.25`. Có kết luận được lượng khách lưu trú ở A04 giảm so với quý 1 không?",
    "quickAnswer": "**KHÔNG ĐỦ CĂN CỨ KẾT LUẬN LƯỢNG KHÁCH GIẢM!** Có 3 yếu tố nhiễu quan trọng:\n(1) **Chu kỳ mùa vụ:** `Q1` (`t1->t2`, 27/9–29/12) quét qua mùa cao điểm lễ hội Dia de los Muertos tháng 11 và Giáng sinh; còn `Q2–Q3` có những giai đoạn mùa thấp hơn hoặc độ dài kỳ thuê thay đổi (khách thuê World Cup ở dài 7–14 ngày chỉ viết `1` review thay vì 3–4 lượt khách ngắn 2 ngày);\n(2) **Right-censoring / Độ trễ viết review:** `Q3` kết thúc ngày `15/06/2026` (77 ngày), những khách mới check-out tuần 2 tháng 6 thường viết review trễ sau ngày `15/06`;\n(3) Ngay ở `t4`, `Occ_1-30` của A04 vẫn đứng đầu ở mức `~49–50%`!",
    "explanation": "Phản biện mẫu mực tách biến Đại diện (`RV`) khỏi Biến Mục tiêu (`Lượng khách`).",
    "projectLink": "figures/kpi_review_ghost.png; data/processed/kpi_by_area.csv",
    "codeLocation": "figures/kpi_review_ghost.png; data/processed/kpi_by_area.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_review_ghost.png; data/processed/kpi_by_area.csv`.",
    "followUpQuestions": [
      "Vì sao số ngày giữa hai snapshot không bằng nhau (`93, 91, 77` ngày) nhưng ta vẫn so được `RV` giữa `Q1, Q2, Q3`?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao số ngày giữa hai snapshot không bằng nhau (`93, 91, 77` ngày) nhưng ta vẫn so được `RV` giữa `Q1, Q2, Q3`?",
        "a": "Nhờ mẫu số của `Review Velocity` đã chia chuẩn hóa về **số review trên 30 ngày (`delta_days / 30.0`)** chứ không để số thô chưa chuẩn hóa!"
      }
    ],
    "commonMistakes": [
      "Đánh đồng `Review Velocity` 1:1 với số lượng lượt đặt phòng."
    ],
    "relatedFiles": [
      "figures/kpi_review_ghost.png"
    ]
  },
  {
    "id": "vr-041",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "Evaluation",
      "LLM"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện thiết kế `ground_truth.csv`: Tại sao phải có 100 nhãn tay độc lập và cách phòng chống \"nhìn đề sửa bài\" (`Data Leakage`)?",
    "question": "Phản biện: Làm sao đảm bảo LLM không \"học thuộc\" hoặc gian lận khi đánh giá trên 100 mẫu của `ground_truth.csv`?",
    "quickAnswer": "Quy trình chống rò rỉ dữ liệu nghiêm ngặt: (1) Tập 100 mẫu nhãn tay (`ground_truth.csv`) được tách làm chuẩn đánh giá độc lập; (2) Prompt trong `src/llm.py` **không hề nhận bất kỳ ví dụ cụ thể nào từ `ground_truth.csv`** (zero-shot / rule schema tổng quát), chỉ nhận văn bản thuần từ `reviews_llm.csv`; (3) Baseline Regex trong `src/baseline.py` cũng không tự tối ưu trọng số/fit trên `ground_truth.csv`; (4) `src/evaluate.py` đóng vai trò trọng tài độc lập chạy sau cùng đối chiếu cả hai bảng dự đoán với `ground_truth.csv`!",
    "explanation": "Bảo đảm tính khách quan (Zero Data Leakage) của bước Benchmark LLM vs Baseline (Bài 11).",
    "projectLink": "src/llm.py; src/baseline.py; src/evaluate.py",
    "codeLocation": "src/llm.py; src/baseline.py; src/evaluate.py",
    "proofExample": "Đối chiếu trực tiếp tại `src/llm.py; src/baseline.py; src/evaluate.py`.",
    "followUpQuestions": [
      "Nếu muốn cải thiện prompt bằng few-shot examples mà vẫn KHÔNG bị leakage với 100 câu `ground_truth.csv`, phải làm thế nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu muốn cải thiện prompt bằng few-shot examples mà vẫn KHÔNG bị leakage với 100 câu `ground_truth.csv`, phải làm thế nào?",
        "a": "Phải chọn câu ví dụ minh họa từ tập `900` câu ngoài `ground_truth.csv` (hoặc viết ví dụ tổng hợp riêng), giữ nguyên 100 câu `ground_truth.csv` làm tập Hold-out test bất biến!"
      }
    ],
    "commonMistakes": [
      "Chép các câu sai trong `ground_truth.csv` nhét thẳng vào system prompt của `src/llm.py` để ép điểm lên `1.00`."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vr-042",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "critique",
    "topics": [
      "Architecture",
      "Python"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện tính module hóa: Ưu và nhược điểm của mô hình `run_pipeline.py` gọi 8 subprocess liên tiếp so với import trực tiếp 8 hàm Python.",
    "question": "Phản biện: Trong `run_pipeline.py`, nhóm dùng `subprocess.run([sys.executable, ...])` để gọi rời 8 file `src/*.py` qua CLI thay vì viết 1 file tổng import 8 hàm chạy chung 1 tiến trình Python. Đánh đổi kiến trúc là gì?",
    "quickAnswer": "- **Ưu điểm (`subprocess`):** (1) Cô lập 100% bộ nhớ RAM — kết thúc bước `filter` (đọc hàng trăm MB file `.gz`) thì toàn bộ RAM được hệ điều hành thu hồi sạch trước khi sang `qa`/`llm`/`viz`; (2) Mỗi script chạy độc lập mượt mà qua CLI (`--only`, `--from-step`, kiểm thử lẻ từng tệp); (3) Tránh xung đột biến toàn cục hay trạng thái `matplotlib` giữa các module.\n- **Nhược điểm:** Khởi động lại trình thông dịch Python 8 lần (tốn thêm ~1–2 giây tổng cộng) và truyền dữ liệu trung gian bắt buộc phải qua đĩa (CSV) chứ không truyền trực tiếp `DataFrame` trên RAM.",
    "explanation": "Đánh giá kiến trúc sâu sắc cấp Senior Engineer.",
    "projectLink": "run_pipeline.py:L36-L55",
    "codeLocation": "run_pipeline.py:L36-L55",
    "proofExample": "Đối chiếu trực tiếp tại `run_pipeline.py:L36-L55`.",
    "followUpQuestions": [
      "Với kích thước dữ liệu `1.000` căn hộ và `5.000` review của BTL, chi phí ghi đọc CSV trung gian (~1–2 MB) chiếm bao nhiêu thời gian so với lợi ích cô lập RAM & kiểm thử?"
    ],
    "followUpQA": [
      {
        "q": "Với kích thước dữ liệu `1.000` căn hộ và `5.000` review của BTL, chi phí ghi đọc CSV trung gian (~1–2 MB) chiếm bao nhiêu thời gian so với lợi ích cô lập RAM & kiểm thử?",
        "a": "Chỉ tốn vài trăm mili-giây (`< 1s`), quá nhỏ so với thời gian tải mạng (`download`) và suy luận LLM (`llm`), trong khi đem lại khả năng tái chạy từng bước (`--from-step`, `--only`) cực kỳ tiện lợi!"
      }
    ],
    "commonMistakes": [
      "Cho rằng dùng `subprocess.run` luôn chậm hơn hoặc chỉ là cách viết \"chưa tối ưu\"."
    ],
    "relatedFiles": [
      "run_pipeline.py"
    ]
  },
  {
    "id": "vr-043",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "Python",
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `price_mxn` ép float64 nhưng `accommodates_clean` ép Int64: điều gì xảy ra nếu lấy `price_mxn / accommodates_clean` trong pandas?",
    "question": "Câu hỏi gài: Trong `kpi.py:L111`, `price_mxn` mang kiểu `float64` (có `np.nan`) còn `accommodates_clean` mang kiểu **`Int64`** (nullable integer của pandas có `pd.NA`). Khi chia `price_mxn / accommodates_clean`, kết quả cột `ppg` mang dtype gì — có bị lỗi `<NA>` với `np.nan` không?",
    "quickAnswer": "Khi chia `float64` với nullable `Int64`, pandas trả về kiểu nullable **`Float64`** (hoặc `float64` sau xử lý `.astype(float)`), giữ `<NA>`/`NaN` đồng nhất ở những vị trí thiếu! Tuy nhiên lưu ý nếu mang `Float64` (chữ F hoa, chứa `pd.NA`) đưa thẳng vào một số hàm NumPy/Seaborn cũ chưa hỗ trợ `pd.NA` thì cần ép `.astype(float)` — đây là lý do `src/kpi.py` và `src/viz.py` dùng `pd.to_numeric(..., errors=\"coerce\")` trước khi vẽ!",
    "explanation": "Hiểu tương tác giữa NumPy `float64` (`np.nan`) và Pandas Nullable Extension (`Int64`/`Float64`/`pd.NA`).",
    "projectLink": "src/kpi.py:L110-L115; src/viz.py:L105",
    "codeLocation": "src/kpi.py:L110-L115; src/viz.py:L105",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L110-L115; src/viz.py:L105`.",
    "followUpQuestions": [
      "Trong `src/viz.py:L105`, câu lệnh nào bảo đảm cột vẽ Boxplot hoàn toàn sạch không dính `pd.NA` hay `<= 0`?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py:L105`, câu lệnh nào bảo đảm cột vẽ Boxplot hoàn toàn sạch không dính `pd.NA` hay `<= 0`?",
        "a": "Lọc `valid = df.loc[df[ppg_col].notna() & (df[ppg_col] > 0)].copy()` với kiểu số chuẩn từ CSV!"
      }
    ],
    "commonMistakes": [
      "Tưởng `pd.NA` và `np.nan` tương thích 100% với mọi hàm Matplotlib/NumPy mà không cần ép `float`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-044",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "critique",
    "topics": [
      "Architecture",
      "LLM"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện rủi ro phụ thuộc nhà cung cấp API (`gemini-3.5-flash-lite`): Pipeline sống sót thế nào nếu Google ngừng hỗ trợ model này sau 1 năm?",
    "question": "Phản biện: Model `gemini-3.5-flash-lite` hoàn toàn có thể bị deprecated trong tương lai (như `gemini-1.5` hay `2.0` trước đây). Kiến trúc của Nhóm 4 bảo vệ kết quả nghiên cứu và khả năng nâng cấp ra sao?",
    "quickAnswer": "Nhóm thiết kế **2 lớp bảo vệ dài hạn**:\n(1) **Đóng băng kết quả tái lập:** `data/processed/llm_cache.jsonl` lưu trọn vẹn `1.000/1.000` kết quả thực nghiệm tại thời điểm nộp (`--skip-llm`), giúp bất kỳ ai tái tạo chính xác bảng KPI & biểu đồ sau 5 năm nữa ngay cả khi API ngừng hoạt động;\n(2) **Đóng gói trừu tượng model trong YAML:** chỉ cần đổi 1 dòng `llm.model` trong `configs/mexico-city.yaml` và thêm giá ở `MODEL_PRICING_PER_1M` (`src/evaluate.py:L20`) là chạy mượt với thế hệ model mới.",
    "explanation": "Trình bày chiến lược chống lỗi thời (Future-proofing) cho hệ thống có thành phần LLM.",
    "projectLink": "configs/mexico-city.yaml; src/llm.py; run_pipeline.py",
    "codeLocation": "configs/mexico-city.yaml; src/llm.py; run_pipeline.py",
    "proofExample": "Đối chiếu trực tiếp tại `configs/mexico-city.yaml; src/llm.py; run_pipeline.py`.",
    "followUpQuestions": [
      "Nếu đổi sang mô hình của nhà cung cấp khác (như OpenAI/Claude) thay cho `google-genai`, phần code nào cần thay đổi và phần nào giữ nguyên 100%?"
    ],
    "followUpQA": [
      {
        "q": "Nếu đổi sang mô hình của nhà cung cấp khác (như OpenAI/Claude) thay cho `google-genai`, phần code nào cần thay đổi và phần nào giữ nguyên 100%?",
        "a": "Chỉ thay đúng hàm `init_client()` và `call_llm_batch()` trong `src/llm.py`; toàn bộ `download`, `filter`, `qa`, `baseline`, `evaluate`, `kpi`, `viz` và schema JSONL Cache **giữ nguyên 100%**!"
      }
    ],
    "commonMistakes": [
      "Cài cứng tên model trong code ở nhiều tệp và không giữ cache JSONL khi nộp bài."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vr-045",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "pandas",
      "API"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `csv` trong `filter_data_from_sheet.py`: Tại sao không filter file `.csv.gz` bằng cách đọc hết 1 lần bằng `pd.read_csv(path)` rồi mới lọc `df[df[\"id\"].isin(allowed)]`?",
    "question": "Câu hỏi gài: Trên máy RAM 16 GB hay 32 GB hiện nay, gọi thẳng `df = pd.read_csv(\"reviews.csv.gz\")` mất có vài giây — vậy dùng `chunksize=100_000` trong `_filter_raw_by_ids()` có bị coi là \"làm màu\" phức tạp hóa code không?",
    "quickAnswer": "**KHÔNG PHẢI LÀM MÀU!** File `calendar.csv.gz` (hay `reviews.csv.gz` các siêu đô thị lớn như London/Tokyo/CDMX nhiều snapshot) khi giải nén lên tới **vài trăm MB -> 1.5 GB CSV thô**, nạp thành DataFrame pandas chiếm gấp 3–5x trong RAM (~2–6 GB chỉ cho 1 file, có thể tràn RAM ngay trên máy sinh viên 8 GB hoặc container CI giới hạn 2 GB)! Dùng `chunksize=100_000` giữ đỉnh RAM ổn định ở mức siêu nhỏ (<100 MB) bất kể thành phố to gấp 10 lần CDMX.",
    "explanation": "Bảo vệ chuẩn kỹ thuật Streaming / Out-of-core I/O của Bài 6.",
    "projectLink": "src/filter_data_from_sheet.py:L131; Bài 6",
    "codeLocation": "src/filter_data_from_sheet.py:L131; Bài 6",
    "proofExample": "Đối chiếu trực tiếp tại `src/filter_data_from_sheet.py:L131; Bài 6`.",
    "followUpQuestions": [
      "Hơn nữa nếu truyền kèm tham số `usecols=[...]` vào `pd.read_csv()`, hiệu quả tối ưu bộ nhớ khi filter còn tăng thêm ra sao?"
    ],
    "followUpQA": [
      {
        "q": "Hơn nữa nếu truyền kèm tham số `usecols=[...]` vào `pd.read_csv()`, hiệu quả tối ưu bộ nhớ khi filter còn tăng thêm ra sao?",
        "a": "Nếu chỉ đọc các cột cần thiết thay vì toàn bộ 75 cột (nhiều cột mô tả văn bản dài), RAM tiêu thụ mỗi chunk còn giảm tiếp 60–80%!"
      }
    ],
    "commonMistakes": [
      "Lấy cấu hình máy cá nhân 32GB để bác bỏ thiết kế quản lý bộ nhớ `chunksize`."
    ],
    "relatedFiles": [
      "src/filter_data_from_sheet.py"
    ]
  },
  {
    "id": "vr-046",
    "category": "D",
    "categoryLabel": "Data Cleaning và QA",
    "bucket": "critique",
    "topics": [
      "QA",
      "Evaluation"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy \"Kiểm tra số dòng bảng `kpi_by_listing.csv` = 1.000 nên chắc chắn dữ liệu đầu vào `t1..t4` hoàn hảo 100% không có giá trị thiếu!\"",
    "question": "Câu hỏi gài: File `kpi_by_listing.csv` có đủ `1.000` dòng và không thiếu dòng nào. Có người nói: *\"Như vậy bộ dữ liệu của Nhóm 4 sạch hoàn toàn 100% sau bước QA!\"* Nhận định này đúng hay ngụy biện?",
    "quickAnswer": "**NGỤY BIỆN!** Số dòng đủ `1.000` là vì **`qa.py` KHÔNG XÓA BẢN GHI THIẾU GIÁ/THIẾU REVIEW (`flagging`), KHÔNG phải vì không có ô thiếu!** Thực chất ngay trong `kpi_by_listing.csv` có:\n- **100% (1.000/1.000)** căn bị trống cột `price_mxn_t2` và `ppg_t2`;\n- **40** căn thiếu giá ở `t1`, **12** căn ở `t3`, **20** căn ở `t4`;\n- **1** căn bị `<NA>` ở `review_velocity_q3` và `ghost_t4`!\nĐây là minh chứng sống cho câu: *\"Số dòng đầy đủ != Dữ liệu sạch không khuyết\"*.",
    "explanation": "Phân biệt sắc bén **Tính đầy đủ số hàng (Row completeness)** vs **Tính đầy đủ từng biến (Cell completeness)**.",
    "projectLink": "data/processed/kpi_by_listing.csv; reports/qa_report.csv",
    "codeLocation": "data/processed/kpi_by_listing.csv; reports/qa_report.csv",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_listing.csv; reports/qa_report.csv`.",
    "followUpQuestions": [
      "Làm sao chỉ dùng 1 dòng lệnh pandas để kiểm tra nhanh số ô `NaN` ở từng cột trong `kpi_by_listing.csv`?"
    ],
    "followUpQA": [
      {
        "q": "Làm sao chỉ dùng 1 dòng lệnh pandas để kiểm tra nhanh số ô `NaN` ở từng cột trong `kpi_by_listing.csv`?",
        "a": "`df.isna().sum()[lambda s: s > 0]` — in ra ngay toàn bộ các cột còn khuyết (`price_mxn_t2: 1000`, `price_mxn_t1: 40`, v.v.)!"
      }
    ],
    "commonMistakes": [
      "Thấy `len(df) == 1000` tưởng mọi cột đều đủ 1.000 giá trị hợp lệ."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_listing.csv"
    ]
  },
  {
    "id": "vr-047",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện độ tin cậy biểu đồ `llm_insights.png`: Làm sao tránh đọc nhầm quận `Tláhuac` hay `Xochimilco` là \"0% phàn nàn = chất lượng dịch vụ 5 sao\"?",
    "question": "Phản biện: Mở `kpi_by_neighbourhood.csv` thấy chỉ có 12 quận có số liệu phàn nàn LLM (`llm_review_count >= 1`). Vậy 3 quận còn lại (`Iztapalapa, Milpa Alta, Xochimilco`, chưa kể `Tláhuac`) trên bảng CSV đều trống — có phải khách ở 4 quận đó không hề phàn nàn gì (`0%`) nên dịch vụ tốt nhất CDMX?",
    "quickAnswer": "**TUYỆT ĐỐI KHÔNG!** Khoảng trống đó là **thiếu dữ liệu quan sát (`llm_review_count = 0`)** chứ không phải **`0%` phàn nàn**! Chính `src/kpi.py:L426` cố tình giữ **`NaN`** (và trên Hình 7 chỉ vẽ đúng 12 quận có dữ liệu + cột `Cỡ mẫu review LLM` bên phải) để không bao giờ gán `0.0%` giả tạo! Nói `0% phàn nàn` khi `n = 0` là ngụy tạo thống kê kinh điển (\"Absence of evidence is not evidence of absence\").",
    "explanation": "Phân biệt `0%` (đo được 0 ca trên mẫu đủ lớn) vs `NA / n=0` (không có dữ liệu để đo).",
    "projectLink": "src/kpi.py:L420-L428; figures/llm_insights.png",
    "codeLocation": "src/kpi.py:L420-L428; figures/llm_insights.png",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L420-L428; figures/llm_insights.png`.",
    "followUpQuestions": [
      "Tương tự, với `Gustavo A. Madero` hay `Azcapotzalco` có xuất hiện trên Hình 7 nhưng `n` chỉ bằng `1–3` review, người thuyết minh phải lưu ý điều gì?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự, với `Gustavo A. Madero` hay `Azcapotzalco` có xuất hiện trên Hình 7 nhưng `n` chỉ bằng `1–3` review, người thuyết minh phải lưu ý điều gì?",
        "a": "Nêu rõ cỡ mẫu nhỏ `n < 5` ở cột phụ bên phải hình: tỷ lệ `%` nhảy vọt (`25%–50%`+) chỉ phản ánh 1 review duy nhất nên KHÔNG có ý nghĩa khái quát cho toàn quận."
      }
    ],
    "commonMistakes": [
      "Điền `fillna(0.0)` cho các quận chưa có review LLM rồi xếp chúng đứng đầu bảng \"quận không có phàn nàn nào\"."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-048",
    "category": "C",
    "categoryLabel": "Regex và Datetime",
    "bucket": "critique",
    "topics": [
      "Regex",
      "Python"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy đọc `src/baseline.py:L109-L111`: Tại sao khi `total_pos == 0` VÀ `total_neg == 0`, Baseline Regex vẫn gán `overall = \"positive\"`?",
    "question": "Câu hỏi gài: Nếu đưa câu review toàn ký tự vô thưởng vô phạt `\"Ok.\"` hoặc `\"Great?\"`? Giả sử `\"Nice enough\"` chưa trúng `POS_RE` và cũng không trúng `NEG_RE` (`total_pos = 0, total_neg = 0`). Xem `src/baseline.py:L107-L111`, Baseline trả về `overall_sentiment` là gì và vì sao chọn mặc định đó?",
    "quickAnswer": "Trả về **`\"positive\"`**! Ở `src/baseline.py:L107-L111`: nhánh `if total_pos > 0 and total_neg > 0 -> \"mixed\"`, `elif total_neg > 0 and total_pos == 0 -> \"negative\"`, `else -> \"positive\"`! Tác giả chọn mặc định `\"positive\"` khi không thấy tín hiệu nào vì phân bố thực tế dữ liệu Airbnb nghiêng lệch cực mạnh sang khen (`73–78%` là `positive`), giúp tăng xác suất khớp đúng các câu khen ngắn viết bằng tiếng lóng/ngôn ngữ hiếm không có trong từ điển — đánh đổi là dễ bỏ sót câu chê ẩn ý (`Recall` lớp `negative/mixed` thấp).",
    "explanation": "Giải thích tường tận logic nhánh phân loại cuối cùng của `Baseline Regex` và lý do thống kê phía sau.",
    "projectLink": "src/baseline.py:L107-L111",
    "codeLocation": "src/baseline.py:L107-L111",
    "proofExample": "Đối chiếu trực tiếp tại `src/baseline.py:L107-L111`.",
    "followUpQuestions": [
      "Điều tương tự có xảy ra cho 7 cột khía cạnh (`aspects`) khi không thấy từ khóa không?"
    ],
    "followUpQA": [
      {
        "q": "Điều tương tự có xảy ra cho 7 cột khía cạnh (`aspects`) khi không thấy từ khóa không?",
        "a": "Không! 7 cột khía cạnh có giá trị thứ 4 là **`\"not_mentioned\"`** (chỉ fallback về `overall` nếu tên khía cạnh ĐÃ được `ASPECT_PATTERNS` phát hiện có nhắc tới trong câu nhưng không bắt được `pos`/`neg` ở mệnh đề đó!)."
      }
    ],
    "commonMistakes": [
      "Tưởng khi `total_pos == 0 and total_neg == 0` thì Baseline trả về `\"not_mentioned\"` hay `\"neutral\"` cho `overall_sentiment` (nhãn `overall` chỉ có 3 giá trị: `positive`, `mixed`, `negative`!)."
    ],
    "relatedFiles": [
      "src/baseline.py"
    ]
  },
  {
    "id": "vr-049",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "NumPy",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện công thức `_iqr_stats()`: Tại sao dùng `rIQR = IQR / Median` thay vì `CV = Std / Mean` để đo độ phân tán giá Airbnb?",
    "question": "Phản biện: Trong thống kê cổ điển có Hệ số biến thiên `CV = Std / Mean` rất phổ biến để so sánh độ phân tán giữa các nhóm có thang giá khác nhau. Tại sao `src/kpi.py` không dùng `CV` mà lại tự cài `rIQR = (Q3 - Q1) / Median`?",
    "quickAnswer": "Vì cả tử số (`Std`) lẫn mẫu số (`Mean`) của `CV` đều cực kỳ nhạy với ngoại lai! Chỉ cần 2 căn hộ treo giá `153.540 MXN` ở Cuauhtémoc là `Std` phình to khổng lồ gấp mấy lần `Mean`, làm `CV` mất hoàn toàn ý nghĩa mô tả 50% phần lõi thị trường. Ngược lại `rIQR = (Q3 - Q1) / Median` kế thừa tính bền vững của phân vị (breakdown point >= 25%), đo chính xác độ trải tương đối của nửa giữa thị trường bất chấp vài căn đầu cơ giá ảo.",
    "explanation": "So sánh toán học sắc bén giữa bộ đôi bền vững (`Median / IQR / rIQR`) và bộ đôi nhạy ngoại lai (`Mean / Std / CV`).",
    "projectLink": "src/kpi.py:L36-L48; Bài 10",
    "codeLocation": "src/kpi.py:L36-L48; Bài 10",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L36-L48; Bài 10`.",
    "followUpQuestions": [
      "Ngoài kháng nhiễu, điểm chung vô giá nào của `CV` và `rIQR` khiến người ta so sánh được khu bình dân và khu cao cấp?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài kháng nhiễu, điểm chung vô giá nào của `CV` và `rIQR` khiến người ta so sánh được khu bình dân và khu cao cấp?",
        "a": "Cả hai đều **vô thứ nguyên** (triệt tiêu đơn vị tiền tệ MXN do chia đại lượng phân tán cho đại lượng trung tâm cùng đơn vị)."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng `CV = Std / Mean` và `rIQR` cho cùng kết quả tương tự nhau trên dữ liệu Airbnb."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-050",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "pandas",
      "Code Trace"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `df.groupby(\"area\")[\"price\"].mean()` vs `df.groupby(\"area\", dropna=False)`: Điều gì xảy ra nếu 1 căn bị `area = NaN`?",
    "question": "Câu hỏi gài: Mặc định `pandas groupby()` đặt `dropna=True`. Nếu một bảng dữ liệu có 50 căn hộ bị khuyết nhãn khu vực (`area = NaN`), lệnh `df.groupby(\"area\").agg(...)` có hiển thị dòng `NaN` không và ảnh hưởng gì tới kiểm toán cỡ mẫu?",
    "quickAnswer": "Mặc định `dropna=True` làm **50 căn hộ khuyết khu vực ÂM THẦM BIẾN MẤT** khỏi bảng nhóm mà không phát bất kỳ cảnh báo nào — khiến tổng `count` cộng lại theo các nhóm nhỏ hơn tổng `len(df)`! Khi cần kiểm toán đủ 100% bản ghi như Bài 5, bắt buộc truyền **`dropna=False`** (hoặc kiểm `.isna().sum()` trước) để thấy rõ có 50 căn chưa gán khu vực!",
    "explanation": "Áp dụng chuẩn Bài 5 phát hiện mất bản ghi âm thầm trong `groupby`.",
    "projectLink": "src/kpi.py:L275; Bài 5",
    "codeLocation": "src/kpi.py:L275; Bài 5",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L275; Bài 5`.",
    "followUpQuestions": [
      "Trong dữ liệu thực của Nhóm 4, có căn nào trong 1.000 căn bị thiếu `area_id` hay `neighbourhood_cleansed` không?"
    ],
    "followUpQA": [
      {
        "q": "Trong dữ liệu thực của Nhóm 4, có căn nào trong 1.000 căn bị thiếu `area_id` hay `neighbourhood_cleansed` không?",
        "a": "Không (`0` căn thiếu) — tổng 8 khu vực `kpi_by_area.csv` và 15 quận `kpi_by_neighbourhood.csv` đều cộng lại khớp chính xác **`1.000`** listing."
      }
    ],
    "commonMistakes": [
      "Tin rằng `groupby(\"col\")` luôn bảo toàn tổng số lượng mọi hàng trong DataFrame thành các nhóm tương ứng."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-051",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "Evaluation",
      "LLM"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện lựa chọn 7 khía cạnh (`location, cleanliness, amenities, communication, checkin, value, noise`) — Khả năng bỏ sót khía cạnh mới mùa World Cup (an ninh, giá vé/di chuyển)?",
    "question": "Phản biện: Trong bộ 7 khía cạnh YAML hiện tại có `amenities`, `noise`, `location`, `cleanliness`, `communication`, `checkin`, `value` — vậy nếu du khách than phiền về *an toàn khu phố ban đêm* hoặc *kẹt xe quanh sân vận động*, pipeline hiện tại xếp chúng vào đâu?",
    "quickAnswer": "Đây là giới hạn thiết kế bộ nhãn cố định (Closed Taxonomy): phản ánh về an toàn/giao thông thường được LLM lồng vào **`location`** (vị trí & môi trường xung quanh) hoặc chỉ phản ánh ở **`overall_sentiment`** chứ chưa tách thành cột `safety` riêng biệt! Nếu SECTUR muốn theo dõi riêng an ninh mùa World Cup ở giai đoạn tiếp theo, chỉ cần thêm `\"safety\"` vào `llm.aspects` trong `configs/mexico-city.yaml` (`src/llm.py` tự động cập nhật Pydantic schema!).",
    "explanation": "Thể hiện tư duy phân tích hạn chế taxonomy + phương án mở rộng gắn liền YAML thực tế.",
    "projectLink": "configs/mexico-city.yaml:L30-L38",
    "codeLocation": "configs/mexico-city.yaml:L30-L38",
    "proofExample": "Đối chiếu trực tiếp tại `configs/mexico-city.yaml:L30-L38`.",
    "followUpQuestions": [
      "Nếu thêm khía cạnh thứ 8, bảng kết quả nào trong `data/processed/` tự động có thêm 2 cột `complaint_<new>` và `complaint_mixed_<new>`?"
    ],
    "followUpQA": [
      {
        "q": "Nếu thêm khía cạnh thứ 8, bảng kết quả nào trong `data/processed/` tự động có thêm 2 cột `complaint_<new>` và `complaint_mixed_<new>`?",
        "a": "Bảng `data/processed/kpi_by_neighbourhood.csv` (`compute_kpi_by_neighbourhood()` đọc động danh sách `aspects` từ YAML!)."
      }
    ],
    "commonMistakes": [
      "Tưởng `src/llm.py` tự động sinh ra tên cột khía cạnh mới như `safety` hay `wifi` ngoài 7 khía cạnh khai báo trong YAML."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vr-052",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện câu hỏi: \"Tại sao `Mean Price` giảm ở một số quận nhỏ từ t3 sang t4 không — hay quận nào luôn biến động cùng chiều?\"",
    "question": "Phản biện: Giả sử khi kiểm tra `kpi_by_neighbourhood.csv`, một số quận có cỡ mẫu nhỏ (`n = 3..5`) biến động thất thường qua các kỳ (tăng vọt rồi giảm nhẹ hoặc ngược chiều trung bình chung). Có nên đưa các biến động kỳ lạ của quận `n=3` làm điểm nhấn chính cho chiến lược thành phố không?",
    "quickAnswer": "**KHÔNG!** Sai số chọn mẫu (Sampling Variance) tỷ lệ nghịch với $\\sqrt{n}$: với `n = 3..5`, chỉ cần 1 chủ nhà nghỉ bán ở kỳ `t4` hoặc thay đổi giá thử nghiệm 1 đêm là làm đảo chiều hoàn toàn Mean/rIQR của cả quận đó! Điểm nhấn chiến lược bắt buộc phải neo trên các quận/khu vực đủ trọng lượng thống kê (`A01..A08` với `n >= 36`, hoặc `Cuauhtémoc n=525`, `Miguel Hidalgo n=150`, `Benito Juárez`, `Coyoacán n=53`), còn quận nhỏ chỉ đưa vào phụ lục tham khảo kèm số `n`.",
    "explanation": "Áp dụng trực giác thống kê cỡ mẫu $\\sigma / \\sqrt{n}$ vào chọn lựa thông điệp Storytelling.",
    "projectLink": "data/processed/kpi_by_neighbourhood.csv; figures/kpi_riqr_neighbourhood.png",
    "codeLocation": "data/processed/kpi_by_neighbourhood.csv; figures/kpi_riqr_neighbourhood.png",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_neighbourhood.csv; figures/kpi_riqr_neighbourhood.png`.",
    "followUpQuestions": [
      "Con số ngưỡng `n` tối thiểu nào mà `src/viz.py:L413` đặt ra làm hàng rào cho thang màu heatmap `llm_insights.png`?"
    ],
    "followUpQA": [
      {
        "q": "Con số ngưỡng `n` tối thiểu nào mà `src/viz.py:L413` đặt ra làm hàng rào cho thang màu heatmap `llm_insights.png`?",
        "a": "Ngưỡng **`n >= 5`** (`llm_review_count >= 5`)!"
      }
    ],
    "commonMistakes": [
      "Lấy sự biến động của một quận `n = 1` hoặc `n = 3` viết thành kết luận chính sách cho cả Sở Du lịch."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_neighbourhood.csv"
    ]
  },
  {
    "id": "vr-053",
    "category": "I",
    "categoryLabel": "Đọc hiểu code",
    "bucket": "critique",
    "topics": [
      "Code Trace",
      "KPI"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy đọc `src/kpi.py:L228`: Tại sao kiểm tra thiếu giá tại `kpi.py` lại viết `~_qa_flag(df, \"qa_missing_price\") & df[price_col].notna() & (df[price_col] > 0)`?",
    "question": "Câu hỏi gài: Nếu `qa.py` đã tạo cờ `qa_missing_price` rất cẩn thận rồi, tại sao sang `src/kpi.py:L228` lại viết dài dòng tới **3 điều kiện `~_qa_flag(...) & .notna() & (> 0)`** — bỏ 2 điều kiện sau có sao không?",
    "quickAnswer": "Đó là **Lập trình phòng thủ 2 lớp (Defense in Depth)**: như vừa chứng minh ở `src/qa.py:L148`, `qa.py` giữ số âm/0 trong `price_mxn` khi xuất CSV; ngoài ra phòng trường hợp tệp `listings.csv` bị thiếu cờ hoặc sửa tay nhẹ bên ngoài, kiểm tra lại kép `notna() & (price > 0)` bảo đảm **tuyệt đối không bao giờ** có giá `0`, âm hay `NaN` lọt vào tử số của PPG hoặc làm hỏng trục `log_scale=True` của `viz.py`!",
    "explanation": "Lý giải triết lý Defense in Depth xuyên suốt `qa.py -> kpi.py -> viz.py`.",
    "projectLink": "src/kpi.py:L109, L228",
    "codeLocation": "src/kpi.py:L109, L228",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py:L109, L228`.",
    "followUpQuestions": [
      "Tương tự ngay trên `kpi.py`, hàm `_iqr_stats()` kiểm tra an toàn gì ở phần tử mẫu số khi tính `rIQR`?"
    ],
    "followUpQA": [
      {
        "q": "Tương tự ngay trên `kpi.py`, hàm `_iqr_stats()` kiểm tra an toàn gì ở phần tử mẫu số khi tính `rIQR`?",
        "a": "`med > 0` (`iqr / med if pd.notna(med) and med > 0 else np.nan`) chống chia cho `0`!"
      }
    ],
    "commonMistakes": [
      "Cho rằng 2 điều kiện `.notna() & (> 0)` trong `kpi.py` là code thừa do lập trình viên viết lặp lại `qa.py`."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vr-054",
    "category": "J",
    "categoryLabel": "Kiến trúc và toàn bộ pipeline",
    "bucket": "critique",
    "topics": [
      "Architecture",
      "QA"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện độ phủ 100% vs giới hạn kiểm thử: Tại sao dù không viết `pytest` trong repo, đồ án vẫn kiểm chứng được đúng đắn trên từng chặng?",
    "question": "Phản biện: Trong repo BTL tại tag `final`, thư mục `tests/` chưa có bộ unit test `pytest` tự động. Nhóm đã dùng những cơ chế nào thay thế để chứng minh tính đúng đắn dữ liệu, và nếu phát triển thành hệ thống production thực tế thì nên viết unit test cho những hàm nào trước tiên?",
    "quickAnswer": "Trong phạm vi BTL, nhóm kiểm chứng bằng: (1) Báo cáo tác động QA `qa_report.csv` (32 dòng kiểm kê trước/sau từng rule); (2) Tập nhãn tay `ground_truth.csv` (100 mẫu) + `hau_kiem()` (6 quy tắc trên 1.000 mẫu); (3) Kiểm toán hợp đồng `REQUIRED_QA_COLS` ở `kpi.py` và đối chiếu CSV mẫu.\nNếu nâng lên Production, **4 nhóm hàm ưu tiên số 1 cần viết `pytest`:** (a) Regex parse giá đa định dạng & `RULE_AVAILABILITY_BOUNDS` (`qa.py`); (b) `_iqr_stats()` & `compute_review_velocities()` với trường hợp `diff < 0` (`kpi.py`); (c) `clean_text()` & `BENIGN_RE` (`baseline.py`); (d) `uoc_tinh_chi_phi()` & `_is_quota_error()` (`evaluate.py`/`llm.py`).",
    "explanation": "Nhìn thẳng giới hạn thiếu `pytest` của repo nộp và đề xuất test plan đúng trọng tâm rủi ro kỹ thuật.",
    "projectLink": "src/qa.py; src/kpi.py; src/evaluate.py",
    "codeLocation": "src/qa.py; src/kpi.py; src/evaluate.py",
    "proofExample": "Đối chiếu trực tiếp tại `src/qa.py; src/kpi.py; src/evaluate.py`.",
    "followUpQuestions": [
      "Nhờ đã nắm chắc kiến trúc, câu lệnh kiểm toán nhanh không gọi LLM giúp tái lập lại toàn bộ đầu ra từ `qa -> viz` trên bất kỳ máy chấm nào là gì?"
    ],
    "followUpQA": [
      {
        "q": "Nhờ đã nắm chắc kiến trúc, câu lệnh kiểm toán nhanh không gọi LLM giúp tái lập lại toàn bộ đầu ra từ `qa -> viz` trên bất kỳ máy chấm nào là gì?",
        "a": "`python run_pipeline.py --config configs/mexico-city.yaml --from-step qa --skip-llm`."
      }
    ],
    "commonMistakes": [
      "Giấu nhẹm việc thiếu `pytest` hoặc nói đại là repo đã có sẵn bộ unit test."
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vr-055",
    "category": "E",
    "categoryLabel": "LLM, Baseline, Evaluation",
    "bucket": "critique",
    "topics": [
      "Baseline",
      "Evaluation"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `weighted_f1` vs `macro_f1` trên `nhan_khia_canh` (700 ô đánh giá).",
    "question": "Câu hỏi gài: Trên `ground_truth.csv` (100 review × 7 khía cạnh = 700 ô), `Baseline Regex` đạt `nhan_khia_canh_accuracy = 0.820`, nhưng `nhan_khia_canh_macro_f1` lại chỉ là `0.465`. Sự chênh lệch 0.355 này nói lên lỗi gì cụ thể của Baseline Regex?",
    "quickAnswer": "Trong 700 ô đó, lớp `\"not_mentioned\"` chiếm tới **>70%**. Baseline bỏ sót không phát hiện được nhiều khía cạnh ẩn hoặc tiếng Tây Ban Nha -> gán bừa thành `\"not_mentioned\"` -> trùng khớp luôn với nhãn tay ở những ô thật sự không nhắc, đẩy `Accuracy` lên `82%`! Nhưng khi `Macro F1` chấm công bằng 4 lớp (`positive, mixed, negative, not_mentioned`), điểm F1 ở 2 lớp `mixed` và `negative` của khía cạnh bị rớt thảm hại, kéo `Macro F1` xuống **`0.465`** (so với **`0.914`** của LLM)!",
    "explanation": "Giải thích chuẩn bản chất mất cân bằng 4 lớp trong phân tích ABSA.",
    "projectLink": "reports/evaluation_report.csv; figures/llm_vs_baseline.png",
    "codeLocation": "reports/evaluation_report.csv; figures/llm_vs_baseline.png",
    "proofExample": "Đối chiếu trực tiếp tại `reports/evaluation_report.csv; figures/llm_vs_baseline.png`.",
    "followUpQuestions": [
      "Thước đo thứ ba trên biểu đồ `llm_vs_baseline.png` đo riêng việc phát hiện *\"có nhắc hay không\"* (bỏ qua phân biệt khen/chê) gọi là gì và đạt bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Thước đo thứ ba trên biểu đồ `llm_vs_baseline.png` đo riêng việc phát hiện *\"có nhắc hay không\"* (bỏ qua phân biệt khen/chê) gọi là gì và đạt bao nhiêu?",
        "a": "`phat_hien_khia_canh_f1` (micro-F1 nhắc khía cạnh): LLM đạt **`0.971`** còn Baseline đạt **`0.583`**!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `0.820` nghĩa là Baseline đoán đúng 82% các khía cạnh có khen/chê."
    ],
    "relatedFiles": [
      "reports/evaluation_report.csv"
    ]
  },
  {
    "id": "vr-056",
    "category": "A",
    "categoryLabel": "Python, NumPy, pandas",
    "bucket": "critique",
    "topics": [
      "pandas",
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `str.contains(pat)` không truyền `na=False` khi cột bình luận `comments` có `NaN`.",
    "question": "Câu hỏi gài: Trong `src/evaluate.py :: hau_kiem()` hoặc bất kỳ hàm kiểm tra chuỗi nào trên `comments`, nếu viết `mask = df[\"comments\"].str.contains(\"noise\")` mà QUÊN `na=False` và cột `comments` có 1 giá trị `NaN`, khi truyền `df[mask]` thì Python văng lỗi gì?",
    "quickAnswer": "Khi không truyền `na=False`, `.str.contains()` trả về `np.nan` (hoặc `pd.NA`) tại hàng bị thiếu. Đưa `mask` còn chứa `NaN`/`pd.NA` vào phép lọc `df[mask]` sẽ ném ngay **`ValueError: Cannot mask with non-boolean array containing NA / NaN values`**! Vì thế trên thực tế mọi bước lọc `.str.contains(..., na=False)` đều phải ép `na=False` (hoặc như `clean_text` dùng `_clean_str()` ép về `\"\"` trước).",
    "explanation": "Lý giải trực tiếp lỗi thực tế của `.str.contains()` ở Bài 4 & Bài 7.",
    "projectLink": "Bài 4 & Bài 7; src/llm.py",
    "codeLocation": "Bài 4 & Bài 7; src/llm.py",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 4 & Bài 7; src/llm.py`.",
    "followUpQuestions": [
      "Lưu ý thứ hai của `.str.contains()` trong pandas 3.0 là mặc định tham số `regex` bằng `True` hay `False` — khác gì với `.str.replace()`?"
    ],
    "followUpQA": [
      {
        "q": "Lưu ý thứ hai của `.str.contains()` trong pandas 3.0 là mặc định tham số `regex` bằng `True` hay `False` — khác gì với `.str.replace()`?",
        "a": "`.str.contains()` mặc định **`regex=True`** (nên tìm ký tự `\"$\"` phải viết `r\"\\$\"` hoặc `regex=False`!), ngược lại `.str.replace()` trong pandas 3.0 mặc định **`regex=False`**!"
      }
    ],
    "commonMistakes": [
      "Nghĩ `.str.contains()` tự động coi `NaN` là `False` không cần tham số `na=False`."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vr-057",
    "category": "B",
    "categoryLabel": "CSV, API, SQL, DuckDB",
    "bucket": "critique",
    "topics": [
      "API",
      "LLM"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy \"Chạy lại cùng `batch_size=5` bị lỗi RPD giữa chừng không bị mất tiền không — nhưng lỗi nào vẫn làm mất số ít token đã gửi?\"",
    "question": "Câu hỏi gài: Nếu `src/llm.py` gửi 1 batch 5 câu tới Gemini và phía Google bắt đầu xử lý xong input nhưng rớt mạng lúc trả response (timeout), câu hỏi thực tế về chi phí & cache là gì?",
    "quickAnswer": "Về mặt **Cache (`llm_cache.jsonl`)**: batch chưa hoàn tất `validate` sẽ **không bị ghi rác** vào cache -> lần sau chạy lại vẫn giữ sạch 100% tính toàn vẹn dữ liệu. Về mặt **tài chính (tổng tokens)**: request lỗi rớt kết nối hoặc lỗi schema buộc gọi lại `batch_size = 1` ở cuối vẫn tiêu hao lại một phần nhỏ input tokens của 1 batch (~550 input token ~`$0.00016`) — nhưng mức hao hụt nhỏ không đáng kể và công thức `uoc_tinh_chi_phi()` của `evaluate.py` tính dựa trên chi phí chuẩn mực của tập 1.000 mẫu hợp lệ.",
    "explanation": "Cái nhìn trung thực giữa tính toàn vẹn dữ liệu (Cache integrity) và chi phí gọi lại retry thực tế.",
    "projectLink": "src/llm.py; src/evaluate.py",
    "codeLocation": "src/llm.py; src/evaluate.py",
    "proofExample": "Đối chiếu trực tiếp tại `src/llm.py; src/evaluate.py`.",
    "followUpQuestions": [
      "Vì sao trên `llm_cache.jsonl` có đủ 1.000/1.000 bản ghi hợp lệ ngay khi nộp?"
    ],
    "followUpQA": [
      {
        "q": "Vì sao trên `llm_cache.jsonl` có đủ 1.000/1.000 bản ghi hợp lệ ngay khi nộp?",
        "a": "Vì vòng bù `batch_size = 1` cuối `process_pending_reviews()` đã xử lý nốt mọi batch lẻ lỗi cấu trúc và ghi hoàn tất trước khi xuất `reviews_sentiment.csv`."
      }
    ],
    "commonMistakes": [
      "Tưởng retry API là hoàn toàn miễn phí ngay cả khi server đã nhận prompt và bắt đầu sinh token trước khi đứt kết nối."
    ],
    "relatedFiles": [
      "src/llm.py"
    ]
  },
  {
    "id": "vr-058",
    "category": "G",
    "categoryLabel": "Visualization",
    "bucket": "critique",
    "topics": [
      "Visualization",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện trục giá trên Boxplot `kpi_ppg_riqr_2026-06-15.png`: Tại sao `rIQR(PPG)` bên phải lại vẽ dạng Bar ngang thay vì đặt trực tiếp lên Boxplot?",
    "question": "Phản biện: Vì sao Hình 1 (`kpi_ppg_riqr_2026-06-15.png`) gồm 2 biểu đồ đặt cạnh nhau: Trái là Boxplot `PPG` (tách `Entire home/apt` vs `Private room` thang log), Phải là Bar ngang `rIQR(PPG)` kèm giá trị `(Med ...)` chứ không gộp chung 1 hình?",
    "quickAnswer": "Boxplot bên trái giúp quan sát **hình dạng phân phối thực tế, đuôi outlier và sự chênh lệch theo `room_type`** trên trục logarit (`Entire` thường đắt hơn `Private`, dù ở một số khu đơn giá chia đầu người tiệm cận gần nhau), nhưng trên trục log mắt khó tự trừ chia tỷ lệ `IQR / Median` giữa các khu vực. Biểu đồ `barh` bên phải tách rõ **1 chỉ số tóm tắt vô thứ nguyên `rIQR`** bắt đầu từ gốc `0`, gắn thẳng nhãn `rIQR (Med PPG)` để ngay lập tức xếp hạng khu đồng đều nhất (`A05: 0.660`) vs phân hóa nhất (`A08: 0.953`)!",
    "explanation": "Lập luận thiết kế Direct Visualization Pairing (Bài 12–13).",
    "projectLink": "figures/kpi_ppg_riqr_2026-06-15.png; src/viz.py:L100-L145",
    "codeLocation": "figures/kpi_ppg_riqr_2026-06-15.png; src/viz.py:L100-L145",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_riqr_2026-06-15.png; src/viz.py:L100-L145`.",
    "followUpQuestions": [
      "Trong Boxplot bên trái của Hình 1, hai loại phòng được tô màu gì để người mù màu vẫn phân biệt tốt?"
    ],
    "followUpQA": [
      {
        "q": "Trong Boxplot bên trái của Hình 1, hai loại phòng được tô màu gì để người mù màu vẫn phân biệt tốt?",
        "a": "Dùng bảng màu **`colorblind` của Seaborn** (`palette=\"colorblind\"` tại `src/viz.py:L111`) cho `Entire home/apt` và `Private room` (cũng xem xét `Hotel/Shared` nếu xuất hiện)."
      }
    ],
    "commonMistakes": [
      "Cho rằng `rIQR` có thể nhìn ra ngay bằng mắt thường trên Boxplot trục log mà không cần thanh bar đối chứng."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_riqr_2026-06-15.png"
    ]
  },
  {
    "id": "vr-059",
    "category": "F",
    "categoryLabel": "KPI và công thức",
    "bucket": "critique",
    "topics": [
      "KPI",
      "QA"
    ],
    "level": 6,
    "levelLabel": "Cấp độ 6 – Câu hỏi gài",
    "difficulty": "Nâng cao",
    "qType": "Câu hỏi gài",
    "evaluationGoal": "Bẫy `price_mxn` vs `minimum_nights`: Tại sao `qa.py` không lọc bỏ các căn có `minimum_nights >= 30` (cho thuê dài hạn)?",
    "question": "Câu hỏi gài: Trên Inside Airbnb thường có nhiều căn quy định `minimum_nights = 30` hoặc `180` ngày (cho thuê dài hạn chứ không phải du lịch ngắn ngày). Tại sao `src/qa.py` và `src/kpi.py` của Nhóm 4 không xóa bỏ nhóm này khỏi phân tích?",
    "quickAnswer": "Chấp nhận trung thực thiết kế tại tag `final`: Trong bộ `8 quy tắc QA` của `src/qa.py` và `configs/mexico-city.yaml`, Nhóm 4 giữ toàn bộ 1.000 listing được giao (bảo toàn đúng tập mẫu cố định của đề bài, không tự lọc bỏ theo `minimum_nights`) để tránh thiên lệch cắt bớt cỡ mẫu phân công! Tuy nhiên khi giải thích **`Occ_1-30`** hay **`Review Velocity`**, cần chủ động nêu giới hạn này: các căn `minimum_nights >= 30` tạo rất ít lượt review trên tháng (1 review/tháng dù kín khách 100%) và góp phần làm giảm `Review Velocity` bình quân.",
    "explanation": "Thẳng thắn chỉ rõ phạm vi code hiện tại KHÔNG lọc `minimum_nights` và biết gắn nó vào giới hạn diễn giải của KPI!",
    "projectLink": "src/qa.py; src/kpi.py; reports/report.pdf",
    "codeLocation": "src/qa.py; src/kpi.py; reports/report.pdf",
    "proofExample": "Đối chiếu trực tiếp tại `src/qa.py; src/kpi.py; reports/report.pdf`.",
    "followUpQuestions": [
      "Nếu giảng viên hỏi muốn kiểm tra nhanh trong 1.000 căn tại `t4` có bao nhiêu căn đặt `minimum_nights >= 30`, viết lệnh pandas gì?"
    ],
    "followUpQA": [
      {
        "q": "Nếu giảng viên hỏi muốn kiểm tra nhanh trong 1.000 căn tại `t4` có bao nhiêu căn đặt `minimum_nights >= 30`, viết lệnh pandas gì?",
        "a": "`(df_t4[\"minimum_nights\"] >= 30).sum()` (cộng chia cho `len(df_t4)` để ra tỷ lệ %)."
      }
    ],
    "commonMistakes": [
      "Bịa ra rằng `src/qa.py` có quy tắc #9 lọc bỏ các căn `minimum_nights >= 30`!"
    ],
    "relatedFiles": [
      "src/qa.py"
    ]
  },
  {
    "id": "vr-060",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "critique",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 5,
    "levelLabel": "Cấp độ 5 – Phản biện",
    "difficulty": "Nâng cao",
    "qType": "Phản biện",
    "evaluationGoal": "Phản biện: \"Vì sao tổng số listing ở Coyoacán trên website trước đây chỉ ghi 53 còn một số câu nói n=51?\" — Xử lý chính xác con số 53 vs 51.",
    "question": "Phản biện: Mở file `data/processed/kpi_by_neighbourhood.csv` tại dòng `Coyoacán`, ta thấy `total_listings = 53`, nhưng ở cột `valid_price_count_t4` lại là `51`. Giải thích tường minh 2 con số này để không bao giờ nói mâu thuẫn khi vấn đáp!",
    "quickAnswer": "Không hề mâu thuẫn mà bổ sung chặt chẽ cho nhau: quận `Coyoacán` có đúng **`53` listing** trong mẫu 1.000 căn của Nhóm 4 (`5.3%` tổng cung mẫu), nhưng tại mốc `t4` có `2` căn bị khuyết giá (`qa_missing_price = True`), nên chỉ có **`51` listing có giá/PPG hợp lệ** đóng góp vào tính `Median Price (1.568,00 MXN)`, `Median PPG (601,16 MXN)` và `rIQR (0.6400)`! Tương tự tại `Cuauhtémoc`: `total_listings = 525` nhưng `valid_price_count_t4 = 514` (`11` căn thiếu giá ở `t4`).",
    "explanation": "Chuẩn hóa chính xác số liệu đối chiếu từ `data/processed/kpi_by_neighbourhood.csv`!",
    "projectLink": "data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Trong 15 quận của `kpi_by_neighbourhood.csv`, tổng cộng toàn bộ cột `total_listings` bằng bao nhiêu và tổng `valid_price_count_t4` bằng bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Trong 15 quận của `kpi_by_neighbourhood.csv`, tổng cộng toàn bộ cột `total_listings` bằng bao nhiêu và tổng `valid_price_count_t4` bằng bao nhiêu?",
        "a": "Tổng `total_listings` = **`1.000`**, và tổng `valid_price_count_t4` = **`980`** (khớp tuyệt đối từng đơn vị với `kpi_by_snapshot.csv`!)."
      }
    ],
    "commonMistakes": [
      "Nhầm `51` là tổng số listing ở Coyoacán rồi cãi nhau với người đọc số `53`."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_neighbourhood.csv"
    ]
  }
];

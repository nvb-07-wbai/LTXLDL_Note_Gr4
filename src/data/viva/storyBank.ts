import type { VivaQuestion } from '../../types';

export const VIVA_STORY_BANK: VivaQuestion[] = [
  {
    "id": "vo-001",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Diễn giải xu hướng giá niêm yết +67.3% và PPG +64.1% từ t1 đến t4.",
    "question": "Khi trình bày Story 1 (\"Cú sốc giá niêm yết hướng tới World Cup 2026\"), những con số cốt lõi nào từ `kpi_by_snapshot.csv` chứng minh mức tăng lan tỏa toàn thị trường mẫu?",
    "quickAnswer": "Trên mẫu 1.000 listing cố định, **Median Price** tăng **+67.3%** (`1.159,50 -> 1.767,75 -> 1.940,00 MXN`) và **Median PPG** tăng **+64.1%** (`382,00 -> 565,39 -> 626,79 MXN`) từ `t1` (09/2025) tới `t4` (06/2026). Quan trọng hơn, mức tăng lan tỏa đồng đều ở **8/8 khu vực** (tăng PPG từ `+56%` đến `+70%`, dẫn đầu là `A03 +70.1%`, `A05` đứng đầu tuyệt đối `819 MXN/khách`).",
    "explanation": "Kết hợp 3 chiều: mức tăng toàn mẫu + mức tăng từ `t3` (`+52.5%` price / `+48.0%` PPG đã đạt sẵn trước World Cup) + độ phủ 8/8 khu vực.",
    "projectLink": "figures/kpi_ppg_snapshots.png; data/processed/kpi_by_snapshot.csv",
    "codeLocation": "figures/kpi_ppg_snapshots.png; data/processed/kpi_by_snapshot.csv",
    "proofExample": "`data/processed/kpi_by_snapshot.csv` và `figures/kpi_ppg_snapshots.png`.",
    "followUpQuestions": [
      "Trong tổng mức tăng `+67.3%` Median Price từ `t1` sang `t4`, giai đoạn `t1 -> t3` (tới cuối tháng 3/2026) đã đóng góp bao nhiêu %?"
    ],
    "followUpQA": [
      {
        "q": "Trong tổng mức tăng `+67.3%` Median Price từ `t1` sang `t4`, giai đoạn `t1 -> t3` (tới cuối tháng 3/2026) đã đóng góp bao nhiêu %?",
        "a": "Từ `1.159,50` lên `1.767,75 MXN` là **`+52.5%`** ngay từ `t3`, tức gần 80% biên độ tăng đã hình thành trước khi bước vào quý cuối cận giải!"
      }
    ],
    "commonMistakes": [
      "Nói chung chung \"giá phòng tăng mạnh gấp đôi\" (nhầm sang Mean +96.3%) hoặc khẳng định World Cup gây ra 100% cú tăng này."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_snapshots.png"
    ]
  },
  {
    "id": "vo-002",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích ý nghĩa thống kê PPG vs Price trên Hình 1 (`kpi_ppg_riqr_2026-06-15.png`).",
    "question": "Trên Hình 1 (`kpi_ppg_riqr_2026-06-15.png`), cặp chỉ số `(Median PPG, rIQR PPG)` tiết lộ cấu trúc phân tầng nào giữa khu trung tâm thương mại `A05` (Benito Juárez) và khu rìa phía Bắc `A08`?",
    "quickAnswer": "`A05` (Benito Juárez, `n=85`) đạt **Median PPG cao nhất CDMX (`819 MXN/khách`)** kèm **`rIQR` thấp nhất (`0.660`)** -> phân khúc tương đối đồng đều, định giá chuẩn hóa cao; ngược lại `A08` (`n=50`) có **Median PPG rẻ nhất (`428 MXN/khách`)** nhưng **`rIQR` cao nhất (`0.953`)** -> phân hóa mạnh nhất giữa căn bình dân giá thấp và vài căn cao hơn hẳn mặt bằng khu.",
    "explanation": "Cho thấy cách đọc kết hợp Vị trí trung tâm (`Median PPG`) và Độ trải phân phối (`rIQR`).",
    "projectLink": "figures/kpi_ppg_riqr_2026-06-15.png; data/processed/kpi_by_area.csv",
    "codeLocation": "figures/kpi_ppg_riqr_2026-06-15.png; data/processed/kpi_by_area.csv",
    "proofExample": "`figures/kpi_ppg_riqr_2026-06-15.png` và `data/processed/kpi_by_area.csv`.",
    "followUpQuestions": [
      "Khu vực `A04` (lõi du lịch Cuauhtémoc + Venustiano Carranza, `n=559`) đứng ở đâu về Median PPG và rIQR tại `t4`?"
    ],
    "followUpQA": [
      {
        "q": "Khu vực `A04` (lõi du lịch Cuauhtémoc + Venustiano Carranza, `n=559`) đứng ở đâu về Median PPG và rIQR tại `t4`?",
        "a": "Median PPG = **`667 MXN/khách`** (nhóm cao) và `rIQR(PPG) = 0.779` (mức phân hóa trung bình)."
      }
    ],
    "commonMistakes": [
      "Nhầm rằng khu có giá cao nhất (`A05`) thì độ phân tán giá (`rIQR`) cũng lớn nhất!"
    ],
    "relatedFiles": [
      "figures/kpi_ppg_riqr_2026-06-15.png"
    ]
  },
  {
    "id": "vo-003",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích cách đọc đúng biểu đồ `kpi_ppg_snapshots.png` ở khung `t2` bị trống.",
    "question": "Khi thuyết minh biểu đồ `kpi_ppg_snapshots.png`, tại sao lại giữ hẳn 1 khung trắng cho `t2 (2025-12-29)` thay vì chỉ vẽ 3 khung `t1, t3, t4` cạnh nhau cho đẹp?",
    "quickAnswer": "Nếu bỏ khung `t2`, mắt người sẽ mặc định `t1 -> t3 -> t4` là 3 kỳ cách đều nhau (~3 tháng/kỳ), che giấu khoảng trống **6 tháng (184 ngày)** từ tháng 9/2025 sang tháng 3/2026 và giấu luôn sự cố mất giá của nguồn Inside Airbnb cuối tháng 12/2025! Giữ 4 khung lưới 2×2 chung thang đo kèm dòng chữ `\"Thiếu dữ liệu giá (n=0)\"` bảo đảm **tính trung thực về trục thời gian và chất lượng dữ liệu** (Bài 12–14).",
    "explanation": "Chuẩn mực minh bạch dữ liệu khi kể chuyện trước stakeholder.",
    "projectLink": "figures/kpi_ppg_snapshots.png; src/viz.py:L150-L175",
    "codeLocation": "figures/kpi_ppg_snapshots.png; src/viz.py:L150-L175",
    "proofExample": "`figures/kpi_ppg_snapshots.png` (`src/viz.py:L150-L175`).",
    "followUpQuestions": [
      "Trên khung `t1`, `t3`, `t4`, trục X chung được khóa ở cận phải khoảng bao nhiêu để giữ công bằng thị giác?"
    ],
    "followUpQA": [
      {
        "q": "Trên khung `t1`, `t3`, `t4`, trục X chung được khóa ở cận phải khoảng bao nhiêu để giữ công bằng thị giác?",
        "a": "`xmax = float(np.nanmax(...)) * 1.32` (vượt qua mức `819 MXN` của A05 lên hơn `1.050 MXN` để đủ chỗ chứa nhãn số bên phải thanh!)."
      }
    ],
    "commonMistakes": [
      "Xóa hẳn khung `t2` hoặc nội suy một đường nét đứt nối liền `t1` với `t3`."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_snapshots.png"
    ]
  },
  {
    "id": "vo-004",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Kể câu chuyện đối chiếu 4 bản đồ Choropleth (`kpi_ppg_neighbourhood.png`) cho người không chuyên kỹ thuật.",
    "question": "Khi giới thiệu Hình 3 (`kpi_ppg_neighbourhood.png`, 4 bản đồ 16 quận CDMX) cho lãnh đạo Sở Du lịch, cần hướng dẫn cách đọc từ trên xuống dưới, từ trái sang phải như thế nào để khán giả nhận ra ngay \"ảo giác thị giác của Mean\"?",
    "quickAnswer": "1) **Hàng trên (Price cả căn):** Bản đồ Trái (`Mean`) tô đỏ sẫm **Xochimilco (`3.848 MXN, #1`)** và **Cuauhtémoc (`3.529 MXN, #3`)**, dễ gây hiểu nhầm hai khu này đắt đỏ cực đoan; sang bản đồ Phải (`Median`), Cuauhtémoc hạ xuống **`2.215 MXN`**, Miguel Hidalgo nổi lên vượt hơn (`2.339 MXN`)!\n2) **Hàng dưới (PPG/khách):** Khi chia cho sức chứa `accommodates`, Xochimilco tụt hẳn xuống **Mean PPG `521 MXN` (#11 `rank_ppg_t4`) / Median PPG `377 MXN` (#10/15)** vì bản chất là nhà vườn 12–14 khách; bản đồ dưới-phải (`Median PPG`) lộ rõ cấu trúc lõi thật: **Miguel Hidalgo (`706,12 MXN, #1`) -> Cuauhtémoc (`678,00 MXN, #2`)**!",
    "explanation": "Hướng dẫn đọc bản đồ 2×2 đúng trọng tâm Storytelling (Bài 13–14).",
    "projectLink": "figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "`figures/kpi_ppg_neighbourhood.png` và `data/processed/kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Quận có họa tiết gạch chéo màu xám nhạt ở rìa Đông Nam trên cả 4 bản đồ là quận nào và vì sao tô vậy?"
    ],
    "followUpQA": [
      {
        "q": "Quận có họa tiết gạch chéo màu xám nhạt ở rìa Đông Nam trên cả 4 bản đồ là quận nào và vì sao tô vậy?",
        "a": "Quận **Tláhuac** — không có căn hộ nào trong mẫu 1.000 listing của Nhóm 4 (`n = 0`), nên dùng gạch chéo `hatch=\"///\"` biểu thị \"Không có trong mẫu / NA\"."
      }
    ],
    "commonMistakes": [
      "Chỉ đọc kết quả ở góc trên-trái (`Price Mean`) rồi dừng lại."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_neighbourhood.png"
    ]
  },
  {
    "id": "vo-005",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích sự trỗi dậy đồng đều của Coyoacán và phân hóa mạnh tại Tlalpan (hai quận cửa ngõ phía Nam).",
    "question": "Trong nhóm các quận nằm ngoài lõi trung tâm Bắc, hai quận phía Nam gần khu vực sân vận động Estadio Azteca là **Coyoacán (`n=53`)** và **Tlalpan (`n=23`)** thể hiện hình thái giá khác biệt nhau thế nào trong Hình 3 và Hình 4?",
    "quickAnswer": "- **Coyoacán (`n=51` có giá t4):** Median PPG tăng mạnh (`+70.8%` từ `352,00` lên **`601,16 MXN`**) kèm độ phân tán thấp (`rIQR PPG = 0.6400`) -> toàn bộ thị trường Coyoacán nâng mặt bằng giá đồng loạt;\n- **Tlalpan (`n=23`):** Tuy Median PPG trung bình (`452,61 MXN`) nhưng có **độ phân tán cao bất thường ở CẢ HAI thước đo (`rIQR Price = 1.3946`, `rIQR PPG = 1.0995`)** -> dấu hiệu một phần chủ nhà gần sân vận động bắt đầu niêm yết giá cao đột biến trong khi phần còn lại vẫn giữ giá dân sinh bình thường!",
    "explanation": "Liên kết địa lý World Cup (sân khai mạc Estadio Azteca nằm ở ranh giới Coyoacán/Tlalpan) với dữ liệu phân phối thật.",
    "projectLink": "figures/kpi_riqr_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/kpi_riqr_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "`data/processed/kpi_by_neighbourhood.csv` và `figures/kpi_riqr_neighbourhood.png`.",
    "followUpQuestions": [
      "Giả sử chủ nhà ở Tlalpan thấy hàng xóm gần sân vận động treo giá cao gấp 3–4 lần, thông số nào xác nhận thị trường ở Tlalpan vẫn chưa hoàn toàn đồng thuận mức giá cao đó?"
    ],
    "followUpQA": [
      {
        "q": "Giả sử chủ nhà ở Tlalpan thấy hàng xóm gần sân vận động treo giá cao gấp 3–4 lần, thông số nào xác nhận thị trường ở Tlalpan vẫn chưa hoàn toàn đồng thuận mức giá cao đó?",
        "a": "`Median PPG` của Tlalpan vẫn giữ mức khá mềm **`452,61 MXN/khách`**, chỉ có một đuôi trên kéo rIQR lên `1.0995`."
      }
    ],
    "commonMistakes": [
      "Gộp Coyoacán và Tlalpan thành một đặc tính giống nhau mà quên mức chênh `rIQR(PPG)` (`0.640` vs `1.100`)."
    ],
    "relatedFiles": [
      "figures/kpi_riqr_neighbourhood.png"
    ]
  },
  {
    "id": "vo-006",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích phát hiện ngược kỳ vọng: Đỉnh Occupancy ở `t3` (Semana Santa) chứ không phải `t4` (World Cup).",
    "question": "Trong Story 3 (\"Mặt bằng lịch đặt phòng: Tuần Thánh Semana Santa vs World Cup 2026\"), số liệu thực tế từ `kpi_by_snapshot.csv` lật ngược giả định thông thường ra sao và cách lý giải hợp lý là gì?",
    "quickAnswer": "Thông thường ai cũng nghĩ tuần khai mạc World Cup (`t4`: `2026-06-15`) phải kín phòng nhất. Thực tế: **`Occ_1-30` đạt đỉnh `48.47%` tại `t3` (`2026-03-30`, trùng Tuần Thánh Semana Santa)** cùng **`Urgency Gap` đỉnh `+21.38 pp`**; tới `t4`, `Occ_1-30` giảm còn **`44.53%`** và `Urgency Gap` giảm còn **`+18.06 pp`**! Lý giải phù hợp: (1) Khách du lịch nội địa dịp lễ Semana Santa chốt lịch nhanh hơn hoặc các gói lưu trú lễ kéo dài; (2) Tại `t4`, mặt bằng giá chào đã bị đẩy tăng thêm so với `t3` (`1.940 vs 1.768 MXN`, riêng A03 +70% so với t1) có thể khiến một bộ phận khách chọn giải pháp khác hoặc chưa chốt ở mức giá đầu cơ cao (cộng thêm giới hạn không tách được tự khóa lịch).",
    "explanation": "Minh họa rõ kỹ năng trình bày phát hiện bất ngờ (Counter-intuitive Finding) mà không suy diễn nhân quả quá đà.",
    "projectLink": "figures/kpi_occupancy_gap.png; data/processed/kpi_by_snapshot.csv",
    "codeLocation": "figures/kpi_occupancy_gap.png; data/processed/kpi_by_snapshot.csv",
    "proofExample": "`figures/kpi_occupancy_gap.png` và `data/processed/kpi_by_snapshot.csv`.",
    "followUpQuestions": [
      "Và tại sao `Occ_31-90` ở cả 4 mốc (`~26.4%–31.8%`) luôn thấp hơn hẳn `Occ_1-30` (`~44.5%–48.5%`)?"
    ],
    "followUpQA": [
      {
        "q": "Và tại sao `Occ_31-90` ở cả 4 mốc (`~26.4%–31.8%`) luôn thấp hơn hẳn `Occ_1-30` (`~44.5%–48.5%`)?",
        "a": "Tạo nên **`Urgency Gap` luôn dương lớn (`+16.68` đến `+21.38 pp`)**: đặc trưng thị trường Airbnb CDMX là xu hướng đặt/giữ chỗ tập trung mạnh trong cửa sổ sát ngày `1–30` ngày thay vì đặt trước 2–3 tháng!"
      }
    ],
    "commonMistakes": [
      "Nói sai sự thật rằng \"World Cup 2026 bị ế khách thảm hại vì `Occ_1-30` giảm từ `48.47%` xuống `44.53%`\" (44.53% vẫn gần nửa số ngày trong tháng kế tiếp không khả dụng!)."
    ],
    "relatedFiles": [
      "figures/kpi_occupancy_gap.png"
    ]
  },
  {
    "id": "vo-007",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích hiện tượng Review Velocity giảm nhẹ Q1 -> Q3 và Ghost Rate cực thấp.",
    "question": "Trong Story 3 mở rộng (`kpi_review_ghost.png`), cần diễn giải cặp số liệu `Review Velocity` (`2.55 -> 2.14 -> 2.08`) và `Ghost Rate` (`0.7% -> 0.3% -> 0.0% -> 0.4%`) thế nào cho khớp với bức tranh thị trường?",
    "quickAnswer": "1) **Nguồn cung vẫn hoạt động bền vững:** `Ghost Rate` dưới `1%` ở cả 4 mốc và **0 căn nào đóng băng liên tiếp 4 mốc** -> gần như toàn bộ mẫu 1.000 căn vẫn duy trì vận hành đón khách hoặc sẵn sàng mở lịch suốt chiến dịch tới World Cup;\n2) **Review Velocity giảm nhẹ** từ quý thu–đông `Q1 (2.55)` sang `Q2 (2.14)` và `Q3 (2.08)` phản ánh nhịp mùa vụ + sự khác biệt độ dài lưu trú/độ trễ bình luận trước khi đợt khách chính World Cup check-out viết review; khu **`A04` (lõi du lịch)** vẫn giữ tốc độ review cao nhất mọi quý (`3.97 -> 3.01 -> 3.25`).",
    "explanation": "Kết nối chỉ số quá khứ (`RV`) với độ bền nguồn cung (`Ghost`) một cách nhất quán.",
    "projectLink": "figures/kpi_review_ghost.png; data/processed/kpi_by_snapshot.csv",
    "codeLocation": "figures/kpi_review_ghost.png; data/processed/kpi_by_snapshot.csv",
    "proofExample": "`figures/kpi_review_ghost.png` và `data/processed/kpi_by_snapshot.csv`.",
    "followUpQuestions": [
      "Con số `Review Velocity = 2.08` có bị méo nếu một khách ở dài 1 tháng viết 1 review vs 10 khách ở 3 ngày viết 10 review không?"
    ],
    "followUpQA": [
      {
        "q": "Con số `Review Velocity = 2.08` có bị méo nếu một khách ở dài 1 tháng viết 1 review vs 10 khách ở 3 ngày viết 10 review không?",
        "a": "Có! Review Velocity phản ánh số *đánh giá mới phát sinh trên 30 ngày*, nên nhạy với số lượt quay vòng khách (turnover) hơn là tổng số đêm phòng lấp đầy."
      }
    ],
    "commonMistakes": [
      "Kết luận Review Velocity = 2.08 nghĩa là trung bình mỗi căn chỉ có đúng 2 lượt khách thuê trong 1 tháng."
    ],
    "relatedFiles": [
      "figures/kpi_review_ghost.png"
    ]
  },
  {
    "id": "vo-008",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Thông điệp cốt lõi của Story 4: Vì sao tách lớp `mixed` mới phanh phui \"điểm đau ẩn\" về Tiện nghi và Tiếng ồn?",
    "question": "Trong Story 4 (\"Tiếng nói du khách ẩn sau lớp đánh giá Mixed\"), tại sao việc giữ riêng lớp `mixed` (`20.6%` mẫu LLM) trong `src/llm.py` và vẽ song song `Negative vs Negative+Mixed` trên `llm_insights.png` mang lại thông tin quyết định cho SECTUR CDMX?",
    "quickAnswer": "Nếu chỉ nhìn **điểm thuần `negative`**, `Cuauhtémoc (n=749)` trông cực kỳ sạch sẽ với chỉ **`1.87%` (14/749)** chê Tiện nghi và `4.01%` chê Tiếng ồn — dễ ru ngủ nhà quản lý! Nhưng khi cộng gộp lớp `mixed` (`complaint_mixed`, bắt các review kiểu *\"Vị trí tuyệt vời, nhưng vòi nước nóng yếu / đêm rất ồn\"*), tỷ lệ phản ánh tiêu cực nhảy vọt gần 8 lần lên **`14.82%` (111/749) cho Tiện nghi (`amenities`)** và gấp đôi lên **`8.14%` (61/749) cho Tiếng ồn (`noise`)**! Tương tự ở Miguel Hidalgo (`n=150`), Tiện nghi vọt từ `2.0%` lên `10.0%`.",
    "explanation": "Khẳng định giá trị thực tiễn cao nhất của mô-đun NLP/LLM đối với Stakeholder Sở Du lịch.",
    "projectLink": "figures/llm_insights.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/llm_insights.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "`figures/llm_insights.png` và `data/processed/kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Ngược lại với `amenities` và `noise`, hai khía cạnh nào được du khách khen nhiều nhất và tỷ lệ phàn nàn thấp nhất ở Cuauhtémoc?"
    ],
    "followUpQA": [
      {
        "q": "Ngược lại với `amenities` và `noise`, hai khía cạnh nào được du khách khen nhiều nhất và tỷ lệ phàn nàn thấp nhất ở Cuauhtémoc?",
        "a": "**`location`** (vị trí) và **`communication` / `checkin`** đạt tỷ lệ hài lòng rất cao (tỷ lệ `complaint_mixed` ở mức thấp vài phần trăm)."
      }
    ],
    "commonMistakes": [
      "Gộp thẳng `mixed` vào `positive` hoặc gán thành `neutral` mờ nhạt khiến mất sạch 111 cảnh báo tiện nghi tại trung tâm!"
    ],
    "relatedFiles": [
      "figures/llm_insights.png"
    ]
  },
  {
    "id": "vo-009",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Trình bày bằng chứng định lượng bảo vệ chi phí đầu tư LLM (`$0.2030` vs Baseline `$0`).",
    "question": "Trong Story 4 / Câu chuyện kỹ thuật AI (`llm_vs_baseline.png`), làm sao thuyết phục Ban giám đốc (hoặc Giảng viên) rằng chi phí chạy LLM là xứng đáng thay vì dùng Baseline Regex miễn phí?",
    "quickAnswer": "Bằng bộ **3 cặp đối chứng định lượng** trên `100` nhãn tay độc lập (`llm_vs_baseline.png`):\n1) **Cảm xúc tổng thể (`Macro F1`):** LLM đạt **`0.991`** vs Baseline **`0.522`** (vượt **`+0.469`** — Baseline bỏ sót gần hết lớp `mixed` và `negative` chứa điểm đau dịch vụ);\n2) **Gán nhãn 7 khía cạnh (`Macro F1`):** LLM đạt **`0.914`** vs Baseline **`0.465`** (`+0.449`);\n3) **Tính kinh tế:** Cho 1.000 review phân tích sâu chỉ tốn **`$0.2030` USD** (~5.000 VNĐ) — một chi phí siêu nhỏ để biến văn bản thô đa ngôn ngữ thành 14 cột KPI phàn nàn định lượng chính xác.",
    "explanation": "Cấu trúc bảo vệ ROI của LLM: Chất lượng (`Macro F1`) + Sai sót bị chặn (Mixed/Đa ngôn ngữ) + Đơn giá (`$0.2030`).",
    "projectLink": "figures/llm_vs_baseline.png; reports/llm_cost_estimate.csv",
    "codeLocation": "figures/llm_vs_baseline.png; reports/llm_cost_estimate.csv",
    "proofExample": "`figures/llm_vs_baseline.png` và `reports/llm_cost_estimate.csv`.",
    "followUpQuestions": [
      "Trong trường hợp muốn mở rộng toàn bộ 1.719.730 review của cả CDMX, ta cần báo cáo thêm hạn mức ngân sách và lưu ý kỹ thuật nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong trường hợp muốn mở rộng toàn bộ 1.719.730 review của cả CDMX, ta cần báo cáo thêm hạn mức ngân sách và lưu ý kỹ thuật nào?",
        "a": "Ước tính chi phí ngoại suy là **`~$349.11 USD`** (`llm_cost_estimate.csv`), và để tiết kiệm thêm ~50% có thể chạy theo Batch API hoặc tối giản schema key output."
      }
    ],
    "commonMistakes": [
      "Chỉ so mỗi `Accuracy` (`0.99 vs 0.85`), dễ bị bắt bẻ \"chỉ hơn có 14% mà phải gọi API\"."
    ],
    "relatedFiles": [
      "figures/llm_vs_baseline.png"
    ]
  },
  {
    "id": "vo-010",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Kể câu chuyện tổng kết & Khuyến nghị hành động bám sát 6 Ranh giới Cấm Nhầm lẫn.",
    "question": "Khi khép lại bài thuyết trình (Story 5: Khuyến nghị cho SECTUR CDMX & Giới hạn diễn giải), 3 nhóm khuyến nghị thực tế nào gắn trực tiếp được với 3 bằng chứng số liệu của dự án?",
    "quickAnswer": "1) **Giám sát mặt bằng giá niêm yết đa điểm:** Không chỉ tập trung Cuauhtémoc/Miguel Hidalgo (`678–706 MXN/khách`), mà phải mở rộng theo dõi sang vùng cửa ngõ phía Nam quanh Estadio Azteca như **Coyoacán (`+77.5% PPG`, `rIQR=0.640`)** và **Tlalpan (`rIQR PPG=1.100`)**;\n2) **Kiểm tra chuẩn tiện nghi & quản lý tiếng ồn vùng lõi:** Dựa trên tỷ lệ `complaint_mixed` **Tiện nghi `14.8%`** và **Tiếng ồn `8.1%`** tại Cuauhtémoc (và `10.0%` tại Miguel Hidalgo), ban hành bộ tiêu chuẩn kiểm tra nhanh nước nóng/thiết bị/cách âm trước mùa cao điểm;\n3) **Cảnh báo chủ nhà về rủi ro định giá quá ngưỡng (Overpricing):** Dẫn chứng thực tế khu **`A03`** tăng giá `+70.1%` có **`Occ_1-30` thấp nhất `34.58%`** và 2 căn `153.540 MXN` có `Occ = 0%`, khuyến khích định giá theo PPG thị trường.",
    "explanation": "Mỗi khuyến nghị đều buộc chặt bằng tên khu vực/quận và con số thực từ CSV.",
    "projectLink": "reports/report.pdf",
    "codeLocation": "reports/report.pdf",
    "proofExample": "`reports/report.pdf` Chương 6 & `StorytellingData`.",
    "followUpQuestions": [
      "Cần đính kèm chính xác **3 giới hạn phương pháp** nào ngay dưới trang khuyến nghị này để không bị giảng viên bắt lỗi quá lời?"
    ],
    "followUpQA": [
      {
        "q": "Cần đính kèm chính xác **3 giới hạn phương pháp** nào ngay dưới trang khuyến nghị này để không bị giảng viên bắt lỗi quá lời?",
        "a": "(1) Mẫu cố định 1.000 listing (`3.2%`, 52.5% ở Cuauhtémoc) & 1.000 review (74.9% ở Cuauhtémoc) mang thiên lệch chọn mẫu; (2) Giá niêm yết (khuyết `t2`) và `Availability` proxy không phải giao dịch thực; (3) Số liệu mô tả tương quan theo thời gian, không khẳng định nhân quả đơn tuyến World Cup."
      }
    ],
    "commonMistakes": [
      "Đưa khuyến nghị chung chung kiểu \"cần phát triển du lịch bền vững và đẩy mạnh quảng bá hình ảnh thành phố\" không bám số liệu nào từ dự án!"
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vo-011",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Checklist 9 bước chuẩn bị kể một Story từ biểu đồ trong vấn đáp.",
    "question": "Để trình bày trơn tru bất kỳ biểu đồ nào trong 8 hình `figures/*.png` dưới áp lực 90 giây vấn đáp, trình tự 9 thành phần chuẩn mà một câu chuyện dữ liệu cần phủ đủ là gì?",
    "quickAnswer": "1) **Bối cảnh** (SECTUR & lịch sự kiện CDMX); 2) **Câu hỏi kinh doanh**; 3) **Định nghĩa & Công thức KPI**; 4) **Cách đọc biểu đồ** (trục, đơn vị, thang đo, cỡ mẫu `n`); 5) **Phát hiện chính (Big Idea)**; 6) **Bằng chứng số liệu đối chiếu từ CSV**; 7) **Giải thích phương pháp & lựa chọn thước đo**; 8) **Hàm ý cho SECTUR / chủ nhà**; 9) **Giới hạn nhận định & Câu hỏi bảo vệ**!",
    "explanation": "Khung tư duy Storytelling 9 bước bảo đảm không sót bất kỳ câu hỏi vặn nào từ giảng viên.",
    "projectLink": "src/pages/StorytellingPage.tsx; Bài 14",
    "codeLocation": "src/pages/StorytellingPage.tsx; Bài 14",
    "proofExample": "Đối chiếu trực tiếp tại `src/pages/StorytellingPage.tsx; Bài 14`.",
    "followUpQuestions": [
      "Trong 9 bước đó, nếu chỉ có đúng 60–90 giây trả lời vấn đáp cho 1 câu hỏi về biểu đồ, bạn nên ưu tiên nói những phần nào trước?"
    ],
    "followUpQA": [
      {
        "q": "Trong 9 bước đó, nếu chỉ có đúng 60–90 giây trả lời vấn đáp cho 1 câu hỏi về biểu đồ, bạn nên ưu tiên nói những phần nào trước?",
        "a": "Đưa **Phát hiện chính (#5) + Bằng chứng số (#6) -> Cách đọc ngắn/cỡ mẫu (#4) -> Giới hạn (#9)** lên đầu trước!"
      }
    ],
    "commonMistakes": [
      "Nhảy thẳng vào đọc 2 con số trên ảnh mà quên nêu đơn vị, cỡ mẫu `n` và giới hạn."
    ],
    "relatedFiles": [
      "src/pages/StorytellingPage.tsx"
    ]
  },
  {
    "id": "vo-012",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Liệt kê và phân biệt đủ **6 Ranh giới Cấm Nhầm lẫn** khi diễn giải kết quả Inside Airbnb.",
    "question": "Trong bài toán Inside Airbnb CDMX, hãy nêu đúng 6 cặp ranh giới khái niệm TUYỆT ĐỐI không được đánh đồng với nhau trong báo cáo hay khi vấn đáp.",
    "quickAnswer": "1) **Tương quan / Đồng xuất hiện ≠ Nhân quả** (`t4` trùng World Cup != World Cup gây ra toàn bộ `+67.3%`);\n2) **Availability ≠ Occupancy thực tế** (`Occ_1-30` tính từ lịch mở đặt bao gồm cả chủ nhà tự khóa phòng);\n3) **Số lượng Review ≠ Số lượt khách thực** (phụ thuộc tỷ lệ khách viết review và độ dài kỳ thuê);\n4) **Không có review / Ghost = 1 ≠ Ngừng kinh doanh vĩnh viễn** (chỉ là trạng thái tạm thời, 0 căn ghost cả 4 mốc);\n5) **Tỷ lệ `complaint_mixed` trên mẫu 1.000 review LLM ≠ Tỷ lệ bất mãn toàn CDMX** (74.9% review nằm ở Cuauhtémoc và `mixed` là khen kèm góp ý);\n6) **Mẫu 1.000 listing cố định (~3.2%) ≠ Toàn bộ thị trường Airbnb Mexico City** (không suy rộng quy mô tổng cung mới).",
    "explanation": "Bảng tường lửa khái niệm chuẩn mực bảo vệ bài làm khỏi toàn bộ bẫy phản biện của Bài 14.",
    "projectLink": "Bài 14; reports/report.pdf",
    "codeLocation": "Bài 14; reports/report.pdf",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 14; reports/report.pdf`.",
    "followUpQuestions": [
      "Trong 6 ranh giới đó, ranh giới số 2 và số 3 có mối liên hệ kiểm chứng chéo nào rất thú vị trên dữ liệu CDMX?"
    ],
    "followUpQA": [
      {
        "q": "Trong 6 ranh giới đó, ranh giới số 2 và số 3 có mối liên hệ kiểm chứng chéo nào rất thú vị trên dữ liệu CDMX?",
        "a": "Ta dùng `Review Velocity` kiểm chứng chéo `Occ` (tránh nhầm căn khóa lịch ế thành đông khách), đồng thời dùng `exclude_ghost=True` loại bớt căn đóng băng kéo dài."
      }
    ],
    "commonMistakes": [
      "Nhớ được đúng 1 câu \"Tương quan khác Nhân quả\" mà quên mất 5 ranh giới đặc thù của Inside Airbnb & LLM!"
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vo-013",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích sự khác biệt thứ hạng Quận theo `Price Mean` vs `Price Median` vs `PPG Median` tại `t4`.",
    "question": "Dựa trên `kpi_by_neighbourhood.csv` (mốc `t4`), hãy nêu sự hoán đổi thứ hạng đáng chú ý nhất giữa Top 3 quận khi chuyển từ thước đo `Price Mean` -> `Price Median` -> `PPG Median`.",
    "quickAnswer": "- Theo **`Price Mean`:** #1 Xochimilco (`3.848 MXN`, `n=5`), #2 Cuajimalpa (`3.808 MXN`, `n=15`), #3 Cuauhtémoc (`3.529 MXN`, bị 2 căn >153k MXN kéo), #4 Miguel Hidalgo (`3.255 MXN`);\n- Theo **`Price Median` (các quận `n >= 20`):** #1 Miguel Hidalgo (`2.339,42 MXN`), #2 Cuauhtémoc (`2.215,25 MXN`), #3 Álvaro Obregón (`1.753,50 MXN`), #4 Benito Juárez (`1.632,00 MXN`);\n- Theo **`PPG Median` (tất cả 15 quận):** #1 **Miguel Hidalgo (`706,12 MXN`)**, #2 **Cuauhtémoc (`678,00 MXN`)**, #3 **Iztacalco (`642,00 MXN`, `n=17`)**, tiếp theo Coyoacán (`601,16 MXN`) và Benito Juárez (`572,00 MXN`), còn Xochimilco xuống **`376,59 MXN` (`#10/15` Median PPG, `#11` theo Mean PPG `521,29 MXN`)**!",
    "explanation": "Minh họa hoàn hảo bằng con số thật từ `kpi_by_neighbourhood.csv` về sức mạnh lọc nhiễu kép của Median + PPG.",
    "projectLink": "data/processed/kpi_by_neighbourhood.csv; figures/kpi_ppg_neighbourhood.png",
    "codeLocation": "data/processed/kpi_by_neighbourhood.csv; figures/kpi_ppg_neighbourhood.png",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_neighbourhood.csv; figures/kpi_ppg_neighbourhood.png`.",
    "followUpQuestions": [
      "Quận nào đứng cuối bảng (#15/15) về `Median PPG` ở `t4` nhưng chỉ có `n = 4` listing trong mẫu?"
    ],
    "followUpQA": [
      {
        "q": "Quận nào đứng cuối bảng (#15/15) về `Median PPG` ở `t4` nhưng chỉ có `n = 4` listing trong mẫu?",
        "a": "Quận **`Iztapalapa`** với `Median PPG = 266,42 MXN/khách` (`total_listings = 4`, `valid_price_t4 = 4`)."
      }
    ],
    "commonMistakes": [
      "Nói Cuauhtémoc luôn là quận đắt số #1 CDMX ở mọi thước đo (`Miguel Hidalgo` thực tế đứng #1 ở cả `Price Median` và `PPG Median`!)."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_neighbourhood.csv"
    ]
  },
  {
    "id": "vo-014",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Tại sao phân tích theo **`room_type`** trong Hình 1 lại giải thích được sự chênh lệch lớn giữa `Entire home/apt` và `Private room`?",
    "question": "Nhìn Boxplot trái của `kpi_ppg_riqr_2026-06-15.png`, giữa `Entire home/apt` và `Private room` có khác biệt gì khi đã chia cho sức chứa `accommodates` (tức tính bằng PPG)?",
    "quickAnswer": "Ngay cả sau khi chia cho số khách tối đa (`PPG`), phần lớn hộp phân phối của **`Entire home/apt`** (màu xanh) vẫn nằm cao hơn **`Private room`** (màu cam) ở hầu hết khu vực — cho thấy du khách sẵn sàng trả **phí riêng tư / nguyên căn** cao hơn trên đầu khách so với thuê phòng lẻ chung chủ nhà. Đồng thời khoảng râu và điểm ngoại lai trên trục log của `Entire home/apt` trải rộng hơn nhiều so với `Private room`.",
    "explanation": "Giải thích ý nghĩa kinh tế học lưu trú phía sau phân rã `hue=\"room_type\"` trong Hình 1.",
    "projectLink": "figures/kpi_ppg_riqr_2026-06-15.png; src/viz.py:L110",
    "codeLocation": "figures/kpi_ppg_riqr_2026-06-15.png; src/viz.py:L110",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_riqr_2026-06-15.png; src/viz.py:L110`.",
    "followUpQuestions": [
      "Liệu yếu tố `room_type` có thể tạo nên Nghịch lý Simpson nếu tỷ trọng loại phòng thay đổi giữa 2 nhóm quận không?"
    ],
    "followUpQA": [
      {
        "q": "Liệu yếu tố `room_type` có thể tạo nên Nghịch lý Simpson nếu tỷ trọng loại phòng thay đổi giữa 2 nhóm quận không?",
        "a": "Hoàn toàn có thể! Nếu Quận X có 90% căn nguyên căn và Quận Y có 80% phòng riêng, so sánh giá gộp dễ phản ánh cơ cấu loại phòng nhiều hơn chênh lệch giá cùng phân khúc — nên tách lớp `room_type` ở Hình 1 rất cần thiết."
      }
    ],
    "commonMistakes": [
      "Nghĩ rằng sau khi chia PPG thì `Entire home/apt` và `Private room` phải có đơn giá đầu người bằng hệt nhau."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_riqr_2026-06-15.png"
    ]
  },
  {
    "id": "vo-015",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Phân tích phân bố ngôn ngữ trong `1.000` review LLM và ý nghĩa đối với khách quốc tế tại CDMX.",
    "question": "Trong 1.000 review phân tích bằng LLM, hai ngôn ngữ chính là gì và tỷ lệ tương đối của chúng nói lên đặc điểm nào của tệp khách lưu trú tại các quận trung tâm như Cuauhtémoc?",
    "quickAnswer": "Chủ yếu là **tiếng Anh (`en`)** và **tiếng Tây Ban Nha (`es`)**, cộng với một tỷ lệ nhỏ tiếng Pháp/Đức/Bồ Đào Nha/Ý. Điều này cho thấy tệp du khách viết đánh giá tại các căn hộ mẫu vùng lõi mang tính **quốc tế hóa cao** (đặc biệt khách nói tiếng Anh từ Bắc Mỹ và khách nói tiếng Tây Ban Nha nội địa/Mỹ Latinh) — lý giải vì sao **Baseline Regex thuần từ khóa tiếng Anh** thất bại nặng hơn ở các câu bình luận tiếng Tây Ban Nha và tại sao SECTUR cần giải pháp LLM đa ngôn ngữ.",
    "explanation": "Kết nối cấu trúc ngôn ngữ dữ liệu đầu vào với quyết định chọn LLM + hàm ý du lịch quốc tế CDMX.",
    "projectLink": "data/processed/reviews_sentiment.csv; src/baseline.py",
    "codeLocation": "data/processed/reviews_sentiment.csv; src/baseline.py",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/reviews_sentiment.csv; src/baseline.py`.",
    "followUpQuestions": [
      "Trong bảng `evaluation_report.csv`, độ chính xác nhận diện ngôn ngữ (`ngon_ngu_accuracy`) của LLM trên 100 mẫu là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Trong bảng `evaluation_report.csv`, độ chính xác nhận diện ngôn ngữ (`ngon_ngu_accuracy`) của LLM trên 100 mẫu là bao nhiêu?",
        "a": "Đạt tuyệt đối **`1.000` (`100%`)** so với `0.990` của Baseline Regex."
      }
    ],
    "commonMistakes": [
      "Tưởng 100% khách du lịch ở Mexico chỉ viết bình luận bằng tiếng Tây Ban Nha."
    ],
    "relatedFiles": [
      "data/processed/reviews_sentiment.csv"
    ]
  },
  {
    "id": "vo-016",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Trình bày ý nghĩa của cột `price_t4` tăng +67.3% nhưng không có cột so sánh giá khách sạn truyền thống.",
    "question": "Nếu hội đồng hỏi: *\"Giá Airbnb tăng +67.3% vào World Cup, vậy có khẳng định Airbnb đắt hơn hay tăng mạnh hơn khách sạn tại CDMX không?\"* — trả lời thế nào cho chuẩn Bài 14?",
    "quickAnswer": "**KHÔNG THỂ KHẲNG ĐỊNH** vì bộ dữ liệu Inside Airbnb chỉ chứa dữ liệu **chỗ ở ngắn hạn trên nền tảng Airbnb**, hoàn toàn không thu thập bảng giá khách sạn truyền thống hay nền tảng khác (Booking/Vrbo) làm nhóm đối chứng! Báo cáo giữ chặt biên độ kết luận trong phạm vi mẫu Airbnb quan sát được.",
    "explanation": "Giữ chặt phạm vi ngoài phạm vi dữ liệu (Out-of-scope boundary).",
    "projectLink": "Bài 14; reports/report.pdf",
    "codeLocation": "Bài 14; reports/report.pdf",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 14; reports/report.pdf`.",
    "followUpQuestions": [
      "Tuy nhiên một thông số trong dữ liệu Airbnb giúp hiểu gián tiếp góc nhìn lưu trú gia đình là gì?"
    ],
    "followUpQA": [
      {
        "q": "Tuy nhiên một thông số trong dữ liệu Airbnb giúp hiểu gián tiếp góc nhìn lưu trú gia đình là gì?",
        "a": "Chỉ số **PPG (Price Per Guest)** khi nhóm đông người chia tiền phòng nhà nguyên căn."
      }
    ],
    "commonMistakes": [
      "Tự đoán thêm rằng \"chắc chắn Airbnb tăng gấp đôi giá khách sạn để cạnh tranh\" ngoài dữ liệu."
    ],
    "relatedFiles": [
      "Bài"
    ]
  },
  {
    "id": "vo-017",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải trình minh bạch về việc mất giá ở `t2` trong bản trình bày báo cáo.",
    "question": "Nếu lãnh đạo SECTUR hỏi tại sao thiếu mất dữ liệu giá mùa Giáng sinh (`2025-12-29`, `t2`) đúng lúc cao điểm du lịch, cần giải thích nguyên nhân gốc và cách nhóm xử lý minh bạch ra sao?",
    "quickAnswer": "Đây là lỗi khuyết thiếu cấu trúc từ chính bản trích xuất nguồn mở Inside Airbnb ngày `2025-12-29` (1.000/1.000 dòng trống cột `price`), hoàn toàn không phải lỗi code lọc của nhóm. Thay vì xóa toàn bộ mốc `t2` hoặc tự ý điền số giả, nhóm **công khai lỗ hổng trên `qa_report.csv` (`1.000` vi phạm), giữ giá trị `NA` ở các bảng/biểu đồ giá**, đồng thời vẫn tận dụng sạch `100%` dữ liệu lịch và đánh giá của `t2` (`occ_n = 997`, `RV Q1–Q2`, `Ghost = 0.3%`)!",
    "explanation": "Biến một lỗ hổng dữ liệu nguồn thành điểm cộng về năng lực Kỹ thuật QA và Trung thực dữ liệu.",
    "projectLink": "reports/qa_report.csv; figures/kpi_ppg_snapshots.png",
    "codeLocation": "reports/qa_report.csv; figures/kpi_ppg_snapshots.png",
    "proofExample": "Đối chiếu trực tiếp tại `reports/qa_report.csv; figures/kpi_ppg_snapshots.png`.",
    "followUpQuestions": [
      "Ngoài giá (`t2`), các biến QA khác của mốc `t2` đạt tỷ lệ hợp lệ là bao nhiêu?"
    ],
    "followUpQA": [
      {
        "q": "Ngoài giá (`t2`), các biến QA khác của mốc `t2` đạt tỷ lệ hợp lệ là bao nhiêu?",
        "a": "`Accommodates`, `Availability`, `Number of Reviews`, `Last Review` tại `t2` đều đạt **`100.0%`** hợp lệ!"
      }
    ],
    "commonMistakes": [
      "Đổ lỗi nhầm sang file Google Sheets phân công hoặc né tránh không giải thích cột `t2`."
    ],
    "relatedFiles": [
      "reports/qa_report.csv"
    ]
  },
  {
    "id": "vo-018",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Vì sao bản đồ Choropleth `kpi_ppg_neighbourhood.png` phải chọn cùng thang màu cho Mean & Median nhưng tách thang Price vs PPG?",
    "question": "Khi nhìn vào Hình 3 (`kpi_ppg_neighbourhood.png`), giải thích ngắn gọn cho người xem biết tại sao hai bản đồ ở hàng trên dùng chung một thanh màu còn hai bản đồ hàng dưới dùng thanh màu riêng thứ hai.",
    "quickAnswer": "Hàng trên cùng đơn vị **`MXN/đêm` (cả căn)** nên dùng chung thang màu để **lộ rõ Mean bị kéo đậm bất thường so với Median** do ngoại lai (`3.529` vs `2.215 MXN`). Hàng dưới đổi sang đơn vị **`MXN/khách/đêm` (`PPG`, ~300–700 MXN)** nhỏ hơn gấp 3–4 lần; nếu giữ chung thanh màu với hàng trên thì cả hàng dưới sẽ nhạt màu không phân biệt được quận nào với quận nào -> buộc phải tách thang thứ hai dùng chung cho cặp `PPG Mean` vs `PPG Median`!",
    "explanation": "Lý giải trực quan tính khoa học của bộ thang màu trên Hình 3.",
    "projectLink": "src/viz.py:L218-L235; figures/kpi_ppg_neighbourhood.png",
    "codeLocation": "src/viz.py:L218-L235; figures/kpi_ppg_neighbourhood.png",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py:L218-L235; figures/kpi_ppg_neighbourhood.png`.",
    "followUpQuestions": [
      "Nếu hai bản đồ trên Hình 3 không dùng chung `norm_price` mà tự scale riêng từng bản đồ thì điều gì mất đi?"
    ],
    "followUpQA": [
      {
        "q": "Nếu hai bản đồ trên Hình 3 không dùng chung `norm_price` mà tự scale riêng từng bản đồ thì điều gì mất đi?",
        "a": "Sẽ không nhìn ra bằng mắt được khoảng lệch đỏ đậm giả của Mean so với Median trên cùng một quận!"
      }
    ],
    "commonMistakes": [
      "Tưởng cả 4 bản đồ trên Hình 3 đều dùng chung duy nhất 1 dải màu từ 0 đến 4.000 MXN."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vo-019",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Sự khác biệt giữa tỷ lệ phân bố listing (`52.5%` ở Cuauhtémoc) và phân bố review LLM (`74.9%` ở Cuauhtémoc).",
    "question": "Vì sao Cuauhtémoc chiếm `52.5%` số căn hộ trong mẫu 1.000 căn nhưng lại chiếm tới **`74.9%` (`749/1.000`)** số review phân tích LLM? Điều này tác động ra sao tới kết luận phần phàn nàn dịch vụ?",
    "quickAnswer": "Do hai tầng chọn mẫu nối tiếp nhau: tầng 1 phân công 1.000 căn đã tập trung vùng lõi (`52.5%` ở Cuauhtémoc), tầng 2 các căn ở vùng lõi có **tốc độ review cao gấp rưỡi đến gấp đôi** ngoại ô (`RV Q3 = 3.25` ở A04) -> nên 1.000 review LLM đổ dồn tới `74.9%` về riêng Cuauhtémoc (`15%` về Miguel Hidalgo -> 2 quận chiếm `89.9%` tổng review LLM!). Vì vậy kết luận về phàn nàn **Tiện nghi (14.8%) và Tiếng ồn (8.1%) phản ánh rất tin cậy tình hình vùng lõi trung tâm**, nhưng **KHÔNG áp dụng được** cho các quận ngoại ô!",
    "explanation": "Phân tích sâu hai tầng thiên lệch mẫu (Listing selection + Review activity concentration).",
    "projectLink": "data/processed/kpi_by_neighbourhood.csv; figures/llm_insights.png",
    "codeLocation": "data/processed/kpi_by_neighbourhood.csv; figures/llm_insights.png",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_neighbourhood.csv; figures/llm_insights.png`.",
    "followUpQuestions": [
      "3 quận trong 15 quận có listing nhưng có `0` review LLM trong `kpi_by_neighbourhood.csv` là những quận nào?"
    ],
    "followUpQA": [
      {
        "q": "3 quận trong 15 quận có listing nhưng có `0` review LLM trong `kpi_by_neighbourhood.csv` là những quận nào?",
        "a": "**Iztapalapa** (`n=4` căn), **Milpa Alta** (`n=1` căn), và **Xochimilco** (`n=5` căn) — toàn các quận ngoại vi cỡ mẫu siêu nhỏ."
      }
    ],
    "commonMistakes": [
      "Cộng `749 + 150 = 899` rồi quên rằng còn tận 3 quận khác trong 15 quận không có lấy 1 review LLM nào (`0` review)."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_neighbourhood.csv"
    ]
  },
  {
    "id": "vo-020",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích tại sao ở Hình 2 (`kpi_ppg_snapshots.png`), khu `A03` tăng `+70.1%` lại không phải là khu đắt nhất thành phố.",
    "question": "Trong Hình 2, hai khu có tốc độ tăng PPG nhanh nhất (`A03: +70.1%` và `Coyoacán` trong `A06/A07`) nhưng khi nhìn độ dài thanh ở khung `t4`, khu nào mới giữ ngôi đầu bảng giá PPG?",
    "quickAnswer": "Thanh dài nhất ở `t4` là **`A05` (`819 MXN/khách`, tăng từ `~569` = `+44%` hay `+56%` trên t1)** và **`A01` (`712 MXN/khách`)**, còn **`A03`** dù tăng `%` mạnh nhất (`+70.1%`) vẫn chỉ lên mức trung bình **`600 MXN/khách`** do điểm xuất phát nền `t1` rất thấp (`353 MXN`)!",
    "explanation": "Luôn đặt `% tăng trưởng` cạnh `mức giá tuyệt đối cuối kỳ` khi trình bày biểu đồ cột.",
    "projectLink": "figures/kpi_ppg_snapshots.png; data/processed/kpi_by_area.csv",
    "codeLocation": "figures/kpi_ppg_snapshots.png; data/processed/kpi_by_area.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_snapshots.png; data/processed/kpi_by_area.csv`.",
    "followUpQuestions": [
      "Trong tất cả 8 khu vực tại `t4`, khu vực duy nhất vượt mốc `800 MXN/khách` Median PPG là khu nào?"
    ],
    "followUpQA": [
      {
        "q": "Trong tất cả 8 khu vực tại `t4`, khu vực duy nhất vượt mốc `800 MXN/khách` Median PPG là khu nào?",
        "a": "Duy nhất khu **`A05`** (**`819 MXN/khách`**)."
      }
    ],
    "commonMistakes": [
      "Nhầm \"tăng % mạnh nhất = đắt nhất ở t4\"."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_snapshots.png"
    ]
  },
  {
    "id": "vo-021",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Phân tích mối liên hệ giữa việc tăng giá quá mức ở `A03` và phản ứng lịch trống `Occ_1-30` thấp nhất (`34.58%`).",
    "question": "Khi đặt `kpi_ppg_snapshots.png` bên cạnh `kpi_occupancy_gap.png`, cặp số liệu nào ở khu vực **`A03`** trở thành bài học cảnh báo thực tế nhất cho chủ nhà vùng ven?",
    "quickAnswer": "`A03` là khu vực đẩy giá PPG từ `t1` tới `t4` tăng mạnh nhất toàn thành phố (**`+70.1%`**, từ `353` lên `600 MXN`), và đồng thời cũng là khu có tỷ lệ lấp đầy lịch 30 ngày tới thấp nhất mẫu tại `t4` (**`34.58%`**, thấp hơn `10` điểm % so với mức trung bình `44.53%` và `~49%` của vùng lõi)! Dù dữ liệu quan sát không kết luận 100% nhân quả đơn tuyến, sự chênh lệch này là tín hiệu mạnh cho chủ nhà ngoài trung tâm: **tự đẩy giá tăng đột biến trước sự kiện dễ đi kèm tỷ lệ bỏ trống lịch cao**.",
    "explanation": "Liên kết chéo 2 biểu đồ Giá + Công suất thành khuyến nghị thực tế.",
    "projectLink": "data/processed/kpi_by_area.csv; figures/kpi_occupancy_gap.png",
    "codeLocation": "data/processed/kpi_by_area.csv; figures/kpi_occupancy_gap.png",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_area.csv; figures/kpi_occupancy_gap.png`.",
    "followUpQuestions": [
      "So với các khu vực trung tâm như `A04` và `A01`, sự bất lợi địa lý của `A03` (Álvaro Obregón, Cuajimalpa, Magdalena Contreras) góp phần thế nào?"
    ],
    "followUpQA": [
      {
        "q": "So với các khu vực trung tâm như `A04` và `A01`, sự bất lợi địa lý của `A03` (Álvaro Obregón, Cuajimalpa, Magdalena Contreras) góp phần thế nào?",
        "a": "Các quận phía Tây/Tây Nam vùng đồi núi của `A03` xa các ga metro du lịch lõi và xa trục lễ hội trung tâm hơn nên khó giữ được cầu cao khi nâng giá sát vùng lõi."
      }
    ],
    "commonMistakes": [
      "Viết quá tay thành \"tăng giá 70.1% chắc chắn khiến 65.42% khách hàng bỏ trốn khỏi khu A03\"."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_area.csv"
    ]
  },
  {
    "id": "vo-022",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Làm rõ khái niệm \"Hiệu lực dữ liệu (Validity Scope)\" khi bảo vệ số liệu 1.000 căn trước giảng viên.",
    "question": "Khi khép lại phần vấn đáp Storytelling, câu chốt chuẩn mực nhất để tóm gọn \"bài học dữ liệu lớn nhất\" mà sinh viên rút ra từ BTL Inside Airbnb Mexico City là gì?",
    "quickAnswer": "Một phân tích dữ liệu tốt không nằm ở việc chạy được mô hình đắt tiền nhất hay chọn con số tăng trưởng giật gân nhất (`+96.3%` Mean), mà ở kỷ luật bảo vệ **4 nguyên tắc**: (1) **Đo đúng thực thể & phân phối** (`PPG + Median/rIQR` thay cho Mean bị ngoại lai phá); (2) **Minh bạch lỗi nguồn** (`t2` khuyết giá giữ `NA`, log 32 dòng QA kể cả số `0`); (3) **Kiểm chứng AI có đối chứng** (`LLM` vượt `+0.469 Macro F1` so với Baseline Regex + Hậu kiểm trên lớp `mixed`); và (4) **Giữ đúng giới hạn nhận định** (mẫu 1.000 căn, giá chào, lịch proxy, không gán nhân quả).",
    "explanation": "Tổng hợp xuất sắc 4 trụ cột năng lực môn học LTXLDL UET.DSE2049.",
    "projectLink": "reports/report.pdf; Bài 14",
    "codeLocation": "reports/report.pdf; Bài 14",
    "proofExample": "Đối chiếu trực tiếp tại `reports/report.pdf; Bài 14`.",
    "followUpQuestions": [
      "Trong 4 nguyên tắc trên, nguyên tắc nào quyết định nhất để tránh rơi vào bẫy thẩm định AI ở Bài 14?"
    ],
    "followUpQA": [
      {
        "q": "Trong 4 nguyên tắc trên, nguyên tắc nào quyết định nhất để tránh rơi vào bẫy thẩm định AI ở Bài 14?",
        "a": "Nguyên tắc #4 (**Giữ đúng giới hạn nhận định** — kiểm chứng lại từng con số và từng động từ nhân quả do AI viết bằng code và câu hỏi phản biện!)."
      }
    ],
    "commonMistakes": [
      "Tổng kết sáo rỗng kiểu \"em học được cách dùng pandas, matplotlib và gọi Gemini API rất hay\"."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vo-023",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích độ lệch giữa Mean PPG và Median PPG ở toàn mẫu `t4`.",
    "question": "Tại mốc `t4`, `Mean PPG` toàn mẫu là bao nhiêu so với `Median PPG` (`626.79 MXN`), và độ vênh đó cho thấy hình dạng phân phối giá CDMX nghiêng về phía nào?",
    "quickAnswer": "`Mean PPG` tại `t4` cao hơn đáng kể so với **`Median PPG = 626.79 MXN`** (Mean bị đuôi phải từ các biệt thự và căn treo giá đầu cơ kéo lên, tạo độ lệch phải dương rõ rệt — right-skewed). Chính độ vênh này chứng minh việc chọn `Median` và `rIQR` là bắt buộc.",
    "explanation": "Liên hệ độ lệch `Mean > Median` với phân phối lệch phải chuẩn thống kê.",
    "projectLink": "data/processed/kpi_by_snapshot.csv",
    "codeLocation": "data/processed/kpi_by_snapshot.csv",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_snapshot.csv`.",
    "followUpQuestions": [
      "Trên biểu đồ nào ta nhìn thấy trực tiếp cả đuôi phải ngoại lai của `PPG` lẫn sự tách lớp theo `room_type`?"
    ],
    "followUpQA": [
      {
        "q": "Trên biểu đồ nào ta nhìn thấy trực tiếp cả đuôi phải ngoại lai của `PPG` lẫn sự tách lớp theo `room_type`?",
        "a": "Hình 1: `figures/kpi_ppg_riqr_2026-06-15.png` (biểu đồ Boxplot thang log bên trái)."
      }
    ],
    "commonMistakes": [
      "Tưởng Mean PPG và Median PPG bằng nhau khi đã chia cho sức chứa `accommodates`."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_snapshot.csv"
    ]
  },
  {
    "id": "vo-024",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Mục đích gắn nhãn `QA` và mẫu số `(n=...)` trong tiêu đề/chú thích các biểu đồ Storytelling.",
    "question": "Tại sao trên tất cả các biểu đồ của Nhóm 4 đều ghi rõ nguồn dữ liệu, ngày snapshot và cỡ mẫu `n` (ví dụ `n = 980 / 1.000`, `t2: n = 0`)?",
    "quickAnswer": "Đây là yêu cầu #3 và #5 của \"5 điểm kiểm tra một hình\" (Bài 12–13): bất kỳ con số tóm tắt nào tách rời khỏi cỡ mẫu `n` và ngày chụp đều có thể đánh lừa người ra quyết định (như so quận `n=514` với quận `n=1` mà không biết độ tin cậy).",
    "explanation": "Rèn luyện kỷ luật ghi chú ngữ cảnh trực tiếp trên sản phẩm trực quan.",
    "projectLink": "src/viz.py; Bài 12 & Bài 13",
    "codeLocation": "src/viz.py; Bài 12 & Bài 13",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py; Bài 12 & Bài 13`.",
    "followUpQuestions": [
      "Trong `src/viz.py`, hàm helper nhỏ nào chuẩn hóa việc gắn chú thích cỡ mẫu/định dạng đồng nhất trên nhiều hình?"
    ],
    "followUpQA": [
      {
        "q": "Trong `src/viz.py`, hàm helper nhỏ nào chuẩn hóa việc gắn chú thích cỡ mẫu/định dạng đồng nhất trên nhiều hình?",
        "a": "Hàm `_sample_tag()` (và các tham số caption `fig.text(...)` ở cuối mỗi hàm `plot_*`)."
      }
    ],
    "commonMistakes": [
      "Chỉ viết cỡ mẫu `n` rải rác trong lời thuyết trình miệng mà để trống trên hình ảnh báo cáo."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vo-025",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Ý nghĩa của tỷ lệ `0.9138 Macro F1` (7 khía cạnh) so với `0.9909 Macro F1` (cảm xúc tổng) của LLM.",
    "question": "Trên `evaluation_report.csv`, tại sao cùng một mô hình LLM lại đạt `0.9909` Macro F1 ở cảm xúc tổng thể (`overall_sentiment`) nhưng đạt `0.9138` Macro F1 ở phân loại 7 khía cạnh (`nhan_khia_canh`)?",
    "quickAnswer": "Vì phân loại `overall_sentiment` chỉ có 3 lớp trên toàn đoạn review (rất dễ nhận biết sắc thái chung), trong khi bài toán **7 khía cạnh × 4 lớp (`positive, mixed, negative, not_mentioned`)** đòi hỏi độ chi tiết gấp nhiều lần: ranh giới mỏng giữa việc 1 câu khen ngắn *\"Tuyệt vời!\"* có được suy ngầm vào `cleanliness`/`value` hay để `not_mentioned`, cũng như xác định đúng từng khía cạnh thiểu số `mixed`/`negative` ở cỡ mẫu test 100 câu (`700` ô)! Mức `0.9138` vẫn vượt `Baseline Regex (0.4648)` gần gấp đôi (**`+0.449`**).",
    "explanation": "Đọc hiểu tinh tế khoảng cách 0.991 vs 0.914 thay vì chỉ nói \"LLM gần như hoàn hảo 99% ở mọi chỉ số\".",
    "projectLink": "reports/evaluation_report.csv; figures/llm_vs_baseline.png",
    "codeLocation": "reports/evaluation_report.csv; figures/llm_vs_baseline.png",
    "proofExample": "Đối chiếu trực tiếp tại `reports/evaluation_report.csv; figures/llm_vs_baseline.png`.",
    "followUpQuestions": [
      "Trong 4 thước đo chính của Baseline Regex (`Accuracy=0.85, MacroF1=0.522, AspectAcc=0.82, AspectMacroF1=0.465`), con số nào thể hiện đúng nhất độ khó của bài toán ABSA 7 khía cạnh?"
    ],
    "followUpQA": [
      {
        "q": "Trong 4 thước đo chính của Baseline Regex (`Accuracy=0.85, MacroF1=0.522, AspectAcc=0.82, AspectMacroF1=0.465`), con số nào thể hiện đúng nhất độ khó của bài toán ABSA 7 khía cạnh?",
        "a": "`nhan_khia_canh_macro_f1 = 0.4648` và `phat_hien_khia_canh_f1 = 0.5830`!"
      }
    ],
    "commonMistakes": [
      "Nói nhầm rằng `LLM` đạt `0.991` trên cả bài toán gán nhãn 7 khía cạnh!"
    ],
    "relatedFiles": [
      "reports/evaluation_report.csv"
    ]
  },
  {
    "id": "vo-026",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Cách bảo vệ lựa chọn phân 8 khu vực địa lý (`A01..A08`) từ Google Sheets trong thiết kế phân tích không gian.",
    "question": "Tại sao ngoài 15 quận hành chính (`neighbourhood_cleansed`), đồ án lại chia thành 8 cụm khu vực `A01..A08` — lợi ích thống kê của 8 cụm này là gì khi kể chuyện?",
    "quickAnswer": "Các quận nhỏ ở CDMX có rất ít căn hộ trong mẫu (`Milpa Alta n=1`, `Magdalena Contreras n=3`, `Iztapalapa n=4`, `Xochimilco n=5`), không thể vẽ Boxplot hay tính `rIQR`/`Occ` ổn định ở cấp từng quận lẻ! Nhờ gộp theo địa bàn lân cận thành 8 khu `A01..A08` (khu nhỏ nhất `A06` cũng đạt `n = 36` căn!), tất cả **8 khu vực đều đủ độ tin cậy thống kê** để so sánh xu hướng giá `+56%..+70%`, Boxplot theo `room_type`, `Occ` và `Review Velocity` qua 4 quý!",
    "explanation": "Lý giải lý do tồn tại song song của 2 cấp không gian `Area (8)` và `Neighbourhood (15)`.",
    "projectLink": "configs/mexico-city.yaml; data/processed/kpi_by_area.csv",
    "codeLocation": "configs/mexico-city.yaml; data/processed/kpi_by_area.csv",
    "proofExample": "Đối chiếu trực tiếp tại `configs/mexico-city.yaml; data/processed/kpi_by_area.csv`.",
    "followUpQuestions": [
      "Trong 8 khu vực `A01..A08`, khu vực nào tập trung số lượng listing áp đảo nhất (>55% mẫu)?"
    ],
    "followUpQA": [
      {
        "q": "Trong 8 khu vực `A01..A08`, khu vực nào tập trung số lượng listing áp đảo nhất (>55% mẫu)?",
        "a": "Khu **`A04`** (`559 / 1.000` listing = `55.9%`, gồm Cuauhtémoc 525 + Venustiano Carranza 34)."
      }
    ],
    "commonMistakes": [
      "Cho rằng `A01..A08` chỉ là mã phân công nội bộ không có ý nghĩa phân tích địa lý."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vo-027",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Data Cleaning"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Cách diễn giải vai trò của QA Flagging như một phần của \"Câu chuyện Độ tin cậy Dữ liệu\".",
    "question": "Khi thuyết trình cho SECTUR, có cần dành 20–30 giây nói về `src/qa.py` và 32 dòng `qa_report.csv` không — và nói như thế nào cho người làm chính sách hiểu?",
    "quickAnswer": "**RẤT CẦN**, nhưng nói theo ngôn ngữ **Bảo chứng chất lượng quyết định** chứ không đọc tên biến code: *\"Trước khi tính giá hay công suất, hệ thống đã kiểm định tự động 8 quy tắc chất lượng xuyên suốt 4.000 bản ghi: xác nhận không có trùng lặp, 100% dữ liệu sức chứa/lịch phòng/đánh giá sạch, cô lập trung thực 100% khuyết giá kỳ tháng 12 (`t2`) thay vì điền số giả, và giữ lại ngoại lai đầu cơ để so sánh Mean vs Median.\"* — 20 giây này nâng tầm tin cậy toàn bộ phần kết luận phía sau!",
    "explanation": "Dịch kỹ thuật QA thành giá trị tin cậy cho Stakeholder (Bài 10 + Bài 14).",
    "projectLink": "reports/qa_report.csv; reports/report.pdf",
    "codeLocation": "reports/qa_report.csv; reports/report.pdf",
    "proofExample": "Đối chiếu trực tiếp tại `reports/qa_report.csv; reports/report.pdf`.",
    "followUpQuestions": [
      "Trong 32 dòng của `qa_report.csv`, quy tắc nào giải thích trực tiếp tại sao không nên tin vào `Price Mean` trên bản đồ Choropleth?"
    ],
    "followUpQA": [
      {
        "q": "Trong 32 dòng của `qa_report.csv`, quy tắc nào giải thích trực tiếp tại sao không nên tin vào `Price Mean` trên bản đồ Choropleth?",
        "a": "Quy tắc **`RULE_PRICE_OUTLIER`** (`P01–P99`): phát hiện 19–20 ngoại lai mỗi kỳ hợp lệ (như 2 căn >153k MXN ở Cuauhtémoc tại `t4`) làm kéo lệch Mean!"
      }
    ],
    "commonMistakes": [
      "Bỏ qua hoàn toàn QA hoặc đọc thuộc lòng tên cột `qa_invalid_accommodates`, `Int64` trước giám đốc du lịch."
    ],
    "relatedFiles": [
      "reports/qa_report.csv"
    ]
  },
  {
    "id": "vo-028",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Kiểm chứng tác động của `Private room` vs `Entire home/apt` ở cấp độ thị trường CDMX.",
    "question": "Nếu một khu vực có tỷ lệ `Entire home/apt` cao hơn hẳn các khu khác (ví dụ vùng lõi Polanco/Condesa/Roma ở A01/A04), ảnh hưởng thế nào khi so sánh `Price` giữa các quận?",
    "quickAnswer": "Căn nguyên căn (`Entire home/apt`) vừa có sức chứa lớn hơn vừa có đơn giá riêng tư cao hơn hẳn `Private room`. Nếu không chuẩn hóa bằng **`PPG`** và tách nhóm **`room_type`** như Hình 1, ta rất dễ nhầm một quận nhiều biệt thự nguyên căn lớn (như Xochimilco) là có mức giá đắt đỏ hơn một quận toàn phòng studio cao cấp (như Cuauhtémoc/Benito Juárez).",
    "explanation": "Nhắc lại vai trò chống nhiễu cơ cấu `room_type` (Simpson/Compositional Effect) của `PPG` và Hình 1.",
    "projectLink": "figures/kpi_ppg_riqr_2026-06-15.png",
    "codeLocation": "figures/kpi_ppg_riqr_2026-06-15.png",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_riqr_2026-06-15.png`.",
    "followUpQuestions": [
      "Tại các quận nội đô lịch sử như Cuauhtémoc và Miguel Hidalgo, `PPG` của `Entire home/apt` thường nằm ở khoảng nào trên Boxplot Hình 1?"
    ],
    "followUpQA": [
      {
        "q": "Tại các quận nội đô lịch sử như Cuauhtémoc và Miguel Hidalgo, `PPG` của `Entire home/apt` thường nằm ở khoảng nào trên Boxplot Hình 1?",
        "a": "Trung vị quanh khoảng `650–850 MXN/khách/đêm`, cao hơn phân khúc `Private room` tương ứng trong cùng khu vực."
      }
    ],
    "commonMistakes": [
      "Quên kiểm tra cơ cấu loại phòng khi so giá thuê giữa hai quận khác hẳn đặc trưng đô thị."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_riqr_2026-06-15.png"
    ]
  },
  {
    "id": "vo-029",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Trình bày phát hiện về 15 quận CDMX: Phân biệt Top 3 Đắt nhất (PPG), Top 3 Tăng % nhanh nhất, và Top ngoại lai.",
    "question": "Tổng hợp nhanh 3 \"Bảng xếp hạng thực chất\" ở cấp quận CDMX (`kpi_by_neighbourhood.csv` tại `t4`) để tránh nhầm lẫn khi trả lời vấn đáp:",
    "quickAnswer": "- **Top Đắt nhất thực sự (`Median PPG t4`):** #1 Miguel Hidalgo (`706,12 MXN`), #2 Cuauhtémoc (`678,00 MXN`), tiếp theo Iztacalco (`642,00 MXN`, `n=17`) và Coyoacán (`601,16 MXN`);\n- **Quận quy mô lớn (`n >= 50`) tăng `% PPG` mạnh nhất (`t1->t4`):** Coyoacán (**`+70.8%`**, `n=51` hợp lệ t4, lên `601,16 MXN`);\n- **Quận có độ phân tán PPG cao nhất (nhóm `n >= 20`):** Tlalpan (`rIQR PPG = 1.0995`, gần sân Estadio Azteca); còn quận `rIQR Price` ảo cao nhất do nhà vườn lớn là Xochimilco (`rIQR Price = 2.2642 -> rIQR PPG = 0.4208`, `n=5`).",
    "explanation": "Bộ số liệu đối chiếu chuẩn giúp sinh viên phản xạ trong 5 giây trước mọi câu hỏi về thứ hạng 15 quận CDMX.",
    "projectLink": "data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Và 2 quận có số lượng listing trong mẫu lớn nhất theo thứ tự là quận nào?"
    ],
    "followUpQA": [
      {
        "q": "Và 2 quận có số lượng listing trong mẫu lớn nhất theo thứ tự là quận nào?",
        "a": "#1 **Cuauhtémoc (`525` căn)** và #2 **Benito Juárez** / **Miguel Hidalgo** (chiếm phần áp đảo vùng lõi)."
      }
    ],
    "commonMistakes": [
      "Trộn lẫn Xochimilco vào Top 3 đắt nhất theo đầu người hoặc nhầm Cuauhtémoc là số #1 về `Median PPG`."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_neighbourhood.csv"
    ]
  },
  {
    "id": "vo-030",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích tại sao số liệu phàn nàn về `amenities` (14.8%) và `noise` (8.1%) ở Cuauhtémoc lại có ý nghĩa hơn tỷ lệ lớn ở `Azcapotzalco`.",
    "question": "Khi trình bày bảng phàn nàn LLM theo quận, tại sao ta ưu tiên dẫn số liệu của **Cuauhtémoc (`n=749`: `14.8% amenities`, `8.1% noise`)** và **Miguel Hidalgo (`n=150`: `10.0% amenities`, `5.3% noise`)** thay vì các quận có `%` cao hơn nhưng `n = 1..4`?",
    "quickAnswer": "Với `n = 749` và `n = 150`, sai số chuẩn ước lượng tỷ lệ khá nhỏ (khoảng tin cậy 95% tại Cuauhtémoc quanh `14.8% ± 2.5%`), phản ánh bức tranh có độ ổn định thống kê rõ rệt cho vùng lõi. Ngược lại với quận chỉ có `n = 2`, chỉ 1 review có góp ý đã cho `50%` (khoảng tin cậy rộng từ `1%` đến `99%`), hoàn toàn vô nghĩa để suy rộng!",
    "explanation": "Vận dụng khoảng tin cậy tỷ lệ ($\\pm 1.96 \\sqrt{p(1-p)/n}$) vào chọn số liệu phát ngôn.",
    "projectLink": "figures/llm_insights.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/llm_insights.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/llm_insights.png; data/processed/kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Hai quận `Cuauhtémoc` và `Miguel Hidalgo` cộng lại chiếm bao nhiêu % tổng số 1.000 review đã chấm bằng LLM?"
    ],
    "followUpQA": [
      {
        "q": "Hai quận `Cuauhtémoc` và `Miguel Hidalgo` cộng lại chiếm bao nhiêu % tổng số 1.000 review đã chấm bằng LLM?",
        "a": "`(749 + 150) / 1.000 = 899 / 1.000` = **`89.9%`** toàn bộ mẫu review LLM!"
      }
    ],
    "commonMistakes": [
      "Chọn quận có `n=2` nhưng `%` to nhất để đưa lên slide nhấn mạnh khủng hoảng dịch vụ."
    ],
    "relatedFiles": [
      "figures/llm_insights.png"
    ]
  },
  {
    "id": "vo-031",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Architecture"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Tóm tắt vai trò xuyên suốt của `configs/mexico-city.yaml` trong việc giữ câu chuyện đồng nhất trên 1 thành phố.",
    "question": "Tại sao nói chỉ 1 tệp `configs/mexico-city.yaml` chính là \"nguồn chân lý cấu hình\" gắn kết cả 8 module code thành câu chuyện thống nhất về Mexico City?",
    "quickAnswer": "Vì toàn bộ tham số định danh câu chuyện đều nằm tập trung tại YAML: 4 mốc thời gian hướng tới World Cup (`2025-09-27`..`2026-06-15`), link Google Sheet phân công cố định của Nhóm 4, đơn vị tiền tệ (`MXN`), ngưỡng QA (`[P01, P99]`, `dedupe_keys`), cờ `exclude_ghost: true`, model AI (`gemini-3.5-flash-lite`), `batch_size: 5`, và danh sách **7 khía cạnh dịch vụ**. Không có con số \"ma thuật\" nào viết rải rác mâu thuẫn giữa các tệp!",
    "explanation": "Kết nối kiến trúc cấu hình YAML với tính nhất quán của báo cáo kể chuyện cuối cùng.",
    "projectLink": "configs/mexico-city.yaml; run_pipeline.py",
    "codeLocation": "configs/mexico-city.yaml; run_pipeline.py",
    "proofExample": "Đối chiếu trực tiếp tại `configs/mexico-city.yaml; run_pipeline.py`.",
    "followUpQuestions": [
      "Nếu đổi `currency` trong YAML từ `MXN` sang `USD`, 3 bước nào phía sau tự động đổi tên cột `price_*` theo đúng cấu hình?"
    ],
    "followUpQA": [
      {
        "q": "Nếu đổi `currency` trong YAML từ `MXN` sang `USD`, 3 bước nào phía sau tự động đổi tên cột `price_*` theo đúng cấu hình?",
        "a": "Cả `src/qa.py`, `src/kpi.py` và `src/viz.py` đều đọc động hàm `_price_col(config)` / `currency.lower()` để đồng bộ `price_usd`!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `configs/mexico-city.yaml` chỉ dùng cho bước `download` và `llm`."
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vo-032",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Trả lời câu hỏi phản biện nhanh 30 giây: \"Dự án này có phát hiện gì MỚI mà nếu không làm sạch/phân tách kỹ thì 100% bị lừa?\"",
    "question": "Nếu giảng viên chỉ hỏi đúng 1 câu tổng kết trong 30 giây cuối buổi vấn đáp: *\"Hãy kể ra 3 cú lừa thị giác hoặc dữ liệu lớn nhất mà pipeline của nhóm đã lật tẩy trong bộ Inside Airbnb CDMX này!\"*",
    "quickAnswer": "1) **Cú lừa Mean Price:** Xochimilco (`3.848 MXN`) và Cuauhtémoc (`3.529 MXN`) bị nhà vườn lớn & 2 căn `153.540 MXN` bóp méo -> chuẩn hóa **Median PPG** lộ ra vùng lõi thật là Miguel Hidalgo (`706`) & Cuauhtémoc (`678`);\n2) **Cú lừa đỉnh World Cup `t4`:** Đỉnh `Occ_1-30` (`48.5%`) & `Urgency Gap` (`+21.4 pp`) thực chất nằm ở **Semana Santa `t3`**, không phải `t4` (`44.5%`);\n3) **Cú lừa bình luận tích cực:** Nhìn điểm tổng `77.9%` hoặc thuần `negative (1.9%)` tưởng phòng rất ổn, tách lớp **`mixed`** bóc trần **`14.8%` phàn nàn Tiện nghi & `8.1%` Tiếng ồn** tại Cuauhtémoc!",
    "explanation": "Câu trả lời \"3 Cú lừa bị Lật tẩy\" súc tích, bén nhọn nhất cho 30 giây chốt hạ vấn đáp.",
    "projectLink": "reports/report.pdf; figures/",
    "codeLocation": "reports/report.pdf; figures/",
    "proofExample": "Đối chiếu trực tiếp tại `reports/report.pdf; figures/`.",
    "followUpQuestions": [
      "Và 1 điểm cộng thứ 4 về nguồn dữ liệu mà nhóm giữ sạch không bị sập pipeline là gì?"
    ],
    "followUpQA": [
      {
        "q": "Và 1 điểm cộng thứ 4 về nguồn dữ liệu mà nhóm giữ sạch không bị sập pipeline là gì?",
        "a": "Cú mất **100% giá tại mốc `t2` (2025-12-29)** được gắn cờ cô lập sạch sẽ để `Occ (997)` và `Review Velocity (1000)` vẫn sống sót chính xác!"
      }
    ],
    "commonMistakes": [
      "Trả lời lan man kể lại quy trình code thay vì đưa ra 3 phát hiện dữ liệu ngược trực giác ấn tượng nhất."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vo-033",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích chênh lệch giữa `Review Velocity Q1 (2.55)` vs `Q2 (2.14)` vs `Q3 (2.08)` ở cấp độ khu vực `A01..A08`.",
    "question": "Trong bảng `kpi_by_area.csv` và Hình 5 (`kpi_review_ghost.png`), vì sao đường biểu diễn của khu **`A04`** luôn tách biệt hẳn lên phía trên (`3.97 -> 3.01 -> 3.25`) so với 7 khu còn lại?",
    "quickAnswer": "Khu `A04` chứa trung tâm du lịch sầm uất nhất Mexico City (**Cuauhtémoc** — Roma Norte, Condesa, Juárez, Centro Histórico), nơi có mật độ lưu trú ngắn hạn cao (nhiều khách du lịch ở vài ngày rồi trả phòng viết review liên tục) nên **tần suất quay vòng bình luận (`3.0–4.0 reviews/30 ngày`) gấp 2–3 lần** các khu dân cư ngoại vi.",
    "explanation": "Liên kết đặc thù đô thị học du lịch CDMX với số liệu `RV` của `A04`.",
    "projectLink": "figures/kpi_review_ghost.png; data/processed/kpi_by_area.csv",
    "codeLocation": "figures/kpi_review_ghost.png; data/processed/kpi_by_area.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_review_ghost.png; data/processed/kpi_by_area.csv`.",
    "followUpQuestions": [
      "Nhận xét vừa rồi rất hay: khi thấy `A04` đạt `RV = 3.25` tại Q3, đó là tổng review của 559 căn hay trung bình trên mỗi căn mỗi 30 ngày?"
    ],
    "followUpQA": [
      {
        "q": "Nhận xét vừa rồi rất hay: khi thấy `A04` đạt `RV = 3.25` tại Q3, đó là tổng review của 559 căn hay trung bình trên mỗi căn mỗi 30 ngày?",
        "a": "Là **trung bình mỗi căn hộ phát sinh `3.25` review / 30 ngày** (tổng cộng 559 căn ở A04 sinh hàng nghìn review mỗi quý)!"
      }
    ],
    "commonMistakes": [
      "Cho rằng `A04` có `Review Velocity` cao hơn vì số lượng căn hộ ở `A04` nhiều hơn (`559` căn) — lưu ý `RV` là giá trị **trung bình trên mỗi căn hộ**, không phụ thuộc tổng số căn nhiều hay ít!"
    ],
    "relatedFiles": [
      "figures/kpi_review_ghost.png"
    ]
  },
  {
    "id": "vo-034",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Đọc hiểu Hình 5 (`kpi_review_ghost.png`) về đồ thị đường `Ghost Rate` (bên phải).",
    "question": "Trên biểu đồ bên phải của Hình 5 (`kpi_review_ghost.png`), tại sao trục tung của `Ghost Rate` chỉ trải quanh `0%–2%` hoặc thấp và tất cả các khu đều cắt qua mức rất thấp gần `0%` tại `t3`?",
    "quickAnswer": "Tại `t3` (`2026-03-30`), toàn mẫu 1.000 căn có **`0` căn hộ nào bị `ghost = 1` (`0.0%`)**, nên đường biểu diễn mọi khu vực tại `t3` đều chạm đúng gốc `0%`! Ở các mốc còn lại `t1 (0.7%), t2 (0.3%), t4 (0.4%)`, tỷ lệ cũng dưới 1% (chỉ một vài căn tạm khóa lịch), chứng tỏ nguồn cung trong mẫu duy trì trạng thái sẵn sàng hoạt động cực kỳ cao.",
    "explanation": "Đọc chuẩn xác giá trị cụ thể trên biểu đồ nhánh phải của Hình 5.",
    "projectLink": "figures/kpi_review_ghost.png; data/processed/kpi_by_snapshot.csv",
    "codeLocation": "figures/kpi_review_ghost.png; data/processed/kpi_by_snapshot.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_review_ghost.png; data/processed/kpi_by_snapshot.csv`.",
    "followUpQuestions": [
      "Tại mốc `t4`, `4` căn `ghost = 1` đóng góp vào `Ghost Rate = 0.4004%` (`4 / 999`) — vì sao mẫu số là `999` chứ không phải `1.000`?"
    ],
    "followUpQA": [
      {
        "q": "Tại mốc `t4`, `4` căn `ghost = 1` đóng góp vào `Ghost Rate = 0.4004%` (`4 / 999`) — vì sao mẫu số là `999` chứ không phải `1.000`?",
        "a": "Do 1 căn duy nhất có tổng số review giảm nhẹ ở `Q3` (`diff < 0` -> `RV_q3 = NaN`), nên `ghost_t4` của căn đó giữ an toàn ở `<NA>` làm `ghost_n = 999`!"
      }
    ],
    "commonMistakes": [
      "Nhầm trục `%` nhỏ thành dữ liệu bị mất hết tại `t3`."
    ],
    "relatedFiles": [
      "figures/kpi_review_ghost.png"
    ]
  },
  {
    "id": "vo-035",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Phân biệt giữa `77.9% Positive / 20.6% Mixed / 1.5% Negative` trên 1.000 review LLM vs `73 / 25 / 2` trên 100 nhãn tay.",
    "question": "Tại sao phân bố cảm xúc trên 1.000 review LLM (`779 positive, 206 mixed, 15 negative`) gần giống nhưng không y hệt tỷ lệ trên 100 mẫu `ground_truth.csv` (`73, 25, 2`)?",
    "quickAnswer": "1) **Sự khác biệt tự nhiên của mẫu nhỏ (`100` trong `1.000`):** dao động tỷ lệ `73% vs 77.9%` và `25% vs 20.6%` hoàn toàn nằm trong sai số lấy mẫu ngẫu nhiên $\\pm 5\\%$ của `n=100`;\n2) Điểm đồng nhất quan trọng nhất cả hai bảng đều xác nhận cấu trúc lệch mạnh của dữ liệu Airbnb: **Positive ~73–78%, Mixed chiếm phần lớn phàn nàn (~20–25%), và thuần Negative chỉ chiếm rất nhỏ (~1.5–2%)**!",
    "explanation": "Giải thích hợp lý sự nhất quán phân bố giữa tập test 100 mẫu và tập suy luận 1.000 mẫu.",
    "projectLink": "data/processed/reviews_sentiment.csv; data/samples/ground_truth.csv",
    "codeLocation": "data/processed/reviews_sentiment.csv; data/samples/ground_truth.csv",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/reviews_sentiment.csv; data/samples/ground_truth.csv`.",
    "followUpQuestions": [
      "Còn trên đúng cùng 100 câu của `ground_truth.csv`, dự đoán của LLM khớp với nhãn tay `(73, 25, 2)` bao nhiêu câu?"
    ],
    "followUpQA": [
      {
        "q": "Còn trên đúng cùng 100 câu của `ground_truth.csv`, dự đoán của LLM khớp với nhãn tay `(73, 25, 2)` bao nhiêu câu?",
        "a": "Khớp **`99 / 100`** câu (`cam_xuc_accuracy = 0.99`, chỉ sai duy nhất 1 câu)!"
      }
    ],
    "commonMistakes": [
      "Tưởng LLM làm sai vì 77.9% khác 73% ở tập 100 nhãn tay!"
    ],
    "relatedFiles": [
      "data/processed/reviews_sentiment.csv"
    ]
  },
  {
    "id": "vo-036",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Cách đọc Hình 3 (`kpi_ppg_neighbourhood.png`): Nhận diện quận không nằm trong lõi du lịch Bắc nhưng có PPG vừa phải, dân sinh ổn định.",
    "question": "Ngoài vùng lõi Bắc đắt đỏ và cửa ngõ sân vận động phía Nam, những quận nào ở CDMX thể hiện mặt bằng giá `PPG` mềm (`~350–500 MXN/khách`) tạo dư địa lưu trú tiết kiệm cho du khách đại chúng?",
    "quickAnswer": "Các quận vành đai như **Gustavo A. Madero (`341,08 MXN`)**, **Venustiano Carranza (`357,60 MXN`)** (quanh khu sân bay quốc tế Benito Juárez / phía Đông-Bắc), **Tlalpan (`452,61 MXN`)** hay **Xochimilco (`376,59 MXN`)** giữ `Median PPG` trong khoảng `~340–460 MXN/khách` — thấp hơn rõ rệt so với khu trung tâm Polanco/Roma (`678–706 MXN`), là lựa chọn thay thế hợp lý dọc các tuyến metro kết nối sân vận động.",
    "explanation": "Chuyển hóa bức tranh không gian toàn thành phố thành gợi ý quy hoạch phân bổ khách.",
    "projectLink": "figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Khi giới thiệu các quận vành đai như `Iztapalapa (266,42 MXN, n=4)` hay `Xochimilco (376,59 MXN, n=5)`, bắt buộc phải đính kèm lưu ý gì?"
    ],
    "followUpQA": [
      {
        "q": "Khi giới thiệu các quận vành đai như `Iztapalapa (266,42 MXN, n=4)` hay `Xochimilco (376,59 MXN, n=5)`, bắt buộc phải đính kèm lưu ý gì?",
        "a": "Nhắc ngay **cỡ mẫu `n < 5–6` listing còn rất nhỏ**, chỉ mang tính tham khảo xu hướng chứ chưa đại diện đều cho toàn quận rộng lớn."
      }
    ],
    "commonMistakes": [
      "Chỉ tập trung nói 2 quận trung tâm mà quên phân tích phần vành đai giá mềm trên bản đồ."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_neighbourhood.png"
    ]
  },
  {
    "id": "vo-037",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Bảo vệ quy trình làm việc thống nhất: Một sinh viên cần hiểu cả dữ liệu, công thức lẫn ý nghĩa kinh doanh.",
    "question": "Tại sao một sinh viên làm vấn đáp xuất sắc cần liên kết được từ **1 con số trên biểu đồ Storytelling** (vd `14.8%` tiện nghi Cuauhtémoc) ngược về **công thức KPI (`src/kpi.py`)**, **dữ liệu nguồn (`reviews_sentiment.csv`)** và **độ tin cậy (`llm_vs_baseline.png`)**?",
    "quickAnswer": "Vì đề thi vấn đáp cá nhân đánh giá năng lực toàn trình (\"hiểu toàn bộ quy trình xử lý dữ liệu đến ra quyết định\"): nếu chỉ nhớ con số `14.8%` mà không biết nó tính bằng `(14 + 97) / 749` từ `COMPLAINT_MIXED_SCORE_MAP` trên `reviews_sentiment.csv` (vốn được kiểm chứng đạt `0.991` Macro F1 ở `evaluate.py`), câu trả lời sẽ thiếu bằng chứng nguồn gốc và dễ bị đánh trượt ở câu hỏi truy vấn tiếp!",
    "explanation": "Khẳng định triết lý kết nối dọc Code -> Dữ liệu -> KPI -> Storytelling của toàn bộ website học tập.",
    "projectLink": "src/kpi.py; src/evaluate.py; figures/llm_insights.png",
    "codeLocation": "src/kpi.py; src/evaluate.py; figures/llm_insights.png",
    "proofExample": "Đối chiếu trực tiếp tại `src/kpi.py; src/evaluate.py; figures/llm_insights.png`.",
    "followUpQuestions": [
      "Chính công thức nào tại `src/kpi.py:L406-L422` cho ra đúng giá trị `0.148198...` (`14.82%`) tại quận Cuauhtémoc?"
    ],
    "followUpQA": [
      {
        "q": "Chính công thức nào tại `src/kpi.py:L406-L422` cho ra đúng giá trị `0.148198...` (`14.82%`) tại quận Cuauhtémoc?",
        "a": "`(rev_merged[\"amenities\"].map(COMPLAINT_MIXED_SCORE_MAP).fillna(0.0)).mean()` trong nhóm `Cuauhtémoc` (`111 / 749 = 0.1482`)!"
      }
    ],
    "commonMistakes": [
      "Học vẹt con số cuối kỳ tách rời khỏi file CSV và hàm Python sinh ra nó."
    ],
    "relatedFiles": [
      "src/kpi.py"
    ]
  },
  {
    "id": "vo-038",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Phân tích vai trò của Tiêu đề hành động (Action Title) trên 8 hình `figures/*.png`.",
    "question": "Sự khác nhau giữa một tiêu đề mô tả tĩnh (\"Biểu đồ PPG theo khu vực\") và **Tiêu đề hành động (Action Title)** trên 8 hình trong `figures/` là gì? Hãy nêu 1 ví dụ cụ thể trong `src/viz.py`.",
    "quickAnswer": "Tiêu đề hành động nêu thẳng **thông điệp chính phát hiện được** ngay ở dòng tiêu đề lớn (`suptitle`), giúp lãnh đạo SECTUR nắm ý nghĩa biểu đồ trong 3 giây trước khi nhìn xuống trục số! Ví dụ: *\"Trung vị PPG tăng +64.1% qua 4 mốc — Lan tỏa đồng loạt ở cả 8 khu vực\"* thay vì chỉ ghi \"PPG qua các mốc\".",
    "explanation": "Chuẩn tiêu chí #1 trong 5 điểm kiểm tra một hình (Bài 12 & Bài 14).",
    "projectLink": "src/viz.py; Bài 12 & Bài 14",
    "codeLocation": "src/viz.py; Bài 12 & Bài 14",
    "proofExample": "Đối chiếu trực tiếp tại `src/viz.py; Bài 12 & Bài 14`.",
    "followUpQuestions": [
      "Đi kèm Action Title ở trên, phần chú thích phía dưới (`caption`) trên các hình của `src/viz.py` cung cấp thêm thông tin bắt buộc gì?"
    ],
    "followUpQA": [
      {
        "q": "Đi kèm Action Title ở trên, phần chú thích phía dưới (`caption`) trên các hình của `src/viz.py` cung cấp thêm thông tin bắt buộc gì?",
        "a": "Ghi rõ **nguồn CSV (`data/processed/...`), đơn vị, ngày snapshot và các giới hạn cỡ mẫu `n` nhỏ**!"
      }
    ],
    "commonMistakes": [
      "Đặt tiêu đề ảnh chỉ nêu tên 2 trục X và Y (\"Biểu đồ cột giữa X và Y\")."
    ],
    "relatedFiles": [
      "src/viz.py"
    ]
  },
  {
    "id": "vo-039",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích tại sao số liệu `Median Price` và `Median PPG` tại khu vực `A07` tăng đều dù gồm các quận ngoại ô lớn.",
    "question": "Khu vực **`A07`** (phía Đông-Nam gồm Xochimilco, Tláhuac, Milpa Alta...) có đặc điểm gì khác biệt giữa thước đo cả căn (`Price`) và thước đo theo đầu người (`PPG`) trên tập mẫu?",
    "quickAnswer": "Ở `A07`, nhiều chỗ ở tại Xochimilco thuộc loại nhà vườn rộng sức chứa 10–14 khách khiến giá cả căn (`Price`) rất cao nhưng đơn giá trên đầu người (`PPG`) lại mềm (`~377 MXN/khách`). Tuy vậy, qua 4 mốc đến World Cup 2026, xu hướng nâng mặt bằng giá PPG chung vẫn hiện diện ở `A07` như toàn bộ 7 khu còn lại (`kpi_ppg_snapshots.png`).",
    "explanation": "Tránh bỏ sót các khu vực ngoại ô trong bức tranh 8 khu vực.",
    "projectLink": "figures/kpi_ppg_snapshots.png; data/processed/kpi_by_area.csv",
    "codeLocation": "figures/kpi_ppg_snapshots.png; data/processed/kpi_by_area.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_snapshots.png; data/processed/kpi_by_area.csv`.",
    "followUpQuestions": [
      "Nhìn chung toàn 8 khu vực `A01..A08`, biên độ tăng `Median PPG` từ `t1` tới `t4` nằm trong khoảng nào?"
    ],
    "followUpQA": [
      {
        "q": "Nhìn chung toàn 8 khu vực `A01..A08`, biên độ tăng `Median PPG` từ `t1` tới `t4` nằm trong khoảng nào?",
        "a": "Tất cả 8/8 khu vực đều tăng từ **~`+56%` đến `+70.1%`**!"
      }
    ],
    "commonMistakes": [
      "Nghĩ chỉ 2–3 khu trung tâm mới tăng giá PPG trong chuỗi 4 mốc."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_snapshots.png"
    ]
  },
  {
    "id": "vo-040",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Đọc hiểu chính xác con số `Q1` và `Q3` trên bảng `kpi_by_snapshot.csv` (dải phân bố lõi 50% thị trường).",
    "question": "Ngoài `Median`, tại sao `Q1 (25%)` và `Q3 (75%)` trên `kpi_by_snapshot.csv` giúp SECTUR hình dung \"túi tiền thực tế của nửa giữa du khách\" rõ hơn nhiều so với `Min–Max`?",
    "quickAnswer": "Dải `[Min, Max]` của CDMX trải từ vài trăm peso tới `153.540 MXN` (vô nghĩa cho đa số); trong khi dải `[Q1, Q3]` (hộp giữa IQR chiếm 50% thị trường) cho thấy rõ mặt bằng giá điển hình tại `t4` nằm trọn trong khoảng vài trăm MXN mỗi khách đêm (độ rộng IQR trên PPG khoảng `0.7909 × 626.79 ≈ 496 MXN/khách`), giúp doanh nghiệp và cơ quan quản lý định khung mức tham chiếu sát thực tế.",
    "explanation": "Chuyển đổi khái niệm `Q1, Q3, IQR` thành thước đo khung giá thị trường thực tiễn.",
    "projectLink": "data/processed/kpi_by_snapshot.csv; src/kpi.py:L36-L48",
    "codeLocation": "data/processed/kpi_by_snapshot.csv; src/kpi.py:L36-L48",
    "proofExample": "Đối chiếu trực tiếp tại `data/processed/kpi_by_snapshot.csv; src/kpi.py:L36-L48`.",
    "followUpQuestions": [
      "Từ `Median PPG = 626.79` và `rIQR(PPG) = 0.7909` tại `t4`, nhẩm tính nhanh độ rộng `IQR(PPG)` bằng bao nhiêu MXN?"
    ],
    "followUpQA": [
      {
        "q": "Từ `Median PPG = 626.79` và `rIQR(PPG) = 0.7909` tại `t4`, nhẩm tính nhanh độ rộng `IQR(PPG)` bằng bao nhiêu MXN?",
        "a": "`IQR = Median × rIQR ≈ 626.79 × 0.7909 ≈ 495.7 MXN/khách`!"
      }
    ],
    "commonMistakes": [
      "Dùng `[Min, Max]` làm khoảng giá đại diện cho thành phố."
    ],
    "relatedFiles": [
      "data/processed/kpi_by_snapshot.csv"
    ]
  },
  {
    "id": "vo-041",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Evaluation"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Truyền đạt rõ ý nghĩa thực tiễn của con số `0` vi phạm nghiêm trọng ở `hau_kiem()` và `qa_report.csv`.",
    "question": "Khi báo cáo trước hội đồng, tại sao cần nêu bật cặp bằng chứng **`0` vi phạm cấu trúc QA** (tất cả 1.000 căn sạch `accommodates`, `availability`, `reviews`) song song với **`0.9909` Macro F1 + `hau_kiem()`**?",
    "quickAnswer": "Vì trong Data Storytelling khoa học (Bài 14), độ tin cậy của kết luận phụ thuộc trực tiếp vào tính minh bạch của hai đầu phễu kiểm chứng: dữ liệu bảng cấu trúc được chứng thực qua 32 dòng `qa_report.csv` (chỉ có khuyết giá khách quan), còn dữ liệu văn bản phi cấu trúc được chứng thực đồng thời qua `ground_truth.csv (100)` + `Baseline đối chứng (0.5224 -> 0.9909)` + `hau_kiem() (1.000 mẫu)`.",
    "explanation": "Tạo vỏ bọc tin cậy hai tầng (Dữ liệu cấu trúc + Văn bản AI) khi thuyết trình bảo vệ.",
    "projectLink": "reports/qa_report.csv; reports/evaluation_report.csv",
    "codeLocation": "reports/qa_report.csv; reports/evaluation_report.csv",
    "proofExample": "Đối chiếu trực tiếp tại `reports/qa_report.csv; reports/evaluation_report.csv`.",
    "followUpQuestions": [
      "Nếu giảng viên hỏi \"1.000 mẫu review LLM có phải được lấy bằng tay một cách thiên vị toàn câu tốt không?\", chứng minh ngược lại bằng cách nào?"
    ],
    "followUpQA": [
      {
        "q": "Nếu giảng viên hỏi \"1.000 mẫu review LLM có phải được lấy bằng tay một cách thiên vị toàn câu tốt không?\", chứng minh ngược lại bằng cách nào?",
        "a": "Danh sách 1.000 review LLM được gắn dấu `\"x\"` sẵn trong bảng phân công của đề bài trên Google Sheet, và vẫn chứa tới `20.6% mixed` + `1.5% negative` + các phàn nàn `14.8% amenities / 8.1% noise` hoàn toàn không tô hồng!"
      }
    ],
    "commonMistakes": [
      "Bỏ quên khâu chứng minh độ sạch của dữ liệu nguồn khi trình bày kết quả kinh doanh."
    ],
    "relatedFiles": [
      "reports/qa_report.csv"
    ]
  },
  {
    "id": "vo-042",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích hiệu ứng đối lập giữa `Cuauhtémoc` và `Benito Juárez` trên bản đồ `kpi_ppg_neighbourhood.png`.",
    "question": "Trên bản đồ Choropleth `kpi_ppg_neighbourhood.png`, hai quận trung tâm liền kề nhau là **Cuauhtémoc** và **Benito Juárez** thể hiện sự tương đồng thú vị nào khi chuyển sang thước đo **`Median PPG`**?",
    "quickAnswer": "Khi nhìn theo `Price Mean`, Cuauhtémoc (`3.529,04 MXN`) vượt xa Benito Juárez (`2.038,39 MXN`) bởi ảnh hưởng của 2 căn `153.540 MXN`. Nhưng khi chuẩn hóa sang **`Median PPG`** ở bản đồ dưới-phải, **Cuauhtémoc (`678,00 MXN`) và Benito Juárez (`572,00 MXN`)** thu hẹp chênh lệch hơn nhiều (và `Median PPG` Cuauhtémoc chỉ cao hơn ~18.5% thay vì chênh tới `+73%` như `Price Mean`!), cho thấy loại bỏ yếu tố quy mô căn hộ và ngoại lai giúp bức tranh giá giữa hai quận lân cận thực chất hơn nhiều!",
    "explanation": "Phát hiện so sánh không gian tinh tế từ cặp bản đồ hàng trên vs hàng dưới của Hình 3.",
    "projectLink": "figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "codeLocation": "figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_neighbourhood.png; data/processed/kpi_by_neighbourhood.csv`.",
    "followUpQuestions": [
      "Và hai quận này cộng với **Miguel Hidalgo (`706 MXN`)** tạo thành cụm tam giác gì tại Mexico City?"
    ],
    "followUpQA": [
      {
        "q": "Và hai quận này cộng với **Miguel Hidalgo (`706 MXN`)** tạo thành cụm tam giác gì tại Mexico City?",
        "a": "Tạo thành **tam giác vùng lõi cao cấp & du lịch trọng tâm** của thủ đô Mexico City (Polanco – Roma/Condesa – Del Valle/Nápoles) dẫn đầu nguồn cung (78.1% tổng mẫu) với mặt bằng `Median PPG` cao (`572–706 MXN/khách`)."
      }
    ],
    "commonMistakes": [
      "Nhìn bản đồ Price Mean rồi tưởng Cuauhtémoc đắt gần gấp đôi Benito Juárez."
    ],
    "relatedFiles": [
      "figures/kpi_ppg_neighbourhood.png"
    ]
  },
  {
    "id": "vo-043",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Phân tích hàm ý chính sách cho bài toán cân bằng khách – cư dân bản địa (Overtourism Risk).",
    "question": "Từ việc `Cuauhtémoc` chiếm `52.5%` listing mẫu, giá PPG tăng `+57.5%` và phàn nàn `Tiếng ồn (8.1%) / Tiện nghi (14.8%)` tập trung dày đặc tại đây, SECTUR CDMX rút ra cảnh báo quản trị đô thị gì cho mùa World Cup 2026?",
    "quickAnswer": "Áp lực lưu trú và tăng giá đang tập trung quá mức vào một khu vực lõi (`Cuauhtémoc + Miguel Hidalgo`), dễ gây hai rủi ro đồng thời: (1) Khách du lịch trả giá cao hơn nhưng tỷ lệ phàn nàn về chất lượng phòng (`14.8% amenities`) và tiếng ồn (`8.1% noise`) lại cao nhất tại lõi; (2) Giá sinh hoạt/thuê nhà tăng nóng lan sang vành đai gần sân vận động (`Coyoacán +77.5%`, `Tlalpan`). Hàm ý cho SECTUR là phân luồng thông tin khuyến khích du khách ở các quận kết nối metro giá hợp lý hơn (`430–550 MXN`) kèm kiểm tra điều kiện cơ sở vật chất vùng lõi.",
    "explanation": "Nâng tầm Data Storytelling thành tư vấn chính sách công thực tế gắn liền số liệu.",
    "projectLink": "reports/report.pdf Chương 6",
    "codeLocation": "reports/report.pdf Chương 6",
    "proofExample": "Đối chiếu trực tiếp tại `reports/report.pdf Chương 6`.",
    "followUpQuestions": [
      "Khuyến nghị nào dành riêng cho nhóm chủ nhà (`hosts`) rút ra trực tiếp từ cặp dữ liệu `A03` và `Cuauhtémoc`?"
    ],
    "followUpQA": [
      {
        "q": "Khuyến nghị nào dành riêng cho nhóm chủ nhà (`hosts`) rút ra trực tiếp từ cặp dữ liệu `A03` và `Cuauhtémoc`?",
        "a": "Định giá vừa tầm theo PPG thị trường (tránh kịch bản `A03` tăng nóng `+70.1%` rớt `Occ` về `34.6%`) và đầu tư nâng cấp nước nóng/thiết bị/cách âm trước khi đón khách quốc tế."
      }
    ],
    "commonMistakes": [
      "Kết luận siêu thực tế kiểu \"nên cấm Airbnb ở Cuauhtémoc\" vượt xa những gì dữ liệu ủng hộ."
    ],
    "relatedFiles": [
      "reports/report.pdf"
    ]
  },
  {
    "id": "vo-044",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "Visualization"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Cách đọc chính xác hình `kpi_ppg_riqr_2026-06-15.png` (Boxplot trái): Râu (whiskers) và chấm tròn ngoài râu là gì?",
    "question": "Nếu giảng viên chỉ vào một chấm tròn nằm tít bên phải hộp `A04` trên Boxplot trái của `kpi_ppg_riqr_2026-06-15.png` và hỏi ý nghĩa đường dọc giữa hộp, hai mép hộp, râu và các chấm đó — trả lời chuẩn từng thành phần ra sao?",
    "quickAnswer": "- **Đường dọc bên trong hộp:** **Trung vị (`Median` = Q2)**;\n- **Hai mép hộp:** **Q1 (25%)** và **Q3 (75%)** -> độ rộng hộp là **IQR**;\n- **Hai râu (whiskers):** kéo tối đa tới `Q1 - 1.5×IQR` và `Q3 + 1.5×IQR` trong phạm vi dữ liệu thật;\n- **Các chấm tròn vượt ngoài râu:** các căn hộ **ngoại lai (outliers)** theo quy tắc Tukey 1.5×IQR (trên trục log chính là các căn PPG rất cao như biệt thự/giá đầu cơ `153.540 MXN`).",
    "explanation": "Đọc chuẩn 100% thành phần toán học của Boxplot trong Bài 13 trên chính Hình 1 của đồ án.",
    "projectLink": "figures/kpi_ppg_riqr_2026-06-15.png; Bài 13",
    "codeLocation": "figures/kpi_ppg_riqr_2026-06-15.png; Bài 13",
    "proofExample": "Đối chiếu trực tiếp tại `figures/kpi_ppg_riqr_2026-06-15.png; Bài 13`.",
    "followUpQuestions": [
      "Trong Hình 1 đó, vì sao đường râu bên phải hộp trông ngắn hơn đường râu bên trái dù dữ liệu thực lệch phải?"
    ],
    "followUpQA": [
      {
        "q": "Trong Hình 1 đó, vì sao đường râu bên phải hộp trông ngắn hơn đường râu bên trái dù dữ liệu thực lệch phải?",
        "a": "Vì trục X đang bật **`log_scale=True`**! Trên thang log, tỷ lệ nhân ở phía trên bị nén gọn lại thành khoảng bằng nhau so với tỷ lệ chia ở phía dưới."
      }
    ],
    "commonMistakes": [
      "Nhầm râu của Boxplot luôn là giá trị `Min` và `Max` tuyệt đối của toàn dữ liệu!"
    ],
    "relatedFiles": [
      "figures/kpi_ppg_riqr_2026-06-15.png"
    ]
  },
  {
    "id": "vo-045",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "KPI"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Giải thích nhanh trong 60 giây: Mối liên hệ giữa `t1 (09/2025)`, `t2 (12/2025)`, `t3 (03/2026)` và `t4 (06/2026)` theo dòng lịch sự kiện Mexico.",
    "question": "Việc Inside Airbnb CDMX được Nhóm 4 khảo sát qua 4 mốc `t1..t4` trùng với nhịp thời gian nào của mùa lễ hội & thể thao tại Mexico City?",
    "quickAnswer": "- **`t1` (`2025-09-27`):** Mốc nền đầu thu (~8.5 tháng trước World Cup);\n- **`t2` (`2025-12-29`):** Mốc cuối năm / kỳ nghỉ Giáng sinh–Năm mới (tồn tại lỗ hổng thiếu giá nguồn, nhưng vẫn giữ đầy đủ dữ liệu lịch & RV);\n- **`t3` (`2026-03-30`):** Trùng kỳ nghỉ lễ lớn nhất mùa xuân **Tuần Thánh Semana Santa** (nơi ghi nhận đỉnh công suất lịch ngắn hạn `48.47%` & Urgency Gap `+21.38 pp`);\n- **`t4` (`2026-06-15`):** Mốc **khai mạc FIFA World Cup 2026** (đạt đỉnh giá chào `1.940 MXN` / PPG `626.79 MXN`, `+67.3%` so với `t1`).",
    "explanation": "Gắn chặt từng mốc kỹ thuật `t1..t4` với bối cảnh kinh tế-xã hội thực tế của điểm đến du lịch CDMX.",
    "projectLink": "configs/mexico-city.yaml; reports/report.pdf",
    "codeLocation": "configs/mexico-city.yaml; reports/report.pdf",
    "proofExample": "Đối chiếu trực tiếp tại `configs/mexico-city.yaml; reports/report.pdf`.",
    "followUpQuestions": [
      "Khoảng cách ngày từ `t1 -> t2`, `t2 -> t3`, và `t3 -> t4` có bằng nhau không?"
    ],
    "followUpQA": [
      {
        "q": "Khoảng cách ngày từ `t1 -> t2`, `t2 -> t3`, và `t3 -> t4` có bằng nhau không?",
        "a": "Không bằng nhau tuyệt đối: lần lượt là **`93` ngày (`Q1`)**, **`91` ngày (`Q2`)**, và **`77` ngày (`Q3`)** — nên mọi phép tính tốc độ review mới (`RV`) đều phải chia chuẩn hóa theo số ngày thực tế `/ 30.0`!"
      }
    ],
    "commonMistakes": [
      "Chỉ biết gọi tên `t1, t2, t3, t4` như bốn chuỗi ký tự vô hồn mà quên ý nghĩa mùa lễ Semana Santa ở `t3` và khai mạc World Cup ở `t4`!"
    ],
    "relatedFiles": [
      "configs/mexico-city.yaml"
    ]
  },
  {
    "id": "vo-046",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "LLM"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Cách diễn đạt chính xác về **1.000 mẫu LLM** khi trả lời về khía cạnh `cleanliness` vs `amenities`.",
    "question": "Vì sao khi báo cáo phàn nàn về chất lượng phòng, cần trình bày tách biệt rõ 2 khía cạnh **`amenities` (tiện nghi/thiết bị: `14.82%` Cuauhtémoc)** và **`cleanliness` (vệ sinh)** thay vì gộp chung thành \"phòng kém\"?",
    "quickAnswer": "Bởi **giải pháp hành động hoàn toàn khác nhau**: phàn nàn về `cleanliness` đòi hỏi siết quy trình dọn dẹp/giặt giũ của nhân sự vệ sinh, còn phàn nàn về `amenities` (`14.82%` tại Cuauhtémoc, đa số ẩn trong lớp `mixed`) thường liên quan tới **hạ tầng kỹ thuật thiếu hoặc trục trặc** (máy nước nóng chập chờn, wifi yếu, thiếu điều hòa/quạt mùa hè tháng 6, bếp hỏng) — cần đầu tư bảo trì trang thiết bị trước mùa khách quốc tế World Cup!",
    "explanation": "Phân tích chi tiết từ nhãn khía cạnh ABSA ra giải pháp vận hành cụ thể.",
    "projectLink": "figures/llm_insights.png; src/llm.py",
    "codeLocation": "figures/llm_insights.png; src/llm.py",
    "proofExample": "Đối chiếu trực tiếp tại `figures/llm_insights.png; src/llm.py`.",
    "followUpQuestions": [
      "Trong 7 khía cạnh theo YAML của Nhóm 4, hãy đọc tên đúng nguyên văn tiếng Anh tất cả 7 cột khía cạnh trong `reviews_sentiment.csv`."
    ],
    "followUpQA": [
      {
        "q": "Trong 7 khía cạnh theo YAML của Nhóm 4, hãy đọc tên đúng nguyên văn tiếng Anh tất cả 7 cột khía cạnh trong `reviews_sentiment.csv`.",
        "a": "`location`, `cleanliness`, `amenities`, `communication`, `checkin`, `value`, `noise`!"
      }
    ],
    "commonMistakes": [
      "Gộp chung mọi lời phàn nàn phòng vào một chữ \"dịch vụ kém\"."
    ],
    "relatedFiles": [
      "figures/llm_insights.png"
    ]
  },
  {
    "id": "vo-047",
    "category": "H",
    "categoryLabel": "Data Storytelling",
    "bucket": "storytelling",
    "topics": [
      "Storytelling",
      "QA"
    ],
    "level": 4,
    "levelLabel": "Cấp độ 4 – Vận dụng",
    "difficulty": "Vận dụng",
    "qType": "Phân tích kết quả",
    "evaluationGoal": "Câu hỏi phỏng vấn cá nhân: \"Nếu ngày mai phải thuyết trình kết quả này cho một chuyên gia kỹ thuật vs một lãnh đạo Sở Du lịch, bạn thay đổi slide/cách nói gì?\"",
    "question": "Với **cùng một kho kết quả Inside Airbnb Nhóm 4**, bạn sẽ điều chỉnh trọng tâm kể chuyện thế nào khi đổi đối tượng nghe từ **Giảng viên/Kỹ sư Dữ liệu** sang **Lãnh đạo SECTUR CDMX**?",
    "quickAnswer": "- **Với Lãnh đạo SECTUR CDMX:** Đẩy ngay 5 phát hiện & 3 khuyến nghị hành động lên 80% thời lượng (Giá `+67.3%`, Điểm nóng Miguel Hidalgo/Cuauhtémoc/Coyoacán, Cú lệch Semana Santa `t3` vs `t4`, Tiện nghi `14.8%`/Tiếng ồn `8.1%`, kèm 3 giới hạn cốt lõi rõ ràng bằng ngôn ngữ phổ thông);\n- **Với Giảng viên/Kỹ sư Dữ liệu:** Ngoài phát hiện & giới hạn trên, bổ sung chiều sâu kiểm toán kỹ thuật: 8 rule gắn cờ bảo toàn `t2` + 32 dòng `qa_report.csv`, Index Alignment/Int64 trong `kpi.py`, đối chứng Macro F1 (`0.991 vs 0.522`) & chi phí `$0.203` + `hau_kiem()` 6 quy tắc trong `evaluate.py`!",
    "explanation": "Thể hiện tư duy Audience-centric Communication chuẩn mực của Bài 14.",
    "projectLink": "Bài 14; reports/report.pdf",
    "codeLocation": "Bài 14; reports/report.pdf",
    "proofExample": "Đối chiếu trực tiếp tại `Bài 14; reports/report.pdf`.",
    "followUpQuestions": [
      "Điểm chung BẮT BUỘC không bao giờ được bỏ sót dù nói với đối tượng nào trong hai nhóm trên là gì?"
    ],
    "followUpQA": [
      {
        "q": "Điểm chung BẮT BUỘC không bao giờ được bỏ sót dù nói với đối tượng nào trong hai nhóm trên là gì?",
        "a": "Sự **trung thực về phạm vi dữ liệu & 6 ranh giới khái niệm** (giá niêm yết, mẫu 1.000 căn, lịch proxy, không kết luận nhân quả đơn tuyến)!"
      }
    ],
    "commonMistakes": [
      "Đem nguyên slide chi tiết regex/dtype giảng cho giám đốc Sở Du lịch, hoặc chỉ kể mỗi con số bề nổi không giải thích được code/công thức trước giảng viên!"
    ],
    "relatedFiles": [
      "Bài"
    ]
  }
];

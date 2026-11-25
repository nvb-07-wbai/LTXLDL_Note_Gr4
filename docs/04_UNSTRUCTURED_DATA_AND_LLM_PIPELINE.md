# [BƯỚC 4/5] XỬ LÝ DỮ LIỆU PHI CẤU TRÚC BẰNG LLM & ĐỐI CHỨNG (LLM & BASELINE PIPELINE)

> **LIÊN KẾT HỆ THỐNG TÀI LIỆU (AI NAVIGATION LINKS):**
> - **Bước trước [Bước 3 - Biến đổi & Tính toán KPI]:** Xem tệp `03_TRANSFORMATION_AND_KPI_ENGINE.md`
> - **Tệp hiện tại:** `04_UNSTRUCTURED_DATA_AND_LLM_PIPELINE.md` (Đặc tả cho `src/llm.py`, `src/baseline.py`, `src/evaluate.py`)
> - **Bước tiếp theo [Bước 5 - Trực quan hóa, Kể chuyện & Vấn đáp]:** Đọc tệp `05_VISUALIZATION_STORYTELLING_AND_DEFENSE.md`

---

## 1. MỤC TIÊU CỦA BƯỚC 4 (TRỌNG TÂM BÀI 11 - BẮT BUỘC)
Trong bảng `reviews.csv.gz`, cột `comments` là văn bản tự do đa ngôn ngữ (tiếng Anh, Tây Ban Nha, Pháp, Bồ Đào Nha, Việt...). Các quy tắc kiểm tra cột thông thường không thể cho biết khách khen hay chê khía cạnh nào.

Theo mục **04 - Phần phân tích dùng LLM** của đề Bài tập lớn và lý thuyết **Bài 11**, nhóm bắt buộc phải xây dựng 3 mô-đun:
1. `src/llm.py`: Dùng **Gemini API (free tier)** trích xuất thông tin có cấu trúc từ một mẫu `reviews`, lưu cache và hỗ trợ cờ `--skip-llm`.
2. `src/baseline.py`: Xây dựng phương pháp đối chứng **không dùng LLM** (dựa trên từ điển từ khóa / biểu thức chính quy).
3. `src/evaluate.py`: Đo lường chất lượng (Accuracy, F1-score) của cả LLM và Baseline trên tập **$\ge 100$ nhãn tay**, phân tích lỗi và ước tính chi phí toàn thành phố.

---

## 2. KHI NÀO DÙNG REGEX, KHI NÀO DÙNG LLM? (ĐỀ KIỂM TRA CÂU 4)
Bài 11 đặt ra nguyên tắc lựa chọn công cụ rõ ràng:
- **Mẫu cố định (Fixed pattern):** Dùng biểu thức chính quy (Regex) vì nhanh, chi phí bằng $0$ và tái lập tuyệt đối $100\%$.
- **Hiểu ngữ nghĩa đa ngôn ngữ ở quy mô vừa (Semantic extraction):** Dùng **LLM với đầu ra có cấu trúc (Structured Output / Schema)** kết hợp đo lường chất lượng trên tập nhãn tay.
- **Quyết định hệ trọng từng ca:** Con người thẩm định, LLM chỉ hỗ trợ sàng lọc.

---

## 3. CHIẾN LƯỢC CHỌN MẪU & GÁN NHÃN TAY (`data/samples/`)

### 3.1. Chọn mẫu đánh giá để chạy LLM (`sample_size`)
- Bảng `reviews.csv.gz` của một thành phố có thể chứa từ $200,000$ đến hơn $1,000,000$ đánh giá. Không thể gọi API miễn phí cho toàn bộ.
- **Cách chọn mẫu chuẩn (cố định `seed: 42` từ `configs/<city>.yaml`):**
  1. Lọc bỏ các đánh giá rỗng (`comments.isna()`), quá ngắn ($< 15$ ký tự) hoặc là thông báo tự động của hệ thống (`"This is an automated posting."`).
  2. Lấy mẫu phân tầng (Stratified Sampling) theo `neighbourhood_cleansed` hoặc theo quý thời gian với cỡ mẫu $N_{\text{sample}} \in [1000, 3000]$ đánh giá (nhóm giải thích rõ lý do chọn cỡ mẫu dựa trên hạn mức RPM/RPD của Gemini API Free Tier).

### 3.2. Xây dựng tập $\ge 100$ nhãn tay (`data/samples/manual_labels.csv`)
- Rút ngẫu nhiên $N_{\text{manual}} \ge 100$ đánh giá (khuyến nghị $120 - 150$ mẫu) từ tập mẫu trên.
- Các thành viên trong nhóm tự đọc và gán nhãn độc lập theo đúng Schema (cảm xúc: `positive` / `mixed` / `negative`, khía cạnh khen/chê), thảo luận các ca bất đồng để chốt nhãn chuẩn (Gold Standard).
- Lưu vào `data/samples/manual_labels.csv` với tối thiểu các cột: `review_id`, `listing_id`, `comments`, `human_sentiment`, `human_praised_aspects`, `human_criticized_aspects`, `annotator_note`.

---

## 4. ĐẶC TẢ ĐẦU RA CÓ CẤU TRÚC VỚI GEMINI API (`src/llm.py`)

### 4.1. Định nghĩa Schema bằng Pydantic
Sử dụng SDK chính thức `google-genai` kết hợp `pydantic.BaseModel` để ép mô hình trả về chuỗi JSON tuân thủ tuyệt đối cấu trúc:

```python
from typing import Literal, List
from pydantic import BaseModel, Field

AllowedAspect = Literal[
    "vị trí", "sạch sẽ", "chủ nhà", "giá trị", "tiện nghi", "độ ồn", "an toàn"
]

class ReviewExtractionSchema(BaseModel):
    sentiment: Literal["positive", "mixed", "negative"] = Field(
        description="Cảm xúc tổng thể của đánh giá: positive, mixed, hoặc negative."
    )
    praised_aspects: List[AllowedAspect] = Field(
        default_factory=list,
        description="Danh sách các khía cạnh được khách khen ngợi trong đánh giá."
    )
    criticized_aspects: List[AllowedAspect] = Field(
        default_factory=list,
        description="Danh sách các khía cạnh bị khách phàn nàn hoặc chê trong đánh giá."
    )
    language: str = Field(
        description="Mã ngôn ngữ ISO 639-1 của đánh giá (ví dụ: 'en', 'es', 'fr', 'pt', 'vi')."
    )
```

### 4.2. Vòng lặp gọi LLM có kỷ luật (Bẫy Đề kiểm tra Câu 6!)
> **BẪY SỐNG CÒN TỪ BÀI 11 (Đề kiểm tra Câu 6):** Nếu vòng lặp gọi LLM cho $500$ đánh giá bị dừng ở đánh giá thứ $137$ do lỗi `ValidationError` (đầu ra sai schema) hoặc lỗi mạng/rate-limit, và kết quả chỉ được lưu sau khi vòng lặp kết thúc thì toàn bộ $136$ kết quả trước đó sẽ bị mất sạch!

**Cách cài đặt đúng chuẩn Bài 11 trong `src/llm.py`:**
1. **Đọc cache trước khi gọi:** Đọc tệp `data/processed/llm_cache.jsonl` để lấy tập `processed_ids`. Những `review_id` nào đã có kết quả hợp lệ trong cache thì bỏ qua ngay.
2. **Hỗ trợ cờ `--skip-llm`:** Khi chạy với `--skip-llm`, hàm chỉ nạp kết quả từ `llm_cache.jsonl` và chuyển thành DataFrame, tuyệt đối không khởi tạo kết nối API hay đòi hỏi `GEMINI_API_KEY`.
3. **Bọc từng lời gọi và bước `model_validate_json` trong `try/except`:**
   - Nếu xảy ra lỗi (`ValidationError`, `APIError`), ghi nhận trạng thái lỗi (`status="error"`, `result=None`) cho bản ghi đó để xử lý/chạy bù sau, **không để chương trình bị dừng đột ngột**.
4. **Ghi cache ngay lập tức (Append mode `'a'`):** Ngay sau mỗi lời gọi (hoặc mỗi micro-batch), ghi kết quả xuống tệp `.jsonl` kèm `f.flush()` và nghỉ `time.sleep(...)` để tuân thủ giới hạn tốc độ (Rate Limit).

```python
import json, time
from pathlib import Path

def process_reviews_disciplined(reviews_df, client, cache_path: Path, skip_llm: bool = False):
    cache_records = {}
    if cache_path.exists():
        with open(cache_path, "r", encoding="utf-8") as f:
            for line in f:
                rec = json.loads(line)
                if rec.get("status") == "ok":
                    cache_records[rec["review_id"]] = rec

    if skip_llm:
        return list(cache_records.values())

    with open(cache_path, "a", encoding="utf-8") as f_out:
        for row in reviews_df.itertuples():
            if row.id in cache_records:
                continue
            try:
                raw_json = call_gemini_api(client, row.comments)
                validated = ReviewExtractionSchema.model_validate_json(raw_json)
                record = {
                    "review_id": int(row.id),
                    "listing_id": int(row.listing_id),
                    "status": "ok",
                    **validated.model_dump(),
                }
            except Exception as exc:
                record = {
                    "review_id": int(row.id),
                    "listing_id": int(row.listing_id),
                    "status": "error",
                    "error_msg": str(exc),
                }
            f_out.write(json.dumps(record, ensure_ascii=False) + "\n")
            f_out.flush()
            time.sleep(1.5)  # Tuân thủ rate limit của gói miễn phí
    return list(cache_records.values())
```

---

## 5. PHƯƠNG PHÁP ĐỐI CHỨNG KHÔNG DÙNG LLM (`src/baseline.py`)
Theo Bài 11, để chứng minh việc dùng LLM là đáng giá, nhóm phải xây dựng một phương pháp đối chứng dựa trên quy tắc từ khóa (Rule-based / Regex Lexicon):
1. Xây dựng bộ từ điển tích cực (`POS_PATTERN`) và tiêu cực (`NEG_PATTERN`) cùng từ điển từ khóa cho từng khía cạnh (ví dụ khía cạnh `"độ ồn"`: `r"\b(noise|noisy|loud|quiet|ruido|bruit)\b"`).
2. **Nhớ bài học Đề kiểm tra Câu 7:**
   - Phải dùng ranh giới từ `\b...\b` và cờ `re.IGNORECASE` để không khớp nhầm chuỗi con (như `not` nằm trong `notable`).
   - Quy tắc gán nhãn cảm xúc Baseline: Đếm số từ khớp `pos_count` và `neg_count`:
     - Nếu `pos_count > 0` và `neg_count == 0` $\rightarrow$ `"positive"`.
     - Nếu `neg_count > 0` và `pos_count == 0` $\rightarrow$ `"negative"`.
     - Nếu cả hai cùng $> 0$ (hoặc cùng $= 0$) $\rightarrow$ `"mixed"` (hoặc quy tắc ngưỡng hiệu số).

---

## 6. ĐÁNH GIÁ CHẤT LƯỢNG, PHÂN TÍCH LỖI & ƯỚC TÍNH CHI PHÍ (`src/evaluate.py`)

### 6.1. Đo lường định lượng trên tập $\ge 100$ nhãn tay
Đối chiếu kết quả của `LLM` và `Baseline` với cột `human_sentiment` / `human_*_aspects` trên cùng tập `manual_labels.csv`:
- Tính **Accuracy** và **Macro-F1** (hoặc Weighted-F1) cho bài toán phân loại cảm xúc 3 lớp (`positive`, `mixed`, `negative`):
  $$\text{Accuracy} = \frac{1}{N_{\text{manual}}} \sum_{i=1}^{N_{\text{manual}}} \mathbb{I}(\hat{y}_i = y_i), \quad F_1 = \frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$
- Tính **Micro/Macro-F1** cho bài toán trích xuất khía cạnh đa nhãn (Multi-label Aspect Extraction).

### 6.2. Phân tích lỗi định tính (Error Analysis - Rất quan trọng!)
Trong báo cáo, nhóm phải trích dẫn **3–5 câu đánh giá thực tế** mà Baseline hoặc LLM làm sai và giải thích nguyên nhân:
- **Vì sao Baseline sai?** Không hiểu cấu trúc phủ định kép (ví dụ: *"Not bad at all, nothing to complain about"* bị đếm từ `"not"`, `"bad"`, `"complain"` thành `negative`), không phủ hết từ vựng đa ngôn ngữ, không hiểu lời khen mỉa mai.
- **Vì sao LLM sai (hoặc khác nhãn người)?** Ranh giới mờ giữa `positive` (khen toàn bộ nhưng góp ý 1 chi tiết nhỏ) và `mixed`.

### 6.3. Ước tính chi phí và thời gian cho toàn thành phố
Giả sử thành phố có tổng cộng $N_{\text{total}}$ đánh giá trong `reviews.csv.gz`, độ dài trung bình mỗi đánh giá + prompt là $T_{\text{in}}$ input tokens và đầu ra JSON là $T_{\text{out}}$ output tokens:
$$\text{Total Cost (USD)} = \frac{N_{\text{total}} \times T_{\text{in}}}{10^6} \times P_{\text{in}} + \frac{N_{\text{total}} \times T_{\text{out}}}{10^6} \times P_{\text{out}}$$
(Áp bảng giá công bố của Gemini Flash / Flash-Lite và thảo luận phương án gộp nhiều đánh giá vào 1 prompt — Batching — để giảm chi phí token hệ thống).

---
> **CHUYỂN TIẾP QUY TRÌNH:** Sau khi đã có đầy đủ bảng dữ liệu sạch (`src/qa.py`), bảng chỉ số KPI (`src/kpi.py`) và kết quả đánh giá LLM (`src/llm.py`, `src/evaluate.py`), AI Agent hãy đọc tiếp tệp cuối cùng **`05_VISUALIZATION_STORYTELLING_AND_DEFENSE.md`** để sinh biểu đồ tự động (`src/viz.py`), viết báo cáo kỹ thuật (`reports/report.pdf`), hoàn thiện `AI_USAGE.md` và chuẩn bị vấn đáp.
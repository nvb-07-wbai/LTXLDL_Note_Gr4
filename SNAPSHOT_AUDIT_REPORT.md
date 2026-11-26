# SNAPSHOT_AUDIT_REPORT.md — Báo cáo Kiểm toán Dữ liệu Snapshot & Bản sao Google Drive

**Ngày kiểm toán:** `2026-11-26`  
**Repository BTL nguồn chuẩn:** `https://github.com/uet-iai-notebook-labs-2026/2627-LTXLDL-Airbnb-dse2049_2-nhom04`  
**Tag / Commit chuẩn:** `final` (`f69ebb195a375c2f7afbf1c75dfdc104be785614`)  
**Bản sao Google Drive (`2025-09-27`):** `https://drive.google.com/drive/folders/1-7ev-C2U4N4GbV1OPqZesCLeyvv70pSW`

---

## 1. Kết luận Xác minh Mốc Snapshot

Toàn bộ 4 mốc snapshot trong `configs/mexico-city.yaml` tại tag `final` đã được kiểm toán và xác minh thống nhất với dữ liệu đầu ra thực tế của BTL:

| Mốc | Định dạng ISO | Định dạng hiển thị | Trạng thái HTTP Inside Airbnb (`data.insideairbnb.com`) | Nguồn xác minh |
|---|---|---|---|---|
| `t1` (Q1) | `2025-09-27` | `27/09/2025` | `HTTP 403` (4/4 tệp) | Bản sao Google Drive + lọc đối chiếu `qa_report.csv` & `kpi_by_snapshot.csv` |
| `t2` (Q2) | `2025-12-29` | `29/12/2025` | `HTTP 200` (4/4 tệp) | Header Content-Length + `qa_report.csv` + `kpi_by_snapshot.csv` |
| `t3` (Q3) | `2026-03-30` | `30/03/2026` | `HTTP 200` (4/4 tệp) | Header Content-Length + `qa_report.csv` + `kpi_by_snapshot.csv` |
| `t4` (Q4) | `2026-06-15` | `15/06/2026` | `HTTP 200` (4/4 tệp) | Header Content-Length + `qa_report.csv` + `kpi_by_snapshot.csv` |

**Lưu ý:** Không có bất kỳ sự nhầm lẫn nào giữa `2025-09-27` với `2025-09-25` hay `download date`.

---

## 2. Kiểm toán Bản sao Google Drive (`2025-09-27`)

Đã tải trực tiếp 4 tệp từ thư mục Google Drive `1-7ev-C2U4N4GbV1OPqZesCLeyvv70pSW` (`2025-09-27`) về vùng tạm ngoài repository để kiểm tra dung lượng, SHA-256, schema, số dòng và chạy thử bộ lọc + QA của BTL:

| Tệp | Dung lượng (bytes) | SHA-256 | Số dòng (trừ header) | Thông tin xác minh chi tiết |
|---|---:|---|---:|---|
| `listings.csv.gz` | `14,513,553` | `af74baa1264a4bb54ad674fc0becc45180afbc4a0ab6e56028ff62941565f78f` | `27,051` | 79 cột; `last_scraped`: `2025-09-27 .. 2025-09-28`; `price` non-empty: `23,567 / 27,051` |
| `calendar.csv.gz` | `23,037,908` | `94c452de4f56836abe805966131a53944e7e7b6bd66d7837fd8fd8e34fb75cad` | `9,873,624` | 7 cột (`listing_id, date, available, price, adjusted_price, minimum_nights, maximum_nights`); `date`: `2025-09-27 .. 2026-09-27`; **`price` non-empty: `0 / 9,873,624`** |
| `reviews.csv.gz` | `141,542,027` | `6b58f4387a8a23be4b215adb8e4e2b8c8b2fbeb9ed75a82059cf93b76e61032b` | `1,454,740` | 6 cột (`listing_id, id, date, reviewer_id, reviewer_name, comments`); `date`: `2011-04-02 .. 2025-09-28` |
| `neighbourhoods.geojson` | `342,744` | `315d99aec896aa787e3f0db7a9baec873be2931ca561428785dc0da28bd71908` | `16` features | `FeatureCollection` đúng 16 quận hành chính CDMX |

### Kết quả Đối chiếu Chéo Drive vs Code BTL (`tag final`)
Khi chạy trực tiếp `src/filter_data_from_sheet.py` (`_load_assignments`, `_filter_raw_by_ids`) và `src/qa.py` (`apply_qa_rules`) trên bản sao Google Drive với bảng phân công Google Sheets (`UET.DSE2049 2`, `Nhóm 4`):
- `listings` sau lọc: **1.000 dòng** (`last_scraped`: `2025-09-27` = 261 dòng, `2025-09-28` = 739 dòng).
- `calendar` sau lọc: **365.000 dòng** (0 giá trị `price`).
- `reviews` sau lọc (theo `id` = `review_id`): **5.000 dòng**.
- Kết quả QA: **960/1.000** giá hợp lệ, `mean_price = 1535.15`, `median_price = 1159.5`, `IQR = 912.0`, `outliers = 20` — **khớp 100%** với `reports/qa_report.csv` và `data/processed/kpi_by_snapshot.csv` trong repository BTL `tag final`.

---

## 3. Bảng Kiểm toán 4 Snapshot (Listings / Calendar / Reviews / Schema)

| Snapshot | Listings (lọc) | Calendar (lọc) | Reviews (lọc) | Schema & Đặc điểm thực tế | Trạng thái |
|---|---:|---:|---:|---|---|
| `27/09/2025` (`t1`) | `1,000` | `365,000` | `5,000` | 79 cột listings; 960 có `price` (Med `1159.5` MXN); calendar 0 `price`; 7 ghost | Đã xác minh (Drive + BTL) |
| `29/12/2025` (`t2`) | `1,000` | `365,000`* | `5,000`* | **0/1.000 có `price`** (khuyết 100% từ nguồn raw); Occ `997`, RV `1,000`, Ghost `3` hợp lệ | Đã xác minh (`qa_report.csv`, `kpi_by_snapshot.csv`) |
| `30/03/2026` (`t3`) | `1,000` | `365,000`* | `5,000`* | 988 có `price` (Med `1767.75` MXN, 20 outliers); Occ `1,000`, RV `1,000`, Ghost `0` | Đã xác minh (`qa_report.csv`, `kpi_by_snapshot.csv`) |
| `15/06/2026` (`t4`) | `1,000` | `365,000`* | `5,000`* | 980 có `price` (Med `1940.0` MXN, 19 outliers); Occ `995`, RV `999`, Ghost `4`; 1.719.730 review toàn TP | Đã xác minh (`qa_report.csv`, `kpi_by_snapshot.csv`, `llm_cost_estimate.csv`) |

*\*Ghi chú phần chưa thể kiểm tra byte-by-byte cục bộ:* Thư mục `data/raw/` của repository BTL nằm trong `.gitignore` (chỉ có `.gitkeep` tại `2026-03-30` và `2026-06-15`), do đó số liệu `t2, t3, t4` được xác minh qua HTTP 200 Content-Length của Inside Airbnb và các bảng đầu ra đã commit trong `tag final` (`qa_report.csv`, `kpi_by_snapshot.csv`, `kpi_by_area.csv`, `kpi_by_neighbourhood.csv`, `kpi_by_listing.csv`, `llm_cost_estimate.csv`).

---

## 4. Các Điểm Xác minh Kỹ thuật BTL
1. **Model LLM:** Thống nhất 100% là `gemini-3.5-flash-lite` (`configs/mexico-city.yaml`, `src/llm.py`, `reports/llm_cost_estimate.csv`), không phải `gemini-2.5`.
2. **Lọc Reviews:** Lọc theo `id` (`review_id`), không phải `listing_id` (`src/filter_data_from_sheet.py:L218-L220`).
3. **Biểu đồ `figures/*.png`:** Toàn bộ 8/8 tệp PNG trong `public/figures/` của website trùng khớp 100% SHA-256 với `figures/*.png` tại `tag final`.

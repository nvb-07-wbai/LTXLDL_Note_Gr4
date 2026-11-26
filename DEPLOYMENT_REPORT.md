# DEPLOYMENT_REPORT.md — Báo cáo Build & Deploy Website LTXLDL Note & Viva Arena

## A. Nguyên nhân ban đầu

1. **Lỗi Production Build (TypeScript `tsc -b`):**
   - Run thất bại ban đầu: `Deploy to GitHub Pages` (run ID `45587228155`, commit `b42e7a6`, `conclusion: failure`).
   - Kiểm tra cục bộ bằng `npx tsc --noEmit` phát hiện lỗi `TS2322`:
     - `src/data/viva/enrichBase.ts` (dòng 213, 640, 1121): dùng giá trị `'Filter'` chưa có trong `VivaTopic`.
     - `src/data/viva/theoryBank.ts` (nhiều dòng): dùng giá trị `'Giải thích'` và `'Vận dụng'` chưa có trong `VivaQuestionType`.
   - Do `tsconfig.json` cấu hình `"include": ["src"]` và `package.json` chạy `tsc -b && vite build`, lỗi type ở các file dữ liệu mới làm toàn bộ production build thất bại.

2. **Lỗi Deploy trên GitHub Pages (Blank White Screen trước khi chuyển Source):**
   - Ở commit `fd05a03` và `ac05148`, workflow `Deploy to GitHub Pages` chạy thành công, nhưng `pages build and deployment` (mặc định từ branch `main`) vẫn chạy song song và ghi đè bằng `index.html` gốc (`/src/main.tsx` → 404).
   - Sau khi cấu hình **Settings → Pages → Source** sang **GitHub Actions** và triển khai từ commit `4e9784d` (run `45596490243`), `pages build and deployment` không còn chạy nữa và bản build `./dist/` đã được xuất bản chính thức.

## B. Những thay đổi đã thực hiện

- **`src/types/index.ts`:**
  - Bổ sung `'Filter'` vào union type `VivaTopic`.
  - Bổ sung `'Giải thích'` và `'Vận dụng'` vào union type `VivaQuestionType`.
- **Commit & Push trên nhánh `main`:**
  - `fd05a03`: `fix: resolve production build errors and add extended viva/codebase data`
  - `ac05148`: `docs: add deployment diagnosis and verification report`
  - `4e9784d`: `feat: connect 491 viva questions, upgrade VivaArena, add PROJECT_HANDOVER`
- **Workflow & Cấu hình GitHub Pages:**
  - `.github/workflows/deploy.yml`: sử dụng `node-version: "22"`, `npm ci`, `npm run build`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` (`path: ./dist`), `actions/deploy-pages@v4`, `workflow_dispatch`, permissions `contents: read`, `pages: write`, `id-token: write`.
  - `vite.config.ts`: `base: '/LTXLDL_Note_Gr4/'`, `outDir: 'dist'`.
  - `App.tsx` & `public/404.html`: `HashRouter` kết hợp `404.html` redirect đường dẫn con về `/LTXLDL_Note_Gr4/#/...`.

## C. Kết quả kiểm thử

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Dependency installation | Passed | `node_modules` đồng bộ với `package-lock.json` |
| Type-check (`npx tsc --noEmit`) | Passed | 0 lỗi |
| Production build (`npm run build`) | Passed | `tsc -b && vite build` thành công, xuất `dist/` |
| Lint | Not configured | Không có script `lint` trong `package.json` |
| Tests | Not configured | Không có test runner trong `package.json` |
| GitHub Actions (`Deploy to GitHub Pages`) | Passed | Run `45596490243` trên commit `4e9784d` (`completed / success`) |
| GitHub Pages deployment | Passed | Xuất bản trực tiếp từ GitHub Actions artifact `./dist/` |
| Homepage | Passed | `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/` tải HTTP 200, hiển thị đầy đủ tiếng Việt |
| Subpage routing | Passed | Kiểm tra đủ 10 hash routes (`#/theory`..`#/glossary`), hard reload `#/pipeline` (HTTP 200), và `404.html` redirect `/LTXLDL_Note_Gr4/viva` → `#/viva` |
| Asset loading | Passed | JS (`index-D5rouSMP.js`), CSS (`index-Cc5iaHLS.css`), Google Fonts, và cả 8 PNG trong `/LTXLDL_Note_Gr4/figures/*.png` tải HTTP 200; 0 lỗi console |
| Mobile (`375×812`) | Passed | Không tràn ngang (`369px`), menu mobile mở/đóng và điều hướng bình thường |
| Laptop/Desktop (`1280×800`) | Passed | Sidebar + nội dung hiển thị đúng, Light/Dark mode hoạt động |

## D. Thông tin deployment

- **Repository:** `https://github.com/nvb-07-wbai/LTXLDL_Note_Gr4`
- **Branch:** `main`
- **Commit SHA đã xác minh live:** `4e9784d`
- **Workflow run:** `45596490243` (`Deploy to GitHub Pages` — `completed / success`)
- **Deployment status:** Thành công (Live)
- **Website URL:** `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`
- **Thời điểm kiểm tra live:** `2026-11-26T09:58+07:00`
- **Các vấn đề còn tồn tại:** Không có.

## E. Checklist Nghiệm thu

- [x] Đã tìm ra nguyên nhân lỗi ban đầu.
- [x] Đã sửa lỗi source/configuration cần thiết.
- [x] Production build thành công.
- [x] GitHub Actions hoàn tất.
- [x] GitHub Pages deployment thành công.
- [x] Website truy cập được bằng URL chính thức.
- [x] CSS/JS/assets được tải đúng.
- [x] Các trang chính hoạt động.
- [x] Routing và refresh hoạt động.
- [x] Giao diện mobile hoạt động.
- [x] Giao diện laptop hoạt động.
- [x] Nội dung và chức năng học tập được bảo toàn.
- [x] Không có secrets bị commit.
- [x] Không chỉnh sửa repository BTL.
- [x] Đã tạo báo cáo deployment.

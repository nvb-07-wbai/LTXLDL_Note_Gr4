# DEPLOYMENT_REPORT.md — Báo cáo Build & Deploy Website LTXLDL Note & Viva Arena

## A. Nguyên nhân ban đầu

1. **Lỗi Production Build (TypeScript `tsc -b`):**
   - Run thất bại ban đầu: `Deploy to GitHub Pages` (run ID `45587228155`, commit `b42e7a6`, `conclusion: failure`).
   - Kiểm tra cục bộ bằng `npx tsc --noEmit` phát hiện lỗi `TS2322`:
     - `src/data/viva/enrichBase.ts` (dòng 213, 640, 1121): dùng giá trị `'Filter'` chưa có trong `VivaTopic`.
     - `src/data/viva/theoryBank.ts` (nhiều dòng): dùng giá trị `'Giải thích'` và `'Vận dụng'` chưa có trong `VivaQuestionType`.
   - Do `tsconfig.json` cấu hình `"include": ["src"]` và `package.json` chạy `tsc -b && vite build`, lỗi type ở các file dữ liệu mới làm toàn bộ production build thất bại.

2. **Lỗi Deploy trên GitHub Pages (Blank White Screen):**
   - Sau khi sửa lỗi build và push commit `fd05a03`, workflow `Deploy to GitHub Pages` (run ID `45594385109`) đã chạy thành công.
   - Tuy nhiên, trên cùng commit `fd05a03`, GitHub cũng tự động kích hoạt workflow `pages build and deployment` (run ID `45594386265`, `on: dynamic` trên nhánh `main`).
   - Truy cập `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/` trả về HTTP 200 nhưng hiển thị màn hình trắng vì GitHub Pages đang phục vụ file `index.html` gốc của mã nguồn (`<script type="module" src="/src/main.tsx"></script>` -> 404), thay vì artifact `./dist/index.html` đã được Vite build.
   - **Nguyên nhân gốc:** Cấu hình **Settings → Pages → Source** trên GitHub repository đang đặt là **Deploy from a branch (`main`)** thay vì **GitHub Actions**. Thao tác đổi cấu hình này yêu cầu quyền Admin của repository (`gh` CLI và trình duyệt hiện tại chưa đăng nhập tài khoản có quyền Admin).

## B. Những thay đổi đã thực hiện

- **`src/types/index.ts`:**
  - Bổ sung `'Filter'` vào union type `VivaTopic`.
  - Bổ sung `'Giải thích'` và `'Vận dụng'` vào union type `VivaQuestionType`.
- **Commit & Push thay đổi đang có trong working tree:**
  - Commit `fd05a03` trên nhánh `main` (`fix: resolve production build errors and add extended viva/codebase data`) gồm 31 file thay đổi (bao gồm các file cập nhật responsive, `CodeBlock.tsx`, `CommandSearch.tsx`, `PipelinePage.tsx`, `useStudyTracker.ts`, `AUDIT_REPORT.md`, các ngân hàng `codebase/` và `viva/`).
- **Tài liệu chẩn đoán & báo cáo:**
  - Tạo `DEPLOYMENT_DIAGNOSIS.md` và `DEPLOYMENT_REPORT.md`.
- **Workflow & Base path:**
  - Kiểm tra `.github/workflows/deploy.yml`: đã cấu hình đúng `node-version: "22"`, `npm ci`, `npm run build`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` (`path: ./dist`), `actions/deploy-pages@v4`, `workflow_dispatch`, và permissions tối thiểu (`contents: read`, `pages: write`, `id-token: write`).
  - Kiểm tra `vite.config.ts`: đã cấu hình đúng `base: '/LTXLDL_Note_Gr4/'` và `outDir: 'dist'`.
  - Kiểm tra `App.tsx` & `public/404.html`: sử dụng `HashRouter` và `404.html` redirect về `/LTXLDL_Note_Gr4/#/...`.

## C. Kết quả kiểm thử

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Dependency installation | Passed | `node_modules` đầy đủ, `package-lock.json` đồng bộ |
| Type-check (`npx tsc --noEmit`) | Passed | 0 lỗi sau khi cập nhật `src/types/index.ts` |
| Production build (`npm run build`) | Passed | `tsc -b && vite build` thành công, xuất `dist/` (2046 modules) |
| Lint | Not configured | Không có script `lint` trong `package.json` |
| Tests | Not configured | Không có test runner trong `package.json` |
| GitHub Actions (`Deploy to GitHub Pages`) | Passed | Run `45594385109` trên commit `fd05a03` thành công |
| GitHub Pages deployment (Live URL) | Failed (Blocked by Admin Setting) | Website trả về 200 nhưng phục vụ `index.html` thô từ branch `main` do Pages Source chưa chuyển sang **GitHub Actions** |
| Local Production Preview (`vite preview`) | Passed | Kiểm thử thực tế trên `http://127.0.0.1:4173/LTXLDL_Note_Gr4/`: 0 lỗi console, 0 lỗi 404 |
| Homepage (Local Preview) | Passed | Hiển thị đầy đủ giao diện tiếng Việt, CSS & font tải thành công |
| Subpage routing & Reload (Local Preview) | Passed | Kiểm tra 10 route (`#/theory`..`#/glossary`) + hard reload `#/pipeline`, `#/viva` hoạt động bình thường |
| Asset loading (Local Preview) | Passed | Cả 8 biểu đồ PNG trong `/LTXLDL_Note_Gr4/figures/*.png` tải HTTP 200 |
| Mobile (`375×812`, Local Preview) | Passed | Không tràn ngang (`0` phần tử overflow), menu mobile hoạt động |
| Laptop/Desktop (`1280×800`, Local Preview) | Passed | Sidebar + nội dung hiển thị đúng, hỗ trợ Light/Dark mode |

## D. Thông tin deployment

- **Repository:** `https://github.com/nvb-07-wbai/LTXLDL_Note_Gr4`
- **Branch:** `main`
- **Commit SHA:** `fd05a03` (commit sửa build & push)
- **Workflow runs trên `fd05a03`:**
  - `Deploy to GitHub Pages` (`45594385109`): `completed / success`
  - `pages build and deployment` (`45594386265`): `completed / success` (đây là workflow mặc định từ branch `main` đang ghi đè nội dung live)
- **Deployment status:** Chờ thao tác quyền Admin trên GitHub Pages Settings
- **Website URL:** `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`
- **Thời điểm kiểm tra:** `2026-11-25T17:28+07:00`
- **Thao tác còn thiếu (cần quyền Admin repository):**
  1. Mở `https://github.com/nvb-07-wbai/LTXLDL_Note_Gr4/settings/pages`
  2. Tại mục **Build and deployment → Source**, chuyển từ **Deploy from a branch** sang **GitHub Actions**.
  3. Vào tab **Actions** → chọn workflow **Deploy to GitHub Pages** → nhấn **Run workflow** (hoặc re-run run `45594385109`) để xuất bản bản build `./dist/` lên `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/`.

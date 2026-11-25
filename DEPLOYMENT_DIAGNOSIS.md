# DEPLOYMENT_DIAGNOSIS.md — Chẩn đoán Build & Deploy Website LTXLDL Note & Viva Arena

## 1. Kiến trúc website

- **Framework:** React 19 (`react` ^19.0.0, `react-dom` ^19.0.0) + TypeScript (`~5.7.2`)
- **Build tool:** Vite 6 (`vite` ^6.0.11, `@vitejs/plugin-react` ^4.3.4)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite` ^4.0.0) + KaTeX (`katex` ^0.16.11) + Lucide icons (`lucide-react` ^0.469.0) + Recharts (`recharts` ^2.15.1)
- **Routing:** `HashRouter` (`react-router-dom` ^7.1.5) với các route `/`, `/roadmap`, `/theory`, `/project`, `/pipeline`, `/kpi-qa`, `/llm-baseline`, `/storytelling`, `/viva`, `/flashcards`, `/quiz`, `/glossary`, `/revision`, kèm `public/404.html` hỗ trợ redirect về `/LTXLDL_Note_Gr4/#/`.
- **Base path:** `base: '/LTXLDL_Note_Gr4/'` trong `vite.config.ts`.
- **Output directory:** `dist/` (`outDir: 'dist'`).

## 2. Quy trình build hiện tại

- Lệnh build trong `package.json`: `npm run build` -> `tsc -b && vite build`.
- TypeScript config (`tsconfig.json`): `"strict": true`, `"include": ["src"]`.

## 3. Quy trình deploy hiện tại

- Workflow GitHub Actions tại `.github/workflows/deploy.yml`:
  - Trigger: `push` lên `main` và `workflow_dispatch`.
  - Job `build`: checkout (`actions/checkout@v4`), Node.js 22 (`actions/setup-node@v4`), `npm ci`, `npm run build`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` (upload `./dist`).
  - Job `deploy`: `actions/deploy-pages@v4` trên environment `github-pages`.

## 4. Lỗi được phát hiện & Nguyên nhân gốc

### Lỗi 1: Production build thất bại do lỗi TypeScript (`tsc -b`)
- **Bằng chứng:** `npx tsc --noEmit` báo hàng loạt lỗi `TS2322` tại:
  - `src/data/viva/enrichBase.ts` (dòng 213, 640, 1121): `Type '"Filter"' is not assignable to type 'VivaTopic'`.
  - `src/data/viva/theoryBank.ts` (nhiều dòng): `Type '"Giải thích"' is not assignable to type 'VivaQuestionType'` và `Type '"Vận dụng"' is not assignable to type 'VivaQuestionType'`.
- **Nguyên nhân gốc:** Các tệp ngân hàng câu hỏi mới (`theoryBank.ts`, `enrichBase.ts`) sử dụng các giá trị `VivaTopic` (`'Filter'`) và `VivaQuestionType` (`'Giải thích'`, `'Vận dụng'`) chưa được khai báo trong union types ở `src/types/index.ts`. Vì `tsconfig.json` có `"include": ["src"]`, `tsc -b` kiểm tra toàn bộ `src/` và làm build thất bại.

### Lỗi 2: Website trên GitHub Pages hiển thị màn hình trắng (Blank White Screen) dù workflow thành công
- **Bằng chứng:**
  - Truy cập `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/` trả về HTTP 200 nhưng nội dung HTML là `index.html` gốc của mã nguồn (`<script type="module" src="/src/main.tsx"></script>`), khiến trình duyệt request `/src/main.tsx` và nhận lỗi 404.
  - Danh sách GitHub Actions runs cho thấy **hai** workflow cùng chạy trên commit `fd05a03`:
    1. `Deploy to GitHub Pages` (`.github/workflows/deploy.yml`)
    2. `pages build and deployment` (`pages-build-deployment`, `on: dynamic` trên nhánh `main`)
- **Nguyên nhân gốc:** Cấu hình **GitHub Pages Source** trong `Settings -> Pages` của repository đang đặt ở chế độ **Deploy from a branch (`main` / root)** thay vì **GitHub Actions**. Do đó, workflow tự động `pages-build-deployment` của GitHub vẫn chạy và xuất bản mã nguồn thô từ root nhánh `main` thay vì artifact `./dist/` do `deploy.yml` build.

## 5. Giải pháp dự kiến

1. **Sửa lỗi TypeScript:** Bổ sung `'Filter'` vào `VivaTopic` và `'Giải thích' | 'Vận dụng'` vào `VivaQuestionType` trong `src/types/index.ts`.
2. **Kiểm tra local production build:** Chạy `npx tsc --noEmit` và `npm run build` để đảm bảo xuất ra `dist/` sạch lỗi.
3. **Commit & Push:** Đưa toàn bộ thay đổi hợp lệ lên `origin/main` (commit `fd05a03`).
4. **Cấu hình GitHub Pages:** Chuyển **Source** trong `Repository Settings -> Pages` sang **GitHub Actions** (thao tác này cần quyền Admin trên GitHub).
5. **Xác minh:** Kiểm tra lại `https://nvb-07-wbai.github.io/LTXLDL_Note_Gr4/` sau khi cấu hình GitHub Pages hoàn tất.

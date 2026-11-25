import type { NavRouteId } from '../types';

export interface NavItem {
  id: NavRouteId;
  path: string;
  label: string;
  shortLabel: string;
  section: 'workspace' | 'project' | 'practice';
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    path: '/',
    label: 'Overview',
    shortLabel: 'Overview',
    section: 'workspace',
    description: 'Bảng điều khiển tiến độ, sẵn sàng vấn đáp và câu hỏi trong ngày',
  },
  {
    id: 'roadmap',
    path: '/roadmap',
    label: 'Study Roadmap',
    shortLabel: 'Roadmap',
    section: 'workspace',
    description: 'Lộ trình ôn tập 4 chặng từ nền tảng Python tới bảo vệ vấn đáp 90 giây',
  },
  {
    id: 'theory',
    path: '/theory',
    label: 'Theory Notes',
    shortLabel: 'Theory',
    section: 'workspace',
    description: 'Hệ thống lý thuyết 13 bài học chính thức (Bài 1–8, 10–14) gắn với BTL',
  },
  {
    id: 'project',
    path: '/project',
    label: 'Project Explorer',
    shortLabel: 'Project',
    section: 'project',
    description: 'Toàn cảnh BTL Inside Airbnb CDMX, đề bài, chính sách AI và kiểm toán code',
  },
  {
    id: 'pipeline',
    path: '/pipeline',
    label: 'Data Pipeline',
    shortLabel: 'Pipeline',
    section: 'project',
    description: 'Khám phá luồng 8 bước + Code Playground đọc hiểu src/*.py',
  },
  {
    id: 'kpi-qa',
    path: '/kpi-qa',
    label: 'KPI & QA',
    shortLabel: 'KPI & QA',
    section: 'project',
    description: '8 quy tắc gắn cờ QA (qa_report.csv) và hệ thống KPI đa cấp (src/kpi.py)',
  },
  {
    id: 'llm-baseline',
    path: '/llm-baseline',
    label: 'LLM & Baseline',
    shortLabel: 'LLM',
    section: 'project',
    description: 'Gemini 3.5 Flash Lite, Pydantic Schema, Regex Baseline, Evaluation & Chi phí',
  },
  {
    id: 'storytelling',
    path: '/storytelling',
    label: 'Data Storytelling',
    shortLabel: 'Stories',
    section: 'project',
    description: '5 câu chuyện dữ liệu SECTUR CDMX, 8 biểu đồ và chuyên mục phản biện',
  },
  {
    id: 'viva',
    path: '/viva',
    label: 'Viva Arena',
    shortLabel: 'Viva Arena',
    section: 'practice',
    description: 'Phòng luyện vấn đáp 10 phút / 5 câu / 90 giây (Practice & Strict Mode)',
  },
  {
    id: 'flashcards',
    path: '/flashcards',
    label: 'Flashcards',
    shortLabel: 'Flashcards',
    section: 'practice',
    description: 'Thẻ ghi nhớ chủ động theo từng bài học và mô-đun BTL',
  },
  {
    id: 'quiz',
    path: '/quiz',
    label: 'Quiz',
    shortLabel: 'Quiz',
    section: 'practice',
    description: '9 dạng bài tập tương tác: đọc code, tìm lỗi, ghép công thức, phản biện',
  },
  {
    id: 'glossary',
    path: '/glossary',
    label: 'Glossary',
    shortLabel: 'Glossary',
    section: 'practice',
    description: 'Từ điển thuật ngữ Anh–Việt A–Z kèm ví dụ ứng dụng trong dự án',
  },
  {
    id: 'revision',
    path: '/revision',
    label: 'Quick Revision',
    shortLabel: 'Revision',
    section: 'practice',
    description: 'Ôn tập cấp tốc: công thức, hàm cốt lõi, 30 câu hỏi vàng & checklist',
  },
];

export const ROUTE_MAP: Record<NavRouteId, NavItem> = Object.fromEntries(
  NAV_ITEMS.map((item) => [item.id, item])
) as Record<NavRouteId, NavItem>;

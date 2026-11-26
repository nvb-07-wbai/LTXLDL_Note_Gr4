import { VIVA_QUESTIONS_PART_1 } from './part1';
import { VIVA_QUESTIONS_PART_2 } from './part2';
import { VIVA_BASE_ENRICHMENT } from './enrichBase';
import { VIVA_THEORY_BANK } from './theoryBank';
import { VIVA_CODE_BANK } from './codeBank';
import { VIVA_TRACE_BANK } from './traceBank';
import { VIVA_SCENARIO_BANK } from './scenarioBank';
import { VIVA_CRITIQUE_BANK } from './critiqueBank';
import { VIVA_STORY_BANK } from './storyBank';
import type { VivaQuestion, VivaTopic } from '../../types';

const BASE_ENRICHED: VivaQuestion[] = [
  ...VIVA_QUESTIONS_PART_1,
  ...VIVA_QUESTIONS_PART_2,
].map((q) => ({
  ...q,
  ...(VIVA_BASE_ENRICHMENT[q.id] ?? {}),
}));

export const ALL_VIVA_QUESTIONS: VivaQuestion[] = [
  ...BASE_ENRICHED,
  ...VIVA_THEORY_BANK,
  ...VIVA_CODE_BANK,
  ...VIVA_TRACE_BANK,
  ...VIVA_SCENARIO_BANK,
  ...VIVA_CRITIQUE_BANK,
  ...VIVA_STORY_BANK,
];

export const VIVA_CATEGORIES = [
  { id: 'A', label: 'A. Python, NumPy, pandas' },
  { id: 'B', label: 'B. CSV, API, SQL, DuckDB' },
  { id: 'C', label: 'C. String, Regex, Datetime' },
  { id: 'D', label: 'D. Data Cleaning & QA' },
  { id: 'E', label: 'E. LLM, Baseline, Evaluation' },
  { id: 'F', label: 'F. KPI & Công thức' },
  { id: 'G', label: 'G. Visualization' },
  { id: 'H', label: 'H. Data Storytelling' },
  { id: 'I', label: 'I. Đọc hiểu Source Code' },
  { id: 'J', label: 'J. Kiến trúc & Toàn Pipeline' },
] as const;

export const VIVA_TOPICS: VivaTopic[] = [
  'Python',
  'NumPy',
  'pandas',
  'File I/O',
  'API',
  'SQL',
  'Regex',
  'Datetime',
  'Data Cleaning',
  'QA',
  'LLM',
  'Baseline',
  'Evaluation',
  'KPI',
  'Visualization',
  'Storytelling',
  'Architecture',
  'Code Trace',
];

export const VIVA_LEVELS = [
  { level: 1, label: 'Cấp 1 – Nhận biết' },
  { level: 2, label: 'Cấp độ 2 – Giải thích' },
  { level: 3, label: 'Cấp độ 3 – Truy vết code' },
  { level: 4, label: 'Cấp độ 4 – Vận dụng' },
  { level: 5, label: 'Cấp độ 5 – Phản biện' },
  { level: 6, label: 'Cấp độ 6 – Câu hỏi gài' },
] as const;

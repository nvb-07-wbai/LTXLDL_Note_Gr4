import { VIVA_QUESTIONS_PART_1 } from './part1';
import { VIVA_QUESTIONS_PART_2 } from './part2';
import { VIVA_BASE_ENRICHMENT } from './enrichBase';
import { VIVA_THEORY_BANK } from './theoryBank';
import { VIVA_CODE_BANK } from './codeBank';
import { VIVA_TRACE_BANK } from './traceBank';
import type { VivaQuestion } from '../../types';

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

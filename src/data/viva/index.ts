import { VIVA_QUESTIONS_PART_1 } from './part1';
import { VIVA_QUESTIONS_PART_2 } from './part2';
import type { VivaQuestion } from '../../types';

export const ALL_VIVA_QUESTIONS: VivaQuestion[] = [
  ...VIVA_QUESTIONS_PART_1,
  ...VIVA_QUESTIONS_PART_2,
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

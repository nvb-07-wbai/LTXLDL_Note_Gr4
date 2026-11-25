export type NavRouteId =
  | 'overview'
  | 'roadmap'
  | 'theory'
  | 'project'
  | 'pipeline'
  | 'kpi-qa'
  | 'llm-baseline'
  | 'storytelling'
  | 'viva'
  | 'flashcards'
  | 'quiz'
  | 'glossary'
  | 'revision';

export interface LessonTerm {
  term: string;
  meaning: string;
}

export interface LessonItem {
  id: string;
  number: string; // e.g., "Bài 1"
  group: 'Nhóm 1 – Nền tảng lập trình & xử lý dữ liệu' | 'Nhóm 2 – Kết nối & biến đổi dữ liệu' | 'Nhóm 3 – Làm sạch & phân tích hiện đại' | 'Nhóm 4 – Trực quan hóa & tư duy phân tích';
  title: string;
  subtitle: string;
  relevance: 'Cốt lõi BTL' | 'Liên quan trực tiếp' | 'Nền tảng quan trọng';
  objectives: string[];
  coreConcepts: string[];
  terms: LessonTerm[];
  essence: string;
  formulas?: { label: string; latex: string; note?: string }[];
  pythonExample: { title: string; code: string; output?: string };
  handCalculation: { prompt: string; steps: string[]; answer: string };
  airbnbApplication: string;
  commonPitfalls: string[];
  selfCheckQuestions: { q: string; a: string }[];
  vivaQuestions: { q: string; a: string }[];
  summary: string[];
}

export interface PipelineStage {
  id: string;
  order: number;
  name: string;
  shortName: string;
  goal: string;
  inputs: string[];
  outputs: string[];
  filePath: string;
  mainFunctions: string[];
  libraries: string[];
  mechanism: string[];
  rationale: string;
  risksIfWrong: string[];
  verification: string;
  theoryRefs: string[];
  vivaQuestions: string[];
  codeSnippet: { title: string; lines: string; code: string; annotations: { label: string; detail: string }[] };
}

export interface QARuleDoc {
  ruleId: string;
  ruleName: string;
  category: string;
  targetColumn: string;
  condition: string;
  problem: string;
  implementation: string;
  action: string;
  kpiImpact: string;
  rationale: string;
  edgeCaseRisk: string;
  snapshotResults: { snapshot: string; rowsAffected: number; before: string; after: string }[];
  codeSnippet: string;
}

export interface KPIDoc {
  id: string;
  name: string;
  shortName: string;
  level: 'Listing-level' | 'Area-level' | 'Snapshot-level' | 'Neighbourhood-level';
  meaning: string;
  businessObjective: string;
  formulaLatex: string;
  unit: string;
  inputVars: string[];
  fileAndFunc: string;
  handExample: { title: string; input: string; calc: string; result: string };
  actualResults: string[];
  limitations: string[];
}

export interface StoryItem {
  id: string;
  title: string;
  theme: string;
  context: string;
  businessQuestion: string;
  keyInsight: string;
  figureFile: string;
  figureTitle: string;
  figureUnit: string;
  sampleSize: string;
  dataSource: string;
  kpiFormula?: string;
  chartReadingGuide?: string;
  keyMetrics: { label: string; value: string; detail: string }[];
  methodExplanation: string;
  conclusion: string;
  stakeholderImplication: string;
  limitations: string[];
  defenseQuestions?: { q: string; a: string }[];
}

export interface CritiqueScenario {
  id: string;
  question: string;
  trapType: string;
  shortAnswer: string;
  argument: string;
  evidenceToCheck: string[];
}

export type VivaCategory =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

export type VivaDifficulty = 'Cơ bản' | 'Vận dụng' | 'Nâng cao';

export type VivaLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type VivaBucket =
  | 'theory'
  | 'code'
  | 'trace'
  | 'scenario'
  | 'critique'
  | 'storytelling';

export type VivaTopic =
  | 'Python'
  | 'NumPy'
  | 'pandas'
  | 'File I/O'
  | 'API'
  | 'SQL'
  | 'Regex'
  | 'Datetime'
  | 'Data Cleaning'
  | 'QA'
  | 'LLM'
  | 'Baseline'
  | 'Evaluation'
  | 'KPI'
  | 'Visualization'
  | 'Storytelling'
  | 'Architecture'
  | 'Code Trace'
  | 'Filter';

export interface FollowUpQA {
  q: string;
  a: string;
}

export type VivaQuestionType =
  | 'Kiến thức'
  | 'Tại sao'
  | 'Đọc hiểu code'
  | 'Truy vết'
  | 'Tình huống'
  | 'Phản biện'
  | 'Phân tích kết quả'
  | 'Câu hỏi gài'
  | 'Giải thích'
  | 'Vận dụng';

export interface VivaQuestion {
  id: string;
  category: VivaCategory;
  categoryLabel: string;
  bucket?: VivaBucket;
  topics?: VivaTopic[];
  level?: VivaLevel;
  levelLabel?: string;
  difficulty: VivaDifficulty;
  qType: VivaQuestionType;
  evaluationGoal?: string;
  question: string;
  hint?: string;
  codeBlock?: { file: string; lines?: string; code: string };
  codeLocation?: string;
  figureRef?: string;
  quickAnswer: string;
  explanation: string;
  projectLink: string;
  proofExample: string;
  followUpQuestions: string[];
  followUpQA?: FollowUpQA[];
  commonMistakes: string[];
  relatedFiles: string[];
}

export interface CodeFunctionDoc {
  id: string;
  file: string;
  name: string;
  kind: 'function' | 'class';
  lineStart: number;
  lineEnd: number;
  signature: string;
  purpose: string;
  flow: string[];
  input: string;
  output: string;
  libraries: string[];
  example: string;
  usage: string;
  potentialBugs: string[];
  viva: { q: string; a: string }[];
  code: string;
}

export interface CodeTraceStep {
  lineNumber: number;
  highlightLines: number[];
  variables: { name: string; value: string; dtype?: string }[];
  dfSummary?: string;
  explanation: string;
}

export interface CodeTraceScenario {
  id: string;
  title: string;
  file: string;
  lineRange: string;
  startLine: number;
  code: string;
  predictQuestion: string;
  predictOptions: string[];
  correctOptionIndex: number;
  predictExplanation: string;
  steps: CodeTraceStep[];
  whatIfVariants: { condition: string; result: string }[];
}

export interface ModuleDependencyNode {
  id: string;
  file: string;
  order: number;
  role: string;
  callsTo: string[];
  calledBy: string[];
  imports: string[];
  keyFunctions: string[];
  dataIn: string[];
  dataOut: string[];
  commonErrors: string[];
  requiredKnowledge: string[];
}

export interface FlashcardItem {
  id: string;
  topic: string;
  front: string;
  back: string;
  example: string;
  sourceRef: string;
}

export type QuizType =
  | 'single'
  | 'multi'
  | 'tf'
  | 'fill'
  | 'order'
  | 'code-output'
  | 'bug-find'
  | 'match'
  | 'critique';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  topic: string;
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctIndices?: number[];
  correctText?: string;
  orderItems?: string[]; // in correct order; UI shuffles them
  matchPairs?: { left: string; right: string }[];
  explanation: string;
  wrongReasons: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  viExplanation: string;
  significance: string;
  example: string;
  projectApp: string;
  relatedLesson: string;
}

export interface VivaAttemptRecord {
  id: string;
  timestamp: string;
  mode: 'practice' | 'strict';
  totalScore: number;
  maxScore: number;
  questionIds: string[];
  scoresByQuestion: Record<string, number>;
  weakCategories: string[];
}

export interface StudyProgressState {
  completedLessons: string[];
  rememberedFlashcards: string[];
  wrongFlashcards: string[];
  completedQuizIds: string[];
  correctQuizIds: string[];
  practicedVivaIds: string[];
  vivaHistory: VivaAttemptRecord[];
  checkedRevisionItems: string[];
  reviewedFunctions?: string[];
  completedTraces?: string[];
  lastVisitedRoute: NavRouteId;
  lastVisitedLabel: string;
  lastStudiedAt: string;
}

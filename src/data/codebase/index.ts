import { CODEBASE_FUNCTIONS_PART_1 } from './functionsPart1';
import { CODEBASE_FUNCTIONS_PART_2 } from './functionsPart2';
import { CODE_TRACE_SCENARIOS } from './codeTraceScenarios';
import { MODULE_DEPENDENCY_GRAPH } from './dependencyGraph';

export const ALL_CODEBASE_FUNCTIONS = [
  ...CODEBASE_FUNCTIONS_PART_1,
  ...CODEBASE_FUNCTIONS_PART_2,
];

export {
  CODEBASE_FUNCTIONS_PART_1,
  CODEBASE_FUNCTIONS_PART_2,
  CODE_TRACE_SCENARIOS,
  MODULE_DEPENDENCY_GRAPH,
};

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WorkspaceLayout } from './layouts/WorkspaceLayout';
import { useTheme } from './hooks/useTheme';
import { useStudyTracker } from './hooks/useStudyTracker';

import { OverviewPage } from './pages/OverviewPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { TheoryPage } from './pages/TheoryPage';
import { ProjectPage } from './pages/ProjectPage';
import { PipelinePage } from './pages/PipelinePage';
import { KpiQaPage } from './pages/KpiQaPage';
import { LlmBaselinePage } from './pages/LlmBaselinePage';
import { StorytellingPage } from './pages/StorytellingPage';
import { VivaArenaPage } from './pages/VivaArenaPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { QuickRevisionPage } from './pages/QuickRevisionPage';

export default function App() {
  const { dark, toggleTheme } = useTheme();
  const {
    state,
    toggleLessonComplete,
    markFlashcard,
    recordQuizAnswer,
    recordVivaAttempt,
    toggleVivaQuestionPracticed,
    toggleRevisionCheck,
    setLastVisited,
    resetProgress,
  } = useStudyTracker();

  return (
    <HashRouter>
      <WorkspaceLayout
        dark={dark}
        toggleTheme={toggleTheme}
        progress={state}
        onVisitRoute={setLastVisited}
      >
        <Routes>
          <Route
            path="/"
            element={<OverviewPage progress={state} onResetProgress={resetProgress} />}
          />
          <Route path="/roadmap" element={<RoadmapPage progress={state} />} />
          <Route
            path="/theory"
            element={
              <TheoryPage
                completedLessons={state.completedLessons}
                onToggleComplete={toggleLessonComplete}
              />
            }
          />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/kpi-qa" element={<KpiQaPage />} />
          <Route path="/llm-baseline" element={<LlmBaselinePage />} />
          <Route path="/storytelling" element={<StorytellingPage />} />
          <Route
            path="/viva"
            element={
              <VivaArenaPage
                progress={state}
                onRecordAttempt={recordVivaAttempt}
                onTogglePracticed={toggleVivaQuestionPracticed}
              />
            }
          />
          <Route
            path="/flashcards"
            element={
              <FlashcardsPage
                rememberedIds={state.rememberedFlashcards}
                wrongIds={state.wrongFlashcards}
                onMark={markFlashcard}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <QuizPage
                completedQuizIds={state.completedQuizIds}
                correctQuizIds={state.correctQuizIds}
                onRecordAnswer={recordQuizAnswer}
              />
            }
          />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route
            path="/revision"
            element={
              <QuickRevisionPage
                checkedItems={state.checkedRevisionItems}
                onToggleCheck={toggleRevisionCheck}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </WorkspaceLayout>
    </HashRouter>
  );
}

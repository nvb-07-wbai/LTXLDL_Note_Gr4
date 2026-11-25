import { useState, useEffect, useCallback } from 'react';
import type { NavRouteId, StudyProgressState, VivaAttemptRecord } from '../types';

const STORAGE_KEY = 'ltxldl_gr4_study_tracker_v1';

const DEFAULT_STATE: StudyProgressState = {
  completedLessons: [],
  rememberedFlashcards: [],
  wrongFlashcards: [],
  completedQuizIds: [],
  correctQuizIds: [],
  practicedVivaIds: [],
  vivaHistory: [],
  checkedRevisionItems: [],
  reviewedFunctions: [],
  completedTraces: [],
  lastVisitedRoute: 'roadmap',
  lastVisitedLabel: 'Study Roadmap — Lộ trình ôn tập',
  lastStudiedAt: new Date().toISOString(),
};

function asStringArray(val: unknown): string[] {
  return Array.isArray(val) ? val.filter((x): x is string => typeof x === 'string') : [];
}

function loadInitialState(): StudyProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<StudyProgressState> | null;
    if (!parsed || typeof parsed !== 'object') return DEFAULT_STATE;
    return {
      completedLessons: asStringArray(parsed.completedLessons),
      rememberedFlashcards: asStringArray(parsed.rememberedFlashcards),
      wrongFlashcards: asStringArray(parsed.wrongFlashcards),
      completedQuizIds: asStringArray(parsed.completedQuizIds),
      correctQuizIds: asStringArray(parsed.correctQuizIds),
      practicedVivaIds: asStringArray(parsed.practicedVivaIds),
      vivaHistory: Array.isArray(parsed.vivaHistory) ? parsed.vivaHistory.slice(0, 50) : [],
      checkedRevisionItems: asStringArray(parsed.checkedRevisionItems),
      reviewedFunctions: asStringArray(parsed.reviewedFunctions),
      completedTraces: asStringArray(parsed.completedTraces),
      lastVisitedRoute: typeof parsed.lastVisitedRoute === 'string' ? parsed.lastVisitedRoute : DEFAULT_STATE.lastVisitedRoute,
      lastVisitedLabel: typeof parsed.lastVisitedLabel === 'string' ? parsed.lastVisitedLabel : DEFAULT_STATE.lastVisitedLabel,
      lastStudiedAt: typeof parsed.lastStudiedAt === 'string' ? parsed.lastStudiedAt : DEFAULT_STATE.lastStudiedAt,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useStudyTracker() {
  const [state, setState] = useState<StudyProgressState>(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const toggleLessonComplete = useCallback((lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const completedLessons = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons, lastStudiedAt: new Date().toISOString() };
    });
  }, []);

  const markFlashcard = useCallback((cardId: string, remembered: boolean) => {
    setState((prev) => {
      const rememberedSet = new Set(prev.rememberedFlashcards);
      const wrongSet = new Set(prev.wrongFlashcards);
      if (remembered) {
        rememberedSet.add(cardId);
        wrongSet.delete(cardId);
      } else {
        wrongSet.add(cardId);
        rememberedSet.delete(cardId);
      }
      return {
        ...prev,
        rememberedFlashcards: Array.from(rememberedSet),
        wrongFlashcards: Array.from(wrongSet),
        lastStudiedAt: new Date().toISOString(),
      };
    });
  }, []);

  const recordQuizAnswer = useCallback((quizId: string, isCorrect: boolean) => {
    setState((prev) => {
      const completed = new Set(prev.completedQuizIds);
      const correct = new Set(prev.correctQuizIds);
      completed.add(quizId);
      if (isCorrect) correct.add(quizId);
      else correct.delete(quizId);
      return {
        ...prev,
        completedQuizIds: Array.from(completed),
        correctQuizIds: Array.from(correct),
        lastStudiedAt: new Date().toISOString(),
      };
    });
  }, []);

  const recordVivaAttempt = useCallback((attempt: VivaAttemptRecord) => {
    setState((prev) => {
      const practiced = new Set([...prev.practicedVivaIds, ...attempt.questionIds]);
      const existsIdx = prev.vivaHistory.findIndex((h) => h.id === attempt.id);
      const nextHistory =
        existsIdx >= 0
          ? prev.vivaHistory.map((h, idx) => (idx === existsIdx ? attempt : h))
          : [attempt, ...prev.vivaHistory];
      return {
        ...prev,
        practicedVivaIds: Array.from(practiced),
        vivaHistory: nextHistory.slice(0, 50),
        lastStudiedAt: new Date().toISOString(),
      };
    });
  }, []);

  const markFunctionReviewed = useCallback((fnId: string) => {
    setState((prev) => {
      const curr = prev.reviewedFunctions ?? [];
      if (curr.includes(fnId)) return prev;
      return {
        ...prev,
        reviewedFunctions: [...curr, fnId],
        lastStudiedAt: new Date().toISOString(),
      };
    });
  }, []);

  const markTraceCompleted = useCallback((traceId: string) => {
    setState((prev) => {
      const curr = prev.completedTraces ?? [];
      if (curr.includes(traceId)) return prev;
      return {
        ...prev,
        completedTraces: [...curr, traceId],
        lastStudiedAt: new Date().toISOString(),
      };
    });
  }, []);

  const toggleVivaQuestionPracticed = useCallback((qId: string) => {
    setState((prev) => {
      const exists = prev.practicedVivaIds.includes(qId);
      return {
        ...prev,
        practicedVivaIds: exists
          ? prev.practicedVivaIds.filter((id) => id !== qId)
          : [...prev.practicedVivaIds, qId],
        lastStudiedAt: new Date().toISOString(),
      };
    });
  }, []);

  const toggleRevisionCheck = useCallback((itemId: string) => {
    setState((prev) => {
      const exists = prev.checkedRevisionItems.includes(itemId);
      return {
        ...prev,
        checkedRevisionItems: exists
          ? prev.checkedRevisionItems.filter((id) => id !== itemId)
          : [...prev.checkedRevisionItems, itemId],
        lastStudiedAt: new Date().toISOString(),
      };
    });
  }, []);

  const setLastVisited = useCallback((route: NavRouteId, label: string) => {
    setState((prev) => {
      if (prev.lastVisitedRoute === route && prev.lastVisitedLabel === label) return prev;
      return {
        ...prev,
        lastVisitedRoute: route,
        lastVisitedLabel: label,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState({ ...DEFAULT_STATE, lastStudiedAt: new Date().toISOString() });
  }, []);

  return {
    state,
    toggleLessonComplete,
    markFlashcard,
    recordQuizAnswer,
    recordVivaAttempt,
    toggleVivaQuestionPracticed,
    toggleRevisionCheck,
    markFunctionReviewed,
    markTraceCompleted,
    setLastVisited,
    resetProgress,
  };
}

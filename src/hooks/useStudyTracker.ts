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
  lastVisitedRoute: 'overview',
  lastVisitedLabel: 'Overview — Bảng điều khiển',
  lastStudiedAt: new Date().toISOString(),
};

function loadInitialState(): StudyProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<StudyProgressState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
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
      return {
        ...prev,
        practicedVivaIds: Array.from(practiced),
        vivaHistory: [attempt, ...prev.vivaHistory].slice(0, 25),
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
    setState((prev) => ({
      ...prev,
      lastVisitedRoute: route,
      lastVisitedLabel: label,
      lastStudiedAt: new Date().toISOString(),
    }));
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
    setLastVisited,
    resetProgress,
  };
}

import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ltxldl_theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('ltxldl_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('ltxldl_theme', 'light');
    }
  }, [dark]);

  const toggleTheme = useCallback(() => setDark((d) => !d), []);

  return { dark, toggleTheme };
}

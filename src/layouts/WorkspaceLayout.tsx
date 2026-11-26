import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  FolderGit2,
  Workflow,
  Scale,
  Cpu,
  LineChart,
  Swords,
  Layers,
  CheckSquare,
  BookA,
  Zap,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
} from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';
import type { NavRouteId, StudyProgressState } from '../types';
import { CommandSearch } from '../components/CommandSearch';
import { ALL_LESSONS } from '../data/lessons';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { ALL_VIVA_QUESTIONS } from '../data/viva';

interface WorkspaceLayoutProps {
  children: ReactNode;
  dark: boolean;
  toggleTheme: () => void;
  progress: StudyProgressState;
  onVisitRoute: (id: NavRouteId, label: string) => void;
}

const ICONS: Record<NavRouteId, typeof LayoutDashboard> = {
  overview: LayoutDashboard,
  roadmap: Map,
  theory: BookOpen,
  project: FolderGit2,
  pipeline: Workflow,
  'kpi-qa': Scale,
  'llm-baseline': Cpu,
  storytelling: LineChart,
  viva: Swords,
  flashcards: Layers,
  quiz: CheckSquare,
  glossary: BookA,
  revision: Zap,
};

export function WorkspaceLayout({
  children,
  dark,
  toggleTheme,
  progress,
  onVisitRoute,
}: WorkspaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [strictLocked, setStrictLocked] = useState(
    () => sessionStorage.getItem('ltxldl_strict_viva_active') === '1'
  );
  const location = useLocation();
  const navigate = useNavigate();

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const syncLock = () => {
      setStrictLocked(sessionStorage.getItem('ltxldl_strict_viva_active') === '1');
    };
    window.addEventListener('ltxldl-strict-lock', syncLock);
    return () => window.removeEventListener('ltxldl-strict-lock', syncLock);
  }, []);

  const safeNavigate = (to: string) => {
    if (strictLocked && !to.startsWith('/viva')) {
      const ok = window.confirm(
        'Bạn đang trong phiên thi Strict Viva 90s! Thoát ra ngoài sẽ kết thúc phiên thi hiện tại. Bạn có chắc muốn rời phòng thi?'
      );
      if (!ok) return;
      sessionStorage.removeItem('ltxldl_strict_viva_active');
      window.dispatchEvent(new Event('ltxldl-strict-lock'));
    }
    navigate(to);
  };

  const currentIdx = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.path === location.pathname)
  );
  const currentNav = NAV_ITEMS[currentIdx] ?? NAV_ITEMS[0];
  const prevNav = currentIdx > 0 ? NAV_ITEMS[currentIdx - 1] : null;
  const nextNav = currentIdx < NAV_ITEMS.length - 1 ? NAV_ITEMS[currentIdx + 1] : null;

  useEffect(() => {
    if (currentNav && currentNav.id !== 'overview') {
      onVisitRoute(currentNav.id, currentNav.label);
    }
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (sessionStorage.getItem('ltxldl_strict_viva_active') === '1') return;
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const readinessPct = Math.min(
    100,
    Math.round(
      ((progress.completedLessons.length / ALL_LESSONS.length) * 0.25 +
        (progress.rememberedFlashcards.length / FLASHCARDS_DATA.length) * 0.2 +
        (progress.correctQuizIds.length / Math.max(1, QUIZZES_DATA.length)) * 0.2 +
        (Math.min(progress.practicedVivaIds.length, 60) / 60) * 0.25 +
        (Math.min(progress.checkedRevisionItems.length, 9) / 9) * 0.1) *
        100
    )
  );

  const resumeRoute = NAV_ITEMS.find((n) => n.id === progress.lastVisitedRoute)?.path ?? '/theory';

  const sections: { key: 'workspace' | 'project' | 'practice'; title: string }[] = [
    { key: 'workspace', title: 'Tổng quan & Lý thuyết' },
    { key: 'project', title: 'BTL Inside Airbnb · Nhóm 4' },
    { key: 'practice', title: 'Luyện thi & Vấn đáp' },
  ];

  const renderSidebarLinks = () => (
    <div className="flex flex-col h-full bg-[#14243A] text-slate-200">
      <div className="px-4 py-4 border-b border-slate-700/60 flex items-center justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F9D8A] text-white font-bold text-xs shrink-0">
              G4
            </span>
            <span className="font-bold text-sm text-white tracking-tight truncate">
              LTXLDL · Viva Studio
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            UET.DSE2049 · Inside Airbnb CDMX
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          aria-label="Đóng menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5" aria-label="Điều hướng chính">
        {sections.map((sec) => (
          <div key={sec.key}>
            <div className="px-2.5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {sec.title}
            </div>
            <ul className="space-y-0.5">
              {NAV_ITEMS.filter((item) => item.section === sec.key).map((item) => {
                const Icon = ICONS[item.id];
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={(e) => {
                        if (strictLocked && item.path !== '/viva') {
                          e.preventDefault();
                          safeNavigate(item.path);
                        }
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                          isActive
                            ? 'bg-[#2563EB] text-white shadow-xs'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.id === 'viva' && (
                        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[#0F9D8A]/30 text-[#E7F6F2] font-semibold">
                          90s
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700/60 bg-slate-900/40 text-xs">
        <div className="flex items-center justify-between text-slate-300 mb-1.5">
          <span>Độ sẵn sàng vấn đáp</span>
          <span className="font-semibold text-[#0F9D8A]">{readinessPct}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#0F9D8A] transition-all duration-300"
            style={{ width: `${readinessPct}%` }}
          />
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex justify-between">
          <span>{progress.completedLessons.length}/{ALL_LESSONS.length} bài</span>
          <span>{progress.practicedVivaIds.length}/{ALL_VIVA_QUESTIONS.length} câu hỏi</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F7F8FC] dark:bg-[#0B1220] text-[#14243A] dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen border-r border-slate-200 dark:border-slate-800">
        {renderSidebarLinks()}
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] h-full z-50 shadow-2xl">
            {renderSidebarLinks()}
          </aside>
        </div>
      )}

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Mở menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm min-w-0">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-slate-500 hover:text-[#2563EB] dark:text-slate-400 font-medium cursor-pointer hidden sm:inline"
                >
                  UET.DSE2049
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline shrink-0" />
                <span className="font-semibold text-[#14243A] dark:text-white truncate">
                  {currentNav.label}
                </span>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                disabled={strictLocked}
                onClick={() => {
                  if (!strictLocked) setSearchOpen(true);
                }}
                title={strictLocked ? 'Đang khóa tìm kiếm khi thi Strict Viva Mode' : 'Tìm kiếm nhanh (Ctrl+K)'}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-xs text-slate-500 dark:text-slate-300 hover:border-[#2563EB] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tìm kiếm nhanh...</span>
                <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">
                  Ctrl K
                </kbd>
              </button>

              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#E7F6F2] dark:bg-teal-950/60 text-[#0F9D8A] dark:text-teal-300 text-xs font-semibold">
                <span>Tiến độ: {readinessPct}%</span>
              </div>

              <button
                type="button"
                onClick={() => safeNavigate(resumeRoute)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors cursor-pointer"
                title={`Tiếp tục: ${progress.lastVisitedLabel}`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Tiếp tục học</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={dark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              >
                {dark ? <Sun className="w-4 h-4 text-[#F2B544]" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          {children}

          {/* Page Footer Prev/Next */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {prevNav ? (
              <button
                type="button"
                onClick={() => safeNavigate(prevNav.path)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-[#2563EB] text-sm font-medium transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-slate-400" />
                <div className="text-left">
                  <div className="text-[11px] text-slate-400">Trang trước</div>
                  <div className="text-slate-800 dark:text-slate-100">{prevNav.label}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextNav && (
              <button
                type="button"
                onClick={() => safeNavigate(nextNav.path)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-[#2563EB] text-sm font-medium transition-colors cursor-pointer ml-auto"
              >
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Tiếp theo</div>
                  <div className="text-slate-800 dark:text-slate-100">{nextNav.label}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
        </main>
      </div>

      <CommandSearch open={searchOpen} onClose={closeSearch} />
    </div>
  );
}

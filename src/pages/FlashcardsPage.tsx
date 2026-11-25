import { useState, useMemo } from 'react';
import { RotateCw, Check, X, Shuffle, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';

interface FlashcardsPageProps {
  rememberedIds: string[];
  wrongIds: string[];
  onMark: (cardId: string, remembered: boolean) => void;
}

export function FlashcardsPage({ rememberedIds, wrongIds, onMark }: FlashcardsPageProps) {
  const [topic, setTopic] = useState<string>('ALL');
  const [onlyWrong, setOnlyWrong] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const [seed, setSeed] = useState(0);

  const topics = useMemo(() => {
    return ['ALL', ...Array.from(new Set(FLASHCARDS_DATA.map((c) => c.topic)))];
  }, []);

  const deck = useMemo(() => {
    let list = FLASHCARDS_DATA.filter((c) => {
      if (topic !== 'ALL' && c.topic !== topic) return false;
      if (onlyWrong && !wrongIds.includes(c.id)) return false;
      return true;
    });
    if (seed > 0) {
      list = [...list].sort(() => Math.random() - 0.5);
    }
    return list;
  }, [topic, onlyWrong, wrongIds, seed]);

  const safeIdx = deck.length > 0 ? Math.min(idx, deck.length - 1) : 0;
  const card = deck[safeIdx];

  const nextCard = () => {
    setFlipped(false);
    setIdx((i) => (deck.length ? (i + 1) % deck.length : 0));
  };

  const prevCard = () => {
    setFlipped(false);
    setIdx((i) => (deck.length ? (i - 1 + deck.length) % deck.length : 0));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#0F9D8A]" /> Flashcards Ghi nhớ Chủ động
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Đã nhớ: <strong className="text-[#0F9D8A]">{rememberedIds.length}</strong>/{FLASHCARDS_DATA.length} · Cần ôn lại: <strong className="text-rose-500">{wrongIds.length}</strong>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setOnlyWrong((w) => !w);
                setIdx(0);
                setFlipped(false);
              }}
              className={`px-3 py-2 rounded-xl font-bold border cursor-pointer ${
                onlyWrong
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'border-slate-200 dark:border-slate-700 hover:border-rose-400'
              }`}
            >
              Ôn thẻ chưa nhớ ({wrongIds.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setSeed((s) => s + 1);
                setIdx(0);
                setFlipped(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#2563EB] font-semibold cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" /> Trộn thẻ
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTopic(t);
                setIdx(0);
                setFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                topic === t
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t === 'ALL' ? `Tất cả (${FLASHCARDS_DATA.length})` : t}
            </button>
          ))}
        </div>
      </div>

      {!card ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-sm text-slate-500">
          Không có thẻ nào trong bộ lọc hiện tại (hoặc bạn đã nhớ hết các thẻ sai!).
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Thẻ {safeIdx + 1} / {deck.length} · {card.topic}</span>
            <span className="font-mono">{card.sourceRef}</span>
          </div>

          {/* Flip Card */}
          <div
            className="perspective-1000 cursor-pointer"
            onClick={() => setFlipped((f) => !f)}
          >
            <div
              className={`relative min-h-[290px] w-full rounded-2xl transition-transform duration-500 preserve-3d ${
                flipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-8 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] font-bold">
                    Mặt trước · Câu hỏi / Thuật ngữ
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <RotateCw className="w-3.5 h-3.5" /> Nhấn để lật
                  </span>
                </div>
                <div className="text-lg sm:text-2xl font-extrabold text-center my-auto px-2 leading-snug">
                  {card.front}
                </div>
                <div className="text-center text-xs text-slate-400">
                  Hãy tự diễn đạt thành lời trước khi lật thẻ
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-[#14243A] text-white border-2 border-[#0F9D8A] p-7 flex flex-col justify-between shadow-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#0F9D8A]/30 text-[#E7F6F2] font-bold">
                    Mặt sau · Định nghĩa &amp; Ví dụ
                  </span>
                  <span className="font-mono text-slate-300">{card.sourceRef}</span>
                </div>
                <div className="space-y-3 my-auto">
                  <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-100">
                    {card.back}
                  </p>
                  <div className="p-3 rounded-xl bg-white/10 text-xs font-mono text-[#E7F6F2]">
                    Ví dụ: {card.example}
                  </div>
                </div>
                <div className="text-center text-[11px] text-slate-400">
                  Nhấn vào thẻ để quay lại mặt trước
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevCard}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Thẻ trước
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onMark(card.id, false);
                  nextCard();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 text-xs font-bold cursor-pointer"
              >
                <X className="w-4 h-4" /> Chưa nhớ
              </button>
              <button
                type="button"
                onClick={() => {
                  onMark(card.id, true);
                  nextCard();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0F9D8A] hover:bg-[#0c8575] text-white text-xs font-bold cursor-pointer"
              >
                <Check className="w-4 h-4" /> Đã nhớ
              </button>
            </div>

            <button
              type="button"
              onClick={nextCard}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold cursor-pointer"
            >
              Thẻ tiếp <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

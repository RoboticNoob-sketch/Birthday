import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SoundControl } from "./components/SoundControl.tsx";
import { HiddenTerminal } from "./components/HiddenTerminal.tsx";
import { IntroCinematic } from "./components/IntroCinematic.tsx";
import { useKonami } from "./hooks/useKonami.ts";
import { useSound } from "./hooks/useSound.ts";
import { celebrate, fireworks } from "./utils/confetti.ts";

const AnimatedTerminal = lazy(() => import("./components/AnimatedTerminal.tsx").then(m => ({ default: m.AnimatedTerminal })));
const BirthdayHero     = lazy(() => import("./components/BirthdayHero.tsx").then(m => ({ default: m.BirthdayHero })));
const CakeStage        = lazy(() => import("./components/CakeStage.tsx").then(m => ({ default: m.CakeStage })));
const DinoWorld        = lazy(() => import("./components/DinoWorld.tsx").then(m => ({ default: m.DinoWorld })));
const LetterCard       = lazy(() => import("./components/LetterCard.tsx").then(m => ({ default: m.LetterCard })));
const MemoryShowcase   = lazy(() => import("./components/MemoryShowcase.tsx").then(m => ({ default: m.MemoryShowcase })));
const MikaelStats      = lazy(() => import("./components/MikaelStats.tsx").then(m => ({ default: m.MikaelStats })));
const StoryScene       = lazy(() => import("./components/StoryScene.tsx").then(m => ({ default: m.StoryScene })));
const TimelineJourney  = lazy(() => import("./components/TimelineJourney.tsx").then(m => ({ default: m.TimelineJourney })));
const WishesBoard      = lazy(() => import("./components/WishesBoard.tsx").then(m => ({ default: m.WishesBoard })));

const sections = [
  "terminal",
  "story",
  "birthday",
  "numbers",
  "memories",
  "timeline",
  "dino",
  "cake",
  "letter",
  "wishes",
  "ending",
] as const;

type SectionKey = (typeof sections)[number];

const sectionDurations: Record<SectionKey, number> = {
  terminal: 6500,
  story: 6500,
  birthday: 7000,
  numbers: 12000,
  memories: 60000,
  timeline: 9000,
  dino: 9000,
  cake: 16000,
  letter: 12000,
  wishes: 12000,
  ending: 8000,
};

const sectionLabels: Record<SectionKey, string> = {
  terminal: "Opening",
  story: "Our Story",
  birthday: "Birthday",
  numbers: "By the Numbers",
  memories: "Memories",
  timeline: "Timeline",
  dino: "Dino World",
  cake: "Make a Wish",
  letter: "Our Letter",
  wishes: "Wishes",
  ending: "With Love",
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [dinoClicks, setDinoClicks] = useState(0);
  const [tinyDino, setTinyDino] = useState(false);
  const [showHiddenTerminal, setShowHiddenTerminal] = useState(false);
  const [cakeBlown, setCakeBlown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [terminalDone, setTerminalDone] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);

  const currentSection = sections[activeIndex];
  const { enabled, toggleMusic, playSound } = useSound(musicEnabled, readyToPlay);
  const konamiMode = useKonami();

  useEffect(() => {
    if (activeIndex > 0) setTerminalDone(true);
  }, [activeIndex]);

  useEffect(() => {
    if (!readyToPlay && enabled && terminalDone) {
      setReadyToPlay(true);
    }
  }, [enabled, readyToPlay, terminalDone]);

  useEffect(() => {
    if (showIntro) {
      return;
    }

    if (autoPaused || currentSection === "terminal" || currentSection === "cake" || currentSection === "ending") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, sections.length - 1));
    }, sectionDurations[currentSection]);

    return () => window.clearTimeout(timeout);
  }, [currentSection, showIntro, autoPaused]);

  useEffect(() => {
    if (dinoClicks < 10) {
      return;
    }

    setTinyDino(true);
    playSound("sparkle");
    setToastMessage("Rawr! Daddy loves you!");

    const timer = window.setTimeout(() => {
      setToastMessage(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [dinoClicks, playSound]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const hotkey = event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d";
      if (hotkey) {
        event.preventDefault();
        setShowHiddenTerminal((value) => !value);
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    if (!cakeBlown) {
      return;
    }
    playSound("fireworks");
    setToastMessage("Make a wish! 🎉");
    // visual celebration
    celebrate();
    fireworks();
    const timer = window.setTimeout(() => {
      setToastMessage(null);
      setActiveIndex((current) => Math.min(current + 1, sections.length - 1));
    }, 6500);

    return () => window.clearTimeout(timer);
  }, [cakeBlown, playSound]);

  const handleCakeBlow = () => {
    if (cakeBlown) {
      return;
    }

    playSound("candle");
    setCakeBlown(true);
  };

  const handleDinoClick = () => {
    playSound("click");
    setDinoClicks((count) => count + 1);
  };

  const handleTerminalComplete = () => {
    playSound("click");
    window.setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, sections.length - 1));
    }, 1600);
  };

  const handleNext = () => {
    if (activeIndex < sections.length - 1) {
      playSound("click");
      setAutoPaused(true);
      setActiveIndex((current) => current + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      playSound("click");
      setAutoPaused(true);
      setActiveIndex((current) => current - 1);
    }
  };

  // Auto-blow the candle after 10 s so passive / demo viewers don't get stuck
  useEffect(() => {
    if (currentSection !== "cake" || cakeBlown) return;
    const timer = window.setTimeout(() => handleCakeBlow(), 10000);
    return () => window.clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, cakeBlown]);

  // Touch-swipe navigation
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) handleNext();
    else if (delta < -50) handlePrev();
  };

  return (
    <div className="app-shell relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(93,173,226,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(212,175,55,0.12),_transparent_20%),linear-gradient(180deg,_#020712_0%,_#071b33_36%,_#0f3a6b_100%)] text-white">
      {showIntro ? (
        <IntroCinematic
          onFinish={() => {
            setShowIntro(false);
            setReadyToPlay(true);
          }}
        />
      ) : null}
      <div className="absolute inset-0 pointer-events-none">
        <div className="starfield" />
      </div>

      <div className="relative z-20 px-5 pt-5 md:px-10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-slate-100 shadow-glass backdrop-blur-xl md:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎂</span>
            <div>
              <p className="font-bold text-white leading-none">Mikael&apos;s 3rd Birthday</p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold mt-0.5">July 1st, 2026 · From Mom &amp; Dad</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            {sections.map((s, i) => (
              <button
                key={s}
                type="button"
                title={sectionLabels[s]}
                onClick={() => { playSound("click"); setAutoPaused(true); setActiveIndex(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-gold"
                    : i < activeIndex
                    ? "w-2 bg-white/50"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
          <SoundControl enabled={enabled} onToggle={() => { toggleMusic(); setReadyToPlay(true); }} />
        </div>
        {!showIntro ? (
          <div className="mx-auto mt-2 max-w-[1200px] flex items-center justify-between px-2">
            <p className="text-xs text-white/40 uppercase tracking-[0.25em]">{sectionLabels[currentSection]}</p>
            <p className="text-xs text-white/30">{activeIndex + 1} / {sections.length}</p>
          </div>
        ) : null}
      </div>

      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><span className="text-white/40 text-sm tracking-widest uppercase">Loading…</span></div>}>
      <div
        className="relative z-20 mx-auto mt-6 max-w-[1200px] px-5 pb-24 md:px-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentSection === "terminal" ? (
          <motion.section key="terminal" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <AnimatedTerminal onComplete={handleTerminalComplete} />
          </motion.section>
        ) : null}

        {currentSection === "story" ? (
          <motion.section key="story" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <StoryScene />
          </motion.section>
        ) : null}

        {currentSection === "birthday" ? (
          <motion.section key="birthday" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <BirthdayHero />
          </motion.section>
        ) : null}

        {currentSection === "numbers" ? (
          <motion.section key="numbers" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <MikaelStats />
          </motion.section>
        ) : null}

        {currentSection === "memories" ? (
          <motion.section key="memories" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <MemoryShowcase />
          </motion.section>
        ) : null}

        {currentSection === "timeline" ? (
          <motion.section key="timeline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <TimelineJourney />
          </motion.section>
        ) : null}

        {currentSection === "dino" ? (
          <motion.section key="dino" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <DinoWorld onDinoClick={handleDinoClick} />
          </motion.section>
        ) : null}

        {currentSection === "cake" ? (
          <motion.section key="cake" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <CakeStage cakeBlown={cakeBlown} onBlow={handleCakeBlow} />
          </motion.section>
        ) : null}

        {currentSection === "letter" ? (
          <motion.section key="letter" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <LetterCard />
          </motion.section>
        ) : null}

        {currentSection === "wishes" ? (
          <motion.section key="wishes" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <WishesBoard />
          </motion.section>
        ) : null}

        {currentSection === "ending" ? (
          <motion.section key="ending" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-screen flex min-h-[calc(100vh-92px)] items-center justify-center px-4 py-8 md:px-10">
            <div className="glass-panel relative w-full rounded-[40px] border border-white/15 bg-white/10 p-8 text-center shadow-glass backdrop-blur-2xl md:p-12">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="space-y-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-gold">July 1st, 2026</p>
                  <h2 className="mt-5 text-5xl font-black leading-tight text-white md:text-6xl">Happy 3rd Birthday, Mikael 🎉</h2>
                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                    Three years of laughter, dinosaurs, bedtime stories, and a love that grows bigger every single day. Thank you for choosing us as your parents.
                  </p>
                  <p className="mt-4 text-xl font-semibold text-gold">We love you endlessly. — Mom &amp; Dad ❤️</p>
                </div>

                <div className="mx-auto max-w-2xl rounded-[28px] border border-white/20 bg-[#0f4c81]/20 p-6 text-slate-100 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.28em] text-gold mb-3">Share this with someone you love</p>
                  <p className="text-base leading-relaxed text-slate-200">
                    If this made you smile, share it with a parent, a friend, or anyone who knows what it feels like to love someone this much.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent("Happy 3rd Birthday Mikael 🎉 Made with love by Mom & Dad — " + window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                      Share on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(window.location.href)}
                      className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-400">Made with love by Mom &amp; Dad · Mikael turns 3 · July 1st, 2026</p>

                {/* Revisit any section */}
                <div className="border-t border-white/10 pt-6">
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Revisit a moment</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {sections.filter(s => s !== "ending").map((s, _i) => {
                      const i = sections.indexOf(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => { playSound("click"); setAutoPaused(true); setActiveIndex(i); }}
                          className="rounded-[16px] border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/15 active:scale-95"
                        >
                          {sectionLabels[s]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        ) : null}
      </div>
      </Suspense>

      <HiddenTerminal visible={showHiddenTerminal} />

      {!showIntro && currentSection !== "cake" && currentSection !== "ending" ? (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center gap-2" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          {autoPaused ? (
            <motion.button
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setAutoPaused(false)}
              className="rounded-full border border-gold/30 bg-slate-950/80 px-4 py-1.5 text-xs font-semibold text-gold backdrop-blur-xl transition hover:bg-gold/10"
            >
              ▶ Resume autoplay
            </motion.button>
          ) : null}
          <div className="flex items-center gap-3">
          {activeIndex > 0 ? (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handlePrev}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-white shadow-glass backdrop-blur-xl transition active:scale-95 hover:bg-slate-800/90 min-w-[80px] justify-center"
            >
              ← Prev
            </motion.button>
          ) : null}
          {activeIndex < sections.length - 1 ? (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy shadow-[0_8px_32px_rgba(212,175,55,0.3)] transition active:scale-95 hover:scale-105 min-w-[80px] justify-center"
            >
              Next →
            </motion.button>
          ) : null}
          </div>
        </div>
      ) : null}

      {toastMessage ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-20 right-6 z-40 rounded-3xl bg-slate-900/90 px-5 py-3 text-sm text-slate-100 shadow-glass backdrop-blur-xl md:right-8">
          {toastMessage}
        </motion.div>
      ) : null}

      {konamiMode ? (
        <div className="fixed left-6 top-6 z-40 rounded-full border border-gold/30 bg-black/25 px-4 py-3 text-xs uppercase tracking-[0.35em] text-gold shadow-glass backdrop-blur-lg">
          Developer Mode Unlocked
        </div>
      ) : null}
    </div>
  );
}

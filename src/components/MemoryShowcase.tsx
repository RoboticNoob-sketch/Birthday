import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PHOTOS = [
  { label: "First Smile", src: "/assets/photos/photo-1.jpg" },
  { label: "First Birthday", src: "/assets/photos/photo-2.jpg" },
  { label: "Little Adventure", src: "/assets/photos/photo-3.jpg" },
  { label: "Daddy Loves You", src: "/assets/photos/photo-4.jpg" },
  { label: "Morning Giggles", src: "/assets/photos/photo-5.jpg" },
  { label: "Sweet Moments", src: "/assets/photos/photo-6.jpg" },
  { label: "Playtime Joy", src: "/assets/photos/photo-7.jpg" },
  { label: "Happy Days", src: "/assets/photos/photo-8.jpg" },
  { label: "Tiny Explorer", src: "/assets/photos/photo-9.jpg" },
  { label: "Birthday Glow", src: "/assets/photos/photo-10.jpg" },
  { label: "My Favorite Year", src: "/assets/photos/photo-11.jpg" },
  { label: "Growing Up", src: "/assets/photos/photo-12.jpg" },
  { label: "Pure Joy", src: "/assets/photos/photo-13.jpg" },
  { label: "Unforgettable", src: "/assets/photos/photo-14.jpg" },
  { label: "Our Sunshine", src: "/assets/photos/photo-15.jpg" },
  { label: "Best Moments", src: "/assets/photos/photo-16.jpg" },
  { label: "Always Loved", src: "/assets/photos/photo-17.jpg" },
];

export function MemoryShowcase({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const completedRef = useRef(false);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => {
        if (current >= PHOTOS.length - 1) return current;
        return current + 1;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  // When last photo is reached, wait 5 s then advance section
  useEffect(() => {
    if (index !== PHOTOS.length - 1 || completedRef.current) return;
    const timer = window.setTimeout(() => {
      completedRef.current = true;
      onCompleteRef.current?.();
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [index]);

  // Preload next photo
  useEffect(() => {
    const nextSrc = PHOTOS[(index + 1) % PHOTOS.length].src;
    const img = new Image();
    img.src = nextSrc;
  }, [index]);

  // Scroll active thumbnail into view
  useEffect(() => {
    activeThumbnailRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const goTo = (next: number, dir: number) => {
    const clamped = Math.max(0, Math.min(PHOTOS.length - 1, (next + PHOTOS.length) % PHOTOS.length));
    setDirection(dir);
    setIndex(clamped);
  };

  // Touch swipe support
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 40) goTo(index + 1, 1);
    else if (delta < -40) goTo(index - 1, -1);
  };

  const photo = PHOTOS[index];

  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 shadow-glass backdrop-blur-2xl">
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -right-10 bottom-16 h-32 w-32 rounded-full bg-sky-300/15 blur-3xl" />

      {/* Header */}
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Photo Memories</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-white md:text-4xl">Three years of Mikael</h2>
          </div>
          <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold text-slate-200">
            {index + 1} / {PHOTOS.length}
          </span>
        </div>
      </div>

      {/* Main photo frame */}
      <div className="relative mx-4 overflow-hidden rounded-[24px] bg-slate-950 md:mx-6">
        {/* Progress bar */}
        <motion.div
          key={`bar-${index}`}
          className="absolute top-0 left-0 z-20 h-[3px] bg-gold"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />

        <div
          className="relative h-[58vh] min-h-[300px] max-h-[640px] w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            {/* Blurred backdrop — fills the frame for portrait photos */}
            <motion.img
              key={`bg-${photo.src}`}
              src={photo.src}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl brightness-50"
            />
            {/* Main photo — fully visible, no crop */}
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.label}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>

          {/* Bottom gradient + caption + arrows */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-5 pb-5">
            <motion.div
              key={photo.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-base font-bold text-white drop-shadow">{photo.label}</p>
              <p className="text-xs text-white/60">Mikael · July 2023 – July 2026</p>
            </motion.div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1, -1)}
                disabled={index === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-lg text-white backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-30"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1, 1)}
                disabled={index === PHOTOS.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-lg text-white backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-30"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto px-4 py-4 md:px-6"
        style={{ scrollbarWidth: "none" }}
      >
        {PHOTOS.map((p, i) => (
          <button
            key={p.src}
            ref={i === index ? activeThumbnailRef : null}
            type="button"
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 64, height: 64 }}
          >
            <img
              src={p.src}
              alt={p.label}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
              i === index
                ? "ring-2 ring-gold ring-offset-1 ring-offset-transparent"
                : "bg-black/40 hover:bg-black/10"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}


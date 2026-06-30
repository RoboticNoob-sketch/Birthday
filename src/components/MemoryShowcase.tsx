import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

export function MemoryShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % PHOTOS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + PHOTOS.length) % PHOTOS.length);
  };

  const photo = PHOTOS[index];

  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 shadow-glass backdrop-blur-2xl">
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -right-10 bottom-16 h-32 w-32 rounded-full bg-sky-300/15 blur-3xl" />

      <div className="p-8 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Photo Memories</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-white md:text-5xl">Three years of Mikael</h2>
            <p className="mt-2 text-base text-slate-300">Every photo is a moment we never want to forget.</p>
          </div>
          <div className="shrink-0 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
            {index + 1} / {PHOTOS.length}
          </div>
        </div>
      </div>

      <div className="relative mx-4 mb-4 overflow-hidden rounded-[28px] bg-slate-950/80 md:mx-8">
        <div className="relative h-[55vh] min-h-[320px] max-h-[600px] w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.label}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 to-transparent" />
          <div className="absolute bottom-5 left-0 right-0 flex items-center justify-between px-6">
            <motion.p
              key={photo.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base font-semibold text-white"
            >
              {photo.label}
            </motion.p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1, -1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1, 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-8">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-gold" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

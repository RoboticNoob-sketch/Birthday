import { motion } from "framer-motion";

export function BirthdayHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute left-[-20px] top-6 h-36 w-36 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute right-0 top-16 h-24 w-24 rounded-full bg-sky-300/15 blur-3xl" />
      <div className="grid gap-10 lg:grid-cols-[1fr,_0.8fr] items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Happy Birthday</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-200">Mikael • 3 years old • July 1st</span>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">Three years of the best thing that ever happened to us.</h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-200 md:text-xl">
            You came into our lives and filled every room with laughter, every morning with purpose, and every moment with a love we never knew was possible.
          </p>
          <p className="text-base text-gold font-semibold">— Mom &amp; Dad</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/10 bg-slate-950/25 px-4 py-2">✨ Our greatest joy</span>
            <span className="rounded-full border border-white/10 bg-slate-950/25 px-4 py-2">🦕 Dino dreamer</span>
            <span className="rounded-full border border-white/10 bg-slate-950/25 px-4 py-2">💛 Forever loved</span>
          </div>
        </div>
        <div className="relative mx-auto max-w-md rounded-[32px] border border-white/15 bg-[#0f4c81]/25 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
          <div className="absolute -left-8 top-8 h-20 w-20 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative h-[400px] overflow-hidden rounded-[28px] bg-[#081b42] flex flex-col items-center justify-center gap-6 p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.12),transparent_18%)]" />
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 text-center"
            >
              <p className="text-8xl mb-4">🎉</p>
              <p className="text-6xl font-black text-white">3</p>
              <p className="mt-2 text-sm uppercase tracking-[0.35em] text-gold">Years of magic</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="relative z-10 text-center rounded-[20px] border border-white/10 bg-white/10 px-6 py-4"
            >
              <p className="text-white font-semibold text-lg">Happy Birthday, Mikael ❤️</p>
              <p className="text-slate-300 text-sm mt-1">From Mom &amp; Dad</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

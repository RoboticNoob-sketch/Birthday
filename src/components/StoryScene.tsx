import { motion } from "framer-motion";

export function StoryScene() {
  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[0.9fr,_0.9fr] items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1 }} className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">July 1st, 2023</p>
          <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">The best day of our lives.</h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-200 md:text-xl">
            Three years ago today, Mikael came into the world and turned two people into parents. Nothing has been the same since — and we wouldn't trade a single sleepless night for anything.
          </p>
          <div className="flex flex-wrap gap-3 pt-2 text-sm text-slate-200">
            <span className="rounded-full border border-white/10 bg-slate-950/25 px-4 py-2">👶 Born July 1st</span>
            <span className="rounded-full border border-white/10 bg-slate-950/25 px-4 py-2">💛 Mom &amp; Dad's greatest gift</span>
            <span className="rounded-full border border-white/10 bg-slate-950/25 px-4 py-2">🦕 Dino fan from day one</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 0.15 }} className="relative rounded-[32px] border border-white/10 bg-[#0f4c81]/25 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
          <div className="absolute -top-8 left-6 h-20 w-20 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="h-64 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%),linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(15,76,129,0.45))] p-5">
            <div className="relative h-full rounded-[28px] border border-white/15 bg-slate-950/20">
              <div className="absolute bottom-3 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#76baf9]/60 blur-2xl" />
              <div className="relative flex h-full flex-col items-center justify-center gap-3">
                <p className="text-center text-3xl font-black text-white leading-tight">July 1<br/>2023</p>
                <p className="text-sm uppercase tracking-[0.28em] text-gold">Mikael arrives 🌟</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

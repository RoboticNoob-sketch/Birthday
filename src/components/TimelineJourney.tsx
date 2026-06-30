import { motion } from "framer-motion";

const TIMELINE = [
  { title: "July 1st, 2023", emoji: "👶", detail: "Mikael arrives and changes everything. Mom & Dad cry happy tears for the first time." },
  { title: "First Smile", emoji: "😊", detail: "A tiny grin that made all the sleepless nights worth it in an instant." },
  { title: "First Steps", emoji: "👣", detail: "He stood up, wobbled, and walked straight into our hearts all over again." },
  { title: "First Birthday", emoji: "🎂", detail: "Cake on his face, confetti everywhere, and the biggest laugh we had ever heard." },
  { title: "Dino Phase Begins", emoji: "🦕", detail: "Obsessed. Every toy, every book, every sound effect — dinosaurs all the way down." },
  { title: "Second Birthday", emoji: "✨", detail: "Running everywhere now, talking non-stop, impossible to keep up with." },
  { title: "Today — He is 3!", emoji: "🌟", detail: "Three years of pure joy. We are so proud of the little person you are becoming, Mikael." },
];

export function TimelineJourney() {
  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute right-0 top-6 h-24 w-24 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative">
        <div className="mb-3 text-sm uppercase tracking-[0.35em] text-gold">Mikael's Story</div>
        <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">Three years of memories</h2>
        <p className="mt-4 text-lg text-slate-300">Every moment has been a gift. Here are the ones we will never forget.</p>
        <div className="mt-10 grid gap-6">
          {TIMELINE.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              viewport={{ once: true, amount: 0.4 }}
              className="group flex items-start gap-6 rounded-[28px] border border-white/10 bg-[#0f4c81]/20 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/10 text-3xl shadow-glass">{event.emoji}</div>
              <div>
                <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{event.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

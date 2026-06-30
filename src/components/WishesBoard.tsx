import { motion } from "framer-motion";

const wishes = [
  {
    from: "Mom",
    emoji: "👩",
    color: "from-pink-500/20 to-rose-600/10",
    border: "border-pink-400/20",
    message:
      "My darling Mikael, you made me a mother and I am so proud every single day. You are braver, kinder, and more wonderful than you will ever know. I love you beyond the stars.",
  },
  {
    from: "Dad",
    emoji: "👨",
    color: "from-sky-500/20 to-blue-600/10",
    border: "border-sky-400/20",
    message:
      "Buddy, watching you grow has been the greatest adventure of my life. Every morning you wake up and make the world brighter. I will always be your biggest fan. Always.",
  },
  {
    from: "The Universe",
    emoji: "🌌",
    color: "from-purple-500/20 to-indigo-600/10",
    border: "border-purple-400/20",
    message:
      "To Mikael — may every day feel like a birthday, every dinosaur be friendly, every candle wish come true, and every hug last just a little bit longer.",
  },
  {
    from: "Your Future Self",
    emoji: "🚀",
    color: "from-amber-500/20 to-yellow-600/10",
    border: "border-amber-400/20",
    message:
      "Hey little you — you are going to do incredible things. The curiosity, the laugh, the energy you have right now? Hold onto it. It's your superpower.",
  },
];

const floatingEmojis = ["🎈", "⭐", "🌟", "🎉", "💛", "🦕", "🎂", "✨"];

export function WishesBoard() {
  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-pink-400/10 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

      {/* floating background emojis */}
      {floatingEmojis.map((e, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute select-none text-2xl opacity-10"
          style={{ top: `${8 + (i * 11) % 80}%`, left: `${4 + (i * 12) % 90}%` }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {e}
        </motion.span>
      ))}

      <div className="relative mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-gold">A message for Mikael</p>
        <h2 className="mt-2 text-5xl font-black tracking-tight text-white md:text-6xl">Wishes for you 💛</h2>
        <p className="mt-3 text-lg text-slate-300">
          From everyone who loves you — a few words to carry with you as you grow.
        </p>
      </div>

      <div className="relative grid gap-5 md:grid-cols-2">
        {wishes.map((w, i) => (
          <motion.div
            key={w.from}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.12 }}
            className={`relative overflow-hidden rounded-[28px] border ${w.border} bg-gradient-to-br ${w.color} p-6`}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
                {w.emoji}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">From</p>
                <p className="font-bold text-white">{w.from}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-200">{w.message}</p>
            <div className="absolute right-4 top-4 text-2xl opacity-20">❝</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="relative mt-8 rounded-[28px] border border-gold/20 bg-gold/10 p-6 text-center"
      >
        <p className="text-xl font-black text-white">Happy 3rd Birthday, Mikael! 🎉🦕🎂</p>
        <p className="mt-2 text-sm text-slate-300">
          The world is a better place because you are in it. We love you endlessly.
        </p>
      </motion.div>
    </div>
  );
}

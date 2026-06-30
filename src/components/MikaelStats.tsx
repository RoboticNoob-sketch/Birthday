import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "" }: { target: number | null; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === null) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {target === null ? "∞" : count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { emoji: "📅", value: 1095, suffix: "", label: "Days of pure joy", color: "from-sky-400/20 to-sky-600/10", border: "border-sky-400/20" },
  { emoji: "🦕", value: null, suffix: "", label: "Dino sounds made daily", color: "from-green-400/20 to-green-600/10", border: "border-green-400/20" },
  { emoji: "😂", value: null, suffix: "", label: "Laughs that healed our hearts", color: "from-yellow-400/20 to-yellow-600/10", border: "border-yellow-400/20" },
  { emoji: "🍰", value: 3, suffix: "", label: "Birthday cakes devoured", color: "from-pink-400/20 to-pink-600/10", border: "border-pink-400/20" },
  { emoji: "🌙", value: null, suffix: "", label: "Bedtime stories told", color: "from-purple-400/20 to-purple-600/10", border: "border-purple-400/20" },
  { emoji: "❤️", value: 100, suffix: "%", label: "Loved every single day", color: "from-red-400/20 to-red-600/10", border: "border-red-400/20" },
];

const funFacts = [
  { icon: "🦖", fact: "Mikael can name 12 dinosaurs before breakfast." },
  { icon: "🏃", fact: "He has never walked slowly in his entire 3-year life." },
  { icon: "🌙", fact: "\"One more story, please\" — said every single night." },
  { icon: "🎨", fact: "Every drawing he makes is his \"best one yet\"." },
  { icon: "🤗", fact: "His hugs last exactly as long as they need to." },
  { icon: "⭐", fact: "He says good morning to the stars every day." },
];

export function MikaelStats() {
  return (
    <div className="relative w-full space-y-8 overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-sky-300/15 blur-3xl" />

      <div className="relative">
        <p className="text-sm uppercase tracking-[0.35em] text-gold">By the numbers</p>
        <h2 className="mt-2 text-5xl font-black tracking-tight text-white md:text-6xl">Mikael in 3 years</h2>
        <p className="mt-3 text-lg text-slate-300">Three years of milestones, magic, and moments we will treasure forever.</p>
      </div>

      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-[24px] border ${s.border} bg-gradient-to-br ${s.color} p-5 text-center`}
          >
            <div className="text-3xl">{s.emoji}</div>
            <div className="mt-2 text-3xl font-black text-white">
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-1 text-xs leading-snug text-slate-300">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Fun facts about Mikael</p>
        <div className="grid gap-3 md:grid-cols-2">
          {funFacts.map((f, i) => (
            <motion.div
              key={f.fact}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-[20px] border border-white/10 bg-[#0f4c81]/20 px-5 py-4"
            >
              <span className="text-2xl">{f.icon}</span>
              <p className="text-sm leading-relaxed text-slate-200">{f.fact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

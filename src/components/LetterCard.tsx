import { motion } from "framer-motion";

const letterLines = [
  "Our Dearest Mikael,",
  "",
  "Today you turn three years old.",
  "Three years ago, on July 1st 2023, you came into our world",
  "and made us the luckiest parents alive.",
  "",
  "You have no idea yet how much joy you bring to this family.",
  "Every single morning, you wake up and make life worth celebrating.",
  "",
  "Your laugh is our favourite sound.",
  "Your curiosity makes us better every day.",
  "Your love for dinosaurs makes us smile every single time.",
  "",
  "We don't know what we did to deserve you,",
  "but we are grateful beyond words.",
  "",
  "As you grow, always know this:",
  "Mom and Dad are your biggest fans.",
  "We will always be cheering for you,",
  "standing beside you,",
  "and loving you more than words can ever say.",
  "",
  "Happy 3rd Birthday, our little dinosaur.",
  "",
  "We love you to the moon and back,",
  "forever and always.",
  "",
  "Love,",
  "Mom & Dad ❤️",
];

export function LetterCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-[#0f4c81]/20 p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="absolute inset-x-0 top-0 h-28 rounded-b-[48px] bg-gradient-to-b from-white/15 to-transparent blur-2xl" />
        <div className="relative z-10">
          <div className="mb-6 rounded-[28px] bg-white/10 p-6 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">A Letter From Mom & Dad</p>
            <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">Dear Mikael,</h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="space-y-4 text-base leading-8 text-slate-200 md:text-lg">
            {letterLines.map((line, index) => (
              <p key={`${line}-${index}`} className={line === "" ? "h-4" : undefined}>
                {line}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

interface DinoWorldProps {
  onDinoClick: () => void;
}

const particles = ["🦖", "⭐", "✨", "💥", "🌟", "💫"];

export function DinoWorld({ onDinoClick }: DinoWorldProps) {
  const [roarCount, setRoarCount] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const dinoControls = useAnimation();

  const handleClick = async () => {
    onDinoClick();
    setRoarCount((c) => c + 1);

    const newBursts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      emoji: particles[i % particles.length],
      x: (Math.random() - 0.5) * 160,
      y: -(Math.random() * 120 + 40),
    }));
    setBursts((prev) => [...prev, ...newBursts]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => !newBursts.find((n) => n.id === b.id))), 900);

    await dinoControls.start({
      rotate: [0, -12, 12, -8, 8, -4, 0],
      scale: [1, 1.18, 1.12, 1.08, 1],
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute -right-10 top-2 h-24 w-24 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-sky-300/15 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[0.95fr,_0.65fr] items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Mikael&apos;s Favourite Thing</p>
          <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">He loves dinosaurs more than anything.</h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-200 md:text-xl">
            If you&apos;ve met Mikael, you know — every toy is a dinosaur, every sound is a roar, and every story ends with a T-Rex. We wouldn&apos;t have it any other way.
          </p>
          {roarCount > 0 ? (
            <motion.p
              key={roarCount}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-gold font-bold text-lg"
            >
              {roarCount < 3 ? "Rawr! 🦖" : roarCount < 6 ? "RAAWR!! 🦕💥" : "MIKAEL APPROVES!! 🌟🦖🌟"}
            </motion.p>
          ) : null}
        </div>

        <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-b from-[#0a2240] to-[#0f4c81]/40 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
          {/* ground */}
          <div className="absolute bottom-0 inset-x-0 h-20 rounded-b-[32px] bg-gradient-to-t from-[#1a5c2a]/60 to-transparent" />
          {/* stars */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute h-1 w-1 rounded-full bg-white/60" style={{ top: `${10 + (i * 11) % 40}%`, left: `${8 + (i * 13) % 84}%` }} />
          ))}
          {/* moon */}
          <div className="absolute top-5 right-8 h-10 w-10 rounded-full bg-[#ffd86f]/80 shadow-[0_0_20px_rgba(255,216,111,0.4)]" />

          {/* particle bursts */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {bursts.map((b) => (
              <motion.span
                key={b.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, x: b.x, y: b.y, scale: 1.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute text-2xl select-none"
              >
                {b.emoji}
              </motion.span>
            ))}
          </div>

          {/* dino SVG */}
          <motion.button
            type="button"
            onClick={handleClick}
            animate={dinoControls}
            whileHover={{ scale: 1.06 }}
            className="relative cursor-pointer select-none focus:outline-none"
            title="Click me!"
            style={{ originX: "50%", originY: "90%" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* body */}
                <ellipse cx="100" cy="155" rx="52" ry="58" fill="#4caf50" />
                {/* belly */}
                <ellipse cx="100" cy="165" rx="32" ry="38" fill="#81c784" />
                {/* neck */}
                <rect x="82" y="85" width="36" height="50" rx="18" fill="#4caf50" />
                {/* head */}
                <ellipse cx="100" cy="78" rx="38" ry="30" fill="#43a047" />
                {/* snout */}
                <ellipse cx="128" cy="85" rx="22" ry="14" fill="#388e3c" />
                {/* nostril */}
                <ellipse cx="143" cy="81" rx="4" ry="3" fill="#2e7d32" />
                {/* eye white */}
                <ellipse cx="112" cy="67" rx="10" ry="10" fill="white" />
                {/* pupil */}
                <ellipse cx="115" cy="68" rx="6" ry="7" fill="#1a237e" />
                {/* eye shine */}
                <ellipse cx="117" cy="65" rx="2" ry="2" fill="white" />
                {/* smile */}
                <path d="M118 89 Q128 96 140 90" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* teeth */}
                <rect x="121" y="89" width="5" height="6" rx="1" fill="white" />
                <rect x="129" y="90" width="5" height="5" rx="1" fill="white" />
                {/* tail */}
                <path d="M52 170 Q20 200 15 230" stroke="#4caf50" strokeWidth="22" strokeLinecap="round" fill="none" />
                <path d="M52 170 Q20 200 15 230" stroke="#81c784" strokeWidth="10" strokeLinecap="round" fill="none" />
                {/* left leg */}
                <rect x="68" y="198" width="24" height="38" rx="12" fill="#388e3c" />
                <ellipse cx="80" cy="236" rx="16" ry="8" fill="#2e7d32" />
                {/* right leg */}
                <rect x="108" y="198" width="24" height="38" rx="12" fill="#388e3c" />
                <ellipse cx="120" cy="236" rx="16" ry="8" fill="#2e7d32" />
                {/* left arm */}
                <path d="M60 140 Q38 148 34 162" stroke="#388e3c" strokeWidth="14" strokeLinecap="round" fill="none" />
                {/* right arm */}
                <path d="M140 130 Q162 120 168 108" stroke="#388e3c" strokeWidth="14" strokeLinecap="round" fill="none" />
                {/* back spikes */}
                <polygon points="88,88 80,60 96,82" fill="#2e7d32" />
                <polygon points="100,85 94,55 108,80" fill="#388e3c" />
                <polygon points="112,88 108,58 120,84" fill="#2e7d32" />
              </svg>
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100"
          >
            <span>👆</span>
            <span>Tap the dino!</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

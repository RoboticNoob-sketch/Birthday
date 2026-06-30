import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CakeStageProps {
  cakeBlown: boolean;
  onBlow: () => void;
}

export function CakeStage({ cakeBlown, onBlow }: CakeStageProps) {
  const [pressing, setPressing] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-glass backdrop-blur-2xl md:p-12">
      <div className="absolute left-6 top-6 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="absolute right-6 bottom-8 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />

      <div className="grid gap-8 lg:grid-cols-[0.9fr,_0.7fr] items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Make a wish</p>
          <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">
            {cakeBlown ? "Happy Birthday, Mikael! 🎉" : "Blow the candle and celebrate"}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-200 md:text-xl">
            {cakeBlown
              ? "The wish has been made. May every dream you have come true, little one. Mom & Dad love you so much."
              : "Mikael turns 3 today. Press the button to blow out the candle, make a wish, and start the fireworks!"}
          </p>
          {cakeBlown ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3"
            >
              <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">🎂 Wish made!</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">Fireworks incoming 🎆</span>
            </motion.div>
          ) : (
            <p className="text-sm text-slate-400">This is Mikael's favourite part. He always insists on blowing it himself!</p>
          )}
        </div>

        <div className="relative flex flex-col items-center gap-6 rounded-[32px] border border-white/10 bg-[#0a1f3d]/60 p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">

          {/* Cake SVG */}
          <div className="relative w-64">
            <AnimatePresence>
              {!cakeBlown ? (
                <motion.div
                  key="flame"
                  initial={{ opacity: 0, scale: 0.5, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-1/2 -translate-x-1/2 -top-10 flex flex-col items-center"
                >
                  {/* outer glow */}
                  <div className="absolute -inset-4 rounded-full bg-[#ffd36d]/20 blur-xl" />
                  {/* flame */}
                  <motion.div
                    animate={{
                      scaleX: [1, 1.08, 0.93, 1.05, 1],
                      scaleY: [1, 1.06, 0.95, 1.08, 1],
                      x: [0, 1, -1, 1, 0],
                    }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                    style={{ transformOrigin: "50% 100%" }}
                  >
                    <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
                      {/* outer flame */}
                      <path d="M16 2 C16 2, 28 16, 28 30 C28 40, 22 46, 16 46 C10 46, 4 40, 4 30 C4 16, 16 2, 16 2Z" fill="url(#flameOuter)" />
                      {/* inner bright core */}
                      <path d="M16 12 C16 12, 22 22, 22 30 C22 36, 19 40, 16 40 C13 40, 10 36, 10 30 C10 22, 16 12, 16 12Z" fill="url(#flameInner)" />
                      {/* white hot tip */}
                      <ellipse cx="16" cy="16" rx="4" ry="6" fill="rgba(255,255,255,0.9)" />
                      <defs>
                        <radialGradient id="flameOuter" cx="50%" cy="80%" r="60%">
                          <stop offset="0%" stopColor="#fff7b8" />
                          <stop offset="40%" stopColor="#ffd36d" />
                          <stop offset="75%" stopColor="#ff8c00" />
                          <stop offset="100%" stopColor="#ff4400" stopOpacity="0.6" />
                        </radialGradient>
                        <radialGradient id="flameInner" cx="50%" cy="70%" r="50%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="50%" stopColor="#fffde0" />
                          <stop offset="100%" stopColor="#ffd36d" stopOpacity="0.8" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </motion.div>
                  {/* warm ambient light on cake */}
                  <div className="absolute bottom-0 w-16 h-8 rounded-full bg-[#ffd36d]/30 blur-lg -mb-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="smoke"
                  initial={{ opacity: 0.8, y: -20, scaleX: 1 }}
                  animate={{ opacity: 0, y: -60, scaleX: 1.8 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 -top-4 w-3 h-16 bg-white/20 rounded-full blur-md"
                />
              )}
            </AnimatePresence>

            {/* Candle */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-5 h-14 rounded-t-full bg-gradient-to-b from-[#ffecd2] to-[#d4a57a] shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />

            {/* Cake SVG */}
            <svg width="256" height="180" viewBox="0 0 256 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 mt-8">
              {/* top tier frosting drip */}
              <ellipse cx="128" cy="42" rx="72" ry="18" fill="#fde8f0" />
              {/* top tier */}
              <rect x="56" y="42" width="144" height="46" rx="8" fill="#f9a8c9" />
              {/* top tier stripe */}
              <rect x="56" y="60" width="144" height="10" fill="#f472a8" opacity="0.5" />
              {/* top frosting drip blobs */}
              {[72, 96, 116, 136, 158, 178].map((x) => (
                <ellipse key={x} cx={x} cy="46" rx="7" ry="9" fill="#fff0f6" />
              ))}
              {/* middle tier frosting drip */}
              <ellipse cx="128" cy="88" rx="90" ry="20" fill="#fde8f0" />
              {/* middle tier */}
              <rect x="38" y="88" width="180" height="50" rx="8" fill="#a78bfa" />
              {/* middle tier stripe */}
              <rect x="38" y="108" width="180" height="10" fill="#7c3aed" opacity="0.4" />
              {/* middle frosting drip blobs */}
              {[58, 82, 104, 124, 148, 170, 192].map((x) => (
                <ellipse key={x} cx={x} cy="92" rx="8" ry="10" fill="#ede9fe" />
              ))}
              {/* bottom tier frosting drip */}
              <ellipse cx="128" cy="138" rx="110" ry="22" fill="#fde8f0" />
              {/* bottom tier */}
              <rect x="18" y="138" width="220" height="38" rx="8" fill="#fbbf24" />
              {/* bottom tier stripe */}
              <rect x="18" y="154" width="220" height="10" fill="#d97706" opacity="0.4" />
              {/* bottom frosting drip blobs */}
              {[38, 62, 88, 112, 136, 160, 182, 206, 228].map((x) => (
                <ellipse key={x} cx={x} cy="142" rx="9" ry="11" fill="#fef3c7" />
              ))}
              {/* base */}
              <rect x="10" y="170" width="236" height="10" rx="5" fill="#d97706" />
              {/* sprinkles on middle */}
              {[[70,100],[100,95],[130,105],[160,98],[190,102]].map(([x,y],i) => (
                <rect key={i} x={x} y={y} width="6" height="3" rx="1.5" fill={["#f43f5e","#22d3ee","#84cc16","#f97316","#c084fc"][i]} transform={`rotate(${i*35} ${x} ${y})`} />
              ))}
              {/* stars decoration */}
              <text x="75" y="75" fontSize="14" textAnchor="middle">⭐</text>
              <text x="180" y="72" fontSize="14" textAnchor="middle">⭐</text>
              <text x="50" y="125" fontSize="12" textAnchor="middle">✨</text>
              <text x="206" y="122" fontSize="12" textAnchor="middle">✨</text>
              {/* "3" badge */}
              <circle cx="128" cy="68" r="16" fill="#fff" opacity="0.9" />
              <text x="128" y="74" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#7c3aed">3</text>
            </svg>
          </div>

          <motion.button
            type="button"
            onClick={() => { setPressing(true); onBlow(); }}
            disabled={cakeBlown}
            whileHover={!cakeBlown ? { scale: 1.05 } : {}}
            whileTap={!cakeBlown ? { scale: 0.96 } : {}}
            className={`rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.22em] shadow-lg transition-all ${
              cakeBlown
                ? "bg-white/10 text-slate-400 cursor-default border border-white/10"
                : "bg-gold text-navy shadow-[0_12px_40px_rgba(212,175,55,0.4)] hover:shadow-[0_16px_50px_rgba(212,175,55,0.55)]"
            }`}
          >
            {cakeBlown ? "🎂 Wish Made!" : "🌬️ Blow the Candle"}
          </motion.button>

          {!cakeBlown ? (
            <p className="text-center text-xs text-slate-400 max-w-[200px]">
              Press once to blow out the candle and start the fireworks
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm font-semibold text-gold"
            >
              🎆 Fireworks starting...
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

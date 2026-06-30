import { motion } from "framer-motion";

interface IntroCinematicProps {
  onFinish?: () => void;
}

export function IntroCinematic({ onFinish }: IntroCinematicProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-6 max-w-3xl rounded-2xl bg-gradient-to-b from-[#06162a]/60 to-transparent p-10 text-center shadow-2xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-sm uppercase tracking-[0.35em] text-gold mb-4"
        >
          From Mom &amp; Dad, with love
        </motion.p>

        <motion.h1
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 1 }}
          className="text-4xl font-extrabold leading-tight text-white md:text-6xl"
        >
          Today our son turns 3.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-5 text-lg leading-relaxed text-slate-200 max-w-lg mx-auto"
        >
          We built this for Mikael — a little world of memories, music, and love, shared with everyone who has watched him grow.
        </motion.p>

        <motion.button
          onClick={() => onFinish?.()}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-navy shadow-lg"
        >
          <span>Open Mikael&apos;s Birthday</span>
          <span>🎉</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

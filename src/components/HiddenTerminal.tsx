import { motion } from "framer-motion";

interface HiddenTerminalProps {
  visible: boolean;
}

export function HiddenTerminal({ visible }: HiddenTerminalProps) {
  if (!visible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="fixed left-1/2 top-24 z-50 w-[min(92vw,520px)] -translate-x-1/2 rounded-3xl border border-white/15 bg-slate-950/95 p-5 text-sm text-slate-100 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center gap-2 text-slate-200">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span>Dad@birthday:~$ npm run love</span>
      </div>
      <div className="rounded-2xl bg-slate-900 p-4 text-white/90">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm">∞</pre>
      </div>
    </motion.div>
  );
}

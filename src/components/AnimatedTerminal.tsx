import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedTerminalProps {
  onComplete?: () => void;
}

const terminalRows = [
  "Microsoft Windows",
  "",
  "C:\\Dad>",
  "npm run birthday",
  "",
  "✔ Initializing...",
  "Loading Memories...",
  "██████████████████ 100%",
  "Loading Happiness...",
  "██████████████████ 100%",
  "Loading Adventures...",
  "██████████████████ 100%",
  "Launching Birthday v3.0...",
  "",
  "Happy Birthday Mikael ❤️",
];

export function AnimatedTerminal({ onComplete }: AnimatedTerminalProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [displayedRows, setDisplayedRows] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [phase, setPhase] = useState<"typing" | "pause" | "complete">("typing");

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const currentLine = terminalRows[lineIndex] ?? "";

  useEffect(() => {
    if (isFinished) {
      return;
    }

    if (phase === "typing") {
      if (currentLine.length === 0) {
        setDisplayedRows((prev) => [...prev, currentLine]);
        setDisplayedText("");
        setCharIndex(0);
        setPhase("pause");
        return;
      }

      if (charIndex < currentLine.length) {
        const typeTimer = window.setTimeout(() => {
          setDisplayedText(currentLine.slice(0, charIndex + 1));
          setCharIndex((value) => value + 1);
        }, 32);

        return () => window.clearTimeout(typeTimer);
      }

      setDisplayedRows((prev) => [...prev, currentLine]);
      setDisplayedText("");
      setCharIndex(0);
      setPhase("pause");
      return;
    }

    if (phase === "pause") {
      const pauseDelay = currentLine.length === 0 ? 260 : 100;
      const pauseTimer = window.setTimeout(() => {
        if (lineIndex + 1 >= terminalRows.length) {
          setPhase("complete");
          return;
        }

        setLineIndex((value) => value + 1);
        setPhase("typing");
      }, pauseDelay);

      return () => window.clearTimeout(pauseTimer);
    }

    if (phase === "complete") {
      const finishTimer = window.setTimeout(() => {
        setIsFinished(true);
        onCompleteRef.current?.();
      }, 2200);

      return () => window.clearTimeout(finishTimer);
    }
  }, [charIndex, currentLine, isFinished, lineIndex, phase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-3xl rounded-[28px] border border-white/15 bg-slate-950/95 p-8 shadow-glass backdrop-blur-3xl"
    >
      <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-400">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span>Windows Terminal</span>
      </div>
      <div className="space-y-3 font-mono text-sm leading-6 text-slate-200">
        {displayedRows.map((row, index) => (
          <div key={`${row}-${index}`}>{row}</div>
        ))}
        {!isFinished ? (
          <div className="flex items-center gap-2">
            <span>{displayedText}</span>
            <span className="h-4 w-1 animate-pulse bg-slate-200" />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

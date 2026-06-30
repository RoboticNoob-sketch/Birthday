import { FiMusic, FiPause, FiPlay } from "react-icons/fi";

interface SoundControlProps {
  enabled: boolean;
  onToggle: () => void;
}

export function SoundControl({ enabled, onToggle }: SoundControlProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
      onClick={onToggle}
    >
      {enabled ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
      <span>{enabled ? "Music On" : "Music Off"}</span>
    </button>
  );
}

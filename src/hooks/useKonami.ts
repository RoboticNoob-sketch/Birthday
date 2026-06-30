import { useEffect, useState } from "react";

const KONAMI_SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function useKonami() {
  const [position, setPosition] = useState(0);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key;
      if (key === KONAMI_SEQUENCE[position]) {
        setPosition((current) => current + 1);
      } else {
        setPosition(0);
      }
    }

    if (position === KONAMI_SEQUENCE.length) {
      setActivated(true);
      setPosition(0);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position]);

  return activated;
}

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const SOUND_MAP = {
  background: "/assets/audio/happy-birthday.mp3",
  click: "/assets/audio/click.mp3",
  candle: "/assets/audio/candle-blow.mp3",
  fireworks: "/assets/audio/fireworks.mp3",
  sparkle: "/assets/audio/sparkle.mp3",
};

export function useSound(enabled: boolean, ready: boolean) {
  const [loaded, setLoaded] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const howlRef = useRef<Howl | null>(null);
  const defaultVolume = 0.55;

  const startMusic = useCallback(() => {
    const howl = howlRef.current;
    if (!howl || !audioAvailable || !loaded || !ready) return;
    if (!howl.playing()) {
      try {
        howl.play();
      } catch {
        // ignore autoplay/gesture issues and let the next interaction retry
      }
    }
  }, [audioAvailable, loaded, ready]);

  useEffect(() => {
    let mounted = true;

    function ensureAudio() {
      try {
        const sound = new Howl({
          src: [SOUND_MAP.background],
          loop: true,
          volume: defaultVolume,
          html5: true,
          autoplay: false,
          preload: true,
        });

        sound.once("load", () => {
          if (mounted) {
            setLoaded(true);
            setAudioAvailable(true);
          }
        });
        sound.once("loaderror", () => {
          if (mounted) {
            setLoaded(false);
            setAudioAvailable(false);
          }
        });
        sound.once("playerror", () => {
          if (mounted) {
            setLoaded(true);
            setAudioAvailable(true);
          }
        });
        howlRef.current = sound;
      } catch {
        if (mounted) setAudioAvailable(false);
      }
    }

    ensureAudio();

    return () => {
      mounted = false;
      const current = howlRef.current;
      if (current) {
        try {
          current.unload();
        } catch {
          // ignore cleanup errors
        }
      }
      howlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const howl = howlRef.current;
    if (!howl || !audioAvailable) return;

    if (enabled && loaded && ready) {
      startMusic();
    } else {
      howl.pause();
    }
  }, [enabled, loaded, ready, audioAvailable, startMusic]);

  useEffect(() => {
    const unlockAudio = () => {
      if (!enabled || !ready || !loaded) return;
      startMusic();
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, [enabled, loaded, ready, startMusic]);

  const toggleMusic = useCallback(() => {
    const howl = howlRef.current;
    if (!howl || !audioAvailable) return;
    if (howl.playing()) {
      howl.pause();
    } else {
      startMusic();
    }
  }, [audioAvailable, startMusic]);

  const playSound = useCallback(
    (soundName: keyof typeof SOUND_MAP) => {
      const howl = howlRef.current;
      if (!enabled || !loaded || !audioAvailable) return;
      if (soundName === "background") return;

      // Only duck + play if the file actually exists and is non-empty.
      // Empty placeholder files (0 bytes) will loaderror immediately.
      const originalVol = howl ? howl.volume() : defaultVolume;
      let restored = false;

      const restore = () => {
        if (restored) return;
        restored = true;
        try { if (howl) howl.fade(howl.volume(), originalVol, 500); } catch { /* ignore */ }
      };

      const effect = new Howl({
        src: [SOUND_MAP[soundName]],
        volume: 0.85,
        html5: true,
        preload: true,
      });

      effect.once("load", () => {
        // File loaded — safe to duck and play
        try { if (howl && howl.playing()) howl.fade(originalVol, 0.14, 220); } catch { /* ignore */ }
        effect.play();
      });

      effect.once("end", () => {
        restore();
        effect.unload();
      });

      // If file is missing or empty, restore immediately
      effect.once("loaderror", () => { restore(); effect.unload(); });
      effect.once("playerror", () => { restore(); effect.unload(); });

      // Safety net: always restore after 6 s regardless
      window.setTimeout(restore, 6000);
    },
    [audioAvailable, enabled, loaded],
  );

  return {
    enabled,
    loaded,
    toggleMusic,
    playSound,
  };
}

import confetti from "canvas-confetti";

export function celebrate() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);

    // random bursts from different sides
    confetti(Object.assign({}, defaults, { particleCount: Math.floor(particleCount), origin: { x: Math.random(), y: Math.random() * 0.6 } }));
  }, 250);
}

export function fireworks() {
  // single dramatic burst
  confetti({ particleCount: 120, spread: 160, origin: { x: 0.5, y: 0.35 } });
  setTimeout(() => confetti({ particleCount: 80, spread: 220, origin: { x: 0.5, y: 0.25 } }), 450);
}

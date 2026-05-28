/**
 * DUYGITAL Motion Curves & Animation Presets
 * Grounded in cinematic, unhurried temporal physics.
 */

// Decelerated fluid-head tripod panning curve
export const CINEMATIC_EASE = [0.25, 1, 0.5, 1];

export const TIMING = {
  SHUTTER: 0.6, // Fast but bleeding (600ms)
  PAN: 0.9,     // Scene transitions (900ms)
  DISSOLVE: 1.2 // Deep entrance (1200ms)
};

// Motion transitions
export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: TIMING.DISSOLVE, ease: CINEMATIC_EASE }
};

export const DRIFT_UP = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: TIMING.PAN, ease: CINEMATIC_EASE }
};

export const REVEAL_PIECE = (delay: number = 0) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { delay, duration: TIMING.PAN, ease: CINEMATIC_EASE }
});

// Pure helpers for the scroll-driven project wheel. Kept free of React so
// they can be unit tested on their own.

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * How far the reader has scrolled through a pinned (sticky) section, from 0
 * when the section first pins to 1 when it lets go.
 */
export function scrollProgress({ scrollY, sectionTop, sectionHeight, viewportHeight, stickyTop = 0 }) {
  const range = Math.max(1, sectionHeight - viewportHeight);
  return clamp((scrollY + stickyTop - sectionTop) / range, 0, 1);
}

/** The card nearest the front of the wheel for a given (fractional) offset. */
export function activeIndex(offset, count) {
  return clamp(Math.round(offset), 0, count - 1);
}

/**
 * Where one card sits on the wheel. `offset` is the fractional index of the
 * card at the front; cards rotate `step` degrees apart around the hub.
 */
export function cardPose(index, offset, step) {
  const distance = Math.abs(index - offset);
  return {
    angle: (index - offset) * step,
    distance,
    isFront: distance < 0.5,
    zIndex: 20 - Math.round(distance * 2),
  };
}

/** Scroll position that brings card `index` to the front. */
export function scrollTargetForCard({ index, count, sectionTop, sectionHeight, viewportHeight, stickyTop = 0 }) {
  const range = Math.max(1, sectionHeight - viewportHeight);
  const share = count > 1 ? index / (count - 1) : 0;
  return sectionTop - stickyTop + share * range + 2;
}

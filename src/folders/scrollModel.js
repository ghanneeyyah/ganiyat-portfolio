// Scroll timeline for the folder stack.
//
// Folder 0 (hero) is always in place. Every later folder k gets two
// stretches of scroll: one where it slides up from the bottom of the
// screen, then one where its own content scrolls inside it (only as much
// as that content overflows the folder). The next folder starts sliding
// after a short gap.

export const SLIDE = 0.9; // screen-heights of scroll to bring one folder fully up
export const GAP = 0.15; // screen-heights of pause before the next folder starts

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function buildTimeline(vh, extras, { slide = SLIDE, gap = GAP } = {}) {
  const D = Math.max(1, slide * vh);
  const ex = extras.map((e) => Math.max(0, e || 0));
  const starts = [0];
  const reads = [0];
  let cursor = ex[0];
  for (let k = 1; k < ex.length; k++) {
    const s = cursor + gap * vh;
    starts.push(s);
    reads.push(s + D);
    cursor = s + D + ex[k];
  }
  const scrollable = cursor + 0.3 * vh;
  return { D, starts, reads, extras: ex, scrollable, track: scrollable + vh };
}

export function frameAt(y, tl) {
  const n = tl.starts.length;
  const progress = tl.starts.map((s, k) => (k === 0 ? 1 : clamp((y - s) / tl.D, 0, 1)));
  const offset = tl.reads.map((r, k) => Math.round(clamp(y - r, 0, tl.extras[k])));
  // A folder's content fades out as the next one slides over it, so the
  // strip left uncovered by the tab staircase shows only the folder colour.
  const bodyOpacity = progress.map((_, k) => (k === n - 1 ? 1 : clamp(1 - progress[k + 1] * 2.5, 0, 1)));
  let current = 0;
  progress.forEach((p, k) => {
    if (p >= 0.5) current = k;
  });
  return { progress, offset, bodyOpacity, current };
}

export function targetFor(k, tl) {
  return k === 0 ? 0 : tl.reads[k];
}

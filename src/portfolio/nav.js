// Show/hide rule for the floating navbar.
const TOP_ZONE = 120; // always visible this close to the top of the page
const JITTER = 6; // ignore tiny scroll changes (trackpad wobble)

/** Returns whether the bar should be hidden after scrolling from prevY to y. */
export function nextNavHidden({ prevY, y, hidden, menuOpen }) {
  if (menuOpen || y < TOP_ZONE) return false;
  if (y > prevY + JITTER) return true;
  if (y < prevY - JITTER) return false;
  return hidden;
}

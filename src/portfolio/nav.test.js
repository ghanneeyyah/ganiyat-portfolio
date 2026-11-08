import { expect, it } from "vitest";
import { nextNavHidden } from "./nav";

it("hides the navbar on scroll down and brings it back on scroll up", () => {
  let hidden = false;
  const step = (prevY, y, menuOpen = false) => (hidden = nextNavHidden({ prevY, y, hidden, menuOpen }));

  expect(step(0, 80)).toBe(false); // near the top it stays put
  expect(step(80, 400)).toBe(true); // scrolling down hides it
  expect(step(400, 403)).toBe(true); // a tiny wobble changes nothing
  expect(step(403, 300)).toBe(false); // scrolling up shows it
  expect(step(300, 700)).toBe(true);
  expect(step(700, 900, true)).toBe(false); // open phone menu keeps it visible
});

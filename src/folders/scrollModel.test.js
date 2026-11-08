import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTimeline, frameAt, targetFor } from "./scrollModel.js";

test("folders stay hidden at the top and cover each other cleanly as you scroll", () => {
  const vh = 800;
  // hero, projects (overflows by 600px), experience, about (overflows by 300px), contact
  const tl = buildTimeline(vh, [0, 600, 0, 300, 0]);

  // At the very top only the hero is up; nothing else peeks in.
  const top = frameAt(0, tl);
  assert.deepEqual(top.progress, [1, 0, 0, 0, 0]);
  assert.equal(top.bodyOpacity[0], 1);
  assert.equal(top.current, 0);

  // Jumping to Projects lands it fully, hides the hero's content behind it,
  // and the next folder has not started moving yet.
  const proj = frameAt(targetFor(1, tl), tl);
  assert.equal(proj.progress[1], 1);
  assert.equal(proj.bodyOpacity[0], 0);
  assert.equal(proj.progress[2], 0);
  assert.equal(proj.offset[1], 0);

  // Scrolling further moves through the project list, capped at its overflow.
  const mid = frameAt(targetFor(1, tl) + 250, tl);
  assert.equal(mid.offset[1], 250);
  const past = frameAt(tl.starts[2] - 1, tl);
  assert.equal(past.offset[1], 600);

  // Once Experience lands, nothing of Projects shows through the tab strip.
  const exp = frameAt(targetFor(2, tl), tl);
  assert.equal(exp.progress[2], 1);
  assert.equal(exp.bodyOpacity[1], 0);
  assert.equal(exp.current, 2);

  // The last folder is reachable within the scroll track.
  assert.ok(targetFor(4, tl) <= tl.scrollable);
  assert.equal(frameAt(tl.scrollable, tl).current, 4);
});

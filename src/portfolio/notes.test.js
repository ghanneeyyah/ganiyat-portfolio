import { expect, it } from "vitest";
import { freshNoteIds } from "./notes";

it("drops only notes that arrive after the wall first loads", () => {
  // First load: everything already on the wall stays still.
  let step = freshNoteIds(null, ["a", "b"]);
  expect(step.fresh).toEqual([]);

  // Someone leaves a note: only that one drops.
  step = freshNoteIds(step.seen, ["a", "b", "c"]);
  expect(step.fresh).toEqual(["c"]);

  // The same list again (e.g. the server confirms the write): nothing drops.
  step = freshNoteIds(step.seen, ["a", "b", "c"]);
  expect(step.fresh).toEqual([]);
});

/**
 * Works out which notes on the wall are new since the last update.
 * The first full load only records what is already there, so old notes
 * never animate. Returns the ids that should play the drop animation and
 * the updated set of ids seen so far.
 */
export function freshNoteIds(seen, ids) {
  if (!seen) return { fresh: [], seen: new Set(ids) };
  const fresh = ids.filter((id) => !seen.has(id));
  if (!fresh.length) return { fresh, seen };
  return { fresh, seen: new Set([...seen, ...fresh]) };
}

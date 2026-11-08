import { describe, expect, it } from "vitest";
import { activeIndex, cardPose, scrollProgress, scrollTargetForCard } from "./wheel";

describe("project wheel", () => {
  const geometry = { sectionTop: 2000, sectionHeight: 2700, viewportHeight: 900, stickyTop: 76 };

  it("maps scroll through the pinned section onto the cards, and back again", () => {
    // Before the section pins, the first card is in front.
    expect(scrollProgress({ scrollY: 0, ...geometry })).toBe(0);
    // Past the end, progress stops at 1.
    expect(scrollProgress({ scrollY: 99999, ...geometry })).toBe(1);

    // Scrolling to each card's target brings exactly that card to the front.
    for (let index = 0; index < 4; index += 1) {
      const scrollY = scrollTargetForCard({ index, count: 4, ...geometry });
      const offset = scrollProgress({ scrollY, ...geometry }) * 3;
      expect(activeIndex(offset, 4)).toBe(index);
      expect(cardPose(index, offset, 16).isFront).toBe(true);
    }

    // Cards either side of the front one tilt in opposite directions.
    expect(cardPose(0, 1, 16).angle).toBe(-16);
    expect(cardPose(2, 1, 16).angle).toBe(16);
  });
});

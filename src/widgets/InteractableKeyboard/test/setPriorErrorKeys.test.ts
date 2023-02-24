import { describe, expect, test } from "vitest";
import { arrayListENG, keysCasesEng } from "../config/keyboardEN";
import { keysCases, arrayList } from "../config/keyboardRU";
import { setPriorErrorKeys } from "../lib/setPriorErrorKeys";

const mockArrayEN = [
  { letter: "l", priority: 1 },
  { letter: "g", priority: 3 },
  { letter: "a", priority: 2 },
  { letter: "x", priority: 3 },
  { letter: "N", priority: 1 },
  { letter: "&", priority: 3 },
  { letter: "|", priority: 1 },
  { letter: "/", priority: 2 },
];

const mockArrayRU = [
  { letter: "л", priority: 1 },
  { letter: "щ", priority: 3 },
  { letter: "ц", priority: 2 },
  { letter: "с", priority: 3 },
  { letter: "Ф", priority: 1 },
  { letter: ",", priority: 3 },
  { letter: "!", priority: 1 },
  { letter: "_", priority: 2 },
];

describe.each(mockArrayEN)("Check key priority for %s", (elem) => {
  const array = setPriorErrorKeys(
    elem.letter,
    elem.priority,
    arrayListENG,
    keysCasesEng
  );

  test("Check key priority", () => {
    expect(array).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errorPriority: elem.priority,
        }),
      ])
    );
  });
});

describe.each(mockArrayRU)("Check key priority for %s", (elem) => {
  const array = setPriorErrorKeys(
    elem.letter,
    elem.priority,
    arrayList,
    keysCases
  );

  test("Check key priority", () => {
    expect(array).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errorPriority: elem.priority,
        }),
      ])
    );
  });
});

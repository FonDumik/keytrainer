import { describe, expect, test } from "vitest";
import { arrayListENG, keysCasesEng } from "../config/keyboardEN";
import { keysCases, arrayList } from "../config/keyboardRU";
import { setSelectedKey } from "../lib/setSelectedKey";

let letterListRU: string[] = [];
let letterListEN: string[] = [];

for (let elem in keysCases) {
  for (let elem1 of keysCases[elem]) {
    letterListRU = [...letterListRU, elem1];
  }
}

for (let elem in keysCasesEng) {
  for (let elem1 of keysCasesEng[elem]) {
    letterListEN = [...letterListEN, elem1];
  }
}

describe.each(letterListRU)("test select %s", (elem) => {
  let array = setSelectedKey(keysCases, elem, arrayList);
  let selectedKey = array.find(
    (el) =>
      el.content1 === elem.toUpperCase() ||
      el.content1 === elem ||
      el.content2 === elem.toUpperCase() ||
      el.content2 === elem
  );
  test("is key selected?", () => {
    expect(array).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          selected: true,
          ...selectedKey,
        }),
      ])
    );
    expect(array).not.toBeUndefined();
    expect(selectedKey).not.toBeUndefined();
  });
  if (keysCases.symbols.includes(elem) || keysCases.upperCase.includes(elem)) {
    test("Is shift selected", () => {
      expect(array.filter((elem) => elem.content1 === "Shift")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            selected: true,
            ...array.find((elem) => elem.content1 === "Shift"),
          }),
        ])
      );
    });
  }
});

describe.each(letterListEN)("test select %s", (elem) => {
  let array = setSelectedKey(keysCasesEng, elem, arrayListENG);
  let selectedKey = array.find(
    (el) =>
      el.content1 === elem.toUpperCase() ||
      el.content1 === elem ||
      el.content2 === elem.toUpperCase() ||
      el.content2 === elem
  );
  test("is key selected?", () => {
    expect(array).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          selected: true,
          ...selectedKey,
        }),
      ])
    );
    expect(array).not.toBeUndefined();
    expect(selectedKey).not.toBeUndefined();
  });
  if (
    keysCasesEng.symbols.includes(elem) ||
    keysCasesEng.upperCase.includes(elem)
  ) {
    test("Is shift selected", () => {
      expect(array.filter((elem) => elem.content1 === "Shift")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            selected: true,
            ...array.find((elem) => elem.content1 === "Shift"),
          }),
        ])
      );
    });
  }
});

import { expect, test, describe } from "vitest";
import { clearErrorKey } from "../lib/clearErrorKey";
import { arrayListENG, keysCasesEng } from "../config/keyboardEN";
import { keysCases, arrayList } from "../config/keyboardRU";
import { setErrorKey } from "../lib/setErrorKey";

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

describe.each(letterListRU)("is error key %s cleared", (elem) => {
  test("is cleared?", () => {
    let array = setErrorKey(arrayList, elem, keysCases);
    let clearedArray = clearErrorKey(array, elem, keysCases);
    let letterConfig = arrayList.find(
      (el) =>
        el.content1 === elem.toUpperCase() ||
        el.content1 === elem ||
        el.content2 === elem.toUpperCase() ||
        el.content2 === elem
    );
    expect(clearedArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errorPressed: false,
          ...letterConfig,
        }),
      ])
    );
    expect(array).not.toBeUndefined();
    expect(letterConfig).not.toBeUndefined();
  });
});

describe.each(letterListEN)("is error key %s cleared", (elem) => {
  test("is cleared?", () => {
    let array = setErrorKey(arrayListENG, elem, keysCasesEng);
    let clearedArray = clearErrorKey(array, elem, keysCasesEng);
    let letterConfig = arrayListENG.find(
      (el) =>
        el.content1 === elem.toUpperCase() ||
        el.content1 === elem ||
        el.content2 === elem.toUpperCase() ||
        el.content2 === elem
    );
    expect(clearedArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errorPressed: false,
          ...letterConfig,
        }),
      ])
    );
    expect(clearedArray).not.toBeUndefined();
    expect(letterConfig).not.toBeUndefined();
  });
});

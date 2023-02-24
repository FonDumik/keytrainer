import { describe, expect, test } from "vitest";
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

describe.each(letterListEN)("test error pressed key %s", (elem) => {
  test("is errorPressed defined as true", () => {
    let array = setErrorKey(arrayListENG, elem, keysCasesEng);
    let letterConfig = arrayListENG.find(
      (el) =>
        el.content1 === elem.toUpperCase() ||
        el.content1 === elem ||
        el.content2 === elem.toUpperCase() ||
        el.content2 === elem
    );
    expect(array).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errorPressed: true,
          ...letterConfig,
        }),
      ])
    );
    expect(array).not.toBeUndefined();
    expect(letterConfig).not.toBeUndefined();
  });
  test("If pressed wrong letter from another language", () => {
    expect(setErrorKey(arrayListENG, "з", keysCasesEng)).toEqual(arrayListENG);
  });
});

describe.each(letterListRU)("test error pressed key %s", (elem) => {
  test("is errorPressed defined as true", () => {
    let array = setErrorKey(arrayList, elem, keysCases);
    let letterConfig = arrayList.find(
      (el) =>
        el.content1 === elem.toUpperCase() ||
        el.content1 === elem ||
        el.content2 === elem.toUpperCase() ||
        el.content2 === elem
    );
    expect(array).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errorPressed: true,
          ...letterConfig,
        }),
      ])
    );
    expect(array).not.toBeUndefined();
    expect(letterConfig).not.toBeUndefined();
  });
  test("If pressed wrong letter from another language", () => {
    expect(setErrorKey(arrayList, "p", keysCases)).toEqual(arrayList);
  });
});

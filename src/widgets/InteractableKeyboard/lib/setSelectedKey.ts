import { keyboardCasesKeys } from "shared/types/keyboardConfiguration";
import { setSelectedShift } from "shared/utils/setSelectedShift";
import { keyboardCases } from "shared/types/keyboardConfiguration";
import { keyConfigClik } from "shared/types/keyConfigClik";

export const setSelectedKey = (
  keysCases: keyboardCases,
  lastLetter: string,
  keysList: keyConfigClik[]
) => {
  let objectDetected;
  for (let elem in keysCases) {
    let isOnArray =
      keysCases[elem as keyof keyboardCasesKeys].includes(lastLetter);
    if (isOnArray) {
      objectDetected = {
        isOnArray,
        elemArray: elem,
      };
      break;
    }
  }
  if (objectDetected.isOnArray && objectDetected.elemArray === "downCase") {
    keysList = keysList.map((elem) => {
      elem.selected = false;
      if (
        elem.content1 === lastLetter.toUpperCase() ||
        elem.content1 === lastLetter
      ) {
        elem.selected = true;
      }
      return elem;
    });
    return keysList;
  } else if (
    objectDetected.isOnArray &&
    objectDetected.elemArray === "upperCase"
  ) {
    keysList.map((elem) => {
      elem.selected = false;
      return elem;
    });
    let needShift2: string = "";
    for (let elem of keysList) {
      if (elem.content1 === lastLetter) {
        elem.selected = true;
        needShift2 = elem.needShift;
      }
    }
    setSelectedShift(needShift2, keysList);
    return keysList;
  } else if (
    objectDetected.isOnArray &&
    objectDetected.elemArray === "symbols"
  ) {
    keysList.map((elem) => {
      elem.selected = false;
      return elem;
    });

    let needShift3: string = "";
    for (let elem of keysList) {
      if (elem.content1 === lastLetter) {
        elem.selected = true;
      } else if (elem.content2 === lastLetter) {
        elem.selected = true;
        needShift3 = elem.needShift;
      }
    }
    setSelectedShift(needShift3, keysList);
    return keysList;
  }
};

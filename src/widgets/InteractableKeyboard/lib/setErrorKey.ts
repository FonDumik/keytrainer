import { keyboardCasesKeys } from "shared/types/keyboardConfiguration";
import { keyboardCases } from "shared/types/keyboardConfiguration";
import { keyConfigClik } from "shared/types/keyConfigClik";

export const setErrorKey = (
  arrayList: keyConfigClik[],
  pressedKey: string,
  keysCases: keyboardCases
) => {
  let objectDetected;
  for (let elem in keysCases) {
    let isOnArray =
      keysCases[elem as keyof keyboardCasesKeys].includes(pressedKey);
    if (isOnArray) {
      objectDetected = {
        isOnArray,
        elemArray: elem,
      };
      break;
    }
  }

  if (objectDetected === undefined) {
    return arrayList;
  }

  if (objectDetected.isOnArray && objectDetected.elemArray === "downCase") {
    return arrayList.map((elem) => {
      if (
        elem.content1.toLowerCase() === pressedKey ||
        elem.content1 === pressedKey
      ) {
        elem.errorPressed = true;
      }
      return elem;
    });
  } else if (
    objectDetected.isOnArray &&
    objectDetected.elemArray === "upperCase"
  ) {
    return arrayList.map((elem) => {
      if (elem.content1 === pressedKey) {
        elem.errorPressed = true;
      }
      return elem;
    });
  } else if (
    objectDetected.isOnArray &&
    objectDetected.elemArray === "symbols"
  ) {
    return arrayList.map((elem) => {
      if (elem.content1 === pressedKey) {
        elem.errorPressed = true;
      } else if (elem.content2 === pressedKey) {
        elem.errorPressed = true;
      }

      return elem;
    });
  }
};

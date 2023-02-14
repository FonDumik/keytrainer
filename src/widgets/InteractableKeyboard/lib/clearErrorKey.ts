import { keyboardCasesKeys } from "shared/types/keyboardConfiguration";
import { keyboardCases } from "shared/types/keyboardConfiguration";
import { keyboardConfiguration } from "../config/keyboardRU";

export const clearErrorKey = (
  arrayList: keyboardConfiguration[],
  pressedKey: string,
  keysCases: keyboardCases
) => {
  for (let elem in keysCases) {
    if (keysCases[elem as keyof keyboardCasesKeys].indexOf(pressedKey) !== -1) {
      switch (elem) {
        case "downCase":
          return arrayList.map((elem) => {
            if (
              elem.content1.toLowerCase() === pressedKey ||
              elem.content1 === pressedKey
            ) {
              elem.errorPressed = false;
            }
            return elem;
          });
        case "upperCase":
          return arrayList.map((elem) => {
            if (elem.content1 === pressedKey) {
              elem.errorPressed = false;
            }
            return elem;
          });
        case "symbols":
          return arrayList.map((elem) => {
            if (elem.content1 === pressedKey || elem.content2 === pressedKey) {
              elem.errorPressed = false;
            }
            return elem;
          });
        default:
          return arrayList;
      }
    } else {
      return arrayList;
    }
  }
};

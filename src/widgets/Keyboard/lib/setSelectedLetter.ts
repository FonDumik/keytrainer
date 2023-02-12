import {
  keyboardCases,
  keyboardConfiguration,
  keyboardCasesKeys,
} from "shared/types/keyboardConfiguration";
import { setSelectedShift } from "shared/utils/setSelectedShift";

export function selectLetter(
  keysCases: keyboardCases,
  lastLetter: string,
  keysList: Array<keyboardConfiguration>
) {
  for (let elem in keysCases) {
    if (keysCases[elem as keyof keyboardCasesKeys].indexOf(lastLetter) !== -1) {
      switch (elem) {
        case "downCase":
          return keysList.map((elem) => {
            elem.selected = false;
            if (
              elem.content1 === lastLetter.toUpperCase() ||
              elem.content1 === lastLetter
            ) {
              elem.selected = true;
            }
            return elem;
          });
        case "upperCase":
          return keysList.map((elem) => {
            elem.selected = false;
            if (elem.content1 === lastLetter) {
              elem.selected = true;
            }

            setSelectedShift(elem.needShift, keysList);
            return elem;
          });
        case "symbols":
          return keysList.map((elem) => {
            elem.selected = false;
            if (elem.content1 === lastLetter) {
              elem.selected = true;
            } else if (elem.content2 === lastLetter) {
              elem.selected = true;
            }

            setSelectedShift(elem.needShift, keysList);
            return elem;
          });
        default:
          return keysList;
      }
    }
  }
}

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
        case "symbols":
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
        default:
          return keysList;
      }
    }
  }
}

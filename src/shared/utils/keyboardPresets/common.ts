import {
  keyboardCases,
  keyboardCasesKeys,
  keyboardConfiguration,
} from "../../types/keyboardConfiguration";

export function setSelectedShift(
  pos: string,
  keysList: Array<keyboardConfiguration>
) {
  for (let elem of keysList) {
    if (elem.positionFor !== undefined && elem.positionFor === pos) {
      elem.selected = true;
    }
  }
}

export function setFirstSelect(
  array: Array<keyboardConfiguration>,
  lastLetter: string,
  keysCases: keyboardCases
) {
  for (let elem in keysCases) {
    if (keysCases[elem as keyof keyboardCasesKeys].indexOf(lastLetter) !== -1) {
      switch (elem) {
        case "downCase":
          return array.map((elem) => {
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
          return array.map((elem) => {
            elem.selected = false;
            if (elem.content1 === lastLetter) {
              elem.selected = true;
            }

            if (elem.needShift === "left") {
              setSelectedShift("left", array);
            } else if (elem.needShift === "right") {
              setSelectedShift("right", array);
            }
            return elem;
          });
        case "symbols":
          return array.map((elem) => {
            elem.selected = false;
            if (elem.content1 === lastLetter) {
              elem.selected = true;
            }

            if (elem.needShift === "left") {
              setSelectedShift("left", array);
            } else if (elem.needShift === "right") {
              setSelectedShift("right", array);
            }
            return elem;
          });
        default:
          break;
      }
    }
  }
}

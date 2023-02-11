import { keyboardCasesKeys } from "shared/types/keyboardConfiguration";
import { keyboardCases } from "shared/types/keyboardConfiguration";
import { keyboardConfiguration } from "../config/keyboardRU";

export const setPriorErrorKeys = (
  priorKey: string,
  priority: number,
  arrayList: keyboardConfiguration[],
  keysCases: keyboardCases
) => {
  for (let elem in keysCases) {
    const isOnArray =
      keysCases[elem as keyof keyboardCasesKeys].includes(priorKey);
    if (isOnArray && elem === "downCase") {
      return arrayList.map((elem) => {
        if (
          elem.content1.toLowerCase() === priorKey ||
          elem.content1 === priorKey
        ) {
          elem.errorPriority = priority;
        }
        return elem;
      });
    } else if (isOnArray && elem === "upperCase") {
      return arrayList.map((elem) => {
        if (elem.content1 === priorKey) {
          elem.errorPriority = priority;
        }
        return elem;
      });
    } else if (isOnArray && elem === "symbols") {
      return arrayList.map((elem) => {
        if (elem.content1 === priorKey) {
          elem.errorPriority = priority;
        } else if (elem.content2 === priorKey) {
          elem.errorPriority = priority;
        }

        return elem;
      });
    }
  }
};

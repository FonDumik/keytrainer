import { keyboardCasesKeys } from "shared/types/keyboardConfiguration";
import { keyboardCases } from "shared/types/keyboardConfiguration";
import { keyConfigClik } from "shared/types/keyConfigClik";

export const setPriorErrorKeys = (
  priorKey: string,
  priority: number,
  arrayList: keyConfigClik[],
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

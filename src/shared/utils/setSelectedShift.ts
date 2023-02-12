import type { keyboardConfiguration } from "shared/types/keyboardConfiguration";

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

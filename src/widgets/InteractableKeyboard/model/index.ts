import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  keyboardConfiguration,
  keysCases,
  arrayList,
} from "../config/keyboardRU";
import { keyboardCasesKeys } from "shared/types/keyboardConfiguration";
import { setSelectedShift } from "shared/utils/keyboardPresets/common";
import { keyboardCases } from "shared/types/keyboardConfiguration";

interface keyboardState {
  keyList: keyboardConfiguration[];
  letterTypo: string;
  counterTypo: number;
  arrayTypo: string[];
}

const initialState: keyboardState = {
  keyList: arrayList,
  letterTypo: "",
  counterTypo: 0,
  arrayTypo: [],
};

const InteractiveKeyboardSlice = createSlice({
  name: "InteractiveKeyboard",
  initialState,
  reducers: {
    showErrorKey(state, action: PayloadAction<string>) {
      state.keyList = arrayErrorKey(state.keyList, action.payload);
    },
    showSelectedKey(state, action: PayloadAction<string>) {
      state.keyList = selectLetter(keysCases, action.payload, state.keyList);
    },
    returnKeyList(state) {
      state.keyList = state.keyList.map((elem) => {
        elem.errorPressed = false;
        return elem;
      });
    },
    setLetterTypo(state, action: PayloadAction<string>) {
      state.letterTypo = action.payload;
      state.counterTypo = state.counterTypo + 1;
    },
    setPriorityTypoKeys(state, typos: PayloadAction<number>) {
      const { arrayTypo } = state;
      const stack = arrayTypo.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {});

      let array = [];
      for (let elem in stack) {
        array.push(stack[elem]);
      }
      let array1 = [];
      let maxValue = Math.max.apply(null, array);

      for (let elem in stack) {
        if (stack[elem] === maxValue) {
          array1.push({ content: elem, priority: 1 });
        } else if (maxValue / stack[elem] <= 0.5) {
          array1.push({ content: elem, priority: 2 });
        } else if (maxValue / stack[elem] >= 0.5) {
          array1.push({ content: elem, priority: 3 });
        }
      }

      for (let elem of array1) {
        state.keyList = arrayPriorTypo(
          elem.content,
          elem.priority,
          state.keyList
        );
      }
    },
    setArrayTypos(state, action: PayloadAction<string>) {
      state.arrayTypo = [...state.arrayTypo, action.payload];
    },
    clearTypoKeyboard(state) {
      state.keyList = state.keyList.map((elem) => {
        elem.errorPriority = 0;
        return elem;
      });
      state.arrayTypo = [];
    },
  },
});

const arrayPriorTypo = (
  priorKey: string,
  priority: number,
  arrayList: keyboardConfiguration[]
) => {
  for (let elem in keysCases) {
    if (keysCases[elem as keyof keyboardCasesKeys].indexOf(priorKey) !== -1) {
      switch (elem) {
        case "downCase":
          return arrayList.map((elem) => {
            if (
              elem.content1.toLowerCase() === priorKey ||
              elem.content1 === priorKey
            ) {
              elem.errorPriority = priority;
            }
            return elem;
          });
        case "upperCase":
          return arrayList.map((elem) => {
            if (elem.content1 === priorKey) {
              elem.errorPriority = priority;
            }
            return elem;
          });
        case "symbols":
          return arrayList.map((elem) => {
            if (elem.content1 === priorKey) {
              elem.errorPriority = priority;
            } else if (elem.content2 === priorKey) {
              elem.errorPriority = priority;
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

const arrayErrorKey = (
  arrayList: keyboardConfiguration[],
  pressedKey: string
) => {
  for (let elem in keysCases) {
    if (keysCases[elem as keyof keyboardCasesKeys].indexOf(pressedKey) !== -1) {
      switch (elem) {
        case "downCase":
          return arrayList.map((elem) => {
            elem.errorPressed = false;
            if (
              (pressedKey === "ShiftLeft" && elem.positionFor === "left") ||
              (pressedKey === "ShiftRight" && elem.positionFor === "right")
            ) {
              elem.errorPressed = true;
            }
            if (
              elem.content1.toLowerCase() === pressedKey ||
              elem.content1 === pressedKey
            ) {
              elem.errorPressed = true;
            }
            return elem;
          });
        case "upperCase":
          return arrayList.map((elem) => {
            elem.errorPressed = false;
            if (elem.content1 === pressedKey) {
              elem.errorPressed = true;
            }
            return elem;
          });
        case "symbols":
          return arrayList.map((elem) => {
            elem.errorPressed = false;
            if (elem.content1 === pressedKey) {
              elem.errorPressed = true;
            } else if (elem.content2 === pressedKey) {
              elem.errorPressed = true;
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

function selectLetter(
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

export const {
  showErrorKey,
  returnKeyList,
  setLetterTypo,
  showSelectedKey,
  setPriorityTypoKeys,
  clearTypoKeyboard,
  setArrayTypos,
} = InteractiveKeyboardSlice.actions;

export const InteractiveKeyboardReducer = InteractiveKeyboardSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { keyboardConfiguration } from "shared/types/keyboardConfiguration";
import { arrayList } from "shared/utils/keyboardPresets/keyboardRU";
import { keysCases } from "shared/utils/keyboardPresets/keyboardRU";
import { keyboardCasesKeys } from "shared/types/keyboardConfiguration";

interface keyboardState {
  keyList: keyboardConfiguration[];
  letterTypo: string;
  counterTypo: number;
}

const initialState: keyboardState = {
  keyList: arrayList,
  letterTypo: "",
  counterTypo: 0,
};

const InteractiveKeyboardSlice = createSlice({
  name: "InteractiveKeyboard",
  initialState,
  reducers: {
    showPressedKey(state, action: PayloadAction<string>) {
      state.keyList = arraySelectedKey(state.keyList, action.payload);
    },
    returnKeyList(state) {
      state.keyList = initialState.keyList;
    },
    setLetterTypo(state, action: PayloadAction<string>) {
      state.letterTypo = action.payload;
      state.counterTypo = state.counterTypo + 1;
    },
  },
});

const arraySelectedKey = (
  arrayList: keyboardConfiguration[],
  pressedKey: string
) => {
  for (let elem in keysCases) {
    if (keysCases[elem as keyof keyboardCasesKeys].indexOf(pressedKey) !== -1) {
      switch (elem) {
        case "downCase":
          return arrayList.map((elem) => {
            elem.selected = false;
            if (
              (pressedKey === "ShiftLeft" && elem.positionFor === "left") ||
              (pressedKey === "ShiftRight" && elem.positionFor === "right")
            ) {
              elem.selected = true;
            }
            if (
              elem.content1.toLowerCase() === pressedKey ||
              elem.content1 === pressedKey
            ) {
              elem.selected = true;
            }
            return elem;
          });
        case "upperCase":
          return arrayList.map((elem) => {
            elem.selected = false;
            if (elem.content1 === pressedKey) {
              elem.selected = true;
            }
            return elem;
          });
        case "symbols":
          return arrayList.map((elem) => {
            elem.selected = false;
            if (elem.content1 === pressedKey) {
              elem.selected = true;
            } else if (elem.content2 === pressedKey) {
              elem.selected = true;
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

export const { showPressedKey, returnKeyList, setLetterTypo } =
  InteractiveKeyboardSlice.actions;

export const InteractiveKeyboardReducer = InteractiveKeyboardSlice.reducer;

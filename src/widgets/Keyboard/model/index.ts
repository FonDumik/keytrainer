import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  keyboardCases,
  keyboardConfiguration,
  keyboardCasesKeys,
} from "shared/types/keyboardConfiguration";
import { keysCases, arrayList } from "shared/utils/keyboardPresets/keyboardRU";
import {
  keysCasesEng,
  arrayListENG,
} from "shared/utils/keyboardPresets/keyboardENG";
import { setSelectedShift } from "shared/utils/keyboardPresets/common";

interface keyboardState {
  keyList: Array<keyboardConfiguration>;
  configurationKeyboard: string;
}

const initialState: keyboardState = {
  keyList: arrayList,
  configurationKeyboard: "RU",
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    updateKeyboard(state, lastLetter: PayloadAction<string>) {
      if (state.configurationKeyboard === "RU") {
        state.keyList = selectLetter(
          keysCases,
          lastLetter.payload,
          state.keyList
        );
      } else if (state.configurationKeyboard === "ENG") {
        state.keyList = selectLetter(
          keysCasesEng,
          lastLetter.payload,
          state.keyList
        );
      }
    },
    changeKeyboard(state, action: PayloadAction<string>) {
      if (action.payload === "RU") {
        state.keyList = arrayList;
        state.configurationKeyboard = "RU";
      } else if (action.payload === "ENG") {
        state.keyList = arrayListENG;
        state.configurationKeyboard = "ENG";
      }
    },
  },
});

export const { updateKeyboard, changeKeyboard } = keyboardSlice.actions;

export const keyboardReducer = keyboardSlice.reducer;

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

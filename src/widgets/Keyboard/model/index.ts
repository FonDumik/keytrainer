import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { keyboardConfiguration } from "shared/types/keyboardConfiguration";
import { keysCases, arrayList } from "../config/keyboardRU";
import { keysCasesEng, arrayListENG } from "../config/keyboardENG";
import { selectLetter } from "../lib/setSelectedLetter";

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

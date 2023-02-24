import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { textInputConfig } from "shared/types/textInputConfig";
import { keyConfigClik } from "shared/types/keyConfigClik";
import { keyboardCases } from "shared/types/keyboardConfiguration";

import { keysCases, arrayList } from "../config/keyboardRU";
import { arrayListENG, keysCasesEng } from "../config/keyboardEN";

import { createPriorArray } from "../lib/createPriorArray";
import { setErrorKey } from "../lib/setErrorKey";
import { setSelectedKey } from "../lib/setSelectedKey";
import { setPriorErrorKeys } from "../lib/setPriorErrorKeys";
import { clearErrorKey } from "../lib/clearErrorKey";

interface keyboardState {
  keysCases: keyboardCases;
  keyList: keyConfigClik[];
  letterTypo: string;
  counterTypo: number;
  arrayTypo: string[];
}

const initialState: keyboardState = {
  keysCases: keysCases,
  keyList: arrayList,
  letterTypo: "",
  counterTypo: 0,
  arrayTypo: [],
};

export const InteractiveKeyboardSlice = createSlice({
  name: "InteractiveKeyboard",
  initialState,
  reducers: {
    showErrorKey(state, action: PayloadAction<string>) {
      state.keyList = setErrorKey(
        state.keyList,
        action.payload,
        state.keysCases
      );
    },
    showSelectedKey(state, action: PayloadAction<string>) {
      state.keyList = setSelectedKey(
        state.keysCases,
        action.payload,
        state.keyList
      );
    },
    returnKeyList(state, action: PayloadAction<string>) {
      state.keyList = clearErrorKey(
        state.keyList,
        action.payload,
        state.keysCases
      );
    },
    setLetterTypo(state, action: PayloadAction<string>) {
      state.letterTypo = action.payload;
      state.counterTypo = state.counterTypo + 1;
    },
    setPriorityTypoKeys(state, inputText: PayloadAction<textInputConfig[]>) {
      let priorArray = createPriorArray(inputText.payload);

      for (let elem of priorArray) {
        state.keyList = setPriorErrorKeys(
          elem.content,
          elem.priority,
          state.keyList,
          state.keysCases
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
    clearSelectedKeys(state) {
      state.keyList = state.keyList.map((elem) => {
        elem.selected = false;
        return elem;
      });
    },
    changeKeyboard(state, action: PayloadAction<string>) {
      if (action.payload === "Ru") {
        state.keyList = arrayList;
        state.keysCases = keysCases;
      } else if (action.payload === "En") {
        state.keyList = arrayListENG;
        state.keysCases = keysCasesEng;
      }
    },
  },
});

export const {
  showErrorKey,
  returnKeyList,
  setLetterTypo,
  showSelectedKey,
  setPriorityTypoKeys,
  clearTypoKeyboard,
  setArrayTypos,
  clearSelectedKeys,
  changeKeyboard,
} = InteractiveKeyboardSlice.actions;

export const InteractiveKeyboardReducer = InteractiveKeyboardSlice.reducer;

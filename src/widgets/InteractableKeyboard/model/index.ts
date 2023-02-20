import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { keysCases, arrayList } from "../config/keyboardRU";
import { setErrorKey } from "../lib/setErrorKey";
import { setSelectedKey } from "../lib/setSelectedKey";
import { setPriorErrorKeys } from "../lib/setPriorErrorKeys";
import { clearErrorKey } from "../lib/clearErrorKey";
import { textInputConfig } from "widgets/InputTextClikClik";
import { keyConfigClik } from "shared/types/keyConfigClik";
import { arrayListENG, keysCasesEng } from "../config/keyboardEN";
import { keyboardCases } from "shared/types/keyboardConfiguration";

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

const InteractiveKeyboardSlice = createSlice({
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
      let arrayText = inputText.payload
        .filter((elem) => elem.isTypo)
        .map((elem) => {
          return elem.content;
        });
      const stack = arrayText.reduce((acc, el) => {
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
        } else if (maxValue / stack[elem] > 0.5) {
          array1.push({ content: elem, priority: 3 });
        }
      }
      for (let elem of array1) {
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

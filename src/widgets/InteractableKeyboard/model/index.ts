import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  keyboardConfiguration,
  keysCases,
  arrayList,
} from "../config/keyboardRU";
import { setErrorKey } from "../lib/setErrorKey";
import { setSelectedKey } from "../lib/setSelectedKey";
import { setPriorErrorKeys } from "../lib/setPriorErrorKeys";

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
      state.keyList = setErrorKey(state.keyList, action.payload, keysCases);
    },
    showSelectedKey(state, action: PayloadAction<string>) {
      state.keyList = setSelectedKey(keysCases, action.payload, state.keyList);
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
        } else if (maxValue / stack[elem] > 0.5) {
          array1.push({ content: elem, priority: 3 });
        }
      }
      for (let elem of array1) {
        state.keyList = setPriorErrorKeys(
          elem.content,
          elem.priority,
          state.keyList,
          keysCases
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

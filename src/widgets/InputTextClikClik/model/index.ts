import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateOneWordText } from "shared/utils/textGenerator/generateOneWordText";
import { arrayWords } from "shared/utils/textGenerator/wordsToPrint";

interface InputTextClikClikProps {
  textInput: string;
  lastLetter: string;
  completeText: string;
  inputLetter: string;
  letterCounter: number;
  typos: number;
  inputTextLength: number;
}

const initialState: InputTextClikClikProps = {
  textInput: generateOneWordText(arrayWords),
  lastLetter: "",
  completeText: "",
  inputLetter: "",
  letterCounter: 0,
  typos: 0,
  inputTextLength: 0,
};

initialState.lastLetter = initialState.textInput[0];
initialState.inputTextLength = initialState.textInput.length;
initialState.textInput = initialState.textInput.slice(1, -1);

const InputTextClikClikSlice = createSlice({
  name: "InputTextClikClik",
  initialState,
  reducers: {
    updateLastLetter(state, action: PayloadAction<string>) {
      state.lastLetter = action.payload;
    },
    updateTextInput(state) {
      const text = generateOneWordText(arrayWords);
      state.textInput = text.slice(1, -1);
      state.lastLetter = text[0];
      state.inputTextLength = text.length;
      state.completeText = "";
    },
    decreaseTextInput(state) {
      state.completeText = state.completeText + state.lastLetter;
      state.lastLetter = state.textInput[0];
      state.textInput = state.textInput.slice(1);
    },
    setInputLetter(state, action: PayloadAction<string>) {
      state.inputLetter = action.payload;
    },
    addLetterCounter(state) {
      state.letterCounter++;
    },
    clearLetterCounter(state) {
      state.letterCounter = 0;
    },
    addTypos(state) {
      state.typos++;
    },
    clearTypos(state) {
      state.typos = 0;
    },
  },
});

export const {
  updateLastLetter,
  updateTextInput,
  decreaseTextInput,
  setInputLetter,
  addLetterCounter,
  clearLetterCounter,
  addTypos,
  clearTypos,
} = InputTextClikClikSlice.actions;

export const InputTextClikClikReducer = InputTextClikClikSlice.reducer;

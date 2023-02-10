import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateOneWordText } from "shared/utils/textGenerator/generateOneWordText";
import { arrayWords } from "shared/utils/textGenerator/wordsToPrint";

export type textInputConfig = {
  content: string;
  correctlyPressed: boolean;
  typoPressed: boolean;
  isSelected: boolean;
};

interface InputTextClikClikProps {
  inputText: textInputConfig[];
  letterCounter: number;
  typos: number;
  inputTextLength: number;
  isEndLine: boolean;
}

const initialState: InputTextClikClikProps = {
  inputText: generateOneWordText(arrayWords)
    .slice(0, -1)
    .split("")
    .map((elem) => {
      return {
        content: elem,
        correctlyPressed: false,
        typoPressed: false,
        isSelected: false,
      };
    }),
  letterCounter: 0,
  typos: 0,
  inputTextLength: 0,
  isEndLine: false,
};

initialState.inputText[0].isSelected = true;
initialState.inputTextLength = initialState.inputText.length;

const InputTextClikClikSlice = createSlice({
  name: "InputTextClikClik",
  initialState,
  reducers: {
    updateLastLetterForward(state) {
      const { inputText } = state;
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)].isSelected = false;
      inputText[inputText.indexOf(lastLetter)].correctlyPressed = true;

      inputText[inputText.indexOf(lastLetter) + 1].isSelected = true;
    },
    updateLastLetterBackward(state) {
      const { inputText } = state;
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)].isSelected = false;

      inputText[inputText.indexOf(lastLetter) - 1].isSelected = true;
      inputText[inputText.indexOf(lastLetter) - 1].correctlyPressed = false;
      inputText[inputText.indexOf(lastLetter) - 1].typoPressed = false;
    },
    updateTextInput(state) {
      const text = generateOneWordText(arrayWords)
        .slice(0, -1)
        .split("")
        .map((elem) => {
          return {
            content: elem,
            correctlyPressed: false,
            typoPressed: false,
            isSelected: false,
          };
        });
      text[0].isSelected = true;
      state.inputText = text;
      state.isEndLine = false;
    },
    initTypo(state) {
      const { inputText } = state;
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)].isSelected = false;
      inputText[inputText.indexOf(lastLetter)].typoPressed = true;
      inputText[inputText.indexOf(lastLetter) + 1].isSelected = true;
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
    setEndStroke(state) {
      const { inputText } = state;
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)].isSelected = false;
      state.isEndLine = true;
    },
  },
});

export const {
  updateLastLetterForward,
  updateLastLetterBackward,
  updateTextInput,
  addLetterCounter,
  clearLetterCounter,
  addTypos,
  clearTypos,
  initTypo,
  setEndStroke,
} = InputTextClikClikSlice.actions;

export const InputTextClikClikReducer = InputTextClikClikSlice.reducer;

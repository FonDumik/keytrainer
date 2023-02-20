import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayWords } from "shared/utils/wordsToPrint";
import { configureStroke } from "../lib/configureStroke";
import { generateText } from "../lib/generateText";
import { configText } from "widgets/SidebarClikClik/model";

export type textInputConfig = {
  content: string;
  correctlyPressed: boolean;
  typoPressed: boolean;
  isSelected: boolean;
  isTypo: boolean;
};

interface InputTextClikClikProps {
  inputText: textInputConfig[];
  letterCounter: number;
  typos: number;
  inputTextLength: number;
  isEndLine: boolean;
}

const initialState: InputTextClikClikProps = {
  inputText: configureStroke(
    generateText(
      {
        language: "Ru",
        isNumbers: false,
        isCapitalLetters: false,
        isPunctuation: false,
      },
      "Ru"
    )
  ),
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

      inputText[inputText.indexOf(lastLetter) - 1] = {
        ...inputText[inputText.indexOf(lastLetter) - 1],
        isSelected: true,
        correctlyPressed: false,
        typoPressed: false,
      };
    },
    updateTextInput(state, config: PayloadAction<configText>) {
      const text = configureStroke(
        generateText(config.payload, config.payload.language)
      );
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
      inputText[inputText.indexOf(lastLetter)].isTypo = true;
      inputText[inputText.indexOf(lastLetter)].correctlyPressed = false;
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
      state.inputText = state.inputText.map((elem) => {
        elem.isTypo = false;
        return elem;
      });
    },
    setEndStroke(state) {
      const { inputText } = state;
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)] = {
        ...inputText[inputText.indexOf(lastLetter)],
        isSelected: false,
        correctlyPressed: true,
      };
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateOneWordText } from "shared/utils/textGenerator/generateOneWordText";
import { arrayWords } from "shared/utils/textGenerator/wordsToPrint";

interface InputTextClikClikProps {
  textInput: string;
  lastLetter: string;
  completeText: string;
  inputLetter: string;
}

const initialState: InputTextClikClikProps = {
  textInput: generateOneWordText(arrayWords),
  lastLetter: "",
  completeText: "",
  inputLetter: "",
};

initialState.lastLetter = initialState.textInput[0];
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
  },
});

export const {
  updateLastLetter,
  updateTextInput,
  decreaseTextInput,
  setInputLetter,
} = InputTextClikClikSlice.actions;

export const InputTextClikClikReducer = InputTextClikClikSlice.reducer;

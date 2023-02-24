import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { textInputConfig } from "widgets/InputTextClikClik";

interface headerResultsProps {
  speedArray: number[];
  accuracy: number;
}

const initialState: headerResultsProps = {
  speedArray: [],
  accuracy: 100,
};

const HeaderResultsSlice = createSlice({
  name: "headerResults",
  initialState,
  reducers: {
    updateSpeed(state, action: PayloadAction<number>) {
      state.speedArray = [...state.speedArray, action.payload];
    },
    updateAccuracy(state, action: PayloadAction<textInputConfig[]>) {
      const inputText = action.payload;
      const lenght = inputText.reduce((accumulator, currentValue) => {
        if (
          currentValue.correctlyPressed === true ||
          currentValue.typoPressed === true
        ) {
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0);

      const typos = inputText.reduce((accumulator, currentValue) => {
        if (currentValue.typoPressed === true) {
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0);

      if (lenght !== 0) {
        state.accuracy = Math.floor(((lenght - typos) / lenght) * 100);
      }
    },
    clearSpeed(state) {
      state.speedArray = [];
    },
    clearAccuracy(state) {
      state.accuracy = 100;
    },
  },
});

export const { updateSpeed, updateAccuracy, clearSpeed, clearAccuracy } =
  HeaderResultsSlice.actions;

export const headerResultsReducer = HeaderResultsSlice.reducer;

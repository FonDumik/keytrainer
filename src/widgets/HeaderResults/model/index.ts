import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface headerResultsProps {
  speedArray: number[];
  accuracy: number;
}

type updateAccuracyProps = {
  textLength: number;
  typos: number;
};

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
    updateAccuracy(state, action: PayloadAction<updateAccuracyProps>) {
      const { textLength, typos } = action.payload;
      state.accuracy = Math.floor(((textLength - typos) / textLength) * 100);
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

export const average = (array: number[]) => {
  if (array.length === 0) {
    return 0;
  }

  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue * 60,
    0
  );

  return Math.floor(sum / array.length);
};

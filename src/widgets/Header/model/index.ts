import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface headerState {
  speed: string | number;
  errors: string | number;
  speedArray: number[];
  errorsArray: number[];
  isRestart: boolean;
}

const initialState: headerState = {
  speed: "--",
  errors: "--",
  speedArray: [],
  errorsArray: [],
  isRestart: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    updateSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
      state.speedArray = [...state.speedArray, action.payload];
    },
    updateErrors(state, action: PayloadAction<number>) {
      state.errors = action.payload;
      state.errorsArray = [...state.errorsArray, action.payload];
    },
    setIsRestart(state, action: PayloadAction<boolean>) {
      state.isRestart = action.payload;
    },
  },
});

export const { updateErrors, updateSpeed, setIsRestart } = headerSlice.actions;
export const headerReducer = headerSlice.reducer;

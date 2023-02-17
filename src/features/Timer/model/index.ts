import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface timerState {
  selectedTime: number;
  currentTime: number;
}

const initialState: timerState = {
  selectedTime: 5,
  currentTime: 0,
};

initialState.currentTime = initialState.selectedTime * 60;

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setSelectedTime(state, action: PayloadAction<number>) {
      state.selectedTime = action.payload;
      state.currentTime = action.payload * 60;
    },
    updateCurrentTime(state) {
      state.currentTime -= 1;
    },
  },
});

export const { setSelectedTime, updateCurrentTime } = timerSlice.actions;

export const timerReducer = timerSlice.reducer;

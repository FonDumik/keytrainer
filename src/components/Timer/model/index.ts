import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface timerState {
    selectedTime: number,
    currentTime: number,
}

const initialState: timerState = {
    selectedTime: 5,
    currentTime: 0
}

initialState.currentTime = initialState.selectedTime * 60

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setSelectedTime(state, action: PayloadAction<number>){
        state.selectedTime = action.payload
        state.currentTime = action.payload * 60
    },
    updateCurrentTime(state){
        state.currentTime -= 1
    }
  } 
});

export const {setSelectedTime, updateCurrentTime} = timerSlice.actions

export const timerReducer = timerSlice.reducer

export function renderToTimer(currentTime: number){
    let minutes: number = Math.floor((currentTime/60));
    let seconds: number | string = Math.floor(currentTime % 60);
    if(seconds < 10){
            seconds = '0'+seconds;
    }
    return `${minutes}:${seconds}`;       
}
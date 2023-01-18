import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface headerState {
    speed: string | number,
    errors: string | number,
    speedArray: number[],
    errorsArray: number[],
    isRestart: boolean
}

const initialState: headerState = {
    speed: '--',
    errors: '--',
    speedArray: [],
    errorsArray: [],
    isRestart: false
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    updateSpeed(state, action: PayloadAction<number>){
        state.speed = action.payload
        state.speedArray = [...state.speedArray, action.payload]
    },
    updateErrors(state, action: PayloadAction<number>){
        state.errors = action.payload
        state.errorsArray = [...state.errorsArray, action.payload]
    },
    setIsRestart(state, action: PayloadAction<boolean>){
        state.isRestart = action.payload
    }
  }
});

export const { updateErrors, updateSpeed, setIsRestart } = headerSlice.actions
export default headerSlice.reducer

export function average(array: Array<number>){
    if(array.length !== 0){
        let sum = 0
        for(let elem of array){
            sum = Number(sum + elem)
        }
        let number = Number(sum/array.length)
        return number.toFixed(2)
    }else{
        return '--'
    }
}
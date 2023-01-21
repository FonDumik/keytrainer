import { createSlice } from '@reduxjs/toolkit'
import { generateSentence } from 'shared/utils/textGenerator/generateSentences';

interface textContainerState {
    complexText: string[]
}

const initialState: textContainerState = {
    complexText: generateSentence()
}

const textContainerSlice = createSlice({
  name: "textContainer",
  initialState,
  reducers: {
    resetComplexText(state){
        state.complexText = generateSentence()
    },
    updateComplexText(state){
        if(state.complexText.length !== 0){
            let nextState = state.complexText
            nextState.shift()
            state.complexText = nextState
        }
    }
  }
});

export const { updateComplexText, resetComplexText } = textContainerSlice.actions

export const textContainerReducer = textContainerSlice.reducer
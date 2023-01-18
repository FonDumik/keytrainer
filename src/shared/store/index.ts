import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "../../components/Header"
import { inputTextReducer } from "../../components/InputText"
import { keyboardReducer } from "../../components/Keyboard"
import { configurationTrainingReducer } from "../../components/ConfigureTraining"
import { timerReducer } from "../../components/Timer"

export const store = configureStore({
    reducer: {
        headerReducer,
        inputTextReducer,
        keyboardReducer,
        configurationTrainingReducer,
        timerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
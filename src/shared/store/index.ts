import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "../../widgets/Header"
import { inputTextReducer } from "../../widgets/InputText"
import { keyboardReducer } from "../../widgets/Keyboard"
import { configurationTrainingReducer } from "../../features/ConfigureTraining"
import { timerReducer } from "../../features/Timer"

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
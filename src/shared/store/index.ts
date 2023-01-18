import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "../../widgets/Header"
import { inputTextReducer } from "../../widgets/InputText"
import { keyboardReducer } from "../../widgets/Keyboard"
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
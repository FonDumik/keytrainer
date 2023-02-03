import { configureStore } from "@reduxjs/toolkit";
import { InteractiveKeyboardReducer } from "widgets/InteractableKeyboard";
import { InputTextClikClikReducer } from "widgets/InputTextClikClik";

export const storeClikClik = configureStore({
  reducer: {
    InteractiveKeyboardReducer,
    InputTextClikClikReducer,
  },
});

export type RootState = ReturnType<typeof storeClikClik.getState>;
export type AppDispatch = typeof storeClikClik.dispatch;

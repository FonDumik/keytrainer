import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../../pages/ClikClik/model";

export const useClikDispatch: () => AppDispatch = useDispatch;
export const useClikSelector: TypedUseSelectorHook<RootState> = useSelector;

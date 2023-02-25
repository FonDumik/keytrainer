import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../../pages/Klavaogr/model/store";

export const useKlavaogrDispatch: () => AppDispatch = useDispatch;
export const useKlavaogrSelector: TypedUseSelectorHook<RootState> = useSelector;

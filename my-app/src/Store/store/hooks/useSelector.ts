import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppState } from "../store";

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { 
    useAppSelector as useSelector
}
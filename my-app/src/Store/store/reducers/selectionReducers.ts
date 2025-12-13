import type { Action } from "../store";
import type { Selection } from "../../Model/selection";
import { presentation } from "../../Services/data/generalData";

const selection: Selection = {
    selectedSlides: Array<string>(presentation.slides[0].id),
    selectedSlideObjects: Array<string>()
}

const selectionReducer = (state = selection, { type, payload }: Action): Selection => { 
    switch (type) {
        case "SELECT_SLIDE":
            return {
                ...state,
                selectedSlides: [payload.id]
            };
        case "SELECT_SLIDE_OBJECT":
            if (state.selectedSlideObjects.find(id => id === payload.id)) {
                return state;
            }
            return {
                ...state,
                selectedSlideObjects:
                    payload.isCtrlPressed
                        ? state.selectedSlideObjects.concat(payload.id)
                        : [payload.id]
            };
        case "NULLIFY_SLIDE_SELECTION":
            return {
                ...state,
                selectedSlides: []
            };
        case "NULLIFY_SLIDE_OBJECT_SELECTION":
            return {
                ...state,
                selectedSlideObjects: []
            };
        case "SET_STATE":
            return payload.state.selection
    }
    return state;
}

export { 
    selectionReducer
}
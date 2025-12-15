import type { Presentation } from "../../Model/presentation";
import type { AppState } from "../store";

const setState = (presentation: Presentation) => ({ 
    type: "SET_STATE",
    payload: {
        state: {
            title: presentation.title,
            slides: presentation.slides,
            selection: {
                selectedSlides: [],
                selectedSlideObjects: []
            },
            contextMenu: {
                isEnabled: false
            },
            modalWindow: {
                isEnabled: false
            }

        } as AppState
    }
})

export {
    setState
}
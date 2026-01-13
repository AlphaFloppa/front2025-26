import type { Selection } from "../../Model/selection";
import { presentation } from "../../Services/data/generalData";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type State = Selection;

interface SelectSlidePayload {
    id: string;
}

interface SelectSlideObjectPayload {
    id: string;
    isCtrlPressed: boolean;
}

interface SetStatePayload {
    state: {
        selection: Selection;
    };
}

const initialState: State = {
    selectedSlides: Array<string>(presentation.slides[0].id),
    selectedSlideObjects: Array<string>()
}

const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        selectSlide: (state: State, { payload }: PayloadAction<SelectSlidePayload>) => {
            state.selectedSlides = [payload.id];
        },
        selectSlideObject: (state: State, { payload }: PayloadAction<SelectSlideObjectPayload>) => {
            const { id, isCtrlPressed } = payload;
            if (state.selectedSlideObjects.includes(id)) {
                return;
            }
            if (isCtrlPressed) {
                state.selectedSlideObjects.push(id);
            } else {
                state.selectedSlideObjects = [id];
            }
        },

        nullifySlideSelection: (state: State) => {
            state.selectedSlides = [];
        },

        nullifySlideObjectSelection: (state: State) => {
            state.selectedSlideObjects = [];
        },

        setState: (_: State, { payload }: PayloadAction<SetStatePayload>) => {
            //console.log("selection slice setState");
            return payload.state.selection;
        },
    },
});

export default selectionSlice;
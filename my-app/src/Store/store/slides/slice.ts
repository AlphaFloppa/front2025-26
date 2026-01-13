import * as Services from "../../Services/editFunctions";
import type { Background, SlideObject } from "../../Model/slideContent";
import type { Slide } from "../../Model/slide";
import { presentation } from "../../Services/data/generalData";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type State = Slide[];

interface AddSlidePayload {
    id: string;
}

interface RemoveSlidePayload {
    id: string;
}

interface MoveSlidePayload {
    order: string[]
}

interface RemoveObjectsFromSlidePayload {
    id: string;
    removingObjectsIds: string[];
}

interface AddObjectToSlidePayload {
    slideId: string;
    object: SlideObject;
}

interface MoveSlideObjectsPayload {
    id: string;
    objectsIds: string[];
    changes: { x: number; y: number };
}

interface ResizeSlideObjectPayload {
    id: string;
    objectId: string;
    sizeChanges: { width: number; height: number };
    positionChanges: { x: number; y: number };
}

interface EditTextPayload {
    id: string;
    objectId: string;
    newText: string;
}

interface EditFontFamilyPayload {
    id: string;
    objectId: string;
    newFontFamily: string;
}

interface EditFontSizePayload {
    id: string;
    objectId: string;
    newFontSize: number;
}

interface EditBackgroundPayload {
    id: string;
    newBackground: Background;
}

interface SetStatePayload {
    state: {
        slides: Slide[];
    };
}

const initialState: Slide[] = presentation.slides;

const slideSlice = createSlice(
    {
        name: "slides",
        initialState,
        reducers: {
            addSlide: (state: State, { payload }: PayloadAction<AddSlidePayload>) => {
                const newSlide = Services.createSlide({ id: payload.id });
                return Services.addSlide(state, { slide: newSlide });
            },

            removeSlide: (state: State, { payload }: PayloadAction<RemoveSlidePayload>) => {
                return Services.removeSlide(state, { id: payload.id });
            },

            moveSlide: (state: State, { payload }: PayloadAction<MoveSlidePayload>) => {
                return Services.replaceSlide(state, { order: payload.order });
            },

            removeObjectsFromSlide: (state: State, { payload }: PayloadAction<RemoveObjectsFromSlidePayload>) => {
                return Services.removeObjectsFromSlide(state, {
                    slideId: payload.id,
                    removingObjectsIds: payload.removingObjectsIds
                });
            },

            addObjectToSlide: (state: State, { payload }: PayloadAction<AddObjectToSlidePayload>) => {
                return Services.addObjectToSlide(state, {
                    slideId: payload.slideId,
                    object: payload.object
                });
            },

            moveSlideObjects: (state: State, { payload }: PayloadAction<MoveSlideObjectsPayload>) => {
                return Services.moveSlideObject(state, {
                    slideId: payload.id,
                    objectIds: payload.objectsIds,
                    changes: payload.changes
                });
            },

            resizeSlideObject: (state: State, { payload }: PayloadAction<ResizeSlideObjectPayload>) => {
                return Services.resizeSlideObject(state, {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    sizeChanges: payload.sizeChanges,
                    positionChanges: payload.positionChanges
                });
            },

            editText: (state: State, { payload }: PayloadAction<EditTextPayload>) => {
                return Services.editText(state, {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    value: payload.newText
                });
            },

            editFontFamily: (state: State, { payload }: PayloadAction<EditFontFamilyPayload>) => {
                return Services.editFontFamily(state, {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    value: payload.newFontFamily
                });
            },

            editFontSize: (state: State, { payload }: PayloadAction<EditFontSizePayload>) => {
                return Services.editFontSize(state, {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    value: payload.newFontSize
                });
            },

            editBackground: (state: State, { payload }: PayloadAction<EditBackgroundPayload>) => {
                return Services.editBackground(state, {
                    slideId: payload.id,
                    bg: payload.newBackground
                });
            },

            setState: (_: State, { payload }: PayloadAction<SetStatePayload>) => {
                //            console.log("slides.slice setState");
                return payload.state.slides;
            }
        }
    });

export default slideSlice;

export type {
    State as SlidesState
}
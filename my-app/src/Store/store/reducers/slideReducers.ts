import * as Services from "../../Services/editFunctions";
import type { Action } from "../store";
import type { Slide } from "../../Model/slide";
import { presentation } from "../../Services/data/generalData";

const slides: Slide[] = presentation.slides;

const slideReducer = (state = slides, { type, payload }: Action): Slide[] => {
    switch (type) {
        case "ADD_SLIDE":
            return Services.addSlide(
                state,
                {
                    slide: Services.createSlide({ id: payload.id })
                }
            );
        case "REMOVE_SLIDE":
            return Services.removeSlide(
                state,
                { id: payload.id }
            );
        case "REMOVE_OBJECTS_FROM_SLIDE":
            return Services.removeObjectsFromSlide(
                state,
                {
                    slideId: payload.id,
                    removingObjectsIds: payload.removingObjectsIds
                }
            );
        case "ADD_OBJECT_TO_SLIDE":
            return Services.addObjectToSlide(
                state,
                {
                    slideId: payload.slideId,
                    object: payload.object
                }
            );
        case "MOVE_SLIDE_OBJECT":
            return Services.moveSlideObject(
                state,
                {
                    slideId: payload.id,
                    objectIds: payload.objectsIds,
                    changes: payload.changes
                }
            );
        case "RESIZE_SLIDE_OBJECT":
            return Services.resizeSlideObject(
                state,
                {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    sizeChanges: payload.sizeChanges,
                    positionChanges: payload.positionChanges
                }
            );
        case "EDIT_TEXT":
            return Services.editText(
                state,
                {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    value: payload.newText
                }
            );
        case "EDIT_FONT_FAMILY":
            return Services.editFontFamily(
                state,
                {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    value: payload.newFontFamily
                }
            );
        case "EDIT_FONT_SIZE":
            return Services.editFontSize(
                state,
                {
                    slideId: payload.id,
                    objectId: payload.objectId,
                    value: payload.newFontSize
                }
            );
        case "EDIT_BG":
            return Services.editBackground(
                state,
                {
                    slideId: payload.id,
                    bg: payload.newBackground
                }
            );
        case "SET_STATE":
            return payload.state.slides
    }
    return state;
}

export {
    slideReducer
}
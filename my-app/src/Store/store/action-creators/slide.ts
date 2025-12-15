import type { Background, Position, Size, SlideObject } from "../../Model/slideContent";

type SlideAction = {
    type: "RENAME_SLIDE" | "REMOVE_SLIDE" | "ADD_SLIDE" | "REMOVE_OBJECTS_FROM_SLIDE" | 
    "ADD_OBJECT_TO_SLIDE" | "MOVE_SLIDE_OBJECT" | "RESIZE_SLIDE_OBJECT" | "EDIT_TEXT" | 
    "EDIT_FONT_FAMILY" | "EDIT_FONT_SIZE" | "EDIT_BG",
    payload?: {}
}

const renameSlide = (slideId: string, newName: string): SlideAction => ({
    type: "RENAME_SLIDE",
    payload: {
        id: slideId,
        newName
    }
})

const removeSlide = (slideId: string): SlideAction => ({
    type: "REMOVE_SLIDE",
    payload: {
        id: slideId,
    }
});

const addSlide = (slideId: string, name: string): SlideAction => ({
    type: "ADD_SLIDE",
    payload: {
        id: slideId,
        name
    }
});

//const replaceSlide = (slideId: string, )

const removeObjectsFromSlide = (slideId: string, removingObjectsIds: string[]): SlideAction => ({
    type: "REMOVE_OBJECTS_FROM_SLIDE",
    payload: {
        id: slideId,
        removingObjectsIds
    }
});

const addObjectToSlide = (slideId: string, object: SlideObject): SlideAction => ({
    type: "ADD_OBJECT_TO_SLIDE",
    payload: {
        slideId,
        object
    }
});

const moveSlideObjects = (slideId: string, objectsIds: string[], changes: Position): SlideAction => ({
    type: "MOVE_SLIDE_OBJECT",
    payload: {
        id: slideId,
        objectsIds,
        changes
    }
});

const resizeSlideObject = (
    slideId: string,
    objectId: string,
    sizeChanges: Size,
    positionChanges: Position
    ): SlideAction => ({
    type: "RESIZE_SLIDE_OBJECT",
    payload: {
        id: slideId,
        objectId,
        sizeChanges,
        positionChanges
    }
});

const editText = (slideId: string, objectId: string, newText: string): SlideAction => ({
    type: "EDIT_TEXT",
    payload: {
        id: slideId,
        objectId,
        newText
    }
});

const editFontFamily = (slideId: string, objectId: string, newFontFamily: string): SlideAction => ({
    type: "EDIT_FONT_FAMILY",
    payload: {
        id: slideId,
        objectId,
        newFontFamily
    }
});

const editFontSize = (slideId: string, objectId: string, newFontSize: number): SlideAction => ({
    type: "EDIT_FONT_SIZE",
    payload: {
        id: slideId,
        objectId,
        newFontSize
    }
});

const editBackground = (slideId: string, newBackground: Background): SlideAction => ({
    type: "EDIT_BG",
    payload: {
        id: slideId,
        newBackground
    }
});

export { 
    editBackground,
    editFontFamily,
    editFontSize,
    editText,
    addObjectToSlide,
    addSlide,
    removeObjectsFromSlide,
    removeSlide,
    renameSlide,
    moveSlideObjects,
    resizeSlideObject,
    type SlideAction
}
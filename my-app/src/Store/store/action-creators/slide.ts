import type { Background, Position, Size, SlideObject } from "../../Model/slideContent";

const renameSlide = (slideId: string, newName: string) => ({
    type: "RENAME_SLIDE",
    payload: {
        id: slideId,
        newName
    }
});

const removeSlide = (slideId: string) => ({
    type: "REMOVE_SLIDE",
    payload: {
        id: slideId,
    }
});

const addSlide = (slideId: string, name: string) => ({
    type: "ADD_SLIDE",
    payload: {
        id: slideId,
        name
    }
});

//const replaceSlide = (slideId: string, )

const removeObjectsFromSlide = (slideId: string, removingObjectsIds: string[]) => ({
    type: 'REMOVE_OBJECTS_FROM_SLIDE',
    payload: {
        id: slideId,
        removingObjectsIds
    }
});

const addObjectToSlide = (slideId: string, object: SlideObject) => ({
    type: "ADD_OBJECT_TO_SLIDE",
    payload: {
        slideId,
        object
    }
});

const moveSlideObjects = (slideId: string, objectsIds: string[], changes: Position) => ({
    type: "MOVE_SLIDE_OBJECT",
    payload: {
        id: slideId,
        objectsIds,
        changes
    }
});

const resizeSlideObject = (slideId: string, objectId: string, changes: Size, isControlLeft: boolean, isControlUpper: boolean) => ({
    type: "RESIZE_SIDE_OBJECT",
    payload: {
        id: slideId,
        objectId,
        changes,
        isControlLeft,
        isControlUpper
    }
});

const editText = (slideId: string, objectId: string, newText: string) => ({
    type: "EDIT_TEXT",
    payload: {
        id: slideId,
        objectId,
        newText
    }
});

const editFontFamily = (slideId: string, objectId: string, newFontFamily: string) => ({
    type: "EDIT_FONT_FAMILY",
    payload: {
        id: slideId,
        objectId,
        newFontFamily
    }
});

const editFontSize = (slideId: string, objectId: string, newFontSize: number) => ({
    type: "EDIT_FONT_SIZE",
    payload: {
        id: slideId,
        objectId,
        newFontSize
    }
});

const editBackground = (slideId: string, newBackground: Background) => ({
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
    resizeSlideObject
}
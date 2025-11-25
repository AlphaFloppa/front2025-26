import type { Background, Position, Size, SlideObject } from "../../Model/slideContent";

const renameSlide = (id: string, newName: string) => ({
    type: "RENAME_SLIDE",
    payload: {
        id,
        newName
    }
});

const removeSlide = (id: string) => ({
    type: "REMOVE_SLIDE",
    payload: {
        id
    }
});

const addSlide = (id: string, name: string) => ({
    type: "ADD_SLIDE",
    payload: {
        id,
        name
    }
});

//const replaceSlide = (id: string, )

const removeObjectsFromSlide = (id: string, removingObjectsIds: string[]) => ({
    type: 'REMOVE_OBJECTS_FROM_SLIDE',
    payload: {
        id,
        removingObjectsIds
    }
});

const addObjectToSlide = (object: SlideObject) => ({
    type: "ADD_OBJECT_TO_SLIDE",
    payload: {
        id: object.id,
        object
    }
});

const moveSlideObjects = (id: string, objectIds: string[], changes: Position) => ({
    type: "MOVE_SLIDE_OBJECT",
    payload: {
        id,
        objectIds,
        changes
    }
});

const resizeSlideObject = (id: string, objectId: string, changes: Size, isControlLeft: boolean, isControlUpper: boolean) => ({
    type: "RESIZE_SIDE_OBJECT",
    payload: {
        id,
        objectId,
        changes,
        isControlLeft,
        isControlUpper
    }
});

const editText = (id: string, objectId: string, newText: string) => ({
    type: "EDIT_TEXT",
    payload: {
        id,
        objectId,
        newText
    }
});

const editFontFamily = (id: string, objectId: string, newFontFamily: string) => ({
    type: "EDIT_FONT_FAMILY",
    payload: {
        id,
        objectId,
        newFontFamily
    }
});

const editFontSize = (id: string, objectId: string, newFontSize: number) => ({
    type: "EDIT_FONT_SIZE",
    payload: {
        id,
        objectId,
        newFontSize
    }
});

const editBackground = (id: string, newBackground: Background) => ({
    type: "EDIT_BG",
    payload: {
        id,
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
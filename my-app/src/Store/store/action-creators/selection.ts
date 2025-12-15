type SelectionAction = {
    type: "NULLIFY_SLIDE_SELECTION" | "NULLIFY_SLIDE_OBJECT_SELECTION" | "SELECT_SLIDE" | "SELECT_SLIDE_OBJECT",
    payload?: {}
}

const nullifySlideSelection = (): SelectionAction => ({
    type: "NULLIFY_SLIDE_SELECTION"
});

const nullifySlideObjectSelection = (): SelectionAction => ({
    type: "NULLIFY_SLIDE_OBJECT_SELECTION"
});

const selectSlide = (id: string): SelectionAction => ({
    type: "SELECT_SLIDE",
    payload: {
        id
    }
});

const selectSlideObject = (id: string, isCtrlPressed: boolean): SelectionAction => ({
    type: "SELECT_SLIDE_OBJECT",
    payload: {
        id,
        isCtrlPressed
    }
});

export {
    nullifySlideObjectSelection,
    nullifySlideSelection,
    selectSlide,
    selectSlideObject,
    type SelectionAction
}
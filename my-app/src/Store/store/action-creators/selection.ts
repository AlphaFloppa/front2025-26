const nullifySlideSelection = () => ({
    type: "NULLIFY_SLIDE_SELECTION"
});

const nullifySlideObjectSelection = () => ({
    type: "NULLIFY_SLIDE_OBJECT_SELECTION"
});

const selectSlide = (id: string) => ({
    type: "SELECT_SLIDE",
    payload: {
        id
    }
});

const selectSlideObject = (id: string, isCtrlPressed: boolean) => ({
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
    selectSlideObject
}
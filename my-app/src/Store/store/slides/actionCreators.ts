import slice from "./slice";
export const {
    addSlide,
    removeSlide,
    moveSlide,
    removeObjectsFromSlide,
    addObjectToSlide,
    moveSlideObjects,
    resizeSlideObject,
    editText,
    editFontFamily,
    editFontSize,
    editBackground
} = slice.actions;

export default slice.actions.setState;
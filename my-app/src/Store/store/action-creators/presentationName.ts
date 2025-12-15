type PresentationNameAction = {
    type: "CHANGE_PRESENTATION_NAME",
    payload?: {}
}

const changePresentationName = (newName: string): PresentationNameAction => ({
    type: "CHANGE_PRESENTATION_NAME",
    payload: newName
});

export { 
    changePresentationName,
    type PresentationNameAction
}
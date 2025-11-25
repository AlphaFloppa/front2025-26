const changePresentationName = (newName: string) => ({
    type: "CHANGE_PRESENTATION_NAME",
    payload: newName
});

export { 
    changePresentationName
}
const enableModalWindow = (
    type: string,
    onApply: (colorCode: string) => void,
    onCancel: () => void
) => ({
    type: "ENABLE_MODAL_WINDOW",
    payload: {
        type,
        onApply,
        onCancel
    }
});

const disableModalWindow = () => ({
    type: "DISABLE_MODAL_WINDOW"
});

export { 
    enableModalWindow,
    disableModalWindow
}
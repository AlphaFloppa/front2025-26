type ModalWindowAction = {
    type: "ENABLE_MODAL_WINDOW" | "DISABLE_MODAL_WINDOW",
    payload?: {}
}

const enableModalWindow = (
    type: string,
    onApply: (colorCode: string) => void,
    onCancel: () => void
): ModalWindowAction => ({
    type: "ENABLE_MODAL_WINDOW",
    payload: {
        type,
        onApply,
        onCancel
    }
});

const disableModalWindow = (): ModalWindowAction => ({
    type: "DISABLE_MODAL_WINDOW"
});

export { 
    enableModalWindow,
    disableModalWindow,
    type ModalWindowAction
}